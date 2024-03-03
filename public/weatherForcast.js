let searchedLoc, placeName, dateDisp;
let dateConverterInp, dateConverted;
let currTemp, weatherCond, gust, humidity;
let wishes, localTime, localTimeConverted, feelsLike, airQualityIndex;
let forecastData,
  data_forecast,
  i = 0;
const searchedBtn = document.getElementById("search-btn");
placeName = document.getElementById("city-name-top");
dateDisp = document.getElementById("curr-date");
currTemp = document.getElementById("current-temperature");
weatherCond = document.getElementById("weather-condition");
gust = document.getElementById("gust");
humidity = document.getElementById("humidity");
wishes = document.getElementById("wish");
localTime = document.getElementById("time-now");
feelsLike = document.getElementById("feels-like");
visibility = document.getElementById("visibility");

let convertedDayOfWeek = (dateConverter) => {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(dateConverter);
  let dayOfWeek = days[date.getDay()];
  console.log(dayOfWeek);
  return dayOfWeek;
};
const Main = async () => {
  // Set default location to New Delhi
  let data = await getData("New Delhi");
  data_forecast = await getForecast("New Delhi");
  // Display New Delhi data
  placeName.innerHTML = data.location.name;
  dateConverterInp = data.location.localtime;
  dateConverted = await convertedDate(dateConverterInp);
  dateDisp.innerHTML = `${dateConverted}, ${convertedDayOfWeek(dateConverted)}`;
  currTemp.innerHTML = data.current.temp_c + `\u00B0C`;
  weatherCond.innerHTML = `${data.current.condition.text}`;
  gust.innerHTML = `${data.current.gust_kph} Kmph`;
  humidity.innerHTML = `${data.current.humidity}%`;
  let isDayData = data.current.is_day;
  if (isDayData === 1) {
    wishes.innerHTML = "Good Morning";
  } else {
    wishes.innerHTML = "Good Night";
  }
  let localTimeFetchData = data.location.localtime;
  localTimeConverted = await convertedLocalTime(localTimeFetchData);
  localTime.innerHTML = localTimeConverted;
  feelsLike.innerHTML = ` ${data.current.feelslike_c}` + `\u00B0C`;
  visibility.innerHTML = `${data.current.vis_km} Km`;
  forecastData = data_forecast.forecast.forecastday;
  forecastData.forEach((day, i) => {
    if (i < 6) {
      document.querySelector(
        `.day-name-${i}`
      ).innerHTML = `${convertedDayOfWeek(day.date)}`;
      document.querySelector(`.curr-temp-${i}`).innerHTML =
        `${day.day.avgtemp_c}` + `\u00B0C`;
      document.querySelector(
        `.weather-cond-${i}`
      ).innerHTML = `${day.day.condition.text}`;
    }
  });
  // When button is clicked, update data for the searched location
  searchedBtn.addEventListener("click", async () => {
    searchedLoc = document.getElementById("search-loc").value;
    data = await getData(searchedLoc);
    data_forecast = await getForecast(searchedLoc);
    // Update displayed data with the searched location data
    placeName.innerHTML = data.location.name;
    dateConverterInp = data.location.localtime;
    dateConverted = await convertedDate(dateConverterInp);
    dateDisp.innerHTML = `${dateConverted}, ${convertedDayOfWeek(
      dateConverted
    )}`;
    currTemp.innerHTML = data.current.temp_c + `\u00B0C`;
    weatherCond.innerHTML = `${data.current.condition.text}`;
    gust.innerHTML = `${data.current.gust_kph} Kmph`;
    humidity.innerHTML = `${data.current.humidity}%`;
    let isDay = data.current.is_day;
    if (isDay === 1) {
      wishes.innerHTML = "Good Morning";
    } else {
      wishes.innerHTML = "Good Night";
    }
    let localTimeFetch = data.location.localtime;
    localTimeConverted = await convertedLocalTime(localTimeFetch);
    localTime.innerHTML = localTimeConverted;
    feelsLike.innerHTML = ` ${data.current.feelslike_c}` + `\u00B0C`;
    visibility.innerHTML = `${data.current.vis_km} Km`;
    i = 0;
    forecastData = data_forecast.forecast.forecastday;
    forecastData.forEach((day, i) => {
      if (i < 5) {
        document.querySelector(
          `.day-name-${i}`
        ).innerHTML = `${convertedDayOfWeek(day.date)}`;
        console.log(day.date);
        console.log(convertedDayOfWeek(day.date));
        document.querySelector(`.curr-temp-${i}`).innerHTML =
          `${day.day.avgtemp_c}` + `\u00B0C`;
        document.querySelector(
          `.weather-cond-${i}`
        ).innerHTML = `${day.day.condition.text}`;
      }
    });
  });
};

// Call Main to initialize

let getData = async (dataLoc) => {
  let x = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=84243e6ecb7e4f30a71190046242702&q=${dataLoc}`
  );
  let data = await x.json();
  console.log(data);
  return data;
};
let getForecast = async (city) => {
  const day = 6;
  let response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=84243e6ecb7e4f30a71190046242702&q=${city}&days=${day}`
  );
  let dataForecast = await response.json();
  console.log(dataForecast);
  return dataForecast;
};
let convertedDate = async (dateCoverter) => {
  let x = dateCoverter.split(" ")[0];
  let x_date = x.split("-");
  let formattedDate = `${x_date[1]}/${x_date[2]}/${x_date[0]}`;
  console.log(formattedDate);
  return formattedDate;
};
let convertedLocalTime = async (localTimeConvert) => {
  let x = localTimeConvert.split(" ")[1];
  const [hours, minutes] = x.split(":");
  let ampm = "AM";
  let hour = parseInt(hours, 10);

  if (hour >= 12) {
    ampm = "PM";
  }

  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour %= 12;
  }

  return `${hour}:${minutes} ${ampm}`;
};
Main();
// Def();
