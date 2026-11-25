import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { projects } from "../../data";
import ProjectCard from "../projects/ProjectCard";
import ProjectDialog from "../projects/ProjectDialog";

const emptyLayout = { distance: 0, viewport: 0, cards: [], stops: [] };
const ambient = ["#365ba9", "#216f86", "#474a9f", "#375c9b", "#227b90", "#414c9a"];

function activeIndex(stops, position) {
  if (!stops.length) return 0;
  if (position >= stops[stops.length - 1] - 1) return stops.length - 1;
  return stops.reduce(
    (best, stop, i) =>
      Math.abs(stop - position) < Math.abs(stops[best] - position) ? i : best,
    0,
  );
}

function ProgressSegment({ index, layout, travel, selected, project, onNavigate }) {
  const stop = layout.stops[index] ?? 0;
  const start = index === 0 ? 0 : ((layout.stops[index - 1] ?? 0) + stop) / 2;
  const end = index === layout.stops.length - 1
    ? layout.distance
    : (stop + (layout.stops[index + 1] ?? stop)) / 2;
  const scaleX = useTransform(travel, [start, Math.max(start + 1, end)], [0, 1]);

  return (
    <button
      type="button"
      className={selected ? "selected" : ""}
      aria-label={`Ir para ${project.name}`}
      aria-current={selected ? "step" : undefined}
      title={project.name}
      onClick={() => onNavigate(index)}
    >
      <span className="project-progress-rail" aria-hidden="true">
        <motion.span className="project-progress-fill" style={{ scaleX }} />
      </span>
    </button>
  );
}

export default function Projects() {
  const [selection, setSelection] = useState(null);
  const section = useRef(null);
  const viewport = useRef(null);
  const track = useRef(null);
  const reduced = useReducedMotion();
  const [horizontal, setHorizontal] = useState(false);
  const [layout, setLayout] = useState(emptyLayout);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const travel = useTransform(scrollYProgress, [0, 1], [0, layout.distance]);
  const x = useTransform(travel, (value) => -value);

  // Degrade to the normal document flow on mobile, short viewports and
  // devices whose users prefer reduced motion.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px) and (min-height: 700px)");
    const update = () => setHorizontal(media.matches && !reduced);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [reduced]);

  useLayoutEffect(() => {
    if (!horizontal) {
      setLayout(emptyLayout);
      setActive(0);
      return;
    }

    const measure = () => {
      const rail = track.current;
      const frame = viewport.current;
      if (!rail || !frame) return;
      const style = getComputedStyle(frame);
      const available = frame.clientWidth - parseFloat(style.paddingLeft)
        - parseFloat(style.paddingRight);
      const distance = Math.max(0, rail.scrollWidth - available);
      const cards = Array.from(rail.children, (card) => ({
        left: card.offsetLeft,
        width: card.offsetWidth,
      }));
      const stops = cards.map(({ left }) => Math.min(distance, left));
      const next = { distance, viewport: available, cards, stops };
      setLayout((previous) =>
        JSON.stringify(previous) === JSON.stringify(next) ? previous : next,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track.current);
    observer.observe(viewport.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [horizontal]);

  useMotionValueEvent(travel, "change", (value) => {
    if (horizontal) setActive(activeIndex(layout.stops, value));
  });
  useEffect(() => {
    if (horizontal) setActive(activeIndex(layout.stops, travel.get()));
  }, [horizontal, layout, travel]);

  const navigate = useCallback((index, behavior = "smooth") => {
    if (!horizontal || !section.current) return;
    const start = section.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: start + (layout.stops[index] ?? 0), behavior });
  }, [horizontal, layout.stops]);

  const select = useCallback((project, source, trigger) => {
    setSelection({ project, source, trigger });
  }, []);
  const close = useCallback(() => setSelection(null), []);

  return (
    <>
      <section
        id="projetos"
        ref={section}
        className={`projects-section ${horizontal ? "is-horizontal" : ""}`}
        style={{ height: horizontal ? `calc(100svh + ${layout.distance}px)` : "auto" }}
      >
        <div className="projects-sticky">
          <div className="project-ambient" aria-hidden="true"
            style={{ color: ambient[active % ambient.length] }} />
          <div className="section-shell projects-heading">
            <div>
              <div className="section-kicker">
                <span>03 / PROJETOS SELECIONADOS</span>
              </div>
              <h2>Ideias que viram <span className="serif-word">sistemas.</span></h2>
            </div>
            <div className="project-scroll-note">
              <span>EXPLORE OS PROJETOS</span>
              <span>
                {horizontal ? "Continue rolando para explorar" : "Conheça cada projeto"}{" "}
                <ArrowRight size={17} />
              </span>
            </div>
          </div>
          <div className="projects-viewport" ref={viewport}>
            <motion.div className="projects-track" ref={track} style={{ x: horizontal ? x : 0 }}>
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={select}
                  travel={travel}
                  geometry={layout.cards[index]}
                  viewportWidth={layout.viewport}
                  cinematic={horizontal && layout.viewport > 0}
                  onFocusCapture={(event) => {
                    if (!horizontal) return;
                    const card = event.currentTarget.getBoundingClientRect();
                    const frame = viewport.current.getBoundingClientRect();
                    if (card.left < frame.left || card.right > frame.right) {
                      navigate(index, "instant");
                    }
                  }}
                />
              ))}
            </motion.div>
          </div>
          <div className="section-shell projects-bottom">
            {horizontal && (
              <nav className="projects-progress" aria-label="Navegar pelos projetos">
                {projects.map((project, index) => (
                  <ProgressSegment key={project.id} index={index}
                    project={project} layout={layout} travel={travel}
                    selected={active === index} onNavigate={navigate} />
                ))}
              </nav>
            )}
            <span>PROJETOS SELECIONADOS <span className="blue">/</span> EXPLORANDO POSSIBILIDADES</span>
            {horizontal && (
              <span className="project-count">
                {String(active + 1).padStart(2, "0")}
                <span> / {String(projects.length).padStart(2, "0")}</span>
              </span>
            )}
          </div>
        </div>
      </section>
      {selection && <ProjectDialog {...selection} onClose={close} />}
    </>
  );
}
