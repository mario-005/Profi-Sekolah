# 🧪 Laporan QA Testing — SDN Tunas Mekar Website
**Tanggal Testing:** 26 Mei 2026  
**Metode:** Static Code Analysis + Functional Review  
**Total Fitur Diuji:** 7 area utama

---

## ✅ LULUS — Fitur Yang Berjalan Dengan Baik

| # | Fitur | Status |
|---|---|---|
| 1 | Navbar sticky & active link saat scroll | ✅ OK |
| 2 | Mobile hamburger menu | ✅ OK |
| 3 | Scroll reveal animation | ✅ OK |
| 4 | Counter animasi statistik | ✅ OK |
| 5 | FAQ accordion | ✅ OK |
| 6 | Validasi checkbox persetujuan PPDB | ✅ OK |
| 7 | Validasi berkas wajib (Foto, KK, Akta) | ✅ OK |
| 8 | Validasi berkas sama (fingerprint) | ✅ OK |
| 9 | Validasi NIK duplikat | ✅ OK |
| 10 | Validasi usia minimal 6 tahun | ✅ OK |
| 11 | Validasi nama siswa = nama ortu | ✅ OK |
| 12 | Drag-and-drop file upload zone | ✅ OK |
| 13 | Progress overlay upload | ✅ OK |
| 14 | Tombol Buka Spreadsheet (Admin) | ✅ OK |
| 15 | Aspirasi form → kirim ke Sheets | ✅ OK |
| 16 | Tracker ID aspirasi | ✅ OK |
| 17 | Admin login (5x klik logo) | ✅ OK |
| 18 | Admin tab switching | ✅ OK |

---

## 🐛 BUG DITEMUKAN

### 🔴 BUG-001 — KRITIS: `selectedFiles` Tidak Reset Saat Modal Dibuka Kembali
**Lokasi:** `script.js` baris 443-448 (`closeModal`)  
**Skenario:** User mendaftar → sukses → tutup modal → buka modal lagi → langsung submit tanpa pilih file baru → form **bisa tersubmit dengan file lama** karena `selectedFiles` tidak direset saat modal ditutup.  
**Dampak:** File dari pendaftaran sebelumnya bocor ke pendaftaran baru.  
**Fix:** Reset `selectedFiles` di dalam fungsi `closeModal`.

---

### 🔴 BUG-002 — KRITIS: Form Reset Tidak Berjalan Setelah Submit Sukses
**Lokasi:** `script.js` fungsi `bindFormSubmit` — blok success state  
**Skenario:** Setelah sukses, `modalBody.innerHTML` diganti dengan pesan sukses. Saat modal ditutup, `bindFormSubmit()` dipanggil ulang yang me-setup ulang event listener file zones — namun **preview file lama masih tampil** karena state `selectedFiles` tidak dikosongkan dan DOM baru tidak memiliki preview card yang tersembunyi.  
**Fix:** Reset `selectedFiles` saat `closeModal()` dipanggil.

---

### 🟡 BUG-003 — SEDANG: NIK Bisa Diisi Non-Angka
**Lokasi:** `index.html` baris 559 — input `regNikSiswa`  
**Skenario:** HTML punya `pattern="[0-9]{16}"` tapi **tidak ada validasi JavaScript** yang mengecek apakah NIK benar-benar 16 digit angka sebelum submit. Browser validation bisa dibypass.  
**Fix:** Tambah cek JS: `if (!/^\d{16}$/.test(nik))` sebelum NIK duplicate check.

---

### 🟡 BUG-004 — SEDANG: Tanggal Lahir Tidak Divalidasi (Bisa Kosong)
**Lokasi:** `script.js` baris ~688 — blok validasi usia  
**Skenario:** Cek usia dibungkus `if (tanggalLahir)` — artinya jika `tanggalLahir` kosong, **cek usia dilewati** dan form bisa lanjut tanpa tanggal lahir.  
**Dampak:** Data tanggal lahir kosong masuk ke database.  
**Fix:** Tambahkan validasi eksplisit: jika `tanggalLahir` kosong, tolak dengan alert.

---

### 🟡 BUG-005 — SEDANG: Nomor HP Tidak Divalidasi
**Lokasi:** `index.html` baris 600 — input `regPhone` hanya `type="tel"`  
**Skenario:** User bisa mengisi sembarang karakter. Tidak ada validasi format nomor HP Indonesia (08xx / +628xx).  
**Fix:** Tambah validasi JS: `if (!/^(\+62|08)\d{8,12}$/.test(phone.replace(/\s/g, '')))`

---

### 🟡 BUG-006 — SEDANG: Nama Siswa & Orang Tua Bisa Diisi Angka/Simbol
**Lokasi:** `index.html` — input `regNamaSiswa` & `regNamaOrtu`  
**Skenario:** Tidak ada validasi bahwa nama hanya berisi huruf dan spasi. User bisa mengisi `123` atau `@#$`.  
**Fix:** Tambah validasi JS menggunakan regex nama: `/^[a-zA-ZÀ-ÿ\s'.-]{2,}$/`

---

### 🟢 BUG-007 — RINGAN: Tracker Aspirasi Hanya Cari di Data Demo
**Lokasi:** `script.js` baris 882 — `localAspirations.find(...)`  
**Skenario:** Tracker mencari ID di array `localAspirations` (data demo + yang baru disubmit di session ini). Jika user refresh halaman, ID yang baru saja didaftarkan **tidak bisa dilacak lagi** karena `localAspirations` tidak dipersist dari localStorage.  
**Fix:** Inisialisasi `localAspirations` dari localStorage saat load.

---

### 🟢 BUG-008 — RINGAN: Tombol Submit Tidak Reset Jika Upload Gagal Mid-Process
**Lokasi:** `script.js` — blok upload GAS  
**Skenario:** Jika file pertama berhasil upload tapi file kedua gagal, tombol submit kembali ke teks asli ✅. Tapi `selectedFiles` masih menyimpan state file — ini sudah ditangani dengan baik.  
**Status:** Minor saja, sudah cukup baik.

---

## 📊 Ringkasan

| Severity | Jumlah |
|---|---|
| 🔴 Kritis | 2 |
| 🟡 Sedang | 4 |
| 🟢 Ringan | 2 |
| ✅ Lulus | 18 |

**Rekomendasi:** Perbaiki BUG-001 (kritis) dan BUG-004 (tanggal lahir kosong) segera, lanjutkan BUG-003, 005, 006 sebagai improvement validasi form.
