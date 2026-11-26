/* NusaStat — charts.js
 * Hand-drawn SVG charts. No libraries, no network: every chart is built
 * from the numbers in data.js and rendered as inline SVG. */

const CHART_COLORS = {
  teal: "#0e6b6b",
  tealLight: "#2a9d8f",
  amber: "#e07b39",
  navy: "#16324f",
  red: "#c0392b",
  green: "#2e7d32",
  grey: "#8a9ba8",
};

/* Format a number the Indonesian way: comma decimal, dot thousands. */
function fmtId(n, decimals) {
  return n.toLocaleString("id-ID", {
    minimumFractionDigits: decimals == null ? 0 : decimals,
    maximumFractionDigits: decimals == null ? 2 : decimals,
  });
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* A line chart with gridlines, axis labels, dots and value labels.
 * opts: { labels, values, color, height, yMin, yMax, yFmt, zeroLine } */
function lineChart(opts) {
  const w = 640;
  const h = opts.height || 260;
  const padL = 52;
  const padR = 14;
  const padT = 18;
  const padB = 32;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const vals = opts.values;
  let lo = opts.yMin != null ? opts.yMin : Math.min.apply(null, vals);
  let hi = opts.yMax != null ? opts.yMax : Math.max.apply(null, vals);
  if (hi === lo) { hi = lo + 1; }
  const pad = (hi - lo) * 0.12 || 1;
  lo -= pad;
  hi += pad;
  const x = (i) => padL + (i / (vals.length - 1)) * iw;
  const y = (v) => padT + ih - ((v - lo) / (hi - lo)) * ih;
  const yFmt = opts.yFmt || ((v) => fmtId(v, 1));

  let s = '<svg viewBox="0 0 ' + w + " " + h + '" class="chart-svg" role="img" aria-label="Grafik garis">';
  // horizontal gridlines + y labels (4 steps)
  for (let g = 0; g <= 4; g++) {
    const v = lo + ((hi - lo) * g) / 4;
    const gy = y(v);
    s += '<line x1="' + padL + '" y1="' + gy.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + gy.toFixed(1) +
      '" stroke="#e3e8ec" stroke-width="1"/>';
    s += '<text x="' + (padL - 8) + '" y="' + (gy + 4).toFixed(1) +
      '" text-anchor="end" class="axis-label">' + esc(yFmt(v)) + "</text>";
  }
  // zero line, when the range crosses zero
  if (lo < 0 && hi > 0) {
    s += '<line x1="' + padL + '" y1="' + y(0).toFixed(1) + '" x2="' + (w - padR) + '" y2="' + y(0).toFixed(1) +
      '" stroke="#c0392b" stroke-width="1" stroke-dasharray="4 3"/>';
  }
  // area fill under the line
  let area = "M" + x(0).toFixed(1) + "," + y(vals[0]).toFixed(1);
  for (let i = 1; i < vals.length; i++) area += " L" + x(i).toFixed(1) + "," + y(vals[i]).toFixed(1);
  s += '<path d="' + area + " L" + x(vals.length - 1).toFixed(1) + "," + (padT + ih).toFixed(1) +
    " L" + x(0).toFixed(1) + "," + (padT + ih).toFixed(1) + ' Z" fill="' + opts.color +
    '" fill-opacity="0.08"/>';
  // the line itself
  s += '<path d="' + area + '" fill="none" stroke="' + opts.color + '" stroke-width="2.5" stroke-linejoin="round"/>';
  // dots + value labels
  for (let i = 0; i < vals.length; i++) {
    s += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(vals[i]).toFixed(1) +
      '" r="3.5" fill="#ffffff" stroke="' + opts.color + '" stroke-width="2"/>';
    s += '<text x="' + x(i).toFixed(1) + '" y="' + (y(vals[i]) - 9).toFixed(1) +
      '" text-anchor="middle" class="value-label">' + esc(yFmt(vals[i])) + "</text>";
    if (i % 2 === 0 || vals.length <= 8) {
      s += '<text x="' + x(i).toFixed(1) + '" y="' + (h - 10) +
        '" text-anchor="middle" class="axis-label">' + esc(opts.labels[i]) + "</text>";
    }
  }
  return s + "</svg>";
}

/* A vertical bar chart. opts: { labels, values, color, height, yFmt, barLabel } */
function barChart(opts) {
  const w = 640;
  const h = opts.height || 260;
  const padL = 52;
  const padR = 14;
  const padT = 22;
  const padB = 32;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const vals = opts.values;
  const hi = Math.max.apply(null, vals) * 1.15;
  const lo = Math.min(0, Math.min.apply(null, vals) * 1.15);
  const y = (v) => padT + ih - ((v - lo) / (hi - lo)) * ih;
  const yFmt = opts.yFmt || ((v) => fmtId(v, 0));
  const slot = iw / vals.length;
  const bw = Math.min(46, slot * 0.62);

  let s = '<svg viewBox="0 0 ' + w + " " + h + '" class="chart-svg" role="img" aria-label="Grafik batang">';
  for (let g = 0; g <= 4; g++) {
    const v = lo + ((hi - lo) * g) / 4;
    const gy = y(v);
    s += '<line x1="' + padL + '" y1="' + gy.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + gy.toFixed(1) +
      '" stroke="#e3e8ec" stroke-width="1"/>';
    s += '<text x="' + (padL - 8) + '" y="' + (gy + 4).toFixed(1) +
      '" text-anchor="end" class="axis-label">' + esc(yFmt(v)) + "</text>";
  }
  for (let i = 0; i < vals.length; i++) {
    const cx = padL + slot * i + slot / 2;
    const v = vals[i];
    const top = y(Math.max(v, 0));
    const bottom = y(Math.min(v, 0));
    const fill = v < 0 ? CHART_COLORS.red : opts.color;
    s += '<rect x="' + (cx - bw / 2).toFixed(1) + '" y="' + top.toFixed(1) +
      '" width="' + bw.toFixed(1) + '" height="' + Math.max(1, bottom - top).toFixed(1) +
      '" rx="3" fill="' + fill + '"/>';
    s += '<text x="' + cx.toFixed(1) + '" y="' + (top - 6).toFixed(1) +
      '" text-anchor="middle" class="value-label">' + esc(yFmt(v)) + "</text>";
    s += '<text x="' + cx.toFixed(1) + '" y="' + (h - 10) +
      '" text-anchor="middle" class="axis-label">' + esc(opts.labels[i]) + "</text>";
  }
  return s + "</svg>";
}

/* A donut chart with a legend list. opts: { items: [{name, share, color}] } */
function donutChart(opts) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 82;
  const inner = 54;
  const total = opts.items.reduce((a, it) => a + it.share, 0);
  let angle = -Math.PI / 2;
  let s = '<svg viewBox="0 0 ' + size + " " + size + '" class="donut-svg" role="img" aria-label="Diagram lingkaran">';
  opts.items.forEach((it) => {
    const frac = it.share / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    s += '<path d="M' + x0.toFixed(1) + "," + y0.toFixed(1) + " A" + r + "," + r + " 0 " + large + " 1 " +
      x1.toFixed(1) + "," + y1.toFixed(1) + " L" + xi1.toFixed(1) + "," + yi1.toFixed(1) +
      " A" + inner + "," + inner + " 0 " + large + " 0 " + xi0.toFixed(1) + "," + yi0.toFixed(1) +
      ' Z" fill="' + it.color + '"/>';
  });
  s += '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" class="donut-center">' +
    esc(opts.centerTop) + '</text><text x="' + cx + '" y="' + (cy + 18) +
    '" text-anchor="middle" class="donut-sub">' + esc(opts.centerBottom) + "</text>";
  s += "</svg>";
  let legend = '<ul class="donut-legend">';
  opts.items.forEach((it) => {
    legend += '<li><span class="swatch" style="background:' + it.color + '"></span><span class="lg-name">' +
      esc(it.name) + '</span><strong>' + fmtId(it.share, 2) + "%</strong></li>";
  });
  return s + legend + "</ul>";
}

