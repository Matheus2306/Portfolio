import { useRef } from "react";
import { useScroll, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import Reveal from "../ui/Reveal";
import ScrollRevealWord from "../ui/ScrollRevealWord";

export default function About() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start .8", "end .7"],
  });
  const words =
    "A melhor tecnologia é aquela que resolve problemas reais. Eu construo o que faz tudo funcionar.".split(
      " ",
    );
  return (
    <section id="sobre" className="about-section section-shell" ref={ref}>
      <Reveal className="section-kicker">
        <span>01 / SOBRE MIM</span>
        <span>O QUE MOVE O CÓDIGO</span>
      </Reveal>
      <div className="about-layout">
        <div className="about-label">
          <span className="small-blue-line" />
          Menos complexidade.
          <br />
          Mais propósito.
        </div>
        <div>
          <h2 className="reveal-statement">
            {words.map((word, i) => (
              <ScrollRevealWord
                key={i}
                word={word}
                index={i}
                total={words.length}
                progress={scrollYProgress}
                reduced={reduced}
              />
            ))}
          </h2>
          <Reveal className="about-bottom">
            <p>
              Sou Matheus Felipe Rodrigues, desenvolvedor de software com foco
              no universo backend. Meu trabalho conecta regras de negócio, dados
              e pessoas por meio de aplicações web pensadas para evoluir.
            </p>
            <a
              href="#stack"
              className="round-link"
              aria-label="Conheça minha stack"
            >
              <ArrowDown size={24} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
