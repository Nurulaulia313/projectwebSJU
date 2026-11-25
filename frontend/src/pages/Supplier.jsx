import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
} from "../services/api";

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

import "./Supplier.css";


function Supplier() {

  const navigate = useNavigate();


  // =====================================================
  // STATE
  // =====================================================

  const [suppliers, setSuppliers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [profileOpen, setProfileOpen] = useState(false);


  // =====================================================
  // MODAL
  // =====================================================

  const [modalOpen, setModalOpen] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [selectedSupplier, setSelectedSupplier] = useState(null);


  // =====================================================
  // FORM
  // =====================================================

  const [formData, setFormData] = useState({
    nama_supplier: "",
    no_telepon: "",
    alamat: "",
    jatuh_tempo: ""
  });


  // =====================================================
  // PAGINATION
  // =====================================================

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;


  // =====================================================
  // GET DATA SUPPLIER
  // =====================================================

  useEffect(() => {
    fetchSuppliers();
  }, []);


  const fetchSuppliers = async () => {

    try {

      setLoading(true);

      const data = await getSuppliers();

      setSuppliers(
        Array.isArray(data)
          ? data
          : data?.data ?? []
      );

    } catch (error) {

      console.error(
        "Gagal mengambil data supplier:",
        error
      );

      setSuppliers([]);

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredSuppliers = suppliers.filter((supplier) => {

    const keyword = search
      .toLowerCase()
      .trim();

    if (!keyword) {
      return true;
    }

    const namaSupplier = String(
      supplier.nama_supplier ??
      supplier.namaSupplier ??
      ""
    ).toLowerCase();

    const noTelepon = String(
      supplier.no_telepon ??
      supplier.noTelepon ??
      supplier.telepon ??
      ""
    ).toLowerCase();

    const alamat = String(
      supplier.alamat ??
      ""
    ).toLowerCase();

    return (
      namaSupplier.includes(keyword) ||
      noTelepon.includes(keyword) ||
      alamat.includes(keyword)
    );

  });


  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredSuppliers.length /
      itemsPerPage
    )
  );


  const startIndex =
    (currentPage - 1) *
    itemsPerPage;


  const currentSuppliers =
    filteredSuppliers.slice(
      startIndex,
      startIndex + itemsPerPage
    );


  // =====================================================
  // SEARCH HANDLER
  // =====================================================

  const handleSearch = (e) => {

    setSearch(e.target.value);

    setCurrentPage(1);

  };


  // =====================================================
  // FORM HANDLER
  // =====================================================

  const handleInputChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };


  // =====================================================
  // TAMBAH SUPPLIER
  // =====================================================

  const handleAddSupplier = () => {

    setEditMode(false);

    setSelectedSupplier(null);

    setFormData({
      nama_supplier: "",
      no_telepon: "",
      alamat: "",
      jatuh_tempo: ""
    });

    setModalOpen(true);

  };


  // =====================================================
  // EDIT SUPPLIER
  // =====================================================

  const handleEditSupplier = (supplier) => {

    setEditMode(true);

    setSelectedSupplier(supplier);

    setFormData({

      nama_supplier:
        supplier.nama_supplier ??
        supplier.namaSupplier ??
        "",

      no_telepon:
        supplier.no_telepon ??
        supplier.noTelepon ??
        supplier.telepon ??
        "",

      alamat:
        supplier.alamat ??
        "",

      jatuh_tempo:
        supplier.jatuh_tempo ??
        supplier.jatuhTempo ??
        ""

    });

    setModalOpen(true);

  };


  // =====================================================
  // TUTUP MODAL
  // =====================================================

  const closeModal = () => {

    setModalOpen(false);

    setEditMode(false);

    setSelectedSupplier(null);

  };


  // =====================================================
  // SIMPAN SUPPLIER
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.nama_supplier.trim()) {

      alert(
        "Nama supplier wajib diisi."
      );

      return;

    }

    try {

      if (editMode) {

        await updateSupplier(
          selectedSupplier.id ??
          selectedSupplier._id,
          formData
        );

        alert(
          "Data supplier berhasil diubah."
        );

      } else {

        await createSupplier(formData);

        alert(
          "Supplier berhasil ditambahkan."
        );

      }

      closeModal();

      fetchSuppliers();

    } catch (error) {

      console.error(error);

      alert(
        error.message ||
        "Terjadi kesalahan."
      );

    }

  };


  // =====================================================
  // HAPUS SUPPLIER
  // =====================================================

  const handleDeleteSupplier = async (supplier) => {

    const supplierId =
      supplier.id ??
      supplier._id;

    const namaSupplier =
      supplier.nama_supplier ??
      supplier.namaSupplier ??
      "supplier";

    const confirmDelete =
      window.confirm(
        `Apakah Anda yakin ingin menghapus ${namaSupplier}?`
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteSupplier(supplierId);

      alert(
        "Supplier berhasil dihapus."
      );

      fetchSuppliers();

    } catch (error) {

      console.error(error);

      alert(
        error.message ||
        "Gagal menghapus supplier."
      );

    }

  };


  // =====================================================
  // PAGINATION
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
      path: "/"
    },

    {
      name: "Data Barang",
      icon: logoDataBarang,
      path: "/data-barang"
    },

    {
      name: "Supplier",
      icon: logoSupplier,
      path: "/supplier"
    },

    {
      name: "Barang Masuk",
      icon: logoBarangMasuk,
      path: "/barang-masuk"
    },

    {
      name: "Barang Keluar",
      icon: logoBarangKeluar,
      path: "/barang-keluar"
    },

    {
      name: "Kasir/Penjualan",
      icon: logoKasir,
      path: "/kasir"
    },

    {
      name: "Return Barang",
      icon: logoReturn,
      path: "/return-barang"
    },

    {
      name: "Transaksi",
      icon: logoTransaksi,
      path: "/transaksi"
    },

    {
      name: "Laporan",
      icon: logoLaporan,
      path: "/laporan"
    },

    {
      name: "Notifikasi",
      icon: logoNotifikasi,
      path: "/notifikasi"
    },

    {
      name: "Pengaturan",
      icon: logoPengaturan,
      path: "/pengaturan"
    }

  ];


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="supplier-page">


      {/* =================================================
          APP
      ================================================= */}

      <div className="supplier-app-layout">


        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="supplier-sidebar">


          {/* BRAND */}

          <div className="supplier-sidebar-brand">

            <img
              src={logoMotor}
              alt="Logo Motor"
              className="supplier-sidebar-motor-logo"
            />

            <div className="supplier-sidebar-brand-text">

              <h2>
                Segar Jaya Utama
              </h2>

              <span>
                Bengkel Motor
              </span>

            </div>

          </div>


          {/* GARIS */}

          <div className="supplier-sidebar-line"></div>


          {/* MENU */}

          <nav className="supplier-sidebar-menu">

            {menuItems.map((item) => (

              <button
                type="button"
                key={item.name}
                className={`supplier-menu-item ${
                  item.path === "/supplier"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  navigate(item.path)
                }
              >

                <img
                  src={item.icon}
                  alt=""
                />

                <span>
                  {item.name}
                </span>

              </button>

            ))}

          </nav>


          {/* LOGO BAWAH */}

          <div className="supplier-sidebar-bottom-logo">

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

            <div className="supplier-bottom-line"></div>

          </div>


        </aside>


        {/* =================================================
            MAIN
        ================================================= */}

        <main className="supplier-main-content">


          {/* =================================================
              HEADER
          ================================================= */}

          <header className="supplier-top-header">


            <h1>
              Supplier
            </h1>


            <div className="supplier-header-right">


              {/* NOTIFIKASI */}

              <button
                type="button"
                className="supplier-notification-button"
                title="Notifikasi"
                onClick={() =>
                  navigate("/notifikasi")
                }
              >

                <svg
                  viewBox="0 0 24 24"
                  className="supplier-notification-icon"
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


              {/* PROFILE */}

              <div className="supplier-profile-wrapper">

                <button
                  type="button"
                  className="supplier-profile-area"
                  onClick={() =>
                    setProfileOpen(
                      (prev) => !prev
                    )
                  }
                >

                  <div className="supplier-profile-icon">

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


                  <div className="supplier-profile-info">

                    <strong>
                      Admin
                    </strong>

                    <span>
                      Segar Jaya Utama
                    </span>

                  </div>


                  <span className="supplier-profile-arrow">
                    ▼
                  </span>

                </button>


                {/* DROPDOWN */}

                {profileOpen && (

                  <div className="supplier-profile-dropdown">

                    <button
                      type="button"
                      onClick={() =>
                        navigate("/profil")
                      }
                    >
                      Profil
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        navigate("/pengaturan")
                      }
                    >
                      Pengaturan
                    </button>

                    <button
                      type="button"
                      className="supplier-logout-button"
                      onClick={() => {

                        const confirmLogout =
                          window.confirm(
                            "Apakah Anda yakin ingin keluar?"
                          );

                        if (confirmLogout) {
                          navigate("/");
                        }

                      }}
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

          <section className="supplier-content-area">


            {/* =================================================
                BOX ATAS
            ================================================= */}

            <div className="supplier-information-area">


              {/* DESKRIPSI */}

              <div className="supplier-description">

                <p>
                  Kelola data supplier atau pemasok barang
                  
                </p>

              </div>


              {/* SEARCH */}

              <div className="supplier-search-box">

                <svg
                  viewBox="0 0 24 24"
                  className="supplier-search-icon"
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
                  placeholder="Cari nama supplier....."
                />

              </div>


              {/* TAMBAH */}

              <button
                type="button"
                className="supplier-add-button"
                onClick={
                  handleAddSupplier
                }
              >

                <span>
                  ＋
                </span>

                Tambah Supplier

              </button>


            </div>


            {/* =================================================
                TABLE CONTAINER
            ================================================= */}

            <div className="supplier-table-container">


              <div className="supplier-table-title">

                <h2>
                  Supplier
                </h2>

              </div>


              {loading ? (

                <div className="supplier-loading">
                  Memuat data supplier...
                </div>

              ) : (

                <div className="supplier-table-wrapper">

                  <table className="supplier-table">

                    <thead>

                      <tr>

                        <th>
                          No
                        </th>

                        <th>
                          Nama Supplier
                        </th>

                        <th>
                          No. Telepon
                        </th>

                        <th>
                          Alamat Lengkap
                        </th>

                        <th>
                          Jatuh Tempo
                        </th>

                        <th>
                          Aksi
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {currentSuppliers.length === 0 ? (

                        <tr>

                          <td
                            colSpan="6"
                            className="supplier-empty"
                          >
                            Belum ada data supplier
                          </td>

                        </tr>

                      ) : (

                        currentSuppliers.map(
                          (supplier, index) => (

                            <tr
                              key={
                                supplier.id ??
                                supplier._id ??
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
                                  supplier.nama_supplier ??
                                  supplier.namaSupplier ??
                                  "-"
                                }
                              </td>


                              <td>
                                {
                                  supplier.no_telepon ??
                                  supplier.noTelepon ??
                                  supplier.telepon ??
                                  "-"
                                }
                              </td>


                              <td>
                                {
                                  supplier.alamat ??
                                  "-"
                                }
                              </td>


                              <td>
                                {
                                  supplier.jatuh_tempo ??
                                  supplier.jatuhTempo ??
                                  "-"
                                }
                              </td>


                              <td>

                                <div className="supplier-action-buttons">


                                  {/* EDIT */}

                                  <button
                                    type="button"
                                    className="supplier-edit-button"
                                    onClick={() =>
                                      handleEditSupplier(
                                        supplier
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
                                    className="supplier-delete-button"
                                    onClick={() =>
                                      handleDeleteSupplier(
                                        supplier
                                      )
                                    }
                                  >

                                    <span>
                                      🗑
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

                </div>

              )}


              {/* =================================================
                  PAGINATION
              ================================================= */}

              {!loading && (

                <div className="supplier-pagination-area">

                  <div className="supplier-pagination-buttons">


                    {/* PREVIOUS */}

                    <button
                      type="button"
                      className="supplier-page-arrow"
                      onClick={
                        handlePrevious
                      }
                      disabled={
                        currentPage === 1
                      }
                    >
                      ‹
                    </button>


                    {/* PAGE NUMBERS */}

                    {Array.from(
                      {
                        length: totalPages
                      },
                      (_, index) =>
                        index + 1
                    ).map((page) => (

                      <button
                        type="button"
                        key={page}
                        className={`supplier-page-number ${
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
                      className="supplier-page-arrow"
                      onClick={
                        handleNext
                      }
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

      <footer className="supplier-footer">


        {/* LOGO KIRI */}

        <img
          src={logoSejuta}
          alt="Sejuta Motor"
          className="supplier-footer-logo"
        />


        {/* LOGO TENGAH */}

        <img
          src={logoMotor}
          alt="Motor"
          className="supplier-footer-motor"
        />


        {/* NAMA KANAN */}

        <div className="supplier-footer-title">

          <strong>
            Segar Jaya Utama
          </strong>

          <span>
            Motor
          </span>

        </div>

      </footer>


      {/* =====================================================
          MODAL
      ===================================================== */}

      {modalOpen && (

        <div
          className="supplier-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="supplier-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* HEADER MODAL */}

            <div className="supplier-modal-header">

              <h2>
                {editMode
                  ? "Edit Supplier"
                  : "Tambah Supplier"}
              </h2>

              <button
                type="button"
                className="supplier-modal-close"
                onClick={closeModal}
              >
                ×
              </button>

            </div>


            {/* FORM */}

            <form
              className="supplier-form"
              onSubmit={
                handleSubmit
              }
            >


              {/* NAMA */}

              <div className="supplier-form-group">

                <label>
                  Nama Supplier
                </label>

                <input
                  type="text"
                  name="nama_supplier"
                  value={
                    formData.nama_supplier
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Masukkan nama supplier"
                  required
                />

              </div>


              {/* TELEPON */}

              <div className="supplier-form-group">

                <label>
                  No. Telepon
                </label>

                <input
                  type="text"
                  name="no_telepon"
                  value={
                    formData.no_telepon
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Masukkan nomor telepon"
                />

              </div>


              {/* ALAMAT */}

              <div className="supplier-form-group">

                <label>
                  Alamat Lengkap
                </label>

                <textarea
                  name="alamat"
                  value={
                    formData.alamat
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Masukkan alamat supplier"
                  rows="3"
                />

              </div>


              {/* JATUH TEMPO */}

              <div className="supplier-form-group">

                <label>
                  Jatuh Tempo
                </label>

                <input
                  type="date"
                  name="jatuh_tempo"
                  value={
                    formData.jatuh_tempo
                  }
                  onChange={
                    handleInputChange
                  }
                />

              </div>


              {/* BUTTON */}

              <div className="supplier-form-actions">

                <button
                  type="button"
                  className="supplier-cancel-button"
                  onClick={closeModal}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="supplier-save-button"
                >
                  {editMode
                    ? "Simpan Perubahan"
                    : "Simpan Supplier"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}


export default Supplier;