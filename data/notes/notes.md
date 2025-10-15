1️⃣ What is DOM Manipulation?

DOM (Document Object Model) is a tree-like representation of your HTML page in JavaScript.

DOM manipulation means reading or changing the HTML elements using JS.

You can:

Select elements (document.getElementById, querySelector)

Read or modify their content (.innerHTML, .textContent)

Change their style (.style)

Add/remove elements (appendChild, .remove())

Add event listeners (addEventListener)

2️⃣ DOM Manipulation in todo.js

Let’s go step by step.

Selecting the container
const mainContent = document.getElementById("main-content");


What it does:

Selects the <main> element from HTML where we will render the To-Do list.

This is the starting point for injecting dynamic HTML.

Rendering the list
mainContent.innerHTML = html;


What it does:

innerHTML replaces everything inside <main> with the html string we built.

This includes: input box, add button, and the <ul> list of tasks.

Every time a task is added/edited/deleted, we call renderTodos(), which replaces the content with the updated list.

Key point:

This is called re-rendering. It’s simple but effective for small apps.

Adding event listeners
addBtn.addEventListener("click", () => { ... });
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", (e) => { ... });
});
deleteBtns.forEach(btn => {
    btn.addEventListener("click", (e) => { ... });
});


What it does:

addEventListener attaches a JS function to an HTML element that runs when the user interacts (click, change, keypress, etc.).

Example:

Click “Add” → Adds a task

Change a checkbox → Marks task complete

Click “Delete” → Removes task

Generating dynamic HTML
${todos.map((todo, index) => `
    <li>
        <input type="checkbox" ${todo.completed ? "checked" : ""} data-index="${index}" class="todo-checkbox" />
        <span class="${todo.completed ? "completed" : ""}">${todo.text}</span>
        <button data-index="${index}" class="delete-btn">Delete</button>
    </li>
`).join('')}


What it does:

For each task in the todos array:

Creates an <li> with a checkbox, text, and delete button.

data-index stores the array index to identify which task is clicked.

This HTML string is injected into the DOM using innerHTML.

✅ This is dynamic rendering: the DOM reflects the JS array state.

Input field and keyboard support
todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});


What it does:

Listens for key presses on the input field.

Pressing Enter triggers addTodo(), which updates the array and calls renderTodos() to update the DOM.

Summary: How DOM Manipulation Works Here

Read: JS gets a reference to HTML elements (getElementById, querySelectorAll).

Update: JS changes the content or structure (innerHTML) or style.

Interact: JS attaches events (addEventListener) to respond to user actions.

Re-render: Every change in data calls a render function that updates the DOM to match the JS array.

💡 Analogy:
Think of the DOM as a whiteboard:

Your JS array is like your notes on paper.

renderTodos() is like redrawing the whiteboard based on your paper notes.

Event listeners are like sensors that detect when someone writes or erases something on the board.