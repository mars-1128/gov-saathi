// GOV SAATHI - FRONTEND SUPABASE CLIENT
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://yltapndppnqigiykzjgv.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsdGFwbmRwcG5xaWdpeWt6amd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1NTY4MjMsImV4cCI6MjEwNjEzMjgyM30.LeNaFww2MredDrBDMthGVwHj_NvFPWq_3xN2myG4cgA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
