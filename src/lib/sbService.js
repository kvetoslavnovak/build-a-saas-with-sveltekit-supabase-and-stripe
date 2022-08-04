import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();

export const getServiceSupabase = () =>
createClient(
  import.meta.env.VITE_SUPABASE_URL,
  process.env['SUPABASE_SERVICE_KEY']
);
