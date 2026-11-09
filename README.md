# Objectif TOEIC

Plateforme **EdTech premium et gratuite** de préparation au TOEIC — « Visez 990 ».
Entraînement ciblé (Quiz), tests blancs en conditions réelles, suivi de
progression immersif, et une identité visuelle forte articulée autour d'un
élément signature : **la batterie de préparation**.

![Stack](https://img.shields.io/badge/React-18-61dafb) ![Vite](https://img.shields.io/badge/Vite-5-646cff) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

## ✨ Points clés

- **Identité EdTech premium** — univers sombre bleu électrique / violet, effets
  lumineux maîtrisés, surfaces soignées. Voir [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md).
- **Batterie de préparation animée** — élément identitaire qui reflète la *vraie*
  préparation de l'utilisateur, **distincte du score TOEIC estimé**.
- **Langage de motion cohérent** — apparitions, transitions, compteurs et
  graphiques animés, avec respect strict de `prefers-reduced-motion`.
- **Expériences dédiées** — mode Quiz (feedback immédiat + explications) et mode
  Test blanc (immersif, chronométré, sans distraction).
- **Dashboard immersif** — score estimé, objectif, statistiques par compétence,
  graphiques animés, dernières sessions, recommandations personnalisées.

## 🧭 Pages

| Route | Description |
|---|---|
| `/` | Accueil — expérience produit (hero, batterie, modes, bénéfices, CTA) |
| `/dashboard` | Tableau de bord immersif |
| `/quiz` | Mode Quiz — apprentissage ciblé, correction expliquée |
| `/test` | Mode Test blanc — conditions réelles, chronomètre |
| `/design` | Démonstration vivante du design system |

## 🛠️ Stack

- **React 18** + **TypeScript** + **Vite 5**
- **Tailwind CSS 3** (tokens de design)
- **Framer Motion** (langage de motion)
- **Recharts** (graphiques animés)
- **lucide-react** (icônes)

## 🚀 Démarrage

```bash
npm install
npm run dev        # serveur de développement (http://localhost:5173)
npm run build      # build de production (type-check + bundle)
npm run preview    # prévisualisation du build
```

## 📁 Structure

```
src/
├─ lib/
│  ├─ scoring.ts     # Taux de préparation (batterie) ≠ score TOEIC estimé
│  ├─ motion.ts      # Vocabulaire d'animations partagé
│  ├─ mockData.ts    # Données de démonstration (profil, sessions, questions)
│  └─ utils.ts       # Helpers (formatage, dates…)
├─ components/
│  ├─ ui/            # Kit : Button, Card, Badge, ProgressBattery, ScoreGauge…
│  ├─ layout/        # Navbar, Footer, Background, Logo
│  ├─ home/          # Sections de la page d'accueil
│  └─ dashboard/     # Cartes & graphiques du tableau de bord
└─ pages/            # Home, Dashboard, Quiz, Test, DesignSystem, 404
```

## 📊 Modèle de progression

Deux indicateurs **volontairement découplés** (voir `src/lib/scoring.ts`) :

1. **Taux de préparation** (0–100 %) → alimente la **batterie**. Combine
   performance réelle (40 %), régularité (20 %), compétences maîtrisées (20 %) et
   tests blancs (20 %).
2. **Score TOEIC estimé** (10–990) → projette la précision Listening/Reading sur
   l'échelle officielle (2 sections de 5 à 495 points).

> Une batterie à 80 % ne signifie pas un score de 800/990.

## ♿ Accessibilité & performance

- `prefers-reduced-motion` respecté au niveau JS et CSS.
- Animations GPU (`transform` / `opacity`), build code-splitté (react / motion /
  charts).
- Contrastes et focus visibles, rôles ARIA sur les composants de données.

---

> TOEIC® est une marque déposée d'ETS. Ce projet n'est pas affilié à ETS.
> Les données affichées sont fictives (démonstration).
