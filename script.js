// ==========================================================================
// KONFIGURASI: Google Forms Headless Integration
// Sinkronisasi data PPDB & Aspirasi otomatis ke Google Sheets via Google Forms secara background!
// ==========================================================================
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/1NkyxYLGu3yctgioqn5EaxzssFoMaup8p6i6ZhTt5-5Q/formResponse";
const GOOGLE_FORM_ASPIRASI_URL = "https://docs.google.com/forms/d/1Foh4s5Bu-aJc8KnFklk4RW-RuVm1mr1Wn3zoZaiaV3Q/formResponse";

/* =========================================
   1. LOADER ANIMATION
   ========================================= */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 500); // 500ms delay to show loader effect slightly
});

/* =========================================
   2. SHOW MOBILE MENU
   ========================================= */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Menu Show
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu Hidden
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Remove Menu on Link Click
const navLink = document.querySelectorAll('.nav-link');
const navBtnMobile = document.querySelector('.nav-btn-mobile');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));
if(navBtnMobile) navBtnMobile.addEventListener('click', linkAction);

/* =========================================
   3. STICKY HEADER & ACTIVE LINK
   ========================================= */
function scrollHeader(){
    const header = document.getElementById('header');
    if(this.scrollY >= 50) header.classList.add('scroll-header'); 
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

// Active Link on Scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 100,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if(sectionsClass) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                sectionsClass.classList.add('active');
            } else {
                sectionsClass.classList.remove('active');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* =========================================
   4. SHOW SCROLL UP BUTTON
   ========================================= */
function scrollUp(){
    const scrollUp = document.getElementById('back-top');
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); 
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/* =========================================
   5. COUNTER ANIMATION
   ========================================= */
const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

const startCounters = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const counter = entry.target;
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
            // Stop observing once animated
            observer.unobserve(counter);
        }
    });
};

