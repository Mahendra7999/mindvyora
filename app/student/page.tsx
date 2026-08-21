import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function StudentPage(){
 const supabase=await createClient();
 const {data:{user}}=await supabase.auth.getUser();
 if(!user) redirect("/login");
 const {data:profile}=await supabase.from("profiles").select("full_name,role").eq("id",user.id).single();
 if(profile?.role==="teacher") redirect("/teacher");
 if(profile?.role==="admin") redirect("/admin");
 const name=profile?.full_name||user.email||"Student";
 return <main className="student-dashboard dashboard">
  <nav className="nav student-nav"><div className="brand-lockup"><span className="logo-mark">M</span><div><div className="brand">MINDVYORA</div><span className="pill">STUDENT</span></div></div><div className="nav-actions"><span className="student-welcome">Hi, {name.split(" ")[0]} 👋</span><a className="button-secondary button-inline" href="/student/messages">💬 Chat</a><a className="button-secondary button-inline" href="/student/resources">📚 Resources</a></div></nav>
  <section className="student-hero"><div><p className="eyebrow">YOUR LEARNING SPACE</p><h1>Keep learning.<br/><span>Keep building.</span></h1><p className="muted">Your projects, resources, announcements and coach conversations — all in one place.</p></div><div className="student-hero-orb"><span>MV</span><i></i></div></section>
  <section className="student-quick-grid"><a className="student-feature-card feature-purple" href="/student/resources"><span className="feature-icon">📚</span><div><span className="feature-label">LEARNING HUB</span><h3>Resources</h3><p>Open notes, files and announcements from your coach.</p></div><b>↗</b></a><a className="student-feature-card feature-blue" href="/student/messages"><span className="feature-icon">💬</span><div><span className="feature-label">DIRECT SUPPORT</span><h3>Chat with your coach</h3><p>Ask a question or get help whenever you need it.</p></div><b>↗</b></a><div className="student-feature-card feature-green"><span className="feature-icon">⚡</span><div><span className="feature-label">COMING NEXT</span><h3>My Progress</h3><p>Track activities, projects and your learning journey.</p></div></div></section>
  <section className="student-bottom-grid"><div className="tile student-coach-mini"><div className="coach-avatar small">M</div><div><p className="eyebrow">YOUR COACH</p><h3>Mahendra Dhiwar</h3><p className="muted">STEM • AI • Robotics</p></div><a href="/student/messages">Message →</a></div><div className="tile student-tip"><span>✦</span><div><strong>Build something today.</strong><p className="muted">Curiosity is the start. Your next project is waiting.</p></div></div></section>
 </main>
}
