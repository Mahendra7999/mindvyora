"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="landing">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <nav className="landing-nav">
        <div className="brand-lockup"><span className="logo-mark">M</span><span className="brand">MINDVYORA</span></div>
        <span className="nav-caption">Digital learning space</span>
      </nav>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-badge"><span className="pulse-dot" /> Built for learning</div>
          <p className="hero-kicker">LEARN · ENGAGE · EVOLVE</p>
          <h1>Where learning<br /><span>gets a pulse.</span></h1>
          <p className="hero-description">One calm space for students, teachers, activities, resources and conversations.</p>
          <div className="hero-actions"><Link href="/login" className="hero-button">Enter MINDVYORA <span>→</span></Link><span className="hero-note">Secure · Personal · Connected</span></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orb orb-back" /><div className="orb orb-front"><span>MV</span></div><div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="floating-card floating-card-top"><span className="mini-icon">✦</span><div><strong>Learning</strong><small>in motion</small></div></div>
          <div className="floating-card floating-card-bottom"><span className="mini-icon">⌁</span><div><strong>Connected</strong><small>always</small></div></div>
        </div>
      </section>
      <section className="landing-features">
        <div><span>01</span><strong>Learn</strong><p>Activities, homework & progress.</p></div><div><span>02</span><strong>Connect</strong><p>Private student-teacher conversations.</p></div><div><span>03</span><strong>Discover</strong><p>Announcements & learning resources.</p></div>
      </section>
      <footer className="landing-footer">MINDVYORA <span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}
