<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DemoController extends Controller
{
    private function clientData(): array
    {
        return [
            'name'         => 'Saly Immobilier',
            'tagline'      => 'Votre partenaire immobilier à Saly',
            'owner'        => 'Moussa Diallo',
            'primaryColor' => '#0d9488',
            'accentColor'  => '#f59e0b',
            'phone'        => '+221 77 123 45 67',
            'whatsapp'     => '221771234567',
            'email'        => 'contact@salyimmobilier.sn',
            'address'      => 'Saly Portudal, Mbour, Sénégal',
            'hours'        => 'Lun — Sam : 9h00 — 18h00',
            'heroTitle'    => 'Trouvez le bien de vos rêves à Saly',
            'heroSubtitle' => 'Vente, location et gestion de biens immobiliers sur la Petite Côte. Un accompagnement personnalisé du premier contact à la remise des clés.',
            'aboutTitle'   => 'Notre histoire',
            'aboutText'    => 'Depuis 2018, Saly Immobilier accompagne les particuliers et investisseurs dans leurs projets immobiliers sur la Petite Côte. Notre connaissance du marché local et notre réseau de partenaires nous permettent de vous proposer les meilleures opportunités.',
            'mission'      => 'Rendre l\'immobilier accessible et transparent pour tous, avec un service humain et professionnel.',
            'highlights'   => [
                ['title' => 'Connaissance locale', 'desc' => 'Une expertise approfondie du marché immobilier de Saly et de la Petite Côte.'],
                ['title' => 'Accompagnement complet', 'desc' => 'De la recherche à la signature, nous sommes à vos côtés à chaque étape.'],
                ['title' => 'Réseau de confiance', 'desc' => 'Des partenaires notaires, architectes et artisans vérifiés.'],
            ],
            'values' => [
                ['icon' => 'Users',  'title' => 'Proximité',    'desc' => 'Un interlocuteur dédié pour chaque client.'],
                ['icon' => 'Target', 'title' => 'Transparence', 'desc' => 'Des prix clairs, sans frais cachés.'],
                ['icon' => 'Award',  'title' => 'Fiabilité',    'desc' => 'Des biens vérifiés et des transactions sécurisées.'],
            ],
            'services' => [
                ['title' => 'Vente immobilière',     'desc' => 'Terrains, appartements et villas à vendre sur la Petite Côte. Nous sélectionnons les meilleurs biens et vérifions tous les documents fonciers.', 'image' => null],
                ['title' => 'Location saisonnière',  'desc' => 'Gestion complète de votre bien en location courte durée : annonces, accueil des locataires, ménage et maintenance.', 'image' => null],
                ['title' => 'Conseil & Estimation',  'desc' => 'Estimation gratuite de votre bien et conseils personnalisés pour optimiser votre investissement immobilier.', 'image' => null],
            ],
            'team'    => [],
            'socials' => [
                'facebook'  => 'https://facebook.com/salyimmobilier',
                'instagram' => 'https://instagram.com/salyimmobilier',
            ],
        ];
    }

    public function home()
    {
        return Inertia::render('Demo/Home', ['client' => $this->clientData()]);
    }

    public function about()
    {
        return Inertia::render('Demo/About', ['client' => $this->clientData()]);
    }

    public function services()
    {
        return Inertia::render('Demo/Services', ['client' => $this->clientData()]);
    }

    public function contact()
    {
        return Inertia::render('Demo/Contact', ['client' => $this->clientData()]);
    }

    public function mentions()
    {
        return Inertia::render('Demo/Mentions', ['client' => $this->clientData()]);
    }
}
