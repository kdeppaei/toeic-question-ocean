(() => {
  const provenance = {
    sourceType: "original",
    sourceLabel: "本站原創模擬",
    sourceProvider: "TOEIC Question Ocean",
    sourceDetail: "本站依多益職場情境與題型結構自行撰寫，未複製 ETS、abceed 或獵頓英語題文。"
  };
  const sourceNote = "Original high-difficulty TOEIC-style simulation items for v4.4. No third-party question text, audio, answer, or explanation was copied.";

  ["P1-017", "P1-022", "P1-025"].forEach((id) => {
    const question = window.BUILTIN_BANK.find((item) => item.id === id);
    if (question) {
      question.difficulty = "800";
      question.tags = [...new Set([...(question.tags || []), "detail-discrimination", "visual-precision"])];
    }
  });

  const part2 = [
    {
      id: "P2-107", part: "2", difficulty: "800", category: "否定問句",
      audioSpeaker: "female",
      audioText: "Didn't the supplier agree to cover the rush fee?",
      choices: ["Only if we ordered before noon.", "At the loading dock.", "The invoice was printed yesterday."], answer: 0,
      explanation: "否定問句詢問供應商是否同意負擔急件費；Only if... 說明該承諾附帶的條件，是最切合的回應。",
      answerTranslation: "只有在我們中午前下單的情況下。",
      translation: "供應商不是同意負擔急件費嗎？",
      tags: ["listening", "part2", "negative-question", "condition"]
    },
    {
      id: "P2-108", part: "2", difficulty: "800", category: "人物與職責",
      audioSpeaker: "male",
      audioText: "Who's taking minutes while Lena presents the quarterly forecast?",
      choices: ["The forecast was revised twice.", "I can, unless Martin has already volunteered.", "In the main conference room."], answer: 1,
      explanation: "Who's taking minutes 詢問由誰記錄會議內容；I can 直接承接工作，unless 子句補充可能已有志願者。",
      answerTranslation: "我可以，除非 Martin 已經自願了。",
      translation: "Lena 報告季度預測時，誰要做會議紀錄？",
      tags: ["listening", "part2", "who-question", "work-assignment"]
    },
    {
      id: "P2-109", part: "2", difficulty: "800", category: "陳述推論",
      audioSpeaker: "female",
      audioText: "The backup server still hasn't synchronized with the billing system.",
      choices: ["The invoice includes tax.", "I'll postpone the switchover, then.", "It is stored in the supply cabinet."], answer: 1,
      explanation: "備援伺服器尚未同步，合理後續是延後系統切換；then 表示根據前述狀況採取決定。",
      answerTranslation: "那我就延後系統切換。",
      translation: "備援伺服器仍未與計費系統同步。",
      tags: ["listening", "part2", "statement", "inference", "technology"]
    }
  ].map((item) => ({...item, prompt:"Choose the best response.", passage:"", ...provenance, sourceNote}));

  const listeningGroups = [
    {
      groupId: "P3-G24", part: "3", difficulty: "800", category: "資安試行評估",
      audioText: "W: The phishing-simulation report says the finance team clicked fewer test links this month, but more employees entered passwords after clicking. M: So the click rate improved, but the risky behavior became more serious. Should we still end the pilot on Friday? W: Not yet. The report covers only two weeks, and several new hires have not taken the security workshop. M: I'll extend the pilot through the workshop next Wednesday and ask the analyst to separate new-hire results.",
      audioTranslation: "女：網路釣魚模擬報告顯示，財務團隊本月點擊測試連結的人變少，但點擊後輸入密碼的員工變多。男：所以點擊率改善了，但高風險行為更嚴重。我們仍要在星期五結束試行嗎？女：先不要。報告只涵蓋兩週，而且幾位新進員工尚未參加資安課程。男：我會把試行延長到下週三的課程結束，並請分析師把新進員工的結果分開。",
      tags: ["listening", "conversation", "cybersecurity", "data-literacy"],
      questions: [
        {
          id: "P3-G24-Q1", prompt: "What concern does the man express about the report?",
          choices: ["It excludes the finance team", "A less frequent action now has more serious consequences", "The workshop results were published too early", "The analyst used last month's click rate"], answer: 1,
          explanation: "男士對比「點擊較少」與「輸入密碼較多」，指出發生次數下降，但實際風險更嚴重。",
          translation: "男士對報告表達什麼疑慮？", tags: ["inference", "contrast"]
        },
        {
          id: "P3-G24-Q2", prompt: "Why does the woman recommend continuing the pilot?",
          choices: ["The observation period is limited", "The finance team requested another report", "The analyst missed Friday's deadline", "The workshop has been canceled"], answer: 0,
          explanation: "女士說報告 only covers two weeks，且新進員工尚未受訓，因此目前資料不足以結束試行。",
          translation: "女士為何建議繼續試行？", tags: ["reason", "sampling"]
        },
        {
          id: "P3-G24-Q3", prompt: "What will the man most likely ask the analyst to do?",
          choices: ["Remove all password data", "Compare two finance systems", "Report new employees as a separate group", "Schedule the security workshop"], answer: 2,
          explanation: "男士明說 ask the analyst to separate new-hire results，也就是將新進員工獨立呈現。",
          translation: "男士最可能請分析師做什麼？", tags: ["next-action", "paraphrase"]
        }
      ]
    },
    {
      groupId: "P4-G21", part: "4", difficulty: "800", category: "接駁路線公告",
      audioText: "Speaker: Attention, visitors to the Harbor Design Fair. Because the pedestrian tunnel beneath Central Avenue is closed for an inspection, the west entrance cannot be reached from the Metro station by the usual route. Complimentary shuttle buses will leave the station's north exit every twelve minutes and stop beside Hall C. The digital map in yesterday's confirmation e-mail still shows the tunnel route, so please disregard it. Visitors who already have printed tickets may board the shuttle without checking in at the information desk.",
      audioTranslation: "播音員：前往港灣設計展的訪客請注意。由於中央大道下方的行人隧道因檢查而關閉，無法再由地鐵站沿平常路線前往西側入口。免費接駁車每十二分鐘從車站北側出口發車，停靠在 C 展館旁。昨日確認郵件中的電子地圖仍顯示隧道路線，請忽略該地圖。已持有紙本門票的訪客可直接搭乘接駁車，不必先到服務台報到。",
      tags: ["listening", "talk", "event", "route-change"],
      questions: [
        {
          id: "P4-G21-Q1", prompt: "Why has the usual walking route changed?",
          choices: ["A fair has moved to another hall", "A tunnel is being inspected", "The Metro station is closing early", "Central Avenue is hosting a parade"], answer: 1,
          explanation: "公告指出 pedestrian tunnel ... is closed for an inspection，因此原步行路線無法使用。",
          translation: "平常的步行路線為何改變？", tags: ["reason", "detail"]
        },
        {
          id: "P4-G21-Q2", prompt: "What are visitors told to disregard?",
          choices: ["A printed ticket", "A sign beside Hall C", "A map in a confirmation e-mail", "A notice at the north exit"], answer: 2,
          explanation: "昨日確認郵件的電子地圖仍顯示已封閉的隧道路線，公告明確要求 disregard it。",
          translation: "訪客被告知應忽略什麼？", tags: ["instruction", "reference"]
        },
        {
          id: "P4-G21-Q3", prompt: "What is indicated about visitors with printed tickets?",
          choices: ["They may board the shuttle directly", "They must use the west entrance", "They receive priority seating in Hall C", "They should exchange them at the station"], answer: 0,
          explanation: "最後一句說持紙本票者可直接搭接駁車，不必先到服務台報到。",
          translation: "關於持有紙本門票的訪客，可得知什麼？", tags: ["condition", "inference"]
        }
      ]
    }
  ];

  const part5 = [
    {
      id: "P5-325", part: "5", difficulty: "800", category: "假設語氣倒裝",
      prompt: "_____ the vendor disclosed the licensing restriction earlier, the committee would have selected a different platform.",
      choices: ["Had", "Did", "Were", "Should"], answer: 0,
      explanation: "這是與過去事實相反的第三類條件句倒裝：Had + 主詞 + 過去分詞，相當於 If the vendor had disclosed。",
      translation: "如果供應商早一點揭露授權限制，委員會就會選擇不同的平台。",
      tags: ["inversion", "conditional", "past-unreal"]
    },
    {
      id: "P5-326", part: "5", difficulty: "800", category: "平行結構",
      prompt: "The revised checklist is intended not only to identify missing permits but also to _____ whether each permit remains valid.",
      choices: ["verification", "verified", "verify", "verifying"], answer: 2,
      explanation: "not only to identify ... but also to verify 應維持不定詞平行；第二個 to 可保留，空格填原形 verify。",
      translation: "修訂後的清單不僅用於找出缺少的許可證，也用於確認每張許可證是否仍有效。",
      tags: ["parallelism", "infinitive", "compliance"]
    },
    {
      id: "P5-327", part: "5", difficulty: "800", category: "主動詞一致",
      prompt: "The revised reimbursement policy, together with its supporting examples, _____ available on the employee portal.",
      choices: ["are", "were", "have been", "is"], answer: 3,
      explanation: "together with its supporting examples 是插入補充語，不改變主詞；真正主詞 policy 為單數，故用 is。",
      translation: "修訂後的報銷政策及其補充範例可在員工入口網站查看。",
      tags: ["subject-verb-agreement", "together-with", "policy"]
    },
    {
      id: "P5-328", part: "5", difficulty: "800", category: "要求類假設語氣",
      prompt: "The compliance officer recommended that a copy of every approval record _____ for at least five years.",
      choices: ["is retained", "be retained", "was retaining", "has retained"], answer: 1,
      explanation: "recommend that 後的名詞子句使用原形假設語氣；record 是被保留，因此用被動原形 be retained。",
      translation: "法遵主管建議每份核准紀錄的副本至少保留五年。",
      tags: ["subjunctive", "passive", "retention"]
    }
  ].map((item) => ({...item, passage:"", audioText:"", ...provenance, sourceNote}));

  const part6Group = {
    groupId: "P6-G28", part: "6", difficulty: "800", category: "資料保留政策",
    passage: `INTERNAL NOTICE

Last quarter, the records team tested automatic deletion for files that had reached the end of their retention period. The pilot reduced storage costs, but one folder subject to a legal hold was mistakenly placed in the deletion queue. _____ (1) Accordingly, automatic deletion will remain disabled while the team adds a second verification step.

During the next trial, the system will generate a review list rather than delete files immediately. _____ (2) Department managers will have two business days to report any exception. To make those reviews more _____ (3), each entry will display the policy that determines its proposed deletion date. If the next trial produces no unresolved exceptions, a broader launch _____ (4) for October.`,
    tags: ["part6", "records-management", "legal-hold", "governance"],
    questions: [
      {
        id: "P6-G28-Q1", prompt: "Select the best sentence for blank (1).",
        choices: ["The team therefore paused the process before any files were removed.", "Storage prices are listed on the vendor's public website.", "Several departments requested larger filing cabinets.", "The legal office moved to another floor."], answer: 0,
        explanation: "前句指出受法律保留的資料夾被錯列入刪除佇列，後句以 Accordingly 說停用自動刪除；暫停程序最能銜接因果。",
        translation: "選出最適合填入第 (1) 空格的句子。"
      },
      {
        id: "P6-G28-Q2", prompt: "Select the best sentence for blank (2).",
        choices: ["The list will then be sent to the relevant department managers.", "The files were printed in alphabetical order.", "The vendor has opened a new regional office.", "The launch event attracted several reporters."], answer: 0,
        explanation: "下一句說部門主管有兩個工作天回報例外，因此前句必須先交代審查清單會送交這些主管。",
        translation: "選出最適合填入第 (2) 空格的句子。"
      },
      {
        id: "P6-G28-Q3", prompt: "Choose the best word for blank (3).",
        choices: ["inform", "information", "informative", "informatively"], answer: 2,
        explanation: "make + 受詞 + 形容詞，空格作 reviews 的受詞補語，應用 informative 表示「更具資訊性」。",
        translation: "選出最適合填入第 (3) 空格的字。"
      },
      {
        id: "P6-G28-Q4", prompt: "Choose the best phrase for blank (4).",
        choices: ["will schedule", "has scheduled", "will be scheduled", "scheduling"], answer: 2,
        explanation: "launch 是被安排，且條件成立後屬未來結果，應用未來被動 will be scheduled。",
        translation: "選出最適合填入第 (4) 空格的片語。"
      }
    ]
  };

  const readingGroups = [
    {
      groupId: "P7-R79", difficulty: "800", category: "三篇閱讀・場館整修",
      passage: `DOCUMENT 1 — FACILITY NOTICE

The North Annex will be closed from August 12 through August 16 while its ventilation controls are replaced. Evening workshops normally held there will move to the Harbor Room, except for the August 14 tax seminar, which will be streamed online only. Desk reservations that extend past 6:00 P.M. will be shortened automatically, and fees for the canceled hours will be returned.

DOCUMENT 2 — PROGRAM SCHEDULE

August 13, 6:30 P.M. — Resume Clinic — North Annex
August 14, 7:00 P.M. — Small-Business Tax Seminar — North Annex
August 16, 6:00 P.M. — Founder Networking Session — North Annex

DOCUMENT 3 — E-MAIL

From: Dana Wu
To: Member Services
Subject: August 14 reservation

I reserved a desk in the North Annex from 5:00 to 8:00 P.M. on August 14 so I could finish a client proposal and then attend the tax seminar. I understand that the building work affects the evening, but I am unsure whether the desk area closes before 6:00. Please confirm how much of my reservation remains and where I should go for the seminar.`,
      questions: [
        {
          id: "P7-R79-Q1", prompt: "Which event will not be held in person?",
          choices: ["The Resume Clinic", "The tax seminar", "The networking session", "The ventilation inspection"], answer: 1,
          explanation: "文件一說 8 月 14 日稅務講座 streamed online only，其他晚間活動改到 Harbor Room。",
          translation: "哪一項活動不會以實體方式舉行？",
          evidence: "except for the August 14 tax seminar, which will be streamed online only.",
          evidenceLocation: "文件一第 2 句｜例外活動",
          answerAudit: "The tax seminar",
          choiceNotes: ["一般晚間活動移至 Harbor Room。", "正確，唯一改為僅線上直播的活動。", "一般晚間活動移至 Harbor Room。", "這是工程，不是課程表中的活動。"],
          tags: ["reading", "exception", "cross-document", "literacy-core", "human-reviewed"]
        },
        {
          id: "P7-R79-Q2", prompt: "What will most likely happen to Ms. Wu's desk reservation?",
          choices: ["It will be moved to the Harbor Room", "It will remain unchanged until 8:00 P.M.", "It will end at 6:00 P.M. with a partial refund", "It will be canceled for the entire day"], answer: 2,
          explanation: "她的預約從 5 點到 8 點，文件一說超過 6 點的預約會自動縮短，取消時數退款，因此保留 5 至 6 點並退部分費用。",
          translation: "Wu 女士的座位預約最可能會如何處理？",
          evidence: "Desk reservations that extend past 6:00 P.M. will be shortened automatically, and fees for the canceled hours will be returned.",
          evidenceLocation: "文件一最後一句 + 文件三預約時段｜跨文件推論",
          answerAudit: "It will end at 6:00 P.M. with a partial refund",
          choiceNotes: ["Harbor Room 是晚間活動地點，不是座位預約替代區。", "與 6 點後自動縮短的規定衝突。", "正確，結合規定與 5 至 8 點預約。", "規定只取消 6 點後時段。"],
          tags: ["reading", "time", "condition", "cross-document", "literacy-core", "human-reviewed"]
        },
        {
          id: "P7-R79-Q3", prompt: "Why did Ms. Wu write the e-mail?",
          choices: ["To request a ventilation repair", "To clarify how the closure affects two plans", "To register for the Resume Clinic", "To complain about a missing refund"], answer: 1,
          explanation: "她同時詢問座位預約保留多久，以及講座改到哪裡，目的是確認關閉措施如何影響工作與參加講座兩項安排。",
          translation: "Wu 女士為何寫這封郵件？",
          evidence: "Please confirm how much of my reservation remains and where I should go for the seminar.",
          evidenceLocation: "文件三最後一句｜郵件目的",
          answerAudit: "To clarify how the closure affects two plans",
          choiceNotes: ["她沒有要求維修。", "正確，兩項計畫是座位工作與參加講座。", "她詢問的是稅務講座。", "她尚在確認規則，未說退款遺失。"],
          tags: ["reading", "purpose", "multiple-intents", "literacy-core", "human-reviewed"]
        }
      ]
    },
    {
      groupId: "P7-R80", difficulty: "800", category: "三篇閱讀・供應商績效",
      passage: `DOCUMENT 1 — PILOT TERMS

BrightRoute will receive the full monthly service fee if at least 96 percent of scheduled deliveries arrive within the promised two-hour window. If performance is between 92 and 95.9 percent, the client receives a 10 percent credit. Performance below 92 percent results in a 20 percent credit. Deliveries delayed by a documented building evacuation are excluded from the calculation.

DOCUMENT 2 — JUNE DASHBOARD

Scheduled deliveries: 250
Within promised window: 237
Late deliveries: 13
Late because of documented building evacuation: 5
Invoice issued: Full monthly fee

DOCUMENT 3 — MESSAGE

Nora: The invoice does not show a service credit, but the dashboard's first percentage is only 94.8.
Eli: That figure uses all 250 deliveries. The contract says to remove documented evacuation delays from the calculation.
Nora: Right. I'll add a note showing the adjusted calculation before approving the invoice.`,
      questions: [
        {
          id: "P7-R80-Q1", prompt: "According to Document 1, when is a delivery excluded from the performance calculation?",
          choices: ["When it arrives outside business hours", "When an evacuation caused a documented delay", "When the customer changes the address", "When the invoice has already been issued"], answer: 1,
          explanation: "試行條款最後一句明定，由有紀錄的建築疏散造成的延誤不納入計算。",
          translation: "根據文件一，什麼情況下配送不納入績效計算？",
          evidence: "Deliveries delayed by a documented building evacuation are excluded from the calculation.",
          evidenceLocation: "文件一最後一句｜排除條件",
          answerAudit: "When an evacuation caused a documented delay",
          choiceNotes: ["條款未排除營業時間外配送。", "正確，直接改寫排除條件。", "未提地址變更。", "是否開立發票與排除條件無關。"],
          tags: ["reading", "condition", "exception", "literacy-core", "human-reviewed"]
        },
        {
          id: "P7-R80-Q2", prompt: "What adjusted performance rate should Nora add to her note?",
          choices: ["92.8 percent", "94.8 percent", "96.7 percent", "98.0 percent"], answer: 2,
          explanation: "排除 5 件疏散延誤後，分母為 245；合格件數仍為 237，237 ÷ 245 約為 96.7%。",
          translation: "Nora 應在註記中加入多少調整後績效率？",
          evidence: "The contract says to remove documented evacuation delays from the calculation.",
          evidenceLocation: "文件二數據 + 文件三 Eli 訊息｜計算推論",
          answerAudit: "96.7 percent",
          choiceNotes: ["這不是依條款調整後的比率。", "這是 237 ÷ 250 的未調整比率。", "正確，237 ÷ (250 - 5) 約為 96.7%。", "無法由文件數據得出。"],
          tags: ["reading", "calculation", "data-literacy", "cross-document", "literacy-core", "human-reviewed"]
        },
        {
          id: "P7-R80-Q3", prompt: "What is suggested about the June invoice?",
          choices: ["It correctly charges the full monthly fee", "It should include a 20 percent credit", "It covers fewer than 200 deliveries", "It was issued before the dashboard was prepared"], answer: 0,
          explanation: "調整後績效約 96.7%，達到至少 96% 的全額費用門檻，因此未列折抵的全額發票正確。",
          translation: "關於六月發票，可推知什麼？",
          evidence: "BrightRoute will receive the full monthly service fee if at least 96 percent of scheduled deliveries arrive within the promised two-hour window.",
          evidenceLocation: "文件一門檻 + 文件二數據｜跨文件結論",
          answerAudit: "It correctly charges the full monthly fee",
          choiceNotes: ["正確，調整後 96.7% 達到全額門檻。", "20% 折抵只適用低於 92%。", "文件顯示 250 件。", "文件未提供兩者製作先後。"],
          tags: ["reading", "inference", "calculation", "cross-document", "literacy-core", "human-reviewed"]
        }
      ]
    }
  ];

  const items = [...part2, ...part5];

  listeningGroups.forEach((group) => group.questions.forEach((question) => items.push({
    ...question,
    part: group.part,
    difficulty: group.difficulty,
    category: group.category,
    passage: "",
    audioText: group.audioText,
    audioTranslation: group.audioTranslation,
    groupId: group.groupId,
    tags: [...group.tags, ...(question.tags || [])],
    ...provenance,
    sourceNote
  })));

  part6Group.questions.forEach((question) => items.push({
    ...question,
    part: part6Group.part,
    difficulty: part6Group.difficulty,
    category: part6Group.category,
    passage: part6Group.passage,
    audioText: "",
    groupId: part6Group.groupId,
    tags: [...part6Group.tags, ...(question.tags || [])],
    ...provenance,
    sourceNote
  }));

  readingGroups.forEach((group) => group.questions.forEach((question) => items.push({
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
