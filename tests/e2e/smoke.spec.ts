import { test, expect } from '@playwright/test';

const pages = ['/', '/en/', '/de/', '/services/', '/services/data-ai-engineering/', '/solutions/eu-launch-kit/', '/cases/', '/labs/', '/labs/quant-research-infrastructure/', '/insights/', '/about/', '/contact/', '/de/contact/', '/legal/privacy/', '/de/legal/notice/'];

for (const path of pages) {
  test(`renders ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const external: string[] = [];
    page.on('request', (r) => { const u = new URL(r.url()); if (!['localhost', '127.0.0.1'].includes(u.hostname) && !u.protocol.startsWith('data')) external.push(r.url()); });
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('footer')).toContainText('沪ICP备2023014586号-3');
    expect(errors, 'no JS errors').toEqual([]);
    expect(external, 'no third-party requests').toEqual([]);
  });
}

test('no cookies are set', async ({ page, context }) => {
  await page.goto('/');
  expect(await context.cookies()).toEqual([]);
});

test('language switcher keeps the path', async ({ page }) => {
  await page.goto('/services/');
  await page.getByRole('group', { name: 'Language' }).getByText('EN').click();
  await expect(page).toHaveURL(/\/en\/services\/$/);
});

test('quant page shows the disclaimer', async ({ page }) => {
  await page.goto('/labs/quant-research-infrastructure/');
  await expect(page.getByText('不构成投资建议')).toBeVisible();
});

test('contact form requires consent', async ({ page }) => {
  await page.goto('/contact/');
  await expect(page.locator('input[name=consent]')).toHaveAttribute('required', '');
});
