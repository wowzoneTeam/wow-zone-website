/*
  # Create media library schema

  1. New Tables
    - `media_library`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `media_url` (text)
      - `type` (text)
      - `tags` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `media_library` table
    - Add policy for public read access
*/

-- Create media_library table
CREATE TABLE IF NOT EXISTS media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  media_url text NOT NULL,
  type text NOT NULL,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON media_library
  FOR SELECT
  TO public
  USING (true);

-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow public access to media bucket
CREATE POLICY "Allow public access to media bucket"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'media');