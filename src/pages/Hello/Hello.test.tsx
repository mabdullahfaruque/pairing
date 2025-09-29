import { render, screen } from '@testing-library/react';
import { HelloPage } from './Hello';

describe('HelloPage', () => {
  it('renders Hello component', () => {
    render(<HelloPage />);
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });
});
