import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AccountManager, { type AccountStudent } from "./account-manager";

export default async function AccountsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("full_name, role").eq("id", user.id).single();
  if (profile?.role !== "admin") redirect("/student");
  const { data: students, error } = await supabase
    .from("students")
    .select("id, school_id, student_code, full_name, class_name, section, roll_number, auth_user_id")
    .order("class_name").order("section").order("roll_number");
  return <AccountManager adminName={profile.full_name || user.email || "Administrator"} initialError={error?.message ?? ""} initialStudents={(students ?? []) as AccountStudent[]} />;
}
