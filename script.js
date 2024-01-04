const apiKey = '05e742ec098ff3ca14857d6dfd8bfcbf';
// const apiKey = '0328efe6ae690fa965f049ce122ce358';
// const apiKey = '8a4c4f30a72a50c47c6d2893ceb3bd9e';
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherCardsContainer = document.getElementById('weatherCards');
const cities = [];

weatherForm.addEventListener('submit', function () {
    addCity();
});

function addCity() {
    const cityName = cityInput.value.trim();

    if (cityName === '') {
        alert('Please enter a valid city name.');
        return;
    }

    fetchWeather(cityName);
    cityInput.value = '';
}

function fetchWeather(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            cities.push(cityName);
            sortCitiesByTemperature();
        })
        .catch(error => console.error('Error fetching weather:', error));
}

function displayWeather(data) {
    const weatherCard = document.createElement('div');
    weatherCard.className = 'city-weather';

    const iconUrl = getWeatherIconUrl(data.weather[0].icon, data.weather[0].main);

    weatherCard.innerHTML = `
        <div class="row1">
            <div class="temerature">${data.main.temp}°C</div>
            <div class="HL">
                <span class="H">H:${data.main.temp_max}°C</span>
                <span class="L">L:${data.main.temp_min}°C</span>
            </div>
            <div class="city">${data.name}</div>
        </div>
        <div class="row2">
            <div class="img-container"><img src="${iconUrl}" alt="Weather Icon"></div>
            <div class="weather-condation">${data.weather[0].main}</div>
        </div>
    `;

    weatherCardsContainer.appendChild(weatherCard);
}

 
         
       
      
        
        

function getWeatherIconUrl(iconCode) {
    let imgPath;

    switch (iconCode) {  
        case 'Clear':
        case 'Squall':
                imgPath = 'assets/Sun cloud angled rain.png';
                break;
        case 'Snow':
        case 'Mist':
        case 'Smoke':
        case 'Fog':
            imgPath = 'assets/Moon cloud fast wind.png'; 
            break;
        case 'Rain':
        case 'Clouds':
            imgPath = 'assets/Moon cloud mid rain.png';
            break;
        case 'Thunderstorm':
        case 'Drizzle':
        case 'Tornado':
        case 'Haze':
        case 'Dust':
        case 'Sand':
        case 'Ash':
            imgPath = 'assets/Tornado.png';
            break; 
        default: 
            imgPath = 'assets/Moon cloud fast wind.png';
             
            break;
    }

    return imgPath;
}


 
 


function sortCitiesByTemperature() {
    cities.sort((a, b) => getCityTemperature(a) - getCityTemperature(b));
    weatherCardsContainer.innerHTML = '';
    cities.forEach(city => fetchWeather(city));
}




 



// Custom :contains() selector
// function contains(selector, text) {
//     var elements = document.querySelectorAll(selector);
//     return Array.prototype.filter.call(elements, function(element){
//         return RegExp(text).test(element.textContent);
//     });
// }

function getCityTemperature(cityName) {
    const cityCard = contains('.city-weather .row1 .city', cityName)[0];
    return parseFloat(cityCard.previousElementSibling.previousElementSibling.textContent.split(':')[1].trim());
}
function sortCitiesByTemperature() {
    cities.sort((a, b) => {
        const tempA = getCityTemperature(a);
        const tempB = getCityTemperature(b);

        if (!isNaN(tempA) && !isNaN(tempB)) {
            return tempA - tempB;
        }

        return 0; // Handle the case when temperatures are not available or invalid
    });

    // Clear the existing weather cards
    weatherCardsContainer.innerHTML = '';

    // Fetch weather and display cards for sorted cities
    cities.forEach(city => fetchWeather(city));
}







 