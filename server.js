const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const {configuration, OpenAI} = require('openai');
const { createApi } = require('unsplash-js');
const app = express();
let country = "";

app.use(express.static('public')); // Serve static files from 'public' directory

// Define a new endpoint that includes a country name as part of the URL path
app.get('/api/countries/:name', async (req, res) => {
    // Extract the country name from the URL path parameter
    const countryName = req.params.name;
    const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    country = countryName;

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
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Provide a seven day holiday plan for ${country}. Provide the information formatted to in HTML. The title should read 'Seven Days in ${country} and be written in <h3>, and subtitles should be in <h4 class="chat-subtitles">. Do not style anything that is returned or use bullet points.`
      },
    ],
   model: "gpt-3.5-turbo",
   max_tokens: 2000,
  });
  res.json(completion);
});

  const unsplash = createApi({
    accessKey: process.env.unsplashAPI,
    fetch: fetch,
  });

  app.get('/search/photos', async (req, res) => {
    try {
        const response = await unsplash.search.photos(country, 1, 10);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching images', error);
        res.status(500).send('Internal Server Error');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
