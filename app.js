//Selectors
 const todoInput = document.querySelector('.input--todo');
 const inputButton = document.querySelector('.btn--input');
 const todoList = document.querySelector('.list--todo');

//Event Listeners

inputButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

//Functions

function addTodo(event) {
    //Prevent form from submitting (prevent site refreshing)
    event.preventDefault();

    //CREATE TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //CREATE CHECK MARK BUTTON
    const checkMarkButton = document.createElement('button');
    checkMarkButton.innerHTML = '<i class="ph-bold ph-check-circle"></i>';
    checkMarkButton.classList.add("btn");
    checkMarkButton.classList.add("btn--check-mark");
    todoDiv.appendChild(checkMarkButton);

    //CREATE LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //CREATE TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="ph-bold ph-x-circle"></i>';
    trashButton.classList.add("btn");
    trashButton.classList.add("btn--trash");
    todoDiv.appendChild(trashButton);

    //APPEND TODODIV TO TODOLIST
    todoList.appendChild(todoDiv);

    //CLEAR TODO INPUT VALUE
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    //DELETE TODO
    if (item.classList.contains('btn--trash')); {
        const todo = item.parentElement;
        todo.remove();
    }

    //CHECKED TODO
    if (item.classList[0] === "btn--check-mark"); {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}