const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

async function expectNoSeriousA11yViolations(page, include) {
  let builder = new AxeBuilder({ page });
  if (include) builder = builder.include(include);
  const results = await builder.analyze();
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

async function navigate(page, view) {
  const target = page.locator(`[data-nav="${view}"]`);
  if (!(await page.locator(".sidebar").isVisible())) await page.locator("#mobileHome").click();
  if (!(await target.isVisible())) {
    await page.locator(`[data-nav-group]:has([data-nav="${view}"]) .nav-group-toggle`).click();
  }
  await target.click();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/?v=4.2.0");
  await expect(page.locator("#totalBank")).toHaveText("977");
});

test("skip link, navigation, and module cards work from the keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#mainContent")).toBeFocused();

  const practiceGroup = page.locator('[aria-controls="navPractice"]');
  await practiceGroup.focus();
  await page.keyboard.press("Enter");
  await expect(practiceGroup).toHaveAttribute("aria-expanded", "true");
  const setupNav = page.locator('[data-nav="setupView"]');
  await setupNav.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#setupView")).toHaveClass(/active/);
  await expect(page.locator("#viewTitle")).toBeFocused();
  await expect(setupNav).toHaveAttribute("aria-current", "page");

  await navigate(page, "homeView");
  const part1Card = page.locator('[data-part-card="1"]');
  await expect(part1Card).toHaveRole("button");
  await part1Card.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#partSelect")).toHaveValue("1");
  await expect(page.locator("#viewTitle")).toBeFocused();
});

test("Part 1 practice keeps image, displayed choices, and spoken order aligned", async ({ page }) => {
  await navigate(page, "setupView");
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
        resume() {},
        speak(utterance) {
          const entry = { text: utterance.text, volume: utterance.volume, time: Date.now(), endedAt: null };
          window.__speechLog.push(entry);
          setTimeout(() => {
            entry.endedAt = Date.now();
            utterance.onend?.();
          }, 5);
        }
      }
    });
  });

  await navigate(page, "setupView");
  await page.locator("#partSelect").selectOption("1");
  await page.locator("#countSelect").selectOption("5");
  await page.locator("#startPractice").click();
  await page.locator("#listenBtn").click();

  await expect.poll(() => page.evaluate(() => window.__speechLog.filter((entry) => entry.volume !== 0).length), { timeout: 20000 }).toBe(11);
  const speechLog = await page.evaluate(() => window.__speechLog.filter((entry) => entry.volume !== 0));
  expect(speechLog[0].text).toContain("Listening Test.");
  expect(speechLog[1].text).toContain("Part 1. Directions.");
  expect(speechLog[2].text).toBe("Number 1. Look at the picture marked number 1 in your test book.");
  expect(speechLog[3].time - speechLog[2].endedAt).toBeGreaterThanOrEqual(850);
  const expectedLetters = ["A.", "B.", "C.", "D."];
  expectedLetters.forEach((choiceLetter, index) => {
    const cue = speechLog[index * 2 + 3];
    const statement = speechLog[index * 2 + 4];
    expect(cue.text).toBe(choiceLetter);
    expect(statement.text.length).toBeGreaterThan(5);
    expect(statement.time - cue.endedAt).toBeGreaterThanOrEqual(950);
    if(index>0){
      const previousStatement = speechLog[index * 2 + 2];
      expect(cue.time - previousStatement.endedAt).toBeGreaterThanOrEqual(950);
    }
  });

  await page.locator("#listenBtn").click();
  await expect.poll(() => page.evaluate(() => window.__speechLog.filter((entry) => entry.volume === 0).length)).toBe(2);
  await page.locator('[data-choice="0"]').click();
  await page.locator("#nextQuestion").click();
  await page.waitForTimeout(1100);
  expect(await page.evaluate(() => window.__speechLog.filter((entry) => entry.text.startsWith("Listening Test.")).length)).toBe(1);
});

