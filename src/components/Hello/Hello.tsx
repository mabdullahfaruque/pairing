import { useState } from 'react';
import type { HelloProps } from './Hello.types';

/**
 * Renders a simple greeting message.
 */
export const Hello = ({ name, greeting = 'Hello' }: HelloProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <section
      aria-label="greeting"
      className="p-8 rounded-2xl border border-token shadow transition-all text-center surface max-w-md mx-auto hover:shadow-lg focus-within:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1
        className={`text-4xl font-bold mb-2 text-[var(--color-text)] tracking-tight transition-transform ${isHovered ? 'scale-105' : ''}`}
      >
        {greeting}, {name}!
      </h1>
      <p className="text-lg text-subtle">Welcome to your React app</p>
      <div className="mt-6 flex justify-center">
        <span className="badge-secondary" aria-label="Cheerful badge">Cheerful</span>
      </div>
    </section>
  );
};
