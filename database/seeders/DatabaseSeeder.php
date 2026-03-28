<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Portfolio;
use App\Models\Service;
use App\Models\Site;
use App\Models\TeamMember;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Portfolio
        if (Portfolio::count() > 0) return; // évite les doublons si lancé plusieurs fois

        Portfolio::insert([
            ['title' => 'CTGHT Store',     'desc' => 'Boutique e-commerce lifestyle avec paiement intégré et gestion des stocks.', 'category' => 'Web',    'tags' => json_encode(['E-Commerce','React','Stripe']),         'emoji' => '🛍️', 'gradient' => 'from-slate-800 to-slate-900',   'image' => '/portfolio/ctght.png',     'link' => null, 'comingSoon' => false, 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Rosmie Premium',  'desc' => 'Site vitrine luxe pour une marque cosmétique haut de gamme.',                'category' => 'Web',    'tags' => json_encode(['Branding','UI/UX','WordPress']),        'emoji' => '💄', 'gradient' => 'from-rose-900 to-pink-900',    'image' => '/portfolio/rosmie.png',    'link' => null, 'comingSoon' => false, 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'MelanoGeek',      'desc' => "Blog tech & culture pour passionnés d'Afrique numérique.",                   'category' => 'Web',    'tags' => json_encode(['Blog','SEO','Next.js']),                'emoji' => '🌍', 'gradient' => 'from-emerald-900 to-teal-900', 'image' => '/portfolio/melangeek.png', 'link' => null, 'comingSoon' => false, 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'FeugDiay',        'desc' => "La friperie numérique du Sénégal — achat & vente de vêtements d'occasion.", 'category' => 'Mobile', 'tags' => json_encode(['React Native','E-Commerce','Dakar']),   'emoji' => '👗', 'gradient' => 'from-orange-700 to-amber-600', 'image' => null,                       'link' => null, 'comingSoon' => true,  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'KoriLab Identity','desc' => "Création de l'identité visuelle complète du studio — logo cauri, charte graphique, design system.", 'category' => 'Branding', 'tags' => json_encode(['Logo','Charte','Design System']),  'emoji' => '🐚', 'gradient' => 'from-sky-900 to-indigo-950',   'image' => '/images/korilab.jpg',      'link' => 'https://korilab.dev', 'comingSoon' => false, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Services
        Service::insert([
            ['icon' => 'Paintbrush', 'rank' => 'S', 'title' => 'Design UI/UX',         'desc' => 'Interfaces de rang S qui convertissent et enchantent.',                          'tags' => json_encode(['Figma','Framer','Motion']),            'accent' => 'from-blue-500 to-violet-500',   'created_at' => now(), 'updated_at' => now()],
            ['icon' => 'Code2',      'rank' => 'S', 'title' => 'Développement Web',     'desc' => 'Applications web ultra-performantes avec les dernières technologies.',           'tags' => json_encode(['React','Laravel','Next.js']),          'accent' => 'from-violet-500 to-blue-500',   'created_at' => now(), 'updated_at' => now()],
            ['icon' => 'Smartphone', 'rank' => 'A', 'title' => 'Applications Mobile',   'desc' => 'Apps natives et cross-platform pour iOS & Android.',                            'tags' => json_encode(['React Native','Flutter']),             'accent' => 'from-blue-400 to-cyan-500',     'created_at' => now(), 'updated_at' => now()],
            ['icon' => 'Megaphone',  'rank' => 'A', 'title' => 'Branding & Identité',   'desc' => "Construisez une marque légendaire qui marque les esprits.",                     'tags' => json_encode(['Logo','Charte','Brand Strategy']),     'accent' => 'from-amber-500 to-orange-500',  'created_at' => now(), 'updated_at' => now()],
            ['icon' => 'BarChart3',  'rank' => 'B', 'title' => 'Stratégie Digitale',    'desc' => 'SEO, contenu et growth hacking pour dominer votre marché.',                     'tags' => json_encode(['SEO','Analytics','Growth']),           'accent' => 'from-emerald-500 to-teal-500',  'created_at' => now(), 'updated_at' => now()],
            ['icon' => 'Globe',      'rank' => 'B', 'title' => 'E-Commerce',            'desc' => "Boutiques en ligne qui vendent 24h/24 partout dans le monde.",                  'tags' => json_encode(['Shopify','WooCommerce','Stripe']),     'accent' => 'from-rose-500 to-pink-500',     'created_at' => now(), 'updated_at' => now()],
        ]);

        // Team Members
        TeamMember::insert([
            [
                'slug'         => 'ibrahima-sarr',
                'name'         => 'Ibrahima Sarr',
                'role'         => 'Développeur Web — Infographe',
                'rank'         => 'S',
                'initials'     => 'IS',
                'gradient'     => 'from-[#0d0020] via-[#1a0040] to-[#050008]',
                'rank_bg'      => 'bg-purple-500/10',
                'rank_text'    => 'text-purple-400',
                'rank_border'  => 'border-purple-500/40',
                'location'     => 'MTOA, Rufisque, Sénégal',
                'phone'        => '+221 77-534-19-54',
                'email'        => 'sarriboo534@gmail.com',
                'theme'        => 'shadow',
                'shadow_title' => 'Monarque des Ombres',
                'summary'      => 'Jeune diplômé en Programmation et Développement, je suis à la recherche de nouveaux défis pour approfondir mes compétences et contribuer à des projets plus complexes. Je suis prêt à m\'investir pleinement pour apporter une valeur ajoutée à votre équipe.',
                'skills'       => json_encode([
                    ['name' => 'PHP / Laravel',            'level' => 85, 'category' => 'Backend'],
                    ['name' => 'WordPress / Wix / OJS',    'level' => 90, 'category' => 'CMS'],
                    ['name' => 'HTML / CSS / JavaScript',  'level' => 88, 'category' => 'Frontend'],
                    ['name' => 'C#',                       'level' => 72, 'category' => 'Backend'],
                    ['name' => 'Infographie / Design',     'level' => 92, 'category' => 'Créatif'],
                    ['name' => 'Maintenance Informatique', 'level' => 80, 'category' => 'Système'],
                    ['name' => 'Maîtrise IA',              'level' => 78, 'category' => 'Avancé'],
                    ['name' => 'Voix off',                 'level' => 85, 'category' => 'Créatif'],
                ]),
                'experience'   => json_encode([
                    ['period' => 'Depuis 2023', 'company' => 'FASTEF — Ex École Normale Supérieure', 'title' => 'Technicien & Développeur', 'missions' => ['Développement d\'applications Web sur OJS pour le Département Mathématiques', 'Développement d\'applications pour le Service d\'Approvisionnement', 'Application Web de réservation des salles de classes', 'Support communication : bâche, roll up, flyers, montage vidéos', 'Maintenance des outils informatiques : software & hardware']],
                    ['period' => '2025', 'company' => 'Agence Emerite Canada', 'title' => 'Développeur Web Freelance', 'missions' => ['Réactualisation du site de l\'agence emerite', 'Création site one page de coiffure mendi\'s', 'Création site one page salon de beauté bergeron esthétique']],
                    ['period' => '2025', 'company' => 'kL_says', 'title' => 'Créateur de contenu', 'missions' => ['Réalisation de voix off pour page Instagram kL_says']],
                    ['period' => '2024', 'company' => 'Freelance', 'title' => 'Développeur E-commerce', 'missions' => ['Création site e-commerce ctght']],
                ]),
                'education'    => json_encode([
                    ['year' => '2025', 'school' => '4ITSEC AFRICA — Dakar',            'degree' => 'Certification Cyber-Sécurité'],
                    ['year' => '2021', 'school' => 'Sup\' Info — Dakar',               'degree' => 'Licence 3 en Programmation - Développement'],
                    ['year' => '2019', 'school' => 'Lycée Étoile du Saloum — Sokone', 'degree' => 'Baccalauréat'],
                ]),
                'languages'    => json_encode([
                    ['name' => 'Français', 'level' => 'Excellent',         'percent' => 98],
                    ['name' => 'Anglais',  'level' => 'Bien',              'percent' => 65],
                    ['name' => 'Wolof',    'level' => 'Langue maternelle', 'percent' => 100],
                    ['name' => 'Sereer',   'level' => 'Langue maternelle', 'percent' => 100],
                ]),
                'soft_skills'  => json_encode(['Créativité', 'Adaptabilité', 'Autonomie', 'Travail en équipe']),
                'interests'    => json_encode(['Design UI/UX', 'Intelligence Artificielle', 'Voix off & Médias']),
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'slug'         => 'cheikh-anta-kane',
                'name'         => 'Cheikh Anta Kane',
                'role'         => 'Technico-Commercial & Marketing Digital',
                'rank'         => 'B',
                'initials'     => 'CAK',
                'gradient'     => 'from-[#2d1600] via-[#3d1f00] to-[#150900]',
                'rank_bg'      => 'bg-amber-500/10',
                'rank_text'    => 'text-amber-400',
                'rank_border'  => 'border-amber-500/40',
                'location'     => 'Fass II Thiaroye Gare, Dakar, Sénégal',
                'phone'        => '+221 77 381 85 65',
                'email'        => 'antacheikh21@gmail.com',
                'theme'        => 'dune',
                'shadow_title' => 'Élu d\'Arrakis',
                'summary'      => 'Passionné de marketing digital avec 3 ans d\'expérience en géolocalisation/télématique chez GTS Afrique. Profil polyvalent alliant compétences techniques, sens du commerce et maîtrise de l\'anglais professionnel. Prêt à s\'investir dans des projets à fort impact.',
                'skills'       => json_encode([
                    ['name' => 'Anglais professionnel',         'level' => 88, 'category' => 'Langues'],
                    ['name' => 'Bureautique (Word/Excel/PPT)',  'level' => 85, 'category' => 'Outils'],
                    ['name' => 'Technique de vente',            'level' => 82, 'category' => 'Commercial'],
                    ['name' => 'Marketing Digital',             'level' => 80, 'category' => 'Marketing'],
                    ['name' => 'Géolocalisation / Télématique', 'level' => 78, 'category' => 'Technique'],
                    ['name' => 'Gestion de plateforme',         'level' => 72, 'category' => 'Technique'],
                ]),
                'experience'   => json_encode([
                    ['period' => 'Déc 2024 — Fév 2026', 'company' => 'GTS Afrique', 'title' => 'Responsable Technique', 'missions' => ['Gestion et supervision de la plateforme de géolocalisation et télématique.', 'Formation technique et support client sur les solutions déployées.', 'Coordination des interventions terrain et rédaction des rapports d\'activité.']],
                    ['period' => 'Avr 2023 — Déc 2024', 'company' => 'GTS Afrique', 'title' => 'Agent Technico-Commercial', 'missions' => ['Prospection et acquisition de nouveaux clients B2B pour les solutions de géolocalisation.', 'Présentation et démonstration des offres auprès des prospects.', 'Participation aux formations internes en technique de vente.']],
                    ['period' => '2021 — 2023', 'company' => 'Freelance — En ligne & Présentiel', 'title' => 'Professeur d\'anglais & Répétiteur', 'missions' => ['Cours particuliers d\'anglais en présentiel et en ligne.', 'Accompagnement personnalisé des élèves du secondaire.']],
                ]),
                'education'    => json_encode([
                    ['year' => '2024',      'school' => 'GTS Afrique',                           'degree' => 'Formation — Gestion de plateforme de géolocalisation / télématique'],
                    ['year' => '2023',      'school' => 'GTS Afrique',                           'degree' => 'Formation — Technique de vente'],
                    ['year' => '2016–2019', 'school' => 'Université Gaston Berger — Saint-Louis','degree' => 'Licence Anglais : Option Linguistique'],
                    ['year' => '2016',      'school' => 'Groupe Scolaire Gaïndé Fatma',          'degree' => 'Baccalauréat série L2'],
                ]),
                'languages'    => json_encode([
                    ['name' => 'Wolof',    'level' => 'Langue maternelle', 'percent' => 100],
                    ['name' => 'Français', 'level' => 'Avancé',            'percent' => 90],
                    ['name' => 'Anglais',  'level' => 'Avancé',            'percent' => 85],
                ]),
                'soft_skills'  => json_encode(['Communication', 'Esprit commercial', 'Adaptabilité', 'Persévérance']),
                'interests'    => json_encode(['Marketing Digital', 'Vente & Commerce', 'Développement personnel']),
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'slug'         => 'babacar-ndiaye',
                'name'         => 'Babacar Ndiaye',
                'role'         => 'Admin. Systèmes & Réseaux Junior',
                'rank'         => 'A',
                'initials'     => 'BN',
                'gradient'     => 'from-[#041E42] via-[#071a38] to-[#000000]',
                'rank_bg'      => 'bg-yellow-400/10',
                'rank_text'    => 'text-yellow-400',
                'rank_border'  => 'border-yellow-400/40',
                'location'     => 'HLM Grand Yoff, Dakar, Sénégal',
                'phone'        => '+221 77 27 27 560',
                'email'        => 'babacar.ndiaye_218090@groupeiam.com',
                'theme'        => 'real-madrid',
                'shadow_title' => 'Galáctico de la Guilde',
                'summary'      => 'Administrateur Réseaux & Systèmes Junior diplômé de l\'IAM. Maîtrise Windows Server, Linux et la virtualisation (Hyper-V). Expert en infrastructure réseau (VLAN, VPN, WAN). Disponible immédiatement.',
                'skills'       => json_encode([
                    ['name' => 'Windows Server (AD, GPO, DNS, DHCP)', 'level' => 88, 'category' => 'Systèmes'],
                    ['name' => 'Linux CLI / Shell scripting',          'level' => 75, 'category' => 'Systèmes'],
                    ['name' => 'Réseau LAN/WAN — Cisco',               'level' => 82, 'category' => 'Réseau'],
                    ['name' => 'TCP/IP, DNS, DHCP, VPN, VLAN',         'level' => 85, 'category' => 'Protocoles'],
                    ['name' => 'Hyper-V / VMware Workstation',         'level' => 78, 'category' => 'Virtua.'],
                    ['name' => 'Cybersécurité / ACL / Pare-feu',       'level' => 70, 'category' => 'Sécurité'],
                    ['name' => 'MS Office (Excel, Outlook, Word)',      'level' => 92, 'category' => 'Outils'],
                ]),
                'experience'   => json_encode([
                    ['period' => 'Sept — Oct 2025', 'company' => 'FASTEF — UCAD, Dakar', 'title' => 'Assistant Administratif & Data Manager', 'missions' => ['Gestion et sécurisation des flux d\'information et des bases de données étudiantes.', 'Traitement rigoureux des dossiers (conformité) et archivage physique/numérique.', 'Utilisation intensive d\'Outlook et Excel pour le reporting et la correspondance.']],
                    ['period' => '2024', 'company' => 'SYSROAD — IT Services, Dakar', 'title' => 'Stagiaire Support Technique & Réseau', 'missions' => ['Installation et configuration de postes de travail connectés au domaine Windows.', 'Support technique Niveau 1 & 2 pour les clients corporate.', 'Administration serveur de base et vérification des sauvegardes.', 'Rédaction de rapports d\'intervention et mise à jour des procédures.']],
                    ['period' => '2023', 'company' => 'Hôpital FANN — Service Informatique, Dakar', 'title' => 'Stagiaire Help Desk Agent', 'missions' => ['Maintenance préventive et corrective du matériel IT en environnement critique (24h/24).', 'Support au personnel médical et administratif : incidents réseau et logiciels.', 'Suivi des tickets d\'incidents et reporting à la Direction Informatique.']],
                ]),
                'education'    => json_encode([
                    ['year' => '2022–2023', 'school' => 'Institut Africain de Management (IAM) — Dakar', 'degree' => 'Master 1 Informatique — Réseaux, Systèmes & Cloud (en cours)'],
                    ['year' => '2019–2022', 'school' => 'Institut Africain de Management (IAM) — Dakar', 'degree' => 'Licence Pro. Gestion Informatique — Option Systèmes & Réseaux'],
                ]),
                'languages'    => json_encode([
                    ['name' => 'Français', 'level' => 'Natif / Courant',  'percent' => 100],
                    ['name' => 'Anglais',  'level' => 'Technique & Pro.', 'percent' => 75],
                    ['name' => 'Wolof',    'level' => 'Langue maternelle','percent' => 100],
                ]),
                'soft_skills'  => json_encode(['Rigueur', 'Organisation', 'Gestion du stress', 'Esprit analytique', 'Discrétion']),
                'interests'    => json_encode(['Veille techno. (Réseaux & IA)', 'Création de contenu digital', 'Cloud Computing']),
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
        ]);

        // Site config
        Site::create([
            'header'              => ['logoName' => 'KoriLab', 'tagline' => 'Creative Studio', 'ctaText' => 'Démarrer un projet'],
            'hero'                => ['badge' => 'Système Activé — Studio Créatif', 'titleStart' => 'Nous forjons des', 'titleHighlight' => 'expériences', 'titleEnd' => 'légendaires', 'subtitle' => 'Design, développement et stratégie — nous franchissons les portes de la médiocrité pour construire des produits digitaux de rang S.', 'cta1' => 'Voir nos quêtes', 'cta2' => "Rejoindre l'aventure"],
            'heroStats'           => [['value' => '10+', 'label' => 'Projets livrés'], ['value' => '98%', 'label' => 'Clients satisfaits'], ['value' => 'S-Rank', 'label' => 'Qualité'], ['value' => '5 ans', 'label' => 'Expertise']],
            'contactInfo'         => [['icon' => 'Mail', 'label' => 'Email', 'value' => 'contact@korilab.dev'], ['icon' => 'Phone', 'label' => 'Téléphone', 'value' => '+221 77 534 19 54'], ['icon' => 'MapPin', 'label' => 'Adresse', 'value' => 'Dakar, Sénégal'], ['icon' => 'Clock', 'label' => 'Disponibilité', 'value' => 'Lun — Ven, 9h — 18h']],
            'availabilityMessage' => 'Disponible pour de nouveaux projets',
            'availabilitySlots'   => '2 créneaux disponibles ce mois-ci',
        ]);
    }
}
