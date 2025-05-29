/*
  # Create library items table and security policies

  1. New Tables
    - `library_items`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `file_url` (text)
      - `type` (text)
      - `category` (text)
      - `hashtags` (text[])
      - `uploaded_by` (uuid, references profiles)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `library_items` table
    - Add policies for public read and admin write access
*/

-- Create library_items table
CREATE TABLE IF NOT EXISTS library_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  file_url text NOT NULL,
  type text NOT NULL CHECK (type IN ('image', 'gif', 'video')),
  category text NOT NULL,
  hashtags text[] DEFAULT '{}',
  uploaded_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE library_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
  ON library_items
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin insert"
  ON library_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Allow admin update"
  ON library_items
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Allow admin delete"
  ON library_items
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Create storage bucket for library files
INSERT INTO storage.buckets (id, name, public)
VALUES ('library-files', 'library-files', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public read access
CREATE POLICY "Public Access"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'library-files');

-- Create storage policy for admin uploads
CREATE POLICY "Admin Upload Access"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'library-files' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );