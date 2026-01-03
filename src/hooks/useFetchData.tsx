import { useState, useEffect } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

const URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America/Chicago';

export default function useFetchData(): OpenMeteoResponse | null {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const jsonData: OpenMeteoResponse = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []); // Arreglo de dependencias vacío = se ejecuta solo una vez

  return data;
}