const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");

const editButton = document.getElementById("edit-button");

const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-button");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};

const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;

  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);

  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const displayTodos = () => {
  todosBody.innerHTML = "";
  if (!todos.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>no task found!</td></tr>";
    return;
  }

  todos.forEach((todo) => {
    todosBody.innerHTML += `
      <tr>
        <td>${todo.task}</td>
        <td>${todo.date || "No Date"}</td>
        <td>${todo.completed ? "Completed" : "Pending"}</td>
        <td>
            <button onClick="editHandler('${todo.id}')">Edit</button>
            <button onClick="toggleHandler('${todo.id}')">
              ${todo.completed ? "Undo" : "Do"}
            </button>
            <button onClick="deleteHandler('${todo.id}')">Delete</button>
        </td>
        </tr>`;
  });
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generateId(),
    completed: false,
    task,
    date,
  };

  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    taskInput.value = "";

    dateInput.value = "";
    showAlert("todo added successfully", "success");
  } else {
    showAlert("please enter a todo", "error");
  }
};

const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    displayTodos();
    showAlert("All todos cleared successfully", "success");
  } else {
    showAlert("No todos to clear", "error");
  }
};
const deleteHandler = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  saveToLocalStorage();
  displayTodos();
  showAlert("todo deleted successfully", "success");
};

const toggleHandler = (id) => {
  //v1.
  // const newTodos = todos.map((todo) => {
  //   if (todo.id === id) {
  //     return { ...todo, completed: !todo.completed };
  //   } else {
  //     return todo;
  //   }
  // });
  // todos = newTodos;

  const todo = todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;

  saveToLocalStorage();
  displayTodos();
  showAlert("Todo status change successfully", "success");
};

const editHandler = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  taskInput.value = todo.task;
  dateInput.value = todo.date;

  addButton.style.display = "none";
  editButton.style.display = "inline-block";
  editButton.dataset.id = id;
};

const applyEditHandler = (e) => {
  const id = e.target.dataset.id;
  const todo = todos.find((todo) => todo.id === id);
  todo.task = taskInput.value;
  todo.date = dateInput.value;

  taskInput.value = "";
  dateInput.value = "";

  addButton.style.display = "inline-block";
  editButton.style.display = "none";

  saveToLocalStorage();
  displayTodos();
  showAlert("Todo updated successfully", "success");
};

window.addEventListener("load", displayTodos);
addButton.addEventListener("click", addHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);

editButton.addEventListener("click", applyEditHandler);
