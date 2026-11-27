// charts.js — Grafik SVG yang digambar tangan, tanpa pustaka luar.
// Semua fungsi mengembalikan string SVG dan menerima data + label.

export function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function niceMax(v) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
}

function fmtNum(v) {
  if (Math.abs(v) >= 1000) return v.toLocaleString("id-ID");
  return String(v);
}

// Label sumbu: bulat rapi (1 desimal bila kecil), format Indonesia.
function fmtAxis(v) {
  const r = Math.abs(v) >= 100 ? Math.round(v) : Math.round(v * 10) / 10;
  return r.toLocaleString("id-ID");
}

// Grafik garis dengan area, titik, dan tooltip.
export function lineChart(data, opts = {}) {
  const w = opts.w || 640, h = opts.h || 260, padL = 46, padR = 14, padT = 14, padB = 30;
  const vals = data.map(d => d.v);
  let min = Math.min(...vals), max = Math.max(...vals);
  if (opts.zero !== false) min = Math.min(0, min);
  if (max === min) max = min + 1;
  const top = niceMax(max), bot = min < 0 ? -niceMax(-min) : 0;
  const iw = w - padL - padR, ih = h - padT - padB;
  const x = i => padL + (iw * i) / (data.length - 1);
  const y = v => padT + ih * (1 - (v - bot) / (top - bot));
  const color = opts.color || "#0e7490";
  const grid = [0, 0.25, 0.5, 0.75, 1].map(f => {
    const gv = bot + (top - bot) * f, gy = y(gv);
    return `<line x1="${padL}" y1="${gy}" x2="${w - padR}" y2="${gy}" stroke="#e2e8f0" stroke-width="1"/><text x="${padL - 6}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#64748b">${fmtAxis(gv)}</text>`;
  }).join("");
  const pts = data.map((d, i) => `${x(i).toFixed(1)},${y(d.v).toFixed(1)}`).join(" ");
  const area = `${padL},${y(bot)} ${pts} ${x(data.length - 1)},${y(bot)}`;
  const dots = data.map((d, i) => `<circle cx="${x(i)}" cy="${y(d.v)}" r="3.6" fill="#fff" stroke="${color}" stroke-width="2"><title>${esc(d.label)}: ${esc(d.tip || d.v)}</title></circle>`).join("");
  const labels = data.map((d, i) => `<text x="${x(i)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#475569">${esc(d.label)}</text>`).join("");
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.aria || "Grafik garis")}" class="chart">${grid}<polygon points="${area}" fill="${color}" opacity="0.10"/><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>${dots}${labels}</svg>`;
}

