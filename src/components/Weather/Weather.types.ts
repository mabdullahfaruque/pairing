export interface WeatherData {
  temperature: number; // Celsius
  windspeed: number; // km/h
  winddirection: number; // degrees
  weathercode: number; // Open-Meteo weather code
  time: string; // ISO timestamp of the reading
}

export interface WeatherProps {
  /** Current weather data to display */
  data: WeatherData | null;
  /** True while a fetch is in progress */
  loading: boolean;
  /** Optional error message */
  error?: string | null;
  /** Callback when a new location is submitted */
  onSearch: (query: string) => void;
  /** The current location query */
  locationQuery: string;
  /** Display label of the resolved location (e.g., City, Country) */
  resolvedLabel?: string | null;
}
