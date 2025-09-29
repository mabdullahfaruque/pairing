import { useState } from 'react';
import type { WeatherProps } from './Weather.types';

// Simple mapping of Open-Meteo weather codes to descriptions
const weatherCodeMap: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm with heavy hail'
};

/**
 * Weather component responsible purely for presentation of weather data
 * and user input for location search.
 */
export const Weather = ({ data, loading, error, onSearch, locationQuery, resolvedLabel }: WeatherProps) => {
  const [input, setInput] = useState(locationQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  const description = data ? weatherCodeMap[data.weathercode] || 'Unknown conditions' : null;

  return (
    <section aria-label="weather" className="p-6 rounded-2xl border border-token shadow surface max-w-lg w-full mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-4 text-[var(--color-primary)]">Weather</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4" aria-label="location search form">
        <label htmlFor="location" className="sr-only">Location</label>
        <input
          id="location"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city or place"
          className="flex-1 px-3 py-2 rounded border border-token bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          aria-label="Location search input"
        />
        <button type="submit" className="btn-base btn-primary" aria-label="Search weather">Search</button>
      </form>

      {loading && (
        <div role="status" aria-live="polite" className="flex flex-col items-center gap-2 py-6" data-testid="loading">
          <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" aria-hidden="true" />
          <span className="text-subtle">Loading weather...</span>
        </div>
      )}

      {error && !loading && (
        <p className="text-[var(--color-danger)] font-semibold" role="alert">{error}</p>
      )}

      {data && !loading && !error && (
        <div className="space-y-2" aria-label="weather results">
          {resolvedLabel && (
            <p className="text-lg" aria-label="resolved location"><span className="font-semibold">Location:</span> {resolvedLabel}</p>
          )}
          <p className="text-lg"><span className="font-semibold">Temperature:</span> {data.temperature.toFixed(1)}°C</p>
          <p className="text-lg"><span className="font-semibold">Wind:</span> {data.windspeed} km/h at {data.winddirection}°</p>
          <p className="text-lg"><span className="font-semibold">Conditions:</span> {description}</p>
          <p className="text-xs text-subtle" aria-label="observation time">Observed at {new Date(data.time).toLocaleTimeString()}</p>
        </div>
      )}
    </section>
  );
};
