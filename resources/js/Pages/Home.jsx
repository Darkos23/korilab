import { Head } from "@inertiajs/react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SystemBoot from "../Components/SystemBoot";
import WhatsAppFloat from "../Components/WhatsAppFloat";
import ScrollToTop from "../Components/ScrollToTop";
import Hero from "../Components/sections/Hero";
import About from "../Components/sections/About";
import Services from "../Components/sections/Services";
import Portfolio from "../Components/sections/Portfolio";
import Team from "../Components/sections/Team";
import Contact from "../Components/sections/Contact";
import PrestigeBanner from "../Components/sections/PrestigeBanner";
import Testimonials from "../Components/sections/Testimonials";
import { team } from "../data/team";

export default function Home({ site, hero, heroStats, services, portfolio, associates, contactInfo }) {
  const availabilityMessage = site?.availabilityMessage ?? "Disponible pour de nouveaux projets";
  const availabilitySlots   = site?.availabilitySlots   ?? "2 créneaux disponibles ce mois-ci";

  const logoName    = site?.header?.logoName    ?? "KoriLab";
  const tagline     = site?.header?.tagline     ?? "Creative Studio";
  const description = site?.header?.description ?? `${logoName} — Studio de design et développement web. Nous créons des expériences digitales de haut niveau pour les startups et entreprises.`;

  return (
    <>
      <Head title={`${logoName} — ${tagline}`} />
      <SystemBoot />
      <Navbar header={site?.header} />
      <main>
        <Hero hero={hero} heroStats={heroStats} />
        <About about={site?.about} />
        <Services services={services ?? []} />
        <PrestigeBanner />
        <Portfolio projects={portfolio ?? []} />
        <Team teamMembers={team} associates={associates ?? []} />
        <Testimonials testimonials={site?.testimonials ?? []} />
        <Contact
          contactInfo={contactInfo ?? []}
          availabilityMessage={availabilityMessage}
          availabilitySlots={availabilitySlots}
        />
      </main>
      <Footer footer={site?.footer} contactInfo={contactInfo} />
      <WhatsAppFloat />
      <ScrollToTop />
    </>
  );
}
