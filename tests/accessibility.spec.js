const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

async function expectNoSeriousA11yViolations(page) {
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact)
  );
  expect(serious.map(({ id, impact, help, nodes }) => ({
    id,
    impact,
    help,
    targets: nodes.map((node) => node.target)
  }))).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/?v=3.1.0");
  await expect(page.locator("#totalBank")).toHaveText("908");
});

test("skip link, navigation, and module cards work from the keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#mainContent")).toBeFocused();

  const setupNav = page.locator('[data-nav="setupView"]');
  await setupNav.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#setupView")).toHaveClass(/active/);
  await expect(page.locator("#viewTitle")).toBeFocused();
  await expect(setupNav).toHaveAttribute("aria-current", "page");

  await page.locator('[data-nav="homeView"]').click();
  const part1Card = page.locator('[data-part-card="1"]');
  await expect(part1Card).toHaveRole("button");
  await part1Card.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#partSelect")).toHaveValue("1");
  await expect(page.locator("#viewTitle")).toBeFocused();
});

test("Part 1 practice renders a licensed image and announces immediate feedback", async ({ page }) => {
  await page.locator('[data-nav="setupView"]').click();
  await page.locator("#partSelect").selectOption("1");
  await page.locator("#countSelect").selectOption("5");
  await page.locator("#startPractice").click();

  const image = page.locator(".part1-image-frame img");
  await expect(image).toBeVisible();
  expect(await image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator(".part1-figure figcaption a")).toHaveAttribute("href", /pexels\.com\/photo\//);
  await expect(page.locator("#quizProgressTrack")).toHaveAttribute("aria-valuetext", "第 1 題，共 5 題");

  const firstChoice = page.locator('[data-choice="0"]');
  await firstChoice.click();
  await expect(page.locator(".feedback")).toBeVisible();
  await expect(page.locator(".feedback")).toBeFocused();
  await expect(firstChoice).toHaveAttribute("aria-pressed", "true");

  const secondChoice = page.locator('[data-choice="1"]');
  await secondChoice.click();
  await expect(secondChoice).toHaveAttribute("aria-pressed", "true");
  await expect(firstChoice).toHaveAttribute("aria-pressed", "false");
  await expectNoSeriousA11yViolations(page);
});

test("mock exam starts with Part 1 without exposing spoken descriptions", async ({ page }) => {
  await page.locator('[data-nav="setupView"]').click();
  await page.locator("#startMockExam").click();
  await expect(page.locator("#quizBadges")).toContainText("Q1/200");
  await expect(page.locator("#quizBadges")).toContainText("Part 1");
  await expect(page.locator(".part1-image-frame img")).toBeVisible();
  await expect(page.locator(".choice")).toHaveCount(4);
  await expect(page.locator(".choice").first()).toContainText("聆聽語音後選擇");
  await expect(page.locator(".choice").first()).not.toContainText("A woman");
});

test("home and setup views have no serious automated accessibility violations", async ({ page }) => {
  await expectNoSeriousA11yViolations(page);
  await page.locator('[data-nav="setupView"]').click();
  await expectNoSeriousA11yViolations(page);
});
