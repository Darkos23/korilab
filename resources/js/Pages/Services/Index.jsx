import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Lock, FileText, CreditCard, Search, Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const RUNES = ["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ"];

const TOOLS = [
  {
    id: "cv",
    icon: FileText,
    label: "Générateur de CV",
    description: "Crée un CV professionnel en quelques minutes. Remplis le formulaire, choisis ton thème, paye et télécharge.",
    price: "3 000",
    tag: "Rang F",
    href: "/services/cv",
    active: true,
    rune: "ᚠ",
    color: "#38bdf8",
  },
  {
    id: "carte",
    icon: CreditCard,
    label: "Carte de Visite",
    description: "Génère une carte de visite digitale et imprimable avec ton identité et tes coordonnées.",
    price: "2 500",
    tag: "Rang E",
    locked: true,
    rune: "ᚱ",
    color: "#818cf8",
  },
  {
    id: "seo",
    icon: Search,
    label: "Audit SEO",
    description: "Analyse SEO instantanée de ton site. Score, recommandations et rapport PDF en sortie.",
    price: "5 000",
    tag: "Rang D",
    locked: true,
    rune: "ᚦ",
    color: "#34d399",
  },
  {
    id: "logo",
    icon: Sparkles,
    label: "Générateur de Logo",
    description: "Construis un logo vectoriel à partir de tes initiales, couleurs et style en quelques clics.",
    price: "4 000",
    tag: "Rang C",
    locked: true,
    rune: "ᚷ",
    color: "#fbbf24",
  },
];

