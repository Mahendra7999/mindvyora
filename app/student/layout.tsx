import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let hasNewNotice = false;
  if (user) {
    const { data: student } = await supabase.from("students").select("class_name").eq("auth_user_id", user.id).maybeSingle();
    const { data: notices } = await supabase.from("announcements").select("id,target_class,created_at").order("created_at", { ascending: false }).limit(12);
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    hasNewNotice = (notices ?? []).some((n) => new Date(n.created_at).getTime() >= cutoff && (!n.target_class || n.target_class === "all" || n.target_class === student?.class_name));
  }
  return <><div className="student-layout-shell">{children}<div className="student-floating-tools"><Link href="/student/announcements" className="floating-notice">📢 <span>Notice Board</span>{hasNewNotice && <b>NEW</b>}</Link><Link href="/student/ideas" className="floating-idea">💡 <span>Submit Your Idea</span></Link></div></div><style>{`
.student-layout-shell{min-height:100vh}
.student-floating-tools{position:fixed;right:22px;bottom:22px;z-index:70;display:flex;flex-direction:column;align-items:flex-end;gap:9px}
.student-floating-tools a{display:flex;align-items:center;gap:8px;padding:10px 13px;border:1px solid #3a3048;border-radius:999px;background:rgba(12,10,17,.88);backdrop-filter:blur(12px);box-shadow:0 12px 35px rgba(0,0,0,.35);color:#e9e4ee;font-size:10px;font-weight:800;transition:.25s}
.student-floating-tools a:hover{transform:translateY(-3px);border-color:#8061a7}
.floating-notice b{padding:3px 6px;border-radius:999px;background:#ef4444;color:#fff;font-size:7px;letter-spacing:.08em;animation:noticeBlink 1s ease-in-out infinite}
.floating-idea{background:linear-gradient(110deg,rgba(124,58,237,.2),rgba(34,211,238,.08))!important;border-color:#59436f!important}
.floating-idea:hover{box-shadow:0 0 22px rgba(124,58,237,.18)}
@keyframes noticeBlink{0%,45%{opacity:1;transform:scale(1)}55%,100%{opacity:.35;transform:scale(.94)}}
@media(max-width:600px){.student-floating-tools{right:12px;bottom:12px}.student-floating-tools a span{display:none}.student-floating-tools a{width:44px;height:44px;justify-content:center;padding:0}.floating-notice b{position:absolute;top:-5px;right:-4px}}
`}</style></>;
}
