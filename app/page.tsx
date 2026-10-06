import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type Resource = {
  id: string; title: string; description: string | null; file_name: string;
  file_path: string; mime_type: string | null; file_size: number | null;
  target_class: string | null; created_at: string;
};
type Announcement = { id:string; title:string; body:string; target_class:string|null; created_at:string };

export default async function Home() {
  const supabase = await createClient();
  const [{ data: announcements }, { data: resources }] = await Promise.all([
    supabase.from("announcements").select("id,title,body,target_class,created_at").order("created_at",{ascending:false}).limit(6),
    supabase.from("resources").select("id,title,description,file_name,file_path,mime_type,file_size,target_class,created_at").order("created_at",{ascending:false}).limit(12),
  ]);

  return <main className="public-site">
    <nav className="public-nav">
      <Link href="/" className="public-brand"><span className="public-logo">M</span><span>MINDVYORA</span></Link>
      <span className="public-pill">OPEN LEARNING SPACE</span>
    </nav>

    <section className="public-hero">
      <div>
        <p className="eyebrow">LEARN · CREATE · EVOLVE</p>
        <h1>Everything you need to<br/><em>keep learning.</em></h1>
        <p>Class resources, announcements, project material and learning files — available publicly, without an account.</p>
        <div className="public-actions"><a href="#resources" className="hero-button">Explore resources ↓</a><a href="#announcements" className="button-secondary">Latest announcements</a></div>
      </div>
      <div className="public-orb"><span>MV</span></div>
    </section>

    <section id="announcements" className="public-section">
      <div className="public-section-head"><div><p className="eyebrow">STAY UPDATED</p><h2>Announcements</h2></div><span>{announcements?.length ?? 0} recent</span></div>
      <div className="public-announcements">{(announcements ?? []).length ? (announcements ?? []).map(a =>
        <article className="public-card" key={a.id}><div className="public-icon">📢</div><div><div className="public-meta">{a.target_class && a.target_class !== "all" ? `CLASS ${a.target_class}` : "ALL STUDENTS"} · {new Date(a.created_at).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</div><h3>{a.title}</h3><p>{a.body}</p></div></article>
      ) : <div className="public-empty">No announcements have been posted yet.</div>}</div>
    </section>

    <section id="resources" className="public-section">
      <div className="public-section-head"><div><p className="eyebrow">LEARNING HUB</p><h2>Resources</h2></div><span>{resources?.length ?? 0} files</span></div>
      <div className="public-resource-grid">{(resources ?? []).length ? (resources ?? []).map(r => {
        const url = supabase.storage.from("learning-resources").getPublicUrl(r.file_path).data.publicUrl;
        return <a className="public-resource" href={url} target="_blank" rel="noreferrer" key={r.id}>
          <div className="resource-top"><span className="public-file-icon">{r.mime_type?.includes("pdf") ? "PDF" : r.mime_type?.includes("image") ? "IMG" : "FILE"}</span><span>↗</span></div>
          <div className="public-meta">{r.target_class && r.target_class !== "all" ? `CLASS ${r.target_class}` : "ALL STUDENTS"}</div>
          <h3>{r.title}</h3><p>{r.description || r.file_name}</p>
        </a>;
      }) : <div className="public-empty">No learning files have been uploaded yet.</div>}</div>
    </section>

    <footer>MINDVYORA © 2026 · Crafted with ❤️ by Mahendra Dhiwar · STEM • AI • Robotics</footer>

    <style>{`
      .public-site{min-height:100vh;background:radial-gradient(circle at 80% 0%,rgba(124,58,237,.16),transparent 32%),#08080c;color:#f7f5fa;padding:24px max(20px,5vw) 70px}
      .public-nav{max-width:1240px;margin:auto;display:flex;justify-content:space-between;align-items:center}.public-brand{display:flex;align-items:center;gap:10px;font-weight:900;letter-spacing:.05em}.public-logo{width:38px;height:38px;display:grid;place-items:center;border-radius:11px;background:linear-gradient(135deg,#b9a1ff,#6d28d9);color:#fff}.public-pill{padding:8px 12px;border:1px solid #342b43;border-radius:999px;color:#a99ac1;font-size:9px;letter-spacing:.12em}
      .public-hero{max-width:1240px;min-height:560px;margin:30px auto 0;display:grid;grid-template-columns:1.15fr .85fr;align-items:center;gap:40px}.public-hero h1{font-size:clamp(52px,7vw,88px);line-height:.93;letter-spacing:-.075em;margin:14px 0 24px}.public-hero h1 em{font-style:normal;color:#a78bfa}.public-hero>div:first-child>p:not(.eyebrow){max-width:600px;color:#918b99;font-size:16px;line-height:1.7}.public-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}.hero-button,.button-secondary{display:inline-flex;align-items:center;padding:14px 17px;border-radius:14px;text-decoration:none;font-size:12px;font-weight:850}.hero-button{background:#f5f4f7;color:#09090b}.button-secondary{border:1px solid #40364d;color:#ded9e8;background:rgba(8,8,13,.52)}.public-orb{justify-self:center;width:280px;height:280px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 35% 25%,#f1edff,#a78bfa 15%,#5b21b6 55%,#160d29);box-shadow:0 0 110px rgba(124,58,237,.3),inset -25px -35px 55px rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.15)}.public-orb span{font-size:70px;font-weight:900;letter-spacing:-.08em}
      .public-section{max-width:1240px;margin:75px auto 0}.public-section-head{display:flex;justify-content:space-between;align-items:end;margin-bottom:18px}.public-section-head h2{font-size:38px;letter-spacing:-.05em;margin:7px 0}.public-section-head>span{color:#77717f;font-size:10px}.public-announcements{display:grid;gap:12px}.public-card{display:flex;gap:15px;padding:20px;border:1px solid #302b3d;border-radius:20px;background:#101015}.public-icon{width:42px;height:42px;flex:none;display:grid;place-items:center;border-radius:13px;background:#21172e}.public-meta{color:#8f7db5;font-size:9px;letter-spacing:.08em;font-weight:800}.public-card h3,.public-resource h3{margin:7px 0;font-size:18px}.public-card p,.public-resource p{margin:0;color:#89838f;font-size:12px;line-height:1.6;white-space:pre-wrap}
      .public-resource-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.public-resource{display:block;padding:21px;border:1px solid #302b3d;border-radius:21px;background:#101015;color:inherit;text-decoration:none;transition:.25s}.public-resource:hover{transform:translateY(-5px);border-color:#71548d;box-shadow:0 20px 55px rgba(0,0,0,.25)}.resource-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}.public-file-icon{padding:7px 9px;border:1px solid #3a3049;border-radius:9px;color:#bda8ed;font-size:9px;font-weight:900}.public-empty{padding:35px;border:1px dashed #342c43;border-radius:20px;color:#77717f;font-size:12px}
      footer{max-width:1240px;margin:80px auto 0;padding-top:25px;border-top:1px solid #201d26;text-align:center;color:#5e5965;font-size:10px}
      @media(max-width:850px){.public-hero{grid-template-columns:1fr;min-height:auto;padding:80px 0 35px}.public-orb{width:190px;height:190px;justify-self:start}.public-orb span{font-size:50px}.public-resource-grid{grid-template-columns:1fr 1fr}}@media(max-width:600px){.public-nav{align-items:flex-start}.public-pill{display:none}.public-hero h1{font-size:52px}.public-section{margin-top:50px}.public-resource-grid{grid-template-columns:1fr}.public-section-head h2{font-size:30px}}
    `}</style>
  </main>;
}
