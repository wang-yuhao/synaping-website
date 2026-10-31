import { test, expect } from '@playwright/test';
import { existsSync } from 'node:fs';
// Visual regression. Baselines live in tests/visual/ and are created in CI (Linux) via
// `pnpm exec playwright test visual --update-snapshots`; changing them requires owner review.
// Until a baseline exists, the test is skipped instead of failing.
for (const path of ['/', '/en/', '/contact/']) {
  const name = `${path.replace(/\//g, '_') || 'root'}.png`;
  test(`visual ${path}`, async ({ page }, info) => {
    test.skip(!existsSync(info.snapshotPath(name)), 'no baseline yet');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(path);
    await expect(page).toHaveScreenshot(name, { fullPage: true, maxDiffPixelRatio: 0.02 });
  });
}
