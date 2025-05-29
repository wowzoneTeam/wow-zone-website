/*
  # Update library items schema and policies

  1. Changes
    - Rename image_url to media_url for consistency
    - Add cascade delete for uploaded_by foreign key
    - Update RLS policies for better security

  2. Security
    - Enable RLS
    - Add policies for admin operations
    - Add policy for public read access
*/

-- Modify library_items table
ALTER TABLE IF EXISTS library_items
  DROP CONSTRAINT IF EXISTS library_items_uploaded_by_fkey,
  ADD CONSTRAINT library_items_uploaded_by_fkey 
    FOREIGN KEY (uploaded_by) 
    REFERENCES profiles(id) 
    ON DELETE CASCADE;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access" ON library_items;
DROP POLICY IF EXISTS "Allow admin insert" ON library_items;
DROP POLICY IF EXISTS "Allow admin update" ON library_items;
DROP POLICY IF EXISTS "Allow admin delete" ON library_items;

-- Create new policies
CREATE POLICY "Enable read access for all users"
  ON library_items FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for admin users only"
  ON library_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Enable update for admin users only"
  ON library_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Enable delete for admin users only"
  ON library_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Update storage policies
DROP POLICY IF EXISTS "Admin Upload Access" ON storage.objects;
CREATE POLICY "Enable upload for admin users only"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'media' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );