import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Braces, Code2, Database, GitBranch, Layers3, Network, Zap } from "lucide-react";
import { stackConnections, stackFoundations, stackNodes } from "../../data/stack";
import { connectionPath } from "../stack/connection-path";
import Reveal from "../ui/Reveal";
import "../../styles/stack-connections.css";

const icons = { interface: Code2, backend: Braces, mapping: Layers3, database: Database, cache: Zap };
const compactQuery = "(max-width: 760px)";

function useCompactStack() {
  const [compact, setCompact] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(compactQuery).matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia(compactQuery);
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return compact;
}

function useConnections(stageRef, nodeRefs, compact, selected) {
  const [geometry, setGeometry] = useState({ width: 1, height: 1, paths: [] });

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let frame = 0;
    let disposed = false;

    const measure = () => {
      if (disposed) return;
      const bounds = stage.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const rectangles = {};

      for (const node of stackNodes) {
        const element = nodeRefs.current[node.id];
        if (!element) return;
        const rect = element.getBoundingClientRect();
        rectangles[node.id] = {
          x: rect.left - bounds.left,
          y: rect.top - bounds.top,
          width: rect.width,
          height: rect.height,
        };
      }

      const next = {
        width: bounds.width,
        height: bounds.height,
        paths: stackConnections.map((connection) => ({
          ...connection,
          d: connectionPath(rectangles[connection.from], rectangles[connection.to], {
            compact,
            branch: connection.to === "cache",
          }),
        })),
      };
      setGeometry((previous) => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };

    const schedule = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    observer?.observe(stage);
    Object.values(nodeRefs.current).forEach((node) => node && observer?.observe(node));
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [stageRef, nodeRefs, compact, selected]);

  return geometry;
}

