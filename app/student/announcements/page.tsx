import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function StudentAnnouncementsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: student } = await supabase.from("students").select("class_name, section").eq("auth_user_id", user.id).maybeSingle();
  if (!student) redirect("/student");
  const { data: announcements } = await supabase.from("announcements").select("id,title,content,target_class,target_section,created_at").order("created_at", { ascending: false }).limit(50);
  const visible = (announcements ?? []).filter((item) => {
    const classMatch = !item.target_class || item.target_class === "all" || item.target_class === student.class_name;
    const sectionMatch = !item.target_section || item.target_section === "all" || item.target_section === student.section;
    return classMatch && sectionMatch;
  });
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return <main className="notice-page"><div className="notice-top"><Link href="/student" className="back">← Dashboard</Link><span className="pill">📢 NOTICE BOARD</span></div><header><p className="eyebrow">{student.class_name}{student.section ? ` · Section ${student.section}` : ""}</p><h1>Announcements</h1><p>Important updates, class notices and messages from your coach.</p></header><section className="notice-list">{visible.length === 0 ? <div className="empty"><span>📭</span><h2>No announcements yet</h2><p>When your coach posts something for your class, it will appear here.</p></div> : visible.map((item) => { const isNew = new Date(item.created_at).getTime() >= cutoff; return <article className="notice-card" key={item.id}><div className="notice-icon">📢</div><div className="notice-body"><div className="notice-meta"><span>{new Date(item.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>{isNew && <b>NEW</b>}{item.target_class && item.target_class !== "all" && <em>Class {item.target_class}</em>}</div><h2>{item.title}</h2><p>{item.content}</p></div></article>; })}</section><style>{`
.notice-page{min-height:100vh;padding:34px max(22px,5vw) 80px;background:radial-gradient(circle at 20% 0%,rgba(124,58,237,.12),transparent 35%),#09080d;color:#f5f3f7}.notice-top{display:flex;justify-content:space-between;align-items:center;max-width:980px;margin:0 auto}.back{color:#aaa5b4;font-size:12px}.pill{padding:7px 11px;border:1px solid #3b304c;border-radius:999px;color:#c4b5fd;font-size:9px;font-weight:800;letter-spacing:.1em}header{max-width:980px;margin:80px auto 35px}header h1{font-size:clamp(42px,7vw,76px);letter-spacing:-.065em;margin:8px 0}header>p:last-child{color:#898592;max-width:550px;line-height:1.6}.notice-list{max-width:980px;margin:auto;display:grid;gap:14px}.notice-card{display:flex;gap:18px;padding:22px;border:1px solid #30283d;border-radius:22px;background:linear-gradient(135deg,rgba(25,20,36,.9),rgba(12,12,17,.9));box-shadow:0 18px 55px rgba(0,0,0,.2)}.notice-icon{width:46px;height:46px;flex:none;display:grid;place-items:center;border-radius:14px;background:#241735}.notice-body{flex:1}.notice-meta{display:flex;align-items:center;gap:8px;color:#777481;font-size:9px;text-transform:uppercase;letter-spacing:.08em}.notice-meta b{padding:4px 7px;border-radius:999px;background:#ef4444;color:#fff;animation:blink 1s infinite}.notice-meta em{font-style:normal;color:#a78bfa}.notice-body h2{margin:8px 0 7px;font-size:19px}.notice-body p{margin:0;color:#a7a2ae;line-height:1.65;font-size:12px;white-space:pre-wrap}.empty{text-align:center;padding:70px 20px;border:1px dashed #342c43;border-radius:22px;color:#817d89}.empty span{font-size:32px}.empty h2{color:#ddd8e2}.empty p{font-size:12px}@keyframes blink{0%,45%{opacity:1;transform:scale(1)}55%,100%{opacity:.4;transform:scale(.92)}}
`}</style></main>;
}
