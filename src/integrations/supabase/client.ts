import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://senfrikghcfchjjlosxx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlbmZyaWtnaGNmY2hqamxvc3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3OTAzMjYsImV4cCI6MjA1MTM2NjMyNn0.ueoMSbZsWubCO8jgWCzcE2fqZ_l3xJpop_ZOQnr9hwM";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);