<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('role');
            $table->string('rank')->default('A');
            $table->string('initials', 4)->nullable();
            $table->string('gradient')->default('from-violet-900 to-indigo-900');
            $table->string('rank_bg')->default('bg-violet-400/10');
            $table->string('rank_text')->default('text-violet-400');
            $table->string('rank_border')->default('border-violet-400/30');
            $table->string('location')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('theme')->default('shadow');
            $table->string('shadow_title')->nullable();
            $table->text('summary')->nullable();
            $table->json('skills')->nullable();
            $table->json('experience')->nullable();
            $table->json('education')->nullable();
            $table->json('languages')->nullable();
            $table->json('soft_skills')->nullable();
            $table->json('interests')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_members');
    }
};
