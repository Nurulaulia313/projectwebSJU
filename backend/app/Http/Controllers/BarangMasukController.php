<?php

namespace App\Http\Controllers;

use App\Models\BarangMasuk;
use Illuminate\Http\Request;

class BarangMasukController extends Controller
{
    // =====================================================
    // GET SEMUA BARANG MASUK
    // =====================================================

    public function index()
    {
        $barangMasuks = BarangMasuk::orderBy(
            'tanggal',
            'desc'
        )->get();

        return response()->json(
            $barangMasuks
        );
    }


    // =====================================================
    // TAMBAH BARANG MASUK
    // =====================================================

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',

            'kodeBarang' => 'required|string|max:255',

            'namaBarang' => 'required|string|max:255',

            'supplier' => 'required|string|max:255',

            'jumlah' => 'required|integer|min:1',

            'hargaBeli' => 'required|numeric|min:0',

            'buktiNota' => 'nullable|string',
        ]);


        $barangMasuk = BarangMasuk::create(
            $validated
        );


        return response()->json([
            'message' =>
                'Barang masuk berhasil ditambahkan',

            'data' =>
                $barangMasuk,
        ], 201);
    }


    // =====================================================
    // GET BARANG MASUK BERDASARKAN ID
    // =====================================================

    public function show($id)
    {
        $barangMasuk =
            BarangMasuk::find($id);


        if (!$barangMasuk) {

            return response()->json([
                'message' =>
                    'Data barang masuk tidak ditemukan',
            ], 404);

        }


        return response()->json(
            $barangMasuk
        );
    }


    // =====================================================
    // UPDATE BARANG MASUK
    // =====================================================

    public function update(
        Request $request,
        $id
    ) {

        $barangMasuk =
            BarangMasuk::find($id);


        if (!$barangMasuk) {

            return response()->json([
                'message' =>
                    'Data barang masuk tidak ditemukan',
            ], 404);

        }


        $validated = $request->validate([
            'tanggal' => 'required|date',

            'kodeBarang' => 'required|string|max:255',

            'namaBarang' => 'required|string|max:255',

            'supplier' => 'required|string|max:255',

            'jumlah' => 'required|integer|min:1',

            'hargaBeli' => 'required|numeric|min:0',

            'buktiNota' => 'nullable|string',
        ]);


        $barangMasuk->update(
            $validated
        );


        return response()->json([
            'message' =>
                'Barang masuk berhasil diubah',

            'data' =>
                $barangMasuk,
        ]);
    }


    // =====================================================
    // HAPUS BARANG MASUK
    // =====================================================

    public function destroy($id)
    {
        $barangMasuk =
            BarangMasuk::find($id);


        if (!$barangMasuk) {

            return response()->json([
                'message' =>
                    'Data barang masuk tidak ditemukan',
            ], 404);

        }


        $barangMasuk->delete();


        return response()->json([
            'message' =>
                'Barang masuk berhasil dihapus',
        ]);
    }
}