//grabbing search bar from HTML page
var searchInput = document.getElementById("#searchInput");
//grabbing search btn from HTML page
const searchBtn = document.getElementById("searchBtn");
// const mainContent = $("#mainContent");
// var recentSearches = $("#recents");
// const current = $("#current");
// const fiveDay = $("#five-day");
// const clearBtn = $("#clearBtn");
let key ='d9e1eb472c1a4120348bfa4ea31aa048';
let units = 'imperial'

const weather = data;
weather.temperature = {
    unit : "fahrenheit"
}
//setting the city to what is typed in by the user
let city = document.getElementById("searchInput").value;


console.log(localStorage)
console.log(city);

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
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=${key}`);
    }).then(response => {
        let data = response.json();
        return data;
    }).then(data => {
        console.log(data);
    })   
 }
let lat = JSON.parse(localStorage.getItem('lat'));
let lon = JSON.parse(localStorage.getItem('lon'));
let cnt = 5
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${key}`
console.log(`${lat} ${lon}`)
fetch(url)
.then(response => {
    let data = response.json();
   return data;
}).then(data=> {
    console.log(data);
})  
