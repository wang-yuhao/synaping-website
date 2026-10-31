// Walk-forward demo on SYNTHETIC data (seeded random walk). Shows training / test windows only.
export function initQuantDemo(canvas: HTMLCanvasElement, labels: { train: string; test: string }) {
  const ctx = canvas.getContext('2d'); if (!ctx) return;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const r = canvas.getBoundingClientRect(); const w = r.width, h = r.height;
  canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  let s = 42; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const n = 400; const ys: number[] = []; let y = 100;
  for (let i = 0; i < n; i++) { y += (rnd() - 0.5) * 2.2; ys.push(y); }
  const lo = Math.min(...ys), hi = Math.max(...ys);
  const folds = 4, train = 120, test = 60, rowH = 12, gap = 6;
  const bandTop = h - 34 - folds * (rowH + gap);
  const X = (i: number) => 16 + (i / (n - 1)) * (w - 32);
  const Y = (v: number) => bandTop - 14 - ((v - lo) / (hi - lo)) * (bandTop - 30);
  for (let f = 0; f < folds; f++) {
    const a = f * test, b = a + train, c = Math.min(b + test, n - 1);
    const yy = bandTop + f * (rowH + gap);
    ctx.fillStyle = 'rgba(139,92,246,.85)'; ctx.fillRect(X(a), yy, X(b) - X(a), rowH);
    ctx.fillStyle = 'rgba(34,211,238,.9)'; ctx.fillRect(X(b), yy, X(c) - X(b), rowH);
    ctx.fillStyle = 'rgba(34,211,238,.07)'; ctx.fillRect(X(b), 10, X(c) - X(b), bandTop - 18);
  }
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.4; ctx.beginPath();
  ys.forEach((v, i) => (i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v)))); ctx.stroke();
  ctx.font = '12px system-ui, sans-serif';
  ctx.fillStyle = 'rgba(167,139,250,1)'; ctx.fillRect(16, h - 24, 12, 12); ctx.fillStyle = '#cbd5e1'; ctx.fillText(labels.train, 34, h - 14);
  ctx.fillStyle = 'rgba(34,211,238,1)'; ctx.fillRect(150, h - 24, 12, 12); ctx.fillStyle = '#cbd5e1'; ctx.fillText(labels.test, 168, h - 14);
}
