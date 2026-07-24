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
    await page.goto("/?v=4.5.0");
    await expect(page.locator("#totalBank")).toHaveText("1035");
    await page.evaluate(() => window.scrollTo(0, 0));
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

    const layout = await page.evaluate(() => {
      const rect = (selector) => {
        const box = document.querySelector(selector)?.getBoundingClientRect();
        return box ? { left: box.left, right: box.right, top: box.top, bottom: box.bottom } : null;
      };
      const visible = (selector) => {
        const element = document.querySelector(selector);
        return !!element && getComputedStyle(element).display !== "none";
      };
      const hero = rect(".workspace-banner");
      const release = rect("#releaseBadges")?.top;
      return {
        heroWithinViewport: !!hero && hero.left >= 0 && hero.right <= innerWidth,
        releaseAfterHero: !!hero && Number.isFinite(release) && release >= hero.bottom,
        mobileDockVisible: visible(".mobile-dock"),
        sidebarVisible: visible(".sidebar")
      };
    });
    expect(layout).toEqual({
      heroWithinViewport: true,
      releaseAfterHero: true,
      mobileDockVisible: viewport.width <= 700,
      sidebarVisible: viewport.width > 1120
    });

    await expect(page).toHaveScreenshot(`home-${viewport.name}.png`, {
      maxDiffPixelRatio: viewport.width <= 390 ? 0.12 : 0.065
    });
  });
}

const mockDialogViewports = [
  { name: "phone-320", width: 320, height: 800 },
  { name: "tablet-834", width: 834, height: 1112 },
  { name: "desktop-1440", width: 1440, height: 900 }
];

for (const viewport of mockDialogViewports) {
  test(`mock section break visual regression ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/?v=4.5.0");
    await page.evaluate(() => showView("setupView"));
    await page.locator("#startMockExam").click();
    await page.evaluate(() => completeListeningSection("manual"));
    await expect(page.locator("#mockSectionResultDialog")).toBeVisible();
    await page.addStyleTag({
      content: `*, *::before, *::after { animation: none !important; transition: none !important; }`
    });

    const bounds = await page.locator("#mockSectionResultDialog").evaluate((element) => {
      const box = element.getBoundingClientRect();
      return {
        withinViewport: box.left >= 0 && box.right <= innerWidth && box.top >= 0 && box.bottom <= innerHeight,
        noHorizontalOverflow: element.scrollWidth === element.clientWidth
      };
    });
    expect(bounds).toEqual({ withinViewport: true, noHorizontalOverflow: true });
    await expect(page).toHaveScreenshot(`mock-break-${viewport.name}.png`, {
      maxDiffPixelRatio: viewport.width <= 390 ? 0.12 : 0.065
    });
  });
}

test("Part 6 and Part 7 format cues stay distinct on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?v=4.5.0");
  await page.addStyleTag({
    content: `*, *::before, *::after { animation: none !important; transition: none !important; }`
  });

  await page.evaluate(() => {
    const questions = getActiveBank().filter((question) => question.groupId === "P6-G32");
    startSession(questions, { count: questions.length, seconds: 0, shuffle: false, instant: true, mode: "practice" });
    window.scrollTo(0, 0);
  });
  await expect(page.locator(".reading-format-cue.part6")).toBeVisible();
  await expect(page).toHaveScreenshot("part6-format-phone-390.png", { maxDiffPixelRatio: 0.12 });

  await page.evaluate(() => {
    const questions = getActiveBank().filter((question) => question.groupId === "P7-R90");
    startSession(questions, { count: questions.length, seconds: 0, shuffle: false, instant: true, mode: "literacy" });
    window.scrollTo(0, 0);
  });
  await expect(page.locator(".reading-format-cue.part7")).toBeVisible();
  await expect(page).toHaveScreenshot("part7-format-phone-390.png", { maxDiffPixelRatio: 0.12 });
});
