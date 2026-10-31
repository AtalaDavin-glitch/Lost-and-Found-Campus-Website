/**
 * TemuBarang — Main JavaScript
 *
 * Frontend-only interactions using vanilla JS + Bootstrap 5.
 * All data is mock data. No backend connected.
 */

/* ============================================================
   UTILITY HELPERS
   ============================================================ */

/**
 * Format ISO date string to Indonesian format.
 * @param {string} isoDate
 * @returns {string}
 */
function formatDate(isoDate) {
  const opts = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(isoDate).toLocaleDateString('id-ID', opts);
}

/**
 * Return badge HTML for item type.
 */
function typeBadge(tipe) {
  if (tipe === 'hilang') {
    return '<span class="tb-badge tb-badge--hilang">🔴 Barang Hilang</span>';
  }
  return '<span class="tb-badge tb-badge--ditemukan">🟢 Barang Ditemukan</span>';
}

/**
 * Return badge HTML for status.
 */
function statusBadge(status) {
  const map = {
    aktif:      ['tb-badge--aktif',      STATUS_LABELS.aktif],
    klaim:      ['tb-badge--klaim',      STATUS_LABELS.klaim],
    verifikasi: ['tb-badge--verifikasi', STATUS_LABELS.verifikasi],
    selesai:    ['tb-badge--selesai',    STATUS_LABELS.selesai],
    ditutup:    ['tb-badge--ditutup',    STATUS_LABELS.ditutup]
  };
  const [cls, label] = map[status] || ['tb-badge--aktif', status];
  return `<span class="tb-badge ${cls}">${label}</span>`;
}

/**
 * Build item card HTML string.
 */
function renderItemCard(item) {
  const emoji = {
    'Elektronik':   '💻',
    'Dompet & Tas': '👜',
    'Kunci':        '🔑',
    'Alat Tulis':   '✏️',
    'Pakaian':      '👕',
    'Aksesori':     '👓',
    'Dokumen':      '📄',
    'Lainnya':      '📦'
  }[item.kategori] || '📦';

  return `
  <div class="col-sm-6 col-xl-3">
    <div class="tb-item-card h-100">
      <div class="tb-item-card__img-placeholder">${emoji}</div>
      <div class="tb-item-card__body">
        <div class="mb-2">${typeBadge(item.tipe)}</div>
        <div class="tb-item-card__name">${escHtml(item.nama)}</div>
        <div class="tb-item-card__meta">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${escHtml(item.lokasi)}
        </div>
        <div class="tb-item-card__meta">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          ${formatDate(item.tanggal)}
        </div>
        <div class="tb-item-card__meta">${escHtml(item.kategori)}</div>
        <div class="tb-item-card__footer">
          ${statusBadge(item.status)}
          <a href="detail-barang.html?id=${item.id}" class="tb-btn tb-btn--outline tb-btn--sm">Detail</a>
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * Escape HTML to prevent XSS.
 */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================================
   SIDEBAR TOGGLE (mobile)
   ============================================================ */
function initSidebar() {
  const sidebar  = document.getElementById('tbSidebar');
  const overlay  = document.getElementById('tbOverlay');
  const hamburger = document.getElementById('tbHamburger');

  if (!sidebar) return;

  function openSidebar() {
    sidebar.classList.add('open');
    if (overlay) overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openSidebar);
  if (overlay)   overlay.addEventListener('click', closeSidebar);

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSidebar();
  });
}

/* ============================================================
   TOPBAR SEARCH — redirect to cari-barang
   ============================================================ */
function initTopbarSearch() {
  const inp = document.getElementById('topbarSearch');
  if (!inp) return;
  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter' && inp.value.trim()) {
      window.location.href = `cari-barang.html?q=${encodeURIComponent(inp.value.trim())}`;
    }
  });
}

/* ============================================================
   FILTER & SEARCH (cari-barang.html)
   ============================================================ */
function initSearch() {
  const form      = document.getElementById('filterForm');
  const container = document.getElementById('searchResults');
  const countEl   = document.getElementById('resultCount');

  if (!form || !container) return;

  // Read URL params and pre-fill
  const params = new URLSearchParams(window.location.search);
  const qParam  = params.get('q')        || '';
  const catParam = params.get('kategori') || '';

  const qInput   = document.getElementById('filterQ');
  const catInput = document.getElementById('filterKategori');
  if (qInput   && qParam)   qInput.value   = qParam;
  if (catInput && catParam) catInput.value = catParam;

  function applyFilters() {
    const q      = (document.getElementById('filterQ')?.value || '').toLowerCase();
    const tipe   = document.getElementById('filterTipe')?.value   || '';
    const kat    = document.getElementById('filterKategori')?.value || '';
    const lok    = document.getElementById('filterLokasi')?.value  || '';
    const status = document.getElementById('filterStatus')?.value  || '';

    const filtered = MOCK_ITEMS.filter(item => {
      const matchQ   = !q    || item.nama.toLowerCase().includes(q) || item.deskripsi.toLowerCase().includes(q) || item.lokasi.toLowerCase().includes(q);
      const matchT   = !tipe   || item.tipe   === tipe;
      const matchK   = !kat    || item.kategori === kat;
      const matchL   = !lok    || item.lokasi   === lok;
      const matchS   = !status || item.status   === status;
      return matchQ && matchT && matchK && matchL && matchS;
    });

    if (countEl) countEl.textContent = `${filtered.length} hasil ditemukan`;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-12">
          <div class="tb-empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <div class="tb-empty__title">Tidak ada hasil</div>
            <div class="tb-empty__desc">Coba ubah kata kunci atau filter pencarianmu.</div>
          </div>
        </div>`;
    } else {
      container.innerHTML = filtered.map(item => renderItemCard(item)).join('');
    }
  }

  form.addEventListener('input',  () => applyFilters());
  form.addEventListener('change', () => applyFilters());

  const resetBtn = document.getElementById('resetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      applyFilters();
    });
  }

  // Run on load
  applyFilters();
}

