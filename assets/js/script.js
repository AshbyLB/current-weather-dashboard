var apiKey = "7a1b1735c614d0057d9ac28220d05d40";
var searchedCity = "Charlotte";
var currentTemp = document.getElementById("currentTemp");
var currentHumidity = document.getElementById("currentHumidity");
var currentUv = document.getElementById("currentUv");
var currentWind = document.getElementById("currentWind");
var searchButton = document.getElementById("button-addon2");
var cityEl = document.getElementById("cityInput");
var currentCity = document.getElementById("currentCity");









searchButton.addEventListener("click", function () {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + apiKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           
            currentCity.textContent = data.name;
            currentTemp.textContent = "Temp: " + data.main.temp;
            currentHumidity.textContent = "Humidity: " + data.main.humidity;
            currentWind.textContent = "Wind Speed: " + data.wind.speed;
            currentUv.textContent = "UVI: " + data.current.uvi;
        })
});