<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('barang_keluars', function (Blueprint $table) {
            $table->id();

            $table->date('tanggal');

            $table->unsignedBigInteger('barang_id');

            $table->string('kode_barang');
            $table->string('nama_barang');

            $table->integer('jumlah');

            $table->string('keterangan')->nullable();

            $table->timestamps();

            $table->foreign('barang_id')
                ->references('id')
                ->on('barangs')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('barang_keluars');
    }
};