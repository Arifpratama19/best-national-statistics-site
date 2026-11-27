// main.js — Router hash dan semua halaman NusaData.
import {
  SITE, KPI, GDP_SERIES, INFLATION, SECTORS, BIRATE, APBN, APBN_NOTE,
  POP_SERIES, PYRAMID, AGE_STRUCT, DEMO_NOTES,
  UNEMP_SERIES, LABOUR, EMP_SECTORS,
  POVERTY_SERIES, GINI_SERIES, HDI_SERIES, WELFARE,
  EDU, HEALTH, TRADE_SERIES, TRADE_NOTE, COMMODITIES, PARTNERS, PARTNERS_NOTE,
  PROVINCES, PROV_NOTE, RELEASES, RELEASE_CALENDAR, SOURCES, METHODS, ABOUT,
} from "./data.js";
import { lineChart, barChart, hbarChart, sparkline, donut, pyramid, groupedBars, esc } from "./charts.js";

const app = document.getElementById("app");

const NAV = [
  ["#/", "Beranda"], ["#/ekonomi", "Ekonomi"], ["#/penduduk", "Penduduk"],
  ["#/kerja", "Ketenagakerjaan"], ["#/sejahtera", "Kesejahteraan"],
  ["#/pendidikan", "Pendidikan & Kesehatan"], ["#/perdagangan", "Perdagangan"],
  ["#/provinsi", "Provinsi"], ["#/data", "Data & Metodologi"],
];