/* ============================================================
   ITEM DETAIL (detail-barang.html)
   ============================================================ */
function initItemDetail() {
  const container = document.getElementById('itemDetail');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const item = MOCK_ITEMS.find(i => i.id === id);

  if (!item) {
    container.innerHTML = `
      <div class="tb-empty py-5">
        <div class="tb-empty__title">Laporan Tidak Ditemukan</div>
        <div class="tb-empty__desc">ID laporan tidak valid atau telah dihapus.</div>
        <a href="cari-barang.html" class="tb-btn tb-btn--primary mt-3">Kembali ke Pencarian</a>
      </div>`;
    return;
  }

  // Set page title
  document.getElementById('detailTitle').textContent = item.nama;

  const emoji = { 'Elektronik':'💻','Dompet & Tas':'👜','Kunci':'🔑','Alat Tulis':'✏️','Pakaian':'👕','Aksesori':'👓','Dokumen':'📄','Lainnya':'📦' }[item.kategori] || '📦';

  container.innerHTML = `
    <div class="row g-4">
      <div class="col-lg-5">
        <div class="tb-card p-0 overflow-hidden mb-3">
          <div class="tb-item-card__img-placeholder" style="height:280px;font-size:80px;">${emoji}</div>
        </div>
        <div class="tb-card">
          <div class="tb-card__title mb-3">Informasi Laporan</div>
          <table class="w-100" style="font-size:14px;">
            <tr><td style="color:var(--color-text-muted);padding:6px 0;width:120px;">ID Laporan</td><td class="fw-semibold">TB-2024-00${item.id}</td></tr>
            <tr><td style="color:var(--color-text-muted);padding:6px 0;">Pelapor</td><td>${escHtml(item.pelapor)}</td></tr>
            <tr><td style="color:var(--color-text-muted);padding:6px 0;">Tanggal</td><td>${formatDate(item.tanggal)}</td></tr>
            <tr><td style="color:var(--color-text-muted);padding:6px 0;">Lokasi</td><td>${escHtml(item.lokasi)}</td></tr>
            <tr><td style="color:var(--color-text-muted);padding:6px 0;">Kategori</td><td>${escHtml(item.kategori)}</td></tr>
            <tr><td style="color:var(--color-text-muted);padding:6px 0;">Status</td><td>${statusBadge(item.status)}</td></tr>
          </table>
        </div>
      </div>
      <div class="col-lg-7">
        <div class="tb-card mb-3">
          <div class="d-flex align-items-start justify-content-between gap-2 mb-2 flex-wrap">
            <h2 style="font-size:22px;margin:0;">${escHtml(item.nama)}</h2>
            ${typeBadge(item.tipe)}
          </div>
          <p style="color:var(--color-text-muted);font-size:14px;margin-bottom:0;">${escHtml(item.deskripsi)}</p>
        </div>

        ${item.tipe === 'ditemukan' && item.status === 'aktif' ? `
        <div class="tb-card mb-3" style="border-color:var(--color-accent);">
          <div class="tb-alert tb-alert--info mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>Mengajukan klaim tidak otomatis membuktikan kepemilikan. Petugas akan melakukan verifikasi.</span>
          </div>
          <button class="tb-btn tb-btn--accent w-100" onclick="openClaimModal(${item.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Saya Merasa Ini Barang Saya
          </button>
        </div>` : ''}

        ${item.tipe === 'hilang' ? `
        <div class="tb-card mb-3">
          <div class="tb-card__title mb-2">Punya Info?</div>
          <p style="font-size:14px;color:var(--color-text-muted);">Jika kamu menemukan barang ini, silakan hubungi pengelola TemuBarang atau laporkan temuan barang yang sesuai.</p>
          <a href="laporkan-barang.html?type=ditemukan" class="tb-btn tb-btn--primary tb-btn--sm">Laporkan Barang Ditemukan</a>
        </div>` : ''}

        <div class="tb-card">
          <div class="tb-card__title mb-3">Lacak Status</div>
          <div class="tb-tracker" id="statusTracker"></div>
        </div>
      </div>
    </div>`;

  renderTracker(item.status);
}

