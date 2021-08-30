var apiKey = "7a1b1735c614d0057d9ac28220d05d40";
var searchedCity = "Charlotte";
var currentTemp = document.getElementById("currentTemp");
var currentHumidity = document.getElementById("currentHumidity");
var currentUv = document.getElementById("currentUv");
var currentWind = document.getElementById("currentWind");
var searchButton = document.getElementById("button-addon2");
var cityEl = document.getElementById("cityInput");
var currentCity = document.getElementById("currentCity");
var cityIcon = document.querySelector('.weather-icon');


searchButton.addEventListener("click", function () {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + apiKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log("data", data);
            var tranTemp = Math.floor(((data.main.temp - 273.15) * 9 / 5) + 32);
            currentCity.textContent = data.name;
            currentTemp.textContent = "Temp: " + tranTemp;
            currentWind.textContent = "Wind: " + data.wind.speed;
            currentHumidity.textContent = "Humidity: " + data.main.humidity;

            var uvLat = data.coord.lat;
            var uvLon = data.coord.lon;

            var getUvi = "https:api.openweathermap.org/data/2.5/onecall?lat=" + uvLat + "&lon=" + uvLon + "&appid=" + apiKey;

            fetch(getUvi)
                .then(function (response) {
                    return response.json();
                    
                })
                .then(function (uvData) {
                    console.log(uvData);
                    currentUv.textContent = "UVI: " + uvData.current.uvi;
                })

        })

});