import {
  computePreparation,
  estimateToeicScore,
  type Skill,
  type ToeicEstimate,
} from "./scoring";

/* ------------------------------------------------------------------ */
/*  PROFIL UTILISATEUR                                                 */
/* ------------------------------------------------------------------ */
export interface UserProfile {
  firstName: string;
  goalScore: number;
  streakDays: number;
  sessionsThisWeek: number;
  joinedDaysAgo: number;
}

export const user: UserProfile = {
  firstName: "Marwan",
  goalScore: 850,
  streakDays: 12,
  sessionsThisWeek: 5,
  joinedDaysAgo: 34,
};

/* ------------------------------------------------------------------ */
/*  COMPÉTENCES (7 parties officielles du TOEIC)                       */
/* ------------------------------------------------------------------ */
export const skills: Skill[] = [
  { id: "p1", label: "Photographies", category: "listening", part: "Partie 1", mastery: 88, questionsAnswered: 96 },
  { id: "p2", label: "Questions-Réponses", category: "listening", part: "Partie 2", mastery: 74, questionsAnswered: 142 },
  { id: "p3", label: "Conversations", category: "listening", part: "Partie 3", mastery: 61, questionsAnswered: 118 },
  { id: "p4", label: "Exposés courts", category: "listening", part: "Partie 4", mastery: 55, questionsAnswered: 84 },
  { id: "p5", label: "Phrases incomplètes", category: "reading", part: "Partie 5", mastery: 79, questionsAnswered: 210 },
  { id: "p6", label: "Textes à compléter", category: "reading", part: "Partie 6", mastery: 66, questionsAnswered: 92 },
  { id: "p7", label: "Compréhension écrite", category: "reading", part: "Partie 7", mastery: 52, questionsAnswered: 76 },
];

const listeningSkills = skills.filter((s) => s.category === "listening");
const readingSkills = skills.filter((s) => s.category === "reading");

const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

export const listeningAccuracy = Math.round(avg(listeningSkills.map((s) => s.mastery)));
export const readingAccuracy = Math.round(avg(readingSkills.map((s) => s.mastery)));

/* ------------------------------------------------------------------ */
/*  INDICATEURS DÉRIVÉS                                                */
/* ------------------------------------------------------------------ */
export const estimate: ToeicEstimate = estimateToeicScore(listeningAccuracy, readingAccuracy);

const skillCoverage = Math.round(avg(skills.map((s) => s.mastery)));
const overallAccuracy = Math.round(avg(skills.map((s) => s.mastery)));

/** Taux de préparation (batterie) — distinct du score estimé. */
export const preparation = computePreparation({
  accuracy: overallAccuracy,
  regularity: 78, // 5 séances/sem + série de 12 j
  skillCoverage,
  testReadiness: 64, // 3 tests blancs réalisés, 2 au-dessus de l'objectif
});

export const totalQuestions = skills.reduce((a, s) => a + s.questionsAnswered, 0);
export const trainingMinutes = 1385; // ~23 h
export const successRate = overallAccuracy;

/* ------------------------------------------------------------------ */
/*  ÉVOLUTION DU SCORE ESTIMÉ (graphique du dashboard)                 */
/* ------------------------------------------------------------------ */
export interface ScorePoint {
  label: string;
  score: number;
  preparation: number;
}

export const scoreHistory: ScorePoint[] = [
  { label: "S1", score: 540, preparation: 18 },
  { label: "S2", score: 585, preparation: 29 },
  { label: "S3", score: 610, preparation: 38 },
  { label: "S4", score: 655, preparation: 47 },
  { label: "S5", score: 690, preparation: 55 },
  { label: "S6", score: 720, preparation: 63 },
  { label: "S7", score: estimate.total - 20, preparation: preparation - 5 },
  { label: "Auj.", score: estimate.total, preparation },
];

/* ------------------------------------------------------------------ */
/*  ACTIVITÉ HEBDOMADAIRE (temps d'entraînement par jour)              */
/* ------------------------------------------------------------------ */
export const weeklyActivity: { day: string; minutes: number }[] = [
  { day: "Lun", minutes: 35 },
  { day: "Mar", minutes: 22 },
  { day: "Mer", minutes: 48 },
  { day: "Jeu", minutes: 0 },
  { day: "Ven", minutes: 30 },
  { day: "Sam", minutes: 65 },
  { day: "Dim", minutes: 18 },
];

/* ------------------------------------------------------------------ */
/*  DERNIÈRES SESSIONS                                                 */
/* ------------------------------------------------------------------ */
export interface SessionRecord {
  id: string;
  mode: "quiz" | "test";
  title: string;
  part: string;
  questions: number;
  correct: number;
  durationMin: number;
  date: string; // ISO
}

/** Horodatage situé `daysAgo` jours et `hoursAgo` heures avant maintenant. */
const iso = (daysAgo: number, hoursAgo = 0) =>
  new Date(Date.now() - ((daysAgo * 24 + hoursAgo) * 3600 + 120) * 1000).toISOString();

