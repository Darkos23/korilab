import { Link, usePage } from "@inertiajs/react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Accueil", href: "/demo" },
  { label: "A propos", href: "/demo/a-propos" },
  { label: "Services", href: "/demo/services" },
  { label: "Contact", href: "/demo/contact" },
];

export default function ClientLayout({ children, client }) {
  const { url } = usePage();
  const [menuOpen, setMenuOpen] = useState(false);

  const c = {
    name: client?.name || "Nom Entreprise",
    logo: client?.logo || null,
    primary: client?.primaryColor || "#2563eb",
    accent: client?.accentColor || "#f59e0b",
    phone: client?.phone || "+221 XX XXX XX XX",
    email: client?.email || "contact@entreprise.sn",
    address: client?.address || "Dakar, Sénégal",
    socials: client?.socials || {},
    whatsapp: client?.whatsapp || "221XXXXXXXXX",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/demo" className="flex items-center gap-2">
            {c.logo ? (
              <img src={c.logo} alt={c.name} className="h-8" />
            ) : (
              <span className="text-xl font-bold" style={{ color: c.primary }}>{c.name}</span>
            )}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  url === link.href ? "font-semibold" : "text-gray-600 hover:text-gray-900"
                }`}
                style={url === link.href ? { color: c.primary } : {}}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${c.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: c.primary }}
            >
              Nous contacter
            </a>
          </nav>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  url === link.href ? "font-semibold" : "text-gray-600"
                }`}
                style={url === link.href ? { color: c.primary } : {}}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-3">{c.name}</h3>
              <p className="text-sm leading-relaxed">Votre partenaire de confiance à Dakar.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/demo/mentions-legales" className="text-sm hover:text-white transition-colors">Mentions légales</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${c.phone}`} className="hover:text-white transition-colors">{c.phone}</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${c.email}`} className="hover:text-white transition-colors">{c.email}</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{c.address}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>&copy; {new Date().getFullYear()} {c.name} — Tous droits réservés</p>
            <p>
              Site créé par{" "}
              <a href="https://korilab.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">KoriLab</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
