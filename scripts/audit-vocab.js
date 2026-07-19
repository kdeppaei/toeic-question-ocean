const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const sandbox = { window: {} };
vm.createContext(sandbox);

fs.readdirSync(root)
  .filter((file) => /^question-bank.*\.js$/.test(file))
  .sort((a, b) => (a === "question-bank.js" ? -1 : b === "question-bank.js" ? 1 : a.localeCompare(b)))
  .forEach((file) => vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox, { filename: file }));
fs.readdirSync(root)
  .filter((file) => /^vocab-lexicon.*\.js$/.test(file))
  .sort((a, b) => (a === "vocab-lexicon.js" ? -1 : b === "vocab-lexicon.js" ? 1 : a.localeCompare(b)))
  .forEach((file) => vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox, { filename: file }));

const appSource = fs.readFileSync(path.join(root, "app.js"), "utf8");
const stopWordBlock = appSource.match(/const AUTO_VOCAB_STOP_WORDS = new Set\(\[([\s\S]*?)\]\);/);
if (!stopWordBlock) throw new Error("Could not locate AUTO_VOCAB_STOP_WORDS in app.js.");

const stopWords = new Set([...stopWordBlock[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]));
const bank = sandbox.window.BUILTIN_BANK || [];
const lexicon = sandbox.window.TOEIC_VOCAB_LEXICON || {};
const irregularKeys = {
  held: "hold",
  sent: "send",
  women: "woman"
};

function normalizeWord(raw) {
  return String(raw || "")
    .toLowerCase()
    .replace(/^'+|'+$/g, "")
    .replace(/'s$/, "")
    .replace(/[^a-z-]/g, "")
    .replace(/^-+|-+$/g, "");
}

function lexiconKey(word) {
  if (lexicon[word]) return word;
  if (irregularKeys[word] && lexicon[irregularKeys[word]]) return irregularKeys[word];
  const candidates = [];
  if (word.endsWith("ies")) candidates.push(`${word.slice(0, -3)}y`);
  if (word.endsWith("ves")) candidates.push(`${word.slice(0, -3)}f`);
  if (word.endsWith("ing")) {
    const stem = word.slice(0, -3);
    candidates.push(stem, `${stem}e`, stem.replace(/(.)\1$/, "$1"));
  }
  if (word.endsWith("ed")) {
    const stem = word.slice(0, -2);
    candidates.push(stem, `${stem}e`, stem.replace(/(.)\1$/, "$1"));
  }
  if (word.endsWith("es")) {
    const stem = word.slice(0, -2);
    candidates.push(stem, `${stem}e`, word.slice(0, -1));
  }
  if (word.endsWith("s")) candidates.push(word.slice(0, -1));
  return candidates.find((candidate) => lexicon[candidate]) || word;
}

function buildEntries() {
  const entries = new Map();
  bank.forEach((question) => {
    const text = [
      question.prompt,
      ...(question.choices || []),
      question.passage,
      question.audioText
    ].filter(Boolean).join(" ");

    for (const match of text.matchAll(/[A-Za-z][A-Za-z'-]*/g)) {
      const normalized = normalizeWord(match[0]);
      if (
        !normalized ||
        normalized.length < 4 ||
        normalized.includes("-") ||
        normalized.includes("'") ||
        stopWords.has(normalized)
      ) continue;

      const key = lexiconKey(normalized);
      if (stopWords.has(key)) continue;
      const current = entries.get(key) || {
        word: key,
        count: 0,
        parts: new Set(),
        questionIds: new Set(),
        known: Boolean(lexicon[key]?.pos && lexicon[key]?.kk && lexicon[key]?.zh)
      };
      current.count += 1;
      current.parts.add(String(question.part));
      current.questionIds.add(question.id);
      entries.set(key, current);
    }
  });

  return [...entries.values()].map((entry) => {
    const { questionIds, ...summary } = entry;
    return {
      ...summary,
      parts: [...entry.parts].sort((a, b) => Number(a) - Number(b)),
      questionCount: questionIds.size
    };
  });
}

const entries = buildEntries();
const pending = entries
  .filter((entry) => !entry.known)
  .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word));
const incomplete = Object.entries(lexicon)
  .filter(([, entry]) => !entry?.pos || !entry?.kk || !entry?.zh)
  .map(([word, entry]) => ({
    word,
    missing: ["pos", "kk", "zh"].filter((field) => !entry?.[field])
  }));
const topArg = process.argv.find((argument) => argument.startsWith("--top="));
const top = Math.max(0, Number(topArg?.split("=")[1] || 80));
const report = {
  questions: bank.length,
  candidates: entries.length,
  completeCandidates: entries.length - pending.length,
  pendingCandidates: pending.length,
  lexiconEntries: Object.keys(lexicon).length,
  incompleteEntries: incomplete,
  topPending: pending.slice(0, top)
};

console.log(JSON.stringify(report, null, 2));
if (process.argv.includes("--check") && incomplete.length) process.exit(1);
