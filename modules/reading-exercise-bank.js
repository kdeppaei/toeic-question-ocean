(() => {
  const guides = window.TOEIC_READING_EXERCISE_GUIDES;
  if (!guides || !Array.isArray(window.BUILTIN_BANK)) return;

  const answerIndex = (letter) => Math.max(0, "ABCD".indexOf(String(letter || "").toUpperCase()));
  const difficultyFor = (part, testPoint = "") => {
    if (part === "7" && /推論|字義|跨|意圖|計算|整合/.test(testPoint)) return "800";
    if (part === "6" && /句子插入|篇章|假設|完成式|倒裝/.test(testPoint)) return "800";
    return "600";
  };

  Object.values(guides).forEach((guide) => {
    guide.exercises.forEach((exercise) => {
      exercise.documents.forEach((document) => {
        const groupId = `P${guide.part}-E${String(exercise.exercise).padStart(2, "0")}-D${String(document.document).padStart(2, "0")}`;
        document.questions.forEach((question) => {
          const isPart6 = guide.part === "6";
          const explanation = [
            question.explanation,
            question.evidenceNote ? `答案線索：${question.evidenceNote}` : "",
            question.distractorAnalysis
          ].filter(Boolean).join(" ");
          window.BUILTIN_BANK.push({
            id: `P${guide.part}-E${String(exercise.exercise).padStart(2, "0")}-Q${String(question.number).padStart(2, "0")}`,
            part: guide.part,
            difficulty: difficultyFor(guide.part, question.testPoint),
            category: isPart6 ? document.title.replace(/^文件\s*\d+[：:]\s*/, "") : document.sourceType,
            prompt: question.prompt,
            choices: question.choices,
            answer: answerIndex(question.correctOption),
            explanation,
            translation: isPart6 ? question.translation : question.promptZh,
            passage: document.text,
            audioText: "",
            groupId,
            formatType: isPart6 ? "part6-text-completion" : "part7-reading-comprehension",
            exerciseSet: exercise.exercise,
            studySetPart: guide.part,
            literacySkill: isPart6 ? "" : question.testPoint,
            tags: [
              `part${guide.part}`,
              "exercise-set",
              "user-provided",
              isPart6 ? "text-completion" : "reading",
              ...(isPart6 ? ["sentence-insertion"] : ["literacy-practice"])
            ],
            sourceType: "user",
            sourceLabel: `使用者整理 × ${guide.sourceName}`,
            sourceProvider: guide.sourceName,
            sourceUrl: exercise.sourceUrl,
            sourceDetail: `由使用者提供的 Part ${guide.part} 全題詳解整理檔匯入，保留原始練習連結。`
          });
        });
      });
    });
  });
})();
