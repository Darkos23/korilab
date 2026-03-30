import { Head } from "@inertiajs/react";
import ClientLayout from "../../Layouts/ClientLayout";
import { Users, Target, Award } from "lucide-react";

export default function About({ client }) {
  const c = {
    name: client?.name || "Nom Entreprise",
    primary: client?.primaryColor || "#2563eb",
    aboutTitle: client?.aboutTitle || "Notre histoire",
    aboutText: client?.aboutText || "Fondée à Dakar, notre entreprise s'est construite sur des valeurs fortes : qualité, engagement et proximité. Nous accompagnons nos clients avec la conviction que chaque projet mérite une attention particulière et un travail soigné.",
    mission: client?.mission || "Offrir des services d'excellence accessibles à tous, en mettant l'humain au centre de chaque projet.",
    values: client?.values || [
      { icon: "Users", title: "Proximité", desc: "Une relation de confiance avec chacun de nos clients." },
      { icon: "Target", title: "Excellence", desc: "Un travail rigoureux et des résultats à la hauteur." },
      { icon: "Award", title: "Engagement", desc: "Nous tenons nos promesses, toujours." },
    ],
    team: client?.team || [],
  };

  const iconMap = { Users, Target, Award };

  return (
    <ClientLayout client={client}>
      <Head title={`À propos — ${c.name}`} />

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: c.primary }}>
            Qui sommes-nous
          </p>
          <h1 className="text-4xl font-bold text-gray-900">À propos de {c.name}</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{c.aboutTitle}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{c.aboutText}</p>
              <div className="p-5 rounded-xl border-l-4" style={{ borderColor: c.primary, backgroundColor: c.primary + "08" }}>
                <p className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: c.primary }}>Notre mission</p>
                <p className="text-gray-700 italic">{c.mission}</p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="aspect-[4/3] rounded-2xl bg-gray-200 overflow-hidden flex items-center justify-center">
                <span className="text-gray-400 text-sm">Image À propos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nos valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {c.values.map((v, i) => {
              const Icon = iconMap[v.icon] || Users;
              return (
                <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: c.primary + "15" }}>
                    <Icon className="w-6 h-6" style={{ color: c.primary }} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {c.team.length > 0 && (
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Notre équipe</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {c.team.map((m, i) => (
                <div key={i} className="text-center">
                  <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 overflow-hidden" />
                  <h3 className="font-bold text-gray-900">{m.name}</h3>
                  <p className="text-sm text-gray-500">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </ClientLayout>
  );
}
