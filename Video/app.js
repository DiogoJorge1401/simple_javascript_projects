const btn = document.querySelector(".switch-btn");
const video = document.querySelector(".video-container");
const preloader = document.querySelector(".preloader");

window.addEventListener("load", () =>
  preloader.classList.add("hide-preloader")
);

btn.addEventListener("click", () => {
  if (!btn.classList.contains("slide")) video.pause();
  else video.play();
  btn.classList.toggle("slide");
});
