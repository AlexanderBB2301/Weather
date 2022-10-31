const locateMeBtn = document.getElementById("locateMeBtn");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const weatherInfo = document.getElementById("weatherInfo");
const windInfo = document.getElementById("wind");
const humidityInfo = document.getElementById("humidity");
const searchBtn = document.getElementById("searchBtn");
const searchBar = document.getElementById("searchBar");
const icon = document.getElementById("icon");

const ifSuccess = async (event) => {
  console.log("It worked, yay!", event.coords.latitude, event.coords.longitude);
  const { latitude, longitude } = event.coords;
  //get weather
  let { data } = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=31c4ebae03d262c643e0abfd1af737b1`
  );
  console.log(data);
  updateIcon(data);
  updateCityName(data);
  updateTemp(data);
  updateWindInfo(data);
  updateHumidityInfo(data);
  updateWeatherInfo(data);
  updateWindContainer(data);
};

const ifFail = (error) => {
  alert(
    "Please allow browser to access your location or enter your city name."
  );
  console.log("Sorry, it failed!", error);
};

const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };

const updateIcon = (weather) => {
  icon.src = `http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`;
};

const updateCityName = (weather) => {
  const htmlCity = `<p>Weather in ${weather.city.name}, ${weather.city.country}</p>`;
  cityName.innerHTML = htmlCity;
};

const updateTemp = (weather) => {
  const theTemp = `${weather.list[0].main.temp}`;
  const theTempText = Math.round(theTemp);
  temp.innerHTML = theTempText + "&#8451";
};

const updateHumidityInfo = (weather) => {
  const htmlHumidity = `<p>Humidity: ${weather.list[0].main.humidity}%</p>`;
  humidityInfo.innerHTML = htmlHumidity;
};

const updateWindInfo = (weather) => {
  const htmlWind = `${weather.list[0].wind.speed}` / 1.609344;
  const htmlWinds = htmlWind / 1.609344;
  const rdhtmlWind = Math.round(htmlWinds);
  windInfo.innerHTML = rdhtmlWind + "mph";
};

const updateWeatherInfo = (weather) => {
  const htmlWeather = `<p>${weather.list[0].weather[0].description}</p>`;
  weatherInfo.innerHTML = htmlWeather;
};

locateMeBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(ifSuccess, ifFail, options);
});
