import { render, screen, waitFor } from '@testing-library/react';
import { AboutPage } from './About';

describe('AboutPage', () => {
  it('renders About heading and eventually shows version (or error)', async () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
    // Wait for either version span or error to appear, resolving act warnings by awaiting state updates
    await waitFor(() => {
      const versionEl = screen.queryByLabelText(/application version/i);
      const errorEl = screen.queryByText(/could not load version info/i);
      expect(versionEl || errorEl).not.toBeNull();
    });
  });
});
