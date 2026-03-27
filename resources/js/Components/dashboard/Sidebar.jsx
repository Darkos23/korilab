import { Link, router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Briefcase, Wrench, Globe, LogOut, Users, Menu, X, MessageSquare } from "lucide-react";
import { useState } from "react";

/* ─── Soft UI Tokens ─────────────────────────────────────── */
const BG      = '#F0DEB8';
const TEXT    = '#1E0E04';
const DIM     = 'rgba(30,14,4,0.55)';
const MUTED   = 'rgba(30,14,4,0.35)';
const TERRA   = '#C84818';
const GOLD    = '#B87820';

const SHADOW_SIDEBAR  = '6px 0 20px rgba(180,130,60,0.22), -2px 0 8px rgba(255,255,255,0.6)';
const SHADOW_RAISED   = '4px 4px 10px rgba(180,130,60,0.2), -4px -4px 10px rgba(255,255,255,0.7)';
const SHADOW_INSET    = 'inset 3px 3px 8px rgba(180,130,60,0.22), inset -3px -3px 8px rgba(255,255,255,0.65)';

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
    <aside className="w-60 min-h-screen flex flex-col relative z-20"
      style={{ background: BG, boxShadow: SHADOW_SIDEBAR, flexShrink: 0 }}>

      {/* Logo */}
      <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(180,130,60,0.15)' }}>
        <div className="mb-5">
          <div style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 17, color: TEXT, letterSpacing: '0.01em' }}>
            KoriLab
          </div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: 9, color: MUTED, letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: 3 }}>
            Dakar · Studio Créatif
          </div>
        </div>

        {/* User card — inset */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{ background: BG, boxShadow: SHADOW_INSET }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: TERRA, color: '#FBF5E6', fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 12, boxShadow: SHADOW_RAISED }}>
            {(admin?.name ?? 'A').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 12, color: TEXT }} className="truncate">
              {admin?.name ?? '—'}
            </div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 400, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Admin
            </div>
          </div>
          <motion.div className="w-2 h-2 rounded-full flex-shrink-0"
            animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ background: '#22c55e' }} />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
        {nav.map(({ href, icon: Icon, label, sub }) => {
          const active = url === href || (href !== '/dashboard' && url.startsWith(href));
          return (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
              style={{
                background: BG,
                boxShadow: active ? SHADOW_INSET : 'none',
                color: active ? TERRA : TEXT,
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.boxShadow = SHADOW_RAISED; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: BG,
                  boxShadow: active ? SHADOW_INSET : SHADOW_RAISED,
                  color: active ? TERRA : DIM,
                }}>
                <Icon size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: active ? 700 : 500, fontSize: 12, color: active ? TERRA : TEXT }}>
                  {label}
                </div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {sub}
                </div>
              </div>
              {active && (
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: TERRA }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 pb-6 pt-2" style={{ borderTop: '1px solid rgba(180,130,60,0.15)' }}>
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
          style={{ background: BG, color: DIM, fontFamily: "'Sora', sans-serif", fontSize: 12 }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = SHADOW_RAISED; e.currentTarget.style.color = TERRA; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.color = DIM; }}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: BG, boxShadow: SHADOW_RAISED }}>
            <LogOut size={14} />
          </div>
          <span style={{ fontWeight: 500 }}>Déconnexion</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: BG, boxShadow: SHADOW_RAISED, color: TEXT }}>
        <Menu size={18} />
      </button>

      {/* Desktop */}
      <div className="hidden md:block">
        <Content />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-black/30 md:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} />
            <motion.div className="fixed left-0 top-0 bottom-0 z-50 md:hidden"
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <div className="relative h-full">
                <button onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: BG, boxShadow: SHADOW_RAISED, color: TEXT }}>
                  <X size={14} />
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
