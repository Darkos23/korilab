import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Users, Award } from "lucide-react";

/* ── Cauri About ─────────────────────────────────────────── */
function CauriAbout() {
  const C = "#60a5fa";
  return (
    <motion.div className="relative flex items-center justify-center" style={{ width: 120, height: 168 }}>
      <motion.div className="absolute inset-0"
        animate={{ opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: `radial-gradient(ellipse, ${C}60 0%, transparent 70%)`, filter: "blur(16px)" }}
      />
      <motion.svg width="120" height="168" viewBox="0 0 60 84" fill="none"
        animate={{ filter: [`drop-shadow(0 0 4px ${C}40)`, `drop-shadow(0 0 14px ${C}99)`, `drop-shadow(0 0 4px ${C}40)`] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.ellipse cx="30" cy="42" rx="21" ry="30"
          fill={C + "12"} stroke={C} strokeWidth="1.5"
          animate={{ strokeOpacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path d="M30,14 L26,20 L34,26 L26,32 L34,38 L26,44 L34,50 L26,56 L34,62 L30,70"
          stroke={C} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"
          animate={{ opacity: [0.6, 1, 0.6] }}
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

const values = [
  { icon: TrendingUp, title: "Résultats d'élite",    desc: "Chaque projet est optimisé pour des performances maximales.", color: "text-violet-400", bg: "bg-violet-500/[0.08]", hover: "hover:bg-violet-500/[0.12]" },
  { icon: Users,      title: "Collaboration totale", desc: "Nous travaillons main dans la main avec vos équipes.",        color: "text-blue-400",   bg: "bg-blue-500/[0.08]",   hover: "hover:bg-blue-500/[0.12]"   },
  { icon: Award,      title: "Excellence absolue",   desc: "La qualité premium est notre standard minimum.",             color: "text-amber-400",  bg: "bg-amber-500/[0.08]",  hover: "hover:bg-amber-500/[0.12]"  },
];
const skills = ["Design UI/UX","React / Next.js","Branding","Motion Design","SEO","Mobile First"];
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function About({ about }) {
  const titleStart     = about?.titleStart     ?? "Forgés par la passion du";
  const titleHighlight = about?.titleHighlight ?? "digital";
  const para1          = about?.para1          ?? "KoriLab est née d'une conviction simple : le design et la technologie, maîtrisés à la perfection, transforment une startup en marque légendaire.";
  const para2          = about?.para2          ?? "Notre équipe allie créativité audacieuse et rigueur technique pour livrer des produits qui repoussent toutes les limites.";
  const aboutSkills    = Array.isArray(about?.skills) ? about.skills : skills;
  const questCount     = about?.questCount     ?? "10+";

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="section-padding py-28 bg-[#050814]">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#0a1628] to-[#0f0a2e] border border-blue-500/[0.12]">
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <CauriAbout />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
            </div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -right-5 glass rounded-xl p-4 shadow-xl glow-blue-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-lg">🏆</div>
                <div>
                  <div className="font-bold text-white text-sm">Studio Signature</div>
                  <div className="text-xs text-slate-500">Studio Dakar · Sénégal</div>
                </div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3 shadow-lg">
              <div className="text-2xl font-bold text-blue-400">{questCount}</div>
              <div className="text-xs text-slate-500">Projets livrés</div>
            </motion.div>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate={inView ? "show" : "hidden"}>
            <motion.div variants={item} className="inline-flex items-center gap-1.5 mb-5">
              <span className="text-blue-500/50 font-mono text-sm">[</span>
              <span className="sys-label">Notre histoire</span>
              <span className="text-blue-500/50 font-mono text-sm">]</span>
            </motion.div>
            <motion.h2 variants={item} className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              {titleStart}{" "}<span className="gradient-text">{titleHighlight}</span>
            </motion.h2>
            <motion.p variants={item} className="text-slate-400 leading-relaxed mb-5">
              {para1}
            </motion.p>
            <motion.p variants={item} className="text-slate-400 leading-relaxed mb-8">
              {para2}
            </motion.p>
            <motion.div variants={item} className="flex flex-wrap gap-2 mb-10">
              {aboutSkills.map((s) => (
                <span key={s} className="px-3 py-1.5 bg-blue-500/[0.08] border border-blue-500/20 rounded-lg text-sm text-violet-300 font-medium hover:bg-blue-500/[0.14] transition-colors">
                  {s}
                </span>
              ))}
            </motion.div>
            <motion.div variants={container} className="space-y-3">
              {values.map((v) => (
                <motion.div key={v.title} variants={item}
                  className={`flex gap-4 items-start p-4 rounded-xl border border-blue-500/[0.08] ${v.hover} transition-all duration-200`}>
                  <div className={`w-10 h-10 rounded-xl ${v.bg} flex items-center justify-center flex-shrink-0`}>
                    <v.icon className={`w-5 h-5 ${v.color}`} />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm mb-0.5">{v.title}</div>
                    <div className="text-sm text-slate-500">{v.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
