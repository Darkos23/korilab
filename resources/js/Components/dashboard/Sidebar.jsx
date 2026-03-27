import { Link, router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Briefcase, Wrench, Globe, LogOut, Users, Menu, X, MessageSquare } from "lucide-react";
import { useState } from "react";

/* ─── Tokens ─────────────────────────────────────────────── */
const TEXT   = '#1e1408';
const DIM    = 'rgba(30,20,8,0.65)';
const MUTED  = 'rgba(30,20,8,0.38)';
const BORDER = 'rgba(140,95,25,0.16)';
const GOLD   = '#a8720a';
const RC     = { S: GOLD, A: '#8b6010', B: '#c44030', C: '#5a3a9a', D: '#2a7a6a', E: '#6b7280' };

/* ─── Cauri logo ─────────────────────────────────────────── */
function CauriLogo() {
  return (
    <svg width="24" height="34" viewBox="0 0 60 84" fill="none">
      <ellipse cx="30" cy="42" rx="21" ry="30" fill="none" stroke={TEXT} strokeWidth="1.5" strokeOpacity="0.5"/>
      <path d="M30,14 L26,20 L34,26 L26,32 L34,38 L26,44 L34,50 L26,56 L34,62 L30,70"
        stroke={TEXT} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6"/>
      <line x1="17" y1="24" x2="24" y2="24" stroke={TEXT} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <line x1="16" y1="29" x2="23" y2="29" stroke={TEXT} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <path d="M13,35 L20,40 L13,45" stroke={TEXT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
      <path d="M17,35 L24,40 L17,45" stroke={TEXT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
      <circle cx="11" cy="42" r="2" fill={TEXT} opacity="0.4"/>
      <path d="M47,35 L40,40 L47,45" stroke={TEXT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
      <path d="M43,35 L36,40 L43,45" stroke={TEXT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
      <circle cx="49" cy="42" r="2" fill={TEXT} opacity="0.4"/>
      <path d="M47,47 L40,52 L47,57" stroke={TEXT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
      <path d="M43,47 L36,52 L43,57" stroke={TEXT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
      <path d="M13,47 L20,52 L13,57" stroke={TEXT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
      <path d="M17,47 L24,52 L17,57" stroke={TEXT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
    </svg>
  );
}

const nav = [
  { href: '/dashboard',           icon: LayoutDashboard, label: "Vue d'ensemble", sub: 'Tableau central'    },
  { href: '/dashboard/portfolio', icon: Briefcase,       label: 'Portfolio',      sub: 'Réalisations'       },
  { href: '/dashboard/services',  icon: Wrench,          label: 'Services',       sub: 'Offres & capacités' },
  { href: '/dashboard/team',      icon: Users,           label: 'Équipe / CV',    sub: 'Profils'            },
  { href: '/dashboard/site',      icon: Globe,           label: 'Paramètres',     sub: 'Config. système'    },
  { href: '/dashboard/messages',  icon: MessageSquare,   label: 'Messages',       sub: 'Boîte de réception' },
];

export default function Sidebar({ admin }) {
  const { url } = usePage();
  const logout = () => router.post('/logout');
  const rc = RC[admin?.rank] ?? TEXT;
  const [open, setOpen] = useState(false);

  const Content = () => (
    <aside className="w-56 min-h-screen flex flex-col"
      style={{ background: '#ede0c0', borderRight: `2px solid rgba(140,95,25,0.25)` }}>

      {/* Logo */}
      <div className="p-5 border-b" style={{ borderColor: BORDER }}>
        <div className="flex items-center gap-3 mb-4">
          <CauriLogo />
          <div>
            <div className="font-mono text-sm font-black tracking-wider" style={{ color: TEXT }}>
              KoriLab
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ color: DIM }}
              >_</motion.span>
            </div>
            <div className="font-mono text-[8px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
              Dakar · Studio
            </div>
          </div>
        </div>

        {/* User card */}
        <div className="p-3 flex items-center gap-2.5" style={{ border: `1px solid ${BORDER}` }}>
          <div className="w-8 h-8 flex items-center justify-center font-mono text-xs font-black flex-shrink-0"
            style={{ color: rc, border: `1px solid ${rc}35`, background: `${rc}08` }}>
            {admin?.rank}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-mono text-xs font-semibold truncate" style={{ color: TEXT }}>{admin?.name}</div>
            <div className="font-mono text-[7px] uppercase tracking-widest" style={{ color: MUTED }}>Authentifié</div>
          </div>
          <motion.div className="w-1 h-1 flex-shrink-0"
            style={{ background: GOLD }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-px">
        <p className="font-mono text-[7px] uppercase tracking-[0.4em] px-3 py-2" style={{ color: MUTED }}>
          Navigation
        </p>
        {nav.map((item, i) => {
          const active = url.startsWith(item.href) && (item.href !== '/dashboard' || url === '/dashboard');
          return (
            <motion.div key={item.href} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 + i * 0.04 }}>
              <Link href={item.href}
                className="group flex items-center gap-3 px-3 py-2 transition-all duration-150"
                style={active
                  ? { background: 'rgba(212,162,56,0.05)', borderLeft: `1px solid ${GOLD}`, paddingLeft: 11, color: TEXT }
                  : { borderLeft: '1px solid transparent', paddingLeft: 11, color: DIM }
                }
              >
                <item.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ opacity: active ? 0.8 : 0.35 }} />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[11px] leading-tight" style={{ color: active ? TEXT : DIM }}>{item.label}</div>
                  <div className="font-mono text-[7px] uppercase tracking-wider truncate" style={{ color: MUTED }}>{item.sub}</div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t" style={{ borderColor: BORDER }}>
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 font-mono text-[11px] uppercase tracking-widest transition-all duration-150"
          style={{ color: MUTED, borderLeft: '1px solid transparent', paddingLeft: 11 }}
          onMouseEnter={e => { e.currentTarget.style.color = '#e87070'; e.currentTarget.style.borderLeftColor = 'rgba(196,64,48,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = MUTED; e.currentTarget.style.borderLeftColor = 'transparent'; }}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden md:flex"><Content /></div>

      <button onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-8 h-8 flex items-center justify-center font-mono text-xs"
        style={{ border: `1px solid ${BORDER}`, background: 'rgba(7,5,3,0.95)', color: TEXT }}>
        <Menu size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} className="md:hidden fixed inset-0 z-40 bg-black/80" />
            <motion.div initial={{ x: -230 }} animate={{ x: 0 }} exit={{ x: -230 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="md:hidden fixed top-0 left-0 z-50 h-full">
              <div className="relative">
                <Content />
                <button onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center z-20 font-mono text-xs"
                  style={{ border: `1px solid ${BORDER}`, color: DIM }}>
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
