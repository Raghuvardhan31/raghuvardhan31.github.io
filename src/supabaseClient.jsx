import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dkarbwwnjyttgdmdjydq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrYXJid3duanl0dGdkbWRqeWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMDYzMjAsImV4cCI6MjA3OTg4MjMyMH0.-3QgcOxXx1ngX9VhNSLDjBIyUBCEl0vPMkirFEqhTkg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
