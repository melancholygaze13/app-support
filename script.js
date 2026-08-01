document.getElementById("year").textContent = new Date().getFullYear();

const appCards = document.querySelectorAll(".app-card");

appCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
  });
});

const supportLink = document.querySelector('.site-header a[href="#chordgrid-support"]');
const supportTarget = document.getElementById("chordgrid-support");

function scrollToSupport(behavior = "smooth") {
  if (!supportTarget) return;

  const header = document.querySelector(".site-header");
  const supportPanel = supportTarget.nextElementSibling;
  const appCard = supportTarget.closest(".app-card");
  const topInset = (header?.getBoundingClientRect().bottom ?? 0) + 24;
  const availableHeight = window.innerHeight - topInset - 24;
  let landingElement = supportPanel;

  // On tall screens the complete product card fits, so keep it intact. On
  // shorter screens, show the support panel and its transition row together
  // whenever possible instead of leaving a random slice of the hero visible.
  if (appCard && appCard.offsetHeight <= availableHeight) {
    landingElement = appCard;
  } else if (
    supportPanel &&
    supportTarget.offsetHeight + supportPanel.offsetHeight <= availableHeight
  ) {
    landingElement = supportTarget;
  }

  const top = window.scrollY + landingElement.getBoundingClientRect().top - topInset;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

supportLink?.addEventListener("click", (event) => {
  event.preventDefault();

  if (window.location.hash !== "#chordgrid-support") {
    window.history.pushState(null, "", "#chordgrid-support");
  }

  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  scrollToSupport(behavior);
});

window.addEventListener("load", () => {
  if (window.location.hash === "#chordgrid-support") {
    window.requestAnimationFrame(() => scrollToSupport("auto"));
  }
});

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#chordgrid-support") {
    window.requestAnimationFrame(() => scrollToSupport("auto"));
  }
});
