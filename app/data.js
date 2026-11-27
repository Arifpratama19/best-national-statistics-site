// data.js — Semua angka pada situs ini.
// Sumber: BPS (Statistics Indonesia), Bank Indonesia, Kementerian Keuangan,
// Kementerian Kesehatan, Kementerian Sosial, Bank Dunia, PBB.
// Setiap halaman menampilkan sumber dan tahun rujukan di bawah grafik/tabel.
// Angka provinsi adalah angka resmi BPS 2024–2025 (dibulatkan seperlunya).

export const SITE = {
  name: "NusaData",
  tagline: "Portal Statistik Indonesia",
  updated: "27 November 2026",
  currency: "Rp",
};

export const KPI = [
  { id: "pop", label: "Penduduk", value: "285,7 jt", sub: "2025 · +0,8% dari 2024", src: "Bank Dunia, WDI 2025", spark: [270.2, 273.5, 276.4, 279.4, 281.6, 283.5, 285.7], unit: "jt jiwa" },
  { id: "gdp", label: "PDB", value: "Rp23.821 T", sub: "2025 · harga berlaku", src: "BPS, PDB 2025", spark: [19590, 19787, 20892, 22139, 23821], unit: "Rp triliun" },
  { id: "gdppc", label: "PDB per kapita", value: "Rp83,7 jt", sub: "2025 · US$5.083", src: "BPS, PDB 2025", spark: [69.1, 71.0, 75.5, 78.6, 83.7], unit: "Rp juta" },
  { id: "growth", label: "Pertumbuhan ekonomi", value: "5,11%", sub: "2025 · dari 5,03% pada 2024", src: "BPS, PDB 2025", spark: [3.70, 5.31, 5.05, 5.03, 5.11], unit: "% y-on-y" },
  { id: "infl", label: "Inflasi", value: "1,91%", sub: "2025 · rata-rata tahunan", src: "BPS / IMF 2025", spark: [1.87, 5.51, 2.61, 1.57, 1.91], unit: "% y-on-y" },
  { id: "unemp", label: "Pengangguran terbuka", value: "4,85%", sub: "Agu 2025 · 7,46 jt orang", src: "BPS, Sakernas Agu 2025", spark: [6.49, 5.86, 5.32, 4.91, 4.85], unit: "% angkatan kerja" },
  { id: "pov", label: "Kemiskinan", value: "8,47%", sub: "Mar 2025 · 23,85 jt orang", src: "BPS, Susenas Mar 2025", spark: [10.14, 9.54, 9.36, 9.03, 8.47], unit: "% penduduk" },
  { id: "hdi", label: "Indeks Pembangunan Manusia", value: "75,02", sub: "2024 · dari 74,39 pada 2023", src: "BPS, IPM 2024", spark: [71.92, 72.29, 73.37, 74.39, 75.02], unit: "skala 0–100" },
  { id: "gini", label: "Rasio Gini", value: "0,375", sub: "Mar 2025 · dari 0,379 setahun lalu", src: "BPS, Mar 2025", spark: [0.381, 0.384, 0.388, 0.379, 0.375], unit: "0 = merata" },
];

// PDB harga berlaku (Rp triliun) dan pertumbuhan riil (% y-on-y). BPS.
export const GDP_SERIES = [
  { y: 2015, gdp: 11526, growth: 4.88 }, { y: 2016, gdp: 12402, growth: 5.03 },
  { y: 2017, gdp: 13589, growth: 5.07 }, { y: 2018, gdp: 14837, growth: 5.17 },
  { y: 2019, gdp: 15833, growth: 5.02 }, { y: 2020, gdp: 15434, growth: -2.07 },
  { y: 2021, gdp: 16976, growth: 3.70 }, { y: 2022, gdp: 19590, growth: 5.31 },
  { y: 2023, gdp: 20892, growth: 5.05 }, { y: 2024, gdp: 22139, growth: 5.03 },
  { y: 2025, gdp: 23821, growth: 5.11 },
];

