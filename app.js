const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter');

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkedORdelete);
todoFilter.addEventListener('click', filterTodo);

function addTodo(event) {
    // prevent default behaviour
    event.preventDefault();
    // create a Todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    // create the li inside the todo div
    const todoLi = document.createElement('li');
    todoLi.innerText = todoInput.value;
    todoLi.classList.add("todo-item");
    todoDiv.appendChild(todoLi);
    // add todo to localstorage
    saveTodo(todoInput.value);
    // checked button
    const checkedButton = document.createElement('button');
    checkedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    checkedButton.classList.add("checked-btn");
    todoDiv.appendChild(checkedButton);
    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // add the todo to the todolist
    todoList.appendChild(todoDiv);
    // clear the input value
    todoInput.value = "";
}

function checkedORdelete(event) {
    const targetItem = event.target;
    // delete logic
    if (targetItem.classList[0] === 'delete-btn') {
        const todo = targetItem.parentElement;
        // adding the transition
        todo.classList.add("slide-out");
        removeTodos(todo);
        // item will be remove after the transition ends
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    // marked logic
    if (targetItem.classList[0] === 'checked-btn') {
        const todo = targetItem.parentElement;
        todo.classList.toggle('completed');
    }
}

// filter logic
function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "notcompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            default:
                todo.style.display = "flex";
        }
    });
}

// localstorage logic
function saveTodo(todo) {

    // check if anything already
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // add the todos to localstorage
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// get the todos and display it in the UI
function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        // create the li inside the todo div
        const todoLi = document.createElement('li');
        todoLi.innerText = todo;
        todoLi.classList.add("todo-item");
        todoDiv.appendChild(todoLi);
        // checked button
        const checkedButton = document.createElement('button');
        checkedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        checkedButton.classList.add("checked-btn");
        todoDiv.appendChild(checkedButton);
        // delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        // add the todo to the todolist
        todoList.appendChild(todoDiv);
    })

}

function removeTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    delItem = todo.children[0].innerText;
    console.log(delItem);
    // console.log(todos.indexOf(delItem));
    todos.splice(todos.indexOf(delItem), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
