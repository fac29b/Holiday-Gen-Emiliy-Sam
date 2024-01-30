const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const { configuration, OpenAI } = require('openai');
const { createApi } = require('unsplash-js');
const app = express();
let country = "";

// Unsplash API Setup
global.fetch = fetch;
const unsplash = createApi({ accessKey: process.env.unsplashAPI });


app.use(express.static('public')); 

app.get('/', (req, res) => {
  res.send('Welcome to my Node.js Project');
});

app.get('/api/countries/:name', async (req, res) => {
    const countryName = req.params.name;
    const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    country = countryName;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching country details:', error);
        res.status(500).send('Internal Server Error');
    }
});

const openai = new OpenAI({
    apiKey: process.env.openaiAPI,
});

app.get("/openai", async (req, res) => {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Provide a seven day holiday plan for ${country}. Provide the information formatted in HTML. The title should read 'Seven Days in ${country}' and be written in <h3>, and subtitles should be in <h4 class="chat-subtitles">. Do not style anything that is returned or use bullet points.`
            },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 2000,
    });
    res.json(completion);
});


app.get('/unsplash', async (req, res) => {
  try {
      const photosResponse = await unsplash.search.getPhotos({ query: country });
      const photos = photosResponse.response.results;
      res.json(photos);
  } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
