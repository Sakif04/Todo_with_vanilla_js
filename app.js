const addBtn = document.querySelector('#add-btn');
const list = document.querySelector('#list-items');
const input = document.querySelector('#list-input');
const filter = document.querySelector('#filter-options');

const createItem = function (e) {
    e.preventDefault();
    let inputvalue = input.value;
    if (inputvalue) {
        let item = document.createElement('div');
        saveLocalItem(inputvalue);
        item.className = 'item';
        item.innerHTML = `<h4>${inputvalue}</h4>
        <button class="complete"><i class="fas fa-check"></i></button>
        <button class="trash"><i class="fas fa-trash"></i></button>`;
        list.appendChild(item);
        input.value = '';
    }
}
const saveLocalItem = function (item) {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}
const removeLocalItem = function (item) {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    console.log(items);
    let index = items.indexOf(item);
    console.log(index);
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
}
const filterItems = function (e) {
    const items = list.querySelectorAll('.item');
    console.log(items);
    items.forEach(function (item) {
        switch (e.target.value) {
            case 'all':
                item.style.display = 'flex'
                break;
            case 'completed':
                if (item.classList.contains('completed')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!item.classList.contains('completed')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
                break;
        }
    })
}
const buttonEffects = function (e) {
    let clickedElement = e.target;

    if (clickedElement.className == 'trash') {
        item = clickedElement.parentElement;
        item.classList.add('slide');
        text = item.querySelector('h4').innerText;
        console.log(text);
        removeLocalItem(text);

        item.addEventListener("transitionend", () => {
            item.remove();
        })
    }
    if (clickedElement.className == 'complete') {
        let item = e.target.parentElement;
        item.classList.toggle('completed');
    }
}
const getItems = function () {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.forEach(item => {
        let element = document.createElement('div');
        element.className = 'item';
        element.innerHTML = `<h4>${item}</h4>
            <button class="complete"><i class="fas fa-check"></i></button>
            <button class="trash"><i class="fas fa-trash"></i></button>`;
        list.appendChild(element);

    });
}
document.addEventListener('DOMContentLoaded', getItems);
filter.addEventListener('click', filterItems);
list.addEventListener('click', buttonEffects);
addBtn.addEventListener('click', createItem);
