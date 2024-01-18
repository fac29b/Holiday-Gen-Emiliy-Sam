console.log(4)

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://sky-scrapper.p.rapidapi.com/api/v1/checkServer',
  headers: {
    'X-RapidAPI-Key': process.env.SKY_SCRAPPER_KEY,
    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

