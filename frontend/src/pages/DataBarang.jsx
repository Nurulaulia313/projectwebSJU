import { useEffect, useState } from "react";
import { getBarangs } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

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

import "./DataBarang.css";


function DataBarang() {

  // =====================================================
  // NAVIGASI
  // =====================================================

  const navigate = useNavigate();


  // =====================================================
  // STATE
  // =====================================================

  const [barangs, setBarangs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Dropdown profile
  const [profileOpen, setProfileOpen] = useState(false);


  // =====================================================
  // DATA PROFILE / ROLE
  // =====================================================

  /*
    Role dibaca dari localStorage.

    Contoh nilai:
    "admin"
    "pemilik"
    "kasir"

    Nantinya nilai ini bisa diisi ketika user
    berhasil login.
  */

  const getUserRole = () => {

    const role =
      localStorage.getItem("role") ||
      localStorage.getItem("userRole") ||
      "admin";

    return role;

  };


  const getUserName = () => {

    return (
      localStorage.getItem("name") ||
      localStorage.getItem("nama") ||
      localStorage.getItem("username") ||
      "Segar Jaya Utama"
    );

  };


  const formatRole = (role) => {

    if (!role) {
      return "Admin";
    }

    const roleLower =
      String(role).toLowerCase().trim();


    if (roleLower === "admin") {
      return "Admin";
    }

    if (roleLower === "pemilik") {
      return "Pemilik";
    }

    if (roleLower === "kasir") {
      return "Kasir";
    }

    if (roleLower === "owner") {
      return "Pemilik";
    }

    return (
      role.charAt(0).toUpperCase() +
      role.slice(1)
    );

  };


  const [userRole, setUserRole] = useState(
    formatRole(getUserRole())
  );

  const [userName, setUserName] = useState(
    getUserName()
  );


  // =====================================================
  // UPDATE DATA PROFILE
  // =====================================================

  useEffect(() => {

    const updateProfile = () => {

      setUserRole(
        formatRole(getUserRole())
      );

      setUserName(
        getUserName()
      );

    };


    updateProfile();


    /*
      Apabila localStorage berubah,
      profile akan diperbarui.
    */

    window.addEventListener(
      "storage",
      updateProfile
    );


    return () => {

      window.removeEventListener(
        "storage",
        updateProfile
      );

    };

  }, []);


  // =====================================================
  // PROFILE DROPDOWN
  // =====================================================

  const toggleProfile = () => {

    setProfileOpen(
      (prev) => !prev
    );

  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    const konfirmasi =
      window.confirm(
        "Apakah Anda yakin ingin keluar dari sistem?"
      );


    if (!konfirmasi) {
      return;
    }


    /*
      Hapus data login.
    */

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("userRole");
    localStorage.removeItem("name");
    localStorage.removeItem("nama");
    localStorage.removeItem("username");


    setProfileOpen(false);


    navigate("/login");

  };


  // =====================================================
  // STATE DATA BARANG
  // =====================================================

  useEffect(() => {

    fetchDataBarang();

  }, []);


  // =====================================================
  // AMBIL DATA BARANG
  // =====================================================

  const fetchDataBarang = async () => {

    try {

      const data = await getBarangs();

      setBarangs(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Gagal mengambil data barang:",
        error
      );

      setBarangs([]);

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredBarangs = barangs.filter((barang) => {

    const keyword =
      search
        .toLowerCase()
        .trim();


    const kodeBarang =
      String(
        barang.kode_barang ??
        barang.kodeBarang ??
        ""
      ).toLowerCase();


    const namaBarang =
      String(
        barang.nama_barang ??
        barang.namaBarang ??
        ""
      ).toLowerCase();


    const namaSupplier =
      String(
        barang.supplier?.nama_supplier ??
        barang.supplier?.namaSupplier ??
        barang.nama_supplier ??
        ""
      ).toLowerCase();


    return (
      kodeBarang.includes(keyword) ||
      namaBarang.includes(keyword) ||
      namaSupplier.includes(keyword)
    );

  });


  // =====================================================
  // PAGINATION
  // =====================================================

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;


  const totalPages =
    Math.ceil(
      filteredBarangs.length /
      itemsPerPage
    );


  const startIndex =
    (currentPage - 1) *
    itemsPerPage;


  const currentBarangs =
    filteredBarangs.slice(
      startIndex,
      startIndex + itemsPerPage
    );


  // =====================================================
  // SEARCH HANDLER
  // =====================================================

  const handleSearch = (e) => {

    setSearch(
      e.target.value
    );

    setCurrentPage(1);

  };


  // =====================================================
  // PAGINATION HANDLER
  // =====================================================

  const handlePrevious = () => {

    if (currentPage > 1) {

      setCurrentPage(
        currentPage - 1
      );

    }

  };


  const handleNext = () => {

    if (currentPage < totalPages) {

      setCurrentPage(
        currentPage + 1
      );

    }

  };


  // =====================================================
  // MENU SIDEBAR
  // =====================================================

  const menuItems = [

    {
      name: "Dashboard",
      icon: logoDashboard,
      path: "/",
    },

    {
      name: "Data Barang",
      icon: logoDataBarang,
      path: "/data-barang",
    },

    {
      name: "Supplier",
      icon: logoSupplier,
      path: "/supplier",
    },

    {
      name: "Barang Masuk",
      icon: logoBarangMasuk,
      path: "/barang-masuk",
    },

    {
      name: "Barang Keluar",
      icon: logoBarangKeluar,
      path: "/barang-keluar",
    },

    {
      name: "Kasir/Penjualan",
      icon: logoKasir,
      path: "/kasir",
    },

    {
      name: "Return Barang",
      icon: logoReturn,
      path: "/return-barang",
    },

    {
      name: "Transaksi",
      icon: logoTransaksi,
      path: "/transaksi",
    },

    {
      name: "Laporan",
      icon: logoLaporan,
      path: "/laporan",
    },

    {
      name: "Notifikasi",
      icon: logoNotifikasi,
      path: "/notifikasi",
    },

    {
      name: "Pengaturan",
      icon: logoPengaturan,
      path: "/pengaturan",
    },

  ];


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="data-barang-page">


      {/* =====================================================
          APP LAYOUT
      ===================================================== */}

      <div className="data-barang-app-layout">


        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <aside className="data-barang-sidebar">


          {/* =================================================
              BRAND
          ================================================= */}

          <div className="data-barang-sidebar-brand">

            <img
              src={logoMotor}
              alt="Logo Motor"
              className="data-barang-sidebar-motor-logo"
            />


            <div className="data-barang-sidebar-brand-text">

              <h2>
                Segar Jaya Utama
              </h2>

              <span>
                Bengkel Motor
              </span>

            </div>

          </div>


          {/* GARIS */}

          <div className="data-barang-sidebar-line"></div>


          {/* =================================================
              MENU
          ================================================= */}

          <nav className="data-barang-sidebar-menu">

            {menuItems.map((item) => (

              <button
                type="button"
                key={item.name}
                className={`data-barang-menu-item ${
                  item.path === "/data-barang"
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  navigate(item.path);
                }}
              >

                <img
                  src={item.icon}
                  alt={item.name}
                />

                <span>
                  {item.name}
                </span>

              </button>

            ))}

          </nav>


          {/* =================================================
              LOGO BAWAH SIDEBAR
          ================================================= */}

          <div className="data-barang-sidebar-bottom-logo">

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

            <div className="data-barang-bottom-line"></div>

          </div>


        </aside>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main className="data-barang-main-content">


          {/* =================================================
              HEADER ATAS
          ================================================= */}

          <header className="data-barang-top-header">


            {/* JUDUL */}

            <h1>
              Data Barang
            </h1>


            {/* HEADER KANAN */}

            <div className="data-barang-header-right">


              {/* =================================================
                  NOTIFIKASI
              ================================================= */}

              <button
                className="data-barang-notification-button"
                type="button"
                title="Notifikasi"
                onClick={() =>
                  navigate("/notifikasi")
                }
              >

                <svg
                  viewBox="0 0 24 24"
                  className="data-barang-notification-icon"
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

              </button>


              {/* =================================================
                  PROFILE WRAPPER
              ================================================= */}

              <div className="data-barang-profile-wrapper">


                {/* =================================================
                    PROFILE
                ================================================= */}

                <button
                  type="button"
                  className="data-barang-profile-area"
                  onClick={toggleProfile}
                >

                  <div className="data-barang-profile-icon">

                    <svg viewBox="0 0 24 24">

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


                  <div className="data-barang-profile-info">

                    <strong>
                      {userRole}
                    </strong>

                    <span>
                      {userName}
                    </span>

                  </div>


                  <span className="data-barang-profile-arrow">
                    ▼
                  </span>

                </button>


                {/* =================================================
                    DROPDOWN PROFILE
                ================================================= */}

                {profileOpen && (

                  <div className="data-barang-profile-dropdown">


                    {/* PROFIL */}

                    <button
                      type="button"
                      onClick={() => {

                        setProfileOpen(false);

                        navigate("/profil");

                      }}
                    >
                      Profil
                    </button>


                    {/* PENGATURAN */}

                    <button
                      type="button"
                      onClick={() => {

                        setProfileOpen(false);

                        navigate("/pengaturan");

                      }}
                    >
                      Pengaturan
                    </button>


                    {/* KELUAR */}

                    <button
                      type="button"
                      className="data-barang-logout-button"
                      onClick={handleLogout}
                    >
                      Keluar
                    </button>


                  </div>

                )}


              </div>


            </div>

          </header>


          {/* =====================================================
              AREA CONTENT
          ===================================================== */}

          <section className="data-barang-content-area">


            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="data-barang-search-area">

              <div className="data-barang-search-box">


                <svg
                  className="data-barang-search-icon"
                  viewBox="0 0 24 24"
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
                  onChange={handleSearch}
                  placeholder="Cari nama barang atau kode barang....."
                />

              </div>

            </div>


            {/* =================================================
                TABLE CONTAINER
            ================================================= */}

            <div className="data-barang-table-container">


              <div className="data-barang-table-title">

                <h2>
                  Data Barang
                </h2>

              </div>


              {/* =================================================
                  LOADING
              ================================================= */}

              {loading ? (

                <p className="data-barang-loading">
                  Memuat data...
                </p>

              ) : (

                <div className="data-barang-table-wrapper">

                  <table className="data-barang-table">

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
                          Supplier
                        </th>

                        <th>
                          Stok
                        </th>

                        <th>
                          Batas Minimum
                        </th>

                        <th>
                          Harga Beli
                        </th>

                        <th>
                          Harga Jual
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {currentBarangs.length === 0 ? (

                        <tr>

                          <td
                            colSpan="8"
                            className="data-barang-empty"
                          >
                            Belum ada data barang
                          </td>

                        </tr>

                      ) : (

                        currentBarangs.map(
                          (barang, index) => (

                            <tr
                              key={
                                barang.id ||
                                barang._id ||
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


                              <td>
                                {
                                  barang.supplier
                                    ?.nama_supplier ??
                                  barang.supplier
                                    ?.namaSupplier ??
                                  barang.nama_supplier ??
                                  "-"
                                }
                              </td>


                              <td>
                                {
                                  barang.stok ??
                                  barang.jumlah ??
                                  0
                                }
                              </td>


                              <td>
                                {
                                  barang.batas_minimum ??
                                  barang.batasMinimum ??
                                  0
                                }
                              </td>


                              <td>
                                Rp{" "}
                                {Number(
                                  barang.harga_beli ??
                                  barang.hargaBeli ??
                                  0
                                ).toLocaleString(
                                  "id-ID"
                                )}
                              </td>


                              <td>
                                Rp{" "}
                                {Number(
                                  barang.harga_jual ??
                                  barang.hargaJual ??
                                  0
                                ).toLocaleString(
                                  "id-ID"
                                )}
                              </td>

                            </tr>

                          )
                        )

                      )}

                    </tbody>

                  </table>

                </div>

              )}


              {/* =================================================
                  PAGINATION
              ================================================= */}

              {!loading &&
                filteredBarangs.length > 0 && (

                  <div className="data-barang-pagination-area">


                    {/* TAMPILKAN DATA */}

                    <div className="data-barang-show-data">

                      <span>
                        Tampilkan
                      </span>


                      <select
                        value={itemsPerPage}
                        disabled
                        aria-label="Jumlah data"
                      >

                        <option value="5">
                          5
                        </option>

                      </select>


                      <span>
                        data
                      </span>

                    </div>


                    {/* PAGINATION */}

                    <div className="data-barang-pagination-buttons">


                      {/* PREVIOUS */}

                      <button
                        type="button"
                        className="data-barang-page-arrow"
                        onClick={handlePrevious}
                        disabled={
                          currentPage === 1
                        }
                      >
                        ‹
                      </button>


                      {/* NOMOR HALAMAN */}

                      {Array.from(
                        {
                          length: totalPages,
                        },
                        (_, index) =>
                          index + 1
                      ).map((page) => (

                        <button
                          type="button"
                          key={page}
                          className={`data-barang-page-number ${
                            currentPage === page
                              ? "active-page"
                              : ""
                          }`}
                          onClick={() =>
                            setCurrentPage(
                              page
                            )
                          }
                        >
                          {page}
                        </button>

                      ))}


                      {/* NEXT */}

                      <button
                        type="button"
                        className="data-barang-page-arrow"
                        onClick={handleNext}
                        disabled={
                          currentPage ===
                          totalPages
                        }
                      >
                        ›
                      </button>


                    </div>

                  </div>

                )}

            </div>

          </section>


        </main>


      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="data-barang-footer">


        {/* LOGO SEJUTA */}

        <img
          src={logoSejuta}
          alt="Sejuta Motor"
          className="data-barang-footer-logo"
        />


        {/* LOGO MOTOR */}

        <img
          src={logoMotor}
          alt="Motor"
          className="data-barang-footer-motor"
        />


        {/* NAMA BENGKEL */}

        <div className="data-barang-footer-title">

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


export default DataBarang;