const counterObserver = new IntersectionObserver(startCounters, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

/* =========================================
   6. SCROLL REVEAL ANIMATION
   ========================================= */
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');

const scrollReveal = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100; // Offset before reveal

    revealElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', scrollReveal);
// Trigger once on load
scrollReveal();

/* =========================================
   7. FAQ ACCORDION
   ========================================= */
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach((item) => {
    const accordionHeader = item.querySelector('.accordion-header');

    accordionHeader.addEventListener('click', () => {
        const openItem = document.querySelector('.accordion-item.active');
        
        toggleItem(item);

        if(openItem && openItem !== item){
            toggleItem(openItem);
        }
    });
});

const toggleItem = (item) => {
    const accordionContent = item.querySelector('.accordion-content');

    if(item.classList.contains('active')){
        accordionContent.style.maxHeight = null;
        item.classList.remove('active');
    }else{
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        item.classList.add('active');
    }
};

/* =========================================
   8. FILE UPLOAD NAME DISPLAY
   ========================================= */
const fileInput = document.getElementById('file');
const fileNameDisplay = document.getElementById('fileName');

if(fileInput){
    fileInput.addEventListener('change', function(){
        if(this.files && this.files.length > 0){
            fileNameDisplay.textContent = this.files[0].name;
            fileNameDisplay.style.color = 'var(--text-color)';
        } else {
            fileNameDisplay.textContent = 'Belum ada file dipilih';
            fileNameDisplay.style.color = '#999';
        }
    });
}

/* =========================================
   8.5. ASPIRASI TRACKER DATA & FUNCTIONS
   ========================================= */
const localAspirations = [
    {
        id: 'ASP-1205',
        nama: 'Budi S***',
        status: 'Orang Tua',
        judul: 'Peningkatan Fasilitas Lab Komputer',
        statusProgress: 'Proses',
        tanggal: '18 Mei 2026',
        steps: [
            { name: 'Aspirasi Diterima', desc: 'Diterima oleh sistem pengaduan sekolah.', completed: true },
            { name: 'Verifikasi Pengaduan', desc: 'Lolos verifikasi oleh Humas sekolah.', completed: true },
            { name: 'Tindak Lanjut / Proses', desc: 'Pengadaan unit komputer tambahan sedang dijadwalkan.', active: true },
            { name: 'Selesai', desc: 'Unit komputer tambahan terpasang dan siap digunakan.' }
        ]
    },
    {
        id: 'ASP-2489',
        nama: 'Kevin A***',
        status: 'Siswa',
        judul: 'Usulan Kegiatan Ekstrakurikuler Robotik',
        statusProgress: 'Selesai',
        tanggal: '10 Mei 2026',
        steps: [
            { name: 'Aspirasi Diterima', desc: 'Diterima oleh sistem pengaduan sekolah.', completed: true },
            { name: 'Verifikasi Pengaduan', desc: 'Lolos verifikasi oleh Humas sekolah.', completed: true },
            { name: 'Tindak Lanjut / Proses', desc: 'Rapat kesiswaan menyetujui usulan.', completed: true },
            { name: 'Selesai', desc: 'Eskul Robotik disetujui dan akan dimulai ajaran baru.', completed: true }
        ]
    },
    {
        id: 'ASP-3512',
        nama: 'Rahmat H***',
        status: 'Masyarakat',
        judul: 'Perbaikan Area Parkir dan Gerbang Depan',
        statusProgress: 'Menunggu',
        tanggal: '19 Mei 2026',
        steps: [
            { name: 'Aspirasi Diterima', desc: 'Diterima dan menunggu giliran verifikasi.', active: true },
            { name: 'Verifikasi Pengaduan', desc: 'Verifikasi keaslian dan relevansi data.' },
            { name: 'Tindak Lanjut / Proses', desc: 'Penjadwalan survei sarana prasarana.' },
            { name: 'Selesai', desc: 'Area parkir dirapikan dan gerbang diperbaiki.' }
        ]
    }
];

const renderRecentAspirasi = () => {
    const recentList = document.getElementById('recentList');
    if (!recentList) return;
    
    recentList.innerHTML = '';
    
    const itemsToShow = localAspirations.slice(-3).reverse();
    
    itemsToShow.forEach(item => {
        let badgeClass = 'status-waiting';
        let statusText = 'Menunggu';
        
        if (item.statusProgress === 'Proses') {
            badgeClass = 'status-process';
            statusText = 'Proses';
        } else if (item.statusProgress === 'Selesai') {
            badgeClass = 'status-completed';
            statusText = 'Selesai';
        }
        
        const recentItemHTML = `
            <div class="recent-item">
                <div class="recent-header">
                    <span class="recent-meta">${item.nama} (${item.status})</span>
                    <span class="status-badge ${badgeClass}">${statusText}</span>
                </div>
                <div class="recent-text">${item.judul}</div>
            </div>
        `;
        recentList.insertAdjacentHTML('beforeend', recentItemHTML);
    });
};

// Initialize render on load
document.addEventListener('DOMContentLoaded', () => {
    renderRecentAspirasi();
});
// Fallback in case DOM is already parsed
renderRecentAspirasi();

/* =========================================
   9. FORM ASPIRASI SUBMISSION & VALIDATION
   ========================================= */
const aspirasiForm = document.getElementById('aspirasiForm');
const alertMessage = document.getElementById('alertMessage');
const alertClose = document.querySelector('.alert-close');

if(aspirasiForm){
    aspirasiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btnSubmit = aspirasiForm.querySelector('.btn-submit');
        const originalText = btnSubmit.innerHTML;
        
        btnSubmit.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Mengirim...`;
        btnSubmit.style.opacity = '0.8';
        btnSubmit.disabled = true;

        // Generate dynamic ticket ID
        const ticketId = 'ASP-' + Math.floor(1000 + Math.random() * 9000);
        const namaInput = document.getElementById('nama').value;
        const emailInput = document.getElementById('email').value;
        const statusInput = document.getElementById('status').value;
        const judulInput = document.getElementById('judul').value;
        const isiInput = document.getElementById('isi').value;
        const fileInput = document.getElementById('file').files[0]?.name || '';

        // Date format: e.g. 26 Mei 2026
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const today = new Date();
        const day = today.getDate();
        const monthIndex = today.getMonth();
        const year = today.getFullYear();
        const formattedDate = `${day} ${months[monthIndex]} ${year}`;

        // Kirim ke Google Sheets via Google Forms (Headless Submit) secara background
        if (typeof GOOGLE_FORM_ASPIRASI_URL !== 'undefined' && GOOGLE_FORM_ASPIRASI_URL) {
            const formBody = new URLSearchParams();
            formBody.append("entry.1327896355", ticketId);
            formBody.append("entry.1295383869", formattedDate);
            formBody.append("entry.1279757387", namaInput);
            formBody.append("entry.2024519871", emailInput);
            formBody.append("entry.1892188368", statusInput);
            formBody.append("entry.977256998", judulInput);
            formBody.append("entry.956549401", isiInput);
            formBody.append("entry.466521070", fileInput);
            formBody.append("entry.743574646", "Menunggu");

            fetch(GOOGLE_FORM_ASPIRASI_URL, {
                method: "POST",
                mode: "no-cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formBody
            })
            .then(() => console.log("Data Aspirasi berhasil disinkronkan ke Google Sheets via Google Forms!"))
            .catch(err => console.error("Gagal sinkronisasi data Aspirasi via Google Forms:", err));
        }

        setTimeout(() => {
            // Add new submission to tracker array
            const initials = namaInput.length > 2 ? namaInput.charAt(0) + '***' + namaInput.charAt(namaInput.length-1) : namaInput + '***';
            localAspirations.push({
                id: ticketId,
                nama: initials,
                status: statusInput,
                judul: judulInput,
                statusProgress: 'Menunggu',
                tanggal: 'Hari Ini',
                steps: [
                    { name: 'Aspirasi Diterima', desc: 'Diterima oleh sistem pengaduan sekolah.', active: true },
                    { name: 'Verifikasi Pengaduan', desc: 'Verifikasi keaslian dan relevansi data.' },
                    { name: 'Tindak Lanjut / Proses', desc: 'Penjadwalan survei sarana prasarana.' },
                    { name: 'Selesai', desc: 'Penyelesaian dan tindak lanjut selesai.' }
                ]
            });

            // Save to localStorage
            localStorage.setItem(L_KEY_ASPIRASI, JSON.stringify(localAspirations));

            // Re-render recent list
            renderRecentAspirasi();

            // Sync Admin table if the render function is available
            if (typeof renderAdminAspirations === 'function') {
                renderAdminAspirations();
            }

            // Set alert text with ticket ID
            const alertText = alertMessage.querySelector('p');
            if(alertText) {
                alertText.innerHTML = `Terima kasih! Aspirasi dikirim dengan Tiket ID: <strong>${ticketId}</strong>. Gunakan ID ini untuk melacak status perkembangannya.`;
            }

            // Show Success Alert
            alertMessage.classList.add('show');
            
            // Reset Form
            aspirasiForm.reset();
            if (fileNameDisplay) {
                fileNameDisplay.textContent = 'Belum ada file dipilih';
                fileNameDisplay.style.color = '#999';
            }

            // Reset button state
            btnSubmit.innerHTML = originalText;
            btnSubmit.style.opacity = '1';
            btnSubmit.disabled = false;

            // Auto close alert after 8 seconds
            setTimeout(() => {
                alertMessage.classList.remove('show');
            }, 8000);
            
        }, 1500);
    });
}

if(alertClose){
    alertClose.addEventListener('click', () => {
        alertMessage.classList.remove('show');
    });
}

/* =========================================
   10. PPDB REGISTRATION MODAL
   ========================================= */
const modal = document.getElementById('registrationModal');
const openModalBtns = document.querySelectorAll('.btn-open-reg');
const closeModalBtn = document.getElementById('closeRegistrationModal');
const modalBody = document.getElementById('modalBody');

// Keep standard form backup so we can restore it when modal reopens
let originalModalHTML = '';
if (modalBody) {
    originalModalHTML = modalBody.innerHTML;
}

// Function to open modal
const openModal = () => {
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
};

// Function to close modal
const closeModal = () => {
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Wait for transition to finish then restore original form if it was submitted
        setTimeout(() => {
            if (modalBody && originalModalHTML) {
                modalBody.innerHTML = originalModalHTML;
                // Re-bind submit listener since we replaced innerHTML
                bindFormSubmit();
            }
        }, 400);
    }
};

// Bind open click event to all buttons
openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

// Bind close click event
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Close when clicking outside of modal content
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
        closeModal();
    }
});

// =========================================
// HELPERS: FileUpload Zone Interaction
// =========================================
function setupFileUploadZone(zoneId, inputId, previewId, nameId, sizeId, removeId, fileKey) {
    const zone    = document.getElementById(zoneId);
    const input   = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    const nameEl  = document.getElementById(nameId);
    const sizeEl  = document.getElementById(sizeId);
    const removeBtn = document.getElementById(removeId);
    if (!zone || !input) return;

    function formatBytes(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    function attachFile(file) {
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            showCustomAlert("Berkas Terlalu Besar", `Berkas <strong>${file.name}</strong> melebihi batas maksimum 2MB. Harap kompres berkas terlebih dahulu.`, "warning");
            input.value = '';
            return;
        }
        selectedFiles[fileKey] = file;
        if (nameEl) nameEl.textContent = file.name;
        if (sizeEl) sizeEl.textContent = formatBytes(file.size);
        if (preview) preview.style.display = 'flex';
    }

    // Click to open file dialog
    zone.addEventListener('click', (e) => {
        if (e.target === removeBtn || removeBtn?.contains(e.target)) return;
        input.click();
    });

    // File change from dialog
    input.addEventListener('change', () => {
        if (input.files && input.files[0]) attachFile(input.files[0]);
    });

    // Drag and Drop
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('dragover');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) attachFile(file);
    });

    // Remove file
    if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedFiles[fileKey] = null;
            input.value = '';
            if (preview) preview.style.display = 'none';
        });
    }
}

// =========================================
// HELPER: Read file as Base64
// =========================================
function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// =========================================
// HELPER: Upload file to Google Apps Script
// =========================================
async function uploadFileToGAS(gasUrl, file, onProgress) {
    const base64Data = await readFileAsBase64(file);
    const payload = JSON.stringify({
        fileData: base64Data,
        fileName: file.name,
        mimeType: file.type || 'application/octet-stream'
    });

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', gasUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            try {
                const res = JSON.parse(xhr.responseText);
                if (res.success) resolve(res.url);
                else reject(new Error(res.error || 'Upload gagal'));
            } catch (err) {
                reject(new Error('Response tidak valid dari server'));
            }
        };
        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable && onProgress) {
                onProgress(Math.round((e.loaded / e.total) * 100));
            }
        };
        xhr.onerror = () => reject(new Error('Koneksi ke server gagal'));
        xhr.send(payload);
    });
}

// =========================================
// HELPER: Progress Overlay Control
// =========================================
function showUploadOverlay(status, percent) {
    const overlay  = document.getElementById('uploadProgressOverlay');
    const statusEl = document.getElementById('uploadProgressStatus');
    const barEl    = document.getElementById('uploadProgressBar');
    const pctEl    = document.getElementById('uploadProgressPercent');
    if (!overlay) return;
    overlay.classList.add('show');
    if (statusEl) statusEl.textContent = status;
    if (barEl)    barEl.style.width = percent + '%';
    if (pctEl)    pctEl.textContent = percent + '% selesai';
}

function hideUploadOverlay() {
    const overlay = document.getElementById('uploadProgressOverlay');
    if (overlay) overlay.classList.remove('show');
}

// Bind form submit listener
function bindFormSubmit() {
    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        // Setup all four file upload zones
        setupFileUploadZone('zoneFileFoto',  'regFileFoto',  'previewFileFoto',  'nameFileFoto',  'sizeFileFoto',  'removeFileFoto',  'FileFoto');
        setupFileUploadZone('zoneFileKK',    'regFileKK',    'previewFileKK',    'nameFileKK',    'sizeFileKK',    'removeFileKK',    'FileKK');
        setupFileUploadZone('zoneFileAkta',  'regFileAkta',  'previewFileAkta',  'nameFileAkta',  'sizeFileAkta',  'removeFileAkta',  'FileAkta');
        setupFileUploadZone('zoneFileKIA',   'regFileKIA',   'previewFileKIA',   'nameFileKIA',   'sizeFileKIA',   'removeFileKIA',   'FileKIA');

        // Toggle Registration Requirements Accordion
        const reqToggle = document.getElementById('requirementsToggle');
        const reqContent = document.getElementById('requirementsContent');
        if (reqToggle && reqContent) {
            reqToggle.addEventListener('click', () => {
                reqToggle.classList.toggle('active');
                reqContent.classList.toggle('show');
            });
        }

        regForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btnSubmit = regForm.querySelector('.btn-submit');
            const originalText = btnSubmit.innerHTML;

            // 1. Consent Checkbox Validation
            const persetujuanCheckbox = document.getElementById('regPersetujuan');
            if (persetujuanCheckbox && !persetujuanCheckbox.checked) {
                showCustomAlert("Persetujuan Diperlukan", "Pendaftaran Gagal: Anda harus menyetujui pernyataan persetujuan terlebih dahulu dengan memberikan tanda centang pada kotak persetujuan!", "warning");
                return;
            }

            // 2. Validate required files are selected
            if (!selectedFiles.FileFoto) {
                showCustomAlert("Berkas Belum Dipilih", "Harap pilih berkas <strong>Pas Foto Siswa</strong> terlebih dahulu sebelum mengirim pendaftaran.", "warning");
                return;
            }
            if (!selectedFiles.FileKK) {
                showCustomAlert("Berkas Belum Dipilih", "Harap pilih berkas <strong>Scan Kartu Keluarga (KK)</strong> terlebih dahulu sebelum mengirim pendaftaran.", "warning");
                return;
            }
            if (!selectedFiles.FileAkta) {
                showCustomAlert("Berkas Belum Dipilih", "Harap pilih berkas <strong>Scan Akta Kelahiran</strong> terlebih dahulu sebelum mengirim pendaftaran.", "warning");
                return;
            }

            // 3. Validate duplicate same-file across fields (using name+size fingerprint)
            function fileFingerprint(f) { return f ? `${f.name}::${f.size}` : null; }
            const fpFoto = fileFingerprint(selectedFiles.FileFoto);
            const fpKK   = fileFingerprint(selectedFiles.FileKK);
            const fpAkta = fileFingerprint(selectedFiles.FileAkta);
            if (fpFoto === fpKK) {
                showCustomAlert("Berkas Sama Terdeteksi", "Anda menggunakan berkas yang sama untuk <strong>Pas Foto</strong> dan <strong>Kartu Keluarga (KK)</strong>!", "error");
                return;
            }
            if (fpFoto === fpAkta) {
                showCustomAlert("Berkas Sama Terdeteksi", "Anda menggunakan berkas yang sama untuk <strong>Pas Foto</strong> dan <strong>Akta Kelahiran</strong>!", "error");
                return;
            }
            if (fpKK === fpAkta) {
                showCustomAlert("Berkas Sama Terdeteksi", "Anda menggunakan berkas yang sama untuk <strong>Kartu Keluarga (KK)</strong> dan <strong>Akta Kelahiran</strong>!", "error");
                return;
            }

            // 4. Get student info
            const namaSiswa  = document.getElementById('regNamaSiswa').value;
            const nik        = document.getElementById('regNikSiswa').value;
            const tanggalLahir = document.getElementById('regTanggalLahir').value;
            const gender     = document.getElementById('regGender').value;
            const jalur      = document.getElementById('regJalur').value;
            const namaOrtu   = document.getElementById('regNamaOrtu').value;
            const email      = document.getElementById('regEmailOrtu').value;
            const phone      = document.getElementById('regPhone').value;

            // 4a. Minimum age check — siswa harus minimal 6 tahun
            if (tanggalLahir) {
                const today    = new Date();
                const birthDate = new Date(tanggalLahir);
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                if (age < 6) {
                    showCustomAlert(
                        "Usia Belum Memenuhi Syarat",
                        `Pendaftaran Gagal: Siswa atas nama <strong>${namaSiswa}</strong> saat ini berusia <strong>${age} tahun</strong>. Minimal usia untuk mendaftar adalah <strong>6 tahun</strong>. Silakan daftar kembali pada periode yang sesuai.`,
                        "warning"
                    );
                    return;
                }
            }

            // 4b. Nama siswa dan nama orang tua tidak boleh sama
            if (namaSiswa.trim().toLowerCase() === namaOrtu.trim().toLowerCase()) {
                showCustomAlert(
                    "Nama Tidak Valid",
                    `Pendaftaran Gagal: Nama siswa (<strong>${namaSiswa}</strong>) dan nama orang tua/wali tidak boleh sama. Harap periksa kembali data yang Anda masukkan.`,
                    "error"
                );
                return;
            }

            // 5. NIK Duplicate Check
            const ppdb = JSON.parse(localStorage.getItem(L_KEY_PPDB)) || [];
            const duplicateNik = ppdb.find(item => item.nik === nik);
            if (duplicateNik) {
                showCustomAlert("NIK Sudah Terdaftar", `Pendaftaran Gagal: NIK <strong>${nik}</strong> sudah terdaftar sebelumnya untuk siswa bernama <strong>"${duplicateNik.namaSiswa}"</strong>!`, "error");
                return;
            }

            // 6. Set button loading state
            btnSubmit.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Mengunggah Berkas...`;
            btnSubmit.style.opacity = '0.8';
            btnSubmit.disabled = true;

            // 7. Upload files to Google Drive via GAS (if URL configured)
            const gasUrl = localStorage.getItem(L_KEY_GAS_URL) || '';
            let fileFotoUrl  = 'foto_default.jpg';
            let fileKKUrl    = 'kk_default.pdf';
            let fileAktaUrl  = 'akta_default.pdf';
            let fileKIAUrl   = '';

            if (gasUrl) {
                try {
                    const totalFiles = [selectedFiles.FileFoto, selectedFiles.FileKK, selectedFiles.FileAkta, selectedFiles.FileKIA].filter(Boolean).length;
                    let uploadedCount = 0;

                    // Upload Pas Foto
                    showUploadOverlay(`Mengunggah Pas Foto Siswa... (1/${totalFiles})`, Math.round((uploadedCount / (totalFiles * 2)) * 100));
                    fileFotoUrl = await uploadFileToGAS(gasUrl, selectedFiles.FileFoto, (pct) => {
                        showUploadOverlay(`Mengunggah Pas Foto Siswa... (1/${totalFiles})`, Math.round(((uploadedCount + pct / 100) / totalFiles) * 100));
                    });
                    uploadedCount++;

                    // Upload KK
                    showUploadOverlay(`Mengunggah Kartu Keluarga (KK)... (2/${totalFiles})`, Math.round((uploadedCount / totalFiles) * 100));
                    fileKKUrl = await uploadFileToGAS(gasUrl, selectedFiles.FileKK, (pct) => {
                        showUploadOverlay(`Mengunggah Kartu Keluarga (KK)... (2/${totalFiles})`, Math.round(((uploadedCount + pct / 100) / totalFiles) * 100));
                    });
                    uploadedCount++;

                    // Upload Akta
                    showUploadOverlay(`Mengunggah Akta Kelahiran... (3/${totalFiles})`, Math.round((uploadedCount / totalFiles) * 100));
                    fileAktaUrl = await uploadFileToGAS(gasUrl, selectedFiles.FileAkta, (pct) => {
                        showUploadOverlay(`Mengunggah Akta Kelahiran... (3/${totalFiles})`, Math.round(((uploadedCount + pct / 100) / totalFiles) * 100));
                    });
                    uploadedCount++;

                    // Upload KIA (optional)
                    if (selectedFiles.FileKIA) {
                        showUploadOverlay(`Mengunggah Kartu Identitas Anak (KIA)... (${totalFiles}/${totalFiles})`, Math.round((uploadedCount / totalFiles) * 100));
                        fileKIAUrl = await uploadFileToGAS(gasUrl, selectedFiles.FileKIA, (pct) => {
                            showUploadOverlay(`Mengunggah KIA... (${totalFiles}/${totalFiles})`, Math.round(((uploadedCount + pct / 100) / totalFiles) * 100));
                        });
                        uploadedCount++;
                    }

                    showUploadOverlay('Menyimpan data pendaftaran...', 100);

                } catch (uploadErr) {
                    hideUploadOverlay();
                    btnSubmit.innerHTML = originalText;
                    btnSubmit.disabled = false;
                    btnSubmit.style.opacity = '1';
                    showCustomAlert("Gagal Mengunggah Berkas", `Terjadi kesalahan saat mengunggah berkas ke Google Drive: <strong>${uploadErr.message}</strong>. Pastikan URL Google Apps Script sudah dikonfigurasi dengan benar di Admin Panel.`, "error");
                    return;
                }
            } else {
                // No GAS URL configured — store filenames as identifiers (offline mode)
                fileFotoUrl = selectedFiles.FileFoto.name;
                fileKKUrl   = selectedFiles.FileKK.name;
                fileAktaUrl = selectedFiles.FileAkta.name;
                fileKIAUrl  = selectedFiles.FileKIA ? selectedFiles.FileKIA.name : '';
            }

            // 8. Generate admission ID & date
            const randomNum   = Math.floor(1000 + Math.random() * 9000);
            const idDaftar    = `PPDB-${randomNum}`;
            const months      = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
            const today       = new Date();
            const formattedDate = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

            // 9. Save to localStorage
            const newApplicant = {
                id: idDaftar, tanggal: formattedDate,
                namaSiswa, nik, tanggalLahir, gender, jalur, namaOrtu, email, phone,
                fileFoto: fileFotoUrl, fileKK: fileKKUrl, fileAkta: fileAktaUrl, fileKIA: fileKIAUrl,
                status: 'Menunggu'
            };
            ppdb.unshift(newApplicant);
            localStorage.setItem(L_KEY_PPDB, JSON.stringify(ppdb));

            // 10. Sync to Google Sheets via Google Forms (Headless)
            if (typeof GOOGLE_FORM_URL !== 'undefined' && GOOGLE_FORM_URL) {
                const formBody = new URLSearchParams();
                formBody.append("entry.1888602263", idDaftar);
                formBody.append("entry.150206719", formattedDate);
                formBody.append("entry.1334280073", namaSiswa);
                formBody.append("entry.1402434435", nik);
                formBody.append("entry.865198982", tanggalLahir);
                formBody.append("entry.1875077086", gender);
                formBody.append("entry.1603866552", jalur);
                formBody.append("entry.1545311289", namaOrtu);
                formBody.append("entry.2092293265", email);
                formBody.append("entry.1374736855", phone);
                formBody.append("entry.1475751901", fileFotoUrl);
                formBody.append("entry.880731211", fileKKUrl);
                formBody.append("entry.1172729308", fileAktaUrl);
                formBody.append("entry.252286770", fileKIAUrl);
                formBody.append("entry.1008215135", 'Menunggu');

                fetch(GOOGLE_FORM_URL, {
                    method: "POST", mode: "no-cors", credentials: "include",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: formBody
                })
                .then(() => console.log("Data PPDB berhasil disinkronkan ke Google Sheets!"))
                .catch(err => console.error("Gagal sinkronisasi ke Google Sheets:", err));
            }

            if (typeof renderAdminPPDB === 'function') renderAdminPPDB();

            // Reset selected files state
            selectedFiles = { FileFoto: null, FileKK: null, FileAkta: null, FileKIA: null };

            hideUploadOverlay();

            // 11. Show success state
            setTimeout(() => {
                if (modalBody) {
                    modalBody.innerHTML = `
                        <div class="modal-success-state">
                            <div class="modal-success-icon">
                                <i class='bx bxs-check-circle'></i>
                            </div>
                            <h4 class="modal-success-title">Pendaftaran Berhasil!</h4>
                            <p class="modal-success-desc">Terima kasih telah mendaftarkan <strong>${namaSiswa}</strong> di SDN Tunas Mekar. Data dan berkas dokumen calon siswa telah kami terima dan masuk dalam tahap verifikasi.<br><br>Tim PPDB kami akan menghubungi Anda melalui nomor WhatsApp yang diberikan dalam waktu 1-2 hari kerja.</p>
                            <button class="btn btn-primary" onclick="closeModal()">Tutup</button>
                        </div>
                    `;
                }
                btnSubmit.innerHTML = originalText;
                btnSubmit.disabled = false;
                btnSubmit.style.opacity = '1';
            }, 500);
        });
    }
}
// Make closeModal globally accessible for onclick in success button
window.closeModal = closeModal;

