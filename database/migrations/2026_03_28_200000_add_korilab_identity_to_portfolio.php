<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Évite les doublons si la migration est rejouée
        if (DB::table('portfolio')->where('title', 'KoriLab Identity')->exists()) {
            return;
        }

        DB::table('portfolio')->insert([
            'title'      => 'KoriLab Identity',
            'desc'       => "Création de l'identité visuelle complète du studio — logo cauri, charte graphique, design system.",
            'category'   => 'Branding',
            'tags'       => json_encode(['Logo', 'Charte', 'Design System']),
            'emoji'      => '🐚',
            'gradient'   => 'from-sky-900 to-indigo-950',
            'image'      => '/images/korilab.jpg',
            'images'     => null,
            'link'       => 'https://korilab.dev',
            'comingSoon' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        DB::table('portfolio')->where('title', 'KoriLab Identity')->delete();
    }
};
