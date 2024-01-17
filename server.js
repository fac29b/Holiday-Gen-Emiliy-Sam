//Basic Server Setup 
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
console.log(`Server running on port ${port}`);
});

app.use(express.static('public'));
// Basic server setuo end // 

//Example of get requests below 
//GET ROUTES GO HERE 
app.get('/api/data/', (req, res) => {
    //Fetch data from external API 
    //Return that data in JSON format
    res.json({ date: "Sample Data "});
});


// Example using Express.js
app.get('/search-api', (req, res) => {
    const apiName = req.query.name;
    // Use movie API to fetch data
    // For example, using a hypothetical movie API
    fetch('https://api.exampleapi.com/search?query=' + apiName)
        .then(apiResponse => apiResponse.json())
        .then(data => res.json(data))
        .catch(error => res.status(500).json({ error: 'Error fetching data' }));
});
