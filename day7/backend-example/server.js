require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios'); // For making external API calls
const app = express();
const PORT = 3000;

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Weather API Proxy Route
app.get('/weather', async (req, res) => {
    const city = req.query.city || 'London';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
    
    try {
        const response = await axios.get(url);

        if (response.data.cod && response.data.cod !== 200) {
            // Handle errors returned by OpenWeatherMap
            return res.status(response.data.cod).json({ error: response.data.message });
        }

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);

        if (error.response) {
            // API returned an error response
            res.status(error.response.status).json({ error: error.response.data.message });
        } else {
            // Network or other errors
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
