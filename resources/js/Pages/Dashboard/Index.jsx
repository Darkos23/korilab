import { Link } from "@inertiajs/react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen, Wrench, Globe, Users, ArrowUpRight,
  ExternalLink, MessageSquare, FolderKanban,
  AlertTriangle, Clock, FileText,
} from "lucide-react";
import Sidebar from "@/Components/dashboard/Sidebar";
import TopBar from "@/Components/dashboard/TopBar";
import { SLSystemBG, StatusBar } from "@/Components/dashboard/SystemLayout";

/* ── Palette ── */
const INK   = '#1C1A16';
const INK2  = '#5A5448';
const INK3  = 'rgba(0,0,0,0.06)';
const TERRA = '#B43028';
const GOLD  = '#8A5A18';
const CARD  = '#FDFBF7';
const FONT  = "'Century Gothic', 'Trebuchet MS', sans-serif";

const ACTIONS = [
  { href: "/dashboard/portfolio", icon: FolderOpen,    label: "Gérer les projets",    desc: "Ajouter / modifier des réalisations", tag: "PORTFOLIO" },
  { href: "/dashboard/services",  icon: Wrench,         label: "Modifier les services", desc: "Offres et capacités du studio",       tag: "SERVICES"  },
  { href: "/dashboard/projets",   icon: FolderKanban,   label: "Suivi des projets",     desc: "Statuts, deadlines, clients",         tag: "SUIVI"     },
  { href: "/dashboard/team",      icon: Users,          label: "Éditer les CV",         desc: "Dossiers et profils de l'équipe",     tag: "ÉQUIPE"    },
  { href: "/dashboard/messages",  icon: MessageSquare,  label: "Messages reçus",        desc: "Demandes clients via le formulaire",  tag: "INBOX"     },
  { href: "/dashboard/site",      icon: Globe,          label: "Paramètres du site",    desc: "Infos de contact et configuration",   tag: "SYSTÈME"   },
];

const STATUS_LABELS = {
  en_attente:   'En attente',
  en_cours:     'En cours',
  en_pause:     'En pause',
  en_retard:    'En retard',
  terminé:      'Terminé',
  annulé:       'Annulé',
};

/* ── Stat Card ── */
function StatCard({ label, value, icon: Icon, sub, accent, delay }) {
  const color = accent ?? TERRA;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="rounded-xl p-5 paper-card"
      style={{ background: CARD, border: `1px solid ${INK3}`, borderLeft: `3px solid ${color}`, boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
      <div className="flex items-center justify-between mb-3">
        {Icon && <Icon size={14} style={{ color: INK3 }} />}
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      </div>
      <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 800, color: INK, lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: INK2, textTransform: 'uppercase', letterSpacing: '0.35em', marginTop: 6 }}>{label}</div>
      {sub && <div style={{ fontFamily: FONT, fontSize: 11, color: '#B4AEA4', marginTop: 3 }}>{sub}</div>}
    </motion.div>
  );
}

/* ── Action Card ── */
function ActionCard({ href, icon: Icon, label, desc, tag, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Link href={href}
        className="group flex items-center gap-3 p-3 md:p-4 rounded-xl transition-all duration-200 paper-card"
        style={{ background: CARD, border: `1px solid ${INK3}`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = TERRA; e.currentTarget.style.boxShadow = '0 4px 14px rgba(180,48,40,0.08)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = INK3; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; }}
      >
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(180,48,40,0.07)', border: '1px solid rgba(180,48,40,0.15)' }}>
          <Icon size={16} style={{ color: TERRA }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 13, color: INK }}>{label}</span>
            <ArrowUpRight size={13} style={{ color: TERRA }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p style={{ fontFamily: FONT, fontSize: 11, color: INK2 }}>{desc}</p>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded flex-shrink-0"
          style={{ color: GOLD, background: 'rgba(138,90,24,0.08)', border: '1px solid rgba(138,90,24,0.18)' }}>
          {tag}
        </span>
      </Link>
    </motion.div>
  );
}

/* ── Right Sidebar ── */
const PF = "'Playfair Display', serif";
const JO = "'Jost', sans-serif";
const DM = "'DM Mono', monospace";
const DOT_COLORS = ['#5A9860', '#5A9860', '#8B6914'];

function RightSidebar({ admin, members }) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>

      {/* Hero */}
      <div style={{ background: '#F8F5F0', border: '0.5px solid #E8E4DC', borderLeft: '2px solid #1A1714', borderRadius: 2, padding: '0.8rem' }}>
        <div style={{ fontFamily: DM, fontSize: 8, color: '#B0A898', letterSpacing: '1px', marginBottom: '0.4rem' }}>korilab.dev</div>
        <p style={{ margin: 0, fontFamily: PF, fontSize: 16, fontWeight: 400, color: '#1A1714', lineHeight: 1.3, fontStyle: 'italic' }}>
          Nous créons des projets <b style={{ fontStyle: 'normal', color: '#8B6914', fontWeight: 700 }}>hauts de gammes</b>
        </p>
        <p style={{ margin: '0.4rem 0 0', fontFamily: JO, fontSize: 11, fontWeight: 300, color: '#A8A098', letterSpacing: '0.2px' }}>Design · Dev · Stratégie · Dakar</p>
      </div>

      {/* Séparateur */}
      <div style={{ height: '0.5px', background: '#E8E4DC', margin: '0.2rem 0' }} />

      {/* Équipe */}
      <div>
        <div style={{ fontFamily: DM, fontSize: 8, color: '#8B6914', letterSpacing: '2px', opacity: 0.5, marginBottom: '0.5rem' }}>Équipe</div>
        {members.map((m, i) => (
          <div key={i} style={{ background: '#F8F5F0', border: '0.5px solid #E8E4DC', borderRadius: 2, padding: '0.65rem 0.75rem', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#F8F5F0', border: '0.5px solid #D8D4CC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 500, color: '#8A8278', flexShrink: 0 }}>
              {m.initials || (m.name ?? '?').slice(0, 2).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: JO, fontSize: 12, fontWeight: 400, color: '#3A3630' }}>{m.name}</div>
              <div style={{ fontFamily: JO, fontSize: 10, color: '#A8A098' }}>{m.role}</div>
            </div>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: DOT_COLORS[i % DOT_COLORS.length], flexShrink: 0 }} />
          </div>
        ))}
      </div>

    </div>
  );
}

