import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Weather } from './Weather';
import type { WeatherData } from './Weather.types';

const sample: WeatherData = {
  temperature: 21.3,
  windspeed: 12,
  winddirection: 250,
  weathercode: 3,
  time: new Date().toISOString()
};

describe('Weather component', () => {
  it('renders loading spinner', () => {
    render(<Weather data={null} loading={true} error={null} onSearch={() => {}} locationQuery="" />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders data', () => {
    render(<Weather data={sample} loading={false} error={null} onSearch={() => {}} locationQuery="Sydney" />);
    expect(screen.getByText(/Temperature/i)).toBeInTheDocument();
    expect(screen.getByText(/Conditions/i)).toBeInTheDocument();
  });

  it('submits search', () => {
    const mockSearch = vi.fn();
    render(<Weather data={null} loading={false} error={null} onSearch={mockSearch} locationQuery="" />);
    const input = screen.getByLabelText(/location search input/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Berlin' } });
    fireEvent.submit(input.closest('form')!);
    expect(mockSearch).toHaveBeenCalledWith('Berlin');
  });
});
