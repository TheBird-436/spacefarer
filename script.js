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
    name: "Mercury",
    symbol: "☿",
    tagline: "The Swift Messenger",
    index: 1,
    type: "Terrestrial",
    fact: "Mercury has the shortest orbital year (88 days) and travels through space at an astonishing 47 km/s.",
    facts: [
        "Surface temperatures swing from -180°C at night to 430°C in daylight.",
        "Has no substantial atmosphere, leaving its surface heavily cratered.",
        "A huge iron core accounts for nearly 85% of the planet's radius."
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg",
    color: "#94a3b8",
    glow: "rgba(148,163,184,0.4)",
    diameterNum: 4879,
    diameter: "4,879 km",
    moons: "0 moons",
    year: "88 Earth days",
    temp: "430°C / -180°C",
    gravity: "3.7 m/s²",
    distance: "57.9M km",
    moonsList: [],
    atmosphere: "Trace Exosphere (Helium, Sodium, Oxygen)",
    composition: "Metallic iron core, silicate mantle & crust",
    quiz: [
        { q: "How fast does Mercury orbit the Sun?", options: ["~47 km/s", "~12 km/s", "~100 km/s"], answer: 0 },
        { q: "What % of Mercury's radius is its iron core?", options: ["25%", "50%", "85%"], answer: 2 }
    ]
}, {
    name: "Venus",
    symbol: "♀",
    tagline: "The Veiled Inferno",
    index: 2,
    type: "Terrestrial",
    fact: "Venus spins backwards and one day is longer than its year.",
    facts: [
        "Hottest planet (465°C avg) due to runaway CO₂ greenhouse effect.",
        "Surface pressure equals being 900m underwater on Earth.",
        "Thick sulfuric-acid clouds obscure a volcanic surface."
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",
    color: "#e8c97a",
    glow: "rgba(232,201,122,0.4)",
    diameterNum: 12104,
    diameter: "12,104 km",
    moons: "0 moons",
    year: "225 Earth days",
    temp: "465°C",
    gravity: "8.87 m/s²",
    distance: "108.2M km",
    moonsList: [],
    atmosphere: "96.5% CO₂, 3.5% Nitrogen",
    composition: "Iron core, rocky mantle, volcanic crust",
    quiz: [
        { q: "Why is Venus hotter than Mercury?", options: ["Stronger Solar Flares", "Runaway CO₂ Greenhouse", "Internal Nuclear Core"], answer: 1 }
    ]
}, {
    name: "Earth",
    symbol: "♁",
    tagline: "The Blue Oasis",
    index: 3,
    type: "Terrestrial",
    fact: "Earth is the densest planet and the only world confirmed to sustain life.",
    facts: [
        "A powerful magnetosphere shields life from solar radiation.",
        "Active plate tectonics continuously recycle the crust.",
        "Our large moon stabilizes the axial tilt, preventing extreme swings."
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.4)",
    diameterNum: 12742,
    diameter: "12,742 km",
    moons: "1 moon",
    year: "365.25 days",
    temp: "15°C avg",
    gravity: "9.81 m/s²",
    distance: "149.6M km",
    moonsList: ["The Moon (Luna)"],
    atmosphere: "78% N₂, 21% O₂, 1% Ar",
    composition: "Solid inner iron core, liquid outer iron core, silicate mantle & crust",
    quiz: [
        { q: "What protects Earth's surface from cosmic rays?", options: ["Ozone Layer", "Magnetosphere", "Ocean Currents"], answer: 1 }
    ]
}, {
    name: "Mars",
    symbol: "♂",
    tagline: "The Red Frontier",
    index: 4,
    type: "Terrestrial",
    fact: "Mars hosts Olympus Mons, a volcano three times taller than Everest.",
    facts: [
        "Iron oxide (rust) gives Mars its iconic red colour.",
        "Valles Marineris is a canyon system spanning a quarter of the planet.",
        "Two tiny irregular moons are likely captured asteroids."
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    color: "#f87171",
    glow: "rgba(248,113,113,0.4)",
    diameterNum: 6779,
    diameter: "6,779 km",
    moons: "2 moons",
    year: "687 Earth days",
    temp: "-65°C avg",
    gravity: "3.72 m/s²",
    distance: "227.9M km",
    moonsList: ["Phobos", "Deimos"],
    atmosphere: "95% CO₂, 2.6% N₂, 1.9% Ar",
    composition: "Dense iron/sulfur core, silicate mantle, basaltic crust",
    quiz: [
        { q: "How tall is Olympus Mons?", options: ["8 km", "25 km", "50 km"], answer: 1 }
    ]
}, {
    name: "Jupiter",
    symbol: "♃",
    tagline: "The Gas Titan",
    index: 5,
    type: "Gas Giant",
    fact: "Jupiter is more massive than all other planets combined.",
    facts: [
        "The Great Red Spot is a storm wider than Earth that has raged for centuries.",
        "Has the fastest rotation — under 10 hours for one day.",
        "Its magnetic field extends nearly 7 million km toward the Sun."
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg",
    color: "#fb923c",
    glow: "rgba(251,146,60,0.4)",
    diameterNum: 139820,
    diameter: "139,820 km",
    moons: "95 moons",
    year: "11.9 Earth yrs",
    temp: "-110°C avg",
    gravity: "24.79 m/s²",
    distance: "778.5M km",
    moonsList: ["Io", "Europa", "Ganymede", "Callisto", "Amalthea"],
    atmosphere: "89% H₂, 10% He",
    composition: "Liquid metallic hydrogen layers around a rocky/ice core",
    quiz: [
        { q: "How long is a day on Jupiter?", options: ["~10 Hours", "24 Hours", "7 Days"], answer: 0 }
    ]
}, {
    name: "Saturn",
    symbol: "♄",
    tagline: "The Ringed Sovereign",
    index: 6,
    type: "Gas Giant",
    fact: "Saturn's rings span 282,000 km but are only ~10 m thick.",
    facts: [
        "Least dense planet — it could float in water.",
        "Titan has a thick nitrogen atmosphere and methane lakes.",
        "A bizarre hexagonal storm swirls around the north pole."
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
    color: "#fde047",
    glow: "rgba(253,224,71,0.4)",
    diameterNum: 116460,
    diameter: "116,460 km",
    moons: "146 moons",
    year: "29.5 Earth yrs",
    temp: "-140°C avg",
    gravity: "10.44 m/s²",
    distance: "1.43B km",
    moonsList: ["Titan", "Enceladus", "Mimas", "Rhea", "Iapetus", "Dione"],
    atmosphere: "96% H₂, 3% He",
    composition: "Liquid hydrogen & helium wrapping a rocky core",
    quiz: [
        { q: "What's unique about Saturn's density?", options: ["Density lower than water", "Zero gravity", "Solid gold core"], answer: 0 }
    ]
}, {
    name: "Uranus",
    symbol: "⛢",
    tagline: "The Sideways Realm",
    index: 7,
    type: "Ice Giant",
    fact: "Uranus rotates tilted at 98°, giving 21-year-long seasons.",
    facts: [
        "Methane gas gives it a pristine cyan colour.",
        "Holds the record for coldest atmospheric temp (-224°C).",
        "Has 13 dark, faint planetary rings."
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.4)",
    diameterNum: 50724,
    diameter: "50,724 km",
    moons: "28 moons",
    year: "84 Earth yrs",
    temp: "-195°C avg",
    gravity: "8.87 m/s²",
    distance: "2.87B km",
    moonsList: ["Titania", "Oberon", "Umbriel", "Ariel", "Miranda"],
    atmosphere: "83% H₂, 15% He, 2% CH₄",
    composition: "Hot dense mantle of water, ammonia & methane ice around a rocky core",
    quiz: [
        { q: "What's unusual about Uranus's rotation?", options: ["It rotates sideways (98° tilt)", "It does not rotate", "It changes direction yearly"], answer: 0 }
    ]
}, {
    name: "Neptune",
    symbol: "♆",
    tagline: "The Windswept Abyss",
    index: 8,
    type: "Ice Giant",
    fact: "Neptune has the fastest winds in the solar system — 2,100 km/h.",
    facts: [
        "Takes 165 Earth years to orbit the Sun.",
        "Triton has cryovolcanoes spouting nitrogen ice.",
        "Radiates 2.6× more internal heat than it receives from the Sun."
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg",
    color: "#324ab2",
    glow: "rgba(50,74,178,0.6)",
    diameterNum: 49244,
    diameter: "49,244 km",
    moons: "16 moons",
    year: "165 Earth yrs",
    temp: "-200°C avg",
    gravity: "11.15 m/s²",
    distance: "4.50B km",
    moonsList: ["Triton", "Proteus", "Nereid", "Larissa"],
    atmosphere: "80% H₂, 19% He, 1% CH₄",
    composition: "Fluid mantle of water, ammonia & methane ice over a rocky silicate core",
    quiz: [
        { q: "How fast are Neptune's winds?", options: ["500 km/h", "1,200 km/h", "2,100 km/h"], answer: 2 }
    ]
}];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  STATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let currentIndex = null;
let visited = new Set();
let xp = 0;
let level = 1;
let quizAnswered = new Set();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  STARFIELD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.4,
            alpha: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.008 + 0.003,
            drift: Math.random() * 0.0004 - 0.0002
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
//  PARTICLES
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
        p.style.cssText = `
          left:${x}px; top:${y}px;
          width:${size}px; height:${size}px;
          background:${color};
          --tx:${tx}px; --ty:${ty}px; --dur:${dur}s;
          box-shadow: 0 0 ${size * 2}px ${color};
        `;
        container.appendChild(p);
        setTimeout(() => p.remove(), dur * 1000);
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  UI REFS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  NAVIGATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function initNav() {
    nav.innerHTML = "";
    PLANETS.forEach((p, idx) => {
        const btn = document.createElement("button");
        btn.className = "nav-btn";
        btn.innerHTML = `
          <div class="nav-visited-dot"></div>
          <div class="nav-ring"></div>
          <span class="nav-symbol">${p.symbol}</span>
          <span class="nav-name">${p.name}</span>
        `;
        btn.dataset.index = idx;
        btn.onclick = () => selectPlanet(idx);
        nav.appendChild(btn);
    });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SELECT PLANET
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function selectPlanet(idx, skipAudio = false) {
    if (currentIndex === idx) return;
    if (!skipAudio) audio.warp();
    currentIndex = idx;
    const p = PLANETS[idx];

    idleEl.style.display = "none";
    contentEl.style.display = "none";
    loadingEl.style.display = "flex";

    ring1.style.display = "block";
    ring2.style.display = "block";
    ring3.style.display = "block";
    ring1.style.color = p.color;
    ring2.style.color = p.color;
    ring3.style.color = p.color;

    document.querySelectorAll(".nav-btn").forEach((btn, i) => {
        btn.classList.toggle("active", i === idx);
    });

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
            burstParticles(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                p.color,
                50
            );
            audio.success();
        }

        discoverBtn.textContent = visited.size === PLANETS.length ?
            "🌌 Re-examine Orbit Sector" :
            "🚀 Discover Next Sector";

        updateBadgeStates();

    }, 450);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  XP / LEVEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

function updateBadgeStates() {}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  DISCOVER BUTTON
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
discoverBtn.onclick = () => {
    audio.click();
    if (currentIndex === null) {
        selectPlanet(0);
    } else {
        const next = (currentIndex + 1) % PLANETS.length;
        selectPlanet(next);
    }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  MODAL HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function openModal(html) {
    modalBody.innerHTML = html;
    overlay.classList.add("active");
}

document.getElementById("modal-close").onclick = () => overlay.classList.remove("active");
overlay.onclick = (e) => { if (e.target === overlay) overlay.classList.remove("active"); };

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  QUIZ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
document.getElementById("quiz-btn").onclick = () => {
    if (currentIndex === null) return;
    audio.click();
    const p = PLANETS[currentIndex];
    const qIdx = Math.floor(Math.random() * p.quiz.length);
    const q = p.quiz[qIdx];

    const html = `
        <h2>${p.name} — Quiz Challenge</h2>
        <p style="margin-bottom:1.2rem;font-size:0.95rem;line-height:1.5;">${q.q}</p>
        <div>
          ${q.options.map((opt, i) => `
            <button class="quiz-option" data-qi="${qIdx}" data-opt="${i}" data-answer="${q.answer}" onclick="handleQuizAnswer(this, ${q.answer})">
              ${opt}
            </button>
          `).join('')}
        </div>
        <div id="quiz-res" style="margin-top:1rem;font-family:'Orbitron',monospace;font-size:0.8rem;"></div>
      `;
    openModal(html);
};

window.handleQuizAnswer = (el, correct) => {
    const res = document.getElementById("quiz-res");
    const btns = document.querySelectorAll(".quiz-option");
    const selected = parseInt(el.dataset.opt);

    btns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correct) btn.classList.add("correct");
        if (i === selected && i !== correct) btn.classList.add("wrong");
    });

    if (selected === correct) {
        audio.success();
        res.textContent = "✔ TELEMETRY CONFIRMED! +25 XP";
        res.style.color = "#4ade80";
        addXP(25);
    } else {
        audio.error();
        res.textContent = "✖ SIGNAL ERROR. INCORRECT.";
        res.style.color = "#f87171";
    }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  DEEP DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
document.getElementById("info-btn").onclick = () => {
    if (currentIndex === null) return;
    audio.click();
    const p = PLANETS[currentIndex];
    const html = `
        <h2>${p.name} — Deep Telemetry</h2>
        <p style="margin-bottom:0.6rem;font-size:0.88rem;"><strong>Atmosphere:</strong> ${p.atmosphere}</p>
        <p style="margin-bottom:0.6rem;font-size:0.88rem;"><strong>Composition:</strong> ${p.composition}</p>
        <p style="margin-bottom:0.6rem;font-size:0.88rem;"><strong>Avg Distance:</strong> ${p.distance}</p>
        <p style="margin-bottom:0.6rem;font-size:0.88rem;"><strong>Temperature:</strong> ${p.temp}</p>
        <h3 style="margin-top:1.2rem;font-family:'Orbitron',monospace;font-size:0.7rem;color:${p.color}">⟡ ORBITAL LOGS</h3>
        <ul style="padding-left:1.2rem;margin-top:0.6rem;font-size:0.85rem;line-height:1.7;color:#d1d5db;list-style-type:'› ';">
          ${p.facts.map(f => `<li style="padding-left:0.3rem;">${f}</li>`).join('')}
        </ul>
      `;
    openModal(html);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  MOONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
document.getElementById("moons-btn").onclick = () => {
    if (currentIndex === null) return;
    audio.click();
    const p = PLANETS[currentIndex];
    let html = `
        <h2>${p.name} — Satellite Roster</h2>
        <p style="margin-bottom:1rem;font-size:0.88rem;">Tracked Satellites: <strong>${p.moons}</strong></p>
      `;
    if (p.moonsList.length > 0) {
        html += `
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            ${p.moonsList.map(m => `
              <span style="padding:0.35rem 0.75rem;background:rgba(50,74,178,0.12);border:1px solid var(--border);border-radius:0.5rem;font-family:'Orbitron',monospace;font-size:0.65rem;color:#cbd5e1;">
                ${m}
              </span>
            `).join('')}
          </div>
        `;
    } else {
        html += `<p style="color:#64748b;font-size:0.85rem;">No natural orbiting bodies recorded.</p>`;
    }
    openModal(html);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SCALE COMPARISON
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
document.getElementById("scale-btn").onclick = () => {
    audio.click();
    const maxDiam = Math.max(...PLANETS.map(p => p.diameterNum));
    let rows = PLANETS.map(p => {
        const pct = Math.max((p.diameterNum / maxDiam) * 100, 2.5);
        return `
          <div class="scale-row">
            <span class="scale-label">${p.symbol} ${p.name}</span>
            <div class="scale-bar-wrap">
              <div class="scale-bar" style="width:${pct}%;background:${p.color};"></div>
              <span class="scale-val">${p.diameter}</span>
            </div>
          </div>
        `;
    }).join('');

    const html = `
        <h2>📐 Volumetric Scale Comparison</h2>
        <p style="font-size:0.7rem;color:#94a3b8;margin-bottom:1.2rem;">Relative diameters (Jupiter = 100% reference)</p>
        <div>${rows}</div>
      `;
    openModal(html);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  BADGES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
document.getElementById("badges-btn").onclick = () => {
    audio.click();
    const total = PLANETS.length;
    const v = visited.size;
    const html = `
        <h2>🏅 Exploration Achievements</h2>
        <div class="badge-item ${v >= 1 ? 'earned' : ''}">
          <span style="font-size:1.4rem;">🚀</span>
          <div>
            <div style="font-weight:600;font-size:0.88rem;">First Orbit</div>
            <div style="font-size:0.7rem;color:#94a3b8;">Scanned 1 planetary system</div>
            ${v >= 1 ? '✅' : '🔒'}
          </div>
        </div>
        <div class="badge-item ${v >= 4 ? 'earned' : ''}">
          <span style="font-size:1.4rem;">🪐</span>
          <div>
            <div style="font-weight:600;font-size:0.88rem;">System Navigator</div>
            <div style="font-size:0.7rem;color:#94a3b8;">Mapped at least 4 worlds</div>
            ${v >= 4 ? '✅' : `${v}/4`}
          </div>
        </div>
        <div class="badge-item ${v === total ? 'earned' : ''}">
          <span style="font-size:1.4rem;">👑</span>
          <div>
            <div style="font-weight:600;font-size:0.88rem;">Grand Astronomer</div>
            <div style="font-size:0.7rem;color:#94a3b8;">Fully charted all ${total} major planets</div>
            ${v === total ? '✅' : `${v}/${total}`}
          </div>
        </div>
        <div style="margin-top:1rem;padding:0.8rem;background:rgba(50,74,178,0.06);border-radius:0.6rem;border:1px solid var(--border);">
          <span style="font-family:'Orbitron',monospace;font-size:0.6rem;color:#94a3b8;">PROGRESS</span>
          <div style="display:flex;gap:0.3rem;margin-top:0.4rem;flex-wrap:wrap;">
            ${PLANETS.map((p, i) => `
              <span style="font-size:1.1rem;opacity:${visited.has(i) ? 1 : 0.2};filter:${visited.has(i) ? 'none' : 'grayscale(1)'};">
                ${p.symbol}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    openModal(html);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ORBIT MAP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
document.getElementById("map-btn").onclick = () => {
    audio.click();
    const html = `
        <h2>🗺️ Orbital Sector Map</h2>
        <div style="display:flex;flex-direction:column;gap:0.4rem;margin-top:0.8rem;">
          ${PLANETS.map((p, i) => `
            <div class="orbit-map-item" data-planet-idx="${i}" style="border-left-color:${p.color};">
              <span class="om-symbol">${p.symbol}</span>
              <span class="om-name">${p.name}</span>
              <span class="om-dist">${p.distance}</span>
            </div>
          `).join('')}
        </div>
      `;
    openModal(html);

    // Attach listeners in JS instead of relying on inline handlers
    modalBody.querySelectorAll(".orbit-map-item").forEach(el => {
        el.addEventListener("click", () => {
            selectPlanet(parseInt(el.dataset.planetIdx, 10));
            overlay.classList.remove("active");
        });
    });
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SOUND TOGGLE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
document.getElementById("sound-btn").onclick = () => {
    audio.enabled = !audio.enabled;
    document.getElementById("sound-btn").textContent =
        `🔊 Audio: ${audio.enabled ? 'On' : 'Off'}`;
    if (audio.enabled) audio.play(660, 'sine', 0.1);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  MINI-GAME (SPACE DODGE)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const gamePanel = document.getElementById('game-panel');
const gameBackdrop = document.getElementById('game-backdrop');
const gameBtn = document.getElementById('game-btn');
const gameClose = document.getElementById('game-close');
const gameCanvas = document.getElementById('game-canvas');
const gameCtx = gameCanvas.getContext('2d');
const gameScoreEl = document.getElementById('game-score');
const gameLivesEl = document.getElementById('game-lives');
const gameOverlay = document.getElementById('game-overlay');
const gameStartBtn = document.getElementById('game-start');

let gameRunning = false;
let gamePaused = false;
let gameScore = 0;
let gameLives = 3;
let gameLoopId = null;
let keys = {};
let player = { x: 50, y: 50, radius: 12, speed: 4 };
let asteroids = [];
let gameStars = [];
let lastAsteroidSpawn = 0;
let lastStarSpawn = 0;
let lastXPmilestone = 0;

function resizeGameCanvas() {
    // Guard: canvas may not be laid out yet
    if (!gameCanvas || !gameCanvas.parentElement) return;
    const rect = gameCanvas.parentElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    gameCanvas.width = rect.width;
    gameCanvas.height = rect.height;
    player.x = gameCanvas.width / 2;
    player.y = gameCanvas.height - 50;
}

resizeGameCanvas();
window.addEventListener('resize', () => {
    if (gamePanel.classList.contains('active')) resizeGameCanvas();
});

function resetGame() {
    gameScore = 0;
    gameLives = 3;
    player.x = gameCanvas.width / 2;
    player.y = gameCanvas.height - 50;
    asteroids = [];
    gameStars = [];
    lastAsteroidSpawn = 0;
    lastStarSpawn = 0;
    lastXPmilestone = 0;
    updateGameUI();
}

function updateGameUI() {
    gameScoreEl.textContent = `Score: ${gameScore}`;
    gameLivesEl.textContent = `Lives: ${gameLives}`;
}

function spawnAsteroid() {
    const radius = Math.random() * 20 + 10;
    asteroids.push({
        x: Math.random() * (gameCanvas.width - radius * 2) + radius,
        y: -radius,
        radius,
        speed: Math.random() * 2 + 1.5,
        vx: (Math.random() - 0.5) * 1.2,
        color: '#94a3b8'
    });
}

function spawnStar() {
    const radius = 8;
    gameStars.push({
        x: Math.random() * (gameCanvas.width - radius * 2) + radius,
        y: -radius,
        radius,
        speed: 1.8,
        color: '#fde047'
    });
}

function drawPlayer() {
    gameCtx.save();
    gameCtx.translate(player.x, player.y);
    gameCtx.fillStyle = '#38bdf8';
    gameCtx.beginPath();
    gameCtx.moveTo(0, -player.radius * 1.2);
    gameCtx.lineTo(player.radius * 0.8, player.radius);
    gameCtx.lineTo(-player.radius * 0.8, player.radius);
    gameCtx.closePath();
    gameCtx.fill();
    gameCtx.restore();
}

function drawAsteroids() {
    asteroids.forEach(a => {
        gameCtx.fillStyle = a.color;
        gameCtx.beginPath();
        gameCtx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        gameCtx.fill();
        gameCtx.strokeStyle = 'rgba(0,0,0,0.3)';
        gameCtx.lineWidth = 2;
        gameCtx.beginPath();
        gameCtx.arc(a.x, a.y, a.radius * 0.7, 0, Math.PI * 2);
        gameCtx.stroke();
    });
}

function drawStars() {
    gameStars.forEach(s => {
        gameCtx.fillStyle = s.color;
        gameCtx.beginPath();
        gameCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        gameCtx.fill();
        gameCtx.shadowBlur = 10;
        gameCtx.shadowColor = s.color;
        gameCtx.fill();
        gameCtx.shadowBlur = 0;
    });
}

function checkCollisions() {
    for (let i = asteroids.length - 1; i >= 0; i--) {
        const a = asteroids[i];
        const dx = player.x - a.x;
        const dy = player.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < player.radius + a.radius) {
            gameLives--;
            audio.error();
            asteroids.splice(i, 1);
            if (gameLives <= 0) {
                gameOver();
                return;
            }
        }
    }
    for (let i = gameStars.length - 1; i >= 0; i--) {
        const s = gameStars[i];
        const dx = player.x - s.x;
        const dy = player.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < player.radius + s.radius) {
            gameScore += 10;
            audio.play(700, 'triangle', 0.1, 0.05);
            gameStars.splice(i, 1);
            if (gameScore >= lastXPmilestone + 50) {
                lastXPmilestone = gameScore;
                addXP(10);
            }
        }
    }
}

function gameOver() {
    gameRunning = false;
    gameOverlay.classList.add('active');
    const bonusXP = Math.floor(gameScore / 20);
    if (bonusXP > 0) addXP(bonusXP);
}

function updateGame() {
    if (keys['ArrowLeft'] || keys['KeyA']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['KeyD']) player.x += player.speed;
    if (keys['ArrowUp'] || keys['KeyW']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['KeyS']) player.y += player.speed;

    player.x = Math.max(player.radius, Math.min(gameCanvas.width - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(gameCanvas.height - player.radius, player.y));

    const now = Date.now();
    if (now - lastAsteroidSpawn > 1500) {
        spawnAsteroid();
        lastAsteroidSpawn = now;
    }
    if (now - lastStarSpawn > 3000) {
        spawnStar();
        lastStarSpawn = now;
    }

    asteroids.forEach(a => {
        a.y += a.speed;
        a.x += a.vx;
        if (a.y > gameCanvas.height + a.radius) {
            const idx = asteroids.indexOf(a);
            if (idx > -1) asteroids.splice(idx, 1);
        }
    });

    gameStars.forEach(s => {
        s.y += s.speed;
        if (s.y > gameCanvas.height + s.radius) {
            const idx = gameStars.indexOf(s);
            if (idx > -1) gameStars.splice(idx, 1);
        }
    });

    gameScore += 1;
    if (gameScore >= lastXPmilestone + 50) {
        lastXPmilestone = gameScore;
        addXP(10);
    }

    checkCollisions();
    updateGameUI();
}

function drawGame() {
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawStars();
    drawAsteroids();
    drawPlayer();
}

function gameLoop() {
    if (!gameRunning) return;
    updateGame();
    drawGame();
    gameLoopId = requestAnimationFrame(gameLoop);
}

function startGame() {
    resetGame();
    gameOverlay.classList.remove('active');
    gameRunning = true;
    if (gameLoopId) cancelAnimationFrame(gameLoopId);
    gameLoop();
}

function stopGame() {
    gameRunning = false;
    if (gameLoopId) cancelAnimationFrame(gameLoopId);
}

function toggleGamePanel(open) {
    if (open) {
        gamePanel.classList.add('active');
        gameBackdrop.classList.add('active');
        audio.click();
        setTimeout(() => resizeGameCanvas(), 300);
        gameOverlay.classList.add('active');
        if (gameRunning) stopGame();
    } else {
        gamePanel.classList.remove('active');
        gameBackdrop.classList.remove('active');
        stopGame();
    }
}

gameBtn.onclick = () => toggleGamePanel(true);
gameClose.onclick = () => toggleGamePanel(false);
gameBackdrop.onclick = () => toggleGamePanel(false);

gameStartBtn.onclick = () => {
    startGame();
};

/* ✅ FIXED: only blocks game keys when the mini-game is open,
   so typing spaces/arrows inside the Quvix AI input works fine. */
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;

    // Don't hijack keys while typing in the Quvix AI input (or any input)
    const tag = (e.target.tagName || "").toLowerCase();
    const isTyping = tag === "input" || tag === "textarea" || e.target.isContentEditable;

    // Only block game keys when the mini-game panel is actually open
    const gameIsOpen = gamePanel.classList.contains('active');

    if (!isTyping && gameIsOpen &&
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
    }
});
window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

let touchX = null, touchY = null;
gameCanvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = gameCanvas.getBoundingClientRect();
    touchX = touch.clientX - rect.left;
    touchY = touch.clientY - rect.top;
    const dx = touchX - player.x;
    const dy = touchY - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 0) {
        player.x += (dx / dist) * player.speed * 2;
        player.y += (dy / dist) * player.speed * 2;
    }
}, { passive: false });
gameCanvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = gameCanvas.getBoundingClientRect();
    touchX = touch.clientX - rect.left;
    touchY = touch.clientY - rect.top;
    const dx = touchX - player.x;
    const dy = touchY - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 0) {
        player.x += (dx / dist) * player.speed * 2;
        player.y += (dy / dist) * player.speed * 2;
    }
}, { passive: false });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  INIT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    animateStars();
    initNav();
    updateXPUI();
    resizeGameCanvas();
});

