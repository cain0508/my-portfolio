/* =============================================
   KARAN MAHAKUR — CYBERPUNK 2077 PORTFOLIO
   script.js — Revised Interactive Engine
   Removed: XP/Level/locking system
   Added: Terminal, Code-Break, Drag-Drop,
          Reaction Speed, Easter Egg Dev Mode
   ============================================= */

'use strict';

// ══════════════════════════════════════════════
// AUDIO ENGINE
// ══════════════════════════════════════════════
let audioCtx = null;
let soundOn = true;

function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function playTone(freq, type = 'sine', dur = 0.15, vol = 0.12) {
  if (!soundOn) return;
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = type; osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(); osc.stop(ctx.currentTime + dur);
  } catch (_) { }
}
const sfx = {
  click: () => playTone(520, 'square', 0.05, 0.08),
  success: () => { [440, 550, 660, 880].forEach((f, i) => setTimeout(() => playTone(f, 'triangle', 0.18, 0.15), i * 70)); },
  error: () => playTone(220, 'sawtooth', 0.2, 0.12),
  type: () => playTone(700 + Math.random() * 100, 'sine', 0.03, 0.05),
  unlock: () => { [300, 500, 700, 900].forEach((f, i) => setTimeout(() => playTone(f, 'triangle', 0.12, 0.12), i * 60)); },
  react: () => playTone(880, 'sine', 0.08, 0.18),
};

// ══════════════════════════════════════════════
// DOM HELPER
// ══════════════════════════════════════════════
const $ = id => document.getElementById(id);
const $$ = s => document.querySelectorAll(s);

// ══════════════════════════════════════════════
// LOADING SCREEN
// ══════════════════════════════════════════════
(function loader() {
  const bar = $('loader-bar');
  const pct = $('loader-percent');
  const txt = $('loader-text');
  const msgs = [
    'BOOTING KARAN OS v2.0.26',
    'LOADING ASSETS...',
    'COMPILING SHADERS...',
    'CONNECTING NEURAL NET...',
    'CALIBRATING INTERFACE...',
    'SYSTEM READY',
  ];
  let prog = 0;
  const iv = setInterval(() => {
    prog += Math.random() * 16 + 6;
    if (prog >= 100) prog = 100;
    bar.style.width = prog + '%';
    pct.textContent = Math.floor(prog) + '%';
    txt.textContent = msgs[Math.min(Math.floor(prog / 17), msgs.length - 1)];
    if (prog >= 100) {
      clearInterval(iv);
      setTimeout(() => {
        $('loading-screen').classList.add('fade-out');
        setTimeout(() => { $('loading-screen').style.display = 'none'; boot(); }, 650);
      }, 350);
    }
  }, 110);
})();

// ══════════════════════════════════════════════
// BOOT — run all modules after loader
// ══════════════════════════════════════════════
function boot() {
  initCursor();
  initNavbar();
  initHeroCanvas();
  initTyping();
  initScrollReveal();
  initSkillBars();
  initBackToTop();
  initSoundToggle();
  initGlitch();
  initTerminal();
  initCodeBreak();
  initDragDrop();
  initReaction();
  initEasterEgg();
  initHUDNotify();
  initJourneyMode();
  initProjectDashboard(); // ⭐ CP2077 project dashboard
  playWelcomeTone();
}

// ══════════════════════════════════════════════
// CURSOR GLOW
// ══════════════════════════════════════════════
function initCursor() {
  const glow = $('cursor-glow');
  const dot = $('cursor-dot');
  let mx = 0, my = 0, gx = 0, gy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function animGlow() {
    gx += (mx - gx) * 0.1; gy += (my - gy) * 0.1;
    glow.style.left = gx + 'px'; glow.style.top = gy + 'px';
    requestAnimationFrame(animGlow);
  })();

  document.addEventListener('mousedown', () => {
    dot.style.width = '14px'; dot.style.height = '14px';
  });
  document.addEventListener('mouseup', () => {
    dot.style.width = '8px'; dot.style.height = '8px';
  });

  document.querySelectorAll('button, a, input, .drag-chip, .drop-zone, .hex, #easter-egg').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.background = 'var(--red)';
      dot.style.boxShadow = '0 0 10px var(--red), 0 0 20px var(--red-glow)';
      glow.style.background = 'radial-gradient(circle, rgba(230,57,70,0.2) 0%, transparent 70%)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.background = 'var(--gold)';
      dot.style.boxShadow = '0 0 10px var(--gold), 0 0 20px var(--gold-glow)';
      glow.style.background = 'radial-gradient(circle, rgba(245,197,24,0.2) 0%, transparent 70%)';
    });
  });
}

// ══════════════════════════════════════════════
// NAVBAR
// ══════════════════════════════════════════════
function initNavbar() {
  const nav = $('navbar');
  const ham = $('hamburger');
  const links = $('nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
  });

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    links.classList.toggle('open');
    sfx.click();
  });

  $$('.nav-link').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault(); sfx.click();
      const tgt = document.querySelector(a.getAttribute('href'));
      if (tgt) tgt.scrollIntoView({ behavior: 'smooth' });
      links.classList.remove('open');
      ham.classList.remove('open');
    });
  });

  $('nav-logo').addEventListener('click', () => {
    sfx.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function updateActiveLink() {
  const ids = ['hero', 'about', 'skills', 'projects', 'arcade', 'contact', 'skyline'];
  const y = window.scrollY + 100;
  ids.forEach(id => {
    const sec = $(id);
    if (!sec) return;
    const a = document.querySelector(`.nav-link[href="#${id}"]`);
    if (a) a.classList.toggle('active', y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight);
  });
}

// ══════════════════════════════════════════════
// HERO CANVAS — CP2077 Grid + Particles
// ══════════════════════════════════════════════
function initHeroCanvas() {
  const canvas = $('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildParticles();
  }
  window.addEventListener('resize', resize);
  resize();

  function buildParticles() {
    particles = [];
    const n = Math.min(Math.floor(W * H / 14000), 55);
    for (let i = 0; i < n; i++) particles.push(mkParticle());
  }
  function mkParticle() {
    const colors = ['#f5c518', '#e63946', '#00b4d8', '#ffffff'];
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.2 + 0.4,
      c: colors[Math.floor(Math.random() * colors.length)],
      a: Math.random() * 0.5 + 0.15,
      ph: Math.random() * Math.PI * 2,
    };
  }

  let mx = W / 2, my = H / 2;
  canvas.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  let t = 0;
  (function draw() {
    ctx.clearRect(0, 0, W, H);
    t++;

    // BG
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0a0a08');
    bg.addColorStop(0.5, '#0f0e0b');
    bg.addColorStop(1, '#0a0a08');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Grid — gold tint
    ctx.lineWidth = 0.5;
    const gridSz = 80;
    for (let x = 0; x < W; x += gridSz) {
      ctx.strokeStyle = `rgba(245,197,24,${0.03 + 0.015 * Math.sin(t * 0.01 + x * 0.01)})`;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += gridSz) {
      ctx.strokeStyle = `rgba(245,197,24,${0.03 + 0.015 * Math.sin(t * 0.01 + y * 0.01)})`;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Scan line
    ctx.fillStyle = `rgba(245,197,24,0.015)`;
    const scanY = (t * 2) % H;
    ctx.fillRect(0, scanY, W, 2);

    // Particles
    particles.forEach(p => {
      p.ph += 0.02;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      const dx = mx - p.x, dy = my - p.y, dist = Math.hypot(dx, dy);
      if (dist < 130) { p.x += dx / dist * 0.25; p.y += dy / dist * 0.25; }

      const alpha = p.a * (0.6 + 0.4 * Math.sin(p.ph));
      const hex = Math.floor(alpha * 255).toString(16).padStart(2, '0');
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c + hex; ctx.fill();

      // Glow
      const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      gr.addColorStop(0, p.c + '33'); gr.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = gr; ctx.fill();

      // Connections
      particles.forEach(q => {
        if (q === p) return;
        const d = Math.hypot(q.x - p.x, q.y - p.y);
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          const a2 = Math.floor((1 - d / 110) * 40).toString(16).padStart(2, '0');
          ctx.strokeStyle = `rgba(245,197,24,0.${Math.floor((1 - d / 110) * 15)})`;
          ctx.lineWidth = 0.4; ctx.stroke();
        }
      });
    });

    // Center radial
    const cr = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, H * 0.55);
    cr.addColorStop(0, 'rgba(245,197,24,0.04)'); cr.addColorStop(1, 'transparent');
    ctx.fillStyle = cr; ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(draw);
  })();
}

