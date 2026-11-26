/* NusaStat — views.js
 * One render function per page (hash route). Tables sort by clicking a
 * column header and filter live from the search box; chart toggles
 * re-render their chart. All figures come from DATA in data.js. */

const NS_STATE = {
  gdpRange: "all", // dashboard GDP chart: "all" (2015–2025) or "recent" (2020–2025)
  ecoMetric: "growth", // economy page: "growth" (%) or "percapita" (Rp jt)
  sort: {}, // table id -> { key, dir }
  query: {}, // table id -> search text
};

function sourceLine(source) {
  return '<p class="source">Sumber: ' + esc(source) + "</p>";
}

function cardHead(title, sub) {
  return '<h2 class="card-title">' + esc(title) + "</h2>" +
    (sub ? '<p class="card-sub">' + esc(sub) + "</p>" : "");
}

function kpiCard(k) {
  return '<article class="kpi"><p class="kpi-label">' + esc(k.label) + "</p>" +
    '<p class="kpi-value">' + esc(k.value) + "</p>" +
    '<p class="kpi-sub">' + esc(k.sub) + "</p>" +
    '<p class="kpi-change">' + esc(k.change) + "</p>" +
    '<p class="kpi-note">' + esc(k.note) + "</p></article>";
}

/* ---- Sortable, searchable table ------------------------------------ */

function sortRows(rows, key, dir, numeric) {
  const sorted = rows.slice();
  sorted.sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (numeric) return (av - bv) * dir;
    return String(av).localeCompare(String(bv), "id") * dir;
  });
  return sorted;
}

function renderTableBody(tableId, cols, rows) {
  const st = NS_STATE.sort[tableId] || { key: cols[0].key, dir: 1 };
  const q = (NS_STATE.query[tableId] || "").toLowerCase();
  let filtered = rows;
  if (q) {
    filtered = rows.filter((r) =>
      cols.some((c) => String(r[c.key]).toLowerCase().indexOf(q) !== -1)
    );
  }
  const col = cols.find((c) => c.key === st.key) || cols[0];
  const ordered = sortRows(filtered, st.key, st.dir, !!col.numeric);
  let html = "";
  ordered.forEach((r, i) => {
    html += "<tr>";
    cols.forEach((c) => {
      const v = r[c.key];
      html += '<td class="' + (c.numeric ? "num" : "") + '">' +
        (c.format ? c.format(v, r, i) : esc(v)) + "</td>";
    });
    html += "</tr>";
  });
  if (!ordered.length) {
    html = '<tr><td colspan="' + cols.length + '" class="empty-row">Tidak ada provinsi yang cocok dengan pencarian.</td></tr>';
  }
  return html;
}

function tableHTML(tableId, cols, rows, searchPlaceholder) {
  const st = NS_STATE.sort[tableId] || { key: cols[0].key, dir: 1 };
  let head = "";
  cols.forEach((c) => {
    const arrow = st.key === c.key ? (st.dir === 1 ? " ▲" : " ▼") : "";
    head += '<th data-table="' + tableId + '" data-key="' + c.key + '" class="' +
      (c.numeric ? "num" : "") + (st.key === c.key ? " sorted" : "") + '">' +
      esc(c.label) + arrow + "</th>";
  });
  return '<div class="table-tools"><input type="search" class="table-search" data-table="' + tableId +
    '" placeholder="' + esc(searchPlaceholder || "Cari…") + '" value="' +
    esc(NS_STATE.query[tableId] || "") + '" aria-label="Cari di tabel">' +
    '<span class="table-count" id="' + tableId + '-count"></span></div>' +
    '<div class="table-wrap"><table class="data-table" id="' + tableId + '"><thead><tr>' + head +
    "</tr></thead><tbody>" + renderTableBody(tableId, cols, rows) + "</tbody></table></div>";
}

