import { Head } from "@inertiajs/react";
import ClientLayout from "../../Layouts/ClientLayout";

export default function Mentions({ client }) {
  const c = {
    name: client?.name || "Nom Entreprise",
    owner: client?.owner || "Prénom Nom",
    address: client?.address || "Dakar, Sénégal",
    email: client?.email || "contact@entreprise.sn",
    phone: client?.phone || "+221 XX XXX XX XX",
    primary: client?.primaryColor || "#2563eb",
  };

  const year = new Date().getFullYear();

  const sections = [
    {
      title: "Éditeur du site",
      content: (
        <div className="space-y-1">
          <p><strong>Raison sociale :</strong> {c.name}</p>
          <p><strong>Responsable :</strong> {c.owner}</p>
          <p><strong>Adresse :</strong> {c.address}</p>
          <p><strong>Email :</strong> <a href={`mailto:${c.email}`} className="underline" style={{ color: c.primary }}>{c.email}</a></p>
          <p><strong>Téléphone :</strong> {c.phone}</p>
        </div>
      ),
    },
    {
      title: "Conception et hébergement",
      content: (
        <div className="space-y-1">
          <p><strong>Conception :</strong> KoriLab Studio — <a href="https://korilab.dev" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: c.primary }}>korilab.dev</a></p>
          <p><strong>Hébergement :</strong> Hostinger — <a href="https://www.hostinger.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: c.primary }}>www.hostinger.com</a></p>
        </div>
      ),
    },
    {
      title: "Propriété intellectuelle",
      content: <p>L'ensemble des contenus présents sur ce site sont la propriété exclusive de {c.name}, sauf mentions contraires. Toute reproduction sans autorisation est strictement interdite.</p>,
    },
    {
      title: "Données personnelles",
      content: <p>Les données collectées via le formulaire de contact sont utilisées uniquement pour répondre à votre demande. Conformément à la loi n° 2008-12, vous disposez d'un droit d'accès et de suppression. Contact : <a href={`mailto:${c.email}`} className="underline" style={{ color: c.primary }}>{c.email}</a>.</p>,
    },
  ];

  return (
    <ClientLayout client={client}>
      <Head title={`Mentions légales — ${c.name}`} />

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Mentions légales</h1>
          <p className="mt-2 text-sm text-gray-500">Mise à jour : mars {year}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h2>
              <div className="text-gray-600 text-sm leading-relaxed">{s.content}</div>
            </div>
          ))}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400">&copy; {year} {c.name} — Tous droits réservés</p>
          </div>
        </div>
      </section>
    </ClientLayout>
  );
}