export const sessions: SessionRecord[] = [
  { id: "s1", mode: "quiz", title: "Grammaire ciblée", part: "Partie 5", questions: 20, correct: 17, durationMin: 11, date: iso(0, 3) },
  { id: "s2", mode: "test", title: "Test blanc Listening", part: "Parties 1–4", questions: 100, correct: 71, durationMin: 46, date: iso(1) },
  { id: "s3", mode: "quiz", title: "Conversations", part: "Partie 3", questions: 15, correct: 9, durationMin: 14, date: iso(2) },
  { id: "s4", mode: "quiz", title: "Vocabulaire business", part: "Partie 5", questions: 25, correct: 22, durationMin: 13, date: iso(3) },
  { id: "s5", mode: "test", title: "Test blanc complet", part: "Parties 1–7", questions: 200, correct: 142, durationMin: 118, date: iso(5) },
];

/* ------------------------------------------------------------------ */
/*  RECOMMANDATIONS PERSONNALISÉES                                     */
/* ------------------------------------------------------------------ */
export interface Recommendation {
  id: string;
  title: string;
  reason: string;
  cta: string;
  to: string;
  tone: "focus" | "boost" | "test";
}

export const recommendations: Recommendation[] = [
  {
    id: "r1",
    title: "Compréhension écrite (Partie 7)",
    reason: "Ta compétence la plus basse (52 %). +40 pts potentiels.",
    cta: "Lancer un quiz ciblé",
    to: "/quiz",
    tone: "focus",
  },
  {
    id: "r2",
    title: "Exposés courts (Partie 4)",
    reason: "Progression ralentie cette semaine.",
    cta: "S'entraîner 10 min",
    to: "/quiz",
    tone: "boost",
  },
  {
    id: "r3",
    title: "Test blanc complet",
    reason: "Dernier test il y a 5 jours. Reste en conditions réelles.",
    cta: "Démarrer le test",
    to: "/test",
    tone: "test",
  },
];

/* ------------------------------------------------------------------ */
/*  BANQUE DE QUESTIONS (échantillon, style TOEIC)                     */
/* ------------------------------------------------------------------ */
export interface Question {
  id: string;
  part: string;
  prompt: string;
  context?: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export const quizQuestions: Question[] = [
  {
    id: "q1",
    part: "Partie 5 — Grammaire",
    prompt: "The quarterly report must be submitted ______ Friday at the latest.",
    options: ["by", "until", "since", "during"],
    answerIndex: 0,
    explanation:
      "« by » marque une échéance (au plus tard à telle date). « until » exprimerait une continuité jusqu'à un moment, ce qui ne convient pas ici.",
  },
  {
    id: "q2",
    part: "Partie 5 — Vocabulaire",
    prompt: "The new manager was praised for her ______ approach to problem-solving.",
    options: ["innovate", "innovation", "innovative", "innovatively"],
    answerIndex: 2,
    explanation:
      "Un adjectif est attendu devant le nom « approach ». « innovative » qualifie « approach ».",
  },
  {
    id: "q3",
    part: "Partie 6 — Texte",
    context:
      "Thank you for your recent order. Unfortunately, one item is temporarily out of stock. We ______ you as soon as it becomes available.",
    prompt: "Choisissez la forme correcte.",
    options: ["notify", "will notify", "notifying", "have notified"],
    answerIndex: 1,
    explanation:
      "Le contexte décrit une action future (« as soon as it becomes available »). Le futur « will notify » s'impose.",
  },
  {
    id: "q4",
    part: "Partie 5 — Prépositions",
    prompt: "Please make sure all employees are aware ______ the new safety procedures.",
    options: ["about", "of", "with", "for"],
    answerIndex: 1,
    explanation: "La locution figée est « to be aware of something ».",
  },
  {
    id: "q5",
    part: "Partie 5 — Grammaire",
    prompt: "If the shipment ______ on time, we would have met the deadline.",
    options: ["arrived", "had arrived", "arrives", "has arrived"],
    answerIndex: 1,
    explanation:
      "Conditionnel passé (troisième type) : « If + past perfect, … would have + participe ». On attend « had arrived ».",
  },
  {
    id: "q6",
    part: "Partie 5 — Vocabulaire",
    prompt: "The conference has been ______ until further notice due to scheduling conflicts.",
    options: ["postponed", "prevented", "refused", "declined"],
    answerIndex: 0,
    explanation:
      "« postponed » (reporté) correspond au sens attendu. Les autres verbes ne s'emploient pas pour un report d'événement.",
  },
];

export const testQuestions: Question[] = [
  ...quizQuestions,
  {
    id: "t1",
    part: "Partie 7 — Compréhension",
    context:
      "NOTICE: The office cafeteria will be closed for renovation from March 3 to March 14. A temporary coffee station will be available on the 2nd floor.",
    prompt: "What is suggested about the cafeteria?",
    options: [
      "It will relocate permanently.",
      "It will be unavailable for about two weeks.",
      "It will serve only coffee.",
      "It will open on the 2nd floor.",
    ],
    answerIndex: 1,
    explanation:
      "La fermeture s'étend du 3 au 14 mars, soit environ deux semaines. Le coin café temporaire n'est pas la cafétéria elle-même.",
  },
  {
    id: "t2",
    part: "Partie 2 — Question-Réponse",
    prompt: "“Who's responsible for the monthly inventory?”",
    options: [
      "It's due next Monday.",
      "The warehouse team handles it.",
      "About two hundred items.",
      "Yes, every month.",
    ],
    answerIndex: 1,
    explanation:
      "La question « Who » attend une personne/équipe. « The warehouse team handles it » répond correctement.",
  },
];
