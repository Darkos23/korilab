<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('portfolio')->insert([
            'title'       => 'FASTEF — Gestion des Stocks',
            'desc'        => 'Application desktop de gestion de stock pour la FASTEF — suivi des articles, commandes, entrées/sorties, fournisseurs et rapports PDF au Doyen.',
            'category'    => 'Desktop',
            'tags'        => json_encode(['C#', 'WPF', 'SQLite', 'Desktop']),
            'emoji'       => '🖥️',
            'gradient'    => 'from-slate-700 to-slate-900',
            'image'       => '/portfolio/fastef/fastef-dashboard.png',
            'images'      => json_encode([
                '/portfolio/fastef/fastef-dashboard.png',
                '/portfolio/fastef/fastef-articles.png',
                '/portfolio/fastef/fastef-fournisseurs.png',
                '/portfolio/fastef/fastef-rapport.png',
            ]),
            'link'        => null,
            'comingSoon'  => false,
            'created_at'  => now(),
            'updated_at'  => now(),
        ]);
    }

    public function down(): void
    {
        DB::table('portfolio')->where('title', 'FASTEF — Gestion des Stocks')->delete();
    }
};
