const date = document.querySelector("#date");
date.textContent = new Date().getFullYear();

const navToggleBtn = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggleBtn.addEventListener("click", () => {
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  if (!containerHeight) linksContainer.style.height = `${linksHeight}px`;
  else linksContainer.style.height = 0;
});

const navbar = document.querySelector("#nav");
const backToTopBtn = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const navbarHeight = navbar.getBoundingClientRect().height;
  if (this.scrollY >= navbarHeight) navbar.classList.add("fixed-nav");
  else navbar.classList.remove("fixed-nav");

  if (this.scrollY >= 500) backToTopBtn.classList.add("show-link");
  else backToTopBtn.classList.remove("show-link");
});

const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav) position = position + 40 - navHeight;
    if (containerHeight > 0) position += containerHeight;

    window.scrollTo({
      left: 0,
      top: position,
    });
    // close
    linksContainer.style.height = 0;
  });
});
