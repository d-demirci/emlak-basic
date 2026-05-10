/* anasayfa.js — Anasayfa mantığı */

(function () {
  let aktifTip = "Tümü";
  let aktifKat = "Tümü";

  // URL parametresinden filtre başlangıcı
  const params = new URLSearchParams(window.location.search);
  const tipParam = params.get("tip");
  if (tipParam === "Satılık" || tipParam === "Kiralık") {
    aktifTip = tipParam;
  }

  // ---- Config uygula ----
  function applyConfig() {
    const tel = CONFIG.telefon;
    const waNo = CONFIG.whatsappNo;
    const waUrl = `https://wa.me/${waNo}`;
    const telUrl = `tel:${tel.replace(/\s/g, "")}`;

    document.getElementById("page-title").textContent = `${CONFIG.sirket} — Gayrimenkul İlanları`;
    setTextIfExists("h-sirket", CONFIG.sirket);
    setTextIfExists("h-slogan", CONFIG.slogan);
    setTextIfExists("h-tel-text", tel);
    setHrefIfExists("h-tel-link", telUrl);
    setHrefIfExists("h-wa-link", waUrl);
    setTextIfExists("f-sirket", CONFIG.sirket);
    setTextIfExists("f-slogan", CONFIG.slogan);
    setHrefIfExists("wa-float", waUrl);
    setHrefIfExists("m-tel-link", telUrl);
    setHrefIfExists("m-wa-link", waUrl);
    setTextIfExists("m-tel-text", tel);
    setHrefIfExists("c-tel-link", telUrl);
    setHrefIfExists("c-wa-link", waUrl);
    setTextIfExists("c-tel-text", tel);
    setTextIfExists("f-copyright", `© ${new Date().getFullYear()} ${CONFIG.sirket}. Tüm hakları saklıdır.`);

    // Hero slogan
    const heroSlogan = document.getElementById("hero-slogan");
    if (heroSlogan && CONFIG.slogan) heroSlogan.textContent = CONFIG.slogan;
  }

  function setTextIfExists(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
  function setHrefIfExists(id, href) {
    const el = document.getElementById(id);
    if (el) el.href = href;
  }

  // ---- Hero stats ----
  function renderStats() {
    const aktifIlanlar = ILANLAR.filter(i => i.aktif);
    const satilik = aktifIlanlar.filter(i => i.tip === "Satılık").length;
    const kiralik = aktifIlanlar.filter(i => i.tip === "Kiralık").length;

    const el = document.getElementById("hero-stats");
    if (!el) return;
    el.innerHTML = `
      <div class="stat-item">
        <div class="stat-num">${aktifIlanlar.length}</div>
        <div class="stat-lbl">Aktif<br>İlan</div>
      </div>
      <div class="stat-sep"></div>
      <div class="stat-item">
        <div class="stat-num">${satilik}</div>
        <div class="stat-lbl">Satılık<br>Mülk</div>
      </div>
      <div class="stat-sep"></div>
      <div class="stat-item">
        <div class="stat-num">${kiralik}</div>
        <div class="stat-lbl">Kiralık<br>Mülk</div>
      </div>
    `;
  }

  // ---- Filter ----
  function filteredList() {
    return ILANLAR.filter(i => {
      if (!i.aktif) return false;
      if (aktifTip !== "Tümü" && i.tip !== aktifTip) return false;
      if (aktifKat !== "Tümü" && i.kategori !== aktifKat) return false;
      return true;
    });
  }

  function setupFilters() {
    // Tip butonları
    document.querySelectorAll("#filter-tip .filter-btn").forEach(btn => {
      if (btn.dataset.tip === aktifTip) btn.classList.add("active");
      else btn.classList.remove("active");

      btn.addEventListener("click", () => {
        aktifTip = btn.dataset.tip;
        document.querySelectorAll("#filter-tip .filter-btn").forEach(b => b.classList.toggle("active", b === btn));
        renderGrid();
      });
    });

    // Kategori butonları
    document.querySelectorAll("#filter-kat .filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        aktifKat = btn.dataset.kat;
        document.querySelectorAll("#filter-kat .filter-btn").forEach(b => b.classList.toggle("active", b === btn));
        renderGrid();
      });
    });
  }

  // ---- Card HTML ----
  function cardHTML(ilan) {
    const tipClass = ilan.tip === "Satılık" ? "satilik" : "kiralik";
    const waMsg = encodeURIComponent(`Merhaba, "${ilan.baslik}" ilanı hakkında bilgi almak istiyorum.`);
    const waUrl = `https://wa.me/${CONFIG.whatsappNo}?text=${waMsg}`;

    const specsArr = [];
    if (ilan.metrekare && ilan.metrekare > 0) {
      specsArr.push(`
        <div class="spec-item">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
          </svg>
          ${ilan.metrekare} m²
        </div>`);
    }
    if (ilan.oda && ilan.oda !== "—") {
      specsArr.push(`
        <div class="spec-item">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          ${ilan.oda}
        </div>`);
    }
    if (ilan.kat && ilan.kat !== "—") {
      specsArr.push(`
        <div class="spec-item">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
          ${ilan.kat} Kat
        </div>`);
    }

    return `
      <div class="ilan-card" onclick="window.location='detay.html?id=${ilan.id}'">
        <div class="ilan-card-img">
          <img src="${ilan.kapakFoto}" alt="${ilan.baslik}" loading="lazy" />
          <span class="badge-tip ${tipClass}">${ilan.tip}</span>
          ${ilan.oneCikan ? '<span class="badge-one-cikan">⭐ Öne Çıkan</span>' : ""}
          <span class="badge-kategori">${ilan.kategori}</span>
        </div>
        <div class="ilan-card-body">
          <div class="ilan-card-title">${ilan.baslik}</div>
          <div class="ilan-card-location">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            ${ilan.konum}
          </div>
          <div class="ilan-card-price">${ilan.fiyatText}</div>
          <div class="ilan-card-specs">
            ${specsArr.join("")}
          </div>
        </div>
        <div class="ilan-card-footer">
          <a href="detay.html?id=${ilan.id}" class="btn-incele" onclick="event.stopPropagation()">İncele</a>
          <a href="${waUrl}" class="btn-wa-card" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="WhatsApp'tan Yaz">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.847L.057 23.882l6.19-1.443A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.897 0-3.67-.513-5.197-1.41l-.372-.221-3.856.898.934-3.741-.242-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
          </a>
        </div>
      </div>
    `;
  }

  // ---- Render grid ----
  function renderGrid() {
    const grid = document.getElementById("ilanlar-grid");
    const heading = document.getElementById("listings-heading");
    const countEl = document.getElementById("ilan-count");
    if (!grid) return;

    const list = filteredList();

    // Öne çıkanları üste al
    list.sort((a, b) => (b.oneCikan ? 1 : 0) - (a.oneCikan ? 1 : 0));

    if (heading) {
      const labels = { "Tümü": "Tüm İlanlar", "Satılık": "Satılık İlanlar", "Kiralık": "Kiralık İlanlar" };
      heading.textContent = aktifKat !== "Tümü" ? `${aktifKat} — ${labels[aktifTip] || aktifTip}` : (labels[aktifTip] || aktifTip);
    }

    if (countEl) {
      countEl.innerHTML = `<strong>${list.length}</strong> ilan bulundu`;
    }

    if (list.length === 0) {
      grid.innerHTML = `<div class="empty-state"><p>Bu kriterlere uygun ilan bulunamadı.</p></div>`;
      return;
    }

    grid.innerHTML = list.map(cardHTML).join("");
  }

  // ---- Mobile menu ----
  function setupMenu() {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("mobile-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
    document.addEventListener("click", e => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove("open");
      }
    });
  }

  // ---- Init ----
  document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    renderStats();
    setupFilters();
    renderGrid();
    setupMenu();

    // Filtre butonlarını URL'ye göre aktifleştir
    if (tipParam === "Satılık" || tipParam === "Kiralık") {
      document.querySelectorAll("#filter-tip .filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.tip === aktifTip);
      });
    }
  });
})();
