const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { auditBank } = require("../modules/question-quality-audit.js");
const mockExamBuilder = require("../modules/mock-exam-builder.js");

const root = path.resolve(__dirname, "..");
const sandbox = { window: {} };
vm.createContext(sandbox);
fs.readdirSync(root)
  .filter((file) => /^question-bank.*\.js$/.test(file))
  .sort((a, b) => (a === "question-bank.js" ? -1 : b === "question-bank.js" ? 1 : a.localeCompare(b)))
  .forEach((file) => vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox, { filename: file }));
vm.runInContext(
  fs.readFileSync(path.join(root, "question-annotations-v31.js"), "utf8"),
  sandbox,
  { filename: "question-annotations-v31.js" }
);
vm.runInContext(
  fs.readFileSync(path.join(root, "modules", "question-provenance.js"), "utf8"),
  sandbox,
  { filename: "question-provenance.js" }
);
vm.runInContext(
  fs.readFileSync(path.join(root, "modules", "legal-practice-sources.js"), "utf8"),
  sandbox,
  { filename: "legal-practice-sources.js" }
);

const bank = sandbox.window.BUILTIN_BANK;
const validParts = new Set(["1", "2", "3", "4", "5", "6", "7"]);
const validDifficulties = new Set(["400", "600", "800"]);
const seen = new Set();
const errors = [];
const provenance = sandbox.window.TOEIC_QUESTION_PROVENANCE;

if (!Array.isArray(bank)) {
  errors.push("Question bank is not an array.");
} else {
  bank.forEach((question, index) => {
    const label = question && question.id ? question.id : `index ${index}`;
    if (!question || typeof question !== "object") errors.push(`${label}: must be an object`);
    if (!question.id || typeof question.id !== "string") errors.push(`${label}: missing string id`);
    if (seen.has(question.id)) errors.push(`${label}: duplicate id`);
    seen.add(question.id);
    if (!validParts.has(String(question.part))) errors.push(`${label}: invalid part`);
    if (!validDifficulties.has(String(question.difficulty))) errors.push(`${label}: invalid difficulty`);
    if (!Array.isArray(question.choices) || question.choices.length < 2 || question.choices.length > 4) errors.push(`${label}: choices must have 2-4 items`);
    if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= (question.choices || []).length) errors.push(`${label}: invalid answer index`);
    const source = provenance?.resolve(question);
    if (!source || !source.label || !source.type || !source.detail) errors.push(`${label}: missing resolved provenance`);
    if (/^(?:ETS|abceed|獵頓|猎顿|Leaton)/i.test(source?.label || "") && question.sourceType !== "licensed" && question.sourceType !== "official") {
      errors.push(`${label}: restricted provider label requires verified official or licensed provenance`);
    }
    ["prompt", "explanation"].forEach((field) => {
      if (typeof question[field] !== "string" || !question[field].trim()) errors.push(`${label}: missing ${field}`);
    });
    if (String(question.part) === "1") {
      const image = String(question.image || "");
      const imagePath = path.resolve(root, image);
      const part1Root = path.resolve(root, "assets", "part1");
      if (!/^assets\/part1\/[a-z0-9-]+\.(?:jpg|png|webp)$/i.test(image)) errors.push(`${label}: Part 1 image must use a safe local image path`);
      if (!imagePath.startsWith(`${part1Root}${path.sep}`)) errors.push(`${label}: Part 1 image must stay inside assets/part1`);
      if (!fs.existsSync(imagePath)) errors.push(`${label}: Part 1 image file is missing`);
      if (question.imageOrigin === "ai-generated") {
        if (question.imageGenerator !== "OpenAI" || question.imageLicense !== "本專案原創模擬素材") errors.push(`${label}: AI image provenance metadata is incomplete`);
      } else {
        if (!/^https:\/\/www\.pexels\.com\/photo\//i.test(String(question.imageSource || ""))) errors.push(`${label}: Part 1 image source must be a Pexels photo page`);
        if (question.imageLicense !== "Pexels License" || question.imageLicenseUrl !== "https://www.pexels.com/legal-pages/license/") errors.push(`${label}: Part 1 license metadata is incomplete`);
      }
      const expectedAudio = question.choices.map((choice, choiceIndex) => `${String.fromCharCode(65 + choiceIndex)}. ${choice}`).join(" ");
      if (String(question.audioText || "").trim() !== expectedAudio) errors.push(`${label}: Part 1 audio order must exactly match the displayed A-D choices`);
    }
  });
}

