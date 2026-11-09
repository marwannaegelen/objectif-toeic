import { Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProgressBattery } from "@/components/ui/ProgressBattery";
import { SkillBar } from "@/components/ui/SkillBar";
import { DUR } from "@/lib/motion";

const colors = [
  { name: "base", hex: "#070A14", role: "Fond principal" },
  { name: "night", hex: "#0B1022", role: "Bleu nuit" },
  { name: "surface", hex: "#111730", role: "Cartes" },
  { name: "electric", hex: "#3D7BFF", role: "Primaire" },
  { name: "electric-soft", hex: "#5B8DFF", role: "Primaire clair" },
  { name: "violet", hex: "#9B5CFF", role: "Accent" },
  { name: "violet-soft", hex: "#B388FF", role: "Accent clair" },
  { name: "success", hex: "#34D399", role: "Réussite" },
  { name: "warn", hex: "#FBBF24", role: "Attention" },
  { name: "danger", hex: "#FB7185", role: "Erreur" },
  { name: "ink", hex: "#F4F7FF", role: "Texte" },
  { name: "ink-muted", hex: "#9AA6C2", role: "Texte secondaire" },
];

const typeScale = [
  { cls: "text-5xl", label: "Display / 5xl", sample: "Visez 990" },
  { cls: "text-3xl", label: "Titre / 3xl", sample: "Tableau de bord" },
  { cls: "text-xl", label: "Sous-titre / xl", sample: "Batterie de préparation" },
  { cls: "text-base", label: "Corps / base", sample: "Un entraînement intelligent." },
  { cls: "text-sm text-ink-muted", label: "Légende / sm", sample: "Mis à jour en continu" },
];

function Block({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="py-8 border-t border-line first:border-t-0">
        <h2 className="text-xl font-display font-bold">{title}</h2>
        <p className="text-sm text-ink-muted mt-1 mb-6 max-w-2xl">{description}</p>
        {children}
      </section>
    </Reveal>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <Reveal>
        <Badge tone="violet">Design system</Badge>
        <h1 className="text-4xl font-display font-extrabold mt-4">
          Le système <span className="gradient-text">Objectif TOEIC</span>
        </h1>
        <p className="text-ink-muted mt-3 max-w-2xl leading-relaxed">
          Un système de marque cohérent — tokens, composants et langage de motion — pensé pour
          s'étendre au produit comme aux futures vidéos, publicités et présentations. Documentation
          complète dans <code className="text-electric-soft">DESIGN_SYSTEM.md</code>.
        </p>
      </Reveal>

      <div className="mt-6">
        {/* Palette */}
        <Block
          title="Palette"
          description="Fonds sombres, bleu électrique en primaire, violet en accent. Dégradés subtils bleu → violet pour les éléments importants. Jamais de couleurs criardes."
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {colors.map((c) => (
              <div key={c.name} className="rounded-xl border border-line overflow-hidden bg-surface/50">
                <div className="h-16" style={{ background: c.hex }} />
                <div className="p-3">
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-ink-faint tabular-nums">{c.hex}</p>
                  <p className="text-xs text-ink-muted mt-1">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 h-14 rounded-xl bg-brand-gradient flex items-center justify-center text-sm font-semibold text-white">
            Dégradé de marque · bleu électrique → violet
          </div>
        </Block>

        {/* Typographie */}
        <Block
          title="Typographie"
          description="Sora pour les titres (géométrique, premium), Inter pour le corps (lisibilité). Échelle basée sur un ratio ~1,25."
        >
          <div className="space-y-4">
            {typeScale.map((t) => (
              <div key={t.label} className="flex items-baseline justify-between gap-6 border-b border-line pb-3">
                <span className={`font-display font-bold ${t.cls}`}>{t.sample}</span>
                <span className="text-xs text-ink-faint shrink-0">{t.label}</span>
              </div>
            ))}
          </div>
        </Block>

        {/* Boutons */}
        <Block
          title="Boutons"
          description="Primaire avec dégradé lumineux et halo, secondaire en surface, outline et ghost. Micro-interactions : élévation au survol, compression au clic."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button>
              <Zap size={15} /> Primaire
            </Button>
            <Button variant="secondary">Secondaire</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="sm">Petit</Button>
            <Button size="lg">Grand</Button>
          </div>
        </Block>

        {/* Badges */}
        <Block title="Badges & états" description="Pastilles sémantiques pour qualifier statuts et catégories.">
          <div className="flex flex-wrap gap-2.5">
            <Badge tone="electric">Electric</Badge>
            <Badge tone="violet">Violet</Badge>
            <Badge tone="success">Réussite</Badge>
            <Badge tone="warn">Attention</Badge>
            <Badge tone="danger">Erreur</Badge>
            <Badge tone="neutral">Neutre</Badge>
          </div>
        </Block>

        {/* Cartes */}
        <Block title="Cartes" description="Surfaces élégantes, bordures fines, ombres profondes maîtrisées. Variante verre dépoli pour les éléments flottants.">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-5">
              <p className="font-display font-semibold">Carte standard</p>
              <p className="text-sm text-ink-muted mt-1">Fond surface, bordure fine, ombre portée.</p>
            </Card>
            <Card glass interactive className="p-5">
              <p className="font-display font-semibold">Carte verre (interactive)</p>
              <p className="text-sm text-ink-muted mt-1">Flou d'arrière-plan + halo au survol.</p>
            </Card>
          </div>
        </Block>

        {/* Batterie */}
        <Block
          title="Batterie de préparation"
          description="L'élément identitaire. Remplissage animé, transition de couleur selon le niveau, cellules d'énergie et pourcentage. Déclinée en 4 tailles."
        >
          <div className="flex flex-wrap items-end gap-8">
            {[12, 40, 68, 100].map((v) => (
              <div key={v} className="flex flex-col items-center gap-2">
                <ProgressBattery value={v} size="md" />
                <span className="text-xs text-ink-faint">{v} %</span>
              </div>
            ))}
          </div>
        </Block>

        {/* Barres de compétence */}
        <Block title="Barres de progression" description="Barres de compétence animées à l'apparition — bleu pour Listening, violet pour Reading.">
          <div className="max-w-md space-y-4">
            <SkillBar label="Compréhension orale" value={74} tone="listening" />
            <SkillBar label="Compréhension écrite" value={58} tone="reading" />
          </div>
        </Block>

        {/* Motion */}
        <Block
          title="Langage de motion"
          description="Rapide et fluide, jamais distrayant. Courbe d'accélération maison, durées calibrées. Respecte systématiquement prefers-reduced-motion."
        >
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { k: "Rapide", v: DUR.fast, use: "Survols, pressions" },
              { k: "Standard", v: DUR.base, use: "Cartes, transitions" },
              { k: "Lente", v: DUR.slow, use: "Apparitions de section" },
            ].map((d) => (
              <Card key={d.k} className="p-5">
                <p className="text-2xl font-display font-bold tabular-nums gradient-text">
                  {Math.round(d.v * 1000)}ms
                </p>
                <p className="text-sm font-semibold mt-1">{d.k}</p>
                <p className="text-xs text-ink-muted mt-0.5">{d.use}</p>
              </Card>
            ))}
          </div>
          <p className="text-xs text-ink-faint mt-4">
            Easing standard : <code className="text-electric-soft">cubic-bezier(0.22, 1, 0.36, 1)</code>
          </p>
        </Block>
      </div>
    </div>
  );
}
