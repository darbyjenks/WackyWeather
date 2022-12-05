let key = '1b9e0d552ea60a756ee1fa770bbaea19';
let searchBtn = document.getElementById('searchBtn');
let searchCity = document.getElementById('searchCity');
let cityName = 'Atlanta';
let citySummary = document.getElementById('citySummary');
let temp = document.getElementById('temp');
let temp0 = document.getElementById('temp0');
let temp1 = document.getElementById('temp1');
let temp2 = document.getElementById('temp2');
let temp3 = document.getElementById('temp3');
let temp4 = document.getElementById('temp4');
let wind = document.getElementById('wind');
let humidity = document.getElementById('humidity');
let uvIndex = document.getElementById('uvIndex');
let iconEl = document.getElementById('emoji');
let cardBody = document.getElementById('cardBody')
var today = moment();
// let currentCityData = document.getElementById('currentCity');
let currentCityData = $('#currentWeather');

searchBtn.addEventListener('click', () => getWeather(searchCity.value));

function currentWeather(data){
    if(searchCity.value === ''){
        citySummary.innerHTML = cityName + ' ' + today.format("MM/DD/YYYY");
    } else {
        citySummary.innerHTML = searchCity.value + ' ' + today.format("MM/DD/YYYY");
    }
    iconEl.src = `./assets/icons/${iconEl.value}.svg`;
    iconEl.style.width = '10%';
    citySummary.append(iconEl)
    temp.innerHTML = ('Temperature: ' + Math.ceil(temp.value) + ' °F');
    wind.innerHTML = 'Wind: ' + wind.value;
    humidity.innerHTML = 'Humidity: ' + humidity.value;
    uvIndex.innerHTML = 'UV Index: ' + uvIndex.value;
}

function getFiveDay(data, city){
    // const tomorrow = moment().add(1, 'day').endOf('day');
    console.log('Five Day: ' + data);
    temp0.innerHTML = temp4.value
        // date = moment().add((1+ i), 'day').endOf('day');
        //     data.daily[i].temp.day,
        //     data.daily[i].wind_speed,
        //     data.daily[i].humidity,
        //     data.daily[i].weather[i].icon,
}
function getWeather(data, city){
    if(searchCity.value === ''){
        city = cityName
    }else {
        city = searchCity.value
    }
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=${key}`);
  }).then(function(response) {
    return response.json();
    }).then(function (data) {
    console.log(data);
    debugger;
    // currentCity = data.current
    // citySummary = city date clouds;
    iconEl.value = data.current.weather[0].icon;
    temp.value = data.current.temp;
    wind.value = data.current.wind_speed;
    humidity.value = data.current.humidity;
    uvIndex.value = data.current.uvi;
    temp0.value = data.daily[0].temp.day;
    temp1.value = data.daily[1].temp.day;
    temp2.value = data.daily[2].temp.day;
    temp3.value = data.daily[3].temp.day;
    temp4.value = data.daily[4].temp.day;
    // for(i=0; i < 5; i++){
    // data.daily[i].temp.day;
    // data.daily[i].wind_speed;
    // data.daily[i].humidity;
    // data.daily[i].weather[0].icon;
    // }
    }).then(function () {
    currentWeather();
    getFiveDay();
  }).then(function() {
    getFiveDay();
  })
}

