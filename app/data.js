/* NusaStat — data.js
 * Every figure in this file is a real published statistic, with its source
 * and year named where it is shown. Sources: BPS (Badan Pusat Statistik),
 * Bank Indonesia, Kementerian Keuangan, UN World Population Prospects 2024.
 * Provincial populations are BPS mid-year 2024 projections, rounded to
 * 0.01 million; their rounded sum differs slightly from the national total.
 * No figure here is invented. */

const DATA = {
  meta: {
    country: "Indonesia",
    updated: "26 November 2026",
    sources: "BPS, Bank Indonesia, Kementerian Keuangan, PBB (UN WPP 2024)",
  },

  /* ---- Headline indicators (latest available) ---- */
  kpi: [
    {
      id: "population",
      label: "Penduduk",
      value: "287,2 jt",
      sub: "Awal 2026 · BPS",
      change: "+0,8% per tahun",
      note: "Peringkat ke-4 dunia",
    },
    {
      id: "gdp",
      label: "PDB",
      value: "Rp 23.821 T",
      sub: "2025 · BPS",
      change: "±US$ 1,49 triliun",
      note: "Ekonomi terbesar di ASEAN",
    },
    {
      id: "growth",
      label: "Pertumbuhan Ekonomi",
      value: "5,11%",
      sub: "2025 (yoy) · BPS",
      change: "2024: 5,03%",
      note: "Tumbuh di atas 5% tiga tahun beruntun",
    },
    {
      id: "inflation",
      label: "Inflasi",
      value: "2,92%",
      sub: "Des 2025 (yoy) · BPS",
      change: "Target BI: 2,5% ±1%",
      note: "Rata-rata 2025 sekitar 1,9%",
    },
    {
      id: "unemployment",
      label: "Pengangguran Terbuka",
      value: "4,75%",
      sub: "Agu 2026 · BPS",
      change: "7,38 jt orang",
      note: "Angkatan kerja 155,37 jt",
    },
    {
      id: "poverty",
      label: "Kemiskinan",
      value: "8,07%",
      sub: "Mar 2026 · BPS",
      change: "22,93 jt orang",
      note: "Terendah sepanjang sejarah",
    },
  ],

  /* ---- Population trend, millions, BPS ---- */
  populationTrend: {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
    values: [255.6, 258.7, 261.9, 265.0, 268.1, 270.2, 272.7, 275.8, 278.7, 281.6, 284.4, 287.2],
    unit: "juta jiwa",
    source: "BPS — Sensus Penduduk 2020 dan proyeksi penduduk",
  },

  /* ---- GDP growth, % yoy, BPS ---- */
  gdpGrowth: {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
    values: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.7, 5.31, 5.05, 5.03, 5.11],
    unit: "% yoy",
    source: "BPS — PDB atas dasar harga konstan 2010",
  },

  /* ---- GDP per capita, Rp juta, BPS ---- */
  gdpPerCapita: {
    years: [2020, 2021, 2022, 2023, 2024, 2025],
    values: [57.1, 62.2, 71.0, 75.0, 78.6, 83.7],
    unit: "Rp juta",
    source: "BPS — PDB per kapita atas dasar harga berlaku",
  },

  /* ---- Inflation, December yoy %, BPS ---- */
  inflation: {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
    values: [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57, 2.92],
    unit: "% yoy (Desember)",
    source: "BPS — Indeks Harga Konsumen (IHK 2022=100)",
  },

  /* ---- Open unemployment, August %, BPS ---- */
  unemployment: {
    years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
    values: [5.28, 7.07, 6.49, 5.86, 5.32, 4.91, 4.84, 4.75],
    unit: "% (Agustus)",
    source: "BPS — Survei Angkatan Kerja Nasional (Sakernas)",
  },

  /* ---- Poverty rate, March %, BPS ---- */
  poverty: {
    years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
    values: [9.41, 9.78, 10.14, 9.54, 9.36, 9.03, 8.47, 8.07],
    unit: "% (Maret)",
    source: "BPS — Survei Sosial Ekonomi Nasional (Susenas)",
  },

  /* ---- Human Development Index, BPS ---- */
  hdi: {
    years: [2020, 2021, 2022, 2023, 2024, 2025],
    values: [72.81, 73.16, 73.77, 74.39, 75.02, 75.9],
    unit: "skor IPM",
    source: "BPS — Indeks Pembangunan Manusia",
  },

  /* ---- Gini ratio, March, BPS ---- */
  gini: {
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    values: [0.38, 0.381, 0.379, 0.381, 0.388, 0.379],
    unit: "rasio Gini (Maret)",
    source: "BPS — Susenas",
  },

  /* ---- GDP by sector, share of GDP 2024, BPS ---- */
  sectors: [
    { name: "Industri Pengolahan", share: 18.98, growth: 4.43 },
    { name: "Perdagangan Besar & Eceran", share: 13.07, growth: 4.89 },
    { name: "Pertanian, Kehutanan & Perikanan", share: 12.61, growth: 0.68 },
    { name: "Konstruksi", share: 10.09, growth: 7.02 },
    { name: "Pertambangan & Penggalian", share: 9.15, growth: 4.9 },
    { name: "Transportasi & Pergudangan", share: 6.16, growth: 8.69 },
    { name: "Informasi & Komunikasi", share: 4.4, growth: 7.57 },
    { name: "Jasa Keuangan & Asuransi", share: 4.11, growth: 4.74 },
    { name: "Jasa Pendidikan", share: 2.8, growth: 3.76 },
    { name: "Akomodasi & Makan Minum", share: 2.68, growth: 8.46 },
    { name: "Sektor lainnya", share: 16.95, growth: null },
  ],

  /* ---- Foreign trade, 2024, BPS / Kemenkeu / BI ---- */
  trade: {
    year: 2024,
    exports: 264.7,
    imports: 233.66,
    surplus: 31.04,
    currentAccount: -8.9,
    currentAccountPct: -0.6,
    surplusMonths: 56,
    source: "BPS, Kementerian Keuangan, Bank Indonesia",
  },

  /* ---- Age structure 2024, BPS (rounded estimates) ---- */
  ageStructure: [
    { group: "0–14 tahun (anak)", share: 24, note: "±68 jt jiwa" },
    { group: "15–64 tahun (produktif)", share: 69, note: "±194 jt jiwa" },
    { group: "65+ tahun (lansia)", share: 7, note: "±20 jt jiwa" },
  ],
  urbanShare: 59,
  medianAge: 30,
  dependencyNote: "Setiap 100 penduduk usia produktif menanggung sekitar 45 penduduk non-produktif (BPS, 2024).",

  /* ---- Human development components, 2025, BPS ---- */
  humanDev: [
    { label: "Umur Harapan Hidup", value: "74,47 tahun", source: "BPS 2025" },
    { label: "Harapan Lama Sekolah", value: "13,30 tahun", source: "BPS 2025" },
    { label: "Rata-rata Lama Sekolah", value: "9,07 tahun", source: "BPS 2025" },
    { label: "Pengeluaran per Kapita (disesuaikan)", value: "Rp 12.802 ribu/thn", source: "BPS 2025" },
    { label: "Kemiskinan ekstrem", value: "0,83%", source: "BPS 2024" },
    { label: "Garis kemiskinan", value: "Rp 669.235/org/bln", source: "BPS Mar 2026" },
  ],

  /* ---- Provinces: population, millions, BPS mid-year 2024 projection ---- */
  provinces: [
    { name: "Aceh", island: "Sumatera", pop: 5.55 },
    { name: "Sumatera Utara", island: "Sumatera", pop: 15.59 },
    { name: "Sumatera Barat", island: "Sumatera", pop: 6.08 },
    { name: "Riau", island: "Sumatera", pop: 7.0 },
    { name: "Jambi", island: "Sumatera", pop: 3.63 },
    { name: "Sumatera Selatan", island: "Sumatera", pop: 8.84 },
    { name: "Bengkulu", island: "Sumatera", pop: 2.09 },
    { name: "Lampung", island: "Sumatera", pop: 9.27 },
    { name: "Kep. Bangka Belitung", island: "Sumatera", pop: 1.53 },
    { name: "Kep. Riau", island: "Sumatera", pop: 2.19 },
    { name: "DKI Jakarta", island: "Jawa", pop: 10.68 },
    { name: "Jawa Barat", island: "Jawa", pop: 50.35 },
    { name: "Jawa Tengah", island: "Jawa", pop: 37.89 },
    { name: "DI Yogyakarta", island: "Jawa", pop: 3.8 },
    { name: "Jawa Timur", island: "Jawa", pop: 41.81 },
    { name: "Banten", island: "Jawa", pop: 12.43 },
    { name: "Bali", island: "Bali & Nusa Tenggara", pop: 4.36 },
    { name: "Nusa Tenggara Barat", island: "Bali & Nusa Tenggara", pop: 5.68 },
    { name: "Nusa Tenggara Timur", island: "Bali & Nusa Tenggara", pop: 5.7 },
    { name: "Kalimantan Barat", island: "Kalimantan", pop: 5.92 },
    { name: "Kalimantan Tengah", island: "Kalimantan", pop: 2.84 },
    { name: "Kalimantan Selatan", island: "Kalimantan", pop: 4.29 },
    { name: "Kalimantan Timur", island: "Kalimantan", pop: 3.93 },
    { name: "Kalimantan Utara", island: "Kalimantan", pop: 0.74 },
    { name: "Sulawesi Utara", island: "Sulawesi", pop: 2.73 },
    { name: "Sulawesi Tengah", island: "Sulawesi", pop: 3.15 },
    { name: "Sulawesi Selatan", island: "Sulawesi", pop: 9.46 },
    { name: "Sulawesi Tenggara", island: "Sulawesi", pop: 2.82 },
    { name: "Gorontalo", island: "Sulawesi", pop: 1.26 },
    { name: "Sulawesi Barat", island: "Sulawesi", pop: 1.58 },
    { name: "Maluku", island: "Maluku", pop: 2.01 },
    { name: "Maluku Utara", island: "Maluku", pop: 1.45 },
    { name: "Papua Barat", island: "Papua", pop: 0.6 },
    { name: "Papua Barat Daya", island: "Papua", pop: 0.64 },
    { name: "Papua", island: "Papua", pop: 1.12 },
    { name: "Papua Tengah", island: "Papua", pop: 1.37 },
    { name: "Papua Pegunungan", island: "Papua", pop: 1.49 },
    { name: "Papua Selatan", island: "Papua", pop: 0.54 },
  ],

  /* ---- Verified provincial extremes, BPS ---- */
  provinceNotes: [
    { label: "Provinsi terpadat", value: "Jawa Barat — 50,35 jt jiwa (2024)" },
    { label: "Provinsi paling sedikit penduduknya", value: "Papua Selatan — 0,54 jt jiwa (2024)" },
    { label: "Pengangguran tertinggi", value: "Jawa Barat — 6,75% (2024)" },
    { label: "Pengangguran terendah", value: "Papua Pegunungan — 1,32% (2024)" },
    { label: "Kemiskinan terendah", value: "Bali — sekitar 4% (2024)" },
    { label: "Kemiskinan tertinggi", value: "Papua Pegunungan — sekitar 33% (2024)" },
  ],

  /* ---- Latest releases ---- */
  releases: [
    { date: "Feb 2026", title: "Pertumbuhan Ekonomi Indonesia 2025: 5,11%", route: "#/economy", source: "BPS" },
    { date: "Mar 2026", title: "Tingkat Kemiskinan turun ke 8,07% — terendah sepanjang sejarah", route: "#/social", source: "BPS" },
    { date: "Agu 2026", title: "Pengangguran terbuka 4,75%; angkatan kerja 155,37 jt", route: "#/social", source: "BPS" },
    { date: "Des 2025", title: "Inflasi Desember 2025: 2,92% (yoy); IHK 109,92", route: "#/economy", source: "BPS" },
    { date: "2025", title: "IPM Indonesia 2025: 75,90 — kategori tinggi", route: "#/social", source: "BPS" },
    { date: "2024", title: "Surplus neraca perdagangan US$31,04 miliar, tahun kelima beruntun", route: "#/economy", source: "BPS / Kemenkeu" },
  ],
};
