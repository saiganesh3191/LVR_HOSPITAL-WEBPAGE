import { expect, test } from "@playwright/test";

test("gallery filters photos and opens an accessible viewer", async ({ page }) => {
  await page.goto("/gallery");
  const tiles = page.locator(".gallery-tile");
  await expect(tiles).toHaveCount(31);

  await page.getByRole("button", { name: "Team celebrations" }).click();
  await expect(tiles).toHaveCount(12);
  await expect(page.locator(".gallery-context")).toContainText("The people behind LVR");

  await tiles.first().click();
  const viewer = page.getByRole("dialog", { name: "Gallery photo viewer" });
  await expect(viewer).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(viewer).toBeHidden();
});

test("gallery stays fast and usable on mobile", async ({ page }) => {
  const videoRequests: string[] = [];
  page.on("request", request => { if (request.url().endsWith(".mp4")) videoRequests.push(request.url()); });
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/gallery");

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator("video")).toHaveCount(2);
  await expect(page.locator("video").first()).toHaveAttribute("preload", "none");
  expect(videoRequests).toEqual([]);
});