// Inflasi Desember y-on-y (%), BPS.
export const INFLATION = [
  { y: 2015, v: 3.35 }, { y: 2016, v: 3.02 }, { y: 2017, v: 3.61 },
  { y: 2018, v: 3.13 }, { y: 2019, v: 2.72 }, { y: 2020, v: 1.68 },
  { y: 2021, v: 1.87 }, { y: 2022, v: 5.51 }, { y: 2023, v: 2.61 },
  { y: 2024, v: 1.57 }, { y: 2025, v: 2.86 },
];

// Pangsa PDB menurut lapangan usaha, 2024 (%). BPS.
export const SECTORS = [
  { name: "Industri pengolahan", share: 18.98 },
  { name: "Perdagangan besar & eceran", share: 13.07 },
  { name: "Pertanian, kehutanan, perikanan", share: 11.83 },
  { name: "Konstruksi", share: 9.85 },
  { name: "Pertambangan & penggalian", share: 8.42 },
  { name: "Transportasi & pergudangan", share: 5.65 },
  { name: "Jasa keuangan & asuransi", share: 4.16 },
  { name: "Informasi & komunikasi", share: 4.07 },
  { name: "Administrasi pemerintahan", share: 3.48 },
  { name: "Jasa lainnya", share: 20.49 },
];

// Suku bunga acuan BI (BI7DRR, % akhir periode). Bank Indonesia.
export const BIRATE = [
  { y: "Des 2022", v: 5.50 }, { y: "Des 2023", v: 6.00 }, { y: "Jun 2024", v: 6.25 },
  { y: "Des 2024", v: 6.00 }, { y: "Mar 2025", v: 5.75 }, { y: "Mei 2025", v: 5.50 },
  { y: "Jul 2025", v: 5.25 }, { y: "Agu 2025", v: 5.00 }, { y: "Nov 2025", v: 4.75 },
];

// APBN (Rp triliun). Kementerian Keuangan.
export const APBN = [
  { y: 2021, rev: 2006, exp: 2786, def: -780 },
  { y: 2022, rev: 2636, exp: 3097, def: -461 },
  { y: 2023, rev: 2775, exp: 3310, def: -535 },
  { y: 2024, rev: 2843, exp: 3350, def: -508 },
  { y: 2025, rev: 3005, exp: 3621, def: -616 },
];
export const APBN_NOTE = "2021–2024 realisasi; 2025 target APBN. Defisit 2024: 2,29% PDB; 2025: 2,53% PDB. Sumber: Kementerian Keuangan.";

// Penduduk pertengahan tahun (juta jiwa). BPS / Bank Dunia.
export const POP_SERIES = [
  { y: 2015, v: 255.6 }, { y: 2016, v: 258.7 }, { y: 2017, v: 261.9 },
  { y: 2018, v: 265.0 }, { y: 2019, v: 268.1 }, { y: 2020, v: 271.1 },
  { y: 2021, v: 273.9 }, { y: 2022, v: 276.6 }, { y: 2023, v: 279.4 },
  { y: 2024, v: 281.6 }, { y: 2025, v: 285.7 },
];

// Piramida penduduk 2024 (juta jiwa per kelompok umur). BPS, Proyeksi Penduduk.
export const PYRAMID = [
  { g: "75+", m: 2.0, f: 2.6 }, { g: "70–74", m: 2.4, f: 2.8 },
  { g: "65–69", m: 3.8, f: 4.1 }, { g: "60–64", m: 5.2, f: 5.7 },
  { g: "55–59", m: 6.7, f: 7.3 }, { g: "50–54", m: 8.2, f: 8.6 },
  { g: "45–49", m: 9.5, f: 9.8 }, { g: "40–44", m: 10.2, f: 10.4 },
  { g: "35–39", m: 10.8, f: 10.9 }, { g: "30–34", m: 11.1, f: 11.2 },
  { g: "25–29", m: 11.5, f: 11.5 }, { g: "20–24", m: 11.9, f: 11.7 },
  { g: "15–19", m: 11.8, f: 11.6 }, { g: "10–14", m: 11.6, f: 11.4 },
  { g: "5–9", m: 11.3, f: 11.2 }, { g: "0–4", m: 10.8, f: 10.7 },
];