test("Part 2 audio announces the number, prompt, and three paced responses", async ({ page }) => {
  await page.evaluate(() => {
    window.__speechLog = [];
    window.SpeechSynthesisUtterance = class {
      constructor(text) { this.text = text; }
    };
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: {
        cancel() {},
        getVoices() { return []; },
        resume() {},
        speak(utterance) {
          const entry = { text: utterance.text, pitch: utterance.pitch, volume: utterance.volume, time: Date.now(), endedAt: null };
          window.__speechLog.push(entry);
          setTimeout(() => {
            entry.endedAt = Date.now();
            utterance.onend?.();
          }, 5);
        }
      }
    });
  });

  await navigate(page, "setupView");
  await page.locator("#partSelect").selectOption("2");
  await page.locator("#countSelect").selectOption("5");
  await page.locator("#startPractice").click();
  await page.locator("#listenBtn").click();

  await expect.poll(() => page.evaluate(() => window.__speechLog.filter((entry) => entry.volume !== 0).length), { timeout: 20000 }).toBe(10);
  const speechLog = await page.evaluate(() => window.__speechLog.filter((entry) => entry.volume !== 0));
  expect(speechLog[0].text).toContain("Listening Test.");
  expect(speechLog[1].text).toContain("Part 2. Directions.");
  expect(speechLog[2].text).toBe("Number 1.");
  expect(speechLog[3].text.length).toBeGreaterThan(5);
  expect(speechLog[3].time - speechLog[2].endedAt).toBeGreaterThanOrEqual(850);
  expect(speechLog[4].time - speechLog[3].endedAt).toBeGreaterThanOrEqual(900);
  ["A.", "B.", "C."].forEach((choiceLetter, index) => {
    const cue = speechLog[index * 2 + 4];
    const response = speechLog[index * 2 + 5];
    expect(cue.text).toBe(choiceLetter);
    expect(response.text.length).toBeGreaterThan(3);
    expect(response.time - cue.endedAt).toBeGreaterThanOrEqual(750);
    expect(response.pitch).not.toBe(speechLog[3].pitch);
    if(index>0){
      const previousResponse=speechLog[index * 2 + 3];
      expect(cue.time - previousResponse.endedAt).toBeGreaterThanOrEqual(850);
    }
  });
});

test("Part 3 audio announces the group and reads prompts five seconds apart", async ({ page }) => {
  await page.evaluate(() => {
    window.__speechLog = [];
    window.SpeechSynthesisUtterance = class {
      constructor(text) { this.text = text; }
    };
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: {
        cancel() {},
        resume() {},
        getVoices() { return []; },
        speak(utterance) {
          const entry = { text: utterance.text, volume: utterance.volume, time: Date.now(), endedAt: null };
          window.__speechLog.push(entry);
          setTimeout(() => {
            entry.endedAt = Date.now();
            utterance.onend?.();
          }, 5);
        }
      }
    });
  });

  await navigate(page, "setupView");
  await page.locator("#partSelect").selectOption("3");
  await page.locator("#countSelect").selectOption("5");
  await page.locator("#startPractice").click();
  await page.locator("#listenBtn").click();

  await expect.poll(() => page.evaluate(() => window.__speechLog.filter((entry) => entry.volume !== 0 && /^Question \d+\./.test(entry.text)).length), { timeout: 30000 }).toBe(3);
  const speechLog = await page.evaluate(() => window.__speechLog.filter((entry) => entry.volume !== 0));
  expect(speechLog[0].text).toContain("Listening Test.");
  expect(speechLog[1].text).toContain("Part 3. Directions.");
  expect(speechLog[2].text).toMatch(/^Questions \d+ through \d+ refer to the following conversation\.$/);
  const prompts = speechLog.filter((entry) => /^Question \d+\./.test(entry.text));
  expect(prompts).toHaveLength(3);
  expect(prompts[1].time - prompts[0].endedAt).toBeGreaterThanOrEqual(4950);
  expect(prompts[2].time - prompts[1].endedAt).toBeGreaterThanOrEqual(4950);
  const groupChoices = await page.locator(".group-overview .group-question").allTextContents();
  prompts.forEach((prompt) => groupChoices.forEach((choice) => expect(prompt.text).not.toContain(choice.trim())));
});

test("Part 3 directions and all three questions appear before grouped practice", async ({ page }) => {
  await navigate(page, "setupView");
  await page.locator("#partSelect").selectOption("3");
  await expect(page.locator("#directionReferenceContent")).toContainText("PART 3 簡短對話");
  await expect(page.locator("#directionReferenceContent")).toContainText("three questions");
  await page.locator("#countSelect").selectOption("5");
  await page.locator("#startPractice").click();
  await expect(page.locator(".part-direction-cue")).toContainText("PART 3 簡短對話");
  await expect(page.locator(".group-overview .group-question")).toHaveCount(3);
});

test("Reading directions show the 75-minute overview and switch by part", async ({ page }) => {
  await navigate(page, "setupView");
  await page.locator('[data-direction-tab="3"]').focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('[data-direction-tab="4"]')).toBeFocused();
  await expect(page.locator("#directionReferenceContent")).toContainText("PART 4 簡短獨白");
  await page.locator('[data-direction-tab="reading"]').click();
  await expect(page.locator("#directionReferenceContent")).toContainText("75 minutes");
  await page.locator("#partSelect").selectOption("6");
  await expect(page.locator("#directionReferenceContent")).toContainText("PART 6 段落填空");
  await expect(page.locator("#directionReferenceContent")).toContainText("word, phrase, or sentence");
  await page.locator("#partSelect").selectOption("5");
  await page.locator("#countSelect").selectOption("5");
  await page.locator("#startPractice").click();
  await expect(page.locator(".reading-intro-strip")).toContainText("閱讀測驗共 75 分鐘");
  await expect(page.locator(".part-direction-cue")).toContainText("PART 5 句子填空");
});

