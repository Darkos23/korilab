<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('site', function (Blueprint $table) {
            $table->id();
            $table->json('header')->nullable();
            $table->json('hero')->nullable();
            $table->json('heroStats')->nullable();
            $table->json('footer')->nullable();
            $table->json('contactInfo')->nullable();
            $table->string('availabilityMessage')->nullable();
            $table->string('availabilitySlots')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site');
    }
};