function renderTracker(currentStatus) {
  const steps = [
    { key: 'aktif',      label: 'Laporan\nAktif' },
    { key: 'klaim',      label: 'Klaim\nDiajukan' },
    { key: 'verifikasi', label: 'Sedang\nDiverifikasi' },
    { key: 'selesai',    label: 'Berhasil\nDikembalikan' }
  ];
  const tracker = document.getElementById('statusTracker');
  if (!tracker) return;
  const currentIdx = steps.findIndex(s => s.key === currentStatus);
  tracker.innerHTML = steps.map((s, i) => `
    <div class="tb-tracker__step ${i < currentIdx ? 'done' : ''} ${i === currentIdx ? 'active' : ''}">
      <div class="tb-tracker__dot">${i < currentIdx ? '✓' : i + 1}</div>
      <div class="tb-tracker__label">${s.label.replace('\n', '<br>')}</div>
    </div>`).join('');
}

/* ============================================================
   CLAIM MODAL
   ============================================================ */
function openClaimModal(itemId) {
  const modal = document.getElementById('claimModal');
  if (!modal) return;
  document.getElementById('claimItemId').value = itemId;
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
}

function submitClaim(e) {
  e.preventDefault();
  const form    = document.getElementById('claimForm');
  const bukti   = document.getElementById('claimBukti').value.trim();
  const kontak  = document.getElementById('claimKontak').value.trim();

  let valid = true;

  if (!bukti) {
    document.getElementById('claimBuktiErr').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('claimBuktiErr').style.display = 'none';
  }

  if (!kontak) {
    document.getElementById('claimKontakErr').style.display = 'block';
    valid = false;
  } else {
    document.getElementById('claimKontakErr').style.display = 'none';
  }

  if (!valid) return;

  const btn = form.querySelector('button[type=submit]');
  btn.disabled = true;
  btn.textContent = 'Mengirim…';

  // Simulate async
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = 'Kirim Klaim';
    bootstrap.Modal.getInstance(document.getElementById('claimModal')).hide();
    showToast('Klaim berhasil dikirim! Petugas akan menghubungimu untuk verifikasi.', 'success');
    form.reset();
  }, 1200);
}

/* ============================================================
   FORM: Laporkan Barang
   ============================================================ */