window.selectPlanet = selectPlanet;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   QUVIX AI — CHATBOT ENGINE + UI
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function initQuvixAI() {

    const panel     = document.getElementById("quvix-panel");
    const btn       = document.getElementById("quvix-btn");
    const closeBtn  = document.getElementById("qv-close");
    const chatEl    = document.getElementById("qv-chat");
    const inputEl   = document.getElementById("qv-input");
    const sendBtn   = document.getElementById("qv-send");
    const welcomeEl = document.getElementById("qv-welcome");

    let busy = false;
    let firstMessage = true;

    const STOP_WORDS = [
        "a","an","the","is","are","am","was","were",
        "i","me","my","mine",
        "you","your","yours",
        "he","she","it","they","them","their",
        "we","our","ours",
        "to","of","for","from","on","in","at","by","with",
        "can","could","would","should",
        "do","does","did",
        "what","who","when","where","why","how",
        "please","tell","say","about","explain"
    ];

    function randomResponse(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    function now() {
        return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    const intents = [
        { name: "greeting",
          phrases: ["good morning","good afternoon","good evening","helloing"],
          keywords: ["hello","hi","hey","greetings"],
          responses: ["Hello! 👋", "Hi there! 😊", "Hey! How can I help?"] },
        { name: "how_are_you",
          phrases: ["how are you","how are u","how r u","how's it going"],
          keywords: ["feel"],
          responses: ["I'm doing great! Thanks for asking! 😊","I'm doing well! How about you?","Everything's going great!"] },
        { name: "black_hole",
          phrases: ["what is a black hole", "tell me about black holes"],
          keywords: ["black hole", "singularity", "event horizon"],
          responses: [
            "A black hole is a region of spacetime where gravity is so strong that nothing – not even light – can escape. 🕳️",
            "Black holes form when massive stars collapse under their own gravity. The boundary around them is called the event horizon.",
            "At the center of a black hole lies the singularity, where our understanding of physics breaks down."
          ] },
        { name: "universe",
          phrases: ["how big is the universe", "what is the universe"],
          keywords: ["universe", "cosmos"],
          responses: [
            "The observable universe is about 93 billion light-years in diameter. 🌌",
            "The universe contains an estimated 2 trillion galaxies, each with billions of stars.",
            "The universe is expanding – and it's accelerating! We don't fully understand why yet."
          ] },
        { name: "supernova",
          phrases: ["what is a supernova", "tell me about supernovas"],
          keywords: ["supernova", "supernovas", "explosion"],
          responses: [
            "A supernova is a massive star explosion that outshines entire galaxies for a short time! 💥",
            "Supernovas create the heavy elements in the universe we're literally made of stardust.",
            "The last supernova visible to the naked eye was in 1604 – Kepler's Supernova."
          ] },
        { name: "exoplanet",
          phrases: ["what are exoplanets", "tell me about exoplanets", "what is an exoplanet"],
          keywords: ["exoplanet", "exoplanets", "alien"],
          responses: [
            "Exoplanets are planets that orbit stars outside our solar system. Over 5,000 have been discovered! 🌍",
            "Some exoplanets are in the 'habitable zone' – the perfect distance from their star for liquid water.",
            "The James Webb Space Telescope is studying exoplanet atmospheres for signs of life."
          ] },
        { name: "solar_system",
          phrases: ["what is the solar system", "tell me about the solar system"],
          keywords: ["solar system"],
          responses: [
            "The solar system is the Sun and everything bound to it by gravity — planets, moons, asteroids, comets, and more. ☀️",
            "Our solar system has 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.",
            "Beyond Neptune, there's the Kuiper Belt and the distant Oort Cloud."
          ] },
        { name: "sun",
          phrases: ["what is the sun", "tell me about the sun"],
          keywords: ["sun", "solar"],
          responses: [
            "The Sun is a G-type main-sequence star at the center of our solar system. ☀️",
            "The Sun contains about 99.86% of the mass of the entire solar system.",
            "Its core fuses hydrogen into helium, releasing the energy that supports life on Earth."
          ] },
        { name: "moon",
          phrases: ["what is the moon", "tell me about the moon"],
          keywords: ["moon", "luna"],
          responses: [
            "The Moon is Earth's only natural satellite. 🌕",
            "The Moon causes ocean tides and stabilizes Earth's tilt.",
            "It's about 384,400 km away and always shows us the same face."
          ] },
        { name: "mercury",
          phrases: ["what is mercury", "tell me about mercury"],
          keywords: ["mercury"],
          responses: [
            "Mercury is the smallest planet in our solar system and closest to the Sun. 🌑",
            "A day on Mercury lasts about 59 Earth days, but a year is only 88 Earth days!",
            "Mercury has extreme temperatures — scorching hot in daylight and freezing at night."
          ] },
        { name: "venus",
          phrases: ["what is venus", "tell me about venus"],
          keywords: ["venus"],
          responses: [
            "Venus is the second planet from the Sun and the hottest planet in our solar system. 🔥",
            "Venus has a thick carbon dioxide atmosphere and clouds of sulfuric acid.",
            "It's often called Earth's sister planet because of its similar size."
          ] },
        { name: "earth",
          phrases: ["what is earth", "tell me about earth"],
          keywords: ["earth"],
          responses: [
            "Earth is the third planet from the Sun and the only known world with life. 🌍",
            "About 71% of Earth's surface is covered with water.",
            "Earth has one large moon and a protective magnetic field."
          ] },
        { name: "mars",
          phrases: ["what is mars", "tell me about mars"],
          keywords: ["mars", "red planet"],
          responses: [
            "Mars is the fourth planet from the Sun and is known as the Red Planet. 🔴",
            "Mars has the largest volcano in the solar system, Olympus Mons.",
            "Scientists are exploring Mars for signs of ancient life and future human missions."
          ] },
        { name: "jupiter",
          phrases: ["what is jupiter", "tell me about jupiter"],
          keywords: ["jupiter"],
          responses: [
            "Jupiter is the largest planet in our solar system. 🪐",
            "Jupiter's Great Red Spot is a giant storm bigger than Earth.",
            "It has dozens of moons, including Ganymede, the largest moon in the solar system."
          ] },
        { name: "saturn",
          phrases: ["tell me about saturn", "what is saturn"],
          keywords: ["saturn", "rings"],
          responses: [
            "Saturn is the sixth planet from the Sun and is famous for its beautiful ring system made of ice and rock. 🪐",
            "Saturn is a gas giant, mostly hydrogen and helium, and has at least 146 known moons!",
            "Saturn's rings span over 280,000 km but are only about 10 meters thick."
          ] },
        { name: "uranus",
          phrases: ["what is uranus", "tell me about uranus"],
          keywords: ["uranus"],
          responses: [
            "Uranus is the seventh planet from the Sun and an ice giant. 🧊",
            "Uranus rotates on its side, likely because of a massive ancient collision.",
            "It has faint rings and a blue-green color from methane in its atmosphere."
          ] },
        { name: "neptune",
          phrases: ["what is neptune", "tell me about neptune"],
          keywords: ["neptune"],
          responses: [
            "Neptune is the eighth planet from the Sun and the farthest known planet. 🔵",
            "Neptune has the fastest winds in the solar system, over 2,000 km/h.",
            "It was discovered through mathematical predictions before being seen through a telescope."
          ] },
        { name: "pluto",
          phrases: ["what is pluto", "tell me about pluto"],
          keywords: ["pluto", "dwarf planet"],
          responses: [
            "Pluto is a dwarf planet in the Kuiper Belt. ❄️",
            "Pluto was considered the ninth planet until 2006, when it was reclassified as a dwarf planet.",
            "NASA's New Horizons flew past Pluto in 2015, revealing mountains and ice plains."
          ] },
        { name: "asteroid",
          phrases: ["what is an asteroid", "tell me about asteroids"],
          keywords: ["asteroid", "asteroids"],
          responses: [
            "Asteroids are rocky remnants left over from the early formation of the solar system. ☄️",
            "Most asteroids live in the Asteroid Belt between Mars and Jupiter.",
            "Some asteroids are so large they have their own moons!"
          ] },
        { name: "comet",
          phrases: ["what is a comet", "tell me about comets"],
          keywords: ["comet", "comets"],
          responses: [
            "A comet is an icy body that releases gas and dust as it approaches the Sun. ☄️",
            "Comets often grow a glowing coma and a long tail pointing away from the Sun.",
            "Some comets return periodically, like Halley's Comet every 76 years."
          ] },
        { name: "galaxy",
          phrases: ["what is a galaxy", "tell me about galaxies"],
          keywords: ["galaxy", "galaxies"],
          responses: [
            "A galaxy is a huge collection of stars, gas, dust, and dark matter held together by gravity. 🌌",
            "There are billions of galaxies in the observable universe.",
            "Galaxies come in shapes like spiral, elliptical, and irregular."
          ] },
        { name: "milky_way",
          phrases: ["what is the milky way", "tell me about the milky way"],
          keywords: ["milky way"],
          responses: [
            "The Milky Way is the galaxy that contains our solar system. 🌌",
            "It's a barred spiral galaxy about 100,000 light-years across.",
            "The Milky Way contains hundreds of billions of stars."
          ] },
        { name: "nebula",
          phrases: ["what is a nebula", "tell me about nebulas"],
          keywords: ["nebula", "nebulas"],
          responses: [
            "A nebula is a giant cloud of gas and dust in space. ☁️",
            "Some nebulas are star nurseries where new stars are born.",
            "Others are formed when dying stars shed their outer layers."
          ] },
        { name: "star",
          phrases: ["what is a star", "tell me about stars"],
          keywords: ["star", "stars", "fusion"],
          responses: [
            "A star is a massive ball of plasma that shines through nuclear fusion. ⭐",
            "Stars are born in nebulas and spend most of their lives fusing hydrogen into helium.",
            "The closest star to Earth is the Sun, about 93 million miles away."
          ] },
        { name: "big_bang",
          phrases: ["what is the big bang", "tell me about the big bang"],
          keywords: ["big bang"],
          responses: [
            "The Big Bang is the leading theory for how the universe began about 13.8 billion years ago. 💥",
            "It wasn't an explosion in space — it was the expansion of space itself.",
            "Evidence includes cosmic microwave background radiation and the movement of galaxies."
          ] },
        { name: "dark_matter",
          phrases: ["what is dark matter", "tell me about dark matter"],
          keywords: ["dark matter"],
          responses: [
            "Dark matter is mysterious matter that doesn't emit light, but affects gravity. 🌑",
            "We can't see it directly, but its gravity holds galaxies together.",
            "Dark matter makes up about 27% of the universe."
          ] },
        { name: "dark_energy",
          phrases: ["what is dark energy", "tell me about dark energy"],
          keywords: ["dark energy"],
          responses: [
            "Dark energy is a mysterious force causing the universe's expansion to accelerate. 🌌",
            "It makes up about 68% of the universe.",
            "Nobody knows exactly what dark energy is — it's one of the biggest mysteries in physics."
          ] },
        { name: "light_year",
          phrases: ["what is a light year", "tell me about light years"],
          keywords: ["light year", "light years"],
          responses: [
            "A light-year is the distance light travels in one year — about 9.46 trillion km. 💫",
            "It measures distance, not time.",
            "Proxima Centauri, the nearest star after the Sun, is about 4.24 light-years away."
          ] },
        { name: "james_webb",
          phrases: ["what is the james webb telescope", "tell me about james webb"],
          keywords: ["james webb", "jwst"],
          responses: [
            "The James Webb Space Telescope is the most powerful space telescope ever launched. 🔭",
            "It observes infrared light to study the early universe, exoplanets, and star formation.",
            "JWST launched in December 2021 and orbits the Sun about 1.5 million km from Earth."
          ] },
        { name: "iss",
          phrases: ["what is the iss", "tell me about the international space station"],
          keywords: ["iss", "space station", "international space station"],
          responses: [
            "The International Space Station is a habitable laboratory orbiting Earth. 🛰️",
            "It orbits about 400 km above Earth and completes an orbit every 90 minutes.",
            "Astronauts live and work there conducting science experiments in microgravity."
          ] },
        { name: "astronaut",
          phrases: ["what is an astronaut", "tell me about astronauts"],
          keywords: ["astronaut", "astronauts", "cosmonaut"],
          responses: [
            "An astronaut is a person trained to travel and work in space. 👩‍🚀",
            "Astronauts train for years in simulators, underwater, and in extreme environments.",
            "They experience microgravity, which makes everyday tasks very different."
          ] },
        { name: "gravity",
          phrases: ["what is gravity", "tell me about gravity"],
          keywords: ["gravity"],
          responses: [
            "Gravity is the force that attracts objects with mass toward each other. 🌍",
            "It keeps planets in orbit, stars together, and galaxies bound.",
            "Einstein described gravity as the bending of spacetime."
          ] },
        { name: "eclipse",
          phrases: ["what is an eclipse", "tell me about eclipses"],
          keywords: ["eclipse", "solar eclipse", "lunar eclipse"],
          responses: [
            "An eclipse happens when one celestial body blocks the light of another. 🌒",
            "A solar eclipse occurs when the Moon blocks the Sun.",
            "A lunar eclipse occurs when Earth's shadow falls on the Moon."
          ] },
        { name: "aurora",
          phrases: ["what is an aurora", "tell me about auroras"],
          keywords: ["aurora", "auroras", "northern lights", "southern lights"],
          responses: [
            "Auroras are colorful lights in the sky caused by solar particles hitting Earth's atmosphere. 🌌",
            "In the north they're called aurora borealis, and in the south aurora australis.",
            "They glow green, red, purple, and blue depending on the gas and altitude."
          ] }
    ];

    function normalize(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .replace(/\s+/g, " ")
            .trim();
    }

    function levenshtein(a, b) {
        const m = a.length, n = b.length;
        if (m === 0) return n;
        if (n === 0) return m;
        const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + cost
                );
            }
        }
        return dp[m][n];
    }

    function similarity(a, b) {
        if (!a.length || !b.length) return 0;
        return 1 - levenshtein(a, b) / Math.max(a.length, b.length);
    }

    const SIMILARITY_THRESHOLD = 0.65;
    const MIN_SCORE = 2.0;

    function scoreIntent(intent, userInput) {
        const text = normalize(userInput);
        const inputWords = text.split(" ").filter(Boolean);
        let score = 0;

        for (const phrase of intent.phrases || []) {
            const p = normalize(phrase);
            if (text === p) score += 10;
            else if (text.includes(p)) score += 6;
            else {
                const pWords = p.split(" ");
                const matches = pWords.filter(pw =>
                    inputWords.some(iw => similarity(iw, pw) >= SIMILARITY_THRESHOLD)
                ).length;
                if (pWords.length) score += (matches / pWords.length) * 4;
            }
        }

        for (const keyword of intent.keywords || []) {
            const k = normalize(keyword);
            if (!k) continue;
            if (text.includes(k)) {
                score += k.includes(" ") ? 5 : 3;
            } else {
                const kW = k.split(" ");
                const matches = kW.filter(kw =>
                    inputWords.some(iw => similarity(iw, kw) >= SIMILARITY_THRESHOLD)
                ).length;
                if (kW.length) score += (matches / kW.length) * 2;
            }
        }

        const targetWords = new Set([
            ...(intent.phrases || []).flatMap(p => normalize(p).split(" ")),
            ...(intent.keywords || []).flatMap(k => normalize(k).split(" "))
        ]);
        const meaningfulInput = inputWords.filter(w => !STOP_WORDS.includes(w));
        const overlap = meaningfulInput.filter(w => targetWords.has(w)).length;
        score += overlap * 0.5;

        return score;
    }

    function getResponse(message) {
        const text = normalize(message);
        if (!text) return "Say something and I'll do my best! 🚀";

        let bestIntent = null;
        let bestScore = 0;
        for (const intent of intents) {
            const s = scoreIntent(intent, message);
            if (s > bestScore) {
                bestScore = s;
                bestIntent = intent;
            }
        }

        if (!bestIntent || bestScore < MIN_SCORE) {
            return "Hmm, I'm not sure about that one. Try asking about black holes, Saturn, supernovas, exoplanets, or any planet! 🚀";
        }
        return randomResponse(bestIntent.responses);
    }

    function addMsg(text, type) {
        if (type === "user" && firstMessage && welcomeEl) {
            welcomeEl.remove();
            firstMessage = false;
        }

        const wrap = document.createElement("div");
        wrap.className = "qv-msg-wrap qv-" + type;

        if (type === "ai") {
            const avatar = document.createElement("div");
            avatar.className = "qv-avatar";
            avatar.textContent = "AI";
            wrap.appendChild(avatar);
        }

        const content = document.createElement("div");
        content.className = "qv-msg-content";

        const bubble = document.createElement("div");
        bubble.className = "qv-bubble qv-" + type;
        bubble.textContent = text;
        bubble.innerHTML = bubble.innerHTML.replace(/\n/g, "<br>");

        const ts = document.createElement("div");
        ts.className = "qv-ts";
        ts.textContent = now();

        content.appendChild(bubble);
        content.appendChild(ts);
        wrap.appendChild(content);
        chatEl.appendChild(wrap);
        chatEl.scrollTop = chatEl.scrollHeight;
    }

    function showTyping() {
        document.getElementById("qv-typing")?.remove();
        const wrap = document.createElement("div");
        wrap.className = "qv-msg-wrap qv-ai";
        wrap.id = "qv-typing";
        wrap.innerHTML = `
            <div class="qv-avatar">AI</div>
            <div class="qv-msg-content">
                <div class="qv-bubble qv-ai qv-typing-bub">
                    <span class="qv-dot"></span>
                    <span class="qv-dot"></span>
                    <span class="qv-dot"></span>
                </div>
            </div>
        `;
        chatEl.appendChild(wrap);
        chatEl.scrollTop = chatEl.scrollHeight;
    }
    function hideTyping() {
        document.getElementById("qv-typing")?.remove();
    }

    function send() {
        const text = inputEl.value.trim();
        if (!text || busy) return;

        if (text.toLowerCase() === "delete") {
            chatEl.innerHTML = `
                <div id="qv-welcome">
                    <h1>Quvix AI</h1>
                    <p>Ask me anything about space!</p>
                </div>`;
            firstMessage = true;
            inputEl.value = "";
            return;
        }

        addMsg(text, "user");
        inputEl.value = "";
        busy = true;
        sendBtn.disabled = true;
        showTyping();

        setTimeout(() => {
            hideTyping();
            addMsg(getResponse(text), "ai");
            busy = false;
            sendBtn.disabled = false;
            inputEl.focus();
        }, 500 + Math.random() * 500);
    }

    function openPanel() {
        panel.classList.add("active");
        btn.classList.add("open");
        setTimeout(() => inputEl.focus(), 300);
        if (typeof audio !== "undefined" && audio.play) {
            audio.play(660, "sine", 0.08, 0.04);
        }
    }
    function closePanel() {
        panel.classList.remove("active");
        btn.classList.remove("open");
    }
    function togglePanel() {
        if (panel.classList.contains("active")) closePanel();
        else openPanel();
    }

    window.quvixUseCmd = function (cmd) {
        inputEl.value = cmd;
        inputEl.focus();
    };
    window.quvixOpen = openPanel;
    window.quvixClose = closePanel;
    window.quvixToggle = togglePanel;

    btn.addEventListener("click", togglePanel);
    closeBtn.addEventListener("click", closePanel);
    sendBtn.addEventListener("click", send);
    inputEl.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            send();
        }
    });

})();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  MUSIC (DEBUG VERSION)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

