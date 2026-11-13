// Secret page trigger placeholder
console.log("Secret key unlocked.");

// Create a simple starfield background
function createStars(count = 80) {
  const root = document.getElementById('root');
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    const size = Math.random() * 3 + 1 + 'px';
    star.style.width = size;
    star.style.height = size;
    star.style.opacity = Math.random();
    root.appendChild(star);
  }
}

document.getElementById('root').innerHTML = `
  <style>
    html, body {
      margin: 0; padding: 0; height: 100%;
      background: radial-gradient(circle at center, #0a0a2a 0%, #020205 100%);
      color: #e0e0ff;
      font-family: 'Courier New', Courier, monospace;
      overflow: hidden;
    }
    #root {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .star {
      position: absolute;
      background: white;
      border-radius: 50%;
      box-shadow: 0 0 6px white, 0 0 12px #0ff;
      pointer-events: none;
    }
    .nebula {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(0, 255, 255, 0.08) 0%, transparent 40%);
      z-index: -1;
      animation: pulse 8s infinite alternate;
    }
    @keyframes pulse {
      from { transform: scale(1); opacity: 0.6; }
      to { transform: scale(1.2); opacity: 1; }
    }
    .card {
      background: rgba(0, 20, 40, 0.75);
      border: 1px solid rgba(0, 255, 255, 0.4);
      border-radius: 12px;
      padding: 2rem;
      max-width: 400px;
      width: 90%;
      text-align: center;
      box-shadow: 0 0 40px rgba(0, 255, 255, 0.15);
      backdrop-filter: blur(8px);
    }
    h1 {
      color: #0ff;
      text-shadow: 0 0 10px #0ff;
      margin-bottom: 1rem;
    }
    input {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(0, 255, 255, 0.3);
      color: #fff;
      padding: 8px;
      margin: 6px 0;
      width: 88%;
      border-radius: 4px;
      font-family: inherit;
    }
    button {
      background: #0ff;
      color: #000;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      font-family: inherit;
      margin-top: 12px;
      box-shadow: 0 0 15px #0ff;
    }
    button:hover {
      background: #8ff;
    }
    .hidden {
      display: none;
    }
  </style>
  <div class="nebula"></div>
  <div id="login-view" class="card">
    <h1>🚀 Cosmo Login</h1>
    <p>Access to the secret hub requires clearance.</p>
    <input type="text" id="login-user" placeholder="Username">
    <input type="password" id="login-pass" placeholder="Password">
    <button id="login-btn">Authenticate</button>
  </div>
  <div id="secret-view" class="card hidden">
    <h1>Welcome to Cosmo Secret Hub</h1>
    <p>Secret page content script loaded successfully.</p>
    <p style="font-size: 0.9rem; opacity: 0.8;">Clearance granted. Explore the void.</p>
  </div>
`;

createStars();

document.getElementById('login-btn').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('login-view').classList.add('hidden');
  document.getElementById('secret-view').classList.remove('hidden');
});
