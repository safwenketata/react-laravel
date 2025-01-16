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
        Schema::create('livres', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->integer('annedition');
            $table->decimal('prix', 8, 2);
            $table->integer('qtestock');
            $table->string('couverture');
            $table->foreignId('specialite_id')->constrained('specialites')->onDelete('cascade');
            $table->foreignId('maised_id')->constrained('editeurs')->onDelete('cascade');
            $table->foreignId('auteur_id')->constrained('auteurs')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livres');
    }
};
