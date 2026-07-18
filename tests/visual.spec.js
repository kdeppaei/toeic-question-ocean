const { test, expect } = require("@playwright/test");

const viewports = [
  { name: "phone-320", width: 320, height: 800 },
  { name: "phone-390", width: 390, height: 844 },
  { name: "tablet-834", width: 834, height: 1112 },
  { name: "desktop-1440", width: 1440, height: 900 }
];

for (const viewport of viewports) {
  test(`home visual regression ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/?v=3.1.0");
    await expect(page.locator("#totalBank")).toHaveText("908");
    await page.addStyleTag({
      content: `
        *, *::before, *::after { animation: none !important; transition: none !important; }
        #todayLabel { visibility: hidden !important; }
      `
    });
    await page.evaluate(() => document.fonts.ready);

    const overflow = await page.evaluate(() => ({
      body: document.body.scrollWidth - document.body.clientWidth,
      root: document.documentElement.scrollWidth - document.documentElement.clientWidth
    }));
    expect(overflow, "Page must not overflow horizontally").toEqual({ body: 0, root: 0 });
    await expect(page).toHaveScreenshot(`home-${viewport.name}.png`);
  });
}
