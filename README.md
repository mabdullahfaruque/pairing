# Play Starter React Project

📖 This is a React Vite app in typescript ready for you to customise and extend and play with to test and learn from.

☑️ It includes:
- Vite
- React
- Typescript
- ESLint
- Vitest
- React Testing Library

➕ Additional features:
- tailwindcss version 4
- react-router
- axe-core for accessibility testing
- normalize.css for styling

## Github features

In the .github folder, I have included some features to help with the development of the project.

- a workflow to lint, build and test the project
- a copilot-instructions.md file to help copilot understand the project
- a pull request template to help with the creation of pull requests
- dependabot to help with the updating of dependencies

## WCAG

### Automated tests

How do we test Web Content Accessibility Guidelines (WCAG) using automation within react apps.

This solution is using 'axe-core' to test the accessibility of the react app.

<https://github.com/dequelabs/axe-core>
<https://www.deque.com/axe/>

### General links about WCAG

- [W3C Accessibility](https://www.w3.org/WAI/)
- [Accessibility Principles](https://www.w3.org/WAI/fundamentals/accessibility-principles/)

## Theme & Accessibility Tokens

The UI uses a cheerful, warm palette defined as CSS custom properties on the `html` element (light + dark) to ensure consistent contrast and easy future theming.

Semantic tokens (light mode values):

| Token | Light | Dark | Purpose / Contrast Notes |
|-------|-------|------|--------------------------|
| `--color-bg` | `#fffaf4` | `#0f172a` | App background gradient start. Body text vs bg ≥ 7:1. |
| `--color-bg-alt` | `#fff3e8` | `#1e293b` | Gradient end / subtle sections. |
| `--color-surface` | `#ffffff` | `#1e293b` | Main surfaces / cards. |
| `--color-surface-alt` | `#ffe8d1` | `#24324a` | Accent surface (badges, alt sections). |
| `--color-border` | `#e2d6cf` | `#334155` | Subtle separators (≥ 3:1 against surface for discernibility). |
| `--color-text` | `#1a1c1e` | `#f1f5f9` | Primary text (≥ 7:1 on surfaces). |
| `--color-text-subtle` | `#5a6068` | `#cbd5e1` | Secondary text (≥ 4.5:1 on backgrounds). |
| `--color-primary` | `#2563eb` | `#60a5fa` | Navigation & primary actions. Contrast vs background & on-button text ≥ 4.5:1. |
| `--color-secondary` | `#f59e0b` | `#fbbf24` | Badges / highlights with dark text in light mode and dark bg in dark mode for ≥ 4.5:1. |
| `--color-accent` | `#9333ea` | `#c084fc` | Accent emphasis. |
| `--color-focus` | `#1d4ed8` | `#93c5fd` | Focus outlines (≥ 3:1 against context per WCAG 2.4.7). |
| `--color-success` | `#15803d` | `#34d399` | Success messaging. |
| `--color-warning` | `#b45309` | `#f59e0b` | Warning messaging. |
| `--color-danger` | `#b91c1c` | `#f87171` | Error messaging. |

Additional a11y considerations:

1. Focus Visibility: All interactive elements rely on `:focus-visible` outlines (`--color-focus`) with sufficient contrast and offset for clear shape recognition.
2. Reduced Motion: `prefers-reduced-motion: reduce` disables non-essential entrance animation.
3. Contrast Ratios: Body text aims for ≥ 7:1 (advisory beyond AA). Secondary text maintains ≥ 4.5:1. Large headings may use colors ≥ 3:1 minimally, but current palette exceeds that.
4. Color Independence: Semantic tokens avoid conveying meaning with hue alone; variants (success/warning/danger) are paired with text and may be extended with icons.
5. Adaptability: Future themes can override only the token block; components reference tokens rather than hard-coded hex values.

Testing tips:
```
npm run dev
# Use browser dev tools to toggle dark mode class `html.dark` manually or via a theme switch (future enhancement)
```

Potential future enhancements:
- Add a theme switcher persisting preference (localStorage + `prefers-color-scheme`).
- Provide a high-contrast mode (AAA oriented) with `--color-high-*` token overrides.
- Integrate automated contrast tests using axe assertions in component tests.


## Additional notes

We are also using 'normalize.css' to help with the styling of the react app.
<https://necolas.github.io/normalize.css>

### Build version metadata (GitHub Pages)

Because GitHub Pages serves only static assets, runtime API routes like `/api/version` are not available. To display the application version on the About page, a build step generates a static file at `public/api/version.json` containing:

```json
{
  "version": "<package.json version>",
  "timestamp": "<ISO build time>",
  "build": "<GitHub run number>",
  "commit": "<Git SHA>"
}
```

Implementation details:
- Script: `scripts/generate-version-file.mjs` runs automatically via the `prebuild` NPM script.
- The hook `useVersion` fetches `import.meta.env.BASE_URL + 'api/version.json'` so it works regardless of the GitHub Pages repository sub-path.
- If the file can't be loaded, an error message is shown and a console error is logged.

To regenerate manually you can run:

```
npm run prebuild
```

This strategy avoids needing a server while still surfacing build metadata to users.

## General included notes about this React Typescript Vite Project

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
