import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://upkltkfhbfntghzpmtgd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwa2x0a2ZoYmZudGdoenBtdGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5MzE5OTYsImV4cCI6MjAwNzUwNzk5Nn0.X5xnHxMSZYGAsBNZ2uoZaowtvqO_oT86DXASE966Ypo";

export default createClient(supabaseUrl, supabaseAnonKey);