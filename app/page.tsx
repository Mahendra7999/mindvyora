"use client";

import Link from "next/link";

const coach = {
  name: "Mahendra",
  role: "STEM & Innovation Coach",
  bio: "Helping students turn curiosity into projects through electronics, coding, AI and hands-on making.",
  tags: ["STEM", "Electronics", "AI", "Robotics"],
};

export default function Home() {
  return (
    <main className="landing">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grain" aria-hidden="true" />

      <nav className="landing-nav">
        <div className="brand-lockup">
          <span className="logo-mark" aria-hidden="true">M</span>
          <span className="brand">MINDVYORA</span>
        </div>
        <div className="nav-right">
          <span className="nav-caption">Digital learning space</span>
          <Link href="/login" className="nav-login">Sign in <span>↗</span></Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="hero-badge"><span className="pulse-dot" /> Your learning space</div>
          <p className="hero-kicker">LEARN · ENGAGE · EVOLVE</p>
          <h1>Where learning<br /><span>comes alive.</span></h1>
          <p className="hero-description">A focused digital space for your classes, projects, resources, announcements and direct conversations with your coach.</p>
          <div className="hero-actions">
            <Link href="/login" className="hero-button">Enter MINDVYORA <span>→</span></Link>
            <span className="hero-note">Private · Personal · Built for students</span>
          </div>
          <div className="hero-proof">
            <span className="proof-avatar">M</span>
            <span><strong>Learn with your coach</strong><small>Guidance, resources & feedback in one place.</small></span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="orb orb-back" />
          <div className="orb orb-front"><span>MV</span></div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="floating-card floating-card-top"><span className="mini-icon">✦</span><div><strong>Learning</strong><small>in motion</small></div></div>
          <div className="floating-card floating-card-bottom"><span className="mini-icon">⌁</span><div><strong>Connected</strong><small>always</small></div></div>
          <div className="visual-chip visual-chip-one">⚡ Build</div>
          <div className="visual-chip visual-chip-two">◌ Explore</div>
        </div>
      </section>

      <section className="coach-section" id="coach">
        <div className="coach-intro">
          <p className="eyebrow">YOUR COACH</p>
          <h2>Someone to ask.<br /><span>Someone to build with.</span></h2>
          <p>Need help with a project, concept or assignment? Your coach is just a message away.</p>
        </div>
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

      <section className="landing-features">
        <div><span>01</span><strong>Learn</strong><p>Activities, homework and progress in one place.</p></div>
        <div><span>02</span><strong>Connect</strong><p>Private conversations with your coach when you need help.</p></div>
        <div><span>03</span><strong>Discover</strong><p>Announcements and learning resources without the noise.</p></div>
      </section>

      <footer className="landing-footer"><span>MINDVYORA</span><span>Learn. Engage. Evolve.</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}
