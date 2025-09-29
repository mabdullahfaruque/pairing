import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { axe } from './test-utils/axe-helper';
import { App } from './App';

describe('App component', () => {
  it('renders the app without errors', () => {
    render(<App />);
  });

  it('shows Weather navigation link', () => {
    const { getByRole } = render(<App />);
    expect(getByRole('link', { name: /weather/i })).toBeInTheDocument();
  });
});

describe('App accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

