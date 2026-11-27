# NusaData — Portal Statistik Indonesia

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Arifpratama19/best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Arifpratama19/best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

**NusaData** adalah portal statistik Indonesia yang independen — bukan situs resmi
pemerintah — dengan angka nyata dari BPS (Statistics Indonesia), Bank Indonesia,
Kementerian Keuangan, Kementerian Kesehatan, Kementerian Sosial, Bank Dunia, dan
PBB. Setiap grafik dan tabel mencantumkan sumber serta tahun rujukannya.

## Halaman

- **Beranda** — 9 kartu KPI (penduduk, PDB, PDB per kapita, pertumbuhan, inflasi,
  pengangguran, kemiskinan, IPM, Gini) dengan sparkline, grafik pertumbuhan PDB
  2015–2025, inflasi, 5 provinsi terpadat, dan rilis terbaru.
- **Ekonomi** — PDB dan pertumbuhan dengan pemilih rentang tahun, PDB menurut
  lapangan usaha, suku bunga acuan BI, dan APBN (pendapatan, belanja, defisit).
- **Penduduk** — piramida penduduk 2024, jumlah penduduk 2015–2025, struktur
  umur, dan 10 provinsi terpadat.
- **Ketenagakerjaan** — tren pengangguran, pekerja menurut sektor, formal vs
  informal, dan upah rata-rata.
- **Kesejahteraan** — tren kemiskinan, Gini, IPM, kemiskinan dan IPM menurut
  provinsi, serta bantuan sosial (PKH, sembako, PBI JKN).
- **Pendidikan & Kesehatan** — melek huruf, partisipasi sekolah, harapan hidup,
  stunting, dan fasilitas kesehatan.
- **Perdagangan** — ekspor vs impor, neraca perdagangan, komoditas utama, dan
  mitra dagang terbesar.
- **Provinsi** — tabel seluruh **38 provinsi** yang bisa dicari dan diurutkan
  (penduduk, luas, kepadatan, PDRB, PDRB per kapita, kemiskinan, IPM,
  pengangguran), panel detail per provinsi, dan mode bandingkan dua provinsi.
- **Data & Metodologi** — sumber data, kalender rilis BPS, penjelasan metodologi,
  dan tombol unduh CSV yang benar-benar menghasilkan file CSV dari data situs.

## Teknologi

File statis di bawah `app/` tanpa build step dan tanpa permintaan jaringan sama
sekali: tanpa font, skrip, gambar, atau CDN luar — hanya system font dan grafik
SVG yang digambar tangan (`app/charts.js`). Data di `app/data.js`, rute hash di
`app/main.js`.

## Menjalankan

```sh
node serve.ts
# buka http://localhost:8080 (atau: node serve.ts --port 3000)
```

## Menyerahkan (hand-in)

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` menyalin `app/` dan `screenshots/` ke direktori output lalu menulis
`dossier.json` dengan `buildDossier` dari `vendor/makefun-frontend.ts`.

## Lisensi

MIT — lihat `LICENSE`.