// Hero parallax
window.addEventListener('scroll', () => {
  const hc = document.querySelector('.hero-content');
  if (hc && window.scrollY < window.innerHeight) {
    hc.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    hc.style.opacity = 1 - (window.scrollY / window.innerHeight) * 1.3;
  }
});

// ══════════════════════════════════════════════
// TYPING EFFECT — updated subtitle texts
// ══════════════════════════════════════════════
function initTyping() {
  const el = $('typed-text');
  const texts = [
    'Full Stack Developer',
    'Problem Solver',
    'Learning Blockchain Developer',
    'C / C++ Programmer',
    'SQL & Database Engineer',
  ];
  let ti = 0, ci = 0, del = false, pause = false;

  function tick() {
    if (pause) { setTimeout(tick, 1800); pause = false; return; }
    const cur = texts[ti];
    if (del) {
      el.textContent = cur.substring(0, ci--);
      if (ci < 0) { del = false; ti = (ti + 1) % texts.length; ci = 0; }
      setTimeout(tick, 45);
    } else {
      el.textContent = cur.substring(0, ++ci);
      sfx.type();
      if (ci === cur.length) { del = true; pause = true; }
      setTimeout(tick, 90);
    }
  }
  tick();
}

// Hero button → scroll to about (first stop on journey)
document.addEventListener('DOMContentLoaded', () => {
  const btn = $('enter-system-btn');
  if (btn) btn.addEventListener('click', () => {
    sfx.click();
    const dest = $('about') || $('arcade');
    if (dest) dest.scrollIntoView({ behavior: 'smooth' });
  });
});

// ══════════════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════════════
function initScrollReveal() {
  const els = [
    ...$$('.arcade-card'), ...$$('.project-card'),
    ...$$('.skill-item'), ...$$('.section-header'),
    ...$$('.contact-chip'),
  ].filter(Boolean);
  els.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        const fill = e.target.querySelector('.skill-bar-fill');
        if (fill) setTimeout(() => { fill.style.width = fill.dataset.width + '%'; }, 200);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

// ══════════════════════════════════════════════
// SKILL BARS
// ══════════════════════════════════════════════
function initSkillBars() {
  $$('.skill-bar-fill').forEach(f => { f.style.width = '0%'; });
}

// ══════════════════════════════════════════════
// HUD NOTIFY
// ══════════════════════════════════════════════
let notifyTimer = null;
function initHUDNotify() { /* element exists in HTML */ }

function showNotify(msg) {
  const el = $('hud-notify');
  el.classList.remove('hidden');
  el.textContent = '⚡ ' + msg;
  el.classList.add('show');
  clearTimeout(notifyTimer);
  notifyTimer = setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.classList.add('hidden'), 400);
  }, 2800);
}

// ══════════════════════════════════════════════
// JOURNEY MODE — Location HUD + Section Transitions
// ══════════════════════════════════════════════
function initJourneyMode() {
  const hudLoc = $('jhud-loc');
  const hudCoord = $('jhud-coord');
  const hudClock = $('jhud-clock');
  const flash = $('loc-flash');
  const sections = $$('section[data-location]');
  let currentLoc = '';

  // ── Live clock in HUD ──
  function tickClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    if (hudClock) hudClock.textContent = hh + ':' + mm + ':' + ss;
    if ($('sky-time')) $('sky-time').textContent = hh + ':' + mm;
    requestAnimationFrame(tickClock);
  }
  tickClock();

  // ── Section reveal observer (scroll-in effect) ──
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('section-revealed');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  sections.forEach(sec => revealObs.observe(sec));

  // ── Location HUD update observer ──
  const locObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const loc = e.target.dataset.location;
      const coord = e.target.dataset.coords || '';

      // Mark visible for banner animation
      e.target.classList.add('loc-visible');

      // Only flash + update HUD when location actually changes
      if (loc === currentLoc) return;
      currentLoc = loc;

      // Update HUD
      if (hudLoc) hudLoc.textContent = loc;
      if (hudCoord) hudCoord.textContent = coord;

      // Location flash
      if (flash) {
        flash.classList.remove('flash-active');
        void flash.offsetWidth; // reflow to restart animation
        flash.classList.add('flash-active');
        setTimeout(() => flash.classList.remove('flash-active'), 600);
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => locObs.observe(sec));

  // ── Fade HUD when near top (hero section) ──
  const hud = $('journey-hud');
  window.addEventListener('scroll', () => {
    if (hud) hud.classList.toggle('hud-fade', window.scrollY < 80);
  }, { passive: true });
}

// ══════════════════════════════════════════════
// BACK TO TOP
// ══════════════════════════════════════════════
function initBackToTop() {
  const btn = $('back-top');
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => { sfx.click(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

// ══════════════════════════════════════════════
// SOUND TOGGLE
// ══════════════════════════════════════════════
function initSoundToggle() {
  const btn = $('sound-btn');
  btn.addEventListener('click', () => {
    soundOn = !soundOn;
    btn.querySelector('.sound-icon').textContent = soundOn ? '🔊' : '🔇';
    showNotify(soundOn ? 'Sound ON' : 'Sound OFF');
  });
}

// ══════════════════════════════════════════════
// GLITCH EFFECTS — random + hover interactive
// ══════════════════════════════════════════════
function initGlitch() {
  // ── Random ambient glitch on titles ──
  function ambientGlitch() {
    const candidates = [...$$('.section-title'), ...$$('.glitch-text'), ...$$('.proj-title')];
    if (!candidates.length) return;
    const el = candidates[Math.floor(Math.random() * candidates.length)];
    el.classList.add('glitch-hover-active');
    // Quick RGB split flash
    el.style.setProperty('--shadow-rgb-offset', '5px');
    setTimeout(() => {
      el.classList.remove('glitch-hover-active');
      el.style.removeProperty('--shadow-rgb-offset');
    }, 150 + Math.random() * 80);
    // Schedule next
    setTimeout(ambientGlitch, 3500 + Math.random() * 5000);
  }
  setTimeout(ambientGlitch, 2000);

  // ── Hover glitch on interactive typography ──
  const hoverTargets = [
    ...$$('.section-title'), ...$$('.nav-logo'),
    ...$$('.proj-title'), ...$$('.arcade-title'),
    ...$$('.hero-name-top'), ...$$('.hero-name-bottom'),
  ];
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.classList.add('glitch-hover-active');
    });
    el.addEventListener('animationend', () => {
      el.classList.remove('glitch-hover-active');
    });
  });

  // ── Logo — periodic strong flicker ──
  const logo = $('nav-logo');
  if (logo) {
    setInterval(() => {
      logo.classList.add('glitch-hover-active');
      setTimeout(() => logo.classList.remove('glitch-hover-active'), 120);
    }, 8000 + Math.random() * 6000);
  }
}