test("completed answers and explanations persist in Local Storage", async ({ page }) => {
  await navigate(page, "setupView");
  await page.locator("#partSelect").selectOption("5");
  await page.locator("#countSelect").selectOption("5");
  await page.locator("#startPractice").click();
  for(let index=0;index<5;index++){
    await page.locator('[data-choice="0"]').click();
    await page.locator("#nextQuestion").click();
  }
  await expect(page.locator("#resultView")).toHaveClass(/active/);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("toeicOcean.answerArchive.v1") || "[]").length)).toBe(5);

  await navigate(page, "historyView");
  await expect(page.locator("#answerArchiveList .answer-archive-card")).toHaveCount(5);
  await expect(page.locator("#answerArchiveList").first()).toContainText("詳解：");
  await expect(page.locator("#answerArchiveSummary")).toContainText("5 題已保存");

  await page.reload();
  await expect(page.locator("#totalBank")).toHaveText("977");
  await navigate(page, "historyView");
  await expect(page.locator("#answerArchiveList .answer-archive-card")).toHaveCount(5);
  await expect(page.locator("#answerArchiveSummary")).toContainText("5 題已保存");
});

test("mock exam starts with Part 1 without exposing spoken descriptions", async ({ page }) => {
  await navigate(page, "setupView");
  await page.locator("#startMockExam").click();
  await expect(page.locator("#quizBadges")).toContainText("Q1/200");
  await expect(page.locator("#quizBadges")).toContainText("Part 1");
  await expect(page.locator(".part1-image-frame img")).toBeVisible();
  await expect(page.locator(".choice")).toHaveCount(4);
  await expect(page.locator(".choice").first()).toContainText("聆聽敘述後選擇");
  await expect(page.locator(".choice").first()).not.toContainText("A woman");
  for(let index=0;index<6;index++){
    await page.locator('[data-choice="0"]').click();
    await page.locator("#nextQuestion").click();
  }
  await expect(page.locator("#quizBadges")).toContainText("Part 2");
  await expect(page.locator(".choice")).toHaveCount(3);
  await expect(page.locator(".choice").first()).toContainText("聆聽回應後選擇");
});

test("home and setup views have no serious automated accessibility violations", async ({ page }) => {
  await expectNoSeriousA11yViolations(page);
  await navigate(page, "setupView");
  await expectNoSeriousA11yViolations(page);
});

test("vocabulary entries require Chinese, KK, and part of speech", async ({ page }) => {
  const lexiconAudit = await page.evaluate(() => {
    const entries = Object.entries(window.TOEIC_VOCAB_LEXICON || {});
    return {
      total: entries.length,
      incomplete: entries
        .filter(([, entry]) => !entry?.zh || !entry?.kk || !entry?.pos)
        .map(([word]) => word)
    };
  });
  expect(lexiconAudit.total).toBeGreaterThanOrEqual(540);
  expect(lexiconAudit.incomplete).toEqual([]);

  await navigate(page, "autoVocabView");
  expect(Number(await page.locator("#autoVocabKnown").textContent())).toBeGreaterThan(384);
  await page.locator("#autoVocabSearch").fill("team");
  const card = page.locator("#autoVocabList .word-card").first();
  await expect(card.locator("h3")).toContainText("team");
  await expect(card.locator("h3 small")).toHaveText("/tim/");
  await expect(card).toContainText("團隊");
  await expect(card).toContainText("The design team is preparing a revised proposal.");
});

