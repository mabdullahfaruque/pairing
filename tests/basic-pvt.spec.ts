import { test, expect } from "@playwright/test";

const PAGE_TITLE = "gse.react-play.template";

test("should start at home page and navigate to About page and display correct content", async ({
  page,
}) => {
  // Navigate to homepage
  await page.goto("");
  // get the page title and assert it is correct
  const pageTitle = await page.title();
  console.log("Page title:", pageTitle);
  expect(pageTitle).toBe(PAGE_TITLE);
  await expect(page.locator("body")).toBeVisible();
  // pause for a few seconds to allow the page to load
  await page.waitForTimeout(2000);
  // Take a screenshot and save it in the screenshots folder
  await page.screenshot({ path: "test-results/screenshots/homepage.png", fullPage: true });
  // Click the About link in the navigation bar
  await page.getByRole("link", { name: "About" }).click();
  // Assert that the About page heading is visible
  await expect(page.getByRole("heading", { name: "About", level: 1 })).toBeVisible();
});
