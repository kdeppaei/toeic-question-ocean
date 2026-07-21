const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const cards = JSON.parse(fs.readFileSync(path.join(root, "data", "toeic-five-day-handbook-v0.1.json"), "utf8"));
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, "modules", "five-day-sprint.js"), "utf8"), context);
const sprint = context.window.TOEIC_FIVE_DAY_SPRINT;
const issues = [];
const ids = new Set();

if (!Array.isArray(cards.cards) || cards.cards.length !== 103) issues.push(`expected 103 cards, received ${cards.cards?.length || 0}`);
for (const card of cards.cards || []) {
  if (!card.id || ids.has(card.id)) issues.push(`invalid or duplicate card id: ${card.id || "missing"}`);
  ids.add(card.id);
  for (const field of ["category", "title", "rule"]) if (!String(card[field] || "").trim()) issues.push(`${card.id}: missing ${field}`);
  if (!Array.isArray(card.examples) || !Array.isArray(card.traps)) issues.push(`${card.id}: examples and traps must be arrays`);
}
if (sprint.days?.length !== 5) issues.push("sprint must contain exactly five days");
if (sprint.sources?.length !== 3) issues.push("sprint must contain exactly three primary sources");
if (sprint.sources?.reduce((sum, source) => sum + source.ratio, 0) !== 100) issues.push("source ratios must total 100");
if (sprint.errorTags?.map(tag => tag.id).join("") !== "VGLPTC") issues.push("error tags must be V/G/L/P/T/C");
for (const source of sprint.sources || []) if (!/^https:\/\//.test(source.url || "")) issues.push(`${source.id}: source URL must use HTTPS`);

console.log(JSON.stringify({ cards: cards.cards?.length || 0, days: sprint.days?.length || 0, sources: sprint.sources?.length || 0, issues }, null, 2));
if (issues.length) process.exit(1);
