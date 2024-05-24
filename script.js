window.addEventListener("load", submit("bayonne"));
console.log("Weather Life");
const iconWidget = document.querySelector(".image");
const {descriptionWidget, tempWidget, humidityWidget, pressureWidget} = document.querySelector(".inner");
const myCity = document.getElementById('City');
const API_KEY = 'ENTER YOUR API_KEY';

myCity.addEventListener('click', () => {
    submit(myCity.value);
});

function Result(city, temp, humidity, pressure, description, icon){
    iconWidget.src = "https://openweathermap.org/img/wn/" + icon +"@4x.png"
    document.getElementById("DescriptionInner").innerHTML = description;
    document.getElementById("TempInner").innerHTML = temp + " °C";
    document.getElementById("HumidityInner").innerHTML = humidity + " %";
    document.getElementById("PressureInner").innerHTML = pressure + " hPa";
}

async function submit(city) {

    console.clear();

    let api_key = API_KEY;
    
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`, {
        method: "GET"
    })
    .then(
        async resp => {
            const dataResp = await resp.json(); // this returns a promise
            const main = dataResp.main;
            const weather = dataResp.weather[0];
            const temp = main.temp;
            const humidity = main.humidity;
            const pressure = main.pressure;
            const description = weather.description;
            const icon = weather.icon;
            Result(city, temp, humidity, pressure, description, icon);
            return resp;
        }
    )
    .then(repos => {
        console.log(repos)
    })
    .catch(ex => {
        console.error(ex);
    })
}
