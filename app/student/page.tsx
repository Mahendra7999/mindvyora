import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import StudentDashboard from "./student-dashboard";

export default async function StudentPage(){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) redirect("/login");
  const {data:profile}=await supabase.from("profiles").select("full_name,role").eq("id",user.id).single();
  if(profile?.role==="teacher") redirect("/teacher");
  if(profile?.role==="admin") redirect("/admin");
  const {data:student}=await supabase.from("students").select("class_name,section,student_code").eq("auth_user_id",user.id).maybeSingle();
  const [{data:announcements},{data:resources}]=await Promise.all([
    supabase.from("announcements").select("id,title,body,target_class,created_at").order("created_at",{ascending:false}).limit(5),
    supabase.from("resources").select("id,title,description,file_name,target_class,created_at").order("created_at",{ascending:false}).limit(6)
  ]);
  return <StudentDashboard name={profile?.full_name||user.email||"Student"} studentClass={student?.class_name||null} section={student?.section||null} announcements={announcements??[]} resources={resources??[]}/>;
}
