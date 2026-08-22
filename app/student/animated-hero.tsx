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
  function resetMove() { artRef.current?.style.setProperty("--mx", "0px"); artRef.current?.style.setProperty("--my", "0px"); }

  return <section className="student-hero reference-hero">
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-stars" aria-hidden="true">{particles.map((i) => <i key={i} style={{ left:`${(i*37)%100}%`, top:`${(i*61)%100}%`, animationDelay:`${-i*.19}s`, animationDuration:`${2.6+(i*.17)}s` }} />)}</div>
    <div className="hero-copy">
      <p className="eyebrow">YOUR LEARNING SPACE · {studentClass ? `CLASS ${studentClass}` : "ONLINE"}</p>
      <h1>Welcome back,<br /><span>{firstName}.</span></h1>
      <p className="muted">Learn. Build. Innovate. Your next idea starts here.</p>
      <div className="actions"><Link className="hero-button" href="/student/resources">Explore Resources <b>→</b></Link><Link className="secondary-button" href="/student/announcements">Announcements <b>↗</b></Link></div>
    </div>
    <div className="reference-stage" ref={artRef} onPointerMove={handleMove} onPointerLeave={resetMove} aria-label="Animated innovation illustration">
      <div className="art-aura" aria-hidden="true" />
      <img className="reference-image" src="/innovation-reference.svg" alt="Futuristic scene showing a glowing book, brain, light bulb, AI chip, robotic arm, code window and rocket" />
      <div className="energy-streams" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="hotspot book" aria-hidden="true" /><div className="hotspot brain" aria-hidden="true" /><div className="hotspot bulb" aria-hidden="true" /><div className="hotspot chip" aria-hidden="true" /><div className="hotspot robot" aria-hidden="true" /><div className="hotspot code" aria-hidden="true" /><div className="hotspot rocket" aria-hidden="true" />
      <div className="scan-beam" aria-hidden="true" />
    </div>
    <style jsx>{`
.reference-hero{position:relative;min-height:430px;padding:58px 72px;border-radius:30px;overflow:hidden;border:1px solid #343050;background:linear-gradient(135deg,#050816,#090914 52%,#14091d);box-shadow:0 30px 100px rgba(0,0,0,.25)}
.reference-hero .hero-grid{position:absolute;inset:0;opacity:.11;background-image:linear-gradient(rgba(167,139,250,.18) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.12) 1px,transparent 1px);background-size:48px 48px;animation:gridMove 18s linear infinite}.hero-stars{position:absolute;inset:0;overflow:hidden;pointer-events:none}.hero-stars i{position:absolute;width:2px;height:2px;border-radius:50%;background:#b9a7ff;opacity:.2;animation:twinkle ease-in-out infinite}
.reference-hero .hero-copy{position:relative;z-index:5;max-width:610px;animation:heroCopyIn .8s both}.reference-hero .hero-copy h1{font-size:clamp(50px,6vw,78px);line-height:.92;letter-spacing:-.07em;margin:12px 0}.reference-hero .hero-copy h1 span{color:#a78bfa}.reference-hero .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
.reference-stage{position:absolute;right:1.5%;top:50%;width:53%;max-width:640px;aspect-ratio:594/444;transform:translate(calc(var(--mx,0px) * .25),calc(-50% + var(--my,0px) * .25));z-index:3;transition:transform .18s ease-out;animation:artReveal 1s .12s both;isolation:isolate}.reference-image{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block;filter:drop-shadow(0 0 24px rgba(101,65,220,.22));animation:artFloat 6.5s ease-in-out infinite}.art-aura{position:absolute;left:50%;top:56%;width:74%;height:68%;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(91,54,214,.28),rgba(55,35,122,.1) 38%,transparent 72%);filter:blur(22px);animation:auraPulse 3.8s ease-in-out infinite;z-index:-1}
.energy-streams{position:absolute;left:31%;bottom:25%;width:40%;height:40%;pointer-events:none;overflow:hidden;opacity:.55}.energy-streams span{position:absolute;bottom:-8%;left:50%;width:1px;height:95%;background:linear-gradient(to top,rgba(190,155,255,.05),rgba(95,220,255,.85),transparent);transform-origin:bottom;animation:energyRise 2.8s ease-in-out infinite}.energy-streams span:nth-child(1){transform:rotate(-16deg);animation-delay:-.2s}.energy-streams span:nth-child(2){transform:rotate(-6deg);animation-delay:-1.1s}.energy-streams span:nth-child(3){transform:rotate(7deg);animation-delay:-1.8s}.energy-streams span:nth-child(4){transform:rotate(17deg);animation-delay:-.7s}
.hotspot{position:absolute;border-radius:50%;pointer-events:none;mix-blend-mode:screen}.hotspot:after{content:"";position:absolute;inset:-12px;border-radius:50%;border:1px solid rgba(161,130,255,.16);box-shadow:0 0 18px rgba(125,88,255,.22);animation:hotspotPulse 2.8s ease-in-out infinite}.hotspot.book{left:45%;bottom:12%;width:30px;height:12px;background:rgba(148,103,255,.2);filter:blur(5px);animation:bookGlow 2.6s ease-in-out infinite}.hotspot.brain{left:49%;top:31%;width:28px;height:28px;background:rgba(119,208,255,.15);filter:blur(7px);animation:brainPulse 2.9s ease-in-out infinite}.hotspot.bulb{left:34%;top:12%;width:12px;height:12px;background:#d7b9ff;filter:blur(5px);animation:hotspotPulse 2.3s infinite}.hotspot.chip{left:25%;top:37%;width:11px;height:11px;background:#63e7ff;filter:blur(5px);animation:hotspotPulse 2.1s -.4s infinite}.hotspot.robot{right:17%;top:9%;width:12px;height:12px;background:#a78bfa;filter:blur(5px);animation:hotspotPulse 2.7s -.8s infinite}.hotspot.code{right:16%;top:38%;width:14px;height:14px;background:#a78bfa;filter:blur(5px);animation:codePulse 2.5s infinite}.hotspot.rocket{left:13%;top:58%;width:16px;height:16px;background:#d946ef;filter:blur(7px);animation:rocketPulse 1.8s ease-in-out infinite}.scan-beam{position:absolute;left:8%;right:8%;top:4%;height:1px;background:linear-gradient(90deg,transparent,rgba(169,130,255,.65),rgba(56,189,248,.4),transparent);opacity:.3;animation:scanBeam 4.5s ease-in-out infinite}
@keyframes gridMove{to{background-position:48px 48px}}@keyframes twinkle{0%,100%{opacity:.12;transform:scale(.7)}50%{opacity:.85;transform:scale(1.5)}}@keyframes heroCopyIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}@keyframes artReveal{from{opacity:0;transform:translate(20px,-48%) scale(.97)}to{opacity:1;transform:translate(0,-50%) scale(1)}}@keyframes artFloat{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(0,-5px,0) scale(1.006)}}@keyframes auraPulse{0%,100%{opacity:.55;transform:translate(-50%,-50%) scale(.94)}50%{opacity:.9;transform:translate(-50%,-50%) scale(1.08)}}@keyframes energyRise{0%{opacity:0;transform:translateY(20px) scaleY(.5)}35%{opacity:.8}100%{opacity:0;transform:translateY(-25px) scaleY(1)}}@keyframes hotspotPulse{0%,100%{opacity:.35;transform:scale(.85)}50%{opacity:1;transform:scale(1.35)}}@keyframes brainPulse{0%,100%{opacity:.35;transform:scale(.9)}50%{opacity:.9;transform:scale(1.2)}}@keyframes bookGlow{0%,100%{opacity:.35;transform:scaleX(.8)}50%{opacity:.9;transform:scaleX(1.25)}}@keyframes codePulse{0%,100%{opacity:.25}40%{opacity:1}55%{opacity:.35}75%{opacity:.9}}@keyframes rocketPulse{0%,100%{opacity:.35;transform:translate(0,0) scale(.8)}50%{opacity:1;transform:translate(-3px,-4px) scale(1.25)}}@keyframes scanBeam{0%,100%{transform:translateY(0);opacity:.05}50%{transform:translateY(260px);opacity:.35}}
@media(max-width:900px){.reference-hero{padding:50px 40px}.reference-stage{width:52%;right:-1%}}@media(max-width:700px){.reference-hero{min-height:720px;padding:36px 24px 0;display:flex;flex-direction:column}.reference-hero .hero-copy{max-width:none}.reference-stage{position:relative;right:auto;top:auto;width:100%;max-width:none;height:360px;aspect-ratio:auto;transform:none!important;margin-top:auto}.reference-image{height:100%;width:100%}.hero-stars i:nth-child(n+15){display:none}}@media(prefers-reduced-motion:reduce){.hero-grid,.hero-stars i,.reference-image,.art-aura,.energy-streams span,.hotspot:after,.hotspot,.scan-beam{animation:none!important}.reference-stage{transition:none}.reference-image{transform:none}}
`}</style>
  </section>;
}
