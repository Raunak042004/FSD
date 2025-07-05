import React, { useState, useEffect } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('Delhi');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = 'YOUR_API_KEY';

  const fetchWeather = async () => {
    try {
      setError('');
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`
      );
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      setSearch(city.trim());
    }
  };

  return (
    <div style={{
      textAlign: 'center',
      marginTop: '50px',
      fontFamily: 'Segoe UI, sans-serif',
      padding: '20px'
    }}>
      <h1>🌤️ Live Weather App</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '250px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            fontSize: '16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#007BFF',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </form>

      {loading && <p>Loading weather...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={{
          border: '1px solid #ddd',
          display: 'inline-block',
          padding: '20px',
          borderRadius: '12px',
          backgroundColor: '#f9f9f9',
          marginTop: '20px'
        }}>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p><strong>🌡️ Temp:</strong> {weather.main.temp}°C</p>
          <p><strong>🌥️ Weather:</strong> {weather.weather[0].main}</p>
          <p><strong>💨 Wind:</strong> {weather.wind.speed} m/s</p>
          <p><strong>💧 Humidity:</strong> {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default App;
