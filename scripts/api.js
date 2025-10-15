// scripts/api.js

// Reference to main content area
const mainContent = document.getElementById("main-content");

// Replace with your OpenWeatherMap API key
const API_KEY = "YOUR_API_KEY_HERE";

// Function to fetch weather data for a city
async function fetchWeather(city) {
    try {
        // API URL for current weather
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error("City not found"); // Handle invalid city
        }

        const data = await response.json(); // Parse JSON data
        return data;
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
}

// Render Weather Module
function renderWeather() {
    let html = `
        <h2>Weather</h2>
        <input type="text" id="city-input" placeholder="Enter city name" />
        <button id="get-weather-btn">Get Weather</button>
        <div id="weather-result"></div>
    `;
    mainContent.innerHTML = html;

    const cityInput = document.getElementById("city-input");
    const getBtn = document.getElementById("get-weather-btn");
    const resultDiv = document.getElementById("weather-result");

    // Function to display weather data
    async function showWeather() {
        const city = cityInput.value.trim();
        if (city === "") return;

        resultDiv.innerHTML = "<p>Loading...</p>"; // Show loading state

        const data = await fetchWeather(city); // Fetch weather

        if (data) {
            // Display weather info
            resultDiv.innerHTML = `
                <p><strong>City:</strong> ${data.name}, ${data.sys.country}</p>
                <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
        } else {
            resultDiv.innerHTML = "<p>Could not fetch weather data. Try again.</p>";
        }
    }

    // Click event
    getBtn.addEventListener("click", showWeather);

    // Enter key support
    cityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") showWeather();
    });
}

// Initialize Weather Module
function initWeather() {
    renderWeather(); // Render input and result area
}
