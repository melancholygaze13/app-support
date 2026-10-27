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
    themeColor.content = isDark ? "#101314" : "#f5f2ec";
  }
}

setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");

function storedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (error) {
    return null;
  }
}

// Follow system appearance changes until the visitor picks a theme with the toggle.
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  if (!storedTheme()) {
    setTheme(event.matches ? "dark" : "light");
  }
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);

  try {
    localStorage.setItem("theme", nextTheme);
  } catch (error) {
    // The selected theme still applies when storage is unavailable.
  }
});

// Keep looping videos still for visitors who prefer reduced motion.
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("video[autoplay]").forEach((video) => {
    video.removeAttribute("autoplay");
    video.pause();
  });
}