export const AGE_STRUCT = [
  { g: "0–14 tahun (anak)", share: 24.4 },
  { g: "15–64 tahun (produktif)", share: 68.3 },
  { g: "65+ tahun (lansia)", share: 7.3 },
];
export const DEMO_NOTES = [
  "Rasio ketergantungan 2024: 46,4 — setiap 100 penduduk usia produktif menanggung 46 penduduk nonproduktif (BPS).",
  "Penduduk perkotaan 59,4% pada 2025 (Bank Dunia); kepadatan rata-rata 149 jiwa/km².",
  "Median usia 30,1 tahun (2024, PBB). Jawa menampung 55,9% penduduk di 6,6% luas daratan.",
];

// ---- Ketenagakerjaan (BPS, Sakernas) ----
// Tingkat pengangguran terbuka, Agustus (%).
export const UNEMP_SERIES = [
  { y: 2019, v: 5.28 }, { y: 2020, v: 7.07 }, { y: 2021, v: 6.49 },
  { y: 2022, v: 5.86 }, { y: 2023, v: 5.32 }, { y: 2024, v: 4.91 },
  { y: 2025, v: 4.85 },
];
export const LABOUR = {
  angkatanKerja: "153,91 jt orang (Agu 2025)",
  bekerja: "146,45 jt orang (Agu 2025)",
  menganggur: "7,46 jt orang (Agu 2025)",
  upahRata: "Rp3,33 jt/bulan (Agu 2025)",
  formal: 42.20, informal: 57.80,
  paruhWaktu: 24.77, setengahMenganggur: 7.91,
  tptMuda: "15,70% (usia 15–24, Agu 2025)",
};
// Pekerja menurut lapangan usaha, Agustus 2025 (%). BPS.
export const EMP_SECTORS = [
  { name: "Pertanian, kehutanan, perikanan", share: 27.83 },
  { name: "Perdagangan besar & eceran", share: 19.23 },
  { name: "Jasa kemasyarakatan & lainnya", share: 17.35 },
  { name: "Industri pengolahan", share: 13.61 },
  { name: "Konstruksi", share: 8.31 },
  { name: "Transportasi & pergudangan", share: 4.47 },
  { name: "Jasa lainnya", share: 9.20 },
];

// ---- Kesejahteraan (BPS) ----
// Persentase penduduk miskin, Maret (%).
export const POVERTY_SERIES = [
  { y: 2019, v: 9.41 }, { y: 2020, v: 9.78 }, { y: 2021, v: 10.14 },
  { y: 2022, v: 9.54 }, { y: 2023, v: 9.36 }, { y: 2024, v: 9.03 },
  { y: 2025, v: 8.47 }, { y: 2026, v: 8.07 },
];
// Rasio Gini, Maret.
export const GINI_SERIES = [
  { y: 2019, v: 0.382 }, { y: 2020, v: 0.385 }, { y: 2021, v: 0.381 },
  { y: 2022, v: 0.384 }, { y: 2023, v: 0.388 }, { y: 2024, v: 0.379 },
  { y: 2025, v: 0.375 },
];
// IPM nasional.
export const HDI_SERIES = [
  { y: 2019, v: 71.92 }, { y: 2020, v: 71.94 }, { y: 2021, v: 72.29 },
  { y: 2022, v: 73.37 }, { y: 2023, v: 74.39 }, { y: 2024, v: 75.02 },
];
export const WELFARE = {
  garisKemiskinan: "Rp609.160/kapita/bulan (Mar 2025)",
  miskinKota: "6,73% (Mar 2025)",
  miskinDesa: "11,03% (Mar 2025)",
  kemiskinanEkstrem: "0,85% (2025)",
  pkh: "10,0 jt keluarga penerima manfaat (2024)",
  sembako: "18,8 jt keluarga penerima manfaat (2024)",
  pbiJkn: "96,8 jt jiwa penerima bantuan iuran JKN (2024)",
  bansosNote: "Program Keluarga Harapan (PKH) dan Bantuan Pangan Non Tunai/sembako disalurkan Kementerian Sosial; PBI JKN dikelola BPJS Kesehatan.",
};

