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
        const statusInput = document.getElementById('status').value;
        const judulInput = document.getElementById('judul').value;

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

            // Re-render recent list
            renderRecentAspirasi();

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

// Bind form submit listener
function bindFormSubmit() {
    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btnSubmit = regForm.querySelector('.btn-submit');
            const originalText = btnSubmit.innerHTML;
            
            // Loading state
            btnSubmit.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Mengirim...`;
            btnSubmit.style.opacity = '0.8';
            btnSubmit.disabled = true;
            
            // Get student name to personalize success message
            const namaSiswa = document.getElementById('regNamaSiswa').value;
            
            setTimeout(() => {
                // Success state inside modal body
                if (modalBody) {
                    modalBody.innerHTML = `
                        <div class="modal-success-state">
                            <div class="modal-success-icon">
                                <i class='bx bxs-check-circle'></i>
                            </div>
                            <h4 class="modal-success-title">Pendaftaran Berhasil!</h4>
                            <p class="modal-success-desc">Terima kasih telah mendaftarkan <strong>${namaSiswa}</strong> di SDN Tunas Mekar. Data calon siswa telah kami terima dan masuk dalam tahap verifikasi.<br><br>Tim PPDB kami akan menghubungi Anda melalui nomor WhatsApp yang diberikan dalam waktu 1-2 hari kerja.</p>
                            <button class="btn btn-primary" onclick="closeModal()">Tutup</button>
                        </div>
                    `;
                }
            }, 1500); // Simulate network request delay
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

