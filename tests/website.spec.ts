import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ reducedMotion: "reduce" });

test("visit drawer traps focus, closes accessibly, and works on mobile", async ({ page }) => {
  await page.goto("/doctors");
  const trigger = page.getByRole("button", { name: "Before your visit" });
  const drawer = page.getByRole("dialog");
  await trigger.click();
  await expect(drawer).toBeVisible();
  await expect(page.getByRole("button", { name: "Close visit guide" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(drawer.getByRole("link", { name: "+91 91349 93499", exact: true })).toBeFocused();
  const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(accessibility.violations.map(item => item.id)).toEqual([]);
  await drawer.evaluate(el => { el.scrollTop = 0; });
  await page.screenshot({ path: "artifacts/visit-drawer-desktop.png" });
  await page.keyboard.press("Escape");
  await expect(drawer).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.mouse.click(10, 300);
  await expect(drawer).not.toBeVisible();
  await page.setViewportSize({ width: 320, height: 740 });
  await expect(trigger).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("button", { name: "Before your visit" }).click();
  await expect(drawer).toBeVisible();
  expect(await drawer.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.screenshot({ path: "artifacts/visit-drawer-mobile.png" });
  await drawer.getByRole("link", { name: "Request an appointment" }).click();
  await expect(page).toHaveURL(/appointment/);
  await expect(drawer).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
});

test("care journey and department motion respect reduced-motion preferences", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.locator(".care-journey").scrollIntoViewIfNeeded();
  await expect(page.locator(".care-journey")).toHaveClass(/journey-entered/);
  await expect(page.locator(".journey-connector>span")).toHaveCSS("animation-name", "journey-draw");
  await page.getByRole("tab", { name: /Dermatology/ }).click();
  await expect(page.locator(".specialty-feature>h3")).toHaveCSS("animation-name", "department-content");
  await page.getByRole("tab", { name: /Nephrology/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Vijesh");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".specialty-feature>h3")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".journey-connector>span")).toHaveCSS("animation-name", "none");
  await page.locator(".visit-section").screenshot({ path: "artifacts/care-journey-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".visit-section").screenshot({ path: "artifacts/care-journey-mobile.png" });
});

test("department explorer supports keyboard navigation and care finder preselects appointments", async ({ page }) => {
  await page.goto("/");
  const tabs = page.getByRole("tab");
  await expect(tabs).toHaveCount(5);
  await tabs.first().focus();
  await page.keyboard.press("ArrowDown");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Prathyusha");
  await page.keyboard.press("End");
  await expect(page.getByRole("tabpanel")).toContainText("Vijesh");
  await page.locator("#care-department").selectOption("pediatrics");
  await page.getByRole("button", { name: "Find my care" }).click();
  await expect(page.locator("#department")).toHaveValue("pediatrics");
});

test("public pages render and all local links resolve", async ({ page, request }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("For the life");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".hero-photo img")).toBeVisible();
  expect(await page.locator(".hero-photo img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await page.screenshot({ path: "artifacts/home-desktop.png", fullPage: true });
  await page.screenshot({ path: "artifacts/home-desktop-viewport.png" });
  const hrefs = await page.locator('a[href^="/"]').evaluateAll(links => [...new Set(links.map(link => link.getAttribute("href")!.split("#")[0]))]);
  for (const href of hrefs) expect((await request.get(href)).status(), href).toBe(200);
  for (const slug of ["general-medicine", "dermatology", "pediatrics", "gastroenterology", "nephrology"]) expect((await request.get(`/departments/${slug}`)).status()).toBe(200);
  for (const slug of ["lakshman-sai", "prathyusha", "chaithanya", "adil-pasha", "vijay-varma"]) expect((await request.get(`/doctors/${slug}`)).status()).toBe(200);
  expect((await request.get("/doctors/unknown")).status()).toBe(404);
  expect((await request.get("/departments/unknown")).status()).toBe(404);
  expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /");
  expect(errors).toEqual([]);
});

test("doctor filtering, search, empty state, and profile selection work", async ({ page }) => {
  await page.goto("/doctors");
  await expect(page.locator(".doctor-card")).toHaveCount(5);
  await page.getByRole("button", { name: "Dermatology", exact: true }).click();
  await expect(page.locator(".doctor-card")).toHaveCount(1);
  await expect(page.locator(".doctor-card")).toContainText("Prathyusha");
  await page.getByRole("textbox", { name: "Search doctors by name or specialty" }).fill("No matching doctor");
  await expect(page.getByRole("heading", { name: "No doctors match your search." })).toBeVisible();
  await page.getByRole("button", { name: "Reset search" }).click();
  await expect(page.locator(".doctor-card")).toHaveCount(5);
  await page.getByRole("textbox", { name: "Search doctors by name or specialty" }).fill("Lakshman");
  await expect(page.locator(".doctor-card")).toHaveCount(1);
  await page.getByRole("link", { name: "Request appointment", exact: true }).click();
  await expect(page.getByLabel("Department", { exact: false })).toHaveValue("general-medicine");
  await expect(page.getByLabel("Preferred doctor", { exact: false })).toHaveValue("lakshman-sai");
});

test("appointment validation, dependent doctor choice, review and WhatsApp payload", async ({ page }) => {
  await page.goto("/appointment?doctor=prathyusha");
  await expect(page.locator("#department")).toHaveValue("dermatology");
  await expect(page.locator("#doctor")).toHaveValue("prathyusha");
  await page.getByRole("button", { name: "Review appointment request" }).click();
  await expect(page.locator("#patient-name")).toBeFocused();
  await page.locator("#patient-name").fill("Website Test Patient");
  await page.locator("#patient-age").fill("32");
  await page.locator("#patient-sex").selectOption("Prefer not to say");
  await page.locator("#patient-village").fill("Test Town & Village");
  await page.locator("#department").selectOption("pediatrics");
  await expect(page.locator("#doctor")).toHaveValue("");
  await page.locator("#doctor").selectOption("chaithanya");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Review appointment request" }).click();
  await expect(page.getByText("Nothing has been sent yet.", { exact: false })).toBeVisible();
  await expect(page.locator(".review-details")).toContainText("Pediatrics");
  const href = await page.getByRole("link", { name: "Continue to WhatsApp" }).getAttribute("href");
  const url = new URL(href!);
  expect(url.origin).toBe("https://wa.me");
  expect(url.pathname).toBe("/919791039302");
  expect(url.searchParams.get("text")).toContain("Patient name: Website Test Patient");
  expect(url.searchParams.get("text")).toContain("Test Town & Village");
  expect(url.searchParams.get("text")).toContain("Dr. K. Chaithanya");
  expect(url.searchParams.get("text")).toContain("not a confirmed appointment");
  const reviewAccessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(reviewAccessibility.violations.map(item => item.id)).toEqual([]);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "artifacts/appointment-review.png", fullPage: true });
  await page.getByRole("button", { name: "Edit my details" }).click();
  await expect(page.locator("#patient-name")).toHaveValue("Website Test Patient");
  await page.locator("#preferred-date").fill("2020-01-01");
  await page.getByRole("button", { name: "Review appointment request" }).click();
  expect(await page.locator("#preferred-date").evaluate((input: HTMLInputElement) => input.validity.rangeUnderflow)).toBe(true);
  await page.reload();
  await expect(page.locator("#patient-name")).toHaveValue("");
});

test("mobile navigation, FAQ, page layouts and overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "artifacts/home-mobile.png", fullPage: true });
  await page.screenshot({ path: "artifacts/home-mobile-viewport.png" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  const mobileAccessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(mobileAccessibility.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) }))).toEqual([]);
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Patient guide" }).click();
  await expect(page).toHaveURL(/patient-guide/);
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);
  await page.getByText("How do I book an appointment?", { exact: true }).click();
  await expect(page.locator("details[open]")).toContainText("confirm the doctor");
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/doctors", "/appointment", "/contact", "/departments/pediatrics", "/departments/gastroenterology", "/doctors/prathyusha"]) {
      await page.goto(route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow, `${route} overflows at ${width}px`).toBe(false);
    }
  }
});

