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
}