if (music && musicBtn) {
    // Log any load errors from the <audio> element
    music.addEventListener("error", () => {
        console.error("🎵 MUSIC ERROR:", music.error);
        musicBtn.textContent = "⚠️ Music";
        musicBtn.classList.remove("playing");
    });

    musicBtn.addEventListener("click", () => {
        console.log("🎵 Button clicked. paused =", music.paused, "| readyState =", music.readyState);

        if (music.paused) {
            music.play()
                .then(() => {
                    console.log("✅ Play succeeded");
                    musicBtn.textContent = "🔇 Mute";
                    musicBtn.classList.add("playing");
                })
                .catch((err) => {
                    console.error("❌ Play rejected:", err.name, err.message);
                    musicBtn.textContent = "🎵 Music";
                    musicBtn.classList.remove("playing");
                });
        } else {
            music.pause();
            console.log("⏸️ Paused");
            musicBtn.textContent = "🎵 Music";
            musicBtn.classList.remove("playing");
        }
    });

    // Auto-start on first click anywhere (skips the music button itself)
    document.addEventListener('click', function firstClick(e) {
        if (e.target.closest('#musicBtn')) {
            document.removeEventListener('click', firstClick);
            return;
        }
        if (music.paused) {
            music.play().then(() => {
                musicBtn.textContent = "🔇 Mute";
                musicBtn.classList.add("playing");
            }).catch((err) => {
                console.warn("Auto-start blocked:", err.name);
            });
        }
        document.removeEventListener('click', firstClick);
    }, { once: true });
}