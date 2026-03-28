<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $site = DB::table('site')->first();
        if (!$site) return;

        // heroStats — 120+/20+ → 10+, 8 ans → 5 ans
        $heroStats = json_decode($site->heroStats ?? '[]', true);
        if (is_array($heroStats)) {
            foreach ($heroStats as &$stat) {
                if (isset($stat['value']) && in_array($stat['value'], ['120+', '20+'])) {
                    $stat['value'] = '10+';
                }
                if (isset($stat['value']) && $stat['value'] === '8 ans') {
                    $stat['value'] = '5 ans';
                }
            }
            DB::table('site')->where('id', $site->id)->update([
                'heroStats' => json_encode($heroStats),
            ]);
        }

        // header — Dualcore → KoriLab
        $header = json_decode($site->header ?? '{}', true);
        if (is_array($header) && ($header['logoName'] ?? '') === 'Dualcore') {
            $header['logoName'] = 'KoriLab';
            DB::table('site')->where('id', $site->id)->update([
                'header' => json_encode($header),
            ]);
        }

        // contactInfo — hello@dualcore.studio → contact@korilab.dev
        $contactInfo = json_decode($site->contactInfo ?? '[]', true);
        if (is_array($contactInfo)) {
            foreach ($contactInfo as &$contact) {
                if (($contact['value'] ?? '') === 'hello@dualcore.studio') {
                    $contact['value'] = 'contact@korilab.dev';
                }
            }
            DB::table('site')->where('id', $site->id)->update([
                'contactInfo' => json_encode($contactInfo),
            ]);
        }
    }

    public function down(): void {}
};
