document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city.");
    }
});

async function fetchWeather(city) {
    const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Show loading message
    document.getElementById('cityStats').innerHTML = `<p>Loading...</p>`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayCityWeather(data);
        } else {
            document.getElementById('cityStats').innerHTML = `<p class="error-message">City not found. Please try again.</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('cityStats').innerHTML = `<p class="error-message">Something went wrong. Please try again later.</p>`;
    }
}

function displayCityWeather(data) {
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const cityCard = `
        <div class="city-card">
            <h2>${data.name}, ${data.sys.country}</h2>
            <div>
                <img src="${iconUrl}" alt="Weather Icon" />
                <span>${data.weather[0].description}</span>
            </div>
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        </div>
    `;

    document.getElementById('cityStats').innerHTML = cityCard;
}

document.getElementById('unitToggle').addEventListener('click', function() {
    const currentUnit = document.getElementById('cityStats').textContent.includes('°C') ? 'metric' : 'imperial';
    const unitSymbol = currentUnit === 'metric' ? '°F' : '°C';
    this.textContent = `Switch to ${unitSymbol}`;

    // Fetch the weather data again with the new unit
    fetchWeather(document.getElementById('cityInput').value);
});
