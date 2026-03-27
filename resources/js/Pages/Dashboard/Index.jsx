import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FolderOpen, Wrench, Globe, Users, ArrowUpRight, ExternalLink, MessageSquare } from "lucide-react";
import Sidebar from "@/Components/dashboard/Sidebar";
import WhatsAppFloat from "@/Components/WhatsAppFloat";
import { SLSystemBG, StatusBar, RankBadge } from "@/Components/dashboard/SystemLayout";

/* ── Palette MelanoGeek ── */
const INK    = '#1E0E04';
const INK2   = 'rgba(30,14,4,0.52)';
const INK3   = 'rgba(30,14,4,0.12)';
const TERRA  = '#C84818';
const GOLD   = '#B87820';
const BG     = '#F5EDD6';

/* Soft UI shadows */
const RAISED    = '5px 5px 12px rgba(180,130,60,0.18), -5px -5px 12px rgba(255,255,255,0.52)';
const RAISED_SM = '3px 3px 8px rgba(180,130,60,0.14), -3px -3px 8px rgba(255,255,255,0.48)';
const INSET     = 'inset 3px 3px 7px rgba(180,130,60,0.16), inset -3px -3px 7px rgba(255,255,255,0.5)';

const ACTIONS = [
  { href: "/dashboard/portfolio", icon: FolderOpen,   label: "Gérer les projets",    desc: "Ajouter / modifier des réalisations",  tag: "PORTFOLIO" },
  { href: "/dashboard/services",  icon: Wrench,        label: "Modifier les services", desc: "Offres et capacités du studio",        tag: "SERVICES"  },
  { href: "/dashboard/team",      icon: Users,         label: "Éditer les CV",         desc: "Dossiers et profils de l'équipe",      tag: "ÉQUIPE"    },
  { href: "/dashboard/site",      icon: Globe,         label: "Paramètres du site",    desc: "Infos de contact et configuration",    tag: "SYSTÈME"   },
  { href: "/dashboard/messages",  icon: MessageSquare, label: "Messages reçus",        desc: "Demandes clients via le formulaire",   tag: "INBOX"     },
];

function StatCard({ label, value, icon: Icon, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-6"
      style={{ background: BG, boxShadow: RAISED }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: BG, boxShadow: INSET }}>
          {Icon && <Icon size={16} style={{ color: TERRA }} />}
        </div>
        <motion.div className="w-2 h-2 rounded-full"
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
          style={{ background: TERRA }} />
      </div>
      <div className="text-4xl font-black mb-1" style={{ color: INK, fontFamily: 'serif' }}>{value}</div>
      <div className="text-xs uppercase tracking-widest font-semibold mb-0.5" style={{ color: INK }}>{label}</div>
      {sub && <div className="text-xs" style={{ color: INK2 }}>{sub}</div>}
    </motion.div>
  );
}

function ActionCard({ href, icon: Icon, label, desc, tag, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link
        href={href}
        className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-200"
        style={{ background: BG, boxShadow: RAISED_SM }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = RAISED; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = RAISED_SM; }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: BG, boxShadow: INSET }}>
          <Icon size={18} style={{ color: TERRA }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-bold text-sm" style={{ color: INK }}>{label}</span>
            <ArrowUpRight size={14} style={{ color: TERRA }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-xs" style={{ color: INK2 }}>{desc}</p>
        </div>
        <span className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-1.5 rounded-lg"
          style={{ color: GOLD, background: BG, boxShadow: INSET }}>
          {tag}
        </span>
      </Link>
    </motion.div>
  );
}

export default function DashboardIndex({ admin, portfolioCount, servicesCount, unreadMessages }) {
  const stats = [
    { label: "Projets actifs",   value: portfolioCount, icon: FolderOpen,    sub: "Réalisations en ligne" },
    { label: "Services actifs",  value: servicesCount,  icon: Wrench,        sub: "Offres du studio"      },
    { label: "Messages non lus", value: unreadMessages, icon: MessageSquare, sub: "Demandes en attente"   },
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: '#F5EDD6' }}>
      <SLSystemBG />
      <Sidebar admin={admin} />

      <main className="relative z-10 flex-1 p-6 md:p-10 pt-16 md:pt-10 overflow-auto pb-10">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: TERRA }} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono" style={{ color: INK2 }}>
                KoriLab — Tableau de bord
              </span>
            </div>
            <h1 className="text-4xl font-black mb-2" style={{ color: INK, fontFamily: 'serif' }}>
              Bienvenue,{" "}
              <span style={{ color: TERRA }}>{admin?.name}</span>
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-2 py-0.5 rounded"
                style={{ background: `rgba(200,72,24,0.1)`, color: TERRA, border: `1px solid rgba(200,72,24,0.2)` }}>
                {admin?.rank}-Class
              </span>
              <span className="text-xs" style={{ color: INK2 }}>Admin KoriLab</span>
            </div>
          </div>

          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
            style={{ background: BG, boxShadow: RAISED_SM, color: INK }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = TERRA; e.currentTarget.style.color = TERRA; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = INK3; e.currentTarget.style.color = INK; }}
          >
            <ExternalLink size={13} />
            Voir le site
          </a>
        </motion.div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} transition={{ delay: 0.1 + i * 0.08 }}>
              <StatCard {...s} />
            </motion.div>
          ))}
        </div>

        {/* ── Séparateur ── */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px" style={{ background: INK3 }} />
          <span className="text-[9px] uppercase tracking-[0.35em] font-mono" style={{ color: INK2 }}>
            ◆ Actions ◆
          </span>
          <div className="flex-1 h-px" style={{ background: INK3 }} />
        </div>

        {/* ── Actions ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ACTIONS.map((a, i) => (
            <ActionCard key={a.href} {...a} delay={0.2 + i * 0.06} />
          ))}
        </div>

        {/* ── Citation ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="mt-8 px-5 py-4 rounded-xl"
          style={{ background: BG, boxShadow: RAISED_SM, borderLeft: `3px solid ${GOLD}` }}
        >
          <p className="text-sm italic" style={{ color: INK2 }}>
            « Chaque création porte l'empreinte de celui qui la forge. Bâtissez avec soin. »
          </p>
        </motion.div>

      </main>

      <WhatsAppFloat />
      <StatusBar admin={admin} />
    </div>
  );
}
