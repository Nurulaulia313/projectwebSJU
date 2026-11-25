<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Barang;

class BarangKeluar extends Model
{
    protected $table = 'barang_keluars';

    protected $fillable = [
        'tanggal',
        'barang_id',
        'kode_barang',
        'nama_barang',
        'jumlah',
        'stok_sebelum',
        'stok_sesudah',
        'keterangan',
    ];

    public function barang()
    {
        return $this->belongsTo(
            Barang::class,
            'barang_id'
        );
    }
}