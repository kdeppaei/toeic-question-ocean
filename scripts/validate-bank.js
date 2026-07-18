const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { auditBank } = require("../modules/question-quality-audit.js");

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

const bank = sandbox.window.BUILTIN_BANK;
const validParts = new Set(["1", "2", "3", "4", "5", "6", "7"]);
const validDifficulties = new Set(["400", "600", "800"]);
const seen = new Set();
const errors = [];

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

if (Array.isArray(bank) && bank.length !== 908) errors.push(`Expected 908 questions, received ${bank.length}`);
const part1 = Array.isArray(bank) ? bank.filter((question) => String(question.part) === "1") : [];
if (part1.length !== 8) errors.push(`Expected 8 Part 1 questions, received ${part1.length}`);
if (sandbox.window.TOEIC_V31_ANNOTATION_COUNT !== 44) errors.push(`Expected 44 v3.1 annotations, applied ${sandbox.window.TOEIC_V31_ANNOTATION_COUNT}`);
const humanReviewed = Array.isArray(bank)
  ? bank.filter((question) => (question.tags || []).includes("literacy-core") && (question.tags || []).includes("human-reviewed"))
  : [];
if (humanReviewed.length !== 68) errors.push(`Expected 68 human-reviewed literacy questions, received ${humanReviewed.length}`);

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
