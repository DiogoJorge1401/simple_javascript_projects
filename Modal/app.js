const openModalBtn = document.querySelector(".btn");
const closeModalBtn = document.querySelector(".close-btn");
const modal = document.querySelector(".modal-overlay");

openModalBtn.addEventListener("click", toggleModal('add'));
closeModalBtn.addEventListener("click", toggleModal('remove'));

function toggleModal(action) {
  return () => {
    modal.classList[action]("open-modal");
  };
}
