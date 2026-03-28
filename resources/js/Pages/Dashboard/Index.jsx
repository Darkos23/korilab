import { Link } from "@inertiajs/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen, Wrench, Globe, Users, ArrowUpRight, ExternalLink, MessageSquare } from "lucide-react";
import Sidebar from "@/Components/dashboard/Sidebar";
import TopBar from "@/Components/dashboard/TopBar";
import { SLSystemBG, StatusBar } from "@/Components/dashboard/SystemLayout";

/* ── Palette Washi soft ── */
const INK    = '#1C1A16';
const INK2   = '#5A5448';
const INK3   = 'rgba(0,0,0,0.06)';
const TERRA  = '#B43028';
const GOLD   = '#8A5A18';
const CARD   = '#F5EAD5';
const FONT   = "'Century Gothic', 'Trebuchet MS', sans-serif";

const ACTIONS = [
  { href: "/dashboard/portfolio", icon: FolderOpen,   label: "Gérer les projets",    desc: "Ajouter / modifier des réalisations", tag: "PORTFOLIO" },
  { href: "/dashboard/services",  icon: Wrench,        label: "Modifier les services", desc: "Offres et capacités du studio",       tag: "SERVICES"  },
  { href: "/dashboard/team",      icon: Users,         label: "Éditer les CV",         desc: "Dossiers et profils de l'équipe",     tag: "ÉQUIPE"    },
  { href: "/dashboard/site",      icon: Globe,         label: "Paramètres du site",    desc: "Infos de contact et configuration",   tag: "SYSTÈME"   },
  { href: "/dashboard/messages",  icon: MessageSquare, label: "Messages reçus",        desc: "Demandes clients via le formulaire",  tag: "INBOX"     },
];

const RANK_DOT = { S: '#3A6840', A: '#3A6840', B: '#8A5A18', C: '#B4AEA4' };

/* ── Stat Card ── */
function StatCard({ label, value, icon: Icon, sub, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="rounded-xl p-5 paper-card"
      style={{ background: CARD, border: `1px solid ${INK3}`, borderLeft: `3px solid ${TERRA}`, boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
      <div className="flex items-center justify-between mb-3">
        {Icon && <Icon size={14} style={{ color: INK3 }} />}
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: TERRA }} />
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
        className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-200 paper-card"
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
function RightSidebar({ admin, members }) {
  return (
    <div className="flex flex-col gap-4" style={{ width: 248, flexShrink: 0 }}>

      {/* Site card */}
      <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
        className="rounded-xl p-4 paper-card"
        style={{ background: CARD, border: `1px solid ${INK3}`, boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
        <div className="font-mono text-[9px] uppercase tracking-widest mb-2" style={{ color: '#B4AEA4' }}>korilab.dev</div>
        <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: INK, lineHeight: 1.35, fontStyle: 'italic' }}>
          Nous créons des projets <span style={{ color: TERRA }}>hauts de gammes</span>
        </p>
        <p style={{ fontFamily: FONT, fontSize: 11, color: '#B4AEA4', marginTop: 8 }}>Design · Dev · Stratégie · Dakar</p>
      </motion.div>

      {/* Équipe */}
      <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
        className="rounded-xl overflow-hidden paper-card"
        style={{ background: CARD, border: `1px solid ${INK3}`, boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: INK3 }}>
          <span style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: INK2, textTransform: 'uppercase', letterSpacing: '0.3em' }}>Équipe</span>
          <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: '#B4AEA4' }}>{members.length}</span>
        </div>
        <div className="px-3 py-1">
          {members.map((m, i) => {
            const isLead = m.rank === 'S';
            return (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b last:border-0" style={{ borderColor: INK3 }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-[10px] font-bold"
                  style={isLead
                    ? { background: 'rgba(180,48,40,0.09)', color: TERRA }
                    : { background: '#F2EDE5', color: '#8A8478' }
                  }>
                  {m.initials || (m.name ?? '?').charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate" style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: INK }}>{m.name}</div>
                  <div className="truncate" style={{ fontFamily: FONT, fontSize: 11, color: '#B4AEA4', marginTop: 1 }}>{m.role}</div>
                </div>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: RANK_DOT[m.rank] ?? '#B4AEA4' }} />
              </div>
            );
          })}
          {members.length === 0 && (
            <p className="text-xs py-4 text-center" style={{ color: '#B4AEA4', fontFamily: FONT }}>Aucun membre</p>
          )}
        </div>
      </motion.div>

    </div>
  );
}

/* ── Page ── */
export default function DashboardIndex({ admin, portfolioCount, servicesCount, unreadMessages, members = [] }) {
  const [collapsed, setCollapsed] = useState(false);
  const stats = [
    { label: "Projets actifs",   value: portfolioCount, icon: FolderOpen,    sub: "Réalisations en ligne", delay: 0.1  },
    { label: "Services actifs",  value: servicesCount,  icon: Wrench,        sub: "Offres du studio",      delay: 0.15 },
    { label: "Messages non lus", value: unreadMessages, icon: MessageSquare, sub: "Demandes en attente",   delay: 0.2  },
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: '#F8F5EF' }}>
      <SLSystemBG />
      <Sidebar admin={admin} />

      <main className="relative z-10 flex-1 overflow-auto flex flex-col">
        <TopBar admin={admin} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
        <div className="p-6 md:p-8 pb-10 flex-1">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: TERRA }} />
              <span className="font-mono text-[9px] uppercase tracking-[0.35em]" style={{ color: INK2 }}>
                KoriLab — Tableau de bord
              </span>
            </div>
            <h1 style={{ fontFamily: FONT, fontSize: 30, fontWeight: 800, color: INK }}>
              Bienvenue, <span style={{ color: TERRA }}>{admin?.name}</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-[10px] px-2 py-0.5 rounded"
                style={{ background: 'rgba(180,48,40,0.08)', color: TERRA, border: '1px solid rgba(180,48,40,0.18)' }}>
                {admin?.rank}-Class
              </span>
              <span style={{ fontFamily: FONT, fontSize: 11, color: INK2 }}>Admin KoriLab</span>
            </div>
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
            style={{ background: CARD, border: `1px solid ${INK3}`, color: INK, fontFamily: FONT, fontSize: 12, fontWeight: 600 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = TERRA; e.currentTarget.style.color = TERRA; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = INK3; e.currentTarget.style.color = INK; }}>
            <ExternalLink size={13} /> Voir le site
          </a>
        </motion.div>

        {/* ── Stats row (full width) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* ── Main grid: actions (gauche) + sidebar (droite) ── */}
        <div className="flex gap-6 items-start">

          {/* Actions */}
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            {ACTIONS.map((a, i) => <ActionCard key={a.href} {...a} delay={0.25 + i * 0.05} />)}
          </div>

          {/* Right sidebar */}
          <div className="hidden lg:block">
            <RightSidebar admin={admin} members={members} />
          </div>

        </div>

        </div>
      </main>

      <StatusBar admin={admin} />
    </div>
  );
}