function fmtID(n, dec = 0) {
  return Number(n).toLocaleString("id-ID", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}
function srcNote(t) { return `<p class="src">Sumber: ${esc(t)}</p>`; }
function card(title, inner, extra = "") {
  return `<section class="card ${extra}"><h2>${title}</h2>${inner}</section>`;
}
function kpiCard(k) {
  const last = k.spark[k.spark.length - 1], prev = k.spark[k.spark.length - 2];
  const chg = prev ? ((last - prev) / Math.abs(prev)) * 100 : 0;
  const good = k.id === "unemp" || k.id === "pov" || k.id === "gini" || k.id === "infl" ? chg <= 0 : chg >= 0;
  return `<article class="kpi"><div class="kpi-top"><span class="kpi-label">${esc(k.label)}</span>${sparkline(k.spark)}</div><div class="kpi-value">${esc(k.value)}</div><div class="kpi-sub">${esc(k.sub)}</div><div class="kpi-delta ${good ? "good" : "bad"}">${chg >= 0 ? "▲" : "▼"} ${fmtID(Math.abs(chg), 1).replace(".", ",")}% dari periode sebelumnya</div><div class="kpi-src">${esc(k.src)}</div></article>`;
}
function pageHead(title, lead) {
  return `<header class="page-head"><h1>${title}</h1><p class="lead">${lead}</p></header>`;
}
function dlCSV(filename, rows) {
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// ---------- BERANDA ----------
function renderHome() {
  const top5 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5)
    .map(p => ({ label: p.n, v: +(p.pop / 1000).toFixed(1), tip: fmtID(p.pop) + " ribu jiwa" }));
  const gdpLine = GDP_SERIES.map(d => ({ label: String(d.y), v: d.growth, tip: d.growth.toFixed(2).replace(".", ",") + "%" }));
  const infLine = INFLATION.slice(-8).map(d => ({ label: String(d.y), v: d.v, tip: d.v.toFixed(2).replace(".", ",") + "%" }));
  app.innerHTML = `
  <section class="hero">
    <div>
      <p class="eyebrow">Indonesia · 38 provinsi · Data resmi 2015–2026</p>
      <h1>Statistik Indonesia,<br>dalam satu tempat.</h1>
      <p class="hero-lead">Penduduk, ekonomi, pekerjaan, kemiskinan, pendidikan, kesehatan, dan perdagangan — angka resmi dari BPS, Bank Indonesia, dan kementerian, disajikan dengan grafik yang bisa dijelajahi.</p>
      <p class="hero-cta"><a class="btn" href="#/provinsi">Jelajahi 38 provinsi →</a> <a class="btn ghost" href="#/data">Unduh data (CSV)</a></p>
    </div>
    <div class="hero-facts">
      <div><strong>285,7 jt</strong><span>penduduk (2025)</span></div>
      <div><strong>5,11%</strong><span>pertumbuhan ekonomi 2025</span></div>
      <div><strong>8,07%</strong><span>penduduk miskin (Mar 2026)</span></div>
      <div><strong>75,02</strong><span>IPM 2024</span></div>
    </div>
  </section>
  <div class="kpi-grid">${KPI.map(kpiCard).join("")}</div>
  <div class="grid-2">
    ${card("Pertumbuhan ekonomi 2015–2025", lineChart(gdpLine, { color: "#0e7490", aria: "Pertumbuhan PDB 2015 sampai 2025" }) + srcNote("BPS, PDB harga konstan 2010. 2020 kontraksi −2,07% karena pandemi Covid-19; 2025 angka sangat sementara."))}
    ${card("Inflasi tahunan 2018–2025", lineChart(infLine, { color: "#c2410c", aria: "Inflasi tahunan 2018 sampai 2025" }) + srcNote("BPS, Indeks Harga Konsumen, Desember y-on-y. Puncak 5,51% pada 2022 setelah penyesuaian harga BBM bersubsidi."))}
  </div>
  <div class="grid-2">
    ${card("Provinsi terpadat — 5 besar", hbarChart(top5, { aria: "Lima provinsi terpadat" }) + srcNote("BPS, penduduk pertengahan 2024. Jawa Barat, Jawa Timur, dan Jawa Tengah menampung 46% penduduk Indonesia."))}
    ${card("Rilis terbaru", `<ul class="releases">${RELEASES.map(r => `<li><strong>${esc(r.t)}</strong><span>${esc(r.d)} · ${esc(r.v)}</span></li>`).join("")}</ul>` + srcNote("BPS, Berita Resmi Statistik. Lihat kalender rilis lengkap di halaman Data & Metodologi."))}
  </div>
  <section class="card about-strip"><h2>Tentang NusaData</h2><p>${esc(ABOUT)}</p><p><a href="#/data">Sumber data &amp; metodologi →</a></p></section>`;
}

// ---------- EKONOMI ----------
let ecoFrom = 2015, ecoTo = 2025;
function renderEkonomi() {
  const rows = GDP_SERIES.filter(d => d.y >= ecoFrom && d.y <= ecoTo);
  const gdpBars = rows.map(d => ({ label: String(d.y), v: d.gdp, tip: "Rp" + fmtID(d.gdp) + " triliun" }));
  const growthLine = rows.map(d => ({ label: String(d.y), v: d.growth, tip: d.growth.toFixed(2).replace(".", ",") + "%" }));
  const secBars = [...SECTORS].sort((a, b) => b.share - a.share).slice(0, 8)
    .map(s => ({ label: s.name, v: s.share, tip: s.share.toFixed(2).replace(".", ",") + "% PDB" }));
  const biLine = BIRATE.map(d => ({ label: d.y, v: d.v, tip: d.v.toFixed(2).replace(".", ",") + "%" }));
  const apbnRows = APBN.map(d => `<tr><td>${d.y}</td><td class="num">Rp${fmtID(d.rev)} T</td><td class="num">Rp${fmtID(d.exp)} T</td><td class="num ${d.def < 0 ? "neg" : ""}">Rp${fmtID(d.def)} T</td></tr>`).join("");
  const yrs = GDP_SERIES.map(d => d.y);
  const opts = y => yrs.map(v => `<option value="${v}" ${v === y ? "selected" : ""}>${v}</option>`).join("");
  app.innerHTML = `
  ${pageHead("Ekonomi", "PDB Rp23.821 triliun pada 2025 dengan pertumbuhan 5,11% — ekonomi terbesar di Asia Tenggara dan ke-16 dunia.")}
  <div class="stat-strip">
    <div><strong>Rp23.821 T</strong><span>PDB 2025</span></div>
    <div><strong>5,11%</strong><span>Pertumbuhan 2025</span></div>
    <div><strong>1,91%</strong><span>Inflasi 2025</span></div>
    <div><strong>4,75%</strong><span>Suku bunga acuan BI (Nov 2025)</span></div>
    <div><strong>Rp83,7 jt</strong><span>PDB per kapita 2025</span></div>
  </div>
  <section class="card"><h2>PDB dan pertumbuhan — pilih rentang tahun</h2>
    <div class="controls"><label>Dari <select id="eco-from">${opts(ecoFrom)}</select></label>
    <label>Sampai <select id="eco-to">${opts(ecoTo)}</select></label>
    <span class="hint">Grafik diperbarui saat pilihan berubah.</span></div>
    <div class="grid-2">
      <div>${barChart(gdpBars, { color: "#0e7490", aria: "PDB harga berlaku per tahun" })}<p class="chart-cap">PDB harga berlaku (Rp triliun)</p></div>
      <div>${lineChart(growthLine, { color: "#15803d", aria: "Pertumbuhan ekonomi per tahun" })}<p class="chart-cap">Pertumbuhan riil (% y-on-y)</p></div>
    </div>
    ${srcNote("BPS, PDB 2015–2025. 2020 kontraksi −2,07% (pandemi); 2025 angka sangat sementara.")}
  </section>
  <div class="grid-2">
    ${card("PDB menurut lapangan usaha, 2024", hbarChart(secBars, { aria: "Pangsa PDB menurut sektor" }) + srcNote("BPS, PDB menurut lapangan usaha 2024. Industri pengolahan tetap penopang terbesar (18,98%)."))}
    ${card("Suku bunga acuan Bank Indonesia", lineChart(biLine, { color: "#b45309", aria: "Suku bunga acuan BI" }) + srcNote("Bank Indonesia, BI7DRR. BI memangkas suku bunga enam kali sepanjang 2025, dari 6,00% menjadi 4,75%."))}
  </div>
  ${card("APBN — pendapatan, belanja, dan defisit", `<div class="table-wrap"><table class="tbl"><thead><tr><th>Tahun</th><th class="num">Pendapatan negara</th><th class="num">Belanja negara</th><th class="num">Defisit</th></tr></thead><tbody>${apbnRows}</tbody></table></div>` + srcNote(APBN_NOTE))}
  <section class="card"><h2>Apa yang mendorong pertumbuhan?</h2>
  <p>Konsumsi rumah tangga menyumbang 53,8% PDB dan tumbuh 4,98% pada 2025; investasi (PMTB) tumbuh 5,04% pada triwulan III-2025; ekspor barang dan jasa tumbuh 7,03% sepanjang 2025. Dari sisi lapangan usaha, industri pengolahan, perdagangan, dan pertanian adalah tiga penopang terbesar. Utang pemerintah tercatat 40,5% PDB pada akhir 2025 — di bawah batas 60% yang ditetapkan undang-undang (Kementerian Keuangan).</p></section>`;
  document.getElementById("eco-from").addEventListener("change", e => {
    ecoFrom = Math.min(+e.target.value, ecoTo); renderEkonomi();
  });
  document.getElementById("eco-to").addEventListener("change", e => {
    ecoTo = Math.max(+e.target.value, ecoFrom); renderEkonomi();
  });
}

// ---------- PENDUDUK ----------
function renderPenduduk() {
  const popLine = POP_SERIES.map(d => ({ label: String(d.y), v: d.v, tip: d.v.toFixed(1).replace(".", ",") + " jt jiwa" }));
  const ageBars = AGE_STRUCT.map(a => ({ label: a.g, v: a.share, tip: a.share.toFixed(1).replace(".", ",") + "%" }));
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10)
    .map(p => ({ label: p.n, v: +(p.pop / 1000).toFixed(1), tip: fmtID(p.pop) + " ribu jiwa" }));
  app.innerHTML = `
  ${pageHead("Penduduk", "285,7 juta jiwa pada 2025 — negara berpenduduk terbesar ke-4 di dunia, dengan bonus demografi yang puncaknya diperkirakan pada 2030-an.")}
  <div class="stat-strip">
    <div><strong>285,7 jt</strong><span>Penduduk 2025</span></div>
    <div><strong>0,8%</strong><span>Pertumbuhan per tahun</span></div>
    <div><strong>59,4%</strong><span>Tinggal di perkotaan</span></div>
    <div><strong>149</strong><span>Jiwa per km²</span></div>
    <div><strong>30,1 th</strong><span>Median usia</span></div>
  </div>
  <div class="grid-2">
    ${card("Jumlah penduduk 2015–2025", lineChart(popLine, { color: "#0e7490", aria: "Jumlah penduduk 2015 sampai 2025" }) + srcNote("BPS (2015–2024) dan Bank Dunia WDI (2025). Penduduk bertambah sekitar 2,2 juta jiwa per tahun."))}
    ${card("Struktur umur 2024", hbarChart(ageBars, { color: "#15803d", aria: "Struktur umur penduduk" }) + srcNote("BPS, Proyeksi Penduduk 2024. 68,3% penduduk berada pada usia produktif 15–64 tahun."))}
  </div>
  ${card("Piramida penduduk 2024 — juta jiwa", pyramid(PYRAMID) + srcNote("BPS, Proyeksi Penduduk 2024. Bentuk piramida masih melebar di usia muda: kohor 20–24 tahun adalah yang terbesar."))}
  <div class="grid-2">
    ${card("Provinsi terpadat — 10 besar", hbarChart(top10, { aria: "Sepuluh provinsi terpadat" }) + srcNote("BPS, penduduk pertengahan 2024. Pulau Jawa menampung 55,9% penduduk di 6,6% luas daratan."))}
    <section class="card"><h2>Catatan demografi</h2><ul class="notes">${DEMO_NOTES.map(n => `<li>${esc(n)}</li>`).join("")}</ul>
    <p>Rasio ketergantungan yang terus menurun — dari 49,6 pada 2015 menjadi 46,4 pada 2024 — menandai jendela bonus demografi: penduduk usia kerja tumbuh lebih cepat daripada penduduk tanggungan.</p>${srcNote("BPS, Proyeksi Penduduk 2015–2045; PBB, World Population Prospects 2024.")}</section>
  </div>`;
}

