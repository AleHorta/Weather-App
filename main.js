const APP_ID = '4090239d69cdb3874de692fd18539299'

var onload = () => {
    navigator.geolocation.getCurrentPosition(locationvar)
}

var getDate = () => {
    let date = new Date()
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`
}

var setTextContent = (element, text) => {
    document.getElementById(element).textContent = text
}

var locationvar = position => {
    var { latitude, longitude } = position.coords
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
}

var setWeatherData = data => {
    var weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        date: getDate()
    }
    console.log(data)

    var wheather = document.getElementById("weather-img")
    switch (data.weather[0].main) {
        case "Clear":
            wheather.innerHTML = `<img src="https://i.pinimg.com/originals/24/2e/37/242e379f970c22bf30e1689290627058.gif">`
        break;
        case "Clouds":
            wheather.innerHTML = `<img src="https://i.pinimg.com/originals/2a/23/6d/2a236d4ddffcd45ecfc01ce986295a96.gif">`
        break;
        case "Rain":
            wheather.innerHTML = `<img src="https://i.pinimg.com/originals/8d/90/6b/8d906b49c121f7f3a8ae35c7abf1439f.gif">`
        break;
        case "Drizzle":
            wheather.innerHTML = `<img src="https://i.pinimg.com/originals/17/e8/37/17e83724e0a1f12960ebe8ce4a32c614.gif">`
        break;
        case "Thunderstorm":
            wheather.innerHTML = `<img src="https://media1.giphy.com/media/QuUnHEhwkEf690l1lC/giphy.gif?cid=790b7611172983ee79e9f001f620f252fb2d7fccb386b796&rid=giphy.gif&ct=g">`
            
        break;
        case "Snow":
            wheather.innerHTML = `<img src="https://i.pinimg.com/originals/72/3e/c6/723ec688008ae3f6068d6f6a749bdf37.gif">`
        break;
    }
    Object.keys(weatherData).forEach( key => {
        setTextContent(key, weatherData[key])
    })
}

