function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

// function search(event) {
//   let searchInputElement = document.querySelector(".search-input");
//   let cityElement = document.querySelector(".current-city");
//   cityElement.innerHTML = searchInputElement.value;
//   event.preventDefault();
//   //You get the input value from the user and display it in the cityElement
//   //Weather API
//   let apiKey = "08efe8fe17403dtaa1c3ab29a4oa2072";
//   //You need to set up API key to get the data from the API
//   let url = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${apiKey}`;
//   //Within the URL, we are using the searchInputElement.value to get the city that the user has entered in the search bar
//   function showWeather(response) {
//     console.log(response.data);
//     //This is how the response looks like so from this you should be able to use the data below to get the humidity and wind
//     let temperature = response.data.temperature.current;
//     //
//     let temperatureElement = document.querySelector(
//       ".current-temperature-value"
//     );
//     temperatureElement.innerHTML = Math.round(temperature);
//   }
//   axios.get(url).then(showWeather);
// }

//showWweather function is used to display the data that we get from the API
// const form = document.getElementById("form");
//const log = document.getElementById("log");
// form.addEventListener("submit", search);
// let currentDateELement = document.querySelector(".current-date");
// let currentDate = new Date();
// currentDateELement.innerHTML = formatDate(currentDate);
///Getting weather data from API

function refreshWeather(api_data) {
  console.log(api_data);
  let temperatureElement = document.querySelector(".current-temperature-value");
  let cityElement = document.querySelector(".current-city");
  // let descriptionElement = document.querySelector(".weather-app-deatils");
  let humidityElement = document.querySelector(".humidity");
  let windSpeedElement = document.querySelector(".wind");
  let dateElement = document.querySelector(".current-date");
  let iconElement = document.querySelector(".current-temperature-icon");
  let currentDate = new Date();
  cityElement.innerHTML = api_data.city;
  temperatureElement.innerHTML = `${Math.round(api_data.temperature.current)}`;
  // descriptionElement.innerHTML = data.condition.description;
  humidityElement.innerHTML = `${api_data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${api_data.wind.speed} km/h`;
  dateElement.innerHTML = formatDate(currentDate);
  iconElement.innerHTML = `<img src="${api_data.condition.icon_url}" alt="${api_data.condition.description}" />`;
}

document.addEventListener("DOMContentLoaded", function () {
  let currentDate = new Date();
  let dateElement = document.querySelector(".current-date");
  dateElement.innerHTML = formatDate(currentDate);
});

function displayForecast(response) {
  let forecastHtml = "";

  response.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div> `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function handleWeatherResponse(response) {
  // console.log(response.data);
  refreshWeather(response.data);
  // displayForecast(response.data);
}

function handleWeatherForcastResponse(response) {
  console.log(response.data);
  displayForecast(response.data);
}

function searchCity(city) {
  let apiKey = "08efe8fe17403dtaa1c3ab29a4oa2072";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  //api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric
  // axios.get(apiUrl.then(handleWeatherResponse)); // wrong way
  https: axios.get(apiUrl).then(handleWeatherResponse); // right way
}

function searchCityForcast(city) {
  let apiKey = "08efe8fe17403dtaa1c3ab29a4oa2072";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  //api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric
  // axios.get(apiUrl.then(handleWeatherResponse)); // wrong way
  https: axios.get(apiUrl).then(handleWeatherForcastResponse); // right way
}

let searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-input");
  searchCity(cityInput.value);
  searchCityForcast(cityInput.value);
  console.log("searching", cityInput);
});
