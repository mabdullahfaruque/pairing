import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { App } from './App';

describe('App Background Color', () => {
  beforeEach(() => {
    // Clean up any existing styles
    document.documentElement.className = '';
    // Ensure CSS is loaded by importing the stylesheet
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = '/src/index.css';
    document.head.appendChild(linkElement);
  });

  it('should have light blue background classes applied to main content', () => {
    const { container } = render(<App />);
    
    // Find the main element with background gradient
    const mainElement = container.querySelector('main');
    expect(mainElement).toBeInTheDocument();
    
    // Check that it has the gradient classes that will use the light blue variables
    expect(mainElement).toHaveClass('bg-gradient-to-br');
    expect(mainElement).toHaveClass('from-[var(--color-bg)]');
    expect(mainElement).toHaveClass('via-[var(--color-bg-alt)]');
    expect(mainElement).toHaveClass('to-[var(--color-surface-alt)]');
  });

  it('should maintain proper structure for light blue background application', () => {
    const { container } = render(<App />);
    
    // Check that the main content area exists and has proper structure
    const mainElement = container.querySelector('main');
    const sectionElement = container.querySelector('section');
    
    expect(mainElement).toBeInTheDocument();
    expect(sectionElement).toBeInTheDocument();
    
    // Main should have the background gradient classes
    expect(mainElement).toHaveClass('bg-gradient-to-br');
    
    // Section should have surface classes for proper contrast
    expect(sectionElement).toHaveClass('surface/90');
  });

  it('should maintain accessibility contrast with background changes', () => {
    const { container } = render(<App />);
    
    // Check that text elements are still visible and accessible
    const heading = container.querySelector('h1');
    const paragraph = container.querySelector('p');
    
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    
    // These elements should maintain their readability
    expect(heading).toBeVisible();
    expect(paragraph).toBeVisible();
  });

  it('should have proper semantic structure for background styling', () => {
    const { container } = render(<App />);
    
    // Check that the HTML structure supports the background changes
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    expect(htmlElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
    
    // The main element should be present for background application
    const mainElement = container.querySelector('main#main-content');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveAttribute('id', 'main-content');
  });

  it('should support dark mode class for theme switching', () => {
    // Apply dark mode class
    document.documentElement.className = 'dark';
    
    const { container } = render(<App />);
    
    // Main element should still have the proper structure
    const mainElement = container.querySelector('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('bg-gradient-to-br');
    
    // Section should have dark mode classes
    const sectionElement = container.querySelector('section');
    expect(sectionElement).toHaveClass('dark:surface');
  });

  it('should maintain navigation header styling with background changes', () => {
    const { container } = render(<App />);
    
    // Check that navigation is properly styled
    const headerElement = container.querySelector('header');
    const navElement = container.querySelector('nav');
    
    expect(headerElement).toBeInTheDocument();
    expect(navElement).toBeInTheDocument();
    
    // Header should maintain its primary color background
    expect(headerElement).toHaveClass('bg-[var(--color-primary)]');
    
    // Navigation should have proper ARIA label
    expect(navElement).toHaveAttribute('aria-label', 'Primary Navigation');
  });
});