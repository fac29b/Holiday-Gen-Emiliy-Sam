//Basic Server Setup 
const express = require('express');
const path = require('path'); // Include the 'path' module
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Your other routes go here...
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
  });

  app.get('/flights.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'flights.js'));
  });

  app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.js'));
  });



app.get('/search-api', (req, res) => {
  const apiName = req.query.name;
  // Use a movie API to fetch data
  // For example, using a hypothetical movie API
  fetch('https://api.exampleapi.com/search?query=' + apiName)
    .then(apiResponse => apiResponse.json())
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ error: 'Error fetching data' }));
});