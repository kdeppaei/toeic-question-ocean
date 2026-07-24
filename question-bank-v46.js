(() => {
  const provenance = {
    sourceType: "original",
    sourceLabel: "本站原創模擬",
    sourceProvider: "TOEIC Question Ocean",
    sourceDetail: "依 TOEIC 公開題型結構自行撰寫，未複製外部付費或未授權題目。"
  };
  const sourceNote = "Original v4.6 Part 7 document-literacy items. Every answer, evidence span, and distractor was manually checked.";

  const correctedGroups = [
    {
      ids: ["P7-R35-Q5", "P7-R35-Q6"],
      groupId: "P7-R93",
      category: "單篇閱讀・場地進場規則",
      literacySkill: "時間條件",
      passage: `RIVERFRONT EXHIBITION CENTER
DELIVERY ACCESS NOTICE

Delivery vehicles may enter Gate 4 only during their reserved thirty-minute time slot. Drivers must first check in at the access desk, which opens at 8:15 A.M., and show both a photo ID and the delivery reference number. Vehicles arriving more than fifteen minutes after their reserved time may be directed to the public waiting area. Safety vests are required inside the loading bay.`,
      questions: [
        {
          prompt: "What must drivers do before entering the loading bay?",
          choices: ["Check in at the access desk", "Pay a parking charge", "Call the exhibition organizer", "Unload in the public waiting area"],
          answer: 0,
          explanation: "公告明確要求司機先到 access desk 報到，再進入裝卸區。",
          translation: "司機進入裝卸區前必須做什麼？",
          evidence: "Drivers must first check in at the access desk",
          evidenceLocation: "進場公告第二句",
          answerAudit: "Check in at the access desk",
          choiceNotes: ["正確，first 表示必要的前置步驟。", "公告未提停車費。", "不需要先致電主辦人。", "waiting area 只給嚴重遲到的車輛。"]
        },
        {
          prompt: "A driver has an 8:30 A.M. reservation. What is indicated about the driver's arrival at 8:20 A.M.?",
          choices: ["The driver can check in before the reserved time", "The driver must wait until the next day", "The driver is already considered late", "The driver may enter without identification"],
          answer: 0,
          explanation: "access desk 8:15 開門，8:20 已可報到，也早於 8:30 的預約時間。",
          translation: "預約 8:30 的司機若於 8:20 抵達，可推知什麼？",
          evidence: "the access desk, which opens at 8:15 A.M.",
          evidenceLocation: "進場公告第二句",
          answerAudit: "The driver can check in before the reserved time",
          choiceNotes: ["正確，櫃台已開放且尚未到預約時間。", "沒有隔日限制。", "8:20 早於 8:30。", "仍須出示照片證件。"]
        }
      ]
    },
    {
      ids: ["P7-R36-Q5", "P7-R36-Q6"],
      groupId: "P7-R94",
      category: "單篇閱讀・通勤票更新",
      literacySkill: "規則判讀",
      passage: `METROLINK COMMUTER PASS UPDATE

Beginning September 1, the combined commuter pass will be accepted on city buses and regional trains. Current pass holders do not need a replacement card, but monthly passes must be renewed by August 28 to remain active on the first day of the new program. Airport express services and reserved-seat trains are not included. Employers enrolled in the transit-benefit program will receive updated payroll instructions separately.`,
      questions: [
        {
          prompt: "What are current pass holders advised to do?",
          choices: ["Renew by August 28", "Request a replacement card", "Reserve a seat on every train", "Contact their employer before each trip"],
          answer: 0,
          explanation: "現有持卡人不必換卡，但須在 8 月 28 日前續期。",
          translation: "現有通勤票持有人被建議做什麼？",
          evidence: "monthly passes must be renewed by August 28",
          evidenceLocation: "更新公告第二句",
          answerAudit: "Renew by August 28",
          choiceNotes: ["正確，這是保持 9 月 1 日有效的期限。", "公告明說不必換卡。", "劃位列車不包含在方案內。", "雇主只會另收薪資作業說明。"]
        },
        {
          prompt: "Which service is NOT covered by the combined pass?",
          choices: ["The airport express", "A city bus", "A regional train", "A regular local route"],
          answer: 0,
          explanation: "公告列明 airport express services 不適用合併通勤票。",
          translation: "哪一項服務不包含在合併通勤票內？",
          evidence: "Airport express services and reserved-seat trains are not included.",
          evidenceLocation: "更新公告第三句",
          answerAudit: "The airport express",
          choiceNotes: ["正確，明列排除。", "city buses 可使用。", "regional trains 可使用。", "一般市區路線屬公車服務。"]
        }
      ]
    },
    {
      ids: ["P7-R43-Q6", "P7-R43-Q7"],
      groupId: "P7-R95",
      category: "單篇閱讀・維修估價",
      literacySkill: "費用條件",
      passage: `NORTHLINE EQUIPMENT REPAIR
ESTIMATE #Q-184

Inspection fee: $45
Replacement sensor: $120
Labor: $80

If the repair is approved within seven calendar days, the inspection fee will be credited toward the final bill. The sensor is not currently in stock and is expected to arrive within three business days. Work will begin after both approval and part delivery are confirmed.`,
      questions: [
        {
          prompt: "Under what condition will the customer receive a $45 credit?",
          choices: ["The repair is approved within seven days", "The sensor arrives late", "Labor takes more than three days", "The estimate is paid in cash"],
          answer: 0,
          explanation: "七個日曆日內核准維修，45 美元檢查費才會折抵最終帳單。",
          translation: "顧客在什麼條件下可獲得 45 美元折抵？",
          evidence: "If the repair is approved within seven calendar days, the inspection fee will be credited",
          evidenceLocation: "估價單費用表後第一句",
          answerAudit: "The repair is approved within seven days",
          choiceNotes: ["正確，是折抵的明確條件。", "零件到貨時間不影響折抵。", "沒有工時折抵規則。", "付款方式未被提及。"]
        },
        {
          prompt: "Why will the repair not begin immediately?",
          choices: ["A required part is unavailable", "The inspection has been canceled", "The customer rejected the estimate", "The labor charge has not been calculated"],
          answer: 0,
          explanation: "替換感應器目前缺貨，須等待到貨並取得核准後才能施工。",
          translation: "為什麼維修不會立刻開始？",
          evidence: "The sensor is not currently in stock",
          evidenceLocation: "估價單倒數第二句",
          answerAudit: "A required part is unavailable",
          choiceNotes: ["正確，感應器缺貨。", "檢查費已列入估價。", "尚待核准，不等於已拒絕。", "人工費已列為 80 美元。"]
        }
      ]
    },
    {
      ids: ["P7-R46-Q5", "P7-R46-Q6"],
      groupId: "P7-R96",
      category: "單篇閱讀・培訓先修",
      literacySkill: "流程排序",
      passage: `DATA REPORTING WORKSHOPS

Foundation Dashboard Skills
Tuesday, 9:00 A.M.-11:00 A.M.

Advanced Forecast Design
Tuesday, 1:30 P.M.-4:00 P.M.

Employees may register for either workshop, but Advanced Forecast Design requires completion of the foundation workshop or equivalent training. Participants should bring a company laptop with the current analytics software installed. Registration closes at noon on Monday.`,
      questions: [
        {
          prompt: "Who may register for the afternoon workshop?",
          choices: ["An employee with equivalent prior training", "Any visitor with a personal tablet", "Only employees who attend on Monday", "A participant without analytics software"],
          answer: 0,
          explanation: "進階課要求完成基礎課或具備同等訓練，因此有同等背景的員工符合資格。",
          translation: "誰可以報名下午的工作坊？",
          evidence: "requires completion of the foundation workshop or equivalent training",
          evidenceLocation: "課程表後第一句",
          answerAudit: "An employee with equivalent prior training",
          choiceNotes: ["正確，符合 equivalent training 條件。", "課程對象為員工且需公司筆電。", "星期一只是截止日。", "參加者須安裝分析軟體。"]
        },
        {
          prompt: "What should participants do before attending?",
          choices: ["Install the current analytics software", "Submit a forecast by Tuesday morning", "Borrow a laptop from the instructor", "Complete registration on Tuesday afternoon"],
          answer: 0,
          explanation: "參加者必須攜帶已安裝最新版分析軟體的公司筆電。",
          translation: "參加者在出席前應做什麼？",
          evidence: "bring a company laptop with the current analytics software installed",
          evidenceLocation: "課程表後第二句",
          answerAudit: "Install the current analytics software",
          choiceNotes: ["正確，installed 是明確準備要求。", "沒有預交預測報告。", "需自行帶公司筆電。", "報名星期一中午截止。"]
        }
      ]
    },
    {
      ids: ["P7-R48-Q6", "P7-R48-Q7"],
      groupId: "P7-R97",
      category: "單篇閱讀・企業退貨",
      literacySkill: "例外條款",
      passage: `BRIGHTDESK BUSINESS RETURNS

Unopened standard products may be returned within fourteen days of delivery. Before shipping a return, customers must request a return authorization number through the business portal. Custom-printed products and assembled furniture are not returnable unless they arrived damaged. Approved refunds are issued to the original payment method after warehouse inspection.`,
      questions: [
        {
          prompt: "Which item can normally be returned?",
          choices: ["An unopened standard product delivered ten days ago", "An undamaged custom-printed sign", "An assembled desk with no defect", "A standard product delivered one month ago"],
          answer: 0,
          explanation: "未拆封的一般商品在送達十四天內可退貨，十天前送達符合條件。",
          translation: "哪一項商品通常可以退貨？",
          evidence: "Unopened standard products may be returned within fourteen days of delivery.",
          evidenceLocation: "退貨政策第一句",
          answerAudit: "An unopened standard product delivered ten days ago",
          choiceNotes: ["正確，同時符合未拆封、一般商品與十四天期限。", "客製印刷品無損時不可退。", "已組裝家具無損時不可退。", "一個月已超過期限。"]
        },
        {
          prompt: "What must a customer obtain before sending a return?",
          choices: ["A return authorization number", "A warehouse inspection report", "A new payment method", "An assembly certificate"],
          answer: 0,
          explanation: "寄回商品前須先透過企業入口網站取得退貨授權號碼。",
          translation: "顧客寄出退貨商品前必須取得什麼？",
          evidence: "customers must request a return authorization number",
          evidenceLocation: "退貨政策第二句",
          answerAudit: "A return authorization number",
          choiceNotes: ["正確，是寄回前置程序。", "倉庫檢查在收到退貨後進行。", "退款回原付款方式。", "政策未提組裝證明。"]
        }
      ]
    }
  ];

  correctedGroups.forEach((group) => {
    group.ids.forEach((id, index) => {
      const question = window.BUILTIN_BANK.find((entry) => entry.id === id);
      if (!question) return;
      Object.assign(question, group.questions[index], {
        part: "7",
        difficulty: "800",
        category: group.category,
        passage: group.passage,
        audioText: "",
        groupId: group.groupId,
        literacySkill: group.literacySkill,
        formatType: "part7-reading-comprehension",
        structureCorrected: true,
        tags: ["part7", "single-passage", "literacy-core", "human-reviewed", "group-size-corrected"],
        ...provenance,
        sourceNote
      });
    });
  });

  const readingGroups = [
    {
      groupId: "P7-R98",
      category: "雙篇閱讀・鐵路時刻",
      literacySkill: "時刻表推論",
      tags: ["double-passage", "timetable", "data-literacy"],
      passage: `DOCUMENT 1 - WEEKDAY TRAINS: EASTPORT TO GLENDALE

Train E12 | Departs 7:10 | Arrives 8:05 | Express | Platform 3
Train L18 | Departs 7:35 | Arrives 8:50 | Local | Platform 1
Train E20 | Departs 8:15 | Arrives 9:10 | Express | Platform 3

DOCUMENT 2 - MESSAGE

From: Dana Hart
To: Workshop Team
Time: 6:45 A.M.

I originally booked Train L18, but workshop check-in closes at 8:40. I have changed to the earlier express and will meet the venue assistant near the Glendale ticket gates. Please keep my 9:00 presentation slot.`,
      questions: [
        {
          id: "P7-R98-Q1",
          prompt: "Why did Ms. Hart change trains?",
          choices: ["Her original train would arrive after check-in closes", "Her presentation was moved to another day", "The local train no longer stops at Glendale", "The venue assistant requested a later arrival"],
          answer: 0,
          explanation: "L18 於 8:50 抵達，但報到 8:40 截止，因此必須改搭早班車。",
          translation: "Hart 女士為什麼改搭其他列車？",
          evidence: "I originally booked Train L18, but workshop check-in closes at 8:40.",
          evidenceLocation: "文件 1 的 L18 列與文件 2 第一段",
          answerAudit: "Her original train would arrive after check-in closes",
          choiceNotes: ["正確，需跨文件比較 8:50 與 8:40。", "簡報仍為 9:00。", "L18 仍抵達 Glendale。", "她改搭較早而非較晚的車。"]
        },
        {
          id: "P7-R98-Q2",
          prompt: "Which train will Ms. Hart most likely take?",
          choices: ["E12", "L18", "E20", "No listed train"],
          answer: 0,
          explanation: "她改搭 earlier express；表中只有 E12 是比 L18 更早的快車。",
          translation: "Hart 女士最可能搭哪班車？",
          evidence: "I have changed to the earlier express",
          evidenceLocation: "文件 2 第一段，對照文件 1",
          answerAudit: "E12",
          choiceNotes: ["正確，7:10 出發且為 Express。", "這是原本會遲到的車。", "E20 比 L18 更晚。", "時刻表已有符合條件的 E12。"]
        },
        {
          id: "P7-R98-Q3",
          prompt: "Where should the venue assistant meet Ms. Hart?",
          choices: ["Near the Glendale ticket gates", "On Platform 1 at Eastport", "At the workshop check-in desk", "Inside Train E20"],
          answer: 0,
          explanation: "訊息直接指定在 Glendale ticket gates 附近會合。",
          translation: "場地方助理應在哪裡與 Hart 女士會合？",
          evidence: "will meet the venue assistant near the Glendale ticket gates",
          evidenceLocation: "文件 2 第二句",
          answerAudit: "Near the Glendale ticket gates",
          choiceNotes: ["正確，訊息明示。", "Platform 1 是 L18 的出發月台。", "她會先在車站會合。", "她搭乘的是 E12。"]
        },
        {
          id: "P7-R98-Q4",
          prompt: "From which platform will Ms. Hart's train depart?",
          choices: ["Platform 3", "Platform 1", "Platform 2", "The platform is not listed"],
          answer: 0,
          explanation: "確定她搭 E12 後，從時刻表可知出發月台是 3。",
          translation: "Hart 女士的列車從哪個月台出發？",
          evidence: "Train E12 | Departs 7:10 | Arrives 8:05 | Express | Platform 3",
          evidenceLocation: "文件 1 第一列",
          answerAudit: "Platform 3",
          choiceNotes: ["正確，E12 的月台。", "Platform 1 屬於 L18。", "表中無 Platform 2。", "時刻表明確列出。"]
        }
      ]
    },
    {
      groupId: "P7-R99",
      category: "三篇閱讀・服務帳單",
      literacySkill: "帳單計算",
      tags: ["triple-passage", "invoice", "calculation", "data-literacy"],
      passage: `DOCUMENT 1 - INVOICE #C-771

Monthly platform plan: $240
Four additional user seats: $60
Priority support: $40
Service subtotal: $340
Reliability credit: -$34
Amount due: $306

DOCUMENT 2 - RELIABILITY POLICY

When a single verified outage exceeds two continuous hours, customers receive a credit equal to 10 percent of that month's service subtotal. Credits appear automatically on the next invoice.

DOCUMENT 3 - E-MAIL

From: Accounts Team
To: Morgan Lee

The monitoring report confirms that your workspace was unavailable for two hours and eighteen minutes on May 6. No action is required to receive the applicable credit. Please contact us only if the amount does not appear on invoice #C-771.`,
      questions: [
        {
          id: "P7-R99-Q1",
          prompt: "Why was a $34 credit applied?",
          choices: ["A verified outage lasted more than two hours", "Four user seats were removed", "Priority support was canceled", "The invoice was paid early"],
          answer: 0,
          explanation: "停機 2 小時 18 分，超過政策門檻；340 美元的 10% 正好是 34 美元。",
          translation: "為什麼帳單套用了 34 美元折抵？",
          evidence: "The monitoring report confirms that your workspace was unavailable for two hours and eighteen minutes on May 6.",
          evidenceLocation: "文件 2 與文件 3",
          answerAudit: "A verified outage lasted more than two hours",
          choiceNotes: ["正確，時間與折抵比例都吻合。", "帳單是增加四席。", "priority support 仍收 40 美元。", "政策與提早付款無關。"]
        },
        {
          id: "P7-R99-Q2",
          prompt: "How much did the four additional seats cost per seat?",
          choices: ["$15", "$10", "$34", "$60"],
          answer: 0,
          explanation: "四個席位共 60 美元，60 ÷ 4 = 15。",
          translation: "四個額外使用席位每席多少錢？",
          evidence: "Four additional user seats: $60",
          evidenceLocation: "文件 1 第二列",
          answerAudit: "$15",
          choiceNotes: ["正確，60 除以 4。", "不是帳單列出的單價。", "34 是服務折抵。", "60 是四席總價。"]
        },
        {
          id: "P7-R99-Q3",
          prompt: "What should Mr. Lee do to receive the credit?",
          choices: ["Nothing", "Submit an outage report", "Cancel priority support", "Pay a separate processing fee"],
          answer: 0,
          explanation: "信中明說 No action is required，折抵會自動出現在帳單。",
          translation: "Lee 先生要如何取得折抵？",
          evidence: "No action is required to receive the applicable credit.",
          evidenceLocation: "文件 3 第二句",
          answerAudit: "Nothing",
          choiceNotes: ["正確，系統自動套用。", "監控報告已確認事故。", "與支援方案無關。", "沒有處理費。"]
        },
        {
          id: "P7-R99-Q4",
          prompt: "What was the amount due before the reliability credit?",
          choices: ["$340", "$306", "$300", "$374"],
          answer: 0,
          explanation: "折抵前金額就是 service subtotal 340 美元。",
          translation: "可靠度折抵前的應付金額是多少？",
          evidence: "Service subtotal: $340",
          evidenceLocation: "文件 1 費用摘要",
          answerAudit: "$340",
          choiceNotes: ["正確，是折抵前小計。", "306 是折抵後應付額。", "只含平台與席位。", "是把折抵誤加回兩次的陷阱。"]
        }
      ]
    },
    {
      groupId: "P7-R100",
      category: "雙篇閱讀・服務圖表",
      literacySkill: "趨勢與異常",
      tags: ["double-passage", "chart", "trend", "data-literacy"],
      passage: `DOCUMENT 1 - 2026 CUSTOMER SUPPORT REPORT

Quarter | Requests | Self-service resolution | Average first response
Q1 | 1,200 | 82% | 5.8 hours
Q2 | 1,400 | 85% | 5.1 hours
Q3 | 1,650 | 88% | 4.6 hours
Q4 | 1,800 | 90% | 4.9 hours

DOCUMENT 2 - MANAGER'S NOTE

The holiday product launch caused the expected rise in fourth-quarter requests. Although the knowledge center handled a record share of cases, first-response time increased slightly for requests that still reached an agent. Next quarter, we will revise the launch guides and schedule two additional agents during release weeks.`,
      questions: [
        {
          id: "P7-R100-Q1",
          prompt: "What trend continued throughout all four quarters?",
          choices: ["The self-service resolution rate increased", "The number of requests decreased", "First-response time fell every quarter", "The support team added two agents each quarter"],
          answer: 0,
          explanation: "自助解決率由 82%、85%、88% 到 90%，每季持續上升。",
          translation: "哪一項趨勢貫穿四個季度？",
          evidence: `Q1 | 1,200 | 82% | 5.8 hours
Q2 | 1,400 | 85% | 5.1 hours
Q3 | 1,650 | 88% | 4.6 hours
Q4 | 1,800 | 90% | 4.9 hours`,
          evidenceLocation: "文件 1 自助解決率欄",
          answerAudit: "The self-service resolution rate increased",
          choiceNotes: ["正確，每季上升。", "requests 每季增加。", "Q4 回應時間由 4.6 升到 4.9。", "增派兩人是下一季計畫。"]
        },
        {
          id: "P7-R100-Q2",
          prompt: "What was unusual about Q4 compared with Q3?",
          choices: ["Average first response became slower", "Fewer requests were received", "Self-service resolution declined", "The product launch was canceled"],
          answer: 0,
          explanation: "Q4 首次回應時間 4.9 小時，高於 Q3 的 4.6 小時，表示稍微變慢。",
          translation: "與 Q3 相比，Q4 有什麼異常？",
          evidence: "Q4 | 1,800 | 90% | 4.9 hours",
          evidenceLocation: "文件 1 最後兩列",
          answerAudit: "Average first response became slower",
          choiceNotes: ["正確，數值增加代表等待更久。", "requests 從 1,650 增至 1,800。", "自助率從 88% 升至 90%。", "備註說產品已推出。"]
        },
        {
          id: "P7-R100-Q3",
          prompt: "What most likely contributed to the Q4 response-time change?",
          choices: ["More launch-related requests reached agents", "The knowledge center was unavailable", "Two agents left during Q3", "Customers stopped using self-service tools"],
          answer: 0,
          explanation: "節慶產品上市提高請求量，即使自助率最高，進入人工的案件仍造成回應稍慢。",
          translation: "什麼最可能造成 Q4 回應時間的變化？",
          evidence: "The holiday product launch caused the expected rise in fourth-quarter requests.",
          evidenceLocation: "文件 2 第一、二句",
          answerAudit: "More launch-related requests reached agents",
          choiceNotes: ["正確，結合請求量與管理者說明。", "知識中心處理比例創新高。", "未提離職。", "自助使用率上升。"]
        },
        {
          id: "P7-R100-Q4",
          prompt: "What will the support team do during future release weeks?",
          choices: ["Assign two more agents", "Close the knowledge center", "Limit customer requests", "Stop publishing launch guides"],
          answer: 0,
          explanation: "管理者計畫在 release weeks 安排兩名額外客服人員。",
          translation: "支援團隊未來在產品發布週會做什麼？",
          evidence: "schedule two additional agents during release weeks",
          evidenceLocation: "文件 2 最後一句",
          answerAudit: "Assign two more agents",
          choiceNotes: ["正確，直接同義改寫。", "反而要改善知識內容。", "沒有要限制請求。", "將修訂而非停止指南。"]
        }
      ]
    },
    {
      groupId: "P7-R101",
      category: "三篇閱讀・庫存訂單",
      literacySkill: "跨文件核對",
      tags: ["triple-passage", "inventory", "order", "data-literacy"],
      passage: `DOCUMENT 1 - PRODUCT AVAILABILITY

Display Stand E: 12 in stock
Display Stand S: 5 in stock
Display Stand P: Out of stock; restock expected Friday

Substitutions require customer approval before shipment.

DOCUMENT 2 - PACKING SLIP #8842

Requested: 6 Display Stand S
Packed: 5 Display Stand S, 1 Display Stand E
Ship date: Thursday

DOCUMENT 3 - CUSTOMER E-MAIL

The shipment notice lists one Stand E, but I approved six Stand S units for the new branch. All six displays must match before installation on Monday. Please replace the substituted item and confirm whether the correct stand can arrive in time.`,
      questions: [
        {
          id: "P7-R101-Q1",
          prompt: "What problem does the customer mention?",
          choices: ["An unapproved substitute was packed", "The order contains only five items", "Installation was moved to Thursday", "All Stand S units are out of stock"],
          answer: 0,
          explanation: "裝箱單把一個 S 型號換成 E，但政策要求出貨前取得顧客同意。",
          translation: "顧客提到什麼問題？",
          evidence: "The shipment notice lists one Stand E, but I approved six Stand S units for the new branch.",
          evidenceLocation: "文件 1 規則與文件 2",
          answerAudit: "An unapproved substitute was packed",
          choiceNotes: ["正確，跨文件可確認未經核准替換。", "總數仍是六件。", "星期一才安裝。", "S 有五件庫存。"]
        },
        {
          id: "P7-R101-Q2",
          prompt: "Why does the customer need six units of the same model?",
          choices: ["The displays must match", "Stand E cannot be assembled", "The branch opens on Thursday", "The order qualifies for a discount"],
          answer: 0,
          explanation: "顧客明說六個展示架在星期一安裝前必須一致。",
          translation: "顧客為什麼需要六個相同型號？",
          evidence: "All six displays must match before installation on Monday.",
          evidenceLocation: "文件 3 第二句",
          answerAudit: "The displays must match",
          choiceNotes: ["正確，直接明示。", "沒有組裝問題。", "星期四是出貨日。", "未提折扣。"]
        },
        {
          id: "P7-R101-Q3",
          prompt: "Which company rule was not followed?",
          choices: ["Obtaining approval for a substitution", "Shipping only on Fridays", "Keeping twelve Stand E units", "Installing products before delivery"],
          answer: 0,
          explanation: "替代品須在出貨前取得顧客同意，但信中顯示顧客只核准六個 S。",
          translation: "公司沒有遵守哪一項規則？",
          evidence: "Substitutions require customer approval before shipment.",
          evidenceLocation: "文件 1 最後一行",
          answerAudit: "Obtaining approval for a substitution",
          choiceNotes: ["正確，E 型替代未獲准。", "沒有只能週五出貨的規則。", "這是庫存數量不是規則。", "安裝由顧客於週一進行。"]
        },
        {
          id: "P7-R101-Q4",
          prompt: "What will the supplier most likely need to confirm?",
          choices: ["Whether another Stand S can arrive by Monday", "Whether Stand P can be delivered Thursday", "Whether the customer wants fewer displays", "Whether installation can begin without any stands"],
          answer: 0,
          explanation: "顧客要求更換錯誤型號，並確認正確的 S 是否能在週一前到達。",
          translation: "供應商最可能需要確認什麼？",
          evidence: "confirm whether the correct stand can arrive in time",
          evidenceLocation: "文件 3 最後一句",
          answerAudit: "Whether another Stand S can arrive by Monday",
          choiceNotes: ["正確，correct stand 指 S，期限來自 Monday installation。", "P 型與訂單無關。", "顧客需要完整六個。", "顧客明確需要展示架。"]
        }
      ]
    },
    {
      groupId: "P7-R102",
      category: "雙篇閱讀・會議議程",
      literacySkill: "名額與時間",
      tags: ["double-passage", "schedule", "registration", "data-literacy"],
      passage: `DOCUMENT 1 - INNOVATION FORUM

9:00 | Opening remarks | Hall A | No registration
10:00 | Responsible Data Use | Room B | Capacity 80
10:00 | Customer Journey Lab | Room C | Capacity 45
11:30 | Automation Demonstration | Hall A | Advance registration required

Registration for individual sessions closes at 5:00 P.M. the previous day.

DOCUMENT 2 - MESSAGE

8:30 A.M. - Leo: My confirmation lists the Customer Journey Lab, but I also joined the waiting list for the automation demonstration.
8:32 A.M. - Mina: A place just opened in the demonstration. I transferred your registration and sent a new confirmation. Please arrive at Hall A ten minutes early because unclaimed seats will be released.`,
      questions: [
        {
          id: "P7-R102-Q1",
          prompt: "Which session was on Leo's original confirmation?",
          choices: ["Customer Journey Lab", "Responsible Data Use", "Automation Demonstration", "Opening remarks"],
          answer: 0,
          explanation: "Leo 的訊息直接說原確認信列的是 Customer Journey Lab。",
          translation: "Leo 原本的確認信列出哪一場活動？",
          evidence: "My confirmation lists the Customer Journey Lab",
          evidenceLocation: "文件 2 Leo 的訊息",
          answerAudit: "Customer Journey Lab",
          choiceNotes: ["正確，訊息明示。", "同時段但不同教室。", "這是候補後轉入的場次。", "開幕不需報名。"]
        },
        {
          id: "P7-R102-Q2",
          prompt: "What did Mina do for Leo?",
          choices: ["Moved him into the demonstration", "Registered him for two 10:00 sessions", "Changed the opening location", "Extended the registration deadline"],
          answer: 0,
          explanation: "有空位後，Mina 把 Leo 的報名轉到 automation demonstration。",
          translation: "Mina 為 Leo 做了什麼？",
          evidence: "I transferred your registration and sent a new confirmation.",
          evidenceLocation: "文件 2 Mina 的訊息",
          answerAudit: "Moved him into the demonstration",
          choiceNotes: ["正確，transferred registration 的同義改寫。", "她是轉移而非保留兩場。", "地點未變。", "截止時間未更改。"]
        },
        {
          id: "P7-R102-Q3",
          prompt: "At what time should Leo arrive at Hall A for the demonstration?",
          choices: ["11:20 A.M.", "11:30 A.M.", "10:50 A.M.", "8:20 A.M."],
          answer: 0,
          explanation: "示範 11:30 開始，要求提早十分鐘，因此應於 11:20 抵達。",
          translation: "Leo 應於何時抵達 Hall A 參加示範？",
          evidence: "Please arrive at Hall A ten minutes early because unclaimed seats will be released.",
          evidenceLocation: "文件 1 議程與文件 2 最後一句",
          answerAudit: "11:20 A.M.",
          choiceNotes: ["正確，11:30 減 10 分鐘。", "這是開始時間。", "與示範時間不符。", "是訊息時間減十分鐘的陷阱。"]
        },
        {
          id: "P7-R102-Q4",
          prompt: "Why should Leo arrive early?",
          choices: ["His seat could be given to someone else", "Hall A closes at 11:20", "He must pay at the entrance", "The demonstration begins before 11:30"],
          answer: 0,
          explanation: "未報到的座位會被釋出，因此 Leo 應提早抵達。",
          translation: "Leo 為什麼要提早抵達？",
          evidence: "unclaimed seats will be released",
          evidenceLocation: "文件 2 最後一句",
          answerAudit: "His seat could be given to someone else",
          choiceNotes: ["正確，released 表示會讓給其他人。", "未提場地關閉。", "未提費用。", "議程仍是 11:30 開始。"]
        }
      ]
    },
    {
      groupId: "P7-R103",
      category: "三篇閱讀・差旅報支",
      literacySkill: "政策與金額",
      tags: ["triple-passage", "expense", "policy", "calculation", "data-literacy"],
      passage: `DOCUMENT 1 - TRAVEL EXPENSE POLICY

Meals are reimbursed up to $45 per traveler per day. Airport-to-hotel taxi fares are eligible when accompanied by a receipt. Software subscriptions must be charged to the employee's project budget rather than the travel account.

DOCUMENT 2 - CLAIM #T-206

Dinner: $52
Airport-to-hotel taxi: $38 | Receipt attached
One-month transcription subscription: $29
Claim total: $119

DOCUMENT 3 - MANAGER'S NOTE

Please reduce the dinner request to the daily limit and move the transcription charge to project A17. The taxi documentation is complete, so that item can remain on the travel claim.`,
      questions: [
        {
          id: "P7-R103-Q1",
          prompt: "How much of the dinner expense can be reimbursed?",
          choices: ["$45", "$52", "$38", "$7"],
          answer: 0,
          explanation: "餐費雖為 52 美元，但每日上限是 45 美元。",
          translation: "晚餐費可報支多少？",
          evidence: "Meals are reimbursed up to $45 per traveler per day.",
          evidenceLocation: "文件 1 第一條",
          answerAudit: "$45",
          choiceNotes: ["正確，受每日上限限制。", "52 是實際支出。", "38 是計程車費。", "7 是超額部分。"]
        },
        {
          id: "P7-R103-Q2",
          prompt: "Which item can remain on the travel claim without adjustment?",
          choices: ["The taxi fare", "The dinner expense", "The transcription subscription", "All three items"],
          answer: 0,
          explanation: "計程車有收據且符合機場到旅館用途，管理者也確認資料完整。",
          translation: "哪一項可不調整而保留在差旅報支中？",
          evidence: "The taxi documentation is complete, so that item can remain",
          evidenceLocation: "文件 3 第二句",
          answerAudit: "The taxi fare",
          choiceNotes: ["正確，符合政策且文件齊全。", "晚餐須降至 45。", "訂閱須移到專案預算。", "兩項需調整。"]
        },
        {
          id: "P7-R103-Q3",
          prompt: "Where should the transcription subscription be charged?",
          choices: ["Project A17", "The travel account", "The taxi provider", "The meal allowance"],
          answer: 0,
          explanation: "政策要求軟體訂閱走專案預算，管理者指定移到 A17。",
          translation: "轉錄軟體訂閱應計入哪裡？",
          evidence: "move the transcription charge to project A17",
          evidenceLocation: "文件 3 第一、二句",
          answerAudit: "Project A17",
          choiceNotes: ["正確，管理者明確指定。", "政策排除 travel account。", "與計程車供應商無關。", "不是餐費。"]
        },
        {
          id: "P7-R103-Q4",
          prompt: "What will be the revised travel-claim total?",
          choices: ["$83", "$90", "$112", "$74"],
          answer: 0,
          explanation: "保留餐費 45 與計程車 38，移除訂閱 29，因此新總額為 83。",
          translation: "調整後的差旅報支總額是多少？",
          evidence: "Please reduce the dinner request to the daily limit and move the transcription charge to project A17.",
          evidenceLocation: "文件 1 至文件 3 綜合計算",
          answerAudit: "$83",
          choiceNotes: ["正確，45 + 38。", "52 + 38，未套餐費上限。", "119 - 7，只調整餐費卻未移除訂閱。", "45 + 29，錯誤保留訂閱而移除計程車。"]
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
