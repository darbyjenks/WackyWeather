let key = '1b9e0d552ea60a756ee1fa770bbaea19';
let cityName = 'Atlanta';
let requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`;

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    // debugger;
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=${key}`);
  }).then(function(response) {
    return response.json();
    }).then(function (data) {
    console.log(data)
    currentCity = data.current
    }).then(function () {
    currentCityDisplay()
  });

  function currentCityDisplay(data){
    // let currentCity = data.name
    console.log(currentCity)
  }