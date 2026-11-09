import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  size?: Size;
}

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold " +
  "font-display tracking-tight select-none transition-colors disabled:opacity-50 " +
  "disabled:pointer-events-none focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "btn-glow text-white bg-brand-gradient shadow-glow hover:brightness-110 " +
    "bg-[length:200%_100%] hover:bg-right",
  secondary:
    "text-ink bg-surface-2/90 border border-line-strong hover:bg-surface-2 hover:border-electric-soft/40",
  outline:
    "text-ink border border-line-strong hover:border-electric-soft/60 hover:bg-white/5",
  ghost: "text-ink-muted hover:text-ink hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, children, ...props },
  ref,
) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={spring}
      {...props}
    >
      {children}
    </motion.button>
  );
});
