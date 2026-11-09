import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";
import { EASE_OUT } from "@/lib/motion";

interface ScoreGaugeProps {
  /** Score TOEIC estimé 10–990. */
  score: number;
  goal?: number;
  max?: number;
  size?: number;
}

/**
 * Jauge radiale du SCORE TOEIC ESTIMÉ (indicateur distinct de la batterie).
 * Arc de 270°, animé à l'ouverture, avec repère d'objectif personnel.
 */
export function ScoreGauge({ score, goal, max = 990, size = 220 }: ScoreGaugeProps) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const stroke = 14;
  const r = (size - stroke) / 2 - 6;
  const cx = size / 2;
  const cy = size / 2;
  const arc = 270; // degrés
  const startAngle = 135; // départ en bas-gauche

  const circumference = 2 * Math.PI * r;
  const arcLen = (arc / 360) * circumference;
  const pct = Math.min(1, score / max);
  const goalPct = goal ? Math.min(1, goal / max) : null;

  // Position du repère d'objectif
  const goalAngle = goalPct !== null ? startAngle + goalPct * arc : null;
  const goalRad = goalAngle !== null ? (goalAngle * Math.PI) / 180 : null;

  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 overflow-visible">
        <defs>
          <linearGradient id={`gauge-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3D7BFF" />
            <stop offset="55%" stopColor="#6E6BFF" />
            <stop offset="100%" stopColor="#9B5CFF" />
          </linearGradient>
        </defs>

        {/* Piste */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arcLen} ${circumference}`}
          transform={`rotate(${startAngle} ${cx} ${cy})`}
        />
        {/* Valeur */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={`url(#gauge-${uid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arcLen * pct} ${circumference}`}
          transform={`rotate(${startAngle} ${cx} ${cy})`}
          initial={reduce ? false : { strokeDasharray: `0 ${circumference}` }}
          whileInView={{ strokeDasharray: `${arcLen * pct} ${circumference}` }}
          viewport={{ once: true }}
          transition={reduce ? { duration: 0 } : { duration: 1.3, ease: EASE_OUT, delay: 0.15 }}
          style={{ filter: "drop-shadow(0 0 8px rgba(91,141,255,0.45))" }}
        />
      </svg>

      {/* Repère objectif (hors rotation du svg) */}
      {goalRad !== null && (
        <svg width={size} height={size} className="absolute inset-0 overflow-visible">
          <line
            x1={cx + (r - stroke / 2 - 3) * Math.cos(goalRad)}
            y1={cy + (r - stroke / 2 - 3) * Math.sin(goalRad)}
            x2={cx + (r + stroke / 2 + 3) * Math.cos(goalRad)}
            y2={cy + (r + stroke / 2 + 3) * Math.sin(goalRad)}
            stroke="#F4F7FF"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </svg>
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-5xl font-display font-bold tabular-nums leading-none gradient-text">
          <AnimatedCounter value={score} duration={1.3} />
        </span>
        <span className="text-xs text-ink-faint mt-1">/ {max} estimé</span>
        {goal && (
          <span className="mt-2 text-xs text-ink-muted">
            Objectif <span className="font-semibold text-ink">{goal}</span>
          </span>
        )}
      </div>
    </div>
  );
}
