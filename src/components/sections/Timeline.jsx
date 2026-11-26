import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import { Code2, GraduationCap, Layers3 } from "lucide-react";
import { timelineMilestones } from "../../data/timeline";
import Reveal from "../ui/Reveal";
import "../../styles/timeline.css";

const milestoneIcons = {
  education: GraduationCap,
  code: Code2,
  architecture: Layers3,
};

function useTimelineReading(routeRef, reduced, count) {
  const progress = useMotionValue(reduced ? 1 : 0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rail, setRail] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const route = routeRef.current;
    if (!route) return;

    const points = Array.from(route.querySelectorAll(".timeline-point"));
    const anchors = Array.from(route.querySelectorAll("[data-timeline-anchor] .timeline-point"));
    if (!points.length) return;

    let frame = 0;
    let cancelled = false;
    let currentIndex = -1;

    const update = () => {
      frame = 0;
      if (cancelled) return;

      const routeBox = route.getBoundingClientRect();
      const first = points[0].getBoundingClientRect();
      const last = points[points.length - 1].getBoundingClientRect();
      const start = first.top + first.height / 2;
      const end = last.top + last.height / 2;
      const top = start - routeBox.top;
      const height = Math.max(0, end - start);
      const readingLine = window.innerHeight * 0.55;

      setRail((previous) =>
        Math.abs(previous.top - top) < 0.5 &&
        Math.abs(previous.height - height) < 0.5
          ? previous
          : { top, height },
      );
      progress.set(reduced ? 1 : Math.max(0, Math.min(1, (readingLine - start) / (height || 1))));

      // The image and the event highlight share the same reading line.
      let nextIndex = 0;
      for (let index = 0; index < anchors.length; index += 1) {
        const point = anchors[index].getBoundingClientRect();
        if (point.top + point.height / 2 > readingLine) break;
        nextIndex = index;
      }
      if (nextIndex !== currentIndex) {
        currentIndex = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const schedule = () => {
      if (!cancelled && !frame) frame = requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(route);
    route.querySelectorAll(".timeline-period, .timeline-event").forEach((element) => observer.observe(element));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule);
    schedule();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [routeRef, reduced, count, progress]);

  return { activeIndex, progress, rail };
}

function TimelineVisual({ milestone, active = true, preview = false }) {
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = milestoneIcons[milestone.icon] || Code2;
  const media = milestone.media;

  return (
    <figure
      className={"timeline-window" + (preview ? " timeline-preview-slide" : "") + (active ? " is-visible" : "")}
      aria-hidden={preview && !active ? true : undefined}
    >
      <div className="timeline-window-bar" aria-hidden="true">
        <span className="timeline-window-controls"><i /><i /><i /></span>
        <span>{milestone.subtitle}</span>
        <span className="timeline-window-glyph"><Code2 size={16} /></span>
      </div>
      <div className="timeline-window-media">
        {media?.src && !imageFailed ? (
          <img
            src={media.src}
            alt={media.alt}
            width="1200"
            height="760"
            loading={preview ? "eager" : "lazy"}
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="timeline-visual-fallback">
            <Icon size={52} strokeWidth={1.2} aria-hidden="true" />
            <span>{milestone.subtitle}</span>
          </div>
        )}
      </div>
      <figcaption>{media?.caption || milestone.title}</figcaption>
    </figure>
  );
}

function TimelineMilestone({ milestone, active }) {
  const Icon = milestoneIcons[milestone.icon] || Code2;
  const headingId = "trajetoria-" + milestone.id + "-title";

  return (
    <li className={"timeline-milestone" + (active ? " is-current" : "")}>
      <div className="timeline-period">
        <span className="timeline-point" aria-hidden="true" />
        <span>{milestone.period}</span>
      </div>
      <article className="timeline-event" data-timeline-anchor aria-labelledby={headingId}>
        <span className="timeline-point" aria-hidden="true" />
        <div className="timeline-meta">
          <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
          <span>{milestone.subtitle}</span>
        </div>
        <h3 id={headingId}>{milestone.title}</h3>
        <p className="timeline-context">{milestone.category} · {milestone.context}</p>
        <p className="timeline-description">{milestone.description}</p>
        <ul className="timeline-tags" aria-label="Temas deste marco" role="list">
          {milestone.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        {milestone.link && (
          <a className="timeline-link" href={milestone.link.href}>
            {milestone.link.label}
          </a>
        )}
        <div className="timeline-inline">
          <TimelineVisual milestone={milestone} />
        </div>
      </article>
    </li>
  );
}

export default function Timeline() {
  const routeRef = useRef(null);
  const reduced = useReducedMotion();
  const { activeIndex, progress, rail } = useTimelineReading(
    routeRef,
    reduced,
    timelineMilestones.length,
  );

  return (
    <section
      id="trajetoria"
      className="timeline-section section-shell"
      aria-labelledby="timeline-heading"
    >
      <div className="section-kicker">
        <span>02 / TRAJETÓRIA</span>
        <span>FORMAÇÃO & PRÁTICA</span>
      </div>
      <Reveal className="timeline-heading">
        <h2 id="timeline-heading">Minha <span>trajetória.</span></h2>
        <p>A formação e os projetos que fazem parte do meu caminho na tecnologia.</p>
      </Reveal>
      <div className="timeline-layout">
        <div className="timeline-route" ref={routeRef}>
          <div className="timeline-rail" aria-hidden="true" style={rail}>
            <motion.span className="timeline-rail-fill" style={{ scaleY: progress }} />
          </div>
          <ul className="timeline-list" aria-label="Marcos da minha trajetória" role="list">
            {timelineMilestones.map((milestone, index) => (
              <TimelineMilestone
                key={milestone.id}
                milestone={milestone}
                active={index === activeIndex}
              />
            ))}
          </ul>
        </div>
        <div className="timeline-preview" aria-label="Visual do marco em leitura">
          <div className="timeline-preview-slides">
            {timelineMilestones.map((milestone, index) => (
              <TimelineVisual
                key={milestone.id}
                milestone={milestone}
                active={index === activeIndex}
                preview
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
