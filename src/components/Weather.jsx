import React, { useEffect, useState, useRef } from 'react';
import "./Weather.css";
import search from "../Assets/search.png";
import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import rain from "../Assets/rain.png";
import snow from "../Assets/snow.png";
import wind from "../Assets/wind.png";
import humidity from "../Assets/humidity.png";

const Weather = () => {
    const inputRef = useRef();
    const [weather, setWeather] = useState(false);

    const allIcons = {
        "Clear": clear,
        "Cloudy": cloud,
        "Partly cloudy": cloud,
        "Overcast": cloud,
        "Rain": rain,
        "Snow": snow,
        "Wind": wind
    };

    const searchBar = async (city) => {
        if (!city) {
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.weatherapi.com/v1/forecast.json?key=f13af82f154c4a40bd0135037242509&q=${city}&days=1&aqi=no&alerts=no`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            const icon = allIcons[data.current.condition.text] || clear;

            setWeather({
                humidity: data.current.humidity,
                windSpeed: data.current.wind_kph,
                temperature: Math.floor(data.current.temp_c),
                location: data.location.name,
                icon: icon
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        searchBar("London");
    }, []);

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type='text' placeholder='Search...' />
                <img src={search} alt="" onClick={() => searchBar(inputRef.current.value)} />
            </div>
            {weather && (
                <>
                    <img src={weather.icon} className='weather-img' alt="Weather icon" />
                    <p className='weather-temp'>{weather.temperature}°C</p>
                    <p className='weather-city'>{weather.location}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity} alt="" />
                            <div>
                                <p>{weather.humidity} %</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind} alt="" />
                            <div>
                                <p>{weather.windSpeed} km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Weather;
