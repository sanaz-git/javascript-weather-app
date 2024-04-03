const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "c980112b93d5cba99d99d53547360af3";
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  console.log(url);
  const response = await fetch(url);
  const json = await response.json();
  return json;
};
const getCurrentWeatherByCoordinate = async (lat, lon) => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  console.log(url);
  const response = await fetch(url);
  const json = await response.json();
  return json;
};
const getForecastWeatherByName = async (city) => {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  console.log(url);
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const renderCurrentWeather = (data) => {
  // console.log(data);
  const weatherJSx = `
  <h1>${data.name}, ${data.sys.country}</h1>
  <div id="main">
    <img
      alt="weather icon"
      src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png"
    />
    <span>${data.weather[0].main}</span>
    <p>${Math.round(data.main.temp)} °C</p>
  </div>
  <div id="info">
  <p>Humidity: <span>${data.main.humidity}</span></p>
  <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
  </div>`;
  weatherContainer.innerHTML = weatherJSx;
};

const getWeekDay = (data) => {
  return DAYS[new Date(data * 1000).getDay()];
};
const renderForecastWeather = (data) => {
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  console.log("data", data);
  data.forEach((i) => {
    const forecastJsx = `

  <div>
    <img
      alt="weather icon"
      src="https://api.openweathermap.org/img/w/${i.weather[0].icon}.png"
    />
    <h3>${getWeekDay(i.dt)}</h3>
    <p>${Math.round(i.main.temp)} °C</p>
    <span>${i.weather[0].main}</span>
  </div>`;
    forecastContainer.innerHTML += forecastJsx;
  });
};

const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    alert("Please enter city name");
  }
  const currentData = await getCurrentWeatherByName(cityName);
  renderCurrentWeather(currentData);
  const forecastData = await getForecastWeatherByName(cityName);
  renderForecastWeather(forecastData);
};

const positionCallback = async (position) => {
  const { latitude, longitude } = position.coords;
  const currentData = await getCurrentWeatherByCoordinate(latitude, longitude);
  console.log(latitude, latitude);
  console.log(currentData);
  renderCurrentWeather(currentData);
};
const errorCallback = (error) => {
  console.log(error.message);
};
const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    alert("Your browser dose not support geolocation");
  }
};

searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
