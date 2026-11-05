/* ── Reset & Variables ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
    --accent: #324ab2;
    --accent-glow: rgba(50, 74, 178, 0.5);
    --accent-bright: #4f68d9;
    --bg: #030712;
    --card-bg: rgba(8, 16, 36, 0.88);
    --border: rgba(50, 74, 178, 0.25);
    --glass: rgba(255, 255, 255, 0.04);
    --radius: 1.5rem;
}
html { scroll-behavior: smooth; }
body {
    font-family: 'Inter', sans-serif;
    background: var(--bg);
    color: #f3f4f6;
    min-height: 100vh;
    overflow-x: hidden;
    user-select: none;
}
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 4px; }

/* ── Canvas Background ── */
#bg-canvas { position: fixed; inset: 0; pointer-events: none; z-index: 0; }

/* ── App Shell ── */
#app {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1024px;
    margin: 0 auto;
    padding: 1.5rem 1rem 2.5rem;
    gap: 1.4rem;
}

/* ── Header ── */
header { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; text-align: center; width: 100%; }
#badge {
    display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.3rem 1.2rem;
    border-radius: 999px; border: 1px solid var(--accent-glow); background: rgba(50, 74, 178, 0.12);
    font-family: 'Orbitron', monospace; font-size: 0.6rem; letter-spacing: 0.25em;
    text-transform: uppercase; color: #8fa3ff; box-shadow: 0 0 20px var(--accent-glow); backdrop-filter: blur(4px);
}
#badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-bright); animation: pulse-dot 2s ease-in-out infinite; }
@keyframes pulse-dot { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
h1 {
    font-family: 'Orbitron', monospace; font-size: clamp(2.4rem, 8vw, 4.2rem); font-weight: 900;
    letter-spacing: 0.06em; background: linear-gradient(135deg, #a5b4fc, #324ab2, #38bdf8);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-align: center;
    line-height: 1.05; filter: drop-shadow(0 0 30px rgba(50, 74, 178, 0.4));
}
#subtitle { font-size: 0.8rem; font-weight: 300; letter-spacing: 0.1em; color: #64748b; text-align: center; margin-top: -0.2rem; }

/* ── Toolbar ── */
#toolbar { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; width: 100%; }
.tool-btn {
    background: rgba(50, 74, 178, 0.07); border: 1px solid var(--border); color: #cbd5e1;
    font-family: 'Orbitron', monospace; font-size: 0.55rem; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 0.5rem 1rem; border-radius: 999px; cursor: pointer;
    transition: all 0.25s ease; backdrop-filter: blur(8px); display: inline-flex;
    align-items: center; gap: 0.35rem; white-space: nowrap;
}
.tool-btn:hover { background: rgba(50, 74, 178, 0.22); border-color: var(--accent-bright); transform: translateY(-2px); box-shadow: 0 4px 18px rgba(50, 74, 178, 0.25); }
.tool-btn:active { transform: scale(0.96); }
#game-btn { margin-left: auto; }

/* ── XP Bar ── */
#xp-container {
    display: flex; align-items: center; gap: 0.8rem; width: 100%;
    background: rgba(8, 16, 36, 0.7); padding: 0.5rem 1rem; border-radius: 12px;
    border: 1px solid var(--border); backdrop-filter: blur(4px);
}
#xp-label { font-family: 'Orbitron', monospace; font-size: 0.6rem; letter-spacing: 0.1em; color: #94a3b8; white-space: nowrap; min-width: 60px; }
#xp-bar-outer { flex: 1; height: 6px; border-radius: 4px; background: rgba(255, 255, 255, 0.06); overflow: hidden; position: relative; }
#xp-bar-inner { height: 100%; width: 0%; border-radius: 4px; background: linear-gradient(90deg, #324ab2, #38bdf8); transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: 0 0 16px var(--accent-glow); }
#xp-level { font-family: 'Orbitron', monospace; font-size: 0.55rem; letter-spacing: 0.1em; color: #64748b; white-space: nowrap; min-width: 36px; }

/* ── Navigator ── */
#navigator { display: flex; flex-wrap: wrap; gap: 0.45rem; justify-content: center; width: 100%; }
.nav-btn {
    position: relative; display: flex; flex-direction: column; align-items: center; gap: 1px;
    padding: 0.45rem 0.6rem; border-radius: 0.75rem; border: 1px solid var(--border);
    background: rgba(8, 16, 36, 0.5); cursor: pointer; transition: all 0.3s ease;
    font-family: 'Orbitron', monospace; min-width: 58px; backdrop-filter: blur(4px);
}
.nav-btn:hover { background: rgba(50, 74, 178, 0.18); border-color: var(--accent-bright); transform: translateY(-2px); }
.nav-btn.active { background: rgba(50, 74, 178, 0.35); border-color: var(--accent-bright); box-shadow: 0 0 20px var(--accent-glow); transform: translateY(-2px); }
.nav-btn .nav-symbol { font-size: 1rem; color: #94a3b8; transition: color 0.3s; }
.nav-btn.active .nav-symbol { color: #fff; }
.nav-btn .nav-name { font-size: 0.5rem; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; transition: color 0.3s; }
.nav-btn.active .nav-name { color: #c7d2fe; }
.nav-visited-dot { position: absolute; top: 3px; right: 3px; width: 5px; height: 5px; border-radius: 50%; background: #38bdf8; display: none; box-shadow: 0 0 8px #38bdf8; }
.nav-btn.visited .nav-visited-dot { display: block; }
.nav-btn .nav-ring { position: absolute; inset: -3px; border-radius: 0.9rem; border: 1.5px solid transparent; pointer-events: none; transition: border-color 0.4s; }
.nav-btn.active .nav-ring { border-color: var(--accent-bright); }

/* ── Planet Layout & Side Panel ── */
#planet-layout { display: flex; flex-direction: column; gap: 0.85rem; width: 100%; }
#spacefarer-panel {
    display: flex; flex-direction: column; gap: 1rem; min-width: 0; width: 100%;
    padding: 1.15rem; border: 1px solid var(--border); border-radius: var(--radius);
    background: var(--card-bg); backdrop-filter: blur(18px);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.45);
}
.panel-indicators { display: flex; flex-wrap: wrap; gap: 0.5rem; padding-bottom: 0.85rem; border-bottom: 1px solid var(--border); }
.panel-indicator {
    display: flex; align-items: center; gap: 0.55rem; color: #94a3b8;
    font-family: 'Orbitron', monospace; font-size: 0.5rem; letter-spacing: 0.08em;
    padding: 0.45rem 0.65rem; border: 1px solid var(--border); border-radius: 999px;
    background: rgba(50, 74, 178, 0.07); cursor: pointer; transition: all 0.25s ease;
}
.panel-indicator:hover, .panel-indicator:focus-visible, .panel-indicator[aria-pressed="true"] {
    color: #e2e8f0; background: rgba(50, 74, 178, 0.2); border-color: var(--accent-bright);
    box-shadow: 0 0 14px rgba(50, 74, 178, 0.22);
}
.panel-indicator:focus-visible { outline: 2px solid var(--accent-bright); outline-offset: 2px; }
.panel-dot { flex: 0 0 8px; width: 8px; height: 8px; border-radius: 50%; }
.today-dot { background: #ff334f; box-shadow: 0 0 7px #ff334f, 0 0 14px rgba(255, 51, 79, 0.7); }
.update-dot { background: #38bdf8; box-shadow: 0 0 7px #38bdf8, 0 0 14px rgba(56, 189, 248, 0.65); }
.panel-section h2 { margin-bottom: 0.4rem; color: #c7d2fe; font-family: 'Orbitron', monospace; font-size: 0.62rem; letter-spacing: 0.08em; text-transform: uppercase; }
.panel-section p { color: #cbd5e1; font-size: 0.8rem; line-height: 1.7; }
.panel-section[hidden] { display: none; }
.panel-section .panel-tagline { margin-top: 0.25rem; color: #8190ad; font-family: 'Orbitron', monospace; font-size: 0.58rem; letter-spacing: 0.04em; }
.panel-section .panel-fact { margin-top: 0.65rem; padding-left: 0.65rem; border-left: 2px solid var(--accent-bright); }

@media (min-width: 1440px) {
    #app { width: calc(100vw - 592px); max-width: 1024px; }
    #spacefarer-panel {
        position: fixed; z-index: 5; top: 50%; right: 0; width: 272px;
        max-height: calc(100vh - 2rem); overflow-y: auto; transform: translateY(-50%);
    }
}

/* ── Planet Card ── */
#planet-card {
    width: 100%; border-radius: var(--radius); border: 1px solid var(--border);
    background: var(--card-bg); backdrop-filter: blur(18px); min-height: 440px;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
    position: relative; transition: border-color 0.8s ease, box-shadow 0.8s ease;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
}

/* ── Orbital Rings ── */
.orbital-ring { position: absolute; top: 50%; left: 50%; border-radius: 50%; border: 1px dashed currentColor; opacity: 0.15; pointer-events: none; transform: translate(-50%, -50%); animation: orbit-spin var(--ospeed) linear infinite; }
@keyframes orbit-spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }

/* ── Idle State ── */
#idle { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 2rem; }
#idle-ring { width: 7rem; height: 7rem; border-radius: 50%; border: 1.5px dashed rgba(50, 74, 178, 0.3); display: flex; align-items: center; justify-content: center; animation: orbit-spin 18s linear infinite; }
#idle-center { width: 2.4rem; height: 2.4rem; border-radius: 50%; border: 1.5px solid var(--accent-bright); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 24px var(--accent-glow); background: rgba(50, 74, 178, 0.08); }
#idle-dot { width: 0.6rem; height: 0.6rem; border-radius: 50%; background: #8fa3ff; animation: pulse-dot 1.8s ease-in-out infinite; }
#idle-label { font-family: 'Orbitron', monospace; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #94a3b8; }
#idle-sub { font-size: 0.75rem; color: #64748b; margin-top: -0.3rem; }

/* ── Loading ── */
#loading { display: none; position: absolute; inset: 0; flex-direction: column; align-items: center; justify-content: center; gap: 1.2rem; background: var(--card-bg); z-index: 10; backdrop-filter: blur(12px); border-radius: var(--radius); }
#spinner { width: 3.6rem; height: 3.6rem; border-radius: 50%; border: 2.5px solid transparent; border-top-color: var(--accent-bright); border-right-color: #38bdf8; animation: orbit-spin 0.7s linear infinite; }
#scanning-label { font-family: 'Orbitron', monospace; font-size: 0.6rem; letter-spacing: 0.3em; color: #94a3b8; }

/* ── Planet Content ── */
#planet-content { display: none; width: 100%; flex-direction: column; z-index: 2; animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@media (min-width: 640px) { #planet-content { flex-direction: row; } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

#planet-left { display: flex; align-items: center; justify-content: center; padding: 2rem 1.5rem; position: relative; flex-shrink: 0; }
@media (min-width: 640px) { #planet-left { width: 42%; padding: 2.5rem 1.5rem; } }
#planet-img-wrap { position: relative; flex-shrink: 0; cursor: pointer; transition: transform 0.3s ease; }
#planet-img-wrap:hover { transform: scale(1.03); }
#glow-outer { position: absolute; inset: -35%; border-radius: 50%; animation: glow-pulse 5s ease-in-out infinite; filter: blur(30px); opacity: 0.5; transition: background 0.8s ease; }
@keyframes glow-pulse { 0%, 100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.15); opacity: 0.7; } }
#planet-img { position: relative; z-index: 1; width: 10rem; height: 10rem; border-radius: 50%; object-fit: cover; display: block; transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: inset -12px -12px 28px rgba(0, 0, 0, 0.8), 0 8px 40px rgba(0, 0, 0, 0.5); border: 2px solid rgba(255, 255, 255, 0.06); }
@media (min-width: 480px) { #planet-img { width: 12rem; height: 12rem; } }
#planet-img-wrap:hover #planet-img { transform: scale(1.05) rotate(2deg); }

#type-badge { position: absolute; bottom: -0.6rem; left: 50%; transform: translateX(-50%); padding: 0.2rem 0.8rem; border-radius: 999px; font-family: 'Orbitron', monospace; font-size: 0.5rem; letter-spacing: 0.2em; text-transform: uppercase; border: 1px solid; white-space: nowrap; z-index: 3; background: #060b18; backdrop-filter: blur(4px); }

#planet-right { display: flex; flex-direction: column; justify-content: center; gap: 0.8rem; padding: 1rem 1.5rem 1.8rem; }
@media (min-width: 640px) { #planet-right { width: 58%; padding: 2rem 2.5rem 2rem 0.5rem; } }
#planet-meta { font-family: 'Orbitron', monospace; font-size: 0.55rem; letter-spacing: 0.3em; text-transform: uppercase; color: #64748b; }
#planet-name { font-family: 'Orbitron', monospace; font-size: clamp(1.8rem, 5vw, 2.8rem); font-weight: 900; letter-spacing: 0.04em; line-height: 1; color: #f3f4f6; }
#planet-tagline { font-family: 'Orbitron', monospace; font-size: 0.6rem; letter-spacing: 0.18em; color: #64748b; margin-top: 0.1rem; }
#planet-fact { font-size: 0.85rem; font-weight: 300; line-height: 1.6; color: #e2e8f0; border-left: 2.5px solid; padding-left: 0.85rem; transition: border-color 0.4s; }
#stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4rem; }
.stat-pill { display: flex; flex-direction: column; align-items: center; gap: 0.1rem; padding: 0.5rem 0.3rem; border-radius: 0.6rem; background: rgba(50, 74, 178, 0.08); border: 1px solid var(--border); }
.stat-label { font-family: 'Orbitron', monospace; font-size: 0.42rem; letter-spacing: 0.1em; text-transform: uppercase; color: #64748b; white-space: nowrap; }
.stat-value { font-size: 0.7rem; font-weight: 600; color: #f3f4f6; text-align: center; line-height: 1.2; }
#didyouknow { border-radius: 0.6rem; padding: 0.7rem 0.9rem; border: 1px solid; font-size: 0.78rem; color: #e2e8f0; line-height: 1.5; transition: border-color 0.4s, background 0.4s; }
#dyk-label { font-family: 'Orbitron', monospace; font-size: 0.5rem; letter-spacing: 0.2em; text-transform: uppercase; display: block; margin-bottom: 0.15rem; color: var(--accent-bright); }
#action-btns { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.1rem; }
.action-btn { font-family: 'Orbitron', monospace; font-size: 0.5rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.45rem 0.8rem; border-radius: 0.6rem; background: rgba(50, 74, 178, 0.08); border: 1px solid var(--border); color: #e2e8f0; cursor: pointer; transition: all 0.25s ease; backdrop-filter: blur(4px); }
.action-btn:hover { background: rgba(50, 74, 178, 0.25); border-color: var(--accent-bright); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(50, 74, 178, 0.2); }
.action-btn:active { transform: scale(0.95); }

/* ── Discover Button ── */
#discover-btn { font-family: 'Orbitron', monospace; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #fff; padding: 1rem 2.8rem; border: none; border-radius: 1rem; cursor: pointer; background: linear-gradient(135deg, #324ab2, #1a264a); border: 1px solid var(--accent-bright); box-shadow: 0 0 30px var(--accent-glow), 0 8px 30px rgba(0, 0, 0, 0.5); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; }
#discover-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.06) 100%); pointer-events: none; }
#discover-btn:hover { box-shadow: 0 0 60px rgba(50, 74, 178, 0.6), 0 10px 40px rgba(0, 0, 0, 0.6); transform: translateY(-4px) scale(1.02); background: linear-gradient(135deg, #4f68d9, #324ab2); }
#discover-btn:active { transform: translateY(0) scale(0.97); }

/* ── Overlay / Modal ── */
.overlay { position: fixed; inset: 0; z-index: 100; background: rgba(3, 7, 18, 0.88); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; padding: 1rem; opacity: 0; pointer-events: none; transition: opacity 0.35s ease; }
.overlay.active { opacity: 1; pointer-events: auto; }
.modal { background: #080d1a; border: 1px solid var(--border); border-radius: 1.25rem; max-width: 640px; width: 100%; max-height: 85vh; overflow-y: auto; padding: 2rem 1.75rem; position: relative; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px var(--accent-glow); transform: scale(0.94) translateY(12px); transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.overlay.active .modal { transform: scale(1) translateY(0); }
.modal-close { position: absolute; top: 1rem; right: 1rem; background: rgba(50, 74, 178, 0.08); border: 1px solid var(--border); color: #94a3b8; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; cursor: pointer; transition: all 0.25s; font-family: 'Inter', sans-serif; }
.modal-close:hover { color: #fff; background: rgba(50, 74, 178, 0.3); border-color: var(--accent-bright); }
.modal h2 { font-family: 'Orbitron', monospace; font-size: 1.1rem; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 1.2rem; color: #f3f4f6; }

/* ── Full-page About view ── */
body.about-open { overflow: hidden; }
body.about-open #app { display: none; }
.about-page[hidden] { display: none; }
.about-page { position: fixed; inset: 0; z-index: 200; overflow-y: auto; padding: clamp(1rem, 3vw, 2.5rem); background: radial-gradient(ellipse at 50% 0%, rgba(50, 74, 178, 0.19), transparent 58%), linear-gradient(180deg, rgba(3, 7, 18, 0.96), rgba(3, 7, 18, 0.99)); backdrop-filter: blur(16px); }
.about-page__inner { display: flex; flex-direction: column; width: min(100%, 1080px); min-height: calc(100vh - 2 * clamp(1rem, 3vw, 2.5rem)); margin: 0 auto; }
.about-page__back { position: sticky; top: 0.5rem; z-index: 1; align-self: flex-start; margin: 0 0 1.5rem; padding: 0.65rem 0.9rem; border: 1px solid var(--border); border-radius: 999px; background: rgba(8, 16, 36, 0.86); color: #cbd5e1; font: 500 0.8rem 'Inter', sans-serif; cursor: pointer; backdrop-filter: blur(12px); transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease; }
.about-page__back:hover, .about-page__back:focus-visible { color: #fff; border-color: var(--accent-bright); background: rgba(50, 74, 178, 0.24); }
.about-page__back:focus-visible { outline: 2px solid var(--accent-bright); outline-offset: 3px; }
.about-page__header { display: flex; flex-direction: column; align-items: flex-start; width: 100%; gap: 1rem; padding: clamp(1rem, 4vw, 3.25rem) 0 2.5rem; border-bottom: 1px solid var(--border); text-align: left; }
.about-page__eyebrow { color: #8fa3ff; font-family: 'Orbitron', monospace; font-size: 0.64rem; letter-spacing: 0.2em; }
.about-page__header h1 { width: 100%; font-size: clamp(2.4rem, 7vw, 4.6rem); text-align: left; }
.about-page__lead { max-width: 760px; color: #cbd5e1; font-size: clamp(1rem, 2vw, 1.25rem); font-weight: 300; line-height: 1.8; }
.about-page__details { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(1.25rem, 4vw, 3rem); padding: 2.5rem 0; }
.about-page__details section { padding-top: 1rem; border-top: 2px solid var(--accent-bright); }
.about-page__details h2 { margin-bottom: 0.8rem; color: #c7d2fe; font-family: 'Orbitron', monospace; font-size: 0.9rem; letter-spacing: 0.06em; text-transform: uppercase; }
.about-page__details p { color: #aab6cc; font-size: 0.9rem; line-height: 1.8; }
.about-page__inner footer { width: 100%; margin-top: auto; padding: 1.5rem 0 0.5rem; border-top: 1px solid var(--border); }
@media (max-width: 720px) {
    .about-page__details { grid-template-columns: 1fr; gap: 1.5rem; padding: 2rem 0; }
    .about-page__header { padding-top: 1rem; }
}

/* ── Badges, Quiz, Scale, Orbit Map, Particles, Footer ── */
.badge-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; border-radius: 0.75rem; background: rgba(50, 74, 178, 0.04); border: 1px solid var(--border); margin-bottom: 0.5rem; transition: all 0.3s; }
.badge-item.earned { background: rgba(50, 74, 178, 0.18); border-color: var(--accent-bright); box-shadow: 0 0 20px rgba(50, 74, 178, 0.1); }
.quiz-option { display: block; width: 100%; text-align: left; padding: 0.75rem 1.1rem; margin: 0.4rem 0; background: rgba(50, 74, 178, 0.06); border: 1px solid var(--border); border-radius: 0.75rem; cursor: pointer; font-size: 0.85rem; color: #e2e8f0; transition: all 0.2s; font-family: 'Inter', sans-serif; }
.quiz-option:hover:not(:disabled) { background: rgba(50, 74, 178, 0.2); border-color: var(--accent-bright); }
.quiz-option:disabled { cursor: default; opacity: 0.7; }
.quiz-option.correct { background: rgba(74, 222, 128, 0.18); border-color: #4ade80; color: #4ade80; }
.quiz-option.wrong { background: rgba(248, 113, 113, 0.18); border-color: #f87171; color: #f87171; }

.scale-row { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem; }
.scale-label { font-family: 'Orbitron', monospace; font-size: 0.6rem; width: 70px; text-align: right; color: #94a3b8; flex-shrink: 0; }
.scale-bar-wrap { flex: 1; height: 18px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; overflow: hidden; position: relative; }
.scale-bar { height: 100%; border-radius: 10px; transition: width 1s cubic-bezier(0.34, 1.56, 0.64, 1); min-width: 4px; }
.scale-val { position: absolute; right: 8px; top: 1px; font-size: 0.55rem; font-family: 'Orbitron', monospace; color: rgba(255, 255, 255, 0.8); }

.orbit-map-item { display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.9rem; background: rgba(50, 74, 178, 0.06); border-radius: 0.6rem; border-left: 4px solid; cursor: pointer; transition: all 0.25s; margin-bottom: 0.4rem; }
.orbit-map-item:hover { background: rgba(50, 74, 178, 0.18); transform: translateX(4px); }
.orbit-map-item .om-symbol { font-size: 1.1rem; }
.orbit-map-item .om-name { font-family: 'Orbitron', monospace; font-size: 0.75rem; flex: 1; margin-left: 0.6rem; }
.orbit-map-item .om-dist { font-size: 0.65rem; color: #94a3b8; font-family: 'Orbitron', monospace; }

.particle-container { position: fixed; inset: 0; pointer-events: none; z-index: 50; overflow: hidden; }
.particle { position: absolute; border-radius: 50%; pointer-events: none; animation: particle-fly var(--dur) ease-out forwards; }
@keyframes particle-fly { 0% { opacity: 1; transform: translate(0, 0) scale(1); } 100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); } }

footer { text-align: center; font-family: 'Orbitron', monospace; font-size: 0.6rem; letter-spacing: 0.2em; color: rgba(255, 243, 218, 1.0); line-height: 1.8; margin-top: 0.5rem; }

/* ── Responsive Tweaks ── */
@media (max-width: 480px) {
    #app { padding: 1rem 0.6rem 1.5rem; gap: 1rem; }
    #planet-card { min-height: 380px; }
    #planet-left { padding: 1.2rem 0.8rem; }
    #planet-img { width: 7rem; height: 7rem; }
    #planet-right { padding: 0.5rem 0.8rem 1.2rem; gap: 0.5rem; }
    #stats { grid-template-columns: repeat(3, 1fr); gap: 0.25rem; }
    .stat-pill { padding: 0.3rem 0.2rem; }
    .stat-value { font-size: 0.6rem; }
    .stat-label { font-size: 0.36rem; }
    #planet-fact { font-size: 0.75rem; padding-left: 0.6rem; }
    #didyouknow { font-size: 0.7rem; padding: 0.5rem 0.7rem; }
    .modal { padding: 1.5rem 1rem; }
    .tool-btn { font-size: 0.45rem; padding: 0.35rem 0.7rem; }
    .nav-btn { min-width: 44px; padding: 0.3rem 0.4rem; }
    .nav-btn .nav-symbol { font-size: 0.8rem; }
    .nav-btn .nav-name { font-size: 0.4rem; }
    #discover-btn { font-size: 0.6rem; padding: 0.7rem 1.8rem; }
    .action-btn { font-size: 0.42rem; padding: 0.35rem 0.6rem; }
    .scale-label { width: 50px; font-size: 0.5rem; }
    .scale-bar-wrap { height: 14px; }
    .scale-val { font-size: 0.45rem; top: 0; }
}
@media (min-width: 481px) and (max-width: 640px) {
    #planet-img { width: 9rem; height: 9rem; }
    #planet-left { padding: 1.5rem; }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STARFALL RUN — MINI-GAME STYLES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
#game-backdrop { position: fixed; inset: 0; z-index: 149; background: rgba(2, 6, 18, 0.84); backdrop-filter: blur(9px); opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
#game-backdrop.active { opacity: 1; pointer-events: auto; }
#game-panel {
    --sf-panel: rgba(7, 13, 31, 0.98); --sf-card: rgba(11, 19, 42, 0.82); --sf-border: rgba(143, 170, 240, 0.17);
    --sf-muted: #a5b2d0; --sf-cyan: #67e5ff; position: fixed; top: 50%; left: 50%; z-index: 150;
    width: min(94vw, 1120px); max-height: min(92dvh, 920px); overflow-y: auto; overscroll-behavior: contain;
    transform: translate(-50%, -50%) scale(0.97); display: flex; flex-direction: column; color: #edf6ff;
    background: radial-gradient(ellipse at 78% 2%, rgba(67, 87, 180, 0.12), transparent 34%), var(--sf-panel);
    border: 1px solid var(--sf-border); border-radius: 24px; box-shadow: 0 34px 100px rgba(0, 0, 0, 0.72), 0 0 48px rgba(77, 117, 255, 0.12);
    opacity: 0; pointer-events: none; transition: opacity 0.26s ease, transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
    scrollbar-color: rgba(121, 153, 215, 0.45) transparent; scrollbar-width: thin;
}
#game-panel.active { opacity: 1; pointer-events: auto; transform: translate(-50%, -50%) scale(1); }
#game-panel:focus { outline: none; }
.starfall-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; padding: 24px 26px 20px; border-bottom: 1px solid rgba(143, 170, 240, 0.14); }
.starfall-heading { min-width: 0; }
.starfall-eyebrow, .starfall-overlay-kicker, .starfall-stat > span, .starfall-card-heading h3, .starfall-card-heading > strong, .starfall-mode, .starfall-control-hints, .starfall-mission-meta, .starfall-runline { font-family: "Orbitron", monospace; letter-spacing: 0.08em; }
.starfall-eyebrow { display: flex; align-items: center; gap: 8px; margin: 0 0 8px; color: #9fadd0; font-size: 0.59rem; }
.starfall-eyebrow > span { width: 7px; height: 7px; border-radius: 50%; background: var(--sf-cyan); box-shadow: 0 0 12px rgba(103, 229, 255, 0.9); }
.starfall-heading h2 { margin: 0; color: #f5f8ff; font-family: "Orbitron", monospace; font-size: clamp(1.4rem, 3vw, 2rem); letter-spacing: 0.065em; line-height: 1.12; }
.starfall-subtitle { margin: 8px 0 0; color: var(--sf-muted); font-size: 0.82rem; line-height: 1.5; }
.starfall-header-actions { display: flex; align-items: center; gap: 9px; flex-shrink: 0; }
.starfall-mode, .starfall-icon-button { display: inline-flex; align-items: center; justify-content: center; min-height: 34px; border: 1px solid var(--sf-border); border-radius: 999px; background: rgba(19, 30, 61, 0.66); color: #d5e3ff; }
.starfall-mode { gap: 7px; padding: 0 11px; font-size: 0.55rem; white-space: nowrap; }
.starfall-mode.is-live::before { width: 7px; height: 7px; content: ""; border-radius: 50%; background: #68ffc0; box-shadow: 0 0 10px rgba(104, 255, 192, 0.8); }
.starfall-icon-button { width: 36px; padding: 0; cursor: pointer; font: 600 0.88rem "Orbitron", monospace; transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease; }
.starfall-icon-button[hidden] { display: none !important; }
.starfall-icon-button:hover { color: #fff; border-color: rgba(103, 229, 255, 0.5); background: rgba(44, 66, 124, 0.7); }
#game-close { border: 1px solid var(--sf-border); color: #d5e3ff; font-size: 1.35rem; }
.starfall-layout { display: grid; grid-template-columns: minmax(0, 1fr) 258px; align-items: start; gap: 16px; padding: 16px; }
.starfall-main { min-width: 0; }
.starfall-hud { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 9px; margin-bottom: 10px; }
.starfall-stat, .starfall-card { min-width: 0; border: 1px solid rgba(143, 170, 240, 0.14); border-radius: 15px; background: var(--sf-card); }
.starfall-stat { min-height: 62px; display: flex; flex-direction: column; justify-content: center; gap: 6px; padding: 10px 12px; }
.starfall-stat > span { color: #93a2c3; font-size: 0.5rem; }
.starfall-stat > strong { color: #71eaff; font: 700 0.92rem "Orbitron", monospace; line-height: 1.2; }
.starfall-stat:nth-child(2) > strong { color: #ffd46f; }
.starfall-stat:nth-child(3) > strong { color: #f3f7ff; white-space: nowrap; }
.starfall-stat:nth-child(3) > strong span { color: #aab9d7; font-size: 0.63rem; }
.starfall-stat:nth-child(4) > strong { display: flex; gap: 4px; color: #ff729b; font-size: 1rem; }
.game-heart.is-lost { color: #47516a; opacity: 0.55; }
.starfall-arena { position: relative; height: clamp(300px, 47vh, 490px); min-height: 300px; overflow: hidden; border: 1px solid rgba(133, 162, 239, 0.2); border-radius: 17px; background: #070d20; box-shadow: inset 0 0 42px rgba(20, 48, 100, 0.14); }
.starfall-canvas { display: block; width: 100%; height: 100%; touch-action: none; }
.starfall-overlay { position: absolute; inset: 0; display: grid; place-items: center; padding: 20px; background: rgba(4, 8, 23, 0.4); opacity: 0; pointer-events: none; transition: opacity 0.22s ease; }
.starfall-overlay.active { opacity: 1; pointer-events: auto; }
.starfall-overlay-card { width: min(100%, 420px); padding: 28px; border: 1px solid rgba(149, 172, 240, 0.24); border-radius: 20px; background: rgba(8, 15, 36, 0.91); box-shadow: 0 20px 65px rgba(0, 0, 0, 0.32), 0 0 42px rgba(74, 113, 255, 0.08); backdrop-filter: blur(16px); text-align: center; }
.starfall-overlay-icon { width: 56px; height: 56px; display: grid; place-items: center; margin: 0 auto 17px; border: 1px solid rgba(103, 229, 255, 0.31); border-radius: 17px; background: rgba(51, 119, 167, 0.13); color: var(--sf-cyan); font-size: 1.75rem; box-shadow: inset 0 0 24px rgba(79, 213, 255, 0.06); }
.starfall-overlay-kicker { margin: 0 0 8px; color: var(--sf-cyan); font-size: 0.55rem; }
.starfall-overlay-card h3 { margin: 0; color: #f8faff; font: 700 clamp(1.2rem, 3vw, 1.55rem) "Orbitron", monospace; letter-spacing: 0.015em; }
.starfall-overlay-copy { max-width: 350px; margin: 12px auto 17px; color: #b0bdd9; font-size: 0.8rem; line-height: 1.62; }
.starfall-control-hints { display: flex; justify-content: center; flex-wrap: wrap; gap: 6px; margin: 0 0 17px; }
.starfall-control-hints[hidden] { display: none; }
.starfall-control-hints span { padding: 6px 8px; border: 1px solid rgba(153, 174, 227, 0.2); border-radius: 8px; color: #a9b7d2; font-size: 0.49rem; white-space: nowrap; }
.starfall-launch-button { min-width: 160px; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; gap: 12px; padding: 0 18px; border: 1px solid rgba(160, 184, 255, 0.42); border-radius: 12px; background: linear-gradient(135deg, #485ce4, #4e94ea); color: #fff; box-shadow: 0 8px 25px rgba(70, 99, 232, 0.32); cursor: pointer; font: 700 0.62rem "Orbitron", monospace; letter-spacing: 0.07em; text-transform: uppercase; transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease; }
.starfall-launch-button:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 12px 30px rgba(70, 118, 247, 0.42); }
.starfall-launch-button span { font-size: 1rem; }
.starfall-toast { position: absolute; top: 16px; left: 50%; z-index: 2; padding: 9px 13px; transform: translate(-50%, -8px); border: 1px solid rgba(103, 229, 255, 0.32); border-radius: 999px; background: rgba(8, 18, 40, 0.88); color: #aaf3ff; font: 700 0.55rem "Orbitron", monospace; letter-spacing: 0.06em; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s ease, transform 0.2s ease; }
.starfall-toast.active { transform: translate(-50%, 0); opacity: 1; }
.starfall-runline { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 3px 0; color: #8c9bb9; font-size: 0.52rem; }
.starfall-runline strong { color: #d5e5ff; font-weight: 700; }
.starfall-sidebar { display: grid; gap: 10px; }
.starfall-card { padding: 15px; }
.starfall-card-heading { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 11px; }
.starfall-card-heading h3 { margin: 0; color: #e8f1ff; font-size: 0.57rem; }
.starfall-card-heading > strong { color: var(--sf-cyan); font-size: 0.53rem; white-space: nowrap; }
.starfall-mission > p:not(.starfall-mission-done) { margin: 0 0 12px; color: #a7b4cf; font-size: 0.72rem; line-height: 1.55; }
.starfall-progress-track { height: 7px; overflow: hidden; border: 1px solid rgba(158, 179, 229, 0.17); border-radius: 999px; background: rgba(3, 8, 21, 0.7); }
.starfall-progress-track > span { width: 0; height: 100%; display: block; border-radius: inherit; background: linear-gradient(90deg, #536dff, #69efff); box-shadow: 0 0 12px rgba(102, 223, 255, 0.56); transition: width 0.24s ease; }
.starfall-mission-meta { display: flex; justify-content: space-between; gap: 8px; margin-top: 8px; color: #8594b2; font-size: 0.45rem; }
.starfall-mission-done { margin: 9px 0 0; color: #84ffd1; font: 700 0.48rem "Orbitron", monospace; letter-spacing: 0.06em; }
.starfall-mission-done[hidden] { display: none; }
.starfall-shield-card .starfall-card-heading { margin-bottom: 10px; }
.starfall-charge-track > span { background: linear-gradient(90deg, #6378ff, #66edff); }
.starfall-burst-button { width: 100%; min-height: 42px; display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 11px; padding: 0 11px; border: 1px solid rgba(102, 164, 214, 0.2); border-radius: 11px; background: rgba(28, 57, 92, 0.31); color: #aec1e3; cursor: pointer; font: 600 0.52rem "Orbitron", monospace; letter-spacing: 0.045em; transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease; }
.starfall-burst-button strong { color: #7beaff; font-size: 0.48rem; }
.starfall-burst-button:disabled { cursor: not-allowed; opacity: 0.72; }
.starfall-burst-button:not(:disabled) { border-color: rgba(105, 231, 255, 0.58); background: rgba(45, 115, 155, 0.31); color: #edfcff; box-shadow: 0 0 22px rgba(78, 212, 255, 0.12); }
.starfall-control-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 5px 0; color: #aab6d0; font-size: 0.64rem; }
.starfall-control-row kbd { padding: 4px 7px; border: 1px solid rgba(151, 174, 230, 0.17); border-radius: 6px; background: rgba(22, 32, 60, 0.55); color: #d8e4ff; font: 600 0.48rem "Orbitron", monospace; }
.starfall-streak-row { margin-top: 6px; padding-top: 10px; border-top: 1px solid rgba(143, 170, 240, 0.12); }
.starfall-streak-row strong { color: #ffd46f; font: 700 0.62rem "Orbitron", monospace; }
.starfall-sidebar-note { margin: 0; padding: 0 3px; color: #8998b7; font-size: 0.62rem; line-height: 1.55; }
.starfall-icon-button:focus-visible, .starfall-launch-button:focus-visible, .starfall-burst-button:focus-visible { outline: 2px solid #79edff; outline-offset: 3px; }

@media (max-width: 760px) {
    #game-panel { width: min(96vw, 680px); max-height: 95dvh; border-radius: 19px; }
    .starfall-header { padding: 19px 19px 16px; }
    .starfall-layout { grid-template-columns: minmax(0, 1fr); gap: 12px; padding: 12px; }
    .starfall-arena { height: min(42dvh, 370px); min-height: 270px; }
    .starfall-sidebar { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .starfall-mission, .starfall-sidebar-note { grid-column: 1 / -1; }
}
@media (max-width: 480px) {
    .starfall-header { gap: 10px; padding: 16px 14px 13px; }
    .starfall-eyebrow { font-size: 0.48rem; }
    .starfall-subtitle { max-width: 250px; font-size: 0.72rem; }
    .starfall-header-actions { gap: 5px; }
    .starfall-mode { min-height: 30px; padding: 0 7px; font-size: 0.45rem; }
    .starfall-icon-button { width: 31px; min-height: 31px; }
    .starfall-layout { padding: 10px; }
    .starfall-hud { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; }
    .starfall-stat { min-height: 57px; padding: 9px 10px; }
    .starfall-arena { height: min(41dvh, 350px); min-height: 250px; }
    .starfall-overlay { padding: 12px; }
    .starfall-overlay-card { padding: 20px 16px; }
    .starfall-overlay-icon { width: 47px; height: 47px; margin-bottom: 13px; }
    .starfall-overlay-copy { font-size: 0.72rem; }
    .starfall-runline { flex-wrap: wrap; gap: 7px 12px; font-size: 0.46rem; }
    .starfall-sidebar { grid-template-columns: minmax(0, 1fr); }
    .starfall-mission, .starfall-sidebar-note { grid-column: auto; }
}
@media (prefers-reduced-motion: reduce) {
    #game-panel, #game-backdrop, .starfall-overlay, .starfall-toast, .starfall-progress-track > span, .starfall-launch-button, .starfall-icon-button, .starfall-burst-button { transition-duration: 0.01ms; }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   QUVIX AI — FLOATING ASSISTANT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
#quvix-btn {
    position: fixed; bottom: 1.5rem; left: 1.5rem; z-index: 90; width: 72px; height: 72px;
    border-radius: 50%; border: 1.5px solid rgba(199, 125, 255, 0.7);
    background: radial-gradient(circle at 30% 30%, rgba(0.199, 125, 255, 15), transparent 60%), linear-gradient(135deg, #6C3BAA, #4a2578); /* FIXED RGBA TYPO */
    color: #ffffff; cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-family: 'Orbitron', monospace; font-weight: 900; font-size: 1.05rem; letter-spacing: 0.08em;
    box-shadow: 0 0 25px rgba(108, 59, 170, 0.8), 0 0 60px rgba(108, 59, 170, 0.4), inset 0 0 15px rgba(199, 125, 255, 0.3);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
    animation: quvix-pulse 3.5s ease-in-out infinite; text-shadow: 0 0 12px rgba(199, 125, 255, 0.9); user-select: none;
}
@keyframes quvix-pulse {
    0%, 100% { box-shadow: 0 0 25px rgba(108, 59, 170, 0.8), 0 0 60px rgba(108, 59, 170, 0.4), inset 0 0 15px rgba(199, 125, 255, 0.3); }
    50% { box-shadow: 0 0 35px rgba(199, 125, 255, 0.9), 0 0 90px rgba(108, 59, 170, 0.6), inset 0 0 20px rgba(199, 125, 255, 0.5); }
}
#quvix-btn:hover { transform: scale(1.1); box-shadow: 0 0 45px rgba(199, 125, 255, 1), 0 0 100px rgba(108, 59, 170, 0.7), inset 0 0 20px rgba(199, 125, 255, 0.6); }
#quvix-btn.open { animation: none; transform: scale(0.85); background: linear-gradient(135deg, #4a2578, #2d1750); border-color: rgba(199, 125, 255, 0.4); }

#quvix-panel {
    position: fixed; bottom: 6.5rem; left: 1.5rem; z-index: 95; width: 390px; max-width: calc(100vw - 3rem);
    height: 560px; max-height: calc(100vh - 9rem); border-radius: 1.25rem; border: 1px solid rgba(108, 59, 170, 0.45);
    background: rgba(8, 11, 18, 0.96); backdrop-filter: blur(20px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 60px rgba(108, 59, 170, 0.25);
    display: flex; flex-direction: column; overflow: hidden; opacity: 0; pointer-events: none;
    transform: translateY(20px) scale(0.94); transform-origin: bottom left;
    transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
#quvix-panel.active { opacity: 1; pointer-events: auto; transform: translateY(0) scale(1); }

#quvix-panel .qv-header { display: flex; align-items: center; gap: 10px; padding: 14px 18px; background: rgba(108, 59, 170, 0.08); border-bottom: 1px solid rgba(108, 59, 170, 0.25); }
#quvix-panel .qv-logo { font-size: 24px; color: #c77dff; text-shadow: 0 0 15px rgba(199, 125, 255, 0.6); line-height: 1; }
#quvix-panel .qv-header-text { display: flex; flex-direction: column; flex: 1; }
#quvix-panel .qv-title { font-family: 'Orbitron', monospace; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: #e0d4ff; text-shadow: 0 0 12px rgba(199, 125, 255, 0.4); }
#quvix-panel .qv-sub { font-size: 11px; color: rgba(199, 125, 255, 0.6); margin-top: 1px; letter-spacing: 0.03em; }
#quvix-panel .qv-status { width: 8px; height: 8px; border-radius: 50%; background: #00e5ff; box-shadow: 0 0 12px rgba(0, 229, 255, 0.8); animation: quvix-dot 2.5s ease-in-out infinite; }
@keyframes quvix-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
#quvix-panel .qv-close { background: none; border: none; color: #94a3b8; font-size: 1.4rem; cursor: pointer; padding: 0 4px; line-height: 1; transition: color 0.2s; }
#quvix-panel .qv-close:hover { color: #c77dff; }

#quvix-panel .qv-quick { display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 14px; border-bottom: 1px solid rgba(108, 59, 170, 0.15); background: rgba(108, 59, 170, 0.03); }
#quvix-panel .qv-qbtn { padding: 4px 12px; border-radius: 20px; cursor: pointer; border: 1px solid rgba(199, 125, 255, 0.3); background: rgba(108, 59, 170, 0.12); color: rgba(220, 200, 255, 0.9); font-size: 11px; font-family: 'Inter', sans-serif; transition: all 0.2s ease; }
#quvix-panel .qv-qbtn:hover { background: rgba(108, 59, 170, 0.3); border-color: rgba(199, 125, 255, 0.7); color: #ffffff; box-shadow: 0 0 15px rgba(108, 59, 170, 0.3); transform: translateY(-1px); }

#quvix-panel .qv-chat { flex: 1; overflow-y: auto; padding: 16px 14px; display: flex; flex-direction: column; gap: 12px; scrollbar-width: thin; scrollbar-color: rgba(108, 59, 170, 0.4) transparent; position: relative; }
#quvix-panel .qv-chat::-webkit-scrollbar { width: 5px; }
#quvix-panel .qv-chat::-webkit-scrollbar-track { background: transparent; }
#quvix-panel .qv-chat::-webkit-scrollbar-thumb { background: rgba(108, 59, 170, 0.6); border-radius: 10px; }
#quvix-panel .qv-chat::-webkit-scrollbar-thumb:hover { background: rgba(199, 125, 255, 0.7); }

#qv-welcome { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; padding: 20px 30px; border-radius: 20px; background: rgba(108, 59, 170, 0.08); border: 1px solid rgba(199, 125, 255, 0.2); box-shadow: 0 0 40px rgba(108, 59, 170, 0.15); animation: qv-float 4s ease-in-out infinite; width: 80%; max-width: 260px; }
#qv-welcome h1 { font-family: 'Orbitron', monospace; font-size: 1.2rem; letter-spacing: 0.06em; background: linear-gradient(135deg, #324ab2, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 15px rgba(199, 125, 255, 0.4)); }
#qv-welcome p { font-size: 0.75rem; color: rgba(199, 125, 255, 0.7); margin-top: 4px; }
@keyframes qv-float { 50% { transform: translate(-50%, -56%); } }

#quvix-panel .qv-msg-wrap { display: flex; gap: 8px; animation: qv-fadeUp 0.25s ease; }
#quvix-panel .qv-msg-wrap.qv-user { flex-direction: row-reverse; }
@keyframes qv-fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
#quvix-panel .qv-avatar { width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; margin-top: 2px; background: linear-gradient(135deg, #7B2FBE, #C77DFF); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: white; box-shadow: 0 0 12px rgba(130, 80, 210, 0.4); font-family: 'Inter', sans-serif; }
#quvix-panel .qv-msg-content { display: flex; flex-direction: column; gap: 2px; max-width: 78%; }
#quvix-panel .qv-msg-wrap.qv-user .qv-msg-content { align-items: flex-end; }
#quvix-panel .qv-bubble { padding: 9px 14px; border-radius: 14px; font-size: 13px; line-height: 1.55; border: 1px solid rgba(255, 255, 255, 0.04); font-family: 'Inter', sans-serif; user-select: none; }
#quvix-panel .qv-bubble.qv-ai { background: rgba(108, 59, 170, 0.85); color: #f2edff; border-bottom-left-radius: 4px; border-left: 2px solid rgba(199, 125, 255, 0.4); box-shadow: 0 2px 15px rgba(130, 80, 210, 0.25); }
#quvix-panel .qv-bubble.qv-user { background: linear-gradient(135deg, #00B4D8, #0077B6); color: #ffffff; border-bottom-right-radius: 4px; box-shadow: 0 2px 15px rgba(0, 180, 216, 0.3); border-right: 2px solid rgba(0, 229, 255, 0.3); }
#quvix-panel .qv-ts { font-size: 9px; color: rgba(199, 125, 255, 0.4); padding: 0 2px; font-family: 'Inter', sans-serif; }

#quvix-panel .qv-typing-bub { display: flex; align-items: center; gap: 5px; padding: 12px 15px; min-width: 50px; }
#quvix-panel .qv-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(199, 125, 255, 0.9); animation: qv-bounce 1.2s ease-in-out infinite; }
#quvix-panel .qv-dot:nth-child(2) { animation-delay: 0.2s; }
#quvix-panel .qv-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes qv-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-5px); opacity: 1; } }

#quvix-panel .qv-input-area { display: flex; gap: 8px; padding: 12px 14px; background: rgba(108, 59, 170, 0.04); border-top: 1px solid rgba(108, 59, 170, 0.15); }
#quvix-panel #qv-input { flex: 1; padding: 10px 16px; border-radius: 24px; outline: none; border: 1px solid rgba(199, 125, 255, 0.25); background: rgba(0, 0, 0, 0.4); color: #e8e0ff; font-size: 13px; font-family: 'Inter', sans-serif; transition: all 0.25s ease; }
#quvix-panel #qv-input::placeholder { color: rgba(199, 125, 255, 0.4); }
#quvix-panel #qv-input:focus { border-color: rgba(199, 125, 255, 0.7); box-shadow: 0 0 0 3px rgba(108, 59, 170, 0.15), 0 0 20px rgba(108, 59, 170, 0.1); }
#quvix-panel #qv-send { width: 40px; height: 40px; border-radius: 50%; border: none; cursor: pointer; background: linear-gradient(135deg, #7B2FBE, #9B5FE8); color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s ease; box-shadow: 0 2px 12px rgba(130, 80, 210, 0.4); font-size: 14px; }
#quvix-panel #qv-send:hover:not(:disabled) { transform: scale(1.08) rotate(-5deg); box-shadow: 0 4px 20px rgba(130, 80, 210, 0.6); }
#quvix-panel #qv-send:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }

#quvix-panel .qv-footer { padding: 8px 12px; text-align: center; font-size: 10px; color: rgba(199, 125, 255, 0.7); border-top: 1px solid rgba(108, 59, 170, 0.1); font-family: 'Inter', sans-serif; letter-spacing: 0.02em; }

@media (max-width: 520px) {
    #quvix-panel { width: calc(100vw - 2rem); left: 1rem; bottom: 5.5rem; height: 70vh; max-height: 70vh; }
    #quvix-btn { width: 56px; height: 56px; bottom: 1rem; left: 1rem; }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MUSIC TOGGLE — Glassmorphic Neon Red
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
#musicBtn {
    position: fixed; top: 1.5rem; right: 1.5rem; z-index: 90; padding: 0.65rem 1.25rem; border-radius: 999px;
    font-family: 'Orbitron', monospace; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.18em;
    text-transform: uppercase; color: #ffe4ea; cursor: pointer; overflow: hidden;
    background: linear-gradient(135deg, rgba(255, 7, 58, 0.22) 0%, rgba(255, 7, 58, 0.06) 100%);
    backdrop-filter: blur(14px) saturate(180%); -webkit-backdrop-filter: blur(14px) saturate(180%);
    border: 1px solid rgba(255, 7, 58, 0.65);
    box-shadow: 0 0 18px rgba(255, 7, 58, 0.45), 0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.18), inset 0 -1px 0 rgba(255, 7, 58, 0.25);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
    text-shadow: 0 0 10px rgba(255, 7, 58, 0.85); display: inline-flex; align-items: center; gap: 0.45rem; user-select: none;
}
#musicBtn::before { content: ''; position: absolute; inset: 0; border-radius: inherit; background: radial-gradient(circle at 30% 15%, rgba(255, 255, 255, 0.22), transparent 55%); pointer-events: none; }
#musicBtn::after { content: ''; position: absolute; inset: -2px; border-radius: inherit; background: radial-gradient(circle at 50% 50%, rgba(255, 7, 58, 0.4), transparent 70%); opacity: 0; transition: opacity 0.3s ease; pointer-events: none; z-index: -1; }
#musicBtn:hover {
    background: linear-gradient(135deg, rgba(255, 7, 58, 0.38) 0%, rgba(255, 7, 58, 0.15) 100%);
    border-color: #FF073A; color: #ffffff; transform: translateY(-3px) scale(1.04);
    box-shadow: 0 0 35px rgba(255, 7, 58, 0.85), 0 0 65px rgba(255, 7, 58, 0.35), 0 12px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(255, 7, 58, 0.35);
    text-shadow: 0 0 15px rgba(255, 7, 58, 1);
}
#musicBtn:hover::after { opacity: 1; }
#musicBtn:active { transform: translateY(0) scale(0.96); }
#musicBtn.playing {
    border-color: #FF073A; background: linear-gradient(135deg, rgba(255, 7, 58, 0.32) 0%, rgba(255, 7, 58, 0.10) 100%);
    animation: music-pulse 2.4s ease-in-out infinite;
}
@keyframes music-pulse {
    0%, 100% { box-shadow: 0 0 18px rgba(255, 7, 58, 0.5), 0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.18); }
    50% { box-shadow: 0 0 40px rgba(255, 7, 58, 0.95), 0 0 80px rgba(255, 7, 58, 0.45), 0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25); }
}
@media (max-width: 520px) {
    #musicBtn { top: 1rem; right: 1rem; padding: 0.5rem 0.9rem; font-size: 0.5rem; letter-spacing: 0.12em; }
}
