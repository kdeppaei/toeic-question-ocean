(() => {
  const provenance = {
    sourceType: "original",
    sourceLabel: "本站原創模擬",
    sourceProvider: "TOEIC Question Ocean",
    sourceDetail: "本站依多益職場情境與題型結構自行撰寫，未複製 ETS、abceed 或獵頓英語題文。"
  };
  const sourceNote = "Original TOEIC-style simulation items for v4.3. External platforms were reviewed only for study workflows; no third-party item text was copied.";
  const items = [
    {
      id: "P5-321", part: "5", difficulty: "600", category: "條件連接詞",
      prompt: "Employees may access the research database remotely _____ they complete the new security training.",
      choices: ["provided that", "despite", "in addition to", "otherwise"], answer: 0,
      explanation: "provided that 後接完整子句，表示「條件是、只要」。despite 後面須接名詞或動名詞，不能直接接 they complete。",
      translation: "員工只要完成新的資安訓練，就可以遠端存取研究資料庫。",
      tags: ["condition", "conjunction", "security"]
    },
    {
      id: "P5-322", part: "5", difficulty: "800", category: "分詞構句",
      prompt: "_____ of the revised reporting requirement, the regional offices updated their templates before Friday.",
      choices: ["Having informed", "Having been informed", "To inform", "Informing"], answer: 1,
      explanation: "各地辦公室是「被通知」新規定，且通知先於更新範本，因此使用完成式被動分詞構句 Having been informed。",
      translation: "各地辦公室在得知修訂後的報告規定後，於星期五前更新了範本。",
      tags: ["participle-clause", "passive", "sequence"]
    },
    {
      id: "P5-323", part: "5", difficulty: "600", category: "詞性",
      prompt: "The audit team reviewed each automated recommendation _____ before approving the final report.",
      choices: ["independence", "independent", "independently", "depending"], answer: 2,
      explanation: "空格修飾動詞 reviewed，應使用副詞 independently，表示每項建議都經過獨立審查。",
      translation: "稽核團隊在核准最終報告前，逐一獨立審查每項自動化建議。",
      tags: ["word-form", "adverb", "ai-governance"]
    },
    {
      id: "P5-324", part: "5", difficulty: "800", category: "主動詞一致",
      prompt: "Neither the raw sensor data nor the summary generated from it _____ sufficient for the safety review.",
      choices: ["are", "were", "have been", "is"], answer: 3,
      explanation: "neither A nor B 的動詞通常與較近主詞一致；較近的 summary 是單數，因此使用 is。",
      translation: "原始感測資料和由它產生的摘要，都不足以用於安全審查。",
      tags: ["subject-verb-agreement", "neither-nor", "data"]
    }
  ].map(item => ({ ...item, passage: "", audioText: "", ...provenance, sourceNote }));

  const readingGroups = [
    {
      groupId: "P7-R77", difficulty: "800", category: "雙篇閱讀・AI 採購",
      passage: `DOCUMENT 1 — PROCUREMENT NOTICE\n\nBeginning September 1, departments requesting generative-AI services must attach a risk summary to the purchase request. The summary should identify the types of company data the service will process and state whether a human reviewer can override its output. Requests involving customer records will also require approval from the privacy office. Existing subscriptions may continue until renewal, when the same review will apply.\n\nDOCUMENT 2 — E-MAIL\n\nFrom: Mina Cho, Marketing Operations\nTo: Privacy Office\nSubject: Translation subscription\n\nOur translation platform renews on August 28. The vendor recently added an optional generative feature, but our team has not enabled it. We use the platform only for public product descriptions and manually approve every translation. Please let me know whether the new risk-summary form is required for this renewal.`,
      questions: [
        {
          id: "P7-R77-Q1", prompt: "According to Document 1, what must a risk summary describe?",
          choices: ["The vendor's annual revenue", "The data processed by the service", "The number of competing products", "The department's training schedule"], answer: 1,
          explanation: "採購通知明確要求風險摘要指出服務會處理哪些公司資料，並說明人工覆核能力。",
          translation: "根據文件一，風險摘要必須說明什麼？",
          evidence: "The summary should identify the types of company data the service will process",
          evidenceLocation: "文件一第 2 句｜風險摘要內容",
          answerAudit: "The data processed by the service",
          choiceNotes: ["文件未要求財務資料。", "正確，直接改寫 types of company data。", "沒有比較競品。", "沒有要求訓練時程。"],
          tags: ["reading", "evidence", "data-governance", "literacy-core", "human-reviewed"]
        },
        {
          id: "P7-R77-Q2", prompt: "Why does Ms. Cho most likely contact the privacy office?",
          choices: ["To request access to customer records", "To report an incorrect translation", "To determine whether a new form applies", "To cancel the platform immediately"], answer: 2,
          explanation: "郵件最後直接詢問此次續約是否需要新的風險摘要表，因此目的在確認新規是否適用。",
          translation: "Cho 女士最可能為何聯絡隱私辦公室？",
          evidence: "Please let me know whether the new risk-summary form is required for this renewal.",
          evidenceLocation: "文件二最後一句｜聯絡目的",
          answerAudit: "To determine whether a new form applies",
          choiceNotes: ["她說使用公開產品說明，未提客戶資料。", "未回報翻譯錯誤。", "正確，對應郵件最後一句。", "她在詢問規定，不是立即取消。"],
          tags: ["reading", "purpose", "cross-document", "literacy-core", "human-reviewed"]
        },
        {
          id: "P7-R77-Q3", prompt: "What is suggested about the translation platform?",
          choices: ["Its renewal occurs before the new policy begins", "It cannot process public information", "Its generative feature is mandatory", "It has already been approved by the privacy office"], answer: 0,
          explanation: "平台 8 月 28 日續約，新規 9 月 1 日生效；跨文件比對可知續約早於新政策開始。",
          translation: "關於該翻譯平台，可推知什麼？",
          evidence: "Our translation platform renews on August 28.",
          evidenceLocation: "文件一第 1 句 + 文件二第 2 句｜日期交叉推論",
          answerAudit: "Its renewal occurs before the new policy begins",
          choiceNotes: ["正確，需要跨文件比較日期。", "郵件說它用於公開產品說明。", "生成式功能是 optional，且尚未啟用。", "郵件正在詢問，不能推定已核准。"],
          tags: ["reading", "date-inference", "cross-document", "literacy-core", "human-reviewed"]
        }
      ]
    },
    {
      groupId: "P7-R78", difficulty: "800", category: "雙篇閱讀・碳排資料",
      passage: `DOCUMENT 1 — FACILITY BULLETIN\n\nThe Riverside distribution center will test battery-powered delivery carts from October 6 through October 31. During the trial, charging electricity will be measured separately from the building's regular use. Supervisors should upload weekly distance totals every Monday. The sustainability team will compare energy use per kilometer with the center's current diesel carts before deciding whether to expand the program.\n\nDOCUMENT 2 — MESSAGE THREAD\n\nAri: Monday's distance report shows only 420 kilometers, but the route dashboard shows 510.\nLeah: The report excludes the two carts assigned to driver training. Their chargers are connected to the regular building meter, not the trial meter.\nAri: Then the energy-per-kilometer result could look worse than it really is.\nLeah: Agreed. I'll add the training distance in a separate note and flag the meter setup for the sustainability team.`,
      questions: [
        {
          id: "P7-R78-Q1", prompt: "What will the sustainability team use to evaluate the trial?",
          choices: ["The number of new delivery routes", "Energy consumption per kilometer", "Weekly driver attendance", "The price of the building meter"], answer: 1,
          explanation: "公告說團隊會比較 energy use per kilometer，再決定是否擴大計畫。",
          translation: "永續團隊會用什麼評估試行計畫？",
          evidence: "The sustainability team will compare energy use per kilometer",
          evidenceLocation: "文件一最後一句｜評估指標",
          answerAudit: "Energy consumption per kilometer",
          choiceNotes: ["沒有以路線數量評估。", "正確，為公告的直接證據。", "未提駕駛出席率。", "未比較電表價格。"],
          tags: ["reading", "metric", "evidence", "literacy-core", "human-reviewed"]
        },
        {
          id: "P7-R78-Q2", prompt: "Why do the two distance totals differ?",
          choices: ["Some training carts were omitted from the report", "The route dashboard stopped working", "A supervisor uploaded the report late", "Diesel carts used the same chargers"], answer: 0,
          explanation: "Leah 說報告排除了兩台用於駕駛訓練的推車，因此報告里程低於路線儀表板。",
          translation: "兩個里程總數為何不同？",
          evidence: "The report excludes the two carts assigned to driver training.",
          evidenceLocation: "文件二 Leah 第 1 則訊息｜數據差異原因",
          answerAudit: "Some training carts were omitted from the report",
          choiceNotes: ["正確，直接說明 90 公里的落差來源。", "儀表板有數據，未說故障。", "問題是遺漏，不是遲交。", "柴油車並未使用充電器。"],
          tags: ["reading", "cause", "data-quality", "literacy-core", "human-reviewed"]
        },
        {
          id: "P7-R78-Q3", prompt: "What concern does Ari express?",
          choices: ["The trial will end earlier than planned", "The carts cannot complete their routes", "The comparison may unfairly disadvantage the battery carts", "The weekly reports contain private driver information"], answer: 2,
          explanation: "部分訓練里程未納入分母，但其用電也未由試行電表正確對應，Ari 擔心每公里能耗結果看起來比實際差，會對電動推車不利。",
          translation: "Ari 表達了什麼疑慮？",
          evidence: "Then the energy-per-kilometer result could look worse than it really is.",
          evidenceLocation: "文件二 Ari 第 2 則訊息｜數據偏差推論",
          answerAudit: "The comparison may unfairly disadvantage the battery carts",
          choiceNotes: ["未提提前結束。", "沒有說推車無法完成路線。", "正確，將 look worse 改寫成 unfairly disadvantage。", "未涉及個資。"],
          tags: ["reading", "inference", "data-literacy", "literacy-core", "human-reviewed"]
        }
      ]
    }
  ];

  readingGroups.forEach(group => group.questions.forEach(question => items.push({
    ...question,
    part: "7",
    difficulty: group.difficulty,
    category: group.category,
    passage: group.passage,
    audioText: "",
    groupId: group.groupId,
    literacySkill: "跨文件推論與數據判讀",
    ...provenance,
    sourceNote
  })));

  window.BUILTIN_BANK.push(...items);
})();
