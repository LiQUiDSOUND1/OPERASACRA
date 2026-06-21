// ── ANIMATED STRINGS ──────────────────────────────────────────
const heroStrings = [
  { id: 'string-electric', freq: 0.007, amp: 10, phase: 0,   speed: 0.018 },
  { id: 'string-solar',    freq: 0.011, amp: 7,  phase: 2.1, speed: 0.013 },
  { id: 'string-friction', freq: 0.016, amp: 9,  phase: 4.3, speed: 0.022 },
];

const bookStrings = [];

function buildPath(width, cy, freq, amp, phase, t) {
  const pts = [];
  for (let x = 0; x <= width; x += 6) {
    const y = cy + Math.sin(x * freq + phase + t) * amp;
    pts.push(`${x},${y.toFixed(2)}`);
  }
  return 'M ' + pts.join(' L ');
}

let t = 0;
function tick() {
  t += 0.05;

  heroStrings.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) el.setAttribute('d', buildPath(1000, 20, s.freq, s.amp, s.phase, t * s.speed * 20));
  });

  bookStrings.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) el.setAttribute('d', buildPath(200, s.cy, s.freq, s.amp, s.phase, t * s.speed * 20));
  });

  requestAnimationFrame(tick);
}

// Only animate if motion is allowed
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  tick();
} else {
  // Draw static lines as fallback
  heroStrings.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) el.setAttribute('d', `M 0 20 L 1000 20`);
  });
  bookStrings.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) el.setAttribute('d', `M 0 ${s.cy} L 200 ${s.cy}`);
  });
}

// ── SCROLL REVEAL ──────────────────────────────────────────────
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
