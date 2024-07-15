//const { default: axios } = require("axios");

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

let searchForm = document.querySelector(".search-form");

function search(event) {
  let searchInputElement = document.querySelector(".search-input");
  let cityElement = document.querySelector(".current-city");
  cityElement.innerHTML = searchInputElement.value;
  event.preventDefault();
  //You get the input value from the user and display it in the cityElement

  //Weather API
  let apiKey = "08efe8fe17403dtaa1c3ab29a4oa2072";
  //You need to set up API key to get the data from the API

  let url = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${apiKey}`;
  //Within the URL, we are using the searchInputElement.value to get the city that the user has entered in the search bar

  function showWeather(response) {
    console.log(response.data);

    //This is how the response looks like so from this you should be able to use the data below to get the humidity and wind

    let temperature = response.data.temperature.current;
    //

    let temperatureElement = document.querySelector(
      ".current-temperature-value"
    );

    temperatureElement.innerHTML = Math.round(temperature);
  }

  axios.get(url).then(showWeather);
}

//showWweather function is used to display the data that we get from the API

const form = document.getElementById("form");
//const log = document.getElementById("log");
form.addEventListener("submit", search);

let currentDateELement = document.querySelector(".current-date");

let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

///Getting weather data from API
