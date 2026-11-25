
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import logoSejuta from "../assets/logo-sejuta.png";
import logoMotor from "../assets/logo-motor.png";
import logoBengkel from "../assets/logo-bengkel.png";

import "./Kasir.css";

const initialTransactions = [
];

const formatRupiah = (angka) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(angka) || 0);

const formatTanggal = (tanggal) => {
  if (!tanggal) return "-";

  return new Date(`${tanggal}T00:00:00`).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const tanggalHariIni = () => {
  const today = new Date();

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
};

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    dashboard: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    box: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="M3 8v8l9 5 9-5V8" />
        <path d="M12 13v8" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    masuk: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),
    keluar: (
      <>
        <path d="M12 21V9" />
        <path d="m7 14 5-5 5 5" />
        <path d="M5 3h14" />
      </>
    ),
    cart: (
      <>
        <circle cx="9" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2 3h2l2.5 12h12l3-9H5" />
        <path d="M7 15h12" />
      </>
    ),
    return: (
      <>
        <path d="M9 14 4 9l5-5" />
        <path d="M4 9h10a6 6 0 0 1 0 12h-2" />
      </>
    ),
    transaksi: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    laporan: (
      <>
        <path d="M4 3h16v18H4z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a8 8 0 0 0 0-6l1.4-1.1-1.4-2.4-1.7.6a8 8 0 0 0-1.5-.9L16 3h-4l-.3 2.2a8 8 0 0 0-1.5.9l-1.7-.6-1.4 2.4L8.5 9a8 8 0 0 0 0 6l-1.4 1.1 1.4 2.4 1.7-.6a8 8 0 0 0 1.5.9L12 21h4l.3-2.2a8 8 0 0 0 1.5-.9l1.7.6 1.4-2.4L19.4 15Z" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    edit: (
      <>
        <path d="m15 5 4 4" />
        <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15" />
        <path d="M10 11v6M14 11v6" />
      </>
    ),
    close: <path d="m18 6-12 12M6 6l12 12" />,
    chevronLeft: <path d="m15 18-6-6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
  };

  return <svg {...common}>{icons[name]}</svg>;
}

