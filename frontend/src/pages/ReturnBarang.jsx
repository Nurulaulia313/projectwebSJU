
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ReturnBarang.css";

/* =====================================================
   ICON
===================================================== */

const Icon = ({ children, className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const HomeIcon = () => (
  <Icon><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></Icon>
);

const BoxIcon = () => (
  <Icon><path d="m12 3 9 5-9 5-9-5z" /><path d="M3 8v9l9 5 9-5V8M12 13v9" /></Icon>
);

const SupplierIcon = () => (
  <Icon><circle cx="9" cy="8" r="3" /><path d="M3 20c0-4 2-6 6-6s6 2 6 6M16 5a3 3 0 0 1 0 6M17 14c3 0 4 2 4 5" /></Icon>
);

const ArrowIcon = () => (
  <Icon><path d="M10 4H4v16h6M14 8l4 4-4 4M8 12h10" /></Icon>
);

const CartIcon = () => (
  <Icon><path d="M3 4h2l2 12h11l3-9H6" /><circle cx="10" cy="20" r="1" /><circle cx="17" cy="20" r="1" /></Icon>
);

const ReturnIcon = () => (
  <Icon><path d="M9 7 4 12l5 5" /><path d="M4 12h10c4 0 6 2 6 6" /></Icon>
);

const ReportIcon = () => (
  <Icon><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></Icon>
);

const BellIcon = () => (
  <Icon><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></Icon>
);

const GearIcon = () => (
  <Icon><circle cx="12" cy="12" r="3" /><path d="m19 13 2 1-2 4-2-1-2 1v2h-5v-2l-2-1-2 1-2-4 2-1v-2l-2-1 2-4 2 1 2-1V4h5v2l2 1 2-1 2 4-2 1z" /></Icon>
);

const UserIcon = () => (
  <Icon><circle cx="12" cy="8" r="4" /><path d="M4 21c0-5 3-8 8-8s8 3 8 8" /></Icon>
);

const SearchIcon = () => (
  <Icon className="return-search-icon"><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></Icon>
);

const FilterIcon = () => (
  <Icon><path d="M4 5h16l-6 7v6l-4 2v-8z" /></Icon>
);

/* =====================================================
   MENU SIDEBAR - MENGIKUTI BARANG MASUK
===================================================== */

const menuItems = [
  { label: "Dashboard", path: "/", icon: HomeIcon },
  { label: "Data Barang", path: "/data-barang", icon: BoxIcon },
  { label: "Supplier", path: "/supplier", icon: SupplierIcon },
  { label: "Barang Masuk", path: "/barang-masuk", icon: ArrowIcon },
  { label: "Barang Keluar", path: "/barang-keluar", icon: ArrowIcon },
  { label: "Kasir/Penjualan", path: "/kasir", icon: CartIcon },
  { label: "Return Barang", path: "/return-barang", icon: ReturnIcon },
  { label: "Transaksi", path: "/transaksi", icon: ReportIcon },
  { label: "Laporan", path: "/laporan", icon: ReportIcon },
  { label: "Notifikasi", path: "/notifikasi", icon: BellIcon },
  { label: "Pengaturan", path: "/pengaturan", icon: GearIcon },
];

const FORM_KOSONG = {
  tanggal: new Date().toISOString().slice(0, 10),
  nomorTransaksi: "",
  kodeBarang: "",
  namaBarang: "",
  jumlah: 1,
  alasan: "",
  catatan: "",
};

/* =====================================================
   COMPONENT
===================================================== */

function ReturnBarang() {
  const navigate = useNavigate();

  const [dataReturn, setDataReturn] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua Status");
  const [profileOpen, setProfileOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const [form, setForm] = useState(FORM_KOSONG);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  /* FILTER */
  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return dataReturn.filter((item) => {
      const matchSearch =
        !keyword ||
        item.nomorTransaksi.toLowerCase().includes(keyword) ||
        item.kodeBarang.toLowerCase().includes(keyword) ||
        item.namaBarang.toLowerCase().includes(keyword) ||
        item.alasan.toLowerCase().includes(keyword);

      const matchStatus =
        filterStatus === "Semua Status" ||
        item.status === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [dataReturn, search, filterStatus]);

  /* PAGINATION */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / itemsPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;

  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const firstNumber = filteredData.length === 0 ? 0 : startIndex + 1;
  const lastNumber = Math.min(
    startIndex + itemsPerPage,
    filteredData.length
  );

  /* FORMAT TANGGAL */
  const formatDate = (value) => {
    if (!value) return "-";

    return new Date(`${value}T00:00:00`).toLocaleDateString(
      "id-ID",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  };

  /* TAMBAH */
  const openAddModal = () => {
    setEditingData(null);
    setForm({
      ...FORM_KOSONG,
      tanggal: new Date().toISOString().slice(0, 10),
    });
    setShowModal(true);
  };

  /* EDIT */
  const openEditModal = (item) => {
    if (item.status !== "Menunggu Pemeriksaan") {
      alert("Data yang sudah diputuskan tidak dapat diedit.");
      return;
    }

    setEditingData(item);
    setForm({
      tanggal: item.tanggal,
      nomorTransaksi: item.nomorTransaksi,
      kodeBarang: item.kodeBarang,
      namaBarang: item.namaBarang,
      jumlah: item.jumlah,
      alasan: item.alasan,
      catatan: item.catatan || "",
    });

    setShowModal(true);
  };

  /* SIMPAN */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.nomorTransaksi.trim() ||
      !form.kodeBarang.trim() ||
      !form.namaBarang.trim() ||
      !form.alasan.trim()
    ) {
      alert("Mohon lengkapi seluruh data yang wajib diisi.");
      return;
    }

    if (Number(form.jumlah) < 1) {
      alert("Jumlah return minimal 1.");
      return;
    }

    if (editingData) {
      setDataReturn((previous) =>
        previous.map((item) =>
          item.id === editingData.id
            ? {
                ...item,
                ...form,
                jumlah: Number(form.jumlah),
              }
            : item
        )
      );
    } else {
      setDataReturn((previous) => [
        {
          id: Date.now(),
          ...form,
          jumlah: Number(form.jumlah),
          status: "Menunggu Pemeriksaan",
        },
        ...previous,
      ]);
      setCurrentPage(1);
    }

    setShowModal(false);
    setEditingData(null);
  };

  /* DETAIL */
  const openDetail = (item) => {
    setSelectedData(item);
    setShowDetail(true);
  };

  /* UBAH STATUS */
  const updateStatus = (item, status) => {
    if (item.status !== "Menunggu Pemeriksaan") return;

    setDataReturn((previous) =>
      previous.map((row) =>
        row.id === item.id ? { ...row, status } : row
      )
    );

    setSelectedData((previous) =>
      previous?.id === item.id
        ? { ...previous, status }
        : previous
    );

    alert(
      status === "Diterima"
        ? "Return diterima. Penambahan stok MySQL akan dilakukan setelah backend dihubungkan."
        : "Return ditolak. Stok tidak berubah."
    );
  };

  /* HAPUS */
  const handleDelete = (item) => {
    if (item.status === "Diterima") {
      alert("Data return yang sudah diterima tidak dapat dihapus.");
      return;
    }

    if (!window.confirm("Yakin ingin menghapus data return ini?")) {
      return;
    }

    setDataReturn((previous) =>
      previous.filter((row) => row.id !== item.id)
    );
  };

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <div className="barang-masuk-page return-page">

      {/* =================================================
          APP LAYOUT
      ================================================= */}

      <div className="barang-masuk-app-layout">

        {/* =================================================
            SIDEBAR - STRUKTUR SAMA DENGAN BARANG MASUK
        ================================================= */}

        <aside className="barang-masuk-sidebar">

          <div className="barang-masuk-sidebar-brand">
            <img
              src="/images/logo-motor-putih.png"
              alt="Segar Jaya Utama"
              className="barang-masuk-sidebar-motor-logo"
            />

            <div className="barang-masuk-sidebar-brand-text">
              <h2>Segar Jaya Utama</h2>
              <span>Bengkel Motor</span>
            </div>
          </div>

          <div className="barang-masuk-sidebar-line" />

          <nav className="barang-masuk-sidebar-menu">
            {menuItems.map((item) => {
              const MenuIcon = item.icon;
              const active = item.path === "/return-barang";

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`barang-masuk-menu-item ${
                    active ? "active" : ""
                  }`}
                >
                  <MenuIcon />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="barang-masuk-sidebar-bottom-logo">
            <img
              src="/images/motor-sehat.png"
              alt="Motor Sehat"
            />

            <p>Motor Sehat</p>
            <small>Perjalanan lebih lancar</small>

            <div className="barang-masuk-bottom-line" />
          </div>
        </aside>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <main className="barang-masuk-main-content">

          {/* HEADER */}
          <header className="barang-masuk-top-header">
            <h1>Return Barang</h1>

            <div className="barang-masuk-header-right">

              <button
                type="button"
                className="barang-masuk-notification-button"
                onClick={() => navigate("/notifikasi")}
                aria-label="Notifikasi"
              >
                <BellIcon />
              </button>

              <div className="barang-masuk-profile-wrapper">
                <button
                  type="button"
                  className="barang-masuk-profile-area"
                  onClick={() =>
                    setProfileOpen((previous) => !previous)
                  }
                >
                  <div className="barang-masuk-profile-icon">
                    <UserIcon />
                  </div>

                  <div className="barang-masuk-profile-info">
                    <strong>Admin</strong>
                    <span>Segar Jaya Utama</span>
                  </div>

                  <span className="barang-masuk-profile-arrow">
                    ▾
                  </span>
                </button>

                {profileOpen && (
                  <div className="barang-masuk-profile-dropdown">
                    <button
                      type="button"
                      onClick={() => navigate("/pengaturan")}
                    >
                      Pengaturan
                    </button>

                    <button
                      type="button"
                      className="barang-masuk-logout-button"
                      onClick={handleLogout}
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <section className="return-content">

            {/* AREA PENCARIAN */}
            <div className="return-information-area">

              <div className="return-description">
                <p>
                  Kelola barang yang
                  <br />
                  dikembalikan oleh pelanggan
                </p>
              </div>

              <div className="return-search-box">
                <SearchIcon />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Cari kode barang atau nama barang....."
                />
              </div>

              <div className="return-filter-box">
                <FilterIcon />

                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  aria-label="Filter status return"
                >
                  <option>Semua Status</option>
                  <option>Menunggu Pemeriksaan</option>
                  <option>Diterima</option>
                  <option>Ditolak</option>
                </select>
              </div>

              <button
                type="button"
                className="return-add-button"
                onClick={openAddModal}
              >
                <span>＋</span>
                Tambah Return
              </button>
            </div>

            {/* TABEL */}
            <div className="return-table-container">

              <div className="return-table-title">
                <h2>Return Barang</h2>
              </div>

              <div className="return-table-wrapper">
                <table className="return-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Tanggal</th>
                      <th>No.Transaksi</th>
                      <th>Kode Barang</th>
                      <th>Nama Barang</th>
                      <th>Jumlah</th>
                      <th>Alasan</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="return-empty">
                          {search || filterStatus !== "Semua Status"
                            ? "Data return tidak ditemukan"
                            : "Belum ada data return"}
                        </td>
                      </tr>
                    ) : (
                      currentData.map((item, index) => (
                        <tr key={item.id}>
                          <td>{startIndex + index + 1}</td>
                          <td>{formatDate(item.tanggal)}</td>
                          <td>{item.nomorTransaksi}</td>
                          <td>{item.kodeBarang}</td>
                          <td>{item.namaBarang}</td>
                          <td>{item.jumlah}</td>
                          <td>{item.alasan}</td>

                          <td>
                            <span
                              className={`return-status ${
                                item.status === "Diterima"
                                  ? "diterima"
                                  : item.status === "Ditolak"
                                  ? "ditolak"
                                  : "menunggu"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>

                          <td>
                            <div className="return-action-buttons">
                              <button
                                type="button"
                                className="return-edit-button"
                                onClick={() => openEditModal(item)}
                              >
                                ✎ Edit
                              </button>

                              <button
                                type="button"
                                className="return-delete-button"
                                onClick={() => handleDelete(item)}
                              >
                                × Hapus
                              </button>

                              <button
                                type="button"
                                className="return-view-button"
                                onClick={() => openDetail(item)}
                              >
                                Lihat
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              <div className="return-pagination-area">

                <div className="return-show-data">
                  <span>Tampilkan</span>

                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>

                  <span>data</span>
                </div>

                <div className="return-pagination-info">
                  Menampilkan {firstNumber} - {lastNumber} dari{" "}
                  {filteredData.length} data
                </div>

                <div className="return-pagination-buttons">
                  <button
                    type="button"
                    disabled={safePage <= 1}
                    onClick={() =>
                      setCurrentPage((previous) =>
                        Math.max(1, previous - 1)
                      )
                    }
                  >
                    ‹
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={page === safePage ? "active" : ""}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={safePage >= totalPages}
                    onClick={() =>
                      setCurrentPage((previous) =>
                        Math.min(totalPages, previous + 1)
                      )
                    }
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* =================================================
          FOOTER - SAMA DENGAN BARANG MASUK
          Diletakkan DI LUAR app-layout
      ================================================= */}

      <footer className="barang-masuk-footer">
        <div className="barang-masuk-footer-left">
          <img
            src="/images/logo-sejuta-motor.png"
            alt="Sejuta Motor"
          />
        </div>

        <div className="barang-masuk-footer-center">
          <img
            src="/images/logo-motor-hitam.png"
            alt="Motor"
          />
        </div>

        <div className="barang-masuk-footer-title">
          <strong>Segar Jaya Utama</strong>
          <span>Motor</span>
        </div>
      </footer>

      {/* =================================================
          MODAL TAMBAH / EDIT
      ================================================= */}

      {showModal && (
        <div
          className="return-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="return-modal">

            <div className="return-modal-header">
              <div>
                <h2>
                  {editingData
                    ? "Edit Return Barang"
                    : "Tambah Return Barang"}
                </h2>
                <p>Lengkapi informasi barang yang dikembalikan.</p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="return-form-grid">

                <label>
                  Tanggal Return *
                  <input
                    type="date"
                    value={form.tanggal}
                    onChange={(e) =>
                      setForm({ ...form, tanggal: e.target.value })
                    }
                    required
                  />
                </label>

                <label>
                  Nomor Transaksi *
                  <input
                    type="text"
                    value={form.nomorTransaksi}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nomorTransaksi: e.target.value,
                      })
                    }
                    placeholder="Contoh: TRS001"
                    required
                  />
                </label>

                <label>
                  Kode Barang *
                  <input
                    type="text"
                    value={form.kodeBarang}
                    onChange={(e) =>
                      setForm({ ...form, kodeBarang: e.target.value })
                    }
                    placeholder="Masukkan kode barang"
                    required
                  />
                </label>

                <label>
                  Nama Barang *
                  <input
                    type="text"
                    value={form.namaBarang}
                    onChange={(e) =>
                      setForm({ ...form, namaBarang: e.target.value })
                    }
                    placeholder="Masukkan nama barang"
                    required
                  />
                </label>

                <label>
                  Jumlah Return *
                  <input
                    type="number"
                    min="1"
                    value={form.jumlah}
                    onChange={(e) =>
                      setForm({ ...form, jumlah: e.target.value })
                    }
                    required
                  />
                </label>

                <label>
                  Alasan Return *
                  <select
                    value={form.alasan}
                    onChange={(e) =>
                      setForm({ ...form, alasan: e.target.value })
                    }
                    required
                  >
                    <option value="">Pilih alasan</option>
                    <option value="Barang yang dibeli cacat">
                      Barang yang dibeli cacat
                    </option>
                    <option value="Salah beli barang">
                      Salah beli barang
                    </option>
                    <option value="Barang tidak sesuai">
                      Barang tidak sesuai
                    </option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </label>

                <label className="return-form-full">
                  Catatan
                  <textarea
                    rows="3"
                    value={form.catatan}
                    onChange={(e) =>
                      setForm({ ...form, catatan: e.target.value })
                    }
                    placeholder="Catatan tambahan..."
                  />
                </label>
              </div>

              <div className="return-modal-note">
                Status awal return adalah{" "}
                <strong>Menunggu Pemeriksaan</strong>.
              </div>

              <div className="return-modal-actions">
                <button
                  type="button"
                  className="return-cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>

                <button type="submit" className="return-save-button">
                  {editingData ? "Simpan Perubahan" : "Simpan Return"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================
          MODAL DETAIL
      ================================================= */}

      {showDetail && selectedData && (
        <div
          className="return-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowDetail(false);
            }
          }}
        >
          <div className="return-modal">

            <div className="return-modal-header">
              <div>
                <h2>Detail Return Barang</h2>
                <p>Informasi pengembalian barang pelanggan.</p>
              </div>

              <button
                type="button"
                onClick={() => setShowDetail(false)}
              >
                ×
              </button>
            </div>

            <div className="return-detail-grid">
              <div>
                <small>Tanggal</small>
                <strong>{formatDate(selectedData.tanggal)}</strong>
              </div>

              <div>
                <small>No. Transaksi</small>
                <strong>{selectedData.nomorTransaksi}</strong>
              </div>

              <div>
                <small>Kode Barang</small>
                <strong>{selectedData.kodeBarang}</strong>
              </div>

              <div>
                <small>Nama Barang</small>
                <strong>{selectedData.namaBarang}</strong>
              </div>

              <div>
                <small>Jumlah</small>
                <strong>{selectedData.jumlah}</strong>
              </div>

              <div>
                <small>Alasan</small>
                <strong>{selectedData.alasan}</strong>
              </div>

              <div>
                <small>Status</small>
                <strong>{selectedData.status}</strong>
              </div>

              <div className="return-form-full">
                <small>Catatan</small>
                <strong>{selectedData.catatan || "-"}</strong>
              </div>
            </div>

            {selectedData.status === "Menunggu Pemeriksaan" && (
              <div className="return-modal-actions">
                <button
                  type="button"
                  className="return-cancel-button"
                  onClick={() => setShowDetail(false)}
                >
                  Tutup
                </button>

                <button
                  type="button"
                  className="return-reject-button"
                  onClick={() =>
                    updateStatus(selectedData, "Ditolak")
                  }
                >
                  Tolak Return
                </button>

                <button
                  type="button"
                  className="return-accept-button"
                  onClick={() =>
                    updateStatus(selectedData, "Diterima")
                  }
                >
                  Terima Return
                </button>
              </div>
            )}

            {selectedData.status !== "Menunggu Pemeriksaan" && (
              <div className="return-modal-actions">
                <button
                  type="button"
                  className="return-cancel-button"
                  onClick={() => setShowDetail(false)}
                >
                  Tutup
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReturnBarang;
