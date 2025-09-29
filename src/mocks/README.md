// src/mocks/README.md
# Mock Service Worker Setup

This directory contains the setup for Mock Service Worker (MSW) to mock API endpoints during development and testing.

- `handlers.ts`: Defines request handlers for mocking API endpoints.
- `browser.ts`: Sets up the service worker for browser environments (development).
- `server.ts`: Sets up the server for Node.js environments (testing).

## Usage

- In development, import and start the worker from `browser.ts` before your app renders.
- In tests, import and start the server from `server.ts` in your test setup.

See the [MSW documentation](https://mswjs.io/docs/) for more details.
