(() => {
  const provenance = {
    sourceType: "original",
    sourceLabel: "本站原創模擬",
    sourceProvider: "TOEIC Question Ocean",
    sourceDetail: "依 TOEIC 公開題型結構自行撰寫，未複製外部付費或未授權題目。"
  };
  const sourceNote = "Original v4.7 Part 6 and Part 7 items. Answers, evidence spans, and distractors were manually reviewed.";

  const part6Groups = [
    {
      groupId: "P6-G34",
      category: "合約續約通知",
      tags: ["part6", "contract", "compliance", "sentence-insertion"],
      passage: `To: Procurement Team
From: Contract Compliance
Subject: Supplier Renewal Checks

Before extending any supplier agreement, procurement staff must verify that the vendor has (1) _____ all required insurance certificates. If a certificate is due to expire within sixty days, the vendor should submit an updated copy (2) _____ the renewal is approved. (3) _____ This additional review prevents a contract from being extended while essential coverage is inactive. Staff members who identify a discrepancy should record it in the contract portal and (4) _____ the legal team immediately.`,
      questions: [
        {
          id: "P6-G34-Q1",
          prompt: "Choose the best word for blank (1).",
          choices: ["submit", "submitted", "submission", "submitting"],
          answer: 1,
          explanation: "has 後接過去分詞形成現在完成式，因此選 submitted。",
          translation: "採購人員必須確認供應商已提交所有必要的保險證明。"
        },
        {
          id: "P6-G34-Q2",
          prompt: "Choose the best word for blank (2).",
          choices: ["before", "despite", "unless", "whereas"],
          answer: 0,
          explanation: "更新證明必須在續約獲准之前提交，before 最符合流程順序。",
          translation: "若證明即將到期，供應商應在續約獲准前提交更新版本。"
        },
        {
          id: "P6-G34-Q3",
          prompt: "Choose the best sentence for blank (3).",
          choices: [
            "The compliance analyst must then compare the new policy dates with the proposed contract term.",
            "The office cafeteria introduced a seasonal menu last week.",
            "Most suppliers deliver paper invoices by regular mail.",
            "The legal team has moved to another floor of the building."
          ],
          answer: 0,
          explanation: "前句要求新保單，後句以 This additional review 承接日期比對作業，只有 A 能形成完整指涉。",
          translation: "接著，法遵分析師必須將新保單日期與預定合約期間進行比對。"
        },
        {
          id: "P6-G34-Q4",
          prompt: "Choose the best word for blank (4).",
          choices: ["notify", "notice", "notification", "notified"],
          answer: 0,
          explanation: "and 連接 record 與原形動詞 notify，形成平行結構。",
          translation: "發現差異的人員應記錄問題並立即通知法務團隊。"
        }
      ]
    },
    {
      groupId: "P6-G35",
      category: "設備維護備忘錄",
      tags: ["part6", "maintenance", "operations", "sentence-insertion"],
      passage: `FACILITIES MEMORANDUM

Technicians have observed irregular temperature readings from the east-wing cooling unit. The unit will be temporarily (1) _____ on Thursday evening so that its sensors can be inspected. Although the backup unit can support the current workload, engineers recommend moving nonurgent batch jobs to after midnight, (2) _____ demand is normally lowest. (3) _____ Supervisors should therefore confirm that every team has (4) _____ the revised processing schedule before 3:00 P.M. on Thursday.`,
      questions: [
        {
          id: "P6-G35-Q1",
          prompt: "Choose the best phrase for blank (1).",
          choices: ["shut down", "looked after", "turned over", "brought forward"],
          answer: 0,
          explanation: "設備為接受檢查而暫時停機，be shut down 是正確被動搭配。",
          translation: "該設備將於週四晚間暫時關閉，以便檢查感應器。"
        },
        {
          id: "P6-G35-Q2",
          prompt: "Choose the best word for blank (2).",
          choices: ["when", "although", "because of", "until"],
          answer: 0,
          explanation: "空格後是完整子句 demand is normally lowest，when 表示需求最低的時間。",
          translation: "工程師建議將非緊急批次工作移到午夜後，也就是需求通常最低的時段。"
        },
        {
          id: "P6-G35-Q3",
          prompt: "Choose the best sentence for blank (3).",
          choices: [
            "No customer-facing interruption is expected, but processing may take slightly longer during the inspection.",
            "The company picnic will be held beside the west parking area.",
            "Several employees have requested larger computer monitors.",
            "The supplier's annual report was published in three languages."
          ],
          answer: 0,
          explanation: "文章主軸是冷卻設備檢查及作業排程；A 同時交代不影響客戶與處理可能變慢，能銜接後句的 therefore。",
          translation: "預計不會中斷客戶服務，但檢查期間的處理時間可能稍微延長。"
        },
        {
          id: "P6-G35-Q4",
          prompt: "Choose the best word for blank (4).",
          choices: ["received", "receiving", "receipt", "receptive"],
          answer: 0,
          explanation: "has 後接過去分詞 received；receive the revised schedule 表示收到修訂後的排程。",
          translation: "主管應確認每個團隊都已收到修訂後的處理排程。"
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
        tags: group.tags,
        ...provenance,
        sourceNote
      });
    });
  });

  const readingGroups = [
    {
      groupId: "P7-R104",
      category: "雙篇閱讀・服務合約",
      literacySkill: "期限與費用",
      tags: ["double-passage", "contract", "calculation", "data-literacy"],
      passage: `DOCUMENT 1 - FACILITY MONITORING AGREEMENT

Contract term: July 1-June 30
Annual base fee: $14,400, billed in four equal quarterly payments
Renewal: The agreement renews automatically for twelve months unless either party provides written notice at least forty-five days before June 30.
Additional locations: $250 per location per month, beginning with the first full month after activation
Support: Requests received during business hours receive a response within four business hours. After-hours emergency service is billed separately.

DOCUMENT 2 - E-MAIL

Date: May 20
From: Elena Ruiz
To: Facility Monitoring Services

We plan to continue the agreement for another year. Two new branches are scheduled for activation on July 15. Please confirm when charges for those locations will begin and whether the base service will remain on the quarterly billing schedule.`,
      questions: [
        {
          id: "P7-R104-Q1",
          prompt: "What will most likely happen to the agreement on July 1?",
          choices: ["It will renew for another year", "It will end because notice was sent", "It will change to monthly base billing", "It will cover only one new branch"],
          answer: 0,
          explanation: "郵件明確表示將繼續一年，且沒有提出終止通知，因此合約會自動續約十二個月。",
          translation: "7 月 1 日合約最可能會發生什麼？",
          evidence: "We plan to continue the agreement for another year.",
          evidenceLocation: "文件 2 第一段",
          answerAudit: "It will renew for another year",
          choiceNotes: ["正確，郵件與自動續約條款一致。", "郵件不是終止通知。", "基礎費仍按季計費。", "郵件列出兩個新分點。"]
        },
        {
          id: "P7-R104-Q2",
          prompt: "How much is each quarterly base payment?",
          choices: ["$3,600", "$1,200", "$14,400", "$4,100"],
          answer: 0,
          explanation: "年度基礎費 14,400 美元分成四期，14,400 ÷ 4 = 3,600。",
          translation: "每季基礎費應支付多少？",
          evidence: "Annual base fee: $14,400, billed in four equal quarterly payments",
          evidenceLocation: "文件 1 第二列",
          answerAudit: "$3,600",
          choiceNotes: ["正確，年度費用除以四。", "是誤除以十二的月均數。", "這是全年費用。", "錯把兩個分點的一個月費用加進季費。"]
        },
        {
          id: "P7-R104-Q3",
          prompt: "When will charges for the two new branches begin?",
          choices: ["In August", "On July 1", "On July 15", "In September"],
          answer: 0,
          explanation: "分點 7 月 15 日啟用，費用從啟用後第一個完整月份開始，因此是 8 月。",
          translation: "兩個新分點將從何時開始收費？",
          evidence: "Additional locations: $250 per location per month, beginning with the first full month after activation",
          evidenceLocation: "文件 1 Additional locations 條款",
          answerAudit: "In August",
          choiceNotes: ["正確，8 月是啟用後第一個完整月份。", "早於啟用日。", "啟用當月不是完整月份。", "晚了一個月。"]
        },
        {
          id: "P7-R104-Q4",
          prompt: "Which service may result in an additional charge?",
          choices: ["Emergency support outside business hours", "A response within four business hours", "Quarterly base billing", "Automatic contract renewal"],
          answer: 0,
          explanation: "條款明確表示非營業時間的緊急服務另行計費。",
          translation: "哪項服務可能產生額外費用？",
          evidence: "After-hours emergency service is billed separately.",
          evidenceLocation: "文件 1 Support 條款",
          answerAudit: "Emergency support outside business hours",
          choiceNotes: ["正確，billed separately 即另行收費。", "是正常服務承諾。", "只是付款頻率。", "續約本身未列額外費用。"]
        }
      ]
    },
    {
      groupId: "P7-R105",
      category: "雙篇閱讀・補助表單",
      literacySkill: "表單與政策",
      tags: ["double-passage", "form", "policy", "calculation", "data-literacy"],
      passage: `DOCUMENT 1 - PROFESSIONAL DEVELOPMENT REQUEST

Employee: Sana Ko
Employment status: Full-time, 14 months
Course: Advanced Spreadsheet Automation
Course dates: September 12-13
Request submitted: August 20
Manager preapproval: Yes
Tuition: $420
Required certification exam: $80
Travel: $60

DOCUMENT 2 - REIMBURSEMENT POLICY

Full-time employees with at least six months of service may request reimbursement for preapproved, job-related courses. Tuition and required examination fees are covered up to $600 per calendar year. Travel costs are not covered. Requests must be submitted at least ten business days before a course begins. Proof of successful completion is due within thirty days after the course ends.`,
      questions: [
        {
          id: "P7-R105-Q1",
          prompt: "How much of Ms. Ko's listed expenses is eligible for reimbursement?",
          choices: ["$500", "$560", "$420", "$600"],
          answer: 0,
          explanation: "可補助學費 420 與必要考試費 80，共 500；交通費不包含。",
          translation: "Ko 女士列出的費用中有多少符合補助資格？",
          evidence: "Tuition and required examination fees are covered up to $600 per calendar year.",
          evidenceLocation: "文件 2 第二句，對照文件 1 費用",
          answerAudit: "$500",
          choiceNotes: ["正確，420 + 80。", "包含了不補助的交通費。", "漏算必要考試費。", "600 是上限而非實際費用。"]
        },
        {
          id: "P7-R105-Q2",
          prompt: "Why is the $60 expense not eligible?",
          choices: ["It is a travel cost", "It exceeds the annual limit", "It lacks manager approval", "It is an optional exam fee"],
          answer: 0,
          explanation: "政策直接排除 travel costs。",
          translation: "為什麼 60 美元的費用不符合補助資格？",
          evidence: "Travel costs are not covered.",
          evidenceLocation: "文件 2 第三句",
          answerAudit: "It is a travel cost",
          choiceNotes: ["正確，60 美元列為 Travel。", "合格費用未超過 600。", "表單顯示已預先核准。", "60 美元不是考試費。"]
        },
        {
          id: "P7-R105-Q3",
          prompt: "Which eligibility requirement has Ms. Ko clearly satisfied?",
          choices: ["She has worked full-time for more than six months", "She has already completed the course", "She submitted proof within thirty days", "She has used no reimbursement this year"],
          answer: 0,
          explanation: "表單顯示全職 14 個月，超過政策要求的六個月。",
          translation: "Ko 女士明確符合哪一項資格要求？",
          evidence: "Employment status: Full-time, 14 months",
          evidenceLocation: "文件 1 第二列",
          answerAudit: "She has worked full-time for more than six months",
          choiceNotes: ["正確，14 個月超過六個月。", "課程尚未開始。", "完課證明要在課後提交。", "文件未提供年度既有補助紀錄。"]
        },
        {
          id: "P7-R105-Q4",
          prompt: "What must Ms. Ko provide after the course?",
          choices: ["Evidence that she completed it successfully", "A new manager preapproval", "A receipt for daily travel", "A second employment application"],
          answer: 0,
          explanation: "課程結束後三十天內須提交成功完成課程的證明。",
          translation: "Ko 女士在課程結束後必須提供什麼？",
          evidence: "Proof of successful completion is due within thirty days after the course ends.",
          evidenceLocation: "文件 2 最後一句",
          answerAudit: "Evidence that she completed it successfully",
          choiceNotes: ["正確，是 proof of successful completion 的改寫。", "已取得預先核准。", "交通費不補助。", "與就業申請無關。"]
        }
      ]
    },
    {
      groupId: "P7-R106",
      category: "雙篇閱讀・行事曆協調",
      literacySkill: "時間衝突",
      tags: ["double-passage", "calendar", "message-chain", "data-literacy"],
      passage: `DOCUMENT 1 - DIEGO'S CALENDAR

Monday
9:00-10:00 | Product review | Room 2
11:00-11:45 | Client call | Remote
2:00-3:00 | Equipment demonstration | Lab

Tuesday
9:30-10:30 | Budget briefing | Room 4
1:00-2:00 | Vendor interview | Room 2
3:30-4:15 | Sprint review | Remote

DOCUMENT 2 - MESSAGE CHAIN

Carla, 10:12 A.M.: The client cannot join Monday's call and proposed Tuesday at 1:00. The call is remote, so Room 2 is not the issue, but I noticed your vendor interview.
Diego, 10:16 A.M.: I can join the client at 2:30 Tuesday. I need to leave at 3:00 to prepare for the sprint review.
Carla, 10:19 A.M.: Confirmed. I moved the client call to Tuesday at 2:30 and shortened it to thirty minutes.`,
      questions: [
        {
          id: "P7-R106-Q1",
          prompt: "Why could Diego not accept the client's proposed time?",
          choices: ["He had a vendor interview", "Room 2 was unavailable for remote calls", "He was demonstrating equipment", "The sprint review began at 1:00"],
          answer: 0,
          explanation: "客戶提議週二 1:00，正好與 Diego 的 vendor interview 重疊。",
          translation: "Diego 為什麼不能接受客戶原先提議的時間？",
          evidence: "1:00-2:00 | Vendor interview | Room 2",
          evidenceLocation: "文件 1 Tuesday 行程",
          answerAudit: "He had a vendor interview",
          choiceNotes: ["正確，與 1:00 客戶提議衝突。", "訊息明說教室不是問題。", "設備示範在週一。", "Sprint review 是 3:30。"]
        },
        {
          id: "P7-R106-Q2",
          prompt: "When will the rescheduled client call end?",
          choices: ["3:00 P.M.", "2:30 P.M.", "3:30 P.M.", "4:15 P.M."],
          answer: 0,
          explanation: "電話改到 2:30，並縮短為三十分鐘，因此 3:00 結束。",
          translation: "改期後的客戶電話將於何時結束？",
          evidence: "I moved the client call to Tuesday at 2:30 and shortened it to thirty minutes.",
          evidenceLocation: "文件 2 Carla 最後一則訊息",
          answerAudit: "3:00 P.M.",
          choiceNotes: ["正確，2:30 加 30 分鐘。", "這是開始時間。", "這是 sprint review 開始時間。", "這是 sprint review 結束時間。"]
        },
        {
          id: "P7-R106-Q3",
          prompt: "What will Diego do immediately after the client call?",
          choices: ["Prepare for the sprint review", "Attend the budget briefing", "Interview a vendor", "Go to the equipment lab"],
          answer: 0,
          explanation: "Diego 說 3:00 必須離開去準備 3:30 的 sprint review。",
          translation: "客戶電話結束後，Diego 會立刻做什麼？",
          evidence: "I need to leave at 3:00 to prepare for the sprint review.",
          evidenceLocation: "文件 2 Diego 的訊息",
          answerAudit: "Prepare for the sprint review",
          choiceNotes: ["正確，訊息直接說明。", "預算簡報在上午。", "供應商面談在 1:00。", "設備示範在週一。"]
        },
        {
          id: "P7-R106-Q4",
          prompt: "What is indicated about the client call?",
          choices: ["It does not require a meeting room", "It must last forty-five minutes", "It will take place on Monday", "It has been canceled"],
          answer: 0,
          explanation: "行事曆與訊息都標示為 remote，因此不需要會議室。",
          translation: "關於客戶電話，可得知什麼？",
          evidence: "The call is remote, so Room 2 is not the issue",
          evidenceLocation: "文件 2 Carla 第一則訊息",
          answerAudit: "It does not require a meeting room",
          choiceNotes: ["正確，remote 不占用 Room 2。", "新時段縮短為 30 分鐘。", "已改到週二。", "電話只是改期。"]
        }
      ]
    },
    {
      groupId: "P7-R107",
      category: "雙篇閱讀・行銷圖表",
      literacySkill: "複合圖表",
      tags: ["double-passage", "chart", "calculation", "trend", "data-literacy"],
      passage: `DOCUMENT 1 - FIRST-QUARTER LEAD REPORT

Channel | January | February | March | Conversion rate
Search advertising | 420 | 460 | 510 | 12%
Webinars | 180 | 240 | 210 | 18%
Referral partners | 260 | 255 | 300 | 15%
E-mail campaigns | 310 | 295 | 280 | 9%

DOCUMENT 2 - MARKETING NOTE

The March search campaign produced our highest monthly lead count, but webinars continued to deliver the strongest conversion rate. Partner leads also recovered after a slight February decline. For the next quarter, we will move part of the e-mail campaign budget to webinars and test a new information kit for referral partners.`,
      questions: [
        {
          id: "P7-R107-Q1",
          prompt: "Which channel generated the most leads in March?",
          choices: ["Search advertising", "Referral partners", "E-mail campaigns", "Webinars"],
          answer: 0,
          explanation: "3 月 Search advertising 為 510，超過其他三個管道。",
          translation: "哪個管道在三月帶來最多潛在客戶？",
          evidence: "Search advertising | 420 | 460 | 510 | 12%",
          evidenceLocation: "文件 1 Search advertising 列",
          answerAudit: "Search advertising",
          choiceNotes: ["正確，3 月為 510。", "3 月為 300。", "3 月為 280。", "3 月為 210。"]
        },
        {
          id: "P7-R107-Q2",
          prompt: "How many first-quarter leads came from referral partners?",
          choices: ["815", "300", "775", "1,390"],
          answer: 0,
          explanation: "Referral partners 三個月合計 260 + 255 + 300 = 815。",
          translation: "第一季由推薦合作夥伴帶來多少潛在客戶？",
          evidence: "Referral partners | 260 | 255 | 300 | 15%",
          evidenceLocation: "文件 1 Referral partners 列",
          answerAudit: "815",
          choiceNotes: ["正確，三個月總和。", "只有三月數字。", "漏算或誤算的干擾值。", "是 Search advertising 的季度總數。"]
        },
        {
          id: "P7-R107-Q3",
          prompt: "Why will some e-mail campaign funds be moved to webinars?",
          choices: ["Webinars convert a higher share of leads", "E-mail campaigns produced no March leads", "Webinars had the highest March lead count", "Referral partners are being discontinued"],
          answer: 0,
          explanation: "Webinars 的轉換率 18% 為最高，高於 e-mail 的 9%，所以調整預算。",
          translation: "為什麼部分電子郵件行銷預算將移到網路研討會？",
          evidence: "webinars continued to deliver the strongest conversion rate",
          evidenceLocation: "文件 2 第一、二句",
          answerAudit: "Webinars convert a higher share of leads",
          choiceNotes: ["正確，strongest conversion rate 的同義改寫。", "E-mail 三月仍有 280。", "最高三月 leads 是 Search。", "合作夥伴仍會測試新資料包。"]
        },
        {
          id: "P7-R107-Q4",
          prompt: "What will be tested for referral partners?",
          choices: ["A new information kit", "A higher conversion fee", "A replacement search platform", "A shorter webinar"],
          answer: 0,
          explanation: "行銷備註明確表示下一季將為 referral partners 測試新的 information kit。",
          translation: "推薦合作夥伴將測試什麼？",
          evidence: "test a new information kit for referral partners",
          evidenceLocation: "文件 2 最後一句",
          answerAudit: "A new information kit",
          choiceNotes: ["正確，原文直接對應。", "未提轉換費。", "Search 平台不會被替換。", "Webinar 長度未提。"]
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
