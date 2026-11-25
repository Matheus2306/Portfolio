import { ArrowUp, Code2, Github, Linkedin } from "lucide-react";
import { profile } from "../../data";

export default function Footer() {
  return (
    <footer className="footer section-shell">
      <a className="brand" href="#inicio">
        <Code2 size={19} />
        matheus<span className="blue">.</span>dev
      </a>
      <span>© {new Date().getFullYear()} Matheus Felipe Rodrigues</span>
      <div className="footer-links">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub de Matheus"
        >
          <Github size={18} />
        </a>
        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn de Matheus"
          >
            <Linkedin size={18} />
          </a>
        )}
        <a href="#inicio" aria-label="Voltar ao início">
          <ArrowUp size={18} />
        </a>
      </div>
    </footer>
  );
}
