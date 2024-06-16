import React, { useEffect, useState } from "react";
import "./index.css"; // Import the CSS file for styling

function App() {
  const API_KEY = "5744881b4ea2969ca73a799f4b46f452";

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    // Function to update current date and time every second
    const interval = setInterval(() => {
      const now = new Date();
      const day = now.getDate();
      const month = now.toLocaleString("default", { month: "short" });
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const dateTimeString = `${day} ${month}, ${time}`;
      setCurrentDateTime(dateTimeString);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    fetchWeather();
  };

  const fetchWeather = () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(weatherUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setWeather(null);
      });
  };

  return (
    <div className="app-container">
      <div className="weather-card">
        <div className="weather-header">
          <h1 className="title">Weather</h1>
          <p className="date-time">{currentDateTime}</p>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        {error && <p className="error-message">{error.message}</p>}

        {weather && (
          <div className="weather-info">
            <h2 className="weather-title">{weather.name}</h2>
            <p className="temperature">{Math.round(weather.main.temp)}°C</p>
            <p className="description">{weather.weather[0].description}</p>
            <div className="details">
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
