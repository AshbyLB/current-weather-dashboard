var apiKey = "7a1b1735c614d0057d9ac28220d05d40";
var currentTemp = document.getElementById("currentTemp");
var currentHumidity = document.getElementById("currentHumidity");
var currentUv = document.getElementById("currentUv");
var currentWind = document.getElementById("currentWind");
var searchButton = document.getElementById("button-addon2");
var cityEl = document.getElementById("cityInput");
var currentCity = document.getElementById("currentCity");
var recentCities;
var temp = document.querySelectorAll(".temp");
var wind = document.querySelectorAll(".wind");
var humid = document.querySelectorAll(".humid");
var dayEl = document.querySelectorAll(".dateHeader");
var weatherIcon = document.querySelectorAll(".weatherIcon");
var searchEl = document.getElementById("searchList");


if (localStorage.getItem("recentCity")
) {
    recentCities = localStorage.getItem("recentCity").split(",");

} else {
    recentCities = [];
}

searchButton.addEventListener("click", function () {

    var searchedCity = cityEl.value;
    if (!recentCities.includes(cityEl.value)) {
        recentCities.push(cityEl.value)
    }

    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + apiKey;

    var recentEl = document.createElement("li");
    var cityBtn = document.createElement("button");
    cityBtn.classList.add("prevCity");
    cityBtn.textContent = searchedCity;
    recentEl.appendChild(cityBtn);
    searchEl.appendChild(recentEl);


    localStorage.setItem("recentCity", recentCities.join(","));


    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            var forDate = new Date(data.dt * 1000);
            var forMonth = forDate.getMonth() + 1;
            var forDay = forDate.getDate();
            var forYear = forDate.getFullYear();

            var tranTemp = Math.floor(((data.main.temp - 273.15) * 9 / 5) + 32);
            currentCity.textContent = data.name + " " + forMonth + "/" + forDay + "/" + forYear;
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

            console.log(getUvi);

            fetch(getUvi)
                .then(function (response) {
                    return response.json();

                })
                .then(function (uvData) {
                    currentUv.textContent = "UVI: " + uvData.current.uvi;

                    for (var i = 0; i < 5; i++) {
                        var day = uvData.daily[i]
                        var fiveDate = new Date(day.dt * 1000);
                        var fiveMonth = fiveDate.getMonth() + 1;
                        var fiveDay = fiveDate.getDate();
                        var fiveYear = fiveDate.getFullYear();
                        console.log(day);

                        temp[i].textContent = "Temp: " + day.temp.day;
                        wind[i].textContent = "Wind Speed: " + day.wind_speed;
                        humid[i].textContent = "Humidity: " + day.humidity;
                        dayEl[i].textContent = fiveMonth + "/" + fiveDay + "/" + fiveYear;
                    }
                })
        })

});

searchEl.addEventListener("click", function(event){
    console.log(event.target.innerText);
})

