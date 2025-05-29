import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setStatus('');

    const user = (await supabase.auth.getUser()).data.user;
    const profileRes = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user?.id)
      .single();

    if (!profileRes.data?.is_admin) {
      setStatus('❌ You are not authorized to upload files.');
      setUploading(false);
      return;
    }

    const filePath = `uploads/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('library-files')
      .upload(filePath, file);

    if (uploadError) {
      setStatus(`❌ Upload failed: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('library-files')
      .getPublicUrl(filePath);

    const fileUrl = publicUrlData?.publicUrl;

    const { error: insertError } = await supabase
      .from('library_items')
      .insert({
        name: file.name,
        file_url: fileUrl,
        type: file.type.includes('image') ? 'image' : 'gif',
        uploaded_by: user?.id,
        category: 'other',
        hashtags: [],
      });

    if (insertError) {
      setStatus(`❌ Failed to insert metadata: ${insertError.message}`);
    } else {
      setStatus('✅ File uploaded successfully!');
      setFile(null);
    }

    setUploading(false);
  };

  return (
    <div className="p-6 bg-white/5 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Upload Media File</h2>
      <input
        type="file"
        accept="image/*,video/*,image/gif"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {status && <p className="mt-4 text-sm text-yellow-300">{status}</p>}
    </div>
  );
};

export default UploadForm;