test("key pages have no WCAG A/AA accessibility violations", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const route of ["/", "/about", "/doctors", "/appointment", "/contact", "/patient-guide", "/departments/dermatology", "/doctors/prathyusha"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect.soft(results.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })), route).toEqual([]);
  }
});


test("photo viewer opens, zooms, closes and restores keyboard focus", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Enlarge LVR Hospital exterior" });
  await trigger.click();
  const viewer = page.getByRole("dialog", { name: "LVR Hospital exterior" });
  await expect(viewer).toBeVisible();
  await expect(viewer.getByRole("button", { name: "Close image viewer" })).toBeFocused();
  await viewer.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect(viewer.getByRole("button", { name: "Fit image to screen" })).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Escape");
  await expect(viewer).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Enlarge LVR Hospital exterior" }).click();
  const poster = page.getByRole("dialog", { name: "LVR Hospital exterior" });
  await expect(poster).toBeVisible();
  await expect.poll(() => poster.locator("img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(accessibility.violations.map(item => item.id)).toEqual([]);
  await poster.getByRole("button", { name: "Close image viewer" }).click();
  await expect(poster).not.toBeVisible();
});


test("expanded hospital information is consistent and accessible", async ({ page }) => {
  for (const route of ["/facilities", "/careers", "/doctors/lakshman-sai", "/doctors/prathyusha"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations.map(item => item.id), route).toEqual([]);
    await page.setViewportSize({ width: 320, height: 800 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), route).toBe(true);
  }
  await page.goto("/doctors/prathyusha");
  await expect(page.getByRole("heading", { name: "Dr. Prathyusha Papishetty", exact: true })).toBeVisible();
  await expect(page.getByText("Monday-Saturday: 10:00 AM-2:30 PM and 6:00-8:30 PM")).toBeVisible();
  await expect(page.getByText("Osmania Medical College, Hyderabad")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("9963123307");
  await page.goto("/contact");
  await expect(page.getByRole("link", { name: "Open in Google Maps" })).toHaveAttribute("href", "https://share.google/nkkOCsoriPZYjuOPx");
  await expect(page.locator('a[href="mailto:lakshmansaivanama@gmail.com"]').first()).toBeVisible();
});

test("desktop phone action copies the number and offers the calling app", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async (value: string) => { (window as Window & { copiedNumber?: string }).copiedNumber = value; } },
    });
  });
  await page.getByRole("link", { name: /Prefer a conversation/ }).click();
  await expect(page.getByRole("status")).toContainText("Number copied");
  expect(await page.evaluate(() => (window as Window & { copiedNumber?: string }).copiedNumber)).toBe("+919134993499");
  await expect(page.getByRole("status").getByRole("link", { name: "Use calling app" })).toHaveAttribute("href", "tel:+919134993499");
  await page.getByRole("button", { name: "Dismiss phone notice" }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
});

