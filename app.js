//Selectors
 const todoInput = document.querySelector('.input--todo');
 const inputButton = document.querySelector('.btn--input');
 const todoList = document.querySelector('.list--todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getFromLocalStorage); //load after refreshing the website
inputButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);


//Functions

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
    //delete todo
    if (item.classList.contains('btn--trash')) {
        const todo = item.parentElement;
        todo.remove();
    }

    //check todo
    if (item.classList.contains('btn--empty-checkmark')) {
        const todoText = item.nextElementSibling;
        todoText.classList.add('completed');
    
        const checkIcon = item.children[0];
        checkIcon.classList.remove('ph-circle');
        checkIcon.classList.add('ph-check-circle');
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