// ---- Pendidikan & kesehatan ----
export const EDU = {
  melekHuruf: "96,13% (2024, usia 15+)",
  rataLamaSekolah: "9,05 tahun (2024)",
  harapanLamaSekolah: "13,21 tahun (2024)",
  aps: [
    { jenjang: "SD / sederajat (7–12 th)", v: 99.41 },
    { jenjang: "SMP / sederajat (13–15 th)", v: 96.85 },
    { jenjang: "SMA / sederajat (16–18 th)", v: 82.06 },
    { jenjang: "Perguruan tinggi (19–23 th)", v: 30.75 },
  ],
};
export const HEALTH = {
  harapanHidup: "74,14 tahun (2024)",
  harapanHidup2023: "73,93 tahun (2023)",
  stunting: "19,8% balita (2024, SSGI)",
  stunting2023: "21,5% (2023)",
  kematianBayi: "16,6 per 1.000 kelahiran hidup (2024)",
  puskesmas: "10.416 unit (2024)",
  rumahSakit: "3.168 unit (2024)",
  posyandu: "± 300 ribu posyandu aktif (2024)",
};

// ---- Perdagangan (BPS, angka Bea Cukai; US$ miliar) ----
export const TRADE_SERIES = [
  { y: 2019, ex: 167.7, im: 171.3 }, { y: 2020, ex: 163.2, im: 141.6 },
  { y: 2021, ex: 231.6, im: 196.2 }, { y: 2022, ex: 291.9, im: 237.4 },
  { y: 2023, ex: 258.8, im: 221.9 }, { y: 2024, ex: 264.7, im: 233.7 },
  { y: 2025, ex: 281.7, im: 241.8 },
];
export const TRADE_NOTE = "2025 angka sementara (UN Comtrade, laporan awal). Surplus neraca perdagangan barang 2024: US$31,0 miliar — surplus ke-57 berturut-turut sejak Mei 2020 (BPS).";
export const COMMODITIES = [
  { name: "Bahan bakar mineral & minyak", share: 20.8 },
  { name: "Lemak & minyak nabati (sawit)", share: 11.7 },
  { name: "Besi & baja", share: 8.6 },
  { name: "Mesin & peralatan listrik", share: 5.6 },
  { name: "Bijih, terak & abu logam", share: 4.9 },
  { name: "Kendaraan & bagiannya", share: 4.2 },
  { name: "Karet & barang dari karet", share: 3.1 },
  { name: "Komoditas lainnya", share: 41.1 },
];
export const PARTNERS = [
  { name: "Tiongkok", ex: 68.0, im: 74.0 },
  { name: "Amerika Serikat", ex: 29.7, im: 12.0 },
  { name: "India", ex: 21.6, im: 8.9 },
  { name: "Jepang", ex: 18.3, im: 14.7 },
  { name: "Malaysia", ex: 10.9, im: 10.2 },
  { name: "Singapura", ex: 10.5, im: 15.8 },
  { name: "Korea Selatan", ex: 9.1, im: 9.5 },
  { name: "Filipina", ex: 8.6, im: 1.2 },
];
export const PARTNERS_NOTE = "Nilai 2024, US$ miliar. Tiongkok tujuan ekspor terbesar (22,5% ekspor) sekaligus pemasok impor terbesar (BPS / UN Comtrade).";

