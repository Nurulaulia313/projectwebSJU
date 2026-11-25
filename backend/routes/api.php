<?php

use App\Http\Controllers\BarangController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\BarangMasukController;
use App\Http\Controllers\BarangKeluarController;
use Illuminate\Support\Facades\Route;


// =====================================================
// LOGIN
// =====================================================

Route::post(
    '/login',
    [AuthController::class, 'login']
);


// =====================================================
// SUPPLIER
// =====================================================

Route::get(
    '/suppliers',
    [SupplierController::class, 'index']
);

Route::post(
    '/suppliers',
    [SupplierController::class, 'store']
);

Route::get(
    '/suppliers/{id}',
    [SupplierController::class, 'show']
);

Route::put(
    '/suppliers/{id}',
    [SupplierController::class, 'update']
);

Route::delete(
    '/suppliers/{id}',
    [SupplierController::class, 'destroy']
);


// =====================================================
// BARANG
// =====================================================

Route::get(
    '/barangs',
    [BarangController::class, 'index']
);

Route::post(
    '/barangs',
    [BarangController::class, 'store']
);

Route::get(
    '/barangs/{id}',
    [BarangController::class, 'show']
);

Route::put(
    '/barangs/{id}',
    [BarangController::class, 'update']
);

Route::delete(
    '/barangs/{id}',
    [BarangController::class, 'destroy']
);


// =====================================================
// BARANG MASUK
// =====================================================

Route::get(
    '/barang-masuks',
    [BarangMasukController::class, 'index']
);

Route::post(
    '/barang-masuks',
    [BarangMasukController::class, 'store']
);

Route::get(
    '/barang-masuks/{id}',
    [BarangMasukController::class, 'show']
);

Route::put(
    '/barang-masuks/{id}',
    [BarangMasukController::class, 'update']
);

Route::delete(
    '/barang-masuks/{id}',
    [BarangMasukController::class, 'destroy']
);

// BARANG KELUAR
Route::get('/barang-keluars', [BarangKeluarController::class, 'index']);
Route::post('/barang-keluars', [BarangKeluarController::class, 'store']);
Route::get('/barang-keluars/{id}', [BarangKeluarController::class, 'show']);
Route::put('/barang-keluars/{id}', [BarangKeluarController::class, 'update']);
Route::delete('/barang-keluars/{id}', [BarangKeluarController::class, 'destroy']);