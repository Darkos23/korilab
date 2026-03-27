import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FolderOpen, Wrench, Globe, Users, ArrowUpRight, ExternalLink, MessageSquare } from "lucide-react";
import Sidebar from "@/Components/dashboard/Sidebar";
import { StatusBar } from "@/Components/dashboard/SystemLayout";

const INK    = '#111827';
const MUTED  = '#6B7280';
const BORDER = '#E5E7EB';
const TERRA  = '#C84818';
const GOLD   = '#B87820';

const ACTIONS = [
  { href: "/dashboard/portfolio", icon: FolderOpen,   label: "Gérer les projets",    desc: "Ajouter / modifier des réalisations",  tag: "Portfolio"  },
  { href: "/dashboard/services",  icon: Wrench,        label: "Modifier les services", desc: "Offres et capacités du studio",        tag: "Services"   },
  { href: "/dashboard/team",      icon: Users,         label: "Éditer les CV",         desc: "Dossiers et profils de l'équipe",      tag: "Équipe"     },
  { href: "/dashboard/site",      icon: Globe,         label: "Paramètres du site",    desc: "Infos de contact et configuration",    tag: "Système"    },
  { href: "/dashboard/messages",  icon: MessageSquare, label: "Messages reçus",        desc: "Demandes clients via le formulaire",   tag: "Inbox"      },
];

function StatCard({ label, value, icon: Icon, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6"
      style={{ border: `1px solid ${BORDER}`, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', fontFamily: "'Inter', sans-serif" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(200,72,24,0.08)' }}>
          {Icon && <Icon size={16} style={{ color: TERRA }} />}
        </div>
        <div className="w-2 h-2 rounded-full" style={{ background: TERRA, opacity: 0.5 }} />
      </div>
      <div className="text-3xl font-bold mb-1" style={{ color: INK, fontFamily: "'Playfair Display', serif" }}>{value}</div>
      <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: INK }}>{label}</div>
      {sub && <div className="text-xs" style={{ color: MUTED }}>{sub}</div>}
    </motion.div>
  );
}

function ActionCard({ href, icon: Icon, label, desc, tag, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Link href={href}
        className="group flex items-center gap-4 p-4 bg-white rounded-xl transition-all duration-150"
        style={{ border: `1px solid ${BORDER}`, boxShadow: '0 1px 2px rgba(0,0,0,0.04)', fontFamily: "'Inter', sans-serif" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = TERRA; e.currentTarget.style.boxShadow = '0 4px 12px rgba(200,72,24,0.08)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.04)'; }}
      >
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(200,72,24,0.07)' }}>
          <Icon size={16} style={{ color: TERRA }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold" style={{ color: INK }}>{label}</span>
            <ArrowUpRight size={13} style={{ color: TERRA }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-xs mt-0.5" style={{ color: MUTED }}>{desc}</p>
        </div>
        <span className="text-[10px] font-medium px-2 py-1 rounded-md flex-shrink-0"
          style={{ color: MUTED, background: '#F3F4F6' }}>
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
    <div className="min-h-screen flex" style={{ background: '#F4F5F7', fontFamily: "'Inter', sans-serif" }}>
      <Sidebar admin={admin} />

      <main className="flex-1 p-8 pt-16 md:pt-8 overflow-auto">

        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: MUTED }}>Tableau de bord</p>
            <h1 className="text-3xl font-bold mb-1" style={{ color: INK, fontFamily: "'Playfair Display', serif" }}>
              Bonjour, <span style={{ color: TERRA }}>{admin?.name}</span>
            </h1>
            <p className="text-sm" style={{ color: MUTED }}>Voici un aperçu de votre studio.</p>
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium transition-all"
            style={{ border: `1px solid ${BORDER}`, color: INK, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = TERRA; e.currentTarget.style.color = TERRA; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = INK; }}
          >
            <ExternalLink size={14} />
            Voir le site
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} transition={{ delay: 0.05 * i }}>
              <StatCard {...s} />
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: MUTED }}>Actions rapides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ACTIONS.map((a, i) => (
              <ActionCard key={a.href} {...a} delay={0.1 + i * 0.05} />
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
