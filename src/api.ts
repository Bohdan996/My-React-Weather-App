const API = 'https://api.openweathermap.org/data/2.5/onecall?';
const API_GEO = 'http://api.openweathermap.org/geo/1.0/';

export const getDailyApibyCoords = (lat: number, lon: number) => {
  return fetch(`${API}lat=${lat}&lon=${lon}&exclude=hourly&appid=${process.env.REACT_APP_KEY}`)
    .then(res => res.json())
};

export const getGeo = (city: string) => {
  return fetch(`${API_GEO}direct?q=${city}&limit=1&appid=${process.env.REACT_APP_KEY}`)
    .then(res => res.json())
};

export const getReverseGeo = (lat: number, lon: number) => {
  return fetch(`${API_GEO}reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.REACT_APP_KEY}`)
    .then(res => res.json())
};
