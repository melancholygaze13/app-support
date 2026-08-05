const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";

  if (themeToggle) {
    const nextTheme = isDark ? "light" : "dark";
    const label = `Switch to ${nextTheme} theme`;
    themeToggle.setAttribute("aria-label", label);
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.title = label;
  }

  if (themeColor) {
    themeColor.content = isDark ? "#10161f" : "#eef3fb";
  }
}

setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);

  try {
    localStorage.setItem("theme", nextTheme);
  } catch (error) {
    // The selected theme still applies when storage is unavailable.
  }
});

const appCards = document.querySelectorAll(".app-card");

appCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
  });
});

const screenshotCards = document.querySelectorAll(".screenshot-card");
const screenshotLightbox = document.querySelector(".screenshot-lightbox");
const lightboxImage = screenshotLightbox?.querySelector(".lightbox-image");
const lightboxCaption = screenshotLightbox?.querySelector(".lightbox-caption");
const lightboxClose = screenshotLightbox?.querySelector(".lightbox-close");

if (screenshotLightbox && lightboxImage && lightboxCaption && lightboxClose) {
  screenshotCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      const image = card.querySelector("img");
      const caption = card.querySelector("span");

      if (!image || !caption) return;

      event.preventDefault();
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = caption.textContent;
      document.body.classList.add("lightbox-open");
      screenshotLightbox.showModal();
    });
  });

  lightboxClose.addEventListener("click", () => screenshotLightbox.close());

  screenshotLightbox.addEventListener("click", (event) => {
    if (event.target === screenshotLightbox) screenshotLightbox.close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && screenshotLightbox.open) {
      event.preventDefault();
      screenshotLightbox.close();
    }
  });

  screenshotLightbox.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
  });
}
