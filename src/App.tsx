import { HashRouter, NavLink } from 'react-router-dom';
import { AppRoutes } from './routes';

const navLinkClass = ({ isActive }: { isActive: boolean }) => {
  const base = 'px-4 py-2 rounded font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]';
  const active = 'bg-[var(--color-primary)] text-[var(--color-primary-contrast)] shadow-lg';
  const inactive = 'text-[var(--color-primary-contrast)]/90 bg-[var(--color-primary)]/70 hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-contrast)]';
  return `${base} ${isActive ? active : inactive}`;
};

const App = () => (
  <HashRouter>
    <header className="w-full flex justify-start py-5 bg-[var(--color-primary)] shadow-lg mb-0 animate-fade-in dark:shadow-blue-900/40">
      <nav className="flex gap-4 w-full max-w-5xl mx-auto px-4" aria-label="Primary Navigation">
        <NavLink to="/" end className={navLinkClass} aria-label="Home">Hello</NavLink>
        <NavLink to="/about" className={navLinkClass} aria-label="About">About</NavLink>
        <NavLink to="/weather" className={navLinkClass} aria-label="Weather">Weather</NavLink>
      </nav>
    </header>
    <main
      id="main-content"
      className="flex-1 flex flex-col items-center justify-center animate-fade-in min-h-[60vh] w-full transition-colors duration-500 -mt-2 bg-gradient-to-br from-[var(--color-bg)] via-[var(--color-bg-alt)] to-[var(--color-surface-alt)]"
    >
      <section className="w-full max-w-3xl rounded-2xl shadow-xl p-8 surface/90 dark:surface backdrop-blur-md border border-token" aria-labelledby="app-section-heading">
        <AppRoutes />
      </section>
    </main>
  </HashRouter>
);

export { App };
