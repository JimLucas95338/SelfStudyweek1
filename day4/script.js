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
document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "0d95e397fe5094b3c16e20348d5b7358";
    const weatherResult = document.getElementById("weatherResult");
    const weatherIcon = document.getElementById("weatherIcon");
    const weatherMessage = document.getElementById("weatherMessage");

    // Fetch weather by city name
    document.getElementById("getWeather").addEventListener("click", () => {
        const city = document.getElementById("city").value;
        if (city.trim()) {
            fetchWeatherByCity(city);
        } else {
            weatherMessage.textContent = "Please enter a city name.";
        }
    });

    // Use geolocation to fetch weather
    document.getElementById("useLocation").addEventListener("click", () => {
        if (navigator.geolocation) {
            weatherMessage.textContent = "Fetching your location...";
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherByCoords(latitude, longitude);
                },
                error => {
                    weatherMessage.textContent = "Unable to retrieve location.";
                    console.error(error);
                }
            );
        } else {
            weatherMessage.textContent = "Geolocation is not supported by your browser.";
        }
    });

    // Fetch weather by city name
    function fetchWeatherByCity(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
        fetchWeather(url);
    }

    // Fetch weather by coordinates
    function fetchWeatherByCoords(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
        fetchWeather(url);
    }

    // General fetch weather function
    function fetchWeather(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    weatherMessage.textContent = data.message;
                }
            })
            .catch(error => {
                weatherMessage.textContent = "Error fetching weather data.";
                console.error(error);
            });
    }

    // Display weather data
    function displayWeather(data) {
        const { name, main, weather } = data;
        const iconMap = {
            "Clear": "fa-sun",
            "Clouds": "fa-cloud",
            "Rain": "fa-cloud-showers-heavy",
            "Drizzle": "fa-cloud-rain",
            "Thunderstorm": "fa-bolt",
            "Snow": "fa-snowflake",
            "Mist": "fa-smog",
            "Fog": "fa-smog"
        };
        const iconClass = iconMap[weather[0].main] || "fa-question";
    
        weatherResult.textContent = `Weather in ${name}: ${Math.round(main.temp)}°C, ${weather[0].description}`;
        weatherIcon.className = `fas ${iconClass}`;
        weatherIcon.style.display = "inline-block";
        weatherMessage.textContent = ""; // Clear any previous message
    }
});