// ══════════════════════════════════════════════
// ══════════════════════════════════════════════
// A — KARAN_OS v2.0 — PREMIUM TERMINAL ENGINE
// ══════════════════════════════════════════════
function initTerminal() {
  const input   = $('terminal-input');
  const output  = $('terminal-output');
  if (!input || !output) return;

  // ── Elements ──
  const kosWin    = $('kos-win');
  const kosBoot   = $('kos-boot');
  const bootLines = $('kos-boot-lines');
  const bootBar   = $('kos-boot-bar');
  const kosSuggest  = $('kos-suggest');
  const kosCWD      = $('kos-cwd');
  const kosClose    = $('kos-close');
  const kosMinimize = $('kos-minimize');
  const kosMaximize = $('kos-maximize');
  const kosClock    = $('kos-clock');
  const kosTitlebar = $('kos-titlebar');

  // State
  let history = [], histIdx = -1;
  let cwd = '~';
  let tabIdx = -1;
  let currentTheme = 'cyan';
  const themes = {
    cyan:  { '--kos-hl': 'var(--blue)',   label: 'CYAN // DEFAULT' },
    gold:  { '--kos-hl': 'var(--gold)',   label: 'GOLD // SAMURAI' },
    red:   { '--kos-hl': 'var(--red)',    label: 'RED  // DANGER'  },
    green: { '--kos-hl': '#39ff14',       label: 'GREEN // MATRIX' },
  };
  const themeKeys = Object.keys(themes);

  // All available commands for autocomplete
  const ALL_CMDS = [
    'help','about','whoami','skills','projects','resume','contact',
    'hire','clear','theme','status','social','secret','game',
    'ls','cd','cat','ask','jarvis','nightcity','sudo','unlock',
  ];

  // ════════════════════════
  // BOOT SEQUENCE
  // ════════════════════════
  const BOOT_MSGS = [
    '> INITIALIZING CORE SYSTEMS...',
    '> CONNECTING TO NETWORK [OK]',
    '> LOADING KARAN_PROFILE.exe...',
    '> MOUNTING FILESYSTEM [OK]',
    '> CALIBRATING AI ASSISTANT...',
    '> DECRYPTING PERSONAL DATABASE...',
    '> SYSTEM INTEGRITY CHECK PASSED',
    '> AI SYSTEM ONLINE ✔',
  ];

  let bi = 0;
  let pct = 0;
  function bootStep() {
    if (bi >= BOOT_MSGS.length) {
      // Boot done — fade out overlay, show terminal
      setTimeout(() => {
        kosBoot.classList.add('done');
        kosWin.classList.add('visible');
        // Print welcome banner
        printWelcome();
        input.focus();
        startClock();
        startParticles();
      }, 300);
      return;
    }
    const msg = BOOT_MSGS[bi];
    const line = document.createElement('div');
    line.textContent = msg;
    bootLines.appendChild(line);
    bi++;
    pct = Math.round((bi / BOOT_MSGS.length) * 100);
    bootBar.style.width = pct + '%';
    setTimeout(bootStep, 220 + Math.random() * 120);
  }
  setTimeout(bootStep, 400);

  // ════════════════════════
  // WELCOME BANNER
  // ════════════════════════
  function printWelcome() {
    const banner = [
      { t: '╔═══════════════════════════════════════════╗', c: 'accent-blue' },
      { t: '║  KARAN_OS v2.0 // AI SYSTEM OPERATIONAL  ║', c: 'accent-blue' },
      { t: '╚═══════════════════════════════════════════╝', c: 'accent-blue' },
      { t: '  Welcome, User. Access level: GUEST', c: '' },
      { t: '  Type help to see all commands.', c: 'dim' },
      { t: '  Try: whoami · skills · projects · game', c: 'dim' },
      { t: '', c: '' },
    ];
    banner.forEach((b, i) => {
      setTimeout(() => appendLine(b.t, b.c), i * 55);
    });
  }

  // ════════════════════════
  // LIVE CLOCK
  // ════════════════════════
  function startClock() {
    function tick() {
      const n = new Date();
      const t = [n.getHours(), n.getMinutes(), n.getSeconds()]
        .map(v => String(v).padStart(2, '0')).join(':');
      if (kosClock) kosClock.textContent = t;
      requestAnimationFrame(tick);
    }
    tick();
  }

  // ════════════════════════
  // PARTICLE SPARKS
  // ════════════════════════
  function startParticles() {
    const canvas = $('kos-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, particles = [];

    function resize() {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    }
    resize();
    new ResizeObserver(resize).observe(canvas);

    function mkP() {
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3, vy: -0.2 - Math.random() * 0.3,
        r: 0.7 + Math.random() * 1.2,
        a: 0.1 + Math.random() * 0.25,
        c: Math.random() > 0.5 ? '#00c8e6' : '#f5c518',
        life: 1,
        decay: 0.003 + Math.random() * 0.004,
      };
    }
    for (let i = 0; i < 35; i++) particles.push(mkP());

    (function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.life <= 0) { Object.assign(p, mkP()); p.x = Math.random() * W; p.y = H; p.life = 1; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + Math.floor(p.life * p.a * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      requestAnimationFrame(draw);
    })();
  }

  // ════════════════════════
  // TITLE-BAR CONTROLS
  // ════════════════════════
  if (kosClose)    kosClose.addEventListener('click', () => {
    output.innerHTML = '';
    appendLine('// TERMINAL CLOSED. Reload page to restart.', 'dim');
    kosWin.style.opacity = '0.15';
    input.disabled = true;
  });
  if (kosMinimize) kosMinimize.addEventListener('click', () => {
    kosWin.classList.toggle('minimized');
    sfx.click();
  });
  if (kosMaximize) kosMaximize.addEventListener('click', () => {
    kosWin.classList.toggle('maximized');
    sfx.click();
  });

  // ── Simple drag (within card bounds) ──
  if (kosTitlebar) {
    let dragging = false, ox = 0, oy = 0;
    kosTitlebar.addEventListener('mousedown', e => {
      if (e.target !== kosTitlebar && !e.target.classList.contains('kos-tb-title') &&
          !e.target.classList.contains('kos-tb-icon') && !e.target.tagName === 'SPAN') return;
      if (kosWin.classList.contains('maximized')) return;
      dragging = true;
      ox = e.clientX - (parseInt(kosWin.style.left) || 0);
      oy = e.clientY - (parseInt(kosWin.style.top) || 0);
      kosWin.style.position = 'absolute';
    });
    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      kosWin.style.left = (e.clientX - ox) + 'px';
      kosWin.style.top  = (e.clientY - oy) + 'px';
    });
    document.addEventListener('mouseup', () => { dragging = false; });
  }

  // ════════════════════════
  // FILESYSTEM SIDEBAR
  // ════════════════════════
  const VFILES = {
    'readme.txt': [
      { t: '// README.TXT — KARAN MAHAKUR', c: 'accent-gold' },
      { t: 'Full Stack Developer · Blockchain Learner · Builder' },
      { t: 'Status : AVAILABLE FOR HIRE ✔', c: 'success' },
      { t: 'Contact: karan.mahakur@email.com' },
    ],
    'stack.json': [
      { t: '// stack.json', c: 'accent-blue' },
      { t: '{ "frontend": ["HTML","CSS","JS","React"],' },
      { t: '  "backend":  ["Python","Java","C","C++"],' },
      { t: '  "database": ["SQL","MySQL"],' },
      { t: '  "learning": ["Blockchain","Web3"] }' },
    ],
    'bio.txt': [
      { t: '// bio.txt', c: 'accent-gold' },
      { t: 'Name    : Karan Mahakur' },
      { t: 'Role    : Full Stack Developer' },
      { t: 'Base    : India' },
      { t: 'Vibe    : Cyberpunk 2077 + good code' },
    ],
    'contact.txt': [
      { t: '// contact.txt', c: 'accent-blue' },
      { t: 'Email  : karan.mahakur@email.com' },
      { t: 'GitHub : github.com/karanmahakur' },
      { t: 'Status : OPEN TO WORK ↗', c: 'success' },
    ],
    'secret.enc': [
      { t: '🔒 ACCESS DENIED', c: 'error' },
      { t: 'Try: unlock devmode', c: 'dim' },
    ],
  };

  document.querySelectorAll('.kos-fs-item').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.kos-fs-item').forEach(e => e.classList.remove('active'));
      el.classList.add('active');
      sfx.click();
      const file = el.dataset.file;
      const path = el.dataset.path;
      if (file && VFILES[file]) {
        appendLine(`$ cat ${file}`, 'cmd-echo');
        typeLines(VFILES[file]);
      } else if (path) {
        appendLine(`$ cd ${path}`, 'cmd-echo');
        cwd = path === '/' ? '~' : path;
        if (kosCWD) kosCWD.textContent = ':' + cwd + '$';
        appendLine(`Navigated to ${cwd}`, 'success');
      }
      output.scrollTop = output.scrollHeight;
    });
  });

  // ════════════════════════
  // COMMANDS
  // ════════════════════════
  const CMDS = {
    help: () => [
      { t: '╔══════════════════════════════╗', c: 'accent-blue' },
      { t: '║  KARAN_OS · COMMAND INDEX    ║', c: 'accent-blue' },
      { t: '╚══════════════════════════════╝', c: 'accent-blue' },
      { t: '  help      — This menu', c: '' },
      { t: '  about     — About Karan' },
      { t: '  whoami    — Identity output' },
      { t: '  skills    — Full tech stack' },
      { t: '  projects  — Project list' },
      { t: '  resume    — Resume info' },
      { t: '  contact   — Contact details' },
      { t: '  hire      — Hire me CTA' },
      { t: '  status    — System status' },
      { t: '  social    — Social links' },
      { t: '  theme     — Cycle color theme' },
      { t: '  game      — Launch mini-game' },
      { t: '  ls / cd / cat — Filesystem' },
      { t: '  ask [topic] — AI assistant' },
      { t: '  clear     — Clear terminal' },
    ],

    about: () => [
      { t: '[ ABOUT // KARAN MAHAKUR ]', c: 'accent-gold' },
      { t: '  Full Stack Developer crafting premium digital' },
      { t: '  experiences. Code meets creativity.' },
      { t: '  Passion  : Web · AI · Blockchain' },
      { t: '  Location : India  ·  Remote-friendly' },
      { t: '  Vibe     : Cyberpunk at heart 🎮' },
    ],

    whoami: () => [
      { t: '╔═══════════════════════════════════╗', c: 'accent-blue' },
      { t: '║  IDENTITY CONFIRMED               ║', c: 'accent-blue' },
      { t: '╟───────────────────────────────────╢', c: 'accent-blue' },
      { t: '║  Name   : KARAN MAHAKUR           ║' },
      { t: '║  Class  : Full Stack Developer    ║' },
      { t: '║  Level  : Intermediate            ║' },
      { t: '║  Status : ONLINE · AVAILABLE      ║', c: 'success' },
      { t: '╚═══════════════════════════════════╝', c: 'accent-blue' },
    ],

    skills: () => [
      { t: '[ TECH STACK // SKILL MATRIX ]', c: 'accent-gold' },
      { t: '  Frontend  ▸ HTML · CSS · JavaScript · React', c: 'accent-blue' },
      { t: '  Backend   ▸ Python · Java · C · C++', c: 'accent-red' },
      { t: '  Database  ▸ SQL · MySQL' },
      { t: '  Tools     ▸ Git · GitHub · VS Code' },
      { t: '  Learning  ▸ Blockchain · Web3 ↗', c: 'accent-blue' },
    ],

    projects: () => [
      { t: '[ PROJECT VAULT ]', c: 'accent-gold' },
      { t: '  01. Lost In City       ▸ Web App · HTML/CSS/JS' },
      { t: '  02. Movie Booking DBMS ▸ Database · Python/SQL' },
      { t: '  03. Portfolio v2077    ▸ This site you\'re on!', c: 'success' },
      { t: '  04. Hackathon AI       ▸ AI · Python/MySQL' },
      { t: 'Tip: scroll to #projects for live demos.' },
    ],

    resume: () => [
      { t: '[ RESUME // KARAN MAHAKUR ]', c: 'accent-gold' },
      { t: '  Available on request.' },
      { t: '  Email: karan.mahakur@email.com' },
      { t: '  Subject: RESUME_REQUEST', c: 'dim' },
    ],

    contact: () => [
      { t: '[ CONTACT CHANNELS ]', c: 'accent-gold' },
      { t: '  ✉  Email  : karan.mahakur@email.com', c: 'accent-blue' },
      { t: '  ⌥  GitHub : github.com/karanmahakur', c: 'accent-blue' },
      { t: '  ◈  LinkedIn: linkedin.com/in/karanmahakur' },
    ],

    hire: () => {
      sfx.success();
      setTimeout(() => {
        const modal = $('hire-modal');
        if (modal) modal.classList.remove('hidden');
      }, 400);
      return [
        { t: '// LAUNCHING HIRE PROTOCOL...', c: 'accent-gold' },
        { t: '   Opening contact modal ↗', c: 'success' },
      ];
    },

    status: () => [
      { t: '[ SYSTEM STATUS ]', c: 'accent-gold' },
      { t: '  SYSTEM     : ONLINE ✔', c: 'success' },
      { t: '  DEVELOPER  : AVAILABLE FOR WORK ✔', c: 'success' },
      { t: '  UPTIME     : 3+ years coding' },
      { t: '  LOAD       : 10+ projects shipped' },
      { t: '  LOCATION   : India · Remote-friendly' },
    ],

    social: () => [
      { t: '[ SOCIAL LINKS ]', c: 'accent-gold' },
      { t: '  GitHub   : github.com/karanmahakur', c: 'accent-blue' },
      { t: '  LinkedIn : linkedin.com/in/karanmahakur', c: 'accent-blue' },
      { t: '  Email    : karan.mahakur@email.com' },
    ],

    theme: () => {
      const keys = themeKeys;
      const next = keys[(keys.indexOf(currentTheme) + 1) % keys.length];
      currentTheme = next;
      sfx.success();
      return [
        { t: `// THEME SWITCHED → ${themes[next].label}`, c: 'accent-blue' },
      ];
    },

    ls: () => {
      const dirs = {
        '~': ['projects/', 'about/', 'skills/', 'contact/'],
        '/projects': ['lost-in-city/', 'movie-booking/', 'portfolio/', 'hackathon/'],
        '/about': ['bio.txt', 'contact.txt'],
      };
      const contents = dirs[cwd] || ['(empty)'];
      return [
        { t: `// ls ${cwd}`, c: 'dim' },
        ...contents.map(f => ({ t: `  ${f}`, c: f.endsWith('/') ? 'accent-blue' : '' })),
      ];
    },

    cd: (args) => {
      const dir = args[0] || '~';
      const valid = ['~', '/', '/projects', '/about'];
      if (valid.includes(dir) || dir === '..') {
        cwd = dir === '..' ? '~' : dir;
        if (kosCWD) kosCWD.textContent = ':' + cwd + '$';
        return [{ t: `Moved to ${cwd}`, c: 'success' }];
      }
      return [{ t: `cd: ${dir}: No such directory`, c: 'error' }];
    },

    cat: (args) => {
      const file = args[0];
      if (!file) return [{ t: 'cat: specify a file', c: 'error' }];
      if (VFILES[file]) return VFILES[file];
      return [{ t: `cat: ${file}: No such file`, c: 'error' }];
    },

    ask: (args) => {
      const topic = args.join(' ').toLowerCase();
      if (topic.includes('project') || topic.includes('work')) return [
        { t: '// AI RESPONSE ▸', c: 'accent-gold' },
        { t: '  Karan has built 4+ projects: web apps,' },
        { t: '  database systems, AI tools. See #projects.' },
      ];
      if (topic.includes('stack') || topic.includes('tech')) return [
        { t: '// AI RESPONSE ▸', c: 'accent-gold' },
        { t: '  Stack: React, Python, Java, C/C++, SQL.' },
        { t: '  Currently exploring Blockchain / Web3.' },
      ];
      if (topic.includes('hire') || topic.includes('job')) return [
        { t: '// AI RESPONSE ▸', c: 'accent-gold' },
        { t: '  Karan is AVAILABLE for hire!', c: 'success' },
        { t: '  Type hire or contact for details.' },
      ];
      return [{ t: `// ask: Unknown topic "${topic}". Try: project · stack · hire`, c: 'dim' }];
    },

    // ── Easter Eggs ──
    jarvis: () => {
      sfx.unlock();
      return [
        { t: '// JARVIS PROTOCOL ACTIVATED', c: 'secret' },
        { t: '  "Welcome back, Mr. Mahakur."', c: 'secret' },
        { t: '  All systems nominal. Arc reactor at 97%.', c: 'dim' },
      ];
    },

    nightcity: () => {
      sfx.unlock();
      return [
        { t: '// NIGHT CITY ACCESS GRANTED', c: 'secret' },
        { t: '  "Wake up, samurai."', c: 'secret' },
        { t: '  "We have a portfolio to burn."', c: 'secret' },
        { t: '  ACCESS LEVEL: LEGEND', c: 'accent-gold' },
      ];
    },

    sudo: (args) => {
      const sub = args.join(' ');
      if (sub === 'hire karan') {
        sfx.success();
        return [
          { t: '// SUDO: ELEVATED PRIVILEGES GRANTED', c: 'secret' },
          { t: '  Initiating hire sequence... ✔', c: 'success' },
          { t: '  Email: karan.mahakur@email.com', c: 'accent-gold' },
        ];
      }
      return [{ t: `sudo: ${sub}: Permission denied.`, c: 'error' }];
    },

    unlock: (args) => {
      if (args[0] === 'devmode') {
        document.body.classList.add('dev-mode');
        sfx.unlock();
        const eu = $('easter-unlocked');
        if (eu) eu.classList.remove('hidden');
        return [
          { t: '⚡ DEV MODE UNLOCKED', c: 'accent-gold' },
          { t: '  Hidden visuals activated.', c: 'success' },
          { t: '  ACCESS LEVEL INCREASED', c: 'secret' },
        ];
      }
      return [{ t: 'unlock: invalid key', c: 'error' }];
    },

    secret: () => {
      sfx.unlock();
      return [
        { t: '🔐 ENCRYPTED MESSAGE DECODING...', c: 'accent-red' },
        { t: '  KARAN IS LOOKING FOR COOL PROJECTS.', c: 'secret' },
        { t: '  IF YOU HAVE ONE, REACH OUT.', c: 'secret' },
        { t: '  THIS MESSAGE WILL SELF-DESTRUCT.', c: 'dim' },
      ];
    },

    game: () => {
      launchGame();
      return [{ t: '// LAUNCHING FIREWALL BREACH MINI-GAME...', c: 'accent-red' }];
    },

    clear: () => { output.innerHTML = ''; return null; },
  };

  // ════════════════════════
  // TYPED LINE OUTPUT
  // ════════════════════════
  function appendLine(text, cls = '') {
    const div = document.createElement('div');
    div.className = 't-line' + (cls ? ' ' + cls : '');
    div.textContent = text;
    output.appendChild(div);
  }

  function typeLines(lines, delay = 35) {
    lines.forEach((l, i) => {
      setTimeout(() => {
        appendLine(l.t !== undefined ? l.t : l, l.c || '');
        output.scrollTop = output.scrollHeight;
      }, i * delay);
    });
  }

  // ════════════════════════
  // AUTO-SUGGEST CHIPS
  // ════════════════════════
  function updateSuggest(val) {
    if (!kosSuggest) return;
    kosSuggest.innerHTML = '';
    tabIdx = -1;
    if (!val.trim()) return;
    const lower = val.toLowerCase().trim();
    const matches = ALL_CMDS.filter(c => c.startsWith(lower) && c !== lower);
    matches.slice(0, 8).forEach(m => {
      const chip = document.createElement('span');
      chip.className = 'kos-sug-chip';
      chip.textContent = m;
      chip.addEventListener('click', () => {
        input.value = m;
        input.focus();
        updateSuggest(m);
      });
      kosSuggest.appendChild(chip);
    });
  }

  // ════════════════════════
  // INPUT HANDLING
  // ════════════════════════
  input.addEventListener('input', () => {
    histIdx = -1;
    updateSuggest(input.value);
  });

  input.addEventListener('keydown', e => {
    const chips = kosSuggest ? [...kosSuggest.querySelectorAll('.kos-sug-chip')] : [];

    // Arrow-key history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx] || ''; }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) { histIdx--; input.value = history[histIdx] || ''; }
      else { histIdx = -1; input.value = ''; }
      return;
    }

    // Tab autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      if (chips.length === 0) return;
      chips.forEach(c => c.classList.remove('kos-tab-active'));
      tabIdx = (tabIdx + 1) % chips.length;
      chips[tabIdx].classList.add('kos-tab-active');
      input.value = chips[tabIdx].textContent;
      return;
    }

    if (e.key !== 'Enter') return;

    const raw  = input.value.trim();
    input.value = '';
    updateSuggest('');
    if (!raw) return;

    sfx.click();
    history.unshift(raw);
    histIdx = -1;

    const [cmd, ...args] = raw.toLowerCase().split(/\s+/);
    appendLine(`${cwd} ❯ ${raw}`, 'cmd-echo');

    if (CMDS[cmd]) {
      const result = CMDS[cmd](args);
      if (result && result.length) {
        typeLines(result);
      } else if (result === null) {
        // clear: already handled
      }
      if (cmd !== 'clear') sfx.type();
    } else {
      appendLine(`ACCESS DENIED_ : "${cmd}" — unknown command. Type help.`, 'error');
      sfx.error();
      // shake input
      const row = document.querySelector('.kos-input-row');
      if (row) { row.style.animation = 'kosShake 0.35s ease'; setTimeout(() => row.style.animation = '', 400); }
    }

    setTimeout(() => { output.scrollTop = output.scrollHeight; }, 50);
  });

  // ════════════════════════
  // MINI HACKING GAME
  // ════════════════════════
  function launchGame() {
    const overlay = $('kos-game');
    const seqEl   = $('kg-seq');
    const timerEl = $('kg-timer');
    const inputEl = $('kg-input');
    const submitEl= $('kg-submit');
    const msgEl   = $('kg-msg');
    const closeEl = $('kg-close');
    if (!overlay) return;

    // Generate 6-char random hex sequence
    const chars = '0123456789ABCDEF';
    let answer = '';
    for (let i = 0; i < 6; i++) answer += chars[Math.floor(Math.random() * 16)];

    // Render scrambled sequence as hint (some chars revealed)
    function renderSeq(reveal = false) {
      if (!seqEl) return;
      seqEl.innerHTML = answer.split('').map((ch, i) => {
        const show = reveal || (i % 3 === 0); // reveal every 3rd char as hint
        const txt  = show ? ch : (Math.random() > 0.5 ? chars[Math.floor(Math.random() * 16)] : '?');
        return `<span class="kos-seq-char">${txt}</span>`;
      }).join('');
    }

    // Timer
    let timeLeft = 10;
    let ticker;
    function startTimer() {
      ticker = setInterval(() => {
        timeLeft--;
        if (timerEl) {
          timerEl.textContent = timeLeft;
          if (timeLeft <= 3) timerEl.classList.add('urgent');
        }
        // Scramble un-revealed chars
        renderSeq(false);
        if (timeLeft <= 0) {
          clearInterval(ticker);
          if (msgEl) { msgEl.textContent = '✗ FIREWALL HELD — TIME UP'; msgEl.className = 'kos-game-msg error'; }
          setTimeout(() => closeGame(false), 1800);
        }
      }, 1000);
    }

    function closeGame(success) {
      overlay.classList.add('hidden');
      if (timerEl) timerEl.classList.remove('urgent');
      if (inputEl) inputEl.value = '';
      if (msgEl)   msgEl.textContent = '';
      if (success) {
        appendLine('✔ FIREWALL BREACHED — ACCESS LEVEL INCREASED', 'success');
        sfx.success();
      } else {
        appendLine('✗ BREACH FAILED — FIREWALL REMAINS ACTIVE', 'error');
        sfx.error();
      }
      output.scrollTop = output.scrollHeight;
    }

    if (timerEl) { timerEl.textContent = '10'; timerEl.classList.remove('urgent'); }
    if (msgEl) msgEl.textContent = '';
    if (inputEl) inputEl.value = '';
    renderSeq(false);
    overlay.classList.remove('hidden');
    startTimer();

    if (submitEl) {
      const doSubmit = () => {
        if (!inputEl) return;
        const guess = inputEl.value.trim().toUpperCase();
        if (guess === answer) {
          clearInterval(ticker);
          renderSeq(true);
          if (msgEl) { msgEl.textContent = '✔ SEQUENCE MATCHED — ACCESS GRANTED'; msgEl.className = 'kos-game-msg success'; }
          sfx.success();
          setTimeout(() => closeGame(true), 1500);
        } else {
          if (msgEl) { msgEl.textContent = '✗ INCORRECT — TRY AGAIN'; msgEl.className = 'kos-game-msg error'; }
          sfx.error();
          if (inputEl) inputEl.value = '';
        }
      };
      // Remove old listeners
      const newSubmit = submitEl.cloneNode(true);
      submitEl.parentNode.replaceChild(newSubmit, submitEl);
      newSubmit.addEventListener('click', doSubmit);
      const newInput = inputEl.cloneNode(true);
      inputEl.parentNode.replaceChild(newInput, inputEl);
      newInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSubmit(); });
    }

    const fresh = $('kg-close');
    if (fresh) {
      const nc = fresh.cloneNode(true);
      fresh.parentNode.replaceChild(nc, fresh);
      nc.addEventListener('click', () => { clearInterval(ticker); closeGame(false); });
    }
  }
}


