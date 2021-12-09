var searchInput = document.getElementById("searchForm.searchInput");
const searchBtn = document.getElementById("searchBtn");
// const mainContent = $("#mainContent");
// var recentSearches = $("#recents");
// const current = $("#current");
// const fiveDay = $("#five-day");
// const clearBtn = $("#clearBtn");

const weather = data;
weather.temperature = {
    unit : "fahrenheit"
}
// function setPosition(position){
//     let latitude = position.coords.latitude;
//     let longitude = position.coords.longitude;
    
//     getWeather(latitude, longitude);

// function getWeather(latitude, longitude){
//     let api = `http://api.openweathermap.org/data/2.5/weather?&appid=1a569bb7d37723f9bf3b10e34026f005&units=imperial`
// }      
// lat=${latitude}&lon=${longitude}
document.getElementById("searchBtn").addEventListener("click", function(){
    var searchInput = document.getElementById("searchInput")
console.log(searchInput)
    fetch("http://api.openweathermap.org/data/2.5/weather?q="+searchInput+"&appid=1a569bb7d37723f9bf3b10e34026f005&units=imperial")
    .then(response => {
        let data = response.json();
       return data;
    }).then(data=> {
        console.log(data)
        // console.log(Math.floor(data.main.temp));
        // temperature.value = Math.floor(data.main.temp);
        // console.log(data.weather[0].description);
        // weather.description = data.weather[0].description;
        // console.log(data.weather[0].icon);
        // weather.icon = data.weather[0].icon;
        // console.log(data.name);
        // weather.city = data.name;
    }) 
    .then(function(){
        displayWeather();
    })
})
