//grabbing search bar from HTML page
var searchInput = document.getElementById("#searchInput");
var recentSearches = $("#history");
//grabbing search btn from HTML page
const searchBtn = document.getElementById("searchBtn");
//pulling in today container
let todayEl = document.getElementById('today');
//pulling in 5 day forecast contanier
let forecastEl = document.getElementById('forecast');
let temperatureEl = document.getElementById('temperature');
let windEl = document.getElementById('wind');
let humidityEl = document.getElementById('humidity');
let uvIndexEl = document.getElementById('uvIndex');
let currentCityEl = document.getElementById('city');
let iconEl = document.getElementById('icon');
//setting the key and units
let key ='d9e1eb472c1a4120348bfa4ea31aa048';
let units = 'imperial';
var cityHistory = JSON.parse(localStorage.getItem("city")) || [];


const weather = data;
weather.temperature = {
    unit : "fahrenheit"
}
//setting the city to what is typed in by the user
let city = document.getElementById("searchInput").value;


function renderCity(){
    console.log(cityHistory);
    recentSearches.textContent = cityHistory
}


function displayWeather(){
// let currentCity = localStorage.getItem('city');
// currentCityEl.textContent = currentCity
// imgEl[0].setAttribute("src", `./assets/icons/${icon.value}.svg`)
iconEl.setAttribute("src", `assets/icons/${iconEl.value}.svg`);
// console.log(iconEl)
iconEl.style.width = '5%';
temperatureEl.innerHTML = temperature.value;
windEl.innerHTML = wind.value;
humidityEl.innerHTML = humidity.value;
uvIndexEl.innerHTML = uvIndex.value;
}

//function for when search is clicked
searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    let city = document.getElementById("searchInput").value
// console.log(city)
//keeping the city in local storage so it will hold the value
cityHistory.unshift(city);
localStorage.setItem('city', JSON.stringify(cityHistory));



//calling the pullCoords function
pullCoords(data, city);
 }); 
//  var lastCity = JSON.parse(localStorage.getItem('city'));
 function pullCoords(data, city) {
    //  console.log(city)
     let urlCoords = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${key}`
    //  var lastCity = JSON.parse(localStorage.getItem('city'));
    fetch(urlCoords)
    .then(response => {
        let data = response.json();
       return data;
    }).then(data=> {
        // console.log(data)
        let lat = data.city.coord.lat;
        localStorage.setItem('lat', JSON.stringify(lat));
        // console.log(lat);
        let lon = data.city.coord.lon;
        localStorage.setItem('lon', JSON.stringify(lon));
        // console.log(lon);
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=${units}&appid=${key}`);
    }).then(response => {
        let data = response.json();
        return data;
    }).then(data => {
        // console.log(data);
        // console.log(city);
        temperature.value = (Math.floor(data.current.temp));
        wind.value = data.current.wind_speed;
        humidity.value = data.current.humidity;
        uvIndex.value = data.current.uvi;
        iconEl.value = data.current.weather[0].icon;
        
        // main = data.weather[0].main;
    }).then(function () {
        // handleHistory();
        displayWeather();
        renderCity();
        // console.log(data.weather[0].main);
        // localStorage.setItem("search", main);
    });
 }
let lat = JSON.parse(localStorage.getItem('lat'));
let lon = JSON.parse(localStorage.getItem('lon'));
// function getCity(){
//     var storedCities = JSON.parse(localStorage.getItem('city'));

//     if(storedCities !== null) {
//         city = storedCities;
//     }
//     //This is a hepler function that will render cities to the DOM
//     renderCity();
// }

// function storeCities(){
//     localStorage.getItem("city", JSON.stringify(city));

//     //add submit event to form
//     searchInput.addEventListener("submit", function(event) {
//     event.preventDefault();

//     var cityText = cityInput.value.trim();
//     console.log(cityText);
// })

// }