// ══════════════════════════════════════════════
// B — CODE BREAK PUZZLE
// ══════════════════════════════════════════════
function initCodeBreak() {
  const SECRET_CODE = '472';
  const HINTS = [
    'Sum of digits = 13',
    'Middle digit is prime',
    'First digit is even',
    'Last digit is 2',
  ];
  const FEATURED = {
    name: 'Movie Booking DBMS',
    desc: 'Full-stack Python + SQL movie booking system with seat allocation and admin dashboard.',
  };

  let entry = '';
  const D = [0, 1, 2].map(i => $(`digit-${i}`));
  let hintIdx = 0;

  function updateHint() {
    const el = $('codebreak-hint-text');
    if (el) el.textContent = HINTS[hintIdx % HINTS.length];
  }
  updateHint();

  // Cycle hints every 4s
  setInterval(() => { hintIdx++; updateHint(); }, 4000);

  function renderDigits() {
    for (let i = 0; i < 3; i++) {
      D[i].textContent = entry[i] || '_';
      D[i].className = 'digit-box' + (i === entry.length ? ' active' : '');
    }
  }
  renderDigits();

  $$('.pad-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.click();
      const d = btn.dataset.d;
      if (d === 'C') { entry = ''; renderDigits(); return; }
      if (d === 'E') { checkCode(); return; }
      if (entry.length < 3) {
        entry += d; renderDigits();
        if (entry.length === 3) checkCode();
      }
    });
  });

  function checkCode() {
    if (entry === SECRET_CODE) {
      D.forEach(d => { d.className = 'digit-box correct'; });
      sfx.success();
      showNotify('ACCESS GRANTED — Project Revealed!');
      const res = $('codebreak-result');
      $('result-project-name').textContent = FEATURED.name;
      $('result-project-desc').textContent = FEATURED.desc;
      res.classList.remove('hidden');
      fireCyberConfetti(true);
    } else {
      D.forEach(d => { d.className = 'digit-box wrong'; });
      sfx.error();
      showNotify('ACCESS DENIED — Wrong code.');
      setTimeout(() => { entry = ''; renderDigits(); }, 700);
    }
  }
}

