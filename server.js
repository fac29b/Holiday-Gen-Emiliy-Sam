const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

// Correct placement: After the app has been initialized
app.use(express.static('public')); // Serve static files from 'public' directory

// Optionally, re-enable CORS for all routes if needed
// app.use(cors());

// Endpoint to get hotel details from Sky Scrapper API
app.get('/api/hotelDetails', async (req, res) => {
    const hotelId = req.query.hotelId || '106005202'; // Default ID if none provided
    const entityId = req.query.entityId || '27537542'; // Default entity ID if none provided
    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/hotels/getHotelDetails?hotelId=${hotelId}&entityId=${entityId}&currency=USD&market=en-US&countryCode=US`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.SKYSCRAPPER_API_KEY,
            'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching hotel details:', error);
        res.status(500).send('Internal Server Error');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
