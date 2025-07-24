
document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    getWeatherData(city);
});

function getWeatherData(city) {
    const url = `https://wttr.in/${city}?format=j1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
        
            if (!data || !data.nearest_area || data.nearest_area.length === 0) {
                document.getElementById('cityCountry').innerText = "City not found";
                return;
            }

            const location = data.nearest_area[0].areaName[0].value + ", " + data.nearest_area[0].country[0].value;
            const temp_C = data.current_condition[0].temp_C;
            const humidity = data.current_condition[0].humidity;

            document.getElementById('cityCountry').innerText = location;
            document.getElementById('temperature').innerText = "Temperature: " + temp_C + "°C";
            document.getElementById('humidity').innerText = "Humidity: " + humidity + "%";


        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById('cityCountry').innerText = "Error fetching data";
        });
}
