(function attachMockExamBuilder(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.TOEIC_MOCK_EXAM_BUILDER = api;
})(typeof window !== "undefined" ? window : null, function createMockExamBuilder() {
  const PART_ORDER = ["1", "2", "3", "4", "5", "6", "7"];
  const DEFAULT_BLUEPRINT = {
    "1": { count: 6, difficulty: { "400": 2, "600": 2, "800": 2 } },
    "2": { count: 25, difficulty: { "400": 7, "600": 10, "800": 8 } },
    "3": { count: 39, difficulty: { "400": 0, "600": 21, "800": 18 } },
    "4": { count: 30, difficulty: { "400": 0, "600": 18, "800": 12 } },
    "5": { count: 30, difficulty: { "400": 6, "600": 12, "800": 12 } },
    "6": { count: 16, difficulty: { "400": 0, "600": 8, "800": 8 } },
    "7": { count: 54, difficulty: { "400": 0, "600": 24, "800": 30 } }
  };

  const GENERIC_TAGS = new Set([
    "listening", "reading", "conversation", "talk", "part-1", "part-2",
    "part-3", "part-4", "part-5", "part-6", "part-7", "human-reviewed",
    "literacy-core", "evidence"
  ]);

  function unitize(questions) {
    const groups = new Map();
    (questions || []).forEach((question) => {
      const key = question.groupId || question.id;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(question);
    });
    return [...groups.entries()].map(([key, entries]) => ({
      key,
      questions: entries.slice().sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true })),
      size: entries.length,
      part: String(entries[0]?.part || ""),
      difficulty: String(entries[0]?.difficulty || "600"),
      category: String(entries[0]?.category || "未分類"),
      focus: focusFor(entries)
    }));
  }

  function focusFor(entries) {
    const tags = entries.flatMap((entry) => entry.tags || [])
      .map((tag) => String(tag).toLowerCase())
      .filter((tag) => tag && !GENERIC_TAGS.has(tag));
    return tags[0] || String(entries[0]?.category || "未分類");
  }

  function shuffled(values, random) {
    const output = values.slice();
    for (let index = output.length - 1; index > 0; index -= 1) {
      const target = Math.floor(random() * (index + 1));
      [output[index], output[target]] = [output[target], output[index]];
    }
    return output;
  }

  function exactSelection(orderedUnits, target) {
    const table = new Map([[0, []]]);
    orderedUnits.forEach((unit) => {
      [...table.entries()].sort((a, b) => b[0] - a[0]).forEach(([sum, chosen]) => {
        const next = sum + unit.size;
        if (next <= target && !table.has(next)) table.set(next, [...chosen, unit]);
      });
    });
    return table.get(target) || null;
  }

  function diversityPenalty(units, recentIds, difficultyTarget) {
    const categoryCounts = {};
    const focusCounts = {};
    const difficultyCounts = { "400": 0, "600": 0, "800": 0 };
    let recentQuestions = 0;

    units.forEach((unit) => {
      categoryCounts[unit.category] = (categoryCounts[unit.category] || 0) + 1;
      focusCounts[unit.focus] = (focusCounts[unit.focus] || 0) + 1;
      unit.questions.forEach((question) => {
        const level = String(question.difficulty || "600");
        difficultyCounts[level] = (difficultyCounts[level] || 0) + 1;
        if (recentIds.has(question.id)) recentQuestions += 1;
      });
    });

    const repetition = Object.values(categoryCounts)
      .reduce((sum, count) => sum + Math.max(0, count - 1) ** 2, 0);
    const focusRepetition = Object.values(focusCounts)
      .reduce((sum, count) => sum + Math.max(0, count - 1) ** 2, 0);
    const difficultyDrift = Object.entries(difficultyTarget || {})
      .reduce((sum, [level, target]) => sum + Math.abs((difficultyCounts[level] || 0) - target), 0);

    return difficultyDrift * 40 + recentQuestions * 8 + repetition * 1.5 + focusRepetition * 2;
  }

  function chooseExact(units, target, options = {}) {
    const random = options.random || Math.random;
    const recentIds = options.recentIds || new Set();
    const difficultyTarget = options.difficultyTarget || {};
    const trials = Math.max(12, Number(options.trials) || 48);
    let best = null;
    let bestPenalty = Number.POSITIVE_INFINITY;

    for (let trial = 0; trial < trials; trial += 1) {
      const ordered = shuffled(units, random).sort((left, right) => {
        const leftRecent = left.questions.filter((question) => recentIds.has(question.id)).length / left.size;
        const rightRecent = right.questions.filter((question) => recentIds.has(question.id)).length / right.size;
        return leftRecent - rightRecent || random() - 0.5;
      });
      const selected = exactSelection(ordered, target);
      if (!selected) continue;
      const penalty = diversityPenalty(selected, recentIds, difficultyTarget);
      if (penalty < bestPenalty) {
        best = selected;
        bestPenalty = penalty;
      }
    }
    return best;
  }

  function choosePart(units, config, options) {
    const allUnitsHomogeneous = units.every((unit) =>
      unit.questions.every((question) => String(question.difficulty || "600") === unit.difficulty)
    );
    const byDifficulty = new Map(["400", "600", "800"].map((level) => [
      level,
      units.filter((unit) => unit.difficulty === level)
    ]));
    const selected = [];
    let exactByDifficulty = allUnitsHomogeneous;

    Object.entries(config.difficulty).forEach(([level, target]) => {
      if (!exactByDifficulty) return;
      if (!target) return;
      const choice = chooseExact(byDifficulty.get(level) || [], target, {
        ...options,
        difficultyTarget: { [level]: target }
      });
      if (!choice) exactByDifficulty = false;
      else selected.push(...choice);
    });

    if (exactByDifficulty && selected.reduce((sum, unit) => sum + unit.size, 0) === config.count) {
      return selected;
    }

    return chooseExact(units, config.count, {
      ...options,
      difficultyTarget: config.difficulty,
      trials: Math.max(180, Number(options.trials) || 0)
    });
  }

  function arrangeUnits(units, random) {
    const remaining = shuffled(units, random);
    const ordered = [];
    while (remaining.length) {
      const previous = ordered[ordered.length - 1];
      const candidates = remaining.map((unit, index) => {
        const sameCategory = previous && unit.category === previous.category ? 2 : 0;
        const sameFocus = previous && unit.focus === previous.focus ? 1 : 0;
        return { unit, index, penalty: sameCategory + sameFocus + random() * 0.25 };
      }).sort((a, b) => a.penalty - b.penalty);
      const next = candidates[0];
      ordered.push(next.unit);
      remaining.splice(next.index, 1);
    }
    return ordered;
  }

  function diagnosticsFor(unitsByPart, blueprint, recentIds) {
    const partCounts = {};
    const difficultyCounts = {};
    const categoryCounts = {};
    const ids = [];
    let recentOverlap = 0;

    PART_ORDER.forEach((part) => {
      const units = unitsByPart[part] || [];
      const questions = units.flatMap((unit) => unit.questions);
      partCounts[part] = questions.length;
      difficultyCounts[part] = { "400": 0, "600": 0, "800": 0 };
      categoryCounts[part] = {};
      questions.forEach((question) => {
        ids.push(question.id);
        const level = String(question.difficulty || "600");
        difficultyCounts[part][level] = (difficultyCounts[part][level] || 0) + 1;
        categoryCounts[part][question.category] = (categoryCounts[part][question.category] || 0) + 1;
        if (recentIds.has(question.id)) recentOverlap += 1;
      });
    });

    return {
      total: ids.length,
      partCounts,
      difficultyCounts,
      difficultyTargets: Object.fromEntries(PART_ORDER.map((part) => [part, blueprint[part].difficulty])),
      categoryCounts,
      recentOverlap,
      duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index)
    };
  }

  function build(bank, options = {}) {
    const random = options.random || Math.random;
    const blueprint = options.blueprint || DEFAULT_BLUEPRINT;
    const recentIds = new Set(options.recentIds || []);
    const unitsByPart = {};

    PART_ORDER.forEach((part) => {
      const units = unitize((bank || []).filter((question) => String(question.part) === part));
      const selected = choosePart(units, blueprint[part], {
        random,
        recentIds,
        trials: options.trials
      });
      if (!selected) throw new Error(`Part ${part} 無法依分層規格組成 ${blueprint[part].count} 題`);
      unitsByPart[part] = arrangeUnits(selected, random);
    });

    const diagnostics = diagnosticsFor(unitsByPart, blueprint, recentIds);
    if (diagnostics.total !== 200 || diagnostics.duplicateIds.length) {
      throw new Error("模考組卷稽核失敗：題數或題目唯一性不符規格");
    }
    return { unitsByPart, diagnostics, blueprint };
  }

  return {
    PART_ORDER,
    DEFAULT_BLUEPRINT,
    unitize,
    build
  };
});