function KasirPenjualan() {
  const [transactions, setTransactions] = useState(initialTransactions);

  // INPUT FILTER
  const [kodeTransaksi, setKodeTransaksi] = useState("");
  const [tanggalDari, setTanggalDari] = useState("");
  const [tanggalSampai, setTanggalSampai] = useState("");
  const [search, setSearch] = useState("");

  // FILTER YANG SUDAH DITERAPKAN
  const [filterAktif, setFilterAktif] = useState({
    kodeTransaksi: "",
    tanggalDari: "",
    tanggalSampai: "",
    search: "",
  });

  const [jumlahTampil, setJumlahTampil] = useState(5);
  const [halaman, setHalaman] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Data contoh. Nantinya daftar ini diganti dengan data dari API Data Barang.
  // kode, nama, stok, dan harga harus mengikuti data barang di database.
  // Data barang akan diambil dari database melalui API.
const daftarBarang = [];

  const [pencarianBarang, setPencarianBarang] = useState("");
  const [hasilPencarianTerbuka, setHasilPencarianTerbuka] = useState(false);
  const hasilPencarianBarang = daftarBarang.filter((barang) => {
    const keyword = pencarianBarang.trim().toLowerCase();
    return keyword && (
      barang.kode.toLowerCase().includes(keyword) ||
      barang.nama.toLowerCase().includes(keyword)
    );
  });

  const formAwal = {
    tanggal: tanggalHariIni(),
    pelanggan: "Pelanggan Umum",
    detailBarang: [],
    ongkosKerja: 0,
    uangDibayar: 0,
  };

  const [form, setForm] = useState(formAwal);
  const [jenisPelanggan, setJenisPelanggan] = useState("umum");

  const subtotal = (form.detailBarang || []).reduce(
    (sum, item) => sum + Number(item.jumlah || 0) * Number(item.hargaJual || 0),
    0
  );
  const total = subtotal + Number(form.ongkosKerja || 0);
  const kembalian = Number(form.uangDibayar || 0) - total;

  // FILTER DATA TRANSAKSI
  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const keywordKode = filterAktif.kodeTransaksi.toLowerCase();
      const keywordSearch = filterAktif.search.toLowerCase();

      const cocokKode = item.noTransaksi
        .toLowerCase()
        .includes(keywordKode);

      const cocokSearch =
        item.noTransaksi.toLowerCase().includes(keywordSearch) ||
        item.pelanggan.toLowerCase().includes(keywordSearch) ||
        item.namaBarang.toLowerCase().includes(keywordSearch);

      const cocokDari =
        !filterAktif.tanggalDari ||
        item.tanggal >= filterAktif.tanggalDari;

      const cocokSampai =
        !filterAktif.tanggalSampai ||
        item.tanggal <= filterAktif.tanggalSampai;

      return cocokKode && cocokSearch && cocokDari && cocokSampai;
    });
  }, [transactions, filterAktif]);

  // PAGINATION
  const totalHalaman = Math.max(
    1,
    Math.ceil(filteredTransactions.length / jumlahTampil)
  );

  const dataHalaman = filteredTransactions.slice(
    (halaman - 1) * jumlahTampil,
    halaman * jumlahTampil
  );

  const mulaiData =
    filteredTransactions.length === 0
      ? 0
      : (halaman - 1) * jumlahTampil + 1;

  const akhirData = Math.min(
    halaman * jumlahTampil,
    filteredTransactions.length
  );

  // MEMBUAT NOMOR TRANSAKSI OTOMATIS
  const buatNomorTransaksi = () => {
    const nomorTerbesar = transactions.reduce((max, item) => {
      const nomor = Number(item.noTransaksi.replace("TRS", "")) || 0;
      return Math.max(max, nomor);
    }, 0);

    return `TRS${String(nomorTerbesar + 1).padStart(3, "0")}`;
  };

  // MENAMPILKAN FILTER
  const tampilkanTransaksi = () => {
    if (
      tanggalDari &&
      tanggalSampai &&
      tanggalDari > tanggalSampai
    ) {
      alert("Tanggal awal tidak boleh melebihi tanggal akhir.");
      return;
    }

    setFilterAktif({
      kodeTransaksi: kodeTransaksi.trim(),
      tanggalDari,
      tanggalSampai,
      search: search.trim(),
    });

    setHalaman(1);
  };

  // RESET FILTER
  const resetFilter = () => {
    setKodeTransaksi("");
    setTanggalDari("");
    setTanggalSampai("");
    setSearch("");

    setFilterAktif({
      kodeTransaksi: "",
      tanggalDari: "",
      tanggalSampai: "",
      search: "",
    });

    setHalaman(1);
  };

  // MODAL TAMBAH
  const bukaTambah = () => {
    setModeEdit(false);
    setSelectedId(null);
    setForm({ ...formAwal, detailBarang: [] });
    setPencarianBarang("");
    setHasilPencarianTerbuka(false);
    setJenisPelanggan("umum");
    setModalDetail(false);
    setModalOpen(true);
  };

  // MODAL EDIT
  const bukaEdit = (item) => {
    setModeEdit(true);
    setSelectedId(item.id);

    setJenisPelanggan(item.pelanggan === "Pelanggan Umum" ? "umum" : "input");
    setForm({
      tanggal: item.tanggal,
      pelanggan: item.pelanggan,
      detailBarang: (item.detailBarang || [{ namaBarang: item.namaBarang, jumlah: item.jumlah, hargaJual: item.hargaJual }]).map((barang) => ({
        ...barang,
        kodeBarang: barang.kodeBarang || daftarBarang.find((produk) => produk.nama === barang.namaBarang)?.kode || "",
      })),
      ongkosKerja: item.ongkosKerja,
      uangDibayar: (item.detailBarang || [{ jumlah: item.jumlah, hargaJual: item.hargaJual }]).reduce((sum, barang) => sum + Number(barang.jumlah) * Number(barang.hargaJual), 0) + item.ongkosKerja,
    });

    setModalDetail(false);
    setModalOpen(true);
  };

  // MODAL DETAIL
  const bukaDetail = (item) => {
    setSelectedId(item.id);

    setJenisPelanggan(item.pelanggan === "Pelanggan Umum" ? "umum" : "input");
    setForm({
      tanggal: item.tanggal,
      pelanggan: item.pelanggan,
      detailBarang: (item.detailBarang || [{ namaBarang: item.namaBarang, jumlah: item.jumlah, hargaJual: item.hargaJual }]).map((barang) => ({
        ...barang,
        kodeBarang: barang.kodeBarang || daftarBarang.find((produk) => produk.nama === barang.namaBarang)?.kode || "",
      })),
      ongkosKerja: item.ongkosKerja,
      uangDibayar: (item.detailBarang || [{ jumlah: item.jumlah, hargaJual: item.hargaJual }]).reduce((sum, barang) => sum + Number(barang.jumlah) * Number(barang.hargaJual), 0) + item.ongkosKerja,
    });

    setModalDetail(true);
    setModalOpen(true);
  };

  const tutupModal = () => {
    setModalOpen(false);
    setModalDetail(false);
    setSelectedId(null);
  };

  // INPUT FORM
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const tambahBarangKeTransaksi = (barang) => {
    if (barang.stok <= 0) {
      alert("Stok barang sedang kosong.");
      return;
    }

    setForm((prev) => {
      const sudahAda = prev.detailBarang.findIndex((item) => item.kodeBarang === barang.kode);
      if (sudahAda >= 0) {
        const detailBaru = [...prev.detailBarang];
        const jumlahBaru = Number(detailBaru[sudahAda].jumlah || 0) + 1;
        if (jumlahBaru > barang.stok) {
          alert(`Stok ${barang.nama} hanya tersedia ${barang.stok}.`);
          return prev;
        }
        detailBaru[sudahAda] = { ...detailBaru[sudahAda], jumlah: jumlahBaru };
        return { ...prev, detailBarang: detailBaru };
      }

      return {
        ...prev,
        detailBarang: [...prev.detailBarang, {
          kodeBarang: barang.kode,
          namaBarang: barang.nama,
          jumlah: 1,
          hargaJual: barang.harga,
          stok: barang.stok,
        }],
      };
    });
    setPencarianBarang("");
    setHasilPencarianTerbuka(false);
  };

  const ubahJumlahBarang = (index, value) => {
    const jumlah = Math.max(1, Number(value) || 1);
    const item = form.detailBarang[index];
    const produk = daftarBarang.find((barang) => barang.kode === item.kodeBarang);
    if (produk && jumlah > produk.stok) {
      alert(`Stok ${produk.nama} hanya tersedia ${produk.stok}.`);
      return;
    }
    setForm((prev) => ({
      ...prev,
      detailBarang: prev.detailBarang.map((barang, i) =>
        i === index ? { ...barang, jumlah } : barang
      ),
    }));
  };

  const hapusBarisBarang = (index) => {
    setForm((prev) => ({
      ...prev,
      detailBarang: prev.detailBarang.filter((_, i) => i !== index),
    }));
  };

  // SIMPAN TRANSAKSI
  const simpanTransaksi = (e) => {
    e.preventDefault();

    if (
      !form.tanggal ||
      !form.pelanggan.trim() ||
      !form.detailBarang.length ||
      form.detailBarang.some((item) => !item.namaBarang || Number(item.jumlah) < 1) ||
      Number(form.ongkosKerja) < 0 ||
      Number(form.uangDibayar) < total
    ) {
      alert("Lengkapi tanggal, pelanggan, barang, jumlah, dan pastikan uang dibayar minimal sama dengan total.");
      return;
    }

    const dataBaru = {
      tanggal: form.tanggal,
      pelanggan: form.pelanggan.trim(),
      namaBarang: form.detailBarang.map((item) => item.namaBarang).join(", "),
      jumlah: form.detailBarang.reduce((sum, item) => sum + Number(item.jumlah), 0),
      hargaJual: subtotal,
      ongkosKerja: Number(form.ongkosKerja) || 0,
      detailBarang: form.detailBarang,
    };

    if (modeEdit) {
      setTransactions((prev) =>
        prev.map((item) =>
          item.id === selectedId ? { ...item, ...dataBaru } : item
        )
      );

      alert("Transaksi berhasil diperbarui.");
    } else {
      const transaksiBaru = {
        id: Date.now(),
        noTransaksi: buatNomorTransaksi(),
        ...dataBaru,
      };

      setTransactions((prev) => [...prev, transaksiBaru]);

      alert("Transaksi berhasil ditambahkan.");
    }

    tutupModal();
  };

  // HAPUS TRANSAKSI
  const hapusTransaksi = (id) => {
    const yakin = window.confirm(
      "Apakah kamu yakin ingin menghapus transaksi ini?"
    );

    if (!yakin) return;

    setTransactions((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setHalaman(1);
  };

  const dataTerpilih = transactions.find(
    (item) => item.id === selectedId
  );

  return (
    <div className="kasir-page">
      {/* SIDEBAR */}
      <aside className="kasir-sidebar">
        <div className="kasir-brand">
          <img
            src={logoMotor}
            alt="Logo Motor Segar Jaya Utama"
          />

          <div>
            <strong>Segar Jaya Utama</strong>
            <span>Bengkel Motor</span>
          </div>
        </div>

        <div className="kasir-sidebar-line" />

        <nav className="kasir-menu">
          <Link to="/dashboard" className="kasir-menu-item">
            <Icon name="dashboard" />
            <span>Dashboard</span>
          </Link>

          <Link to="/data-barang" className="kasir-menu-item">
            <Icon name="box" />
            <span>Data Barang</span>
          </Link>

          <Link to="/supplier" className="kasir-menu-item">
            <Icon name="users" />
            <span>Supplier</span>
          </Link>

          <Link to="/barang-masuk" className="kasir-menu-item">
            <Icon name="masuk" />
            <span>Barang Masuk</span>
          </Link>

          <Link to="/barang-keluar" className="kasir-menu-item">
            <Icon name="keluar" />
            <span>Barang Keluar</span>
          </Link>

          <Link to="/kasir" className="kasir-menu-item active">
            <Icon name="cart" />
            <span>Kasir/Penjualan</span>
          </Link>

          <Link to="/return-barang" className="kasir-menu-item">
            <Icon name="return" />
            <span>Return Barang</span>
          </Link>

          <Link to="/transaksi" className="kasir-menu-item">
            <Icon name="transaksi" />
            <span>Transaksi</span>
          </Link>

          <Link to="/laporan" className="kasir-menu-item">
            <Icon name="laporan" />
            <span>Laporan</span>
          </Link>

          <Link to="/notifikasi" className="kasir-menu-item">
            <Icon name="bell" />
            <span>Notifikasi</span>
          </Link>

          <Link to="/pengaturan" className="kasir-menu-item">
            <Icon name="settings" />
            <span>Pengaturan</span>
          </Link>
        </nav>

        <div className="kasir-sidebar-decoration">
          <img src={logoBengkel} alt="Ilustrasi bengkel" />
          <strong>Motor Sehat</strong>
          <span>Perjalanan lebih lancar</span>
          <div />
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="kasir-main">
        {/* HEADER */}
        <header className="kasir-header">
          <h1>Kasir/Penjualan</h1>

          <div className="kasir-header-right">
            <button
              className="kasir-notification"
              type="button"
              title="Notifikasi"
            >
              <Icon name="bell" size={21} />
            </button>

            <div className="kasir-profile">
              <div className="kasir-profile-icon">
                <Icon name="users" size={21} />
              </div>

              <div className="kasir-profile-text">
                <strong>Admin</strong>
                <span>Segar Jaya Utama</span>
              </div>

              <span className="kasir-profile-arrow">⌄</span>
            </div>
          </div>
        </header>

        {/* ISI HALAMAN */}
        <section className="kasir-content">
          {/* PANEL FILTER */}
          <div className="kasir-filter-panel">
            <div className="kasir-filter-heading">
              <h2>
                Lakukan transaksi penjualan
                <br />
                kepada pelanggan
              </h2>
              <div />
            </div>

            <div className="kasir-filter-fields">
              <div className="kasir-field">
                <label>Kode Transaksi</label>
                <input
                  type="text"
                  placeholder="Contoh: TRS001"
                  value={kodeTransaksi}
                  onChange={(e) => setKodeTransaksi(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") tampilkanTransaksi();
                  }}
                />
              </div>

              <div className="kasir-field">
                <label>Dari Tanggal</label>
                <input
                  type="date"
                  value={tanggalDari}
                  onChange={(e) => setTanggalDari(e.target.value)}
                />
              </div>

              <div className="kasir-field">
                <label>Sampai Tanggal</label>
                <input
                  type="date"
                  value={tanggalSampai}
                  onChange={(e) => setTanggalSampai(e.target.value)}
                />
              </div>

              <div className="kasir-filter-actions">
                <button
                  type="button"
                  className="kasir-filter-button"
                  onClick={tampilkanTransaksi}
                >
                  Tampilkan
                </button>

                <button
                  type="button"
                  className="kasir-reset-button"
                  onClick={resetFilter}
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="kasir-search-row">
              <div className="kasir-search-box">
                <Icon name="search" size={22} />

                <input
                  type="text"
                  placeholder="Cari nama pelanggan atau nama barang....."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") tampilkanTransaksi();
                  }}
                />
              </div>

              <button
                className="kasir-add-button"
                type="button"
                onClick={bukaTambah}
              >
                <Icon name="plus" size={21} />
                Tambah Transaksi Kasir
              </button>
            </div>
          </div>

          {/* TABEL PENJUALAN */}
          <section className="kasir-table-panel">
            <h2>Kasir/Penjualan</h2>

            <div className="kasir-table-wrapper">
              <table className="kasir-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Tanggal</th>
                    <th>No.Transaksi</th>
                    <th>Pelanggan</th>
                    <th>Nama Barang</th>
                    <th>Jumlah</th>
                    <th>Harga Jual</th>
                    <th>Ongkos Kerja</th>
                    <th>Total</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {dataHalaman.length > 0 ? (
                    dataHalaman.map((item, index) => {
                      const totalItem = item.hargaJual + item.ongkosKerja;

                      return (
                        <tr key={item.id}>
                          <td>{mulaiData + index}</td>
                          <td>{formatTanggal(item.tanggal)}</td>
                          <td>{item.noTransaksi}</td>
                          <td>{item.pelanggan}</td>
                          <td>{item.namaBarang}</td>
                          <td>{item.jumlah}</td>
                          <td>{formatRupiah(item.jumlah ? item.hargaJual / item.jumlah : item.hargaJual)}</td>
                          <td>{formatRupiah(item.ongkosKerja)}</td>
                          <td>{formatRupiah(totalItem)}</td>

                          <td>
                            <div className="kasir-action-buttons">
                              <button
                                type="button"
                                className="kasir-action-edit"
                                onClick={() => bukaEdit(item)}
                              >
                                <Icon name="edit" size={14} />
                                Edit
                              </button>

                              <button
                                type="button"
                                className="kasir-action-delete"
                                onClick={() => hapusTransaksi(item.id)}
                              >
                                <Icon name="trash" size={14} />
                                Hapus
                              </button>

                              <button
                                type="button"
                                className="kasir-action-view"
                                onClick={() => bukaDetail(item)}
                              >
                                Lihat
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="10" className="kasir-empty">
                        Tidak ada data transaksi yang sesuai dengan pencarian.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="kasir-table-footer">
              <div className="kasir-show-data">
                <span>Tampilkan</span>

                <select
                  value={jumlahTampil}
                  onChange={(e) => {
                    setJumlahTampil(Number(e.target.value));
                    setHalaman(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>

                <span>data</span>
              </div>

              <strong className="kasir-data-info">
                Menampilkan {mulaiData} - {akhirData} dari{" "}
                {filteredTransactions.length} data
              </strong>

              <div className="kasir-pagination">
                <button
                  type="button"
                  disabled={halaman <= 1}
                  onClick={() =>
                    setHalaman((prev) => Math.max(1, prev - 1))
                  }
                  aria-label="Halaman sebelumnya"
                >
                  <Icon name="chevronLeft" />
                </button>

                <span>{halaman}</span>

                <button
                  type="button"
                  disabled={halaman >= totalHalaman}
                  onClick={() =>
                    setHalaman((prev) =>
                      Math.min(totalHalaman, prev + 1)
                    )
                  }
                  aria-label="Halaman selanjutnya"
                >
                  <Icon name="chevronRight" />
                </button>
              </div>
            </div>
          </section>
        </section>
      </main>

      {/* FOOTER FULL WIDTH */}
      <footer className="kasir-footer">
        <div className="kasir-footer-left">
          <img
            src={logoSejuta}
            alt="Logo Segar Jaya Utama Motor"
          />
        </div>

        <div className="kasir-footer-center">
          <img src={logoMotor} alt="Logo Motor" />
        </div>

        <div className="kasir-footer-right">
          <strong>Segar Jaya Utama</strong>
          <strong>Motor</strong>
        </div>
      </footer>

      {/* MODAL TAMBAH, EDIT, DAN DETAIL */}
      {modalOpen && (
        <div
          className="kasir-modal-overlay"
          onMouseDown={tutupModal}
        >
          <div
            className="kasir-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="kasir-modal-header">
              <h2>
                {modalDetail
                  ? "Detail Transaksi"
                  : modeEdit
                  ? "Edit Transaksi Penjualan"
                  : "Tambah Transaksi Penjualan"}
              </h2>

              <button type="button" onClick={tutupModal}>
                <Icon name="close" />
              </button>
            </div>

            {modalDetail ? (
              <div className="kasir-detail-content">
                <div className="kasir-detail-row"><span>No. Transaksi</span><strong>{dataTerpilih?.noTransaksi}</strong></div>
                <div className="kasir-detail-row"><span>Tanggal</span><strong>{formatTanggal(form.tanggal)}</strong></div>
                <div className="kasir-detail-row"><span>Pelanggan</span><strong>{form.pelanggan}</strong></div>
                {(form.detailBarang || []).map((item, index) => (
                  <div className="kasir-detail-row" key={index}><span>{item.namaBarang} × {item.jumlah}</span><strong>{formatRupiah(item.jumlah * item.hargaJual)}</strong></div>
                ))}
                <div className="kasir-detail-row"><span>Ongkos Kerja</span><strong>{formatRupiah(form.ongkosKerja)}</strong></div>
                <div className="kasir-detail-row kasir-detail-total"><span>Total Pembayaran</span><strong>{formatRupiah(total)}</strong></div>
                <button className="kasir-modal-save" type="button" onClick={tutupModal}>Tutup</button>
              </div>
            ) : (
              <form onSubmit={simpanTransaksi} className="kasir-pos-form">
                <div className="kasir-pos-top-grid">
                  <label>No.Transaksi<input value={modeEdit ? dataTerpilih?.noTransaksi || "" : buatNomorTransaksi()} readOnly /></label>
                  <label>Tanggal<input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} required /></label>
                  <label className="kasir-pos-customer">Pelanggan
                    <div className="kasir-customer-input-wrap">
                      <select
                        value={jenisPelanggan}
                        onChange={(e) => {
                          const mode = e.target.value;
                          setJenisPelanggan(mode);
                          setForm((prev) => ({
                            ...prev,
                            pelanggan: mode === "umum" ? "Pelanggan Umum" : "",
                          }));
                        }}
                      >
                        <option value="umum">Pelanggan Umum</option>
                        <option value="input">Input Nama Pelanggan</option>
                      </select>
                      {jenisPelanggan === "input" && (
                        <input
                          type="text"
                          name="pelanggan"
                          placeholder="Masukkan nama pelanggan"
                          value={form.pelanggan === "Pelanggan Umum" ? "" : form.pelanggan}
                          onChange={handleChange}
                          required
                          autoFocus
                        />
                      )}
                    </div>
                  </label>
                </div>
                <div className="kasir-pos-detail-title">Detail Barang</div>
                <div className="kasir-product-search">
                  <div className="kasir-product-search-field">
                    <Icon name="search" size={18} />
                    <input
                      type="text"
                      value={pencarianBarang}
                      placeholder="Cari berdasarkan kode produk atau nama barang..."
                      onChange={(e) => {
                        setPencarianBarang(e.target.value);
                        setHasilPencarianTerbuka(true);
                      }}
                      onFocus={() => setHasilPencarianTerbuka(true)}
                    />
                    {pencarianBarang && <button type="button" onClick={() => { setPencarianBarang(""); setHasilPencarianTerbuka(false); }}>×</button>}
                  </div>
                  {hasilPencarianTerbuka && pencarianBarang.trim() && (
                    <div className="kasir-product-results">
                      {hasilPencarianBarang.length ? hasilPencarianBarang.map((barang) => (
                        <div className="kasir-product-result" key={barang.kode}>
                          <div className="kasir-product-result-info">
                            <strong>{barang.nama}</strong>
                            <span>{barang.kode} · Stok: {barang.stok} · {formatRupiah(barang.harga)}</span>
                          </div>
                          <button type="button" aria-label={`Tambah ${barang.nama}`} onClick={() => tambahBarangKeTransaksi(barang)}><Icon name="plus" size={18} /></button>
                        </div>
                      )) : <div className="kasir-product-empty">Barang tidak ditemukan.</div>}
                    </div>
                  )}
                </div>
                <div className="kasir-pos-table-wrap">
                  <table className="kasir-pos-table">
                    <thead><tr><th>No</th><th>Kode Produk</th><th>Nama Barang</th><th>Jumlah</th><th>Harga Jual (Rp)</th><th>Subtotal (Rp)</th><th>Aksi</th></tr></thead>
                    <tbody>
                      {form.detailBarang.length ? form.detailBarang.map((item, index) => (
                        <tr key={`${item.kodeBarang}-${index}`}>
                          <td>{index + 1}</td>
                          <td>{item.kodeBarang || "-"}</td>
                          <td className="kasir-product-name">{item.namaBarang}</td>
                          <td><input type="number" min="1" max={item.stok || undefined} value={item.jumlah} onChange={(e) => ubahJumlahBarang(index, e.target.value)} /></td>
                          <td>{formatRupiah(item.hargaJual)}</td>
                          <td>{formatRupiah(Number(item.jumlah) * Number(item.hargaJual))}</td>
                          <td><button type="button" className="kasir-pos-delete" onClick={() => hapusBarisBarang(index)}><Icon name="trash" size={15} /></button></td>
                        </tr>
                      )) : (
                        <tr><td colSpan="7" className="kasir-product-empty-row">Belum ada barang. Cari kode produk atau nama barang, lalu tekan tombol (+).</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="kasir-pos-add-row"><small>Barang dipilih dari Data Barang. Harga dan stok terisi otomatis.</small></div>
                <div className="kasir-pos-bottom">
                  <label>Ongkos Kerja (Rp)<input type="number" min="0" name="ongkosKerja" value={form.ongkosKerja} onChange={handleChange} /></label>
                  <div className="kasir-pos-summary">
                    <div><span>Subtotal Barang</span><strong>{formatRupiah(subtotal)}</strong></div>
                    <div><span>Ongkos Kerja</span><strong>{formatRupiah(form.ongkosKerja)}</strong></div>
                    <div className="kasir-pos-total"><span>Total</span><strong>{formatRupiah(total)}</strong></div>
                    <label>Uang Dibayar (Rp)<input type="number" min={total} name="uangDibayar" value={form.uangDibayar} onChange={handleChange} /></label>
                    <div className="kasir-pos-change"><span>Kembalian</span><strong>{formatRupiah(Math.max(0, kembalian))}</strong></div>
                  </div>
                </div>
                <div className="kasir-modal-actions"><button type="button" className="kasir-modal-cancel" onClick={tutupModal}>Batal</button><button type="submit" className="kasir-modal-save">{modeEdit ? "Simpan Perubahan" : "Simpan"}</button></div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default KasirPenjualan;
