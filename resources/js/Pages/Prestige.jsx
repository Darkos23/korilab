import { Head, Link } from "@inertiajs/react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ArrowLeft, Check, Zap, Shield, Headphones, BarChart3, Globe, Palette } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "35 000",
    period: "/mois",
    description: "L'essentiel pour exister en ligne",
    color: "blue",
    features: [
      "Site vitrine 5 pages",
      "Hébergement + nom de domaine inclus",
      "Maintenance technique mensuelle",
      "2 modifications de contenu/mois",
      "Rapport mensuel standard",
      "Support WhatsApp (24h)",
    ],
    cta: "Commencer",
  },
  {
    name: "Business",
    price: "75 000",
    period: "/mois",
    description: "Croissance et visibilité digitale",
    color: "emerald",
    popular: true,
    features: [
      "Site jusqu'à 15 pages",
      "Hébergement + nom de domaine inclus",
      "Maintenance technique mensuelle",
      "Jusqu'à 6 modifications/mois",
      "1 article de blog/semaine",
      "Optimisation SEO mensuelle",
      "Gestion réseaux sociaux (2 posts/sem.)",
      "Rapport analytique mensuel",
      "Support WhatsApp (4h)",
    ],
    cta: "Choisir Business",
  },
  {
    name: "Premium",
    price: "250 000",
    period: "/mois",
    description: "Accompagnement digital complet",
    color: "amber",
    features: [
      "Tout Business inclus",
      "Jusqu'à 12 modifications/mois",
      "Campagne Meta/Google (budget inclus)",
      "Séance stratégie mensuelle (1h visio)",
      "Account manager dédié",
      "Rapport premium détaillé",
      "Support WhatsApp SLA garanti",
    ],
    cta: "Choisir Premium",
  },
];

const benefits = [
  { icon: Globe, title: "Clé en main", desc: "On gère tout : design, développement, hébergement, mises à jour." },
  { icon: Shield, title: "Sans surprise", desc: "Un prix fixe par mois, pas de devis imprévisibles." },
  { icon: Headphones, title: "Support local", desc: "Équipe basée à Dakar, support en français et wolof." },
  { icon: BarChart3, title: "Résultats mesurables", desc: "Rapport mensuel avec métriques clés de votre site." },
  { icon: Zap, title: "Livraison rapide", desc: "Starter en 7 jours, Business en 10, Premium en 21." },
  { icon: Palette, title: "Design sur mesure", desc: "Pas de template générique — chaque site est unique." },
];

const colorMap = {
  blue:    { border: "border-blue-500/20",   bg: "bg-blue-500/[0.06]",    text: "text-blue-400",    btn: "bg-blue-600 hover:bg-blue-500",    badge: "" },
  emerald: { border: "border-emerald-500/20", bg: "bg-emerald-500/[0.06]", text: "text-emerald-400", btn: "bg-emerald-600 hover:bg-emerald-500", badge: "bg-emerald-500" },
  amber:   { border: "border-amber-500/20",   bg: "bg-amber-500/[0.06]",   text: "text-amber-400",   btn: "bg-amber-600 hover:bg-amber-500",   badge: "" },
};

function PlanCard({ plan, index }) {
  const c = colorMap[plan.color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative rounded-2xl ${c.border} border ${c.bg} p-8 flex flex-col`}
    >
      {plan.popular && (
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${c.badge} text-white text-xs font-mono px-4 py-1 rounded-full`}>
          Populaire
        </div>
      )}
      <div className="mb-6">
        <h3 className={`font-mono text-sm ${c.text} uppercase tracking-wider mb-2`}>[ {plan.name} ]</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-white">{plan.price}</span>
          <span className="text-slate-500 text-sm font-mono">FCFA{plan.period}</span>
        </div>
        <p className="text-slate-400 text-sm mt-2">{plan.description}</p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check className={`w-4 h-4 ${c.text} mt-0.5 shrink-0`} />
            <span className="text-slate-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={`https://wa.me/221775341954?text=${encodeURIComponent(`Bonjour KoriLab, je suis intéressé(e) par la formule ${plan.name} Prestige.`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-3 rounded-xl ${c.btn} text-white text-sm font-semibold text-center transition-colors block`}
      >
        {plan.cta}
      </a>
    </motion.div>
  );
}

export default function Prestige({ site, contactInfo, dbPlans = [] }) {
  const logoName = site?.header?.logoName ?? "KoriLab";

  // Merge DB prices/names with local plan structure (features, colors, etc.)
  const mergedPlans = plans.map(p => {
    const db = dbPlans.find(d => d.key === p.name.toLowerCase());
    if (!db) return p;
    return { ...p, name: db.label, price: db.price };
  });

  return (
    <>
      <Head title={`Prestige — Abonnement Digital pour PME — ${logoName}`} />
      <Navbar header={site?.header} />

      <main className="min-h-screen bg-[#050814]">
        {/* Hero */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-700/[0.06] rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-600/[0.04] rounded-full blur-[120px]" />
          </div>

          <div className="mx-auto max-w-5xl px-6 relative text-center">
            <Link href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-blue-400/60 hover:text-blue-400 transition-colors mb-10 group">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Retour à l'accueil
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-1.5 mb-6">
                <span className="text-amber-500/50 font-mono text-sm">[</span>
                <span className="font-mono text-xs text-amber-400/60 tracking-widest uppercase">Prestige</span>
                <span className="text-amber-500/50 font-mono text-sm">]</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Votre présence digitale,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400">un abonnement.</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Site web professionnel, maintenance, contenu et visibilité — le tout géré par notre équipe, pour un prix fixe par mois. Pas de devis surprise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing */}
        <section className="pb-24 px-6">
          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
            {mergedPlans.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} index={i} />
            ))}
          </div>
          <p className="text-center text-slate-600 text-xs font-mono mt-8">
            Tous les prix sont en FCFA HT — Paiement par Wave, Orange Money ou virement
          </p>
        </section>

        {/* Benefits */}
        <section className="pb-24 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-white mb-3">Pourquoi Prestige ?</h2>
              <p className="text-slate-400 text-sm">Tout ce dont votre PME a besoin pour exister en ligne, sans se compliquer la vie.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 rounded-xl bg-blue-500/[0.03] border border-blue-500/[0.08]"
                >
                  <b.icon className="w-5 h-5 text-blue-400 mb-3" />
                  <h3 className="text-white font-semibold text-sm mb-1">{b.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24 px-6">
          <div className="mx-auto max-w-3xl text-center p-12 rounded-2xl bg-gradient-to-b from-blue-500/[0.08] to-transparent border border-blue-500/[0.12]">
            <h2 className="text-2xl font-bold text-white mb-3">Prêt à digitaliser votre entreprise ?</h2>
            <p className="text-slate-400 text-sm mb-8">Contactez-nous pour un premier échange gratuit et sans engagement.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/221775341954?text=Bonjour%20KoriLab%2C%20je%20voudrais%20en%20savoir%20plus%20sur%20Prestige."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Discuter sur WhatsApp
              </a>
              <Link
                href="/#contact"
                className="px-8 py-3 bg-white/[0.06] hover:bg-white/[0.1] text-white rounded-xl text-sm font-semibold transition-colors border border-white/[0.1]"
              >
                Formulaire de contact
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer footer={site?.footer} contactInfo={contactInfo} />
    </>
  );
}
