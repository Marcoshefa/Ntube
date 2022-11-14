import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://athfohbzhaxkpeinthan.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0aGZvaGJ6aGF4a3BlaW50aGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODE5NjMsImV4cCI6MTk4Mzg1Nzk2M30.DkAPQMir2hCHKOGeVtMi2ZDEu-Fesgc-mqbCrJNl0d8";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("TbNTube")
                    .select("*")
        }
    }
}