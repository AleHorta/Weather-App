const API = {
    url: `http://api.openweathermap.org/data/2.5/weather`,
    key: `4090239d69cdb3874de692fd18539299`
}

var onload = () => {
    navigator.geolocation.getCurrentPosition(locationvar)
}

var locationvar = position => {
    var { latitude, longitude } = position.coords
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APIkey=${API.key}`)
        .then(response => response.json())
        .then(data => WeatherData(data))
}

function getDate() {
    let date = new Date()
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`
}

var WeatherData = data => {
    var weatherData = {
        location: data.name,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        date: getDate()
    }
    console.log(data)
    
    var weather = document.getElementById("weather-img")
    switch (data.weather[0].main) {
        case "Clear":
            if (data.weather[0].icon === "01d") {
                weather.innerHTML = `<img src="https://i.pinimg.com/564x/18/92/8c/18928c0ca2d40b79c866f1867f9885ff.jpg">`
            } else {
                weather.innerHTML = `<img src="https://i.pinimg.com/564x/ce/14/6f/ce146f8bb4c7d2af2484d0d71398cddf.jpg">`
            }
        break
        case "Clouds":
            switch (data.weather[0].icon) {
                case "02d":
                    weather.innerHTML = `<img src="https://i.pinimg.com/originals/7d/07/a2/7d07a255678962d30d8717dcf5dbd266.gif">`
                break
                case "02n":
                    weather.innerHTML = `<img src="https://i.pinimg.com/originals/63/7c/2d/637c2d927a738d16ea0e99877d80afe6.gif">`
                break
                case "03d":
                    weather.innerHTML = `<img src="https://i.pinimg.com/originals/60/a8/37/60a8371219f417a5b1c9ce2dbc521cd4.gif">`
                break
                case "03n":
                    weather.innerHTML = `<img src="https://i.pinimg.com/originals/ec/0e/c4/ec0ec469077e9c5f1c7fd33e03f3510a.gif">`
                break
                case "04d":
                    weather.innerHTML = `<img src="https://i.pinimg.com/originals/37/04/2c/37042c79cbfc28afc39f328f36ae959b.gif">`
                break
                case "04n":
                    weather.innerHTML = `<img src="https://i.pinimg.com/originals/b0/45/fc/b045fc647b6a4a4bc2dd3d31f4a948ef.gif">`
                break
            }
        break
        case "Mist":
            weather.innerHTML = `<img src="https://openweathermap.org/img/wn/50d@2x.png">`
        break
        case "Smoke":
            weather.innerHTML = `<img src="https://i.pinimg.com/originals/14/ee/27/14ee27f1ee2970ffb44b1ea0eb156d7e.gif">`
        break
        case "Haze":
            weather.innerHTML = `<img src="https://openweathermap.org/img/wn/50d@2x.png">`
        break
        case "Fog":
            weather.innerHTML = `<img src="https://openweathermap.org/img/wn/50d@2x.png">`
        break
        case "Sand":
            weather.innerHTML = `<img src="https://openweathermap.org/img/wn/50d@2x.png">`
        break
        case "Dust":
            weather.innerHTML = `<img src="https://openweathermap.org/img/wn/50d@2x.png">`
        break
        case "Ash":
            weather.innerHTML = `<img src="https://openweathermap.org/img/wn/50d@2x.png ">`
        break
        case "Squalls":
            weather.innerHTML = `<img src="https://i.pinimg.com/originals/37/04/2c/37042c79cbfc28afc39f328f36ae959b.gif">`
        break
        case "Tornado":
            weather.innerHTML = `<img src="">`
        break
        case "Snow":
            weather.innerHTML = `<img src="https://i.pinimg.com/originals/d7/5a/a8/d75aa815d8f4676fdd0d28c7200882d8.gif">`
        break
        case "Rain":
            switch (data.weather[0].icon) {
                case "10d":
                    weather.innerHTML = `<img src="https://i.pinimg.com/originals/77/de/52/77de524064392888305adbf89986893f.gif">`
                break
                case "13d":
                    weather.innerHTML = `<img src="https://i.pinimg.com/originals/c6/34/e4/c634e415c7eb1e6dbbbcdfbd1b36b97d.gif">`
                break
                case "09d":
                    weather.innerHTML = `<img src="https://i.pinimg.com/originals/67/da/cc/67dacc3fa47519655fb1a0def24b2c32.gif">`
                break
            }
        break
        case "Drizzel":
            weather.innerHTML = `<img src="https://i.pinimg.com/originals/f3/e0/a5/f3e0a5eb29a20721639973c480793e8a.gif">`
        break
        case "Thunderstorm":
            weather.innerHTML = `<img src="https://i.pinimg.com/originals/8a/58/ad/8a58ada1688e012fabde62c1d7f10ef4.gif">`
        break
    }
    Object.keys(weatherData).forEach( key => {
        setTextContent(key, weatherData[key])
    })
}

var setTextContent = (element, text) => {
    document.getElementById(element).textContent = text
}

const searchbar = document.getElementById("search-bar")
const searchinput = document.getElementById("search-input")
searchbar.addEventListener('submit', onSubmit, true)