function initReportForm() {
  const form = document.getElementById('reportForm');
  if (!form) return;

  // Pre-select from URL
  const params = new URLSearchParams(window.location.search);
  const type   = params.get('type');
  if (type === 'hilang' || type === 'ditemukan') {
    const radio = document.querySelector(`input[name="tipe"][value="${type}"]`);
    if (radio) radio.checked = true;
  }

  // Image preview
  const fileInput = document.getElementById('fotoBrg');
  const preview   = document.getElementById('photoPreview');
  if (fileInput && preview) {
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
          preview.src = e.target.result;
          preview.classList.add('show');
        };
        reader.readAsDataURL(file);
      } else {
        preview.classList.remove('show');
        preview.src = '';
      }
    });
  }

  // Drag and drop hint
  const uploadArea = document.getElementById('uploadArea');
  if (uploadArea) {
    uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.classList.add('dragover'); });
    uploadArea.addEventListener('dragleave', ()  => uploadArea.classList.remove('dragover'));
    uploadArea.addEventListener('drop', e => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      if (e.dataTransfer.files[0]) {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });
    uploadArea.addEventListener('click', () => fileInput.click());
  }

  // Validation & submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = ['namaBarang', 'kategori', 'tanggal', 'lokasi', 'deskripsi'];
    let valid = true;

    fields.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (!el.value.trim()) {
        el.classList.add('is-invalid');
        valid = false;
      } else {
        el.classList.remove('is-invalid');
        el.classList.add('is-valid');
      }
    });

    if (!valid) {
      showToast('Lengkapi semua field yang wajib diisi.', 'danger');
      return;
    }

    const btn = form.querySelector('button[type=submit]');
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Mengirim…`;

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = 'Kirim Laporan';
      showToast('Laporan berhasil dikirim! (Demo — belum tersimpan ke database)', 'success');
      form.reset();
      if (preview) { preview.classList.remove('show'); preview.src = ''; }
      form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
    }, 1500);
  });
}

/* ============================================================
   MY REPORTS (laporan-saya.html)
   ============================================================ */
function initMyReports() {
  const tbody = document.getElementById('myReportsBody');
  if (!tbody) return;
  renderMyReports(MOCK_MY_REPORTS);
}

function renderMyReports(reports) {
  const tbody = document.getElementById('myReportsBody');
  if (!tbody) return;

  if (reports.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="tb-empty py-3">
      <div class="tb-empty__title">Belum ada laporan</div>
      <div class="tb-empty__desc">Kamu belum pernah membuat laporan.</div>
    </div></td></tr>`;
    return;
  }

  tbody.innerHTML = reports.map(r => `
    <tr>
      <td><span style="font-size:12px;color:var(--color-text-muted);">${escHtml(r.id)}</span></td>
      <td><a href="detail-barang.html?id=${MOCK_ITEMS.find(i=>i.nama===r.nama)?.id || ''}" style="font-weight:600;">${escHtml(r.nama)}</a></td>
      <td>${typeBadge(r.tipe)}</td>
      <td style="font-size:13px;">${formatDate(r.tanggal)}</td>
      <td>${statusBadge(r.status)}</td>
      <td>
        <div class="d-flex gap-2">
          <a href="detail-barang.html" class="tb-btn tb-btn--outline tb-btn--sm">Detail</a>
          ${r.status === 'aktif' || r.status === 'klaim' ? `<button onclick="confirmDelete('${escHtml(r.id)}')" class="tb-btn tb-btn--danger tb-btn--sm">Hapus</button>` : ''}
        </div>
      </td>
    </tr>`).join('');
}

function confirmDelete(id) {
  const modal = document.getElementById('deleteModal');
  if (!modal) { alert('Fitur hapus memerlukan konfirmasi. (Demo)'); return; }
  document.getElementById('deleteTargetId').textContent = id;
  new bootstrap.Modal(modal).show();
}

function executeDelete() {
  const id = document.getElementById('deleteTargetId').textContent;
  bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
  showToast(`Laporan ${id} berhasil dihapus. (Demo — tidak tersimpan ke database)`, 'success');
  // In real app: call API then re-fetch
}

/* ============================================================
   DASHBOARD KPI
   ============================================================ */
function initDashboard() {
  if (!document.getElementById('dashboardPage')) return;

  // Render KPI
  document.getElementById('kpiTotal').textContent  = MOCK_ITEMS.length;
  document.getElementById('kpiHilang').textContent  = MOCK_ITEMS.filter(i => i.tipe === 'hilang').length;
  document.getElementById('kpiDitemukan').textContent = MOCK_ITEMS.filter(i => i.tipe === 'ditemukan').length;
  document.getElementById('kpiSelesai').textContent = MOCK_ITEMS.filter(i => i.status === 'selesai').length;

  // Recent items (last 4)
  const recent = document.getElementById('recentItems');
  if (recent) {
    recent.innerHTML = MOCK_ITEMS.slice(0, 4).map(item => renderItemCard(item)).join('');
  }

  // Activity feed
  const feed = document.getElementById('activityFeed');
  if (feed) {
    feed.innerHTML = MOCK_ACTIVITIES.map(a => `
      <div class="tb-activity-item">
        <div class="tb-activity__icon tb-activity__icon--${a.tipe}">${a.icon}</div>
        <div class="tb-activity__text">
          <div class="tb-activity__title">${escHtml(a.title)}</div>
          <div class="tb-activity__desc">${escHtml(a.desc)}</div>
        </div>
        <div class="tb-activity__time">${a.waktu}</div>
      </div>`).join('');
  }
}

