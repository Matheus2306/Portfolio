import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, onSelect, onFocusCapture }) {
  return (
    <article
      className="project-card"
      onFocusCapture={onFocusCapture}
    >
      <button
        className="project-image-button"
        onClick={() => onSelect(project)}
        aria-label={`Explorar ${project.name}`}
      >
        <img
          src={project.image}
          alt={`Visual conceitual do projeto ${project.name}`}
          width="960"
          height="640"
          loading="lazy"
        />
        <span className="project-concept">
          CONCEITO / {project.id}
        </span>
        <span className="project-open">
          <ArrowUpRight size={22} />
        </span>
      </button>
      <div className="project-caption">
        <div>
          <span className="micro-text">{project.type}</span>
          <h3>
            <button onClick={() => onSelect(project)}>
              {project.name} <ArrowUpRight size={20} />
            </button>
          </h3>
        </div>
        <span className="project-number">/{project.id}</span>
      </div>
      <p>{project.description}</p>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}
