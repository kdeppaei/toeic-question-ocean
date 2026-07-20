const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const sandbox = { window: {} };
vm.createContext(sandbox);
const moduleFile = path.join(root, "modules", "toeic-learning-hub.js");
vm.runInContext(fs.readFileSync(moduleFile, "utf8"), sandbox, { filename: moduleFile });

const hub = sandbox.window.TOEIC_LEARNING_HUB || {};
const topics = hub.grammarTopics || [];
const collocations = hub.collocations || [];
const resources = hub.resources || [];
const topicIds = new Set();
const issues = [];

topics.forEach((topic, index) => {
  const label = topic.id || `topic-${index}`;
  if (!topic.id || topicIds.has(topic.id)) issues.push(`${label}: missing or duplicate id`);
  topicIds.add(topic.id);
  if (!["basic", "advanced"].includes(topic.level)) issues.push(`${label}: invalid level`);
  ["title", "summary", "rule"].forEach((field) => {
    if (!topic[field]) issues.push(`${label}: missing ${field}`);
  });
  if (!Array.isArray(topic.parts) || !topic.parts.length) issues.push(`${label}: missing parts`);
  if (!Array.isArray(topic.examples) || topic.examples.length < 2) issues.push(`${label}: needs at least two examples`);
  if (!Array.isArray(topic.pitfalls) || topic.pitfalls.length < 2) issues.push(`${label}: needs at least two pitfalls`);
  if (!(topic.matchTags?.length || topic.matchCategories?.length)) issues.push(`${label}: missing question mapping`);
});

collocations.forEach((item, index) => {
  const label = item.phrase || `collocation-${index}`;
  ["phrase", "zh", "category", "pattern", "example"].forEach((field) => {
    if (!item[field]) issues.push(`${label}: missing ${field}`);
  });
  if (!hub.collocationCategories?.[item.category]) issues.push(`${label}: unknown category`);
  if (!Array.isArray(item.parts) || !item.parts.length) issues.push(`${label}: missing parts`);
});

resources.forEach((resource, index) => {
  const label = resource.title || `resource-${index}`;
  ["title", "provider", "access", "license", "topic", "description"].forEach((field) => {
    if (!resource[field]) issues.push(`${label}: missing ${field}`);
  });
  if (!/^https:\/\//.test(resource.url || "")) issues.push(`${label}: resource URL must use HTTPS`);
});

if (topics.filter((topic) => topic.level === "basic").length < 10) issues.push("needs at least 10 basic grammar topics");
if (topics.filter((topic) => topic.level === "advanced").length < 8) issues.push("needs at least 8 advanced grammar topics");
if (collocations.length < 48) issues.push("needs at least 48 collocations");
if (resources.length < 6) issues.push("needs at least 6 learning resources");

console.log(JSON.stringify({
  grammarTopics: topics.length,
  basicTopics: topics.filter((topic) => topic.level === "basic").length,
  advancedTopics: topics.filter((topic) => topic.level === "advanced").length,
  collocations: collocations.length,
  resources: resources.length,
  issues
}, null, 2));

if (issues.length) process.exit(1);