/* ============================================================
   AUTH FORMS
   ============================================================ */
function initAuth() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pass  = document.getElementById('loginPass').value;
      let valid = true;

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('loginEmailErr').style.display = 'block';
        valid = false;
      } else document.getElementById('loginEmailErr').style.display = 'none';

      if (!pass || pass.length < 6) {
        document.getElementById('loginPassErr').style.display = 'block';
        valid = false;
      } else document.getElementById('loginPassErr').style.display = 'none';

      if (!valid) return;

      const btn = loginForm.querySelector('button[type=submit]');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Memproses…';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = 'Masuk';
        showToast('Login berhasil! (Demo — autentikasi belum diimplementasi)', 'success');
        setTimeout(() => window.location.href = 'dashboard.html', 1000);
      }, 1000);
    });
  }

  const regForm = document.getElementById('registerForm');
  if (regForm) {
    regForm.addEventListener('submit', e => {
      e.preventDefault();
      const fields = {
        regNama:    v => v.trim().length >= 3,
        regEmail:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        regNIM:     v => v.trim().length >= 8,
        regPass:    v => v.length >= 8,
        regConfirm: v => v === document.getElementById('regPass').value
      };

      let valid = true;
      for (const [id, check] of Object.entries(fields)) {
        const el  = document.getElementById(id);
        const err = document.getElementById(id + 'Err');
        if (!el) continue;
        if (!check(el.value)) {
          el.classList.add('is-invalid'); el.classList.remove('is-valid');
          if (err) err.style.display = 'block';
          valid = false;
        } else {
          el.classList.remove('is-invalid'); el.classList.add('is-valid');
          if (err) err.style.display = 'none';
        }
      }

      if (!valid) return;

      const btn = regForm.querySelector('button[type=submit]');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Mendaftar…';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = 'Daftar Sekarang';
        showToast('Pendaftaran berhasil! (Demo — belum tersimpan ke database)', 'success');
        setTimeout(() => window.location.href = 'login.html', 1200);
      }, 1200);
    });
  }

  // Password toggles
  document.querySelectorAll('.tb-pass-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const isPass = target.type === 'password';
      target.type = isPass ? 'text' : 'password';
      btn.innerHTML = isPass
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    });
  });
}

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;max-width:360px;';
    document.body.appendChild(container);
  }

  const colors = {
    success: { bg: '#f0fdf4', border: '#a7f3d0', color: '#065f46' },
    danger:  { bg: '#fef2f2', border: '#fecaca', color: '#7f1d1d' },
    warning: { bg: '#fffbeb', border: '#fde68a', color: '#78350f' },
    info:    { bg: '#eff6ff', border: '#bfdbfe', color: '#1e3a8a' }
  };
  const c = colors[type] || colors.info;

  const toast = document.createElement('div');
  toast.style.cssText = `background:${c.bg};border:1px solid ${c.border};color:${c.color};padding:14px 16px;border-radius:12px;font-size:14px;font-weight:500;box-shadow:0 4px 16px rgba(0,0,0,.12);display:flex;align-items:flex-start;gap:10px;animation:slideIn .25s ease;`;
  toast.innerHTML = `<span style="flex:1">${escHtml(message)}</span><button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:inherit;padding:0;font-size:16px;line-height:1;">&times;</button>`;

  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity .3s'; setTimeout(() => toast.remove(), 300); }, 5000);
}

/* ============================================================
   INIT ON DOM READY
   ============================================================
   Note: initSidebar() and initTopbarSearch() are intentionally
   called by pages AFTER buildLayout() injects the DOM elements.
   The remaining inits are safe to run unconditionally.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initItemDetail();
  initReportForm();
  initMyReports();
  initDashboard();
  initAuth();
});
