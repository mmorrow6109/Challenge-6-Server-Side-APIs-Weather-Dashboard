let cityFormEl = document.querySelector("#city-form");
let cityInputEl = document.querySelector("#city-name");
let weatherContainerEl = document.querySelector("#weather-container");
let citySearchTerm = document.querySelector("#city-search-term");


let getCity = function (city) {
    let apiUrl = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=d757d785c6a64b116f21f7fcecddcdc4";
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            getWeather(data, city);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
}

let getWeather = function (weather) {


}