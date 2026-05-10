/* detay.js — İlan detay sayfası mantığı + lightbox */

(function () {
  let currentFotos = [];
  let lightboxIndex = 0;

  // ---- Helpers ----
  function setTextIfExists(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
  function setHrefIfExists(id, href) {
    const el = document.getElementById(id);
    if (el) el.href = href;
  }
  function setHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  // ---- Config ----
  function applyConfig() {
    const tel = CONFIG.telefon;
    const waNo = CONFIG.whatsappNo;
    const waUrl = `https://wa.me/${waNo}`;
    const telUrl = `tel:${tel.replace(/\s/g, "")}`;

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
    setTextIfExists("agent-name", CONFIG.isim);
    setTextIfExists("agent-title", CONFIG.unvan);
    setTextIfExists("f-copyright", `© ${new Date().getFullYear()} ${CONFIG.sirket}. Tüm hakları saklıdır.`);
  }

  // ---- Load property ----
  function loadIlan() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"), 10);

    if (!id) {
      showError("İlan bulunamadı. Lütfen anasayfaya dönün.");
      return;
    }

    const ilan = ILANLAR.find(i => i.id === id && i.aktif);
    if (!ilan) {
      showError("Bu ilan artık mevcut değil veya bulunamadı.");
      return;
    }

    renderIlan(ilan);
  }

  function showError(msg) {
    document.getElementById("detay-title").textContent = msg;
    document.querySelector(".gallery-main").style.display = "none";
    document.querySelector(".specs-grid").style.display = "none";
  }

  // ---- Render ----
  function renderIlan(ilan) {
    const tel = CONFIG.telefon;
    const waNo = CONFIG.whatsappNo;
    const waMsg = encodeURIComponent(`Merhaba, "${ilan.baslik}" ilanı hakkında bilgi almak istiyorum.`);
    const waUrl = `https://wa.me/${waNo}?text=${waMsg}`;
    const telUrl = `tel:${tel.replace(/\s/g, "")}`;

    // Page title & meta
    document.title = `${ilan.baslik} — ${CONFIG.sirket}`;
    const metaDesc = document.getElementById("page-desc");
    if (metaDesc) metaDesc.setAttribute("content", `${ilan.fiyatText} | ${ilan.konum} | ${ilan.metrekare} m² ${ilan.oda}`);

    // Breadcrumb
    setTextIfExists("bc-tip", ilan.tip + " İlanlar");
    setTextIfExists("bc-baslik", ilan.baslik.length > 40 ? ilan.baslik.slice(0, 40) + "…" : ilan.baslik);

    // Badges
    const tipClass = ilan.tip === "Satılık" ? "satilik" : "kiralik";
    setHTML("detay-badges", `
      <span class="detay-tip ${tipClass}">${ilan.tip}</span>
      <span class="detay-tip" style="background:#f0fdf4;color:#166534">${ilan.kategori}</span>
      ${ilan.oneCikan ? '<span class="detay-kat-badge">⭐ Öne Çıkan</span>' : ""}
    `);

    // Title & location & price
    setTextIfExists("detay-title", ilan.baslik);
    setTextIfExists("detay-konum", ilan.konum);
    setTextIfExists("detay-price", ilan.fiyatText);

    // Date
    if (ilan.tarih) {
      const d = new Date(ilan.tarih);
      const formatted = d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
      setTextIfExists("detay-date", `📅 ${formatted}`);
    }

    // Gallery
    currentFotos = ilan.fotograflar || [];
    if (currentFotos.length > 0) {
      const mainImg = document.getElementById("gallery-main-img");
      if (mainImg) {
        mainImg.src = currentFotos[0];
        mainImg.alt = ilan.baslik;
      }
      setTextIfExists("gallery-overlay-text", `${currentFotos.length} fotoğrafın tamamını gör`);

      const thumbsEl = document.getElementById("gallery-thumbs");
      if (thumbsEl) {
        thumbsEl.innerHTML = currentFotos.map((foto, i) => `
          <div class="gallery-thumb ${i === 0 ? "active" : ""}" data-i="${i}" onclick="gallerySetMain(${i})">
            <img src="${foto}" alt="Fotoğraf ${i + 1}" loading="lazy" />
          </div>
        `).join("");
      }
    }

    // Specs
    const specs = buildSpecs(ilan);
    setHTML("specs-grid", specs);

    // Description
    setTextIfExists("detay-aciklama-text", ilan.aciklama || "—");

    // Features
    if (ilan.ozellikler && ilan.ozellikler.length > 0) {
      const tags = ilan.ozellikler.map(o => `
        <div class="ozellik-tag">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
          ${o}
        </div>
      `).join("");
      setHTML("ozellik-tags", tags);
    } else {
      const wrap = document.getElementById("detay-ozellikler-wrap");
      if (wrap) wrap.style.display = "none";
    }

    // Contact sidebar
    setHrefIfExists("sidebar-wa", waUrl);
    setHrefIfExists("sidebar-tel", telUrl);
    setHrefIfExists("wa-float", waUrl);
  }

  function buildSpecs(ilan) {
    const items = [];

    if (ilan.metrekare && ilan.metrekare > 0) {
      items.push({ label: "Alan", value: `${ilan.metrekare} m²`, icon: "area" });
    }
    if (ilan.oda && ilan.oda !== "—") {
      items.push({ label: "Oda Sayısı", value: ilan.oda, icon: "rooms" });
    }
    if (ilan.banyo && ilan.banyo > 0) {
      items.push({ label: "Banyo", value: `${ilan.banyo} Banyo`, icon: "bath" });
    }
    if (ilan.kat && ilan.kat !== "—") {
      items.push({ label: "Kat", value: ilan.kat, icon: "floor" });
    }
    if (ilan.binaYasi && ilan.binaYasi > 0) {
      items.push({ label: "Bina Yaşı", value: `${ilan.binaYasi} Yıl`, icon: "age" });
    }
    if (ilan.isitma && ilan.isitma !== "—") {
      items.push({ label: "Isıtma", value: ilan.isitma, icon: "heat" });
    }
    items.push({ label: "Durum", value: ilan.tip, icon: "status" });
    items.push({ label: "Tür", value: ilan.kategori, icon: "type" });

    return items.map(item => `
      <div class="spec-card">
        <div class="spec-card-label">${item.label}</div>
        <div class="spec-card-value">${item.value}</div>
      </div>
    `).join("");
  }

  // ---- Gallery: set main image ----
  window.gallerySetMain = function (i) {
    currentFotos = currentFotos; // already set
    const mainImg = document.getElementById("gallery-main-img");
    if (mainImg && currentFotos[i]) {
      mainImg.src = currentFotos[i];
    }
    document.querySelectorAll(".gallery-thumb").forEach((t, idx) => {
      t.classList.toggle("active", idx === i);
    });
  };

  // ---- Lightbox ----
  window.lightboxOpen = function (startIndex) {
    if (!currentFotos.length) return;
    lightboxIndex = startIndex || 0;
    const overlay = document.getElementById("lightbox");
    if (overlay) overlay.classList.add("open");
    lightboxShowCurrent();
    document.addEventListener("keydown", lightboxKey);
  };

  window.lightboxClose = function (e) {
    // Close only on overlay click or close button, not on image/controls
    if (e.target === document.getElementById("lightbox") || e.target === document.querySelector(".lb-close") || e.currentTarget === document.querySelector(".lb-close")) {
      const overlay = document.getElementById("lightbox");
      if (overlay) overlay.classList.remove("open");
      document.removeEventListener("keydown", lightboxKey);
    }
  };

  window.lightboxNav = function (dir, e) {
    if (e) e.stopPropagation();
    lightboxIndex = (lightboxIndex + dir + currentFotos.length) % currentFotos.length;
    lightboxShowCurrent();
  };

  function lightboxShowCurrent() {
    const img = document.getElementById("lb-img");
    const counter = document.getElementById("lb-counter");
    if (img && currentFotos[lightboxIndex]) {
      img.src = currentFotos[lightboxIndex];
    }
    if (counter) {
      counter.textContent = `${lightboxIndex + 1} / ${currentFotos.length}`;
    }
  }

  function lightboxKey(e) {
    if (e.key === "Escape") {
      const overlay = document.getElementById("lightbox");
      if (overlay) overlay.classList.remove("open");
      document.removeEventListener("keydown", lightboxKey);
    } else if (e.key === "ArrowRight") {
      window.lightboxNav(1, null);
    } else if (e.key === "ArrowLeft") {
      window.lightboxNav(-1, null);
    }
  }

  // Touch swipe support for lightbox
  (function setupSwipe() {
    let startX = null;
    document.addEventListener("touchstart", e => {
      const overlay = document.getElementById("lightbox");
      if (overlay && overlay.classList.contains("open")) {
        startX = e.touches[0].clientX;
      }
    }, { passive: true });
    document.addEventListener("touchend", e => {
      const overlay = document.getElementById("lightbox");
      if (overlay && overlay.classList.contains("open") && startX !== null) {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) {
          window.lightboxNav(dx < 0 ? 1 : -1, null);
        }
        startX = null;
      }
    }, { passive: true });
  })();

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
    loadIlan();
    setupMenu();
  });
})();