function StackDetails({ node, id, onSelect }) {
  const related = stackConnections.filter((edge) => edge.from === node.id || edge.to === node.id);

  return (
    <section className="stack-details" id={id} aria-labelledby={`${id}-title`}>
      <div className="stack-detail-copy" aria-live="polite" aria-atomic="true">
        <span className="stack-overline">{node.category}</span>
        <h3 id={`${id}-title`}>{node.heading}</h3>
        <p>{node.description}</p>
        <span className="stack-example">{node.example}</span>
      </div>
      <div className="stack-detail-connections">
        <h4>Conexões</h4>
        <ul>
          {related.map((edge) => {
            const other = stackNodes.find((item) => item.id === (edge.from === node.id ? edge.to : edge.from));
            return (
              <li key={edge.id}>
                <button type="button" onClick={() => onSelect(other.id)} aria-label={`Explorar ${other.name}: ${edge.label}`}>
                  <span>{other.name}</span>
                  <span>{edge.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default function Stack() {
  const [selected, setSelected] = useState("backend");
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const [entered, setEntered] = useState(false);
  const surfaceRef = useRef(null);
  const stageRef = useRef(null);
  const nodeRefs = useRef({});
  const pendingFocus = useRef(null);
  const detailId = useId();
  const compact = useCompactStack();
  const reduced = useReducedMotion();
  const inView = useInView(surfaceRef, { amount: 0.15 });
  const geometry = useConnections(stageRef, nodeRefs, compact, selected);
  const highlighted = hovered ?? focused ?? selected;
  const current = stackNodes.find((node) => node.id === selected);
  const connected = new Set([highlighted]);

  stackConnections.forEach((edge) => {
    if (edge.from === highlighted) connected.add(edge.to);
    if (edge.to === highlighted) connected.add(edge.from);
  });

  useEffect(() => {
    if (inView) setEntered(true);
  }, [inView]);

  useLayoutEffect(() => {
    const id = pendingFocus.current;
    if (!id) return;
    pendingFocus.current = null;
    // Focus after the inline panel moves, using the node's final position.
    nodeRefs.current[id]?.focus({ preventScroll: !compact });
  }, [selected, compact]);

  const selectRelated = (id) => {
    pendingFocus.current = id;
    setSelected(id);
    setHovered(null);
  };

  return (
    <section id="stack" className="stack-section stack-connected section-shell" aria-labelledby="stack-heading">
      <Reveal className="stack-heading-row">
        <div>
          <div className="section-kicker"><span>03 / TECNOLOGIAS</span></div>
          <h2 id="stack-heading">A stack certa.<br />Tudo <span className="blue">conectado.</span></h2>
        </div>
        <div className="stack-introduction">
          <p>Da interface à persistência, cada ferramenta tem um papel. O cuidado está em como elas trabalham juntas.</p>
          <span>Selecione uma tecnologia e explore suas conexões.</span>
        </div>
      </Reveal>

      <div className="stack-map" ref={surfaceRef} data-entered={entered || reduced} data-in-view={inView}>
        <div className="stack-map-heading">
          <span><Network size={17} aria-hidden="true" /> COMO CONECTO AS FERRAMENTAS</span>
          <span>Backend como ponto de encontro.</span>
        </div>

        <div className="stack-diagram" ref={stageRef}>
          <svg className="stack-connections" viewBox={`0 0 ${geometry.width} ${geometry.height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
            {geometry.paths.map((edge, index) => {
              const active = edge.from === highlighted || edge.to === highlighted;
              return (
                <g key={edge.id} className={active ? "stack-connection is-highlighted" : "stack-connection"}>
                  <path className="stack-connection-base" d={edge.d} />
                  <path className="stack-connection-reveal" d={edge.d} pathLength="1" style={{ transitionDelay: `${index * 80}ms` }} />
                  {active && entered && !reduced && (
                    <path key={`${edge.id}-${highlighted}`} className="stack-connection-signal" d={edge.d} pathLength="1" style={{ animationDelay: `${index * 100}ms` }} />
                  )}
                </g>
              );
            })}
          </svg>

          <ul className="stack-nodes" aria-label="Tecnologias conectadas">
            {stackNodes.map((node) => {
              const Icon = icons[node.id];
              const isSelected = selected === node.id;
              const panelId = compact ? `${detailId}-${node.id}` : detailId;
              return (
                <li key={node.id} className={`stack-node-slot stack-node-slot-${node.id}`}>
                  <button
                    ref={(element) => { nodeRefs.current[node.id] = element; }}
                    type="button"
                    className={`stack-node${isSelected ? " is-selected" : ""}${connected.has(node.id) ? " is-connected" : ""}`}
                    aria-pressed={isSelected}
                    aria-controls={!compact || isSelected ? panelId : undefined}
                    onClick={() => setSelected(node.id)}
                    onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(node.id); }}
                    onPointerLeave={() => setHovered(null)}
                    onFocus={() => setFocused(node.id)}
                    onBlur={() => setFocused(null)}
                  >
                    <span className="stack-node-top"><Icon size={21} strokeWidth={1.5} aria-hidden="true" /><span>{node.category}</span></span>
                    <span className="stack-node-title">{node.name}</span>
                    <span className="stack-node-subtitle">{node.subtitle}</span>
                  </button>
                  {compact && isSelected && <StackDetails node={node} id={panelId} onSelect={selectRelated} />}
                </li>
              );
            })}
          </ul>

          <div className="stack-map-caption" aria-hidden="true">
            <span className="stack-caption-rule" />
            <span>Uma base.<br /><strong>Muitas possibilidades.</strong></span>
          </div>
        </div>

        {!compact && <StackDetails node={current} id={detailId} onSelect={selectRelated} />}
        <p className="stack-map-note">Mapa de tecnologias que utilizo. As combinações variam por projeto; PostgreSQL e SQL Server são alternativas de persistência.</p>
      </div>

      <div className="stack-foundations">
        <div className="stack-foundation-heading"><GitBranch size={19} strokeWidth={1.5} aria-hidden="true" /><h3>A base de cada entrega</h3></div>
        <ul>
          {stackFoundations.map((item) => <li key={item.name}><span>{item.name}</span><span>{item.role}</span></li>)}
        </ul>
      </div>
    </section>
  );
}

