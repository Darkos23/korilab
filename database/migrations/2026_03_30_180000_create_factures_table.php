<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('factures', function (Blueprint $table) {
            $table->id();
            $table->string('numero');
            $table->string('client_name');
            $table->string('client_email')->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('amount');
            $table->string('status')->default('en_attente');
            $table->date('issued_date');
            $table->date('due_date')->nullable();
            $table->unsignedBigInteger('project_id')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('factures');
    }
};