// ══════════════════════════════════════════════
// C — DRAG & DROP ARCHITECTURE
// ══════════════════════════════════════════════
function initDragDrop() {
  const chips = $$('.drag-chip');
  const zones = $$('.drop-zone');
  let dragged = null;
  let score = 0;

  chips.forEach(chip => {
    chip.addEventListener('dragstart', e => {
      dragged = chip;
      chip.classList.add('dragging');
      e.dataTransfer.setData('text/plain', chip.id);
      sfx.click();
    });
    chip.addEventListener('dragend', () => chip.classList.remove('dragging'));
  });

  zones.forEach(zone => {
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('over'));
    zone.addEventListener('drop', e => {
      e.preventDefault(); zone.classList.remove('over');
      if (!dragged) return;
      const chipCat = dragged.dataset.cat;
      const zoneCat = zone.dataset.zone;
      const correct = chipCat === zoneCat;

      // Clone chip into zone
      const placed = dragged.cloneNode(true);
      placed.draggable = false;
      placed.classList.remove('dragging');
      placed.style.cursor = 'default';
      placed.style.borderColor = correct ? '#2dd36f' : 'var(--red)';
      placed.style.color = correct ? '#2dd36f' : 'var(--red)';
      zone.appendChild(placed);

      // Mark original as placed
      dragged.classList.add('placed');
      dragged.style.opacity = '0.3';

      if (correct) {
        score++;
        sfx.react();
        zone.classList.add('correct');
        setTimeout(() => zone.classList.remove('correct'), 600);
      } else {
        sfx.error();
        zone.classList.add('wrong');
        setTimeout(() => zone.classList.remove('wrong'), 600);
      }
      $('drag-score').textContent = score;
      if (score === 8) {
        showNotify('Perfect architecture! All 8 correct 🏆');
        sfx.success();
        fireCyberConfetti(true);
      }
      dragged = null;
    });
  });

  $('drag-reset').addEventListener('click', () => {
    sfx.click(); score = 0; $('drag-score').textContent = '0';
    chips.forEach(c => {
      c.classList.remove('placed');
      c.draggable = true;
      c.style.opacity = ''; c.style.borderColor = ''; c.style.color = '';
    });
    zones.forEach(z => {
      // Remove placed clones, keep the label
      Array.from(z.children).forEach(ch => {
        if (!ch.classList.contains('zone-label')) ch.remove();
      });
    });
  });
}

