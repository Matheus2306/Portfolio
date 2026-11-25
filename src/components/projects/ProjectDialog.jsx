import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { Check, ExternalLink, X } from "lucide-react";

const duration = 440;
const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

// Keep the image's own proportions: animate its rectangular frame rather
// than scaling the whole dialog (which would distort the text and artwork).
function frame(element, clippingParent) {
  if (!element?.isConnected) return null;
  const rect = element.getBoundingClientRect();
  const bounds = clippingParent?.getBoundingClientRect();
  const left = Math.max(0, bounds?.left ?? 0, rect.left);
  const top = Math.max(0, bounds?.top ?? 0, rect.top);
  const right = Math.min(window.innerWidth, bounds?.right ?? window.innerWidth, rect.right);
  const bottom = Math.min(window.innerHeight, bounds?.bottom ?? window.innerHeight, rect.bottom);
  if (right - left < 20 || bottom - top < 20) return null;
  return {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    borderRadius: getComputedStyle(element).borderRadius,
    clipPath: `inset(${top - rect.top}px ${rect.right - right}px ${rect.bottom - bottom}px ${left - rect.left}px)`,
  };
}

export default function ProjectDialog({ project, source, trigger, onClose }) {
  const dialog = useRef(null);
  const panel = useRef(null);
  const hero = useRef(null);
  const overlay = useRef(null);
  const closeButton = useRef(null);
  const animations = useRef([]);
  const generation = useRef(0);
  const closing = useRef(false);
  const reduced = useReducedMotion();

  function cancelAnimations() {
    generation.current += 1;
    animations.current.forEach((animation) => animation.cancel());
    animations.current = [];
    if (overlay.current) overlay.current.style.visibility = "hidden";
    if (hero.current) hero.current.style.visibility = "";
  }

  function run(opening) {
    const currentPanel = panel.current;
    const currentDialog = dialog.current;
    if (!currentPanel || !currentDialog) return;
    const panelOpacity = Number(getComputedStyle(currentPanel).opacity);
    const intermediate = overlay.current.style.visibility === "visible"
      ? frame(overlay.current) : null;
    cancelAnimations();
    const version = generation.current;
    const cardFrame = frame(source, source?.closest(".projects-viewport"));
    const heroFrame = frame(hero.current, currentPanel);
    const from = opening ? cardFrame : (intermediate ?? heroFrame);
    const to = opening ? heroFrame : cardFrame;

    if (reduced || typeof currentPanel.animate !== "function") {
      currentDialog.dataset.visible = opening ? "true" : "false";
      if (!opening) onClose();
      return;
    }

    currentDialog.dataset.visible = opening ? "true" : "false";
    const fade = currentPanel.animate(
      [{ opacity: opening ? 0 : panelOpacity }, { opacity: opening ? 1 : 0 }],
      { duration: opening ? 320 : 250, easing, fill: "both" },
    );
    animations.current.push(fade);

    if (from && to && overlay.current.complete && overlay.current.naturalWidth > 0) {
      hero.current.style.visibility = "hidden";
      overlay.current.style.visibility = "visible";
      animations.current.push(overlay.current.animate(
        [from, to], { duration, easing, fill: "both" },
      ));
    }

    Promise.allSettled(animations.current.map((animation) => animation.finished))
      .then(() => {
        if (version !== generation.current) return;
        cancelAnimations();
        if (!opening) onClose();
      });
  }

  function requestClose() {
    if (closing.current) return;
    closing.current = true;
    run(false);
  }

  useLayoutEffect(() => {
    const element = dialog.current;
    const root = document.documentElement;
    const previousOverflow = document.body.style.overflow;
    const previousGutter = root.style.scrollbarGutter;
    const previousFocus = trigger ?? document.activeElement;
    closing.current = false;
    root.style.scrollbarGutter = "stable";
    document.body.style.overflow = "hidden";
    element.showModal();
    closeButton.current?.focus({ preventScroll: true });
    run(true);

    return () => {
      cancelAnimations();
      if (element.open) element.close();
      document.body.style.overflow = previousOverflow;
      root.style.scrollbarGutter = previousGutter;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
    // The selected project and the source element define one dialog lifetime.
  }, [project, source, trigger, reduced]);

  return (
    <dialog
      ref={dialog}
      className="project-dialog project-dialog-expanded"
      aria-labelledby="project-dialog-title"
      onCancel={(event) => { event.preventDefault(); requestClose(); }}
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <div ref={panel} className="dialog-panel">
        <div className="dialog-toolbar">
          <span className="micro-text">PROJETO / {project.id}</span>
          <button ref={closeButton} type="button" className="dialog-close"
            onClick={requestClose} aria-label="Fechar projeto">
            <X size={22} />
          </button>
        </div>
        <div className="dialog-hero">
          <img ref={hero} src={project.image} alt={`Visual do projeto ${project.name}`}
            width="960" height="640" />
        </div>
        <div className="dialog-content">
          <div className="dialog-overview">
            <span className="micro-text">{project.type}</span>
            <h2 id="project-dialog-title">{project.name}</h2>
            <p>{project.detail}</p>
            <h3>Tecnologias</h3>
            <div className="project-tags">
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="dialog-actions">
              {project.links.github && (
                <a className="button button-primary" href={project.links.github}
                  target="_blank" rel="noreferrer">
                  Ver repositório <ExternalLink size={16} />
                </a>
              )}
              {project.links.deploy && (
                <a className="button dialog-secondary" href={project.links.deploy}
                  target="_blank" rel="noreferrer">
                  Acessar projeto <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
          <div className="dialog-features">
            <h3>Funcionalidades</h3>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}><Check size={16} aria-hidden="true" />{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <img ref={overlay} className="dialog-transition-image"
        src={project.image} alt="" aria-hidden="true" />
    </dialog>
  );
}
