// scripts/quotes.js
// ✅ Summary:
// fetchQuote() → talks to an API and gets a random quote.
// renderQuote() → builds the HTML UI and shows a quote inside it.
// showQuote() → helper inside renderQuote() that actually fetches and updates the quote.
// initQuote() → starts everything by attaching the module to your page.

// Function to fetch a random quote from the API
async function fetchQuote() {
    try {
        // Make a GET request to the "quotable" API to get a random quote
        const response = await fetch("https://api.quotable.io/random");

        // If the response is not OK (status not 200-299), throw an error
        if (!response.ok) throw new Error("Failed to fetch quote");

        // Convert the response to JSON format
        const data = await response.json();

        // Return the quote data (an object containing content and author)
        return data;
    } catch (error) {
        // Log any errors that occur during fetching
        console.error("Error fetching quote:", error);

        // Return null if fetching fails
        return null;
    }
}

// Function to render the quote module inside a given container
function renderQuote(mainContent) {
    // Set up the HTML structure for the quote module
    mainContent.innerHTML = `
        <h2>Quote of the Day</h2>
        <button id="get-quote-btn">Get a New Quote</button>
        <div id="quote-result"></div>
    `;

    // Get references to the button and the div where quote will appear
    const btn = document.getElementById("get-quote-btn");
    const resultDiv = document.getElementById("quote-result");

    // Function to fetch and display a new quote
    async function showQuote() {
        // Show a loading message while fetching
        resultDiv.innerHTML = "<p>Loading...</p>";

        // Fetch the quote using the fetchQuote function
        const data = await fetchQuote();

        // If quote fetched successfully, display it
        if (data) {
            resultDiv.innerHTML = `
                <p>"${data.content}"</p>
                <p><strong>- ${data.author}</strong></p>
            `;
        } else {
            // If fetching failed, show an error message
            resultDiv.innerHTML = "<p>Could not fetch quote. Try again.</p>";
        }
    }

    // Add a click event to the button to fetch a new quote on demand
    btn.addEventListener("click", showQuote);

    // Fetch and display a quote immediately when module loads
    showQuote();
}

// Function to initialize the quote module
function initQuote() {
    // Get the main content container from the HTML
    const mainContent = document.getElementById("main-content"); // Always fetch after DOM ready

    // Render the quote module inside the main content container
    renderQuote(mainContent);
}