if (Array.isArray(bank) && bank.length !== 1010) errors.push(`Expected 1010 questions, received ${bank.length}`);
const part1 = Array.isArray(bank) ? bank.filter((question) => String(question.part) === "1") : [];
if (part1.length !== 25) errors.push(`Expected 25 Part 1 questions, received ${part1.length}`);
if (Array.isArray(bank)) {
  ["3", "4"].forEach((part) => {
    const groups = new Map();
    bank.filter((question) => String(question.part) === part).forEach((question) => {
      if (!question.groupId) {
        errors.push(`${question.id}: Part ${part} question must belong to a three-question group`);
        return;
      }
      groups.set(question.groupId, (groups.get(question.groupId) || 0) + 1);
    });
    groups.forEach((size, groupId) => {
      if (size !== 3) errors.push(`${groupId}: Part ${part} group must contain exactly 3 questions, received ${size}`);
    });
  });
}
if (sandbox.window.TOEIC_V31_ANNOTATION_COUNT !== 44) errors.push(`Expected 44 v3.1 annotations, applied ${sandbox.window.TOEIC_V31_ANNOTATION_COUNT}`);
const humanReviewed = Array.isArray(bank)
  ? bank.filter((question) => (question.tags || []).includes("literacy-core") && (question.tags || []).includes("human-reviewed"))
  : [];
if (humanReviewed.length !== 80) errors.push(`Expected 80 human-reviewed literacy questions, received ${humanReviewed.length}`);

const v43Items = Array.isArray(bank) ? bank.filter((question) => /^P5-32[1-4]$|^P7-R7[78]-Q[1-3]$/.test(question.id)) : [];
if (v43Items.length !== 10) errors.push(`Expected 10 v4.3 questions, received ${v43Items.length}`);
v43Items.forEach((question) => {
  if (question.sourceType !== "original" || question.sourceLabel !== "本站原創模擬") errors.push(`${question.id}: explicit original provenance is missing`);
});

const v44Items = Array.isArray(bank) ? bank.filter((question) =>
  /^P2-10[7-9]$|^P3-G24-Q[1-3]$|^P4-G21-Q[1-3]$|^P5-32[5-8]$|^P6-G28-Q[1-4]$|^P7-R(?:79|80)-Q[1-3]$/.test(question.id)
) : [];
if (v44Items.length !== 23) errors.push(`Expected 23 v4.4 questions, received ${v44Items.length}`);
v44Items.forEach((question) => {
  if (question.difficulty !== "800") errors.push(`${question.id}: v4.4 expansion item must be difficulty 800`);
  if (question.sourceType !== "original" || question.sourceLabel !== "本站原創模擬") errors.push(`${question.id}: explicit original provenance is missing`);
});

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

if (Array.isArray(bank)) {
  for (let seed = 1; seed <= 12; seed += 1) {
    const plan = mockExamBuilder.build(bank, { random: seededRandom(seed) });
    const diagnostics = plan.diagnostics;
    if (diagnostics.total !== 200) errors.push(`Mock seed ${seed}: expected 200 questions, received ${diagnostics.total}`);
    if (diagnostics.duplicateIds.length) errors.push(`Mock seed ${seed}: duplicate IDs ${diagnostics.duplicateIds.join(", ")}`);
    mockExamBuilder.PART_ORDER.forEach((part) => {
      const config = mockExamBuilder.DEFAULT_BLUEPRINT[part];
      if (diagnostics.partCounts[part] !== config.count) {
        errors.push(`Mock seed ${seed}: Part ${part} expected ${config.count}, received ${diagnostics.partCounts[part]}`);
      }
      Object.entries(config.difficulty).forEach(([level, target]) => {
        if (diagnostics.difficultyCounts[part][level] !== target) {
          errors.push(`Mock seed ${seed}: Part ${part} difficulty ${level} expected ${target}, received ${diagnostics.difficultyCounts[part][level]}`);
        }
      });
      plan.unitsByPart[part].forEach((unit) => {
        const sourceSize = bank.filter((question) => (question.groupId || question.id) === unit.key).length;
        if (unit.questions.length !== sourceSize) errors.push(`Mock seed ${seed}: split group ${unit.key}`);
      });
    });
  }
}

const legalSources = sandbox.window.TOEIC_LEGAL_PRACTICE_SOURCES || [];
["ets-official-prep", "abceed-platform", "leaton-platform"].forEach((id) => {
  const source = legalSources.find((entry) => entry.id === id);
  if (!source || !/^https:\/\//.test(source.url || "")) errors.push(`${id}: legal external source entry is missing`);
});

const correctedInversion = Array.isArray(bank) ? bank.find((question) => question.id === "P5-073") : null;
if (!correctedInversion) {
  errors.push("P5-073: corrected inversion regression question is missing");
} else {
  const correctChoice = correctedInversion.choices?.[correctedInversion.answer];
  if (correctChoice !== "was") errors.push(`P5-073: expected correct choice "was", received "${correctChoice}"`);
  if (!correctedInversion.explanation.includes("雙主詞")) errors.push("P5-073: explanation must identify the double-subject trap");
}

if (Array.isArray(bank)) {
  const audit = auditBank(bank);
  audit.errors.forEach((entry) => errors.push(`${entry.id}: ${entry.code} - ${entry.message}`));
  audit.warnings.forEach((entry) => console.warn(`Warning ${entry.id}: ${entry.code} - ${entry.message}`));
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${bank.length} questions.`);
