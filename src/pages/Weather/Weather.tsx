import { useCallback, useEffect, useState } from 'react';
import { Weather } from '../../components/Weather';
import type { WeatherData } from '../../components/Weather';

// Helper: geocode location string using Open-Meteo geocoding API
const geocode = async (query: string) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Geocoding failed');
  const data = await res.json();
  if (!data.results || !data.results.length) throw new Error('Location not found');
  const { latitude, longitude, name, country } = data.results[0];
  return { latitude, longitude, label: `${name}${country ? ', ' + country : ''}` };
};

// Helper: fetch current weather for coordinates
const fetchCurrentWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather fetch failed');
  const data = await res.json();
  if (!data.current_weather) throw new Error('No weather data');
  const cw = data.current_weather;
  return {
    temperature: cw.temperature,
    windspeed: cw.windspeed,
    winddirection: cw.winddirection,
    weathercode: cw.weathercode,
    time: cw.time,
  };
};

export const WeatherPage = () => {
  const [query, setQuery] = useState('');
  const [resolvedLocation, setResolvedLocation] = useState<string | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async (q: string) => {
    setQuery(q);
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const loc = await geocode(q);
      setResolvedLocation(loc.label);
      const w = await fetchCurrentWeather(loc.latitude, loc.longitude);
      setData(w);
    } catch (err) {
      console.error('Weather retrieval failed', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Optionally, fetch a default city (commented out to avoid surprise network call)
  // useEffect(() => { performSearch('Sydney'); }, [performSearch]);

  useEffect(() => {
    // Clear displayed location if query changed manually (in component UI we keep them in sync)
    if (!query) {
      setResolvedLocation(null);
      setData(null);
      setError(null);
    }
  }, [query]);

  return (
    <div className="flex flex-col items-center justify-start min-h-[60vh] w-full pt-6">
      <Weather
        data={data}
        loading={loading}
        error={error}
        onSearch={performSearch}
        locationQuery={query}
        resolvedLabel={resolvedLocation}
      />
    </div>
  );
};
