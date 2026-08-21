"use client";

import Link from "next/link";

const coach = {
  name: "Mahendra",
  role: "STEM & Innovation Coach",
  bio: "Helping students turn curiosity into projects through electronics, coding, AI and hands-on making.",
  tags: ["STEM", "Electronics", "AI", "Robotics"],
};

export default function Home() {
  const structuredData = { "@context": "https://schema.org", "@type": "WebSite", name: "MINDVYORA", description: "A digital learning space for students and coaches." };
  return (
    <main className="landing">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grain" aria-hidden="true" />

      <nav className="landing-nav">
        <div className="brand-lockup"><span className="logo-mark" aria-hidden="true">M</span><span className="brand">MINDVYORA</span></div>
        <div className="nav-right"><span className="nav-caption">Digital learning space</span><Link href="/login" className="nav-login">Sign in <span>↗</span></Link></div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="hero-badge"><span className="pulse-dot" /> Your learning space</div>
          <p className="hero-kicker">LEARN · ENGAGE · EVOLVE</p>
          <h1>Where learning<br /><span>comes alive.</span></h1>
          <p className="hero-description">A focused digital space for your classes, projects, resources, announcements and direct conversations with your coach.</p>
          <div className="hero-actions"><Link href="/login" className="hero-button">Enter MINDVYORA <span>→</span></Link><span className="hero-note">Private · Personal · Built for students</span></div>
          <div className="hero-proof"><span className="proof-avatar">M</span><span><strong>Learn with your coach</strong><small>Guidance, resources & feedback in one place.</small></span></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orb orb-back" /><div className="orb orb-front"><span>MV</span></div><div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="floating-card floating-card-top"><span className="mini-icon">✦</span><div><strong>Learning</strong><small>in motion</small></div></div>
          <div className="floating-card floating-card-bottom"><span className="mini-icon">⌁</span><div><strong>Connected</strong><small>always</small></div></div>
          <div className="visual-chip visual-chip-one">⚡ Build</div><div className="visual-chip visual-chip-two">◌ Explore</div>
        </div>
      </section>

      <section className="coach-section" id="coach">
        <div className="coach-intro"><p className="eyebrow">YOUR COACH</p><h2>Someone to ask.<br /><span>Someone to build with.</span></h2><p>Need help with a project, concept or assignment? Your coach is just a message away.</p></div>
        <article className="coach-card">
          <div className="coach-avatar">M</div>
          <div className="coach-content">
            <div className="coach-heading"><div><p className="coach-label">COACH</p><h3>{coach.name}</h3><p className="coach-role">{coach.role}</p></div><span className="online-dot">Available</span></div>
            <p className="coach-bio">{coach.bio}</p>
            <div className="coach-tags">{coach.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <Link href="/login" className="coach-link">Ask your coach <span>→</span></Link>
          </div>
        </article>
      </section>

      <section className="landing-features"><div><span>01</span><strong>Learn</strong><p>Activities, homework and progress in one place.</p></div><div><span>02</span><strong>Connect</strong><p>Private conversations with your coach when you need help.</p></div><div><span>03</span><strong>Discover</strong><p>Announcements and learning resources without the noise.</p></div></section>
      <footer className="landing-footer"><span>MINDVYORA</span><span>Learn. Engage. Evolve.</span><span>© {new Date().getFullYear()}</span></footer>

      <style jsx global>{`
        .grain{position:fixed;inset:0;pointer-events:none;opacity:.025;z-index:10;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
        .nav-right{display:flex;align-items:center;gap:20px}.nav-login{padding:9px 14px;border:1px solid #2b2832;border-radius:999px;background:rgba(255,255,255,.035);font-size:12px;transition:.25s}.nav-login:hover{border-color:#7054a7;background:rgba(124,58,237,.1);transform:translateY(-1px)}
        .hero-proof{display:flex;align-items:center;gap:11px;margin-top:36px;color:#c9c6d1;font-size:12px}.hero-proof small{display:block;margin-top:3px;color:#777481;font-size:10px}.proof-avatar{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#2b2140,#17121f);border:1px solid #463765;color:#c4b5fd;font-weight:800}
        .visual-chip{position:absolute;padding:8px 11px;border-radius:999px;border:1px solid #302b3a;background:rgba(18,16,23,.7);backdrop-filter:blur(12px);color:#aaa5b4;font-size:10px;letter-spacing:.08em;text-transform:uppercase;animation:float 4.5s ease-in-out infinite}.visual-chip-one{top:38%;left:4%}.visual-chip-two{right:1%;bottom:37%;animation-delay:-2s}
        .coach-section{position:relative;z-index:1;display:grid;grid-template-columns:.8fr 1.2fr;gap:70px;align-items:center;max-width:1120px;margin:70px auto 140px;padding-top:90px;border-top:1px solid #211f26}.coach-intro h2{margin:10px 0 16px;font-size:clamp(36px,4vw,58px);line-height:1;letter-spacing:-.055em}.coach-intro h2 span{color:#85818e}.coach-intro>p:last-child{max-width:420px;color:#817d89;line-height:1.65}.coach-card{position:relative;display:flex;gap:24px;padding:28px;border:1px solid #342c45;border-radius:28px;background:linear-gradient(135deg,rgba(29,21,45,.9),rgba(13,13,18,.88));box-shadow:0 30px 100px rgba(0,0,0,.32);overflow:hidden}.coach-card:after{content:"";position:absolute;width:190px;height:190px;right:-70px;top:-90px;border-radius:50%;background:rgba(124,58,237,.16);filter:blur(35px)}.coach-avatar{position:relative;z-index:1;flex:none;display:grid;place-items:center;width:78px;height:78px;border-radius:24px;background:linear-gradient(145deg,#9f7aea,#4c1d95);font-size:30px;font-weight:900;box-shadow:0 18px 40px rgba(124,58,237,.22)}.coach-content{position:relative;z-index:1;flex:1}.coach-heading{display:flex;justify-content:space-between;gap:20px}.coach-label,.coach-role{margin:0;color:#898592;font-size:10px;letter-spacing:.12em}.coach-heading h3{margin:4px 0;font-size:28px;letter-spacing:-.04em}.coach-role{letter-spacing:0;color:#b6b2bf;font-size:13px}.online-dot{align-self:flex-start;padding:7px 10px;border-radius:999px;background:rgba(34,197,94,.08);color:#86efac;border:1px solid rgba(34,197,94,.18);font-size:10px}.coach-bio{max-width:560px;color:#a4a0ac;line-height:1.6}.coach-tags{display:flex;flex-wrap:wrap;gap:7px}.coach-tags span{padding:7px 9px;border:1px solid #383241;border-radius:999px;color:#c9c5d0;font-size:10px}.coach-link{display:inline-flex;gap:12px;margin-top:20px;color:#c4b5fd;font-size:13px;font-weight:800}.coach-link span{transition:.2s}.coach-link:hover span{transform:translateX(4px)}
        @media(max-width:850px){.coach-section{grid-template-columns:1fr;gap:30px;margin-bottom:100px}.nav-caption{display:none}}@media(max-width:640px){.nav-right{gap:8px}.nav-login{padding:8px 11px}.hero-proof{margin-top:28px}.coach-card{flex-direction:column;padding:22px}.coach-avatar{width:64px;height:64px}.coach-heading h3{font-size:24px}.coach-heading{align-items:flex-start}.visual-chip{display:none}}
      `}</style>
    </main>
  );
}