function refreshTable(tableId, cols, rows) {
  const table = document.getElementById(tableId);
  if (!table) return;
  table.querySelector("tbody").innerHTML = renderTableBody(tableId, cols, rows);
  const count = document.getElementById(tableId + "-count");
  if (count) {
    const q = (NS_STATE.query[tableId] || "").toLowerCase();
    const n = q ? rows.filter((r) => cols.some((c) => String(r[c.key]).toLowerCase().indexOf(q) !== -1)).length : rows.length;
    count.textContent = n + " dari " + rows.length + " baris";
  }
}

function provinceRows() {
  return DATA.provinces.map((p, i) => ({
    rank: i + 1,
    name: p.name,
    island: p.island,
    pop: p.pop,
    share: (p.pop / 281.6) * 100,
  }));
}

const PROVINCE_COLS = [
  {
    key: "rank", label: "#", numeric: true,
    format: (_v, _r, i) => String(i + 1),
  },
  { key: "name", label: "Provinsi", numeric: false },
  { key: "island", label: "Pulau", numeric: false },
  {
    key: "pop", label: "Penduduk 2024 (jt)", numeric: true,
    format: (v) => fmtId(v, 2),
  },
  {
    key: "share", label: "Pangsa (%)", numeric: true,
    format: (v) => fmtId(v, 1),
  },
];

/* ---- Pages ---------------------------------------------------------- */

function renderDashboard() {
  const g = DATA.gdpGrowth;
  const range = NS_STATE.gdpRange === "recent"
    ? { labels: g.years.slice(5), values: g.values.slice(5) }
    : { labels: g.years, values: g.values };
  const p = DATA.populationTrend;
  let html = '<section class="hero"><p class="hero-eyebrow">PORTAL STATISTIK INDONESIA</p>' +
    "<h1>Indonesia dalam angka</h1>" +
    '<p class="hero-lead">Penduduk, ekonomi, dan kesejahteraan 38 provinsi — ' +
    "angka resmi terbaru dari BPS, Bank Indonesia, dan PBB, dalam satu tempat.</p>" +
    '<p class="hero-meta">Data terakhir diperbarui ' + esc(DATA.meta.updated) +
    " · 287,2 juta penduduk · PDB Rp 23.821 triliun (2025)</p>" +
    '<div class="hero-links"><a class="btn" href="#/economy">Lihat ekonomi →</a>' +
    '<a class="btn btn-ghost" href="#/regions">Jelajahi 38 provinsi →</a></div></section>';

  html += '<section class="kpi-grid">' + DATA.kpi.map(kpiCard).join("") + "</section>";

  html += '<section class="grid-2">' +
    '<article class="card"><div class="card-head">' + cardHead("Pertumbuhan ekonomi", "PDB riil, % yoy — BPS") +
    '<div class="toggle" role="group" aria-label="Rentang tahun">' +
    '<button data-gdp-range="all" class="' + (NS_STATE.gdpRange === "all" ? "active" : "") + '">2015–2025</button>' +
    '<button data-gdp-range="recent" class="' + (NS_STATE.gdpRange === "recent" ? "active" : "") + '">2020–2025</button>' +
    "</div></div>" +
    '<div id="gdp-chart">' + lineChart({
      labels: range.labels, values: range.values,
      color: CHART_COLORS.teal, yFmt: (v) => fmtId(v, 2) + "%",
    }) + "</div>" +
    "<p class=\"chart-note\">Kontraksi −2,07% pada 2020 adalah dampak pandemi COVID-19; " +
    "ekonomi pulih ke 5,31% pada 2022 dan tumbuh 5,11% pada 2025.</p>" +
    sourceLine(g.source) + "</article>" +

    '<article class="card">' + cardHead("Penduduk Indonesia", "Juta jiwa — BPS") +
    barChart({
      labels: p.years, values: p.values,
      color: CHART_COLORS.navy, yFmt: (v) => fmtId(v, 0),
    }) +
    "<p class=\"chart-note\">Sensus 2020 mencatat 270,2 juta jiwa. Proyeksi BPS: 287,2 juta " +
    "pada awal 2026 — negara berpenduduk terbesar ke-4 di dunia.</p>" +
    sourceLine(p.source) + "</article></section>";

  html += '<section class="card"><h2 class="card-title">Rilis terbaru</h2>' +
    '<p class="card-sub">Angka-angka yang paling baru diterbitkan — klik untuk melihat konteksnya.</p><ul class="releases">';
  DATA.releases.forEach((r) => {
    html += '<li><span class="rel-date">' + esc(r.date) + '</span><a href="' + r.route + '">' +
      esc(r.title) + '</a><span class="rel-source">' + esc(r.source) + "</span></li>";
  });
  return html + "</ul></section>";
}