// ---------- KETENAGAKERJAAN ----------
function renderKerja() {
  const unLine = UNEMP_SERIES.map(d => ({ label: String(d.y), v: d.v, tip: d.v.toFixed(2).replace(".", ",") + "%" }));
  const empBars = [...EMP_SECTORS].sort((a, b) => b.share - a.share)
    .map(s => ({ label: s.name, v: s.share, tip: s.share.toFixed(2).replace(".", ",") + "% pekerja" }));
  const formalDonut = donut(
    [{ label: "Formal", v: LABOUR.formal }, { label: "Informal", v: LABOUR.informal }],
    { center: "57,8%", centerSub: "pekerja informal", colors: ["#0e7490", "#c2410c"], aria: "Pekerja formal dan informal" });
  app.innerHTML = `
  ${pageHead("Ketenagakerjaan", "153,91 juta angkatan kerja pada Agustus 2025; 146,45 juta orang bekerja dan 7,46 juta menganggur (TPT 4,85%).")}
  <div class="stat-strip">
    <div><strong>4,85%</strong><span>Pengangguran (Agu 2025)</span></div>
    <div><strong>146,45 jt</strong><span>Orang bekerja</span></div>
    <div><strong>Rp3,33 jt</strong><span>Upah rata-rata/bulan</span></div>
    <div><strong>57,8%</strong><span>Pekerja informal</span></div>
    <div><strong>15,7%</strong><span>Pengangguran usia muda</span></div>
  </div>
  <div class="grid-2">
    ${card("Pengangguran terbuka, Agustus 2019–2025", lineChart(unLine, { color: "#c2410c", aria: "Tingkat pengangguran terbuka" }) + srcNote("BPS, Sakernas Agustus. Puncak 7,07% pada 2020 (pandemi); terendah dalam satu dekade pada 2025."))}
    ${card("Formal vs informal", formalDonut + srcNote("BPS, Sakernas Agustus 2025. Pekerja informal — tanpa kontrak tertulis atau perlindungan sosial — masih mayoritas: 84,58 juta orang."))}
  </div>
  ${card("Pekerja menurut lapangan usaha, Agustus 2025", hbarChart(empBars, { aria: "Pekerja menurut lapangan usaha" }) + srcNote("BPS, Sakernas Agustus 2025. Pertanian masih menyerap pekerja terbanyak (27,83%), diikuti perdagangan (19,23%)."))}
  <section class="card"><h2>Kualitas pekerjaan</h2>
  <p>Hanya 67,32% pekerja yang bekerja penuh waktu; 24,77% bekerja paruh waktu dan 7,91% (11,6 juta orang) setengah menganggur — bekerja di bawah 35 jam seminggu dan masih menginginkan jam kerja tambahan. Pengangguran usia muda (15–24 tahun) mencapai 15,70%, tiga kali lipat angka nasional, dan 22,36% pekerja muda bekerja di bidang yang tidak sesuai pendidikannya (BPS, Sakernas Agustus 2025).</p></section>`;
}

