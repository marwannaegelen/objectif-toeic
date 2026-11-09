import { clamp } from "./utils";

/**
 * ===========================================================================
 *  MODÈLE DE PROGRESSION — OBJECTIF TOEIC
 *
 *  DEUX INDICATEURS DISTINCTS, VOLONTAIREMENT DÉCOUPLÉS (exigence du cahier
 *  des charges) :
 *
 *  1. LE TAUX DE PRÉPARATION (0–100 %) → alimente la BATTERIE.
 *     Il mesure « à quel point l'utilisateur est prêt » et combine :
 *       - la performance réelle (précision récente)        40 %
 *       - la régularité (assiduité, séries)                20 %
 *       - les compétences maîtrisées (couverture)          20 %
 *       - les résultats aux tests blancs                   20 %
 *     Une batterie à 80 % n'implique PAS un score de 800/990.
 *
 *  2. LE SCORE TOEIC ESTIMÉ (10–990) → indicateur séparé du dashboard.
 *     Il projette la précision Listening/Reading sur l'échelle officielle
 *     (2 sections de 5 à 495 points).
 * ===========================================================================
 */

export type SkillCategory = "listening" | "reading";

export interface Skill {
  id: string;
  label: string;
  category: SkillCategory;
  /** Part du TOEIC (ex : "Partie 1") */
  part: string;
  /** Maîtrise 0–100, dérivée des bonnes réponses sur cette compétence. */
  mastery: number;
  questionsAnswered: number;
}

export interface PreparationInputs {
  /** Précision moyenne récente, 0–100. */
  accuracy: number;
  /** Régularité : 0–100 (série de jours, séances/semaine). */
  regularity: number;
  /** Couverture des compétences : moyenne de maîtrise, 0–100. */
  skillCoverage: number;
  /** Préparation « conditions de test » : 0–100 (tests blancs réalisés & réussis). */
  testReadiness: number;
}

export const PREP_WEIGHTS = {
  accuracy: 0.4,
  regularity: 0.2,
  skillCoverage: 0.2,
  testReadiness: 0.2,
} as const;

/** Taux de préparation 0–100 alimentant la batterie. */
export function computePreparation(i: PreparationInputs): number {
  const raw =
    i.accuracy * PREP_WEIGHTS.accuracy +
    i.regularity * PREP_WEIGHTS.regularity +
    i.skillCoverage * PREP_WEIGHTS.skillCoverage +
    i.testReadiness * PREP_WEIGHTS.testReadiness;
  return Math.round(clamp(raw));
}

export interface BatteryTier {
  key: "critical" | "low" | "mid" | "high" | "full";
  label: string;
  message: string;
}

/** Palier qualitatif associé à un pourcentage de batterie. */
export function batteryTier(pct: number): BatteryTier {
  if (pct >= 100)
    return {
      key: "full",
      label: "Objectif atteint",
      message: "Tu es prêt·e pour le jour J. Maintiens le rythme.",
    };
  if (pct >= 75)
    return {
      key: "high",
      label: "Préparation avancée",
      message: "Excellente dynamique. Affine tes points faibles.",
    };
  if (pct >= 50)
    return {
      key: "mid",
      label: "Niveau intermédiaire",
      message: "Bonne base. La régularité va faire la différence.",
    };
  if (pct >= 25)
    return {
      key: "low",
      label: "Progression initiale",
      message: "C'est lancé. Vise une séance par jour.",
    };
  return {
    key: "critical",
    label: "Démarrage",
    message: "Première étape : un quiz de 10 questions.",
  };
}

/**
 * Couleur de la batterie selon le niveau — transition continue :
 *   rose (bas) → ambre → bleu électrique → violet → émeraude (plein).
 * Renvoie un dégradé (start/stop) pour un remplissage lumineux.
 */
export function batteryGradient(pct: number): { from: string; to: string; glow: string } {
  if (pct >= 100) return { from: "#34D399", to: "#5B8DFF", glow: "rgba(52,211,153,0.55)" };
  if (pct >= 75) return { from: "#5B8DFF", to: "#9B5CFF", glow: "rgba(123,120,255,0.5)" };
  if (pct >= 50) return { from: "#3D7BFF", to: "#6E6BFF", glow: "rgba(61,123,255,0.5)" };
  if (pct >= 25) return { from: "#FBBF24", to: "#FB9B5B", glow: "rgba(251,191,36,0.45)" };
  return { from: "#FB7185", to: "#FB9B5B", glow: "rgba(251,113,133,0.45)" };
}

/**
 * Projette une précision (0–100) sur une section TOEIC (5–495).
 * Courbe légèrement non linéaire : les derniers points sont plus durs.
 */
function sectionScore(accuracy: number): number {
  const a = clamp(accuracy) / 100;
  const curved = Math.pow(a, 1.08); // palier plus exigeant en haut
  return Math.round((5 + curved * 490) / 5) * 5; // arrondi au multiple de 5
}

export interface ToeicEstimate {
  total: number; // 10–990
  listening: number; // 5–495
  reading: number; // 5–495
}

/** Score TOEIC estimé — indicateur distinct de la batterie. */
export function estimateToeicScore(
  listeningAccuracy: number,
  readingAccuracy: number,
): ToeicEstimate {
  const listening = sectionScore(listeningAccuracy);
  const reading = sectionScore(readingAccuracy);
  return { listening, reading, total: listening + reading };
}
