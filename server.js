const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const fetch = require('node-fetch');

const port = 3000;

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/api/hotelDetails', async (req, res) => {
    // Example of using dynamic parameters from the query string
    const hotelId = req.query.hotelId;
    const entityId = req.query.entityId;
    // Additional parameters like currency, market, and countryCode can be static or dynamic
    const currency = 'USD';
    const market = 'en-US';
    const countryCode = 'US';

    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/hotels/getHotelDetails?hotelId=${hotelId}&entityId=${entityId}&currency=${currency}&market=${market}&countryCode=${countryCode}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.HOTEL_KEY,
            'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`API responded with status code ${response.status}`);
        }
        const result = await response.json(); // Assuming the API returns JSON
        res.json(result); // Correctly send the JSON response back to the client
    } catch (error) {
        console.error('Error fetching hotel details:', error);
        res.status(500).send('Error fetching hotel details');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Your other routes go here...

//API ROUTE FOR HOTEL API 
// API Route for Hotel Search by Destination or Hotel Name
// app.get('/api/hotels', async (req, res) => {
//   try {
//     const query = req.query.query; // Get the user input from query parameters

//     const url = `https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchDestinationOrHotel?query=${encodeURIComponent(query)}`;
//     const options = {
//       method: 'GET',
//       headers: {
//         'X-RapidAPI-Key': process.env.HOTEL_KEY,
//         'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
//       }
//     };

//     const response = await fetch(url, options);
//     const result = await response.json(); // Assuming the API returns JSON
//     res.json(result); // Send the response data back to the client
//   } catch (error) {
//     console.error('Error fetching hotel data:', error);
//     res.status(500).send('Error fetching hotel data');
//   }
//   // Inside your /api/hotels route in server.js
// const response = await fetch(url, options);
// if (!response.ok) {
//     throw new Error(`API responded with status code ${response.status}`);
// }
// const result = await response.json(); // Assuming the API returns JSON
// console.log(result); // Log the result to see what the API returned
// res.json(result); // Send the response data back to the client

// });