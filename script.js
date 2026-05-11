const cursorGlow = document.querySelector(".cursor-glow");

function moveCursorGlow(event) {
  document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
}

if (cursorGlow && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("pointermove", moveCursorGlow, { passive: true });
}

function applySilentLoop(video) {
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.autoplay = true;

  if (video.dataset.playbackRate) {
    const playbackRate = Number.parseFloat(video.dataset.playbackRate);
    video.playbackRate = playbackRate;
    video.defaultPlaybackRate = playbackRate;
  }
}

function attachMediaFallback(media, fallback) {
  const hideFallback = () => {
    fallback.hidden = true;
  };

  const showFallback = () => {
    fallback.hidden = false;
  };

  if (media.readyState > 0 || media.complete) {
    hideFallback();
  }

  media.addEventListener("canplay", hideFallback);
  media.addEventListener("loadeddata", hideFallback);
  media.addEventListener("loadedmetadata", hideFallback);
  media.addEventListener("load", hideFallback);
  media.addEventListener("error", showFallback);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".video-frame, .feature-media").forEach((frame) => {
  const media = frame.querySelector("video, img");
  const fallback = frame.querySelector(".media-fallback");
  if (media && fallback) attachMediaFallback(media, fallback);
});

document.querySelectorAll("video").forEach(applySilentLoop);
