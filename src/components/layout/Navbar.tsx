import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Accueil", end: true },
  { to: "/dashboard", label: "Tableau de bord" },
  { to: "/quiz", label: "Quiz" },
  { to: "/test", label: "Test blanc" },
  { to: "/design", label: "Design system" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-line" : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" aria-label="Objectif TOEIC — accueil" className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  "relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive ? "text-ink" : "text-ink-muted hover:text-ink",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId={reduce ? undefined : "nav-active"}
                      className="absolute inset-x-2 -bottom-px h-px bg-brand-gradient"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" size="sm" aria-label="Se connecter">
            Connexion
          </Button>
          <Link to="/dashboard">
            <Button size="sm">
              <Zap size={15} /> Commencer
            </Button>
          </Link>
        </div>

        <button
          className="lg:hidden grid place-items-center size-10 rounded-xl border border-line text-ink"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden glass border-t border-line overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    cn(
                      "px-4 py-3 rounded-xl text-sm font-medium",
                      isActive ? "bg-white/6 text-ink" : "text-ink-muted",
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/dashboard" className="mt-2">
                <Button className="w-full">
                  <Zap size={15} /> Commencer gratuitement
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
