import axios from 'axios';
import config from '../config/Config';

export const getWeatherData = (cityName, setWeatherData) => {
    if(cityName===""){
        alert("Enter a city name")
        return;
    }
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${config.API_KEY}`)
        .then((response) => {
            // API response from openweathermap.org for weather data
            console.log(response);
            //Converting temperature from kelvin to celcius
            let temp = response.data.main.temp - 273.15 
            let feelsLikeTemp = response.data.main.feels_like - 273.15;
            let minTemp = response.data.main.temp_min - 273.15;
            let maxTemp = response.data.main.temp_max - 273.15;
            let iconCode = response.data.weather[0].icon || "01d";
            setWeatherData({
                humidity: response.data.main.humidity,
                windSpeed: response.data.wind.speed,
                temperature: Math.floor(temp),
                feelsLike: Math.floor(feelsLikeTemp),
                minTemperature: Math.floor(minTemp),
                maxTemperature: Math.floor(maxTemp),
                location: response.data.name,
                icon: iconCode,
                visibility: Math.floor(response.data.visibility/1000)
            })
        })
        .catch((error) => {
            // Handle errors
            setWeatherData(false)
            alert("Enter a valid city name")
            console.error('Error fetching data:', error);
            return;
        });

}