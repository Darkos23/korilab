import { router, usePage, Link } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { Settings, LogOut, ChevronDown, PanelLeftClose, PanelLeftOpen, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FONT   = "'Century Gothic', 'Trebuchet MS', sans-serif";
const TERRA  = '#B43028';
const GOLD   = '#8A5A18';
const INK    = '#1C1A16';
const INK2   = '#5A5448';
const BORDER = 'rgba(0,0,0,0.07)';
const BG     = '#FDFBF7';

export default function TopBar({ admin, collapsed, onToggle }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const logout = () => router.post('/logout');
  const { unreadMessages = 0 } = usePage().props;

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="sticky top-0 z-30 flex items-center gap-4 px-5 border-b"
      style={{ height: 44, background: BG, borderColor: BORDER, backdropFilter: 'blur(8px)' }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: '1.8rem', flexShrink: 0 }}>
        <svg width="14" height="20" viewBox="0 0 60 84" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="30" cy="42" rx="21" ry="30" fill="none" stroke="#8B6914" strokeWidth="2"/>
          <path d="M30,14 L26,20 L34,26 L26,32 L34,38 L26,44 L34,50 L26,56 L34,62 L30,70" stroke="#8B6914" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <line x1="17" y1="24" x2="24" y2="24" stroke="#8B6914" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="16" y1="29" x2="23" y2="29" stroke="#8B6914" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M13,35 L20,40 L13,45" stroke="#8B6914" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M17,35 L24,40 L17,45" stroke="#8B6914" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <circle cx="11" cy="42" r="2" fill="#8B6914"/>
          <path d="M13,47 L20,52 L13,57" stroke="#8B6914" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M17,47 L24,52 L17,57" stroke="#8B6914" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <line x1="16" y1="60" x2="23" y2="60" stroke="#8B6914" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="43" y1="24" x2="36" y2="24" stroke="#8B6914" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="44" y1="29" x2="37" y2="29" stroke="#8B6914" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M47,35 L40,40 L47,45" stroke="#8B6914" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M43,35 L36,40 L43,45" stroke="#8B6914" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <circle cx="49" cy="42" r="2" fill="#8B6914"/>
          <path d="M47,47 L40,52 L47,57" stroke="#8B6914" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M43,47 L36,52 L43,57" stroke="#8B6914" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <line x1="44" y1="60" x2="37" y2="60" stroke="#8B6914" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, letterSpacing: 3, color: '#1A1714', fontStyle: 'italic' }}>
          <em style={{ color: '#8B6914', fontStyle: 'normal' }}>KORI</em>lab
        </div>
      </div>

      {/* Tagline */}
      <span className="hidden sm:block" style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: '#B0A898', letterSpacing: '0.5px' }}>
        korilab.dev · studio créatif · Dakar
      </span>

      {/* Toggle sidebar */}
      <button onClick={onToggle}
        className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 flex-shrink-0"
        style={{ color: INK2, border: `1px solid ${BORDER}`, marginLeft: '0.5rem' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(180,48,40,0.25)'; e.currentTarget.style.color = TERRA; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = INK2; }}>
        {collapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
      </button>

      <div className="flex-1" />

      {/* Right group */}
      <div className="flex items-center gap-2">

        {/* Messages */}
        <Link href="/dashboard/messages"
          className="relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150"
          style={{ color: INK2, border: `1px solid ${BORDER}` }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(180,48,40,0.25)'; e.currentTarget.style.color = TERRA; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = INK2; }}>
          <MessageSquare size={14} />
          {unreadMessages > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full font-mono text-[9px] font-bold"
              style={{ background: TERRA, color: 'white' }}>
              {unreadMessages > 9 ? '9+' : unreadMessages}
            </span>
          )}
        </Link>

        {/* Profile dropdown */}
        <div className="relative" ref={ref}>
          <button onClick={() => setOpen(v => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-150"
            style={{ border: `1px solid ${open ? 'rgba(180,48,40,0.3)' : BORDER}`, background: 'transparent', cursor: 'pointer' }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0"
              style={{ background: 'rgba(180,48,40,0.09)', color: TERRA, border: '1px solid rgba(180,48,40,0.22)' }}>
              {(admin?.name ?? 'A').charAt(0).toUpperCase()}
            </div>
            <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: INK }}>
              {admin?.name ?? '—'}
            </span>
            <ChevronDown size={12} style={{ color: INK2, transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 top-full mt-2 w-52 rounded-xl overflow-hidden z-50"
                style={{ background: BG, border: `1px solid ${BORDER}`, boxShadow: '0 8px 24px rgba(0,0,0,0.09)' }}>

                <div className="px-4 py-3 border-b" style={{ borderColor: BORDER }}>
                  <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: INK }}>{admin?.name}</div>
                  <div style={{ fontFamily: FONT, fontSize: 10, color: INK2, marginTop: 2 }}>
                    {admin?.title ?? 'Admin KoriLab'}
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#3A6840' }} />
                    <span className="font-mono text-[9px]" style={{ color: '#3A6840' }}>En ligne</span>
                  </div>
                </div>

                <div className="p-1.5 flex flex-col gap-0.5">
                  <a href="/dashboard/site"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg w-full transition-all duration-100"
                    style={{ fontFamily: FONT, fontSize: 12, color: INK2, textDecoration: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; e.currentTarget.style.color = INK; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = INK2; }}>
                    <Settings size={13} />
                    Paramètres du site
                  </a>
                  <button onClick={logout}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg w-full transition-all duration-100"
                    style={{ fontFamily: FONT, fontSize: 12, color: TERRA, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(180,48,40,0.06)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                    <LogOut size={13} />
                    Déconnexion
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