// ══════════════════════════════════════════════
// D — REACTION SPEED CHALLENGE
// ══════════════════════════════════════════════
function initReaction() {
  const startBtn = $('reaction-start');
  const target = $('reaction-target');
  const idle = $('reaction-idle');
  const rRound = $('r-round');
  const rBest = $('r-best');
  const rAvg = $('r-avg');
  const result = $('reaction-result');
  const arena = $('reaction-arena');
  if (!startBtn || !target) return;

  const ROUNDS = 5;
  let round = 0, times = [], showTime = 0, waiting = false, wTimer = null;

  function reset() {
    round = 0; times = [];
    rRound.textContent = '0'; rBest.textContent = '—'; rAvg.textContent = '—';
    target.classList.add('hidden');
    idle.style.display = 'flex';
    result.classList.add('hidden');
    result.textContent = '';
  }

  startBtn.addEventListener('click', () => {
    sfx.click(); idle.style.display = 'none';
    round = 0; times = []; result.classList.add('hidden');
    nextRound();
  });

  function nextRound() {
    waiting = true;
    target.classList.add('hidden');
    const delay = 800 + Math.random() * 2000;
    wTimer = setTimeout(() => {
      showTime = performance.now();
      waiting = false;
      placeTarget();
      target.classList.remove('hidden');
      sfx.react();
    }, delay);
  }

  function placeTarget() {
    const aw = arena.offsetWidth - 60, ah = arena.offsetHeight - 60;
    target.style.left = (Math.random() * aw + 20) + 'px';
    target.style.top = (Math.random() * ah + 20) + 'px';
  }

  target.addEventListener('click', () => {
    if (waiting) { showNotify('Too early! Wait for the target.'); sfx.error(); return; }
    const rt = Math.round(performance.now() - showTime);
    times.push(rt);
    round++;
    sfx.unlock();
    rRound.textContent = round;
    const best = Math.min(...times);
    const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    rBest.textContent = best + 'ms';
    rAvg.textContent = avg + 'ms';
    target.classList.add('hidden');

    if (round >= ROUNDS) {
      endGame(best, avg);
    } else {
      setTimeout(nextRound, 500);
    }
  });

  function endGame(best, avg) {
    clearTimeout(wTimer);
    idle.style.display = 'flex';
    startBtn.textContent = 'PLAY AGAIN';
    result.classList.remove('hidden');
    let rating = avg < 250 ? '⚡ ELITE REFLEXES' : avg < 400 ? '🎯 SHARP' : avg < 600 ? '👍 DECENT' : '🐢 SLOW';
    result.textContent = `${rating} — Best: ${best}ms | Avg: ${avg}ms`;
    sfx.success();
    showNotify(`Reaction complete! Avg: ${avg}ms`);
  }
}

