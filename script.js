const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const appCards = document.querySelectorAll(".app-card");

appCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
  });
});
