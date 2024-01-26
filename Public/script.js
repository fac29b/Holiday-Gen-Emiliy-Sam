let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-name");

searchBtn.addEventListener("click", () => {
    let countryName = countryInp.value; // Use the input value dynamically
    let finalURL = `/api/countries/${countryName}`; // Corrected URL
    console.log(finalURL);

    fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {
            if (data && data.length > 0) { 
                console.log(data[0]);
                console.log(data[0].capital ? data[0].capital[0] : 'Capital not found');
                console.log(data[0].flags.svg);
                console.log(data[0].name.common);
                console.log(data[0].continents ? data[0].continents[0] : 'Continent not found');
                console.log(data[0].demonyms.eng.m);
                console.log(data[0].car.side);
                console.log(data[0].maps.googleMaps);

                for (const language of Object.values(data[0].languages)) {
                    console.log(language);
                  }
                  const languagesString = Object.values(data[0].languages).join(', ');

                  let currencyString = '';
                  for (const [currencyCode, currencyInfo] of Object.entries(data[0].currencies)) {
                    currencyString += `${currencyInfo.name} (${currencyCode}), `;
                  }
                  currencyString = currencyString.slice(0, -2);

                  for (const time of Object.values(data[0].timezones)) {
                    console.log(time);
                  }
                  const timeString = Object.values(data[0].timezones).join(', ');

                result.innerHTML = `<img src="${data[0].flags.svg}"
                class="flag-img">
                <h2>${data[0].name.common}</h2>
                <div class="wrapper"> 
                <div class="data-wrapper">
                <ul>
                <li>Capital: <span>${data[0].capital[0]}</span></li>
                <br>
                <li>Continent: <span>${data[0].continents[0]}</span></li>
                <br>
                <li>Demonym: <span>${data[0].demonyms.eng.m}</span></li>
                <br>
                <li>Language(s): <span>${languagesString}</span></li>
                <br>
                <li>Currency: <span>${currencyString}</span></li>
                <br>
                <li>Drives on the: <span>${data[0].car.side}<span></li>
                <br>
                <li>Time Zones: <span>${timeString}</span></li>
                <ul>
                
                <br>
                <br>
                <h4>Country map:<h4>
                
                <iframe src="${data[0].maps.googleMaps}" width="400" height="300" style="border:0;"></iframe>`;

            } else {
                console.log("No data found for this country");
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
});
