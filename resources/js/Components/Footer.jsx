import { usePage, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Github, Instagram } from "lucide-react";

const SOCIAL_ICONS = { Twitter, Linkedin, Github, Instagram };

function CauriLogo({ color = "#60a5fa" }) {
  const C = color;
  return (
    <motion.div className="relative flex items-center justify-center" style={{ width: 28, height: 40 }}>
      <motion.div className="absolute inset-0"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: `radial-gradient(ellipse, ${C}55 0%, transparent 70%)`, filter: "blur(6px)" }}
      />
      <motion.svg width="28" height="40" viewBox="0 0 60 84" fill="none"
        animate={{ filter: [`drop-shadow(0 0 3px ${C}50)`, `drop-shadow(0 0 9px ${C}99)`, `drop-shadow(0 0 3px ${C}50)`] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <mask id="cauri-footer">
            <ellipse cx="30" cy="42" rx="21" ry="30" fill="white"/>
            <path d="M30,14 L26,20 L34,26 L26,32 L34,38 L26,44 L34,50 L26,56 L34,62 L30,70"
              stroke="black" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="14" y="22" width="9" height="2.2" rx="1.1" fill="black"/>
            <rect x="13" y="28" width="9" height="2.2" rx="1.1" fill="black"/>
            <path d="M11,34 L18,40 L11,46" stroke="black" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16,34 L23,40 L16,46" stroke="black" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9" cy="42" r="2.5" fill="black"/>
            <path d="M11,46 L18,52 L11,58" stroke="black" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16,46 L23,52 L16,58" stroke="black" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="13" y="60" width="9" height="2.2" rx="1.1" fill="black"/>
            <rect x="14" y="65" width="8" height="2.2" rx="1.1" fill="black"/>
            <rect x="37" y="22" width="9" height="2.2" rx="1.1" fill="black"/>
            <rect x="38" y="28" width="9" height="2.2" rx="1.1" fill="black"/>
            <path d="M49,34 L42,40 L49,46" stroke="black" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M44,34 L37,40 L44,46" stroke="black" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="51" cy="42" r="2.5" fill="black"/>
            <path d="M49,46 L42,52 L49,58" stroke="black" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M44,46 L37,52 L44,58" stroke="black" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="38" y="60" width="9" height="2.2" rx="1.1" fill="black"/>
            <rect x="38" y="65" width="8" height="2.2" rx="1.1" fill="black"/>
          </mask>
        </defs>
        <motion.ellipse cx="30" cy="42" rx="21" ry="30" fill={C} mask="url(#cauri-footer)"
          animate={{ fillOpacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse cx="30" cy="42" rx="21" ry="30" fill="none" stroke={C} strokeWidth="0.8"
          animate={{ strokeOpacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
    </motion.div>
  );
}

export default function Footer({ footer, contactInfo }) {
  const { url, props } = usePage();
  const header = props.header ?? {};
  const isAuth = props.auth?.user;
  if (url.startsWith("/dashboard") || url === "/login") return null;

  const tagline      = footer?.tagline      ?? "Nous forgeons des expériences numériques légendaires.";
  const serviceLinks = footer?.serviceLinks ?? ["Design UI/UX", "Développement Web", "Branding", "Stratégie Digitale"];
  const studioLinks  = footer?.studioLinks  ?? footer?.guildeLinks ?? ["À propos", "Portfolio", "Équipe"];
  const socials      = footer?.socials      ?? [{ platform: "Twitter", href: "#" }, { platform: "Linkedin", href: "#" }, { platform: "Github", href: "#" }, { platform: "Instagram", href: "#" }];
  const copyright    = footer?.copyright    ?? `${header?.logoName ?? "KoriLab"} — Tous droits réservés`;

  const contactLines = contactInfo
    ? contactInfo.filter(c => ["Email","Téléphone","Adresse"].includes(c.label)).map(c => c.value)
    : ["hello@zyra.studio", "+221 77 534 19 54", "Dakar, Sénégal"];

  const footerCols = [
    { title: "Services", items: serviceLinks },
    { title: "Studio",   items: studioLinks },
    { title: "Contact",  items: contactLines },
  ];

  return (
    <footer className="bg-[#030308] text-slate-500 border-t border-sky-500/[0.08]">
      <div className="section-padding mx-auto max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-sky-500/[0.08]">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <CauriLogo color="#38bdf8" />
              <div>
                <span className="font-bold text-xl text-white">{header?.logoName ?? "KoriLab"}<span className="text-sky-400">.</span></span>
                <div className="font-mono text-[9px] text-sky-400/50 tracking-[0.2em] uppercase">{header?.logoSub ?? "Creative Studio"}</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6">{tagline}</p>
          </div>

          {footerCols.map(({ title, items }) => (
            <div key={title}>
              <h3 className="font-mono text-xs text-sky-400 font-semibold mb-4 uppercase tracking-wider">[ {title} ]</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    {item.includes("@") || item.startsWith("+") ? (
                      <span className="text-sm hover:text-sky-400 transition-colors cursor-default">{item}</span>
                    ) : (
                      <a href="#" className="text-sm hover:text-sky-400 transition-colors">{item}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="font-mono text-xs text-slate-700">© {new Date().getFullYear()} {copyright}</p>
          <div className="flex gap-6 items-center">
            <Link href="/mentions-legales" className="text-xs hover:text-sky-400 transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="text-xs hover:text-sky-400 transition-colors">Confidentialité</Link>
            {!isAuth && (
              <Link href="/login" className="text-slate-800 hover:text-slate-600 transition-colors text-[10px]">·</Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
