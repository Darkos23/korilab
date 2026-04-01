import { Link, router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Briefcase, Wrench, LogOut, Users, X, FileText, FolderKanban, Receipt } from "lucide-react";
import { useState, useEffect } from "react";

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
  { href: '/dashboard/factures',  icon: Receipt,         label: 'Factures',       sub: 'Comptabilité'       },
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
      className="flex flex-col fixed left-0 z-20"
      style={{
        top: 44,
        width: 224,
        height: 'calc(100vh - 44px)',
        background: SIDEBAR_BG,
        borderRight: `1px solid ${BORDER}`,
      }}>

      {/* ── User card ── */}
      <div className="px-5 pt-4 pb-4 border-b" style={{ borderColor: BORDER }}>
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
              {admin?.title ?? 'Admin'}
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

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-sidebar', handler);
    return () => window.removeEventListener('open-sidebar', handler);
  }, []);

  return (
    <>
      {/* Spacer pour compenser le fixed sidebar */}
      <div className="hidden md:block flex-shrink-0" style={{ width: 224 }} />
      <div className="hidden md:flex">
        <SidebarContent admin={admin} sidebarProjects={sidebarProjects} />
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} className="md:hidden fixed inset-0 z-40 bg-black/60" />
            <motion.div initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="md:hidden fixed left-0 z-50"
              style={{ top: 44, bottom: 0, width: 260 }}>
              <div className="relative h-full overflow-y-auto" style={{ background: SIDEBAR_BG, borderRight: `1px solid ${BORDER}` }}>
                <SidebarContent admin={admin} sidebarProjects={sidebarProjects} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
