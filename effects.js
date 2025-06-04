// === EFFECT 1: Phrase Word Glitch ===
function glitchPhraseWord(selector = "#phrase") {
  const el = document.querySelector(selector);
  if (!el) return;

  const original = el.innerText.trim();
  const words = original.split(" ");
  if (words.length < 2) return;

  const glitchWords = [
    "NULL", "█▓▒░", "REMOVED", "UNKNOWN", "???", "<glitch>", "ERROR", "~", "0000", "ghost", "noise"
  ];

  const indexToReplace = Math.floor(Math.random() * words.length);
  const originalWord = words[indexToReplace];
  const glitchWord = glitchWords[Math.floor(Math.random() * glitchWords.length)];

  setTimeout(() => {
    words[indexToReplace] = glitchWord;
    el.innerText = words.join(" ");

    setTimeout(() => {
      words[indexToReplace] = originalWord;
      el.innerText = words.join(" ");
    }, 1500);
  }, 3000);
}

// === EFFECT 2: Glitch Text Distortion ===
function glitchText() {
  const targets = [
    document.querySelector("h1"),
    document.getElementById("version"),
    document.getElementById("phrase")
  ];
  const el = targets[Math.floor(Math.random() * targets.length)];
  if (!el) return;

  setTimeout(() => {
    el.classList.add("glitch");
    setTimeout(() => {
      el.classList.remove("glitch");
    }, 800);
  }, 2500);
}

// === EFFECT 3: Secret Audio on Version Click ===
function bindSecretAudio() {
  const secretAudioClips = ["audio/moan_E0F3ZJz.mp3"];

  const versionEl = document.getElementById("version");
  if (!versionEl) return;

  versionEl.addEventListener("click", () => {
    const src = secretAudioClips[Math.floor(Math.random() * secretAudioClips.length)];
    console.log("🔊 Secret triggered:", src);

    const audio = new Audio(src);
    audio.volume = 1;
    audio.play().catch(err => {
      console.error("Secret audio failed:", err);
    });
  });
}

// === Mobile Detection Helper ===
function isMobileDevice() {
  return (
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 1) ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

// === EFFECT 4: Real Cursor Clones (Exponential Chaos) ===
function startCursorChaos() {
  if (isMobileDevice()) {
    console.log("Skipping cursor chaos on mobile.");
    return;
  }
  const cursorSVG = `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 2L20 12L13 13L14 20L3 2Z" stroke="black" stroke-width="1"/>
    </svg>
  `;

  const max = 64;
  let count = 1;
  const clones = [];
  let rafId = null;
  let interval = null;
  let inactivityTimeout = null;
  const maxDuration = 10000;
  const originalCursor = document.body.style.cursor;

  function renderPositions(e) {
    clones.forEach((c, i) => {
      const delay = i * 15;
      setTimeout(() => {
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        c.style.left = `${e.clientX + offsetX}px`;
        c.style.top = `${e.clientY + offsetY}px`;
      }, delay);
    });
  }

  function updatePositions(e) {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => renderPositions(e));
    resetInactivity();
  }

  function resetInactivity() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(cleanup, maxDuration);
  }

  function cleanup() {
    clearInterval(interval);
    document.removeEventListener("mousemove", updatePositions);
    cancelAnimationFrame(rafId);
    clearTimeout(inactivityTimeout);
    clones.forEach(c => c.remove());
    clones.length = 0;
    document.body.style.cursor = originalCursor;
  }

  function spawnClones(n) {
    const remaining = max - clones.length;
    const toCreate = Math.min(n, remaining);
    for (let i = 0; i < toCreate; i++) {
      const c = document.createElement("div");
      c.className = "cursor-copy";
      c.innerHTML = cursorSVG;
      document.body.appendChild(c);
      clones.push(c);
    }
  }

  document.body.style.cursor = "none";
  document.addEventListener("mousemove", updatePositions);
  spawnClones(count);
  resetInactivity();

  interval = setInterval(() => {
    count *= 2;
    spawnClones(count);
    if (clones.length >= max) {
      clearInterval(interval);
    }
  }, 500);
}

// === Inject Cursor Clone Styling ===
const style = document.createElement("style");
style.innerHTML = `
  .cursor-copy {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    width: 20px;
    height: 20px;
    opacity: 0.8;
    transition: transform 0.1s ease-out;
  }
`;
document.head.appendChild(style);

// === Run All Effects ===
function runEffects() {
  glitchPhraseWord();

  const roll = Math.random();
  if (roll < 0.65) {
    glitchText();
  } else if (roll < 0.75) {
    startCursorChaos();
  }

  bindSecretAudio();
}
