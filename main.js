// =====================================
// Run code after the DOM is fully loaded
// =====================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("MyLife Hub initialized!"); // Debug message

    // Reference to the main content area where features will render
    const mainContent = document.getElementById("main-content");

    // Reference to the theme toggle button
    const themeToggle = document.getElementById("theme-toggle");

    // =====================================
    // Theme toggle: light/dark mode
    // =====================================
    themeToggle.addEventListener("click", () => {
        // Toggle a CSS class on <body> to switch themes
        document.body.classList.toggle("dark-theme");
    });

    // =====================================
    // Navigation buttons functionality
    // =====================================

    // To-Do button: loads To-Do feature from todo.js
    document.getElementById("nav-todo").addEventListener("click", () => {
        // Calls the global initTodo function defined in todo.js
        initTodo();
    });

    // Notes button: loads Notes feature from notes.js
    document.getElementById("nav-notes").addEventListener("click", () => {
        // Calls the global initNotes function (you will define it in notes.js)
        initNotes();
    });

    // Budget button: loads Budget Tracker feature from budget.js
    document.getElementById("nav-budget").addEventListener("click", () => {
        // Calls the global initBudget function defined in budget.js
        initBudget();
    });

    // Weather button: placeholder for future feature
    document.getElementById("nav-weather").addEventListener("click", () => {
        mainContent.innerHTML = `
            <h2>Weather</h2>
            <p>Feature coming soon!</p>
        `;
    });

    // Quotes button: placeholder for future feature
    document.getElementById("nav-quotes").addEventListener("click", () => {
        mainContent.innerHTML = `
            <h2>Quotes</h2>
            <p>Feature coming soon!</p>
        `;
    });
});
