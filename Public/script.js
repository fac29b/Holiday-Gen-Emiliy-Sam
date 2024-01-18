//Below is just some example code of what our script.js file will be doing and communicating with both index.html and server.js


document.getElementById('searchHotels').addEventListener('click', function() {
    const hotelQuery = document.getElementById('hotelQuery').value;

    fetch(`/api/hotels?query=${encodeURIComponent(hotelQuery)}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('hotelResults');
            if (data.status && data.data) {
                const formattedResults = data.data.map(item => {
                    return `<div class="hotel-item">
                        <h3>${item.entityName}</h3>
                        <p>Location: ${item.location}</p>
                        <p>Type: ${item.entityType}</p>
                        ${item.pois ? `<p>Points of Interest: ${item.pois.map(poi => poi.entityName).join(', ')}</p>` : ''}
                    </div>`;
                }).join('');
                resultsDiv.innerHTML = formattedResults;
            } else {
                resultsDiv.innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultsDiv.innerHTML = '<p>Error fetching hotel data.</p>';
        });
});
