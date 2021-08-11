const userFormEl = $(".search-box");
const cityInput = $("#search-query");
const submitBtn = $(".submit");
const prevContainer = $(".prevsearch-container");
const futureContainer = $(".future-forecast");
const futureWeather = $("#weather-forecast");
const prevEl = $(".prevsearch-box");
const cityEl = $("#city");
const dateEl = $("#date");
const currentWeather = $("#current-weather-items");
const cityArr = [];
const currentDate = moment().format("DD MMMM YY");

const API_KEY = "d7ddb6b485324f8476383582a2ea3896";

$(document).ready(function () {
  let pastInput = JSON.parse(localStorage.getItem("city"));
  if (pastInput !== null) {
    for (var i = 0; i < pastInput.length; i++) {
      var liEl = $("<li class='li-el-results'>" + pastInput[i] + "</li>");
      prevEl.append(liEl);
      prevEl.addClass("list-unstyled");
      prevContainer.removeClass("d-none");
    };
  };
});

function inputHandler(event) {
  event.preventDefault();
  currentWeather.empty();
  futureWeather.empty();

  let location = cityInput.val().trim();

  if (location) {
    getWeather(location);
    cityInput.val("");
  } else {
    alert("Please enter a location to continue. ");
  };
};

function getWeather(location) {
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + API_KEY;
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

  fetch(forecastUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayCards(data, location);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("City not found. ")
    });
}

function displayWeather(weather, location) {
  if (weather.length === 0) {
    alert("No data found. ")
  };

  console.log(location);

  var liEl = $("<li class='li-el-results value='" + location + "'>" + location + "</li>");
  prevEl.append(liEl);

  cityArr.push(location);
  console.log(cityArr);

  let allInput = JSON.stringify(cityArr);
  localStorage.setItem("city", allInput);
  console.log(localStorage.getItem("city"));

  let h2El = $("<h1>");
  let imgEl = $("<img>");
  let icon = weather.weather[0].icon;
  console.log(icon);

  let iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  imgEl.attr("src", iconUrl);
  imgEl.addClass("icon m-2")

  h2El = $("<h2 class='header-result'>" + location + " " + currentDate + "</h2>");
  currentWeather.append(h2El);
  h2El.append(imgEl);

  let temp = weather.main.temp;
  let wind = weather.wind.speed;
  let humidity = weather.main.humidity;

  currentWeather.append("<p class='temp-today'>Temp: " + temp + "°C</p>")
  currentWeather.append("<p class='wind-today'>Wind Speed: " + wind + "MPH</p>")
  currentWeather.append("<p class='temp-today'>Humidity: " + humidity + "%</p>")
  currentWeather.removeClass("d-none")

  let getLat = weather.coord.lat;
  let getLon = weather.coord.lon;

  let uvUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + getLat + "&lon=" + getLon + "&exclude=hourly&appid=" + API_KEY;

  fetch(uvUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);

          renderUV(data)
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Error");
    });

  function renderUV(coordinates) {
    if (coordinates.length === 0) {
      alert("No UV Index found. ")
    }

    let uv = coordinates.current.uvi;

    uvEl = $("<p class='uv-today'>UV Index: </p>");
    uvSpan = $("<span class='uv-span'>" + uv + "</span>");
    uvEl.append(uvSpan);
    currentWeather.append(uvEl);

    if (uv < 2) {
      uvSpan.addClass("uv-badge green");
      uvSpan.append(" (Low UV)");
    } else if (uv < 5) {
      uvSpan.addClass("uv-badge yellow");
      uvSpan.append(" (Moderate UV)");

    } else if (uv < 7) {
      uvSpan.addClass("uv-badge orange");
      uvSpan.append(" (High UV)");

    } else if (uv < 10) {
      uvSpan.addClass("uv-badge red");
      uvSpan.append(" (Very High UV)");

    } else if (uv > 10) {
      uvSpan.addClass("uv-badge dark-red");
      uvSpan.append(" (Extreme UV)");
    }
  };
};

function displayCards(weather, location) {
  let day = [0, 8, 16, 24, 32];

  futureContainer.removeClass("d-none");
  futureWeather.append("<section class='weather-forecast-item'></section>")
  day.forEach(function (i) {
    let createP = $("<p class='background'>")
    createP.addClass("date border rounded border-white m-1 p-2 text-center");
    futureWeather.append(createP);

    let date = moment(weather.list[i].dt_txt).format("DD/MM/YY");

    let futureTemp = weather.list[i].main.temp;
    let futureWind = weather.list[i].wind.speed;
    let futureHumidity = weather.list[i].main.humidity;

    createP.append("<h2 class='header-result'>" + date + "</h2>");
    createP.append("<img class='icon' src='https://openweathermap.org/img/wn/" + weather.list[i].weather[0].icon + "@2x.png'</img>");
    createP.append("<p class='temp font-weight-bold'>Temp: " + futureTemp + " °C</p>");
    createP.append("<p class='wind font-weight-bold'>Wind Speed: " + futureWind + " MPH</p>");
    createP.append("<p class='humidity font-weight-bold'>Humidity: " + futureHumidity + " %</p>");
    futureWeather.removeClass("d-none");

  })
}

function handleList(event) {
  event.preventDefault();

  currentWeather.empty();
  futureWeather.empty();

  let location = $(event.target).text()
  console.log(location);

  if (location) {
    getWeather(location);
    $(event.target).remove();
  };
};

prevEl.on("click", $(".li-el-results"), handleList);
submitBtn.on("click", inputHandler);
