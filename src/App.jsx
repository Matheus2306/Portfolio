import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from 'motion/react';
import { ArrowUpRight, ArrowDown, ArrowRight, ArrowUp, Github, Linkedin, Copy, Check, X, Menu, Braces, Database, Layers3, Terminal, Code2, ExternalLink } from 'lucide-react';
import { profile, projects } from './data';

const ease = [0.22, 1, 0.36, 1];
const links = [['sobre', 'Sobre'], ['projetos', 'Projetos'], ['stack', 'Stack']];
function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: .8, delay, ease }}>{children}</motion.div>;
}
function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: '-10% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(el => observer.observe(el));
    const escape = e => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', escape);
    return () => { observer.disconnect(); window.removeEventListener('keydown', escape); };
  }, []);
  return <header className="floating-header">
    <a className="brand" href="#inicio" aria-label="Matheus, início" onClick={() => setOpen(false)}><Code2 size={21} /><span>matheus<span className="blue">.</span>dev</span></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{links.map(([id, label]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}</nav>
    <a className="nav-contact" href="#contato">Vamos conversar <ArrowUpRight size={15} /></a>
    <button className="menu-toggle" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label="Navegação móvel">{[...links, ['contato', 'Contato']].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={17} /></a>)}</nav>}
  </header>;
}
function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-9, reduced ? -9 : 9]);
  return <section id="inicio" className="hero section-shell" ref={ref}>
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-copy">
      <Reveal><div className="eyebrow hero-eyebrow"><span className="status-dot" /> BACKEND DEVELOPER <span className="eyebrow-divider">/</span> .NET</div></Reveal>
      <Reveal delay={.1}><h1>Por trás de toda<br />grande experiência,<br /><span className="hero-last">um <span className="blue">backend forte.</span></span></h1></Reveal>
      <Reveal delay={.2}><p className="hero-description">Olá, eu sou <strong>Matheus Rodrigues.</strong><br />Transformo ideias em aplicações web com C# e .NET.<br className="desktop-break" /> Código limpo, arquitetura sólida e atenção aos detalhes.</p></Reveal>
      <Reveal delay={.3} className="hero-actions"><a className="button button-primary" href="#projetos">Explore meus projetos <ArrowUpRight size={18} /></a><a className="text-link" href={profile.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={14} /></a></Reveal>
      <Reveal delay={.4}><div className="hero-tags"><span>C# & .NET</span><i /><span>APIs & integrações</span><i /><span>Arquitetura de software</span></div></Reveal>
    </div>
    <motion.div className="hero-art" style={{ y, rotate }} aria-hidden="true">
      <div className="art-halo" />
      <img className="orb-image" src="/images/data-orbit.webp" alt="" fetchPriority="high" width="1000" height="1000" />
      <div className="art-coordinate coordinate-top"><span className="tiny-plus">+</span> SYSTEM.DESIGN<span>01 / CORE</span></div>
      <div className="art-label"><span className="status-dot" /> BUILT TO CONNECT</div>
      <div className="floating-code"><span className="code-line">01</span><span className="code-purple">public</span> <span className="code-blue">class</span> Developer<br /><span className="code-line">02</span>{'{'}<br /><span className="code-line">03</span>　<span className="code-blue">string</span> Focus <span className="muted">=&gt;</span> <span className="code-green">"Backend"</span>;<br /><span className="code-line">04</span>　<span className="code-blue">string</span> Stack <span className="muted">=&gt;</span> <span className="code-green">".NET"</span>;<br /><span className="code-line">05</span>{'}'}<span className="code-cursor" /></div>
      <div className="orbit-axis" />
    </motion.div>
    <div className="hero-bottom"><a href="#sobre"><span className="scroll-icon"><ArrowDown size={14} /></span> UM POUCO MAIS ABAIXO</a><span>IDEIAS BEM CONSTRUÍDAS. DO CÓDIGO AO MUNDO.</span><span className="hero-index">01 — 05</span></div>
  </section>;
}
function Word({ word, index, total, progress, reduced }) {
  const opacity = useTransform(progress, [index / total * .8, (index + 1) / total * .8], [.17, 1]);
  return <motion.span style={{ opacity: reduced ? 1 : opacity }}>{word} </motion.span>;
}
function About() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start .8', 'end .7'] });
  const words = 'A melhor tecnologia é aquela que resolve problemas reais. Eu construo o que faz tudo funcionar.'.split(' ');
  return <section id="sobre" className="about-section section-shell" ref={ref}>
    <Reveal className="section-kicker"><span>01 / SOBRE MIM</span><span>O QUE MOVE O CÓDIGO</span></Reveal>
    <div className="about-layout"><div className="about-label"><span className="small-blue-line" />Menos complexidade.<br />Mais propósito.</div><div><h2 className="reveal-statement">{words.map((word, i) => <Word key={i} word={word} index={i} total={words.length} progress={scrollYProgress} reduced={reduced} />)}</h2><Reveal className="about-bottom"><p>Sou Matheus Felipe Rodrigues, desenvolvedor de software com foco no universo backend. Meu trabalho conecta regras de negócio, dados e pessoas por meio de aplicações web pensadas para evoluir.</p><a href="#stack" className="round-link" aria-label="Conheça minha stack"><ArrowDown size={24} /></a></Reveal></div></div>
  </section>;
}
function Projects({ onSelect }) {
  const ref = useRef(null);
  const track = useRef(null);
  const reduced = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [height, setHeight] = useState(null);
  const [horizontal, setHorizontal] = useState(false);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  useMotionValueEvent(scrollYProgress, 'change', value => setActive(Math.min(projects.length - 1, Math.floor(value * projects.length))));
  useEffect(() => {
    const resize = () => {
      const enabled = window.innerWidth >= 900 && !reduced;
      const viewport = track.current?.parentElement;
      const styles = viewport ? getComputedStyle(viewport) : null;
      const padding = styles ? parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight) : 0;
      const d = Math.max(0, (track.current?.scrollWidth ?? 0) - (viewport?.clientWidth ?? 0) + padding);
      setHorizontal(enabled); setDistance(d); setHeight(enabled ? d + window.innerHeight : null);
    };
    resize();
    const observer = new ResizeObserver(resize);
    if (track.current) observer.observe(track.current);
    window.addEventListener('resize', resize);
    return () => { observer.disconnect(); window.removeEventListener('resize', resize); };
  }, [reduced]);
  return <section id="projetos" ref={ref} className={`projects-section ${horizontal ? 'is-horizontal' : ''}`} style={{ height: height ?? 'auto' }}>
    <div className="projects-sticky">
      <div className="section-shell projects-heading"><div><div className="section-kicker"><span>02 / PROJETOS SELECIONADOS</span></div><h2>Ideias que viram <span className="serif-word">sistemas.</span></h2></div><div className="project-scroll-note"><span>EXPLORE OS CONCEITOS</span><span>{horizontal ? 'Continue rolando para explorar' : 'Conheça cada projeto'} <ArrowRight size={17} /></span></div></div>
      <div className="projects-viewport"><motion.div className="projects-track" ref={track} style={{ x: horizontal ? x : 0 }}>
        {projects.map((project, index) => <article className="project-card" key={project.id} onFocusCapture={event => {
          if (!horizontal) return;
          const card = event.currentTarget.getBoundingClientRect();
          if (card.left < 0 || card.right > window.innerWidth) {
            window.scrollTo({ top: ref.current.offsetTop + Math.min(distance, index * (card.width + 30)), behavior: 'instant' });
          }
        }}>
          <button className="project-image-button" onClick={() => onSelect(project)} aria-label={`Explorar ${project.name}`}><img src={project.image} alt={`Visual conceitual do projeto ${project.name}`} width="960" height="640" loading="lazy" /><span className="project-concept">CONCEITO / {project.id}</span><span className="project-open"><ArrowUpRight size={22} /></span></button>
          <div className="project-caption"><div><span className="micro-text">{project.type}</span><h3><button onClick={() => onSelect(project)}>{project.name} <ArrowUpRight size={20} /></button></h3></div><span className="project-number">/{project.id}</span></div><p>{project.description}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </article>)}
      </motion.div></div>
      <div className="section-shell projects-bottom"><div className="projects-progress" aria-hidden="true">{projects.map((p, i) => <span key={p.id} className={active === i ? 'selected' : ''} />)}</div><span>PROJETOS DEMONSTRATIVOS <span className="blue">/</span> EXPLORANDO POSSIBILIDADES</span><span className="project-count">0{active + 1}<span> / 03</span></span></div>
    </div>
  </section>;
}
const stack = [
  { icon: Braces, title: 'Backend é meu território.', description: 'Da regra de negócio à resposta da API. Aplicações organizadas, legíveis e prontas para crescer.', tags: ['C#', '.NET', 'ASP.NET Core', 'Entity Framework'], label: '01 / DESENVOLVIMENTO' },
  { icon: Database, title: 'Dados com estrutura e sentido.', description: 'Modelagem cuidadosa, consultas eficientes e integrações que levam a informação ao lugar certo.', tags: ['SQL Server', 'PostgreSQL', 'Redis', 'APIs REST'], label: '02 / DADOS & INTEGRAÇÕES' },
  { icon: Layers3, title: 'A base faz a diferença.', description: 'Responsabilidades bem definidas e ferramentas que tornam cada entrega mais consistente.', tags: ['Clean Architecture', 'SOLID', 'Docker', 'Git'], label: '03 / ARQUITETURA & ENTREGA' },
];
function Stack() {
  return <section id="stack" className="stack-section section-shell"><div className="stack-sidebar"><div className="section-kicker"><span>03 / TECNOLOGIAS</span></div><h2>A stack certa.<br />Uma base <span className="blue">sólida.</span></h2><p>Ferramentas mudam.<br />O cuidado com a engenharia permanece.</p><div className="stack-art"><img src="/images/data-flow.gif" alt="Animação de fluxo de dados entre camadas de um sistema" width="480" height="320" loading="lazy" /><span><Terminal size={13} /> ALWAYS BUILDING_</span></div></div><div className="stack-items">{stack.map(({ icon: Icon, ...item }) => <Reveal key={item.title} className="stack-item"><div className="stack-item-top"><span className="stack-icon"><Icon size={23} strokeWidth={1.4} /></span><span className="micro-text">{item.label}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="stack-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></Reveal>)}</div></section>;
}
function Process() {
  return <section className="process-section section-shell"><Reveal><div className="section-kicker"><span>04 / COMO EU PENSO</span><span>DO PROBLEMA À SOLUÇÃO</span></div><h2>Antes de escrever código,<br /><span className="muted">entender o porquê.</span></h2></Reveal><div className="process-grid">{[{ n: '01', title: 'Entender', text: 'Ouvir, fazer boas perguntas e encontrar o problema que realmente precisa ser resolvido.' }, { n: '02', title: 'Estruturar', text: 'Desenhar o domínio, conectar as peças e escolher o caminho mais simples que faz sentido.' }, { n: '03', title: 'Construir & evoluir', text: 'Transformar decisões em código, validar o comportamento e melhorar a cada iteração.' }].map((item, i) => <Reveal className="process-step" key={item.n} delay={i * .12}><span>{item.n}<ArrowRight size={18} /></span><h3>{item.title}</h3><p>{item.text}</p></Reveal>)}</div></section>;
}
function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const timeout = useRef(null);
  useEffect(() => () => clearTimeout(timeout.current), []);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setCopyError(false); clearTimeout(timeout.current); timeout.current = setTimeout(() => setCopied(false), 2500); }
    catch { setCopyError(true); }
  }
  return <section id="contato" className="contact-section section-shell"><div className="contact-glow" aria-hidden="true" /><Reveal><div className="section-kicker"><span>05 / VAMOS CONVERSAR</span><span><span className="status-dot" /> CONEXÕES CRIAM POSSIBILIDADES</span></div><h2>Seu próximo projeto<br />começa com um <a href={`mailto:${profile.email}`}>olá.<ArrowUpRight /></a></h2><div className="contact-bottom"><p>Tem uma ideia, um desafio ou uma oportunidade?<br />Vamos construir algo que faça a diferença.</p><div><div className="email-row"><a href={`mailto:${profile.email}`}>{profile.email}</a><button onClick={copyEmail} aria-label="Copiar e-mail">{copied ? <Check size={19} /> : <Copy size={18} />}</button></div><span className="copy-feedback" role="status">{copied ? 'E-mail copiado!' : copyError ? `Copie manualmente: ${profile.email}` : ''}</span></div></div></Reveal></section>;
}
function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!project) return;
    const focused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current.showModal();
    return () => { document.body.style.overflow = previousOverflow; focused?.focus(); };
  }, [project]);
  return <dialog ref={ref} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>{project && <div className="dialog-inner"><button className="dialog-close" onClick={onClose} aria-label="Fechar projeto"><X size={22} /></button><img src={project.image} alt={`Arte conceitual de ${project.name}`} width="960" height="640" /><div className="dialog-content"><span className="micro-text">ESTUDO CONCEITUAL / {project.id}</span><h2 id="project-dialog-title">{project.name}</h2><p>{project.detail}</p><ul>{project.features.map(feature => <li key={feature}><Check size={16} />{feature}</li>)}</ul><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><p className="concept-disclaimer">Projeto demonstrativo para ilustrar possibilidades da stack. Não representa um case entregue.</p><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">Conheça meu GitHub <ExternalLink size={16} /></a></div></div>}</dialog>;
}
export default function App() {
  const [project, setProject] = useState(null);
  const { scrollYProgress } = useScroll();
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} /><Header /><main id="conteudo"><Hero /><About /><Projects onSelect={setProject} /><Stack /><Process /><Contact /></main><footer className="footer section-shell"><a className="brand" href="#inicio"><Code2 size={19} />matheus<span className="blue">.</span>dev</a><span>© {new Date().getFullYear()} Matheus Felipe Rodrigues</span><div className="footer-links"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub de Matheus"><Github size={18} /></a>{profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn de Matheus"><Linkedin size={18} /></a>}<a href="#inicio" aria-label="Voltar ao início"><ArrowUp size={18} /></a></div></footer>{project && <ProjectDialog project={project} onClose={() => setProject(null)} />}</>;
}
