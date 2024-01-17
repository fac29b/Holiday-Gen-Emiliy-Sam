//Below is just some example code of what our script.js file will be doing and communicating with both index.html and server.js


document.getElementById('searchButton').addEventListener('click', function() {
    var apiName = document.getElementById('apiName').value;
    if (apiName) {
        fetch('/search-api?name=' + apiName)
            .then(response => response.json())
            .then(data => {
                displayResults(data);
            });
    }
});

function displayResults(data) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results
    // Format and display data
    // ...
    resultsDiv.style.display = 'block';
}
