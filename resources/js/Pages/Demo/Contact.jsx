import { Head } from "@inertiajs/react";
import ClientLayout from "../../Layouts/ClientLayout";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function Contact({ client }) {
  const c = {
    name: client?.name || "Nom Entreprise",
    primary: client?.primaryColor || "#2563eb",
    phone: client?.phone || "+221 77 123 45 67",
    email: client?.email || "contact@entreprise.sn",
    address: client?.address || "Médina, Dakar, Sénégal",
    hours: client?.hours || "Lun — Ven : 8h30 — 18h00",
    whatsapp: client?.whatsapp || "221771234567",
  };

  const [submitted, setSubmitted] = useState(false);

  const contactItems = [
    { icon: Phone, label: "Téléphone", value: c.phone, href: `tel:${c.phone}` },
    { icon: Mail, label: "Email", value: c.email, href: `mailto:${c.email}` },
    { icon: MapPin, label: "Adresse", value: c.address },
    { icon: Clock, label: "Horaires", value: c.hours },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <ClientLayout client={client}>
      <Head title={`Contact — ${c.name}`} />

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: c.primary }}>
            Parlons de votre projet
          </p>
          <h1 className="text-4xl font-bold text-gray-900">Contactez-nous</h1>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Une question, un projet ? N'hésitez pas à nous écrire ou à passer nous voir.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2 space-y-6">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: c.primary + "15" }}>
                    <item.icon className="w-5 h-5" style={{ color: c.primary }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-gray-900 font-medium hover:underline">{item.value}</a>
                    ) : (
                      <p className="text-gray-900 font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <a
                href={`https://wa.me/${c.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-sm transition-colors mt-4"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Écrire sur WhatsApp
              </a>
            </div>

            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 space-y-5">
                {submitted && (
                  <div className="p-4 rounded-lg bg-green-50 text-green-700 text-sm font-medium">
                    Merci ! Votre message a bien été envoyé. (Demo)
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom complet *</label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 text-sm" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
                    <input type="tel" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 text-sm" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                  <textarea rows={5} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 text-sm resize-none" required />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: c.primary }}
                >
                  <Send className="w-4 h-4" />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </ClientLayout>
  );
}
