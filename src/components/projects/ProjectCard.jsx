import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({
  project, onSelect, onFocusCapture, travel, geometry, viewportWidth, cinematic,
}) {
  const image = useRef(null);
  const left = geometry?.left ?? 0;
  const width = Math.max(1, geometry?.width ?? 1);
  const viewport = Math.max(1, viewportWidth);
  const entry = left - viewport;
  const settled = left - viewport * 0.45;
  const clipPath = useTransform(travel, [entry, settled],
    ["inset(0 28% 0 0)", "inset(0 0% 0 0)"]);
  const imageX = useTransform(travel, [entry, left + width], ["-3%", "3%"]);
  const titleY = useTransform(travel, [entry, settled], [14, 0]);
  const titleOpacity = useTransform(travel, [entry, settled], [0.65, 1]);
  const open = (event) => onSelect(project, image.current, event.currentTarget);

  return (
    <article className="project-card" onFocusCapture={onFocusCapture}>
      <button
        ref={image}
        type="button"
        className="project-image-button"
        onClick={open}
        aria-label={`Explorar ${project.name}`}
        aria-haspopup="dialog"
      >
        <motion.div className="project-image-reveal"
          style={cinematic ? { clipPath } : undefined}>
          <motion.div className="project-image-parallax"
            style={cinematic ? { x: imageX, scale: 1.08 } : undefined}>
            <img src={project.image} alt={`Visual do projeto ${project.name}`}
              width="960" height="640" loading="lazy" />
          </motion.div>
        </motion.div>
        <span className="project-concept">PROJETO / {project.id}</span>
        <span className="project-open" aria-hidden="true"><ArrowUpRight size={22} /></span>
      </button>
      <motion.div className="project-caption"
        style={cinematic ? { y: titleY, opacity: titleOpacity } : undefined}>
        <div>
          <span className="micro-text">{project.type}</span>
          <h3>
            <button type="button" onClick={open} aria-haspopup="dialog">
              {project.name} <ArrowUpRight size={20} aria-hidden="true" />
            </button>
          </h3>
        </div>
        <span className="project-number">/{project.id}</span>
      </motion.div>
      <p>{project.description}</p>
      <div className="project-tags">
        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </article>
  );
}
