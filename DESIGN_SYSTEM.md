# Design System — Objectif TOEIC

> Système de marque de la plateforme EdTech **Objectif TOEIC**.
> Ce document est la **source de vérité** de l'identité visuelle. Il est pensé
> pour s'étendre au-delà du produit : vidéos motion design, publicités,
> publications sociales et présentations commerciales doivent donner
> l'impression d'appartenir exactement au même univers.

Une démonstration vivante de ce système est accessible dans l'application sur
la route **`/design`**. Les valeurs ci-dessous sont déclarées à deux endroits :
`tailwind.config.js` (classes utilitaires) et `src/index.css` (variables CSS
runtime, pour SVG / dégradés dynamiques / canvas).

---

## 1. Principes directeurs

L'identité doit évoquer un **produit SaaS haut de gamme**, pas une application
scolaire. Cinq principes :

1. **Premium & technologique** — fonds sombres, surfaces soignées, effets
   lumineux maîtrisés.
2. **Minimalisme fonctionnel** — chaque élément sert la compréhension ou
   l'action.
3. **Hiérarchie claire** — un seul point focal par écran.
4. **Profondeur maîtrisée** — ombres et flous subtils, jamais tape-à-l'œil.
5. **Cohérence absolue** — mêmes tokens, mêmes composants, mêmes rythmes
   d'animation partout.

À éviter : couleurs criardes, néons excessifs, interfaces surchargées.

---

## 2. Palette

Fonds sombres dominants, **bleu électrique** en primaire, **violet** en accent,
blanc pour le contraste. Dégradés subtils bleu → violet pour les éléments
importants.

### Fonds
| Token | Hex | Usage |
|---|---|---|
| `base` | `#070A14` | Fond de page (noir profond) |
| `night` | `#0B1022` | Bleu nuit, encarts |
| `surface` | `#111730` | Cartes |
| `surface-2` | `#171E3D` | Surfaces surélevées, champs |

### Marque
| Token | Hex | Usage |
|---|---|---|
| `electric` | `#3D7BFF` | **Primaire** (bleu électrique) |
| `electric-soft` | `#5B8DFF` | Primaire clair, accents de texte |
| `electric-deep` | `#2458E6` | États pressés |
| `violet` | `#9B5CFF` | **Accent / secondaire** |
| `violet-soft` | `#B388FF` | Accent clair |
| `violet-deep` | `#7C3AED` | États pressés |

### États sémantiques (mesurés, non criards)
| Token | Hex | Usage |
|---|---|---|
| `success` | `#34D399` | Bonne réponse, tendance positive |
| `warn` | `#FBBF24` | Attention, à revoir |
| `danger` | `#FB7185` | Erreur, mauvaise réponse |

### Texte
| Token | Hex | Usage |
|---|---|---|
| `ink` | `#F4F7FF` | Texte principal |
| `ink-muted` | `#9AA6C2` | Texte secondaire |
| `ink-faint` | `#636E8C` | Légendes, méta |

### Dégradé de marque
```
linear-gradient(120deg, #3D7BFF 0%, #6E6BFF 48%, #9B5CFF 100%)
```
Réservé aux éléments importants : CTA primaire, titres accentués, jauges.

---

## 3. Typographie

Deux familles, chargées via Google Fonts.

- **Sora** — titres (géométrique, premium). Graisses 600–800.
- **Inter** — corps de texte (lisibilité). Graisses 400–600.

### Échelle (ratio ≈ 1,25)
| Classe | Taille | Usage |
|---|---|---|
| `text-6xl` | 4.75rem | Hero XL |
| `text-5xl` | 3.75rem | Titres hero |
| `text-4xl` | 3rem | Titres de page |
| `text-3xl` | 2.25rem | Titres de section |
| `text-2xl` | 1.75rem | Sous-titres forts |
| `text-xl` | 1.375rem | Titres de carte |
| `text-base` | 1rem | Corps |
| `text-sm` | 0.875rem | Corps secondaire |
| `text-xs` / `text-2xs` | 0.75 / 0.6875rem | Légendes, labels |

