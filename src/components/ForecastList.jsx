import { getWeatherIcon } from '../utils/weather';

const ForecastList = ({ forecast, unitSymbol, language = 'id' }) => {
  if (!forecast.length) return null;

  const locale = language === 'id' ? 'id-ID' : 'en-US';

  return (
    <section className="forecast-section">
      <h3>{language === 'id' ? 'Ramalan 5 Hari' : '5-Day Forecast'}</h3>
      <div className="forecast-list row g-2">
        {forecast.map((item) => {
          const date = new Date(`${item.dt_txt.replace(' ', 'T')}Z`);
          const day = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' }).format(date);

          return (
            <article className="forecast-card col" key={item.dt}>
              <small>{day}</small>
              <span aria-hidden="true">{getWeatherIcon(item.weather[0].icon)}</span>
              <strong>{Math.round(item.main.temp)}{unitSymbol}</strong>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ForecastList;
