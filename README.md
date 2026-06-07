# 🏫 Website Profil & Portal Aspirasi SDN Tunas Mekar Kota Cimahi

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Yes-success?style=for-the-badge&logo=responsive)](https://en.wikipedia.org/wiki/Responsive_web_design)

Website profil resmi **SDN Tunas Mekar** adalah landing page modern berkelas dunia (premium, elegan, dan dinamis) yang didedikasikan untuk memberikan informasi sekolah secara profesional sekaligus meningkatkan branding sekolah. Dirancang dengan menggunakan skema warna merah-putih nasional yang dipadukan dengan aksen modern layaknya sekolah internasional.

Selain menyajikan profil sekolah, website ini memiliki fitur **Sistem Aspirasi Publik terintegrasi** dan **Formulir PPDB Online (Penerimaan Peserta Didik Baru)** interaktif tanpa memerlukan framework berat, murni menggunakan keandalan **Vanilla HTML, CSS, dan JavaScript**.

---

## 🚀 Fitur Utama & Interaktif

Website ini dilengkapi dengan berbagai fitur premium dan interaksi mikro yang memanjakan mata pengunjung:

### 1. 🧭 Navigasi Modern & Sticky Header
* **Sticky Navbar**: Transparan di bagian atas, otomatis bertransformasi menjadi solid putih dengan efek bayangan halus saat halaman di-scroll ke bawah.
* **Responsive Menu**: Desain laci samping (side drawer) modern untuk tampilan mobile yang mudah diakses dengan *hamburger menu*.
* **Active State Link**: Menu navigasi otomatis menyorot posisi section aktif saat pengguna melakukan scroll.

### 2. ⚡ Hero Section & Animasi Statistik
* **Floating Cards**: Kartu penunjuk keunggulan (Kurikulum Modern, Akreditasi B) melayang secara halus menggunakan animasi CSS Keyframes.
* **Statistik Interaktif**: Animasi penghitung angka (*Counter*) yang dinamis dari `0` ke angka target (Siswa Aktif, Guru, Rombel) menggunakan *Intersection Observer API* yang hanya berjalan saat section terlihat di layar.
* **Badge Sekolah Unggulan**: Indikator premium dengan micro-shadow dan ikon bintang elegan.

### 3. 📖 Profil Sekolah Elegan (Overlapping Grid)
* Desain layout modern dengan foto bertumpuk (*overlapping images*) yang elegan.
* Menggunakan skema kontras gelap (*dark mode accent*) merah maroon yang memberikan kesan formal, kokoh, dan prestisius.

### 4. 🎨 Program & Fasilitas (Hover Zoom Effect)
* **Keunggulan Cards**: Kartu program pembelajaran (*Flipped Classroom*, Sarpras, Eskul) dengan animasi naik saat di-hover (*Translate-Y*) dan bayangan lembut berwarna merah.
* **Ikon Boxicons Modern**: Desain ikon bulat dinamis yang berubah warna saat di-hover.

### 5. 📸 Masonry Gallery & Video Player
* **Video Profil**: Thumbnail besar dengan tombol play bergaya modern dan bayangan melingkar yang dinamis.
* **Masonry Grid**: Penataan foto galeri non-seragam yang responsif, dilengkapi overlay transparan merah transparan dan ikon zoom ketika di-hover.

### 6. 📰 FAQ Accordion & Berita Terbaru
* **Accordion FAQ**: Sistem tanya jawab interaktif dengan transisi buka-tutup yang sangat halus (*smooth max-height transition*) menggunakan JavaScript.
* **Daftar Berita**: Layout tanggal bergaya kalender retro minimalis untuk setiap postingan berita sekolah.

### 7. 🗣️ Portal Aspirasi Publik & Pelacakan Real-time (Fitur Unggulan)
* **Formulir Aspirasi**: Lengkap dengan validasi JavaScript, input file opsional dinamis (menampilkan nama berkas asli), dan checkbox persetujuan.
* **Tiket ID Generator**: Mengenerasi kode unik otomatis (misal: `ASP-4892`) setelah pengiriman aspirasi yang sukses.
* **Pelacak Status Tiket (Tracker)**: Pengguna dapat memasukkan ID Tiket untuk melihat *timeline progress* penyelesaian pengaduan (Status: *Menunggu*, *Proses*, *Selesai*) secara instan.
* **Aspirasi Feed**: Menampilkan riwayat aspirasi publik terbaru secara real-time.

### 8. 📝 PPDB Online Modal
* Formulir pendaftaran calon siswa baru yang terintegrasi dalam modal pop-up mewah.
* **Validasi Lengkap**: Form memiliki validasi input sebelum pengiriman.
* **State Sukses Menarik**: Menampilkan pesan keberhasilan kustom dengan animasi ikon centang besar setelah submit tanpa melakukan *refresh* halaman.

---

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan filosofi **Zero Dependency** untuk menjaga performa loading website super cepat:

* **Struktur Halaman**: [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML) (Semantik, SEO-friendly, Meta Tags lengkap).
* **Desain & Animasi**: [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) (Custom Variables, Flexbox, Grid, Keyframe Animations, Responsive Media Queries).
* **Interaktivitas**: [Vanilla JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (ES6+, DOM Manipulation, Event Listeners, Intersection Observer, Timers).
* **Typography**: Google Fonts [Poppins](https://fonts.google.com/specimen/Poppins) (Light, Regular, Medium, SemiBold, Bold).
* **Icon Set**: [Boxicons](https://boxicons.com/) (Ikon web modern & minimalis).

---

## 📂 Struktur Proyek

```bash
Profile-Sekolah/
│
├── index.html          # File utama halaman web (struktur & konten)
├── style.css           # File stylesheet (sistem desain, tema warna & responsivitas)
├── script.js          # Logika interaktif (FAQ, Counter, Tracker, Modal, Validasi Form)
├── DESAIN.md           # Panduan konsep UI/UX & spesifikasi desain awal
└── README.md           # Dokumentasi proyek (file ini)
```

---

## 🎨 Palet Warna & Desain Sistem

Konsep desain merujuk pada standar website premium dengan variabel warna yang terdefinisi di `:root` CSS:

| Warna | Kode Hex | Penggunaan Utama |
|---|---|---|
| **Merah Utama** | `#C1121F` | Tombol CTA, Header Aktif, Aksen Utama |
| **Merah Soft** | `#E63946` | Efek Hover Tombol & Teks Highlight |
| **Merah Maroon** | `#8B0A13` | Latar Belakang Section Tentang (Profil) |
| **Abu Soft** | `#F5F5F5` | Latar Belakang Section Terang (Light Background) |
| **Abu Teks** | `#555555` | Warna Teks Paragraf (*Body Text*) |
| **Hitam Soft** | `#222222` | Judul Section, Logo & Teks Gelap (*Title Color*) |

---