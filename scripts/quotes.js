// scripts/quotes.js

// Function to fetch a random quote
async function fetchQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        if (!response.ok) throw new Error("Failed to fetch quote");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching quote:", error);
        return null;
    }
}

// Render Quote Module
function renderQuote(mainContent) {
    mainContent.innerHTML = `
        <h2>Quote of the Day</h2>
        <button id="get-quote-btn">Get a New Quote</button>
        <div id="quote-result"></div>
    `;

    const btn = document.getElementById("get-quote-btn");
    const resultDiv = document.getElementById("quote-result");

    async function showQuote() {
        resultDiv.innerHTML = "<p>Loading...</p>";
        const data = await fetchQuote();
        if (data) {
            resultDiv.innerHTML = `
                <p>"${data.content}"</p>
                <p><strong>- ${data.author}</strong></p>
            `;
        } else {
            resultDiv.innerHTML = "<p>Could not fetch quote. Try again.</p>";
        }
    }

    btn.addEventListener("click", showQuote);
    showQuote(); // Display one quote on module load
}

// Initialize Quote Module
function initQuote() {
    const mainContent = document.getElementById("main-content"); // Always fetch after DOM ready
    renderQuote(mainContent);
}
