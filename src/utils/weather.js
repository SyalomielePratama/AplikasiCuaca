export const weatherIcons = {
  '01': '☀', '02': '🌤', '03': '☁', '04': '☁',
  '09': '🌧', '10': '🌦', '11': '⛈', '13': '❄', '50': '🌫',
};

export const getWeatherIcon = (code) => weatherIcons[code?.slice(0, 2)] || '🌡';

export const formatLocalTime = (timestamp, timezone = 0, locale = 'id-ID') =>
  new Intl.DateTimeFormat(locale, {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'UTC',
  }).format(new Date((timestamp + timezone) * 1000));

export const formatClockParts = (timestamp, timezone = 0, locale = 'id-ID') => {
  const date = new Date((timestamp + timezone) * 1000);
  const parts = new Intl.DateTimeFormat(locale, {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true, timeZone: 'UTC',
  }).formatToParts(date);

  const hour = parts.find((part) => part.type === 'hour')?.value || '00';
  const minute = parts.find((part) => part.type === 'minute')?.value || '00';
  const second = parts.find((part) => part.type === 'second')?.value || '00';
  const period = parts.find((part) => part.type === 'dayPeriod')?.value || '';

  return { time: `${hour}:${minute}`, seconds: second, period: period.toUpperCase() };
};

export const getLocalHour = (timezone = 0) =>
  new Date((Math.floor(Date.now() / 1000) + timezone) * 1000).getUTCHours();

export const getDayPhase = (weather) => {
  if (!weather) {
    const hour = getLocalHour();
    if (hour >= 5 && hour < 10) return 'morning';
    if (hour >= 10 && hour < 15) return 'day';
    if (hour >= 15 && hour < 18) return 'sunset';
    return 'night';
  }

  const now = Math.floor(Date.now() / 1000);
  const timezone = weather.timezone || 0;
  const localHour = new Date((now + timezone) * 1000).getUTCHours();

  if (now < weather.sys.sunrise || now >= weather.sys.sunset) return 'night';
  if (localHour >= 5 && localHour < 10) return 'morning';
  if (localHour >= 15 && localHour < 18) return 'sunset';
  return 'day';
};

export const isNightTime = (weather) => getDayPhase(weather) === 'night';

export const getDailyForecast = (forecastList = []) =>
  forecastList
    .filter((item) => item.dt_txt?.includes('12:00:00'))
    .slice(0, 5);
