import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { ArrowLeft } from "lucide-react";

export default function Cgv({ site, contactInfo }) {
  const logoName = site?.header?.logoName ?? "KoriLab";
  const year     = new Date().getFullYear();
  const email    = contactInfo?.find(c => c.label === "Email")?.value ?? "contact@korilab.dev";

  return (
    <>
      <Head title={`Conditions Générales de Vente — ${logoName}`} />
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
            <h1 className="text-4xl font-bold text-white">Conditions Générales de Vente</h1>
            <p className="mt-2 text-sm text-slate-600 font-mono">Mise à jour : mars {year}</p>
          </div>

          <div className="space-y-10 text-slate-400 text-sm leading-relaxed">

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Article 1 — Objet ]</h2>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre {logoName} Studio, représenté par Ibrahima Sarr, ci-après "le Prestataire", et toute personne physique ou morale passant commande d'une prestation, ci-après "le Client".
              </p>
              <p className="mt-2">
                Toute commande implique l'acceptation sans réserve des présentes CGV.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Article 2 — Prestations ]</h2>
              <p>
                {logoName} Studio propose des prestations de conception et développement web, design graphique, branding, et accompagnement digital. Le périmètre exact de chaque prestation est défini dans le devis ou le contrat signé entre les parties.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Article 3 — Devis et commande ]</h2>
              <p>
                Tout projet fait l'objet d'un devis détaillé et gratuit. Le devis est valable 30 jours à compter de sa date d'émission. La commande est considérée comme ferme après signature du devis et versement de l'acompte prévu.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Article 4 — Tarifs et paiement ]</h2>
              <p className="mb-3">Les tarifs sont exprimés en francs CFA (FCFA), hors taxes. Sauf mention contraire dans le devis, les modalités de paiement sont les suivantes :</p>
              <ul className="space-y-2 pl-4">
                {[
                  "40% d'acompte à la signature du devis",
                  "30% à la validation de la maquette ou du prototype",
                  "30% à la livraison finale",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-blue-400/50 font-mono mt-0.5">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                Les paiements sont acceptés par virement bancaire, Wave ou Orange Money.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Article 5 — Délais de livraison ]</h2>
              <p>
                Les délais de livraison sont communiqués à titre indicatif dans le devis. Le Prestataire s'engage à respecter les délais convenus dans la mesure où le Client fournit les contenus et validations nécessaires dans les temps. Tout retard imputable au Client (contenus manquants, absence de retour) suspend les délais de livraison.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Article 6 — Modifications et révisions ]</h2>
              <p>
                Le nombre de révisions incluses dans chaque prestation est défini dans le devis. Toute demande de modification supplémentaire fera l'objet d'un avenant et d'une facturation complémentaire communiquée au préalable au Client.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Article 7 — Propriété intellectuelle ]</h2>
              <p>
                Le transfert des droits de propriété intellectuelle sur les livrables est effectif uniquement après paiement intégral de la prestation. Jusqu'au paiement complet, le Prestataire reste propriétaire de l'ensemble des créations réalisées.
              </p>
              <p className="mt-2">
                Le Prestataire se réserve le droit d'inclure les réalisations dans son portfolio, sauf mention contraire écrite du Client.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Article 8 — Résiliation ]</h2>
              <p>
                En cas d'annulation par le Client après le début des travaux, l'acompte versé reste acquis au Prestataire. Si plus de 50% du travail a été réalisé, le Client devra s'acquitter de la totalité du montant correspondant au travail effectué.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Article 9 — Responsabilité ]</h2>
              <p>
                Le Prestataire s'engage à exécuter les prestations avec diligence et professionnalisme. Sa responsabilité est limitée au montant de la prestation facturée. Le Prestataire ne saurait être tenu responsable des dommages indirects, pertes de données ou manque à gagner résultant de l'utilisation des livrables.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Article 10 — Hébergement et maintenance ]</h2>
              <p>
                L'hébergement et la maintenance ne sont pas inclus dans les prestations de développement, sauf mention contraire dans le devis. Ces services peuvent faire l'objet d'un contrat d'abonnement séparé.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Article 11 — Droit applicable ]</h2>
              <p>
                Les présentes CGV sont soumises au droit sénégalais. En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, les tribunaux compétents de Dakar seront seuls compétents.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-base mb-3 font-mono">[ Contact ]</h2>
              <div className="p-5 rounded-xl bg-blue-500/[0.04] border border-blue-500/[0.1] space-y-1.5">
                <p><span className="text-slate-600">Prestataire :</span> <span className="text-slate-300">{logoName} Studio</span></p>
                <p><span className="text-slate-600">Responsable :</span> <span className="text-slate-300">Ibrahima Sarr</span></p>
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
