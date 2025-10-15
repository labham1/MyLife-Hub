// scripts/notes.js

// Get reference to the main content area
const mainContent = document.getElementById("main-content");

// Array to hold all notes
let notes = [];

// Load notes from localStorage
function loadNotes() {
    const storedNotes = localStorage.getItem("notes"); // Fetch notes
    if (storedNotes) {
        notes = JSON.parse(storedNotes); // Parse JSON string to array
    }
}

// Save notes array to localStorage
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes)); // Convert array to string
}

// Render all notes in main content area
function renderNotes() {
    let html = `
        <h2>Notes</h2>
        <textarea id="note-input" placeholder="Write a new note..." rows="4"></textarea>
        <button id="add-note-btn">Add Note</button>
        <ul id="notes-list">
            ${notes.map((note, index) => `
                <li>
                    <p>${note.text}</p>
                    <button data-index="${index}" class="edit-btn">Edit</button>
                    <button data-index="${index}" class="delete-btn">Delete</button>
                </li>
            `).join('')}
        </ul>
    `;
    mainContent.innerHTML = html; // Inject HTML

    // References to input and button
    const addBtn = document.getElementById("add-note-btn");
    const noteInput = document.getElementById("note-input");

    // Add note on button click
    addBtn.addEventListener("click", () => {
        addNote();
    });

    // Add note on Enter key (Shift+Enter for newline)
    noteInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) { // Enter adds note, Shift+Enter adds newline
            e.preventDefault(); // Prevent newline
            addNote();
        }
    });

    // Helper function to add a note
    function addNote() {
        const text = noteInput.value.trim();
        if (text !== "") {
            notes.push({ text }); // Add note to array
            saveNotes(); // Save to localStorage
            renderNotes(); // Re-render notes
            noteInput.value = ""; // Clear input
        }
    }

    // Add event listeners for edit buttons
    const editBtns = document.querySelectorAll(".edit-btn");
    editBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            const newText = prompt("Edit your note:", notes[index].text); // Simple prompt for editing
            if (newText !== null) { // User didn't cancel
                notes[index].text = newText;
                saveNotes();
                renderNotes();
            }
        });
    });

    // Add event listeners for delete buttons
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            notes.splice(index, 1); // Remove note
            saveNotes();
            renderNotes();
        });
    });
}

// Initialize Notes module
function initNotes() {
    loadNotes(); // Load notes from localStorage
    renderNotes(); // Display notes in UI
}