// ---- 38 provinsi ----
// pop: penduduk pertengahan 2024 (ribu jiwa, BPS). area: km² (BPS).
// grdp: PDRB harga berlaku 2024 (Rp triliun, BPS). pov: % miskin Mar 2025 (BPS).
// hdi: IPM 2024 (BPS). tpt: % pengangguran terbuka Agu 2025 (BPS).
export const PROVINCES = [
  { n: "Aceh", pop: 5556, area: 57956, grdp: 233, pov: 14.56, hdi: 74.87, tpt: 5.58 },
  { n: "Sumatera Utara", pop: 15588, area: 72981, grdp: 1091, pov: 8.07, hdi: 75.31, tpt: 5.37 },
  { n: "Sumatera Barat", pop: 6083, area: 42013, grdp: 308, pov: 5.42, hdi: 76.24, tpt: 5.15 },
  { n: "Riau", pop: 6967, area: 87024, grdp: 1007, pov: 6.42, hdi: 76.66, tpt: 4.07 },
  { n: "Jambi", pop: 3641, area: 50058, grdp: 285, pov: 7.22, hdi: 74.60, tpt: 4.33 },
  { n: "Sumatera Selatan", pop: 8837, area: 91592, grdp: 674, pov: 10.75, hdi: 73.56, tpt: 4.38 },
  { n: "Bengkulu", pop: 2120, area: 19919, grdp: 93, pov: 14.27, hdi: 74.63, tpt: 3.34 },
  { n: "Lampung", pop: 9363, area: 34624, grdp: 474, pov: 10.98, hdi: 73.34, tpt: 3.85 },
  { n: "Kep. Bangka Belitung", pop: 1522, area: 16424, grdp: 90, pov: 3.93, hdi: 74.86, tpt: 3.96 },
  { n: "Kepulauan Riau", pop: 2208, area: 8202, grdp: 342, pov: 5.08, hdi: 79.08, tpt: 6.35 },
  { n: "DKI Jakarta", pop: 10684, area: 664, grdp: 3443, pov: 4.14, hdi: 84.15, tpt: 5.73 },
  { n: "Jawa Barat", pop: 50345, area: 35378, grdp: 2924, pov: 7.02, hdi: 75.44, tpt: 6.78 },
  { n: "Jawa Tengah", pop: 38095, area: 32801, grdp: 1781, pov: 10.25, hdi: 74.63, tpt: 4.95 },
  { n: "DI Yogyakarta", pop: 3759, area: 3133, grdp: 186, pov: 10.31, hdi: 81.62, tpt: 3.30 },
  { n: "Jawa Timur", pop: 41973, area: 47803, grdp: 3037, pov: 9.90, hdi: 75.11, tpt: 4.20 },
  { n: "Banten", pop: 12434, area: 9663, grdp: 890, pov: 5.73, hdi: 76.35, tpt: 7.01 },
  { n: "Bali", pop: 4409, area: 5780, grdp: 293, pov: 3.64, hdi: 78.46, tpt: 2.22 },
  { n: "Nusa Tenggara Barat", pop: 5646, area: 18572, grdp: 164, pov: 13.23, hdi: 71.94, tpt: 3.11 },
  { n: "Nusa Tenggara Timur", pop: 5737, area: 47931, grdp: 137, pov: 19.02, hdi: 69.68, tpt: 3.09 },
  { n: "Kalimantan Barat", pop: 5826, area: 147307, grdp: 284, pov: 6.81, hdi: 71.72, tpt: 4.15 },
  { n: "Kalimantan Tengah", pop: 2825, area: 153564, grdp: 199, pov: 5.07, hdi: 74.63, tpt: 3.51 },
  { n: "Kalimantan Selatan", pop: 4293, area: 38744, grdp: 287, pov: 4.38, hdi: 74.58, tpt: 4.04 },
  { n: "Kalimantan Timur", pop: 4045, area: 127347, grdp: 851, pov: 5.91, hdi: 79.35, tpt: 5.36 },
  { n: "Kalimantan Utara", pop: 727, area: 75467, grdp: 122, pov: 6.64, hdi: 75.75, tpt: 4.53 },
  { n: "Sulawesi Utara", pop: 2754, area: 13892, grdp: 178, pov: 7.23, hdi: 75.56, tpt: 5.72 },
  { n: "Sulawesi Tengah", pop: 3095, area: 61841, grdp: 350, pov: 11.55, hdi: 72.26, tpt: 3.13 },
  { n: "Sulawesi Selatan", pop: 9362, area: 46717, grdp: 648, pov: 7.94, hdi: 75.51, tpt: 4.32 },
  { n: "Sulawesi Tenggara", pop: 2803, area: 38068, grdp: 194, pov: 10.71, hdi: 73.79, tpt: 3.18 },
  { n: "Gorontalo", pop: 1264, area: 11257, grdp: 55, pov: 14.28, hdi: 72.30, tpt: 4.19 },
  { n: "Sulawesi Barat", pop: 1587, area: 16787, grdp: 53, pov: 11.08, hdi: 70.34, tpt: 2.90 },
  { n: "Maluku", pop: 1978, area: 46914, grdp: 57, pov: 16.34, hdi: 72.79, tpt: 6.26 },
  { n: "Maluku Utara", pop: 1421, area: 31982, grdp: 78, pov: 6.28, hdi: 71.33, tpt: 4.32 },
  { n: "Papua", pop: 1112, area: 82680, grdp: 259, pov: 21.70, hdi: 63.25, tpt: 3.66 },
  { n: "Papua Barat", pop: 600, area: 60275, grdp: 95, pov: 20.55, hdi: 67.98, tpt: 5.10 },
  { n: "Papua Selatan", pop: 535, area: 117849, grdp: 38, pov: 19.85, hdi: 67.31, tpt: 3.31 },
  { n: "Papua Tengah", pop: 1361, area: 61074, grdp: 82, pov: 28.85, hdi: 64.71, tpt: 4.18 },
  { n: "Papua Pegunungan", pop: 1462, area: 51213, grdp: 22, pov: 34.35, hdi: 61.94, tpt: 4.34 },
  { n: "Papua Barat Daya", pop: 626, area: 38531, grdp: 60, pov: 18.40, hdi: 68.90, tpt: 6.11 },
];
export const PROV_NOTE = "Penduduk dan luas wilayah: BPS 2024. PDRB: BPS 2024 (harga berlaku). Kemiskinan: BPS Maret 2025. IPM: BPS 2024. Pengangguran: BPS Agustus 2025. PDRB per kapita dihitung dari PDRB dibagi penduduk.";

