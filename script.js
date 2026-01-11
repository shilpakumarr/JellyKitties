// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage on page load
window.onload = loadTasks;

// Add event listener for the "Add Task" button
addTaskButton.addEventListener("click", addTask);

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.textContent = taskText;

  // Add delete button to list item
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteTask(li);
  });

  li.appendChild(deleteButton);
  taskList.appendChild(li);

  // Save task to localStorage
  saveTask(taskText);

  // Clear input field
  taskInput.value = "";
}

// Function to save a task to localStorage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task;

    // Add delete button to list item
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Mark as Completed & Delete";
    deleteButton.addEventListener("click", () => {
      deleteTask(li);
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Function to delete a task
function deleteTask(taskElement) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskText = taskElement.textContent.replace("Delete", "").trim();
  const updatedTasks = tasks.filter(task => task !== taskText);

  // Update localStorage
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  // Remove from UI
  taskList.removeChild(taskElement);
}

