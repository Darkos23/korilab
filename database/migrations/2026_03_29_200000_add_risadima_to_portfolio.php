<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (DB::table('portfolio')->where('title', 'RISADIMA')->exists()) {
            return;
        }

        DB::table('portfolio')->insert([
            'title'      => 'RISADIMA',
            'desc'       => "Plateforme de revue scientifique pour l'Association de Didactique des Mathématiques d'Afrique — soumission, peer review, publication open access.",
            'category'   => 'Web',
            'tags'       => json_encode(['Laravel', 'React', 'EdTech', 'Open Access']),
            'emoji'      => '📐',
            'gradient'   => 'from-slate-900 to-blue-950',
            'image'      => '/portfolio/risadima.jpeg',
            'images'     => null,
            'link'       => null,
            'comingSoon' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        DB::table('portfolio')->where('title', 'RISADIMA')->delete();
    }
};
