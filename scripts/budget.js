// Reference to main content container
// Note: we get it each time inside renderBudget too, to be safe after rendering
const mainContent = document.getElementById("main-content");

// Array to store all transactions
let transactions = [];

// Load transactions from localStorage
function loadTransactions() {
    const stored = localStorage.getItem("transactions");
    if (stored) transactions = JSON.parse(stored);
}

// Save transactions to localStorage
function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Calculate totals: income, expenses, balance
function calculateTotals() {
    let income = 0;
    let expenses = 0;
    transactions.forEach(tx => {
        if (tx.type === "income") income += tx.amount;
        else expenses += tx.amount;
    });
    const balance = income - expenses;
    return { income, expenses, balance };
}

// Render the Budget Tracker UI
function renderBudget() {
    const mainContent = document.getElementById("main-content"); // Safe after render
    const totals = calculateTotals();

    // HTML for tracker
    mainContent.innerHTML = `
        <h2>Budget Tracker</h2>

        <div class="totals">
            <p>Total Income: $${totals.income.toFixed(2)}</p>
            <p>Total Expenses: $${totals.expenses.toFixed(2)}</p>
            <p>Balance: $${totals.balance.toFixed(2)}</p>
        </div>

        <div class="transaction-inputs">
            <input type="text" id="tx-desc" placeholder="Description" />
            <input type="number" id="tx-amount" placeholder="Amount" />
            <select id="tx-type">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <button id="add-tx-btn">Add Transaction</button>
        </div>

        <ul id="transactions-list">
            ${transactions.map((tx, index) => `
                <li>
                    <span>${tx.description} - $${tx.amount.toFixed(2)} (${tx.type})</span>
                    <button data-index="${index}" class="delete-btn">Delete</button>
                </li>
            `).join('')}
        </ul>
    `;

    // Get references to inputs and button after rendering
    const descInput = document.getElementById("tx-desc");
    const amountInput = document.getElementById("tx-amount");
    const typeSelect = document.getElementById("tx-type");
    const addBtn = document.getElementById("add-tx-btn");

    // Function to add a transaction
    function addTransaction() {
        const description = descInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const type = typeSelect.value;

        if (description && !isNaN(amount) && amount > 0) {
            transactions.push({ description, amount, type });
            saveTransactions();
            renderBudget(); // Re-render to update list and totals
            descInput.value = "";
            amountInput.value = "";
        }
    }

    // Event listener: Add button
    addBtn.addEventListener("click", addTransaction);

    // Event listener: Enter key support
    [descInput, amountInput].forEach(input => {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") addTransaction();
        });
    });

    // Delete buttons functionality
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            transactions.splice(index, 1); // Remove transaction
            saveTransactions();
            renderBudget(); // Re-render UI
        });
    });
}

// Initialize Budget Tracker
function initBudget() {
    loadTransactions(); // Load saved transactions
    renderBudget(); // Render initial UI
}

// Make globally available for main.js
window.initBudget = initBudget;
