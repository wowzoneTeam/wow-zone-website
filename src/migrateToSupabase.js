import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { JWT } from 'google-auth-library';

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamically import supabaseClient
const supabaseClientPath = path.resolve(__dirname, 'supabaseClient.js');
console.log('Looking for supabaseClient at:', supabaseClientPath);

// Check if the file exists
if (!fs.existsSync(supabaseClientPath)) {
  throw new Error(`supabaseClient file not found at: ${supabaseClientPath}. Please ensure the file 'supabaseClient.js' is placed in 'src/'.`);
}

const { supabase } = await import(`file://${supabaseClientPath}`);

// Log the current working directory for debugging
console.log('Current working directory:', process.cwd());

// Use an absolute path for the keyFile
const keyFilePath = path.resolve(__dirname, 'credentials', 'wow-service-account.json');

const FOLDER_ID = '1kg0U7GXz1_WQPncUmNq3Dhd2XKdl4bai';

const migrateDataToSupabase = async () => {
  try {
    // Log the resolved path for debugging
    console.log('Looking for Service Account file at:', keyFilePath);

    // Check if the file exists
    if (!fs.existsSync(keyFilePath)) {
      throw new Error(`Service Account file not found at: ${keyFilePath}. Please ensure the file 'wow-service-account.json' is placed in 'src/credentials/'.`);
    }

    // Load the service account credentials
    const credentials = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));

    // Create a new JWT client for authentication
    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/drive.readonly']
    });

    // Authorize the client
    const tokens = await auth.authorize();
    const accessToken = tokens.access_token;

    let allItems = [];
    let nextPageToken = undefined;

    // Fetch data from Google Drive
    do {
      let response;
      try {
        response = await axios({
          url: 'https://www.googleapis.com/drive/v3/files',
          method: 'GET',
          params: {
            q: `'${FOLDER_ID}' in parents and mimeType contains 'image/'`,
            fields: 'nextPageToken, files(id, name, mimeType, description)',
            pageToken: nextPageToken,
            pageSize: 100
          },
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      } catch (err) {
        console.error('Error accessing Google Drive folder:', err.message);
        if (err.response) {
          console.error('Detailed errors:', err.response.data);
        }
        throw new Error('Failed to fetch files from Google Drive. Check folder permissions or API access.');
      }

      const data = response.data;
      console.log('Data fetched from Google Drive (page):', data);

      if (!data.files || data.files.length === 0) {
        console.warn('No files found in the folder or the folder is inaccessible!');
        break;
      }

      for (const file of data.files) {
        const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.'));
        const nameParts = file.name.split('#');

        const title = nameParts[0]?.replace(/_/g, ' ').trim() || 'Untitled';
        let tags = nameParts.slice(1).map((tag) => tag.toLowerCase().replace(/_/g, '-'));
        if (title.toLowerCase().includes('karaoke')) {
          tags = [...tags, 'karaoke'];
        }
        if (file.mimeType.includes('gif')) {
          tags = [...tags, 'gif'];
        }

        // Download the image from Google Drive
        const downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`;
        const downloadResponse = await axios({
          url: downloadUrl,
          method: 'GET',
          responseType: 'arraybuffer',
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        const buffer = Buffer.from(downloadResponse.data);

        // Upload the image to Supabase Storage
        const fileExtension = path.extname(file.name);
        const storageFileName = `${file.id}${fileExtension}`; // Unique file name
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(storageFileName, buffer, {
            contentType: file.mimeType
          });

        if (uploadError) {
          console.error(`Error uploading ${file.name} to Supabase Storage:`, uploadError);
          continue;
        }

        // Get the public URL of the uploaded image
        const { data: publicUrlData } = supabase.storage
          .from('media')
          .getPublicUrl(storageFileName);

        const mediaUrl = publicUrlData.publicUrl;

        allItems.push({
          title,
          description: file.description || `Interactive ${title} effect`,
          media_url: mediaUrl,
          type: file.mimeType.includes('gif') ? 'gif' : 'image',
          tags
        });
      }

      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    console.log('All data to be inserted:', allItems);

    // Insert data into Supabase
    for (const item of allItems) {
      const { error } = await supabase
        .from('media_library')
        .insert([
          {
            title: item.title,
            description: item.description,
            media_url: item.media_url,
            type: item.type,
            tags: item.tags
          }
        ]);

      if (error) {
        console.error('Error inserting item into Supabase:', error);
      } else {
        console.log(`Successfully added ${item.title}`);
      }
    }

    console.log('All data successfully migrated to Supabase!');
  } catch (err) {
    console.error('Error migrating data:', err);
  }
};

// Run the migration function
migrateDataToSupabase();