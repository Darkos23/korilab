import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@inertiajs/react";
import { Crown, ArrowRight } from "lucide-react";

export default function PrestigeBanner({ starterPrice = '35 000' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="section-padding py-12 bg-[#060916]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Link href="/prestige" className="block group">
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.08] via-amber-600/[0.04] to-transparent p-8 md:p-10 transition-all duration-300 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/[0.05]">
              {/* Glow background */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/[0.06] rounded-full blur-[100px] pointer-events-none" />

              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/[0.12] border border-amber-500/[0.2] flex items-center justify-center shrink-0">
                    <Crown className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="text-xl font-bold text-white">KoriLab Prestige</h3>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border border-amber-400/30 bg-amber-400/10 text-amber-400 uppercase tracking-wider">Nouveau</span>
                    </div>
                    <p className="text-slate-400 text-sm max-w-lg">
                      Votre site web professionnel, hébergé, maintenu et mis à jour — un abonnement mensuel, zéro surprise.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-2xl font-bold text-amber-400">{starterPrice} <span className="text-sm font-normal text-slate-500">FCFA/mois</span></div>
                    <div className="text-xs text-slate-600 font-mono">à partir de</div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-600 group-hover:bg-amber-500 text-white text-sm font-semibold transition-colors whitespace-nowrap">
                    Découvrir
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
