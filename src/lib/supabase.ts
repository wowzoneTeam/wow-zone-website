import { createClient } from '@supabase/supabase-js';

// استخدام المتغيرات البيئية
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// التحقق من وجود المتغيرات البيئية
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key');
}

// إنشاء عميل Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// تصدير أنواع بيانات إضافية (اختياري، يمكنك تعديلها حسب احتياجاتك)
export type Profile = {
  id: string;
  email: string;
  small: string;
  is_admin: boolean;
  created_at: string;
};

export type LibraryItem = {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  type: 'image' | 'gif' | 'video';
  hashtags: string[] | null;
  uploaded_by: string | null;
  created_at: string;
};