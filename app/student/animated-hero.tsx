"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const particles = Array.from({ length: 18 }, (_, i) => i);

export default function AnimatedHero({ studentClass, firstName }: { studentClass: string | null; firstName: string }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      stage.style.setProperty("--px", `${x * 10}px`);
      stage.style.setProperty("--py", `${y * 7}px`);
    };
    const reset = () => {
      stage.style.setProperty("--px", "0px");
      stage.style.setProperty("--py", "0px");
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", reset);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <section className="student-hero premium-hero">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-stars" aria-hidden="true">
        {particles.map((i) => (
          <i key={i} style={{ left: `${(i * 47) % 100}%`, top: `${(i * 67) % 100}%`, animationDelay: `${-(i * 0.43)}s` }} />
        ))}
      </div>

      <div className="hero-copy">
        <p className="eyebrow">THE FUTURE OF LEARNING · {studentClass ? `CLASS ${studentClass}` : "ONLINE"}</p>
        <h1>Learn smarter.<br /><span>Build the future.</span></h1>
        <p className="hero-description">Turn curiosity into knowledge, code, robotics and real-world innovation — all in one learning space.</p>
        <div className="actions">
          <Link className="hero-button" href="/student/resources">Explore Resources <b>→</b></Link>
          <Link className="secondary-button" href="/student/announcements">Announcements <b>↗</b></Link>
        </div>
      </div>

      <div ref={stageRef} className="hero-visual" aria-label="Knowledge transforming into artificial intelligence and innovation">
        <div className="visual-glow glow-one" aria-hidden="true" />
        <div className="visual-glow glow-two" aria-hidden="true" />
        <div className="visual-layer layer-back" aria-hidden="true">
          <span className="spark spark-a" /><span className="spark spark-b" /><span className="spark spark-c" /><span className="spark spark-d" />
        </div>
        <img className="innovation-art" src="/innovation-hero.svg" alt="Glowing open book sending knowledge and energy toward a central brain, surrounded by a light bulb, AI chip, robotic arm, code and rocket" />
        <div className="energy-paths" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <div className="brain-bloom" aria-hidden="true" />
        <div className="book-bloom" aria-hidden="true" />
        <div className="data-pulse pulse-one" aria-hidden="true" />
        <div className="data-pulse pulse-two" aria-hidden="true" />
      </div>

      <style jsx>{`
        .premium-hero{position:relative;isolation:isolate;min-height:min(88vh,780px);display:grid;grid-template-columns:minmax(390px,.86fr) minmax(560px,1.14fr);align-items:center;gap:20px;overflow:hidden;padding:54px clamp(32px,5vw,76px);border-radius:30px;background:radial-gradient(circle at 68% 53%,rgba(72,48,154,.28),transparent 31%),radial-gradient(circle at 83% 70%,rgba(25,120,170,.12),transparent 28%),linear-gradient(115deg,#040712 0%,#070a19 48%,#0b0818 100%);border:1px solid rgba(139,92,246,.18);box-shadow:0 30px 100px rgba(0,0,0,.3)}
        .hero-atmosphere{position:absolute;inset:-20%;z-index:-2;background:radial-gradient(ellipse at 67% 48%,rgba(117,78,255,.18),transparent 30%),radial-gradient(ellipse at 52% 80%,rgba(48,183,255,.08),transparent 30%);filter:blur(35px);animation:atmosphere 10s ease-in-out infinite alternate}
        .hero-stars{position:absolute;inset:0;z-index:-1;pointer-events:none}.hero-stars i{position:absolute;width:2px;height:2px;border-radius:50%;background:#d8ceff;opacity:.18;animation:twinkle 4.5s ease-in-out infinite}
        .hero-copy{position:relative;z-index:5;max-width:610px;padding-left:clamp(0px,2vw,28px);animation:copyIn .8s ease-out both}.eyebrow{margin:0 0 18px;color:#b8a8f8;font-size:11px;font-weight:700;letter-spacing:.2em}.hero-copy h1{margin:0;font-size:clamp(54px,6.1vw,88px);line-height:.91;letter-spacing:-.065em;font-weight:800;color:#f8f7ff}.hero-copy h1 span{background:linear-gradient(100deg,#f8f7ff 5%,#bba7ff 52%,#72ddff 100%);-webkit-background-clip:text;background-clip:text;color:transparent}.hero-description{max-width:500px;margin:24px 0 0;color:rgba(224,224,239,.68);font-size:16px;line-height:1.65}.actions{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:30px}.hero-button,.secondary-button{display:inline-flex;align-items:center;gap:14px;text-decoration:none;transition:transform .25s ease,box-shadow .25s ease,background .25s ease}.hero-button{padding:14px 19px;border-radius:12px;color:white;background:linear-gradient(135deg,#6d4aff,#8d5cf6);box-shadow:0 10px 35px rgba(109,74,255,.25)}.hero-button b{font-size:18px}.secondary-button{padding:12px 5px;color:rgba(235,232,255,.72)}.hero-button:hover{transform:translateY(-2px);box-shadow:0 15px 40px rgba(109,74,255,.38)}.secondary-button:hover{color:white;transform:translateY(-1px)}
        .hero-visual{--px:0px;--py:0px;position:relative;width:min(100%,760px);aspect-ratio:594/444;justify-self:end;transform:translate3d(var(--px),var(--py),0);transition:transform .3s ease-out;animation:visualIn 1s .1s both;will-change:transform}.innovation-art{position:absolute;inset:-3%;width:106%;height:106%;object-fit:contain;z-index:3;filter:drop-shadow(0 0 20px rgba(108,73,255,.25));animation:artFloat 7s ease-in-out infinite}.visual-glow{position:absolute;border-radius:50%;pointer-events:none;filter:blur(30px);z-index:0}.glow-one{width:66%;height:62%;left:17%;top:27%;background:radial-gradient(circle,rgba(93,63,220,.36),rgba(44,30,117,.1) 45%,transparent 72%);animation:bloom 5s ease-in-out infinite}.glow-two{width:38%;height:36%;left:31%;top:48%;background:radial-gradient(circle,rgba(62,202,255,.17),transparent 68%);animation:bloom 6.5s ease-in-out infinite reverse}.layer-back{position:absolute;inset:0;z-index:1}.spark{position:absolute;width:3px;height:3px;border-radius:50%;background:#c9b8ff;box-shadow:0 0 10px rgba(150,125,255,.8);animation:sparkDrift 5s ease-in-out infinite}.spark-a{left:18%;top:30%;animation-delay:-1s}.spark-b{left:79%;top:26%;animation-delay:-3.1s}.spark-c{left:24%;top:69%;animation-delay:-2.2s}.spark-d{left:73%;top:73%;animation-delay:-4s}
        .energy-paths{position:absolute;left:22%;top:24%;width:56%;height:55%;z-index:4;pointer-events:none;overflow:hidden;opacity:.65}.energy-paths span{position:absolute;left:50%;bottom:3%;width:1px;height:94%;transform-origin:bottom;background:linear-gradient(to top,transparent,rgba(106,224,255,.75),rgba(181,145,255,.45),transparent);animation:energy 3.2s ease-in-out infinite}.energy-paths span:nth-child(1){transform:rotate(-18deg);animation-delay:-.3s}.energy-paths span:nth-child(2){transform:rotate(-9deg);animation-delay:-1.6s}.energy-paths span:nth-child(3){transform:rotate(0);animation-delay:-2.4s}.energy-paths span:nth-child(4){transform:rotate(9deg);animation-delay:-.9s}.energy-paths span:nth-child(5){transform:rotate(18deg);animation-delay:-2.8s}.brain-bloom{position:absolute;z-index:5;left:43%;top:22%;width:16%;height:15%;border-radius:50%;background:rgba(112,222,255,.14);filter:blur(15px);animation:brainPulse 3.4s ease-in-out infinite}.book-bloom{position:absolute;z-index:5;left:38%;bottom:11%;width:27%;height:10%;border-radius:50%;background:rgba(132,91,255,.25);filter:blur(14px);animation:bookPulse 3.2s ease-in-out infinite}.data-pulse{position:absolute;z-index:6;width:5px;height:5px;border-radius:50%;background:#b9f4ff;box-shadow:0 0 12px #67e8f9;animation:dataTravel 3.5s linear infinite}.pulse-one{left:49%;bottom:25%}.pulse-two{left:54%;bottom:24%;animation-delay:-1.7s}
        @keyframes copyIn{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}@keyframes visualIn{from{opacity:0;transform:translate(22px,4px) scale(.96)}to{opacity:1;transform:translate(var(--px),var(--py)) scale(1)}}@keyframes artFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-5px) scale(1.006)}}@keyframes atmosphere{from{opacity:.65;transform:scale(.96)}to{opacity:1;transform:scale(1.05)}}@keyframes bloom{0%,100%{opacity:.55;transform:scale(.92)}50%{opacity:1;transform:scale(1.08)}}@keyframes twinkle{0%,100%{opacity:.08;transform:scale(.7)}50%{opacity:.75;transform:scale(1.4)}}@keyframes sparkDrift{0%,100%{opacity:.15;transform:translate(0,0)}50%{opacity:.8;transform:translate(7px,-10px)}}@keyframes energy{0%{opacity:0;transform:translateY(22px) scaleY(.55)}35%{opacity:.85}100%{opacity:0;transform:translateY(-28px) scaleY(1)}}@keyframes brainPulse{0%,100%{opacity:.25;transform:scale(.85)}50%{opacity:.85;transform:scale(1.15)}}@keyframes bookPulse{0%,100%{opacity:.3;transform:scaleX(.8)}50%{opacity:.85;transform:scaleX(1.15)}}@keyframes dataTravel{0%{opacity:0;transform:translate(0,28px)}15%{opacity:1}70%{opacity:.7}100%{opacity:0;transform:translate(12px,-145px)}}
        @media(max-width:1050px){.premium-hero{grid-template-columns:minmax(330px,.85fr) minmax(460px,1.15fr);padding-left:38px;padding-right:28px}.hero-copy h1{font-size:clamp(48px,6.5vw,72px)}.hero-description{font-size:15px}.hero-visual{width:108%;margin-right:-5%}}
        @media(max-width:760px){.premium-hero{min-height:760px;display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:0;padding:38px 22px 0;border-radius:24px}.hero-copy{padding:0;max-width:none}.eyebrow{font-size:10px;margin-bottom:15px}.hero-copy h1{font-size:clamp(48px,14vw,66px)}.hero-description{margin-top:19px;font-size:15px;line-height:1.55;max-width:480px}.actions{margin-top:24px}.hero-visual{width:calc(100% + 30px);max-width:none;margin:20px -15px 0;aspect-ratio:594/444;transform:none!important}.innovation-art{inset:0;width:100%;height:100%}.hero-stars i:nth-child(n+12){display:none}.energy-paths{opacity:.45}}
        @media(prefers-reduced-motion:reduce){.hero-atmosphere,.hero-stars i,.innovation-art,.visual-glow,.spark,.energy-paths span,.brain-bloom,.book-bloom,.data-pulse,.hero-copy,.hero-visual{animation:none!important;transition:none!important}.hero-visual{transform:none!important}}
      `}</style>
    </section>
  );
}
