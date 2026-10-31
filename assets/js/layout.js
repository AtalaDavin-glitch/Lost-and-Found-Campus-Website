/**
 * TemuBarang — Sidebar & Topbar Builder
 * Injects shared navigation into every inner page.
 */

/**
 * Inject sidebar + topbar into .tb-layout element.
 * @param {string} activePage - nav key for highlight
 * @param {string} pageTitle  - shown in topbar
 */
function buildLayout(activePage, pageTitle) {
  const navItems = [
    { key: 'dashboard',   href: 'dashboard.html',         label: 'Dashboard',          icon: iconDashboard() },
    { key: 'cari',        href: 'cari-barang.html',       label: 'Cari Barang',         icon: iconSearch() },
    { key: 'laporkan',    href: 'laporkan-barang.html',   label: 'Laporkan Barang',     icon: iconPlus() },
    { key: 'laporan-saya',href: 'laporan-saya.html',      label: 'Laporan Saya',        icon: iconList(), badge: MOCK_MY_REPORTS.filter(r=>r.status==='aktif').length || null },
    { key: 'klaim',       href: 'cari-barang.html',       label: 'Klaim Barang',        icon: iconCheck() },
    { key: 'riwayat',     href: 'dashboard.html#aktivitas',label: 'Riwayat Aktivitas',  icon: iconClock() },
    { key: 'bantuan',     href: '#bantuan',                label: 'Bantuan',             icon: iconHelp() }
  ];

  const sidebarHtml = `
<aside class="tb-sidebar" id="tbSidebar" role="navigation" aria-label="Navigasi Utama">
  <div class="tb-sidebar__brand">
    <div class="tb-sidebar__logo" aria-hidden="true">TB</div>
    <div class="tb-sidebar__name">Temu<span>Barang</span></div>
  </div>
  <nav class="tb-sidebar__nav">
    <div class="tb-nav-section">Menu Utama</div>
    ${navItems.map(n => `
    <a href="${n.href}" class="tb-nav-link ${activePage === n.key ? 'active' : ''}" aria-current="${activePage === n.key ? 'page' : 'false'}">
      ${n.icon}
      <span>${n.label}</span>
      ${n.badge ? `<span class="tb-nav-badge" aria-label="${n.badge} laporan aktif">${n.badge}</span>` : ''}
    </a>`).join('')}
  </nav>
  <div class="tb-sidebar__user">
    <div class="tb-avatar" aria-hidden="true">${MOCK_USER.initials}</div>
    <div class="tb-sidebar__user-info">
      <div class="tb-sidebar__user-name">${MOCK_USER.name}</div>
      <div class="tb-sidebar__user-role">${MOCK_USER.role}</div>
    </div>
  </div>
</aside>
<div class="tb-sidebar-overlay" id="tbOverlay" role="presentation"></div>`;

  const topbarHtml = `
<header class="tb-topbar" role="banner">
  <button class="tb-topbar__hamburger" id="tbHamburger" aria-label="Buka menu navigasi" aria-expanded="false">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  </button>
  <div>
    <div class="tb-topbar__title">${pageTitle}</div>
  </div>
  <div class="tb-topbar__search" role="search">
    <span class="tb-topbar__search-icon" aria-hidden="true">
      ${iconSearch(16)}
    </span>
    <input type="search" id="topbarSearch" placeholder="Cari barang…" aria-label="Cari barang" />
  </div>
  <div class="tb-topbar__actions">
    <a href="laporkan-barang.html" class="tb-btn tb-btn--accent tb-btn--sm d-none d-md-inline-flex" aria-label="Buat laporan baru">
      ${iconPlus(14)} Laporan Baru
    </a>
    <div class="dropdown">
      <button class="tb-icon-btn" data-bs-toggle="dropdown" aria-label="Notifikasi" aria-haspopup="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span class="tb-notif-dot" aria-label="Ada notifikasi belum dibaca"></span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end shadow" style="min-width:280px;border-radius:12px;border:1px solid var(--color-border);padding:8px;">
        <li><h6 class="dropdown-header" style="font-size:12px;font-weight:700;">Notifikasi</h6></li>
        <li><a class="dropdown-item" href="detail-barang.html?id=3" style="font-size:13px;white-space:normal;padding:8px 12px;border-radius:8px;">
          <div style="font-weight:600;">Klaim kamu sedang diverifikasi</div>
          <div style="color:var(--color-text-muted);">Kunci Motor Honda — 2 jam lalu</div>
        </a></li>
        <li><a class="dropdown-item" href="detail-barang.html?id=4" style="font-size:13px;white-space:normal;padding:8px 12px;border-radius:8px;">
          <div style="font-weight:600;">Ada kecocokan untuk laporanmu</div>
          <div style="color:var(--color-text-muted);">Charger Dell ditemukan — 1 hari lalu</div>
        </a></li>
        <li><hr class="dropdown-divider my-1"/></li>
        <li><a class="dropdown-item text-center" href="dashboard.html#aktivitas" style="font-size:13px;color:var(--color-secondary);">Lihat semua</a></li>
      </ul>
    </div>
    <div class="dropdown">
      <button class="tb-user-dropdown" data-bs-toggle="dropdown" aria-label="Menu profil pengguna" aria-haspopup="true">
        <div class="tb-avatar" aria-hidden="true">${MOCK_USER.initials}</div>
        <span class="tb-user-dropdown__name d-none d-sm-inline">${MOCK_USER.name}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      <ul class="dropdown-menu dropdown-menu-end shadow" style="border-radius:12px;border:1px solid var(--color-border);padding:8px;min-width:200px;">
        <li class="px-3 py-2 mb-1" style="font-size:13px;">
          <div style="font-weight:600;">${MOCK_USER.name}</div>
          <div style="color:var(--color-text-muted);">${MOCK_USER.email}</div>
        </li>
        <li><hr class="dropdown-divider my-1"/></li>
        <li><a class="dropdown-item" href="profil.html" style="font-size:14px;border-radius:8px;">👤 Profil Saya</a></li>
        <li><a class="dropdown-item" href="laporan-saya.html" style="font-size:14px;border-radius:8px;">📋 Laporan Saya</a></li>
        <li><hr class="dropdown-divider my-1"/></li>
        <li><a class="dropdown-item text-danger" href="login.html" style="font-size:14px;border-radius:8px;">🚪 Keluar</a></li>
      </ul>
    </div>
  </div>
</header>`;

  // Insert sidebar before main
  const main = document.querySelector('.tb-main');
  if (!main) return;
  const layout = main.closest('.tb-layout') || main.parentElement;
  layout.insertAdjacentHTML('afterbegin', sidebarHtml);
  main.insertAdjacentHTML('afterbegin', topbarHtml);
}

/* -------- SVG icon helpers -------- */
function iconDashboard(s=20){return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`;}
function iconSearch(s=20){return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`;}
function iconPlus(s=20){return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;}
function iconList(s=20){return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`;}
function iconCheck(s=20){return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;}
function iconClock(s=20){return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;}
function iconHelp(s=20){return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;}
