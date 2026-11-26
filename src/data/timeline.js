import { projects } from "../data.js";

const orbis = projects.find((project) => project.name === "Orbis Commerce");

// Keep the supplied milestone order and labels. Replace period only with real dates.
// media supplies the image, accessible alternative and caption for the scroll preview.
export const timelineMilestones = [
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
