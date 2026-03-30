<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (DB::table('portfolio')->where('title', 'FeugDiay Identity')->exists()) {
            return;
        }

        DB::table('portfolio')->insert([
            'title'      => 'FeugDiay Identity',
            'desc'       => "Identité visuelle complète pour la friperie numérique — logo, charte graphique, palette couleurs, typographie, guidelines.",
            'category'   => 'Branding',
            'tags'       => json_encode(['Logo', 'Charte', 'Design System']),
            'emoji'      => '🎨',
            'gradient'   => 'from-orange-700 to-amber-600',
            'image'      => null,
            'images'     => null,
            'link'       => '/portfolio/feugdiay/',
            'comingSoon' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        DB::table('portfolio')->where('title', 'FeugDiay Identity')->delete();
    }
};
