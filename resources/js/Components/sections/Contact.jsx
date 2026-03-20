import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Send, CheckCircle2, Mail, Phone, MapPin, Clock } from "lucide-react";

const budgets = ["< 500K FCFA", "500K - 2M FCFA", "2M - 5M FCFA", "> 5M FCFA"];
const iconMap  = { Mail, Phone, MapPin, Clock };

function cn(...c) { return c.filter(Boolean).join(" "); }

export default function Contact({ contactInfo, availabilityMessage, availabilitySlots }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { props } = usePage();

  const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
    name:    "",
    email:   "",
    company: "",
    budget:  "",
    message: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post("/contact", { preserveScroll: true, onSuccess: () => reset() });
  };

  return (
    <section id="contact" ref={ref} className="section-padding py-28 bg-[#050814] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-700/[0.07] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/[0.06] rounded-full blur-[100px]" />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(124,58,237,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="mx-auto max-w-7xl relative">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 mb-5">
            <span className="text-blue-500/50 font-mono text-sm">[</span>
            <span className="sys-label">Démarrer un projet</span>
            <span className="text-blue-500/50 font-mono text-sm">]</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Prêt à lancer votre <span className="gradient-text">prochain projet ?</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Partagez votre vision avec nous. Nous vous répondons sous 24h avec une proposition sur mesure.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Infos contact */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-5">
            {contactInfo?.map((item) => {
              const Icon = iconMap[item.icon] ?? Mail;
              return (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/[0.08] border border-blue-500/[0.12] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 mb-0.5 font-mono">{item.label}</div>
                    <div className="text-sm font-medium text-slate-300">{item.value}</div>
                  </div>
                </div>
              );
            })}
            <div className="mt-8 p-5 rounded-2xl bg-blue-500/[0.06] border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-400">{availabilityMessage}</span>
              </div>
              <p className="text-xs text-slate-600">{availabilitySlots}</p>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2">

            {/* Flash succès */}
            {(wasSuccessful || props.flash?.success) && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
                <p className="text-slate-500 mb-6">Nous vous répondons sous 24h.</p>
              </motion.div>
            )}

            {!wasSuccessful && !props.flash?.success && (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Nom complet *</label>
                    <input value={data.name} onChange={e => setData("name", e.target.value)} placeholder="Jean Dupont"
                      className={cn("w-full px-4 py-3 rounded-xl bg-slate-900/60 border text-white placeholder-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all",
                        errors.name ? "border-rose-500" : "border-blue-500/[0.12] focus:border-blue-500/50")} />
                    {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Email *</label>
                    <input value={data.email} onChange={e => setData("email", e.target.value)} placeholder="jean@exemple.com" type="email"
                      className={cn("w-full px-4 py-3 rounded-xl bg-slate-900/60 border text-white placeholder-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all",
                        errors.email ? "border-rose-500" : "border-blue-500/[0.12] focus:border-blue-500/50")} />
                    {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Entreprise</label>
                  <input value={data.company} onChange={e => setData("company", e.target.value)} placeholder="Ma Startup"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-blue-500/[0.12] text-white placeholder-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500/50 transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-500 mb-2 uppercase tracking-wider">Budget du projet *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgets.map((b) => (
                      <label key={b} className="cursor-pointer">
                        <input type="radio" value={b} checked={data.budget === b} onChange={() => setData("budget", b)} className="sr-only peer" />
                        <div className="px-3 py-2.5 rounded-xl border border-blue-500/[0.1] text-slate-500 text-xs font-mono font-medium text-center peer-checked:border-blue-500/50 peer-checked:bg-blue-500/[0.1] peer-checked:text-blue-400 hover:border-blue-500/30 transition-all">
                          {b}
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.budget && <p className="mt-1 text-xs text-rose-400">{errors.budget}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Description du projet *</label>
                  <textarea value={data.message} onChange={e => setData("message", e.target.value)} rows={5}
                    placeholder="Décrivez votre projet, vos objectifs, vos délais..."
                    className={cn("w-full px-4 py-3 rounded-xl bg-slate-900/60 border text-white placeholder-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none",
                      errors.message ? "border-rose-500" : "border-blue-500/[0.12] focus:border-blue-500/50")} />
                  {errors.message && <p className="mt-1 text-xs text-rose-400">{errors.message}</p>}
                </div>

                <button type="submit" disabled={processing}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:glow-blue hover:scale-[1.01] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100">
                  {processing
                    ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Envoi en cours...</>
                    : <><Send className="w-4 h-4" /> Envoyer le message</>
                  }
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
