const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");

let getweather = {
  fetchGetWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&units=metric&appid=7af321ca365368a97ab292019789c32a`
    )
      .then((response) => {
        if (!response.ok) {
          alert("Unable to determine the weather.");
          console.log(error);
        }
        return response.json();
      })
      .then((data) => this.showWeather(data));
  },
  showWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.getElementById("cityName").innerText = `Weather in ${name}`;
    document.getElementById("icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";

    document.getElementById("weatherInfo").innerText = description;

    document.getElementById("temp").innerText = Math.round(temp) + "°C";

    document.getElementById("humidity").innerText =
      "Humidity: " + humidity + "%";

    document.getElementById("wind").innerText =
      "Wind speed: " + Math.round(speed / 1.609344) + " mph";
  },
  search: function () {
    this.fetchGetWeather(document.getElementById("searchBar").value);
  },
};

searchBtn.addEventListener("click", () => {
  getweather.search();
});

searchBar.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    getweather.search();
  }
});

// getWeather.fetchWeather("");