// Initialize form submit binding
bindFormSubmit();


/* =========================================
   11. LACAK STATUS SEARCH HANDLER
   ========================================= */
const btnTrack = document.getElementById('btnTrack');
const trackerInput = document.getElementById('trackerInput');
const trackerResult = document.getElementById('trackerResult');

if (btnTrack && trackerInput && trackerResult) {
    btnTrack.addEventListener('click', () => {
        const id = trackerInput.value.trim().toUpperCase();
        if (!id) return;
        
        const found = localAspirations.find(a => a.id === id);
        trackerResult.classList.remove('hidden');
        
        if (found) {
            let badgeClass = 'status-waiting';
            let statusText = 'Menunggu';
            
            if (found.statusProgress === 'Proses') {
                badgeClass = 'status-process';
                statusText = 'Proses';
            } else if (found.statusProgress === 'Selesai') {
                badgeClass = 'status-completed';
                statusText = 'Selesai';
            }
            
            let stepsHTML = '';
            found.steps.forEach(step => {
                let stepClass = '';
                if (step.completed) stepClass = 'completed';
                else if (step.active) stepClass = 'active';
                
                stepsHTML += `
                    <div class="timeline-step ${stepClass}">
                        <div class="step-title">${step.name}</div>
                        <div class="step-desc">${step.desc}</div>
                    </div>
                `;
            });
            
            trackerResult.innerHTML = `
                <div class="result-header">
                    <span class="result-id">${found.id}</span>
                    <span class="status-badge ${badgeClass}">${statusText}</span>
                </div>
                <div class="result-title-text">"${found.judul}"</div>
                <div class="timeline">
                    ${stepsHTML}
                </div>
            `;
        } else {
            trackerResult.innerHTML = `
                <div style="text-align: center; color: var(--primary-color); font-size: 13px; font-weight: 500; padding: 10px 0;">
                    <i class='bx bx-error-circle' style="font-size: 24px; vertical-align: middle; margin-bottom: 5px;"></i><br>
                    ID Tiket "${id}" tidak ditemukan. Pastikan format penulisan benar (contoh: ASP-1205).
                </div>
            `;
        }
    });

    // Support enter key on search input
    trackerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnTrack.click();
        }
    });
}

