// Animated synapse network for the hero. ~2 KB, pauses off-screen, static under reduced motion.
export function initHero(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let w = 0, h = 0, raf = 0, visible = true;
  type P = { x: number; y: number; vx: number; vy: number };
  let pts: P[] = [];
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  function resize() {
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(90, (w * h) / 14000));
    pts = Array.from({ length: n }, () => ({ x: rnd() * w, y: rnd() * h, vx: (rnd() - 0.5) * 0.35, vy: (rnd() - 0.5) * 0.35 }));
  }
  function frame(t: number) {
    ctx!.clearRect(0, 0, w, h);
    const max = 140;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      if (!reduce) { a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > w) a.vx *= -1; if (a.y < 0 || a.y > h) a.vy *= -1; }
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j]; const dx = a.x - b.x, dy = a.y - b.y; const d = Math.hypot(dx, dy);
        if (d < max) {
          const o = (1 - d / max) * 0.5;
          const g = ctx!.createLinearGradient(a.x, a.y, b.x, b.y);
          g.addColorStop(0, `rgba(34,211,238,${o})`); g.addColorStop(1, `rgba(139,92,246,${o})`);
          ctx!.strokeStyle = g; ctx!.lineWidth = 1; ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.stroke();
          if (!reduce && (i + j) % 23 === 0) { // travelling pulse
            const p = ((t / 1600) + (i * 0.13)) % 1;
            ctx!.fillStyle = `rgba(255,255,255,${o + 0.2})`;
            ctx!.beginPath(); ctx!.arc(a.x - dx * p, a.y - dy * p, 1.6, 0, 7); ctx!.fill();
          }
        }
      }
      ctx!.fillStyle = i % 3 ? 'rgba(103,232,249,.9)' : 'rgba(167,139,250,.9)';
      ctx!.beginPath(); ctx!.arc(a.x, a.y, 1.8, 0, 7); ctx!.fill();
    }
    if (!reduce && visible) raf = requestAnimationFrame(frame);
  }
  resize(); frame(0);
  addEventListener('resize', () => { resize(); if (reduce) frame(0); });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; cancelAnimationFrame(raf); if (visible && !reduce) raf = requestAnimationFrame(frame); }).observe(canvas);
}