// ---------- KESEJAHTERAAN ----------
function renderSejahtera() {
  const povLine = POVERTY_SERIES.map(d => ({ label: String(d.y), v: d.v, tip: d.v.toFixed(2).replace(".", ",") + "%" }));
  const giniLine = GINI_SERIES.map(d => ({ label: String(d.y), v: d.v, tip: d.v.toFixed(3).replace(".", ",") }));
  const hdiLine = HDI_SERIES.map(d => ({ label: String(d.y), v: d.v, tip: d.v.toFixed(2).replace(".", ",") }));
  const povProv = [...PROVINCES].sort((a, b) => b.pov - a.pov).slice(0, 8)
    .map(p => ({ label: p.n, v: p.pov, tip: p.pov.toFixed(2).replace(".", ",") + "%", color: "#b91c1c" }));
  const hdiProv = [...PROVINCES].sort((a, b) => b.hdi - a.hdi).slice(0, 8)
    .map(p => ({ label: p.n, v: p.hdi, tip: p.hdi.toFixed(2).replace(".", ",") }));
  app.innerHTML = `
  ${pageHead("Kesejahteraan", "Kemiskinan 8,07% pada Maret 2026 — terendah sepanjang sejarah pencatatan BPS — dengan garis kemiskinan Rp669.235 per kapita per bulan.")}
  <div class="stat-strip">
    <div><strong>8,07%</strong><span>Miskin (Mar 2026)</span></div>
    <div><strong>22,93 jt</strong><span>Jiwa miskin</span></div>
    <div><strong>0,368</strong><span>Rasio Gini</span></div>
    <div><strong>75,02</strong><span>IPM 2024</span></div>
    <div><strong>0,85%</strong><span>Kemiskinan ekstrem</span></div>
  </div>
  <div class="grid-2">
    ${card("Persentase penduduk miskin, Maret 2019–2026", lineChart(povLine, { color: "#b91c1c", aria: "Persentase penduduk miskin" }) + srcNote("BPS, Susenas Maret. Kemiskinan turun dari 10,14% (2021) menjadi 8,07% (Maret 2026)."))}
    ${card("Indeks Pembangunan Manusia 2019–2024", lineChart(hdiLine, { color: "#15803d", aria: "Indeks Pembangunan Manusia" }) + srcNote("BPS, IPM. Kategori tinggi (70–79,99) sejak 2021; DKI Jakarta tertinggi (84,15), Papua Pegunungan terendah (61,94)."))}
  </div>
  <div class="grid-2">
    ${card("Kemiskinan tertinggi menurut provinsi, Mar 2025", hbarChart(povProv, { color: "#b91c1c", aria: "Provinsi dengan kemiskinan tertinggi" }) + srcNote("BPS, Maret 2025. Papua Pegunungan 34,35% — empat kali lipat angka nasional."))}
    ${card("IPM tertinggi menurut provinsi, 2024", hbarChart(hdiProv, { color: "#15803d", aria: "Provinsi dengan IPM tertinggi" }) + srcNote("BPS, IPM 2024. DKI Jakarta (84,15) dan DI Yogyakarta (81,62) berkategori sangat tinggi (≥80)."))}
  </div>
  <div class="grid-2">
    ${card("Ketimpangan — Rasio Gini", lineChart(giniLine, { color: "#6d28d9", aria: "Rasio Gini" }) + srcNote("BPS, Susenas Maret. Gini Maret 2026: 0,368 — naik dari 0,363 pada September 2025."))}
    <section class="card"><h2>Bantuan sosial</h2>
    <ul class="notes">
      <li><strong>PKH:</strong> ${esc(WELFARE.pkh)} — bantuan tunai bersyarat untuk keluarga sangat miskin.</li>
      <li><strong>Sembako / BPNT:</strong> ${esc(WELFARE.sembako)} — bantuan pangan non tunai Rp200.000/bulan.</li>
      <li><strong>PBI JKN:</strong> ${esc(WELFARE.pbiJkn)} — iuran jaminan kesehatan dibayar pemerintah.</li>
      <li><strong>Garis kemiskinan:</strong> ${esc(WELFARE.garisKemiskinan)}; kemiskinan kota ${esc(WELFARE.miskinKota)}, desa ${esc(WELFARE.miskinDesa)}.</li>
    </ul>${srcNote("Kementerian Sosial dan BPJS Kesehatan, 2024; BPS, Maret 2026.")}</section>
  </div>`;
}