Le `letter-spacing` se resserre progressivement sur les grandes tailles
(jusqu'à `-0.035em`) pour une allure plus compacte et premium.

---

## 4. Espacements, rayons, ombres

- **Grille d'espacement** : échelle Tailwind (multiples de 4px), + `18` (4.5rem)
  et `22` (5.5rem) pour les respirations de section.
- **Rayons** : `xl` 0.875rem · `2xl` 1.25rem (cartes) · `3xl` 1.75rem (grands
  blocs).
- **Ombres** :
  - `card` — ombre profonde douce + liseré interne clair.
  - `glow` — halo bleu électrique (éléments actifs / CTA).
  - `glow-violet` — halo violet (accents).

---

## 5. Composants

### Boutons (`<Button>`)
- Variantes : `primary` (dégradé + halo), `secondary` (surface), `outline`,
  `ghost`.
- Tailles : `sm` (36px), `md` (44px), `lg` (48px).
- Micro-interactions : élévation `-2px` au survol, compression `0.97` au clic
  (ressort). Neutralisées si `prefers-reduced-motion`.

### Cartes (`<Card>`)
- Fond `surface/70`, bordure `line`, ombre `card`, rayon `2xl`.
- Options : `interactive` (élévation + halo au survol), `glass` (verre dépoli).
- `<CardHeader>` : icône en pastille dégradée + titre + sous-titre + action.

### Badges (`<Badge>`)
- Pastilles sémantiques : `electric`, `violet`, `success`, `warn`, `danger`,
  `neutral`. Texte capitales, `tracking` élargi.

### Batterie de préparation (`<ProgressBattery>`) — élément identitaire
Voir §7.

### Graphiques
- **Courbe d'évolution** : aire dégradée (score) + ligne pointillée (préparation),
  via Recharts. Animée à l'ouverture (1,2 s).
- **Activité hebdo** : barres à coins arrondis, barre max en dégradé de marque.
- **Jauge de score** (`<ScoreGauge>`) : arc radial 270°, repère d'objectif,
  balayage animé.
- **Barres de compétence** (`<SkillBar>`) : bleu = Listening, violet = Reading,
  remplissage animé à l'entrée dans le viewport.
- Tooltips en verre dépoli, cohérents avec les cartes.

### Icônes
- Bibliothèque **lucide-react**. Trait fin, style linéaire moderne.
- Taille courante 16–22px, couleur héritée ou `electric-soft` / `violet-soft`
  dans les pastilles.

---

## 6. Langage de motion

Rapide, fluide, jamais distrayant. Inspiré du tempo des Reels (enchaînement net)
sans la navigation sociale. Défini dans `src/lib/motion.ts`.

### Courbes
- Standard (sortie) : `cubic-bezier(0.22, 1, 0.36, 1)`
- Entrée/sortie : `cubic-bezier(0.65, 0, 0.35, 1)`
- Ressort : `stiffness 260 · damping 26` (interactions), `170/22` (doux).

### Durées
| Nom | Durée | Usage |
|---|---|---|
| `fast` | 160 ms | Survols, pressions |
| `base` | 280 ms | Cartes, transitions de question |
| `slow` | 520 ms | Apparitions de section |

### Vocabulaire d'animations
- `fadeUp` / `fadeIn` / `scaleIn` — apparitions.
- `staggerContainer` + `staggerItem` — apparition échelonnée des cartes.
- `pageVariants` — transition entre routes (sobre).
- Compteurs animés, jauges et barres se remplissent **à l'entrée dans le
  viewport** (une seule fois).

### Accessibilité & performance
- **`prefers-reduced-motion` respecté partout** : au niveau JS (`useReducedMotion`
  dans chaque composant animé) et au niveau CSS (neutralisation globale dans
  `index.css`).
- Animations privilégiant `transform` / `opacity` (composables GPU).
- Pendant les **tests blancs**, les animations sont volontairement plus discrètes
  pour préserver la concentration.

---

## 7. La batterie de préparation

Élément **signature** de la marque. Représente le niveau de préparation de
l'utilisateur, **distinct du score TOEIC estimé**.

### Rendu
- Coque arrondie + borne, cellules d'énergie, remplissage dégradé lumineux,
  pourcentage animé, reflet qui balaie au remplissage.
- 4 tailles : `sm`, `md`, `lg`, `xl`. Orientation horizontale ou verticale.
- `role="meter"` + `aria-valuenow/min/max` pour l'accessibilité.

### Transition de couleur selon le niveau
| Niveau | Palier | Dégradé |
|---|---|---|
| 0–24 % | Démarrage | rose → orange |
| 25–49 % | Progression initiale | ambre → orange |
| 50–74 % | Intermédiaire | bleu électrique |
| 75–99 % | Avancé | bleu → violet |
| 100 % | Objectif atteint | émeraude → bleu |

### Alimentation (≠ score)
Le **taux de préparation** (0–100 %) combine quatre facteurs pondérés
(`src/lib/scoring.ts`) :

| Facteur | Poids |
|---|---|
| Performance réelle (précision récente) | 40 % |
| Régularité (assiduité, séries) | 20 % |
| Compétences maîtrisées (couverture) | 20 % |
| Résultats aux tests blancs | 20 % |

> ⚠️ Une batterie à 80 % **ne signifie pas** un score de 800/990. Le **score
> TOEIC estimé** est calculé séparément en projetant la précision
> Listening/Reading sur l'échelle officielle (2 × 5–495 points).

---

## 8. Responsive

- **Mobile first.** Points de rupture Tailwind : `sm` 640 · `md` 768 · `lg` 1024
  · `xl` 1280.
- Gouttière latérale de 16px minimum, jamais de défilement horizontal.
- Navigation : barre complète dès `lg`, menu déroulant animé en dessous.
- Grilles qui s'effondrent (`lg:grid-cols-3` → 1 colonne), CTA pleine largeur sur
  mobile.
- Ne jamais sacrifier la fluidité aux effets : sur appareils modestes, les
  animations coûteuses se réduisent via `prefers-reduced-motion`.

---

## 9. Extension à la communication

Ce système sert de base aux futures productions (vidéos, publicités, social,
slides). Pour garantir la continuité de marque :

- Réutiliser la **palette officielle** et le **dégradé de marque** exacts.
- Conserver **Sora/Inter** et l'échelle typographique.
- Reprendre la **batterie de préparation** comme motif signature.
- Respecter le **rythme de motion** (courbes et durées ci-dessus) dans les
  animations vidéo.

Le site et les futures vidéos doivent être indiscernables en termes d'univers.
