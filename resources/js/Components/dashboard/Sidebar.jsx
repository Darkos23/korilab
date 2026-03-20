import { Link, router, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { LayoutDashboard, Briefcase, Wrench, Globe, LogOut, Users } from "lucide-react";
import { Scanlines } from "./SystemLayout";

/* ── Cauri traditionnel animé ───────────────────────────── */
function CauriLogo({ color = "#00a8ff" }) {
  const C = color;
  return (
    <motion.div className="relative flex items-center justify-center" style={{ width: 30, height: 42 }}>
      <motion.div className="absolute inset-0"
        animate={{ opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: `radial-gradient(ellipse, ${C}60 0%, transparent 70%)`, filter: "blur(8px)" }}
      />
      <motion.svg width="30" height="42" viewBox="0 0 60 84" fill="none"
        animate={{ filter: [`drop-shadow(0 0 3px ${C}40)`, `drop-shadow(0 0 9px ${C}99)`, `drop-shadow(0 0 3px ${C}40)`] }}
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

const nav = [
  { href: "/dashboard",           icon: LayoutDashboard, label: "Vue d'ensemble",  quest: "Tableau central"     },
  { href: "/dashboard/portfolio", icon: Briefcase,       label: "Portfolio",        quest: "Quêtes accomplies"   },
  { href: "/dashboard/services",  icon: Wrench,          label: "Services",         quest: "Capacités de guilde" },
  { href: "/dashboard/team",      icon: Users,           label: "Équipe / CV",      quest: "Dossiers chasseurs"  },
  { href: "/dashboard/site",      icon: Globe,           label: "Paramètres site",  quest: "Config. du système"  },
];

const RANK_COLOR = { S: "#a855f7", A: "#00a8ff", B: "#22c55e", C: "#f59e0b" };

export default function Sidebar({ admin }) {
  const { url } = usePage();
  const logout = () => router.post("/logout");
  const rankColor = RANK_COLOR[admin?.rank] ?? "#00a8ff";

  return (
    <aside className="w-64 min-h-screen flex flex-col relative border-r border-[#00a8ff]/10 bg-[#040d1a]">
      <Scanlines />

      {/* Top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00a8ff]/50 to-transparent" />

      {/* Logo */}
      <div className="relative z-10 p-5 border-b border-[#00a8ff]/10">
        <div className="flex items-center gap-2.5 mb-5">
          <CauriLogo />
          <div>
            <motion.div
              className="text-sm font-black tracking-wider"
              style={{ color: "#e8f6ff", textShadow: "0 0 18px rgba(0,168,255,0.5)" }}
              animate={{ textShadow: ["0 0 10px rgba(0,168,255,0.3)", "0 0 22px rgba(0,168,255,0.7)", "0 0 10px rgba(0,168,255,0.3)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              KoriLab
            </motion.div>
            <div className="text-[9px] font-mono text-[#00a8ff]/50 uppercase tracking-[0.3em]">System Panel</div>
          </div>
        </div>

        {/* Hunter card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="relative border border-[#00a8ff]/15 rounded-xl p-3 bg-[#00a8ff]/[0.03] overflow-hidden"
        >
          <Scanlines />
          <div className="relative z-10 flex items-center gap-2.5">
            {/* Rank circle */}
            <div className="relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2"
              style={{ borderColor: rankColor + "80", boxShadow: `0 0 12px ${rankColor}40` }}>
              <div className="absolute inset-0 rounded-full" style={{ background: `${rankColor}10` }} />
              <span className="relative text-sm font-black" style={{ color: rankColor, textShadow: `0 0 10px ${rankColor}` }}>
                {admin?.rank}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{admin?.name}</div>
              <div className="text-[9px] font-mono text-[#00a8ff]/30 uppercase tracking-widest">Chasseur authentifié</div>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00a8ff] shadow-[0_0_6px_2px_rgba(0,168,255,0.8)] animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 p-4 space-y-1">
        <p className="text-[9px] font-mono text-[#00a8ff]/20 uppercase tracking-[0.3em] px-3 mb-4">
          ◈ Menu du système ◈
        </p>
        {nav.map((item, i) => {
          const active = url.startsWith(item.href) && (item.href !== "/dashboard" || url === "/dashboard");
          return (
            <motion.div key={item.href}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}>
              <Link href={item.href}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 overflow-hidden
                  ${active
                    ? "border border-[#00a8ff]/30 bg-[#00a8ff]/[0.08] text-[#00a8ff]"
                    : "border border-transparent text-white/30 hover:text-white/70 hover:border-[#00a8ff]/10 hover:bg-[#00a8ff]/[0.03]"
                  }`}>
                {active && <Scanlines />}
                {active && <div className="absolute inset-y-0 left-0 w-0.5 bg-[#00a8ff] shadow-[0_0_8px_2px_rgba(0,168,255,0.8)]" />}
                <item.icon className={`relative z-10 w-4 h-4 flex-shrink-0 transition-colors ${active ? "text-[#00a8ff]" : "text-white/20 group-hover:text-white/50"}`} />
                <div className="relative z-10 flex-1 min-w-0">
                  <div className={`font-medium text-xs ${active ? "text-[#00a8ff]" : ""}`}>{item.label}</div>
                  <div className={`text-[9px] font-mono truncate ${active ? "text-[#00a8ff]/40" : "text-white/15"}`}>{item.quest}</div>
                </div>
                {active && (
                  <div className="relative z-10 w-1.5 h-1.5 rounded-full bg-[#00a8ff] shadow-[0_0_6px_2px_rgba(0,168,255,0.8)]" />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="relative z-10 p-4 border-t border-[#00a8ff]/10">
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-mono
            border border-transparent text-white/20 hover:text-red-400/70 hover:border-red-500/20 hover:bg-red-500/[0.04]
            transition-all duration-200">
          <LogOut className="w-4 h-4" />
          <span>[ DÉCONNEXION ]</span>
        </button>
        <p className="text-center text-[8px] font-mono text-[#00a8ff]/10 uppercase tracking-widest mt-3">
          System v2.0 — KoriLab
        </p>
      </div>
    </aside>
  );
}