// ---------- PENDIDIKAN & KESEHATAN ----------
function renderPendidikan() {
  const apsBars = EDU.aps.map(a => ({ label: a.jenjang, v: a.v, tip: a.v.toFixed(2).replace(".", ",") + "%" }));
  const hdiLine = HDI_SERIES.map(d => ({ label: String(d.y), v: d.v, tip: d.v.toFixed(2).replace(".", ",") }));
  app.innerHTML = `
  ${pageHead("Pendidikan & Kesehatan", "Melek huruf 96,13% dan harapan hidup 74,14 tahun pada 2024; stunting balita turun menjadi 19,8%.")}
  <div class="stat-strip">
    <div><strong>96,13%</strong><span>Melek huruf (15+)</span></div>
    <div><strong>9,05 th</strong><span>Rata-rata lama sekolah</span></div>
    <div><strong>74,14 th</strong><span>Harapan hidup</span></div>
    <div><strong>19,8%</strong><span>Stunting balita</span></div>
    <div><strong>10.416</strong><span>Puskesmas</span></div>
  </div>
  <div class="grid-2">
    ${card("Angka partisipasi sekolah menurut jenjang, 2024", hbarChart(apsBars, { color: "#0e7490", aria: "Angka partisipasi sekolah" }) + srcNote("BPS, Susenas 2024. Partisipasi hampir universal sampai SMP; sepertiga pemuda 19–23 tahun kuliah."))}
    ${card("Harapan hidup dan IPM", lineChart(hdiLine, { color: "#15803d", aria: "Indeks Pembangunan Manusia" }) + srcNote("BPS. Harapan hidup naik dari 71,32 tahun (2019) menjadi 74,14 tahun (2024)."))}
  </div>
  <div class="grid-2">
    <section class="card"><h2>Pendidikan</h2>
    <ul class="notes">
      <li><strong>Melek huruf usia 15+:</strong> ${esc(EDU.melekHuruf)}; usia 15–24 tahun mencapai 99,72%.</li>
      <li><strong>Rata-rata lama sekolah:</strong> ${esc(EDU.rataLamaSekolah)} — setara kelas 3 SMP; tertinggi di DKI Jakarta (11,35 tahun).</li>
      <li><strong>Harapan lama sekolah:</strong> ${esc(EDU.harapanLamaSekolah)} — anak usia 7 tahun kini diperkirakan bersekolah hingga 13,21 tahun.</li>
      <li><strong>Anggaran pendidikan:</strong> 20% APBN sesuai amanat konstitusi; BOS menyalurkan dana ke 216 ribu sekolah.</li>
    </ul>${srcNote("BPS, Susenas dan IPM 2024; Kementerian Pendidikan Dasar dan Menengah.")}</section>
    <section class="card"><h2>Kesehatan</h2>
    <ul class="notes">
      <li><strong>Harapan hidup:</strong> ${esc(HEALTH.harapanHidup)} (2023: ${esc(HEALTH.harapanHidup2023)}).</li>
      <li><strong>Stunting:</strong> ${esc(HEALTH.stunting)}, turun dari ${esc(HEALTH.stunting2023)} — target nasional 14,2% pada 2029.</li>
      <li><strong>Kematian bayi:</strong> ${esc(HEALTH.kematianBayi)}.</li>
      <li><strong>Fasilitas:</strong> ${esc(HEALTH.puskesmas)} dan ${esc(HEALTH.rumahSakit)}; ${esc(HEALTH.posyandu)}.</li>
      <li><strong>JKN:</strong> 276 juta jiwa terdaftar sebagai peserta (98% penduduk) pada 2024 — salah satu program jaminan kesehatan terbesar di dunia.</li>
    </ul>${srcNote("BPS 2024; Kementerian Kesehatan, SSGI 2024; BPJS Kesehatan 2024.")}</section>
  </div>`;
}

// ---------- PERDAGANGAN ----------
function renderPerdagangan() {
  const tradeBars = TRADE_SERIES.map(d => ({ label: String(d.y), a: d.ex, b: d.im }));
  const balLine = TRADE_SERIES.map(d => ({ label: String(d.y), v: +(d.ex - d.im).toFixed(1), tip: "US$" + (d.ex - d.im).toFixed(1) + " miliar" }));
  const comBars = [...COMMODITIES].sort((a, b) => b.share - a.share).slice(0, 7)
    .map(c => ({ label: c.name, v: c.share, tip: c.share.toFixed(1).replace(".", ",") + "% ekspor" }));
  const partnerRows = PARTNERS.map(p => `<tr><td>${esc(p.name)}</td><td class="num">US$${p.ex.toFixed(1)} M</td><td class="num">US$${p.im.toFixed(1)} M</td><td class="num ${p.ex - p.im >= 0 ? "" : "neg"}">US$${(p.ex - p.im).toFixed(1)} M</td></tr>`).join("");
  app.innerHTML = `
  ${pageHead("Perdagangan", "Ekspor US$264,7 miliar dan impor US$233,7 miliar pada 2024 — surplus US$31,0 miliar, tahun keempat berturut-turut.")}
  <div class="stat-strip">
    <div><strong>US$264,7 M</strong><span>Ekspor 2024</span></div>
    <div><strong>US$233,7 M</strong><span>Impor 2024</span></div>
    <div><strong>US$31,0 M</strong><span>Surplus 2024</span></div>
    <div><strong>22,5%</strong><span>Ekspor ke Tiongkok</span></div>
    <div><strong>197</strong><span>Negara tujuan ekspor</span></div>
  </div>
  <div class="grid-2">
    ${card("Ekspor vs impor barang, 2019–2025 (US$ miliar)", groupedBars(tradeBars, { labelA: "Ekspor", labelB: "Impor", aria: "Ekspor dan impor barang" }) + `<div class="legend-line"><span><i style="background:#0e7490"></i>Ekspor</span><span><i style="background:#c2410c"></i>Impor</span></div>` + srcNote("BPS, statistik ekspor–impor (Bea Cukai). 2025 angka sementara (UN Comtrade)."))}
    ${card("Neraca perdagangan barang (US$ miliar)", lineChart(balLine, { color: "#15803d", aria: "Neraca perdagangan" }) + srcNote(TRADE_NOTE))}
  </div>
  <div class="grid-2">
    ${card("Komoditas ekspor utama, 2024", hbarChart(comBars, { aria: "Komoditas ekspor utama" }) + srcNote("UN Comtrade / BPS 2024, pangsa dari total ekspor barang. Sawit dan batu bara menopang ekspor nonmigas."))}
    ${card("Mitra dagang terbesar, 2024", `<div class="table-wrap"><table class="tbl"><thead><tr><th>Negara</th><th class="num">Ekspor</th><th class="num">Impor</th><th class="num">Neraca</th></tr></thead><tbody>${partnerRows}</tbody></table></div>` + srcNote(PARTNERS_NOTE))}
  </div>`;
}

