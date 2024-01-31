# Emily and Sam's Project - Random Holiday Generator

## Overview

In this project, as part of our final Founders and Coders assignment, we have created a random holiday generator. Using the REST Countries, Unsplash Images, and the OpenAI APIs, with the click of a button a seven-day holiday itinerary is generated, including images of your destination. Instead of imposing our own morality and judgements on the safety and security of different countries, GenHoliday exists in a utopia where there are no conflicts and everyone is free to travel anywhere. Click a button, sit back, and see where GenHoliday takes you!

## Cloning instructions

To run this code yourself, you will need to clone the repository and download dependencies:

```bash
npm install
```

From there create a `.env` file in the root directory and add the API key:

```env
openaiAPI=your_openAI_api_key
unsplashAPI=you_unsplash_api_key
```

Replace those keys with your personal API keys for OpenAI and Unsplash. REST Countries API does not require a key.


## Client-side Features

- a button to randomly generate a country
- a banner of images that update for the randomly generated country when the user first clicks a button (to allow users to play 'guess the destination'
- a loading wheel and message
- REST Countries Data and ChatGPT data appearing simultaneously on the screen
- the ability to press the button repeatedly and have the same user experience
- a link at the bottom to Booking.com
- a 100% accessibility score on Chrome lighthouse

The one-click functionality is achieved through an event listener that calls all the API-based functions, as well as displaying the loading wheel and until both the REST countries data and ChatGPT data evaluate to true. It also clears this data each time, to allow the user to reset and make another selection. This is the piece of code that achieves that:

```js client

searchBtn.addEventListener("click", async () => {

    chatGPTResultsLoaded = false;
    countryDetailsLoaded = false;

    document.getElementById("loading-container").style.display = "block";

    words.style.display = "none";
    document.getElementById("container").style.backgroundColor = "transparent";
    document.getElementById("search-btn").style.fontSize = "2em";

    document.getElementById("results-box").style.display = "none";

    await Promise.allSettled([fetchAndDisplayCountryDetails(), makeTravelPlan(), updateBannerImages()]);


    document.getElementById("loading-container").style.display = "none";

 
    if (chatGPTResultsLoaded && countryDetailsLoaded) {
        document.getElementById("results-box").style.display = "flex";
        document.getElementById("travel-links").style.display = "flex";
    } else {
      console.error("GPT Failed to load country details.");
        
    }
});
```

## Backend features

- async get requests to each of the three APIs
- hidden API keys
- instructions for the format of returning ChatGPT content

## Possible Additions

With more time and resources, we'd like to add the following to the project:

- working inlaid google maps. This may require an https connection, or using the Google Maps API directly.
- better image filtering. At the moment, there are some very small countries that only return a couple of images, and others where you get very similar images repeatedly. It also sometimes makes mistakes because it is searching based on how Unsplash users tag their photos so, for example, it returned a picture of Central Park for Central African Republic. We'd like to use AI to filter these, and also ensure that all the images coming through include ALT text.
- improved user options. We'd like to allow users to customise their planning options, such as choosing the length of a holiday or specifying a continent or language spoken to filter their random results.
- integration with other travel planning apps. We'd either like to directly connect this to flight and hotel APIs, or be able to directly populate links to a site like booking.com so if, for example, a person gets Bulgaria it will have a link that automatically loads flights to Sofia based on the user's current location. 

