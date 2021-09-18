const addBtn = document.querySelector("#add-btn");
const list = document.querySelector("#list-items");
const input = document.querySelector("#list-input");
const filter = document.querySelector("#filter-options");

const generatelist = (input) => {
    let item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `<h4 > <div class="logo"></div> ${input}</h4>
    <button class="btn btn-complete"><i class="fas fa-check"></i></button>
    <button class="btn btn-edit"><i class="fas fa-edit"></i></button>
    <button class="btn btn-delete"><i class="fa fa-trash" ></i></button>`;
    list.appendChild(item);
    input.value = "";
};
const createItems = function (e) {
    if (e) {
        e.preventDefault();
    }
    let inputvalue = input.value;
    if (inputvalue) {
        saveLocalItem(inputvalue);
        generatelist(inputvalue);
    }
    input.value = "";
};

const saveLocalItem = function (item) {
    let items;
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
};
const removeLocalItem = function (item) {
    let items;
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }
    let index = items.indexOf(item);
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
};
const filterItems = function (e) {
    const items = list.querySelectorAll(".item");
    console.log(items);
    items.forEach(function (item) {
        switch (e.target.value) {
            case "all":
                item.style.display = "flex";
                break;
            case "completed":
                if (item.classList.contains("completed")) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!item.classList.contains("completed")) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;
        }
    });
};
const buttonEffects = function (e) {
    let clickedElement = e.target;
    console.log(clickedElement);
    const isEdit = clickedElement.classList.contains("btn-edit");
    const isDelete = clickedElement.classList.contains("btn-delete");
    if (isEdit || isDelete) {
        let item = clickedElement.parentElement;
        console.log(item);
        item.classList.add("slide");
        let text = item.querySelector("h4").innerText;
        input.value = isEdit ? text : "";
        removeLocalItem(text);

        item.addEventListener("transitionend", () => {
            item.remove();
        });
    } else if (clickedElement.classList.contains("btn-complete")) {
        let item = e.target.parentElement;
        console.log(item);
        item.classList.toggle("completed");
    } else return;
};
const getItems = function () {
    let items;
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));
    }

    items.forEach((item) => {
        generatelist(item);
    });
};

document.addEventListener("DOMContentLoaded", getItems);
filter.addEventListener("click", filterItems);
list.addEventListener("click", buttonEffects);

addBtn.addEventListener("click", createItems);
function enterButton(e) {
    f = e.key;
    if (e.key == "Enter") {
        createItems();
    }
}

document.addEventListener("keydown", enterButton);
