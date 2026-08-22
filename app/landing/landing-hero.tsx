import Link from "next/link";

export default function LandingHero() {
  return (
    <main className="landing-page">
      <div className="landing-stars" aria-hidden="true" />
      <div className="landing-glow landing-glow-left" aria-hidden="true" />
      <div className="landing-glow landing-glow-right" aria-hidden="true" />

      <nav className="landing-nav" aria-label="Main navigation">
        <Link href="/" className="landing-brand" aria-label="Mindvyora home">
          <span className="landing-brand-mark">MV</span>
          <span>MINDVYORA</span>
        </Link>
        <div className="landing-nav-actions">
          <span className="landing-nav-note">THINK · INNOVATE · TRANSFORM</span>
          <Link href="/login" className="landing-signin">Sign in <span aria-hidden="true">↗</span></Link>
        </div>
      </nav>

      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-copy">
          <p className="landing-eyebrow"><span className="landing-eyebrow-dot" /> A learning space for curious minds</p>
          <h1 id="landing-title">Think beyond<br /><em>the classroom.</em></h1>
          <p className="landing-description">Your classes, ideas, resources and coach—together in one focused space built to help you turn curiosity into something real.</p>
          <div className="landing-ctas">
            <Link href="/login" className="landing-primary">Enter your learning space <span aria-hidden="true">→</span></Link>
            <Link href="/login" className="landing-secondary">Create your MINDVYORA ID <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="landing-proof" aria-label="Mindvyora learning tools">
            <span>Classes</span><i />
            <span>Resources</span><i />
            <span>Coach</span><i />
            <span>Ideas</span>
          </div>
        </div>

        <div className="landing-visual" aria-label="Illustration of ideas connecting across learning, making, and sharing">
          <div className="landing-visual-ring landing-visual-ring-one" aria-hidden="true" />
          <div className="landing-visual-ring landing-visual-ring-two" aria-hidden="true" />
          <div className="landing-visual-label landing-label-top"><strong>01</strong><span>LEARN</span></div>
          <div className="landing-visual-label landing-label-right"><strong>02</strong><span>MAKE</span></div>
          <div className="landing-visual-label landing-label-bottom"><strong>03</strong><span>SHARE</span></div>
          <div className="landing-visual-card">
            <div className="landing-card-head"><span>THE NEXT IDEA</span><span className="landing-card-live"><i /> LIVE</span></div>
            <img src="/innovation-reference.svg" alt="Glowing illustration of a rocket, circuit, lightbulb, code window and open book" />
            <div className="landing-card-foot"><span>START WITH CURIOSITY</span><strong>∞</strong></div>
          </div>
        </div>
      </section>

      <footer className="landing-footer"><span>BUILT FOR THE NEXT GENERATION OF THINKERS</span><span>SCROLL TO BEGIN <b aria-hidden="true">↓</b></span></footer>
    </main>
  );
}
