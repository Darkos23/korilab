import { Head } from "@inertiajs/react";
import ClientLayout from "../../Layouts/ClientLayout";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Home({ client }) {
  const c = {
    name: client?.name || "Nom Entreprise",
    tagline: client?.tagline || "Votre partenaire de confiance",
    heroTitle: client?.heroTitle || "Des services de qualité pour votre réussite",
    heroSubtitle: client?.heroSubtitle || "Nous accompagnons les entreprises et particuliers avec professionnalisme et engagement depuis Dakar.",
    heroImage: client?.heroImage || "/images/hero.jpg",
    primary: client?.primaryColor || "#2563eb",
    whatsapp: client?.whatsapp || "221XXXXXXXXX",
    highlights: client?.highlights || [
      { title: "Expertise reconnue", desc: "Des années d'expérience au service de nos clients." },
      { title: "Service personnalisé", desc: "Chaque client est unique, chaque solution aussi." },
      { title: "Disponibilité", desc: "Une équipe réactive, à votre écoute 7j/7." },
    ],
  };

  return (
    <ClientLayout client={client}>
      <Head title={`${c.name} — ${c.tagline}`} />

      <section className="relative bg-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: c.primary }}>
                {c.tagline}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {c.heroTitle}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {c.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${c.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: c.primary }}
                >
                  Nous contacter
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/demo/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-semibold transition-colors hover:bg-gray-100"
                  style={{ borderColor: c.primary, color: c.primary }}
                >
                  Nos services
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="aspect-[4/3] rounded-2xl bg-gray-200 overflow-hidden flex items-center justify-center">
                <span className="text-gray-400 text-sm">Image Hero</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Pourquoi nous choisir</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {c.highlights.map((h, i) => (
              <div key={i} className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: c.primary + "15" }}>
                  <CheckCircle className="w-6 h-6" style={{ color: c.primary }} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{h.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: c.primary }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à commencer ?</h2>
          <p className="text-white/80 text-lg mb-8">Contactez-nous dès aujourd'hui pour discuter de votre projet.</p>
          <a
            href={`https://wa.me/${c.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white rounded-lg font-bold transition-opacity hover:opacity-90"
            style={{ color: c.primary }}
          >
            Discuter sur WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </ClientLayout>
  );
}
