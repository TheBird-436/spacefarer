// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  AUDIO FX
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class AudioFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }
    init() {
        if (!this.ctx) {
            this.ctx = new(window.AudioContext || window.webkitAudioContext)();
        }
    }
    play(freq = 440, type = 'sine', dur = 0.15, vol = 0.08) {
        if (!this.enabled) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(vol, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + dur);
        } catch (_) {}
    }
    warp() {
        if (!this.enabled) return;
        this.init();
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(120, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.35);
            gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.4);
        } catch (_) {}
    }
    success() {
        this.play(880, 'triangle', 0.2, 0.06);
        setTimeout(() => this.play(1100, 'triangle', 0.25, 0.05), 150);
    }
    error() {
        this.play(200, 'sawtooth', 0.3, 0.05);
    }
    click() {
        this.play(600, 'sine', 0.08, 0.04);
    }
}
const audio = new AudioFX();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  PLANET DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const PLANETS = [{
    name: "Mercury", symbol: "☿", tagline: "The Swift Messenger", index: 1, type: "Terrestrial",
    fact: "Mercury has the shortest orbital year (88 days) and travels through space at an astonishing 47 km/s.",
    facts: ["Surface temperatures swing from -180°C at night to 430°C in daylight.", "Has no substantial atmosphere, leaving its surface heavily cratered.", "A huge iron core accounts for nearly 85% of the planet's radius."],
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg", color: "#94a3b8", glow: "rgba(148,163,184,0.4)",
    diameterNum: 4879, diameter: "4,879 km", moons: "0 moons", year: "88 Earth days", temp: "430°C / -180°C", gravity: "3.7 m/s²", distance: "57.9M km",
    moonsList: [], atmosphere: "Trace Exosphere (Helium, Sodium, Oxygen)", composition: "Metallic iron core, silicate mantle & crust",
    quiz: [{ q: "How fast does Mercury orbit the Sun?", options: ["~47 km/s", "~12 km/s", "~100 km/s"], answer: 0 }, { q: "What % of Mercury's radius is its iron core?", options: ["25%", "50%", "85%"], answer: 2 }]
}, {
    name: "Venus", symbol: "♀", tagline: "The Veiled Inferno", index: 2, type: "Terrestrial",
    fact: "Venus spins backwards and one day is longer than its year.",
    facts: ["Hottest planet (465°C avg) due to runaway CO₂ greenhouse effect.", "Surface pressure equals being 900m underwater on Earth.", "Thick sulfuric-acid clouds obscure a volcanic surface."],
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg", color: "#e8c97a", glow: "rgba(232,201,122,0.4)",
    diameterNum: 12104, diameter: "12,104 km", moons: "0 moons", year: "225 Earth days", temp: "465°C", gravity: "8.87 m/s²", distance: "108.2M km",
    moonsList: [], atmosphere: "96.5% CO₂, 3.5% Nitrogen", composition: "Iron core, rocky mantle, volcanic crust",
    quiz: [{ q: "Why is Venus hotter than Mercury?", options: ["Stronger Solar Flares", "Runaway CO₂ Greenhouse", "Internal Nuclear Core"], answer: 1 }]
}, {
    name: "Earth", symbol: "♁", tagline: "The Blue Oasis", index: 3, type: "Terrestrial",
    fact: "Earth is the densest planet and the only world confirmed to sustain life.",
    facts: ["A powerful magnetosphere shields life from solar radiation.", "Active plate tectonics continuously recycle the crust.", "Our large moon stabilizes the axial tilt, preventing extreme swings."],
    image: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg", color: "#38bdf8", glow: "rgba(56,189,248,0.4)",
    diameterNum: 12742, diameter: "12,742 km", moons: "1 moon", year: "365.25 days", temp: "15°C avg", gravity: "9.81 m/s²", distance: "149.6M km",
    moonsList: ["The Moon (Luna)"], atmosphere: "78% N₂, 21% O₂, 1% Ar", composition: "Solid inner iron core, liquid outer iron core, silicate mantle & crust",
    quiz: [{ q: "What protects Earth's surface from cosmic rays?", options: ["Ozone Layer", "Magnetosphere", "Ocean Currents"], answer: 1 }]
}, {
    name: "Mars", symbol: "♂", tagline: "The Red Frontier", index: 4, type: "Terrestrial",
    fact: "Mars hosts Olympus Mons, a volcano three times taller than Everest.",
    facts: ["Iron oxide (rust) gives Mars its iconic red colour.", "Valles Marineris is a canyon system spanning a quarter of the planet.", "Two tiny irregular moons are likely captured asteroids."],
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg", color: "#f87171", glow: "rgba(248,113,113,0.4)",
    diameterNum: 6779, diameter: "6,779 km", moons: "2 moons", year: "687 Earth days", temp: "-65°C avg", gravity: "3.72 m/s²", distance: "227.9M km",
    moonsList: ["Phobos", "Deimos"], atmosphere: "95% CO₂, 2.6% N₂, 1.9% Ar", composition: "Dense iron/sulfur core, silicate mantle, basaltic crust",
    quiz: [{ q: "How tall is Olympus Mons?", options: ["8 km", "25 km", "50 km"], answer: 1 }]
}, {
    name: "Jupiter", symbol: "♃", tagline: "The Gas Titan", index: 5, type: "Gas Giant",
    fact: "Jupiter is more massive than all other planets combined.",
    facts: ["The Great Red Spot is a storm wider than Earth that has raged for centuries.", "Has the fastest rotation — under 10 hours for one day.", "Its magnetic field extends nearly 7 million km toward the Sun."],
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg", color: "#fb923c", glow: "rgba(251,146,60,0.4)",
    diameterNum: 139820, diameter: "139,820 km", moons: "95 moons", year: "11.9 Earth yrs", temp: "-110°C avg", gravity: "24.79 m/s²", distance: "778.5M km",
    moonsList: ["Io", "Europa", "Ganymede", "Callisto", "Amalthea"], atmosphere: "89% H₂, 10% He", composition: "Liquid metallic hydrogen layers around a rocky/ice core",
    quiz: [{ q: "How long is a day on Jupiter?", options: ["~10 Hours", "24 Hours", "7 Days"], answer: 0 }]
}, {
    name: "Saturn", symbol: "♄", tagline: "The Ringed Sovereign", index: 6, type: "Gas Giant",
    fact: "Saturn's rings span 282,000 km but are only ~10 m thick.",
    facts: ["Least dense planet — it could float in water.", "Titan has a thick nitrogen atmosphere and methane lakes.", "A bizarre hexagonal storm swirls around the north pole."],
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg", color: "#fde047", glow: "rgba(253,224,71,0.4)",
    diameterNum: 116460, diameter: "116,460 km", moons: "146 moons", year: "29.5 Earth yrs", temp: "-140°C avg", gravity: "10.44 m/s²", distance: "1.43B km",
    moonsList: ["Titan", "Enceladus", "Mimas", "Rhea", "Iapetus", "Dione"], atmosphere: "96% H₂, 3% He", composition: "Liquid hydrogen & helium wrapping a rocky core",
    quiz: [{ q: "What's unique about Saturn's density?", options: ["Density lower than water", "Zero gravity", "Solid gold core"], answer: 0 }]
}, {
    name: "Uranus", symbol: "⛢", tagline: "The Sideways Realm", index: 7, type: "Ice Giant",
    fact: "Uranus rotates tilted at 98°, giving 21-year-long seasons.",
    facts: ["Methane gas gives it a pristine cyan colour.", "Holds the record for coldest atmospheric temp (-224°C).", "Has 13 dark, faint planetary rings."],
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg", color: "#22d3ee", glow: "rgba(34,211,238,0.4)",
    diameterNum: 50724, diameter: "50,724 km", moons: "28 moons", year: "84 Earth yrs", temp: "-195°C avg", gravity: "8.87 m/s²", distance: "2.87B km",
    moonsList: ["Titania", "Oberon", "Umbriel", "Ariel", "Miranda"], atmosphere: "83% H₂, 15% He, 2% CH₄", composition: "Hot dense mantle of water, ammonia & methane ice around a rocky core",
    quiz: [{ q: "What's unusual about Uranus's rotation?", options: ["It rotates sideways (98° tilt)", "It does not rotate", "It changes direction yearly"], answer: 0 }]
}, {
    name: "Neptune", symbol: "♆", tagline: "The Windswept Abyss", index: 8, type: "Ice Giant",
    fact: "Neptune has the fastest winds in the solar system — 2,100 km/h.",
    facts: ["Takes 165 Earth years to orbit the Sun.", "Triton has cryovolcanoes spouting nitrogen ice.", "Radiates 2.6× more internal heat than it receives from the Sun."],
    image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg", color: "#324ab2", glow: "rgba(50,74,178,0.6)",
    diameterNum: 49244, diameter: "49,244 km", moons: "16 moons", year: "165 Earth yrs", temp: "-200°C avg", gravity: "11.15 m/s²", distance: "4.50B km",
    moonsList: ["Triton", "Proteus", "Nereid", "Larissa"], atmosphere: "80% H₂, 19% He, 1% CH₄", composition: "Fluid mantle of water, ammonia & methane ice over a rocky silicate core",
    quiz: [{ q: "How fast are Neptune's winds?", options: ["500 km/h", "1,200 km/h", "2,100 km/h"], answer: 2 }]
}];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  STATE & STARFIELD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let currentIndex = null;
let visited = new Set();
let xp = 0;
let level = 1;

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
}

