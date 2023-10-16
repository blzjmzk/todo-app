//Selectors
 const todoInput = document.querySelector('.input--todo');
 const inputButton = document.querySelector('.btn--input');
 const todoList = document.querySelector('.list--todo');
 const inputGroup = document.querySelector('.input-group');

//Event Listeners
document.addEventListener('DOMContentLoaded', getFromLocalStorage); //load  storage after refreshing the website
document.addEventListener('DOMContentLoaded', colorInputBorder); //color input group border after refreshing the website
inputButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoInput.addEventListener('keypress', enterTodo);
todoInput.addEventListener('focus', colorInputBorder);
todoInput.addEventListener('blur', uncolorInputBorder);

//Functions

//enter todo by pressing enter key
function enterTodo (event) {
    if (event.key === "Enter") {
        if (todoInput.value !== "") {
        inputButton.click();
        }
    }
}

//coloring input group border when focusing
function colorInputBorder (event) {
    inputGroup.classList.add('input-group-focused');
}
//uncoloring inputgrop when not
function uncolorInputBorder (event) {
    inputGroup.classList.remove('input-group-focused');
}

function addTodo(event) {
    //prevent form from refreshing
    event.preventDefault();

    //create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //create empty check mark button
    emptyCheckmarkButton = document.createElement('button');
    emptyCheckmarkButton.innerHTML = '<i class="ph-bold ph-circle"></i>';
    emptyCheckmarkButton.classList.add('btn', 'btn--empty-checkmark');
    todoDiv.appendChild(emptyCheckmarkButton);

    //create list item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //adding todo to local storage
    saveToLocalStorage(todoInput.value);

    //create trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="ph-bold ph-x-circle"></i>';
    trashButton.classList.add('btn', 'btn--trash');
    todoDiv.appendChild(trashButton);

    //add todo div to the list
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = '';
}

function deleteCheck (event) {
    const item = event.target;
    const checkIcon = item.children[0];
    const todoText = item.nextElementSibling;

    //delete todo
    if (item.classList.contains('btn--trash')) {
        const todo = item.parentElement;
        todo.remove();
    }

    //toggle check mark
    if (checkIcon.classList.contains('ph-circle')) {
        todoText.classList.add('completed'); //text crossing out
        checkIcon.classList.remove('ph-circle'); //icon change
        checkIcon.classList.add('ph-check-circle');
    }
    else if (checkIcon.classList.contains('ph-check-circle')) {
        todoText.classList.remove('completed'); //text crossing out
        checkIcon.classList.remove('ph-check-circle'); //icon change
        checkIcon.classList.add('ph-circle');
    }
}

function saveToLocalStorage(todo) {
    //checking if there are already todos in storage
    let todos;

    if (localStorage.getItem('todos') === null) {  //if not
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getFromLocalStorage() {
    //checking if there are already todos in storage
    if (localStorage.getItem('todos') === null) {  //if not
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todosElement) {
        //create todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        //create empty check mark button
        emptyCheckmarkButton = document.createElement('button');
        emptyCheckmarkButton.innerHTML = '<i class="ph-bold ph-circle"></i>';
        emptyCheckmarkButton.classList.add('btn', 'btn--empty-checkmark');
        todoDiv.appendChild(emptyCheckmarkButton);

        //create list item
        const newTodo = document.createElement('li');
        newTodo.innerText = todosElement;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //create trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="ph-bold ph-x-circle"></i>';
        trashButton.classList.add('btn', 'btn--trash');
        todoDiv.appendChild(trashButton);

        //add todo div to the list
        todoList.appendChild(todoDiv);
    });
}

