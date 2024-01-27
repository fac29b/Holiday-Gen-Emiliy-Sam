let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-name");

searchBtn.addEventListener("click", async () => {
    let countryName = countryInp.value;
    await fetchAndDisplayCountryDetails(countryName);
    await makeTravelPlan(countryName);
});

function fetchAndDisplayCountryDetails(countryName) {
    let finalURL = `/api/countries/${countryName}`;

    fetch(finalURL)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const countryData = data[0];
                const languagesString = Object.values(countryData.languages).join(', ');
                let currencyString = Object.entries(countryData.currencies).map(([code, info]) => `${info.name} (${code})`).join(', ');
                const timeString = Object.values(countryData.timezones).join(', ');

                let result = document.getElementById("result");
                result.innerHTML = `
                    <img src="${countryData.flags.svg}" class="flag-img">
                    <h2>${countryData.name.common}</h2>
                    <div class="wrapper"> 
                        <div class="data-wrapper">
                            <ul>
                                <li>Capital: <span>${countryData.capital[0]}</span></li>
                                <br>
                                <li>Continent: <span>${countryData.continents[0]}</span></li>
                                <br>
                                <li>Demonym: <span>${countryData.demonyms.eng.m}</span></li>
                                <br>
                                <li>Language(s): <span>${languagesString}</span></li>
                                <br>
                                <li>Currency: <span>${currencyString}</span></li>
                                <br>
                                <li>Drives on the: <span>${countryData.car.side}</span></li>
                                <br>
                                <li>Time Zones: <span>${timeString}</span></li>
                            </ul>
                            <br>
                            <br>
                            <h4>Country map:</h4>
                            <iframe src="${countryData.maps.googleMaps}" width="400" height="300" style="border:0;"></iframe>
                        </div>
                    </div>`;
            } else {
                console.log("No data found for this country");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
async function makeTravelPlan() {
    try {
      const response = await fetch(`/openai`);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      document.getElementById("chatGPT-results").innerHTML =
        data.choices[0].message.content;
      console.log(response);
    } catch (error) {
      console.log("error fetching travel plan", error.message);
    }
  }
  makeTravelPlan();