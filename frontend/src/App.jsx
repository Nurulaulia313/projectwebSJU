import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import DataBarang from "./pages/DataBarang";
import Supplier from "./pages/Supplier";
import BarangMasuk from "./pages/BarangMasuk";
import BarangKeluar from "./pages/BarangKeluar";
import KasirPenjualan from "./pages/Kasir";
import ReturnBarang from "./pages/ReturnBarang";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/data-barang" element={<DataBarang />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/barang-masuk" element={<BarangMasuk />} />
        <Route path="/barang-keluar" element={<BarangKeluar />} />
        <Route path="/kasir" element={<KasirPenjualan />} />
        <Route path="/return-barang" element={<ReturnBarang />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
