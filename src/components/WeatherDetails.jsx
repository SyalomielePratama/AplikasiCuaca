const WeatherDetails = ({ weather, unit, language = 'id' }) => {
  const indonesia = language === 'id';
  const windUnit = unit === 'metric' ? (indonesia ? 'm/dtk' : 'm/s') : 'mph';
  const details = [
    ['bi-droplet-fill', indonesia ? 'Kelembapan' : 'Humidity', `${weather.main.humidity}%`],
    ['bi-wind', indonesia ? 'Angin' : 'Wind', `${weather.wind.speed} ${windUnit}`],
    ['bi-speedometer2', indonesia ? 'Tekanan' : 'Pressure', `${weather.main.pressure} hPa`],
    ['bi-eye-fill', indonesia ? 'Jarak pandang' : 'Visibility', `${Math.round((weather.visibility || 0) / 1000)} km`],
  ];

  return (
    <div className="weather-details row g-2" aria-label={indonesia ? 'Detail cuaca' : 'Weather details'}>
      {details.map(([icon, label, value]) => (
        <div className="col-6 col-md-3" key={label}>
          <article className="detail-card h-100 text-white">
            <div className="d-flex align-items-center gap-3 p-3">
              <span className="detail-icon flex-shrink-0" aria-hidden="true">
                <i className={`bi ${icon}`}></i>
              </span>
              <div className="min-w-0">
                <small className="detail-label d-block">{label}</small>
                <strong className="detail-value d-block text-truncate">{value}</strong>
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;
