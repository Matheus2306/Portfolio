import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from "motion/react";
import { ArrowRight } from "lucide-react";
import { projects } from "../../data";
import ProjectCard from "../projects/ProjectCard";
import ProjectDialog from "../projects/ProjectDialog";

export default function Projects() {
  const [project, setProject] = useState(null);
  const ref = useRef(null);
  const track = useRef(null);
  const reduced = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [height, setHeight] = useState(null);
  const [horizontal, setHorizontal] = useState(false);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  useMotionValueEvent(scrollYProgress, "change", (value) =>
    setActive(
      Math.min(projects.length - 1, Math.floor(value * projects.length)),
    ),
  );
  useEffect(() => {
    const resize = () => {
      const enabled = window.innerWidth >= 900 && !reduced;
      const viewport = track.current?.parentElement;
      const styles = viewport ? getComputedStyle(viewport) : null;
      const padding = styles
        ? parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight)
        : 0;
      const d = Math.max(
        0,
        (track.current?.scrollWidth ?? 0) -
          (viewport?.clientWidth ?? 0) +
          padding,
      );
      setHorizontal(enabled);
      setDistance(d);
      setHeight(enabled ? d + window.innerHeight : null);
    };
    resize();
    const observer = new ResizeObserver(resize);
    if (track.current) observer.observe(track.current);
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);
  return (
    <>
      <section
        id="projetos"
        ref={ref}
        className={`projects-section ${horizontal ? "is-horizontal" : ""}`}
        style={{ height: height ?? "auto" }}
      >
        <div className="projects-sticky">
          <div className="section-shell projects-heading">
            <div>
              <div className="section-kicker">
                <span>02 / PROJETOS SELECIONADOS</span>
              </div>
              <h2>
                Ideias que viram <span className="serif-word">sistemas.</span>
              </h2>
            </div>
            <div className="project-scroll-note">
              <span>EXPLORE OS CONCEITOS</span>
              <span>
                {horizontal
                  ? "Continue rolando para explorar"
                  : "Conheça cada projeto"}{" "}
                <ArrowRight size={17} />
              </span>
            </div>
          </div>
          <div className="projects-viewport">
            <motion.div
              className="projects-track"
              ref={track}
              style={{ x: horizontal ? x : 0 }}
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setProject}
                  onFocusCapture={(event) => {
                    if (!horizontal) return;
                    const card = event.currentTarget.getBoundingClientRect();
                    if (card.left < 0 || card.right > window.innerWidth) {
                      window.scrollTo({
                        top:
                          ref.current.offsetTop +
                          Math.min(distance, index * (card.width + 30)),
                        behavior: "instant",
                      });
                    }
                  }}
                />
              ))}
            </motion.div>
          </div>
          <div className="section-shell projects-bottom">
            <div className="projects-progress" aria-hidden="true">
              {projects.map((p, i) => (
                <span key={p.id} className={active === i ? "selected" : ""} />
              ))}
            </div>
            <span>
              PROJETOS DEMONSTRATIVOS <span className="blue">/</span> EXPLORANDO
              POSSIBILIDADES
            </span>
            <span className="project-count">
              0{active + 1}
              <span> / {String(projects.length).padStart(2, "0")}</span>
            </span>
          </div>
        </div>
      </section>
      {project && (
        <ProjectDialog project={project} onClose={() => setProject(null)} />
      )}
    </>
  );
}
