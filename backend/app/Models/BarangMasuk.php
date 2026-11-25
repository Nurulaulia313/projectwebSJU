<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BarangMasuk extends Model
{
    protected $table = 'barang_masuks';

    protected $fillable = [
        'tanggal',
        'kodeBarang',
        'namaBarang',
        'supplier',
        'jumlah',
        'hargaBeli',
        'buktiNota',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'jumlah' => 'integer',
        'hargaBeli' => 'decimal:2',
    ];
}