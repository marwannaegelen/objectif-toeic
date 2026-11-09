import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ajoute un léger halo au survol (cartes interactives). */
  interactive?: boolean;
  /** Variante en verre dépoli. */
  glass?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { interactive, glass, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-2xl border border-line shadow-card overflow-hidden",
        glass ? "glass" : "bg-surface/70",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-electric-soft/30 hover:shadow-glow",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export function CardHeader({
  title,
  subtitle,
  icon,
  action,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="flex items-center gap-3 min-w-0">
        {icon && (
          <span className="grid place-items-center size-9 rounded-xl bg-brand-gradient-soft border border-line text-electric-soft shrink-0">
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-base font-display font-semibold leading-tight truncate">{title}</h3>
          {subtitle && <p className="text-sm text-ink-muted mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}