/* =========================================
   12. LOGIKA PANEL ADMIN & PERSISTENCE
   ========================================= */

// Inisialisasi Kunci LocalStorage
const L_KEY_STATS = 'sdn_tunas_stats';
const L_KEY_INFO = 'sdn_tunas_info';
const L_KEY_NEWS = 'sdn_tunas_news';
const L_KEY_ASPIRASI = 'sdn_tunas_aspirasi';
const L_KEY_PPDB = 'sdn_tunas_ppdb';
const L_KEY_KALDIK_URL = 'sdn_tunas_kaldik_url';
const L_KEY_GAS_URL = 'sdn_tunas_gas_url';

let selectedFiles = {
    FileFoto: null,
    FileKK: null,
    FileAkta: null,
    FileKIA: null
};

// Data Default Bawaan (Hasil Survei Riil)
const defaultStats = { siswa: 210, guru: 9, rombel: 7 };
const defaultKaldikUrl = "asset/KALDIK 2025-2026 KOTA CIMAHI - Halel_22.pdf";
const defaultPPDB = [
    {
        id: 'PPDB-1042',
        tanggal: '24 Mei 2026',
        namaSiswa: 'Ahmad Dani',
        nik: '3277011205190001',
        tanggalLahir: '2019-05-12',
        gender: 'Laki-laki',
        jalur: 'Zonasi',
        namaOrtu: 'Hendi',
        email: 'hendi.parent@gmail.com',
        phone: '08123456789',
        fileFoto: 'pasfoto_ahmad_dani.jpg',
        fileKK: 'kk_hendi_family.pdf',
        fileAkta: 'akta_ahmad_dani.pdf',
        fileKIA: 'kia_ahmad_dani.jpg',
        status: 'Menunggu'
    },
    {
        id: 'PPDB-1087',
        tanggal: '20 Mei 2026',
        namaSiswa: 'Siti Aminah',
        nik: '3277010509190002',
        tanggalLahir: '2019-09-05',
        gender: 'Perempuan',
        jalur: 'Afirmasi',
        namaOrtu: 'Asep',
        email: 'asep.family@gmail.com',
        phone: '082345678901',
        fileFoto: 'pasfoto_siti_aminah.jpg',
        fileKK: 'kk_asep_family.pdf',
        fileAkta: 'akta_siti_aminah.pdf',
        fileKIA: '',
        status: 'Diverifikasi'
    }
];
const defaultInfo = {
    kepsek: "Rahmat Ramdhan, S.Pd.",
    phone: "(022) 6123411",
    email: "tunasmekar19@gmail.com",
    instagram: "@sdn.tunasmekar"
};
const defaultNews = [
    {
        day: "24",
        month: "Mei",
        title: "SDN Tunas Mekar Sukses Raih Penghargaan Lomba FLS3N Tingkat Kota",
        excerpt: "Kabar membanggakan! Perwakilan siswa SDN Tunas Mekar sukses menyabet penghargaan dalam ajang Festival dan Lomba Seni Siswa Nasional (FLS3N) tingkat Kota Cimahi pada mata lomba Mendongeng..."
    },
    {
        day: "20",
        month: "Jun",
        title: "Pengumuman: Pengambilan Rapor Hasil Belajar Semester Genap",
        excerpt: "Sehubungan dengan berakhirnya kalender akademik semester genap, kami mengundang bapak/ibu orang tua/wali siswa untuk menghadiri pembagian rapor di kelas masing-masing..."
    },
    {
        day: "15",
        month: "Mei",
        title: "Program \"Jumat Rohani\" Membentuk Karakter Islami yang Tangguh",
        excerpt: "Membiasakan shalat berjamaah, pembacaan tadarus surah pendek, serta kajian akhlak kesiswaan. Program Jumat Rohani terbukti membangun motivasi spiritual bagi seluruh siswa..."
    }
];

// 1. FUNGSI TOAST NOTIFICATION
function showAdminToast(message, type = 'success') {
    const container = document.getElementById('adminToastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `admin-toast admin-toast-${type}`;
    
    const icon = type === 'success' ? 'bx-check-circle' : 'bx-error-alt';
    toast.innerHTML = `
        <i class='bx ${icon}'></i>
        <div class="admin-toast-content">${message}</div>
    `;
    
    container.appendChild(toast);
    
    // Slide in
    setTimeout(() => toast.classList.add('show'), 50);
    
    // Auto dismiss setelah 3.5 detik
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// 2. DETEKTOR 5 KLIK LOGO
let logoClickCount = 0;
let logoClickTimer = null;
const logoTrigger = document.getElementById('logoTrigger');

if (logoTrigger) {
    logoTrigger.addEventListener('click', (e) => {
        e.preventDefault(); // Mencegah scroll ke atas
        logoClickCount++;
        
        // Reset counter setelah 3 detik jika tidak terpenuhi
        clearTimeout(logoClickTimer);
        logoClickTimer = setTimeout(() => {
            logoClickCount = 0;
        }, 3000);
        
        if (logoClickCount === 5) {
            logoClickCount = 0;
            clearTimeout(logoClickTimer);
            
            // Tampilkan Password Modal
            const pwdModal = document.getElementById('adminPasswordModal');
            if (pwdModal) {
                pwdModal.classList.add('show');
                document.getElementById('adminPasswordInput').focus();
                document.getElementById('adminPasswordInput').value = '';
                document.getElementById('adminErrorText').style.display = 'none';
            }
        }
    });
}

// 3. LOGIKA MODAL PASSWORD
const closePwdModal = document.getElementById('closePwdModal');
const btnUnlockAdmin = document.getElementById('btnUnlockAdmin');
const adminPasswordInput = document.getElementById('adminPasswordInput');

const closePwdFn = () => {
    const pwdModal = document.getElementById('adminPasswordModal');
    if (pwdModal) pwdModal.classList.remove('show');
};

if (closePwdModal) closePwdModal.addEventListener('click', closePwdFn);

const checkPassword = () => {
    const password = adminPasswordInput.value;
    const errorText = document.getElementById('adminErrorText');
    
    if (password === 'admin123') {
        // Sandi Benar
        closePwdFn();
        
        // Buka Dashboard Modal
        const dbModal = document.getElementById('adminDashboardModal');
        if (dbModal) {
            dbModal.classList.add('show');
            loadAdminDashboardData();
            showAdminToast('Dashboard admin berhasil dibuka!', 'success');
        }
    } else {
        // Sandi Salah
        errorText.style.display = 'block';
        adminPasswordInput.focus();
    }
};

if (btnUnlockAdmin) btnUnlockAdmin.addEventListener('click', checkPassword);
if (adminPasswordInput) {
    adminPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });
}

