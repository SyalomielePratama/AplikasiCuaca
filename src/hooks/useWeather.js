import { useEffect, useState } from 'react';
import { getWeatherByCity } from '../services/weatherApi';
import { getDailyForecast } from '../utils/weather';

export const useWeather = (initialCity = 'Jakarta') => {
  const [cityInput, setCityInput] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState('metric');
  const [language, setLanguage] = useState('id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const searchByCity = async (city, selectedUnit = unit, selectedLanguage = language) => {
    const cityName = city?.trim();
    if (!cityName) return;

    setLoading(true);
    setError('');

    try {
      const [current, forecastData] = await getWeatherByCity(
        cityName,
        selectedUnit,
        selectedLanguage,
      );
      setWeather(current);
      setForecast(getDailyForecast(forecastData.list));
    } catch (err) {
      setError(err.message || (selectedLanguage === 'id'
        ? 'Gagal terhubung ke OpenWeather.'
        : 'Failed to connect to OpenWeather.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadInitialWeather = async () => {
      setLoading(true);
      setError('');

      try {
        const [current, forecastData] = await getWeatherByCity(initialCity, 'metric', 'id');
        if (!active) return;
        setWeather(current);
        setForecast(getDailyForecast(forecastData.list));
      } catch (err) {
        if (!active) return;
        setError(err.message || 'Gagal terhubung ke OpenWeather.');
      } finally {
        if (active) setLoading(false);
      }
    };

    loadInitialWeather();
    return () => {
      active = false;
    };
  }, [initialCity]);

  useEffect(() => {
    if (!weather?.name) return;
    searchByCity(weather.name, unit, language);
  }, [unit, language]);

  return {
    cityInput,
    setCityInput,
    weather,
    forecast,
    unit,
    setUnit,
    language,
    setLanguage,
    loading,
    error,
    searchByCity,
  };
};
