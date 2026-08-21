import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminResources from "./admin-resources";

export default async function AdminResourcesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("full_name, role").eq("id", user.id).single();
  if (profile?.role !== "admin") redirect("/student");
  const [{ data: announcements }, { data: resources }, { data: students }] = await Promise.all([
    supabase.from("announcements").select("id,title,body,target_class,created_at").order("created_at", { ascending: false }),
    supabase.from("resources").select("id,title,description,file_name,file_path,mime_type,file_size,target_class,created_at").order("created_at", { ascending: false }),
    supabase.from("students").select("class_name").not("class_name", "is", null),
  ]);
  const classOptions = [...new Set((students ?? []).map(s => s.class_name).filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
  return <AdminResources adminName={profile.full_name || user.email || "Administrator"} classOptions={classOptions as string[]} initialAnnouncements={announcements ?? []} initialResources={resources ?? []} />;
}
