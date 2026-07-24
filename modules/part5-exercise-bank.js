(() => {
  const guide = window.TOEIC_PART5_EXERCISE_GUIDES;
  if (!guide?.exercises?.length || !Array.isArray(window.BUILTIN_BANK)) return;

  const optionIndex = (letter) => Math.max(0, "ABCD".indexOf(String(letter || "").toUpperCase()));
  const categoryFor = (testPoint = "") => {
    if (/固定搭配|搭配|片語動詞/.test(testPoint)) return "固定搭配";
    if (/詞性|形容詞|副詞|名詞/.test(testPoint)) return "詞性";
    if (/時態|完成式/.test(testPoint)) return "時態";
    if (/被動/.test(testPoint)) return "被動語態";
    if (/連接詞|條件|讓步|對比/.test(testPoint)) return "連接詞";
    if (/代名詞|關係/.test(testPoint)) return "代名詞";
    return "商務字彙";
  };
  const difficultyFor = (testPoint = "") => {
    if (/倒裝|假設|完成式|分詞構句|關係副詞/.test(testPoint)) return "800";
    if (/固定搭配|搭配|時態|被動|連接詞|代名詞/.test(testPoint)) return "600";
    return "400";
  };
  const tagsFor = (testPoint = "") => {
    const tags = ["part5", "exercise-set", "user-provided"];
    if (/固定搭配|搭配/.test(testPoint)) tags.push("collocation");
    if (/片語動詞/.test(testPoint)) tags.push("phrasal-verb");
    if (/詞性/.test(testPoint)) tags.push("word-form");
    if (/時態|完成式/.test(testPoint)) tags.push("tense");
    if (/被動/.test(testPoint)) tags.push("passive");
    if (/連接詞|條件|讓步|對比/.test(testPoint)) tags.push("logic");
    return tags;
  };

  guide.exercises.forEach((exercise) => {
    exercise.questions.forEach((question) => {
      window.BUILTIN_BANK.push({
        id: `P5-E${String(exercise.exercise).padStart(2, "0")}-Q${String(question.number).padStart(2, "0")}`,
        part: "5",
        difficulty: difficultyFor(question.testPoint),
        category: categoryFor(question.testPoint),
        prompt: question.prompt,
        choices: question.choices,
        answer: optionIndex(question.correctOption),
        explanation: `${question.explanation} ${question.distractorAnalysis}`,
        translation: question.translation,
        passage: "",
        audioText: "",
        formatType: "part5-exercise-set",
        exerciseSet: exercise.exercise,
        tags: tagsFor(question.testPoint),
        sourceType: "user",
        sourceLabel: "使用者整理 × ESL Lounge",
        sourceProvider: guide.sourceName,
        sourceUrl: exercise.sourceUrl,
        sourceDetail: "由使用者提供的 Part 5 全題詳解整理檔匯入，保留原始練習連結。"
      });
    });
  });

  const hub = window.TOEIC_LEARNING_HUB;
  if (!hub?.collocations) return;
  const existing = new Set(hub.collocations.map((item) => item.phrase.toLowerCase()));
  const categoryForPhrase = (phrase) => {
    if (/flight|hotel|room|departure|airport|travel|reservation/i.test(phrase)) return "travel";
    if (/invoice|payment|budget|cost|fund|expense|financial/i.test(phrase)) return "finance";
    if (/interview|staff|employee|position|qualification|training/i.test(phrase)) return "hr";
    if (/customer|order|refund|complaint|warranty|service/i.test(phrase)) return "customer";
    if (/meeting|consensus|call|presentation|proposal|decision/i.test(phrase)) return "meetings";
    return "operations";
  };

  guide.exercises.flatMap((exercise) => exercise.questions).forEach((question) => {
    if (!/固定搭配|搭配/.test(question.testPoint || "")) return;
    const phrase = String(question.testPoint).split(/[：:]/).slice(1).join(":").trim();
    if (!phrase || existing.has(phrase.toLowerCase())) return;
    existing.add(phrase.toLowerCase());
    hub.collocations.push({
      phrase,
      zh: question.explanation.split("，")[0].replace(`${phrase} 表示`, "").trim() || question.translation,
      category: categoryForPhrase(phrase),
      pattern: "題庫高頻搭配",
      parts: ["5"],
      example: question.completedSentence
    });
  });
})();
