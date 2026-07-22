(() => {
  const VALID_TYPES = new Set(["original", "official", "licensed", "external", "user"]);
  const DEFAULT_ORIGINAL = {
    type: "original",
    label: "本站原創模擬",
    provider: "TOEIC Question Ocean",
    url: "",
    detail: "題文、選項與解析由本站自行撰寫；外部資料僅用於核對題型與作答節奏。"
  };

  const clean = (value, max = 500) => String(value ?? "").trim().slice(0, max);
  const httpsUrl = (value) => {
    const url = clean(value, 500);
    return /^https:\/\//i.test(url) ? url : "";
  };

  function resolve(question = {}) {
    const type = VALID_TYPES.has(question.sourceType) ? question.sourceType : "";
    if (type === "user") {
      const declared = clean(question.sourceLabel, 80);
      return {
        type: "user",
        label: declared && declared !== "個人匯入" ? `個人匯入 · ${declared}` : "個人匯入",
        provider: "使用者",
        url: "",
        detail: clean(question.sourceDetail, 500) || "此題由使用者匯入，來源文字未經本站授權驗證。"
      };
    }
    if (type) {
      return {
        type,
        label: clean(question.sourceLabel, 80) || DEFAULT_ORIGINAL.label,
        provider: clean(question.sourceProvider, 80) || (type === "original" ? DEFAULT_ORIGINAL.provider : "外部來源"),
        url: httpsUrl(question.sourceUrl),
        detail: clean(question.sourceDetail || question.sourceNote, 500) || DEFAULT_ORIGINAL.detail
      };
    }
    return { ...DEFAULT_ORIGINAL };
  }

  window.TOEIC_QUESTION_PROVENANCE = { version: "1.0", validTypes: [...VALID_TYPES], resolve };
})();
