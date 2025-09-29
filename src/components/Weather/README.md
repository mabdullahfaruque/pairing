# Weather Component

Displays current weather information for a searched location.

## Responsibilities
- Present a search input and submit button
- Display loading animation while data is being fetched
- Show error message if provided
- Render current weather metrics when available

The component itself is stateless regarding fetching logic; it receives data via props and raises a callback when the user searches a new location.

## Props
| Name | Type | Required | Description |
|------|------|----------|-------------|
| data | `WeatherData \| null` | Yes | Current weather object or null while none available |
| loading | `boolean` | Yes | Indicates active fetch / shows spinner |
| error | `string \| null \| undefined` | No | Error message to display |
| onSearch | `(query: string) => void` | Yes | Called when user submits a non-empty query |
| locationQuery | `string` | Yes | Current location query string |

## Data Shape
```
interface WeatherData {
  temperature: number; // Celsius
  windspeed: number; // km/h
  winddirection: number; // degrees
  weathercode: number; // Open-Meteo weather code
  time: string; // ISO timestamp
}
```

## Usage
```tsx
<Weather
  data={weather}
  loading={loading}
  error={error}
  onSearch={handleSearch}
  locationQuery={query}
/>
```
