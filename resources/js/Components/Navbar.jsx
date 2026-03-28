import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard, Settings, LogOut, ChevronDown } from "lucide-react";
import { Link, usePage, router } from "@inertiajs/react";

/* ── Cauri plein avec motif en découpe ──────────────────── */
function CauriLogo({ color = "#B43028" }) {
  const C = color;
  return (
    <motion.div className="relative flex items-center justify-center" style={{ width: 28, height: 40 }}>
      <motion.div className="absolute inset-0"
        animate={{ opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: `radial-gradient(ellipse, ${C}60 0%, transparent 70%)`, filter: "blur(8px)" }}
      />
      <motion.svg width="28" height="40" viewBox="0 0 60 84" fill="none"
        animate={{ filter: [`drop-shadow(0 0 3px ${C}40)`, `drop-shadow(0 0 8px ${C}90)`, `drop-shadow(0 0 3px ${C}40)`] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.ellipse cx="30" cy="42" rx="21" ry="30"
          fill={C + "12"} stroke={C} strokeWidth="1.5"
          animate={{ strokeOpacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path d="M30,14 L26,20 L34,26 L26,32 L34,38 L26,44 L34,50 L26,56 L34,62 L30,70"
          stroke={C} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <line x1="17" y1="24" x2="24" y2="24" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <line x1="16" y1="29" x2="23" y2="29" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <path d="M13,35 L20,40 L13,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <path d="M17,35 L24,40 L17,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <circle cx="11" cy="42" r="2" fill={C} opacity="0.8"/>
        <path d="M13,47 L20,52 L13,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <path d="M17,47 L24,52 L17,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <line x1="16" y1="60" x2="23" y2="60" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <line x1="17" y1="64" x2="23" y2="64" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <line x1="18" y1="68" x2="23" y2="68" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <line x1="43" y1="24" x2="36" y2="24" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <line x1="44" y1="29" x2="37" y2="29" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <path d="M47,35 L40,40 L47,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <path d="M43,35 L36,40 L43,45" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <circle cx="49" cy="42" r="2" fill={C} opacity="0.8"/>
        <path d="M47,47 L40,52 L47,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <path d="M43,47 L36,52 L43,57" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"/>
        <line x1="44" y1="60" x2="37" y2="60" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <line x1="43" y1="64" x2="37" y2="64" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
        <line x1="42" y1="68" x2="37" y2="68" stroke={C} strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
      </motion.svg>
    </motion.div>
  );
}

const NAV_LINKS = [
  { href: "/#about",         label: "À propos" },
  { href: "/#services",      label: "Services" },
  { href: "/#portfolio",     label: "Portfolio" },
  { href: "/#team",          label: "Équipe" },
  { href: "/#testimonials",  label: "Avis" },
  { href: "/#contact",       label: "Contact" },
];

function cn(...classes) { return classes.filter(Boolean).join(" "); }

/* ── Profile dropdown (authenticated only) ── */
function ProfileDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const logout = () => router.post('/logout');

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-150"
        style={{ border: `1px solid ${open ? 'rgba(180,48,40,0.3)' : 'rgba(180,48,40,0.15)'}`, background: 'transparent', cursor: 'pointer' }}>
        <div className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0"
          style={{ background: 'rgba(180,48,40,0.09)', color: '#B43028', border: '1px solid rgba(180,48,40,0.2)' }}>
          {(user?.name ?? 'A').charAt(0).toUpperCase()}
        </div>
        <span className="font-semibold text-xs" style={{ color: '#1C1A16' }}>{user?.name ?? '—'}</span>
        <ChevronDown size={11} style={{ color: '#B43028', opacity: 0.6, transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full mt-2 w-52 rounded-xl overflow-hidden z-50"
            style={{ background: '#FDFBF7', border: '1px solid rgba(28,26,22,0.1)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
            <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(28,26,22,0.06)' }}>
              <div className="text-sm font-bold" style={{ color: '#1C1A16' }}>{user?.name}</div>
              <div className="text-[10px] mt-1" style={{ color: '#B43028', opacity: 0.6 }}>Admin KoriLab</div>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#3A6840' }} />
                <span className="font-mono text-[9px]" style={{ color: '#3A6840' }}>En ligne</span>
              </div>
            </div>
            <div className="p-1.5 flex flex-col gap-0.5">
              <Link href="/dashboard"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg w-full transition-all duration-100 text-xs hover:bg-black/[0.04]"
                style={{ textDecoration: 'none', color: '#5A5448' }}>
                <LayoutDashboard size={13} /> Dashboard
              </Link>
              <a href="/dashboard/site"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg w-full transition-all duration-100 text-xs hover:bg-black/[0.04]"
                style={{ textDecoration: 'none', color: '#5A5448' }}>
                <Settings size={13} /> Paramètres du site
              </a>
              <button onClick={logout}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg w-full transition-all duration-100 text-xs hover:bg-black/[0.04]"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: '#B43028' }}>
                <LogOut size={13} /> Déconnexion
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar({ header }) {
  const { url, props } = usePage();
  const isAuth = props.auth?.user;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (url.startsWith("/dashboard") || url === "/login") return null;

  const logoName = header?.logoName ?? "KoriLab";
  const tagline  = header?.tagline  ?? "Creative Studio";
  const ctaText  = header?.ctaText  ?? "Démarrer un projet";

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled ? "py-3 shadow-sm" : "py-5 bg-transparent"
    )}
    style={scrolled ? { background: 'rgba(253,251,247,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(28,26,22,0.07)' } : {}}>
      <nav className="section-padding mx-auto max-w-7xl flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <CauriLogo />
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-lg tracking-tight" style={{ color: '#1C1A16' }}>
              {logoName}<span style={{ color: '#B43028' }}>.</span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: '#B43028', opacity: 0.5 }}>{tagline}</span>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group"
                style={{ color: '#5A5448' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#1C1A16'; e.currentTarget.style.background = 'rgba(180,48,40,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#5A5448'; e.currentTarget.style.background = 'transparent'; }}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {isAuth
            ? <ProfileDropdown user={props.auth.user} />
            : (
              <a href="/#contact"
                className="px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-[1.03]"
                style={{ color: '#B43028', border: '1px solid rgba(180,48,40,0.3)', background: 'rgba(180,48,40,0.04)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(180,48,40,0.09)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(180,48,40,0.04)'; }}>
                {ctaText}
              </a>
            )
          }
        </div>

        <button onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{ color: '#5A5448' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(180,48,40,0.06)'; e.currentTarget.style.color = '#1C1A16'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5A5448'; }}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t"
            style={{ background: 'rgba(253,251,247,0.97)', backdropFilter: 'blur(20px)', borderColor: 'rgba(28,26,22,0.06)' }}>
            <ul className="section-padding py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-sm font-medium rounded-xl transition-all"
                    style={{ color: '#5A5448' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#1C1A16'; e.currentTarget.style.background = 'rgba(180,48,40,0.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#5A5448'; e.currentTarget.style.background = 'transparent'; }}>
                    {link.label}
                  </a>
                </li>
              ))}
              {isAuth && (
                <>
                  <li>
                    <Link href="/dashboard" onClick={() => setOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-all"
                      style={{ color: '#B43028' }}>
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => { setOpen(false); router.post('/logout'); }}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-all w-full text-left"
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#B43028' }}>
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </li>
                </>
              )}
              <li className="pt-2">
                <a href="/#contact" onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-center rounded-xl"
                  style={{ color: '#B43028', border: '1px solid rgba(180,48,40,0.25)', background: 'rgba(180,48,40,0.04)' }}>
                  {ctaText}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
