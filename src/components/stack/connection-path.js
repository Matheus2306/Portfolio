// All coordinates use the diagram's local space. Mobile routes use the left
// gutter so an expanded explanation never has a connection drawn across it.
export function connectionPath(from, to, { compact = false, branch = false } = {}) {
  const n = (value) => Math.round(value * 100) / 100;
  if (compact) {
    const x1 = n(from.x);
    const y1 = n(from.y + from.height / 2);
    const x2 = n(to.x);
    const y2 = n(to.y + to.height / 2);
    const lane = branch ? 6 : 22;
    const radius = Math.min(8, (y2 - y1) / 3, (Math.min(x1, x2) - lane) / 2);
    return `M ${x1} ${y1} H ${lane + radius} Q ${lane} ${y1} ${lane} ${y1 + radius} V ${y2 - radius} Q ${lane} ${y2} ${lane + radius} ${y2} H ${x2}`;
  }

  if (branch) {
    const x1 = n(from.x + from.width / 2);
    const y1 = n(from.y + from.height);
    const x2 = n(to.x + to.width / 2);
    const y2 = n(to.y);
    const middle = n((y1 + y2) / 2);
    return `M ${x1} ${y1} C ${x1} ${middle}, ${x2} ${middle}, ${x2} ${y2}`;
  }

  const x1 = n(from.x + from.width);
  const y1 = n(from.y + from.height / 2);
  const x2 = n(to.x);
  const y2 = n(to.y + to.height / 2);
  const middle = n((x1 + x2) / 2);
  return `M ${x1} ${y1} C ${middle} ${y1}, ${middle} ${y2}, ${x2} ${y2}`;
}
