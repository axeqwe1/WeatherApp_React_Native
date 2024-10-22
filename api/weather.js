import { apiKey } from "../constants";
import axios from "axios";

// const forecastEndpoint = params => `https://api.tomorrow.io/v4/weather/forecast?location=${params.cityName}&apikey=${apiKey}`
const realtimeEndpoint = params => `https://api.openweathermap.org/data/2.5/weather?q=${params.name}&appid=${apiKey}&units=metric`
const forecastEndpoint = params => `https://api.openweathermap.org/data/2.5/forecast?q=${params.name}&appid=${apiKey}&units=metric`
const airPollution = params => `http://api.openweathermap.org/data/2.5/air_pollution?lat=${params.lat}&lon=${params.lon}&appid=${apiKey}`
const apiCall = async (endpoint) => {
    const options = {
        method:'GET',
        url:endpoint
    }
    console.log(endpoint)
    try{
        const respose = await axios.request(options);
        return respose.data
    }catch(err){
        // console.log('error: ',err)
        return { err: 'Not found Data' };
    }
}

export const fetchWeatherForecast = params =>{
    return apiCall(forecastEndpoint(params))
}
export const fetchRealtimeWeather = params =>{
    return apiCall(realtimeEndpoint(params))
}
export const fetchAirpoluteForPM = params =>{
    return apiCall(airPollution(params))
}