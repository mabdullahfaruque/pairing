import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hello } from './Hello';

describe('Hello', () => {
  it('renders the greeting with the provided name', () => {
    render(<Hello name="World" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello, World!');
  });
});
