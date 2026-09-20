import { existsSync, readFileSync } from "node:fs";
import { test, expect } from "@playwright/test";

test.skip(!process.env.PLAYWRIGHT_BASE_URL, "Run against the built static preview.");

test("exported routes, metadata, and images survive direct visits and refreshes", async ({ page, request }) => {
  for (const route of ["/", "/about", "/doctors/prathyusha", "/departments/gastroenterology", "/facilities", "/patient-guide", "/contact", "/te", "/updates"]) {
    expect((await request.get(route)).status(), route).toBe(200);
    await page.goto(route);
    await page.reload();
    await expect(page.locator("main h1")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
  }

  await page.goto("/doctors/prathyusha");
  await expect(page).toHaveTitle(/Dr\. Prathyusha Papishetty/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  const portrait = page.locator(".doctor-photo-profile img");
  await expect.poll(() => portrait.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  expect(await portrait.getAttribute("src")).toBe("/images/team/prathyusha.webp");
  expect(await page.locator('img[src^="/_next/image"]').count()).toBe(0);

  expect(existsSync("out/index.html")).toBe(true);
  expect(existsSync("out/doctors/prathyusha.html")).toBe(true);
  expect(existsSync("out/appointment.html")).toBe(true);
  expect(readFileSync("out/_headers", "utf8")).toContain("X-Frame-Options: DENY");
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
});

test("appointment query choices and WhatsApp handoff work after a static refresh", async ({ page }) => {
  await page.goto("/appointment?department=nephrology");
  await expect(page.locator("#department")).toHaveValue("nephrology");
  await page.reload();
  await expect(page.locator("#department")).toHaveValue("nephrology");

  await page.goto("/appointment?department=pediatrics&doctor=prathyusha");
  await expect(page.locator("#department")).toHaveValue("dermatology");
  await expect(page.locator("#doctor")).toHaveValue("prathyusha");
  await page.reload();
  await expect(page.locator("#doctor")).toHaveValue("prathyusha");

  await page.locator("#patient-name").fill("Static Site Test");
  await page.locator("#patient-age").fill("29");
  await page.locator("#patient-sex").selectOption("Female");
  await page.locator("#patient-village").fill("Sathupally");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Review appointment request" }).click();
  const href = await page.getByRole("link", { name: "Continue to WhatsApp" }).getAttribute("href");
  expect(new URL(href!).searchParams.get("text")).toContain("Dr. Prathyusha Papishetty");
});
