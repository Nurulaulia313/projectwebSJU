import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoSejuta from "../assets/logo-sejuta.png";
import logoMotor from "../assets/logo-motor.png";
import logoBengkel from "../assets/logo-bengkel.png";

import {
  getBarangMasuks,
  createBarangMasuk,
  updateBarangMasuk,
  deleteBarangMasuk,
} from "../services/api";

import "./BarangMasuk.css";


/* =====================================================
   ICON SVG
===================================================== */

const SearchIcon = () => (
  <svg
    className="barang-masuk-search-icon"
    viewBox="0 0 24 24"
  >
    <circle
      cx="11"
      cy="11"
      r="7"
    />

    <line
      x1="16.5"
      y1="16.5"
      x2="21"
      y2="21"
    />
  </svg>
);


const CalendarIcon = () => (
  <svg
    className="barang-masuk-calendar-icon"
    viewBox="0 0 24 24"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="2"
    />

    <line
      x1="16"
      y1="3"
      x2="16"
      y2="7"
    />

    <line
      x1="8"
      y1="3"
      x2="8"
      y2="7"
    />

    <line
      x1="3"
      y1="10"
      x2="21"
      y2="10"
    />
  </svg>
);


const FilterIcon = () => (
  <svg
    className="barang-masuk-filter-icon"
    viewBox="0 0 24 24"
  >
    <path d="M4 5h16l-6 7v6l-4 2v-8z" />
  </svg>
);


const BellIcon = () => (
  <svg
    className="barang-masuk-bell-icon"
    viewBox="0 0 24 24"
  >
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
  <svg
    viewBox="0 0 24 24"
    fill="none"
  >
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

    <circle
      cx="10"
      cy="20"
      r="1.5"
      fill="currentColor"
    />

    <circle
      cx="17"
      cy="20"
      r="1.5"
      fill="currentColor"
    />
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


const FileIcon = () => (
  <svg viewBox="0 0 24 24">
    <path
      d="M6 2h8l4 4v16H6z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />

    <path
      d="M14 2v5h5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="M9 12h6M9 16h6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);


/* =====================================================
   SIDEBAR MENU
===================================================== */

const menuItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: HomeIcon,
  },
  {
    label: "Data Barang",
    path: "/data-barang",
    icon: BoxIcon,
  },
  {
    label: "Supplier",
    path: "/supplier",
    icon: SupplierIcon,
  },
  {
    label: "Barang Masuk",
    path: "/barang-masuk",
    icon: ArrowLoginIcon,
  },
  {
    label: "Barang Keluar",
    path: "/barang-keluar",
    icon: ArrowLoginIcon,
  },
  {
    label: "Kasir/Penjualan",
    path: "/kasir",
    icon: CartIcon,
  },
  {
    label: "Return Barang",
    path: "/return-barang",
    icon: ReturnIcon,
  },
  {
    label: "Transaksi",
    path: "/transaksi",
    icon: TransactionIcon,
  },
  {
    label: "Laporan",
    path: "/laporan",
    icon: ReportIcon,
  },
  {
    label: "Notifikasi",
    path: "/notifikasi",
    icon: BellIcon,
  },
  {
    label: "Pengaturan",
    path: "/pengaturan",
    icon: GearIcon,
  },
];


/* =====================================================
   FORMAT TANGGAL
===================================================== */

const formatDate = (dateValue) => {

  if (!dateValue) {
    return "-";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
};


/* =====================================================
   FORMAT RUPIAH
===================================================== */

const formatRupiah = (value) => {

  const number = Number(value || 0);

  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }
  ).format(number);
};


/* =====================================================
   NORMALIZE DATA
===================================================== */

const normalizeBarangMasuk = (item) => {

  return {

    id:
      item.id ??
      item._id,

    tanggal:
      item.tanggal ??
      item.date ??
      "",

    kodeBarang:
      item.kodeBarang ??
      item.kode_barang ??
      item.barang?.kode_barang ??
      "",

    namaBarang:
      item.namaBarang ??
      item.nama_barang ??
      item.barang?.nama_barang ??
      "",

    supplier:
      item.supplier?.namaSupplier ??
      item.supplier?.nama_supplier ??
      item.supplier?.nama ??
      item.namaSupplier ??
      item.nama_supplier ??
      "",

    jumlah:
      item.jumlah ?? 0,

    hargaBeli:
      item.hargaBeli ??
      item.hargaSatuan ??
      item.harga_satuan ??
      item.harga ??
      0,

    buktiNota:
      item.buktiNota ??
      item.buktiTransaksi ??
      item.bukti_transaksi ??
      "",
  };

};


