import {Box} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function Weather() {
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const [temp, setTemp] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [weather, setWeather] = useState("");

    let errorMessage: string = "";

    const getWeather = (lat: number, long: number) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=594c6a508b55ce51e636aee82559a7dd`)
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
    }, [currentLatitude, currentLongitude])

    return (
        <Box bg='gray.300' fontSize='lg' textAlign='center' borderWidth='1px' borderRadius='lg' w='30%' ml='7%'>
            <h3>Current Location & Weather</h3>
            <div style={{fontSize:'12pt'}}>
                {(!errorMessage) ? `Latitude: ${currentLatitude}, Longitude: ${currentLongitude}` : `${errorMessage}`}
            </div>
            <h1 style={{fontSize:'24pt'}}>{temp.toFixed()} &#730;F</h1>
            <p>{humidity}% Humidity</p>
            <p>Conditions: {weather}</p>
        </Box>
    )
}