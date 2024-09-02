import React, { useEffect, useRef, useState } from 'react'
import { getWeatherData } from '../utils/Utils';
import './Homepage.css';
import search_icon from '../asset/search.png'
import clear_icon from '../asset/clear.png'
import cloudy_icon from '../asset/cloudy.png'
import drizzle_icon from '../asset/drizzle.png'
import humid_icon from '../asset/humid.png'
import rainy_icon from '../asset/rainy.png'
import snowy_icon from '../asset/snowy.png'
import windy_icon from '../asset/windy.png'
import visibility_icon from '../asset/visibility.png'

const Homepage = () => {
  const inputRef = useRef("")
  const [weatherData, setWeatherData] = useState(false);

  useEffect(() => {
    getWeatherData("New York", setWeatherData);
  }, []);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rainy_icon,
    "09n": rainy_icon,
    "10d": rainy_icon,
    "10n": rainy_icon,
    "13d": snowy_icon,
    "13n": snowy_icon,
  }
  return (
    <div className='homepage'>
      <div className='input-search-bar'>
        <input ref={inputRef} type='text' placeholder='City Name' />
        <img src={search_icon} alt="Search Icon" onClick={() => getWeatherData(
          inputRef.current.value, setWeatherData)} />
      </div>

      {weatherData ? <>
        <p className='city-name-txt'>{weatherData.location}</p>
        <div className='temp-details'>
          <div className='current-temp-details'>
            <img src={allIcons[Object.keys(allIcons).includes(weatherData.icon) ? weatherData.icon : "01d"]} alt="Clear sky icon" className='weather-icon' />
            <p className='temp-txt'>{weatherData.temperature}°C</p>
          </div>
          <div className="other-temp-txt">
            <div className="data-col">
              <div>
                <p>{weatherData.minTemperature}°C</p>
                <span>Min</span>
              </div>
            </div>
            <div className="data-col">
              <div>
                <p>{weatherData.maxTemperature}°C</p>
                <span>Max</span>
              </div>
            </div>
            <div className="data-col">
              <div>
                <p>{weatherData.feelsLike}°C</p>
                <span>Feels Like</span>
              </div>
            </div>
          </div>
        </div>
        <div className="other-data-txt">
          <div className="data-col">
            <img src={humid_icon} alt="humidity icon" />
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="data-col">
            <img src={windy_icon} alt="windy icon" />
            <div>
              <p>{weatherData.windSpeed} Km/h</p>
              <span>Wind speed</span>
            </div>
          </div>
          <div className="data-col">
            <img src={visibility_icon} alt="windy icon" />
            <div>
              <p>{weatherData.visibility} Km</p>
              <span>Visibility</span>
            </div>
          </div>
        </div>
      </> : <></>}
    </div>
  );
}

export default Homepage;