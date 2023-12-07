let cityFormEl = document.querySelector("#city-form");
let cityInputEl = document.querySelector("#city-name");
let searchBtnEl = document.querySelector("#search-btn");
let weatherContainerEl = document.querySelector("#weather-container");
let citySearchTerm = document.querySelector("#city-search-term");

// let getCity = function(event) {
//     //have a placeholder for the city name
//     let city = cityFormEl.value;
//     let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d757d785c6a64b116f21f7fcecddcdc4`;
//     event.preventDefault();
//     fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => console.log(data))

// }


let getCity = function (event) {
    event.preventDefault();
    
    let city = cityInputEl.value.trim();
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d757d785c6a64b116f21f7fcecddcdc4`;
    
    fetch(apiUrl)
      .then(function (response) {if (response.ok) {
        console.log(response);
          response.json().then(function (data) {
            console.log(data);
            // displayWeather(data, city);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })

      let searchedCity = document.createElement("button");
      searchedCity.textContent = citySearchTerm;  
      searchedCity.classList.add("cities");
}

// let displayWeather = function (weather) {
//     if (weather.length === 0) {
//         weatherContainerEl.textContent = "No weather found.";
//         return;
//     }

//     // weatherSearchTerm.textContent = weather;

//     for (let i = 0; i < weather.length; i++) {

//         let weatherEl = document.createElement("div");
//         weatherEl.classList = "weather-container";

//         let titleEl = document.createElement("span");
//         titleEl.textContent = weather[i].owner.login;

//         weatherEl.appendChild(titleEl);

//         let statusEl = document.createElement("span");
//         statusEl.classList = "container-body";

     
//         weatherEl.appendChild(statusEl);

//         weatherContainerEl.appendChild(weatherEl);
//     }

// }

searchBtnEl.addEventListener("click", getCity);