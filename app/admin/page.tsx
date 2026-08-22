import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import StudentManagement from "./student-management";

export type Student = { id: string; school_id: string; student_code: string; full_name: string; class_name: string; section: string | null; roll_number: number | null };

type AdminStats = { resourceCount: number; announcementCount: number; messageCount: number };

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("full_name, role").eq("id", user.id).single();
  if (profile?.role !== "admin") redirect("/student");

  const [{ data: students, error }, resources, announcements, messages] = await Promise.all([
    supabase.from("students").select("id, school_id, student_code, full_name, class_name, section, roll_number").order("class_name").order("section").order("roll_number"),
    supabase.from("resources").select("id", { count: "exact", head: true }),
    supabase.from("announcements").select("id", { count: "exact", head: true }),
    supabase.from("messages").select("id", { count: "exact", head: true }),
  ]);

  const studentRows = (students ?? []) as Student[];
  const classCounts = studentRows.reduce<Record<string, number>>((acc, student) => {
    const key = student.class_name.trim() || "Unassigned";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const stats: AdminStats = {
    resourceCount: resources.count ?? 0,
    announcementCount: announcements.count ?? 0,
    messageCount: messages.count ?? 0,
  };

  return <StudentManagement adminName={profile.full_name || user.email || "Administrator"} initialError={error?.message ?? ""} initialStudents={studentRows} stats={stats} classCounts={classCounts} />;
}
