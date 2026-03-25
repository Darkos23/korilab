import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FolderOpen, Wrench, Globe, Users, ArrowUpRight, Activity, ExternalLink, MessageSquare } from "lucide-react";
import Sidebar from "@/Components/dashboard/Sidebar";
import WhatsAppFloat from "@/Components/WhatsAppFloat";
import { SystemGrid, SystemOrbs, ParticleNetwork, SysWin, StatBadge, SysNotif, SysDivider, StatusBar, RankBadge } from "@/Components/dashboard/SystemLayout";

const QUESTS = [
  { href: "/dashboard/portfolio", icon: FolderOpen, label: "Gérer les projets",    desc: "Ajouter / modifier des réalisations",     tag: "PORTFOLIO"  },
  { href: "/dashboard/services",  icon: Wrench,     label: "Modifier les services", desc: "Offres et capacités de la guilde",         tag: "SERVICES"   },
  { href: "/dashboard/team",      icon: Users,      label: "Éditer les CV",         desc: "Dossiers et profils des chasseurs",        tag: "ÉQUIPE"     },
  { href: "/dashboard/site",      icon: Globe,           label: "Paramètres du site",    desc: "Infos de contact et configuration",        tag: "SYSTÈME"    },
  { href: "/dashboard/messages",  icon: MessageSquare,   label: "Messages reçus",        desc: "Demandes clients via le formulaire",        tag: "INBOX"      },
];

export default function DashboardIndex({ admin, portfolioCount, servicesCount, unreadMessages }) {
  const stats = [
    { label: "Projets actifs",  value: portfolioCount,  icon: FolderOpen,     sub: "Réalisations en ligne"       },
    { label: "Services actifs", value: servicesCount,   icon: Wrench,         sub: "Capacités de la guilde"      },
    { label: "Messages non lus", value: unreadMessages, icon: MessageSquare,  sub: "Demandes en attente"         },
  ];

  return (
    <div className="min-h-screen bg-[#061525] flex relative overflow-hidden">
      <SystemGrid />
      <SystemOrbs />
      <ParticleNetwork />

      <Sidebar admin={admin} />

      <main className="relative z-10 flex-1 p-4 md:p-8 pt-16 md:pt-8 overflow-auto">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00a8ff] shadow-[0_0_6px_2px_rgba(0,168,255,0.8)] animate-pulse" />
              <span className="text-[10px] font-mono text-[#00a8ff]/40 uppercase tracking-[0.3em]">System — Tableau de bord</span>
            </div>
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded border border-[#00a8ff]/30 text-[#00a8ff] text-xs font-mono hover:bg-[#00a8ff]/10 hover:border-[#00a8ff]/60 transition-all duration-200">
              <ExternalLink size={12} />
              Voir le site
            </a>
          </div>

          <h1 className="text-4xl font-black text-white mb-2" style={{ textShadow: "0 0 30px rgba(0,168,255,0.2)" }}>
            Bienvenue,{" "}
            <span className="text-[#00a8ff]" style={{ textShadow: "0 0 20px rgba(0,168,255,0.6)" }}>
              {admin?.name}
            </span>
          </h1>

          <div className="flex items-center gap-3">
            <RankBadge rank={admin?.rank} />
            <span className="text-xs font-black font-mono" style={{ color: admin?.rank === 'S' ? '#D4AF37' : '#00a8ff' }}>
              {admin?.rank}-CLASS
            </span>
            <span className="text-white/20 text-xs font-mono">|</span>
            <span className="text-xs font-mono text-white/30">Accès administrateur confirmé</span>
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

        <SysDivider label="Quêtes disponibles" />

        {/* ── Quests ── */}
        <SysWin title="MENU PRINCIPAL" subtitle="Sélectionnez une quête" delay={0.3} glow>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUESTS.map((q, i) => (
              <motion.div key={q.href}
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.07 }}>
                <Link href={q.href}
                  className="group relative flex items-start gap-4 p-4 rounded-xl border border-[#00a8ff]/10
                    bg-[#00a8ff]/[0.02] hover:border-[#00a8ff]/30 hover:bg-[#00a8ff]/[0.06]
                    transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-0 group-hover:w-0.5 bg-[#00a8ff] transition-all duration-300
                    shadow-[0_0_8px_rgba(0,168,255,0.8)]" />
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg border border-[#00a8ff]/15 bg-[#00a8ff]/[0.06]
                    flex items-center justify-center group-hover:border-[#00a8ff]/30 transition-colors">
                    <q.icon className="w-4 h-4 text-[#00a8ff]/60 group-hover:text-[#00a8ff] transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{q.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#00a8ff]/0 group-hover:text-[#00a8ff]/60 transition-colors" />
                    </div>
                    <p className="text-xs text-white/25 group-hover:text-white/40 transition-colors">{q.desc}</p>
                  </div>
                  <span className="text-[8px] font-mono text-[#00a8ff]/20 group-hover:text-[#00a8ff]/40 uppercase tracking-widest self-start mt-1 transition-colors">
                    {q.tag}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </SysWin>

        {/* ── System message ── */}
        <div className="mt-4">
          <SysNotif>
            « Le Système surveille toutes les activités. Chaque modification est enregistrée dans les archives. »
          </SysNotif>
        </div>

      </main>
      <WhatsAppFloat />
      <StatusBar admin={admin} />
    </div>
  );
}
