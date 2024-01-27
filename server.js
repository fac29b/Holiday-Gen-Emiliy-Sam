const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const {configuration, OpenAI} = require('openai');
const app = express();

app.use(express.static('public')); // Serve static files from 'public' directory

// Define a new endpoint that includes a country name as part of the URL path
app.get('/api/countries/:name', async (req, res) => {
    // Extract the country name from the URL path parameter
    const countryName = req.params.name;
    const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    try {
        // Fetch data from the REST Countries API
        const response = await fetch(url);
        const data = await response.json();
        // Send the fetched data back to the client
        res.json(data);
    } catch (error) {
        console.error('Error fetching country details:', error);
        res.status(500).send('Internal Server Error');
    }
});

const openai = new OpenAI ({
  apiKey: process.env.openaiAPI,
});

app.get("/openai", async (req, res) => {
  const countryName = req.params.name;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Provide a seven day holiday plan for ${countryName}.`
      },
    ],
   model: "gpt-3.5-turbo",
   max_tokens: 300,
  });
  res.json(completion);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
