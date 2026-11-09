import type { Variants, Transition } from "framer-motion";

/**
 * ===========================================================================
 *  LANGAGE DE MOTION — OBJECTIF TOEIC
 *  Un vocabulaire d'animations partagé pour garantir un rythme cohérent sur
 *  tout le produit. Rapide, fluide, jamais distrayant. Inspiré du tempo des
 *  Reels (enchaînement net) sans la navigation sociale.
 *
 *  Règle d'or : toute animation doit pouvoir être neutralisée par
 *  prefers-reduced-motion. Les composants lisent useReducedMotion() et
 *  passent `instant()` aux transitions quand c'est demandé.
 * ===========================================================================
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DUR = {
  fast: 0.16,
  base: 0.28,
  slow: 0.52,
} as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 26,
  mass: 0.9,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 170,
  damping: 22,
};

/** Transition « instantanée » renvoyée quand l'utilisateur réduit les animations. */
export const instant: Transition = { duration: 0 };

/** Apparition d'une section au scroll. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.base, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.base, ease: EASE_OUT },
  },
};

/** Conteneur qui orchestre l'apparition échelonnée de ses enfants (cartes). */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Item destiné à un conteneur staggered. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_OUT },
  },
};

/** Transition de page (routes). Volontairement sobre pour ne pas gêner. */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: DUR.fast, ease: EASE_OUT } },
};

/** Props de survol/press cohérentes pour les éléments interactifs. */
export const tapScale = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.97 },
  transition: spring,
};