// 4. LOGIKA TAB DASHBOARD
function switchAdminTab(tabId) {
    // Nonaktifkan semua tab button
    const tabs = document.querySelectorAll('.admin-tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    
    // Nonaktifkan semua panel content
    const panels = document.querySelectorAll('.admin-panel-content');
    panels.forEach(p => p.classList.remove('active'));
    
    // Cari tab button yang diklik dan aktifkan
    const activeBtn = Array.from(tabs).find(t => t.getAttribute('onclick').includes(tabId));
    if (activeBtn) activeBtn.classList.add('active');
    
    // Aktifkan panel konten yang sesuai
    const activePanel = document.getElementById(tabId);
    if (activePanel) activePanel.classList.add('active');
}

// 5. PENUTUP DASHBOARD MODAL
const closeDashboardModal = document.getElementById('closeDashboardModal');
if (closeDashboardModal) {
    closeDashboardModal.addEventListener('click', () => {
        const dbModal = document.getElementById('adminDashboardModal');
        if (dbModal) dbModal.classList.remove('show');
    });
}

// 6. FUNGSI PERSISTENCE & DYNAMIC RENDERING

// Memuat data dari LocalStorage saat halaman pertama kali dibuka
document.addEventListener('DOMContentLoaded', () => {
    initLocalState();
    renderPublicUI();
});

function initLocalState() {
    // 1. Inisialisasi Statistik
    if (!localStorage.getItem(L_KEY_STATS)) {
        localStorage.setItem(L_KEY_STATS, JSON.stringify(defaultStats));
    }
    
    // 2. Inisialisasi Info Kontak
    if (!localStorage.getItem(L_KEY_INFO)) {
        localStorage.setItem(L_KEY_INFO, JSON.stringify(defaultInfo));
    }
    
    // 3. Inisialisasi Berita
    if (!localStorage.getItem(L_KEY_NEWS)) {
        localStorage.setItem(L_KEY_NEWS, JSON.stringify(defaultNews));
    }
    
    // 4. Inisialisasi Aspirasi
    if (!localStorage.getItem(L_KEY_ASPIRASI)) {
        // Sync dengan data bawaan array localAspirations di script.js
        localStorage.setItem(L_KEY_ASPIRASI, JSON.stringify(localAspirations));
    } else {
        // Jika ada di localStorage, timpa array localAspirations agar sejalan
        const savedAspirations = JSON.parse(localStorage.getItem(L_KEY_ASPIRASI));
        localAspirations.length = 0; // Kosongkan array asli
        savedAspirations.forEach(a => localAspirations.push(a)); // Isi dengan data tersimpan
        renderRecentAspirasi();
    }

    // 5. Inisialisasi Kalender
    if (!localStorage.getItem(L_KEY_KALDIK_URL)) {
        localStorage.setItem(L_KEY_KALDIK_URL, defaultKaldikUrl);
    }
    
    // 6. Inisialisasi PPDB
    if (!localStorage.getItem(L_KEY_PPDB)) {
        localStorage.setItem(L_KEY_PPDB, JSON.stringify(defaultPPDB));
    }
    
    // 7. Inisialisasi Google Apps Script URL
    if (!localStorage.getItem(L_KEY_GAS_URL)) {
        localStorage.setItem(L_KEY_GAS_URL, '');
    }
}

// Render data statis dan berita ke halaman publik
function renderPublicUI() {
    const stats = JSON.parse(localStorage.getItem(L_KEY_STATS));
    const info = JSON.parse(localStorage.getItem(L_KEY_INFO));
    const news = JSON.parse(localStorage.getItem(L_KEY_NEWS));
    
    // Render Statistik
    const statSiswa = document.querySelector('.stat-item:nth-child(1) .counter');
    const statGuru = document.querySelector('.stat-item:nth-child(2) .counter');
    const statRombel = document.querySelector('.stat-item:nth-child(3) .counter');
    
    if (statSiswa) {
        statSiswa.setAttribute('data-target', stats.siswa);
        statSiswa.textContent = stats.siswa;
    }
    if (statGuru) {
        statGuru.setAttribute('data-target', stats.guru);
        statGuru.textContent = stats.guru;
    }
    if (statRombel) {
        statRombel.setAttribute('data-target', stats.rombel);
        statRombel.textContent = stats.rombel;
    }
    
    // Render statistik di list Tentang Kami
    const guruLi = document.querySelector('.tentang-list li:nth-child(3)');
    if (guruLi) {
        guruLi.innerHTML = `<i class='bx bx-check-circle'></i> Dididik oleh <strong>${stats.guru} Guru S1</strong> & 3 Tenaga Kependidikan`;
    }
    
    // Render Info Utama & Kepala Sekolah
    const para2 = document.querySelectorAll('.tentang-description')[1];
    if (para2) {
        const kepsekStrong = para2.querySelector('strong');
        if (kepsekStrong) kepsekStrong.textContent = info.kepsek;
    }
    
    // Render Info Kontak Footer
    const emailLi = document.querySelector('.footer-contact li:nth-child(3)');
    if (emailLi) emailLi.innerHTML = `<i class='bx bx-envelope'></i> ${info.email}`;
    
    const phoneLi = document.querySelector('.footer-contact li:nth-child(4)');
    if (phoneLi) phoneLi.innerHTML = `<i class='bx bx-phone'></i> ${info.phone}`;
    
    const instaLi = document.querySelector('.footer-contact li:nth-child(5)');
    if (instaLi) instaLi.innerHTML = `<i class='bx bxl-instagram'></i> ${info.instagram}`;
    
    // Render Berita Terbaru secara dinamis
    const beritaList = document.querySelector('.berita-list');
    if (beritaList) {
        beritaList.innerHTML = '';
        news.forEach(n => {
            const newsItemHTML = `
                <div class="berita-item">
                    <div class="berita-date">
                        <span class="date-day">${n.day}</span>
                        <span class="date-month">${n.month}</span>
                    </div>
                    <div class="berita-content">
                        <h4 class="berita-title">${n.title}</h4>
                        <p class="berita-excerpt">${n.excerpt}</p>
                        <a href="javascript:void(0)" class="btn-link">Baca Selengkapnya</a>
                    </div>
                </div>
            `;
            beritaList.insertAdjacentHTML('beforeend', newsItemHTML);
        });
    }

    // Render Tautan Kalender
    const kaldikUrl = localStorage.getItem(L_KEY_KALDIK_URL) || defaultKaldikUrl;
    
    const navKaldik = document.getElementById('navKaldikLink');
    const footerKaldik = document.getElementById('footerKaldikLink');
    
    if (navKaldik) navKaldik.setAttribute('href', kaldikUrl);
    if (footerKaldik) footerKaldik.setAttribute('href', kaldikUrl);
}

// Memuat data ke form dan tabel di Dashboard Admin
function loadAdminDashboardData() {
    const stats = JSON.parse(localStorage.getItem(L_KEY_STATS));
    const info = JSON.parse(localStorage.getItem(L_KEY_INFO));
    
    // Pre-fill Form Statistik
    document.getElementById('dbStatSiswa').value = stats.siswa;
    document.getElementById('dbStatGuru').value = stats.guru;
    document.getElementById('dbStatRombel').value = stats.rombel;
    
    // Pre-fill Form Info Sekolah
    document.getElementById('dbInfoKepsek').value = info.kepsek;
    document.getElementById('dbInfoPhone').value = info.phone;
    document.getElementById('dbInfoEmail').value = info.email;
    document.getElementById('dbInfoInstagram').value = info.instagram;
    
    // Pre-fill Form Kalender
    const dbInfoKaldikUrl = document.getElementById('dbInfoKaldikUrl');
    if (dbInfoKaldikUrl) {
        dbInfoKaldikUrl.value = localStorage.getItem(L_KEY_KALDIK_URL) || defaultKaldikUrl;
    }
    
    // Pre-fill Form GAS Upload URL
    const dbInfoGasUrl = document.getElementById('dbInfoGasUrl');
    if (dbInfoGasUrl) {
        dbInfoGasUrl.value = localStorage.getItem(L_KEY_GAS_URL) || '';
    }
    
    // Render Tabel PPDB, Aspirasi & Berita di Admin
    renderAdminAspirations();
    renderAdminNews();
    renderAdminPPDB();
}

// 7. PANEL KELOLA ASPIRASI
function renderAdminAspirations() {
    const tblBody = document.getElementById('adminAspirasiTableBody');
    if (!tblBody) return;
    
    tblBody.innerHTML = '';
    
    // Baca data ter-update
    const aspirations = JSON.parse(localStorage.getItem(L_KEY_ASPIRASI)) || [];
    
    if (aspirations.length === 0) {
        tblBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #999;">Tidak ada data aspirasi masuk.</td></tr>`;
        return;
    }
    
    aspirations.forEach((item, index) => {
        let selectClass = 'status-waiting';
        if (item.statusProgress === 'Proses') selectClass = 'status-process';
        else if (item.statusProgress === 'Selesai') selectClass = 'status-completed';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 700; color: var(--primary-color);">${item.id}</td>
            <td><strong>${item.nama}</strong><br><span style="font-size: 11px; color:#777;">${item.status}</span></td>
            <td><div style="font-weight: 500;">"${item.judul}"</div><span style="font-size: 11px; color:#999;">Diterima: ${item.tanggal}</span></td>
            <td>
                <select class="admin-select-status ${selectClass}" onchange="updateAspirasiStatus('${item.id}', this)">
                    <option value="Menunggu" ${item.statusProgress === 'Menunggu' ? 'selected' : ''}>Menunggu</option>
                    <option value="Proses" ${item.statusProgress === 'Proses' ? 'selected' : ''}>Proses</option>
                    <option value="Selesai" ${item.statusProgress === 'Selesai' ? 'selected' : ''}>Selesai</option>
                </select>
            </td>
            <td>
                <button class="admin-btn admin-btn-del" onclick="deleteAspirasi('${item.id}')"><i class='bx bx-trash'></i> Hapus</button>
            </td>
        `;
        tblBody.appendChild(row);
    });
}

// Fungsi Update Status Aspirasi dari Dropdown Admin
function updateAspirasiStatus(id, selectElem) {
    const newStatus = selectElem.value;
    
    // Perbarui kelas CSS dropdown kustom
    selectElem.className = 'admin-select-status';
    if (newStatus === 'Menunggu') selectElem.classList.add('status-waiting');
    else if (newStatus === 'Proses') selectElem.classList.add('status-process');
    else if (newStatus === 'Selesai') selectElem.classList.add('status-completed');
    
    // Update data di array & localStorage
    const aspirations = JSON.parse(localStorage.getItem(L_KEY_ASPIRASI)) || [];
    const found = aspirations.find(a => a.id === id);
    
    if (found) {
        found.statusProgress = newStatus;
        
        // Update detail langkah-langkah timeline untuk visual Lacak
        found.steps.forEach(step => {
            step.completed = false;
            step.active = false;
        });
        
        if (newStatus === 'Menunggu') {
            found.steps[0].active = true;
        } else if (newStatus === 'Proses') {
            found.steps[0].completed = true;
            found.steps[1].completed = true;
            found.steps[2].active = true;
        } else if (newStatus === 'Selesai') {
            found.steps.forEach(s => s.completed = true);
        }
        
        // Simpan
        localStorage.setItem(L_KEY_ASPIRASI, JSON.stringify(aspirations));
        
        // Sync dengan array global script.js
        localAspirations.length = 0;
        aspirations.forEach(a => localAspirations.push(a));
        
        // Sync UI Publik
        renderRecentAspirasi();
        
        // Jika sedang melacak tiket tersebut, perbarui tampilannya langsung secara dinamis!
        const btnTrack = document.getElementById('btnTrack');
        if (btnTrack) {
            const trackerInput = document.getElementById('trackerInput');
            if (trackerInput && trackerInput.value.trim().toUpperCase() === id) {
                btnTrack.click(); // Trigger ulang klik lacak untuk me-render data status baru
            }
        }
        
        showAdminToast(`Status tiket ${id} diubah ke "${newStatus}"!`, 'success');
    }
}

// Fungsi Hapus Aspirasi
function deleteAspirasi(id) {
    if (!confirm(`Apakah Anda yakin ingin menghapus tiket aspirasi ${id}?`)) return;
    
    let aspirations = JSON.parse(localStorage.getItem(L_KEY_ASPIRASI)) || [];
    aspirations = aspirations.filter(a => a.id !== id);
    
    localStorage.setItem(L_KEY_ASPIRASI, JSON.stringify(aspirations));
    
    // Sync array global
    localAspirations.length = 0;
    aspirations.forEach(a => localAspirations.push(a));
    
    // Re-render
    renderAdminAspirations();
    renderRecentAspirasi();
    
    // Hapus tampilan Lacak jika sedang dibuka
    const trackerInput = document.getElementById('trackerInput');
    const trackerResult = document.getElementById('trackerResult');
    if (trackerInput && trackerResult && trackerInput.value.trim().toUpperCase() === id) {
        trackerInput.value = '';
        trackerResult.classList.add('hidden');
    }
    
    showAdminToast(`Aspirasi ${id} berhasil dihapus!`, 'success');
}

// Fungsi Muat Ulang Demo Aspirasi
function resetAspirasiDemo() {
    if (!confirm('Apakah Anda ingin memulihkan daftar demo aspirasi bawaan?')) return;
    
    // Hapus localStorage aspirasi
    localStorage.removeItem(L_KEY_ASPIRASI);
    
    // Sync ulang
    const defaultAspirations = [
        {
            id: 'ASP-1205',
            nama: 'Budi S***',
            status: 'Orang Tua',
            judul: 'Peningkatan Fasilitas Lab Komputer',
            statusProgress: 'Proses',
            tanggal: '18 Mei 2026',
            steps: [
                { name: 'Aspirasi Diterima', desc: 'Diterima oleh sistem pengaduan sekolah.', completed: true },
                { name: 'Verifikasi Pengaduan', desc: 'Lolos verifikasi oleh Humas sekolah.', completed: true },
                { name: 'Tindak Lanjut / Proses', desc: 'Pengadaan unit komputer tambahan sedang dijadwalkan.', active: true },
                { name: 'Selesai', desc: 'Unit komputer tambahan terpasang dan siap digunakan.' }
            ]
        },
        {
            id: 'ASP-2489',
            nama: 'Kevin A***',
            status: 'Siswa',
            judul: 'Usulan Kegiatan Ekstrakurikuler Robotik',
            statusProgress: 'Selesai',
            tanggal: '10 Mei 2026',
            steps: [
                { name: 'Aspirasi Diterima', desc: 'Diterima oleh sistem pengaduan sekolah.', completed: true },
                { name: 'Verifikasi Pengaduan', desc: 'Lolos verifikasi oleh Humas sekolah.', completed: true },
                { name: 'Tindak Lanjut / Proses', desc: 'Rapat kesiswaan menyetujui usulan.', completed: true },
                { name: 'Selesai', desc: 'Eskul Robotik disetujui dan akan dimulai ajaran baru.', completed: true }
            ]
        },
        {
            id: 'ASP-3512',
            nama: 'Rahmat H***',
            status: 'Masyarakat',
            judul: 'Perbaikan Area Parkir dan Gerbang Depan',
            statusProgress: 'Menunggu',
            tanggal: '19 Mei 2026',
            steps: [
                { name: 'Aspirasi Diterima', desc: 'Diterima dan menunggu giliran verifikasi.', active: true },
                { name: 'Verifikasi Pengaduan', desc: 'Verifikasi keaslian dan relevansi data.' },
                { name: 'Tindak Lanjut / Proses', desc: 'Penjadwalan survei sarana prasarana.' },
                { name: 'Selesai', desc: 'Area parkir dirapikan dan gerbang diperbaiki.' }
            ]
        }
    ];
    
    localStorage.setItem(L_KEY_ASPIRASI, JSON.stringify(defaultAspirations));
    
    localAspirations.length = 0;
    defaultAspirations.forEach(a => localAspirations.push(a));
    
    renderAdminAspirations();
    renderRecentAspirasi();
    
    showAdminToast('Demo Aspirasi berhasil dipulihkan!', 'success');
}

// 8. PANEL KELOLA BERITA
function renderAdminNews() {
    const tblBody = document.getElementById('adminBeritaTableBody');
    if (!tblBody) return;
    
    tblBody.innerHTML = '';
    const news = JSON.parse(localStorage.getItem(L_KEY_NEWS)) || [];
    
    if (news.length === 0) {
        tblBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #999;">Tidak ada berita yang dipublikasikan.</td></tr>`;
        return;
    }
    
    news.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 600;">${item.day} ${item.month}</td>
            <td style="font-weight: 600; color: var(--primary-color);">${item.title}</td>
            <td><span style="font-size:12px; color:#666;">${item.excerpt.substring(0, 75)}...</span></td>
            <td>
                <button class="admin-btn admin-btn-del" onclick="deleteNews(${index})"><i class='bx bx-trash'></i> Hapus</button>
            </td>
        `;
        tblBody.appendChild(row);
    });
}

// Form Submit Tambah Berita Baru
const adminBeritaForm = document.getElementById('adminBeritaForm');
if (adminBeritaForm) {
    adminBeritaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const day = document.getElementById('newsDay').value;
        const month = document.getElementById('newsMonth').value;
        const title = document.getElementById('newsTitle').value;
        const excerpt = document.getElementById('newsExcerpt').value;
        
        const news = JSON.parse(localStorage.getItem(L_KEY_NEWS)) || [];
        
        // Masukkan di urutan teratas (unshift)
        news.unshift({ day, month, title, excerpt });
        
        // Simpan & Render
        localStorage.setItem(L_KEY_NEWS, JSON.stringify(news));
        renderAdminNews();
        renderPublicUI();
        
        // Reset form
        adminBeritaForm.reset();
        
        showAdminToast('Berita baru berhasil dipublikasikan!', 'success');
    });
}

// Fungsi Hapus Berita
function deleteNews(index) {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;
    
    const news = JSON.parse(localStorage.getItem(L_KEY_NEWS)) || [];
    news.splice(index, 1);
    
    localStorage.setItem(L_KEY_NEWS, JSON.stringify(news));
    renderAdminNews();
    renderPublicUI();
    
    showAdminToast('Berita berhasil dihapus!', 'success');
}

// 9. PANEL UPDATE STATISTIK & INFO KONTAK
const adminProfileForm = document.getElementById('adminProfileForm');
if (adminProfileForm) {
    adminProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 1. Ambil Nilai Form Statistik
        const siswa = parseInt(document.getElementById('dbStatSiswa').value);
        const guru = parseInt(document.getElementById('dbStatGuru').value);
        const rombel = parseInt(document.getElementById('dbStatRombel').value);
        
        // 2. Ambil Nilai Form Info Kontak
        const kepsek = document.getElementById('dbInfoKepsek').value;
        const phone = document.getElementById('dbInfoPhone').value;
        const email = document.getElementById('dbInfoEmail').value;
        const instagram = document.getElementById('dbInfoInstagram').value;
        
        // 3. Simpan Statistik
        const newStats = { siswa, guru, rombel };
        localStorage.setItem(L_KEY_STATS, JSON.stringify(newStats));
        
        // 4. Simpan Profil
        const newInfo = { kepsek, phone, email, instagram };
        localStorage.setItem(L_KEY_INFO, JSON.stringify(newInfo));
        
        // 4.5. Simpan Kalender
        const newKaldikUrl = document.getElementById('dbInfoKaldikUrl').value.trim();
        if (newKaldikUrl) {
            localStorage.setItem(L_KEY_KALDIK_URL, newKaldikUrl);
        }
        
        // 4.6. Simpan Google Apps Script URL
        const dbInfoGasUrl = document.getElementById('dbInfoGasUrl');
        if (dbInfoGasUrl) {
            localStorage.setItem(L_KEY_GAS_URL, dbInfoGasUrl.value.trim());
        }
        
        // 5. Render Perubahan ke Publik UI secara instan!
        renderPublicUI();
        
        // Tutup modal agar dapat melihat perubahannya
        const dbModal = document.getElementById('adminDashboardModal');
        if (dbModal) dbModal.classList.remove('show');
        
        showAdminToast('Seluruh profil & statistik berhasil diperbarui!', 'success');
    });
}

// 10. RESET DATA PABRIK (FACTORY RESET)
function resetFactorySettings() {
    if (!confirm('PERINGATAN: Apakah Anda yakin ingin melakukan "Reset Pabrik"? Semua data pengeditan, statistik, berita kustom, dan aspirasi yang telah Anda ubah akan dihapus secara permanen dan dikembalikan ke data awal hasil survei.')) return;
    
    // Bersihkan seluruh Kunci LocalStorage kita
    localStorage.removeItem(L_KEY_STATS);
    localStorage.removeItem(L_KEY_INFO);
    localStorage.removeItem(L_KEY_NEWS);
    localStorage.removeItem(L_KEY_ASPIRASI);
    localStorage.removeItem(L_KEY_PPDB);
    localStorage.removeItem(L_KEY_KALDIK_URL);
    
    // Tutup Modal
    const dbModal = document.getElementById('adminDashboardModal');
    if (dbModal) dbModal.classList.remove('show');
    
    showAdminToast('Melakukan reset data bawaan...', 'success');
    
    // Reload halaman setelah 1.5 detik untuk mengambil state baru
    setTimeout(() => {
        window.location.reload();
    }, 1500);
}

// 11. PANEL KELOLA PPDB (PENDAFTAR ONLINE)
function renderAdminPPDB() {
    const tblBody = document.getElementById('adminPPDBTableBody');
    if (!tblBody) return;
    
    tblBody.innerHTML = '';
    const ppdbList = JSON.parse(localStorage.getItem(L_KEY_PPDB)) || [];
    
    if (ppdbList.length === 0) {
        tblBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #999; padding: 20px 0;">Tidak ada calon siswa baru yang terdaftar.</td></tr>`;
        return;
    }
    
    ppdbList.forEach((item) => {
        let selectClass = 'status-waiting';
        if (item.status === 'Diverifikasi') selectClass = 'status-verified';
        else if (item.status === 'Diterima') selectClass = 'status-accepted';
        else if (item.status === 'Ditolak') selectClass = 'status-rejected';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 700; color: var(--primary-color);">${item.id}</td>
            <td>
                <strong>${item.namaSiswa}</strong>
                <br>
                <span style="font-size: 11px; color: #777;">NIK: ${item.nik || '-'}</span>
                <br>
                <span style="font-size: 11px; color: #999;">Lahir: ${item.tanggalLahir}</span>
            </td>
            <td>
                <strong>${item.namaOrtu}</strong>
                <br>
                <span style="font-size: 11px; color: #777;">Email: ${item.email || '-'}</span>
                <br>
                <span style="font-size: 11px; color: #999;">WA: ${item.phone}</span>
            </td>
            <td>
                <span style="font-weight: 500;">${item.jalur}</span>
                <br>
                <span style="font-size: 11px; color: #777;">${item.gender}</span>
                <br>
                <div style="font-size: 10px; color: #555; margin-top: 4px; background: rgba(0,0,0,0.03); padding: 4px 6px; border-radius: 4px; display: inline-block;">
                    <i class='bx bx-paperclip' style="vertical-align: middle;"></i> 
                    Foto: ${item.fileFoto ? (item.fileFoto.startsWith('http') ? `<a href="${item.fileFoto}" target="_blank" style="color:#2563eb; text-decoration:underline; font-weight:600;">Buka <i class='bx bx-link-external' style="font-size:10px; vertical-align:middle;"></i></a>` : `<span style="color:#2563eb; cursor:pointer;" onclick="showCustomAlert('Berkas Lokal', 'Membuka Berkas Mock: ${item.fileFoto}', 'warning')">Ada</span>`) : '-'} | 
                    KK: ${item.fileKK ? (item.fileKK.startsWith('http') ? `<a href="${item.fileKK}" target="_blank" style="color:#2563eb; text-decoration:underline; font-weight:600;">Buka <i class='bx bx-link-external' style="font-size:10px; vertical-align:middle;"></i></a>` : `<span style="color:#2563eb; cursor:pointer;" onclick="showCustomAlert('Berkas Lokal', 'Membuka Berkas Mock: ${item.fileKK}', 'warning')">Ada</span>`) : '-'} | 
                    Akta: ${item.fileAkta ? (item.fileAkta.startsWith('http') ? `<a href="${item.fileAkta}" target="_blank" style="color:#2563eb; text-decoration:underline; font-weight:600;">Buka <i class='bx bx-link-external' style="font-size:10px; vertical-align:middle;"></i></a>` : `<span style="color:#2563eb; cursor:pointer;" onclick="showCustomAlert('Berkas Lokal', 'Membuka Berkas Mock: ${item.fileAkta}', 'warning')">Ada</span>`) : '-'}
                    ${item.fileKIA ? ` | KIA: ${item.fileKIA.startsWith('http') ? `<a href="${item.fileKIA}" target="_blank" style="color:#2563eb; text-decoration:underline; font-weight:600;">Buka <i class='bx bx-link-external' style="font-size:10px; vertical-align:middle;"></i></a>` : `<span style="color:#2563eb; cursor:pointer;" onclick="showCustomAlert('Berkas Lokal', 'Membuka Berkas Mock: ${item.fileKIA}', 'warning')">Ada</span>`}` : ''}
                </div>
            </td>
            <td>
                <select class="admin-select-status ${selectClass}" onchange="updatePPDBStatus('${item.id}', this)">
                    <option value="Menunggu" ${item.status === 'Menunggu' ? 'selected' : ''}>Menunggu</option>
                    <option value="Diverifikasi" ${item.status === 'Diverifikasi' ? 'selected' : ''}>Diverifikasi</option>
                    <option value="Diterima" ${item.status === 'Diterima' ? 'selected' : ''}>Diterima</option>
                    <option value="Ditolak" ${item.status === 'Ditolak' ? 'selected' : ''}>Ditolak</option>
                </select>
            </td>
            <td>
                <button class="admin-btn admin-btn-del" onclick="deletePPDB('${item.id}')"><i class='bx bx-trash'></i> Hapus</button>
            </td>
        `;
        tblBody.appendChild(row);
    });
}

// Fungsi Update Status Pendaftaran PPDB dari Dropdown
function updatePPDBStatus(id, selectElem) {
    const newStatus = selectElem.value;
    
    // Perbarui kelas CSS dropdown kustom
    selectElem.className = 'admin-select-status';
    if (newStatus === 'Menunggu') selectElem.classList.add('status-waiting');
    else if (newStatus === 'Diverifikasi') selectElem.classList.add('status-verified');
    else if (newStatus === 'Diterima') selectElem.classList.add('status-accepted');
    else if (newStatus === 'Ditolak') selectElem.classList.add('status-rejected');
    
    // Update data di array & localStorage
    const ppdbList = JSON.parse(localStorage.getItem(L_KEY_PPDB)) || [];
    const found = ppdbList.find(p => p.id === id);
    
    if (found) {
        found.status = newStatus;
        localStorage.setItem(L_KEY_PPDB, JSON.stringify(ppdbList));
        showAdminToast(`Status pendaftaran ${id} diubah ke "${newStatus}"!`, 'success');
    }
}

// Fungsi Hapus Data Pendaftar PPDB
function deletePPDB(id) {
    if (!confirm(`Apakah Anda yakin ingin menghapus berkas pendaftaran ${id}?`)) return;
    
    let ppdbList = JSON.parse(localStorage.getItem(L_KEY_PPDB)) || [];
    ppdbList = ppdbList.filter(p => p.id !== id);
    
    localStorage.setItem(L_KEY_PPDB, JSON.stringify(ppdbList));
    renderAdminPPDB();
    
    showAdminToast(`Berkas pendaftaran ${id} berhasil dihapus!`, 'success');
}

// Fungsi Muat Ulang Demo PPDB
function resetPPDBDemo() {
    if (!confirm('Apakah Anda ingin memulihkan daftar pendaftar PPDB demo bawaan?')) return;
    
    localStorage.setItem(L_KEY_PPDB, JSON.stringify(defaultPPDB));
    renderAdminPPDB();
    
    showAdminToast('Demo Pendaftar PPDB berhasil dipulihkan!', 'success');
}

// Fungsi Ekspor Data PPDB ke Clipboard Teks Mentah
function exportPPDBData() {
    const ppdbList = JSON.parse(localStorage.getItem(L_KEY_PPDB)) || [];
    if (ppdbList.length === 0) {
        showAdminToast('Tidak ada data pendaftaran untuk diekspor.', 'error');
        return;
    }
    
    let text = `=== DAFTAR CALON SISWA BARU PPDB ONLINE SDN TUNAS MEKAR ===\n`;
    text += `Diekspor pada: ${new Date().toLocaleString('id-ID')}\n\n`;
    
    ppdbList.forEach((item, index) => {
        text += `${index + 1}. [${item.id}] Tanggal Daftar: ${item.tanggal}\n`;
        text += `   - Nama Calon Siswa: ${item.namaSiswa}\n`;
        text += `   - NIK Calon Siswa : ${item.nik || '-'}\n`;
        text += `   - Tanggal Lahir   : ${item.tanggalLahir}\n`;
        text += `   - Jenis Kelamin   : ${item.gender}\n`;
        text += `   - Jalur           : ${item.jalur}\n`;
        text += `   - Wali / Ortu     : ${item.namaOrtu}\n`;
        text += `   - Email Wali      : ${item.email || '-'}\n`;
        text += `   - Kontak WhatsApp : ${item.phone}\n`;
        text += `   - Berkas Foto     : ${item.fileFoto || '-'}\n`;
        text += `   - Berkas KK       : ${item.fileKK || '-'}\n`;
        text += `   - Berkas Akta     : ${item.fileAkta || '-'}\n`;
        text += `   - Berkas KIA      : ${item.fileKIA || 'Tidak ada'}\n`;
        text += `   - Status Verifikasi: ${item.status}\n`;
        text += `------------------------------------------------------------\n`;
    });
    
    navigator.clipboard.writeText(text).then(() => {
        showAdminToast('Data PPDB berhasil disalin ke clipboard!', 'success');
    }).catch(() => {
        showAdminToast('Gagal menyalin data ke clipboard.', 'error');
    });
}

// PREMIUM CUSTOM POPUP ALERT SYSTEM
function showCustomAlert(title, message, type = 'error') {
    // Remove existing alert if any
    const existingAlert = document.querySelector('.custom-alert-overlay');
    if (existingAlert) {
        existingAlert.remove();
    }

    const overlay = document.createElement('div');
    overlay.className = `custom-alert-overlay custom-alert-${type}`;
    
    let iconClass = 'bx-error-circle';
    if (type === 'success') iconClass = 'bx-check-circle';
    if (type === 'warning') iconClass = 'bx-info-circle';

    overlay.innerHTML = `
        <div class="custom-alert-box">
            <i class="custom-alert-icon bx ${iconClass}"></i>
            <h4 class="custom-alert-title">${title}</h4>
            <div class="custom-alert-message">${message}</div>
            <button class="custom-alert-btn">Saya Mengerti</button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Fade in
    setTimeout(() => overlay.classList.add('show'), 10);

    const closeAlert = () => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 400);
    };

    // Close on button click
    overlay.querySelector('.custom-alert-btn').addEventListener('click', closeAlert);

    // Close on clicking outside the alert box
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeAlert();
        }
    });

    // Close on escape key
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            closeAlert();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}


