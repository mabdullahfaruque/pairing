import { configureAxe, toHaveNoViolations } from 'jest-axe';
import { expect } from 'vitest';

// Extend Jest/Vitest's expect with accessibility matchers
expect.extend(toHaveNoViolations);

// Configure axe for your specific needs
export const axe = configureAxe({
  rules: {
    // You can customize specific rules here if needed
    // Example: 'color-contrast': { enabled: true }
  },
});