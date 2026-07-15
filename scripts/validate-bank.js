const fs = require("fs");
const vm = require("vm");

const source = fs.readFileSync("question-bank.js", "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);

const bank = sandbox.window.BUILTIN_BANK;
const validParts = new Set(["2", "3", "4", "5", "6", "7"]);
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
  });
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${bank.length} questions.`);
