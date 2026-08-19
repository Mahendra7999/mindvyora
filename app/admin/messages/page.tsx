import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminMessages from "./admin-messages";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("full_name, role").eq("id", user.id).single();
  if (profile?.role !== "admin") redirect("/student");
  return <AdminMessages adminName={profile.full_name || user.email || "Administrator"} />;
}