function renderEconomy() {
  const g = DATA.gdpGrowth;
  const pc = DATA.gdpPerCapita;
  const ecoChart = NS_STATE.ecoMetric === "growth"
    ? lineChart({ labels: g.years, values: g.values, color: CHART_COLORS.teal, yFmt: (v) => fmtId(v, 2) + "%" })
    : barChart({ labels: pc.years, values: pc.values, color: CHART_COLORS.amber, yFmt: (v) => "Rp " + fmtId(v, 0) + " jt" });
  const inf = DATA.inflation;
  const top5 = DATA.sectors.slice(0, 5);
  const rest = DATA.sectors.slice(5).reduce((a, s) => a + s.share, 0);
  const donutItems = top5.map((s, i) => ({
    name: s.name, share: s.share,
    color: [CHART_COLORS.teal, CHART_COLORS.tealLight, CHART_COLORS.amber, CHART_COLORS.navy, "#7fb069"][i],
  }));
  donutItems.push({ name: "Sektor lainnya", share: rest, color: "#c9d4db" });

  let html = '<section class="page-head"><h1>Ekonomi</h1>' +
    "<p>Pertumbuhan, harga, struktur produksi, dan perdagangan luar negeri Indonesia.</p></section>";

  html += '<section class="grid-2">' +
    '<article class="card"><div class="card-head">' + cardHead("PDB Indonesia", "BPS — harga konstan 2010 & harga berlaku") +
    '<div class="toggle" role="group" aria-label="Ukuran PDB">' +
    '<button data-eco-metric="growth" class="' + (NS_STATE.ecoMetric === "growth" ? "active" : "") + '">Pertumbuhan %</button>' +
    '<button data-eco-metric="percapita" class="' + (NS_STATE.ecoMetric === "percapita" ? "active" : "") + '">Per kapita</button>' +
    "</div></div>" +
    '<div id="eco-chart">' + ecoChart + "</div>" +
    "<p class=\"chart-note\">PDB 2025 mencapai Rp 23.821,1 triliun dengan pertumbuhan 5,11%. " +
    "PDB per kapita 2025: Rp 83,7 juta (±US$ 5.083).</p>" +
    sourceLine("BPS") + "</article>" +

    '<article class="card">' + cardHead("Inflasi", "Desember, year-on-year — BPS") +
    lineChart({ labels: inf.years, values: inf.values, color: CHART_COLORS.amber, yFmt: (v) => fmtId(v, 2) + "%" }) +
    "<p class=\"chart-note\">Inflasi Desember 2025 sebesar 2,92% (yoy), dalam sasaran Bank Indonesia " +
    "2,5% ±1%. Inflasi inti 2,38%; pangan bergejolak (volatile food) 6,21%.</p>" +
    sourceLine(inf.source) + "</article></section>";

  html += '<section class="grid-2">' +
    '<article class="card">' + cardHead("Struktur PDB menurut lapangan usaha", "Pangsa PDB 2024 — BPS") +
    '<div class="donut-wrap">' + donutChart({
      items: donutItems, centerTop: "Rp 22.139 T", centerBottom: "PDB 2024",
    }) + "</div>" +
    "<p class=\"chart-note\">Lima lapangan usaha terbesar menyumbang 63,90% PDB. " +
    "Industri pengolahan tetap menjadi tulang punggung perekonomian.</p>" +
    sourceLine("BPS") + "</article>" +

    '<article class="card">' + cardHead("Perdagangan luar negeri 2024", "BPS & Kementerian Keuangan") +
    '<div class="stat-list">' +
    '<div><span>Ekspor</span><strong>US$ 264,70 miliar</strong><em>+2,29% dari 2023</em></div>' +
    '<div><span>Impor</span><strong>US$ 233,66 miliar</strong><em>+11,07% dari 2023</em></div>' +
    '<div><span>Surplus neraca perdagangan</span><strong>US$ 31,04 miliar</strong><em>Surplus tahun kelima beruntun</em></div>' +
    '<div><span>Transaksi berjalan</span><strong>−US$ 8,9 miliar</strong><em>Defisit 0,6% PDB (Bank Indonesia)</em></div>' +
    '<div><span>Surplus beruntun</span><strong>56 bulan</strong><em>Sejak Mei 2020 (per Des 2024)</em></div>' +
    "</div>" +
    '<h3 class="mini-title">Pertumbuhan sektoral 2024 (% yoy)</h3><ul class="sector-growth">' +
    DATA.sectors.slice(0, 10).map((s) =>
      "<li><span>" + esc(s.name) + "</span><strong>" + fmtId(s.growth, 2) + "%</strong></li>"
    ).join("") + "</ul>" +
    sourceLine(DATA.trade.source) + "</article></section>";
  return html;
}

