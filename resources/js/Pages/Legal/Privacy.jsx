import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { ArrowLeft } from "lucide-react";

export default function Privacy({ site, contactInfo }) {
  const logoName = site?.header?.logoName ?? "KoriLab";
  const year     = new Date().getFullYear();
  const email    = contactInfo?.find(c => c.label === "Email")?.value ?? "contact@korilab.dev";

  return (
    <>
      <Head title={`Politique de confidentialité — ${logoName}`} />
      <Navbar header={site?.header} />

      <main className="min-h-screen bg-[#050814] pt-32 pb-24">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-700/[0.05] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-violet-600/[0.04] rounded-full blur-[100px]" />
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
            <h1 className="text-4xl font-bold text-white">Politique de confidentialité</h1>
            <p className="mt-2 text-sm text-slate-600 font-mono">Mise à jour : mars {year}</p>
          </div>

          <div className="space-y-10 text-slate-400 text-sm leading-relaxed">

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Introduction ]</h2>
              <p>
                {logoName} Studio s'engage à protéger la vie privée des visiteurs de son site. Cette politique de confidentialité décrit les données que nous collectons, comment nous les utilisons et les droits dont vous disposez.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Données collectées ]</h2>
              <p className="mb-3">Les seules données collectées sont celles que vous nous transmettez volontairement via le formulaire de contact :</p>
              <ul className="space-y-2 pl-4">
                {[
                  "Nom complet",
                  "Adresse email",
                  "Nom de l'entreprise (optionnel)",
                  "Budget indicatif du projet",
                  "Description du projet",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-blue-400/50 font-mono mt-0.5">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                Nous ne collectons aucune donnée de navigation, n'installons pas de cookies de suivi et n'utilisons pas de solution d'analyse comportementale.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Finalité du traitement ]</h2>
              <p>
                Les données transmises via le formulaire de contact sont utilisées uniquement pour répondre à votre demande de projet. Elles ne sont jamais revendues, partagées ou utilisées à des fins commerciales tierces.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Conservation des données ]</h2>
              <p>
                Les données de contact sont conservées le temps nécessaire au traitement de votre demande, et au maximum 12 mois après la fin de nos échanges. Elles sont ensuite supprimées définitivement.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Vos droits ]</h2>
              <p className="mb-3">Conformément à la loi n° 2008-12 sur la protection des données personnelles au Sénégal, vous disposez des droits suivants :</p>
              <ul className="space-y-2 pl-4">
                {[
                  "Droit d'accès à vos données",
                  "Droit de rectification",
                  "Droit à l'effacement (droit à l'oubli)",
                  "Droit d'opposition au traitement",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-blue-400/50 font-mono mt-0.5">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, contactez-nous à{" "}
                <a href={`mailto:${email}`} className="text-blue-400 hover:underline">{email}</a>.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Sécurité ]</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation. Les communications entre votre navigateur et notre serveur sont chiffrées via HTTPS.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Cookies ]</h2>
              <p>
                Ce site n'utilise pas de cookies tiers à des fins publicitaires ou de tracking. Seul un cookie de session technique peut être créé lors de la soumission du formulaire de contact. Il est supprimé à la fermeture du navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Contact ]</h2>
              <div className="p-5 rounded-xl bg-blue-500/[0.04] border border-blue-500/[0.1] space-y-1.5">
                <p><span className="text-slate-600">Responsable du traitement :</span> <span className="text-slate-300">{logoName} Studio</span></p>
                <p><span className="text-slate-600">Email :</span>{" "}
                  <a href={`mailto:${email}`} className="text-blue-400 hover:underline">{email}</a>
                </p>
                <p><span className="text-slate-600">Localisation :</span> <span className="text-slate-300">Dakar, Sénégal</span></p>
              </div>
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
