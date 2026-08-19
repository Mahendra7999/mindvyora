import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import StudentResources from "./student-resources";

export default async function StudentResourcesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("full_name,role").eq("id", user.id).single();
  if (profile?.role === "admin") redirect("/admin");
  if (profile?.role === "teacher") redirect("/teacher");
  const [{ data: announcements }, { data: resources }] = await Promise.all([
    supabase.from("announcements").select("id,title,body,created_at").order("created_at", { ascending: false }),
    supabase.from("resources").select("id,title,description,file_name,file_path,mime_type,file_size,created_at").order("created_at", { ascending: false }),
  ]);
  return <StudentResources studentName={profile?.full_name || user.email || "Student"} announcements={announcements ?? []} resources={resources ?? []} />;
}
