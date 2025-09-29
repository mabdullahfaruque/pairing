import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { WeatherPage } from './Weather';

// Mock fetch globally
const mockFetch = vi.fn();

const geocodeResponse = {
  results: [ { latitude: -33.87, longitude: 151.21, name: 'Sydney', country: 'Australia' } ]
};

const weatherResponse = {
  current_weather: {
    temperature: 22.5,
    windspeed: 10,
    winddirection: 200,
    weathercode: 1,
    time: new Date().toISOString()
  }
};

describe('WeatherPage', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    // first call geocode, second call weather
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => geocodeResponse })
      .mockResolvedValueOnce({ ok: true, json: async () => weatherResponse });
  (globalThis as unknown as { fetch: typeof fetch }).fetch = mockFetch as unknown as typeof fetch;
  });

  it('searches and displays weather', async () => {
    render(<WeatherPage />);
    const input = screen.getByLabelText(/location search input/i);
    fireEvent.change(input, { target: { value: 'Sydney' } });
    fireEvent.submit(input.closest('form')!);

    expect(screen.getByTestId('loading')).toBeInTheDocument();

  await waitFor(() => expect(screen.getByLabelText(/resolved location/i)).toBeInTheDocument());
  });

  it('handles geocode failure', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
    mockFetch.mockReset();
    mockFetch.mockResolvedValueOnce({ ok: false });
  (globalThis as unknown as { fetch: typeof fetch }).fetch = mockFetch as unknown as typeof fetch;
    render(<WeatherPage />);
    const input = screen.getByLabelText(/location search input/i);
    fireEvent.change(input, { target: { value: 'Nowhere' } });
    fireEvent.submit(input.closest('form')!);
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    } finally {
      errorSpy.mockRestore();
    }
  });
});
