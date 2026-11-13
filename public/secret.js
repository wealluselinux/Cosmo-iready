// ============================================================
// Cosmo Secret Hub: space-themed login with Supabase auth
// ============================================================
 
// --- Supabase config -------------------------------------------------
// No keys live in this file. The page asks your Render web service for the
// Supabase URL and anon key at startup (see the /config route on the server).
const CONFIG_ENDPOINT = '/config';
 
console.log('Secret key unlocked.');
 
// Wait for the page body to exist (the script may load before <body>)
function startCosmo() {
 
// --- Fonts -----------------------------------------------------------
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap';
document.head.appendChild(fontLink);
 
// --- Markup + styles -------------------------------------------------
let root = document.getElementById('root');
if (!root) {
  root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
}
root.innerHTML = `
  <style>
    :root {
      --void: #05030f;
      --deep: #0d0828;
      --violet: #6d4cff;
      --magenta: #d24bff;
      --cyan: #4ee8ff;
      --text: #eef0ff;
      --muted: rgba(238, 240, 255, 0.68);
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0; padding: 0; height: 100%;
      background: var(--void);
      color: var(--text);
      font-family: 'Space Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif;
      overflow: hidden;
    }
    #root {
      position: relative;
      min-height: 100vh;
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.25rem;
      overflow: hidden;
    }
 
    /* ---------- Cosmos ---------- */
    .cosmos {
      position: fixed; inset: 0; z-index: 0;
      background:
        radial-gradient(ellipse at 20% 15%, rgba(109, 76, 255, 0.35), transparent 50%),
        radial-gradient(ellipse at 80% 75%, rgba(210, 75, 255, 0.25), transparent 55%),
        radial-gradient(ellipse at 55% 45%, rgba(78, 232, 255, 0.10), transparent 60%),
        linear-gradient(160deg, var(--deep), var(--void) 70%);
    }
    .nebula {
      position: absolute; border-radius: 50%;
      filter: blur(70px); mix-blend-mode: screen; opacity: 0.55;
      animation: drift 28s ease-in-out infinite alternate;
    }
    .nebula.a { width: 55vmax; height: 55vmax; top: -18vmax; left: -12vmax;
      background: radial-gradient(circle, rgba(109, 76, 255, 0.7), transparent 65%); }
    .nebula.b { width: 48vmax; height: 48vmax; bottom: -16vmax; right: -10vmax;
      background: radial-gradient(circle, rgba(210, 75, 255, 0.55), transparent 65%);
      animation-duration: 36s; animation-direction: alternate-reverse; }
    .nebula.c { width: 30vmax; height: 30vmax; top: 35%; left: 55%;
      background: radial-gradient(circle, rgba(78, 232, 255, 0.4), transparent 65%);
      animation-duration: 42s; }
    @keyframes drift {
      from { transform: translate(0, 0) scale(1); }
      to   { transform: translate(4vmax, 3vmax) scale(1.12); }
    }
    #stars { position: fixed; inset: 0; z-index: 1; width: 100%; height: 100%; }
 
    /* ---------- Liquid glass ---------- */
    .glass {
      position: relative; z-index: 2;
      width: 100%; max-width: 410px;
      padding: 2.25rem 2rem 2rem;
      border-radius: 32px;
      background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.04) 45%, rgba(255, 255, 255, 0.10));
      backdrop-filter: blur(22px) saturate(180%) brightness(1.08);
      -webkit-backdrop-filter: blur(22px) saturate(180%) brightness(1.08);
      border: 1px solid rgba(255, 255, 255, 0.28);
      box-shadow:
        0 30px 80px rgba(0, 0, 0, 0.55),
        0 0 60px rgba(109, 76, 255, 0.25),
        inset 0 1.5px 1px rgba(255, 255, 255, 0.55),
        inset 0 -1.5px 1px rgba(255, 255, 255, 0.12),
        inset 0 0 40px rgba(255, 255, 255, 0.06);
      overflow: hidden;
      animation: rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }
    /* specular sheen that follows the pointer */
    .glass::before {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(
        circle 220px at var(--mx, 25%) var(--my, 0%),
        rgba(255, 255, 255, 0.28), transparent 70%);
      transition: background 0.1s;
    }
    @keyframes rise {
      from { opacity: 0; transform: translateY(24px) scale(0.97); }
      to   { opacity: 1; transform: none; }
    }
    .glass > * { position: relative; }
    .hidden { display: none !important; }
 
    h1 {
      margin: 0 0 0.35rem;
      font-size: 1.9rem; font-weight: 700; letter-spacing: -0.02em;
      text-shadow: 0 0 24px rgba(78, 232, 255, 0.55);
    }
    .sub { margin: 0 0 1.5rem; color: var(--muted); font-size: 0.95rem; line-height: 1.5; }
 
    label { display: block; margin: 0.9rem 0 0.35rem; font-size: 0.82rem; color: var(--muted); }
    input {
      width: 100%;
      padding: 0.8rem 1rem;
      border-radius: 14px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      background: rgba(255, 255, 255, 0.08);
      color: var(--text);
      font: inherit; font-size: 1rem;
      box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.25);
      transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    }
    input::placeholder { color: rgba(238, 240, 255, 0.4); }
    input:focus {
      outline: none;
      border-color: var(--cyan);
      background: rgba(255, 255, 255, 0.12);
      box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.25), 0 0 0 3px rgba(78, 232, 255, 0.25);
    }
 
    .btn {
      width: 100%; margin-top: 1.5rem;
      padding: 0.9rem 1rem;
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 16px;
      color: #fff; font: inherit; font-size: 1rem; font-weight: 700;
      cursor: pointer;
      background: linear-gradient(135deg, rgba(109, 76, 255, 0.85), rgba(210, 75, 255, 0.75));
      box-shadow:
        0 10px 30px rgba(109, 76, 255, 0.45),
        inset 0 1.5px 1px rgba(255, 255, 255, 0.5);
      transition: transform 0.15s, box-shadow 0.2s, filter 0.2s;
    }
    .btn:hover { transform: translateY(-1px); filter: brightness(1.12); }
    .btn:active { transform: translateY(1px); }
    .btn:disabled { opacity: 0.6; cursor: wait; transform: none; }
    .btn.ghost {
      background: rgba(255, 255, 255, 0.08);
      box-shadow: inset 0 1.5px 1px rgba(255, 255, 255, 0.3);
      margin-top: 1rem;
    }
    :is(.btn, input, .switch):focus-visible { outline: 2px solid var(--cyan); outline-offset: 2px; }
 
    .switch {
      display: block; margin: 1.25rem auto 0;
      background: none; border: none; color: var(--muted);
      font: inherit; font-size: 0.9rem; cursor: pointer; text-decoration: underline;
      text-underline-offset: 3px;
    }
    .switch:hover { color: var(--text); }
 
    .msg { min-height: 1.3rem; margin: 1rem 0 0; font-size: 0.88rem; line-height: 1.4; }
    .msg.error { color: #ff9fb4; }
    .msg.ok { color: #9ff5c8; }
 
    .badge {
      display: inline-block; margin: 0.5rem 0 0; padding: 0.35rem 0.8rem;
      border-radius: 999px; font-size: 0.82rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      word-break: break-all;
    }
 
    @media (prefers-reduced-motion: reduce) {
      .nebula, .glass { animation: none; }
    }
  </style>
 
  <div class="cosmos">
    <div class="nebula a"></div>
    <div class="nebula b"></div>
    <div class="nebula c"></div>
  </div>
  <canvas id="stars" aria-hidden="true"></canvas>
 
  <main class="glass" id="card">
    <!-- Login -->
    <section id="login-view">
      <h1>Cosmo</h1>
      <p class="sub">Sign in to enter the secret hub.</p>
      <form id="login-form" novalidate>
        <label for="login-email">Email</label>
        <input id="login-email" type="email" autocomplete="email" placeholder="you@example.com" required>
        <label for="login-pass">Password</label>
        <input id="login-pass" type="password" autocomplete="current-password" placeholder="Your password" required>
        <button class="btn" id="login-btn" type="submit">Log in</button>
      </form>
      <p class="msg" id="login-msg" role="status" aria-live="polite"></p>
      <button class="switch" id="to-signup" type="button">New here? Create an account</button>
    </section>
 
    <!-- Sign up -->
    <section id="signup-view" class="hidden">
      <h1>Create account</h1>
      <p class="sub">Pick an email and password to get your clearance.</p>
      <form id="signup-form" novalidate>
        <label for="signup-email">Email</label>
        <input id="signup-email" type="email" autocomplete="email" placeholder="you@example.com" required>
        <label for="signup-pass">Password</label>
        <input id="signup-pass" type="password" autocomplete="new-password" placeholder="At least 8 characters" required>
        <label for="signup-pass2">Confirm password</label>
        <input id="signup-pass2" type="password" autocomplete="new-password" placeholder="Repeat your password" required>
        <button class="btn" id="signup-btn" type="submit">Create account</button>
      </form>
      <p class="msg" id="signup-msg" role="status" aria-live="polite"></p>
      <button class="switch" id="to-login" type="button">Already have an account? Log in</button>
    </section>
 
    <!-- Placeholder page after login -->
    <section id="secret-view" class="hidden">
      <h1>Welcome aboard</h1>
      <p class="sub">The secret hub is under construction. Check back soon.</p>
      <span class="badge" id="who"></span>
      <button class="btn ghost" id="logout-btn" type="button">Log out</button>
    </section>
  </main>
`;
 
// --- Starfield (canvas: twinkling stars, parallax, shooting stars) ---
(function starfield() {
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w, h, dpr, stars = [], shooters = [];
  let px = 0, py = 0, tx = 0, ty = 0;
 
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    const count = Math.round((innerWidth * innerHeight) / 4500);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.9 + 0.1,          // depth: small = far
      r: (Math.random() * 1.3 + 0.3) * dpr,
      tw: Math.random() * Math.PI * 2,
      sp: Math.random() * 0.02 + 0.005,
      hue: Math.random() < 0.2 ? 190 : Math.random() < 0.3 ? 280 : 220
    }));
  }
 
  addEventListener('resize', resize);
  addEventListener('pointermove', (e) => {
    tx = (e.clientX / innerWidth - 0.5) * 2;
    ty = (e.clientY / innerHeight - 0.5) * 2;
  });
 
  function frame() {
    ctx.clearRect(0, 0, w, h);
    px += (tx - px) * 0.04;
    py += (ty - py) * 0.04;
 
    for (const s of stars) {
      s.tw += s.sp;
      const a = 0.35 + 0.65 * Math.abs(Math.sin(s.tw));
      const x = (s.x + px * s.z * 30 * dpr + w) % w;
      const y = (s.y + py * s.z * 30 * dpr + h) % h;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${s.hue}, 90%, ${75 + s.z * 20}%, ${a * s.z})`;
      ctx.shadowColor = `hsla(${s.hue}, 100%, 75%, 0.9)`;
      ctx.shadowBlur = s.r * 4;
      ctx.arc(x, y, s.r * s.z + 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
 
    if (!reduce && Math.random() < 0.006) {
      shooters.push({
        x: Math.random() * w * 0.8, y: Math.random() * h * 0.4,
        vx: (6 + Math.random() * 5) * dpr, vy: (2.5 + Math.random() * 3) * dpr, life: 1
      });
    }
    shooters = shooters.filter((m) => m.life > 0);
    for (const m of shooters) {
      const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
      grad.addColorStop(0, `rgba(255,255,255,${m.life})`);
      grad.addColorStop(1, 'rgba(78,232,255,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6 * dpr;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
      ctx.stroke();
      m.x += m.vx; m.y += m.vy; m.life -= 0.018;
    }
 
    if (!reduce) requestAnimationFrame(frame);
  }
 
  resize();
  frame();
})();
 
// --- Glass sheen follows the pointer ---------------------------------
const card = document.getElementById('card');
card.addEventListener('pointermove', (e) => {
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', e.clientX - r.left + 'px');
  card.style.setProperty('--my', e.clientY - r.top + 'px');
});
 
// --- View switching --------------------------------------------------
const views = {
  login: document.getElementById('login-view'),
  signup: document.getElementById('signup-view'),
  secret: document.getElementById('secret-view')
};
function show(name) {
  Object.entries(views).forEach(([k, el]) => el.classList.toggle('hidden', k !== name));
}
function say(id, text, kind = 'error') {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = 'msg ' + kind;
}
 
document.getElementById('to-signup').addEventListener('click', () => { say('login-msg', ''); show('signup'); });
document.getElementById('to-login').addEventListener('click', () => { say('signup-msg', ''); show('login'); });
 
// --- Supabase --------------------------------------------------------
let sb = null;
 
function loadSupabase() {
  return new Promise((resolve, reject) => {
    if (window.supabase) return resolve();
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js';
    s.onload = resolve;
    s.onerror = () => reject(new Error('Could not load Supabase.'));
    document.head.appendChild(s);
  });
}
 
function enterHub(user) {
  document.getElementById('who').textContent = user.email;
  show('secret');
}
 
async function init() {
  try {
    await loadSupabase();
    const res = await fetch(CONFIG_ENDPOINT);
    if (!res.ok) throw new Error('Could not load settings from the server.');
    const { supabaseUrl, supabaseAnonKey } = await res.json();
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Server is missing the Supabase URL or anon key.');
    }
    sb = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
 
    // Already signed in from a previous visit?
    const { data } = await sb.auth.getSession();
    if (data.session) enterHub(data.session.user);
 
    sb.auth.onAuthStateChange((_event, session) => {
      if (session) enterHub(session.user); else show('login');
    });
  } catch (err) {
    say('login-msg', err.message);
  }
}
 
function busy(btnId, isBusy, label) {
  const b = document.getElementById(btnId);
  b.disabled = isBusy;
  b.textContent = isBusy ? 'One moment...' : label;
}
 
// Log in
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!sb) return say('login-msg', 'Supabase is not set up yet.');
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-pass').value;
  if (!email || !password) return say('login-msg', 'Enter your email and password.');
 
  busy('login-btn', true);
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  busy('login-btn', false, 'Log in');
  if (error) return say('login-msg', error.message);
  say('login-msg', '');
  enterHub(data.user);
});
 
// Sign up (saves the account to Supabase Auth)
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!sb) return say('signup-msg', 'Supabase is not set up yet.');
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-pass').value;
  const confirm = document.getElementById('signup-pass2').value;
 
  if (!email) return say('signup-msg', 'Enter an email address.');
  if (password.length < 8) return say('signup-msg', 'Use a password with at least 8 characters.');
  if (password !== confirm) return say('signup-msg', 'Passwords don\'t match.');
 
  busy('signup-btn', true);
  const { data, error } = await sb.auth.signUp({ email, password });
  busy('signup-btn', false, 'Create account');
  if (error) return say('signup-msg', error.message);
 
  if (data.session) {
    // Email confirmation is off: signed in right away
    enterHub(data.user);
  } else {
    // Email confirmation is on: they need to confirm first
    say('signup-msg', 'Account created. Check your email to confirm, then log in.', 'ok');
  }
});
 
// Log out
document.getElementById('logout-btn').addEventListener('click', async () => {
  if (sb) await sb.auth.signOut();
  show('login');
});
 
init();
 
}
 
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startCosmo);
} else {
  startCosmo();
}

