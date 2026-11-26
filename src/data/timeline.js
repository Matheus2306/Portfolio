import { projects } from "../data.js";

const orbis = projects.find((project) => project.name === "Orbis Commerce");

// Keep the supplied milestone order and labels. Replace period only with real dates.
// media supplies the image, accessible alternative and caption for the scroll preview.
export const timelineMilestones = [
  {
    id: "Formação",
    icon: "education",
    category: "Formação",
    period: "2024 - 2026",
    context: "Foramação de Ensino médio e técnico",
    title: "SESI · SENAI",
    subtitle: "Ensino técnico integrado com ensino médio",
    description: "Curso tecnico de desenvolvimento de sistemas",
    tags: ["React", "C# / .NET", "MS SQL", "IoT", "Vite"],
    media: {
      src: "/images/timeline-edu.svg",
      alt: "Ilustração de livro e capelo representando a formação de Ensino Médio SESI Jaú.",
      caption: "Formação em Ensino Médio · SESI Jahu",
    },
  },
  {
    id: "Desafio",
    icon: "Trophy",
    category: "Desafio",
    period: "2024",
    context: "Jovens Invadores Sicredi · SEBRAE",
    title: "JOVENS INOVADORES",
    subtitle: "Desafio de inovações startup",
    description:
      "4º colocado no ranking dos projetos, realisado em 2024 · Equipe Health Life",
    tags: ["Inovação", "Desafio", "Saúde", "Tecnologia"],
    media: {
      src: "/images/timeline-healthlife.svg",
      alt: "HealthLife: ilustração de um coração com pulso e conexões de tecnologia.",
      caption: "HealthLife · Jovens Inovadores Sicredi 2024",
    },
  },
  {
    id: "Desafio",
    icon: "Trophy",
    category: "Desafio",
    period: "2025",
    context: "Jovens Engenheiros | UNICAMP",
    title: "JOVENS ENGENHEIROS",
    subtitle: "Desafio de atividades propostas por doutores da universidade",
    description:
      "5º colocado no ranking dos grupos participados, realisado em 2025 · Equipe Engineer Hub",
    tags: ["Inovação", "Desafio", "Conjunto de atividades"],
    media: {
      src: "/images/timeline-engineer-hub.svg",
      alt: "Engineer Hub: ilustração de uma engrenagem com código e conexões de tecnologia.",
      caption: "Engineer Hub · Jovens Engenheiros Unicamp 2025",
    },
  },
  {
    id: "projetos",
    icon: "code",
    category: "Projetos",
    period: "Na prática",
    context: "Desenvolvimento de aplicações",
    title: "Ideias que se tornam aplicações",
    subtitle: "Projetos pessoais",
    description:
      "Aplicações web com React e .NET, conectando interfaces, regras de negócio e dados. Cada projeto é uma oportunidade de experimentar e aprimorar o código.",
    tags: ["React", "C# / .NET", "PostgreSQL"],
    link: { href: "#projetos", label: "Explorar meus projetos" },
    media: {
      src: orbis?.image || null,
      alt: "Visual do projeto Orbis Commerce.",
      caption: "Orbis Commerce · projeto pessoal",
    },
  },
  {
    id: "formacao",
    icon: "education",
    category: "Formação",
    period: "Em andamento",
    context: "Formação acadêmica",
    title: "Gestão da Tecnologia da Informação",
    subtitle: "FATEC Jahu",
    description:
      "Minha formação conecta tecnologia, gestão e modelagem de processos à compreensão dos problemas que o software precisa resolver.",
    tags: ["Tecnologia", "Gestão", "Processos"],
    media: {
      src: "/images/timeline-education.svg",
      alt: "Ilustração de livro e capelo representando a formação em GTI na FATEC Jahu.",
      caption: "Formação em GTI · FATEC Jahu",
    },
  },
];
