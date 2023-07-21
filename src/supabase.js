import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://asdelwjhqktdzeuqnito.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzZGVsd2pocWt0ZHpldXFuaXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwMDU2NzQsImV4cCI6MTk5MjU4MTY3NH0.sgD4YVfpg6eE27pC_SA1vDogmFm0XNI9wwO14SyTFeE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
