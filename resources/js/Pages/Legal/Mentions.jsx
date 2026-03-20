import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { ArrowLeft } from "lucide-react";

export default function Mentions({ site, contactInfo }) {
  const logoName = site?.header?.logoName ?? "KoriLab";
  const year     = new Date().getFullYear();
  const email    = contactInfo?.find(c => c.label === "Email")?.value ?? "hello@zyra.studio";

  return (
    <>
      <Head title={`Mentions légales — ${logoName}`} />
      <Navbar header={site?.header} />

      <main className="min-h-screen bg-[#050814] pt-32 pb-24">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-700/[0.05] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/[0.04] rounded-full blur-[100px]" />
        </div>

        <div className="mx-auto max-w-3xl px-6 relative">
          <Link href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-blue-400/60 hover:text-blue-400 transition-colors mb-10 group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>

          <div className="mb-10">
            <div className="inline-flex items-center gap-1.5 mb-4">
              <span className="text-blue-500/50 font-mono text-sm">[</span>
              <span className="font-mono text-xs text-blue-400/60 tracking-widest uppercase">Légal</span>
              <span className="text-blue-500/50 font-mono text-sm">]</span>
            </div>
            <h1 className="text-4xl font-bold text-white">Mentions légales</h1>
            <p className="mt-2 text-sm text-slate-600 font-mono">Mise à jour : mars {year}</p>
          </div>

          <div className="space-y-10 text-slate-400 text-sm leading-relaxed">

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Éditeur du site ]</h2>
              <div className="p-5 rounded-xl bg-blue-500/[0.04] border border-blue-500/[0.1] space-y-1.5">
                <p><span className="text-slate-600">Nom :</span> <span className="text-slate-300">{logoName} Studio</span></p>
                <p><span className="text-slate-600">Statut :</span> <span className="text-slate-300">Studio indépendant</span></p>
                <p><span className="text-slate-600">Siège social :</span> <span className="text-slate-300">Dakar, Sénégal</span></p>
                <p><span className="text-slate-600">Email :</span>{" "}
                  <a href={`mailto:${email}`} className="text-blue-400 hover:underline">{email}</a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Directeur de la publication ]</h2>
              <p>Le directeur de la publication est le gérant du studio {logoName}.</p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Hébergement ]</h2>
              <div className="p-5 rounded-xl bg-blue-500/[0.04] border border-blue-500/[0.1] space-y-1.5">
                <p><span className="text-slate-600">Hébergeur :</span> <span className="text-slate-300">Hostingeur</span></p>
                <p><span className="text-slate-600">Site :</span>{" "}
                  <a href="https://www.hostingeur.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">www.hostingeur.com</a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Propriété intellectuelle ]</h2>
              <p>
                L'ensemble des contenus présents sur ce site (textes, images, visuels, logos, icônes, code source) sont la propriété exclusive de {logoName} Studio, sauf mentions contraires. Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est strictement interdite.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Limitation de responsabilité ]</h2>
              <p>
                {logoName} Studio s'efforce de fournir des informations exactes et à jour sur ce site. Toutefois, nous ne pouvons garantir l'exactitude, la complétude ou l'actualité des informations diffusées. L'utilisation des informations de ce site se fait sous l'entière responsabilité de l'utilisateur.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Liens hypertextes ]</h2>
              <p>
                Ce site peut contenir des liens vers des sites tiers. {logoName} Studio n'est pas responsable du contenu de ces sites externes et ne saurait être tenu pour responsable des dommages résultant de leur consultation.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Droit applicable ]</h2>
              <p>
                Le présent site et ses mentions légales sont soumis au droit sénégalais. En cas de litige, les tribunaux compétents de Dakar seront seuls compétents.
              </p>
            </section>

            <div className="pt-6 border-t border-blue-500/[0.08]">
              <p className="text-xs text-slate-700 font-mono">
                © {year} {logoName} Studio — Tous droits réservés
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer footer={site?.footer} contactInfo={contactInfo} />
    </>
  );
}
