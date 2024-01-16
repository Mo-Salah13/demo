let apiKey = `4e54c16dc0b84b06a32111708241101`;
let showWeather = document.querySelector('.showWeather');
let searchBox = document.querySelector("#searchBox")
let locationName = document.getElementById("cityLocation");
async function getWeather(country) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${country}&days=3`);
    let result = await response.json();
    // console.log(result);
    displayWeather(result);
    clear();
}
// getWeather('london');
function displayWeather(result) {
    // console.log(result);
    // console.log(result.forecast.forecastday);
    let forecast = result.forecast.forecastday;
    let location = result.location.name;
    locationName.innerHTML =`<i class="fa-solid fa-map-pin text-danger pt-3 pe-2"></i>`+ location
    let container = ``
    for (let i = 0; i < forecast.length; i++) {
        let date = new Date(forecast[i].date); 
        let weekDay = date.toLocaleDateString('en-us', { weekday: 'long' });
        container += `
    <div class="col-md-3  rounded-4 m-4 text-center">
    <div class="d-flex justify-content-between pt-3">
        <span>${weekDay}</span>
        <span>${date.toLocaleDateString()}</span>
    </div>
    <hr>
    <div class="pt-5">
        <img src="https:${forecast[i].day.condition.icon}" alt="weather Status">
        <h2 class="fa-4x">${forecast[i].hour[date.getHours()].temp_c}°c</h2>
        <p>${forecast[i].day.condition.text}</p>
        <div class="d-flex justify-content-evenly">
            <span>Sunrise: ${forecast[i].astro.sunrise}</span>
            <span>Sunset: ${forecast[i].astro.sunset}</span>
        </div>
        <div class="my-5 py-5">
            <hr>
            <span class="pe-3"><i class="text-info fa-solid fa-umbrella"></i> ${forecast[i].day.daily_chance_of_rain}%</span>
            <span class="px-3"><i class="text-info fa-solid fa-wind"></i> ${forecast[i].hour[date.getHours()].wind_kph}km/h</span>
            <span class="ps-3"><i class="text-info fa-regular fa-compass"></i> ${forecast[i].hour[date.getHours()].wind_dir}</span>
        </div>
    </div>
</div>`
    }
    // console.log(showWeather.innerHTML=container);
    showWeather.innerHTML = container;
}
// * fun 5asa bel search
searchBox.addEventListener("keyup", function(e){
    if(e.key =="Enter")
    {
        getWeather(searchBox.value)
    }
})
searchBox.addEventListener("blur", function(){
    getWeather(searchBox.value)
})
function clear() {
    searchBox.value=''
}