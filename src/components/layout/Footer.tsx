import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-line mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="text-sm text-ink-muted mt-4 max-w-xs leading-relaxed">
            La plateforme EdTech gratuite pour viser 990 points au TOEIC. Entraînement,
            tests blancs et suivi de progression.
          </p>
        </div>
        <FooterCol
          title="Produit"
          items={[
            { label: "Tableau de bord", to: "/dashboard" },
            { label: "Mode Quiz", to: "/quiz" },
            { label: "Test blanc", to: "/test" },
          ]}
        />
        <FooterCol
          title="Ressources"
          items={[
            { label: "Design system", to: "/design" },
            { label: "Compétences", to: "/dashboard" },
          ]}
        />
        <FooterCol
          title="À propos"
          items={[
            { label: "Mentions légales", to: "/" },
            { label: "Confidentialité", to: "/" },
          ]}
        />
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-faint">
          <span>© {new Date().getFullYear()} Objectif TOEIC. Plateforme 100 % gratuite.</span>
          <span>TOEIC® est une marque déposée d'ETS. Ce produit n'est pas affilié à ETS.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: string }[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3">{title}</h4>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.label}>
            <Link to={it.to} className="text-sm text-ink-muted hover:text-ink transition-colors">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
