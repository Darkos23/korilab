import { Link, router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Briefcase, Wrench, Globe, LogOut, Users, Menu, X, MessageSquare } from "lucide-react";
import { useState } from "react";

/* ─── Tokens ─────────────────────────────────────────────── */
const BG     = '#010a14';
const TEXT   = '#b8d8f8';
const DIM    = 'rgba(0,180,255,0.6)';
const MUTED  = 'rgba(0,168,255,0.35)';
const BORDER = 'rgba(0,168,255,0.15)';
const ACCENT = '#00b4ff';
const ORANGE = '#ff6600';
const RC     = { S: '#ff9900', A: '#00d4ff', B: '#7c6ff7', C: '#00e5a0', D: '#ffcc44', E: '#6b7280' };

/* ─── Cauri logo — Jarvis tint ───────────────────────────── */
function CauriLogo() {
  return (
    <svg width="24" height="34" viewBox="0 0 60 84" fill="none">
      <ellipse cx="30" cy="42" rx="21" ry="30" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeOpacity="0.5"/>
      <path d="M30,14 L26,20 L34,26 L26,32 L34,38 L26,44 L34,50 L26,56 L34,62 L30,70"
        stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6"/>
      <line x1="17" y1="24" x2="24" y2="24" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <line x1="16" y1="29" x2="23" y2="29" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <path d="M13,35 L20,40 L13,45" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
      <path d="M17,35 L24,40 L17,45" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
      <circle cx="11" cy="42" r="2" fill={ACCENT} opacity="0.5"/>
      <path d="M47,35 L40,40 L47,45" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
      <path d="M43,35 L36,40 L43,45" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
      <circle cx="49" cy="42" r="2" fill={ACCENT} opacity="0.5"/>
      <path d="M47,47 L40,52 L47,57" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
      <path d="M43,47 L36,52 L43,57" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
      <path d="M13,47 L20,52 L13,57" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
      <path d="M17,47 L24,52 L17,57" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/>
    </svg>
  );
}

const nav = [
  { href: '/dashboard',           icon: LayoutDashboard, label: "Vue d'ensemble", sub: 'Tableau central'    },
  { href: '/dashboard/portfolio', icon: Briefcase,       label: 'Portfolio',      sub: 'Réalisations'       },
  { href: '/dashboard/services',  icon: Wrench,          label: 'Services',       sub: 'Offres & capacités' },
  { href: '/dashboard/team',      icon: Users,           label: 'Équipe / CV',    sub: 'Profils chasseurs'  },
  { href: '/dashboard/site',      icon: Globe,           label: 'Paramètres',     sub: 'Config. système'    },
  { href: '/dashboard/messages',  icon: MessageSquare,   label: 'Messages',       sub: 'Boîte de réception' },
];

