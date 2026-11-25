import { motion, useTransform } from "motion/react";

export default function ScrollRevealWord({ word, index, total, progress, reduced }) {
  const opacity = useTransform(
    progress,
    [(index / total) * 0.8, ((index + 1) / total) * 0.8],
    [0.17, 1],
  );
  return (
    <motion.span style={{ opacity: reduced ? 1 : opacity }}>
      {word}{" "}
    </motion.span>
  );
}
