//grabbing search bar from HTML page
var searchInput = document.getElementById("#searchInput");
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
let currentCity = document.getElementById('city');
let iconEl = document.getElementById('icon');
//setting the key and units
let key ='d9e1eb472c1a4120348bfa4ea31aa048';
let units = 'imperial';


const weather = data;
weather.temperature = {
    unit : "fahrenheit"
}
//setting the city to what is typed in by the user
let city = document.getElementById("searchInput").value;

function displayWeather(){
currentCity.innerHTML = localStorage.getItem('city');
$(icon).html(`<img src="assets/icons/${icon.value}.svg"/>`);
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
console.log(city)
//keeping the city in local storage so it will hold the value
localStorage.setItem('city', JSON.stringify(city));
//calling the pullCoords function
pullCoords();
 }); 

//  var lastCity = JSON.parse(localStorage.getItem('city'));
 function pullCoords(data) {
     console.log(lastCity)
     var lastCity = JSON.parse(localStorage.getItem('city'));
     let urlCoords = `https://api.openweathermap.org/data/2.5/forecast?q=${lastCity}&units=${units}&appid=${key}`
    //  var lastCity = JSON.parse(localStorage.getItem('city'));
    fetch(urlCoords)
    .then(response => {
        let data = response.json();
       return data;
    }).then(data=> {
        console.log(data)
        let lat = data.city.coord.lat;
        localStorage.setItem('lat', JSON.stringify(lat));
        console.log(lat);
        let lon = data.city.coord.lon;
        localStorage.setItem('lon', JSON.stringify(lon));
        console.log(lon);
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=${units}&appid=${key}`);
    }).then(response => {
        let data = response.json();
        return data;
    }).then(data => {
        console.log(data);
        temperature.value = (Math.floor(data.current.temp));
        console.log(Math.floor(temperature.value));
        wind.value = data.current.wind_speed;
        console.log(wind.value);
        humidity.value = data.current.humidity;
        console.log(humidity.value);
        uvIndex.value = data.current.uvi;
        console.log(uvIndex.value);
        icon.value = data.current.weather[0].icon;
        // main = data.weather[0].main;
    }).then(function () {
        displayWeather();
        // console.log(data.weather[0].main);
        // localStorage.setItem("search", main);
    });
 }
let lat = JSON.parse(localStorage.getItem('lat'));
let lon = JSON.parse(localStorage.getItem('lon'));

