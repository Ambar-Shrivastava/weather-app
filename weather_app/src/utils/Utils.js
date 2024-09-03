import axios from 'axios';
import config from '../config/Config';

export const getWeatherData = (cityName, setWeatherData) => {
    if (cityName === "") {
        alert("Enter a city name")
        return;
    }
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${config.API_KEY}`)
        .then((response) => {
            // API response from openweathermap.org for weather data
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
                visibility: Math.floor(response.data.visibility / 1000),
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

export const getForecastData = (cityName, setforecastData) => {
    if (cityName === "") {
        alert("Enter a city name")
        return;
    }
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${config.API_KEY}`)
        .then((response) => {
            console.log(response);
            console.log(groupDataByDate(response.data.list, response.data.city.timezone))
            setforecastData(groupDataByDate(response.data.list, response.data.city.timezone))
        })
        .catch((error) => {
            // Handle errors
            setforecastData(false)
            alert("Enter a valid city name")
            console.error('Error fetching data:', error);
            return;
        });

}

// Converting timestamp to date string from response.data
const getDateString = (data, timezoneOffset) => {
    const date = new Date((data + timezoneOffset) * 1000);
    return date;
};

// Function to group data by date and max temp and min temp of each day
const groupDataByDate = (dataList, timezoneOffset) => {
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = new Date().toISOString().split('T')[0]
    return dataList.reduce((acc, item) => {
        const dateString = getDateString(item.dt, timezoneOffset).toISOString().split('T')[0];
        let _minTemp = Math.floor(item.main.temp_min - 273.15);
        let _maxTemp = Math.floor(item.main.temp_max - 273.15);        
        if (dateString !== today) {
            if (!acc[dateString]) {
                acc[dateString] = {
                    day: weekDays[getDateString(item.dt, timezoneOffset).getUTCDay()],
                    temp_max: _maxTemp,
                    temp_min: _minTemp,
                    humidity: item.main.humidity
                };
            } else {
                acc[dateString].temp_max = Math.max(acc[dateString].temp_max, _maxTemp);
                acc[dateString].temp_min = Math.min(acc[dateString].temp_min, _minTemp);
                acc[dateString].humidity = Math.max(acc[dateString].humidity, item.main.humidity);
            }
        }
        return acc;
    }, {});
};