// ---------- PROVINSI ----------
const provState = { q: "", sort: "pop", dir: -1, cmp: [] };
function provRows() {
  let rows = PROVINCES.map(p => ({
    ...p, dens: p.pop * 1000 / p.area, gcap: p.grdp * 1e12 / (p.pop * 1000) / 1e6,
  }));
  if (provState.q) {
    const q = provState.q.toLowerCase();
    rows = rows.filter(p => p.n.toLowerCase().includes(q));
  }
  const k = provState.sort, d = provState.dir;
  rows.sort((a, b) => (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0) * d);
  return rows;
}
function renderProvinsi() {
  const rows = provRows();
  // Kesenjangan antarprovinsi — dihitung dari data yang sama dengan tabel.
  const withGcap = PROVINCES.map(p => ({ ...p, dens: p.pop * 1000 / p.area, gcap: p.grdp * 1e12 / (p.pop * 1000) / 1e6 }));
  const topGcap = [...withGcap].sort((a, b) => b.gcap - a.gcap).slice(0, 8)
    .map(p => ({ label: p.n, v: +p.gcap.toFixed(1), tip: "Rp" + fmtID(p.gcap, 1) + " jt" }));
  const maxG = withGcap.reduce((a, b) => b.gcap > a.gcap ? b : a);
  const minG = withGcap.reduce((a, b) => b.gcap < a.gcap ? b : a);
  const maxPov = withGcap.reduce((a, b) => b.pov > a.pov ? b : a);
  const minPov = withGcap.reduce((a, b) => b.pov < a.pov ? b : a);
  const maxHdi = withGcap.reduce((a, b) => b.hdi > a.hdi ? b : a);
  const minHdi = withGcap.reduce((a, b) => b.hdi < a.hdi ? b : a);
  const maxDens = withGcap.reduce((a, b) => b.dens > a.dens ? b : a);
  const minDens = withGcap.reduce((a, b) => b.dens < a.dens ? b : a);
  const arrow = k => provState.sort === k ? (provState.dir === 1 ? " ▲" : " ▼") : "";
  const th = (k, label) => `<th data-sort="${k}" class="sortable${provState.sort === k ? " active" : ""}">${label}${arrow(k)}</th>`;
  const body = rows.map(p => `<tr data-prov="${esc(p.n)}">
    <td><strong>${esc(p.n)}</strong></td>
    <td class="num">${fmtID(p.pop)}</td>
    <td class="num">${fmtID(p.area)}</td>
    <td class="num">${fmtID(Math.round(p.dens))}</td>
    <td class="num">Rp${fmtID(p.grdp)} T</td>
    <td class="num">Rp${fmtID(p.gcap, 1)} jt</td>
    <td class="num">${p.pov.toFixed(2).replace(".", ",")}%</td>
    <td class="num">${p.hdi.toFixed(2).replace(".", ",")}</td>
    <td class="num">${p.tpt.toFixed(2).replace(".", ",")}%</td>
    <td><button class="mini-btn" data-detail="${esc(p.n)}">Detail</button> <button class="mini-btn" data-cmp="${esc(p.n)}">${provState.cmp.includes(p.n) ? "✓ Bandingkan" : "+ Bandingkan"}</button></td>
  </tr>`).join("");
  app.innerHTML = `
  ${pageHead("Provinsi", "Seluruh 38 provinsi — dari Aceh sampai Papua Pegunungan. Cari, urutkan, klik Detail, atau bandingkan dua provinsi berdampingan.")}
  <div class="grid-2">
    ${card("PDRB per kapita tertinggi, 2024", hbarChart(topGcap, { aria: "Provinsi dengan PDRB per kapita tertinggi" }) + srcNote("BPS 2024. PDRB per kapita dihitung dari PDRB dibagi penduduk; DKI Jakarta dan Kalimantan Timur tertinggi berkat jasa dan pertambangan."))}
    <section class="card"><h2>Kesenjangan antarprovinsi</h2>
    <ul class="notes">
      <li><strong>PDRB per kapita:</strong> ${esc(maxG.n)} Rp${fmtID(maxG.gcap, 1)} juta berbanding ${esc(minG.n)} Rp${fmtID(minG.gcap, 1)} juta — selisih ${(maxG.gcap / minG.gcap).toFixed(1).replace(".", ",")}× lipat.</li>
      <li><strong>Kemiskinan:</strong> ${minPov.pov.toFixed(2).replace(".", ",")}% di ${esc(minPov.n)} hingga ${maxPov.pov.toFixed(2).replace(".", ",")}% di ${esc(maxPov.n)} — rentang ${(maxPov.pov - minPov.pov).toFixed(2).replace(".", ",")} poin.</li>
      <li><strong>IPM:</strong> ${maxHdi.hdi.toFixed(2).replace(".", ",")} di ${esc(maxHdi.n)} berbanding ${minHdi.hdi.toFixed(2).replace(".", ",")} di ${esc(minHdi.n)} — selisih ${(maxHdi.hdi - minHdi.hdi).toFixed(2).replace(".", ",")} poin.</li>
      <li><strong>Kepadatan:</strong> ${fmtID(Math.round(maxDens.dens))} jiwa/km² di ${esc(maxDens.n)} berbanding ${fmtID(Math.round(minDens.dens))} jiwa/km² di ${esc(minDens.n)}.</li>
    </ul>${srcNote("Dihitung dari data BPS 2024–2025 pada tabel di bawah. Kesenjangan terbesar ada pada PDRB per kapita dan kemiskinan — keduanya terkonsentrasi di Papua.")}</section>
  </div>
  <section class="card"><h2>Pencarian &amp; pengurutan</h2>
    <div class="controls">
      <label>Cari provinsi <input id="prov-q" type="search" placeholder="mis. Jawa, Papua, Bali…" value="${esc(provState.q)}"></label>
      <button class="btn" id="prov-csv">Unduh CSV</button>
      <span class="hint">${rows.length} dari 38 provinsi ditampilkan · klik judul kolom untuk mengurutkan.</span>
    </div>
    <div id="prov-compare"></div>
    <div class="table-wrap"><table class="tbl" id="prov-table">
      <thead><tr>${th("n", "Provinsi")}${th("pop", "Penduduk (ribu)")}${th("area", "Luas (km²)")}${th("dens", "Kepadatan")}${th("grdp", "PDRB")}${th("gcap", "PDRB/kapita")}${th("pov", "Miskin")}${th("hdi", "IPM")}${th("tpt", "TPT")}<th>Aksi</th></tr></thead>
      <tbody>${body || `<tr><td colspan="10">Tidak ada provinsi yang cocok dengan “${esc(provState.q)}”.</td></tr>`}</tbody>
    </table></div>
    ${srcNote(PROV_NOTE)}
  </section>
  <div id="prov-detail"></div>`;
  const q = document.getElementById("prov-q");
  q.addEventListener("input", () => { provState.q = q.value; renderProvinsi(); const nq = document.getElementById("prov-q"); nq.focus(); nq.setSelectionRange(nq.value.length, nq.value.length); });
  document.querySelectorAll("#prov-table th.sortable").forEach(el => el.addEventListener("click", () => {
    const k = el.dataset.sort;
    if (provState.sort === k) provState.dir *= -1; else { provState.sort = k; provState.dir = k === "n" ? 1 : -1; }
    renderProvinsi();
  }));
  document.getElementById("prov-csv").addEventListener("click", () => {
    dlCSV("provinsi-indonesia-2024.csv", [["Provinsi", "Penduduk (ribu)", "Luas (km2)", "PDRB (Rp triliun)", "Kemiskinan (%)", "IPM", "TPT (%)"],
      ...PROVINCES.map(p => [p.n, p.pop, p.area, p.grdp, p.pov, p.hdi, p.tpt])]);
  });
  document.querySelectorAll("[data-detail]").forEach(b => b.addEventListener("click", () => showProvDetail(b.dataset.detail)));
  document.querySelectorAll("[data-cmp]").forEach(b => b.addEventListener("click", () => {
    const n = b.dataset.cmp;
    provState.cmp = provState.cmp.includes(n) ? provState.cmp.filter(x => x !== n) : [...provState.cmp.slice(-1), n];
    renderProvinsi(); renderCompare();
  }));
  renderCompare();
}
function provCard(p) {
  const dens = Math.round(p.pop * 1000 / p.area);
  const gcap = p.grdp * 1e12 / (p.pop * 1000) / 1e6;
  return `<article class="prov-card">
    <h3>${esc(p.n)}</h3>
    <dl>
      <div><dt>Penduduk (2024)</dt><dd>${fmtID(p.pop)} ribu jiwa</dd></div>
      <div><dt>Luas wilayah</dt><dd>${fmtID(p.area)} km²</dd></div>
      <div><dt>Kepadatan</dt><dd>${fmtID(dens)} jiwa/km²</dd></div>
      <div><dt>PDRB (2024)</dt><dd>Rp${fmtID(p.grdp)} triliun</dd></div>
      <div><dt>PDRB per kapita</dt><dd>Rp${fmtID(gcap, 1)} juta</dd></div>
      <div><dt>Kemiskinan (Mar 2025)</dt><dd>${p.pov.toFixed(2).replace(".", ",")}%</dd></div>
      <div><dt>IPM (2024)</dt><dd>${p.hdi.toFixed(2).replace(".", ",")}</dd></div>
      <div><dt>Pengangguran (Agu 2025)</dt><dd>${p.tpt.toFixed(2).replace(".", ",")}%</dd></div>
    </dl></article>`;
}
function showProvDetail(name) {
  const p = PROVINCES.find(x => x.n === name);
  if (!p) return;
  const host = document.getElementById("prov-detail");
  host.innerHTML = `<section class="card"><h2>Detail — ${esc(p.n)}</h2><div class="prov-grid">${provCard(p)}</div>
    <p>${esc(p.n)} menempati peringkat ${[...PROVINCES].sort((a, b) => b.pop - a.pop).findIndex(x => x.n === p.n) + 1} dari 38 provinsi menurut jumlah penduduk, peringkat ${[...PROVINCES].sort((a, b) => b.grdp - a.grdp).findIndex(x => x.n === p.n) + 1} menurut PDRB, dan peringkat ${[...PROVINCES].sort((a, b) => b.hdi - a.hdi).findIndex(x => x.n === p.n) + 1} menurut IPM.</p>
    ${srcNote(PROV_NOTE)}</section>`;
  host.scrollIntoView({ behavior: "smooth", block: "start" });
}
function renderCompare() {
  const host = document.getElementById("prov-compare");
  if (!host) return;
  if (provState.cmp.length < 2) {
    host.innerHTML = provState.cmp.length === 1 ? `<p class="hint">Dipilih: <strong>${esc(provState.cmp[0])}</strong> — pilih satu provinsi lagi untuk membandingkan.</p>` : "";
    return;
  }
  const [a, b] = provState.cmp.map(n => PROVINCES.find(x => x.n === n));
  host.innerHTML = `<h3>Perbandingan</h3><div class="prov-grid">${provCard(a)}${provCard(b)}</div>
  <p>${esc(a.n)} berpenduduk ${fmtID(a.pop)} ribu jiwa berbanding ${fmtID(b.pop)} ribu jiwa di ${esc(b.n)}; PDRB per kapita ${esc(a.n)} Rp${fmtID(a.grdp * 1e12 / (a.pop * 1000) / 1e6, 1)} juta berbanding Rp${fmtID(b.grdp * 1e12 / (b.pop * 1000) / 1e6, 1)} juta di ${esc(b.n)}.</p>`;
}

