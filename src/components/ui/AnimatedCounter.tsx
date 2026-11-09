import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  animate,
} from "framer-motion";
import { formatNumber } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  /** Durée de l'animation en secondes. */
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  /** Formate avec séparateur de milliers. */
  grouped?: boolean;
}

/** Compteur qui s'anime de 0 à `value` lorsqu'il entre dans le viewport. */
export function AnimatedCounter({
  value,
  duration = 1.1,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
  grouped = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    const render = (v: number) => {
      if (!ref.current) return;
      const n = decimals ? v.toFixed(decimals) : Math.round(v).toString();
      const formatted = grouped ? formatNumber(Number(n)) : n;
      ref.current.textContent = `${prefix}${formatted}${suffix}`;
    };
    if (reduce) {
      render(value);
      return;
    }
    const controls = animate(mv, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: render,
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals, suffix, prefix, grouped, reduce, mv]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {grouped ? formatNumber(0) : 0}
      {suffix}
    </span>
  );
}
