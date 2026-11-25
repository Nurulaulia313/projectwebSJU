<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    // Menampilkan semua supplier
    public function index()
    {
        $suppliers = Supplier::latest()->get();

        return response()->json($suppliers);
    }

    // Menyimpan supplier baru
    public function store(Request $request)
    {
        $request->validate([
            'nama_supplier' => 'required|string|max:255',
            'kontak' => 'nullable|string|max:50',
            'alamat' => 'nullable|string',
            'jatuh_tempo' => 'nullable|date',
        ]);

        $supplier = Supplier::create([
            'nama_supplier' => $request->nama_supplier,
            'kontak' => $request->kontak,
            'alamat' => $request->alamat,
            'jatuh_tempo' => $request->jatuh_tempo,
        ]);

        return response()->json([
            'message' => 'Supplier berhasil ditambahkan.',
            'data' => $supplier
        ], 201);
    }

    // Menampilkan satu supplier
    public function show($id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return response()->json([
                'message' => 'Supplier tidak ditemukan.'
            ], 404);
        }

        return response()->json($supplier);
    }

    // Mengubah supplier
    public function update(Request $request, $id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return response()->json([
                'message' => 'Supplier tidak ditemukan.'
            ], 404);
        }

        $request->validate([
            'nama_supplier' => 'required|string|max:255',
            'kontak' => 'nullable|string|max:50',
            'alamat' => 'nullable|string',
            'jatuh_tempo' => 'nullable|date',
        ]);

        $supplier->update([
            'nama_supplier' => $request->nama_supplier,
            'kontak' => $request->kontak,
            'alamat' => $request->alamat,
            'jatuh_tempo' => $request->jatuh_tempo,
        ]);

        return response()->json([
            'message' => 'Supplier berhasil diperbarui.',
            'data' => $supplier
        ]);
    }

    // Menghapus supplier
    public function destroy($id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return response()->json([
                'message' => 'Supplier tidak ditemukan.'
            ], 404);
        }

        $supplier->delete();

        return response()->json([
            'message' => 'Supplier berhasil dihapus.'
        ]);
    }
}