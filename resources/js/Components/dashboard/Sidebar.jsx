import { Link, router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Briefcase, Wrench, LogOut, Users, Menu, X, FileText, FolderKanban } from "lucide-react";
import { useState } from "react";

/* ─── Tokens ────────────────────────────────────────────────── */
const SIDEBAR_BG = '#FDFBF7';
const TEXT       = '#1C1A16';
const DIM        = '#5A5448';
const MUTED      = '#8A8478';
const BORDER     = 'rgba(0,0,0,0.06)';
const TERRA      = '#B43028';
const GOLD       = '#8A5A18';
const FONT       = "'Century Gothic', 'Trebuchet MS', sans-serif";

const nav = [
  { href: '/dashboard',           icon: LayoutDashboard, label: "Vue d'ensemble", sub: 'Tableau central'    },
  { href: '/dashboard/projets',   icon: FolderKanban,    label: 'Projets',        sub: 'Suivi'              },
  { href: '/dashboard/portfolio', icon: Briefcase,       label: 'Portfolio',      sub: 'Réalisations'       },
  { href: '/dashboard/services',  icon: Wrench,          label: 'Services',       sub: 'Offres & capacités' },
  { href: '/dashboard/team',      icon: Users,           label: 'Équipe / CV',    sub: 'Profils'            },
  { href: '/dashboard/contrats',  icon: FileText,        label: 'Contrats',       sub: 'Prestige'           },
];

/* ─── Section label ─────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <p style={{ fontFamily: FONT, fontWeight: 300, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.3em' }}
      className="px-3 pb-2 pt-1">
      {children}
    </p>
  );
}

/* ─── Sidebar content ────────────────────────────────────────── */
function SidebarContent({ admin, sidebarProjects = [] }) {
  const { url } = usePage();
  const logout = () => router.post('/logout');

  return (
    <aside
      className="min-h-screen flex flex-col relative z-20"
      style={{
        width: 224,
        background: SIDEBAR_BG,
        borderRight: `1px solid ${BORDER}`,
        flexShrink: 0,
      }}>

      {/* ── Logo ── */}
      <div className="px-5 pt-6 pb-5 border-b" style={{ borderColor: BORDER }}>
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <svg width="18" height="26" viewBox="0 0 60 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="30" cy="42" rx="21" ry="30" fill="none" stroke={TERRA} strokeWidth="2"/>
              <path d="M30,14 L26,20 L34,26 L26,32 L34,38 L26,44 L34,50 L26,56 L34,62 L30,70" stroke={TERRA} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <line x1="17" y1="24" x2="24" y2="24" stroke={TERRA} strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="16" y1="29" x2="23" y2="29" stroke={TERRA} strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M13,35 L20,40 L13,45" stroke={TERRA} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M17,35 L24,40 L17,45" stroke={TERRA} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="11" cy="42" r="2" fill={TERRA}/>
              <path d="M13,47 L20,52 L13,57" stroke={TERRA} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M17,47 L24,52 L17,57" stroke={TERRA} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <line x1="16" y1="60" x2="23" y2="60" stroke={TERRA} strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="43" y1="24" x2="36" y2="24" stroke={TERRA} strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="44" y1="29" x2="37" y2="29" stroke={TERRA} strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M47,35 L40,40 L47,45" stroke={TERRA} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M43,35 L36,40 L43,45" stroke={TERRA} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="49" cy="42" r="2" fill={TERRA}/>
              <path d="M47,47 L40,52 L47,57" stroke={TERRA} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M43,47 L36,52 L43,57" stroke={TERRA} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <line x1="44" y1="60" x2="37" y2="60" stroke={TERRA} strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 16, color: TEXT, letterSpacing: '0.02em' }}>
              KoriLab
            </div>
          </div>
          <div style={{ fontFamily: FONT, fontWeight: 300, fontSize: 10, color: MUTED, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 2 }}>
            Dakar · Studio
          </div>
        </div>

        {/* User card */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
          style={{ background: 'rgba(0,0,0,0.03)', border: `1px solid ${BORDER}` }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(180,48,40,0.09)', color: TERRA, fontFamily: FONT, fontWeight: 700, fontSize: 11, border: `1px solid rgba(180,48,40,0.2)` }}>
            {(admin?.name ?? 'A').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 12, color: TEXT }} className="truncate">
              {admin?.name ?? '—'}
            </div>
            <div style={{ fontFamily: FONT, fontWeight: 300, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
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

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
        <SectionLabel>Navigation</SectionLabel>
        {nav.map((item, i) => {
          const active = url.startsWith(item.href) && (item.href !== '/dashboard' || url === '/dashboard');
          return (
            <motion.div key={item.href} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 + i * 0.04 }}>
              <Link href={item.href}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150"
                style={active
                  ? { background: 'rgba(180,48,40,0.07)', borderLeft: `2.5px solid ${TERRA}`, paddingLeft: 9, color: TEXT }
                  : { borderLeft: '3px solid transparent', paddingLeft: 9, color: DIM }
                }
              >
                <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: active ? TERRA : MUTED }} />
                <div className="flex-1 min-w-0">
                  <div style={{ fontFamily: FONT, fontWeight: active ? 600 : 400, fontSize: 12, color: active ? TEXT : DIM }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: FONT, fontWeight: 300, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em' }} className="truncate">
                    {item.sub}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}

        {/* ── Actifs ── */}
        {sidebarProjects.length > 0 && (
          <div className="pt-3">
            <SectionLabel>Actifs</SectionLabel>
            {sidebarProjects.map((p, i) => {
              const dl = p.deadline ? new Date(p.deadline) : null;
              const overdue = dl && dl < new Date();
              return (
                <motion.div key={p.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.04 }}>
                  <Link href="/dashboard/projets"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 group"
                    style={{ borderLeft: '3px solid transparent', paddingLeft: 9 }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.03)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: overdue ? TERRA : GOLD }} />
                    <div className="flex-1 min-w-0">
                      <div className="truncate" style={{ fontFamily: FONT, fontWeight: 500, fontSize: 12, color: DIM }}>
                        {p.client_name}
                      </div>
                      <div className="truncate" style={{ fontFamily: FONT, fontSize: 9, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {p.project_type}
                      </div>
                    </div>
                    {dl && (
                      <span style={{ fontFamily: 'monospace', fontSize: 9, color: overdue ? TERRA : MUTED, flexShrink: 0 }}>
                        {overdue ? 'retard' : `J-${Math.ceil((dl - new Date()) / 86400000)}`}
                      </span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </nav>

      {/* ── Footer ── */}
      <div className="px-3 py-4 border-t" style={{ borderColor: BORDER }}>
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150"
          style={{ color: MUTED, borderLeft: '3px solid transparent', paddingLeft: 9 }}
          onMouseEnter={e => { e.currentTarget.style.color = TERRA; e.currentTarget.style.background = 'rgba(180,48,40,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = MUTED; e.currentTarget.style.background = 'transparent'; }}
        >
          <LogOut className="w-4 h-4" />
          <span style={{ fontFamily: FONT, fontWeight: 400, fontSize: 12 }}>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}

/* ─── Export ─────────────────────────────────────────────────── */
export default function Sidebar({ admin }) {
  const { props } = usePage();
  const sidebarProjects = props.sidebarProjects ?? [];
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden md:flex">
        <SidebarContent admin={admin} sidebarProjects={sidebarProjects} />
      </div>

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
                <SidebarContent admin={admin} sidebarProjects={sidebarProjects} />
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
