import { Braces, Database, Layers3, Terminal } from "lucide-react";
import Reveal from "../ui/Reveal";

const stack = [
  {
    icon: Braces,
    title: "Backend é meu território.",
    description:
      "Da regra de negócio à resposta da API. Aplicações organizadas, legíveis e prontas para crescer.",
    tags: ["C#", ".NET", "ASP.NET Core", "Entity Framework"],
    label: "01 / DESENVOLVIMENTO",
  },
  {
    icon: Database,
    title: "Dados com estrutura e sentido.",
    description:
      "Modelagem cuidadosa, consultas eficientes e integrações que levam a informação ao lugar certo.",
    tags: ["SQL Server", "PostgreSQL", "Redis", "APIs REST"],
    label: "02 / DADOS & INTEGRAÇÕES",
  },
  {
    icon: Layers3,
    title: "A base faz a diferença.",
    description:
      "Responsabilidades bem definidas e ferramentas que tornam cada entrega mais consistente.",
    tags: ["Clean Architecture", "SOLID", "Docker", "Git"],
    label: "03 / ARQUITETURA & ENTREGA",
  },
];

export default function Stack() {
  return (
    <section id="stack" className="stack-section section-shell">
      <div className="stack-sidebar">
        <div className="section-kicker">
          <span>03 / TECNOLOGIAS</span>
        </div>
        <h2>
          A stack certa.
          <br />
          Uma base <span className="blue">sólida.</span>
        </h2>
        <p>
          Ferramentas mudam.
          <br />O cuidado com a engenharia permanece.
        </p>
        <div className="stack-art">
          <img
            src="/images/data-flow.gif"
            alt="Animação de fluxo de dados entre camadas de um sistema"
            width="480"
            height="320"
            loading="lazy"
          />
          <span>
            <Terminal size={13} /> ALWAYS BUILDING_
          </span>
        </div>
      </div>
      <div className="stack-items">
        {stack.map(({ icon: Icon, ...item }) => (
          <Reveal key={item.title} className="stack-item">
            <div className="stack-item-top">
              <span className="stack-icon">
                <Icon size={23} strokeWidth={1.4} />
              </span>
              <span className="micro-text">{item.label}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="stack-tags">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
