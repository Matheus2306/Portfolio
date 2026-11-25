import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Code2, GraduationCap, Layers3 } from "lucide-react";
import { timelineMilestones } from "../../data/timeline";
import Reveal from "../ui/Reveal";
import "../../styles/timeline.css";

const milestoneIcons = {
  education: GraduationCap,
  code: Code2,
  architecture: Layers3,
};

function TimelineMilestone({ milestone, index, last, reduced }) {
  const segmentRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: segmentRef,
    offset: ["start 0.7", "end 0.7"],
  });
  const markerBackground = useTransform(
    scrollYProgress,
    [0, 0.08],
    ["#101621", "#28488f"],
  );
  const markerBorder = useTransform(
    scrollYProgress,
    [0, 0.08],
    ["#46516b", "#91acff"],
  );
  const markerColor = useTransform(
    scrollYProgress,
    [0, 0.08],
    ["#9aa9c8", "#ffffff"],
  );
  const Icon = milestoneIcons[milestone.icon] || Code2;
  const headingId = `trajetoria-${milestone.id}-title`;

  return (
    <li
      className={`timeline-milestone${index % 2 ? " is-right" : ""}${last ? " is-last" : ""}`}
    >
      <div className="timeline-segment" ref={segmentRef} aria-hidden="true">
        <motion.span
          className="timeline-segment-fill"
          style={{ scaleY: reduced ? 1 : scrollYProgress }}
        />
      </div>
      <motion.span
        className="timeline-marker"
        aria-hidden="true"
        style={
          reduced
            ? undefined
            : {
                backgroundColor: markerBackground,
                borderColor: markerBorder,
                color: markerColor,
              }
        }
      >
        <Icon size={20} strokeWidth={1.6} />
      </motion.span>
      <div className="timeline-period">
        <span>{milestone.period}</span>
        <span>{milestone.context}</span>
      </div>
      <article className="timeline-card" aria-labelledby={headingId}>
        <span className="timeline-category">{milestone.category}</span>
        <h3 id={headingId}>{milestone.title}</h3>
        <p className="timeline-subtitle">{milestone.subtitle}</p>
        <p className="timeline-description">{milestone.description}</p>
        <ul className="timeline-tags" aria-label="Temas deste marco" role="list">
          {milestone.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        {milestone.link && (
          <a className="timeline-link" href={milestone.link.href}>
            {milestone.link.label}
          </a>
        )}
      </article>
    </li>
  );
}

export default function Timeline() {
  const reduced = useReducedMotion();

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
        <h2 id="timeline-heading">
          Um caminho que continua <span>em construção.</span>
        </h2>
        <p>
          A formação, os projetos e os temas que fazem parte da minha trajetória
          no desenvolvimento de software.
        </p>
      </Reveal>
      <ul className="timeline-list" aria-label="Marcos da minha trajetória" role="list">
        {timelineMilestones.map((milestone, index) => (
          <TimelineMilestone
            key={milestone.id}
            milestone={milestone}
            index={index}
            last={index === timelineMilestones.length - 1}
            reduced={reduced}
          />
        ))}
      </ul>
    </section>
  );
}
