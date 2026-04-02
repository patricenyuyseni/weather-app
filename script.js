
document.addEventListener("DOMContentLoaded", () => {

  const API_KEY = "7d55c497552816a176b82d8ddeaa241f";

  const cityInput = document.getElementById("cityInput");
  const searchBtn = document.getElementById("searchBtn");

  const cityName = document.getElementById("cityName");
  const temp = document.getElementById("temp");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  const icon = document.getElementById("icon");
  const error = document.getElementById("error");

  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      getWeather(city);
      localStorage.setItem("lastCity", city);
    }
  });

  function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => {
        if (data.cod !== 200) {
          throw new Error();
        }

        displayWeather(data);
        error.textContent = "";
      })
      .catch(() => {
        error.textContent = "City not found. Try again.";
      });
  }

  function displayWeather(data) {
    cityName.textContent = data.name;
    temp.textContent = data.main.temp;
    description.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    wind.textContent = data.wind.speed;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  }

  function loadWeatherOnStart() {
    const savedCity = localStorage.getItem("lastCity");

    if (savedCity) {
      getWeather(savedCity);
    } else {
      getWeather("New York");
    }
  }

  loadWeatherOnStart();

});
