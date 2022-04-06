const list  = document.getElementById('list')
const form = document.querySelector('.list-form');
const addBtn = document.querySelector('.submit-btn');
const itemContainer = document.querySelector('.items-container');
const clearBtn = document.querySelector('.clear-btn');
const alertMessage = document.querySelector('.alert');


let editElement;
let editFlag = false;
let editID = "";
//EventListeners
form.addEventListener('submit', submitItem);
clearBtn.addEventListener('click', clearItems);
window.addEventListener('DOMContentLoaded', setUpItems);

function submitItem(e) {
  e.preventDefault();
  const item = list.value;
  const id = new Date().getTime().toString();

  if(item !== "" && editFlag === false) {
    createItems(id, item);
    displayAlert("Item Added Succesfuly", "success");
    clearBtn.classList.add("show-clear-btn");
    addToLocalStorage(id, item);
    setDefault();
  } else if(item !== "" && editFlag === true) {
    editElement.innerHTML = item;
    displayAlert("Item Change Succesfully", "success");
    editLocalStorage(editID, item);
    setDefault();
  } else {
    displayAlert("Input is empty", "danger");
  }
}

function createItems(id, item) {
  const newElement = document.createElement("article");
  newElement.classList.add("item");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  newElement.setAttributeNode(attr);
  newElement.innerHTML = `<div class="item-name">${item}</div>
                          <div class="edit-btn">edit</div>
                          <div class="del-btn">del</div>`
  itemContainer.appendChild(newElement);

  const editBtn = newElement.querySelector(".edit-btn");
  editBtn.addEventListener('click', editItem);
  const delBtn = newElement.querySelector(".del-btn");
  delBtn.addEventListener('click', delItem);
}

function editItem(e) {
  console.log("potaaaaaaa");
  const element = e.currentTarget.parentElement;
  editElement = e.currentTarget.previousElementSibling;
  console.log(editElement);
  list.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  addBtn.textContent = "edit";
}

function delItem(e) {
  console.log("YOu click del btn");
  const element = e.currentTarget.parentElement;
  console.log(element);
  let id = element.dataset.id;
  // console.log(id);
  itemContainer.removeChild(element);
  if(itemContainer.children.length === 0){
    clearBtn.classList.remove("show-clear-btn");
  }
  displayAlert("Item removed", "danger");
  setDefault();
  removeFromLocalStorage(id);
}

function clearItems() {
  const allItems = document.querySelectorAll(".item");
  if(allItems.length > 0) {
    allItems.forEach(function (item){
      itemContainer.removeChild(item);
    })
  }

  localStorage.removeItem("lists");
  clearBtn.classList.remove("show-clear-btn");
  displayAlert("Item Removed Successfuly", "success");
  setDefault();
}

function setDefault() {
  list.value = "";
  editFlag = false;
  editID = "";
  addBtn.textContent = "add";
}

function displayAlert(message, color){
  alertMessage.classList.add(`${color}`);
  alertMessage.textContent = message;

  setTimeout(function() {
    alertMessage.textContent = "";
    alertMessage.classList.remove(`${color}`);
  },1000);
}

function setUpItems() {
  let items = getLocalStorage();
  // console.log(items);

  if(items.length > 0){
    items.forEach(function(item) {
      createItems(item.id, item.value);
    });
    clearBtn.classList.add("show-clear-btn");
    // console.log("show clear btn");
  }
}

function addToLocalStorage(id, item) {
  const listItems = {id:id, value:item};
  let items = getLocalStorage();
  items.push(listItems);
  localStorage.setItem("lists", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if(item.id == id){
      item.value = value;
    }
    return item;
  })
    localStorage.setItem("lists", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function(item) {
    if(item.id !== id){
      return item;
    }
  });
  localStorage.setItem("lists", JSON.stringify(items)); 
}

function getLocalStorage() {
  return localStorage.getItem("lists")?JSON.parse(localStorage.getItem("lists")):[];
}