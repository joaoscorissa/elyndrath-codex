const header = document.querySelector("[data-header]");
const navLinks = [...document.querySelectorAll(".codex-nav a")]
  .filter((link) => link.getAttribute("href")?.startsWith("#"));
const leafField = document.querySelector("[data-leaf-field]");
const revealItems = [...document.querySelectorAll(".reveal")];
const backgroundAudio = document.querySelector("[data-background-audio]");
const audioToggle = document.querySelector("[data-audio-toggle]");
const audioLabel = document.querySelector("[data-audio-label]");
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function setActiveSection() {
  const marker = window.scrollY + window.innerHeight * 0.34;
  let activeId = sections[0]?.id;

  for (const section of sections) {
    if (section.offsetTop <= marker) {
      activeId = section.id;
    }
  }

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
  });
}

function createLeaves() {
  if (!leafField || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const fragment = document.createDocumentFragment();
  const leafCount = Math.min(28, Math.max(14, Math.floor(window.innerWidth / 52)));

  for (let index = 0; index < leafCount; index += 1) {
    const leaf = document.createElement("span");
    const duration = 14 + Math.random() * 16;
    const delay = Math.random() * -24;
    const drift = -80 + Math.random() * 160;
    const size = 0.7 + Math.random() * 0.9;

    leaf.className = "leaf";
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.setProperty("--fall-duration", `${duration}s`);
    leaf.style.setProperty("--fall-delay", `${delay}s`);
    leaf.style.setProperty("--fall-drift", `${drift}px`);
    leaf.style.transform = `scale(${size})`;
    leaf.style.opacity = `${0.18 + Math.random() * 0.28}`;
    fragment.appendChild(leaf);
  }

  leafField.appendChild(fragment);
}

function setupBackgroundAudio() {
  if (!backgroundAudio || !audioToggle) {
    return;
  }

  const audioPreferenceKey = "elyndrath-audio-enabled";
  const quietVolume = 0.18;
  let audioContext;
  let audioSource;
  let gainNode;

  try {
    backgroundAudio.volume = quietVolume;
  } catch {
    // Some browsers do not expose programmatic media volume.
  }

  const prepareAudioGraph = () => {
    if (gainNode || !("AudioContext" in window || "webkitAudioContext" in window)) {
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContextClass();
      audioSource = audioContext.createMediaElementSource(backgroundAudio);
      gainNode = audioContext.createGain();
      gainNode.gain.value = quietVolume;
      audioSource.connect(gainNode).connect(audioContext.destination);
    } catch {
      audioContext = null;
      audioSource = null;
      gainNode = null;
    }
  };

  const setAudioState = (isPlaying) => {
    audioToggle.classList.toggle("is-playing", isPlaying);
    audioToggle.setAttribute("aria-pressed", String(isPlaying));
    if (audioLabel) {
      audioLabel.textContent = isPlaying ? "Trilha ligada" : "Trilha";
    }
  };

  const playAudio = async () => {
    try {
      prepareAudioGraph();
      if (audioContext?.state === "suspended") {
        await audioContext.resume();
      }
      await backgroundAudio.play();
      localStorage.setItem(audioPreferenceKey, "true");
      setAudioState(true);
    } catch {
      setAudioState(false);
    }
  };

  const pauseAudio = () => {
    backgroundAudio.pause();
    localStorage.setItem(audioPreferenceKey, "false");
    setAudioState(false);
  };

  audioToggle.addEventListener("click", () => {
    if (backgroundAudio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  });

  const tryAutoplayAfterGesture = () => {
    if (localStorage.getItem(audioPreferenceKey) === "true" && backgroundAudio.paused) {
      playAudio();
    }
  };

  window.addEventListener("pointerdown", tryAutoplayAfterGesture, { once: true, passive: true });
  window.addEventListener("keydown", tryAutoplayAfterGesture, { once: true });

  if (localStorage.getItem(audioPreferenceKey) === "true") {
    playAudio();
  } else {
    setAudioState(false);
  }
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
createLeaves();
setupBackgroundAudio();
updateHeader();
setActiveSection();

window.addEventListener("scroll", () => {
  updateHeader();
  setActiveSection();
}, { passive: true });

window.addEventListener("resize", setActiveSection);
