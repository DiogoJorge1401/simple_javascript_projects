const btnToggle = document.querySelectorAll(".btn-toggle");
const sideBar = document.querySelector("aside");

btnToggle.forEach(btn=>{
  btn.addEventListener('click',()=>{
  sideBar.classList.toggle("show-sidebar");
  })
})