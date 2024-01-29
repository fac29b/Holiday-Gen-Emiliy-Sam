let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-name");

function getRandomCountry() {
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
    "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia",
    "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
    "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
    "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
    "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan",
    "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
    "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
    "Zambia", "Zimbabwe"
];
const getRandomCountryIndex = Math.floor(Math.random() * countries.length);
return countries[getRandomCountryIndex];
}

function fetchAndDisplayCountryDetails() {
  let countryName = getRandomCountry();
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
                    <h3>${countryData.name.common}</h3>
                    <div class="wrapper"> 
                        <div class="data-wrapper">
                            <ul class="fact-list">
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
                                <br>
                                <li>Country map:</li>
                            <iframe src="${countryData.maps.googleMaps}" width="400" height="300" style="border:0;"></iframe>
                            </ul>
                           <br>
      
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
    const chatGPTResults = document.getElementById("chatGPT-results");
    chatGPTResults.innerHTML = 'Loading travel plans...'; 
    chatGPTResults.style.display = "block";
    try {
      const response = await fetch(`/openai`);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      const chatGPTResults = document.getElementById("chatGPT-results");
      chatGPTResults.innerHTML = `
      <div padding: 15px; border-radius: 10px;">
          <p style="color: #555;">${data.choices[0].message.content}</p>
      </div>`;
      chatGPTResults.style.display = "block";
      console.log(response);
    } catch (error) {
      console.log("error fetching travel plan", error.message);
    }
  }

  async function fetchImages() {
    try {
        const response = await fetch('/unsplash');
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}
  function displayImages(images) {
    const imageContainer = document.getElementById("image-container");

    console.log("Number of images:", images.length);
    imageContainer.innerHTML = "";
    images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = image.urls.regular;
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("image-item");
        imageDiv.appendChild(imgElement);
        imageContainer.appendChild(imageDiv);
    });
}

  searchBtn.addEventListener("click", async () => {
    await fetchAndDisplayCountryDetails();
    const images = await fetchImages();
    await makeTravelPlan();
    await displayImages(images);
});
