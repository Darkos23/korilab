import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FolderOpen, Wrench, Globe, Users, ArrowUpRight, ExternalLink, MessageSquare } from "lucide-react";
import Sidebar from "@/Components/dashboard/Sidebar";
import WhatsAppFloat from "@/Components/WhatsAppFloat";
import { SLSystemBG, SysWin, StatBadge, SysNotif, SysDivider, StatusBar, RankBadge } from "@/Components/dashboard/SystemLayout";

const QUESTS = [
  { href: "/dashboard/portfolio", icon: FolderOpen,    label: "Gérer les projets",    desc: "Ajouter / modifier des réalisations",     tag: "PORTFOLIO"  },
  { href: "/dashboard/services",  icon: Wrench,         label: "Modifier les services", desc: "Offres et capacités du studio",           tag: "SERVICES"   },
  { href: "/dashboard/team",      icon: Users,          label: "Éditer les CV",         desc: "Dossiers et profils de l'équipe",         tag: "ÉQUIPE"     },
  { href: "/dashboard/site",      icon: Globe,          label: "Paramètres du site",    desc: "Infos de contact et configuration",       tag: "SYSTÈME"    },
  { href: "/dashboard/messages",  icon: MessageSquare,  label: "Messages reçus",        desc: "Demandes clients via le formulaire",      tag: "INBOX"      },
];

export default function DashboardIndex({ admin, portfolioCount, servicesCount, unreadMessages }) {
  const stats = [
    { label: "Projets actifs",   value: portfolioCount, icon: FolderOpen,    sub: "Réalisations en ligne"    },
    { label: "Services actifs",  value: servicesCount,  icon: Wrench,        sub: "Offres du studio"         },
    { label: "Messages non lus", value: unreadMessages, icon: MessageSquare, sub: "Demandes en attente"      },
  ];

  return (
    <div className="min-h-screen bg-transparent flex relative overflow-hidden">
      <SLSystemBG />

      <Sidebar admin={admin} />

      <main className="relative z-10 flex-1 p-4 md:p-8 pt-16 md:pt-8 overflow-auto">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: '#d4a235', boxShadow: '0 0 6px 2px rgba(212,162,56,0.7)' }} />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em]"
                style={{ color: 'rgba(240,228,196,0.35)' }}>
                KoriLab — Tableau de bord
              </span>
            </div>
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded font-mono text-xs transition-all duration-200"
              style={{
                border: '1px solid rgba(212,162,56,0.28)',
                color: '#d4a235',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(212,162,56,0.08)';
                e.currentTarget.style.borderColor = 'rgba(212,162,56,0.55)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(212,162,56,0.28)';
              }}
            >
              <ExternalLink size={12} />
              Voir le site
            </a>
          </div>

          <h1 className="text-4xl font-black mb-2" style={{ color: '#f0e4c4', textShadow: '0 0 30px rgba(212,162,56,0.15)' }}>
            Bienvenue,{" "}
            <span style={{ color: '#d4a235', textShadow: '0 0 20px rgba(212,162,56,0.45)' }}>
              {admin?.name}
            </span>
          </h1>

          <div className="flex items-center gap-3">
            <RankBadge rank={admin?.rank} />
            <span className="text-xs font-black font-mono"
              style={{ color: admin?.rank === 'S' ? '#d4a235' : '#f0e4c4' }}>
              {admin?.rank}-CLASS
            </span>
            <span className="font-mono text-xs" style={{ color: 'rgba(240,228,196,0.2)' }}>|</span>
            <span className="text-xs font-mono" style={{ color: 'rgba(240,228,196,0.3)' }}>
              Accès administrateur confirmé
            </span>
          </div>
        </motion.div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}>
              <StatBadge {...s} />
            </motion.div>
          ))}
        </div>

        <SysDivider label="Actions disponibles" />

        {/* ── Quests ── */}
        <SysWin title="MENU PRINCIPAL" subtitle="Sélectionnez une action" delay={0.3}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUESTS.map((q, i) => (
              <motion.div key={q.href}
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.07 }}>
                <Link href={q.href}
                  className="group relative flex items-start gap-4 p-4 rounded transition-all duration-300 overflow-hidden"
                  style={{
                    border: '1px solid rgba(212,162,56,0.12)',
                    background: 'rgba(212,162,56,0.02)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(212,162,56,0.32)';
                    e.currentTarget.style.background  = 'rgba(212,162,56,0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(212,162,56,0.12)';
                    e.currentTarget.style.background  = 'rgba(212,162,56,0.02)';
                  }}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded flex items-center justify-center transition-colors"
                    style={{ border: '1px solid rgba(212,162,56,0.15)', background: 'rgba(212,162,56,0.06)' }}>
                    <q.icon className="w-4 h-4" style={{ color: 'rgba(212,162,56,0.55)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold font-mono" style={{ color: 'rgba(240,228,196,0.8)' }}>
                        {q.label}
                      </span>
                      <ArrowUpRight className="w-3 h-3" style={{ color: 'rgba(212,162,56,0.4)' }} />
                    </div>
                    <p className="text-xs font-mono" style={{ color: 'rgba(240,228,196,0.28)' }}>{q.desc}</p>
                  </div>
                  <span className="text-[8px] font-mono uppercase tracking-widest self-start mt-1"
                    style={{ color: 'rgba(212,162,56,0.25)' }}>
                    {q.tag}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </SysWin>

        {/* ── Message système ── */}
        <div className="mt-4">
          <SysNotif>
            « Chaque création porte l'empreinte de celui qui la forge. Bâtissez avec soin. »
          </SysNotif>
        </div>

      </main>
      <WhatsAppFloat />
      <StatusBar admin={admin} />
    </div>
  );
}
