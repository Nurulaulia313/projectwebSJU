import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoSejuta from "../assets/logo-sejuta.png";
import logoMotor from "../assets/logo-motor.png";
import logoBengkel from "../assets/logo-bengkel.png";

import {
  getBarangKeluars,
  createBarangKeluar,
  updateBarangKeluar,
  deleteBarangKeluar,
} from "../services/api";

import "./BarangKeluar.css";


/* =====================================================
   ICON SVG
===================================================== */

const SearchIcon = () => (
  <svg className="barang-keluar-search-icon" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="barang-keluar-calendar-icon" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <line x1="16" y1="3" x2="16" y2="7" />
    <line x1="8" y1="3" x2="8" y2="7" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const FilterIcon = () => (
  <svg className="barang-keluar-filter-icon" viewBox="0 0 24 24">
    <path d="M4 5h16l-6 7v6l-4 2v-8z" />
  </svg>
);

const BellIcon = () => (
  <svg className="barang-keluar-bell-icon" viewBox="0 0 24 24">
    <path
      d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
      fill="currentColor"
    />
    <path
      d="M10 21h4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="8"
      r="3.5"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M5 20c.7-4 3-6 7-6s6.3 2 7 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24">
    <path
      d="M3 11.5 12 4l9 7.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 10.5V20h13v-9.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M9.5 20v-5h5v5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const BoxIcon = () => (
  <svg viewBox="0 0 24 24">
    <path
      d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="m4 7.5 8 4.5 8-4.5M12 12v9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const SupplierIcon = () => (
  <svg viewBox="0 0 24 24">
    <circle
      cx="8"
      cy="8"
      r="3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      cx="17"
      cy="9"
      r="2.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M3 20c.5-4 2.3-6 5-6s4.5 2 5 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M14 15c3-.5 5 1.2 6 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const ArrowLoginIcon = () => (
  <svg viewBox="0 0 24 24">
    <path
      d="M10 5H5v14h5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M13 8l4 4-4 4M8 12h9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24">
    <path
      d="M3 4h2l2 12h11l2-8H6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="20" r="1.5" fill="currentColor" />
    <circle cx="17" cy="20" r="1.5" fill="currentColor" />
  </svg>
);

const ReturnIcon = () => (
  <svg viewBox="0 0 24 24">
    <path
      d="M9 7 4 12l5 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 12h10c4 0 6 2 6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const TransactionIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M8 9h8M8 13h8M8 17h5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ReportIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect
      x="5"
      y="3"
      width="14"
      height="18"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M8 8h8M8 12h8M8 16h5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const GearIcon = () => (
  <svg viewBox="0 0 24 24">
    <circle
      cx="12"
      cy="12"
      r="3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M19 13.5a7 7 0 0 0 0-3l2-1.5-2-3-2.3 1a7 7 0 0 0-2.5-1.5L14 2h-4l-.2 2.5A7 7 0 0 0 7.3 6L5 5 3 8l2 1.5a7 7 0 0 0 0 3L3 14l2 3 2.3-1a7 7 0 0 0 2.5 1.5L10 20h4l.2-2.5a7 7 0 0 0 2.5-1.5l2.3 1 2-3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);


/* =====================================================
   SIDEBAR MENU
===================================================== */

const menuItems = [
  { label: "Dashboard", path: "/", icon: HomeIcon },
  { label: "Data Barang", path: "/data-barang", icon: BoxIcon },
  { label: "Supplier", path: "/supplier", icon: SupplierIcon },
  { label: "Barang Masuk", path: "/barang-masuk", icon: ArrowLoginIcon },
  { label: "Barang Keluar", path: "/barang-keluar", icon: ArrowLoginIcon },
  { label: "Kasir/Penjualan", path: "/kasir", icon: CartIcon },
  { label: "Return Barang", path: "/return-barang", icon: ReturnIcon },
  { label: "Transaksi", path: "/transaksi", icon: TransactionIcon },
  { label: "Laporan", path: "/laporan", icon: ReportIcon },
  { label: "Notifikasi", path: "/notifikasi", icon: BellIcon },
  { label: "Pengaturan", path: "/pengaturan", icon: GearIcon },
];


/* =====================================================
   FORMAT TANGGAL
===================================================== */

const formatDate = (dateValue) => {
  if (!dateValue) return "-";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};


/* =====================================================
   NORMALIZE DATA
===================================================== */

const normalizeBarangKeluar = (item) => ({
  id: item.id ?? item._id,

  tanggal:
    item.tanggal ??
    item.date ??
    "",

  barangId:
    item.barang_id ??
    item.barangId ??
    item.barang?.id ??
    item.barang?._id ??
    "",

  kodeBarang:
    item.kodeBarang ??
    item.kode_barang ??
    item.barang?.kode_barang ??
    item.barang?.kodeBarang ??
    "",

  namaBarang:
    item.namaBarang ??
    item.nama_barang ??
    item.barang?.nama_barang ??
    item.barang?.namaBarang ??
    "",

  jumlah: item.jumlah ?? 0,

  stokSebelum:
    item.stokSebelum ??
    item.stok_sebelum ??
    0,

  stokSesudah:
    item.stokSesudah ??
    item.stok_sesudah ??
    0,

  keterangan:
    item.keterangan ??
    "",
});


/* =====================================================
   COMPONENT
===================================================== */

function BarangKeluar() {
  const navigate = useNavigate();


  /* ===================================================
     STATE
  =================================================== */

  const [barangKeluars, setBarangKeluars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    tanggal: "",
    barang_id: "",
    kode_barang: "",
    nama_barang: "",
    jumlah: "",
    keterangan: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);


  /* ===================================================
     LOAD DATA
  =================================================== */

  const loadBarangKeluars = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getBarangKeluars();

      const result = Array.isArray(data)
        ? data
        : data?.data ?? [];

      setBarangKeluars(
        result.map(normalizeBarangKeluar)
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
        "Gagal mengambil data barang keluar"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBarangKeluars();
  }, []);


  /* ===================================================
     FILTER DATA
  =================================================== */

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return barangKeluars.filter((item) => {
      const kodeBarang = String(
        item.kodeBarang || ""
      ).toLowerCase();

      const namaBarang = String(
        item.namaBarang || ""
      ).toLowerCase();

      const keterangan = String(
        item.keterangan || ""
      ).toLowerCase();

      const matchSearch =
        !keyword ||
        kodeBarang.includes(keyword) ||
        namaBarang.includes(keyword) ||
        keterangan.includes(keyword);

      const matchDate =
        !selectedDate ||
        String(item.tanggal).slice(0, 10) === selectedDate;

      return matchSearch && matchDate;
    });
  }, [barangKeluars, search, selectedDate]);


  /* ===================================================
     PAGINATION
  =================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / itemsPerPage)
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) * itemsPerPage;

  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const firstNumber =
    filteredData.length === 0
      ? 0
      : startIndex + 1;

  const lastNumber = Math.min(
    startIndex + itemsPerPage,
    filteredData.length
  );


  /* ===================================================
     SEARCH / FILTER HANDLER
  =================================================== */

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1);
  };

  const clearFilter = () => {
    setSelectedDate("");
    setSearch("");
    setFilterOpen(false);
    setCurrentPage(1);
  };


  /* ===================================================
     MODAL TAMBAH
  =================================================== */

  const openAddModal = () => {
    setEditingData(null);

    setForm({
      tanggal: new Date().toISOString().slice(0, 10),
      barang_id: "",
      kode_barang: "",
      nama_barang: "",
      jumlah: "",
      keterangan: "",
    });

    setShowModal(true);
  };


  /* ===================================================
     MODAL EDIT
  =================================================== */

  const openEditModal = (item) => {
    setEditingData(item);

    setForm({
      tanggal: String(item.tanggal).slice(0, 10),

      barang_id:
        item.barangId ?? "",

      kode_barang:
        item.kodeBarang ?? "",

      nama_barang:
        item.namaBarang ?? "",

      jumlah:
        item.jumlah ?? "",

      keterangan:
        item.keterangan ?? "",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingData(null);
  };


  /* ===================================================
     FORM CHANGE
  =================================================== */

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /* ===================================================
     SAVE
  =================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(form.jumlah) < 1) {
      alert("Jumlah barang keluar minimal 1.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        tanggal: form.tanggal,

        barang_id: form.barang_id
          ? Number(form.barang_id)
          : null,

        kode_barang: form.kode_barang.trim(),
        nama_barang: form.nama_barang.trim(),

        jumlah: Number(form.jumlah),

        keterangan: form.keterangan.trim(),
      };

      if (editingData) {
        await updateBarangKeluar(
          editingData.id,
          payload
        );
      } else {
        await createBarangKeluar(payload);
      }

      setShowModal(false);
      setEditingData(null);

      await loadBarangKeluars();
    } catch (err) {
      console.error(err);

      alert(
        err.message ||
        "Gagal menyimpan barang keluar"
      );
    } finally {
      setSaving(false);
    }
  };


  /* ===================================================
     DELETE
  =================================================== */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus data barang keluar ini?"
    );

    if (!confirmed) return;

    try {
      await deleteBarangKeluar(id);
      await loadBarangKeluars();
    } catch (err) {
      console.error(err);

      alert(
        err.message ||
        "Gagal menghapus data barang keluar"
      );
    }
  };


  /* ===================================================
     LOGOUT
  =================================================== */

  const handleLogout = () => {
    localStorage.removeItem("token");
    setProfileOpen(false);
    navigate("/");
  };


  /* ===================================================
     RENDER
  =================================================== */

  return (
    <div className="barang-keluar-page">

      {/* =================================================
          APP LAYOUT
      ================================================= */}

      <div className="barang-keluar-app-layout">

        {/* SIDEBAR */}

        <aside className="barang-keluar-sidebar">

          <div className="barang-keluar-sidebar-brand">
            <img
              src={logoMotor}
              alt="Logo Segar Jaya Utama"
              className="barang-keluar-sidebar-motor-logo"
            />

            <div className="barang-keluar-sidebar-brand-text">
              <h2>Segar Jaya Utama</h2>
              <span>Bengkel Motor</span>
            </div>
          </div>

          <div className="barang-keluar-sidebar-line" />

          <nav className="barang-keluar-sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = item.path === "/barang-keluar";

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`barang-keluar-menu-item ${
                    active ? "active" : ""
                  }`}
                >
                  <Icon />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="barang-keluar-sidebar-bottom-logo">
            <img
              src={logoBengkel}
              alt="Logo Bengkel"
            />

            <p>Motor Sehat</p>
            <small>Perjalanan lebih lancar</small>

            <div className="barang-keluar-bottom-line" />
          </div>

        </aside>


        {/* MAIN CONTENT */}

        <main className="barang-keluar-main-content">

          {/* HEADER */}

          <header className="barang-keluar-top-header">

            <h1>Barang Keluar</h1>

            <div className="barang-keluar-header-right">

              <button
                type="button"
                className="barang-keluar-notification-button"
                onClick={() => navigate("/notifikasi")}
                aria-label="Notifikasi"
              >
                <BellIcon />
              </button>

              <div className="barang-keluar-profile-wrapper">

                <button
                  type="button"
                  className="barang-keluar-profile-area"
                  onClick={() =>
                    setProfileOpen((previous) => !previous)
                  }
                >
                  <div className="barang-keluar-profile-icon">
                    <UserIcon />
                  </div>

                  <div className="barang-keluar-profile-info">
                    <strong>Admin</strong>
                    <span>Segar Jaya Utama</span>
                  </div>

                  <span className="barang-keluar-profile-arrow">
                    ▾
                  </span>
                </button>

                {profileOpen && (
                  <div className="barang-keluar-profile-dropdown">

                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/profil");
                      }}
                    >
                      Profil
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/pengaturan");
                      }}
                    >
                      Pengaturan
                    </button>

                    <button
                      type="button"
                      className="barang-keluar-logout-button"
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

          <section className="barang-keluar-content">

            {/* TOP INFORMATION */}

            <div className="barang-keluar-information-area">

              <div className="barang-keluar-description">
                <p>
                  Catat barang keluar
                  <br />
                  dari inventaris
                </p>
              </div>


              {/* SEARCH */}

              <div className="barang-keluar-search-box">
                <SearchIcon />

                <input
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Cari kode barang atau nama barang....."
                />
              </div>


              {/* DATE */}

              <div className="barang-keluar-date-box">
                <CalendarIcon />

                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  aria-label="Pilih tanggal"
                />

                {!selectedDate && (
                  <span>Pilih Tanggal</span>
                )}
              </div>


              {/* FILTER */}

              <button
                type="button"
                className="barang-keluar-filter-button"
                onClick={() =>
                  setFilterOpen((previous) => !previous)
                }
              >
                <FilterIcon />
                <span>Filter</span>
              </button>


              {/* TAMBAH */}

              <button
                type="button"
                className="barang-keluar-add-button"
                onClick={openAddModal}
              >
                <span className="barang-keluar-plus">+</span>
                Tambah Barang Keluar
              </button>


              {/* FILTER DROPDOWN */}

              {filterOpen && (
                <div className="barang-keluar-filter-dropdown">
                  <div>
                    <strong>Filter Data</strong>
                  </div>

                  <button
                    type="button"
                    onClick={clearFilter}
                  >
                    Reset Filter
                  </button>
                </div>
              )}

            </div>


            {/* TABLE CONTAINER */}

            <div className="barang-keluar-table-container">

              <div className="barang-keluar-table-title">
                <h2>Barang Keluar</h2>
              </div>


              {/* TABLE */}

              <div className="barang-keluar-table-wrapper">

                {loading ? (

                  <div className="barang-keluar-loading">
                    Memuat data...
                  </div>

                ) : error ? (

                  <div className="barang-keluar-error">
                    <p>{error}</p>

                    <button
                      type="button"
                      onClick={loadBarangKeluars}
                    >
                      Coba Lagi
                    </button>
                  </div>

                ) : (

                  <table className="barang-keluar-table">

                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Kode Barang</th>
                        <th>Nama Barang</th>
                        <th>Jumlah</th>
                        <th>Stok Sebelum</th>
                        <th>Stok Sesudah</th>
                        <th>Keterangan</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>

                    <tbody>

                      {currentData.length === 0 ? (

                        <tr>
                          <td
                            colSpan="9"
                            className="barang-keluar-empty"
                          >
                            Belum ada data barang keluar
                          </td>
                        </tr>

                      ) : (

                        currentData.map((item, index) => (
                          <tr key={item.id ?? index}>

                            <td>
                              {startIndex + index + 1}
                            </td>

                            <td>
                              {formatDate(item.tanggal)}
                            </td>

                            <td>
                              {item.kodeBarang || "-"}
                            </td>

                            <td>
                              {item.namaBarang || "-"}
                            </td>

                            <td>
                              {item.jumlah}
                            </td>

                            <td>
                              {item.stokSebelum}
                            </td>

                            <td>
                              {item.stokSesudah}
                            </td>

                            <td>
                              {item.keterangan || "-"}
                            </td>

                            <td>
                              <div className="barang-keluar-action-buttons">

                                <button
                                  type="button"
                                  className="barang-keluar-edit-button"
                                  onClick={() => openEditModal(item)}
                                >
                                  <span>✎</span>
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  className="barang-keluar-delete-button"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <span>▮</span>
                                  Hapus
                                </button>

                              </div>
                            </td>

                          </tr>
                        ))

                      )}

                    </tbody>

                  </table>

                )}

              </div>


              {/* PAGINATION */}

              <div className="barang-keluar-pagination-area">

                <div className="barang-keluar-show-data">
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


                <div className="barang-keluar-pagination-info">
                  Menampilkan{" "}
                  {firstNumber}
                  {" - "}
                  {lastNumber}
                  {" dari "}
                  {filteredData.length}
                  {" data"}
                </div>


                <div className="barang-keluar-pagination-buttons">

                  <button
                    type="button"
                    disabled={safeCurrentPage <= 1}
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
                      className={
                        page === safeCurrentPage ? "active" : ""
                      }
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={safeCurrentPage >= totalPages}
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


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="barang-keluar-footer">

        <div className="barang-keluar-footer-left">
          <img
            src={logoSejuta}
            alt="Sejuta Motor"
          />
        </div>

        <div className="barang-keluar-footer-center">
          <img
            src={logoMotor}
            alt="Motor"
          />
        </div>

        <div className="barang-keluar-footer-title">
          <strong>Segar Jaya Utama</strong>
          <span>Motor</span>
        </div>

      </footer>


      {/* =====================================================
          MODAL TAMBAH / EDIT
      ===================================================== */}

      {showModal && (

        <div
          className="barang-keluar-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >

          <div className="barang-keluar-modal">

            {/* MODAL HEADER */}

            <div className="barang-keluar-modal-header">

              <h2>
                {editingData
                  ? "Edit Barang Keluar"
                  : "Tambah Barang Keluar"}
              </h2>

              <button
                type="button"
                className="barang-keluar-modal-close"
                onClick={closeModal}
                disabled={saving}
              >
                ×
              </button>

            </div>


            {/* FORM */}

            <form
              className="barang-keluar-form"
              onSubmit={handleSubmit}
            >

              {/* TANGGAL */}

              <div className="barang-keluar-form-group">
                <label>Tanggal</label>

                <input
                  type="date"
                  name="tanggal"
                  value={form.tanggal}
                  onChange={handleFormChange}
                  required
                />
              </div>


              {/* KODE + NAMA */}

              <div className="barang-keluar-form-row">

                <div className="barang-keluar-form-group">
                  <label>Kode Barang</label>

                  <input
                    type="text"
                    name="kode_barang"
                    value={form.kode_barang}
                    onChange={handleFormChange}
                    placeholder="Contoh: BRG001"
                    required
                  />
                </div>

                <div className="barang-keluar-form-group">
                  <label>Nama Barang</label>

                  <input
                    type="text"
                    name="nama_barang"
                    value={form.nama_barang}
                    onChange={handleFormChange}
                    placeholder="Nama barang"
                    required
                  />
                </div>

              </div>


              {/* ID BARANG */}

              <div className="barang-keluar-form-group">
                <label>ID Barang</label>

                <input
                  type="number"
                  name="barang_id"
                  value={form.barang_id}
                  onChange={handleFormChange}
                  placeholder="ID barang dari data barang"
                />
              </div>


              {/* JUMLAH */}

              <div className="barang-keluar-form-group">
                <label>Jumlah Barang Keluar</label>

                <input
                  type="number"
                  name="jumlah"
                  min="1"
                  value={form.jumlah}
                  onChange={handleFormChange}
                  placeholder="Masukkan jumlah"
                  required
                />
              </div>


              {/* KETERANGAN */}

              <div className="barang-keluar-form-group">
                <label>Keterangan</label>

                <textarea
                  name="keterangan"
                  value={form.keterangan}
                  onChange={handleFormChange}
                  placeholder="Contoh: Digunakan untuk servis motor pelanggan"
                  rows="3"
                />
              </div>


              {/* ACTION */}

              <div className="barang-keluar-form-actions">

                <button
                  type="button"
                  className="barang-keluar-cancel-button"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="barang-keluar-save-button"
                  disabled={saving}
                >
                  {saving
                    ? "Menyimpan..."
                    : editingData
                      ? "Simpan Perubahan"
                      : "Simpan"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default BarangKeluar;