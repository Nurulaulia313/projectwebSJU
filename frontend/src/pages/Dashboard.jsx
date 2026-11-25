import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBarangs } from "../services/api";

import "./Dashboard.css";

import bannerBengkel from "../assets/banner-bengkel.jpg";

import logoSejuta from "../assets/logo-sejuta.png";
import logoMotor from "../assets/logo-motor.png";
import logoBengkel from "../assets/logo-bengkel.png";

import logoDashboard from "../assets/logo-dashboard.png";
import logoDataBarang from "../assets/logo-databarang.png";
import logoSupplier from "../assets/logo-supplier.png";
import logoBarangMasuk from "../assets/logo-barangmasuk.png";
import logoBarangKeluar from "../assets/logo-barangkeluar.png";
import logoKasir from "../assets/logo-kasir.png";
import logoReturn from "../assets/logo-return.png";
import logoTransaksi from "../assets/logo-transaksi.png";
import logoLaporan from "../assets/logo-laporan.png";
import logoNotifikasi from "../assets/logo-notifikasi.png";
import logoPengaturan from "../assets/logo-pengaturan.png";

import logoTotalBarang from "../assets/logo-totalbarang.png";
import logoStokMenipis from "../assets/logo-stokmenipis.png";
import logoBarangMasuk1 from "../assets/logo-barangmasuk1.png";
import logoBarangKeluar1 from "../assets/logo-barangkeluar1.png";


