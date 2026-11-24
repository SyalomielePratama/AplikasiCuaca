import { formatLocalTime, getWeatherIcon } from '../utils/weather';
import WeatherDetails from './WeatherDetails';

const CurrentWeather = ({ weather, unit, language = 'id' }) => {
  const unitSymbol = unit === 'metric' ? '°C' : '°F';
  const indonesia = language === 'id';
  const locale = indonesia ? 'id-ID' : 'en-US';

  return (
    <div className="current-weather">
      <div className="location-line">
        <div><p className="country">{weather.sys.country}</p><h2>{weather.name}</h2></div>
        <span className="weather-icon" title={weather.weather[0].description}>
          {getWeatherIcon(weather.weather[0].icon)}
        </span>
      </div>

      <div className="temperature-row">
        <strong>{Math.round(weather.main.temp)}<span>{unitSymbol}</span></strong>
        <div>
          <p>{weather.weather[0].description}</p>
          <small>{indonesia ? 'Terasa seperti' : 'Feels like'} {Math.round(weather.main.feels_like)}{unitSymbol}</small>
        </div>
      </div>

      <WeatherDetails weather={weather} unit={unit} language={language} />

      <div className="sun-times">
        <span>{indonesia ? 'Terbit' : 'Sunrise'} <strong>{formatLocalTime(weather.sys.sunrise, weather.timezone, locale)}</strong></span>
        <i aria-hidden="true"></i>
        <span>{indonesia ? 'Terbenam' : 'Sunset'} <strong>{formatLocalTime(weather.sys.sunset, weather.timezone, locale)}</strong></span>
      </div>
    </div>
  );
};

export default CurrentWeather;
