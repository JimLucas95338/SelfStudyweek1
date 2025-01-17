// Contact Form
const form = document.getElementById("contactForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name) {
        alert("Please enter your name");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email");
        return;
    }

    message.textContent = "Thank you for reaching out!";
    message.style.display = "block";
    form.reset();
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/// Weather Fetching for Widget
const weatherButton = document.getElementById("getWeather");
const weatherResult = document.getElementById("weatherResult");
const weatherIcon = document.getElementById("weatherIcon");

weatherButton.addEventListener("click", async () => {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        alert("Please enter a city!");
        return;
    }

    // Show loading message
    weatherResult.textContent = "Fetching weather data...";
    weatherIcon.style.display = "none"; // Hide the icon while loading

    const apiKey = "0d95e397fe5094b3c16e20348d5b7358";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        // Get the icon code from the API response
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Update the result and show the icon
        weatherResult.textContent = `The temperature in ${data.name} is ${data.main.temp}°F with ${data.weather[0].description}.`;
        weatherIcon.src = iconUrl;
        weatherIcon.style.display = "block"; // Show the icon
    } catch (error) {
        weatherResult.textContent = "Error fetching weather data.";
        weatherIcon.style.display = "none"; // Hide the icon on error
    }
});
