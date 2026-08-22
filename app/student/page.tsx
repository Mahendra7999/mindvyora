import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import StudentDashboard from "./student-dashboard";

type Item = {
  id: string;
  title: string;
  body?: string | null;
  description?: string | null;
  target_class?: string | null;
  created_at: string;
};

export default async function StudentPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name,role")
    .eq("id", user.id)
    .single();

  if (profile?.role === "teacher") redirect("/teacher");
  if (profile?.role === "admin") redirect("/admin");

  const { data: student } = await supabase
    .from("students")
    .select("class_name,section")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  const studentClass = student?.class_name ?? null;
  const [{ data: announcements }, { data: resources }] = await Promise.all([
    supabase
      .from("announcements")
      .select("id,title,body,target_class,created_at")
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("resources")
      .select("id,title,description,target_class,created_at")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const visible = (item: Item) => !item.target_class || item.target_class === "all" || item.target_class === studentClass;

  return (
    <StudentDashboard
      name={profile?.full_name || user.email || "Student"}
      studentClass={studentClass}
      section={student?.section ?? null}
      announcements={(announcements ?? []).filter(visible) as Item[]}
      resources={(resources ?? []).filter(visible) as Item[]}
    />
  );
}
