import React from 'react';
import {useState, useEffect} from 'react';
import Day from './Day';

const Weather = (lat, lng) => {
    const heroku = 'https://cors-anywhere.herokuapp.com/';
    const api = `${heroku}https://api.darksky.net/forecast/194b1066f875b0257ba37dd180bc934b/${lat.lat},${lat.lng}`

    const [weather, setWeather] = useState(null);

    async function getWeather(api) {   
        const response = await fetch(api);
        const weatherData = await response.json();
        setWeather(weatherData);
        console.log(weatherData);
    }
    useEffect(() =>{
        getWeather(api);
    },[]);

    if (weather !== null){
        return(
            <div className="weather">
                <Day currentTemp={weather.currently.temperature}
                    currentIcon={weather.currently.icon}              
                    dayOfWeek={weather.daily.data}  
                    summary={weather.currently.summary}
                />
            </div>
        )
    }
    return(
        <div className="weather">
            Loading...
        </div>
    )
}

export default Weather;