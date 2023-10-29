const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");

const todos = [];

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    task: task,
    date: date,
    completed: false,
  };

  if (task) {
    todos.push(todo);
    taskInput.value = "";
    dateInput.value = "";
  } else {
    alert("warning");
  }
};

addButton.addEventListener("click", addHandler);
