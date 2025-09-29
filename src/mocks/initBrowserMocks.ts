// src/mocks/initBrowserMocks.ts
if (import.meta.env.DEV && import.meta.env.VITE_USE_MSW === 'true') {
  import('./browser').then(({ worker }) => {
    worker.start();
  });
}