function renderPopulation() {
  const p = DATA.populationTrend;
  const top10 = provinceRows().sort((a, b) => b.pop - a.pop).slice(0, 10);
  let html = '<section class="page-head"><h1>Penduduk</h1>' +
    "<p>Jumlah, struktur umur, dan persebaran penduduk di 38 provinsi.</p></section>";

  html += '<section class="grid-2">' +
    '<article class="card">' + cardHead("Tren penduduk 2015–2026", "Juta jiwa — BPS") +
    barChart({ labels: p.years, values: p.values, color: CHART_COLORS.navy, yFmt: (v) => fmtId(v, 0) }) +
    "<p class=\"chart-note\">Laju pertumbuhan sekitar 0,8% per tahun. PBB (UN WPP 2024) " +
    "memperkirakan 283,49 juta pada pertengahan 2024 dan 285,72 juta pada 2025.</p>" +
    sourceLine(p.source) + "</article>" +

    '<article class="card">' + cardHead("Struktur umur 2024", "Pangsa penduduk — BPS (perkiraan, dibulatkan)") +
    hbarChart({
      items: DATA.ageStructure.map((a) => ({
        label: a.group, value: a.share, max: 100, note: a.note,
        valueText: a.share + "%",
        color: a.share > 50 ? CHART_COLORS.teal : CHART_COLORS.tealLight,
      })),
    }) +
    '<div class="stat-list">' +
    "<div><span>Usia median</span><strong>±30 tahun</strong><em>BPS / PBB</em></div>" +
    "<div><span>Tinggal di perkotaan</span><strong>±59%</strong><em>BPS 2024</em></div>" +
    "<div><span>Rasio ketergantungan</span><strong>±45</strong><em>Per 100 usia produktif, 2024</em></div>" +
    "</div>" +
    "<p class=\"chart-note\">" + esc(DATA.dependencyNote) + "</p>" +
    sourceLine("BPS") + "</article></section>";

  html += '<section class="card">' + cardHead("10 provinsi terpadat", "Penduduk 2024 — BPS") +
    tableHTML("top10", PROVINCE_COLS, top10, "Cari provinsi…") +
    '<p class="card-sub">Tiga provinsi di Jawa — Jawa Barat, Jawa Timur, Jawa Tengah — ' +
    "menampung sekitar 46% penduduk Indonesia. " +
    '<a href="#/regions">Lihat semua 38 provinsi →</a></p>' +
    sourceLine("BPS — proyeksi penduduk pertengahan 2024") + "</section>";
  return html;
}

