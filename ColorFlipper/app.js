const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];
const btn = document.querySelector("#btn");
const color = document.querySelector(".color");

btn.addEventListener("click", () => {
  const number = getRandomNumber();
  const colorValue = colors[number];
  
  color.textContent = colorValue;
  document.body.style.backgroundColor = colorValue;
});

function getRandomNumber() {
  return Math.floor(Math.random() * colors.length);
}
