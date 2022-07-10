const btnToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

btnToggle.addEventListener("click", () => {
  links.classList.toggle("show-links");
});
