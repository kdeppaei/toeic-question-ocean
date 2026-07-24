(function attachQuestionAudit(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.TOEIC_QUESTION_AUDIT = api;
})(typeof window !== "undefined" ? window : null, function createQuestionAudit() {
  const normalized = (value) => String(value ?? "")
    .normalize("NFKC")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

  const issue = (severity, code, message) => ({ severity, code, message });

  function explicitAnswerClaims(explanation) {
    const text = String(explanation || "");
    const patterns = [
      /(?:正解|答案)\s*(?:是|為|：|:)\s*([A-D])(?=$|[\s。．、，；：])/gi,
      /(?:因此|所以|故)\s*選\s*([A-D])(?=$|[\s。．、，；：])/gi
    ];
    return patterns.flatMap((pattern) => [...text.matchAll(pattern)].map((match) => match[1].toUpperCase()));
  }

  function hasProbableDoubleSubject(question) {
    const prompt = String(question.prompt || "");
    const blankIndex = prompt.indexOf("_____");
    if (blankIndex < 0) return false;
    const afterBlank = prompt.slice(blankIndex + 5).trim();
    const correctChoice = String(question.choices?.[question.answer] || "").trim();
    const choiceAddsSubject = /^(?:am|is|are|was|were|be|been|has|have|had|do|does|did|will|would|can|could|should|may|might|must)\s+(?:i|you|he|she|it|we|they)$/i.test(correctChoice);
    const promptAlreadyStartsSubject = /^(?:the|a|an|this|that|these|those|my|your|his|her|its|our|their)\s+[a-z]/i.test(afterBlank);
    return choiceAddsSubject && promptAlreadyStartsSubject;
  }

  function auditQuestion(question) {
    const issues = [];
    if (!question || typeof question !== "object") return [issue("error", "invalid-question", "題目不是有效物件。")];

    const choices = Array.isArray(question.choices) ? question.choices : [];
    const normalizedChoices = choices.map(normalized);
    const duplicateChoices = normalizedChoices.filter((choice, index) => choice && normalizedChoices.indexOf(choice) !== index);
    if (duplicateChoices.length) {
      issues.push(issue("error", "duplicate-choices", "選項文字重複，無法形成有效鑑別度。"));
    }

    const correctChoice = choices[question.answer];
    if (typeof correctChoice !== "string" || !correctChoice.trim()) {
      issues.push(issue("error", "missing-correct-choice", "答案索引沒有對應到有效選項。"));
    }

    const expectedLetter = Number.isInteger(question.answer) ? String.fromCharCode(65 + question.answer) : "";
    const conflictingClaims = explicitAnswerClaims(question.explanation).filter((letter) => letter !== expectedLetter);
    if (conflictingClaims.length) {
      issues.push(issue("error", "answer-explanation-conflict", `詳解聲稱答案為 ${[...new Set(conflictingClaims)].join("、")}，但答案索引是 ${expectedLetter}。`));
    }

    if (question.answerAudit && normalized(question.answerAudit) !== normalized(correctChoice)) {
      issues.push(issue("error", "answer-audit-conflict", "人工答案核對值與實際正解選項不一致。"));
    }

    if (hasProbableDoubleSubject(question)) {
      issues.push(issue("error", "probable-double-subject", "正解選項自帶代名詞，但空格後已有名詞主詞，疑似形成雙主詞。"));
    }

    if (String(question.part) === "5") {
      if (!String(question.prompt || "").includes("_____")) {
        issues.push(issue("warning", "part5-missing-blank", "Part 5 題幹沒有標準五底線空格。"));
      }
      if (!String(question.translation || "").trim()) {
        issues.push(issue("warning", "missing-translation", "Part 5 題目缺少中文翻譯。"));
      }
    }

    if (String(question.part) === "6") {
      const prompt = String(question.prompt || "");
      const passage = String(question.passage || "");
      if (!question.groupId) {
        issues.push(issue("error", "part6-missing-group", "Part 6 題目必須屬於同篇四題的段落填空題組。"));
      }
      if (!/_{3,}/.test(prompt) && !/(?:blank|空格)/i.test(prompt)) {
        issues.push(issue("error", "part6-comprehension-question", "Part 6 只能測驗段落中的字詞、片語或整句空格，不應使用一般閱讀理解問句。"));
      }
      if (!/_{3,}/.test(passage)) {
        issues.push(issue("error", "part6-passage-missing-blank", "Part 6 文章必須保留可辨識的填答空格。"));
      }
    }

    if (String(question.part) === "7") {
      const prompt = String(question.prompt || "");
      if (/(?:best (?:answer|word|phrase|sentence).*(?:blank)|complete the text|填入空格)/i.test(prompt)) {
        issues.push(issue("error", "part7-cloze-question", "Part 7 應為文件閱讀理解，不應混入 Part 6 的段落填空指令。"));
      }
    }

    if ((question.tags || []).includes("literacy-core")) {
      const evidence = String(question.evidence || "").trim();
      const passage = String(question.passage || "");
      if (!evidence) {
        issues.push(issue("error", "missing-evidence", "閱讀素養題缺少人工線索句。"));
      } else if (!passage.includes(evidence)) {
        issues.push(issue("error", "evidence-not-in-passage", "人工線索句未逐字出現在文章中，無法可靠標示。"));
      }
      if (!String(question.evidenceLocation || "").trim()) {
        issues.push(issue("error", "missing-evidence-location", "閱讀素養題缺少線索位置標籤。"));
      }
      if (!Array.isArray(question.choiceNotes) || question.choiceNotes.length !== choices.length || question.choiceNotes.some((note) => !String(note || "").trim())) {
        issues.push(issue("error", "invalid-choice-notes", "閱讀素養題必須為每個選項提供完整診斷。"));
      }
    }

    return issues;
  }

  function auditBank(bank) {
    const questions = Array.isArray(bank) ? bank : [];
    const byId = {};
    const bankIssues = [];
    const part5Prompts = new Map();
    const part6Groups = new Map();

    questions.forEach((question) => {
      const id = String(question?.id || "(missing id)");
      const issues = auditQuestion(question);
      if (issues.length) byId[id] = issues;

      if (String(question?.part) === "5") {
        const key = normalized(question.prompt);
        if (key && part5Prompts.has(key)) {
          const firstId = part5Prompts.get(key);
          const duplicate = issue("error", "duplicate-part5-prompt", `Part 5 題幹與 ${firstId} 完全重複。`);
          byId[id] = [...(byId[id] || []), duplicate];
          byId[firstId] = [...(byId[firstId] || []), issue("error", "duplicate-part5-prompt", `Part 5 題幹與 ${id} 完全重複。`)];
        } else if (key) {
          part5Prompts.set(key, id);
        }
      }

      if (String(question?.part) === "6" && question.groupId) {
        if (!part6Groups.has(question.groupId)) part6Groups.set(question.groupId, []);
        part6Groups.get(question.groupId).push(question.id);
      }
    });

    part6Groups.forEach((ids, groupId) => {
      if (ids.length === 4) return;
      ids.forEach((id) => {
        byId[id] = [
          ...(byId[id] || []),
          issue("error", "part6-invalid-group-size", `Part 6 題組 ${groupId} 應恰好包含 4 題，目前為 ${ids.length} 題。`)
        ];
      });
    });

    Object.entries(byId).forEach(([id, issues]) => {
      issues.forEach((entry) => bankIssues.push({ id, ...entry }));
    });

    return {
      byId,
      issues: bankIssues,
      errors: bankIssues.filter((entry) => entry.severity === "error"),
      warnings: bankIssues.filter((entry) => entry.severity === "warning"),
      checked: questions.length
    };
  }

  return { auditQuestion, auditBank };
});