/* Horizontal bars, e.g. age structure or top provinces.
 * opts: { items: [{label, value, max, color, note}] } */
function hbarChart(opts) {
  const w = 640;
  const rowH = 44;
  const h = opts.items.length * rowH + 8;
  const labelW = 210;
  const valueW = 64;
  const barX = labelW + 8;
  const barW = w - barX - valueW - 8;
  let s = '<svg viewBox="0 0 ' + w + " " + h + '" class="chart-svg" role="img" aria-label="Grafik batang horizontal">';
  opts.items.forEach((it, i) => {
    const y = 8 + i * rowH;
    const bw = Math.max(2, (it.value / it.max) * barW);
    s += '<text x="0" y="' + (y + 15) + '" class="hbar-label">' + esc(it.label) + "</text>";
    s += '<rect x="' + barX + '" y="' + y + '" width="' + bw.toFixed(1) +
      '" height="20" rx="4" fill="' + (it.color || CHART_COLORS.teal) + '"/>';
    s += '<text x="' + (barX + barW + 8) + '" y="' + (y + 15) + '" class="value-label">' +
      esc(it.valueText || fmtId(it.value, 1)) + "</text>";
    if (it.note) {
      s += '<text x="' + barX + '" y="' + (y + 36) + '" class="axis-label">' + esc(it.note) + "</text>";
    }
  });
  return s + "</svg>";
}