function initStars() {
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 2600);
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.4, alpha: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.008 + 0.003, drift: Math.random() * 0.0004 - 0.0002
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
        s.alpha += s.speed * (Math.sin(Date.now() * s.drift * 10) * 0.5 + 0.5);
        if (s.alpha > 1) s.alpha = 1;
        if (s.alpha < 0.05) s.alpha = 0.05;
        const a = 0.15 + 0.85 * s.alpha;
        ctx.fillStyle = `rgba(224, 231, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}
window.addEventListener("resize", resizeCanvas);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  PARTICLES & UI REFS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function burstParticles(x, y, color, count = 40) {
    const container = document.getElementById("particles");
    for (let i = 0; i < count; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        const size = Math.random() * 6 + 2;
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 180 + 60;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        const dur = Math.random() * 0.8 + 0.5;
        p.style.cssText = `left:${x}px; top:${y}px; width:${size}px; height:${size}px; background:${color}; --tx:${tx}px; --ty:${ty}px; --dur:${dur}s; box-shadow: 0 0 ${size * 2}px ${color};`;
        container.appendChild(p);
        setTimeout(() => p.remove(), dur * 1000);
    }
}

const nav = document.getElementById("navigator");
const card = document.getElementById("planet-card");
const idleEl = document.getElementById("idle");
const loadingEl = document.getElementById("loading");
const contentEl = document.getElementById("planet-content");
const imgEl = document.getElementById("planet-img");
const glowEl = document.getElementById("glow-outer");
const ring1 = document.getElementById("ring1");
const ring2 = document.getElementById("ring2");
const ring3 = document.getElementById("ring3");
const discoverBtn = document.getElementById("discover-btn");
const overlay = document.getElementById("overlay");
const modalBody = document.getElementById("modal-body");
const xpLabel = document.getElementById("xp-label");
const xpBar = document.getElementById("xp-bar-inner");
const xpLevel = document.getElementById("xp-level");

function initNav() {
    nav.innerHTML = "";
    PLANETS.forEach((p, idx) => {
        const btn = document.createElement("button");
        btn.className = "nav-btn";
        btn.innerHTML = `<div class="nav-visited-dot"></div><div class="nav-ring"></div><span class="nav-symbol">${p.symbol}</span><span class="nav-name">${p.name}</span>`;
        btn.dataset.index = idx;
        btn.onclick = () => selectPlanet(idx);
        nav.appendChild(btn);
    });
}

function selectPlanet(idx, skipAudio = false) {
    if (currentIndex === idx) return;
    if (!skipAudio) audio.warp();
    currentIndex = idx;
    const p = PLANETS[idx];

    idleEl.style.display = "none";
    contentEl.style.display = "none";
    loadingEl.style.display = "flex";

    ring1.style.display = ring2.style.display = ring3.style.display = "block";
    ring1.style.color = ring2.style.color = ring3.style.color = p.color;

    document.querySelectorAll(".nav-btn").forEach((btn, i) => btn.classList.toggle("active", i === idx));

    setTimeout(() => {
        loadingEl.style.display = "none";
        contentEl.style.display = "flex";

        imgEl.src = p.image;
        imgEl.alt = p.name;
        glowEl.style.background = p.glow;
        card.style.borderColor = p.glow;
        card.style.boxShadow = `0 0 40px ${p.glow}`;

        document.getElementById("type-badge").textContent = p.type;
        document.getElementById("type-badge").style.borderColor = p.color;
        document.getElementById("type-badge").style.color = p.color;

        document.getElementById("planet-meta").textContent = `SECTOR 0${p.index} // ${p.type}`;
        document.getElementById("planet-meta").style.color = p.color;
        document.getElementById("planet-name").textContent = p.name;
        document.getElementById("planet-tagline").textContent = p.tagline;

        document.getElementById("planet-fact").textContent = p.fact;
        document.getElementById("planet-fact").style.borderColor = p.color;

        document.getElementById("didyouknow").style.borderColor = `${p.color}50`;
        document.getElementById("didyouknow").style.background = `${p.color}10`;
        document.getElementById("dyk-label").style.color = p.color;
        document.getElementById("dyk-text").textContent = p.facts[0];

        document.getElementById("stats").innerHTML = `
          <div class="stat-pill"><span class="stat-label">Diameter</span><span class="stat-value">${p.diameter}</span></div>
          <div class="stat-pill"><span class="stat-label">Year</span><span class="stat-value">${p.year}</span></div>
          <div class="stat-pill"><span class="stat-label">Gravity</span><span class="stat-value">${p.gravity}</span></div>
        `;

        if (!visited.has(idx)) {
            visited.add(idx);
            document.querySelectorAll(".nav-btn")[idx].classList.add("visited");
            addXP(50);
            const rect = card.getBoundingClientRect();
            burstParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, p.color, 50);
            audio.success();
        }

        discoverBtn.textContent = visited.size === PLANETS.length ? "🌌 Re-examine Orbit Sector" : "🚀 Discover Next Sector";
    }, 450);
}

function addXP(amount) {
    xp += amount;
    const newLevel = Math.floor(xp / 150) + 1;
    if (newLevel > level) {
        level = newLevel;
        audio.play(880, 'triangle', 0.15, 0.06);
        setTimeout(() => audio.play(1100, 'triangle', 0.2, 0.05), 120);
        setTimeout(() => audio.play(1320, 'triangle', 0.25, 0.04), 240);
    }
    updateXPUI();
}

function updateXPUI() {
    xpLabel.textContent = `XP: ${xp}`;
    const pct = Math.min((visited.size / PLANETS.length) * 100, 100);
    xpBar.style.width = `${pct}%`;
    xpLevel.textContent = `Lv.${level}`;
}

discoverBtn.onclick = () => {
    audio.click();
    if (currentIndex === null) selectPlanet(0);
    else selectPlanet((currentIndex + 1) % PLANETS.length);
};

function openModal(html) {
    modalBody.innerHTML = html;
    overlay.classList.add("active");
}
document.getElementById("modal-close").onclick = () => overlay.classList.remove("active");
overlay.onclick = (e) => { if (e.target === overlay) overlay.classList.remove("active"); };

