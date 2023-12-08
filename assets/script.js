let cityFormEl = document.querySelector("#city-form");
let cityInputEl = document.querySelector("#city-name");
let searchBtnEl = document.querySelector("#search-btn");
let citySearchTerm = document.querySelector("#city-search-term");
let weatherContainerEl = document.querySelector(".weather-container");
let fiveWeatherContainerEl = document.querySelector(".five-weather-container");


let getCity = function (event) {
  event.preventDefault();
  
  let city = cityInputEl.value.trim();
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d757d785c6a64b116f21f7fcecddcdc4&units=imperial`;
  
  fetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {

        //the object returned is an array of 40 objects.  We need to pull the specific data we want from the array.
        let temperatureInKelvin = data.list[5].main.temp; 
        //we need to convert temp from kelvin to fahrenheit
        let temperatureInFahrenheit = (temperatureInKelvin - 273.15) * 9/5 + 32; // convert to Fahrenheit
            temperatureInFahrenheit = temperatureInFahrenheit.toFixed(2); // round down with 2 decimal points
        let windSpeed = data.list[0].wind.speed; 
        let humidity = data.list[6].main.humidity; 

        console.log('Temperature: ' + temperatureInFahrenheit + '°F');
        console.log('Wind Speed: ' + windSpeed);
        console.log('Humidity: ' + humidity);

        weatherContainerEl.innerHTML = "";

        displayWeather(data.list[0], weatherContainerEl, city);
        fiveDayForecast(data);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })

  let searchedCity = document.createElement("button");
  searchedCity.classList.add("cities");
  let citySearchTerm = document.createTextNode(city);
  searchedCity.appendChild(citySearchTerm);

  let card = document.querySelector('.card-body'); // select the card
  card.appendChild(searchedCity); // append the button to the card
}

let displayWeather = function (list, containerEl, city) {
  console.log(list);
  let container=document.createElement('div');
  // clear old content
  // weatherContainerEl.textContent = "";
  let currentCity = document.createElement('div');
  currentCity.textContent = city + " (" + new Date().toLocaleDateString() + ")";

console.log("icon", list);

  let weatherIcon = document.createElement("img");
  weatherIcon.setAttribute("src", "https://openweathermap.org/img/w/" + list.weather[0].icon + ".png");
  weatherIcon.setAttribute("class", "weather-icon");
  container.appendChild(weatherIcon);
  container.appendChild(currentCity);

  let temperatureEl = document.createElement("p");
  temperatureEl.textContent = "Temperature: " + list.main.temp + " °F";
  temperatureEl.classList = "weather-container";
  container.appendChild(temperatureEl);

  let windSpeedEl = document.createElement("p");
  windSpeedEl.textContent = "Wind Speed: " + list.wind.speed + " MPH";
  windSpeedEl.classList = "weather-container";
  container.appendChild(windSpeedEl);

  let humidityEl = document.createElement("p");
  humidityEl.textContent = "Humidity: " + list.main.humidity + " %";
  humidityEl.classList = "weather-container";
  container.appendChild(humidityEl);

  containerEl.appendChild(container);
}

function fiveDayForecast (weather) {
  let weatherArray = weather.list;

  for (let i=0; i < weatherArray.length; i++) {
    if (weatherArray[i].dt_txt.slice(11,13) == "12") {
      console.log(weatherArray[i].dt_txt);
      displayWeather(weatherArray[i], fiveWeatherContainerEl);
    }

}
}

searchBtnEl.addEventListener("click", getCity);