// Grafik batang vertikal.
export function barChart(data, opts = {}) {
  const w = opts.w || 640, h = opts.h || 260, padL = 46, padR = 14, padT = 14, padB = 30;
  const vals = data.map(d => d.v);
  let min = Math.min(0, ...vals);
  const max = niceMax(Math.max(...vals, 1));
  const iw = w - padL - padR, ih = h - padT - padB;
  const bw = Math.min(44, (iw / data.length) * 0.62);
  const y = v => padT + ih * (1 - (v - min) / (max - min));
  const color = opts.color || "#0e7490";
  const grid = [0, 0.25, 0.5, 0.75, 1].map(f => {
    const gv = min + (max - min) * f, gy = y(gv);
    return `<line x1="${padL}" y1="${gy}" x2="${w - padR}" y2="${gy}" stroke="#e2e8f0"/><text x="${padL - 6}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#64748b">${fmtNum(Math.round(gv))}</text>`;
  }).join("");
  const bars = data.map((d, i) => {
    const cx = padL + iw * (i + 0.5) / data.length;
    const c = d.color || (opts.highlight === i ? "#c2410c" : color);
    return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${y(d.v).toFixed(1)}" width="${bw.toFixed(1)}" height="${(y(min) - y(d.v)).toFixed(1)}" rx="3" fill="${c}"><title>${esc(d.label)}: ${esc(d.tip || d.v)}</title></rect><text x="${cx}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#475569">${esc(d.label)}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.aria || "Grafik batang")}" class="chart">${grid}${bars}</svg>`;
}

// Grafik batang horizontal dengan label nilai.
export function hbarChart(data, opts = {}) {
  const w = opts.w || 640, rh = opts.rowH || 30, padL = opts.labelW || 210, padR = 56, padT = 6;
  const h = padT + data.length * rh + 8;
  const max = niceMax(Math.max(...data.map(d => d.v), 1));
  const iw = w - padL - padR;
  const color = opts.color || "#0e7490";
  const rows = data.map((d, i) => {
    const y = padT + i * rh;
    const bw = Math.max(2, (iw * d.v) / max);
    const c = d.color || color;
    return `<text x="${padL - 8}" y="${y + rh / 2 + 4}" text-anchor="end" font-size="12" fill="#334155">${esc(d.label)}</text><rect x="${padL}" y="${y + 5}" width="${bw.toFixed(1)}" height="${rh - 12}" rx="3" fill="${c}"><title>${esc(d.label)}: ${esc(d.tip || d.v)}</title></rect><text x="${padL + bw + 7}" y="${y + rh / 2 + 4}" font-size="12" font-weight="600" fill="#0f172a">${esc(d.tip || d.v)}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.aria || "Grafik batang horizontal")}" class="chart">${rows}</svg>`;
}

// Sparkline kecil untuk kartu KPI.
export function sparkline(vals, opts = {}) {
  const w = opts.w || 120, h = opts.h || 34;
  const min = Math.min(...vals), max = Math.max(...vals);
  const span = max - min || 1;
  const x = i => (w * i) / (vals.length - 1);
  const y = v => 3 + (h - 6) * (1 - (v - min) / span);
  const pts = vals.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const color = opts.color || "#0e7490";
  const last = vals[vals.length - 1], prev = vals[vals.length - 2];
  const up = last >= prev;
  return `<svg viewBox="0 0 ${w} ${h}" class="spark" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="${up ? "#15803d" : "#b91c1c"}" stroke-width="2" stroke-linejoin="round"/><circle cx="${x(vals.length - 1)}" cy="${y(last)}" r="3" fill="${up ? "#15803d" : "#b91c1c"}"/></svg>`;
}

// Donat sederhana.
export function donut(data, opts = {}) {
  const size = opts.size || 220, thick = opts.thick || 34;
  const total = data.reduce((a, d) => a + d.v, 0) || 1;
  const cx = size / 2, cy = size / 2, r = (size - thick) / 2;
  const colors = opts.colors || ["#0e7490", "#c2410c", "#15803d", "#b45309", "#6d28d9", "#be185d", "#334155"];
  let acc = 0;
  const arcs = data.map((d, i) => {
    const a0 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d.v;
    const a1 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const pct = ((d.v / total) * 100).toFixed(1).replace(".", ",");
    return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="${thick}"><title>${esc(d.label)}: ${pct}%</title></path>`;
  }).join("");
  const legend = data.map((d, i) => `<span class="legend-item"><i style="background:${colors[i % colors.length]}"></i>${esc(d.label)} — ${((d.v / total) * 100).toFixed(1).replace(".", ",")}%</span>`).join("");
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.aria || "Grafik donat")}" class="donut">${arcs}<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="22" font-weight="700" fill="#0f172a">${esc(opts.center || "")}</text><text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="11" fill="#64748b">${esc(opts.centerSub || "")}</text></svg><div class="legend">${legend}</div></div>`;
}

// Piramida penduduk: laki-laki ke kiri, perempuan ke kanan.
export function pyramid(data, opts = {}) {
  const w = opts.w || 640, rh = 22, padT = 26, padB = 8;
  const h = padT + data.length * rh + padB;
  const max = Math.max(...data.flatMap(d => [d.m, d.f]));
  const half = (w - 90) / 2;
  const head = `<text x="${w / 2 - half / 2}" y="16" text-anchor="middle" font-size="12" font-weight="600" fill="#0e7490">Laki-laki</text><text x="${w / 2 + half / 2}" y="16" text-anchor="middle" font-size="12" font-weight="600" fill="#be185d">Perempuan</text>`;
  const rows = data.map((d, i) => {
    const y = padT + i * rh;
    const mw = (d.m / max) * half, fw = (d.f / max) * half;
    return `<text x="${w / 2}" y="${y + rh / 2 + 4}" text-anchor="middle" font-size="11" fill="#475569">${esc(d.g)}</text><rect x="${(w / 2 - 45 - mw).toFixed(1)}" y="${y + 3}" width="${mw.toFixed(1)}" height="${rh - 7}" rx="2" fill="#0e7490"><title>${esc(d.g)} laki-laki: ${d.m} jt</title></rect><rect x="${(w / 2 + 45).toFixed(1)}" y="${y + 3}" width="${fw.toFixed(1)}" height="${rh - 7}" rx="2" fill="#be185d"><title>${esc(d.g)} perempuan: ${d.f} jt</title></rect>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Piramida penduduk 2024" class="chart">${head}${rows}</svg>`;
}

// Batang bertumpuk dua seri (mis. ekspor vs impor) per tahun.
export function groupedBars(data, opts = {}) {
  const w = opts.w || 640, h = opts.h || 260, padL = 46, padR = 14, padT = 14, padB = 30;
  const max = niceMax(Math.max(...data.flatMap(d => [d.a, d.b]), 1));
  const iw = w - padL - padR, ih = h - padT - padB;
  const y = v => padT + ih * (1 - v / max);
  const bw = Math.min(26, (iw / data.length) * 0.30);
  const grid = [0, 0.25, 0.5, 0.75, 1].map(f => {
    const gv = max * f, gy = y(gv);
    return `<line x1="${padL}" y1="${gy}" x2="${w - padR}" y2="${gy}" stroke="#e2e8f0"/><text x="${padL - 6}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#64748b">${Math.round(gv)}</text>`;
  }).join("");
  const bars = data.map((d, i) => {
    const cx = padL + iw * (i + 0.5) / data.length;
    return `<rect x="${(cx - bw - 2).toFixed(1)}" y="${y(d.a).toFixed(1)}" width="${bw}" height="${(y(0) - y(d.a)).toFixed(1)}" rx="2" fill="${opts.colorA || "#0e7490"}"><title>${esc(d.label)} ${esc(opts.labelA || "A")}: ${d.a}</title></rect><rect x="${(cx + 2).toFixed(1)}" y="${y(d.b).toFixed(1)}" width="${bw}" height="${(y(0) - y(d.b)).toFixed(1)}" rx="2" fill="${opts.colorB || "#c2410c"}"><title>${esc(d.label)} ${esc(opts.labelB || "B")}: ${d.b}</title></rect><text x="${cx}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#475569">${esc(d.label)}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.aria || "Grafik batang berkelompok")}" class="chart">${grid}${bars}</svg>`;
}
