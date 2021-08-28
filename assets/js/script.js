var apiKey = "7a1b1735c614d0057d9ac28220d05d40";
var searchedCity = "Charlotte";







function getApi() {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + apiKey;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        for (var i = 0; i < data.length; i++) {
        
  
          link.textContent = data[i].daily.temp.day;
          link.textContent = data[i].daily.humidity;
          link.textContent = data[i].current.wind_speed;
          link.textContent = data[i].current.uvi;
          
          tableData.appendChild(link);
          createTableRow.appendChild(tableData);
          tableBody.appendChild(createTableRow);
        }
      });
  }
  
  getApi();