export default function Sidebar({ admin }) {
  const { url } = usePage();
  const logout = () => router.post('/logout');
  const rc = RC[admin?.rank] ?? TEXT;
  const [open, setOpen] = useState(false);

  const Content = () => (
    <aside className="w-56 min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: 'rgba(1,8,20,0.98)',
        borderRight: `1px solid ${BORDER}`,
        boxShadow: `4px 0 24px rgba(0,50,120,0.2)`,
      }}>

      {/* Sidebar glow line */}
      <div className="absolute top-0 bottom-0 right-0 w-px"
        style={{ background: `linear-gradient(180deg, transparent 0%, ${ACCENT}25 30%, ${ACCENT}25 70%, transparent 100%)` }} />

      {/* Arc mini rings — decorative top */}
      <div className="absolute top-0 left-0 w-full h-1 overflow-hidden">
        <motion.div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent 0%, ${ACCENT}60 50%, transparent 100%)`,
        }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Logo */}
      <div className="p-5 border-b relative" style={{ borderColor: BORDER }}>
        <div className="flex items-center gap-3 mb-4">
          <CauriLogo />
          <div>
            <div className="font-mono text-sm font-black tracking-wider" style={{ color: TEXT }}>
              KoriLab
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ color: ACCENT }}
              >_</motion.span>
            </div>
            <div className="font-mono text-[8px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
              J.A.R.V.I.S Panel
            </div>
          </div>
        </div>

        {/* User card */}
        <div className="p-3 flex items-center gap-2.5 relative"
          style={{
            border: `1px solid ${BORDER}`,
            background: 'rgba(0,80,160,0.06)',
            boxShadow: 'inset 0 1px 0 rgba(0,168,255,0.05)',
          }}>
          {/* Corner cut */}
          <div className="absolute top-0 right-0 w-0 h-0" style={{
            borderRight: '8px solid rgba(1,8,20,0.98)',
            borderBottom: '8px solid transparent',
          }} />
          <div className="w-8 h-8 flex items-center justify-center font-mono text-xs font-black flex-shrink-0"
            style={{
              color: rc,
              border: `1px solid ${rc}40`,
              background: `${rc}0d`,
              boxShadow: `0 0 8px ${rc}25`,
            }}>
            {admin?.rank}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-mono text-xs font-semibold truncate" style={{ color: TEXT }}>{admin?.name}</div>
            <div className="font-mono text-[7px] uppercase tracking-widest" style={{ color: MUTED }}>Authentifié</div>
          </div>
          <motion.div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: '#00e57a', boxShadow: '0 0 4px #00e57a' }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-px">
        <p className="font-mono text-[7px] uppercase tracking-[0.4em] px-3 py-2" style={{ color: 'rgba(0,168,255,0.2)' }}>
          ◈ Navigation
        </p>
        {nav.map((item, i) => {
          const active = url.startsWith(item.href) && (item.href !== '/dashboard' || url === '/dashboard');
          return (
            <motion.div key={item.href}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 + i * 0.04 }}
            >
              <Link href={item.href}
                className="group flex items-center gap-3 px-3 py-2 transition-all duration-150 relative"
                style={active
                  ? {
                    background: 'rgba(0,120,220,0.1)',
                    borderLeft: `2px solid ${ACCENT}`,
                    paddingLeft: 10,
                    color: TEXT,
                    boxShadow: `inset 0 0 16px rgba(0,100,200,0.06)`,
                  }
                  : {
                    borderLeft: '2px solid transparent',
                    paddingLeft: 10,
                    color: DIM,
                  }
                }
              >
                {active && (
                  <motion.div className="absolute left-0 top-0 bottom-0 w-px"
                    style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <item.icon className="w-3.5 h-3.5 flex-shrink-0"
                  style={{ color: active ? ACCENT : MUTED, filter: active ? `drop-shadow(0 0 4px ${ACCENT})` : 'none' }} />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[11px] leading-tight" style={{ color: active ? TEXT : DIM }}>
                    {item.label}
                  </div>
                  <div className="font-mono text-[7px] uppercase tracking-wider truncate" style={{ color: MUTED }}>
                    {item.sub}
                  </div>
                </div>
                {active && (
                  <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: ACCENT, opacity: 0.6 }} />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t" style={{ borderColor: BORDER }}>
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 font-mono text-[11px] uppercase tracking-widest transition-all duration-150 group"
          style={{ color: MUTED, borderLeft: '2px solid transparent', paddingLeft: 10 }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#ff8070';
            e.currentTarget.style.borderLeftColor = 'rgba(255,60,30,0.5)';
            e.currentTarget.style.background = 'rgba(200,30,20,0.06)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = MUTED;
            e.currentTarget.style.borderLeftColor = 'transparent';
            e.currentTarget.style.background = 'transparent';
          }}
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
        style={{
          border: `1px solid ${BORDER}`,
          background: 'rgba(1,8,20,0.95)',
          color: ACCENT,
          boxShadow: `0 0 10px rgba(0,100,200,0.2)`,
        }}>
        <Menu size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} className="md:hidden fixed inset-0 z-40 bg-black/85" />
            <motion.div initial={{ x: -230 }} animate={{ x: 0 }} exit={{ x: -230 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="md:hidden fixed top-0 left-0 z-50 h-full">
              <div className="relative">
                <Content />
                <button onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center z-20 font-mono text-xs"
                  style={{ border: `1px solid ${BORDER}`, color: MUTED }}>
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
