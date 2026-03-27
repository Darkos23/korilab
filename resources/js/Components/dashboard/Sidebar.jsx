import { Link, router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Briefcase, Wrench, Globe, LogOut, Users, Menu, X, MessageSquare } from "lucide-react";
import { useState } from "react";

const TERRA = '#C84818';
const INK   = '#1E0E04';
const DIM   = 'rgba(30,14,4,0.5)';
const MUTED = 'rgba(30,14,4,0.35)';
const GLASS = 'rgba(255,255,255,0.72)';

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
      style={{
        background: GLASS,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(255,255,255,0.5)',
        boxShadow: '4px 0 24px rgba(180,130,60,0.08)',
        flexShrink: 0,
        fontFamily: "'Inter', sans-serif",
      }}>

      {/* Logo */}
      <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(30,14,4,0.07)' }}>
        <div className="mb-4">
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: INK, letterSpacing: '-0.01em' }}>
            KoriLab
          </div>
          <div style={{ fontWeight: 400, fontSize: 10, color: MUTED, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 2 }}>
            Dakar · Studio
          </div>
        </div>

        {/* User card */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.7)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
            style={{ background: TERRA }}>
            {(admin?.name ?? 'A').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate" style={{ color: INK }}>{admin?.name ?? '—'}</div>
            <div className="text-[9px] uppercase tracking-widest" style={{ color: MUTED }}>Admin</div>
          </div>
          <motion.div className="w-2 h-2 rounded-full flex-shrink-0"
            animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ background: '#22c55e' }} />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map(({ href, icon: Icon, label, sub }) => {
          const active = url === href || (href !== '/dashboard' && url.startsWith(href));
          return (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150"
              style={{
                background: active ? TERRA : 'transparent',
                color: active ? '#fff' : INK,
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.6)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon size={15} style={{ opacity: active ? 1 : 0.6, flexShrink: 0 }} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate" style={{ color: active ? '#fff' : INK }}>{label}</div>
                <div className="text-[9px] uppercase tracking-wider" style={{ color: active ? 'rgba(255,255,255,0.7)' : MUTED }}>{sub}</div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5 pt-2" style={{ borderTop: '1px solid rgba(30,14,4,0.07)' }}>
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-xs font-medium"
          style={{ color: DIM, background: 'transparent' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,72,24,0.07)'; e.currentTarget.style.color = TERRA; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = DIM; }}
        >
          <LogOut size={14} style={{ opacity: 0.6 }} />
          Déconnexion
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: GLASS, backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.5)', color: INK }}>
        <Menu size={18} />
      </button>

      <div className="hidden md:block">
        <Content />
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-black/20 md:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} />
            <motion.div className="fixed left-0 top-0 bottom-0 z-50 md:hidden"
              initial={{ x: -230 }} animate={{ x: 0 }} exit={{ x: -230 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <div className="relative h-full">
                <button onClick={() => setOpen(false)}
                  className="absolute top-4 right-3 z-10 w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(30,14,4,0.06)', color: INK }}>
                  <X size={13} />
                </button>
                <Content />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
