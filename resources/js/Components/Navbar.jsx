import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

/* ── Cauri plein avec motif en découpe ──────────────────── */
function CauriLogo({ color = "#38bdf8" }) {
  const C = color;
  return (
    <motion.div className="relative flex items-center justify-center" style={{ width: 28, height: 40 }}>
      <motion.div className="absolute inset-0"
        animate={{ opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: `radial-gradient(ellipse, ${C}60 0%, transparent 70%)`, filter: "blur(8px)" }}
      />
      <motion.svg width="28" height="40" viewBox="0 0 60 84" fill="none"
        animate={{ filter: [`drop-shadow(0 0 3px ${C}40)`, `drop-shadow(0 0 8px ${C}90)`, `drop-shadow(0 0 3px ${C}40)`] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.ellipse cx="30" cy="42" rx="21" ry="30"
          fill={C + "12"} stroke={C} strokeWidth="1.5"
          animate={{ strokeOpacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path d="M30,14 L26,20 L34,26 L26,32 L34,38 L26,44 L34,50 L26,56 L34,62 L30,70"
          stroke={C} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <line x1="17" y1="24" x2="24" y2="24" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <line x1="16" y1="29" x2="23" y2="29" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <path d="M13,35 L20,40 L13,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <path d="M17,35 L24,40 L17,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <circle cx="11" cy="42" r="2" fill={C} opacity="0.8"/>
        <path d="M13,47 L20,52 L13,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <path d="M17,47 L24,52 L17,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <line x1="16" y1="60" x2="23" y2="60" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <line x1="17" y1="64" x2="23" y2="64" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <line x1="18" y1="68" x2="23" y2="68" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <line x1="43" y1="24" x2="36" y2="24" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <line x1="44" y1="29" x2="37" y2="29" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <path d="M47,35 L40,40 L47,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <path d="M43,35 L36,40 L43,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <circle cx="49" cy="42" r="2" fill={C} opacity="0.8"/>
        <path d="M47,47 L40,52 L47,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <path d="M43,47 L36,52 L43,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <line x1="44" y1="60" x2="37" y2="60" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <line x1="43" y1="64" x2="37" y2="64" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <line x1="42" y1="68" x2="37" y2="68" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
      </motion.svg>
    </motion.div>
  );
}

const NAV_LINKS = [
  { href: "/#about",         label: "À propos" },
  { href: "/#services",      label: "Services" },
  { href: "/#portfolio",     label: "Portfolio" },
  { href: "/#team",          label: "Équipe" },
  { href: "/#testimonials",  label: "Avis" },
  { href: "/#contact",       label: "Contact" },
];

function cn(...classes) { return classes.filter(Boolean).join(" "); }

export default function Navbar({ header }) {
  const { url } = usePage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (url.startsWith("/dashboard") || url === "/login") return null;

  const logoName = header?.logoName ?? "KoriLab";
  const tagline  = header?.tagline  ?? "Creative Studio";
  const ctaText  = header?.ctaText  ?? "Démarrer un projet";

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled ? "py-3 bg-[#040d1a]/90 backdrop-blur-2xl border-b border-sky-500/[0.1] shadow-lg shadow-black/40" : "py-5 bg-transparent"
    )}>
      <nav className="section-padding mx-auto max-w-7xl flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <CauriLogo />
          <div className="flex flex-col leading-none">
            <motion.span
              className="font-extrabold text-lg tracking-tight text-white"
              animate={{ textShadow: ["0 0 8px rgba(56,189,248,0.2)", "0 0 20px rgba(56,189,248,0.5)", "0 0 8px rgba(56,189,248,0.2)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {logoName}<span className="text-sky-400">.</span>
            </motion.span>
            <span className="font-mono text-[9px] text-sky-400/50 tracking-[0.25em] uppercase">{tagline}</span>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg transition-all duration-200 group">
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-lg bg-sky-500/0 group-hover:bg-sky-500/[0.06] transition-all duration-300 border border-transparent group-hover:border-sky-500/15" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a href="/#contact" className="relative px-5 py-2.5 text-sm font-semibold rounded-xl text-white overflow-hidden group transition-all duration-300 hover:scale-[1.03] premium-border glow-blue-sm hover:glow-blue">
            <span className="relative z-10 bg-gradient-to-r from-sky-300 to-indigo-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all">{ctaText}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-sky-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-sky-500/[0.08] transition-colors">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#040d1a]/95 backdrop-blur-2xl border-t border-sky-500/[0.08]">
            <ul className="section-padding py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-sky-500/[0.06] rounded-xl transition-all">
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="/#contact" onClick={() => setOpen(false)} className="block px-4 py-3 text-sm font-semibold text-center rounded-xl premium-border text-sky-300">
                  {ctaText}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
