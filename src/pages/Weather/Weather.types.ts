// Explicit zero-props contract. Use Record<string, never> instead of an empty interface to satisfy lint rules.
// Extend later if page-level props are needed (add keys here when required).
export type WeatherPageProps = Record<string, never>;