function renderSocial() {
  const pov = DATA.poverty;
  const un = DATA.unemployment;
  const hdi = DATA.hdi;
  const gini = DATA.gini;
  let html = '<section class="page-head"><h1>Masyarakat</h1>' +
    "<p>Kemiskinan, pekerjaan, pembangunan manusia, dan ketimpangan.</p></section>";

  html += '<section class="grid-2">' +
    '<article class="card">' + cardHead("Tingkat kemiskinan", "% penduduk — BPS (Maret)") +
    lineChart({ labels: pov.years, values: pov.values, color: CHART_COLORS.green, yFmt: (v) => fmtId(v, 2) + "%" }) +
    "<p class=\"chart-note\">Maret 2026: 8,07% atau 22,93 juta orang — terendah sepanjang sejarah. " +
    "Garis kemiskinan Rp 669.235 per kapita per bulan.</p>" +
    sourceLine(pov.source) + "</article>" +

    '<article class="card">' + cardHead("Pengangguran terbuka", "% angkatan kerja — BPS (Agustus)") +
    lineChart({ labels: un.years, values: un.values, color: CHART_COLORS.red, yFmt: (v) => fmtId(v, 2) + "%" }) +
    "<p class=\"chart-note\">Agustus 2026: 4,75% (7,38 juta orang) dari angkatan kerja 155,37 juta. " +
    "Puncak pandemi 2020: 7,07%.</p>" +
    sourceLine(un.source) + "</article></section>";

  html += '<section class="grid-2">' +
    '<article class="card">' + cardHead("Indeks Pembangunan Manusia", "Skor IPM — BPS") +
    barChart({ labels: hdi.years, values: hdi.values, color: CHART_COLORS.teal, yFmt: (v) => fmtId(v, 2) }) +
    "<p class=\"chart-note\">IPM 2025 mencapai 75,90 — kategori “tinggi”. Semua komponen membaik: " +
    "umur harapan hidup 74,47 tahun, harapan lama sekolah 13,30 tahun.</p>" +
    sourceLine(hdi.source) + "</article>" +

    '<article class="card">' + cardHead("Ketimpangan (rasio Gini)", "Maret — BPS") +
    lineChart({ labels: gini.years, values: gini.values, color: CHART_COLORS.navy, yFmt: (v) => fmtId(v, 3), yMin: 0.36, yMax: 0.4 }) +
    "<p class=\"chart-note\">Gini Maret 2024: 0,379 — membaik dari 0,388 pada 2023. " +
    "Nilai 0 berarti pemerataan sempurna, 1 berarti ketimpangan penuh.</p>" +
    sourceLine(gini.source) + "</article></section>";

  html += '<section class="card">' + cardHead("Pendidikan & kesehatan", "BPS 2025, kecuali dinyatakan lain") +
    '<div class="stat-grid">' +
    DATA.humanDev.map((d) =>
      '<div class="stat-cell"><span>' + esc(d.label) + "</span><strong>" + esc(d.value) +
      "</strong><em>" + esc(d.source) + "</em></div>"
    ).join("") + "</div></section>";
  return html;
}

function renderRegions() {
  const rows = provinceRows();
  let html = '<section class="page-head"><h1>Provinsi</h1>' +
    "<p>Seluruh 38 provinsi Indonesia — penduduk, pulau, dan pangsa nasional. " +
    "Klik judul kolom untuk mengurutkan; ketik untuk mencari.</p></section>";

  html += '<section class="card">' + cardHead("Penduduk menurut provinsi, 2024", "Juta jiwa — BPS, proyeksi pertengahan 2024") +
    tableHTML("regions", PROVINCE_COLS, rows, "Cari provinsi atau pulau…") +
    "<p class=\"chart-note\">Angka dibulatkan ke 0,01 juta; jumlah provinsi dapat sedikit berbeda " +
    "dari total nasional 281,6 juta karena pembulatan. Jawa menampung 55,93% penduduk.</p>" +
    sourceLine("BPS — proyeksi penduduk pertengahan 2024") + "</section>";

  html += '<section class="card">' + cardHead("Sorotan provinsi", "Angka ekstrem yang terverifikasi — BPS") +
    '<div class="stat-list">' +
    DATA.provinceNotes.map((n) =>
      "<div><span>" + esc(n.label) + "</span><strong>" + esc(n.value) + "</strong></div>"
    ).join("") + "</div>" +
    "<p class=\"chart-note\">Kolom kemiskinan dan pengangguran per provinsi tidak ditampilkan " +
    "di tabel utama karena tidak semua angka provinsi terverifikasi untuk tahun yang sama; " +
    "yang ditampilkan di sini adalah angka ekstrem yang sudah terverifikasi.</p></section>";
  return html;
}

