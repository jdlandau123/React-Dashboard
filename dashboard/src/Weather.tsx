import {Box, Heading} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function Weather() {
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const [temp, setTemp] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [weather, setWeather] = useState("");

    let errorMessage: string = "";

    const iconStyles = {
        width: '100px',
        height: '100px'
    }

    const getWeather = (lat: number, long: number) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=APIKEY`)
        .then((response) => {
            setTemp(response.data.main.temp);
            setHumidity(response.data.main.humidity);
            setWeather(response.data.weather[0].main);
        })
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLatitude(position.coords.latitude);
                setCurrentLongitude(position.coords.longitude);
            });
        } else {
            errorMessage = "Location not supported on this browser"
        }
    }, []);

    useEffect(() => {
        getWeather(currentLatitude, currentLongitude);
    }, [currentLatitude, currentLongitude]);

    return (
        <Box bg='gray.200' opacity='92%' fontSize='lg' textAlign='center' borderWidth='1px' borderRadius='lg' pt='20px' boxShadow='dark-lg'>
            <Heading size='lg'>Current Location & Weather</Heading>
            <div style={{fontSize:'12pt'}}>
                {(!errorMessage) ? `Latitude: ${currentLatitude}, Longitude: ${currentLongitude}` : `${errorMessage}`}
            </div>
            <h1 style={{fontSize:'36pt'}}>{temp.toFixed()} &#730;F</h1>
            <p>{humidity}% Humidity</p>
            <p>Conditions: {weather}</p>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                {(weather === 'Clouds') ? <img src="/cloudy-weather.svg" style={iconStyles}></img> : 
                (weather === 'Clear') ? <img src="/sunny-weather.svg" style={iconStyles}></img> :
                (weather === 'Extreme') ? <img src="/storm-weather.svg" style={iconStyles}></img> :
                (weather === 'Rain') ? <img src="/rain-weather.svg" style={iconStyles}></img> :
                (weather === 'Snow') ? <img src="/snow-weather.svg" style={iconStyles}></img> : null}
            </div>
        </Box>
    )
}