// ══════════════════════════════════════════════
// E — EASTER EGG (Developer Mode)
// ══════════════════════════════════════════════
function initEasterEgg() {
  const egg = $('easter-egg');
  const status = $('easter-status');
  const unlocked = $('easter-unlocked');
  if (!egg) return;

  egg.addEventListener('click', () => {
    if (document.body.classList.contains('dev-mode')) {
      showNotify('Developer Mode already active 🐉');
      return;
    }
    document.body.classList.add('dev-mode');
    egg.style.opacity = '1';
    egg.style.transform = 'scale(2)';
    egg.style.textShadow = '0 0 30px var(--gold)';

    if (status) status.style.display = 'none';
    if (unlocked) unlocked.classList.remove('hidden');

    sfx.success();
    fireCyberConfetti(true);
    showNotify('🐉 DEVELOPER MODE ACTIVATED — You see what others don\'t!');

    // Dev mode reveals: make hexes glow
    $$('.hex').forEach(h => { h.classList.add('active'); });
  });

  // Make it slightly more visible on scroll
  window.addEventListener('scroll', () => {
    if (!document.body.classList.contains('dev-mode') && window.scrollY > 100) {
      egg.style.opacity = '0.05';
    }
  });
}

// ══════════════════════════════════════════════
// PROJECT DASHBOARD — CP2077 Hacker OS
// ══════════════════════════════════════════════
function initProjectDashboard() {
  const PROJ = [
    {
      num: '01', icon: '⚡', cat: 'WEB APP',
      title: 'Lost In City',
      desc: 'An immersive web experience simulating being lost in a cyberpunk megacity. Procedural map generation creates a unique city layout every run, with interactive neon districts and ambient city sound design.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      features: ['Procedural Map Generation', 'Interactive Districts', 'CSS Particle System', 'Ambient Audio Engine'],
      role: 'SOLO DEVELOPER', status: 'ONLINE',
      demo: '#', github: '#',
    },
    {
      num: '02', icon: '🗄', cat: 'DATABASE',
      title: 'Movie Booking DBMS',
      desc: 'Full-stack movie booking platform with advanced SQL query optimisation, schema normalisation up to 3NF, a dynamic seat allocation engine, and a real-time admin control dashboard.',
      stack: ['Python', 'SQL', 'MySQL', 'Flask'],
      features: ['3NF Schema Design', 'Seat Allocation Algorithm', 'Admin Dashboard', 'Stored Procedures'],
      role: 'LEAD DEVELOPER', status: 'ONLINE',
      demo: '#', github: '#',
    },
    {
      num: '03', icon: '🌐', cat: 'PORTFOLIO',
      title: 'Portfolio Website',
      desc: 'This very site — a Cyberpunk 2077-inspired interactive portfolio with a journey-based page experience, custom font integration, a terminal game, drag-and-drop arcade, and this very dashboard.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      features: ['Journey Mode Navigation', 'CP2077 Typography', 'HUD Overlay System', 'Interactive Arcade'],
      role: 'DESIGNER + DEVELOPER', status: 'ONLINE',
      demo: '#', github: '#',
    },
    {
      num: '04', icon: '🤖', cat: 'HACKATHON',
      title: 'Hackathon Project',
      desc: 'AI-powered solution built in 24 hours at a national hackathon. Real-time data ingestion pipeline, ML inference engine, and a live analytics dashboard served under pressure.',
      stack: ['Python', 'AI / ML', 'MySQL', 'Flask'],
      features: ['Real-time Data Pipeline', 'ML Inference Engine', 'Live Dashboard', 'Built in 24 Hours'],
      role: 'TEAM LEAD', status: 'ONLINE',
      demo: '#', github: '#',
    },
  ];

  const list = $('pdash-list');
  const detail = $('pdash-detail');
  const numEl = $('pdash-num');
  const fillEl = $('pdash-hud-fill');
  const demoBtn = $('pdash-btn-demo');
  const ghBtn = $('pdash-btn-github');
  const nextBtn = $('pdash-btn-next');

  if (!list || !detail) return;

  let active = 0;
  let autoTimer = null;

  // Build list rows
  PROJ.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = 'pdash-row' + (i === 0 ? ' pdash-active' : '');
    row.innerHTML = `
      <span class="pdash-row-num">${p.num}</span>
      <span class="pdash-row-icon">${p.icon}</span>
      <div class="pdash-row-info">
        <div class="pdash-row-title">${p.title}</div>
        <div class="pdash-row-cat">${p.cat}</div>
      </div>
      <span class="pdash-row-arrow">›</span>
    `;
    row.addEventListener('click', () => { selectProject(i); resetAuto(); });
    list.appendChild(row);
  });

  function selectProject(i) {
    active = i;
    const p = PROJ[i];

    // Update list active state
    list.querySelectorAll('.pdash-row').forEach((r, idx) => {
      r.classList.toggle('pdash-active', idx === i);
    });

    // Counter + progress bar
    numEl.textContent = p.num;
    fillEl.style.width = ((i + 1) / PROJ.length * 100) + '%';

    // Update action buttons
    if (demoBtn) demoBtn.href = p.demo;
    if (ghBtn) ghBtn.href = p.github;

    // Fade detail out, swap content, fade back in
    detail.classList.add('loading');
    setTimeout(() => {
      detail.innerHTML = `
        <div class="pdash-d-cat">${p.cat} &nbsp;/&nbsp; ${p.num}</div>
        <div class="pdash-d-title">${p.title}</div>
        <div class="pdash-d-divider"></div>
        <p class="pdash-d-desc">${p.desc}</p>
        <div class="pdash-d-meta">
          <div>
            <div class="pdash-d-label">// TECH STACK</div>
            <div class="pdash-d-stack">${p.stack.map(s => `<span class="pdash-d-chip">${s}</span>`).join('')}</div>
          </div>
          <div>
            <div class="pdash-d-label">// KEY FEATURES</div>
            <div class="pdash-d-feats">${p.features.map(f => `<div class="pdash-d-feat">${f}</div>`).join('')}</div>
          </div>
          <div class="pdash-d-role">ROLE: ${p.role}</div>
        </div>
      `;
      detail.classList.remove('loading');
    }, 280);

    sfx.click();
  }

  function autoAdvance() {
    selectProject((active + 1) % PROJ.length);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(autoAdvance, 4500);
  }

  // NEXT button
  if (nextBtn) nextBtn.addEventListener('click', () => { autoAdvance(); resetAuto(); });

  // Init first project
  selectProject(0);
  resetAuto();
}