// Modals (Quiz, Data, Moons, Scale, Badges, Map, Sound)
document.getElementById("quiz-btn").onclick = () => {
    if (currentIndex === null) return;
    audio.click();
    const p = PLANETS[currentIndex];
    const qIdx = Math.floor(Math.random() * p.quiz.length);
    const q = p.quiz[qIdx];
    openModal(`<h2>${p.name} — Quiz Challenge</h2><p style="margin-bottom:1.2rem;font-size:0.95rem;line-height:1.5;">${q.q}</p><div>${q.options.map((opt, i) => `<button class="quiz-option" data-qi="${qIdx}" data-opt="${i}" data-answer="${q.answer}" onclick="handleQuizAnswer(this, ${q.answer})">${opt}</button>`).join('')}</div><div id="quiz-res" style="margin-top:1rem;font-family:'Orbitron',monospace;font-size:0.8rem;"></div>`);
};
window.handleQuizAnswer = (el, correct) => {
    const res = document.getElementById("quiz-res");
    const btns = document.querySelectorAll(".quiz-option");
    const selected = parseInt(el.dataset.opt);
    btns.forEach((btn, i) => { btn.disabled = true; if (i === correct) btn.classList.add("correct"); if (i === selected && i !== correct) btn.classList.add("wrong"); });
    if (selected === correct) { audio.success(); res.textContent = "✔ TELEMETRY CONFIRMED! +25 XP"; res.style.color = "#4ade80"; addXP(25); }
    else { audio.error(); res.textContent = "✖ SIGNAL ERROR. INCORRECT."; res.style.color = "#f87171"; }
};
document.getElementById("info-btn").onclick = () => {
    if (currentIndex === null) return;
    audio.click();
    const p = PLANETS[currentIndex];
    openModal(`<h2>${p.name} — Deep Telemetry</h2><p style="margin-bottom:0.6rem;font-size:0.88rem;"><strong>Atmosphere:</strong> ${p.atmosphere}</p><p style="margin-bottom:0.6rem;font-size:0.88rem;"><strong>Composition:</strong> ${p.composition}</p><p style="margin-bottom:0.6rem;font-size:0.88rem;"><strong>Avg Distance:</strong> ${p.distance}</p><p style="margin-bottom:0.6rem;font-size:0.88rem;"><strong>Temperature:</strong> ${p.temp}</p><h3 style="margin-top:1.2rem;font-family:'Orbitron',monospace;font-size:0.7rem;color:${p.color}">⟡ ORBITAL LOGS</h3><ul style="padding-left:1.2rem;margin-top:0.6rem;font-size:0.85rem;line-height:1.7;color:#d1d5db;list-style-type:'› ';">${p.facts.map(f => `<li style="padding-left:0.3rem;">${f}</li>`).join('')}</ul>`);
};
document.getElementById("moons-btn").onclick = () => {
    if (currentIndex === null) return;
    audio.click();
    const p = PLANETS[currentIndex];
    let html = `<h2>${p.name} — Satellite Roster</h2><p style="margin-bottom:1rem;font-size:0.88rem;">Tracked Satellites: <strong>${p.moons}</strong></p>`;
    if (p.moonsList.length > 0) html += `<div style="display:flex;flex-wrap:wrap;gap:0.5rem;">${p.moonsList.map(m => `<span style="padding:0.35rem 0.75rem;background:rgba(50,74,178,0.12);border:1px solid var(--border);border-radius:0.5rem;font-family:'Orbitron',monospace;font-size:0.65rem;color:#cbd5e1;">${m}</span>`).join('')}</div>`;
    else html += `<p style="color:#64748b;font-size:0.85rem;">No natural orbiting bodies recorded.</p>`;
    openModal(html);
};
document.getElementById("scale-btn").onclick = () => {
    audio.click();
    const maxDiam = Math.max(...PLANETS.map(p => p.diameterNum));
    let rows = PLANETS.map(p => { const pct = Math.max((p.diameterNum / maxDiam) * 100, 2.5); return `<div class="scale-row"><span class="scale-label">${p.symbol} ${p.name}</span><div class="scale-bar-wrap"><div class="scale-bar" style="width:${pct}%;background:${p.color};"></div><span class="scale-val">${p.diameter}</span></div></div>`; }).join('');
    openModal(`<h2>📐 Volumetric Scale Comparison</h2><p style="font-size:0.7rem;color:#94a3b8;margin-bottom:1.2rem;">Relative diameters (Jupiter = 100% reference)</p><div>${rows}</div>`);
};
document.getElementById("badges-btn").onclick = () => {
    audio.click();
    const total = PLANETS.length, v = visited.size;
    openModal(`<h2>🏅 Exploration Achievements</h2><div class="badge-item ${v >= 1 ? 'earned' : ''}"><span style="font-size:1.4rem;">🚀</span><div><div style="font-weight:600;font-size:0.88rem;">First Orbit</div><div style="font-size:0.7rem;color:#94a3b8;">Scanned 1 planetary system</div>${v >= 1 ? '✅' : '🔒'}</div></div><div class="badge-item ${v >= 4 ? 'earned' : ''}"><span style="font-size:1.4rem;">🪐</span><div><div style="font-weight:600;font-size:0.88rem;">System Navigator</div><div style="font-size:0.7rem;color:#94a3b8;">Mapped at least 4 worlds</div>${v >= 4 ? '✅' : `${v}/4`}</div></div><div class="badge-item ${v === total ? 'earned' : ''}"><span style="font-size:1.4rem;">👑</span><div><div style="font-weight:600;font-size:0.88rem;">Grand Astronomer</div><div style="font-size:0.7rem;color:#94a3b8;">Fully charted all ${total} major planets</div>${v === total ? '✅' : `${v}/${total}`}</div></div><div style="margin-top:1rem;padding:0.8rem;background:rgba(50,74,178,0.06);border-radius:0.6rem;border:1px solid var(--border);"><span style="font-family:'Orbitron',monospace;font-size:0.6rem;color:#94a3b8;">PROGRESS</span><div style="display:flex;gap:0.3rem;margin-top:0.4rem;flex-wrap:wrap;">${PLANETS.map((p, i) => `<span style="font-size:1.1rem;opacity:${visited.has(i) ? 1 : 0.2};filter:${visited.has(i) ? 'none' : 'grayscale(1)'};">${p.symbol}</span>`).join('')}</div></div>`);
};
document.getElementById("map-btn").onclick = () => {
    audio.click();
    openModal(`<h2>🗺️ Orbital Sector Map</h2><div style="display:flex;flex-direction:column;gap:0.4rem;margin-top:0.8rem;">${PLANETS.map((p, i) => `<div class="orbit-map-item" data-planet-idx="${i}" style="border-left-color:${p.color};"><span class="om-symbol">${p.symbol}</span><span class="om-name">${p.name}</span><span class="om-dist">${p.distance}</span></div>`).join('')}</div>`);
    modalBody.querySelectorAll(".orbit-map-item").forEach(el => el.addEventListener("click", () => { selectPlanet(parseInt(el.dataset.planetIdx, 10)); overlay.classList.remove("active"); }));
};
document.getElementById("sound-btn").onclick = () => {
    audio.enabled = !audio.enabled;
    document.getElementById("sound-btn").textContent = `🔊 Audio: ${audio.enabled ? 'On' : 'Off'}`;
    if (audio.enabled) audio.play(660, 'sine', 0.1);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  STARFALL RUN MINI-GAME (Combined)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const BEST_KEY = "spacefarer-starfall-best-v1";
const rand = (min, max) => min + Math.random() * (max - min);
const clock = (seconds) => { const value = Math.floor(seconds); return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`; };
function readBest() { try { return Math.max(0, Number(localStorage.getItem(BEST_KEY)) || 0); } catch { return 0; } }
function saveBest(score) { try { localStorage.setItem(BEST_KEY, String(score)); } catch {} }

function createRun(width, height, best = readBest()) {
    return {
        width, height, status: "ready", score: 0, best, elapsed: 0, lives: 3, sector: 1, charge: 20, shield: 0, invulnerable: 0, shards: 0, streak: 0, lastShardAt: -99, nextRock: 0.8, nextShard: 1.5, nextCell: 12, rocks: [], pickups: [], sparks: [],
        stars: Array.from({ length: 76 }, () => ({ x: Math.random() * width, y: Math.random() * height, radius: rand(0.45, 1.7), speed: rand(9, 34), phase: rand(0, Math.PI * 2), alpha: rand(0.22, 0.82) })),
        ship: { x: width / 2, y: height * 0.76 }, target: null, shake: 0,
    };
}
function burst(run, x, y, hue, count = 14) {
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2; const speed = rand(25, 150);
        run.sparks.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: rand(0.3, 0.85), hue, size: rand(1.2, 3.2) });
    }
}
function drawRock(ctx, rock) {
    ctx.save(); ctx.translate(rock.x, rock.y); ctx.rotate(rock.angle); ctx.shadowBlur = 16; ctx.shadowColor = "rgba(255, 111, 138, 0.25)";
    const gradient = ctx.createLinearGradient(-rock.radius, -rock.radius, rock.radius, rock.radius);
    gradient.addColorStop(0, "#a5a0b6"); gradient.addColorStop(0.54, "#62687d"); gradient.addColorStop(1, "#32384e");
    ctx.fillStyle = gradient; ctx.beginPath();
    for (let i = 0; i < 9; i++) {
        const angle = (i / 9) * Math.PI * 2; const wobble = 0.83 + Math.sin(i * 5 + rock.seed) * 0.1 + Math.cos(i * 2.4 + rock.seed) * 0.05;
        const x = Math.cos(angle) * rock.radius * wobble; const y = Math.sin(angle) * rock.radius * wobble;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(27, 31, 49, 0.46)"; ctx.beginPath(); ctx.arc(-rock.radius * 0.22, -rock.radius * 0.13, rock.radius * 0.21, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(rock.radius * 0.32, rock.radius * 0.23, rock.radius * 0.12, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}
function drawRun(ctx, run, timestamp) {
    const { width, height } = run; if (!width || !height) return;
    ctx.save();
    if (run.shake > 0) { const amount = run.shake * 12; ctx.translate(rand(-amount, amount), rand(-amount, amount)); }
    const background = ctx.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, "#07122a"); background.addColorStop(0.52, "#070c20"); background.addColorStop(1, "#100d2d");
    ctx.fillStyle = background; ctx.fillRect(0, 0, width, height);
    const nebula = ctx.createRadialGradient(width * 0.19, height * 0.36, 0, width * 0.19, height * 0.36, width * 0.54);
    nebula.addColorStop(0, "rgba(65, 73, 184, 0.2)"); nebula.addColorStop(0.52, "rgba(30, 79, 154, 0.08)"); nebula.addColorStop(1, "rgba(5, 12, 28, 0)");
    ctx.fillStyle = nebula; ctx.fillRect(0, 0, width, height);
    ctx.save(); ctx.globalAlpha = 0.14; ctx.strokeStyle = "#5b7ac7"; ctx.lineWidth = 1;
    for (let x = 32; x < width; x += 64) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
    for (let y = 38; y < height; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }
    ctx.restore();
    run.stars.forEach((star) => {
        const alpha = star.alpha * (0.65 + Math.sin(star.phase + timestamp * 0.0003) * 0.35);
        ctx.globalAlpha = alpha; ctx.fillStyle = star.radius > 1.25 ? "#c8f2ff" : "#b4c2ec";
        ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;
    const planetX = width * 0.82; const planetY = height * 0.18; const planetRadius = Math.min(44, height * 0.13);
    ctx.save(); ctx.globalAlpha = 0.72; ctx.strokeStyle = "rgba(134, 156, 255, 0.46)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(planetX, planetY, planetRadius * 1.62, planetRadius * 0.47, -0.2, 0, Math.PI * 2); ctx.stroke();
    const planet = ctx.createRadialGradient(planetX - planetRadius * 0.45, planetY - planetRadius * 0.52, 2, planetX, planetY, planetRadius);
    planet.addColorStop(0, "#d4b6ff"); planet.addColorStop(0.38, "#7468df"); planet.addColorStop(1, "#262c73");
    ctx.shadowBlur = 18; ctx.shadowColor = "rgba(152, 130, 255, 0.56)"; ctx.fillStyle = planet;
    ctx.beginPath(); ctx.arc(planetX, planetY, planetRadius, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0; ctx.restore();
    run.pickups.forEach((item) => {
        const pulse = 1 + Math.sin(item.phase) * 0.13;
        ctx.save(); ctx.translate(item.x, item.y); ctx.rotate(item.kind === "shard" ? Math.PI / 4 + item.phase * 0.16 : item.phase * 0.12);
        ctx.shadowBlur = item.kind === "shard" ? 20 : 24; ctx.shadowColor = item.kind === "shard" ? "#66e4ff" : "#79ffd7";
        ctx.fillStyle = item.kind === "shard" ? "#8cf2ff" : "#9cffdc"; ctx.globalAlpha = 0.86 + Math.sin(item.phase) * 0.14;
        ctx.fillRect(-item.radius * pulse, -item.radius * pulse, item.radius * pulse * 2, item.radius * pulse * 2);
        ctx.shadowBlur = 0; ctx.strokeStyle = "rgba(255,255,255,0.78)"; ctx.lineWidth = 1;
        ctx.strokeRect(-item.radius * pulse, -item.radius * pulse, item.radius * pulse * 2, item.radius * pulse * 2); ctx.restore();
    });
    run.rocks.forEach((rock) => drawRock(ctx, rock));
    run.sparks.forEach((spark) => {
        ctx.globalAlpha = Math.max(0, spark.life / 0.85); ctx.fillStyle = `hsl(${spark.hue} 95% 70%)`;
        ctx.shadowBlur = 10; ctx.shadowColor = ctx.fillStyle;
        ctx.beginPath(); ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    if (run.shield > 0) {
        ctx.save(); ctx.globalAlpha = 0.62 + Math.sin(timestamp * 0.012) * 0.13; ctx.strokeStyle = "#74f0ff";
        ctx.lineWidth = 2; ctx.shadowBlur = 24; ctx.shadowColor = "#59deff";
        ctx.beginPath(); ctx.arc(run.ship.x, run.ship.y, 34 + Math.sin(timestamp * 0.01) * 2, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    }
    if (!(run.invulnerable > 0 && Math.floor(timestamp / 90) % 2 === 0)) {
        const engine = ctx.createLinearGradient(run.ship.x, run.ship.y + 8, run.ship.x, run.ship.y + 31);
        engine.addColorStop(0, "rgba(122, 226, 255, 0.9)"); engine.addColorStop(1, "rgba(89, 120, 255, 0)");
        ctx.fillStyle = engine; ctx.beginPath(); ctx.moveTo(run.ship.x - 5, run.ship.y + 4); ctx.lineTo(run.ship.x, run.ship.y + 29 + Math.sin(timestamp * 0.02) * 5); ctx.lineTo(run.ship.x + 5, run.ship.y + 4); ctx.fill();
        ctx.save(); ctx.translate(run.ship.x, run.ship.y); ctx.shadowBlur = 23; ctx.shadowColor = "#73eaff"; ctx.fillStyle = "#e8fbff";
        ctx.beginPath(); ctx.moveTo(0, -20); ctx.lineTo(16, 15); ctx.lineTo(0, 9); ctx.lineTo(-16, 15); ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0;
        ctx.fillStyle = "#61dfff"; ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(7, 8); ctx.lineTo(0, 5); ctx.lineTo(-7, 8); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.75)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(0, 9); ctx.stroke(); ctx.restore();
    }
    if (run.target && run.status === "playing") {
        ctx.save(); ctx.strokeStyle = "rgba(108, 231, 255, 0.35)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(run.target.x, run.target.y, 13, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(run.target.x - 18, run.target.y); ctx.lineTo(run.target.x - 8, run.target.y); ctx.moveTo(run.target.x + 8, run.target.y); ctx.lineTo(run.target.x + 18, run.target.y); ctx.stroke(); ctx.restore();
    }
    ctx.restore();
}

function initStarfallRun({ audio, addXP }) {
    const $ = (id) => document.getElementById(id);
    const panel = $("game-panel"), backdrop = $("game-backdrop"), openButton = $("game-btn"), closeButton = $("game-close"), pauseButton = $("game-pause"), startButton = $("game-start"), pulseButton = $("game-burst"), canvas = $("game-canvas"), arena = $("game-arena"), overlay = $("game-overlay"), ctx = canvas?.getContext("2d");
    if (!panel || !backdrop || !openButton || !closeButton || !canvas || !arena || !ctx || !overlay) return;

    const keys = new Set(); let run = createRun(900, 480); let loopId = 0; let previousFrame = 0; let lastHudUpdate = 0; let pointerId = null; let lastFocusedElement = null; let toastTimer = 0;
    const scoreEl = $("game-score"), bestEl = $("game-best"), sectorTimeEl = $("game-sector-time"), hullEl = $("game-hull"), missionFill = $("game-mission-progress"), missionMeta = $("game-mission-meta"), missionDone = $("game-mission-complete"), chargeEl = $("game-charge"), chargeLabelEl = $("game-charge-label"), burstStateEl = $("game-burst-state"), overlayKicker = $("game-overlay-kicker"), overlayTitle = $("game-overlay-title"), overlayCopy = $("game-overlay-copy"), overlayIcon = $("game-overlay-icon"), controlHints = $("game-control-hints"), runTimeEl = $("game-run-time"), streakEl = $("game-streak"), sideStreakEl = $("game-side-streak"), flightStatusEl = $("game-flight-status"), modeStatus = $("game-mode-status"), toast = $("game-toast");

    function resizeCanvas() {
        const rect = arena.getBoundingClientRect(); if (!rect.width || !rect.height) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(rect.width * dpr); canvas.height = Math.round(rect.height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        run.width = rect.width; run.height = rect.height;
        run.ship.x = Math.max(18, Math.min(rect.width - 18, run.ship.x || rect.width / 2));
        run.ship.y = Math.max(18, Math.min(rect.height - 18, run.ship.y || rect.height * 0.76));
        run.stars.forEach((star) => { star.x = Math.min(rect.width, star.x); star.y = Math.min(rect.height, star.y); });
        drawRun(ctx, run, performance.now());
    }

    function renderHud() {
        const currentScore = Math.floor(run.score), currentBest = Math.max(run.best, currentScore);
        if (scoreEl) scoreEl.textContent = currentScore.toLocaleString();
        if (bestEl) bestEl.textContent = currentBest.toLocaleString();
        if (sectorTimeEl) sectorTimeEl.innerHTML = `${String(run.sector).padStart(2, "0")} <span>· ${clock(run.elapsed)}</span>`;
        if (hullEl) {
            hullEl.innerHTML = [0, 1, 2].map((heart) => `<span class="game-heart${heart >= run.lives ? " is-lost" : ""}" aria-hidden="true">♥</span>`).join("");
            hullEl.setAttribute("aria-label", `${run.lives} hull points`);
        }
        if (missionFill) {
            const progress = run.shards > 0 && run.shards % 8 === 0 ? 8 : run.shards % 8;
            missionFill.style.width = `${(progress / 8) * 100}%`;
            missionFill.parentElement?.setAttribute("aria-valuenow", String(progress));
            if (missionMeta) missionMeta.innerHTML = `<span>SHARDS ${String(progress).padStart(2, "0")} / 08</span><span>${8 - progress} LEFT</span>`;
            if (missionDone) missionDone.hidden = !(run.shards > 0 && run.shards % 8 === 0);
        }
        if (chargeEl) { chargeEl.style.width = `${Math.min(100, run.charge)}%`; chargeEl.parentElement?.setAttribute("aria-valuenow", String(Math.floor(run.charge))); }
        if (chargeLabelEl) chargeLabelEl.textContent = `${Math.floor(run.charge)}%`;
        if (burstStateEl) burstStateEl.textContent = run.charge >= 100 ? "READY" : "CHARGING";
        if (pulseButton) pulseButton.disabled = run.status !== "playing" || run.charge < 100;
        if (runTimeEl) runTimeEl.textContent = clock(run.elapsed);
        const multiplier = run.streak ? Math.min(5, 1 + Math.floor((run.streak - 1) / 3)) : 0;
        if (streakEl) streakEl.textContent = `×${multiplier}`;
        if (sideStreakEl) sideStreakEl.textContent = `×${multiplier}`;
        if (flightStatusEl) flightStatusEl.textContent = run.status === "playing" ? "IN FLIGHT" : run.status.toUpperCase();
        if (modeStatus) { modeStatus.textContent = run.status === "playing" ? "LIVE RUN" : run.status === "paused" ? "PAUSED" : "ARCADE"; modeStatus.classList.toggle("is-live", run.status === "playing"); }
        if (pauseButton) { pauseButton.hidden = run.status === "ready" || run.status === "finished"; pauseButton.textContent = run.status === "paused" ? "▶" : "Ⅱ"; pauseButton.setAttribute("aria-label", run.status === "paused" ? "Resume game" : "Pause game"); }
        if (overlay) { const visible = run.status !== "playing"; overlay.classList.toggle("active", visible); overlay.setAttribute("aria-hidden", String(!visible)); }
        if (overlayKicker && overlayTitle && overlayCopy && overlayIcon && startButton) {
            const content = {
                ready: { kicker: "A NEW RUN AWAITS", title: "READY FOR LAUNCH", copy: "Thread the meteor belt, scoop up star shards, and charge a phase shield before the next wave hits.", icon: "✧", button: "Launch mission" },
                paused: { kicker: "AUTOPILOT HOLD", title: "FLIGHT PAUSED", copy: "Your run is safe. Take a breath, then jump back into the asteroid field.", icon: "Ⅱ", button: "Resume flight" },
                finished: { kicker: "FLIGHT REPORT", title: "SHIP LOST", copy: `You recovered ${run.shards} star shards and scored ${currentScore.toLocaleString()} points. Your best run is saved on this device.`, icon: "✦", button: "Fly again" },
                playing: { kicker: "IN FLIGHT", title: "STARFALL RUN", copy: "Thread the meteor belt and bring the starlight home.", icon: "✧", button: "Flight underway" },
            }[run.status];
            overlayKicker.textContent = content.kicker; overlayTitle.textContent = content.title; overlayCopy.textContent = content.copy; overlayIcon.textContent = content.icon; startButton.innerHTML = `${content.button}<span aria-hidden="true">→</span>`;
            if (controlHints) controlHints.hidden = run.status !== "ready";
        }
    }

    function stopLoop() { if (loopId) cancelAnimationFrame(loopId); loopId = 0; previousFrame = 0; }
    function startLoop() { if (loopId) return; previousFrame = 0; loopId = requestAnimationFrame(frame); }
    function showToast(message) { if (!toast) return; toast.textContent = message; toast.classList.add("active"); window.clearTimeout(toastTimer); toastTimer = window.setTimeout(() => toast.classList.remove("active"), 1900); }
    function setStatus(status) { run.status = status; if (status === "playing") startLoop(); else { stopLoop(); drawRun(ctx, run, performance.now()); } renderHud(); }
    
    function activatePulse() {
        if (run.status !== "playing" || run.charge < 100) return;
        run.charge = 0; run.shield = 3.2; burst(run, run.ship.x, run.ship.y, 190, 32);
        audio?.play(780, "sine", 0.18, 0.07); showToast("PHASE SHIELD ONLINE"); renderHud();
    }
    function startRun() {
        const bounds = arena.getBoundingClientRect(); run = createRun(bounds.width || run.width, bounds.height || run.height, run.best);
        run.status = "playing"; keys.clear(); resizeCanvas(); audio?.play(520, "triangle", 0.13, 0.06); renderHud(); startLoop();
    }
    function togglePause() {
        if (run.status === "playing") { keys.clear(); run.target = null; setStatus("paused"); audio?.play(330, "sine", 0.1, 0.04); }
        else if (run.status === "paused") setStatus("playing");
    }

    function updateRun(dt) {
        run.elapsed += dt; run.score += dt * (3 + Math.min(2, (run.sector - 1) * 0.25)); run.sector = 1 + Math.floor(run.elapsed / 18);
        run.shield = Math.max(0, run.shield - dt); run.invulnerable = Math.max(0, run.invulnerable - dt); run.shake = Math.max(0, run.shake - dt);
        const keyX = Number(keys.has("ArrowRight") || keys.has("KeyD")) - Number(keys.has("ArrowLeft") || keys.has("KeyA"));
        const keyY = Number(keys.has("ArrowDown") || keys.has("KeyS")) - Number(keys.has("ArrowUp") || keys.has("KeyW"));
        if (keyX || keyY) { const magnitude = Math.hypot(keyX, keyY) || 1; run.ship.x += (keyX / magnitude) * 268 * dt; run.ship.y += (keyY / magnitude) * 268 * dt; }
        else if (run.target) {
            const dx = run.target.x - run.ship.x, dy = run.target.y - run.ship.y, distance = Math.hypot(dx, dy);
            if (distance > 3) { const amount = Math.min(distance, 320 * dt); run.ship.x += (dx / distance) * amount; run.ship.y += (dy / distance) * amount; }
        }
        run.ship.x = Math.max(20, Math.min(run.width - 20, run.ship.x)); run.ship.y = Math.max(20, Math.min(run.height - 20, run.ship.y));
        const rockRate = Math.max(0.43, 1.2 - (run.sector - 1) * 0.085);
        while (run.elapsed >= run.nextRock) {
            const radius = rand(13, 25), x = rand(radius + 5, Math.max(radius + 6, run.width - radius - 5));
            if (Math.hypot(x - run.ship.x, run.ship.y) > 145) {
                run.rocks.push({ x, y: -radius, radius, speed: rand(105, 175) + (run.sector - 1) * 17, drift: rand(-45, 45), spin: rand(-1.8, 1.8), angle: rand(0, Math.PI * 2), seed: Math.random() * 12 });
            }
            run.nextRock += rockRate;
        }
        while (run.elapsed >= run.nextShard) { run.pickups.push({ x: rand(20, run.width - 20), y: -18, radius: 9, speed: rand(92, 132) + (run.sector - 1) * 8, phase: rand(0, Math.PI * 2), kind: "shard" }); run.nextShard += rand(1.8, 2.7); }
        while (run.elapsed >= run.nextCell) { run.pickups.push({ x: rand(24, run.width - 24), y: -20, radius: 12, speed: 92 + (run.sector - 1) * 6, phase: rand(0, Math.PI * 2), kind: "cell" }); run.nextCell += 16; }
        run.rocks = run.rocks.filter((rock) => { rock.y += rock.speed * dt; rock.x += rock.drift * dt; rock.angle += rock.spin * dt; return rock.y < run.height + rock.radius + 24; });
        run.pickups = run.pickups.filter((item) => { item.y += item.speed * dt; item.phase += dt * 2.4; return item.y < run.height + item.radius + 20; });
        for (let i = run.pickups.length - 1; i >= 0; i--) {
            const item = run.pickups[i]; if (Math.hypot(item.x - run.ship.x, item.y - run.ship.y) >= item.radius + 19) continue;
            if (item.kind === "shard") {
                run.streak = run.elapsed - run.lastShardAt < 3.8 ? run.streak + 1 : 1; run.lastShardAt = run.elapsed;
                const multiplier = Math.min(5, 1 + Math.floor((run.streak - 1) / 3));
                run.score += 90 * multiplier; run.charge = Math.min(100, run.charge + 18); run.shards++;
                audio?.play(700 + multiplier * 35, "triangle", 0.08, 0.04); burst(run, item.x, item.y, 190, 17);
                if (run.shards % 5 === 0) addXP(8);
                if (run.shards % 8 === 0) { run.score += 250; run.charge = Math.min(100, run.charge + 12); addXP(15); showToast("SECTOR BONUS SECURED  +250"); }
            } else {
                run.charge = Math.min(100, run.charge + 45);
                if (run.lives < 3) { run.lives++; showToast("HULL REPAIRED"); } else { run.score += 80; showToast("ENERGY CELL  +80"); }
                burst(run, item.x, item.y, 155, 22); audio?.play(560, "sine", 0.12, 0.05);
            }
            run.pickups.splice(i, 1);
        }
        for (let i = run.rocks.length - 1; i >= 0; i--) {
            const rock = run.rocks[i]; if (Math.hypot(rock.x - run.ship.x, rock.y - run.ship.y) >= rock.radius + 19) continue;
            if (run.shield > 0) { burst(run, rock.x, rock.y, 188, 20); run.score += 24; run.rocks.splice(i, 1); continue; }
            if (run.invulnerable > 0) continue;
            run.lives--; run.streak = 0; run.invulnerable = 1.25; run.shake = 0.22;
            burst(run, run.ship.x, run.ship.y, 348, 20); run.rocks.splice(i, 1); audio?.error();
            if (run.lives <= 0) finishRun();
        }
        run.sparks = run.sparks.filter((spark) => { spark.x += spark.vx * dt; spark.y += spark.vy * dt; spark.vx *= Math.pow(0.1, dt); spark.vy *= Math.pow(0.1, dt); spark.life -= dt; return spark.life > 0; });
        run.stars.forEach((star) => { star.y += star.speed * dt; if (star.y > run.height) { star.y = -3; star.x = Math.random() * run.width; } star.phase += dt * (0.8 + star.speed / 24); });
        if (run.elapsed - run.lastShardAt > 3.8) run.streak = 0;
        if (Math.floor(run.score) > run.best) run.best = Math.floor(run.score);
    }

    function finishRun() {
        if (run.status === "finished") return;
        run.status = "finished"; run.best = Math.max(run.best, Math.floor(run.score)); saveBest(run.best);
        if (run.score > 0) addXP(Math.max(2, Math.floor(run.score / 600))); audio?.error();
    }
    function frame(timestamp) {
        loopId = 0; if (run.status !== "playing") return;
        const dt = previousFrame ? Math.min((timestamp - previousFrame) / 1000, 0.035) : 0; previousFrame = timestamp;
        updateRun(dt); drawRun(ctx, run, timestamp);
        if (timestamp - lastHudUpdate > 120 || run.status !== "playing") { renderHud(); lastHudUpdate = timestamp; }
        if (run.status === "playing") loopId = requestAnimationFrame(frame); else { stopLoop(); renderHud(); }
    }
    function showPanel() {
        lastFocusedElement = document.activeElement;
        panel.classList.add("active"); backdrop.classList.add("active");
        panel.setAttribute("aria-hidden", "false"); backdrop.setAttribute("aria-hidden", "false");
        audio?.click();
        window.setTimeout(() => { resizeCanvas(); renderHud(); closeButton.focus(); }, 180);
        if (run.status === "playing") setStatus("paused");
    }
    function hidePanel() {
        if (run.status === "playing") setStatus("paused"); saveBest(run.best);
        panel.classList.remove("active"); backdrop.classList.remove("active");
        panel.setAttribute("aria-hidden", "true"); backdrop.setAttribute("aria-hidden", "true");
        keys.clear(); run.target = null;
        if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus(); else openButton.focus();
    }
    function pointFromEvent(event) { const rect = canvas.getBoundingClientRect(); run.target = { x: event.clientX - rect.left, y: event.clientY - rect.top }; }
    function onPointerDown(event) { if (run.status !== "playing") return; pointerId = event.pointerId; canvas.setPointerCapture(event.pointerId); pointFromEvent(event); }
    function onPointerMove(event) { if (pointerId === event.pointerId && run.status === "playing") pointFromEvent(event); }
    function onPointerUp(event) { if (pointerId !== event.pointerId) return; pointerId = null; run.target = null; }
    function onKeyDown(event) {
        const target = event.target;
        const typing = target instanceof HTMLElement && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
        if (typing || !panel.classList.contains("active")) return;
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code) && run.status === "playing") { event.preventDefault(); keys.add(event.code); }
        else if (["KeyW", "KeyA", "KeyS", "KeyD"].includes(event.code)) keys.add(event.code);
        else if (!event.repeat && (event.code === "Space" || event.code === "KeyE")) { if (run.status === "playing") { event.preventDefault(); activatePulse(); } }
        else if (!event.repeat && event.code === "KeyP") togglePause();
        else if (!event.repeat && event.code === "Escape") hidePanel();
    }
    function onKeyUp(event) { keys.delete(event.code); }
    function onWindowBlur() { keys.clear(); if (run.status === "playing") setStatus("paused"); }

    openButton.addEventListener("click", showPanel); closeButton.addEventListener("click", hidePanel); backdrop.addEventListener("click", hidePanel);
    startButton?.addEventListener("click", () => { if (run.status === "paused") setStatus("playing"); else startRun(); });
    pauseButton?.addEventListener("click", togglePause); pulseButton?.addEventListener("click", activatePulse);
    canvas.addEventListener("pointerdown", onPointerDown); canvas.addEventListener("pointermove", onPointerMove); canvas.addEventListener("pointerup", onPointerUp); canvas.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("resize", resizeCanvas); window.addEventListener("keydown", onKeyDown); window.addEventListener("keyup", onKeyUp); window.addEventListener("blur", onWindowBlur);
    window.addEventListener("pagehide", () => saveBest(run.best));
    if ("ResizeObserver" in window) { const observer = new ResizeObserver(resizeCanvas); observer.observe(arena); }
    renderHud(); resizeCanvas();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  DAILY PLANET & ABOUT PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const DAILY_PLANET_STORAGE_KEY = "spacefarer-daily-planet";
function getLocalDateKey(date = new Date()) { const year = date.getFullYear(); const month = String(date.getMonth() + 1).padStart(2, "0"); const day = String(date.getDate()).padStart(2, "0"); return `${year}-${month}-${day}`; }
function getDailyPlanetIndex() {
    const todayKey = getLocalDateKey();
    const savedDate = localStorage.getItem(`${DAILY_PLANET_STORAGE_KEY}:date`);
    const savedIndex = Number(localStorage.getItem(`${DAILY_PLANET_STORAGE_KEY}:index`));
    if (savedDate === todayKey && Number.isInteger(savedIndex) && savedIndex >= 0 && savedIndex < PLANETS.length) return savedIndex;
    const randomIndex = Math.floor(Math.random() * PLANETS.length);
    localStorage.setItem(`${DAILY_PLANET_STORAGE_KEY}:date`, todayKey); localStorage.setItem(`${DAILY_PLANET_STORAGE_KEY}:index`, String(randomIndex));
    return randomIndex;
}
let dailyPlanetIndex = getDailyPlanetIndex();
const aboutPage = document.getElementById("about-page"), aboutButton = document.getElementById("about-btn"), aboutBackButton = document.getElementById("about-back-button"), appEl = document.getElementById("app"), todayPanelButton = document.getElementById("today-panel-button"), updatePanelButton = document.getElementById("update-panel-button"), todayPanelContent = document.getElementById("today-panel-content"), updatePanelContent = document.getElementById("update-panel-content");

function showSpacefarerPanel(view) {
    const showToday = view === "today";
    todayPanelContent.hidden = !showToday; updatePanelContent.hidden = showToday;
    todayPanelButton.setAttribute("aria-pressed", String(showToday)); updatePanelButton.setAttribute("aria-pressed", String(!showToday));
}
function renderDailyPlanet() {
    const planet = PLANETS[dailyPlanetIndex];
    document.getElementById("today-planet-name").textContent = `${planet.symbol} ${planet.name}`;
    document.getElementById("today-planet-tagline").textContent = planet.tagline;
    document.getElementById("today-planet-fact").textContent = planet.fact;
}
function scheduleDailyPlanetRefresh() {
    const now = new Date(), nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();
    window.setTimeout(() => { dailyPlanetIndex = getDailyPlanetIndex(); renderDailyPlanet(); scheduleDailyPlanetRefresh(); }, nextMidnight - now.getTime());
}
todayPanelButton.addEventListener("click", () => showSpacefarerPanel("today"));
updatePanelButton.addEventListener("click", () => showSpacefarerPanel("update"));

function getAboutRoutes(pathname) {
    const normalizedPath = pathname.replace(/\/+$/, "") || "/";
    const basePath = normalizedPath.endsWith("/about") ? normalizedPath.slice(0, -"/about".length) || "/" : normalizedPath;
    const homePath = basePath === "/" ? "/" : `${basePath.replace(/\/+$/, "")}/`;
    const aboutPath = homePath === "/" ? "/about" : `${homePath}about`;
    return { homePath, aboutPath };
}
const aboutRoutes = getAboutRoutes(window.location.pathname);
function isAboutRoute() { const currentPath = window.location.pathname.replace(/\/+$/, "") || "/"; return currentPath === aboutRoutes.aboutPath.replace(/\/+$/, ""); }
function setAboutPageVisible(visible) {
    aboutPage.hidden = !visible; aboutPage.setAttribute("aria-hidden", String(!visible));
    document.body.classList.toggle("about-open", visible); appEl.inert = visible;
    if (visible) aboutBackButton.focus(); else aboutButton.focus();
}
function openAboutPage() {
    audio.click();
    if (!isAboutRoute()) window.history.pushState({ spacefarerPage: "about" }, "", aboutRoutes.aboutPath);
    setAboutPageVisible(true);
}
function closeAboutPage() {
    if (isAboutRoute() && window.history.state?.spacefarerPage === "about") { window.history.back(); return; }
    if (isAboutRoute()) window.history.replaceState({}, "", aboutRoutes.homePath);
    setAboutPageVisible(false);
}
aboutButton.addEventListener("click", openAboutPage); aboutBackButton.addEventListener("click", closeAboutPage);
window.addEventListener("popstate", () => setAboutPageVisible(isAboutRoute()));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  QUVIX AI
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(function initQuvixAI() {
    const panel = document.getElementById("quvix-panel"), btn = document.getElementById("quvix-btn"), closeBtn = document.getElementById("qv-close"), chatEl = document.getElementById("qv-chat"), inputEl = document.getElementById("qv-input"), sendBtn = document.getElementById("qv-send"), welcomeEl = document.getElementById("qv-welcome");
    let busy = false, firstMessage = true;
    const STOP_WORDS = ["a","an","the","is","are","am","was","were","i","me","my","mine","you","your","yours","he","she","it","they","them","their","we","our","ours","to","of","for","from","on","in","at","by","with","can","could","would","should","do","does","did","what","who","when","where","why","how","please","tell","say","about","explain"];
    function randomResponse(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function now() { return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }
    const intents = [
        { name: "greeting", phrases: ["good morning","good afternoon","good evening","helloing"], keywords: ["hello","hi","hey","greetings"], responses: ["Hello! 👋", "Hi there! 😊", "Hey! How can I help?"] },
        { name: "how_are_you", phrases: ["how are you","how are u","how r u","how's it going"], keywords: ["feel"], responses: ["I'm doing great! Thanks for asking! 😊","I'm doing well! How about you?","Everything's going great!"] },
        { name: "black_hole", phrases: ["what is a black hole", "tell me about black holes"], keywords: ["black hole", "singularity", "event horizon"], responses: ["A black hole is a region of spacetime where gravity is so strong that nothing – not even light – can escape. 🕳️", "Black holes form when massive stars collapse under their own gravity. The boundary around them is called the event horizon.", "At the center of a black hole lies the singularity, where our understanding of physics breaks down."] },
        { name: "universe", phrases: ["how big is the universe", "what is the universe"], keywords: ["universe", "cosmos"], responses: ["The observable universe is about 93 billion light-years in diameter. 🌌", "The universe contains an estimated 2 trillion galaxies, each with billions of stars.", "The universe is expanding – and it's accelerating! We don't fully understand why yet."] },
        { name: "supernova", phrases: ["what is a supernova", "tell me about supernovas"], keywords: ["supernova", "supernovas", "explosion"], responses: ["A supernova is a massive star explosion that outshines entire galaxies for a short time! 💥", "Supernovas create the heavy elements in the universe we're literally made of stardust.", "The last supernova visible to the naked eye was in 1604 – Kepler's Supernova."] },
        { name: "exoplanet", phrases: ["what are exoplanets", "tell me about exoplanets", "what is an exoplanet"], keywords: ["exoplanet", "exoplanets", "alien"], responses: ["Exoplanets are planets that orbit stars outside our solar system. Over 5,000 have been discovered! 🌍", "Some exoplanets are in the 'habitable zone' – the perfect distance from their star for liquid water.", "The James Webb Space Telescope is studying exoplanet atmospheres for signs of life."] },
        { name: "solar_system", phrases: ["what is the solar system", "tell me about the solar system"], keywords: ["solar system"], responses: ["The solar system is the Sun and everything bound to it by gravity — planets, moons, asteroids, comets, and more. ☀️", "Our solar system has 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.", "Beyond Neptune, there's the Kuiper Belt and the distant Oort Cloud."] },
        { name: "sun", phrases: ["what is the sun", "tell me about the sun"], keywords: ["sun", "solar"], responses: ["The Sun is a G-type main-sequence star at the center of our solar system. ☀️", "The Sun contains about 99.86% of the mass of the entire solar system.", "Its core fuses hydrogen into helium, releasing the energy that supports life on Earth."] },
        { name: "moon", phrases: ["what is the moon", "tell me about the moon"], keywords: ["moon", "luna"], responses: ["The Moon is Earth's only natural satellite. 🌕", "The Moon causes ocean tides and stabilizes Earth's tilt.", "It's about 384,400 km away and always shows us the same face."] },
        { name: "mercury", phrases: ["what is mercury", "tell me about mercury"], keywords: ["mercury"], responses: ["Mercury is the smallest planet in our solar system and closest to the Sun. 🌑", "A day on Mercury lasts about 59 Earth days, but a year is only 88 Earth days!", "Mercury has extreme temperatures — scorching hot in daylight and freezing at night."] },
        { name: "venus", phrases: ["what is venus", "tell me about venus"], keywords: ["venus"], responses: ["Venus is the second planet from the Sun and the hottest planet in our solar system. 🔥", "Venus has a thick carbon dioxide atmosphere and clouds of sulfuric acid.", "It's often called Earth's sister planet because of its similar size."] },
        { name: "earth", phrases: ["what is earth", "tell me about earth"], keywords: ["earth"], responses: ["Earth is the third planet from the Sun and the only known world with life. 🌍", "About 71% of Earth's surface is covered with water.", "Earth has one large moon and a protective magnetic field."] },
        { name: "mars", phrases: ["what is mars", "tell me about mars"], keywords: ["mars", "red planet"], responses: ["Mars is the fourth planet from the Sun and is known as the Red Planet. 🔴", "Mars has the largest volcano in the solar system, Olympus Mons.", "Scientists are exploring Mars for signs of ancient life and future human missions."] },
        { name: "jupiter", phrases: ["what is jupiter", "tell me about jupiter"], keywords: ["jupiter"], responses: ["Jupiter is the largest planet in our solar system. 🪐", "Jupiter's Great Red Spot is a giant storm bigger than Earth.", "It has dozens of moons, including Ganymede, the largest moon in the solar system."] },
        { name: "saturn", phrases: ["tell me about saturn", "what is saturn"], keywords: ["saturn", "rings"], responses: ["Saturn is the sixth planet from the Sun and is famous for its beautiful ring system made of ice and rock. 🪐", "Saturn is a gas giant, mostly hydrogen and helium, and has at least 146 known moons!", "Saturn's rings span over 280,000 km but are only about 10 meters thick."] },
        { name: "uranus", phrases: ["what is uranus", "tell me about uranus"], keywords: ["uranus"], responses: ["Uranus is the seventh planet from the Sun and an ice giant. 🧊", "Uranus rotates on its side, likely because of a massive ancient collision.", "It has faint rings and a blue-green color from methane in its atmosphere."] },
        { name: "neptune", phrases: ["what is neptune", "tell me about neptune"], keywords: ["neptune"], responses: ["Neptune is the eighth planet from the Sun and the farthest known planet. 🔵", "Neptune has the fastest winds in the solar system, over 2,000 km/h.", "It was discovered through mathematical predictions before being seen through a telescope."] },
        { name: "pluto", phrases: ["what is pluto", "tell me about pluto"], keywords: ["pluto", "dwarf planet"], responses: ["Pluto is a dwarf planet in the Kuiper Belt. ❄️", "Pluto was considered the ninth planet until 2006, when it was reclassified as a dwarf planet.", "NASA's New Horizons flew past Pluto in 2015, revealing mountains and ice plains."] },
        { name: "asteroid", phrases: ["what is an asteroid", "tell me about asteroids"], keywords: ["asteroid", "asteroids"], responses: ["Asteroids are rocky remnants left over from the early formation of the solar system. ☄️", "Most asteroids live in the Asteroid Belt between Mars and Jupiter.", "Some asteroids are so large they have their own moons!"] },
        { name: "comet", phrases: ["what is a comet", "tell me about comets"], keywords: ["comet", "comets"], responses: ["A comet is an icy body that releases gas and dust as it approaches the Sun. ☄️", "Comets often grow a glowing coma and a long tail pointing away from the Sun.", "Some comets return periodically, like Halley's Comet every 76 years."] },
        { name: "galaxy", phrases: ["what is a galaxy", "tell me about galaxies"], keywords: ["galaxy", "galaxies"], responses: ["A galaxy is a huge collection of stars, gas, dust, and dark matter held together by gravity. 🌌", "There are billions of galaxies in the observable universe.", "Galaxies come in shapes like spiral, elliptical, and irregular."] },
        { name: "milky_way", phrases: ["what is the milky way", "tell me about the milky way"], keywords: ["milky way"], responses: ["The Milky Way is the galaxy that contains our solar system. 🌌", "It's a barred spiral galaxy about 100,000 light-years across.", "The Milky Way contains hundreds of billions of stars."] },
        { name: "nebula", phrases: ["what is a nebula", "tell me about nebulas"], keywords: ["nebula", "nebulas"], responses: ["A nebula is a giant cloud of gas and dust in space. ☁️", "Some nebulas are star nurseries where new stars are born.", "Others are formed when dying stars shed their outer layers."] },
        { name: "star", phrases: ["what is a star", "tell me about stars"], keywords: ["star", "stars", "fusion"], responses: ["A star is a massive ball of plasma that shines through nuclear fusion. ⭐", "Stars are born in nebulas and spend most of their lives fusing hydrogen into helium.", "The closest star to Earth is the Sun, about 93 million miles away."] },
        { name: "big_bang", phrases: ["what is the big bang", "tell me about the big bang"], keywords: ["big bang"], responses: ["The Big Bang is the leading theory for how the universe began about 13.8 billion years ago. 💥", "It wasn't an explosion in space — it was the expansion of space itself.", "Evidence includes cosmic microwave background radiation and the movement of galaxies."] },
        { name: "dark_matter", phrases: ["what is dark matter", "tell me about dark matter"], keywords: ["dark matter"], responses: ["Dark matter is mysterious matter that doesn't emit light, but affects gravity. 🌑", "We can't see it directly, but its gravity holds galaxies together.", "Dark matter makes up about 27% of the universe."] },
        { name: "dark_energy", phrases: ["what is dark energy", "tell me about dark energy"], keywords: ["dark energy"], responses: ["Dark energy is a mysterious force causing the universe's expansion to accelerate. 🌌", "It makes up about 68% of the universe.", "Nobody knows exactly what dark energy is — it's one of the biggest mysteries in physics."] },
        { name: "light_year", phrases: ["what is a light year", "tell me about light years"], keywords: ["light year", "light years"], responses: ["A light-year is the distance light travels in one year — about 9.46 trillion km. 💫", "It measures distance, not time.", "Proxima Centauri, the nearest star after the Sun, is about 4.24 light-years away."] },
        { name: "james_webb", phrases: ["what is the james webb telescope", "tell me about james webb"], keywords: ["james webb", "jwst"], responses: ["The James Webb Space Telescope is the most powerful space telescope ever launched. 🔭", "It observes infrared light to study the early universe, exoplanets, and star formation.", "JWST launched in December 2021 and orbits the Sun about 1.5 million km from Earth."] },
        { name: "iss", phrases: ["what is the iss", "tell me about the international space station"], keywords: ["iss", "space station", "international space station"], responses: ["The International Space Station is a habitable laboratory orbiting Earth. 🛰️", "It orbits about 400 km above Earth and completes an orbit every 90 minutes.", "Astronauts live and work there conducting science experiments in microgravity."] },
        { name: "astronaut", phrases: ["what is an astronaut", "tell me about astronauts"], keywords: ["astronaut", "astronauts", "cosmonaut"], responses: ["An astronaut is a person trained to travel and work in space. 👩‍🚀", "Astronauts train for years in simulators, underwater, and in extreme environments.", "They experience microgravity, which makes everyday tasks very different."] },
        { name: "gravity", phrases: ["what is gravity", "tell me about gravity"], keywords: ["gravity"], responses: ["Gravity is the force that attracts objects with mass toward each other. 🌍", "It keeps planets in orbit, stars together, and galaxies bound.", "Einstein described gravity as the bending of spacetime."] },
        { name: "eclipse", phrases: ["what is an eclipse", "tell me about eclipses"], keywords: ["eclipse", "solar eclipse", "lunar eclipse"], responses: ["An eclipse happens when one celestial body blocks the light of another. 🌒", "A solar eclipse occurs when the Moon blocks the Sun.", "A lunar eclipse occurs when Earth's shadow falls on the Moon."] },
        { name: "aurora", phrases: ["what is an aurora", "tell me about auroras"], keywords: ["aurora", "auroras", "northern lights", "southern lights"], responses: ["Auroras are colorful lights in the sky caused by solar particles hitting Earth's atmosphere. 🌌", "In the north they're called aurora borealis, and in the south aurora australis.", "They glow green, red, purple, and blue depending on the gas and altitude."] }
    ];

    function normalize(text) { return text.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim(); }
    function levenshtein(a, b) { const m = a.length, n = b.length; if (m === 0) return n; if (n === 0) return m; const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0)); for (let i = 0; i <= m; i++) dp[i][0] = i; for (let j = 0; j <= n; j++) dp[0][j] = j; for (let i = 1; i <= m; i++) { for (let j = 1; j <= n; j++) { const cost = a[i - 1] === b[j - 1] ? 0 : 1; dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost); } } return dp[m][n]; }
    function similarity(a, b) { if (!a.length || !b.length) return 0; return 1 - levenshtein(a, b) / Math.max(a.length, b.length); }
    const SIMILARITY_THRESHOLD = 0.65, MIN_SCORE = 2.0;
    function scoreIntent(intent, userInput) {
        const text = normalize(userInput), inputWords = text.split(" ").filter(Boolean); let score = 0;
        for (const phrase of intent.phrases || []) { const p = normalize(phrase); if (text === p) score += 10; else if (text.includes(p)) score += 6; else { const pWords = p.split(" "); const matches = pWords.filter(pw => inputWords.some(iw => similarity(iw, pw) >= SIMILARITY_THRESHOLD)).length; if (pWords.length) score += (matches / pWords.length) * 4; } }
        for (const keyword of intent.keywords || []) { const k = normalize(keyword); if (!k) continue; if (text.includes(k)) { score += k.includes(" ") ? 5 : 3; } else { const kW = k.split(" "); const matches = kW.filter(kw => inputWords.some(iw => similarity(iw, kw) >= SIMILARITY_THRESHOLD)).length; if (kW.length) score += (matches / kW.length) * 2; } }
        const targetWords = new Set([...(intent.phrases || []).flatMap(p => normalize(p).split(" ")), ...(intent.keywords || []).flatMap(k => normalize(k).split(" "))]);
        const meaningfulInput = inputWords.filter(w => !STOP_WORDS.includes(w));
        score += meaningfulInput.filter(w => targetWords.has(w)).length * 0.5; return score;
    }
    function getResponse(message) {
        const text = normalize(message); if (!text) return "Say something and I'll do my best! 🚀";
        let bestIntent = null, bestScore = 0; for (const intent of intents) { const s = scoreIntent(intent, message); if (s > bestScore) { bestScore = s; bestIntent = intent; } }
        if (!bestIntent || bestScore < MIN_SCORE) return "Hmm, I'm not sure about that one. Try asking about black holes, Saturn, supernovas, exoplanets, or any planet! 🚀";
        return randomResponse(bestIntent.responses);
    }
    function addMsg(text, type) {
        if (type === "user" && firstMessage && welcomeEl) { welcomeEl.remove(); firstMessage = false; }
        const wrap = document.createElement("div"); wrap.className = "qv-msg-wrap qv-" + type;
        if (type === "ai") { const avatar = document.createElement("div"); avatar.className = "qv-avatar"; avatar.textContent = "AI"; wrap.appendChild(avatar); }
        const content = document.createElement("div"); content.className = "qv-msg-content";
        const bubble = document.createElement("div"); bubble.className = "qv-bubble qv-" + type; bubble.textContent = text; bubble.innerHTML = bubble.innerHTML.replace(/\n/g, "<br>");
        const ts = document.createElement("div"); ts.className = "qv-ts"; ts.textContent = now();
        content.appendChild(bubble); content.appendChild(ts); wrap.appendChild(content); chatEl.appendChild(wrap); chatEl.scrollTop = chatEl.scrollHeight;
    }
    function showTyping() {
        document.getElementById("qv-typing")?.remove();
        const wrap = document.createElement("div"); wrap.className = "qv-msg-wrap qv-ai"; wrap.id = "qv-typing";
        wrap.innerHTML = `<div class="qv-avatar">AI</div><div class="qv-msg-content"><div class="qv-bubble qv-ai qv-typing-bub"><span class="qv-dot"></span><span class="qv-dot"></span><span class="qv-dot"></span></div></div>`;
        chatEl.appendChild(wrap); chatEl.scrollTop = chatEl.scrollHeight;
    }
    function hideTyping() { document.getElementById("qv-typing")?.remove(); }
    function send() {
        const text = inputEl.value.trim(); if (!text || busy) return;
        if (text.toLowerCase() === "delete") { chatEl.innerHTML = `<div id="qv-welcome"><h1>Helper</h1><p>Ask me anything about space!</p></div>`; firstMessage = true; inputEl.value = ""; return; }
        addMsg(text, "user"); inputEl.value = ""; busy = true; sendBtn.disabled = true; showTyping();
        setTimeout(() => { hideTyping(); addMsg(getResponse(text), "ai"); busy = false; sendBtn.disabled = false; inputEl.focus(); }, 500 + Math.random() * 500);
    }
    function openPanel() { panel.classList.add("active"); btn.classList.add("open"); setTimeout(() => inputEl.focus(), 300); if (typeof audio !== "undefined" && audio.play) audio.play(660, "sine", 0.08, 0.04); }
    function closePanel() { panel.classList.remove("active"); btn.classList.remove("open"); }
    function togglePanel() { if (panel.classList.contains("active")) closePanel(); else openPanel(); }
    window.quvixUseCmd = function (cmd) { inputEl.value = cmd; inputEl.focus(); };
    window.quvixOpen = openPanel; window.quvixClose = closePanel; window.quvixToggle = togglePanel;
    btn.addEventListener("click", togglePanel); closeBtn.addEventListener("click", closePanel); sendBtn.addEventListener("click", send);
    inputEl.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); send(); } });
})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  MUSIC
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const music = document.getElementById("bgMusic"), musicBtn = document.getElementById("musicBtn");
if (music && musicBtn) {
    music.addEventListener("error", () => { console.error("🎵 MUSIC ERROR:", music.error); musicBtn.textContent = "⚠️ Music"; musicBtn.classList.remove("playing"); });
    musicBtn.addEventListener("click", () => {
        if (music.paused) {
            music.play().then(() => { musicBtn.textContent = "🔇 Mute"; musicBtn.classList.add("playing"); }).catch((err) => { musicBtn.textContent = "🎵 Music"; musicBtn.classList.remove("playing"); });
        } else { music.pause(); musicBtn.textContent = "🎵 Music"; musicBtn.classList.remove("playing"); }
    });
    document.addEventListener('click', function firstClick(e) {
        if (e.target.closest('#musicBtn')) { document.removeEventListener('click', firstClick); return; }
        if (music.paused) { music.play().then(() => { musicBtn.textContent = "🔇 Mute"; musicBtn.classList.add("playing"); }).catch((err) => {}); }
        document.removeEventListener('click', firstClick);
    }, { once: true });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  INIT ALL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    animateStars();
    initNav();
    updateXPUI();
    initStarfallRun({ audio, addXP });
    renderDailyPlanet();
    showSpacefarerPanel("today");
    scheduleDailyPlanetRefresh();
    if (isAboutRoute()) setAboutPageVisible(true);
});
window.selectPlanet = selectPlanet;
