import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Reveal from "../ui/Reveal";
import "../../styles/process-story.css";

const steps = [
  {
    id: "entender",
    number: "01",
    title: "Entender",
    text: "Ouvir, fazer boas perguntas e encontrar o problema que realmente precisa ser resolvido.",
    focus: ["Contexto", "Objetivo", "Restrições"],
  },
  {
    id: "estruturar",
    number: "02",
    title: "Estruturar",
    text: "Desenhar o domínio, conectar as peças e escolher o caminho mais simples que faz sentido.",
    focus: ["Domínio", "Responsabilidades", "Integrações"],
  },
  {
    id: "construir",
    number: "03",
    title: "Construir & evoluir",
    text: "Transformar decisões em código, validar o comportamento e melhorar a cada iteração.",
    focus: ["Código", "Testes", "Feedback"],
  },
];

function ProcessStep({ step, last, reduced }) {
  const segmentRef = useRef(null);
  // The segment starts at this marker and ends at the next one. Its height
  // follows the item's real content, including wrapping and font changes.
  const { scrollYProgress } = useScroll({
    target: segmentRef,
    offset: ["start 0.6", "end 0.6"],
  });
  const markerBackground = useTransform(scrollYProgress, [0, 0.08], ["#101827", "#294ba1"]);
  const markerBorder = useTransform(scrollYProgress, [0, 0.08], ["#465575", "#82a1ff"]);
  const markerColor = useTransform(scrollYProgress, [0, 0.08], ["#aab8d3", "#ffffff"]);
  const headingColor = useTransform(scrollYProgress, [0, 0.12], ["#bac5db", "#f0f4ff"]);

  return (
    <li
      id={`processo-${step.id}`}
      className={`process-story-step${last ? " is-last" : ""}`}
      aria-labelledby={`processo-${step.id}-title`}
    >
      <div className="process-story-segment" ref={segmentRef} aria-hidden="true">
        <motion.span
          className="process-story-line-fill"
          style={{ scaleY: reduced ? 1 : scrollYProgress }}
        />
      </div>

      <motion.span
        className="process-story-marker"
        aria-hidden="true"
        style={{
          backgroundColor: reduced ? "#294ba1" : markerBackground,
          borderColor: reduced ? "#82a1ff" : markerBorder,
          color: reduced ? "#ffffff" : markerColor,
        }}
      >
        {step.number}
      </motion.span>

      <div className="process-story-content">
        <span className="process-story-eyebrow">ETAPA {step.number}</span>
        <motion.h3
          id={`processo-${step.id}-title`}
          style={{ color: reduced ? "#f0f4ff" : headingColor }}
        >
          {step.title}
        </motion.h3>
        <p>{step.text}</p>
        <ul className="process-story-focus" aria-label="Foco desta etapa">
          {step.focus.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </li>
  );
}

export default function Process() {
  const reduced = useReducedMotion();

  return (
    <section
      id="processo"
      className="process-section process-story section-shell"
      aria-labelledby="process-heading"
    >
      <div className="section-kicker">
        <span>05 / COMO EU PENSO</span>
        <span>DO PROBLEMA À SOLUÇÃO</span>
      </div>

      <div className="process-story-layout">
        <div className="process-story-intro">
          <Reveal>
            <h2 id="process-heading">
              Antes de escrever código,
              <br />
              <span className="process-story-heading-accent">entender o porquê.</span>
            </h2>
            <p>
              Um processo que começa na pergunta e continua depois da primeira entrega.
            </p>
          </Reveal>
          <div className="process-story-signature" aria-hidden="true">
            <span />
            <span>CLAREZA EM CADA ETAPA</span>
          </div>
        </div>

        <ol className="process-story-steps" aria-label="Etapas do meu processo de desenvolvimento">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.id}
              step={step}
              last={index === steps.length - 1}
              reduced={reduced}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

