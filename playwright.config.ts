import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: "artifacts/test-results",
  fullyParallel: false,
  workers: 1,
  timeout: 120_000,
  use: { baseURL: "http://localhost:3000", browserName: "chromium", headless: true, trace: "retain-on-failure" },
  reporter: "list",
});