function RuneFloat({ rune, style }) {
  return (
    <motion.span
      className="absolute font-mono select-none pointer-events-none"
      style={{ color: "rgba(56,189,248,0.08)", fontSize: "1.1rem", ...style }}
      animate={{ opacity: [0.4, 0.9, 0.4], y: [0, -8, 0] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
    >
      {rune}
    </motion.span>
  );
}

function ToolCard({ tool, index }) {
  const Icon = tool.icon;

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={!tool.locked ? { y: -4, scale: 1.01 } : {}}
      className="relative rounded-2xl overflow-hidden group"
      style={{
        background: "linear-gradient(135deg, rgba(4,13,26,0.95) 0%, rgba(5,8,20,0.98) 100%)",
        border: `1px solid ${tool.locked ? "rgba(255,255,255,0.05)" : "rgba(56,189,248,0.15)"}`,
        boxShadow: tool.locked
          ? "0 4px 24px rgba(0,0,0,0.4)"
          : "0 4px 32px rgba(0,0,0,0.5)",
        transition: "all 0.3s ease",
        cursor: tool.locked ? "default" : "pointer",
      }}
    >
      {/* Glow top border */}
      {!tool.locked && (
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${tool.color}60, transparent)` }} />
      )}

      {/* Rune watermark */}
      <div className="absolute top-4 right-5 font-mono text-5xl select-none pointer-events-none"
        style={{ color: tool.locked ? "rgba(255,255,255,0.03)" : `${tool.color}12` }}>
        {tool.rune}
      </div>

      <div className="p-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: tool.locked ? "rgba(255,255,255,0.04)" : `${tool.color}14`,
                border: `1px solid ${tool.locked ? "rgba(255,255,255,0.06)" : `${tool.color}25`}`,
              }}>
              <Icon className="w-5 h-5" style={{ color: tool.locked ? "rgba(255,255,255,0.2)" : tool.color }} />
            </div>
            <div>
              <h3 className="font-bold text-base"
                style={{ color: tool.locked ? "rgba(255,255,255,0.3)" : "white" }}>
                {tool.label}
              </h3>
              <span className="font-mono text-[10px] tracking-widest"
                style={{ color: tool.locked ? "rgba(255,255,255,0.15)" : `${tool.color}90` }}>
                {tool.tag}
              </span>
            </div>
          </div>

          {tool.locked
            ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <Lock className="w-3 h-3" style={{ color: "rgba(255,255,255,0.2)" }} />
                <span className="font-mono text-[9px] tracking-wider" style={{ color: "rgba(255,255,255,0.2)" }}>
                  VERROUILLÉ
                </span>
              </div>
            )
            : (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg"
                style={{ background: `${tool.color}10`, border: `1px solid ${tool.color}25` }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: tool.color }} />
                <span className="font-mono text-[9px] tracking-wider" style={{ color: tool.color }}>
                  ACTIF
                </span>
              </div>
            )
          }
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-6"
          style={{ color: tool.locked ? "rgba(255,255,255,0.18)" : "rgba(148,163,184,0.9)" }}>
          {tool.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] tracking-widest"
              style={{ color: tool.locked ? "rgba(255,255,255,0.12)" : "rgba(148,163,184,0.5)" }}>
              À PARTIR DE
            </span>
            <div className="font-extrabold text-xl mt-0.5"
              style={{ color: tool.locked ? "rgba(255,255,255,0.15)" : "white" }}>
              {tool.price}
              <span className="font-normal text-sm ml-1"
                style={{ color: tool.locked ? "rgba(255,255,255,0.1)" : "rgba(148,163,184,0.5)" }}>
                FCFA
              </span>
            </div>
          </div>

          {tool.locked
            ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.15)" }}>
                Quête verrouillée
              </div>
            )
            : (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold group-hover:gap-3 transition-all"
                style={{
                  background: `linear-gradient(135deg, ${tool.color}22, ${tool.color}10)`,
                  border: `1px solid ${tool.color}30`,
                  color: tool.color,
                }}>
                Commencer
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            )
          }
        </div>
      </div>

      {/* Locked overlay */}
      {tool.locked && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.08) 4px, rgba(0,0,0,0.08) 5px)" }} />
      )}
    </motion.div>
  );

  if (tool.active && tool.href) {
    return <Link href={tool.href} style={{ textDecoration: "none", display: "block" }}>{cardContent}</Link>;
  }
  return cardContent;
}

export default function ServicesIndex({ site }) {
  const randomRunes = RUNES.slice(0, 12);

  return (
    <>
      <Head title="Services — KoriLab" />
      <Navbar />

      <main className="min-h-screen" style={{ background: "#040d1a" }}>
        {/* Background runes */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {randomRunes.map((r, i) => (
            <RuneFloat key={i} rune={r} style={{
              left: `${5 + (i * 8.5) % 92}%`,
              top: `${8 + (i * 13) % 82}%`,
            }} />
          ))}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(56,189,248,0.04) 0%, transparent 70%)"
          }} />
        </div>

        <div className="relative z-10 section-padding mx-auto max-w-6xl pt-32 pb-20">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-12"
          >
            <Link href="/" className="font-mono text-[11px] tracking-widest text-sky-400/40 hover:text-sky-400/70 transition-colors" style={{ textDecoration: "none" }}>
              ACCUEIL
            </Link>
            <ChevronRight className="w-3 h-3 text-sky-400/20" />
            <span className="font-mono text-[11px] tracking-widest text-sky-400/70">SERVICES</span>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] tracking-[0.3em] px-3 py-1.5 rounded-lg"
                style={{ color: "#38bdf8", background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.15)" }}>
                SYSTÈME — INTERFACE SERVICES
              </span>
            </div>
            <h1 className="font-extrabold text-4xl md:text-5xl text-white mb-4 leading-tight">
              Mini-services
            </h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Des micro-services prêts à l'emploi. Remplis, paye, récupère ton fichier. Aucun compte requis.
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-6 mb-12 pb-8 border-b"
            style={{ borderColor: "rgba(56,189,248,0.08)" }}
          >
            {[
              { label: "Quêtes actives", value: "1" },
              { label: "Quêtes à venir", value: "3" },
              { label: "Délai moyen", value: "< 5 min" },
              { label: "Paiement", value: "Wave · OM" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-extrabold text-xl text-white">{stat.value}</span>
                <span className="font-mono text-[10px] tracking-wider text-slate-500">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Tools grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TOOLS.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center font-mono text-[11px] tracking-widest mt-16"
            style={{ color: "rgba(56,189,248,0.25)" }}
          >
            ᚠ — D'autres quêtes seront débloquées prochainement — ᚠ
          </motion.p>
        </div>
      </main>

      <Footer />
    </>
  );
}