function onSubmit(event) {
    event.preventDefault()
    search(searchinput.value)
}

async function search(query) {
    try {
        const PositionSearch = await fetch(`${API.url}?q=${query}&units=metric&APIkey=${API.key}`)
        const data = await PositionSearch.json()
        getDate()

        var weather = document.getElementById("weather-icon")
        switch (data.weather[0].main) {
            case "Clear":
                if (data.weather[0].icon === "01d") {
                    weather = `<img src="https://i.pinimg.com/564x/18/92/8c/18928c0ca2d40b79c866f1867f9885ff.jpg">`
                } else {
                    weather = `<img src="https://i.pinimg.com/564x/ce/14/6f/ce146f8bb4c7d2af2484d0d71398cddf.jpg">`
                }
            break
            case "Clouds":
                switch (data.weather[0].icon) {
                    case "02d":
                        weather = `<img src="https://i.pinimg.com/originals/7d/07/a2/7d07a255678962d30d8717dcf5dbd266.gif">`
                    break
                    case "02n":
                        weather = `<img src="https://i.pinimg.com/originals/63/7c/2d/637c2d927a738d16ea0e99877d80afe6.gif">`
                    break
                    case "03d":
                        weather = `<img src="https://i.pinimg.com/originals/60/a8/37/60a8371219f417a5b1c9ce2dbc521cd4.gif">`
                    break
                    case "03n":
                        weather = `<img src="https://i.pinimg.com/originals/ec/0e/c4/ec0ec469077e9c5f1c7fd33e03f3510a.gif">`
                    break
                    case "04d":
                        weather = `<img src="https://i.pinimg.com/originals/37/04/2c/37042c79cbfc28afc39f328f36ae959b.gif">`
                    break
                    case "04n":
                        weather = `<img src="https://i.pinimg.com/originals/b0/45/fc/b045fc647b6a4a4bc2dd3d31f4a948ef.gif">`
                    break
                }
            break
            case "Mist":
                weather = `<img src="https://openweathermap.org/img/wn/50d@2x.png">`
            break
            case "Smoke":
                weather = `<img src="https://i.pinimg.com/originals/14/ee/27/14ee27f1ee2970ffb44b1ea0eb156d7e.gif">`
            break
            case "Haze":
                weather = `<img src="https://openweathermap.org/img/wn/50d@2x.png">`
            break
            case "Fog":
                weather = `<img src="https://openweathermap.org/img/wn/50d@2x.png">`
            break
            case "Sand":
                weather = `<img src="https://openweathermap.org/img/wn/50d@2x.png">`
            break
            case "Dust":
                weather = `<img src="https://openweathermap.org/img/wn/50d@2x.png">`
            break
            case "Ash":
                weather = `<img src="https://openweathermap.org/img/wn/50d@2x.png ">`
            break
            case "Squalls":
                weather = `<img src="https://i.pinimg.com/originals/37/04/2c/37042c79cbfc28afc39f328f36ae959b.gif">`
            break
            case "Tornado":
                weather = `<img src="">`
            break
            case "Snow":
                weather = `<img src="https://i.pinimg.com/originals/d7/5a/a8/d75aa815d8f4676fdd0d28c7200882d8.gif">`
            break
            case "Rain":
                switch (data.weather[0].icon) {
                    case "10d":
                        weather = `<img src="https://i.pinimg.com/originals/77/de/52/77de524064392888305adbf89986893f.gif">`
                    break
                    case "13d":
                        weather = `<img src="https://i.pinimg.com/originals/c6/34/e4/c634e415c7eb1e6dbbbcdfbd1b36b97d.gif">`
                    break
                    case "09d":
                        weather = `<img src="https://i.pinimg.com/originals/67/da/cc/67dacc3fa47519655fb1a0def24b2c32.gif">`
                    break
                }
            break
            case "Drizzel":
                weather = `<img src="https://i.pinimg.com/originals/f3/e0/a5/f3e0a5eb29a20721639973c480793e8a.gif">`
            break
            case "Thunderstorm":
                weather = `<img src="https://i.pinimg.com/originals/8a/58/ad/8a58ada1688e012fabde62c1d7f10ef4.gif">`
            break
        }
        
        const newsearch = document.getElementById("new-search")
        const newPlace = []
        newPlace.push (`
        <span id="new-img">${weather}</span>
        <section id="new-container">
            <h1>
                ${data.sys.country} <span>${data.name}</span>
                <article>${getDate()}</article>
            </h1>
            <h3>
                Temperature: <article>${Math.floor(data.main.temp)}<sup>°C</sup></article>
                Max. Temperature: <article>${Math.floor(data.main.temp_max)}<sup>°C</sup></article>
                Min. Temperature: <article>${Math.floor(data.main.temp_min)}<sup>°C</sup></article>
            </h3>
            <h3>
                Humidity: ${data.main.humidity}%
            </h3>
        </section>
        `)
        newsearch.innerHTML = newPlace.join("")
        searchinput.value = ""
        console.log(data)

    } catch(error) {
        searchinput.value = ""
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        console.log(error)
    }
}
