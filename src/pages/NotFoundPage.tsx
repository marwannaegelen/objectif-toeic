import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { ProgressBattery } from "@/components/ui/ProgressBattery";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-28 text-center">
      <div className="inline-block mb-8">
        <ProgressBattery value={4} size="xl" showTier />
      </div>
      <h1 className="text-4xl font-display font-bold">Page introuvable</h1>
      <p className="text-ink-muted mt-3 max-w-md mx-auto">
        Cette page n'existe pas (ou pas encore). Recharge ta batterie de préparation
        depuis le tableau de bord.
      </p>
      <div className="flex items-center justify-center gap-3 mt-8">
        <Link to="/">
          <Button variant="secondary">Retour à l'accueil</Button>
        </Link>
        <Link to="/dashboard">
          <Button>Tableau de bord</Button>
        </Link>
      </div>
    </div>
  );
}
