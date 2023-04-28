console.log("navigator", navigator);
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

async function showPosition(position) {
  console.log("position", position);
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;

  //object destructuring : see detructuring.js file
  const { latitude, longitude } = position.coords;

  let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    //   console.log("result", result);
    const city = result.city;
    console.log("city", city);
    getWeatherForCity(city);
  } catch (error) {
    console.log("error", error);
  }
}

const getWeatherForCity = async (city) => {
  const API_KEY = "18608637f624481ea33201750220704";
  // show spinner
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("invisible");
  //hide table
  const containerData = document.getElementById("data-to-display");
  containerData.classList.add("invisible");

  let url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;

  let url2 = `http://api.weatherapi.com/v1/astronomy.json?key=${API_KEY}&q=${city}&dt=${new Date()}`;

  const urlsArray = [url, url2];
  try {
    const promisesArray = urlsArray.map(async (url) => {
      const response = await fetch(url);
      //   console.log("response", response);
      if (!response.statusText) {
        throw new Error("something went wrong");
      }
      const result = await response.json();
      return result;
    });
    // console.log("promisesArray", promisesArray);
    askljnjkkkskkaka;
    const responsesArray = await Promise.all(promisesArray);
    const weatherData = responsesArray[0];
    const astronomyData = responsesArray[1];
    displayData(weatherData, astronomyData);
    addEvents();

    // console.log("responsesArray", responsesArray);
  } catch (error) {
    console.log("error", error);
  }
};

const displayData = (weatherData, astronomyData) => {
  // hide spinner
  const spinner = document.getElementById("spinner");
  spinner.classList.add("invisible");
  //show table
  const containerData = document.getElementById("data-to-display");
  containerData.classList.remove("invisible");

  const city = document.getElementById("city");
  const tbody = document.getElementById("weather-data");
  const astronomyCards = document.getElementById("astronomy-cards");

  cleanDOM(city, tbody, astronomyCards);

  const { forecast, location } = weatherData;

  city.innerText = `Diplaying the weather for ${location.name} in ${location.country}`;
  const { astronomy } = astronomyData;

  createAstronomyCards(astronomyCards, astronomy);
  createTable(tbody, forecast);
};

const createTable = (tbody, forecast) => {
  forecast.forecastday.forEach((day) => {
    const row = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    td1.innerText = day.date;
    td2.innerText = day.day.mintemp_c;
    td3.innerText = day.day.maxtemp_c;
    td4.innerText = day.day.condition.text;
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    tbody.appendChild(row);
  });
};

const createAstronomyCards = (astronomyCards, astronomy) => {
  const divSun = document.createElement("div");
  divSun.setAttribute("class", "card ");
  const divSunBody = document.createElement("div");
  divSunBody.setAttribute("class", "card-body");
  const h5Sun = document.createElement("h5");
  h5Sun.setAttribute("class", "card-title");
  h5Sun.innerText = "Sun";
  const ulSun = document.createElement("ul");
  ulSun.setAttribute("class", "list-group list-group-flush");
  const ulSunRise = document.createElement("li");
  ulSunRise.setAttribute("class", "list-group-item");
  ulSunRise.innerText = `Sunrise is at ${astronomy.astro.sunrise}`;
  const ulSunSet = document.createElement("li");
  ulSunSet.setAttribute("class", "list-group-item");
  ulSunSet.innerText = `Sunset is at ${astronomy.astro.sunset}`;
  ulSun.appendChild(ulSunRise);
  ulSun.appendChild(ulSunSet);
  divSunBody.appendChild(h5Sun);
  divSun.appendChild(divSunBody);
  divSun.appendChild(ulSun);
  astronomyCards.appendChild(divSun);
};

const addEvents = () => {
  // locate the html element
  const input = document.getElementById("city-search");
  let city;
  // add event listener
  input.addEventListener("input", (event) => {
    // console.log("event", event.target.value);
    city = event.target.value;
  });

  input.addEventListener("keydown", (event) => {
    console.log("event", event);
    if (event.key === "Enter") {
      getWeatherForCity(event.target.value);
    }
  });
};

const cleanDOM = (city, tbody, astronomyCards) => {
  city.innerHTML = "";
  tbody.innerHTML = "";
  astronomyCards.innerHTML = "";
  document.getElementById("city-search").value = "";
};

getLocation();
