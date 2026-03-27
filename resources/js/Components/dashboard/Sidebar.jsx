import { Link, router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Briefcase, Wrench, Globe, LogOut, Users, Menu, X, MessageSquare } from "lucide-react";
import { useState } from "react";

const TERRA  = '#C84818';
const INK    = '#111827';
const MUTED  = '#6B7280';
const BORDER = '#E5E7EB';
const BG_ACT = 'rgba(200,72,24,0.08)';

const nav = [
  { href: '/dashboard',           icon: LayoutDashboard, label: "Vue d'ensemble" },
  { href: '/dashboard/portfolio', icon: Briefcase,       label: 'Portfolio'      },
  { href: '/dashboard/services',  icon: Wrench,          label: 'Services'       },
  { href: '/dashboard/team',      icon: Users,           label: 'Équipe / CV'    },
  { href: '/dashboard/site',      icon: Globe,           label: 'Paramètres'     },
  { href: '/dashboard/messages',  icon: MessageSquare,   label: 'Messages'       },
];

export default function Sidebar({ admin }) {
  const { url } = usePage();
  const logout = () => router.post('/logout');
  const [open, setOpen] = useState(false);

  const Content = () => (
    <aside className="w-56 min-h-screen flex flex-col bg-white"
      style={{ borderRight: `1px solid ${BORDER}`, flexShrink: 0, fontFamily: "'Inter', sans-serif" }}>

      {/* Logo */}
      <div className="px-5 pt-6 pb-5" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, color: INK }}>
          KoriLab
        </div>
        <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>Studio créatif · Dakar</div>
      </div>

      {/* User */}
      <div className="px-4 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: TERRA }}>
            {(admin?.name ?? 'A').charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: INK }}>{admin?.name ?? '—'}</div>
            <div className="text-xs" style={{ color: MUTED }}>Administrateur</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5">
        {nav.map(({ href, icon: Icon, label }) => {
          const active = url === href || (href !== '/dashboard' && url.startsWith(href));
          return (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
              style={{
                background: active ? BG_ACT : 'transparent',
                color: active ? TERRA : INK,
                fontWeight: active ? 600 : 400,
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#F9FAFB'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon size={16} style={{ color: active ? TERRA : MUTED, flexShrink: 0 }} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5" style={{ borderTop: `1px solid ${BORDER}` }}>
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 mt-3"
          style={{ color: MUTED, fontFamily: "'Inter', sans-serif" }}
          onMouseEnter={e => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.color = TERRA; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = MUTED; }}
        >
          <LogOut size={16} style={{ flexShrink: 0 }} />
          Déconnexion
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-white flex items-center justify-center"
        style={{ border: `1px solid ${BORDER}`, color: INK }}>
        <Menu size={18} />
      </button>

      <div className="hidden md:block"><Content /></div>

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
                  className="absolute top-4 right-3 z-10 w-7 h-7 rounded-lg bg-white flex items-center justify-center"
                  style={{ border: `1px solid ${BORDER}`, color: INK }}>
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
