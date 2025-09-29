This is a React app in typescript created by vite using the latest tailwindcss version 4.

## Project structure
- `.github/`: GitHub configuration and instructions.
- `src/`: Source code of the app.
  - `components/`: Reusable components, each in its own directory:
    - `{{componentName}}.tsx`
    - `{{componentName}}.test.tsx`
    - `{{componentName}}.types.ts`
    - `index.ts`
    - `README.md`
  - `layouts/`: Layout components.
  - `pages/`: Page components.
  - `styles/`: Global styles and Tailwind CSS configuration.
  - `utils/`: Utility functions and helpers.
  - `hooks/`: Custom React hooks.
  - `context/`: Context providers for state management.
  - `assets/`: Static assets (images, icons).
  - `routes/`: Route definitions.
  - `App.tsx`: Main app component.
  - `main.tsx`: Entry point.
  - `index.css`: Main CSS file (imports Tailwind CSS).
- `public/`: Static files served directly.
- `index.html`: Main HTML file.
- `package.json`: Project metadata and dependencies.
- `vite.config.ts`: Vite configuration.
- `tsconfig.json`: TypeScript configuration.
- `.gitignore`: Git ignore rules.
- `README.md`: Project documentation.

Tailwind CSS v4 is used; no additional Tailwind config files are needed.

## Code style and structure

- Use ESM not CommonJS
- Use `npm` for package management.
- When installing packages, use `npm install` instead of `yarn` or `pnpm`.
- When installing packages, prefer the most recent stable version using fetch to get the latest version.
- When exporting a module, use named exports instead of default exports.
- Use accessibility best practices, such as using semantic HTML elements and ARIA attributes
- Use meaningful names for variables and functions.
- The code is written in a way that it is easy to understand.
- The code is written in a way that it is easy to maintain.
- The code is written in a way that it is easy to test.
- Always check for updates to dependencies regularly.
- Use `npm run dev` to start the development server.
- Use `npm run build` to build the app for production.
- Use `npm run preview` to preview the production build.
- Use `npm run lint` to run the linter.
- Use `npm run format` to format the code.
- Use `npm run test` to run the tests.
- Use comments to explain complex logic or important areas of code.
- Use async/await for asynchronous operations.
- Use vitest for unit tests.
- Use arrow functions for event handlers and callbacks.
- Use arrow functions instead of functions.
- Use arrow functions instead of older React.FC syntax.
- Use functional components instead of class components.
- Use hooks for state management and side effects.
- Use TypeScript for type safety.
- Use `useState` and `useEffect` hooks for state and lifecycle management.
- Use `useContext` for context management.
- Use `useReducer` for complex state management.
- Use `useRef` for accessing DOM elements or storing mutable values.
- Use `useMemo` and `useCallback` for performance optimization.
- Use `useLayoutEffect` for synchronously running effects after DOM mutations.
- Use `import` instead of `require`.
- Use `export` instead of `module.exports`.
- Use `async/await` for asynchronous operations.
- Use `Promise.all` for parallel asynchronous operations.
- Use `try/catch` for error handling.
- Use `console.error` for error logging.
- Use `console.warn` for warnings.
- Use `console.info` for informational messages.
- Use `console.debug` for debugging messages.

Answer all questions concisely without apologies or filler phrases.
