const express = require('express');
const cors = require('cors');
const axios = require('axios'); // For making external API calls
const app = express();
const PORT = 3000;

const API_KEY = '0d95e397fe5094b3c16e20348d5b7358';

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Weather API Proxy Route
app.get('/weather', async (req, res) => {
    const city = req.query.city || 'London';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
