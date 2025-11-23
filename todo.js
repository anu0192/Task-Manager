const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


document.addEventListener("DOMContentLoaded", loadTasks);

// Add task
addBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    addTask(taskText);
    saveTask(taskText);

    taskInput.value = "";
});

// Add task to UI
function addTask(text, completed = false) {
    const li = document.createElement("li");

    if (completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
        <span class="taskText">${text}</span>
        <div>
            <button class="deleteBtn">Delete</button>
        </div>
    `;

    // Toggle complete on click
    li.querySelector(".taskText").addEventListener("click", () => {
        li.classList.toggle("completed");
        updateLocalStorage();
    });

    // Delete task
    li.querySelector(".deleteBtn").addEventListener("click", () => {
        li.remove();
        updateLocalStorage();
    });

    taskList.appendChild(li);
}

// Save task in localStorage
function saveTask(task) {
    let tasks = getTasks();
    tasks.push({ text: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    let tasks = getTasks();
    tasks.forEach(t => addTask(t.text, t.completed));
}

// Get tasks from storage
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Update tasks in localStorage
function updateLocalStorage() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector(".taskText").innerText,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