function Dashboard() {

  /* =====================================================
     STATE
  ===================================================== */

  const [barangs, setBarangs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [profileOpen, setProfileOpen] = useState(false);

  const [search, setSearch] = useState("");


  /* =====================================================
     AMBIL DATA BARANG
  ===================================================== */

  useEffect(() => {
    fetchDashboardData();
  }, []);


  const fetchDashboardData = async () => {

    try {

      const data = await getBarangs();

      setBarangs(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Gagal mengambil data dashboard:",
        error
      );

      setBarangs([]);

    } finally {

      setLoading(false);

    }

  };


  /* =====================================================
     TOTAL BARANG
  ===================================================== */

  const totalBarang = barangs.length;


  /* =====================================================
     STOK MENIPIS
  ===================================================== */

  const stokMenipis = barangs.filter((barang) => {

    const stok = Number(
      barang.stok ??
      barang.jumlah ??
      0
    );

    const batasMinimum = Number(
      barang.batas_minimum ??
      0
    );

    return stok <= batasMinimum;

  });


  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredBarangs = barangs.filter((barang) => {

    const keyword = search
      .toLowerCase()
      .trim();

    if (!keyword) {
      return true;
    }

    const kodeBarang = String(
      barang.kode_barang ??
      barang.kodeBarang ??
      ""
    ).toLowerCase();

    const namaBarang = String(
      barang.nama_barang ??
      barang.namaBarang ??
      ""
    ).toLowerCase();

    return (
      kodeBarang.includes(keyword) ||
      namaBarang.includes(keyword)
    );

  });


  /* =====================================================
     MENU SIDEBAR
  ===================================================== */

  const menuItems = [

    {
      name: "Dashboard",
      icon: logoDashboard,
      path: "/",
      active: true,
    },

    {
      name: "Data Barang",
      icon: logoDataBarang,
      path: "/data-barang",
      active: false,
    },

    {
      name: "Supplier",
      icon: logoSupplier,
      path: "/supplier",
      active: false,
    },

    {
      name: "Barang Masuk",
      icon: logoBarangMasuk,
      path: "/barang-masuk",
      active: false,
    },

    {
      name: "Barang Keluar",
      icon: logoBarangKeluar,
      path: "/barang-keluar",
      active: false,
    },

    {
      name: "Kasir/Penjualan",
      icon: logoKasir,
      path: "/kasir",
      active: false,
    },

    {
      name: "Return Barang",
      icon: logoReturn,
      path: "/return-barang",
      active: false,
    },

    {
      name: "Transaksi",
      icon: logoTransaksi,
      path: "/transaksi",
      active: false,
    },

    {
      name: "Laporan",
      icon: logoLaporan,
      path: "/laporan",
      active: false,
    },

    {
      name: "Notifikasi",
      icon: logoNotifikasi,
      path: "/notifikasi",
      active: false,
    },

    {
      name: "Pengaturan",
      icon: logoPengaturan,
      path: "/pengaturan",
      active: false,
    },

  ];


  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <div className="dashboard-page">


      {/* =================================================
          APP LAYOUT
      ================================================= */}

      <div className="dashboard-app-layout">


        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="dashboard-sidebar">


          {/* =================================================
              BRAND
          ================================================= */}

          <div className="dashboard-sidebar-brand">

            <img
              src={logoMotor}
              alt="Logo Motor"
              className="dashboard-sidebar-motor-logo"
            />

            <div className="dashboard-sidebar-brand-text">

              <h2>
                Segar Jaya Utama
              </h2>

              <span>
                Bengkel Motor
              </span>

            </div>

          </div>


          {/* =================================================
              GARIS DI BAWAH BRAND
          ================================================= */}

          <div className="dashboard-sidebar-line"></div>


          {/* =================================================
              MENU SIDEBAR
          ================================================= */}

          <nav className="dashboard-sidebar-menu">

            {menuItems.map((item) => (

              <Link
                to={item.path}
                key={item.name}
                className={
                  `dashboard-menu-item ${
                    item.active
                      ? "active"
                      : ""
                  }`
                }
              >

                <img
                  src={item.icon}
                  alt={item.name}
                />

                <span>
                  {item.name}
                </span>

              </Link>

            ))}

          </nav>


          {/* =================================================
              LOGO BAGIAN BAWAH SIDEBAR
          ================================================= */}

          <div className="dashboard-sidebar-bottom-logo">

            <img
              src={logoBengkel}
              alt="Logo Bengkel"
            />

            <p>
              Motor Sehat
            </p>

            <small>
              Perjalanan lebih lancar
            </small>

            <div className="dashboard-bottom-line"></div>

          </div>

        </aside>


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <main className="dashboard-main-content">


          {/* =================================================
              HEADER
          ================================================= */}

          <header className="dashboard-top-header">


            {/* HEADER KIRI */}

            <div className="dashboard-header-left">

              <h1>
                Dashboard
              </h1>


              {/* SEARCH */}

              <div className="dashboard-search">

                <svg
                  viewBox="0 0 24 24"
                  className="dashboard-search-icon"
                >

                  <circle
                    cx="11"
                    cy="11"
                    r="6.5"
                  />

                  <line
                    x1="16"
                    y1="16"
                    x2="21"
                    y2="21"
                  />

                </svg>


                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Cari sesuatu"
                />

              </div>

            </div>


            {/* =================================================
                HEADER KANAN
            ================================================= */}

            <div className="dashboard-header-right">


              {/* NOTIFIKASI */}

              <Link
                to="/notifikasi"
                className="dashboard-notification-button"
                title="Notifikasi"
              >

                <svg
                  viewBox="0 0 24 24"
                  className="dashboard-notification-icon"
                >

                  <path
                    d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                    fill="currentColor"
                  />

                  <path
                    d="M10 21h4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                </svg>

              </Link>


              {/* PROFILE */}

              <div className="dashboard-profile-wrapper">

                <button
                  type="button"
                  className="dashboard-profile-area"
                  onClick={() =>
                    setProfileOpen(
                      (prev) => !prev
                    )
                  }
                >

                  <div className="dashboard-profile-icon">

                    <svg
                      viewBox="0 0 24 24"
                    >

                      <circle
                        cx="12"
                        cy="8"
                        r="3.2"
                      />

                      <path
                        d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6"
                      />

                    </svg>

                  </div>


                  <div className="dashboard-profile-info">

                    <strong>
                      Admin
                    </strong>

                    <span>
                      Segar Jaya Utama
                    </span>

                  </div>


                  <span className="dashboard-profile-arrow">
                    ▼
                  </span>

                </button>


                {/* =================================================
                    DROPDOWN PROFILE
                ================================================= */}

                {profileOpen && (

                  <div className="dashboard-profile-dropdown">

                    <Link to="/profil">
                      Profil
                    </Link>

                    <Link to="/pengaturan">
                      Pengaturan
                    </Link>

                    <button
                      type="button"
                      className="dashboard-logout-button"
                    >
                      Keluar
                    </button>

                  </div>

                )}

              </div>

            </div>

          </header>


          {/* =================================================
              DASHBOARD CONTENT
          ================================================= */}

          <section className="dashboard-content">


            {/* =================================================
                WELCOME
            ================================================= */}

            <div className="dashboard-welcome">

              <div>

                <h2>
                  Selamat Datang di Sistem Inventaris
                </h2>

                <p>
                  Kelola inventaris Bengkel Segar Jaya Utama
                  dengan mudah dan cepat.
                </p>

              </div>

            </div>

{/* =================================================
    STATISTIC CARDS
================================================= */}

<div className="dashboard-cards">


  {/* TOTAL BARANG */}

  <div className="dashboard-card">

    <div className="dashboard-card-icon dashboard-card-icon-total">

      <img
        src={logoTotalBarang}
        alt="Total Barang"
      />

    </div>

    <div className="dashboard-card-information">

      <h3>
        Total Barang
      </h3>

      <strong>
        {loading
          ? "0"
          : totalBarang}
      </strong>

      <span>
        Jenis Barang
      </span>

    </div>

  </div>


  {/* STOK MENIPIS */}

  <div className="dashboard-card">

    <div className="dashboard-card-icon dashboard-card-icon-stok">

      <img
        src={logoStokMenipis}
        alt="Stok Menipis"
      />

    </div>

    <div className="dashboard-card-information">

      <h3>
        Stok Menipis
      </h3>

      <strong>
        {loading
          ? "0"
          : stokMenipis.length}
      </strong>

      <span>
        Barang perlu dipesan
      </span>

    </div>

  </div>


  {/* BARANG MASUK */}

  <div className="dashboard-card">

    <div className="dashboard-card-icon dashboard-card-icon-masuk">

      <img
        src={logoBarangMasuk1}
        alt="Barang Masuk"
      />

    </div>

    <div className="dashboard-card-information">

      <h3>
        Barang Masuk
      </h3>

      <strong>
        0
      </strong>

      <span>
        Barang masuk
      </span>

    </div>

  </div>


  {/* BARANG KELUAR */}

  <div className="dashboard-card">

    <div className="dashboard-card-icon dashboard-card-icon-keluar">

      <img
        src={logoBarangKeluar1}
        alt="Barang Keluar"
      />

    </div>

    <div className="dashboard-card-information">

      <h3>
        Barang Keluar
      </h3>

      <strong>
        0
      </strong>

      <span>
        Barang keluar
      </span>

    </div>

  </div>


</div>


            {/* =================================================
                ROW TENGAH
            ================================================= */}

            <div className="dashboard-middle">


              {/* BANNER */}

              <div
                className="dashboard-banner"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      rgba(0, 0, 0, 0.28),
                      rgba(0, 0, 0, 0.28)
                    ),
                    url(${bannerBengkel})
                  `,
                }}
              >

                <div className="dashboard-banner-overlay">

                  <h2>
                    Segar Jaya Utama
                  </h2>

                  <p className="dashboard-banner-subtitle">
                    Bengkel Motor
                  </p>

                  <div className="dashboard-banner-line"></div>

                  <p>
                    Sistem Inventaris Bengkel
                    <br />
                    Segar Jaya Utama
                  </p>

                </div>

              </div>


              {/* =================================================
                  PANEL STOK MENIPIS
              ================================================= */}

              <div className="dashboard-panel">

                <div className="dashboard-panel-header">

                  <div>

                    <h2>
                      Barang Stok Menipis
                    </h2>

                    <span>
                      Daftar barang yang perlu diperhatikan
                    </span>

                  </div>

                  <Link
                    to="/data-barang"
                    className="dashboard-view-all-button"
                  >
                    Lihat Semua
                  </Link>

                </div>


                <div className="dashboard-table-wrapper">

                  <table className="dashboard-table">

                    <thead>

                      <tr>

                        <th>
                          No
                        </th>

                        <th>
                          Kode Barang
                        </th>

                        <th>
                          Nama Barang
                        </th>

                        <th>
                          Stok
                        </th>

                        <th>
                          Batas
                        </th>

                        <th>
                          Aksi
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {stokMenipis
                        .slice(0, 3)
                        .map(
                          (barang, index) => (

                            <tr
                              key={
                                barang.id ??
                                barang._id ??
                                index
                              }
                            >

                              <td>
                                {index + 1}
                              </td>

                              <td>
                                {
                                  barang.kode_barang ??
                                  barang.kodeBarang ??
                                  "-"
                                }
                              </td>

                              <td>
                                {
                                  barang.nama_barang ??
                                  barang.namaBarang ??
                                  "-"
                                }
                              </td>

                              <td className="dashboard-stock-danger">
                                {
                                  barang.stok ??
                                  barang.jumlah ??
                                  0
                                }
                              </td>

                              <td>
                                {
                                  barang.batas_minimum ??
                                  0
                                }
                              </td>

                              <td>

                                <Link
                                  to="/barang-masuk"
                                  className="dashboard-order-button"
                                >
                                  Tambah Stok
                                </Link>

                              </td>

                            </tr>

                          )
                        )}


                      {!loading &&
                        stokMenipis.length === 0 && (

                          <tr>

                            <td
                              colSpan="6"
                              className="dashboard-empty"
                            >
                              Tidak ada stok menipis
                            </td>

                          </tr>

                        )}


                      {loading && (

                        <tr>

                          <td
                            colSpan="6"
                            className="dashboard-empty"
                          >
                            Memuat data...
                          </td>

                        </tr>

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>


            {/* =================================================
                ROW BAWAH
            ================================================= */}

            <div className="dashboard-lower">


              {/* TRANSAKSI */}

              <div className="dashboard-panel dashboard-transaction-panel">

                <div className="dashboard-panel-header dashboard-panel-header-simple">

                  <div>

                    <h2>
                      Transaksi Hari Ini
                    </h2>

                    <span>
                      Aktivitas transaksi hari ini
                    </span>

                  </div>

                  <Link
                    to="/transaksi"
                    className="dashboard-small-link"
                  >
                    Lihat Semua
                  </Link>

                </div>


                <div className="dashboard-table-wrapper">

                  <table className="dashboard-table">

                    <thead>

                      <tr>

                        <th>
                          No
                        </th>

                        <th>
                          Kode Barang
                        </th>

                        <th>
                          Nama Barang
                        </th>

                        <th>
                          Total
                        </th>

                        <th>
                          Jenis
                        </th>

                        <th>
                          Aksi
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {[1, 2, 3].map(
                        (item) => (

                          <tr
                            key={item}
                          >

                            <td>
                              {item}
                            </td>

                            <td>
                              -
                            </td>

                            <td>
                              {item === 1
                                ? "Belum ada transaksi"
                                : "-"}
                            </td>

                            <td>
                              -
                            </td>

                            <td>
                              -
                            </td>

                            <td>

                              <Link
                                to="/transaksi"
                                className="dashboard-detail-button"
                              >
                                Detail
                              </Link>

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </div>


              {/* BARANG TERLARIS */}

              <div className="dashboard-panel">

                <div className="dashboard-panel-header dashboard-panel-header-simple">

                  <div>

                    <h2>
                      Barang Terlaris
                    </h2>

                    <span>
                      Barang dengan penjualan terbanyak
                    </span>

                  </div>

                </div>


                <div className="dashboard-table-wrapper">

                  <table className="dashboard-table">

                    <thead>

                      <tr>

                        <th>
                          No
                        </th>

                        <th>
                          Nama Barang
                        </th>

                        <th>
                          Jumlah Terjual
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {[1, 2, 3].map(
                        (item) => (

                          <tr
                            key={item}
                          >

                            <td>
                              {item}
                            </td>

                            <td>
                              -
                            </td>

                            <td>
                              0
                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>


            {/* =================================================
                LAPORAN PENJUALAN
            ================================================= */}

            <div className="dashboard-sales-report">

              <div className="dashboard-sales-report-header">

                <div>

                  <h2>
                    Laporan Penjualan
                  </h2>

                  <p>
                    Lihat dan cetak laporan penjualan berdasarkan
                    periode tertentu.
                  </p>

                </div>

        

              </div>


              <div className="dashboard-sales-report-content">

                <div className="dashboard-report-icon">
                  ▤
                </div>

                <div className="dashboard-report-text">

                  <strong>
                    Lihat laporan penjualan
                  </strong>

                  <span>
                    Pilih periode untuk melihat data penjualan
                  </span>

                </div>

                <Link
                  to="/laporan"
                  className="dashboard-report-arrow"
                >
                  →
                </Link>

              </div>

            </div>


          </section>

        </main>

      </div>


      {/* =====================================================
          FOOTER FULL WIDTH
          FOOTER DILETAKKAN DI LUAR APP LAYOUT
          AGAR DARI PALING KIRI SAMPAI PALING KANAN
      ===================================================== */}

      <footer className="dashboard-footer">

        <img
          src={logoSejuta}
          alt="Sejuta Motor"
          className="dashboard-footer-logo"
        />

        <img
          src={logoMotor}
          alt="Motor"
          className="dashboard-footer-motor"
        />

        <div className="dashboard-footer-title">

          <strong>
            Segar Jaya Utama
          </strong>

          <span>
            Motor
          </span>

        </div>

      </footer>


    </div>

  );
}


export default Dashboard;