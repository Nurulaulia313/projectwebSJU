<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BarangKeluarController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Barang Keluar berhasil terhubung'
        ]);
    }

    public function store(Request $request)
    {
        return response()->json([
            'message' => 'Store Barang Keluar berhasil terhubung'
        ], 201);
    }

    public function show($id)
    {
        return response()->json([
            'message' => 'Show Barang Keluar berhasil terhubung',
            'id' => $id
        ]);
    }

    public function update(Request $request, $id)
    {
        return response()->json([
            'message' => 'Update Barang Keluar berhasil terhubung',
            'id' => $id
        ]);
    }

    public function destroy($id)
    {
        return response()->json([
            'message' => 'Delete Barang Keluar berhasil terhubung',
            'id' => $id
        ]);
    }
}