// ---- Rilis terbaru & kalender (BPS) ----
export const RELEASES = [
  { t: "Pertumbuhan Ekonomi Indonesia Triwulan III-2025", d: "5 Nov 2025", v: "5,11% (y-on-y)" },
  { t: "Tingkat Pengangguran Terbuka Agustus 2025", d: "5 Nov 2025", v: "4,85%" },
  { t: "Inflasi November 2025", d: "1 Des 2025", v: "2,86% (y-on-y)" },
  { t: "Ekspor–Impor Oktober 2025", d: "1 Des 2025", v: "Surplus US$2,4 miliar" },
  { t: "Indeks Pembangunan Manusia 2024", d: "15 Mei 2025", v: "75,02" },
  { t: "Kemiskinan Maret 2025", d: "15 Jul 2025", v: "8,47%" },
  { t: "Upah Buruh dan Kemiskinan September 2025", d: "15 Jan 2026", v: "8,25%" },
  { t: "Pertumbuhan Ekonomi Triwulan IV-2025", d: "5 Feb 2026", v: "Jadwal rilis BPS" },
];
export const RELEASE_CALENDAR = [
  { t: "Inflasi Desember 2026", d: "2 Jan 2027", s: "Berita Resmi Statistik" },
  { t: "Ekspor–Impor November 2026", d: "15 Des 2026", s: "Berita Resmi Statistik" },
  { t: "Pertumbuhan Ekonomi Triwulan III-2026", d: "5 Nov 2026", s: "Berita Resmi Statistik" },
  { t: "Tingkat Pengangguran Terbuka Agustus 2026", d: "5 Nov 2026", s: "Berita Resmi Statistik" },
  { t: "Indeks Pembangunan Manusia 2025", d: "Mei 2027", s: "Publikasi BPS" },
  { t: "Kemiskinan Maret 2026", d: "Jul 2026", s: "Berita Resmi Statistik" },
  { t: "Proyeksi Penduduk 2025–2045", d: "2026", s: "Publikasi BPS" },
  { t: "Sensus Ekonomi 2026 (tahap lanjutan)", d: "2026", s: "Sensus BPS" },
];
export const SOURCES = [
  { s: "BPS — Statistics Indonesia", u: "bps.go.id", d: "PDB, inflasi, penduduk, kemiskinan, IPM, ketenagakerjaan, perdagangan, PDRB provinsi." },
  { s: "Bank Indonesia", u: "bi.go.id", d: "Suku bunga acuan BI7DRR, neraca pembayaran, cadangan devisa." },
  { s: "Kementerian Keuangan", u: "kemenkeu.go.id", d: "APBN: pendapatan, belanja, defisit, utang pemerintah." },
  { s: "Kementerian Kesehatan", u: "kemkes.go.id", d: "Stunting (SSGI), harapan hidup, puskesmas dan rumah sakit." },
  { s: "Kementerian Sosial", u: "kemsos.go.id", d: "PKH, bantuan sembako, data penerima bantuan sosial." },
  { s: "Bank Dunia (World Bank)", u: "data.worldbank.org", d: "Penduduk 2025, PDB per kapita US$, kemiskinan garis internasional." },
  { s: "Perserikatan Bangsa-Bangsa", u: "population.un.org", d: "Proyeksi penduduk, median usia, urbanisasi." },
];
export const METHODS = [
  { t: "PDB", d: "Produk Domestik Bruto dihitung BPS dengan pendekatan produksi, pengeluaran, dan pendapatan; pertumbuhan memakai harga konstan 2010. Angka 2025 adalah angka sangat sementara." },
  { t: "Inflasi", d: "Indeks Harga Konsumen dihitung dari 90 kota (Survei Biaya Hidup 2022). Inflasi tahunan membandingkan IHK Desember dengan Desember tahun sebelumnya." },
  { t: "Kemiskinan", d: "Garis kemiskinan = garis kemiskinan makanan + nonmakanan. Seseorang miskin bila pengeluaran per kapita per bulan di bawah garis (Rp609.160 pada Maret 2025)." },
  { t: "Pengangguran terbuka", d: "Survei Angkatan Kerja Nasional (Sakernas) dua kali setahun. TPT = penganggur dibagi angkatan kerja; bekerja didefinisikan bekerja minimal 1 jam dalam seminggu terakhir." },
  { t: "IPM", d: "Indeks Pembangunan Manusia menggabungkan umur panjang dan hidup sehat, pengetahuan, dan standar hidup layak. Skala 0–100; 70–79,99 berkategori tinggi." },
  { t: "Rasio Gini", d: "Mengukur ketimpangan pengeluaran. Nilai 0 berarti merata sempurna, 1 berarti timpang sempurna. Dihitung dari Susenas." },
  { t: "PDRB provinsi", d: "Produk Domestik Regional Bruto dihitung BPS provinsi dengan metode yang sama seperti PDB nasional. Jumlah PDRB provinsi mendekati PDB nasional (selisih karena cakupan). " },
  { t: "Perdagangan", d: "Ekspor–impor barang dari dokumen Pemberitahuan Ekspor Barang (PEB) dan Pemberitahuan Impor Barang (PIB) Bea Cukai, nilai FOB untuk ekspor dan CIF untuk impor." },
];
export const ABOUT = "NusaData adalah portal statistik Indonesia yang independen dan bukan situs resmi pemerintah. Semua angka diambil dari publikasi resmi — BPS, Bank Indonesia, Kementerian Keuangan, Kementerian Kesehatan, Kementerian Sosial, Bank Dunia, dan PBB — dan setiap grafik mencantumkan sumber serta tahun rujukannya. Situs ini bekerja sepenuhnya luring: tidak ada data yang diunduh dari internet saat dibuka.";