/* ── Page ── */
export default function DashboardIndex({
  admin, portfolioCount, servicesCount, unreadMessages,
  members = [], projetsEnCours = 0, projetsEnRetard = 0,
  urgentProjects = [], recentMessages = [], factures = [],
}) {
  const [collapsed, setCollapsed] = useState(false);

  const stats = [
    { label: "Réalisations",      value: portfolioCount,  icon: FolderOpen,    sub: "Projets portfolio",     accent: TERRA, delay: 0.08 },
    { label: "Services actifs",   value: servicesCount,   icon: Wrench,        sub: "Offres du studio",      accent: GOLD,  delay: 0.12 },
    { label: "Projets en cours",  value: projetsEnCours,  icon: FolderKanban,  sub: projetsEnRetard > 0 ? `${projetsEnRetard} en retard` : 'Tous à jour', accent: projetsEnRetard > 0 ? TERRA : '#3A6840', delay: 0.16 },
    { label: "Messages non lus",  value: unreadMessages,  icon: MessageSquare, sub: "Demandes en attente",   accent: unreadMessages > 0 ? TERRA : INK2, delay: 0.2 },
  ];

  return (
    <div className="min-h-screen w-full max-w-full flex flex-col relative overflow-hidden" style={{ background: '#F8F5EF' }}>
      <SLSystemBG />

      {/* TopBar pleine largeur */}
      <div className="relative z-20">
        <TopBar admin={admin} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      </div>

      {/* Corps — sidebar gauche + contenu + sidebar droite */}
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar admin={admin} />

        <main className="flex-1 overflow-auto flex flex-col min-w-0">
          <div className="p-4 md:p-6 lg:p-8 pb-20 flex-1">

          {/* ── Header ── */}
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: TERRA }} />
                <span className="font-mono text-[9px] uppercase tracking-[0.35em]" style={{ color: INK2 }}>
                  KoriLab — Tableau de bord
                </span>
              </div>
              <h1 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 800, color: INK }}>
                Bienvenue, <span style={{ color: TERRA }}>{admin?.name}</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span style={{ fontFamily: FONT, fontSize: 11, color: INK2 }}>{admin?.title ?? 'Admin KoriLab'}</span>
              </div>
            </div>
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 flex-shrink-0"
              style={{ background: CARD, border: `1px solid ${INK3}`, color: INK, fontFamily: FONT, fontSize: 12, fontWeight: 600 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = TERRA; e.currentTarget.style.color = TERRA; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = INK3; e.currentTarget.style.color = INK; }}>
              <ExternalLink size={13} /> Voir le site
            </a>
          </motion.div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {stats.map(s => <StatCard key={s.label} {...s} />)}
          </div>

          {/* ── Actions ── */}
          <div className="flex flex-col gap-3">
            {ACTIONS.map((a, i) => <ActionCard key={a.href} {...a} delay={0.25 + i * 0.05} />)}
          </div>

          </div>
        </main>

        {/* ── Right Sidebar ── */}
        <div className="hidden xl:flex flex-col relative z-10 overflow-y-auto"
        style={{
          width: 280,
          flexShrink: 0,
          borderLeft: `1px solid ${INK3}`,
          background: '#FDFBF7',
          padding: '24px 16px 80px',
          gap: 16,
        }}>
        <RightSidebar
          admin={admin}
          members={members}
        />
        </div>

      </div>

      <StatusBar admin={admin} />
    </div>
  );
}
