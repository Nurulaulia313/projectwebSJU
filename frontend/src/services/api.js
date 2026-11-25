const API_URL = "http://127.0.0.1:8000/api";


// =====================================================
// DATA BARANG
// =====================================================

// GET SEMUA DATA BARANG
export const getBarangs = async () => {

  const response = await fetch(
    `${API_URL}/barangs`
  );

  if (!response.ok) {

    const errorData =
      await response.json()
      .catch(() => ({}));

    throw new Error(
      errorData.message ||
      "Gagal mengambil data barang"
    );

  }

  return response.json();

};


// =====================================================
// SUPPLIER
// =====================================================


// GET SEMUA SUPPLIER
export const getSuppliers = async () => {

  const response = await fetch(
    `${API_URL}/suppliers`
  );

  if (!response.ok) {

    const errorData =
      await response.json()
      .catch(() => ({}));

    throw new Error(
      errorData.message ||
      "Gagal mengambil data supplier"
    );

  }

  return response.json();

};


// TAMBAH SUPPLIER
export const createSupplier = async (
  supplierData
) => {

  const response = await fetch(
    `${API_URL}/suppliers`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },

      body: JSON.stringify(
        supplierData
      ),
    }
  );


  if (!response.ok) {

    const errorData =
      await response.json()
      .catch(() => ({}));

    throw new Error(
      errorData.message ||
      "Gagal menambahkan supplier"
    );

  }

  return response.json();

};


// UPDATE SUPPLIER
export const updateSupplier = async (
  id,
  supplierData
) => {

  const response = await fetch(
    `${API_URL}/suppliers/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },

      body: JSON.stringify(
        supplierData
      ),
    }
  );


  if (!response.ok) {

    const errorData =
      await response.json()
      .catch(() => ({}));

    throw new Error(
      errorData.message ||
      "Gagal mengubah data supplier"
    );

  }

  return response.json();

};


// HAPUS SUPPLIER
export const deleteSupplier = async (
  id
) => {

  const response = await fetch(
    `${API_URL}/suppliers/${id}`,
    {
      method: "DELETE",

      headers: {
        "Accept": "application/json",
      },
    }
  );


  if (!response.ok) {

    const errorData =
      await response.json()
      .catch(() => ({}));

    throw new Error(
      errorData.message ||
      "Gagal menghapus supplier"
    );

  }

  return response.json();

};

// =====================================================
// BARANG MASUK
// =====================================================


// GET SEMUA BARANG MASUK
export const getBarangMasuks = async () => {

  const response = await fetch(
    `${API_URL}/barang-masuks`
  );

  if (!response.ok) {

    const errorData =
      await response.json()
      .catch(() => ({}));

    throw new Error(
      errorData.message ||
      "Gagal mengambil data barang masuk"
    );

  }

  return response.json();

};


// TAMBAH BARANG MASUK
export const createBarangMasuk = async (
  barangMasukData
) => {

  const response = await fetch(
    `${API_URL}/barang-masuks`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },

      body: JSON.stringify(
        barangMasukData
      ),
    }
  );


  if (!response.ok) {

    const errorData =
      await response.json()
      .catch(() => ({}));

    throw new Error(
      errorData.message ||
      "Gagal menambahkan barang masuk"
    );

  }

  return response.json();

};


// UPDATE BARANG MASUK
export const updateBarangMasuk = async (
  id,
  barangMasukData
) => {

  const response = await fetch(
    `${API_URL}/barang-masuks/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },

      body: JSON.stringify(
        barangMasukData
      ),
    }
  );


  if (!response.ok) {

    const errorData =
      await response.json()
      .catch(() => ({}));

    throw new Error(
      errorData.message ||
      "Gagal mengubah barang masuk"
    );

  }

  return response.json();

};


// HAPUS BARANG MASUK
export const deleteBarangMasuk = async (
  id
) => {

  const response = await fetch(
    `${API_URL}/barang-masuks/${id}`,
    {
      method: "DELETE",

      headers: {
        "Accept": "application/json",
      },
    }
  );


  if (!response.ok) {

    const errorData =
      await response.json()
      .catch(() => ({}));

    throw new Error(
      errorData.message ||
      "Gagal menghapus barang masuk"
    );

  }

  return response.json();

};
// =====================================================
// BARANG KELUAR
// =====================================================

// GET SEMUA BARANG KELUAR
export const getBarangKeluars = async () => {

  const response = await fetch(
    `${API_URL}/barang-keluars`
  );

  if (!response.ok) {

    const errorData =
      await response.json()
      .catch(() => ({}));

    throw new Error(
      errorData.message ||
      `Gagal mengambil data barang keluar (${response.status})`
    );

  }

  return response.json();
};


// TAMBAH BARANG KELUAR
export const createBarangKeluar = async (
  barangKeluarData
) => {

  const response = await fetch(
    `${API_URL}/barang-keluars`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },

      body: JSON.stringify(
        barangKeluarData
      ),
    }
  );

  if (!response.ok) {

    const errorData =
      await response.json()
      .catch(() => ({}));

    throw new Error(
      errorData.message ||
      `Gagal menambahkan barang keluar (${response.status})`
    );

  }

  return response.json();
};


// UPDATE BARANG KELUAR
export const updateBarangKeluar = async (
  id,
  barangKeluarData
) => {

  const response = await fetch(
    `${API_URL}/barang-keluars/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },

      body: JSON.stringify(
        barangKeluarData
      ),
    }
  );

  if (!response.ok) {

    const errorData =
      await response.json()
      .catch(() => ({}));

    throw new Error(
      errorData.message ||
      `Gagal mengubah barang keluar (${response.status})`
    );

  }

  return response.json();
};


// HAPUS BARANG KELUAR
export const deleteBarangKeluar = async (
  id
) => {

  const response = await fetch(
    `${API_URL}/barang-keluars/${id}`,
    {
      method: "DELETE",

      headers: {
        "Accept": "application/json",
      },
    }
  );

  if (!response.ok) {

    const errorData =
      await response.json()
      .catch(() => ({}));

    throw new Error(
      errorData.message ||
      `Gagal menghapus barang keluar (${response.status})`
    );

  }

  return response.json();
};