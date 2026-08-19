import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import StudentManagement from "./student-management";

export type Student = { id: string; student_code: string; full_name: string; class_name: string; section: string | null; roll_number: number | null };

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("full_name, role").eq("id", user.id).single();
  if (profile?.role !== "admin") redirect("/student");
  const { data: students, error } = await supabase.from("students").select("id, student_code, full_name, class_name, section, roll_number").order("class_name").order("section").order("roll_number");
  return <StudentManagement adminName={profile.full_name || user.email || "Administrator"} initialError={error?.message ?? ""} initialStudents={(students ?? []) as Student[]} />;
}
