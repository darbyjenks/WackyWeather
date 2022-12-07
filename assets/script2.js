let key = '1b9e0d552ea60a756ee1fa770bbaea19';
let searchBtn = document.getElementById('searchBtn');
let searchCity = document.getElementById('searchCity');
let citySummary = document.getElementById('citySummary');
let temp = document.getElementById('temp');
let tempFiveDay = document.getElementsByClassName('tempFiveDay');
let wind = document.getElementById('wind');
let windFiveDay = document.getElementsByClassName('windFiveDay');
let humidity = document.getElementById('humidity');
let humidityFiveDay = document.getElementsByClassName('humidityFiveDay');
let uvIndex = document.getElementById('uvIndex');
let iconEl = document.getElementById('emoji');
let iconElFiveDay = document.getElementsByClassName('emojiFiveDay');
let dateFiveDay = document.getElementsByClassName('dateFiveDay')
let cardBody = document.getElementById('cardBody')
var today = moment();
let currentCityData = $('#currentWeather');
var cityHistory = JSON.parse(localStorage.getItem("city")) || [];
let citySearches = document.getElementById('citySearches');
let city = document.getElementById('city');

searchHistory();

function currentWeather(){
    citySummary.innerHTML = citySummary.value + ' ' + today.format("MM/DD/YYYY");
    iconEl.src = `./assets/icons/${iconEl.value}.svg`;
    iconEl.style.width = '10%';
    citySummary.append(iconEl)
    temp.innerHTML = ('Temperature: ' + Math.ceil(temp.value) + ' °F');
    wind.innerHTML = 'Wind: ' + wind.value;
    humidity.innerHTML = 'Humidity: ' + humidity.value +'%';
    uvIndex.innerHTML = 'UV Index: ' + uvIndex.value;
}

function getFiveDay(){
    for(i = 0; i < 5; i ++){
        dateFiveDay[i].innerHTML = moment().add((1+ i), 'day').endOf('day').format("MM/DD/YYYY");
        dateFiveDay[i].setAttribute('style','font-size: 12px');
        iconElFiveDay[i].src = `./assets/icons/${iconElFiveDay[i].value}.svg`;
        tempFiveDay[i].innerHTML = `Temp: ${Math.ceil(tempFiveDay[i].value)} °F`;
        tempFiveDay[i].setAttribute('style','font-size: 14px');
        windFiveDay[i].innerHTML = `Wind: ${Math.ceil(windFiveDay[i].value)}`;
        windFiveDay[i].setAttribute('style','font-size: 14px');
        humidityFiveDay[i].innerHTML = `Humidity: ${humidityFiveDay[i].value}%`;
        humidityFiveDay[i].setAttribute('style','font-size: 12px');
    }
}

function searchHistory(){
        for (i =0; i < cityHistory.length && i < 10; i++) {
            if(cityHistory[i].value !== searchCity.value){
                console.log(cityHistory[i]);
                console.log(searchCity.value)
            // debugger;
            let cityBtn = document.createElement('button');
            cityBtn.setAttribute('type', 'button');
            cityBtn.setAttribute('class', 'btn btn-info cityHist');
            cityBtn.setAttribute('style', 'width: 100%;');
            cityBtn.setAttribute('data-city', cityHistory[i]);
            cityBtn.innerHTML += cityHistory[i];
            citySearches.append(cityBtn);
        }
    }
        
}

function getCity(city){
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      }).then(function (city) {
        citySummary.value = city.name
    }
).then(function(){
    currentWeather();
})}

function getWeather(city){
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=${key}`);
  }).then(function(response) {
    return response.json();
    }).then(function (data) {
    //DATA FOR CURRENT WEATHER
    iconEl.value = data.current.weather[0].icon;
    temp.value = data.current.temp;
    wind.value = data.current.wind_speed;
    humidity.value = data.current.humidity;
    uvIndex.value = data.current.uvi;
    //DATA FOR 5 DAY FUNCTION
    for(i = 0; i < 5; i ++){
        iconElFiveDay[i].value = data.daily[i].weather[0].icon;
        tempFiveDay[i].value = data.daily[i].temp.day;
        windFiveDay[i].value = data.daily[i].wind_speed;
        humidityFiveDay[i].value = data.daily[i].humidity;
    }
    }).then(function () {
    currentWeather();
    getFiveDay();   
  })
}

citySearches.addEventListener('click', function (event){
    var city = event.target.getAttribute('data-city');
    getWeather(city);
    getCity(city);
})

searchBtn.addEventListener('click', function (event){
    if (!searchCity.value) {
        return;
    }
    event.preventDefault();

    var city = searchCity.value.trim();
    cityHistory.unshift(city);
    localStorage.setItem('city', JSON.stringify(cityHistory));
    getWeather(city);
    getCity(city);
    searchCity.value = '';
});