// ---------- DATA & METODOLOGI ----------
function renderData() {
  const srcRows = SOURCES.map(s => `<tr><td><strong>${esc(s.s)}</strong><br><span class="muted">${esc(s.u)}</span></td><td>${esc(s.d)}</td></tr>`).join("");
  const calRows = RELEASE_CALENDAR.map(c => `<tr><td>${esc(c.t)}</td><td>${esc(c.d)}</td><td>${esc(c.s)}</td></tr>`).join("");
  const meth = METHODS.map(m => `<details><summary>${esc(m.t)}</summary><p>${esc(m.d)}</p></details>`).join("");
  app.innerHTML = `
  ${pageHead("Data & Metodologi", "Semua angka di NusaData berasal dari publikasi resmi. Unduh datanya, periksa sumbernya, dan pahami cara angka itu dihitung.")}
  <div class="grid-2">
    <section class="card"><h2>Unduh data (CSV)</h2>
      <p>File dibuat langsung di peramban Anda dari data yang sama dengan yang ditampilkan di situs ini.</p>
      <div class="dl-list">
        <button class="btn" data-dl="pdb">PDB &amp; pertumbuhan 2015–2025</button>
        <button class="btn" data-dl="penduduk">Penduduk 2015–2025</button>
        <button class="btn" data-dl="kemiskinan">Kemiskinan &amp; IPM 2019–2026</button>
        <button class="btn" data-dl="perdagangan">Perdagangan 2019–2025</button>
        <button class="btn" data-dl="provinsi">Seluruh 38 provinsi</button>
      </div>
      <p class="hint">Format CSV (UTF-8, koma sebagai pemisah, desimal memakai titik). Bebas dipakai dengan menyebut sumber: BPS / NusaData.</p>
    </section>
    <section class="card"><h2>Kalender rilis BPS</h2>
      <div class="table-wrap"><table class="tbl"><thead><tr><th>Rilis</th><th>Tanggal</th><th>Jenis</th></tr></thead><tbody>${calRows}</tbody></table></div>
      ${srcNote("BPS, Kalender Rilis 2026. Berita Resmi Statistik terbit pukul 11.00 WIB pada tanggal rilis.")}
    </section>
  </div>
  ${card("Sumber data", `<div class="table-wrap"><table class="tbl"><thead><tr><th>Sumber</th><th>Data yang dipakai</th></tr></thead><tbody>${srcRows}</tbody></table></div>`)}
  <section class="card"><h2>Metodologi — cara angka dihitung</h2>${meth}</section>
  <section class="card"><h2>Tentang situs ini</h2><p>${esc(ABOUT)}</p>
  <p>Terakhir diperbarui: ${esc(SITE.updated)}. NusaData tidak berafiliasi dengan BPS atau instansi pemerintah mana pun; nama dan desainnya orisinal.</p></section>`;
  const dls = {
    pdb: () => dlCSV("pdb-indonesia-2015-2025.csv", [["Tahun", "PDB harga berlaku (Rp triliun)", "Pertumbuhan (% y-on-y)"], ...GDP_SERIES.map(d => [d.y, d.gdp, d.growth])]),
    penduduk: () => dlCSV("penduduk-indonesia-2015-2025.csv", [["Tahun", "Penduduk (juta jiwa)"], ...POP_SERIES.map(d => [d.y, d.v])]),
    kemiskinan: () => dlCSV("kemiskinan-ipm-indonesia.csv", [["Tahun", "Kemiskinan Maret (%)", "IPM"], ...POVERTY_SERIES.map(d => [d.y, d.v, (HDI_SERIES.find(h => h.y === d.y) || {}).v || ""])]),
    perdagangan: () => dlCSV("perdagangan-indonesia-2019-2025.csv", [["Tahun", "Ekspor (US$ miliar)", "Impor (US$ miliar)", "Neraca (US$ miliar)"], ...TRADE_SERIES.map(d => [d.y, d.ex, d.im, +(d.ex - d.im).toFixed(1)])]),
    provinsi: () => dlCSV("provinsi-indonesia-2024.csv", [["Provinsi", "Penduduk (ribu)", "Luas (km2)", "PDRB (Rp triliun)", "Kemiskinan (%)", "IPM", "TPT (%)"], ...PROVINCES.map(p => [p.n, p.pop, p.area, p.grdp, p.pov, p.hdi, p.tpt])]),
  };
  document.querySelectorAll("[data-dl]").forEach(b => b.addEventListener("click", () => dls[b.dataset.dl]()));
}

// ---------- ROUTER ----------
const ROUTES = {
  "/": renderHome, "/ekonomi": renderEkonomi, "/penduduk": renderPenduduk,
  "/kerja": renderKerja, "/sejahtera": renderSejahtera, "/pendidikan": renderPendidikan,
  "/perdagangan": renderPerdagangan, "/provinsi": renderProvinsi, "/data": renderData,
};
function route() {
  const path = (location.hash || "#/").slice(1) || "/";
  const fn = ROUTES[path] || renderHome;
  document.querySelectorAll(".nav a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + path));
  fn();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
