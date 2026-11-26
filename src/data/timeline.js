import { projects } from "../data.js";

const orbis = projects.find((project) => project.name === "Orbis Commerce");

// These labels describe current milestones, not an inferred chronology.
// Replace `period` with real dates when they are supplied, for example
// "2024 — atual". Keep the list in the reading order you want to present.
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
  },
];
