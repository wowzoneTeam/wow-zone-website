import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yagxebxgxefjrcfkspvu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ3hlYnhneGVmanJjZmtzcHZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTI2NDMsImV4cCI6MjA2MDI4ODY0M30.Y_LhYxgeqxifBWqBzeqgujeF2MI1iymLOFJuKG5Z3Yc';

export const supabase = createClient(supabaseUrl, supabaseKey);