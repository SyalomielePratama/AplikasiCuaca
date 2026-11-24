import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import UnitToggle from '../components/UnitToggle';
import LanguageToggle from '../components/LanguageToggle';
import CurrentWeather from '../components/CurrentWeather';
import ForecastList from '../components/ForecastList';
import { useWeather } from '../hooks/useWeather';
import { formatClockParts, getDayPhase } from '../utils/weather';
import '../assets/css/Home.css';

const Home = () => {
  const {
    cityInput, setCityInput, weather, forecast, unit, setUnit,
    language, setLanguage, loading, error, searchByCity,
  } = useWeather();
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const unitSymbol = unit === 'metric' ? '°C' : '°F';
  const dayPhase = getDayPhase(weather);
  const locale = language === 'id' ? 'id-ID' : 'en-US';
  const timezone = weather?.timezone || 0;
  const clock = formatClockParts(Math.floor(currentTime / 1000), timezone, locale);
  const copy = language === 'id'
    ? { eyebrow: 'Prakiraan cuaca', title: 'Cuaca Sekarang', loading: 'Memuat cuaca...' }
    : { eyebrow: 'Weather forecast', title: 'Current Weather', loading: 'Loading weather...' };

  return (
    <main className={`weather-page theme-${dayPhase} d-flex align-items-center justify-content-center`}>
      <section className="weather-card container-fluid">
        <header className="d-flex align-items-start justify-content-between gap-2">
          <div>
            <p className="eyebrow mb-1">{copy.eyebrow}</p>
            <h1 className="h3 mb-1">{copy.title}</h1>
            {weather && (
              <div className="digital-clock d-flex align-items-baseline" aria-label="Local time">
                <span className="clock-time">{clock.time}</span>
                <span className="clock-seconds">:{clock.seconds}</span>
                <span className="clock-period">{clock.period}</span>
              </div>
            )}
          </div>
          <div className="header-controls d-flex align-items-center gap-1">
            <LanguageToggle language={language} onChange={setLanguage} />
            <UnitToggle unit={unit} onChange={setUnit} />
          </div>
        </header>

        <SearchBar
          value={cityInput}
          onChange={setCityInput}
          onSearch={() => searchByCity(cityInput, unit, language)}
          language={language}
        />

        {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}

        {loading ? (
          <div className="loading d-flex align-items-center justify-content-center">
            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
            {copy.loading}
          </div>
        ) : weather ? (
          <>
            <CurrentWeather weather={weather} unit={unit} language={language} />
            <ForecastList forecast={forecast} unitSymbol={unitSymbol} language={language} />
          </>
        ) : null}
      </section>
    </main>
  );
};

export default Home;
