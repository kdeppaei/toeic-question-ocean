(() => {
  const provenance = {
    sourceType: "original",
    sourceLabel: "本站原創模擬",
    sourceProvider: "TOEIC Question Ocean",
    sourceDetail: "本站依多益職場文件與題型結構自行撰寫；參考公開題型版面，但未複製任何外部題文、選項或解析。"
  };
  const sourceNote = "Original TOEIC-style Part 6 and Part 7 items for v4.5. Public examples informed format boundaries only; all text and answers are original.";

  const splitPart6Groups = {
    "P6-G16": { idPrefix: "P6-G16-Q", groupId: "P6-G29", category: "系統維護通知" },
    "P6-G17": { idPrefix: "P6-G17-Q", groupId: "P6-G30", category: "產品保固信件" },
    "P6-G18": { idPrefix: "P6-G18-Q", groupId: "P6-G31", category: "人力資源公告" }
  };

  Object.entries(splitPart6Groups).forEach(([legacyGroup, correction]) => {
    window.BUILTIN_BANK
      .filter((question) => question.groupId === legacyGroup && question.id.startsWith(correction.idPrefix))
      .forEach((question) => {
        question.groupId = correction.groupId;
        question.category = correction.category;
        question.formatType = "part6-text-completion";
      });
  });

  const movedReadingGroups = {
    "P6-G20": { groupId: "P7-R81", category: "單篇閱讀・工作站政策" },
    "P6-G21": { groupId: "P7-R82", category: "單篇閱讀・訂單延誤" },
    "P6-G22": { groupId: "P7-R83", category: "單篇閱讀・商務論壇" },
    "P6-G23": { groupId: "P7-R84", category: "單篇閱讀・費用流程" },
    "P6-G24": { groupId: "P7-R85", category: "單篇閱讀・產品更新" },
    "P6-G25": { groupId: "P7-R86", category: "單篇閱讀・營運研究" },
    "P6-G26": { groupId: "P7-R87", category: "單篇閱讀・課程公告" },
    "P6-G27": { groupId: "P7-R88", category: "單篇閱讀・無障礙設計" }
  };

  Object.entries(movedReadingGroups).forEach(([legacyGroup, correction]) => {
    window.BUILTIN_BANK
      .filter((question) => question.groupId === legacyGroup)
      .forEach((question) => {
        question.part = "7";
        question.groupId = correction.groupId;
        question.category = correction.category;
        question.formatType = "part7-reading-comprehension";
        question.correctedFromPart = "6";
        question.tags = [...new Set([
          ...(question.tags || []).filter((tag) => !/^part-?6$/i.test(String(tag))),
          "part7", "single-passage", "classification-corrected"
        ])];
      });
  });

  const part6Groups = [
    {
      groupId: "P6-G32",
      category: "培訓課程郵件",
      passage: `To: Project Leads
From: Learning and Development
Subject: Responsible Automation Workshops

Next month, we will offer several workshops for employees who are (1) _____ in managing automated workplace tools. The sessions will help participants (2) _____ a stronger understanding of approval limits, data handling, and human review. (3) _____, each workshop includes a short case study based on a realistic customer request. (4) _____ Registration closes five business days before each session.`,
      tags: ["part6", "training", "automation-governance"],
      questions: [
        {
          id: "P6-G32-Q1", prompt: "Choose the best word for blank (1).",
          choices: ["interest", "interests", "interested", "interesting"], answer: 2,
          explanation: "be interested in 是固定搭配，表示員工「對管理自動化工具有興趣」。interesting 用來形容事物令人感興趣。",
          translation: "選出最適合第 (1) 空格的字。"
        },
        {
          id: "P6-G32-Q2", prompt: "Choose the best word for blank (2).",
          choices: ["develop", "raise", "open", "complete"], answer: 0,
          explanation: "develop an understanding 是自然搭配，表示培養或加深理解；其餘動詞不與 understanding 形成合適語意。",
          translation: "選出最適合第 (2) 空格的字。"
        },
        {
          id: "P6-G32-Q3", prompt: "Choose the best phrase for blank (3).",
          choices: ["In addition", "Even so", "For example", "On the contrary"], answer: 0,
          explanation: "前句列出課程目的，後句再補充每堂課都有案例，因此使用表示追加資訊的 In addition。",
          translation: "選出最適合第 (3) 空格的片語。"
        },
        {
          id: "P6-G32-Q4", prompt: "Choose the best sentence for blank (4).",
          choices: [
            "Employees should select the session most relevant to their current responsibilities.",
            "The former office cafeteria was renovated last winter.",
            "All customer requests were approved without review.",
            "The instructor has canceled every workshop this year."
          ], answer: 0,
          explanation: "前文介紹多場工作坊，後文接續報名期限；建議員工依職責選場次，最能銜接課程選擇與報名。",
          translation: "選出最適合第 (4) 空格的句子。"
        }
      ]
    },
    {
      groupId: "P6-G33",
      category: "服務持續性公告",
      passage: `SERVICE CONTINUITY UPDATE

Following a review of last month's payment outage, the operations team has (1) _____ a revised recovery procedure. The backup environment will now be tested every Wednesday (2) _____ transaction volume is normally lower at that time. (3) _____ Before each test begins, store managers will receive a notice identifying which reports may be delayed. Managers should download any urgent reports (4) _____ the maintenance window opens.`,
      tags: ["part6", "business-continuity", "payment-system"],
      questions: [
        {
          id: "P6-G33-Q1", prompt: "Choose the best word for blank (1).",
          choices: ["adopted", "adopting", "adoption", "adoptable"], answer: 0,
          explanation: "has 後需接過去分詞形成現在完成式，故選 adopted，表示團隊已採用修訂程序。",
          translation: "選出最適合第 (1) 空格的字。"
        },
        {
          id: "P6-G33-Q2", prompt: "Choose the best word for blank (2).",
          choices: ["because", "unless", "despite", "whereas"], answer: 0,
          explanation: "後半句「該時段交易量通常較低」是選在星期三測試的原因，因此使用 because。",
          translation: "選出最適合第 (2) 空格的字。"
        },
        {
          id: "P6-G33-Q3", prompt: "Choose the best sentence for blank (3).",
          choices: [
            "This schedule is intended to reduce disruption while still verifying that recovery tools work.",
            "Several stores have requested new exterior signs.",
            "The accounting department will recruit interns next spring.",
            "Customers can exchange unopened products within thirty days."
          ], answer: 0,
          explanation: "前文說明低流量時段測試，後文交代測試前通知；此句總結新時程兼顧降低干擾與驗證復原工具，邏輯完整。",
          translation: "選出最適合第 (3) 空格的句子。"
        },
        {
          id: "P6-G33-Q4", prompt: "Choose the best word for blank (4).",
          choices: ["before", "during", "although", "beside"], answer: 0,
          explanation: "急用報表應在維護時段開始前下載，因此選 before。",
          translation: "選出最適合第 (4) 空格的字。"
        }
      ]
    }
  ];

  part6Groups.forEach((group) => group.questions.forEach((question) => {
    window.BUILTIN_BANK.push({
      ...question,
      part: "6",
      difficulty: "800",
      category: group.category,
      passage: group.passage,
      audioText: "",
      groupId: group.groupId,
      formatType: "part6-text-completion",
      tags: [...group.tags, ...(question.tags || [])],
      ...provenance,
      sourceNote
    });
  }));

  const readingGroups = [
    {
      groupId: "P7-R89",
      category: "訊息串・設備安裝",
      passage: `TEXT MESSAGE CHAIN

11:42 — Nina: The technician's train was delayed, so she will reach Fairview Station at 3:20.
11:47 — Omar: Our client walkthrough begins at 4:00. Will that leave enough setup time?
11:51 — Nina: She tested the display unit at our branch yesterday. At the site, she only needs to connect it and verify the network.
12:08 — Omar: That should still work. Which entrance should I ask her to use?
12:10 — Nina: The loading entrance is locked during construction. Please meet her in the west lobby after she goes through security.
12:14 — Omar: Understood. I will send her a visitor pass and wait near the security desk.`,
      literacySkill: "目的意圖",
      tags: ["part7", "message-chain", "inference", "literacy-core", "human-reviewed"],
      questions: [
        {
          id: "P7-R89-Q1", prompt: "What is suggested about the technician?",
          choices: ["She is traveling to Fairview by train", "She works for the client", "She canceled the equipment test", "She will arrive after the walkthrough"], answer: 0,
          explanation: "Nina 說技術人員的火車延誤，並給出抵達 Fairview Station 的時間，可推知她正搭火車前往。",
          translation: "關於技術人員，可推知什麼？",
          evidence: "The technician's train was delayed, so she will reach Fairview Station at 3:20.",
          evidenceLocation: "訊息串 11:42｜交通與抵達時間",
          answerAudit: "She is traveling to Fairview by train",
          choiceNotes: ["正確，由 train delayed 與 station arrival 推知。", "未說她受僱於客戶。", "她昨天已完成測試，沒有取消。", "她 3:20 抵達，導覽 4:00 開始。"]
        },
        {
          id: "P7-R89-Q2", prompt: "At 12:08, what does Omar mean when he writes, “That should still work”?",
          choices: ["There should be enough time to set up before the walkthrough", "The loading entrance will reopen before 4:00", "The client has agreed to delay the walkthrough", "The technician can complete the work without a network"], answer: 0,
          explanation: "技術人員只需連接設備並確認網路，因此 Omar 認為 3:20 抵達後到 4:00 前仍有足夠準備時間。",
          translation: "12:08 時，Omar 寫「那應該仍可行」是什麼意思？",
          evidence: "At the site, she only needs to connect it and verify the network.",
          evidenceLocation: "訊息串 11:51–12:08｜語意承接",
          answerAudit: "There should be enough time to set up before the walkthrough",
          choiceNotes: ["正確，回應前文的剩餘安裝工作。", "下一則訊息反而說入口上鎖。", "沒有延後導覽。", "原文說仍需確認網路。"]
        },
        {
          id: "P7-R89-Q3", prompt: "Why does Nina mention the loading entrance?",
          choices: ["To explain why the technician should use another entrance", "To request a construction delivery", "To identify where the display was tested", "To ask Omar to unlock the equipment"], answer: 0,
          explanation: "裝卸入口施工期間上鎖，因此 Nina 指示改在西側大廳會合。",
          translation: "Nina 為何提到裝卸入口？",
          evidence: "The loading entrance is locked during construction. Please meet her in the west lobby",
          evidenceLocation: "訊息串 12:10｜路線變更原因",
          answerAudit: "To explain why the technician should use another entrance",
          choiceNotes: ["正確，locked 說明改走 west lobby 的原因。", "未要求工程配送。", "設備在分公司測試。", "沒有要求解鎖設備。"]
        }
      ]
    },
    {
      groupId: "P7-R90",
      category: "公告規範・展示欄",
      passage: `COMMUNITY INNOVATION HUB — DISPLAY BOARD POLICY

Local nonprofit groups may use the lobby display board at no charge for up to three weeks. Commercial advertisements and notices promoting political candidates are not accepted. [1]

Notices must be printed on A4 paper, show the first and last display dates, and receive staff approval before posting. [2] Materials that are handwritten or larger than the permitted size will be returned. [3]

Bring the final printed notice to the reception desk between 9 A.M. and 5 P.M. Staff will send an approval decision by e-mail within two business days. [4] Approved notices will be posted by a hub employee.`,
      literacySkill: "條件例外",
      tags: ["part7", "policy", "sentence-insertion", "literacy-core", "human-reviewed"],
      questions: [
        {
          id: "P7-R90-Q1", prompt: "What is indicated about the display board?",
          choices: ["Eligible groups may use it without paying", "Any business may advertise for three weeks", "Notices remain posted indefinitely", "It is located outside the building"], answer: 0,
          explanation: "公告第一句指出符合資格的在地非營利團體可免費使用展示欄，最長三週。",
          translation: "關於展示欄，文中指出什麼？",
          evidence: "Local nonprofit groups may use the lobby display board at no charge for up to three weeks.",
          evidenceLocation: "第一段第 1 句｜費用與期限",
          answerAudit: "Eligible groups may use it without paying",
          choiceNotes: ["正確，at no charge 表示免費。", "商業廣告不被接受。", "最長三週，不是無限期。", "展示欄位於 lobby。"]
        },
        {
          id: "P7-R90-Q2", prompt: "What is NOT a stated requirement for a notice?",
          choices: ["It must fit a specified paper size", "It must show display dates", "It must be approved before posting", "It must be signed by the group's director"], answer: 3,
          explanation: "公告要求 A4、標示起訖日期及事前核准，但沒有要求團體主管簽名。",
          translation: "哪一項不是公告明列的通知要求？",
          evidence: "Notices must be printed on A4 paper, show the first and last display dates, and receive staff approval before posting.",
          evidenceLocation: "第二段第 1 句｜三項明列要求",
          answerAudit: "It must be signed by the group's director",
          choiceNotes: ["A4 是明列要求。", "起訖日期是明列要求。", "張貼前核准是明列要求。", "正確，文中沒有主管簽名規定。"]
        },
        {
          id: "P7-R90-Q3", prompt: "What should an applicant bring to the reception desk?",
          choices: ["The final printed notice", "A handwritten draft", "A commercial advertising fee", "An e-mail from a political candidate"], answer: 0,
          explanation: "第三段開頭直接要求 Bring the final printed notice to the reception desk。",
          translation: "申請人應將什麼帶到服務台？",
          evidence: "Bring the final printed notice to the reception desk",
          evidenceLocation: "第三段第 1 句｜提交物",
          answerAudit: "The final printed notice",
          choiceNotes: ["正確，直接對應原文。", "手寫材料會被退回。", "符合資格者免費，且不接受商業廣告。", "政治候選人宣傳不被接受。"]
        },
        {
          id: "P7-R90-Q4", prompt: "In which position marked [1], [2], [3], or [4] does the following sentence best belong? “A contact name and telephone number must also appear at the bottom.”",
          choices: ["[1]", "[2]", "[3]", "[4]"], answer: 1,
          explanation: "該句補充通知版面必須包含的資訊，最適合接在列舉 A4、展示日期與核准要求之後，也就是 [2]。",
          translation: "此句最適合放在 [1]、[2]、[3]、[4] 哪個位置？",
          evidence: "Notices must be printed on A4 paper, show the first and last display dates, and receive staff approval before posting.",
          evidenceLocation: "第二段第 1 句後｜同類版面要求",
          answerAudit: "[2]",
          choiceNotes: ["[1] 位於資格限制後，尚未進入通知格式。", "正確，與其他通知內容與格式要求並列。", "[3] 位於不合規材料處理後，銜接較弱。", "[4] 位於審核時程後，主題已轉為處理流程。"]
        }
      ]
    },
    {
      groupId: "P7-R91",
      category: "三篇閱讀・隔音板訂單",
      passage: `DOCUMENT 1 — PRODUCT PAGE

QuietForm Interiors offers peel-and-place color samples for its acoustic wall panels. Samples are larger than standard paint chips and use the same fabric as the finished panels. Because screen colors may vary, customers are advised to order samples in several adjacent tones before selecting a panel color. Standard panel orders ship in three to five business days; express orders arrive within two business days.

DOCUMENT 2 — ORDER SUMMARY #5821

Customer: Lena Ortiz
Samples: Fog Gray, Harbor Blue, Moss Green — $0.00
Acoustic panels: Harbor Blue — 3 boxes — $180.00
Express shipping — $18.00
Total — $198.00

DOCUMENT 3 — E-MAIL

From: Lena Ortiz
To: QuietForm Customer Care
Subject: Order #5821

My order arrived this morning, but the three panel boxes are Fog Gray rather than Harbor Blue. The packing slip lists Harbor Blue, so the label and contents do not match. Please send the color I ordered and include two additional samples close to Harbor Blue. I like that shade, but I would like to compare nearby tones before installing the panels in our conference room.`,
      literacySkill: "跨文件推論",
      tags: ["part7", "triple-passage", "order", "data-literacy", "literacy-core", "human-reviewed"],
      questions: [
        {
          id: "P7-R91-Q1", prompt: "In Document 1, the word “adjacent” is closest in meaning to",
          choices: ["nearby", "expensive", "popular", "upper"], answer: 0,
          explanation: "adjacent tones 指色彩相近、彼此鄰近的色調，最接近 nearby。",
          translation: "文件一的 adjacent 最接近哪個意思？",
          evidence: "customers are advised to order samples in several adjacent tones",
          evidenceLocation: "文件一第 3 句｜上下文詞義",
          answerAudit: "nearby",
          choiceNotes: ["正確，指相近色調。", "未涉及價格。", "未涉及受歡迎程度。", "不是位置較高。"]
        },
        {
          id: "P7-R91-Q2", prompt: "What are customers advised to do?",
          choices: ["Compare samples in similar colors", "Install samples as permanent panels", "Judge colors only from a computer screen", "Pay for each fabric sample"], answer: 0,
          explanation: "產品頁因螢幕顏色可能有差異，建議先訂購數個相近色調的樣品比較。",
          translation: "顧客被建議做什麼？",
          evidence: "Because screen colors may vary, customers are advised to order samples in several adjacent tones",
          evidenceLocation: "文件一第 3 句｜購買建議",
          answerAudit: "Compare samples in similar colors",
          choiceNotes: ["正確，order samples in adjacent tones 的改寫。", "樣品不是永久牆板。", "原文正因螢幕色差而建議看實體樣品。", "訂單摘要顯示樣品為免費。"]
        },
        {
          id: "P7-R91-Q3", prompt: "What is most likely true about order #5821?",
          choices: ["It was scheduled to arrive within two business days", "It contained four boxes of panels", "It received free standard shipping", "It did not include any samples"], answer: 0,
          explanation: "訂單選擇 express shipping，而產品頁說 express orders 兩個工作天內抵達。",
          translation: "關於第 5821 號訂單，最可能為真的是什麼？",
          evidence: "Express shipping — $18.00",
          evidenceLocation: "文件一配送說明 + 文件二運送方式｜跨文件推論",
          answerAudit: "It was scheduled to arrive within two business days",
          choiceNotes: ["正確，express 對應兩個工作天內。", "訂單是三箱。", "快捷運送收費 18 美元。", "訂單包含三個色樣。"]
        },
        {
          id: "P7-R91-Q4", prompt: "Which color does Ms. Ortiz indicate that she prefers?",
          choices: ["Fog Gray", "Harbor Blue", "Moss Green", "No particular color"], answer: 1,
          explanation: "她要求補寄原訂的 Harbor Blue，並明說 I like that shade。",
          translation: "Ortiz 女士表示她偏好哪個顏色？",
          evidence: "Please send the color I ordered and include two additional samples close to Harbor Blue. I like that shade",
          evidenceLocation: "文件三最後兩句｜偏好",
          answerAudit: "Harbor Blue",
          choiceNotes: ["Fog Gray 是誤收到的顏色。", "正確，that shade 指 Harbor Blue。", "Moss Green 只是樣品之一。", "她明確表示偏好。"]
        },
        {
          id: "P7-R91-Q5", prompt: "What problem does Ms. Ortiz mention?",
          choices: ["She received panels in the wrong color", "She was charged twice for shipping", "The samples were smaller than advertised", "The order arrived after the installation"], answer: 0,
          explanation: "她訂 Harbor Blue，收到的三箱卻是 Fog Gray，屬於寄錯顏色。",
          translation: "Ortiz 女士提到什麼問題？",
          evidence: "the three panel boxes are Fog Gray rather than Harbor Blue.",
          evidenceLocation: "文件三第 1 句｜訂單問題",
          answerAudit: "She received panels in the wrong color",
          choiceNotes: ["正確，直接對應 Fog Gray rather than Harbor Blue。", "未提重複收費。", "未抱怨樣品尺寸。", "未說安裝已發生。"]
        }
      ]
    },
    {
      groupId: "P7-R92",
      category: "雙篇閱讀・電話語音服務",
      passage: `DOCUMENT 1 — CLEARLINE VOICE STUDIO

Give callers a polished first impression with a professionally recorded telephone greeting. Our services include professional voice talent, customized on-hold messages, script editing, and multilingual production. Visit our online portfolio to compare voices, speaking styles, and accents. Send an inquiry with your contact information and project requirements, and a representative will respond within one business day with scheduling options and an estimate.

DOCUMENT 2 — E-MAIL

From: Priya Raman, Director, Harbor Health Clinic
To: ClearLine Voice Studio
Subject: Bilingual telephone greeting

I saw your listing in the Westside Business Newsletter and am interested in a new greeting for my clinic. I already have a finalized script, so I need recording rather than writing assistance. The greeting should be recorded by one calm, neutral-sounding voice in both English and Mandarin. We do not need an on-hold message at this time. Please call me between 1:00 and 4:00 P.M. to discuss available speakers and your production schedule.`,
      literacySkill: "跨文件推論",
      tags: ["part7", "double-passage", "service-ad", "email", "literacy-core", "human-reviewed"],
      questions: [
        {
          id: "P7-R92-Q1", prompt: "According to Document 1, why should customers visit the studio's online portfolio?",
          choices: ["To compare voice samples", "To pay an outstanding invoice", "To download recording equipment", "To submit a medical script"], answer: 0,
          explanation: "服務頁說可在 online portfolio 比較 voices、speaking styles 和 accents。",
          translation: "根據文件一，顧客為何應瀏覽線上作品集？",
          evidence: "Visit our online portfolio to compare voices, speaking styles, and accents.",
          evidenceLocation: "文件一第 3 句｜網站用途",
          answerAudit: "To compare voice samples",
          choiceNotes: ["正確，作品集用於比較聲音與風格。", "未提線上付款。", "不提供設備下載。", "作品集不是提交稿件的地方。"]
        },
        {
          id: "P7-R92-Q2", prompt: "What is suggested about ClearLine Voice Studio?",
          choices: ["It advertises in a local business publication", "It operates a medical clinic", "It provides only English recordings", "It requires customers to write new scripts"], answer: 0,
          explanation: "Raman 女士說在 Westside Business Newsletter 看見 listing，可推知工作室在地方商業刊物刊登資訊。",
          translation: "關於 ClearLine Voice Studio，可推知什麼？",
          evidence: "I saw your listing in the Westside Business Newsletter",
          evidenceLocation: "文件二第 1 句｜來源推論",
          answerAudit: "It advertises in a local business publication",
          choiceNotes: ["正確，newsletter listing 支持此推論。", "診所是客戶的機構。", "服務包含 multilingual production。", "也提供 script editing，但客戶可自備定稿。"]
        },
        {
          id: "P7-R92-Q3", prompt: "Who most likely is Ms. Raman?",
          choices: ["A health-clinic manager", "A professional actor", "A newsletter editor", "A recording-equipment salesperson"], answer: 0,
          explanation: "寄件者署名 Director, Harbor Health Clinic，最可能是診所管理者。",
          translation: "Raman 女士最可能是誰？",
          evidence: "From: Priya Raman, Director, Harbor Health Clinic",
          evidenceLocation: "文件二寄件者欄｜身分",
          answerAudit: "A health-clinic manager",
          choiceNotes: ["正確，Director of a clinic 對應管理者。", "她是委託錄音的客戶。", "她只是從 newsletter 看見廣告。", "未銷售設備。"]
        },
        {
          id: "P7-R92-Q4", prompt: "Which service does Ms. Raman NOT request?",
          choices: ["Professional voice talent", "Multilingual production", "Script editing", "A recorded telephone greeting"], answer: 2,
          explanation: "她已有 finalized script，明說需要錄音而非 writing assistance，因此不需要 script editing。",
          translation: "Raman 女士沒有要求哪項服務？",
          evidence: "I already have a finalized script, so I need recording rather than writing assistance.",
          evidenceLocation: "文件二第 2 句｜排除服務",
          answerAudit: "Script editing",
          choiceNotes: ["她需要一位配音者。", "她要求英文與中文。", "正確，她不需要寫稿協助。", "電話問候語是主要需求。"]
        },
        {
          id: "P7-R92-Q5", prompt: "What will most likely happen within one business day?",
          choices: ["Ms. Raman will hear from a studio representative", "The final greeting will be broadcast", "A clinic employee will edit the newsletter", "Recording equipment will be delivered"], answer: 0,
          explanation: "服務頁承諾收到詢問後，一個工作天內由代表回覆時程與估價。",
          translation: "一個工作天內最可能發生什麼？",
          evidence: "a representative will respond within one business day",
          evidenceLocation: "文件一最後一句｜回覆時程",
          answerAudit: "Ms. Raman will hear from a studio representative",
          choiceNotes: ["正確，對應服務承諾。", "一天內只承諾回覆，非完成製作。", "與 newsletter 編輯無關。", "服務不涉及配送設備。"]
        }
      ]
    }
  ];

  readingGroups.forEach((group) => group.questions.forEach((question) => {
    window.BUILTIN_BANK.push({
      ...question,
      part: "7",
      difficulty: "800",
      category: group.category,
      passage: group.passage,
      audioText: "",
      groupId: group.groupId,
      literacySkill: group.literacySkill,
      formatType: "part7-reading-comprehension",
      tags: [...group.tags, ...(question.tags || [])],
      ...provenance,
      sourceNote
    });
  }));

  window.BUILTIN_BANK.forEach((question) => {
    if (question.part === "6") question.formatType = "part6-text-completion";
    if (question.part === "7") question.formatType = "part7-reading-comprehension";
  });
})();
