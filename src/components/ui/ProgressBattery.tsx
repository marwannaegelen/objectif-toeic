import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { batteryGradient, batteryTier } from "@/lib/scoring";
import { AnimatedCounter } from "./AnimatedCounter";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

type Size = "sm" | "md" | "lg" | "xl";

interface ProgressBatteryProps {
  /** Taux de préparation 0–100. */
  value: number;
  size?: Size;
  /** Affiche le pourcentage dans la batterie. */
  showPercent?: boolean;
  /** Affiche le palier (libellé + message) sous la batterie. */
  showTier?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const dims: Record<Size, { w: number; h: number; pad: number; cells: number; radius: number; font: number }> = {
  sm: { w: 92, h: 44, pad: 5, cells: 4, radius: 11, font: 14 },
  md: { w: 150, h: 70, pad: 7, cells: 5, radius: 16, font: 20 },
  lg: { w: 210, h: 96, pad: 9, cells: 5, radius: 22, font: 28 },
  xl: { w: 280, h: 128, pad: 12, cells: 5, radius: 28, font: 38 },
};

/**
 * LA BATTERIE DE PRÉPARATION — élément identitaire d'Objectif TOEIC.
 * Remplissage animé, transition de couleur selon le niveau, cellules
 * d'énergie lumineuses, pourcentage animé. Respecte prefers-reduced-motion.
 */
export function ProgressBattery({
  value,
  size = "md",
  showPercent = true,
  showTier = false,
  orientation = "horizontal",
  className,
}: ProgressBatteryProps) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const d = dims[size];
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const grad = batteryGradient(pct);
  const tier = batteryTier(pct);

  const isVertical = orientation === "vertical";
  const W = isVertical ? d.h : d.w;
  const H = isVertical ? d.w : d.h;

  // Géométrie de la coque (en coordonnées horizontales, pivotée si vertical)
  const bodyW = d.w - 10; // réserve pour la borne
  const bodyH = d.h;
  const innerX = d.pad;
  const innerY = d.pad;
  const innerW = bodyW - d.pad * 2;
  const innerH = bodyH - d.pad * 2;
  const fillW = (innerW * pct) / 100;

  const capW = 6;
  const capH = bodyH * 0.42;

  return (
    <div
      className={cn("inline-flex flex-col gap-3", className)}
      role="meter"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Taux de préparation : ${pct} %. ${tier.label}.`}
    >
      <div className={cn("relative", isVertical && "inline-block")}>
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${d.w + 2} ${d.h}`}
          className="overflow-visible"
          style={isVertical ? { transform: "rotate(-90deg)", transformOrigin: "center" } : undefined}
          aria-hidden
        >
          <defs>
            <linearGradient id={`bat-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={grad.from} />
              <stop offset="100%" stopColor={grad.to} />
            </linearGradient>
            <filter id={`glow-${uid}`} x="-40%" y="-60%" width="180%" height="220%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id={`clip-${uid}`}>
              <rect x={innerX} y={innerY} width={innerW} height={innerH} rx={d.radius - d.pad} />
            </clipPath>
          </defs>

          {/* Coque */}
          <rect
            x={1}
            y={1}
            width={bodyW - 2}
            height={bodyH - 2}
            rx={d.radius}
            fill="rgba(23,30,61,0.6)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth={2}
          />
          {/* Borne + */}
          <rect
            x={bodyW}
            y={(bodyH - capH) / 2}
            width={capW}
            height={capH}
            rx={2.5}
            fill="rgba(255,255,255,0.22)"
          />

          {/* Remplissage animé */}
          <g clipPath={`url(#clip-${uid})`}>
            <motion.rect
              x={innerX}
              y={innerY}
              height={innerH}
              fill={`url(#bat-${uid})`}
              filter={`url(#glow-${uid})`}
              initial={reduce ? { width: fillW } : { width: 0 }}
              animate={{ width: fillW }}
              transition={reduce ? { duration: 0 } : { duration: 1.1, ease: EASE_OUT, delay: 0.1 }}
            />
            {/* Reflet lumineux qui balaie le remplissage */}
            {!reduce && pct > 6 && (
              <motion.rect
                x={innerX}
                y={innerY}
                width={innerW * 0.3}
                height={innerH}
                fill="rgba(255,255,255,0.28)"
                initial={{ x: innerX - innerW * 0.3 }}
                animate={{ x: [innerX - innerW * 0.3, innerX + fillW] }}
                transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.5 }}
                style={{ mixBlendMode: "overlay" }}
              />
            )}
          </g>

          {/* Cellules d'énergie (séparateurs) */}
          {Array.from({ length: d.cells - 1 }).map((_, i) => {
            const x = innerX + (innerW / d.cells) * (i + 1);
            const active = fillW > innerX + (innerW / d.cells) * (i + 1) - innerX;
            return (
              <line
                key={i}
                x1={x}
                y1={innerY + 3}
                x2={x}
                y2={innerY + innerH - 3}
                stroke={active ? "rgba(7,10,20,0.35)" : "rgba(255,255,255,0.06)"}
                strokeWidth={1.5}
              />
            );
          })}
        </svg>

        {/* Pourcentage superposé */}
        {showPercent && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="font-display font-bold tabular-nums"
              style={{
                fontSize: d.font,
                color: "#fff",
                textShadow: "0 1px 10px rgba(0,0,0,0.5)",
              }}
            >
              <AnimatedCounter value={pct} suffix="%" />
            </span>
          </div>
        )}
      </div>

      {showTier && (
        <div className="max-w-[260px]">
          <div className="flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ background: grad.from, boxShadow: `0 0 10px ${grad.glow}` }}
            />
            <span className="text-sm font-semibold text-ink">{tier.label}</span>
          </div>
          <p className="text-sm text-ink-muted mt-1 leading-snug">{tier.message}</p>
        </div>
      )}
    </div>
  );
}
