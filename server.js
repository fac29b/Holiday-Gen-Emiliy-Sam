//Basic Server Setup 
const express = require('express');
const path = require('path'); // Include the 'path' module
const app = express();
const axios = require('axios');
require('dotenv').config();
const fetch = require('node-fetch');

const port = 3000;

//Route links to all files in Public folder - 
app.use(express.static(path.join(__dirname, 'Public')));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Your other routes go here...


 


//API ROUTE FOR HOTEL API 
// API Route for Hotel Search by Destination or Hotel Name
app.get('/api/hotels', async (req, res) => {
  try {
    const query = req.query.query; // Get the user input from query parameters

    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchDestinationOrHotel?query=${encodeURIComponent(query)}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.HOTEL_KEY,
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
      }
    };

    const response = await fetch(url, options);
    const result = await response.json(); // Assuming the API returns JSON
    res.json(result); // Send the response data back to the client
  } catch (error) {
    console.error('Error fetching hotel data:', error);
    res.status(500).send('Error fetching hotel data');
  }
});