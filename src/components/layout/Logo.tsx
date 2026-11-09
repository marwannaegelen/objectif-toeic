import { cn } from "@/lib/utils";

/** Marque Objectif TOEIC : pictogramme batterie + wordmark. */
export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-display", className)}>
      <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden className="shrink-0">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="64" y2="64">
            <stop stopColor="#3D7BFF" />
            <stop offset="1" stopColor="#9B5CFF" />
          </linearGradient>
        </defs>
        <rect x="12" y="20" width="34" height="24" rx="7" fill="none" stroke="url(#logo-g)" strokeWidth="4" />
        <rect x="48" y="27" width="5" height="10" rx="2.5" fill="url(#logo-g)" />
        <rect x="17" y="25" width="16" height="14" rx="3" fill="url(#logo-g)" />
      </svg>
      {!compact && (
        <span className="text-[17px] font-bold tracking-tight leading-none">
          Objectif<span className="gradient-text"> TOEIC</span>
        </span>
      )}
    </span>
  );
}
