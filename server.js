// server.js
import express from 'express';
import fetch from 'node-fetch'; // Make sure you have node-fetch installed
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Loads variables from .env into process.env

const app = express();
app.use(cors()); // Enable CORS for all routes

// Endpoint to get hotel details from Sky Scrapper API
app.get('/api/hotelDetails', async (req, res) => {
    // Example URL with dynamic parameters based on request, if needed
    const hotelId = req.query.hotelId || '106005202'; // Default ID if none provided
    const entityId = req.query.entityId || '27537542'; // Default entity ID if none provided
    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/hotels/getHotelDetails?hotelId=${hotelId}&entityId=${entityId}&currency=USD&market=en-US&countryCode=US`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.SKYSCRAPPER_API_KEY, // Use the API key from .env
            'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json(); // Use .json() if the API returns JSON
        res.json(data); // Send the data back to the client
    } catch (error) {
        console.error('Error fetching hotel details:', error);
        res.status(500).send('Internal Server Error');
    }
});

const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
