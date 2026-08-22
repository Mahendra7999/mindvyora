"use client";

import Link from "next/link";
import { useRef } from "react";

const particles = Array.from({ length: 22 }, (_, i) => i);

export default function AnimatedHero({ studentClass, firstName }: { studentClass: string | null; firstName: string }) {
  const artRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!artRef.current || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    artRef.current.style.setProperty("--mx", `${x * 14}px`);
    artRef.current.style.setProperty("--my", `${y * 14}px`);
  }

  function resetMove() {
    artRef.current?.style.setProperty("--mx", "0px");
    artRef.current?.style.setProperty("--my", "0px");
  }

  return (
    <section className="student-hero reference-hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-stars" aria-hidden="true">
        {particles.map((i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}
      </div>
      <div className="hero-copy">
        <p className="eyebrow">YOUR LEARNING SPACE · {studentClass ? `CLASS ${studentClass}` : "ONLINE"}</p>
        <h1>Welcome back,<br /><span>{firstName}.</span></h1>
        <p className="muted">Learn. Build. Innovate. Your next idea starts here.</p>
        <div className="actions">
          <Link className="hero-button" href="/student/resources">Explore Resources <b>→</b></Link>
          <Link className="secondary-button" href="/student/announcements">Announcements <b>↗</b></Link>
        </div>
      </div>
      <div className="reference-stage" ref={artRef} onPointerMove={handleMove} onPointerLeave={resetMove} aria-label="Animated innovation illustration">
        <div className="art-aura" aria-hidden="true" />
        <img className="reference-image" src="/innovation-reference.svg" alt="Futuristic scene showing a glowing book, brain, light bulb, AI chip, robotic arm, code window and rocket" />
        <div className="energy-streams" aria-hidden="true"><span /><span /><span /><span /></div>
        <div className="hotspot book" aria-hidden="true" /><div className="hotspot brain" aria-hidden="true" /><div className="hotspot bulb" aria-hidden="true" /><div className="hotspot chip" aria-hidden="true" /><div className="hotspot robot" aria-hidden="true" /><div className="hotspot code" aria-hidden="true" /><div className="hotspot rocket" aria-hidden="true" />
        <div className="scan-beam" aria-hidden="true" />
      </div>
    </section>
  );
}
