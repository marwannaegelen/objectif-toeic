/** Décor ambiant global : grille subtile + halos lumineux maîtrisés. */
export function Background() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Grille technologique très discrète */}
      <div className="absolute inset-0 bg-grid bg-grid [mask-image:radial-gradient(90%_60%_at_50%_0%,#000_0%,transparent_75%)] opacity-60" />
      {/* Halos de marque */}
      <div className="absolute -top-40 left-1/4 size-[520px] rounded-full bg-electric/20 blur-[140px]" />
      <div className="absolute top-10 right-0 size-[420px] rounded-full bg-violet/20 blur-[150px]" />
    </div>
  );
}
