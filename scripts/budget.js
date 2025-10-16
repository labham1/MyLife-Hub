// ==============================
// Budget Tracker JavaScript Code
// ==============================

// Array to store all transactions in memory
// Each transaction will have: description, amount, type (income/expense)
let transactions = [];

// ------------------------------
// Load transactions from localStorage
// ------------------------------
// localStorage allows us to save data in the browser so it persists
// even if the page is refreshed or closed
function loadTransactions() {
    // Get stored transactions (if any) from localStorage
    const stored = localStorage.getItem("transactions");
    if (stored) {
        // Convert the JSON string back to an array of objects
        transactions = JSON.parse(stored);
    }
}

// ------------------------------
// Save transactions to localStorage
// ------------------------------
// This ensures our changes are saved and persist across page reloads
function saveTransactions() {
    // Convert the array of transactions to a JSON string
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// ------------------------------
// Calculate totals: income, expenses, and balance
// ------------------------------
function calculateTotals() {
    let income = 0;   // Total income
    let expenses = 0; // Total expenses

    // Loop through each transaction and add to the respective total
    transactions.forEach(tx => {
        if (tx.type === "income") {
            income += tx.amount; // Add to income
        } else {
            expenses += tx.amount; // Add to expenses
        }
    });

    // Balance = income - expenses
    const balance = income - expenses;

    // Return an object with all totals
    return { income, expenses, balance };
}

// ------------------------------
// Render the Budget Tracker UI
// ------------------------------
function renderBudget() {
    // Get the main content container where we will display the app
    const mainContent = document.getElementById("main-content"); 

    // Calculate the totals for display
    const totals = calculateTotals();

    // Update the HTML content of the page
    mainContent.innerHTML = `
        <h2>Budget Tracker</h2>
        <div class="totals">
            <p>Total Income: $${totals.income.toFixed(2)}</p>
            <p>Total Expenses: $${totals.expenses.toFixed(2)}</p>
            <p>Balance: $${totals.balance.toFixed(2)}</p>
        </div>

        <!-- Inputs for adding a new transaction -->
        <div class="transaction-inputs">
            <input type="text" id="tx-desc" placeholder="Description" />
            <input type="number" id="tx-amount" placeholder="Amount" />
            <select id="tx-type">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <button id="add-tx-btn">Add Transaction</button>
        </div>

        <!-- List of all transactions -->
        <ul id="transactions-list">
            ${transactions.map((tx, index) => `
                <li>
                    <span>${tx.description} - $${tx.amount.toFixed(2)} (${tx.type})</span>
                    <button data-index="${index}" class="delete-btn">Delete</button>
                </li>
            `).join('')}
        </ul>
    `;

    // ------------------------------
    // Get references to input fields and add button
    // ------------------------------
    const descInput = document.getElementById("tx-desc");
    const amountInput = document.getElementById("tx-amount");
    const typeSelect = document.getElementById("tx-type");
    const addBtn = document.getElementById("add-tx-btn");

    // ------------------------------
    // Function to add a new transaction
    // ------------------------------
    function addTransaction() {
        const description = descInput.value.trim(); // Remove extra spaces
        const amount = parseFloat(amountInput.value); // Convert input to number
        const type = typeSelect.value; // "income" or "expense"

        // Validate input
        if (description && !isNaN(amount) && amount > 0) {
            // Add transaction to array
            transactions.push({ description, amount, type });

            // Save to localStorage
            saveTransactions();

            // Re-render UI to update list and totals
            renderBudget();

            // Clear input fields
            descInput.value = "";
            amountInput.value = "";
        }
    }

    // ------------------------------
    // Event listener: Add button
    // ------------------------------
    addBtn.addEventListener("click", addTransaction);

    // ------------------------------
    // Event listener: Press "Enter" key in input fields
    // ------------------------------
    [descInput, amountInput].forEach(input => {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") addTransaction();
        });
    });

    // ------------------------------
    // Delete buttons functionality
    // ------------------------------
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index; // Get index of transaction
            transactions.splice(index, 1); // Remove transaction from array
            saveTransactions(); // Save updated array
            renderBudget(); // Re-render UI
        });
    });
}

// ------------------------------
// Initialize Budget Tracker
// ------------------------------
function initBudget() {
    loadTransactions();  // Load saved transactions (if any)
    renderBudget();      // Render the initial UI
}

// Uncomment if you want to access initBudget from other files
// window.initBudget = initBudget;
