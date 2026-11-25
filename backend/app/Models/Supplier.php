<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = [
        'nama_supplier',
        'kontak',
        'alamat',
        'jatuh_tempo',
    ];

    protected $casts = [
        'jatuh_tempo' => 'date:Y-m-d',
    ];
}