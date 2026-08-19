import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import StudentChat from "./student-chat";

export default async function StudentMessagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("full_name, role").eq("id", user.id).single();
  if (profile?.role !== "student") redirect(profile?.role === "admin" ? "/admin" : "/teacher");
  return <StudentChat studentName={profile.full_name || user.email || "Student"} />;
}