test("visitor search finds profiles and the Telugu guide", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search the website" }).click();
  const dialog = page.getByRole("dialog", { name: "Search LVR Hospital" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("textbox", { name: "Search LVR Hospital" }).fill("Vijesh");
  await expect(dialog.getByRole("link", { name: /Dr. Vijesh Varma/ })).toBeVisible();
  await dialog.getByRole("link", { name: /Dr. Vijesh Varma/ }).click();
  await expect(page).toHaveURL(/\/doctors\/vijay-varma$/);
  await page.goto("/te");
  await expect(page.getByRole("heading", { name: /మీ కుటుంబానికి/ })).toBeVisible();
  await page.goto("/updates");
  await expect(page.getByText("There are no current announcements.")).toBeVisible();
});

test("client-approved doctor details and bed count appear on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const route of ["/", "/doctors", "/doctors/prathyusha", "/facilities", "/about"]) {
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
  }
  await expect(page.getByText("Hospital beds, including 8 ICU beds")).toBeVisible();
  await expect(page.getByText("20", { exact: true })).toBeVisible();
  await page.goto("/doctors/prathyusha");
  for (const image of [page.locator(".site-header img"), page.locator(".doctor-photo-profile img")]) {
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
  await expect(page.getByText(/Dermatology, Venereology & Leprosy.*Gold Medalist/)).toBeVisible();
  await expect(page.getByText("Hair fall and scalp concerns")).toBeVisible();
  await expect(page.getByText("Nail conditions")).toBeVisible();
  await expect(page.getByText("Sexually transmitted infections (STIs)")).toBeVisible();
  await page.goto("/doctors");
  await expect(page.getByText("Available 24/7 — call reception to arrange your consultation")).toHaveCount(2);
  await expect(page.getByText("Consultant visits — call to confirm the next available date")).toHaveCount(2);
});
