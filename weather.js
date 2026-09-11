const weatherCodes = {
  0: ["Clear sky", "☀️"],
  1: ["Mainly clear", "🌤️"],
  2: ["Partly cloudy", "⛅"],
  3: ["Overcast", "☁️"],
  45: ["Fog", "🌫️"],
  48: ["Rime fog", "🌫️"],
  51: ["Light drizzle", "🌦️"],
  53: ["Drizzle", "🌦️"],
  55: ["Heavy drizzle", "🌧️"],
  61: ["Light rain", "🌦️"],
  63: ["Rain", "🌧️"],
  65: ["Heavy rain", "🌧️"],
  71: ["Light snow", "🌨️"],
  73: ["Snow", "❄️"],
  75: ["Heavy snow", "❄️"],
  80: ["Rain showers", "🌦️"],
  81: ["Rain showers", "🌧️"],
  82: ["Heavy rain showers", "🌧️"],
  95: ["Thunderstorm", "⛈️"],
  96: ["Thunderstorm with hail", "⛈️"],
  99: ["Thunderstorm with heavy hail", "⛈️"]
};


export async function getWeather(city) {
  const geoUrl =
    "https://geocoding-api.open-meteo.com/v1/search?name=" +
    encodeURIComponent(city) +
    "&count=1&language=en&format=json";

  const geoResponse = await fetch(geoUrl);

  if (!geoResponse.ok) {
    throw new Error("Unable to find the city.");
  }

  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found. Please enter a valid city name.");
  }

  const {
    latitude,
    longitude,
    name,
    country,
    admin1
  } = geoData.results[0];


  const weatherUrl =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    latitude +
    "&longitude=" +
    longitude +
    "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,pressure_msl,wind_speed_10m&timezone=auto";


  const weatherResponse = await fetch(weatherUrl);

  if (!weatherResponse.ok) {
    throw new Error("Weather data could not be loaded.");
  }

  const weatherData = await weatherResponse.json();

  const {
    current,
    current_units
  } = weatherData;


  const code = current.weather_code;

  const weatherInfo =
    weatherCodes[code] || ["Unknown", "🌤️"];


  return {
    name: name,
    country: country,
    region: admin1 || "",

    temperature: current.temperature_2m,

    feelsLike: current.apparent_temperature,

    humidity: current.relative_humidity_2m,

    windSpeed: current.wind_speed_10m,

    pressure: current.pressure_msl,

    condition: weatherInfo[0],

    icon: weatherInfo[1],

    temperatureUnit:
      current_units.temperature_2m,

    windUnit:
      current_units.wind_speed_10m
  };
}