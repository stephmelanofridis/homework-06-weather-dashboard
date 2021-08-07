const userFormEl = $(".search-box");
const cityInput = $("#search-query");
const submitBtn = $(".submit");
const prevContainer = $(".prevsearch-container")
const prevEl = $(".prevsearch-box");
const cityEl = $("#city");
const dateEl = $("#date");
const currentWeather = $("#current-weather-items");
const futureWeather = $("#weather-forecast");
const cityArr = [];
const currentDate = moment().format("DD/MM/YYYY");

const API_KEY = "d7ddb6b485324f8476383582a2ea3896";

$(document).ready(function () {
  let pastInput = JSON.parse(localStorage.getItem("city"));
  console.log(pastInput);
  if (pastInput !== null) {
    for (var i = 0; i < pastInput.length; i++) {
      var liEl = $("<li class='li-el-results'>" + pastInput[i] + "</li>");
      prevEl.append(liEl);
      prevContainer.removeClass("d-none");
      console.log(liEl);
    };
  };
});

function inputHandler(event) {
  event.preventDefault();
  currentWeather.empty();
  futureWeather.empty();

  let location = cityInput.val().trim();
  console.log(location);

  if (location) {
    getWeather(location);
    cityInput.val("");
  } else {
    alert("Please enter a location to continue. ");
  };
};

function getWeather(location) {
  let apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + API_KEY;
  let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=metric&appid=" + API_KEY;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayWeather(data, location);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("City not found. ");
    });
}