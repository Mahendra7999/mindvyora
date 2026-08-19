import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function StudentPage(){
 const supabase=await createClient();
 const {data:{user}}=await supabase.auth.getUser();
 if(!user) redirect("/login");
 const {data:profile}=await supabase.from("profiles").select("full_name,role").eq("id",user.id).single();
 if(profile?.role==="teacher") redirect("/teacher");
 if(profile?.role==="admin") redirect("/admin");
 return <main className="dashboard"><nav className="nav"><div><div className="brand">MINDVYORA</div><span className="pill">STUDENT</span></div><div className="nav-actions"><span>{profile?.full_name||user.email}</span><a className="button-secondary button-inline" href="/student/messages">Message Teacher</a></div></nav><h1>Your learning space.</h1><p className="muted">Activities, homework and progress will appear here.</p><div className="grid"><div className="tile"><h3>Activities</h3><p className="muted">Coming next</p></div><div className="tile"><h3>Homework</h3><p className="muted">Coming next</p></div><div className="tile"><h3>Progress</h3><p className="muted">Coming next</p></div></div><section className="tile" style={{marginTop:16}}><h3>Need help?</h3><p className="muted">Send a private message to your teacher anytime.</p><a className="button-secondary button-inline" href="/student/messages">Open Support Chat</a></section></main>}
