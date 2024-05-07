document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  // Fetch tasks from server and display them
  fetchTasks();

  // Add event listener to Add Task button
  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
    }
  });

  // Function to fetch tasks from server
  function fetchTasks() {
    fetch("/tasks")
      .then((response) => response.json())
      .then((tasks) => {
        tasks.forEach((task) => {
          displayTask(task);
        });
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }

  // Function to add a task
  function addTask(taskText) {
    fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: taskText }),
    })
      .then((response) => response.json())
      .then((task) => {
        displayTask(task);
        taskInput.value = ""; // Clear input field
      })
      .catch((error) => console.error("Error adding task:", error));
  }

  // Function to display a task
  function displayTask(task) {
    const li = document.createElement("li");
    li.textContent = task.task;

    // Button to edit task
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => editTask(task._id, li);

    // Button to delete task
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(task._id, li);

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }

  // Function to edit a task
  function editTask(taskId, liElement) {
    const newTaskText = prompt("Edit task:", liElement.textContent);
    if (newTaskText !== null) {
      fetch(`/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newTaskText }),
      })
        .then((response) => response.json())
        .then(() => {
          liElement.textContent = newTaskText;
        })
        .catch((error) => console.error("Error editing task:", error));
    }
  }

  // Function to delete a task
  function deleteTask(taskId, liElement) {
    fetch(`/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then(() => {
        liElement.remove();
      })
      .catch((error) => console.error("Error deleting task:", error));
  }
});
