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
 const firstName=name.split(" ")[0];
 return <main className="student-dashboard dashboard">
  <nav className="nav student-nav"><div className="brand-lockup"><span className="logo-mark">M</span><div><div className="brand">MINDVYORA</div><span className="pill">STUDENT</span></div></div><div className="nav-actions"><span className="student-welcome">Hi, {firstName} 👋</span><a className="button-secondary button-inline magnetic-button" href="/student/messages">💬 Chat</a><a className="button-secondary button-inline magnetic-button" href="/student/resources">📚 Resources</a></div></nav>
  <section className="student-hero student-hero-premium"><div className="hero-copy-student"><p className="eyebrow">YOUR LEARNING SPACE · ONLINE</p><h1>Keep learning.<br/><span>Keep building.</span></h1><p className="muted">Your projects, resources, announcements and coach conversations — all in one place.</p><div className="student-hero-actions"><a className="hero-button student-primary" href="/student/resources">Explore your hub <span>→</span></a><a className="student-text-link" href="/student/messages">Talk to your coach <span>↗</span></a></div></div><div className="student-hero-orb"><div className="student-orb-ring ring-one"/><div className="student-orb-ring ring-two"/><div className="student-orb-core">MV</div><span className="orb-label orb-label-one">CREATE</span><span className="orb-label orb-label-two">EXPLORE</span></div></section>
  <div className="student-section-head"><div><p className="eyebrow">YOUR SPACE</p><h2>What do you want to do?</h2></div><span className="student-status"><i/> Everything is ready</span></div>
  <section className="student-quick-grid student-quick-grid-premium"><a className="student-feature-card feature-purple hover-lift" href="/student/resources"><span className="feature-icon">📚</span><div><span className="feature-label">LEARNING HUB</span><h3>Resources</h3><p>Open notes, files and announcements from your coach.</p></div><b>↗</b></a><a className="student-feature-card feature-blue hover-lift" href="/student/messages"><span className="feature-icon">💬</span><div><span className="feature-label">DIRECT SUPPORT</span><h3>Chat with your coach</h3><p>Ask a question or get help whenever you need it.</p></div><b>↗</b></a><div className="student-feature-card feature-green hover-lift"><span className="feature-icon">⚡</span><div><span className="feature-label">YOUR JOURNEY</span><h3>My Progress</h3><p>Your projects and learning progress will live here.</p></div><span className="soon-badge">SOON</span></div></section>
  <section className="student-bottom-grid"><a className="tile student-coach-mini coach-interactive" href="/student/messages"><div className="coach-avatar small">M</div><div><p className="eyebrow">YOUR COACH</p><h3>Mahendra Dhiwar</h3><p className="muted">STEM • AI • Robotics</p></div><span className="coach-arrow">Message →</span></a><div className="tile student-tip tip-glow"><span>✦</span><div><strong>Build something today.</strong><p className="muted">Curiosity is the start. Your next project is waiting.</p></div></div></section>
  <footer className="student-footer">MINDVYORA © 2026 <span>•</span> Crafted with ❤️ by Mahendra Dhiwar <span>•</span> STEM • AI • Robotics</footer>
 </main>
}
