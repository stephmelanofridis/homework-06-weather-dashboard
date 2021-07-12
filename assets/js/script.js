const timeEl = document.querySelector("#time");
const dateEl = document.querySelector("#date");
const currentWeatherItemsEl = document.querySelector("#current-weather-items");
const timezone = document.querySelector("#time-zone");
const countryEl = document.querySelector("#country");
const weatherForecastEl = document.querySelector("#weather-forecast");
const currentTempEl = document.querySelector("#current-temp");


const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const API_KEY = "d7ddb6b485324f8476383582a2ea3896";

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM'

  timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes + ' ' + `<span id="am-pm>${ampm}</span>`

  dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000);
 /*
const baseApiUrl = "api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}"
const searchApiUrl = `${baseApiUrl}/Search`
class requestController {
 getLocation() {
     $.getJSON(baseApiUrl, 'Sydney').done(data => console.log(data));
 }
}

const request = new getLocation(): void
 request.getLocation(); void

*/