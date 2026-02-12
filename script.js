const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const description = document.getElementById('description');
const wind = document.getElementById('wind');
const errorMessage = document.getElementById('error-message');

const apiKey = '7d55c497552816a176b82d8ddeaa241f ';

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();

    if (city) {
        fetchWeatherData(city);
    } else {
        errorMessage.textContent = 'Please enter a city name';
    }
});

function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            errorMessage.textContent = "";

            cityName.textContent = data.name;
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            description.textContent = data.weather[0].description;
            wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        })
        .catch(error => {
            errorMessage.textContent = error.message;
            clearWeatherInfo();
        });
}

function clearWeatherInfo() {
    cityName.textContent = "";
    temperature.textContent = "";
    humidity.textContent = "";
    description.textContent = "";
    wind.textContent = "";
}
