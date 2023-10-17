//SELECTORS
 const todoInput = document.querySelector('.input--todo');
 const inputButton = document.querySelector('.btn--input');
 const todoList = document.querySelector('.list--todo');
 const inputGroup = document.querySelector('.input-group');


//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getFromLocalStorage); //load  storage after refreshing the website
document.addEventListener('DOMContentLoaded', colorInputBorder); //color input group border after refreshing the website
inputButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoInput.addEventListener('keypress', enterTodo);
todoInput.addEventListener('focus', colorInputBorder);
todoInput.addEventListener('blur', uncolorInputBorder);


//FUNCTIONS

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
//uncoloring inputg roup when not focusing
function uncolorInputBorder (event) {
    inputGroup.classList.remove('input-group-focused');
}

//adding todo
function addTodo(event) {
    if (todoInput.value !== "") {
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
        todoList.insertBefore(todoDiv, todoList.firstChild); //adding on the begginging of the list to avoid adding after tasks that are already done

        //clear todo input value
        todoInput.value = '';
    }   
}

function deleteCheck (event) {
    const item = event.target;
    const icon = item.children[0];
    const todoText = item.nextElementSibling;
    const listItems = todoList.getElementsByTagName('li');

    //deleting todo
    if (item.classList.contains('btn--trash')) {
        const todo = item.parentElement;
        todo.remove();
        removeLocalTodos(todo); //removing from local storage
    }

    //toggling check mark
    if (icon.classList.contains('ph-circle')) {
        todoText.classList.add('completed'); //text crossing out
        icon.classList.remove('ph-circle'); //icon change
        icon.classList.add('ph-check-circle');
        todoList.appendChild(item.parentElement);
    }
    else if (icon.classList.contains('ph-check-circle')) {
        todoText.classList.remove('completed'); //text crossing out
        icon.classList.remove('ph-check-circle'); //icon change
        icon.classList.add('ph-circle');
    }
}


//STORRING DATA LOCALLY

//storring todos
function saveToLocalStorage(todoValue) {
    let todos;
    
    //checking if there are already todos in storage
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todoValue);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//getting todos from storage
function getFromLocalStorage() {
    //checking if there are already todos in storage
    if (localStorage.getItem('todos') === null) {  //if not
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todosElement) { //re-adding elements like earlier
        
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
        todoList.insertBefore(todoDiv, todoList.firstChild); 
    });
}


//removing elements from storage after clicking trash icon
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[1].innerText //getting index from the current li element, which is the second child of current todo div
    todos.splice(todos.indexOf(todoIndex), 1); //removing todo
    localStorage.setItem('todos', JSON.stringify(todos)); //updating the local storage
}

