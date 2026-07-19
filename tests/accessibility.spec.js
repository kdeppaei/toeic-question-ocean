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
  await page.goto("/?v=3.4.0");
  await expect(page.locator("#totalBank")).toHaveText("925");
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

test("Part 1 practice keeps image, displayed choices, and spoken order aligned", async ({ page }) => {
  await page.locator('[data-nav="setupView"]').click();
  await page.locator("#partSelect").selectOption("1");
  await page.locator("#countSelect").selectOption("5");
  await page.locator("#startPractice").click();

  const image = page.locator(".part1-image-frame img");
  await expect(image).toBeVisible();
  expect(await image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator(".part1-figure figcaption")).toContainText(/Pexels|AI 生成情境圖/);
  await expect(page.locator("#quizProgressTrack")).toHaveAttribute("aria-valuetext", "第 1 題，共 5 題");

  const imageSource = await image.getAttribute("src");
  const zoomButton = page.locator("[data-preview-image]");
  await zoomButton.click();
  await expect(page.locator("#part1ImageDialog")).toBeVisible();
  await expect(page.locator("#part1ImagePreview")).toHaveAttribute("src", imageSource);
  await page.locator("#togglePart1ImageZoom").click();
  await expect(page.locator("#part1ImagePreviewStage")).toHaveClass(/is-zoomed/);
  const zoomMetrics = await page.locator("#part1ImagePreviewStage").evaluate((stage) => ({
    clientWidth: stage.clientWidth,
    scrollWidth: stage.scrollWidth
  }));
  expect(zoomMetrics.scrollWidth).toBeGreaterThan(zoomMetrics.clientWidth);
  await page.locator("#closePart1ImageDialog").click();
  await expect(page.locator("#part1ImageDialog")).not.toBeVisible();
  await expect(zoomButton).toBeFocused();

  const displayedChoices = await page.locator(".choice > span:last-child").allTextContents();
  const firstChoice = page.locator('[data-choice="0"]');
  await firstChoice.click();
  await expect(page.locator(".feedback")).toBeVisible();
  await expect(page.locator(".feedback")).toBeFocused();
  await expect(firstChoice).toHaveAttribute("aria-pressed", "true");
  const transcript = await page.locator(".listening-review .review-section p").first().textContent();
  expect(transcript.trim()).toBe(displayedChoices.map((choice, index) =>
    `${String.fromCharCode(65 + index)}. ${choice.trim()}`
  ).join(" "));

  const secondChoice = page.locator('[data-choice="1"]');
  await secondChoice.click();
  await expect(secondChoice).toHaveAttribute("aria-pressed", "true");
  await expect(firstChoice).toHaveAttribute("aria-pressed", "false");
  await expectNoSeriousA11yViolations(page);
});

test("every Part 1 source image is landscape and large enough to judge", async ({ page }) => {
  const imageMetrics = await page.evaluate(async () => {
    const sources = [...new Set(window.BUILTIN_BANK
      .filter((question) => String(question.part) === "1")
      .map((question) => question.image))];
    return Promise.all(sources.map((source) => new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve({
        source,
        width: image.naturalWidth,
        height: image.naturalHeight,
        ratio: image.naturalWidth / image.naturalHeight
      });
      image.onerror = () => reject(new Error(`Could not load ${source}`));
      image.src = source;
    })));
  });

  expect(imageMetrics).toHaveLength(25);
  imageMetrics.forEach(({ source, width, height, ratio }) => {
    expect(width, `${source} should be at least 1200px wide`).toBeGreaterThanOrEqual(1200);
    expect(height, `${source} should be at least 700px high`).toBeGreaterThanOrEqual(700);
    expect(ratio, `${source} should use a landscape composition`).toBeGreaterThanOrEqual(1.45);
    expect(ratio, `${source} should not be excessively panoramic`).toBeLessThanOrEqual(1.8);
  });
});

test("Part 1 audio pauses one second after letters and between choices", async ({ page }) => {
  await page.evaluate(() => {
    window.__speechLog = [];
    window.SpeechSynthesisUtterance = class {
      constructor(text) {
        this.text = text;
      }
    };
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: {
        cancel() {},
        getVoices() { return []; },
        speak(utterance) {
          const entry = { text: utterance.text, time: Date.now(), endedAt: null };
          window.__speechLog.push(entry);
          setTimeout(() => {
            entry.endedAt = Date.now();
            utterance.onend?.();
          }, 5);
        }
      }
    });
  });

  await page.locator('[data-nav="setupView"]').click();
  await page.locator("#partSelect").selectOption("1");
  await page.locator("#countSelect").selectOption("5");
  await page.locator("#startPractice").click();
  await page.locator("#listenBtn").click();

  await expect.poll(() => page.evaluate(() => window.__speechLog.length), { timeout: 9000 }).toBe(8);
  const speechLog = await page.evaluate(() => window.__speechLog);
  const expectedLetters = ["A.", "B.", "C.", "D."];
  expectedLetters.forEach((choiceLetter, index) => {
    const cue = speechLog[index * 2];
    const statement = speechLog[index * 2 + 1];
    expect(cue.text).toBe(choiceLetter);
    expect(statement.text.length).toBeGreaterThan(5);
    expect(statement.time - cue.endedAt).toBeGreaterThanOrEqual(950);
    if(index>0){
      const previousStatement = speechLog[index * 2 - 1];
      expect(cue.time - previousStatement.endedAt).toBeGreaterThanOrEqual(950);
    }
  });

  await page.locator("#listenBtn").click();
  await expect.poll(() => page.evaluate(() => window.__speechLog.length)).toBe(9);
  await page.locator('[data-choice="0"]').click();
  await page.locator("#nextQuestion").click();
  await page.waitForTimeout(1100);
  expect(await page.evaluate(() => window.__speechLog.length)).toBe(9);
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
