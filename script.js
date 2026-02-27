const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const description = document.getElementById("description");
const wind = document.getElementById("wind");
const errorMessage = document.getElementById("error-message");
const weatherIcon = document.getElementById("weather-icon");


const welcome = document.getElementById("welcome");
const weatherInfo = document.getElementById("weather-info");

const apiKey = "7d55c497552816a176b82d8ddeaa241f";


window.onload = function () {
  if (welcome) welcome.style.display = "block";
  if (weatherInfo) weatherInfo.style.display = "none";
  errorMessage.textContent = "";
};

searchBtn.addEventListener("click", () => {
  handleSearch();
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

function handleSearch() {
  const city = cityInput.value.trim();

  if (city) {
    fetchWeatherData(city);
  } else {
    errorMessage.textContent = "Please enter a city name";

    if (weatherInfo) weatherInfo.style.display = "none";
    if (welcome) welcome.style.display = "block";
  }
}

function fetchWeatherData(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      errorMessage.textContent = "";

      
      if (welcome) welcome.style.display = "none";
      if (weatherInfo) weatherInfo.style.display = "block";

      cityName.textContent = data.name;
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      description.textContent = data.weather[0].description;
      wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;

      const iconCode = data.weather[0].icon;
      weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherIcon.style.display = "block";
    })
    .catch((error) => {
      errorMessage.textContent = error.message;

      
      if (weatherInfo) weatherInfo.style.display = "none";
      if (welcome) welcome.style.display = "block";

      clearWeatherInfo();
    });
}

function clearWeatherInfo() {
  cityName.textContent = "";
  temperature.textContent = "";
  humidity.textContent = "";
  description.textContent = "";
  wind.textContent = "";
  weatherIcon.src = "";
  weatherIcon.style.display = "none";
}
