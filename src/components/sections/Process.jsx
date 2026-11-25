import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";

export default function Process() {
  return (
    <section className="process-section section-shell">
      <Reveal>
        <div className="section-kicker">
          <span>04 / COMO EU PENSO</span>
          <span>DO PROBLEMA À SOLUÇÃO</span>
        </div>
        <h2>
          Antes de escrever código,
          <br />
          <span className="muted">entender o porquê.</span>
        </h2>
      </Reveal>
      <div className="process-grid">
        {[
          {
            n: "01",
            title: "Entender",
            text: "Ouvir, fazer boas perguntas e encontrar o problema que realmente precisa ser resolvido.",
          },
          {
            n: "02",
            title: "Estruturar",
            text: "Desenhar o domínio, conectar as peças e escolher o caminho mais simples que faz sentido.",
          },
          {
            n: "03",
            title: "Construir & evoluir",
            text: "Transformar decisões em código, validar o comportamento e melhorar a cada iteração.",
          },
        ].map((item, i) => (
          <Reveal className="process-step" key={item.n} delay={i * 0.12}>
            <span>
              {item.n}
              <ArrowRight size={18} />
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
