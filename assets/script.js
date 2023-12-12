let cityFormEl = document.querySelector("#city-form");
let cityInputEl = document.querySelector("#city-name");
let searchBtnEl = document.querySelector("#search-btn");
let citySearchTerm = document.querySelector("#city-search-term");
let weatherContainerEl = document.querySelector(".weather-container");
let fiveWeatherContainerEl = document.querySelector(".five-weather-container");
let showingWeather = document.querySelector("#showing-weather");
let cityHistory = JSON.parse(localStorage.getItem('cityHistory')) || [];


let getCity = function (event) {
  event.preventDefault();
  
  let city = cityInputEl.value.trim();
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d757d785c6a64b116f21f7fcecddcdc4&units=imperial`;
  
  fetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
    

      // clear previous data
      weatherContainerEl.innerHTML = "";
      let card = document.querySelector('.five-weather-container');
      card.innerHTML = "";

      showingWeather.innerHTML = "";

      //the object returned is an array of 40 objects.  We need to pull the specific data we want from the array.
      let temperature = data.list[5].main.temp;         
      let windSpeed = data.list[0].wind.speed; 
      let humidity = data.list[6].main.humidity; 
      
      console.log(city)
      console.log('Temperature: ' + temperature + '°F');
      console.log('Wind Speed: ' + windSpeed);
      console.log('Humidity: ' + humidity);

      weatherContainerEl.innerHTML = "";

      displayWeather(data.list[0], weatherContainerEl, city);
      fiveDayForecast(data, city);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  })

  let searchedCity = document.createElement("button");
  searchedCity.classList.add("cities-btn");
  searchedCity.id = "city-btn";
  let citySearchTerm = document.createTextNode(city);
  searchedCity.appendChild(citySearchTerm);

  // add event listener
  searchedCity.addEventListener('click', function() {
    getCity(this.innerText); // pass the city name to the getCity function?
  });

  let card = document.querySelector('.card-body'); // select the card
  card.appendChild(searchedCity); // append the button to the card

  cityHistory.push(city);
  localStorage.setItem('cityHistory', JSON.stringify(cityHistory));
}

let displayWeather = function (list, containerEl, city) {
  console.log(list);

  let showingWeather = document.getElementById('showing-weather');
  showingWeather.innerHTML = "Showing Weather for: " + (city);
  let display = document.getElementById("showing-weather");

  let container=document.createElement('p');
  let currentCity = document.createElement('p');
  currentCity.textContent = city + " (" + new Date().toLocaleDateString() + ")";

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

function fiveDayForecast (weather, city) {
  let weatherArray = weather.list;

  for (let i=0; i < weatherArray.length; i++) {
    if (weatherArray[i].dt_txt.slice(11,13) == "12") {
      console.log('your search!' + weatherArray[i].dt_txt);
      displayWeather(weatherArray[i], fiveWeatherContainerEl, city);
    }

}
}

let loadSearches = function() {
  let cityHistory = JSON.parse(localStorage.getItem('cityHistory')) || [];

  for (let i = 0; i < cityHistory.length; i++) {
    let city = cityHistory[i];

    let searchedCity = document.createElement("button");
    searchedCity.classList.add("cities-btn");
    searchedCity.id = "city-btn";
    let citySearchTerm = document.createTextNode(city);
    searchedCity.appendChild(citySearchTerm);

    // create "x" button
    let closeButton = document.createElement("button");
    closeButton.textContent = "x";
    closeButton.classList.add("close-btn");
    closeButton.addEventListener('click', function(event) {
      event.stopPropagation(); // prevent the city-btn click event from firing
      searchedCity.remove(); // remove the city-btn
    });
    searchedCity.appendChild(closeButton); // append the "x" button to the city-btn

    // add event listener
    searchedCity.addEventListener('click', function() {
      getCity(this.innerHTML.replace("x", "")); // call getCity with the button's innerHTML, excluding the "x"
    });

    let card = document.querySelector('.card-body'); // select the card
    card.appendChild(searchedCity); // append the button to the card
  }
}

// call loadSearches when the page loads
window.onload = loadSearches;

searchBtnEl.addEventListener("click", getCity);