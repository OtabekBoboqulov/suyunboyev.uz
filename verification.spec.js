const { test, expect } = require('@playwright/test');

test('Verify changes', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.reload({ waitUntil: 'networkidle' });
  await page.screenshot({ path: '/home/jules/verification/verification.png', fullPage: true });
});
