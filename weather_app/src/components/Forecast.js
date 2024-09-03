import React from 'react';

const WeatherBox = ({ date, data }) => (
    <div className="weather-box">
      <h3>{date} - {data.day}</h3>
      <div className="other-temp-txt">
        <div className="data-col">
          <div>
            <p>{data.temp_min}°C</p>
            <span>Min</span>
          </div>
        </div>
        <div className="data-col">
          <div>
            <p>{data.temp_max}°C</p>
            <span>Max</span>
          </div>
        </div>
        <div className="data-col">
          <div>
            <p>{data.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
      </div>
    </div>
  );

  export default WeatherBox;