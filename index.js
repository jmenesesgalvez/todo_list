const tasks = [
  { id: 1, description: "Tarea 1", completed: false },
  { id: 2, description: "Tarea 2", completed: true },
  { id: 3, description: "Tarea 3", completed: false },
];

function renderTasks() {
  const taskListElement = document.getElementById("taskList");
  taskListElement.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">ID ${task.id}: ${
      task.description
    }</span>
              <input type="checkbox" id="task_${task.id}" ${
      task.completed ? "checked" : ""
    } onchange="completeTask(${task.id})">
              <i class="fas fa-times delete-btn" onclick="deleteTask(${
                task.id
              })"></i>
            `;
    taskListElement.appendChild(li);
  });

  updateTaskCount();
}

function addTask() {
  const inputElement = document.getElementById("taskInput");
  const description = inputElement.value.trim();

  if (description !== "") {
    const newTask = {
      id: tasks.length + 1,
      description,
      completed: false,
    };

    tasks.push(newTask);
    renderTasks();
    inputElement.value = "";
  }
}

function deleteTask(taskId) {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    renderTasks();
  }
}

function completeTask(taskId) {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    renderTasks();
  }
}

function updateTaskCount() {
  const totalTasksElement = document.getElementById("totalTasks");
  const completedTasksElement = document.getElementById("completedTasks");

  totalTasksElement.textContent = tasks.length;
  completedTasksElement.textContent = tasks.filter(
    (task) => task.completed
  ).length;
}

renderTasks();
