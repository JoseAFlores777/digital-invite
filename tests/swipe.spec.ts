import { test, expect } from '@playwright/test';

async function waitForSwipeReady(page) {
  await page.goto('/');
  await page.waitForSelector('.ReactSwipeButton', { state: 'visible' });
}

async function dragSlider(page, dx: number) {
  const handle = page.locator('.ReactSwipeButton .rsbcSlider');
  const box = await handle.boundingBox();
  if (!box) throw new Error('Slider handle no visible');
  const startX = box.x + box.width / 2;
  const startY = box.y + box.height / 2;
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + dx, startY, { steps: 12 });
  await page.mouse.up();
}

test.describe('Swipe invite control', () => {
  test('successful swipe muestra el contenido principal', async ({ page }) => {
    await waitForSwipeReady(page);
    await dragSlider(page, 260);
    await page.waitForSelector('text=Ruta especial eliminada', { timeout: 5000 });
    const envelope = page.locator('#sobre-boda');
    await expect(envelope).toHaveCount(0);
  });

  test('arrastre corto no muestra contenido principal', async ({ page }) => {
    await waitForSwipeReady(page);
    await dragSlider(page, 40);
    await page.waitForTimeout(700);
    const mainHint = page.locator('text=Ruta especial eliminada');
    await expect(mainHint).toHaveCount(0);
  });
});
