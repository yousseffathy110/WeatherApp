const cityName = document.querySelector(".city"),
  submitBtn = document.getElementById("submit"),
  searchInput = document.getElementById("search"),
  degree = document.querySelector(".degree"),
  weatherImage = document.querySelector(".weatherstatusimg"),
  humidty = document.getElementById("humidty"),
  windSpeed = document.getElementById("windSpeed");

const API_KEY = "a9aa6289762619f693d0456b4e911e2a";
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const checkWeather = async (city) => {
  let data;
  try {
    const response = await fetch(API_URL + city + `&appid=${API_KEY}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    data = await response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    return;
  }
  console.clear();
  console.log(data);

  cityName.textContent = data.name;
  degree.textContent = Math.round(data.main.temp) + "°c";
  humidty.textContent = data.main.humidity + "% ";
  windSpeed.textContent = data.wind.speed + " Km/h";
  weatherImage.src = `images/${data.weather[0].main.toLowerCase()}.png`;
};

submitBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
});

searchInput.addEventListener("keyup", (e) => {
  e.key === "Enter" ? checkWeather(searchInput.value) : null;
});
