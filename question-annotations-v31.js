(() => {
  const records = [
    [
      "P7-R60-Q1",
      "Northgate Medical Supply seeks a Customer Training Specialist to teach clinic staff how to use our inventory software.",
      "Job Posting｜第 1 句",
      "目的意圖",
      [
        "正解：職務核心是教診所人員操作庫存軟體。",
        "每月兩次是出差頻率，不是配送醫療用品。",
        "pharmacy assistants 出現在 Amira 的舊工作坊經驗中，不是此職務要聘用的人。",
        "職缺沒有提到設計認證考試。"
      ]
    ],
    [
      "P7-R60-Q2",
      "Applicants should submit a resume and a sample training outline by September 8.",
      "Job Posting｜最後一句",
      "條件例外",
      [
        "正解：履歷與訓練大綱範例都是明列的申請文件。",
        "職缺沒有要求只有兩位診所推薦人。",
        "Amira 的認證課程是個人行程，不是申請附件。",
        "醫療用品型錄不是職缺要求的資料。"
      ]
    ],
    [
      "P7-R60-Q3",
      "I can travel regularly, but I would prefer to avoid overnight trips until November because I am completing a local certification program.",
      "E-mail｜最後一句",
      "條件例外",
      [
        "正解：完成本地認證課程使她在 11 月前想避免過夜出差。",
        "她目前就在向診所接待員說明訂購流程，並非不會解釋。",
        "她附上去年設計的工作坊大綱，並非沒有設計經驗。",
        "她表示可以固定出差，只對過夜出差有暫時限制。"
      ]
    ],
    [
      "P7-R60-Q4",
      "In my current role, I create short videos that explain ordering procedures to clinic receptionists.",
      "E-mail｜第 2 句",
      "跨文件推論",
      [
        "正解：向診所接待員解釋訂購流程，直接符合向非技術對象說明流程的要求。",
        "她明確想在 11 月前避免過夜出差，因此沒有證明立即完全符合。",
        "文件沒有任何醫療設備維修經驗。",
        "職缺與信件都沒有要求她聘任委員會。"
      ]
    ],
    [
      "P7-R61-Q1",
      "My AeroBrew stopped pumping water after eight months.",
      "Online Chat｜Customer 第 1 句",
      "目的意圖",
      [
        "正解：顧客直接回報咖啡機停止抽水。",
        "顧客仍保有收據，並沒有遺失。",
        "顧客說只在家中使用，並非商業用途。",
        "她提到依手冊清潔，沒有說手冊遺失。"
      ]
    ],
    [
      "P7-R61-Q2",
      "Damage caused by improper cleaning, commercial use, or unauthorized repairs is not covered.",
      "Warranty Card｜第 2 句",
      "條件例外",
      [
        "正解：未授權維修造成的損壞被明確列為不保固。",
        "正常家用下的 pump failure 是保固涵蓋項目。",
        "electrical defects 明列為保固項目。",
        "購買證明是申請服務所需資料，不是排除保固的原因。"
      ]
    ],
    [
      "P7-R61-Q3",
      "Vinegar cleaning is allowed if the instructions in the manual were followed.",
      "Online Chat｜Agent 第 1 句",
      "條件例外",
      [
        "正解：依手冊操作的醋液清潔被允許，因此可繼續申請。",
        "保固是一年，不是八個月。",
        "商業用途造成的損壞反而不保固。",
        "客服下一句要求序號照片，序號並非可選。"
      ]
    ],
    [
      "P7-R61-Q4",
      "Please send a photo of the serial number, and we can begin the service request.",
      "Online Chat｜Agent 最後一句",
      "流程順序",
      [
        "正解：下一步是傳送產品序號照片。",
        "顧客已說是家用，不需要商業使用者名單。",
        "未授權維修可能影響保固，客服沒有要求外部維修發票。",
        "清潔液收據不在申請資料要求中。"
      ]
    ],
    [
      "P7-R62-Q1",
      "9:30-10:15 Keynote: Designing Services for Older Customers",
      "Conference Agenda｜9:30 場次",
      "數據判讀",
      [
        "正解：議程明列主題為為年長顧客設計服務。",
        "訓練員工給清楚指示是 Breakout B。",
        "衡量顧客信任是 11:30 的 panel discussion。",
        "無障礙支付工具是 Breakout A。"
      ]
    ],
    [
      "P7-R62-Q2",
      "Owen: Breakout B seems more useful. It focuses on staff communication, and the keynote should cover the broader design issues anyway.",
      "Text Message｜Owen 回覆",
      "跨文件推論",
      [
        "正解：Breakout B 的員工溝通重點正好對應 Rina 的問題。",
        "Breakout sessions 在 10:30，並不是 registration 前唯一場次。",
        "無障礙支付軟體是 Breakout A，而且銀行已經具備。",
        "Breakout B 沒有取代 keynote；Owen 反而說 keynote 會處理更廣的設計議題。"
      ]
    ],
    [
      "P7-R62-Q3",
      "Our bank already has accessible payment software, but our branch staff still struggle to explain digital services clearly.",
      "Text Message｜Rina 第 2 句",
      "條件例外",
      [
        "正解：銀行已具備無障礙支付軟體，因此較不需要 Accessible Payment Tools。",
        "員工說明數位服務仍有困難，所以這項訓練正有需要。",
        "keynote 會談較廣泛的設計問題，沒有證據顯示不需要。",
        "文件沒有說她不需要 panel discussion。"
      ]
    ],
    [
      "P7-R62-Q4",
      "11:30-12:15 Panel Discussion: Measuring Customer Trust",
      "Conference Agenda｜最後一列",
      "數據判讀",
      [
        "正解：Panel Discussion 在 11:30 開始。",
        "9:00 是報到與咖啡時間。",
        "10:15 是 keynote 結束時間。",
        "10:30 是兩個 breakout sessions 的開始時間。"
      ]
    ],
    [
      "P7-R63-Q1",
      "The subscription begins on July 1 and includes unlimited online training but does not include on-site workshops.",
      "Invoice Note｜第 2 句",
      "條件例外",
      [
        "正解：訂閱明確包含不限次數的線上訓練。",
        "同一句明確排除到場工作坊。",
        "文件沒有硬體更換服務。",
        "文件沒有三個月免費顧問服務。"
      ]
    ],
    [
      "P7-R63-Q2",
      "Please replace cost center 41-A with 47-C before we process payment.",
      "E-mail｜第 2 句",
      "流程順序",
      [
        "正解：Keiko 要求把 cost center 從 41-A 改為 47-C。",
        "訂閱開始日仍為 7 月 1 日。",
        "三個使用部門沒有要求變更。",
        "付款期限仍為三十天。"
      ]
    ],
    [
      "P7-R63-Q3",
      "Also, our Customer Support team would like to schedule online training during the second week of July.",
      "E-mail｜第 3 句",
      "數據判讀",
      [
        "正解：Customer Support 希望在 7 月第二週安排訓練。",
        "訂閱 7 月 1 日才開始，文件沒有說要在此之前。",
        "三十天是付款期限，不是訓練日期。",
        "文件沒有提供訂閱結束日期。"
      ]
    ],
    [
      "P7-R63-Q4",
      "Please replace cost center 41-A with 47-C before we process payment.",
      "E-mail｜第 2 句的 before 條件",
      "跨文件推論",
      [
        "正解：要先更正 cost center 才處理付款，表示付款尚未完成。",
        "信中只詢問線上訓練是否需預約，沒有因無法訓練而拒付。",
        "before we process payment 排除已付款後才更正。",
        "Invoice Note 明確說不含到場工作坊，沒有額外工作坊費。"
      ]
    ],
    [
      "P7-R64-Q1",
      "The city of Brookmere has started a pilot program that allows residents to report damaged sidewalks through a mobile app.",
      "Article｜第 1 句",
      "目的意圖",
      [
        "正解：App 讓居民回報損壞的人行道。",
        "這是市府道路回報，不是公寓維修排程。",
        "文章沒有工程費付款功能。",
        "試辦計畫由市府啟動，不是讓居民投票。"
      ]
    ],
    [
      "P7-R64-Q2",
      "City engineers review submissions every morning and assign repair crews based on safety risk rather than the order in which reports are received.",
      "Article｜第 3 句",
      "條件例外",
      [
        "正解：維修隊依安全風險分派。",
        "原文明確說不是依回報順序。",
        "公寓大小不是分派標準。",
        "居民會員資格沒有出現在文件中。"
      ]
    ],
    [
      "P7-R64-Q3",
      "I understand emergencies come first, but the app should explain why some reviewed reports do not yet have repair dates.",
      "Resident Comment｜最後一句",
      "語氣立場",
      [
        "正解：居民希望 App 解釋為何已審查案件仍沒有維修日期。",
        "他沒有反對照片要求。",
        "他沒有質疑 location marker 的準確度。",
        "他接受緊急案件優先，重點不是批評緊急反應速度。"
      ]
    ],
    [
      "P7-R64-Q4",
      "By Tuesday afternoon, the report was marked as reviewed, but the repair date was listed as \"pending.\"",
      "Resident Comment｜第 2 句",
      "跨文件推論",
      [
        "正解：案件已審查，但日期仍是 pending，表示尚未排定。",
        "App 接受並審查了回報，沒有證據顯示缺照片。",
        "日期 pending 不能推論它是最高風險案件。",
        "居民在 Monday evening 提交，Tuesday afternoon 是狀態更新時間。"
      ]
    ],
    [
      "P7-R65-Q1",
      "All employees who handle customer records must complete the refresher this week.",
      "Memo｜第 1 句",
      "條件例外",
      [
        "正解：處理顧客紀錄的員工必須完成複訓。",
        "協調員負責名單，但參訓對象不限協調員。",
        "一月完成同課程者反而不必重上。",
        "Room 204 只是其中一個場次地點。"
      ]
    ],
    [
      "P7-R65-Q2",
      "Online attendance is available only for employees working remotely on the day of the session.",
      "Memo｜第 2 句",
      "條件例外",
      [
        "正解：當天遠端工作的員工才可線上參加。",
        "個人偏好 Tuesday morning 不符合 only 的限制。",
        "Room 118 是實體場次，並非線上資格。",
        "是否錯過一月稽核不是線上參加條件。"
      ]
    ],
    [
      "P7-R65-Q3",
      "Coordinators should send attendance lists by Friday afternoon.",
      "Memo｜第 3 句",
      "流程順序",
      [
        "正解：星期五下午前要送出出席名單。",
        "顧客紀錄不應作為這項作業的附件。",
        "文件沒有要求房間預約表。",
        "文件沒有要求線上會議密碼。"
      ]
    ],
    [
      "P7-R65-Q4",
      "Employees who completed the same refresher during the January audit do not need to attend again, but their names should still be included on the list with the note \"completed in January.\"",
      "Memo｜最後一句",
      "條件例外",
      [
        "正解：仍要列名，並註記 completed in January。",
        "他們不需要再參加，因此不必改成線上。",
        "原文要求保留名單紀錄，不是刪除。",
        "原文沒有指定他們參加 Wednesday 場次。"
      ]
    ],
    [
      "P7-R66-Q1",
      "The Harbor Museum will begin timed-entry reservations for weekend visitors on June 1.",
      "Notice｜第 1 句",
      "數據判讀",
      [
        "正解：6 月 1 日開始週末訪客的分時預約。",
        "校車時間由教育辦公室審查，但不是所有學校的新制度。",
        "非會員沒有免費入場資訊。",
        "新制度針對週末，不是只限平日。"
      ]
    ],
    [
      "P7-R66-Q2",
      "Please explain that groups of fifteen or more should use the group request form instead.",
      "E-mail｜第 2 句",
      "條件例外",
      [
        "正解：十五人以上學校團體要改用 group request form。",
        "此團體流程取代一般 timed-entry 訂票，不是以非會員身分預約。",
        "教育辦公室會指定抵達時間，並非中午後任意入場。",
        "文件是在回答週六團體，沒有禁止週六參觀。"
      ]
    ],
    [
      "P7-R66-Q3",
      "The education office will assign arrival times after reviewing bus schedules.",
      "E-mail｜最後一句",
      "流程順序",
      [
        "正解：教育辦公室審查校車時程後分配抵達時間。",
        "老師提交需求，但不自行分配時間。",
        "會員辦公室只與一般會員提早訂票有關。",
        "週末散客不負責學校團體安排。"
      ]
    ],
    [
      "P7-R66-Q4",
      "Requests should include the school name, grade level, number of students, number of adults, and whether the group plans to attend a workshop.",
      "Form Instructions｜第 2 句",
      "條件例外",
      [
        "正解：是否參加 workshop 是表單明列欄位。",
        "不需要列出所有博物館會員姓名。",
        "抵達時間由教育辦公室之後分配，不是申請者先填精確時段。",
        "表單要求學生與成人人數，不是非會員清單。"
      ]
    ],
    [
      "P7-R67-Q1",
      "The NomaDesk Flex Chair includes adjustable armrests, a breathable back panel, and a five-year frame warranty.",
      "Product Page｜第 1 句",
      "目的意圖",
      [
        "正解：adjustable armrests 是產品頁明列功能。",
        "保固是五年 frame warranty，不是十年布料保固。",
        "產品頁沒有充電埠。",
        "組裝不需工具，且沒有要求專業安裝。"
      ]
    ],
    [
      "P7-R67-Q2",
      "However, our office ordered twelve chairs in gray, and two arrived in blue.",
      "Customer Review｜第 2 句",
      "跨文件推論",
      [
        "正解：兩張椅子送成藍色，與訂購的灰色不符。",
        "顧客說組裝容易，且產品頁說不需工具。",
        "十二張達十張門檻，符合免運。",
        "五年 frame warranty 沒有過期資訊。"
      ]
    ],
    [
      "P7-R67-Q3",
      "Customers should provide the order number and a photograph of the item received.",
      "Return Policy｜第 2 句",
      "條件例外",
      [
        "正解：顏色錯誤回報需要訂單號碼與收到商品的照片。",
        "維修發票與保固卡不是顏色錯誤所需資料。",
        "政策沒有要求司機姓名。",
        "辦公室員工清單與退換貨無關。"
      ]
    ],
    [
      "P7-R67-Q4",
      "Replacement items are shipped without additional delivery charges once the error is confirmed.",
      "Return Policy｜最後一句",
      "條件例外",
      [
        "正解：錯誤確認後，替換品不收額外運費。",
        "十二張訂單原本也達到免運門檻，不會因此加收替換運費。",
        "組裝時間與替換運費無關。",
        "不需要再買十張椅子。"
      ]
    ],
    [
      "P7-R68-Q1",
      "The test is intended to reduce lines during the busiest lunch period.",
      "Internal Post｜最後一句",
      "目的意圖",
      [
        "正解：預訂系統試辦目的是縮短午餐尖峰排隊。",
        "調查只有 18% 認為菜色是主要問題，不是先擴充菜色。",
        "取餐時段仍為 noon 到 1 P.M.，不是關閉餐廳。",
        "系統透過公司 App 使用，不是取代 App。"
      ]
    ],
    [
      "P7-R68-Q2",
      "Employees may order meals through the company app before 10 A.M. and pick them up between noon and 1 P.M.",
      "Internal Post｜第 2 句",
      "流程順序",
      [
        "正解：員工必須在上午 10 點前預訂。",
        "中午到 1 點是取餐時間，不是下單時間。",
        "8 月 16 日是試辦結束日，不是預訂時間。",
        "預訂並不限星期一。"
      ]
    ],
    [
      "P7-R68-Q3",
      "Please encourage your teams to use the pre-order feature, especially on Tuesdays and Thursdays.",
      "Manager Message｜第 1 句",
      "數據判讀",
      [
        "正解：主管特別要求星期二、四提高參與。",
        "文件沒有特別要求星期一、五。",
        "公司餐廳試辦是工作日情境，沒有週末重點。",
        "8 月 16 日後是否續辦要看試辦參與，並非每天都已確定。"
      ]
    ],
    [
      "P7-R68-Q4",
      "Employees who forget to pre-order may still buy lunch in person, but regular lines may remain long.",
      "Manager Message｜最後一句",
      "條件例外",
      [
        "正解：忘記預訂仍可現場購買。",
        "文件沒有禁止進入餐廳。",
        "不需要等到 8 月 16 日。",
        "是否收到問卷不是現場購買條件。"
      ]
    ],
    [
      "P7-R69-Q1",
      "Lumen Transit will add real-time crowding information to its train app next month.",
      "Press Release｜第 1 句",
      "目的意圖",
      [
        "正解：新功能是即時車廂擁擠資訊。",
        "文件沒有行動票券退款功能。",
        "FAQ 明確說不辨識乘客姓名。",
        "Jordan 提到輪椅空間，但不是維修預約。"
      ]
    ],
    [
      "P7-R69-Q2",
      "No. The system estimates crowding levels and does not collect names, ticket numbers, or phone locations.",
      "FAQ｜回答",
      "條件例外",
      [
        "正解：FAQ 強調系統不辨識個別乘客，也不收集個人識別資料。",
        "原文明確說不收集 phone locations。",
        "ticket numbers 也不會被收集或顯示。",
        "功能供乘客使用，沒有只限輪椅使用者。"
      ]
    ],
    [
      "P7-R69-Q3",
      "I use a wheelchair and usually board the first car because it has a wider space near the door. Will the new crowding feature show information for each car separately, or only for the whole train?",
      "Customer E-mail｜第 1–2 句",
      "跨文件推論",
      [
        "正解：Jordan 需要選擇有較寬輪椅空間且不擁擠的車廂。",
        "他沒有要維修 weight sensor。",
        "他沒有遺失票號；FAQ 只是說系統不收集票號。",
        "寄件對象是 Lumen Transit Support，Jordan 是顧客。"
      ]
    ],
    [
      "P7-R69-Q4",
      "No. The system estimates crowding levels and does not collect names, ticket numbers, or phone locations.",
      "FAQ｜回答中的資料排除項目",
      "條件例外",
      [
        "正解：乘客手機位置明確不會被收集。",
        "Press Release 明確說使用 weight sensors。",
        "Press Release 明確說使用 recent boarding data。",
        "車廂擁擠程度是系統要產生的估計結果，不是被排除的資訊。"
      ]
    ],
    [
      "P7-R70-Q1",
      "Volunteers will remove litter from sidewalks, plant flowers near storefronts, and report damaged street signs.",
      "Newsletter｜第 2 句",
      "目的意圖",
      [
        "正解：回報損壞路牌是活動工作之一。",
        "活動與圖書館電腦維修無關。",
        "書店只是參與企業，沒有送書到學校。",
        "文件說種花與撿垃圾，沒有粉刷全部店面。"
      ]
    ],
    [
      "P7-R70-Q2",
      "Tools and gloves will be provided, but volunteers should bring refillable water bottles.",
      "Volunteer Sign-up Note｜第 1 句",
      "條件例外",
      [
        "正解：志工要自行帶可重複裝水的水瓶。",
        "工具和手套由主辦單位提供。",
        "志工只需回報損壞路牌，不需自帶維修工具。",
        "網站名單由主辦單位刊登，不是志工攜帶的物品。"
      ]
    ],
    [
      "P7-R70-Q3",
      "The planting team will leave first because flowers must be placed before temperatures rise.\n\nE-mail\n\nTo: District Office\nFrom: May Chen, Owner of Chen Books\n\nI have two employees available for the clean-up event, and I can join after opening the store at 9 A.M.",
      "Sign-up Note 最後一句＋E-mail 第 1 句",
      "跨文件推論",
      [
        "正解：種植隊先出發，而 May 要開店後、9 點才加入，因此可能錯過。",
        "文件沒有說花會晚送。",
        "圖書館後方 8:30 開始報到，沒有中午開館資訊。",
        "活動邀請志工種花，沒有只限 district staff。"
      ]
    ],
    [
      "P7-R70-Q4",
      "We would still like Chen Books to be included on the website if our three volunteers are accepted.",
      "E-mail｜最後一句",
      "目的意圖",
      [
        "正解：May 希望 Chen Books 能列在商業區網站。",
        "她沒有要求把報到地點移到書店。",
        "她詢問是否仍可撿垃圾或回報路牌，不是要員工修完所有路牌。",
        "她沒有要求活動延到中午。"
      ]
    ]
  ];

  const bankById = new Map(window.BUILTIN_BANK.map((question) => [question.id, question]));
  let applied = 0;
  records.forEach(([id, evidence, evidenceLocation, literacySkill, choiceNotes]) => {
    const question = bankById.get(id);
    if (!question) return;
    question.evidence = evidence;
    question.evidenceLocation = evidenceLocation;
    question.literacySkill = literacySkill;
    question.choiceNotes = choiceNotes;
    question.tags = [...new Set([...(question.tags || []), "literacy-core", "human-reviewed", "v3.1-annotated"])];
    question.annotationNote = "Human-reviewed against the exact existing passage for v3.1.0.";
    applied += 1;
  });

  window.TOEIC_V31_ANNOTATION_COUNT = applied;
})();
