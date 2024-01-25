let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-name");

searchBtn.addEventListener("click", () => {
    let countryName = countryInp.value; // Use the input value dynamically
    let finalURL = `/api/countries/${countryName}`; // Corrected URL
    console.log(finalURL);

    fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {
            if (data && data.length > 0) { // Ensure data is received
                console.log(data[0]);
                console.log(data[0].capital ? data[0].capital[0] : 'Capital not found');
                console.log(data[0].flags.svg);
                console.log(data[0].name.common);
                console.log(data[0].continents ? data[0].continents[0] : 'Continent not found');
                

                result.innerHTML = `<img src="${data[0].flags.svg}"
                class="flag-img">
                <h2>${data[0].name.common}</h2>
                <div class="wrapper"> 
                <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
                <h4>Continent:</h4>
                <span>${data[0].continents[0]}</span>`;

            } else {
                console.log("No data found for this country");
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
});
