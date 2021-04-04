const addBtn = document.querySelector('#add-btn');
const list = document.querySelector('#list-items');
const arr = [];
const createItem = function () {
    const input = document.querySelector('#list-input').value;
    if (input) {
        arr.push(input);
        let item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `<h4>${input}</h4>
        <button class="completed"><i class="fas fa-check"></i></button><button class="trash"><i
            class="fas fa-trash"></i></button>`
        list.appendChild(item)
    }
}
addBtn.addEventListener('click', createItem)
