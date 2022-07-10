let count = 0;

const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");

btns.forEach((btn) => {
  btn.addEventListener("click", function (ev) {
    updateCount.call(this);
    updateValueColor();
    value.textContent = count;
  });
});

function updateValueColor() {
  if (count > 0) value.style.color = "green";
  else if (count < 0) value.style.color = "red";
  else value.style.color = "";
}

function updateCount() {
  if (this.className.includes("decrease")) count--;
  else if (this.className.includes("increase")) count++;
  else count = 0;
}
