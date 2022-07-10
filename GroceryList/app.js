const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.querySelector("#grocery");
const submitBtn = document.querySelector(".submit-btn");

const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

const deleteBtns = document.querySelectorAll(".delete-btn");
const editBtn = document.querySelectorAll(".edi-btn");

let editElement;
let editFlag = false;
let editId = "";

form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

window.addEventListener("DOMContentLoaded", () => {
  const groceries = getGroceries();
  if (groceries.length) {
    groceries.forEach(({ id, value }) => createGroceryElement(id, value));
    container.classList.add("show-container");
  }
});

function addItem(ev) {
  ev.preventDefault();

  const value = grocery.value.trim();
  const id = new Date().getTime().toString();

  if (value && !editFlag) addNewItem(id, value);
  else if (value && editFlag) updateItem(value);
  else displayAlert("please enter value", "danger");
}

function addNewItem(id, value) {
  createGroceryElement(id, value);

  displayAlert("successfully created", "success");

  container.classList.add("show-container");

  addToLocalStorage(id, value);

  setBackToDefault();
}

function createGroceryElement(id, value) {
  const element = document.createElement("article");
  element.classList.add("grocery-item");

  const attr = document.createAttribute("data-id");
  attr.value = id;

  element.setAttributeNode(attr);
  element.innerHTML = `
      <p class="title">${value}</p>

      <div class="btn-container">
        <button type="button" class="edit-btn">
          <i class="fas fa-edit"></i>
        </button>

        <button type="button" class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
`;

  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");

  deleteBtn.addEventListener("click", () => deleteGrocery(id));
  editBtn.addEventListener("click", () => editGrocery(element));

  list.appendChild(element);
}

function editGrocery(element) {
  editElement = element.firstElementChild;
  grocery.value = editElement.textContent;
  editFlag = true;
  editId = element.dataset.id;
  submitBtn.textContent = "edit";
}

function updateItem(value) {
  editElement.textContent = value;

  updateFromLocalStorage(value);

  displayAlert("successfully updated", "success");

  setBackToDefault();
}

function updateFromLocalStorage(value) {
  const groceries = getGroceries();
  const groceryIdx = groceries.findIndex((g) => g.id == editId);

  groceries.splice(groceryIdx, 1, { value, id: editId });

  updateLocalStorage(groceries);
}

function deleteGrocery(groceryId) {
  const grocery = document.querySelector(`[data-id='${groceryId}']`);
  const groceries = getGroceries();
  removeFroLocalStorage(groceries, groceryId, grocery);

  if (!groceries.length) emptyListAlert();
  else displayAlert("item removed", "danger");

  setBackToDefault();
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(resetAlert(action), 500);
}

function resetAlert(action) {
  return () => {
    alert.classList.remove(`alert-${action}`);
    alert.textContent = "";
  };
}

function emptyListAlert() {
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
}

function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "add";
  editElement = null;
}

function clearItems() {
  list.innerHTML = "";
  localStorage.removeItem("groceries");
  setBackToDefault();
  emptyListAlert();
}

function getGroceries() {
  return JSON.parse(localStorage.getItem("groceries")) || [];
}

function addToLocalStorage(id, value) {
  const groceries = getGroceries();
  groceries.push({ id, value });
  updateLocalStorage(groceries);
}

function removeFroLocalStorage(groceries, groceryId, grocery) {
  const groceryIdx = groceries.findIndex((grocery) => grocery.id == groceryId);

  groceries.splice(groceryIdx, 1);
  list.removeChild(grocery);
  updateLocalStorage(groceries);
}

function updateLocalStorage(groceries) {
  localStorage.setItem("groceries", JSON.stringify(groceries));
}
