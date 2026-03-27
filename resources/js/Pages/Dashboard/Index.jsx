import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FolderOpen, Wrench, Globe, Users, ArrowUpRight, ExternalLink, MessageSquare } from "lucide-react";
import Sidebar from "@/Components/dashboard/Sidebar";
import { StatusBar, T } from "@/Components/dashboard/SystemLayout";

const ACTIONS = [
  { href: "/dashboard/portfolio", icon: FolderOpen,   label: "Gérer les projets",    desc: "Ajouter / modifier des réalisations",  tag: "Portfolio"  },
  { href: "/dashboard/services",  icon: Wrench,        label: "Modifier les services", desc: "Offres et capacités du studio",        tag: "Services"   },
  { href: "/dashboard/team",      icon: Users,         label: "Éditer les CV",         desc: "Dossiers et profils de l'équipe",      tag: "Équipe"     },
  { href: "/dashboard/site",      icon: Globe,         label: "Paramètres du site",    desc: "Infos de contact et configuration",    tag: "Système"    },
  { href: "/dashboard/messages",  icon: MessageSquare, label: "Messages reçus",        desc: "Demandes clients via le formulaire",   tag: "Inbox"      },
];

function StatCard({ label, value, sub, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: T.card,
        borderRadius: 14,
        padding: '16px 18px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07), 0 0.5px 2px rgba(0,0,0,0.05)',
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, color: T.tx4, letterSpacing: '0.4px', marginBottom: 8, textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color: accent ? T.acc : T.tx, letterSpacing: '-1.2px', lineHeight: 1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12.5, fontWeight: 500, color: T.tx4, marginTop: 6 }}>{sub}</div>
      )}
    </motion.div>
  );
}

function ActionCard({ href, icon: Icon, label, desc, tag, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Link
        href={href}
        className="group flex items-center gap-4 p-4 transition-all duration-150"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '14px 16px',
          background: T.card,
          borderRadius: 14,
          boxShadow: '0 2px 16px rgba(0,0,0,0.07), 0 0.5px 2px rgba(0,0,0,0.05)',
          textDecoration: 'none',
          fontFamily: "'Nunito', sans-serif",
          transition: 'box-shadow 0.15s, border-color 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 4px 20px rgba(180,48,40,0.1), 0 1px 4px rgba(0,0,0,0.06)`; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07), 0 0.5px 2px rgba(0,0,0,0.05)'; }}
      >
        {/* Icon dot */}
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: T.acc2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={16} style={{ color: T.acc }} />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: T.tx2 }}>{label}</span>
            <ArrowUpRight size={13} style={{ color: T.acc, opacity: 0 }} className="group-hover:opacity-100 transition-opacity" />
          </div>
          <p style={{ fontSize: 12, fontWeight: 400, color: T.tx4, marginTop: 2 }}>{desc}</p>
        </div>

        {/* Tag */}
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          padding: '3px 9px',
          borderRadius: 8,
          background: T.s2,
          color: T.tx4,
          flexShrink: 0,
        }}>
          {tag}
        </span>
      </Link>
    </motion.div>
  );
}

export default function DashboardIndex({ admin, portfolioCount, servicesCount, unreadMessages }) {
  const stats = [
    { label: "Projets actifs",   value: portfolioCount ?? 0, sub: "Réalisations en ligne" },
    { label: "Services actifs",  value: servicesCount ?? 0,  sub: "Offres du studio" },
    { label: "Messages non lus", value: unreadMessages ?? 0, sub: "Demandes en attente", accent: (unreadMessages ?? 0) > 0 },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: T.bg, fontFamily: "'Nunito', sans-serif" }}>
      <Sidebar admin={admin} />

      <main style={{ flex: 1, padding: '32px 32px 48px', overflowY: 'auto' }} className="pt-16 md:pt-8">

        {/* Header */}
        <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: T.tx4, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 6 }}>
              Tableau de bord
            </p>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: T.tx, letterSpacing: '-0.6px', lineHeight: 1.2, marginBottom: 4 }}>
              Bonjour, <span style={{ color: T.acc }}>{admin?.name}</span>
            </h1>
            <p style={{ fontSize: 13.5, fontWeight: 400, color: T.tx3 }}>Voici un aperçu de votre studio.</p>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 16px',
              background: T.card,
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              color: T.tx2,
              textDecoration: 'none',
              boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
              border: `1px solid ${T.sep}`,
              transition: 'color 0.12s',
              flexShrink: 0,
              marginTop: 4,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = T.acc; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.tx2; }}
          >
            <ExternalLink size={14} />
            Voir le site
          </a>
        </div>

        {/* Stat row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10, marginBottom: 20 }}>
          {stats.map((s, i) => (
            <motion.div key={s.label} transition={{ delay: 0.05 * i }}>
              <StatCard {...s} />
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div>
          <p style={{ fontSize: 10.5, fontWeight: 700, color: T.tx5, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 10 }}>
            Actions rapides
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 10 }}>
            {ACTIONS.map((a, i) => (
              <ActionCard key={a.href} {...a} delay={0.1 + i * 0.05} />
            ))}
          </div>
        </div>

      </main>

      <StatusBar admin={admin} />
    </div>
  );
}
