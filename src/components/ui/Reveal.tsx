import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  /** Décalage avant l'apparition. */
  delay?: number;
  /** Déclenche une fois (par défaut) ou à chaque entrée. */
  once?: boolean;
  as?: "div" | "section" | "li" | "article";
}

/**
 * Enveloppe « apparition au scroll ». Neutralisée automatiquement si
 * l'utilisateur a demandé la réduction des animations.
 */
export function Reveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  once = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