function renderAbout() {
  return '<section class="page-head"><h1>Tentang NusaStat</h1>' +
    "<p>Apa itu situs ini, dari mana angkanya, dan bagaimana membacanya.</p></section>" +

    '<section class="card"><h2 class="card-title">Apa itu NusaStat?</h2>' +
    "<p>NusaStat adalah portal statistik Indonesia yang dibuat independen — bukan situs resmi " +
    "Badan Pusat Statistik (BPS) dan tidak berafiliasi dengannya. Situs ini menghimpun angka-angka " +
    "resmi yang sudah diterbitkan ke dalam satu tampilan yang mudah dibaca: penduduk, ekonomi, " +
    "kemiskinan, pekerjaan, dan pembangunan manusia, untuk 38 provinsi.</p>" +
    "<p>Nama “NusaStat” berasal dari “nusa” (kepulauan) dan “statistik”. " +
    "Semua grafik digambar langsung dari data yang tertanam di situs ini — tanpa pustaka eksternal " +
    "dan tanpa koneksi internet — sehingga halaman terbuka cepat di desktop maupun ponsel.</p></section>" +

    '<section class="grid-2">' +
    '<article class="card"><h2 class="card-title">Sumber data</h2><ul class="source-list">' +
    "<li><strong>BPS — Badan Pusat Statistik.</strong> Sensus Penduduk 2020, proyeksi penduduk, PDB, " +
    "IHK/inflasi, Sakernas, Susenas, dan IPM.</li>" +
    "<li><strong>Bank Indonesia.</strong> Sasaran inflasi dan neraca transaksi berjalan.</li>" +
    "<li><strong>Kementerian Keuangan.</strong> Neraca perdagangan 2024.</li>" +
    "<li><strong>PBB — UN World Population Prospects 2024.</strong> Perkiraan penduduk pertengahan tahun " +
    "sebagai pembanding proyeksi BPS.</li>" +
    "</ul></article>" +

    '<article class="card"><h2 class="card-title">Metodologi & catatan</h2><ul class="source-list">' +
    "<li>Setiap angka menampilkan tahun dan sumbernya. Angka “(yoy)” membandingkan dengan periode yang sama tahun sebelumnya.</li>" +
    "<li>Populasi provinsi adalah proyeksi BPS pertengahan 2024, dibulatkan ke 0,01 juta — jumlahnya dapat sedikit berbeda dari total nasional karena pembulatan.</li>" +
    "<li>Angka 2025–2026 yang berlabel “awal/preliminer” masih dapat direvisi BPS pada rilis berikutnya.</li>" +
    "<li>Angka yang tidak dapat diverifikasi dari sumber resmi tidak ditampilkan — sel kosong lebih jujur daripada angka tebakan.</li>" +
    "<li>Nilai tukar yang disebut (±US$) memakai kurs rata-rata tahun berjalan dan hanya sebagai pembanding.</li>" +
    "</ul></article></section>" +

    '<section class="card"><h2 class="card-title">Kontak & koreksi</h2>' +
    "<p>Menemukan angka yang keliru atau ketinggalan zaman? NusaStat adalah proyek data terbuka: " +
    "setiap angka di situs ini dapat dilacak ke publikasi BPS, Bank Indonesia, atau Kementerian Keuangan " +
    "yang tercantum di bawah grafiknya. Koreksi dipersilakan dengan merujuk ke publikasi sumber tersebut.</p>" +
    "<p>Terakhir diperbarui: " + esc(DATA.meta.updated) + ".</p></section>";
}

