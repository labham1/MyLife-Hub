// =====================================
// Array to store all tasks
// =====================================
let todos = []; // Each task will be an object: { text: "Task text", completed: true/false }

// =====================================
// Load tasks from localStorage
// =====================================
function loadTodos() {
    // localStorage stores data as strings, so we parse it back into an array
    const stored = localStorage.getItem("todos"); 
    if (stored) todos = JSON.parse(stored); // Convert JSON string into array
}

// =====================================
// Save tasks to localStorage
// =====================================
function saveTodos() {
    // Convert array to string and save in localStorage so tasks persist even after page reload
    localStorage.setItem("todos", JSON.stringify(todos));
}

// =====================================
// Render the To-Do list
// =====================================
function renderTodos() {
    // Get the main content container where the To-Do will appear
    const mainContent = document.getElementById("main-content");

    // Create HTML for input, add button, and task list
    mainContent.innerHTML = `
        <h2>To-Do List</h2>
        <input type="text" id="todo-input" placeholder="Add a new task" />
        <button id="add-todo-btn">Add</button>
        <ul id="todo-list">
            ${todos.map((todo, index) => `
                <li>
                    <!-- Checkbox to mark task complete -->
                    <input type="checkbox" ${todo.completed ? "checked" : ""} data-index="${index}" class="todo-checkbox" />
                    <!-- Task text -->
                    <span class="${todo.completed ? "completed" : ""}">${todo.text}</span>
                    <!-- Button to delete task -->
                    <button data-index="${index}" class="delete-btn">Delete</button>
                </li>
            `).join('')}
        </ul>
    `;

    // =====================================
    // Add task functionality
    // =====================================
    const addBtn = document.getElementById("add-todo-btn"); // Button to add task
    const todoInput = document.getElementById("todo-input"); // Input field

    // Click event to add a new task
    addBtn.addEventListener("click", addTodo);

    // Press Enter key to add a new task
    todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTodo();
    });

    // =====================================
    // Checkbox functionality (mark complete)
    // =====================================
    const checkboxes = document.querySelectorAll(".todo-checkbox");
    checkboxes.forEach(cb => {
        cb.addEventListener("change", (e) => {
            const idx = e.target.dataset.index; // Get index of task
            todos[idx].completed = e.target.checked; // Update completed status
            saveTodos(); // Save changes
            renderTodos(); // Re-render to update UI
        });
    });

    // =====================================
    // Delete task functionality
    // =====================================
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = e.target.dataset.index; // Get index of task
            todos.splice(idx, 1); // Remove task from array
            saveTodos(); // Save changes
            renderTodos(); // Re-render list
        });
    });
}

// =====================================
// Helper function to add a task
// =====================================
function addTodo() {
    const todoInput = document.getElementById("todo-input"); // Get input value
    const text = todoInput.value.trim(); // Remove extra spaces
    if (text !== "") { // Only add if input is not empty
        todos.push({ text, completed: false }); // Add new task to array
        saveTodos(); // Save to localStorage
        renderTodos(); // Re-render list
        todoInput.value = ""; // Clear input field for next task
    }
}

// =====================================
// Initialize To-Do feature
// =====================================
function initTodo() {
    loadTodos(); // Load tasks from localStorage
    renderTodos(); // Show tasks on screen
}

// Make initTodo available globally so main.js can call it
window.initTodo = initTodo;
