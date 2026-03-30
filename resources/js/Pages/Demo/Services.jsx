import { Head } from "@inertiajs/react";
import ClientLayout from "../../Layouts/ClientLayout";
import { ArrowRight } from "lucide-react";

export default function Services({ client }) {
  const c = {
    name: client?.name || "Nom Entreprise",
    primary: client?.primaryColor || "#2563eb",
    whatsapp: client?.whatsapp || "221XXXXXXXXX",
    services: client?.services || [
      { title: "Conseil stratégique", desc: "Nous analysons votre situation et vous proposons des solutions adaptées à vos objectifs. Un accompagnement sur-mesure pour prendre les bonnes décisions.", image: null },
      { title: "Formation professionnelle", desc: "Des formations pratiques et certifiantes pour renforcer les compétences de vos équipes. Programmes adaptés à votre secteur d'activité.", image: null },
      { title: "Gestion de projets", desc: "De la planification à la livraison, nous pilotons vos projets avec rigueur et transparence pour garantir des résultats concrets.", image: null },
    ],
  };

  return (
    <ClientLayout client={client}>
      <Head title={`Nos services — ${c.name}`} />

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: c.primary }}>
            Ce que nous proposons
          </p>
          <h1 className="text-4xl font-bold text-gray-900">Nos services</h1>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Découvrez l'ensemble de nos prestations, conçues pour répondre à vos besoins avec qualité et professionnalisme.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
          {c.services.map((service, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-12 items-center">
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{service.desc}</p>
                <a
                  href={`https://wa.me/${c.whatsapp}?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par votre service "${service.title}".`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ color: c.primary }}
                >
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <div className="aspect-[4/3] rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Image service</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: c.primary }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Un besoin particulier ?</h2>
          <p className="text-white/80 text-lg mb-8">N'hésitez pas à nous contacter pour un devis personnalisé.</p>
          <a
            href="/demo/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white rounded-lg font-bold transition-opacity hover:opacity-90"
            style={{ color: c.primary }}
          >
            Demander un devis
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </ClientLayout>
  );
}
