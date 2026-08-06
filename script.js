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
const screenshotGrid = document.querySelector(".screenshot-grid");
const screenshotLightbox = document.querySelector(".screenshot-lightbox");
const lightboxImage = screenshotLightbox?.querySelector(".lightbox-image");
const lightboxClose = screenshotLightbox?.querySelector(".lightbox-close");

function balanceScreenshotGrid(grid) {
  const cards = Array.from(grid.querySelectorAll(".screenshot-card"));

  if (!cards.length || !grid.clientWidth) return;

  const targetRowHeight = 330;
  const ratios = cards.map((card, index) => {
    const image = card.querySelector("img");
    card.style.setProperty("--tile-index", index);
    return Number(image?.getAttribute("width")) / Number(image?.getAttribute("height")) || 1;
  });
  const totalRatio = ratios.reduce((sum, ratio) => sum + ratio, 0);
  const rowCount = Math.max(1, Math.min(cards.length, Math.round(totalRatio * targetRowHeight / grid.clientWidth)));
  let remainingRatio = totalRatio;
  let remainingRows = rowCount;
  let cardIndex = 0;

  for (let row = 0; row < rowCount; row += 1) {
    const rowStart = cardIndex;
    const targetRatio = remainingRatio / remainingRows;
    let rowRatio = 0;

    while (cardIndex < cards.length) {
      const ratio = ratios[cardIndex];
      const cardsLeftAfterThis = cards.length - cardIndex - 1;
      const mustLeaveOnePerRow = cardsLeftAfterThis < remainingRows - 1;
      const closerWithoutNext = rowRatio > 0 && Math.abs(targetRatio - rowRatio) <= Math.abs(targetRatio - rowRatio - ratio);

      if (mustLeaveOnePerRow || closerWithoutNext) break;

      rowRatio += ratio;
      cardIndex += 1;
    }

    if (cardIndex === rowStart) {
      rowRatio += ratios[cardIndex];
      cardIndex += 1;
    }

    for (let item = rowStart; item < cardIndex; item += 1) {
      cards[item].style.setProperty("--image-ratio", ratios[item]);
      cards[item].style.setProperty("--row-ratio-sum", rowRatio);
    }

    remainingRatio -= rowRatio;
    remainingRows -= 1;
  }
}

if (screenshotGrid) {
  let screenshotGridWidth = Math.round(screenshotGrid.clientWidth);
  balanceScreenshotGrid(screenshotGrid);

  if ("ResizeObserver" in window) {
    const screenshotGridObserver = new ResizeObserver(([entry]) => {
      const nextWidth = Math.round(entry.contentRect.width);

      if (nextWidth === screenshotGridWidth) return;

      screenshotGridWidth = nextWidth;
      balanceScreenshotGrid(screenshotGrid);
    });
    screenshotGridObserver.observe(screenshotGrid);
  } else {
    window.addEventListener("resize", () => balanceScreenshotGrid(screenshotGrid));
  }
}

if (screenshotLightbox && lightboxImage && lightboxClose) {
  screenshotCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      const image = card.querySelector("img");

      if (!image) return;

      event.preventDefault();
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
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