// ══════════════════════════════════════════════
// CYBER CONFETTI
// ══════════════════════════════════════════════
function fireCyberConfetti(mini = false) {
  const canvas = $('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#f5c518', '#e63946', '#00b4d8', '#ffffff', '#ffd700'];
  const n = mini ? 60 : 150;
  const particles = Array.from({ length: n }, () => ({
    x: Math.random() * canvas.width,
    y: -10,
    vx: (Math.random() - 0.5) * 6,
    vy: Math.random() * 4 + 2,
    sz: Math.random() * 8 + 4,
    c: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * Math.PI * 2,
    rv: (Math.random() - 0.5) * 0.2,
    s: Math.floor(Math.random() * 3),
  }));

  let frame = 0;
  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      if (p.y > canvas.height + 20) return; alive = true;
      p.x += p.vx; p.y += p.vy + frame * 0.008;
      p.vy += 0.12; p.rot += p.rv;
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = Math.max(0, 1 - p.y / canvas.height * 0.6);
      if (p.s === 0) ctx.fillRect(-p.sz / 2, -p.sz / 4, p.sz, p.sz / 2);
      else if (p.s === 1) { ctx.beginPath(); ctx.arc(0, 0, p.sz / 2, 0, Math.PI * 2); ctx.fill(); }
      else { ctx.beginPath(); ctx.moveTo(0, -p.sz / 2); ctx.lineTo(p.sz / 2, 0); ctx.lineTo(0, p.sz / 2); ctx.lineTo(-p.sz / 2, 0); ctx.closePath(); ctx.fill(); }
      ctx.restore();
    });
    frame++;
    if (alive && frame < 280) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  })();
}

// ══════════════════════════════════════════════
// WELCOME TONE
// ══════════════════════════════════════════════
function playWelcomeTone() {
  setTimeout(() => {
    [260, 330, 390, 520].forEach((f, i) => setTimeout(() => playTone(f, 'triangle', 0.3, 0.1), i * 90));
  }, 600);
}

// ══════════════════════════════════════════════
// XP FLOAT (mini flourish on interactions)
// ══════════════════════════════════════════════
function spawnFloat(x, y, text, color = 'var(--gold)') {
  const el = document.createElement('div');
  el.textContent = text;
  el.style.cssText = `
    position:fixed;left:${x}px;top:${y}px;z-index:9999;
    font-family:'Orbitron',monospace;font-size:.85rem;font-weight:700;
    color:${color};text-shadow:0 0 8px ${color};
    pointer-events:none;user-select:none;
    animation:xpFloat 1s ease forwards;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1050);
}
const style = document.createElement('style');
style.textContent = `@keyframes xpFloat{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-55px)}}`;
document.head.appendChild(style);

// Float on pad-btn press
document.addEventListener('click', e => {
  if (e.target.classList.contains('pad-btn') && e.target.dataset.d === 'E') {
    spawnFloat(e.clientX, e.clientY, '▶ CHECK', 'var(--gold)');
  }
  if (e.target.id === 'reaction-target') {
    spawnFloat(e.clientX, e.clientY, '⚡ CLICK!', 'var(--gold)');
  }
});

// ══════════════════════════════════════════════
// WINDOW RESIZE
// ══════════════════════════════════════════════
window.addEventListener('resize', () => {
  const c = $('confetti-canvas');
  if (c) { c.width = window.innerWidth; c.height = window.innerHeight; }
});

// PAGE VISIBILITY
document.addEventListener('visibilitychange', () => {
  if (document.hidden && audioCtx) audioCtx.suspend().catch(() => { });
  else if (!document.hidden && audioCtx) audioCtx.resume().catch(() => { });
});

console.log(`
  ██╗  ██╗███╗   ███╗
  ██║ ██╔╝████╗ ████║
  █████╔╝ ██╔████╔██║
  ██╔═██╗ ██║╚██╔╝██║
  ██║  ██╗██║ ╚═╝ ██║
  ╚═╝  ╚═╝╚═╝     ╚═╝

  Karan Mahakur | Full Stack Developer
  CP2077 Portfolio v3.0 — Journey Mode ONLINE
  Locations: NEON GATE → DATA ALLEY → CODE FORGE
             PROJECT VAULT → SIMULATION ARENA
             FINAL TRANSMISSION → SKYLINE OVERLOOK

  Try the terminal: type 'help'
  Find the easter egg 🐉
  Code break answer: sum = 13
`);

