import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('CSS Background Color Changes', () => {
  const cssPath = join(__dirname, 'index.css');
  
  it('should have light blue background colors defined in CSS', () => {
    const cssContent = readFileSync(cssPath, 'utf-8');
    
    // Check that the light blue background colors are defined
    expect(cssContent).toContain('--color-bg: #f0f8ff');
    expect(cssContent).toContain('--color-bg-alt: #e6f3ff');
    expect(cssContent).toContain('--color-surface-alt: #ddeeff');
    expect(cssContent).toContain('--color-border: #c3d9ef');
  });

  it('should maintain white surface color for proper contrast', () => {
    const cssContent = readFileSync(cssPath, 'utf-8');
    
    // Surface should remain white for good contrast
    expect(cssContent).toContain('--color-surface: #ffffff');
  });

  it('should maintain dark mode colors that complement light blue theme', () => {
    const cssContent = readFileSync(cssPath, 'utf-8');
    
    // Dark mode should maintain its existing blue-based colors
    expect(cssContent).toContain('--color-bg: #0f172a');
    expect(cssContent).toContain('--color-bg-alt: #1e293b');
  });

  it('should have proper CSS comments describing the color changes', () => {
    const cssContent = readFileSync(cssPath, 'utf-8');
    
    // Check for descriptive comments
    expect(cssContent).toContain('Very light blue background');
    expect(cssContent).toContain('Subtle light blue tint');
    expect(cssContent).toContain('Light blue accent surface');
    expect(cssContent).toContain('Light blue border with sufficient contrast');
  });

  it('should apply background gradients using the new color variables', () => {
    const cssContent = readFileSync(cssPath, 'utf-8');
    
    // Background gradients should use the CSS custom properties
    expect(cssContent).toContain('background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-alt) 100%)');
  });

  it('should maintain other color tokens for accessibility', () => {
    const cssContent = readFileSync(cssPath, 'utf-8');
    
    // Important accessibility colors should be maintained
    expect(cssContent).toContain('--color-text:');
    expect(cssContent).toContain('--color-primary:');
    expect(cssContent).toContain('--color-focus:');
  });
});