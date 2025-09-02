import React, { useState } from "react";
import { fetchWeather } from "../api";

export default function WeatherCard() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCheck() {
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWeather(city.trim());
      setData(res);
    } catch (e) {
      setError("Failed to fetch weather data. Please check the city name and try again.");
      setData(null);
    }
    setLoading(false);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && city.trim() && !loading) {
      handleCheck();
    }
  };

  const getWeatherIcon = (condition) => {
    const lowerCondition = condition?.toLowerCase() || '';
    if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) return '☀️';
    if (lowerCondition.includes('cloud')) return '☁️';
    if (lowerCondition.includes('rain')) return '🌧️';
    if (lowerCondition.includes('storm')) return '⛈️';
    if (lowerCondition.includes('snow')) return '❄️';
    if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) return '🌫️';
    return '🌤️';
  };

  const getTemperatureColor = (temp) => {
    if (temp >= 35) return '#ef4444'; // Red for hot
    if (temp >= 25) return '#f97316'; // Orange for warm
    if (temp >= 15) return '#22c55e'; // Green for mild
    if (temp >= 5) return '#3b82f6';  // Blue for cool
    return '#6366f1'; // Indigo for cold
  };

  return (
    <div className="app-card">
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '20px',
        paddingBottom: '12px',
        borderBottom: '2px solid #f1f5f9'
      }}>
        <span style={{ fontSize: '24px', marginRight: '12px' }}>🌤️</span>
        <h2 style={{ margin: 0, color: '#1e293b', fontSize: '24px', fontWeight: '600' }}>
          Weather Forecast
        </h2>
      </div>

      {/* Search Section */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <input 
            value={city} 
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name (e.g., Mumbai, Delhi, Bangalore)" 
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              fontSize: '14px',
              transition: 'border-color 0.2s ease',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#16a34a'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
          <span style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#64748b',
            fontSize: '16px'
          }}>🔍</span>
        </div>
        
        <button 
          onClick={handleCheck} 
          disabled={!city.trim() || loading}
          style={{
            background: loading || !city.trim() ? '#94a3b8' : '#16a34a',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: loading || !city.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            if (!loading && city.trim()) {
              e.target.style.background = '#15803d';
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading && city.trim()) {
              e.target.style.background = '#16a34a';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          {loading ? (
            <>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid #ffffff30',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Checking...
            </>
          ) : (
            <>🌡️ Get Weather</>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          background: '#fee2e2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>❌</span>
          <span style={{ color: '#dc2626', fontSize: '14px' }}>{error}</span>
        </div>
      )}

      {/* Weather Data */}
      {data && !error && (
        <div style={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid #ffffffff'
        }}>
          {/* Location Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '1px solid #bae6fd'
          }}>
            <div>
              <h3 style={{ 
                margin: 0, 
                fontSize: '20px', 
                fontWeight: '700', 
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                📍 {data.city}, {data.country}
              </h3>
              <p style={{ 
                margin: '4px 0 0 0', 
                color: '#64748b', 
                fontSize: '14px' 
              }}>
                Current conditions
              </p>
            </div>
            <div style={{ fontSize: '48px' }}>
              {getWeatherIcon(data.condition)}
            </div>
          </div>

          {/* Weather Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {/* Temperature */}
            <div style={{
              background: 'white',
              borderRadius: '10px',
              padding: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span>🌡️</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>Temperature</span>
              </div>
              <div style={{ 
                fontSize: '28px', 
                fontWeight: '700', 
                color: getTemperatureColor(data.temp_c),
                marginBottom: '4px'
              }}>
                {data.temp_c}°C
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Feels like {data.feels_like_c}°C
              </div>
            </div>

            {/* Humidity */}
            <div style={{
              background: 'white',
              borderRadius: '10px',
              padding: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span>💧</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>Humidity</span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#3b82f6', marginBottom: '4px' }}>
                {data.humidity}%
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                {data.humidity > 70 ? 'High humidity' : data.humidity > 40 ? 'Moderate' : 'Low humidity'}
              </div>
            </div>

            {/* Condition */}
            <div style={{
              background: 'white',
              borderRadius: '10px',
              padding: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              gridColumn: 'span 2'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span>🌤️</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>Conditions</span>
              </div>
              <div style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                color: '#1e293b',
                textTransform: 'capitalize'
              }}>
                {data.condition}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid #bae6fd',
            fontSize: '12px',
            color: '#64748b',
            textAlign: 'center'
          }}>
            🕐 Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      )}

      {/* Add CSS for loading animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}