//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", FilterTodo);

//Functions
//Function That Adds Todo
function addTodo(event) {
  //Prevent Form From Submitting
  event.preventDefault();
  //Create Todo Div
  const todoDiv = document.createElement("div");
  //Add a Class to It
  todoDiv.classList.add("todo");

  //Create Li Element
  const NewTodo = document.createElement("li");
  NewTodo.innerText = todoInput.value;
  NewTodo.classList.add("todo-item");

  //Append Li Element to Todo Div
  todoDiv.appendChild(NewTodo);

  //Add Todo to Local Storage
  saveLocalTodos(todoInput.value);

  //Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.classList.add("completed-btn");
  completedButton.innerText = "Complete";

  //Append Button to Todo Div
  todoDiv.appendChild(completedButton);

  //Create Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("trash-btn");
  deleteButton.innerText = "Delete";

  //Append Button to todo Div
  todoDiv.appendChild(deleteButton);

  //Append TodoDiv to todo List Element
  todoList.appendChild(todoDiv);

  //Clear Todo Input Value
  todoInput.value = "";
}

//DeleteCheck Function
function deleteCheck(e) {
  //Delete Item
  const item = e.target;
  //Delete Todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);

    //Add transitionEnd Event Listener
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Completed Button Functionality
  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
//Filter Todo Function
function FilterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//Save Local Todos
function saveLocalTodos(todo) {
  //Check if i Already Have Things in My Local Storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    //Create an Empty Array
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Function Get Todos
function getTodos() {
  let todos;
  //Check if i already Have Things in My Local Storage
  if (localStorage.getItem("todos") === null) {
    //Create an Empty Array
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  localStorage.setItem("todos", JSON.stringify(todos));
  todos.forEach(function (todo) {
    //Create Todo Div
    const todoDiv = document.createElement("div");
    //Add a Class to It
    todoDiv.classList.add("todo");

    //Create Li Element
    const NewTodo = document.createElement("li");
    NewTodo.innerText = todo;
    NewTodo.classList.add("todo-item");

    //Append Li Element to Todo Div
    todoDiv.appendChild(NewTodo);

    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.classList.add("completed-btn");
    completedButton.innerText = "Complete";

    //Append Button to Todo Div
    todoDiv.appendChild(completedButton);

    //Create Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("trash-btn");
    deleteButton.innerText = "Delete";

    //Append Button to todo Div
    todoDiv.appendChild(deleteButton);

    //Append TodoDiv to todo List Element
    todoList.appendChild(todoDiv);
  });
}
function removeLocalTodos(todo) {
  //Check Hey do i have something in My Local Storage
  let todos;
  //Check if i already Have Things in My Local Storage
  if (localStorage.getItem("todos") === null) {
    //Create an Empty Array
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
