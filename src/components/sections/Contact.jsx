import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { profile } from "../../data";
import Reveal from "../ui/Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const timeout = useRef(null);
  useEffect(() => () => clearTimeout(timeout.current), []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <section id="contato" className="contact-section section-shell">
      <div className="contact-glow" aria-hidden="true" />
      <Reveal>
        <div className="section-kicker">
          <span>05 / VAMOS CONVERSAR</span>
          <span>
            <span className="status-dot" /> CONEXÕES CRIAM POSSIBILIDADES
          </span>
        </div>
        <h2>
          Seu próximo projeto
          <br />
          começa com um{" "}
          <a href={`mailto:${profile.email}`}>
            olá.
            <ArrowUpRight />
          </a>
        </h2>
        <div className="contact-bottom">
          <p>
            Tem uma ideia, um desafio ou uma oportunidade?
            <br />
            Vamos construir algo que faça a diferença.
          </p>
          <div>
            <div className="email-row">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button onClick={copyEmail} aria-label="Copiar e-mail">
                {copied ? <Check size={19} /> : <Copy size={18} />}
              </button>
            </div>
            <span className="copy-feedback" role="status">
              {copied
                ? "E-mail copiado!"
                : copyError
                  ? `Copie manualmente: ${profile.email}`
                  : ""}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