/* =========================================
   14. GALLERY FILTER & LIGHTBOX
   ========================================= */
(function initGallery() {
    const filterContainer = document.getElementById('galleryFilters');
    const galleryGrid     = document.getElementById('galleryGrid');
    const emptyState      = document.getElementById('galleryEmpty');
    const lightbox        = document.getElementById('lightbox');
    const lbImg           = document.getElementById('lightboxImg');
    const lbVideo         = document.getElementById('lightboxVideo');
    const lbTitle         = document.getElementById('lightboxTitle');
    const lbCounter       = document.getElementById('lightboxCounter');
    const lbClose         = document.getElementById('lightboxClose');
    const lbPrev          = document.getElementById('lightboxPrev');
    const lbNext          = document.getElementById('lightboxNext');

    if (!galleryGrid || !filterContainer) return;

    // -------- Filter Tabs --------
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');

    const applyFilter = (filter) => {
        const items = galleryGrid.querySelectorAll('.gallery-item');
        let visibleCount = 0;

        items.forEach(item => {
            const type = item.getAttribute('data-type');
            const show = (filter === 'all') || (type === filter);
            if (show) {
                item.classList.remove('is-hidden');
                visibleCount++;
            } else {
                item.classList.add('is-hidden');
            }
        });

        if (emptyState) {
            if (visibleCount === 0) emptyState.classList.remove('hidden');
            else emptyState.classList.add('hidden');
        }
    };

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.getAttribute('data-filter'));
        });
    });

    // -------- Lightbox --------
    let currentItems  = [];
    let currentIndex  = 0;

    const collectVisibleItems = () => {
        currentItems = Array.from(galleryGrid.querySelectorAll('.gallery-item:not(.is-hidden)'));
    };

    const showLightbox = (index) => {
        if (!lightbox) return;
        collectVisibleItems();
        if (currentItems.length === 0) return;

        // Wrap-around
        if (index < 0) index = currentItems.length - 1;
        if (index >= currentItems.length) index = 0;
        currentIndex = index;

        const item  = currentItems[currentIndex];
        const type  = item.getAttribute('data-type');
        const title = item.getAttribute('data-title') || '';

        // Reset
        lbVideo.pause();
        lbVideo.removeAttribute('src');
        lbVideo.load();
        lbImg.removeAttribute('src');
        lbImg.classList.add('hidden');
        lbVideo.classList.add('hidden');

        if (type === 'video') {
            const src = item.getAttribute('data-src');
            lbVideo.src = src;
            lbVideo.classList.remove('hidden');
        } else {
            const img = item.querySelector('img');
            if (img) {
                lbImg.src = img.src;
                lbImg.alt = img.alt || title;
                lbImg.classList.remove('hidden');
            }
        }

        if (lbTitle)   lbTitle.textContent = title;
        if (lbCounter) lbCounter.textContent = `${currentIndex + 1} / ${currentItems.length}`;

        // Hide nav buttons if only 1 item
        if (currentItems.length <= 1) {
            lbPrev?.classList.add('hidden');
            lbNext?.classList.add('hidden');
        } else {
            lbPrev?.classList.remove('hidden');
            lbNext?.classList.remove('hidden');
        }

        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
        lbVideo.pause();
    };

    const navigateLightbox = (direction) => {
        showLightbox(currentIndex + direction);
    };

    // Bind click on each gallery item
    galleryGrid.querySelectorAll('.gallery-item').forEach((item, idx) => {
        item.addEventListener('click', () => {
            // Find index among visible items at click time
            collectVisibleItems();
            const visibleIdx = currentItems.indexOf(item);
            if (visibleIdx >= 0) showLightbox(visibleIdx);
        });
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev)  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
    if (lbNext)  lbNext.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('show')) return;
        if (e.key === 'Escape')      closeLightbox();
        else if (e.key === 'ArrowLeft')  navigateLightbox(-1);
        else if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // -------- Video preview autoplay-on-hover (muted) --------
    galleryGrid.querySelectorAll('video').forEach(vid => {
        const parent = vid.closest('.gallery-item');
        if (!parent) return;
        parent.addEventListener('mouseenter', () => {
            vid.play().catch(() => {});
        });
        parent.addEventListener('mouseleave', () => {
            vid.pause();
            vid.currentTime = 0;
        });
    });
})();

