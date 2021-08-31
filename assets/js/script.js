var apiKey = "7a1b1735c614d0057d9ac28220d05d40";
var currentTemp = document.getElementById("currentTemp");
var currentHumidity = document.getElementById("currentHumidity");
var currentUv = document.getElementById("currentUv");
var currentWind = document.getElementById("currentWind");
var searchButton = document.getElementById("button-addon2");
var cityEl = document.getElementById("cityInput");
var currentCity = document.getElementById("currentCity");
var recentCities;
var obj = {};


if (localStorage.getItem("recentCity")
) {
    console.log(localStorage.getItem("recentCity"))
    recentCities = localStorage.getItem("recentCity").split(",");
    //console.log(recentCities);
} else {
    recentCities = [];
}

searchButton.addEventListener("click", function () {
    var searchedCity = cityEl.value;
    //console.log(cityEl.value);
    //console.log(obj.value);
    if(!recentCities.includes(cityEl.value)){
        recentCities.push(cityEl.value)
    }


    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + apiKey;
    //console.log(requestUrl);
    //var stringified = JSON.stringify(recentCities);
    //console.log(recentCities,stringified);
    localStorage.setItem("recentCity", recentCities.join(","));
    //console.log(recentCities);
    
    //for (var i = 0; i < localStorage.getItem("recentCity").split(",").length; i++) {
        //console.log(JSON.parse(localStorage.getItem("recentCity"))[i]);
    //}
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            //console.log(data);
            var tranTemp = Math.floor(((data.main.temp - 273.15) * 9 / 5) + 32);
            currentCity.textContent = data.name;
            currentTemp.textContent = "Temp: " + tranTemp;
            currentWind.textContent = "Wind: " + data.wind.speed;
            currentHumidity.textContent = "Humidity: " + data.main.humidity;

            var cityIcon = document.createElement("img");
            cityIcon.alt = data.weather[0].icon;
            cityIcon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            currentCity.appendChild(cityIcon);

            


            var uvLat = data.coord.lat;
            var uvLon = data.coord.lon;

            var getUvi = "https:api.openweathermap.org/data/2.5/onecall?lat=" + uvLat + "&lon=" + uvLon + "&appid=" + apiKey + "&units=imperial";
            //console.log(getUvi);

            fetch(getUvi)
                .then(function (response) {
                    return response.json();

                })
                .then(function (uvData) {
                    //console.log(uvData);
                    currentUv.textContent = "UVI: " + uvData.current.uvi;
                })
            
                for (var day of DailyData) {

                }


            

        })

});

