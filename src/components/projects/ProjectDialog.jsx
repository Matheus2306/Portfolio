import { useEffect, useRef } from "react";
import { Check, ExternalLink, X } from "lucide-react";

export default function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!project) return;
    const focused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      focused?.focus();
    };
  }, [project]);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="dialog-inner">
          <button
            className="dialog-close"
            onClick={onClose}
            aria-label="Fechar projeto"
          >
            <X size={22} />
          </button>
          <img
            src={project.image}
            alt={`Arte conceitual de ${project.name}`}
            width="960"
            height="640"
          />
          <div className="dialog-content">
            <span className="micro-text">ESTUDO CONCEITUAL / {project.id}</span>
            <h2 id="project-dialog-title">{project.name}</h2>
            <p>{project.detail}</p>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p className="concept-disclaimer">
              Projeto demonstrativo para ilustrar possibilidades da stack. Não
              representa um case entregue.
            </p>
            {project.links.github && (
              <a
                className="text-link"
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
              >
                Conheça meu GitHub <ExternalLink size={16} />
              </a>
            )}
            {project.links.deploy && (
              <a
                className="text-link"
                href={project.links.deploy}
                target="_blank"
                rel="noreferrer"
              >
                Conheça o deploy <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
