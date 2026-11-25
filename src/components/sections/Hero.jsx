import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import { profile } from "../../data";
import Reveal from "../ui/Reveal";

export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [videoError, setVideoError] = useState(false);

  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-9, reduced ? -9 : 9]);

  return (
    <section id="inicio" className="hero section-shell" ref={ref}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <Reveal>
          <div className="eyebrow hero-eyebrow">
            <span className="status-dot" /> BACKEND DEVELOPER{" "}
            <span className="eyebrow-divider">/</span> .NET
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1>
            Por trás de toda
            <br />
            grande experiência,
            <br />
            <span className="hero-last">
              um <span className="blue">backend forte.</span>
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="hero-description">
            Olá, eu sou <strong>Matheus Rodrigues.</strong>
            <br />
            Transformo ideias em aplicações web com C# e .NET.
            <br className="desktop-break" /> Código limpo, arquitetura sólida e
            atenção aos detalhes.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="hero-actions">
          <a className="button button-primary" href="#projetos">
            Explore meus projetos <ArrowUpRight size={18} />
          </a>
          <a
            className="text-link"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={18} /> GitHub <ArrowUpRight size={14} />
          </a>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="hero-tags">
            <span>C# & .NET</span>
            <i />
            <span>APIs & integrações</span>
            <i />
            <span>Arquitetura de software</span>
          </div>
        </Reveal>
      </div>
      <motion.div className="hero-art" style={{ y, rotate }} aria-hidden="true">
        <div className="art-halo" />
        {reduced || videoError ? (
          <img
            className="orb-image"
            src="/images/data-orbit.webp"
            alt=""
            fetchPriority="high"
            width={1000}
            height={1000}
          />
        ) : (
          <video
            className="orb-image orb-video"
            src="/videos/data-orbit-rotacao-suave.mp4"
            poster="/images/data-orbit.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            width={1000}
            height={1000}
            aria-hidden="true"
            tabIndex={-1}
            onError={() => setVideoError(true)}
          />
        )}
        <div className="art-coordinate coordinate-top">
          <span className="tiny-plus">+</span> SYSTEM.DESIGN
          <span>01 / CORE</span>
        </div>
        <div className="art-label">
          <span className="status-dot" /> BUILT TO CONNECT
        </div>
        <div className="floating-code">
          <span className="code-line">01</span>
          <span className="code-purple">public</span>{" "}
          <span className="code-blue">class</span> Developer
          <br />
          <span className="code-line">02</span>
          {"{"}
          <br />
          <span className="code-line">03</span>　
          <span className="code-blue">string</span> Focus{" "}
          <span className="muted">=&gt;</span>{" "}
          <span className="code-green">"Backend"</span>;<br />
          <span className="code-line">04</span>　
          <span className="code-blue">string</span> Stack{" "}
          <span className="muted">=&gt;</span>{" "}
          <span className="code-green">".NET"</span>;<br />
          <span className="code-line">05</span>
          {"}"}
          <span className="code-cursor" />
        </div>
        <div className="orbit-axis" />
      </motion.div>
      <div className="hero-bottom">
        <a href="#sobre">
          <span className="scroll-icon">
            <ArrowDown size={14} />
          </span>{" "}
          UM POUCO MAIS ABAIXO
        </a>
        <span>IDEIAS BEM CONSTRUÍDAS. DO CÓDIGO AO MUNDO.</span>
        <span className="hero-index">01 — 06</span>
      </div>
    </section>
  );
}
