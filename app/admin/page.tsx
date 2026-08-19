import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export default async function AdminPage(){
 const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser(); if(!user) redirect("/login");
 const {data:profile}=await supabase.from("profiles").select("full_name,role").eq("id",user.id).single();
 if(profile?.role!=="admin") redirect("/student");
 return <main className="dashboard"><nav className="nav"><div><div className="brand">MINDVYORA</div><span className="pill">ADMIN</span></div><span>{profile?.full_name||user.email}</span></nav><h1>Admin control center.</h1><p className="muted">Users, roles and platform settings.</p><div className="grid"><div className="tile"><h3>Users</h3><p className="muted">Manage accounts</p></div><div className="tile"><h3>Roles</h3><p className="muted">Control access</p></div><div className="tile"><h3>System</h3><p className="muted">Platform settings</p></div></div></main>}