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
app.get('/api/countries', async (req, res) => {
  
    const url = `https://restcountries.com/v3.1/all`;
    const options = {
        method: 'GET',
        headers: {
       
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching country details:', error);
        res.status(500).send('Internal Server Error');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
