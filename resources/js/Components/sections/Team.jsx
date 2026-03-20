import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Twitter, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { Link } from "@inertiajs/react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const card = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const RANK_STYLES = {
  S: { bg: "bg-amber-500/10",  text: "text-amber-400",  border: "border-amber-500/40" },
  A: { bg: "bg-blue-500/10",   text: "text-blue-400",   border: "border-blue-500/40"  },
  B: { bg: "bg-emerald-500/10",text: "text-emerald-400",border: "border-emerald-500/40"},
  C: { bg: "bg-slate-500/10",  text: "text-slate-400",  border: "border-slate-500/30" },
};
const ROLE_LABELS = { S: "Lead", A: "Senior", B: "Confirmé", C: "Créatif" };

export default function Team({ teamMembers = [], associates = [] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="team" ref={ref} className="section-padding py-28 bg-[#060916]">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 mb-5">
            <span className="text-blue-500/50 font-mono text-sm">[</span>
            <span className="sys-label">Notre équipe</span>
            <span className="text-blue-500/50 font-mono text-sm">]</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            L'équipe derrière <span className="gradient-text">KoriLab</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Un studio d'élite — créatifs et ingénieurs passionnés, unis par l'excellence.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate={inView ? "show" : "hidden"}
          className={`grid gap-5 mb-20 mx-auto ${
            teamMembers.length === 1
              ? "grid-cols-1 max-w-sm"
              : teamMembers.length === 2
              ? "sm:grid-cols-2 max-w-2xl"
              : "sm:grid-cols-3 max-w-5xl"
          }`}>
          {teamMembers.map((member) => (
            <motion.div key={member.slug} variants={card} whileHover={{ y: -8 }}
              className="group card-sl overflow-hidden hover:border-blue-400/25 transition-all duration-300 flex flex-col">
              <div className={`h-48 bg-gradient-to-br ${member.gradient} flex items-center justify-center relative overflow-hidden`}>
                {member.emoji ? (
                  <span className="text-6xl z-10">{member.emoji}</span>
                ) : member.theme === "real-madrid" ? (
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full
                    bg-[#041E42]/80 border-2 border-yellow-400/50
                    shadow-[0_0_24px_6px_rgba(212,175,55,0.3)]">
                    <div className="absolute inset-1.5 rounded-full border border-yellow-400/15" />
                    <span className="relative text-xl font-black tracking-widest text-white"
                      style={{ textShadow: "0 0 12px rgba(212,175,55,0.9)" }}>
                      {member.initials}
                    </span>
                  </div>
                ) : member.theme === "antares" ? (
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full
                    bg-red-950/80 border-2 border-red-500/60
                    shadow-[0_0_24px_6px_rgba(220,38,38,0.4)]">
                    <div className="absolute inset-1.5 rounded-full border border-red-600/20" />
                    <span className="relative text-lg font-black tracking-widest text-white"
                      style={{ textShadow: "0 0 12px rgba(220,38,38,0.9)" }}>
                      {member.initials}
                    </span>
                  </div>
                ) : member.theme === "beast" ? (
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full
                    bg-amber-950/80 border-2 border-amber-400/60
                    shadow-[0_0_24px_6px_rgba(217,119,6,0.45)]">
                    <div className="absolute inset-1.5 rounded-full border border-amber-600/20" />
                    <span className="relative text-lg font-black tracking-widest text-white"
                      style={{ textShadow: "0 0 14px rgba(251,191,36,0.95)" }}>
                      {member.initials}
                    </span>
                  </div>
                ) : member.theme === "itachi" ? (
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full
                    bg-red-950/90 border-2 border-red-600/55
                    shadow-[0_0_24px_6px_rgba(159,18,57,0.5)]">
                    <div className="absolute inset-1.5 rounded-full border border-red-800/25" />
                    <span className="relative text-lg font-black tracking-widest text-white"
                      style={{ textShadow: "0 0 14px rgba(220,38,38,1)" }}>
                      {member.initials}
                    </span>
                  </div>
                ) : member.theme === "gojo" ? (
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full
                    bg-sky-950/80 border-2 border-sky-400/60
                    shadow-[0_0_24px_6px_rgba(14,165,233,0.5)]">
                    <div className="absolute inset-1.5 rounded-full border border-sky-500/20" />
                    <span className="relative text-lg font-black tracking-widest text-white"
                      style={{ textShadow: "0 0 14px rgba(125,211,252,1)" }}>
                      {member.initials}
                    </span>
                  </div>
                ) : member.theme === "dune" ? (
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full
                    bg-amber-950/80 border-2 border-amber-500/55
                    shadow-[0_0_24px_6px_rgba(201,131,74,0.4)]">
                    <div className="absolute inset-1.5 rounded-full border border-amber-600/20" />
                    <span className="relative text-lg font-black tracking-widest text-white"
                      style={{ textShadow: "0 0 14px rgba(212,149,106,0.95)" }}>
                      {member.initials}
                    </span>
                  </div>
                ) : (
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full
                    bg-black/60 border-2 border-purple-400/50
                    shadow-[0_0_24px_6px_rgba(168,85,247,0.35)]">
                    <div className="absolute inset-1.5 rounded-full border border-purple-500/20" />
                    <span className="relative text-xl font-black tracking-widest text-white"
                      style={{ textShadow: "0 0 12px rgba(168,85,247,0.9)" }}>
                      {member.initials}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "14px 14px" }} />
                <div className={`absolute top-3 right-3 text-xs font-mono font-bold px-2 py-0.5 rounded border ${member.rankBg} ${member.rankText} ${member.rankBorder}`}>
                  {ROLE_LABELS[member.rank] ?? member.role?.split(" ")[0] ?? "Expert"}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-white mb-0.5">{member.name}</h3>
                <p className={`text-xs font-mono font-semibold mb-3 uppercase tracking-wide ${member.rankText}`}>{member.role}</p>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed line-clamp-2 flex-1">{member.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <a href="#" className="w-8 h-8 rounded-lg bg-blue-500/[0.08] border border-blue-500/[0.1] hover:bg-blue-500/[0.2] flex items-center justify-center text-slate-500 hover:text-blue-400 transition-all">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-lg bg-blue-500/[0.08] border border-blue-500/[0.1] hover:bg-blue-500/[0.2] flex items-center justify-center text-slate-500 hover:text-blue-400 transition-all">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <Link href={`/team/${member.slug}`} className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors group-hover:gap-1.5">
                    Voir la fiche <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {associates.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-blue-500/[0.1]" />
              <div className="flex items-center gap-1.5">
                <span className="text-blue-500/40 font-mono text-xs">[</span>
                <span className="text-xs font-mono text-slate-600 uppercase tracking-widest">Associés</span>
                <span className="text-blue-500/40 font-mono text-xs">]</span>
              </div>
              <div className="flex-1 h-px bg-blue-500/[0.1]" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {associates.map((a, i) => {
                const rankStyle = RANK_STYLES[a.rank] ?? RANK_STYLES["C"];
                return (
                  <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }} whileHover={{ y: -5 }}
                    className="card-sl overflow-hidden hover:border-blue-400/20 transition-all duration-300">
                    <div className={`h-24 bg-gradient-to-br ${a.gradient} flex items-center justify-center relative overflow-hidden`}>
                      <span className="text-4xl z-10">{a.emoji}</span>
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "12px 12px" }} />
                      <div className={`absolute top-2 right-2 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${rankStyle.bg} ${rankStyle.text} ${rankStyle.border}`}>
                        {a.rank}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-white text-sm mb-0.5">{a.name}</h3>
                      <p className={`text-[10px] font-mono font-semibold uppercase tracking-wide mb-2 ${rankStyle.text}`}>{a.role}</p>
                      {a.specialty && (
                        <span className="inline-block text-[10px] px-2 py-0.5 rounded-md bg-blue-500/[0.08] text-blue-400 border border-blue-500/[0.12] font-mono mb-3">
                          {a.specialty}
                        </span>
                      )}
                      <div className="flex gap-1.5">
                        {a.linkedin && <a href={a.linkedin} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-lg bg-blue-500/[0.06] border border-blue-500/[0.1] hover:bg-blue-500/[0.15] flex items-center justify-center text-slate-500 hover:text-blue-400 transition-all"><Linkedin className="w-3 h-3" /></a>}
                        {a.twitter  && <a href={a.twitter}  target="_blank" rel="noreferrer" className="w-7 h-7 rounded-lg bg-blue-500/[0.06] border border-blue-500/[0.1] hover:bg-blue-500/[0.15] flex items-center justify-center text-slate-500 hover:text-blue-400 transition-all"><Twitter  className="w-3 h-3" /></a>}
                        {a.github   && <a href={a.github}   target="_blank" rel="noreferrer" className="w-7 h-7 rounded-lg bg-blue-500/[0.06] border border-blue-500/[0.1] hover:bg-blue-500/[0.15] flex items-center justify-center text-slate-500 hover:text-blue-400 transition-all"><Github   className="w-3 h-3" /></a>}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
