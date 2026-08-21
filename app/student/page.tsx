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
 const name=profile?.full_name||user.email||"Student";
 return <StudentDashboard name={name}/>;
}
