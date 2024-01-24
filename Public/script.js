// script.js
function fetchHotelDetails(hotelId, entityId) {
    // Construct URL with query parameters for hotelId and entityId, if needed
    const url = `/api/hotelDetails?hotelId=${hotelId}&entityId=${entityId}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Hotel Details:', data);
            // Here you can further process the data, update the DOM, etc.
        })
        .catch(error => {
            console.error('Error fetching hotel details:', error);
        });
}

// Example call to fetchHotelDetails
fetchHotelDetails('106005202', '27537542');
