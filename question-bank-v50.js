(() => {
  const provenance = {
    sourceType: "original",
    sourceLabel: "本站原創模擬",
    sourceProvider: "TOEIC Question Ocean",
    sourceDetail: "參考 TOEIC 公開題型與免費練習頁的情境分類自行撰寫，未複製外部題幹或選項。"
  };
  const sourceNote = "Original v5.0 Part 6 and Part 7 guided sets. Answers, evidence, and distractors were manually reviewed.";

  const part6Groups = [
    {
      groupId: "P6-G36",
      category: "會議紀錄工具試行",
      tags: ["part6", "technology", "pilot-program", "sentence-insertion", "v5-guide-set"],
      passage: `To: Project Coordinators
From: Digital Workplace Team
Subject: Meeting-Notes Pilot

Next month, twelve project teams will test a tool that creates draft meeting notes. The pilot is intended to (1) _____ whether the tool can reduce routine administrative work without omitting important decisions. Team leaders must review every draft (2) _____ it is shared with participants. (3) _____ For that reason, confidential client names should not be entered during the trial. At the end of each week, participants will complete a short survey and provide (4) _____ on any corrections they made.`,
      questions: [
        {
          id: "P6-G36-Q1",
          prompt: "Choose the best word for blank (1).",
          choices: ["evaluate", "evaluation", "evaluated", "evaluator"],
          answer: 0,
          explanation: "is intended to 後接原形動詞，evaluate 表示評估工具是否能達成目的。",
          translation: "此試行旨在評估該工具能否減少例行行政工作。"
        },
        {
          id: "P6-G36-Q2",
          prompt: "Choose the best word for blank (2).",
          choices: ["before", "during", "despite", "unless"],
          answer: 0,
          explanation: "草稿必須先經主管檢查，之後才能分享；before 符合流程順序。",
          translation: "每份草稿在分享給與會者前都必須由團隊主管審閱。"
        },
        {
          id: "P6-G36-Q3",
          prompt: "Choose the best sentence for blank (3).",
          choices: [
            "The trial version stores its files on a temporary external server.",
            "Several teams moved their weekly meetings to Friday afternoon.",
            "The company cafeteria now accepts mobile payments.",
            "Printed agendas will remain available beside each conference room."
          ],
          answer: 0,
          explanation: "後句 For that reason 警告不可輸入客戶姓名，必須承接資料暫存於外部伺服器的風險。",
          translation: "試用版本會將檔案儲存在臨時的外部伺服器上。"
        },
        {
          id: "P6-G36-Q4",
          prompt: "Choose the best word for blank (4).",
          choices: ["feedback", "permission", "attendance", "equipment"],
          answer: 0,
          explanation: "provide feedback on corrections 是自然搭配，表示針對修改內容提供回饋。",
          translation: "參與者每週將針對所做的修正提供回饋。"
        }
      ]
    },
    {
      groupId: "P6-G37",
      category: "循環包材回收通知",
      tags: ["part6", "sustainability", "logistics", "sentence-insertion", "v5-guide-set"],
      passage: `REUSABLE SHIPPING CONTAINER NOTICE

Beginning September 1, selected orders will arrive in reusable insulated containers. After unpacking an order, customers should remove the delivery label and place the empty container in the building lobby. Containers must be (1) _____ within seven days so that they can be cleaned and used again. (2) _____, a replacement fee may be added to the customer's next invoice. (3) _____ Customers can scan the code on the container to see the next scheduled collection time. Questions about a missed pickup should be reported (4) _____ through the support portal.`,
      questions: [
        {
          id: "P6-G37-Q1",
          prompt: "Choose the best word for blank (1).",
          choices: ["returned", "returning", "returns", "return"],
          answer: 0,
          explanation: "Containers 是被歸還的物品，must be 後接過去分詞 returned。",
          translation: "容器必須在七天內歸還。"
        },
        {
          id: "P6-G37-Q2",
          prompt: "Choose the best word for blank (2).",
          choices: ["Otherwise", "Similarly", "Meanwhile", "For example"],
          answer: 0,
          explanation: "前句提出七天內歸還的條件，後句說明不照做的結果，因此用 Otherwise。",
          translation: "否則，顧客下張發票可能會被加收替換費。"
        },
        {
          id: "P6-G37-Q3",
          prompt: "Choose the best sentence for blank (3).",
          choices: [
            "Pickup vehicles visit each participating building twice a week.",
            "Insulated bags are available in three additional colors.",
            "The accounting office closes at 4:30 on Fridays.",
            "Customers may include promotional samples in the containers."
          ],
          answer: 0,
          explanation: "後句提到查看 next scheduled collection time，前面必須先交代回收車定期到訪。",
          translation: "回收車每週會到各參與大樓兩次。"
        },
        {
          id: "P6-G37-Q4",
          prompt: "Choose the best word for blank (4).",
          choices: ["promptly", "prompt", "promptness", "prompted"],
          answer: 0,
          explanation: "空格修飾 reported，應使用副詞 promptly。",
          translation: "未成功取件的問題應立即透過支援入口回報。"
        }
      ]
    },
    {
      groupId: "P6-G38",
      category: "客服時段調整",
      tags: ["part6", "customer-service", "staffing", "sentence-insertion", "v5-guide-set"],
      passage: `INTERNAL MEMORANDUM

Call volume has increased sharply between 7:00 and 9:00 A.M. since the company expanded same-day delivery. To serve customers more (1) _____, the support center will begin an early shift on Monday. The change is temporary (2) _____ management needs four weeks of call data before approving a permanent schedule. (3) _____ Employees assigned to the early shift will finish at 3:30 P.M. rather than 5:30 P.M. Anyone who cannot work the revised hours should (4) _____ a scheduling request by Wednesday.`,
      questions: [
        {
          id: "P6-G38-Q1",
          prompt: "Choose the best word for blank (1).",
          choices: ["consistently", "consistent", "consistency", "consist"],
          answer: 0,
          explanation: "修飾動詞 serve 應使用副詞 consistently，表示穩定一致地提供服務。",
          translation: "為了更穩定地服務顧客，客服中心將新增早班。"
        },
        {
          id: "P6-G38-Q2",
          prompt: "Choose the best word for blank (2).",
          choices: ["because", "although", "unless", "whereas"],
          answer: 0,
          explanation: "後半句說明調整暫時性的原因，因此選 because。",
          translation: "這項變動是暫時的，因為管理層需要四週的通話資料。"
        },
        {
          id: "P6-G38-Q3",
          prompt: "Choose the best sentence for blank (3).",
          choices: [
            "Supervisors will rotate the assignment so that no employee works every early shift.",
            "The delivery fleet recently added two electric vans.",
            "Customer invoices are printed at a separate facility.",
            "The annual picnic has been postponed because of rain."
          ],
          answer: 0,
          explanation: "前後都在說明早班安排；A 交代輪替方式，並自然銜接早班員工的下班時間。",
          translation: "主管將輪替安排，因此不會有員工必須負責每一個早班。"
        },
        {
          id: "P6-G38-Q4",
          prompt: "Choose the best word for blank (4).",
          choices: ["submit", "submitted", "submission", "submitting"],
          answer: 0,
          explanation: "should 後接原形動詞 submit；submit a request 是固定搭配。",
          translation: "無法配合新時段者應在星期三前提出排班申請。"
        }
      ]
    }
  ];

  part6Groups.forEach((group) => {
    group.questions.forEach((question) => {
      window.BUILTIN_BANK.push({
        ...question,
        part: "6",
        difficulty: "800",
        category: group.category,
        passage: group.passage,
        audioText: "",
        groupId: group.groupId,
        formatType: "part6-text-completion",
        tags: ["part6", "human-reviewed", ...group.tags],
        ...provenance,
        sourceNote
      });
    });
  });

  const readingGroups = [
    {
      groupId: "P7-R108",
      category: "雙篇閱讀・智慧門禁",
      literacySkill: "流程與例外",
      tags: ["part7", "double-passage", "technology", "policy", "v5-guide-set"],
      passage: `DOCUMENT 1 - SMART ACCESS PILOT

From August 5 through August 30, employees on floors 8-12 may use a mobile access pass instead of a plastic badge. To join the pilot, install the SecureEntry app and complete identity verification before August 2. The mobile pass works at office entrances and shared meeting rooms, but it cannot be used for the parking garage. Participants should keep their plastic badge during the pilot. A help desk will operate in the main lobby from 8:00 to 10:00 A.M. on August 5 and 6.

DOCUMENT 2 - MESSAGE

From: Priya
To: Facilities Support
Date: August 7

The mobile pass opens the tenth-floor office door, but the reader outside Conference Room 10B displays "pass not recognized." I have a client presentation there at 11:00 tomorrow. I will be working from home this afternoon, so I cannot visit the lobby help desk today. Is there another way to have the room access checked?`,
      questions: [
        {
          id: "P7-R108-Q1",
          prompt: "What are pilot participants advised to keep?",
          choices: ["Their plastic badge", "A printed identity form", "A parking receipt", "A meeting-room key"],
          answer: 0,
          explanation: "公告明確要求參與者在試行期間保留塑膠識別證。",
          translation: "試行參與者被建議保留什麼？",
          evidence: "Participants should keep their plastic badge during the pilot.",
          evidenceLocation: "文件 1 第四句",
          answerAudit: "Their plastic badge",
          choiceNotes: ["正確，原文明確指出。", "沒有要求列印表格。", "停車場不支援行動通行證。", "文章未提實體房間鑰匙。"]
        },
        {
          id: "P7-R108-Q2",
          prompt: "Why does Priya contact Facilities Support?",
          choices: ["A meeting-room reader rejects her pass", "She cannot complete identity verification", "She lost her plastic badge", "The parking gate charged her twice"],
          answer: 0,
          explanation: "Priya 的通行證可開辦公室門，但 Conference Room 10B 的讀取器不接受。",
          translation: "Priya 為什麼聯絡設施支援？",
          evidence: "the reader outside Conference Room 10B displays \"pass not recognized.\"",
          evidenceLocation: "文件 2 第一、二句",
          answerAudit: "A meeting-room reader rejects her pass",
          choiceNotes: ["正確，問題發生在會議室讀取器。", "她已能開辦公室門，表示已完成設定。", "未提遺失識別證。", "她沒有談到停車費。"]
        },
        {
          id: "P7-R108-Q3",
          prompt: "What is suggested about Priya?",
          choices: ["She works on an eligible floor", "She joined the pilot after August 30", "She needs garage access for a client", "She can visit the help desk this afternoon"],
          answer: 0,
          explanation: "行動通行證成功開啟十樓辦公室，而試行只開放 8-12 樓，據此可推知她在符合資格的樓層工作。",
          translation: "關於 Priya，可以推知什麼？",
          evidence: "The mobile pass opens the tenth-floor office door",
          evidenceLocation: "文件 2 第一個子句，搭配文件 1 第一段",
          answerAudit: "She works on an eligible floor",
          choiceNotes: ["正確，十樓在 8-12 樓範圍內。", "訊息日期仍在試行期間。", "她要使用會議室，不是停車場。", "她明說下午無法到大廳。"]
        },
        {
          id: "P7-R108-Q4",
          prompt: "What will Priya most likely need before 11:00 tomorrow?",
          choices: ["An alternative support arrangement", "A replacement parking permit", "A new client presentation", "Approval to work on another floor"],
          answer: 0,
          explanation: "她無法到大廳服務台，且隔天 11 點前需要會議室權限，因此最可能需要其他支援方式。",
          translation: "Priya 在明天十一點前最可能需要什麼？",
          evidence: "Is there another way to have the room access checked?",
          evidenceLocation: "文件 2 最後一句",
          answerAudit: "An alternative support arrangement",
          choiceNotes: ["正確，是跨文件整合後的下一步。", "問題不在停車場。", "簡報已排定。", "問題是會議室權限，不是樓層工作核准。"]
        }
      ]
    },
    {
      groupId: "P7-R109",
      category: "三篇閱讀・充電費報銷",
      literacySkill: "計算與跨文件核對",
      tags: ["part7", "triple-passage", "reimbursement", "calculation", "data-literacy", "v5-guide-set"],
      passage: `DOCUMENT 1 - TRAVEL POLICY EXCERPT

Employees using a rental electric vehicle for approved business travel may claim public charging fees. Submit an itemized receipt showing the charging date, energy used, and total paid. Hotel parking fees are reimbursable, but valet service and idle-time penalties are not. Claims must be filed within ten business days after the trip ends.

DOCUMENT 2 - RECEIPT

GreenRoute Charging
Date: November 14
Energy: 32 kWh at $0.42 per kWh ........ $13.44
Idle-time fee .......................... $6.00
Tax ................................... $1.08
Total paid ............................ $20.52

DOCUMENT 3 - E-MAIL

From: Marcus Lee
To: Travel Accounting
Date: November 18

My client visit ended on November 15. I attached the GreenRoute receipt and a $24 self-parking receipt from my hotel. Please let me know if the charging receipt contains everything required. I have not included the $12 valet charge from the first evening.`,
      questions: [
        {
          id: "P7-R109-Q1",
          prompt: "Which charge on the GreenRoute receipt is not reimbursable?",
          choices: ["The idle-time fee", "The energy charge", "The tax", "The full charging session"],
          answer: 0,
          explanation: "政策明列 idle-time penalties 不予報銷。",
          translation: "GreenRoute 收據上的哪一筆費用不可報銷？",
          evidence: "valet service and idle-time penalties are not",
          evidenceLocation: "文件 1 第三句",
          answerAudit: "The idle-time fee",
          choiceNotes: ["正確，政策直接排除。", "核准出差的充電費可報銷。", "未將充電稅排除。", "只有閒置費被排除，不是整筆。"]
        },
        {
          id: "P7-R109-Q2",
          prompt: "How much in parking-related expenses did Marcus omit?",
          choices: ["$12", "$24", "$18", "$36"],
          answer: 0,
          explanation: "郵件明說未包含第一晚的 12 美元代客泊車費。",
          translation: "Marcus 省略了多少停車相關費用？",
          evidence: "I have not included the $12 valet charge",
          evidenceLocation: "文件 3 最後一句",
          answerAudit: "$12",
          choiceNotes: ["正確，是未申報的 valet charge。", "24 美元自助停車已附收據。", "混入了 idle-time fee。", "是兩筆停車費相加。"]
        },
        {
          id: "P7-R109-Q3",
          prompt: "What required information appears on the charging receipt?",
          choices: ["The date, energy used, and total paid", "The rental agreement number", "The business purpose of the trip", "The vehicle's return location"],
          answer: 0,
          explanation: "收據同時列出 11 月 14 日、32 kWh 與總額 20.52 美元，符合政策三項要求。",
          translation: "充電收據包含哪些必要資訊？",
          evidence: "Date: November 14\nEnergy: 32 kWh",
          evidenceLocation: "文件 2",
          answerAudit: "The date, energy used, and total paid",
          choiceNotes: ["正確，三項皆可在收據找到。", "政策未要求租車合約號碼。", "收據本身未列出差目的。", "政策未要求還車地點。"]
        },
        {
          id: "P7-R109-Q4",
          prompt: "By when should Marcus file the claim?",
          choices: ["Within ten business days after November 15", "Before the charging date", "Exactly on November 18", "Within ten calendar days after November 14"],
          answer: 0,
          explanation: "出差於 11 月 15 日結束，政策要求在行程結束後十個工作天內申報。",
          translation: "Marcus 最晚應在何時前提出申請？",
          evidence: "Claims must be filed within ten business days after the trip ends.",
          evidenceLocation: "文件 1 最後一句，搭配文件 3 第二句",
          answerAudit: "Within ten business days after November 15",
          choiceNotes: ["正確，起算點是出差結束日。", "不可能在費用發生前。", "11 月 18 日是寄信日，不是唯一截止日。", "政策是工作天，且由旅程結束日起算。"]
        }
      ]
    },
    {
      groupId: "P7-R110",
      category: "雙篇閱讀・翻譯工具試辦",
      literacySkill: "數據與決策",
      tags: ["part7", "double-passage", "technology", "table", "inference", "data-literacy", "v5-guide-set"],
      passage: `DOCUMENT 1 - PILOT RESULTS

Department | Documents tested | Accepted without revision | Average minutes saved per document
Sales | 40 | 26 | 8
Legal | 25 | 8 | 4
Customer Support | 60 | 45 | 11
Product | 35 | 21 | 7

Note: A document was "accepted without revision" only when a bilingual reviewer made no wording changes.

DOCUMENT 2 - MESSAGE CHAIN

09:10 - Hana: The translation pilot ends Friday. Which team should receive the first ten full licenses?
09:14 - Omar: Customer Support had the strongest acceptance rate and saved the most time per document.
09:18 - Hana: Agreed. Legal should continue with reviewer-only access because contract wording still required frequent changes.
09:22 - Omar: I will ask IT to activate the ten licenses on Monday and schedule a two-week follow-up review.`,
      questions: [
        {
          id: "P7-R110-Q1",
          prompt: "Which department tested the most documents?",
          choices: ["Customer Support", "Sales", "Product", "Legal"],
          answer: 0,
          explanation: "Customer Support 測試 60 份，高於其他部門。",
          translation: "哪個部門測試最多文件？",
          evidence: "Customer Support | 60 | 45 | 11",
          evidenceLocation: "文件 1 Customer Support 列",
          answerAudit: "Customer Support",
          choiceNotes: ["正確，共 60 份。", "Sales 為 40 份。", "Product 為 35 份。", "Legal 為 25 份。"]
        },
        {
          id: "P7-R110-Q2",
          prompt: "What percentage of Customer Support documents were accepted without revision?",
          choices: ["75%", "60%", "45%", "80%"],
          answer: 0,
          explanation: "45 ÷ 60 = 0.75，因此接受率為 75%。",
          translation: "客服部門文件未經修改即接受的比例是多少？",
          evidence: "Customer Support | 60 | 45 | 11",
          evidenceLocation: "文件 1 Customer Support 列",
          answerAudit: "75%",
          choiceNotes: ["正確，45 除以 60。", "把文件數誤當百分比。", "只取 accepted 數字。", "不是表中數據的正確比率。"]
        },
        {
          id: "P7-R110-Q3",
          prompt: "Why will Legal receive reviewer-only access?",
          choices: ["Its documents often needed wording changes", "It tested more documents than Support", "It saved eleven minutes per document", "It requested fewer than ten licenses"],
          answer: 0,
          explanation: "訊息說合約措辭仍經常需要修改，且表格顯示免修改接受率最低。",
          translation: "法務部為何只獲得審閱者權限？",
          evidence: "contract wording still required frequent changes",
          evidenceLocation: "文件 2 09:18",
          answerAudit: "Its documents often needed wording changes",
          choiceNotes: ["正確，訊息直接說明。", "Legal 測試數最少。", "11 分鐘是客服部門。", "未提 Legal 申請數量。"]
        },
        {
          id: "P7-R110-Q4",
          prompt: "What will most likely happen on Monday?",
          choices: ["Customer Support licenses will be activated", "The pilot results will be deleted", "Legal will receive ten full licenses", "All reviewers will stop checking translations"],
          answer: 0,
          explanation: "雙方同意先把十套完整授權給客服，Omar 表示週一請 IT 啟用。",
          translation: "星期一最可能發生什麼？",
          evidence: "activate the ten licenses on Monday",
          evidenceLocation: "文件 2 09:22，搭配 09:14-09:18",
          answerAudit: "Customer Support licenses will be activated",
          choiceNotes: ["正確，跨訊息整合可得。", "未提刪除結果。", "Legal 僅保留 reviewer-only。", "仍會進行兩週後檢討。"]
        }
      ]
    }
  ];

  readingGroups.forEach((group) => {
    group.questions.forEach((question) => {
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
        tags: ["part7", "literacy-core", "human-reviewed", ...group.tags],
        ...provenance,
        sourceNote
      });
    });
  });
})();
