const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");

slides.forEach((slide, idx) => {
  slide.style.left = `${idx * 100}%`;
});

let counter = 0;

nextBtn.addEventListener("click", () => {
  counter = counter + 1 === slides.length ? 0 : counter + 1;
  carousel();
});

prevBtn.addEventListener("click", () => {
  counter = counter - 1 < 0 ? slides.length - 1 : counter - 1;
  carousel();
});

function carousel() {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}
