function searchHotels() {
    const hotelQuery = document.getElementById('hotelQuery').value;

    fetch(`/api/hotelDetails?query=${encodeURIComponent(hotelQuery)}`)
        .then(response => { console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const resultsDiv = document.getElementById('hotelResults');
            // Assuming 'data' itself is the array you want to iterate over
            if (data && data.length > 0) { // Adjusted condition to check data existence and length
                const formattedResults = data.map(item => `
                    <div class="hotel-item">
                        <h3>${item.entityName}</h3>
                        <p>Location: ${item.location}</p>
                        <p>Type: ${item.entityType}</p>
                        ${item.pois ? `<p>Points of Interest: ${item.pois.map(poi => poi.entityName).join(', ')}</p>` : ''}
                    </div>
                `).join('');
                resultsDiv.innerHTML = formattedResults;
            } else {
                resultsDiv.innerHTML = '<p>No results found.</p>'; // Inform user no data was found
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('hotelResults').innerHTML = '<p>Error fetching hotel data. Please try again later.</p>';
        });
};

document.getElementById('searchHotels').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    searchHotels();
});
