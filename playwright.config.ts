import "dotenv/config"; // Add this line to load .env variables
import { defineConfig, devices } from "@playwright/test";

// choose https or http. If you are dev testing auth with a local server you will want https, else
// you can use http as the default. When playwright is run in CI, it will use the BASE_URL environment variable
// uncomment whichever you want to use, and comment the other one out.

// const localBaseUrlDefault = "https://localhost:5173/"; // shall we use https?
const localBaseUrlDefault = "http://localhost:5173/"; // shall we use http?
const baseUrl = process.env.BASE_URL || localBaseUrlDefault;

// Determine if we should start the dev server
// If BASE_URL is set to an external URL (deployed site), don't start the dev server
// If BASE_URL is not set or is localhost, start the dev server
const isExternalUrl = process.env.BASE_URL && !process.env.BASE_URL.includes("localhost");
const webServerConfig = isExternalUrl ? undefined : {
  command: "npm run dev",
  url: baseUrl, // Reuse the resolved base URL (env BASE_URL overrides local default)
  reuseExistingServer: !process.env.CI, // Speeds up local re-runs
  timeout: 30_000,
};

// Log the configuration to verify it's being set correctly
console.info("Playwright using env BASE_URL:", baseUrl);
console.info("Is external URL (won't start dev server):", isExternalUrl);
if (webServerConfig) {
  console.info("Will start dev server with command:", webServerConfig.command);
} else {
  console.info("Will NOT start dev server - testing against external URL");
}

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  // Conditionally start the Vite dev server for E2E tests
  // When testing against deployed sites (external URLs), don't start the dev server
  // When testing locally or without BASE_URL set, start the dev server
  webServer: webServerConfig,
  use: {
    baseURL: baseUrl,
    trace: "on-first-retry",
    headless: true,
    ignoreHTTPSErrors: true,
    ...devices["Desktop Chrome"],
  },
});
