import { test, expect } from '@playwright/test';
// Visual baselines are generated in CI (Linux) only. Changing them requires owner review (CODEOWNERS).
for (const path of ['/', '/en/', '/contact/']) {
  test(`visual ${path}`, async ({ page }) => {
    test.skip(!process.env.CI, 'baselines are Linux/CI only');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(path);
    await expect(page).toHaveScreenshot(`${path.replace(/\//g, '_') || 'root'}.png`, { fullPage: true, maxDiffPixelRatio: 0.02 });
  });
}