test("learning hub keeps vocabulary and adds grammar, collocations, and resources", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#mobileHome").click();
  await expect(page.locator(".sidebar")).toHaveClass(/mobile-open/);
  await navigate(page, "autoVocabView");
  await expect(page.locator("#viewTitle")).toHaveText("多益學習區");
  await expect(page.locator('[data-learning-tab]')).toHaveCount(4);
  await expect(page.locator('[data-learning-tab="vocabulary"]')).toHaveAttribute("aria-selected", "true");
  expect(Number(await page.locator("#autoVocabKnown").textContent())).toBeGreaterThan(384);
  await expect(page.locator("#autoVocabList .word-card")).toHaveCount(100);
  await expect(page.locator("#autoVocabLoadMore")).toBeVisible();
  await page.locator("#autoVocabSource").selectOption("davinci");
  await expect(page.locator("#autoVocabShown")).toHaveText("170");
  await expect(page.locator("#autoVocabDisplayCount")).toHaveText("目前顯示 100 / 170 個");
  await expect(page.locator("#vocabFitProgress .fit-progress-item")).toHaveCount(3);
  await page.locator("#autoVocabFit").selectOption("broad");
  const broadCount=Number(await page.locator("#autoVocabShown").textContent());
  expect(broadCount).toBeGreaterThanOrEqual(40);
  await expect(page.locator("#autoVocabList .word-card")).toHaveCount(broadCount);
  await expect(page.locator("#autoVocabList .fit-chip.broad").first()).toHaveText("雅思／托福廣域");
  await page.locator("#autoVocabFit").selectOption("toeic-core");
  await page.locator("#autoVocabSearch").fill("revenue");
  const sourceCard=page.locator("#autoVocabList .word-card");
  await expect(sourceCard).toHaveCount(1);
  await expect(sourceCard).toContainText("多益核心");
  await expect(sourceCard).toContainText("達文西 2 p.48");
  await page.locator("#practiceCoreVocab").click();
  await expect(page.locator("#vocabReviewSource")).toHaveValue("toeic-core");
  await expect(page.locator("[data-vocab-choice]")).toHaveCount(4);
  await page.locator("#mobileHome").click();
  await navigate(page, "autoVocabView");

  await page.locator('[data-learning-tab="grammar"]').focus();
  await page.keyboard.press("Enter");
  await expect(page.locator('[data-learning-tab="grammar"]')).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#learningGrammarShown")).toHaveText("18");
  await expect(page.locator(".learning-topic-card")).toHaveCount(18);
  await expect(page.locator(".learning-topic-card").first()).toContainText("核心句型");

  await page.keyboard.press("ArrowRight");
  await expect(page.locator('[data-learning-tab="collocations"]')).toBeFocused();
  await expect(page.locator("#learningCollocationShown")).toHaveText("48");
  await expect(page.locator(".collocation-item")).toHaveCount(48);

  await page.keyboard.press("ArrowRight");
  await expect(page.locator('[data-learning-tab="resources"]')).toBeFocused();
  await expect(page.locator("#learningResourceCount")).toHaveText("6");
  await expect(page.locator(".learning-resource-item")).toHaveCount(6);
  const links = page.locator(".learning-resource-item a[target='_blank']");
  await expect(links).toHaveCount(6);
  for (let index = 0; index < await links.count(); index++) {
    await expect(links.nth(index)).toHaveAttribute("rel", /noopener/);
    await expect(links.nth(index)).toHaveAttribute("href", /^https:\/\//);
  }

  const overflow = await page.evaluate(() => ({
    body: document.body.scrollWidth - document.body.clientWidth,
    root: document.documentElement.scrollWidth - document.documentElement.clientWidth
  }));
  expect(overflow).toEqual({ body: 0, root: 0 });
  await expectNoSeriousA11yViolations(page, "#learningResourcesPanel");
});

test("five-day sprint tracks tasks, external practice, and handbook cards", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#mobileHome").click();
  await navigate(page, "sprintView");
  await expect(page.locator("#viewTitle")).toHaveText("五天衝刺工作台");
  await expect(page.locator("[data-sprint-day]")).toHaveCount(5);
  await expect(page.locator("[data-sprint-task]")).toHaveCount(3);
  await expect(page.locator("#sprintSourceGrid .sprint-source-card")).toHaveCount(3);
  await expect(page.locator("#sprintSourceGrid a[target='_blank']")).toHaveCount(3);
  await expect(page.locator("#sprintCardCount")).toHaveText("103");

  await page.locator('[data-sprint-task="0"]').check();
  await expect(page.locator("#sprintProgressText")).toHaveText("1 / 15 項任務");
  await page.locator("#sprintLogTotal").fill("20");
  await page.locator("#sprintLogCorrect").fill("15");
  await page.locator("#sprintLogError").selectOption("G");
  await page.locator("#sprintLogForm button[type='submit']").click();
  await expect(page.locator("#sprintLoggedTotal")).toHaveText("20");
  await expect(page.locator("#sprintLoggedAccuracy")).toHaveText("75%");
  await expect(page.locator("#sprintTopError")).toHaveText("G · 文法");

  await page.locator("#sprintFindCard").click();
  await expect(page.locator("#sprintCardList .sprint-handbook-card")).not.toHaveCount(0);
  const overflow = await page.evaluate(() => ({
    body: document.body.scrollWidth - document.body.clientWidth,
    root: document.documentElement.scrollWidth - document.documentElement.clientWidth
  }));
  expect(overflow).toEqual({ body: 0, root: 0 });
  await expectNoSeriousA11yViolations(page, "#sprintView");
});
