import { Link, router, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, Briefcase, Wrench, Globe, LogOut, Users, Menu, X, MessageSquare } from "lucide-react";
import { useState } from "react";
import { T } from "./SystemLayout";

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

  const initials = (admin?.name ?? 'A')
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const Content = () => (
    <aside style={{
      width: 224,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: T.sb,
      borderRight: `1px solid ${T.sep}`,
      flexShrink: 0,
      fontFamily: "'Nunito', sans-serif",
    }}>

      {/* Logo + avatar row */}
      <div style={{ padding: '16px 16px 14px', borderBottom: `1px solid ${T.sep}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: T.acc2,
          border: `1.5px solid ${T.acc3}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 800,
          color: T.acc,
          flexShrink: 0,
        }}>
          {initials}
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: T.tx, letterSpacing: '-0.4px', lineHeight: 1.2 }}>
            Kori<span style={{ color: T.acc }}>Lab</span>
          </div>
          <div style={{ fontSize: 11, fontWeight: 400, color: T.tx4, marginTop: 1 }}>korilab.dev · Dakar</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 0' }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: T.tx5, letterSpacing: '0.5px', padding: '8px 16px 3px', textTransform: 'uppercase' }}>
          Workspace
        </div>
        {nav.map(({ href, icon: Icon, label }) => {
          const active = url === href || (href !== '/dashboard' && url.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '6px 9px',
                margin: '1px 7px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: active ? 700 : 500,
                color: active ? T.acc : T.tx3,
                background: active ? T.acc2 : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.12s',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = T.s2; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; } }}
            >
              <div style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                flexShrink: 0,
                background: active ? T.acc : T.s3,
              }} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ borderTop: `1px solid ${T.sep}`, padding: '8px 7px 14px' }}>
        <button
          onClick={logout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            padding: '6px 9px',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 500,
            color: T.tx3,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Nunito', sans-serif",
            transition: 'all 0.12s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(180,48,40,0.07)'; e.currentTarget.style.color = T.acc; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = T.tx3; }}
        >
          <LogOut size={14} style={{ flexShrink: 0 }} />
          Déconnexion
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ background: T.sb, border: `1px solid ${T.sep}`, color: T.tx }}
      >
        <Menu size={18} />
      </button>

      <div className="hidden md:block"><Content /></div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(0,0,0,0.2)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed left-0 top-0 bottom-0 z-50 md:hidden"
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="relative h-full">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-3 z-10 w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: T.sb, border: `1px solid ${T.sep}`, color: T.tx }}
                >
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
