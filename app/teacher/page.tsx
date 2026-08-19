import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export default async function TeacherPage(){
 const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser(); if(!user) redirect("/login");
 const {data:profile}=await supabase.from("profiles").select("full_name,role").eq("id",user.id).single();
 if(profile?.role!=="teacher"&&profile?.role!=="admin") redirect("/student");
 return <main className="dashboard"><nav className="nav"><div><div className="brand">MINDVYORA</div><span className="pill">{profile?.role?.toUpperCase()}</span></div><span>{profile?.full_name||user.email}</span></nav><h1>Teacher dashboard.</h1><p className="muted">Student activity, homework and class insights will live here.</p><div className="grid"><div className="tile"><h3>Students</h3><p className="muted">Manage classes</p></div><div className="tile"><h3>Activities</h3><p className="muted">Record activity</p></div><div className="tile"><h3>Reports</h3><p className="muted">View progress</p></div></div></main>}