/* =====================================================
   COMPONENT
===================================================== */

function BarangMasuk() {

  const navigate = useNavigate();


  /* ===================================================
     STATE
  =================================================== */

  const [barangMasuks, setBarangMasuks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  const [search, setSearch] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);


  const [showModal, setShowModal] = useState(false);

  const [editingData, setEditingData] = useState(null);


  const [form, setForm] = useState({

    tanggal: "",

    kodeBarang: "",

    namaBarang: "",

    supplier: "",

    jumlah: "",

    hargaBeli: "",

    buktiNota: "",

  });


  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(5);


  /* ===================================================
     LOAD DATA
  =================================================== */

  const loadBarangMasuks = async () => {

    try {

      setLoading(true);

      setError("");


      const data =
        await getBarangMasuks();


      const result =
        Array.isArray(data)
          ? data
          : data?.data ?? [];


      setBarangMasuks(
        result.map(
          normalizeBarangMasuk
        )
      );


    } catch (err) {

      console.error(err);


      setError(
        err.message ||
        "Gagal mengambil data barang masuk"
      );


    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadBarangMasuks();

  }, []);


  /* ===================================================
     FILTER DATA
  =================================================== */

  const filteredData = useMemo(() => {

    const keyword =
      search
        .toLowerCase()
        .trim();


    return barangMasuks.filter(
      (item) => {

        const kodeBarang =
          String(
            item.kodeBarang || ""
          ).toLowerCase();

        const namaBarang =
          String(
            item.namaBarang || ""
          ).toLowerCase();

        const supplier =
          String(
            item.supplier || ""
          ).toLowerCase();


        const matchSearch =
          !keyword ||
          kodeBarang.includes(
            keyword
          ) ||
          namaBarang.includes(
            keyword
          ) ||
          supplier.includes(
            keyword
          );


        const matchDate =
          !selectedDate ||
          String(
            item.tanggal
          ).slice(0, 10) ===
            selectedDate;


        return (
          matchSearch &&
          matchDate
        );

      }
    );

  }, [
    barangMasuks,
    search,
    selectedDate,
  ]);


  /* ===================================================
     PAGINATION
  =================================================== */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredData.length /
        itemsPerPage
      )
    );


  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages
    );


  const startIndex =
    (safeCurrentPage - 1) *
    itemsPerPage;


  const currentData =
    filteredData.slice(
      startIndex,
      startIndex +
        itemsPerPage
    );


  const firstNumber =
    filteredData.length === 0
      ? 0
      : startIndex + 1;


  const lastNumber =
    Math.min(
      startIndex +
        itemsPerPage,
      filteredData.length
    );


  /* ===================================================
     SEARCH / FILTER HANDLER
  =================================================== */

  const handleSearch = (e) => {

    setSearch(
      e.target.value
    );

    setCurrentPage(1);

  };


  const handleDateChange = (e) => {

    setSelectedDate(
      e.target.value
    );

    setCurrentPage(1);

  };


  const clearFilter = () => {

    setSelectedDate("");

    setSearch("");

    setFilterOpen(false);

    setCurrentPage(1);

  };


  /* ===================================================
     FORM
  =================================================== */

  const openAddModal = () => {

    setEditingData(null);


    setForm({

      tanggal:
        new Date()
          .toISOString()
          .slice(0, 10),

      kodeBarang: "",

      namaBarang: "",

      supplier: "",

      jumlah: "",

      hargaBeli: "",

      buktiNota: "",

    });


    setShowModal(true);

  };


  const openEditModal = (item) => {

    setEditingData(item);


    setForm({

      tanggal:
        String(
          item.tanggal
        ).slice(0, 10),

      kodeBarang:
        item.kodeBarang,

      namaBarang:
        item.namaBarang,

      supplier:
        item.supplier,

      jumlah:
        item.jumlah,

      hargaBeli:
        item.hargaBeli,

      buktiNota:
        item.buktiNota,

    });


    setShowModal(true);

  };


  const closeModal = () => {

    setShowModal(false);

    setEditingData(null);

  };


  const handleFormChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setForm(
      (previous) => ({

        ...previous,

        [name]: value,

      })
    );

  };


  /* ===================================================
     SAVE
  =================================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const payload = {

        tanggal:
          form.tanggal,

        kodeBarang:
          form.kodeBarang,

        namaBarang:
          form.namaBarang,

        supplier:
          form.supplier,

        jumlah:
          Number(
            form.jumlah
          ),

        hargaBeli:
          Number(
            form.hargaBeli
          ),

        buktiNota:
          form.buktiNota,

      };


      if (editingData) {

        await updateBarangMasuk(

          editingData.id,

          payload

        );

      } else {

        await createBarangMasuk(

          payload

        );

      }


      closeModal();

      await loadBarangMasuks();


    } catch (err) {

      console.error(err);


      alert(
        err.message ||
        "Gagal menyimpan barang masuk"
      );

    }

  };


  /* ===================================================
     DELETE
  =================================================== */

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Apakah Anda yakin ingin menghapus data barang masuk ini?"
      );


    if (!confirmed) {
      return;
    }


    try {

      await deleteBarangMasuk(id);

      await loadBarangMasuks();


    } catch (err) {

      console.error(err);


      alert(
        err.message ||
        "Gagal menghapus data"
      );

    }

  };


  /* ===================================================
     LOGOUT
  =================================================== */

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    setProfileOpen(false);

    navigate("/");

  };


  /* ===================================================
     RENDER
  =================================================== */

  return (

    <div className="barang-masuk-page">


      {/* =================================================
          APP LAYOUT
      ================================================= */}

      <div className="barang-masuk-app-layout">


        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="barang-masuk-sidebar">


          {/* BRAND */}

          
{/* BRAND SIDEBAR */}
<div className="barang-masuk-sidebar-brand">
  <img
    src={logoMotor}
    alt="Logo Segar Jaya Utama"
    className="barang-masuk-sidebar-motor-logo"
  />

  <div className="barang-masuk-sidebar-brand-text">
    <h2>Segar Jaya Utama</h2>
    <span>Bengkel Motor</span>
  </div>
</div>

<div className="barang-masuk-sidebar-line" />



          {/* MENU */}

          <nav className="barang-masuk-sidebar-menu">

            {menuItems.map(
              (item) => {

                const Icon =
                  item.icon;


                const active =
                  item.path ===
                  "/barang-masuk";


                return (

                  <Link
                    key={
                      item.label
                    }
                    to={
                      item.path
                    }
                    className={
                      `barang-masuk-menu-item ${
                        active
                          ? "active"
                          : ""
                      }`
                    }
                  >

                    <Icon />

                    <span>
                      {
                        item.label
                      }
                    </span>

                  </Link>

                );

              }
            )}

          </nav>


          {/* BOTTOM LOGO */}

        
{/* BOTTOM LOGO SIDEBAR */}
<div className="barang-masuk-sidebar-bottom-logo">
  <img
    src={logoBengkel}
    alt="Logo Bengkel"
  />

  <p>Motor Sehat</p>
  <small>Perjalanan lebih lancar</small>

  <div className="barang-masuk-bottom-line" />
</div>


        </aside>


        {/* =================================================
            MAIN
        ================================================= */}

        <main className="barang-masuk-main-content">


          {/* =================================================
              HEADER
          ================================================= */}

          <header className="barang-masuk-top-header">


            <h1>
              Barang Masuk
            </h1>


            <div className="barang-masuk-header-right">


              {/* NOTIFICATION */}

              <button
                type="button"
                className="barang-masuk-notification-button"
                onClick={() =>
                  navigate(
                    "/notifikasi"
                  )
                }
              >

                <BellIcon />

              </button>


              {/* PROFILE */}

              <div className="barang-masuk-profile-wrapper">


                <button
                  type="button"
                  className="barang-masuk-profile-area"
                  onClick={() =>
                    setProfileOpen(
                      (previous) =>
                        !previous
                    )
                  }
                >

                  <div className="barang-masuk-profile-icon">

                    <UserIcon />

                  </div>


                  <div className="barang-masuk-profile-info">

                    <strong>
                      Admin
                    </strong>

                    <span>
                      Segar Jaya Utama
                    </span>

                  </div>


                  <span className="barang-masuk-profile-arrow">
                    ▾
                  </span>

                </button>


                {profileOpen && (

                  <div className="barang-masuk-profile-dropdown">


                    {/* PROFIL */}

                    <button
                      type="button"
                      onClick={() => {

                        setProfileOpen(
                          false
                        );

                        navigate(
                          "/profil"
                        );

                      }}
                    >
                      Profil
                    </button>


                    {/* PENGATURAN */}

                    <button
                      type="button"
                      onClick={() => {

                        setProfileOpen(
                          false
                        );

                        navigate(
                          "/pengaturan"
                        );

                      }}
                    >
                      Pengaturan
                    </button>


                    {/* KELUAR */}

                    <button
                      type="button"
                      className="barang-masuk-logout-button"
                      onClick={
                        handleLogout
                      }
                    >
                      Keluar
                    </button>


                  </div>

                )}


              </div>


            </div>


          </header>


          {/* =================================================
              CONTENT
          ================================================= */}

          <section className="barang-masuk-content">


            {/* =================================================
                TOP INFORMATION
            ================================================= */}

            <div className="barang-masuk-information-area">


              <div className="barang-masuk-description">

                <p>
                  Catat barang masuk
                  <br />
                  dari supplier
                </p>

              </div>


              {/* SEARCH */}

              <div className="barang-masuk-search-box">

                <SearchIcon />

                <input
                  type="text"
                  value={search}
                  onChange={
                    handleSearch
                  }
                  placeholder="Cari kode barang atau nama barang....."
                />

              </div>


              {/* DATE */}

              <div className="barang-masuk-date-box">

                <CalendarIcon />

                <input
                  type="date"
                  value={
                    selectedDate
                  }
                  onChange={
                    handleDateChange
                  }
                />

                {!selectedDate && (

                  <span>
                    Pilih Tanggal
                  </span>

                )}

              </div>


              {/* FILTER */}

              <button
                type="button"
                className="barang-masuk-filter-button"
                onClick={() =>
                  setFilterOpen(
                    (previous) =>
                      !previous
                  )
                }
              >

                <FilterIcon />

                <span>
                  Filter
                </span>

              </button>


              {/* TAMBAH */}

              <button
                type="button"
                className="barang-masuk-add-button"
                onClick={
                  openAddModal
                }
              >

                <span className="barang-masuk-plus">
                  +
                </span>

                Tambah Barang Masuk

              </button>


              {/* FILTER DROPDOWN */}

              {filterOpen && (

                <div className="barang-masuk-filter-dropdown">

                  <div>

                    <strong>
                      Filter Data
                    </strong>

                  </div>


                  <button
                    type="button"
                    onClick={
                      clearFilter
                    }
                  >
                    Reset Filter
                  </button>

                </div>

              )}


            </div>


            {/* =================================================
                TABLE CONTAINER
            ================================================= */}

            <div className="barang-masuk-table-container">


              <div className="barang-masuk-table-title">

                <h2>
                  Barang Masuk
                </h2>

              </div>


              {/* TABLE */}

              <div className="barang-masuk-table-wrapper">


                {loading ? (

                  <div className="barang-masuk-loading">

                    Memuat data...

                  </div>


                ) : error ? (

                  <div className="barang-masuk-error">

                    <p>
                      {error}
                    </p>

                    <button
                      type="button"
                      onClick={
                        loadBarangMasuks
                      }
                    >
                      Coba Lagi
                    </button>

                  </div>


                ) : (

                  <table className="barang-masuk-table">


                    <thead>

                      <tr>

                        <th>
                          No
                        </th>

                        <th>
                          Tanggal
                        </th>

                        <th>
                          Kode Barang
                        </th>

                        <th>
                          Nama Barang
                        </th>

                        <th>
                          Supplier
                        </th>

                        <th>
                          Jumlah
                        </th>

                        <th>
                          Harga Beli
                        </th>

                        <th>
                          Bukti Nota
                        </th>

                        <th>
                          Aksi
                        </th>

                      </tr>

                    </thead>


                    <tbody>


                      {currentData.length === 0 ? (

                        <tr>

                          <td
                            colSpan="9"
                            className="barang-masuk-empty"
                          >
                            Belum ada data barang masuk
                          </td>

                        </tr>


                      ) : (

                        currentData.map(
                          (
                            item,
                            index
                          ) => (

                            <tr
                              key={
                                item.id ??
                                index
                              }
                            >


                              <td>
                                {
                                  startIndex +
                                  index +
                                  1
                                }
                              </td>


                              <td>
                                {formatDate(
                                  item.tanggal
                                )}
                              </td>


                              <td>
                                {
                                  item.kodeBarang ||
                                  "-"
                                }
                              </td>


                              <td>
                                {
                                  item.namaBarang ||
                                  "-"
                                }
                              </td>


                              <td>
                                {
                                  item.supplier ||
                                  "-"
                                }
                              </td>


                              <td>
                                {
                                  item.jumlah
                                }
                              </td>


                              <td>
                                {formatRupiah(
                                  item.hargaBeli
                                )}
                              </td>


                              <td>


                                {item.buktiNota ? (

                                  <a
                                    href={
                                      item.buktiNota
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="barang-masuk-bukti-button"
                                  >
                                    <FileIcon />
                                  </a>

                                ) : (

                                  <span className="barang-masuk-bukti-button barang-masuk-bukti-empty">

                                    <FileIcon />

                                  </span>

                                )}


                              </td>


                              <td>

                                <div className="barang-masuk-action-buttons">


                                  {/* EDIT */}

                                  <button
                                    type="button"
                                    className="barang-masuk-edit-button"
                                    onClick={() =>
                                      openEditModal(
                                        item
                                      )
                                    }
                                  >

                                    <span>
                                      ✎
                                    </span>

                                    Edit

                                  </button>


                                  {/* HAPUS */}

                                  <button
                                    type="button"
                                    className="barang-masuk-delete-button"
                                    onClick={() =>
                                      handleDelete(
                                        item.id
                                      )
                                    }
                                  >

                                    <span>
                                      ▮
                                    </span>

                                    Hapus

                                  </button>


                                </div>

                              </td>


                            </tr>

                          )
                        )

                      )}


                    </tbody>


                  </table>

                )}


              </div>


              {/* =================================================
                  PAGINATION
              ================================================= */}

              <div className="barang-masuk-pagination-area">


                {/* JUMLAH DATA */}

                <div className="barang-masuk-show-data">

                  <span>
                    Tampilkan
                  </span>


                  <select
                    value={
                      itemsPerPage
                    }
                    onChange={(e) => {

                      setItemsPerPage(
                        Number(
                          e.target.value
                        )
                      );

                      setCurrentPage(
                        1
                      );

                    }}
                  >

                    <option value="5">
                      5
                    </option>

                    <option value="10">
                      10
                    </option>

                    <option value="15">
                      15
                    </option>

                    <option value="20">
                      20
                    </option>

                  </select>


                  <span>
                    data
                  </span>

                </div>


                {/* INFO PAGINATION */}

                <div className="barang-masuk-pagination-info">

                  Menampilkan{" "}

                  {firstNumber}

                  {" - "}

                  {lastNumber}

                  {" dari "}

                  {filteredData.length}

                  {" data"}

                </div>


                {/* BUTTON PAGINATION */}

                <div className="barang-masuk-pagination-buttons">


                  {/* PREVIOUS */}

                  <button
                    type="button"
                    disabled={
                      safeCurrentPage <=
                      1
                    }
                    onClick={() =>
                      setCurrentPage(
                        (previous) =>
                          Math.max(
                            1,
                            previous - 1
                          )
                      )
                    }
                  >
                    ‹
                  </button>


                  {/* NUMBER */}

                  {Array.from(
                    {
                      length:
                        totalPages,
                    },
                    (_, index) =>
                      index + 1
                  ).map(
                    (page) => (

                      <button
                        key={
                          page
                        }
                        type="button"
                        className={
                          page ===
                          safeCurrentPage
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setCurrentPage(
                            page
                          )
                        }
                      >
                        {page}
                      </button>

                    )
                  )}


                  {/* NEXT */}

                  <button
                    type="button"
                    disabled={
                      safeCurrentPage >=
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (previous) =>
                          Math.min(
                            totalPages,
                            previous + 1
                          )
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

<footer className="barang-masuk-footer">

  {/* FOOTER LEFT */}
  <div className="barang-masuk-footer-left">
    <img
      src={logoSejuta}
      alt="Sejuta Motor"
    />
  </div>

  {/* FOOTER CENTER */}
  <div className="barang-masuk-footer-center">
    <img
      src={logoMotor}
      alt="Motor"
    />
  </div>

  {/* FOOTER RIGHT */}
  <div className="barang-masuk-footer-title">
    <strong>
      Segar Jaya Utama
    </strong>

    <span>
      Motor
    </span>
  </div>

</footer>



      {/* =====================================================
          MODAL TAMBAH / EDIT
      ===================================================== */}

      {showModal && (

        <div
          className="barang-masuk-modal-overlay"
          onMouseDown={(e) => {

            if (
              e.target ===
              e.currentTarget
            ) {

              closeModal();

            }

          }}
        >


          <div className="barang-masuk-modal">


            {/* MODAL HEADER */}

            <div className="barang-masuk-modal-header">

              <h2>

                {editingData
                  ? "Edit Barang Masuk"
                  : "Tambah Barang Masuk"}

              </h2>


              <button
                type="button"
                className="barang-masuk-modal-close"
                onClick={
                  closeModal
                }
              >
                ×
              </button>

            </div>


            {/* FORM */}

            <form
              className="barang-masuk-form"
              onSubmit={
                handleSubmit
              }
            >


              {/* TANGGAL */}

              <div className="barang-masuk-form-group">

                <label>
                  Tanggal
                </label>

                <input
                  type="date"
                  name="tanggal"
                  value={
                    form.tanggal
                  }
                  onChange={
                    handleFormChange
                  }
                  required
                />

              </div>


              {/* KODE + NAMA */}

              <div className="barang-masuk-form-row">


                <div className="barang-masuk-form-group">

                  <label>
                    Kode Barang
                  </label>

                  <input
                    type="text"
                    name="kodeBarang"
                    value={
                      form.kodeBarang
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="Contoh: BRG001"
                    required
                  />

                </div>


                <div className="barang-masuk-form-group">

                  <label>
                    Nama Barang
                  </label>

                  <input
                    type="text"
                    name="namaBarang"
                    value={
                      form.namaBarang
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="Nama barang"
                    required
                  />

                </div>


              </div>


              {/* SUPPLIER */}

              <div className="barang-masuk-form-group">

                <label>
                  Supplier
                </label>

                <input
                  type="text"
                  name="supplier"
                  value={
                    form.supplier
                  }
                  onChange={
                    handleFormChange
                  }
                  placeholder="Nama supplier"
                  required
                />

              </div>


              {/* JUMLAH + HARGA */}

              <div className="barang-masuk-form-row">


                <div className="barang-masuk-form-group">

                  <label>
                    Jumlah
                  </label>

                  <input
                    type="number"
                    name="jumlah"
                    min="1"
                    value={
                      form.jumlah
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="Jumlah"
                    required
                  />

                </div>


                <div className="barang-masuk-form-group">

                  <label>
                    Harga Beli
                  </label>

                  <input
                    type="number"
                    name="hargaBeli"
                    min="0"
                    value={
                      form.hargaBeli
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="Harga beli"
                    required
                  />

                </div>


              </div>


              {/* BUKTI NOTA */}

              <div className="barang-masuk-form-group">

                <label>
                  Bukti Nota
                </label>

                <input
                  type="text"
                  name="buktiNota"
                  value={
                    form.buktiNota
                  }
                  onChange={
                    handleFormChange
                  }
                  placeholder="Link / lokasi bukti nota"
                />

              </div>


              {/* ACTION */}

              <div className="barang-masuk-form-actions">


                <button
                  type="button"
                  className="barang-masuk-cancel-button"
                  onClick={
                    closeModal
                  }
                >
                  Batal
                </button>


                <button
                  type="submit"
                  className="barang-masuk-save-button"
                >

                  {editingData
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


export default BarangMasuk;