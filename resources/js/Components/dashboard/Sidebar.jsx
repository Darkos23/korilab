import { Link, router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Briefcase, Wrench, Globe, LogOut, Users, Menu, X, MessageSquare } from "lucide-react";
import { useState } from "react";

/* ─── Tokens sidebar (fond très foncé) ───────────────────── */
const SIDEBAR_BG = '#1E0E04';
const TEXT       = '#FBF5E6';
const DIM        = 'rgba(251,245,230,0.6)';
const MUTED      = 'rgba(251,245,230,0.35)';
const BORDER     = 'rgba(251,245,230,0.1)';
const TERRA      = '#C84818';
const GOLD       = '#B87820';

const nav = [
  { href: '/dashboard',           icon: LayoutDashboard, label: "Vue d'ensemble", sub: 'Tableau central'    },
  { href: '/dashboard/portfolio', icon: Briefcase,       label: 'Portfolio',      sub: 'Réalisations'       },
  { href: '/dashboard/services',  icon: Wrench,          label: 'Services',       sub: 'Offres & capacités' },
  { href: '/dashboard/team',      icon: Users,           label: 'Équipe / CV',    sub: 'Profils'            },
  { href: '/dashboard/site',      icon: Globe,           label: 'Paramètres',     sub: 'Config. site'       },
  { href: '/dashboard/messages',  icon: MessageSquare,   label: 'Messages',       sub: 'Boîte de réception' },
];

export default function Sidebar({ admin }) {
  const { url } = usePage();
  const logout = () => router.post('/logout');
  const [open, setOpen] = useState(false);

  const Content = () => (
    <aside className="w-56 min-h-screen flex flex-col"
      style={{ background: SIDEBAR_BG, borderRight: `1px solid rgba(251,245,230,0.08)` }}>

      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b" style={{ borderColor: BORDER }}>
        <div className="mb-4">
          <div style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 16, color: TEXT, letterSpacing: '0.02em' }}>
            KoriLab
          </div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: 10, color: MUTED, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 2 }}>
            Dakar · Studio
          </div>
        </div>

        {/* User card */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
          style={{ background: 'rgba(251,245,230,0.06)', border: `1px solid ${BORDER}` }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: TERRA, color: TEXT, fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 11 }}>
            {(admin?.name ?? 'A').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 12, color: TEXT }} className="truncate">
              {admin?.name ?? '—'}
            </div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Admin
            </div>
          </div>
          <motion.div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: GOLD }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.3em' }}
          className="px-3 pb-2">
          Navigation
        </p>
        {nav.map((item, i) => {
          const active = url.startsWith(item.href) && (item.href !== '/dashboard' || url === '/dashboard');
          return (
            <motion.div key={item.href} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 + i * 0.04 }}>
              <Link href={item.href}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150"
                style={active
                  ? { background: 'rgba(200,72,24,0.12)', borderLeft: `3px solid ${TERRA}`, paddingLeft: 9, color: TEXT }
                  : { borderLeft: '3px solid transparent', paddingLeft: 9, color: DIM }
                }
              >
                <item.icon className="w-4 h-4 flex-shrink-0"
                  style={{ color: active ? TERRA : MUTED }} />
                <div className="flex-1 min-w-0">
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: active ? 600 : 400, fontSize: 12, color: active ? TEXT : DIM }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em' }} className="truncate">
                    {item.sub}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t" style={{ borderColor: BORDER }}>
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150"
          style={{ color: MUTED, borderLeft: '3px solid transparent', paddingLeft: 9 }}
          onMouseEnter={e => { e.currentTarget.style.color = '#e87070'; e.currentTarget.style.background = 'rgba(200,72,24,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = MUTED; e.currentTarget.style.background = 'transparent'; }}
        >
          <LogOut className="w-4 h-4" />
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: 12 }}>Déconnexion</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden md:flex"><Content /></div>

      <button onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 flex items-center justify-center rounded-lg"
        style={{ background: SIDEBAR_BG, color: TEXT, border: `1px solid ${BORDER}` }}>
        <Menu size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} className="md:hidden fixed inset-0 z-40 bg-black/60" />
            <motion.div initial={{ x: -230 }} animate={{ x: 0 }} exit={{ x: -230 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="md:hidden fixed top-0 left-0 z-50 h-full">
              <div className="relative">
                <Content />
                <button onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center z-20 rounded"
                  style={{ border: `1px solid ${BORDER}`, color: DIM, background: 'rgba(251,245,230,0.05)' }}>
                  <X size={12} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
