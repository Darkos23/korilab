<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Portfolio;
use App\Models\Service;
use App\Models\Site;

class HomeController extends Controller
{
    public function index()
    {
        $site = Site::first();
        $ci   = $site?->contactInfo ?? [];

        // Contact.jsx attend un array [{icon, label, value}]
        $contactInfo = [];
        if (!empty($ci['email']))    $contactInfo[] = ['icon' => 'Mail',   'label' => 'Email',        'value' => $ci['email']];
        if (!empty($ci['phone']))    $contactInfo[] = ['icon' => 'Phone',  'label' => 'Téléphone',    'value' => $ci['phone']];
        if (!empty($ci['location'])) $contactInfo[] = ['icon' => 'MapPin', 'label' => 'Localisation', 'value' => $ci['location']];

        $defaultPlans = [
            ['key' => 'starter',  'label' => 'Starter',  'price' => '35 000',  'desc' => 'Site vitrine 5 pages · 2 modif./mois'],
            ['key' => 'business', 'label' => 'Business', 'price' => '75 000',  'desc' => 'Site avancé · 6 modif./mois'],
            ['key' => 'premium',  'label' => 'Premium',  'price' => '250 000', 'desc' => 'Application sur-mesure · 12 modif./mois'],
        ];

        return Inertia::render('Home', [
            'site'                => $site,
            'hero'                => $site?->hero ?? [],
            'heroStats'           => $site?->heroStats ?? [],
            'services'            => Service::all(),
            'portfolio'           => Portfolio::all(),
            'associates'          => [],
            'contactInfo'         => $contactInfo,
            'availabilityMessage' => $site?->availabilityMessage ?? 'Disponible pour de nouveaux projets',
            'availabilitySlots'   => $site?->availabilitySlots   ?? '2 créneaux disponibles ce mois-ci',
            'dbPlans'             => $site?->plans ?? $defaultPlans,
        ]);
    }

    public function missions()
    {
        return Inertia::render('Missions', [
            'projects' => Portfolio::all(),
        ]);
    }

    public function mentions()
    {
        $site = Site::first();
        $ci   = $site?->contactInfo ?? [];
        $contactInfo = [];
        if (!empty($ci['email']))    $contactInfo[] = ['icon' => 'Mail',   'label' => 'Email',        'value' => $ci['email']];
        if (!empty($ci['phone']))    $contactInfo[] = ['icon' => 'Phone',  'label' => 'Téléphone',    'value' => $ci['phone']];
        if (!empty($ci['location'])) $contactInfo[] = ['icon' => 'MapPin', 'label' => 'Localisation', 'value' => $ci['location']];

        return Inertia::render('Legal/Mentions', [
            'site'        => $site,
            'contactInfo' => $contactInfo,
        ]);
    }

    public function privacy()
    {
        $site = Site::first();
        $ci   = $site?->contactInfo ?? [];
        $contactInfo = [];
        if (!empty($ci['email']))    $contactInfo[] = ['icon' => 'Mail',   'label' => 'Email',        'value' => $ci['email']];
        if (!empty($ci['phone']))    $contactInfo[] = ['icon' => 'Phone',  'label' => 'Téléphone',    'value' => $ci['phone']];
        if (!empty($ci['location'])) $contactInfo[] = ['icon' => 'MapPin', 'label' => 'Localisation', 'value' => $ci['location']];

        return Inertia::render('Legal/Privacy', [
            'site'        => $site,
            'contactInfo' => $contactInfo,
        ]);
    }

    public function prestige()
    {
        $site = Site::first();
        $ci   = $site?->contactInfo ?? [];
        $contactInfo = [];
        if (!empty($ci['email']))    $contactInfo[] = ['icon' => 'Mail',   'label' => 'Email',        'value' => $ci['email']];
        if (!empty($ci['phone']))    $contactInfo[] = ['icon' => 'Phone',  'label' => 'Téléphone',    'value' => $ci['phone']];
        if (!empty($ci['location'])) $contactInfo[] = ['icon' => 'MapPin', 'label' => 'Localisation', 'value' => $ci['location']];

        $defaultPlans = [
            ['key' => 'starter',  'label' => 'Starter',  'price' => '35 000',  'desc' => 'Site vitrine 5 pages · 2 modif./mois'],
            ['key' => 'business', 'label' => 'Business', 'price' => '75 000',  'desc' => 'Site avancé · 6 modif./mois'],
            ['key' => 'premium',  'label' => 'Premium',  'price' => '250 000', 'desc' => 'Application sur-mesure · 12 modif./mois'],
        ];

        return Inertia::render('Prestige', [
            'site'        => $site,
            'contactInfo' => $contactInfo,
            'dbPlans'     => $site?->plans ?? $defaultPlans,
        ]);
    }

    public function services()
    {
        return Inertia::render('Services/Index');
    }

    public function cgv()
    {
        $site = Site::first();
        $ci   = $site?->contactInfo ?? [];
        $contactInfo = [];
        if (!empty($ci['email']))    $contactInfo[] = ['icon' => 'Mail',   'label' => 'Email',        'value' => $ci['email']];
        if (!empty($ci['phone']))    $contactInfo[] = ['icon' => 'Phone',  'label' => 'Téléphone',    'value' => $ci['phone']];
        if (!empty($ci['location'])) $contactInfo[] = ['icon' => 'MapPin', 'label' => 'Localisation', 'value' => $ci['location']];

        return Inertia::render('Legal/Cgv', [
            'site'        => $site,
            'contactInfo' => $contactInfo,
        ]);
    }
}
