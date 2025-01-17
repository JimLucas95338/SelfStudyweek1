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

document.addEventListener("DOMContentLoaded", () => {
    const weatherResult = document.getElementById("weatherResult");
    const weatherIcon = document.getElementById("weatherIcon");
    const cityInput = document.getElementById("city");
    const getWeatherButton = document.getElementById("getWeather");

    // Add event listener for the "Get Weather" button
    getWeatherButton.addEventListener("click", () => {
        const city = cityInput.value.trim();

        if (city) {
            fetchWeather(city);
        } else {
            weatherResult.textContent = "Please enter a city name.";
        }
    });

    // Function to fetch weather data from the backend
    function fetchWeather(city) {
        fetch(`http://localhost:3000/weather?city=${city}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    weatherResult.textContent = `Error: ${data.error}`;
                } else {
                    displayWeather(data);
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherResult.textContent = "Failed to fetch weather data. Please try again later.";
            });
    }

    // Function to display the weather information
    function displayWeather(data) {
        const { name, main, weather } = data;

        weatherResult.textContent = `Weather in ${name}: ${Math.round(main.temp)}°F, ${weather[0].description}`;
        weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        weatherIcon.alt = weather[0].description;
        weatherIcon.style.display = "block";
    }
});
