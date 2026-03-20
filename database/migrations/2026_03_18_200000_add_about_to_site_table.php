<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site', function (Blueprint $table) {
            if (!Schema::hasColumn('site', 'about')) {
                $table->json('about')->nullable()->after('heroStats');
            }
        });
    }

    public function down(): void
    {
        Schema::table('site', function (Blueprint $table) {
            $table->dropColumn('about');
        });
    }
};
