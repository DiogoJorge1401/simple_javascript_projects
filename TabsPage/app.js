const tabBtns = document.querySelectorAll(".tab-btn");
const sectionContens = document.querySelectorAll(".content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", (el) => {
    const sectionId = el.target.dataset.id;

    tabBtns.forEach((btn) => btn.classList.remove("active"));

    sectionContens.forEach((section) => section.classList.remove("active"));

    sectionContens.forEach((section) => {
      if (sectionId === section.id) section.classList.add("active");
    });

    el.target.classList.add("active");
  });
});
