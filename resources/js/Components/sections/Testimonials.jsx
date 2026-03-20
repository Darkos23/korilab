import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const RANK_STYLES = {
  S: { text: "text-amber-400",  border: "border-amber-400/30",  bg: "bg-amber-400/10"  },
  A: { text: "text-blue-400",   border: "border-blue-400/30",   bg: "bg-blue-400/10"   },
  B: { text: "text-violet-400", border: "border-violet-400/30", bg: "bg-violet-400/10" },
};

const FALLBACK = [
  {
    id:       1,
    name:     "Mary Katy Diagne",
    role:     "Fondatrice",
    company:  "Rosmie Premium",
    quote:    "KoriLab a su capturer l'essence luxueuse de ma marque en un site qui dépasse toutes mes attentes. Le design est élégant, les animations soignées, et mes clientes me complimentent régulièrement sur la qualité visuelle. Un travail de haute couture digitale.",
    stars:    5,
    initials: "MKD",
    avatar:   "/testimonials/mkd.jpg",
  },
  {
    id:       2,
    name:     "Cheikh Tidiane Gueye",
    role:     "Influenceur & Créateur",
    company:  "CTGHT Store",
    quote:    "J'avais besoin d'une boutique à mon image — lifestyle, moderne, qui claque. Khalil a tout compris dès le brief. Le site est propre, les paiements roulent, et ma communauté a adoré. C'est exactement ce que je voulais pour lancer mes produits.",
    stars:    5,
    initials: "CTG",
    avatar:   "/testimonials/ctght.jpg",
  },
];

const container  = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const cardAnim   = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } };

function StarRow({ rank, stars }) {
  const count = stars ?? (rank === "S" ? 5 : rank === "A" ? 4 : 5);
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1.5l1.5 3 3.3.5-2.4 2.3.6 3.3L7 9l-3 1.6.6-3.3L2.2 5l3.3-.5z"
            fill={i < count ? "#D4AF37" : "rgba(255,255,255,0.08)"}
            stroke={i < count ? "#D4AF37" : "rgba(255,255,255,0.08)"}
            strokeWidth="0.5"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ testimonials }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const items  = testimonials?.length ? testimonials : FALLBACK;

  return (
    <section id="testimonials" ref={ref} className="section-padding py-28 bg-[#060916] relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-blue-700/[0.04] rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-700/[0.04] rounded-full blur-[80px]" />
      </div>

      <div className="mx-auto max-w-7xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-1.5 mb-5">
            <span className="text-blue-500/50 font-mono text-sm">[</span>
            <span className="sys-label">Témoignages clients</span>
            <span className="text-blue-500/50 font-mono text-sm">]</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ce que disent nos <span className="gradient-text">clients</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Des entrepreneurs qui nous ont fait confiance et ne regardent plus en arrière.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container} initial="hidden" animate={inView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((t) => {
            const rank  = RANK_STYLES[t.rank] ?? RANK_STYLES.B;
            return (
              <motion.div key={t.id} variants={cardAnim} whileHover={{ y: -6 }}
                className="card-sl p-6 flex flex-col gap-4 hover:border-blue-400/20 transition-all duration-300 relative group">

                {/* Bracket coin haut-gauche */}
                <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-blue-500/20 group-hover:border-blue-400/40 transition-colors" />
                <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-blue-500/20 group-hover:border-blue-400/40 transition-colors" />

                {/* Quote icon + stars */}
                <div className="flex items-start justify-between">
                  <Quote className="w-6 h-6 text-blue-500/30 flex-shrink-0" />
                  <StarRow rank={t.rank} stars={t.stars} />
                </div>

                {/* Quote text */}
                <p className="text-slate-400 text-sm leading-relaxed flex-1 italic">
                  "{t.quote}"
                </p>

                {/* Séparateur */}
                <div className="border-t border-blue-500/[0.08]" />

                {/* Auteur */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-blue-500/20 flex-shrink-0 overflow-hidden">
                    {t.avatar
                      ? <img src={t.avatar} alt={t.name} className="w-full h-full object-cover object-top" />
                      : <div className="w-full h-full bg-blue-500/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-400">{t.initials ?? t.name?.slice(0, 2).toUpperCase()}</span>
                        </div>
                    }
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role} · {t.company}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