/* ---- Route table ----------------------------------------------------- */

const VIEWS = {
  "": renderDashboard,
  economy: renderEconomy,
  population: renderPopulation,
  social: renderSocial,
  regions: renderRegions,
  about: renderAbout,
};

/* Bind the controls of the page that was just rendered. */
function bindRoute(route) {
  // GDP range toggle (dashboard)
  document.querySelectorAll("[data-gdp-range]").forEach((btn) => {
    btn.addEventListener("click", () => {
      NS_STATE.gdpRange = btn.getAttribute("data-gdp-range");
      const g = DATA.gdpGrowth;
      const range = NS_STATE.gdpRange === "recent"
        ? { labels: g.years.slice(5), values: g.values.slice(5) }
        : { labels: g.years, values: g.values };
      const host = document.getElementById("gdp-chart");
      if (host) {
        host.innerHTML = lineChart({
          labels: range.labels, values: range.values,
          color: CHART_COLORS.teal, yFmt: (v) => fmtId(v, 2) + "%",
        });
      }
      document.querySelectorAll("[data-gdp-range]").forEach((b) =>
        b.classList.toggle("active", b === btn));
    });
  });

  // Economy metric toggle
  document.querySelectorAll("[data-eco-metric]").forEach((btn) => {
    btn.addEventListener("click", () => {
      NS_STATE.ecoMetric = btn.getAttribute("data-eco-metric");
      const host = document.getElementById("eco-chart");
      if (host) {
        const g = DATA.gdpGrowth;
        const pc = DATA.gdpPerCapita;
        host.innerHTML = NS_STATE.ecoMetric === "growth"
          ? lineChart({ labels: g.years, values: g.values, color: CHART_COLORS.teal, yFmt: (v) => fmtId(v, 2) + "%" })
          : barChart({ labels: pc.years, values: pc.values, color: CHART_COLORS.amber, yFmt: (v) => "Rp " + fmtId(v, 0) + " jt" });
      }
      document.querySelectorAll("[data-eco-metric]").forEach((b) =>
        b.classList.toggle("active", b === btn));
    });
  });

  // Sortable table headers
  document.querySelectorAll("th[data-table]").forEach((th) => {
    th.addEventListener("click", () => {
      const tableId = th.getAttribute("data-table");
      const key = th.getAttribute("data-key");
      const st = NS_STATE.sort[tableId] || { key: key, dir: 1 };
      if (st.key === key) st.dir = -st.dir;
      else { st.key = key; st.dir = 1; }
      NS_STATE.sort[tableId] = st;
      const rows = tableId === "regions" ? provinceRows()
        : provinceRows().sort((a, b) => b.pop - a.pop).slice(0, 10);
      // re-render header arrows by re-rendering the whole view is heavy;
      // instead update the arrows in place, then refresh the body.
      document.querySelectorAll('th[data-table="' + tableId + '"]').forEach((h) => {
        const base = h.textContent.replace(/ [▲▼]$/, "");
        h.textContent = base + (h.getAttribute("data-key") === st.key ? (st.dir === 1 ? " ▲" : " ▼") : "");
        h.classList.toggle("sorted", h.getAttribute("data-key") === st.key);
      });
      refreshTable(tableId, PROVINCE_COLS, rows);
    });
  });

  // Live search boxes
  document.querySelectorAll("input.table-search").forEach((input) => {
    input.addEventListener("input", () => {
      const tableId = input.getAttribute("data-table");
      NS_STATE.query[tableId] = input.value;
      const rows = tableId === "regions" ? provinceRows()
        : provinceRows().sort((a, b) => b.pop - a.pop).slice(0, 10);
      refreshTable(tableId, PROVINCE_COLS, rows);
    });
  });

  // row counts
  ["regions", "top10"].forEach((tableId) => {
    const count = document.getElementById(tableId + "-count");
    if (count) {
      const n = tableId === "regions" ? DATA.provinces.length : 10;
      count.textContent = n + " dari " + n + " baris";
    }
  });
}
