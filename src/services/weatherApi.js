const API_KEY = import.meta.env.VITE_API_KEY?.trim();
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const request = async (endpoint, params, language = 'id') => {
  if (!API_KEY) {
    throw new Error('API key belum tersedia. Tambahkan VITE_API_KEY pada file .env lalu restart server Vite.');
  }

  const query = new URLSearchParams({ ...params, lang: language, appid: API_KEY });
  const response = await fetch(`${BASE_URL}/${endpoint}?${query}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(language === 'id' && data.message === 'city not found'
      ? 'Kota tidak ditemukan. Periksa nama kota dan coba lagi.'
      : data.message || 'Weather data could not be loaded');
  }

  return data;
};

export const getWeatherByCity = (city, units, language = 'id') =>
  Promise.all([
    request('weather', { q: city, units }, language),
    request('forecast', { q: city, units }, language),
  ]);
