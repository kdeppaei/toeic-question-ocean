(() => {
  const grammarSource = "Original advanced grammar simulation item for v3.0.0.";
  const grammarItems = [
    {
      id: "P5-285",
      category: "省略關係子句",
      prompt: "Employees _____ at remote construction sites must complete the safety module before arrival.",
      choices: ["worked", "working", "work", "to work"],
      answer: 1,
      explanation: "working at remote construction sites 是 who work at remote construction sites 的省略形式。employees 主動在工地工作，因此使用現在分詞 working。",
      translation: "在偏遠工地工作的員工必須在抵達前完成安全課程。",
      tags: ["reduced-clause", "present-participle"]
    },
    {
      id: "P5-286",
      category: "省略關係子句",
      prompt: "The mobile application, _____ in March, now supports biometric sign-in.",
      choices: ["launching", "launched", "launch", "to launch"],
      answer: 1,
      explanation: "launched in March 省略了 which was launched in March。application 是被推出，使用過去分詞 launched。",
      translation: "這款於三月推出的行動應用程式現在支援生物辨識登入。",
      tags: ["reduced-clause", "past-participle", "technology"]
    },
    {
      id: "P5-287",
      category: "省略副詞子句",
      prompt: "Once _____ by the legal department, the agreement will be sent to the client.",
      choices: ["approval", "approving", "approved", "approve"],
      answer: 2,
      explanation: "Once approved 省略了 Once it is approved。agreement 與 approve 是被動關係，因此用過去分詞 approved。",
      translation: "協議一經法務部核准，就會寄給客戶。",
      tags: ["reduced-clause", "past-participle", "passive"]
    },
    {
      id: "P5-288",
      category: "分詞片語",
      prompt: "_____ within walking distance of the convention center, the hotel is popular with exhibitors.",
      choices: ["Locating", "Located", "To locate", "Location"],
      answer: 1,
      explanation: "the hotel is located... 為被動狀態，句首省略主詞與 be 動詞後使用 Located。",
      translation: "這家飯店位於會議中心步行可達之處，因此很受參展商歡迎。",
      tags: ["reduced-clause", "past-participle", "location"]
    },
    {
      id: "P5-289",
      category: "省略關係子句",
      prompt: "Customers _____ to participate in the beta test will receive setup instructions by e-mail.",
      choices: ["invite", "inviting", "invited", "invitation"],
      answer: 2,
      explanation: "invited to participate 省略了 who are invited to participate。customers 是被邀請的對象，因此用過去分詞 invited。",
      translation: "受邀參加測試版試用的顧客將透過電子郵件收到設定說明。",
      tags: ["reduced-clause", "past-participle", "technology"]
    },
    {
      id: "P5-290",
      category: "省略副詞子句",
      prompt: "While _____ the replacement battery, the technician noticed a damaged connector.",
      choices: ["installing", "installed", "installation", "installs"],
      answer: 0,
      explanation: "While installing 省略了 While the technician was installing。technician 主動安裝電池，因此用現在分詞 installing。",
      translation: "技術人員安裝替換電池時，注意到一個受損的接頭。",
      tags: ["reduced-clause", "present-participle"]
    },
    {
      id: "P5-291",
      category: "省略副詞子句",
      prompt: "Unless _____ otherwise in writing, all quotations remain valid for thirty days.",
      choices: ["state", "stating", "stated", "statement"],
      answer: 2,
      explanation: "Unless stated otherwise 省略了 Unless it is stated otherwise，是正式商務文件常見的被動省略句。",
      translation: "除非另有書面說明，所有報價的有效期均為三十天。",
      tags: ["reduced-clause", "past-participle", "formal-register"]
    },
    {
      id: "P5-292",
      category: "省略關係子句",
      prompt: "The files _____ in the encrypted folder can be accessed only by project leaders.",
      choices: ["storing", "stored", "store", "to store"],
      answer: 1,
      explanation: "stored in the encrypted folder 省略了 that are stored...。files 是被儲存，因此使用過去分詞 stored。",
      translation: "儲存在加密資料夾中的檔案只有專案主管可以存取。",
      tags: ["reduced-clause", "past-participle", "security"]
    },
    {
      id: "P5-293",
      category: "省略副詞子句",
      prompt: "When _____ on a tablet, the dashboard automatically rearranges its panels.",
      choices: ["viewing", "viewed", "views", "to view"],
      answer: 1,
      explanation: "When viewed on a tablet 省略了 When it is viewed on a tablet。dashboard 是被觀看，使用過去分詞 viewed。",
      translation: "儀表板在平板上檢視時，會自動重新排列面板。",
      tags: ["reduced-clause", "past-participle", "technology"]
    },
    {
      id: "P5-294",
      category: "假設語氣",
      prompt: "The auditor recommended that each branch _____ its access records every quarter.",
      choices: ["reviews", "reviewed", "review", "reviewing"],
      answer: 2,
      explanation: "recommend that + 主詞 + 原形動詞是要求／建議類假設語氣，因此使用 review，不隨主詞 each branch 加 -s。",
      translation: "稽核員建議每間分公司每季檢查其存取紀錄。",
      tags: ["subjunctive", "mandative-subjunctive"]
    },
    {
      id: "P5-295",
      category: "假設語氣",
      prompt: "It is essential that backup copies _____ in a location separate from the main server.",
      choices: ["are stored", "be stored", "stored", "will store"],
      answer: 1,
      explanation: "It is essential that... 後使用原形假設語氣；copies 與 store 是被動關係，所以用 be stored。",
      translation: "備份副本必須存放在與主伺服器不同的位置。",
      tags: ["subjunctive", "passive", "technology"]
    },
    {
      id: "P5-296",
      category: "假設語氣",
      prompt: "Ms. Ahmed requested that the vendor _____ the delivery schedule before noon.",
      choices: ["revises", "revised", "revise", "will revise"],
      answer: 2,
      explanation: "request that + 主詞 + 原形動詞，表示正式要求，因此使用 revise。",
      translation: "Ahmed 女士要求供應商在中午前修訂交貨時程。",
      tags: ["subjunctive", "mandative-subjunctive"]
    },
    {
      id: "P5-297",
      category: "假設語氣",
      prompt: "It is vital that every access request _____ by two supervisors.",
      choices: ["approves", "be approved", "is approving", "approved"],
      answer: 1,
      explanation: "It is vital that... 後用原形假設語氣；request 是被核准，故為 be approved。",
      translation: "每項存取申請都必須由兩名主管核准。",
      tags: ["subjunctive", "passive", "security"]
    },
    {
      id: "P5-298",
      category: "假設語氣",
      prompt: "The consultant suggested that the launch date _____ until the security review was complete.",
      choices: ["postponed", "be postponed", "is postponed", "postponing"],
      answer: 1,
      explanation: "suggest that... 採原形假設語氣；launch date 與 postpone 是被動關係，因此使用 be postponed。",
      translation: "顧問建議將上線日期延後到安全審查完成後。",
      tags: ["subjunctive", "passive", "security"]
    },
    {
      id: "P5-299",
      category: "假設語氣",
      prompt: "The policy requires that no visitor _____ unattended in the laboratory.",
      choices: ["remains", "remain", "remained", "remaining"],
      answer: 1,
      explanation: "require that + 主詞 + 原形動詞，因此 no visitor 後仍使用 remain。",
      translation: "政策要求任何訪客都不得在實驗室內無人陪同。",
      tags: ["subjunctive", "mandative-subjunctive", "policy"]
    },
    {
      id: "P5-300",
      category: "假設語氣",
      prompt: "If the prototype _____ more reliable, the company would demonstrate it at the trade fair.",
      choices: ["is", "were", "has been", "will be"],
      answer: 1,
      explanation: "主句 would demonstrate 表示與現在情況相反或可能性低的假設；be 動詞正式使用 were。",
      translation: "如果這個原型更可靠，公司就會在商展中展示它。",
      tags: ["subjunctive", "present-unreal"]
    },
    {
      id: "P5-301",
      category: "假設語氣",
      prompt: "The manager asked that the confidential draft _____ after the meeting.",
      choices: ["destroyed", "be destroyed", "is destroyed", "destroys"],
      answer: 1,
      explanation: "ask that... 表正式要求，後接原形假設語氣；draft 是被銷毀，故選 be destroyed。",
      translation: "經理要求會議結束後銷毀機密草稿。",
      tags: ["subjunctive", "passive", "security"]
    },
    {
      id: "P5-302",
      category: "假設語氣",
      prompt: "It was proposed that the unused office _____ into a customer training room.",
      choices: ["convert", "be converted", "converted", "is converting"],
      answer: 1,
      explanation: "It was proposed that... 後採原形假設語氣；office 是被改建，因此用 be converted。",
      translation: "有人提議將閒置辦公室改建成顧客培訓室。",
      tags: ["subjunctive", "passive", "proposal"]
    },
    {
      id: "P5-303",
      category: "分詞構句",
      prompt: "_____ the revised budget, the committee approved the project without further discussion.",
      choices: ["Reviewing", "Having reviewed", "Reviewed", "To reviewing"],
      answer: 1,
      explanation: "先審閱預算，之後才核准專案。Having + p.p. 表示分詞構句的動作早於主句，因此選 Having reviewed。",
      translation: "審閱修訂後的預算後，委員會未再討論便核准了專案。",
      tags: ["participle-clause", "perfect-participle"]
    },
    {
      id: "P5-304",
      category: "分詞構句",
      prompt: "Not _____ the building's access code, the courier called the reception desk.",
      choices: ["known", "knowing", "know", "to know"],
      answer: 1,
      explanation: "courier 主動知道／不知道密碼，否定分詞構句用 Not knowing。",
      translation: "由於不知道大樓門禁密碼，快遞員打電話給接待櫃台。",
      tags: ["participle-clause", "present-participle", "cause"]
    },
    {
      id: "P5-305",
      category: "分詞構句",
      prompt: "_____ for high-volume transactions, the new payment system can process requests within seconds.",
      choices: ["Designing", "Designed", "Having designed", "Design"],
      answer: 1,
      explanation: "payment system 是被設計來處理大量交易，使用過去分詞 Designed 作被動分詞構句。",
      translation: "這套新付款系統專為大量交易設計，可在數秒內處理請求。",
      tags: ["participle-clause", "past-participle", "technology"]
    },
    {
      id: "P5-306",
      category: "分詞構句",
      prompt: "_____ with the previous model, the updated scanner uses considerably less power.",
      choices: ["Comparing", "Compared", "Compare", "Having compare"],
      answer: 1,
      explanation: "Compared with... 是固定的被動分詞片語，表示「與……相比」。scanner 是被拿來比較的對象。",
      translation: "與前一款相比，更新後的掃描器耗電量明顯較低。",
      tags: ["participle-clause", "past-participle", "comparison"]
    },
    {
      id: "P5-307",
      category: "分詞構句",
      prompt: "_____ the encrypted portal, employees can submit expense documents from any branch.",
      choices: ["Used", "Using", "Use", "Having used"],
      answer: 1,
      explanation: "employees 主動使用 portal，且使用與提交同時發生，因此用現在分詞 Using。",
      translation: "員工可使用加密入口網站，從任何分公司提交費用文件。",
      tags: ["participle-clause", "present-participle", "technology"]
    },
    {
      id: "P5-308",
      category: "分詞構句",
      prompt: "_____ of the route change in advance, the driver avoided the closed bridge.",
      choices: ["Having been notified", "Notifying", "Having notified", "To notify"],
      answer: 0,
      explanation: "driver 先被通知，之後避開封閉橋梁。用 Having been + p.p. 同時表達先發生與被動。",
      translation: "司機事先收到路線變更通知，因此避開了封閉的橋梁。",
      tags: ["participle-clause", "perfect-participle", "passive"]
    },
    {
      id: "P5-309",
      category: "分詞構句",
      prompt: "_____ with an unexpected shortage, the manufacturer contacted two alternative suppliers.",
      choices: ["Facing", "Faced", "Having face", "To facing"],
      answer: 1,
      explanation: "be faced with 是「面臨」的固定結構，省略 be 後成為 Faced with...。",
      translation: "面臨突發短缺，製造商聯絡了兩家替代供應商。",
      tags: ["participle-clause", "past-participle", "collocation"]
    },
    {
      id: "P5-310",
      category: "分詞構句",
      prompt: "_____ on three years of usage data, the forecast predicts a steady increase in demand.",
      choices: ["Basing", "Based", "Having base", "To base"],
      answer: 1,
      explanation: "the forecast is based on data，省略 be 動詞後使用 Based on...。forecast 與 base 是被動關係。",
      translation: "這項預測以三年的使用資料為基礎，預計需求將穩定成長。",
      tags: ["participle-clause", "past-participle", "data"]
    },
    {
      id: "P5-311",
      category: "分詞構句",
      prompt: "_____ all required safety checks, the engineers authorized the system restart.",
      choices: ["Completed", "Completing", "Having completed", "To completing"],
      answer: 2,
      explanation: "工程師先完成檢查，才授權重新啟動。Having completed 清楚表示先後順序。",
      translation: "完成所有必要的安全檢查後，工程師核准重新啟動系統。",
      tags: ["participle-clause", "perfect-participle", "sequence"]
    },
    {
      id: "P5-312",
      category: "平行結構",
      prompt: "The new routing system will not only reduce delivery time but also _____ fuel efficiency.",
      choices: ["improving", "improvement", "improve", "improved"],
      answer: 2,
      explanation: "not only reduce... but also improve... 要保持原形動詞平行，因此選 improve。",
      translation: "新的路線系統不僅會縮短配送時間，也會提高燃油效率。",
      tags: ["parallelism", "not-only"]
    },
    {
      id: "P5-313",
      category: "平行結構",
      prompt: "The coordinator is responsible for scheduling interviews, monitoring attendance, and _____ final reports.",
      choices: ["prepare", "prepared", "preparing", "preparation"],
      answer: 2,
      explanation: "介系詞 for 後的三項工作為 scheduling、monitoring、preparing，必須保持 V-ing 平行。",
      translation: "協調員負責安排面試、追蹤出席情況及準備最終報告。",
      tags: ["parallelism", "gerund"]
    },
    {
      id: "P5-314",
      category: "平行結構",
      prompt: "The revised dashboard is both accurate and _____ to interpret.",
      choices: ["easily", "ease", "easy", "easier"],
      answer: 2,
      explanation: "both A and B 連接相同語法角色；accurate 是形容詞，因此 B 也用形容詞 easy。",
      translation: "修訂後的儀表板既準確又容易解讀。",
      tags: ["parallelism", "correlative-conjunction"]
    },
    {
      id: "P5-315",
      category: "平行結構",
      prompt: "Applicants may either upload the certificate online or _____ a printed copy in person.",
      choices: ["submitting", "submitted", "submit", "submission"],
      answer: 2,
      explanation: "either upload... or submit... 連接兩個原形動詞，故使用 submit。",
      translation: "申請人可以在線上上傳證書，或親自提交紙本。",
      tags: ["parallelism", "either-or"]
    },
    {
      id: "P5-316",
      category: "平行結構",
      prompt: "The initiative aims to shorten waiting times, reduce paperwork, and _____ customer satisfaction.",
      choices: ["improves", "improved", "improving", "improve"],
      answer: 3,
      explanation: "aims to 後接三個平行原形動詞：shorten、reduce、improve。",
      translation: "這項計畫旨在縮短等候時間、減少文書作業並提高顧客滿意度。",
      tags: ["parallelism", "infinitive"]
    },
    {
      id: "P5-317",
      category: "平行結構",
      prompt: "The new approval process is faster than the previous one and _____ to audit.",
      choices: ["easily", "easiest", "easier", "ease"],
      answer: 2,
      explanation: "faster 與 easier 都是比較級形容詞，平行描述 new approval process。",
      translation: "新的核准流程比舊流程更快，也更容易稽核。",
      tags: ["parallelism", "comparative"]
    },
    {
      id: "P5-318",
      category: "平行結構",
      prompt: "The board will decide whether the company renews the lease or _____ to a smaller office.",
      choices: ["relocating", "relocated", "relocates", "relocation"],
      answer: 2,
      explanation: "whether A or B 連接兩個子句；前半是 the company renews，後半省略相同主詞後仍需第三人稱單數 relocates。",
      translation: "董事會將決定公司要續租，還是搬到較小的辦公室。",
      tags: ["parallelism", "whether-or"]
    },
    {
      id: "P5-319",
      category: "平行結構",
      prompt: "The role requires preparing budgets, negotiating contracts, and _____ vendor performance.",
      choices: ["evaluate", "evaluating", "evaluated", "evaluation"],
      answer: 1,
      explanation: "requires 後列舉三項工作，preparing、negotiating、evaluating 必須保持 V-ing 平行。",
      translation: "這個職位需要編製預算、洽談合約及評估供應商表現。",
      tags: ["parallelism", "gerund"]
    },
    {
      id: "P5-320",
      category: "平行結構",
      prompt: "The report was praised for its clear organization, concise language, and _____ recommendations.",
      choices: ["practically", "practice", "practical", "practiced"],
      answer: 2,
      explanation: "clear、concise、practical 都是形容詞，分別修飾 organization、language、recommendations，形成平行名詞片語。",
      translation: "這份報告因組織清楚、語言精簡及建議實用而受到肯定。",
      tags: ["parallelism", "adjective"]
    }
  ];

  window.BUILTIN_BANK.push(...grammarItems.map((item) => ({
    ...item,
    part: "5",
    difficulty: "800",
    passage: "",
    audioText: "",
    tags: ["part5", "grammar", "advanced-grammar", ...item.tags],
    answerAudit: item.choices[item.answer],
    sourceNote: grammarSource
  })));

  const readingSource = "Original evidence-annotated reading literacy simulation set for v3.0.0.";
  const pushReadingSet = ({ groupId, category, skill, passage, items, tags = [] }) => {
    window.BUILTIN_BANK.push(...items.map((item, index) => ({
      ...item,
      id: `${groupId}-Q${index + 1}`,
      part: "7",
      difficulty: item.difficulty || "800",
      category,
      passage,
      audioText: "",
      translation: item.translation || "請依據文件中的明確線索選出最佳答案。",
      tags: ["part7", "reading", "literacy-core", skill, ...tags, ...(item.tags || [])],
      groupId,
      literacySkill: skill,
      answerAudit: item.choices[item.answer],
      sourceNote: readingSource
    })));
  };

  pushReadingSet({
    groupId: "P7-R71",
    category: "政策公告",
    skill: "條件例外",
    tags: ["policy", "condition", "exception"],
    passage: `Hybrid Work Access Policy

Employees may work from a branch other than their assigned office up to six days per month. They must reserve a workstation by 4 P.M. on the previous business day. Same-day reservations are permitted only when a manager confirms that the visit is related to an urgent client request. Staff attending scheduled training do not need to use the workstation system; the Learning Department reserves seats for them automatically. However, anyone extending a training visit for personal work must book the additional time separately.`,
    items: [
      {
        prompt: "What is the maximum number of days an employee may normally work from another branch each month?",
        choices: ["Four days", "Six days", "Eight days", "Ten days"],
        answer: 1,
        explanation: "政策第一句直接規定每月上限為 six days。",
        evidence: "Employees may work from a branch other than their assigned office up to six days per month.",
        evidenceLocation: "第 1 句｜一般規則",
        choiceNotes: ["把預約截止時間 4 P.M. 誤當成天數。", "正解：up to six days 明確給出每月上限。", "文件沒有八天的規定。", "文件沒有十天的規定。"]
      },
      {
        prompt: "Under what condition is a same-day workstation reservation allowed?",
        choices: ["The employee is attending scheduled training", "The branch has more than six empty desks", "A manager confirms an urgent client-related visit", "The employee arrives before 4 P.M."],
        answer: 2,
        explanation: "only when 引出唯一允許當日預約的條件：主管確認是緊急客戶需求。",
        evidence: "Same-day reservations are permitted only when a manager confirms that the visit is related to an urgent client request.",
        evidenceLocation: "第 3 句｜only when 限制條件",
        choiceNotes: ["訓練人員根本不必使用預約系統，不是當日預約條件。", "文件沒有以空桌數作為條件。", "正解：主管確認且與緊急客戶需求有關。", "4 P.M. 是前一個工作日的截止時間，不是到訪當天。"]
      },
      {
        prompt: "Who does NOT need to reserve a workstation through the system?",
        choices: ["Staff attending scheduled training", "Employees working on urgent client requests", "Managers visiting another branch", "Anyone staying after a training session"],
        answer: 0,
        explanation: "scheduled training 是明確例外，座位由 Learning Department 自動保留。",
        evidence: "Staff attending scheduled training do not need to use the workstation system; the Learning Department reserves seats for them automatically.",
        evidenceLocation: "第 4 句｜例外規則",
        choiceNotes: ["正解：訓練座位由 Learning Department 自動預留。", "緊急客戶需求只是可能允許當日預約，仍需預約。", "文件沒有給主管一般豁免。", "延長停留做個人工作時反而必須另外預約。"]
      },
      {
        prompt: "What must an employee do when staying after training to complete personal work?",
        choices: ["Ask the Learning Department to extend the seat automatically", "Use any unoccupied desk without a reservation", "Wait until the following month", "Reserve the additional work time separately"],
        answer: 3,
        explanation: "最後一句用 However 限縮前述訓練例外；延長時間做個人工作要另外預約。",
        evidence: "However, anyone extending a training visit for personal work must book the additional time separately.",
        evidenceLocation: "第 5 句｜However 例外的例外",
        choiceNotes: ["自動預留只涵蓋 scheduled training。", "文件明確要求 separately book。", "文件沒有要求等到下個月。", "正解：額外個人工作時間必須另外預約。"]
      }
    ]
  });

  pushReadingSet({
    groupId: "P7-R72",
    category: "作業流程",
    skill: "流程順序",
    tags: ["process", "sequence", "technology"],
    passage: `Device Return Procedure

Before returning a company laptop, employees should upload active project files to the secure transfer folder. Next, they must submit the online return form; the system then creates a tracking label. The laptop and its power adapter should be placed in the reusable shipping sleeve, but external keyboards should remain at the employee's office. After the courier scans the label, the employee receives an automatic receipt. IT will close the equipment record only after confirming that the device starts normally and that no accessories are missing.`,
    items: [
      {
        prompt: "What should employees do first before returning a laptop?",
        choices: ["Upload active project files", "Print the courier receipt", "Remove the tracking label", "Send the keyboard to IT"],
        answer: 0,
        explanation: "Before returning... 的第一個動作是上傳進行中的專案檔案。",
        evidence: "Before returning a company laptop, employees should upload active project files to the secure transfer folder.",
        evidenceLocation: "第 1 句｜流程起點",
        choiceNotes: ["正解：這是文件列出的第一個動作。", "收據在快遞掃描標籤後才自動產生。", "標籤需要貼在退回物品上，不是移除。", "外接鍵盤應留在辦公室。"]
      },
      {
        prompt: "What happens immediately after the online return form is submitted?",
        choices: ["IT closes the equipment record", "A courier receipt is e-mailed", "The system creates a tracking label", "The laptop is tested automatically"],
        answer: 2,
        explanation: "分號後的 then 清楚指出送出表單後，系統產生追蹤標籤。",
        evidence: "Next, they must submit the online return form; the system then creates a tracking label.",
        evidenceLocation: "第 2 句｜then 下一步",
        choiceNotes: ["IT 要等裝置檢查完成才關閉紀錄。", "收據要等快遞掃描標籤。", "正解：表單送出後系統建立 tracking label。", "裝置測試由 IT 後續確認，不是自動立即發生。"]
      },
      {
        prompt: "Which item should remain at the employee's office?",
        choices: ["The laptop", "The external keyboard", "The power adapter", "The reusable shipping sleeve"],
        answer: 1,
        explanation: "but 後指出例外：external keyboards 應留在辦公室。",
        evidence: "The laptop and its power adapter should be placed in the reusable shipping sleeve, but external keyboards should remain at the employee's office.",
        evidenceLocation: "第 3 句｜but 轉折例外",
        choiceNotes: ["筆電要放進寄送袋退回。", "正解：外接鍵盤留在員工辦公室。", "電源轉接器要與筆電一起退回。", "寄送袋用來裝筆電與轉接器。"]
      },
      {
        prompt: "When will IT close the equipment record?",
        choices: ["As soon as the return form is submitted", "When the courier collects the shipping sleeve", "After the employee receives a receipt", "After the device and accessories pass IT's checks"],
        answer: 3,
        explanation: "only after 表示關閉紀錄前必須確認裝置可啟動且配件無缺。",
        evidence: "IT will close the equipment record only after confirming that the device starts normally and that no accessories are missing.",
        evidenceLocation: "第 5 句｜only after 完成條件",
        choiceNotes: ["表單只會觸發追蹤標籤。", "快遞收件仍早於 IT 檢查。", "自動收據只證明快遞已掃描。", "正解：裝置與配件都通過 IT 確認後才結案。"]
      }
    ]
  });

  pushReadingSet({
    groupId: "P7-R73",
    category: "雙篇閱讀",
    skill: "跨文件推論",
    tags: ["double-passage", "cross-reference", "inference"],
    passage: `BUILDING NOTICE

Greenline Tower will test emergency power on September 12 from 7 to 9 A.M. Elevators will operate one at a time, and tenants are asked to postpone nonessential deliveries until after 9:30. The loading dock will remain open for urgent medical and food shipments.

E-MAIL
From: Lena Cho, Brightwell Events
To: Setup Crew
Subject: September 12 Delivery

Our stage equipment is scheduled to arrive at Greenline Tower at 8 A.M. on September 12. The cases are heavy and require two elevator trips. Since the client rehearsal does not begin until 1 P.M., I have asked the carrier to move delivery to 10 A.M. Please update the setup crew's arrival from 8:30 to 10:30.`,
    items: [
      {
        prompt: "Why did Ms. Cho ask the carrier to change the delivery time?",
        choices: ["The loading dock will be completely closed", "The rehearsal was moved to another day", "Elevator service will be limited during the original delivery time", "The carrier cannot transport heavy cases before noon"],
        answer: 2,
        explanation: "公告說 7–9 點電梯一次只運行一部；郵件說器材很重且需兩趟電梯，因此改到 10 點。",
        evidence: "Elevators will operate one at a time, and tenants are asked to postpone nonessential deliveries until after 9:30.",
        evidenceLocation: "公告第 2 句 + 郵件第 2 句｜跨文件因果",
        choiceNotes: ["loading dock 仍為緊急貨物開放，沒有完全關閉。", "彩排仍是當天下午 1 點。", "正解：原訂 8 點落在電梯限制期間，重型器材需兩趟。", "文件沒有說承運商上午不能載重物。"]
      },
      {
        prompt: "At what time should the setup crew now arrive?",
        choices: ["10:30 A.M.", "8:30 A.M.", "9:30 A.M.", "1:00 P.M."],
        answer: 0,
        explanation: "郵件最後一句直接把工作人員抵達時間從 8:30 改為 10:30。",
        evidence: "Please update the setup crew's arrival from 8:30 to 10:30.",
        evidenceLocation: "郵件最後一句｜更新後時間",
        choiceNotes: ["正解：新抵達時間是 10:30。", "8:30 是原本時間。", "9:30 是大樓建議非必要配送之後的時間點，不是工作人員時間。", "1:00 是客戶彩排開始時間。"]
      },
      {
        prompt: "Which delivery may still use the loading dock during the power test?",
        choices: ["Stage lighting for an afternoon rehearsal", "Office chairs for a new tenant", "Printed programs for an event", "Food needed for an urgent shipment"],
        answer: 3,
        explanation: "公告只保留 urgent medical and food shipments 在測試期間使用裝卸區。",
        evidence: "The loading dock will remain open for urgent medical and food shipments.",
        evidenceLocation: "公告第 3 句｜允許的例外",
        choiceNotes: ["舞台器材屬非必要配送，已被改期。", "一般辦公家具不在例外內。", "印刷品不屬醫療或食品緊急貨運。", "正解：緊急食品貨運明確被允許。"]
      },
      {
        prompt: "What will most likely happen before the setup crew arrives?",
        choices: ["The client rehearsal will finish", "The stage equipment will be delivered", "The emergency power test will begin again", "The loading dock will close for the day"],
        answer: 1,
        explanation: "器材改到 10 點送達，工作人員改到 10:30，因此器材預計先到。",
        evidence: "Since the client rehearsal does not begin until 1 P.M., I have asked the carrier to move delivery to 10 A.M.",
        evidenceLocation: "郵件第 3 句 + 最後一句｜時間交叉推論",
        choiceNotes: ["彩排 1 點才開始，不會在 10:30 前結束。", "正解：器材 10:00、工作人員 10:30，器材先到。", "電力測試 9 點結束，沒有再次開始的資訊。", "裝卸區沒有全天關閉。"]
      }
    ]
  });

  pushReadingSet({
    groupId: "P7-R74",
    category: "數據報告",
    skill: "數據判讀",
    tags: ["data", "report", "inference"],
    passage: `Customer Support Pilot Report

Channel | Average wait before pilot | Average wait after pilot | Satisfaction after pilot
Phone | 8 min | 6 min | 82%
Live chat | 5 min | 2 min | 91%
E-mail | 14 hr | 9 hr | 88%

The pilot added two chat agents between noon and 3 P.M., while staffing for phone and e-mail remained unchanged. Although e-mail response time improved, survey comments show that customers still disliked not knowing when an agent had begun reviewing their message. The team therefore recommends adding a visible "under review" status before hiring more e-mail staff.`,
    items: [
      {
        prompt: "Which channel had the shortest average wait after the pilot?",
        choices: ["Phone", "Live chat", "E-mail", "Phone and e-mail were equal"],
        answer: 1,
        explanation: "表格 after pilot 欄位中，live chat 為 2 分鐘，短於 phone 的 6 分鐘與 e-mail 的 9 小時。",
        evidence: "Live chat | 5 min | 2 min | 91%",
        evidenceLocation: "表格 Live chat 列｜after pilot 欄",
        choiceNotes: ["Phone 是 6 分鐘。", "正解：Live chat 為 2 分鐘，是最短等待時間。", "E-mail 是 9 小時。", "Phone 與 e-mail 不相等。"]
      },
      {
        prompt: "What staffing change was made during the pilot?",
        choices: ["Phone staffing doubled all day", "E-mail agents worked overnight", "One agent moved from phone to e-mail", "Two chat agents were added during a three-hour period"],
        answer: 3,
        explanation: "文字說 noon 到 3 P.M. 增加兩名 chat agents，其他通路人力不變。",
        evidence: "The pilot added two chat agents between noon and 3 P.M., while staffing for phone and e-mail remained unchanged.",
        evidenceLocation: "表格後第 1 句｜人力變動",
        choiceNotes: ["電話人力保持不變。", "文件沒有夜班資訊。", "沒有跨通路調動人員。", "正解：中午到下午 3 點增加兩名聊天客服。"]
      },
      {
        prompt: "What continued to bother e-mail customers?",
        choices: ["They could not tell when review of a message had started", "They had to pay for each reply", "They could not attach documents", "Their messages were transferred to live chat"],
        answer: 0,
        explanation: "survey comments 指出顧客不喜歡無法知道客服何時開始檢視訊息。",
        evidence: "Although e-mail response time improved, survey comments show that customers still disliked not knowing when an agent had begun reviewing their message.",
        evidenceLocation: "表格後第 2 句｜Although 讓步後問題",
        choiceNotes: ["正解：缺少訊息已開始審閱的可見狀態。", "文件沒有收費問題。", "文件沒有附件限制。", "文件沒有自動轉到 live chat。"]
      },
      {
        prompt: "What does the team recommend doing before increasing e-mail staffing?",
        choices: ["Reducing the number of e-mail requests", "Matching the phone team's schedule", "Adding a visible message-status indicator", "Removing the satisfaction survey"],
        answer: 2,
        explanation: "therefore 後提出建議：先新增可見的 under review 狀態，再考慮增聘。",
        evidence: "The team therefore recommends adding a visible \"under review\" status before hiring more e-mail staff.",
        evidenceLocation: "最後一句｜therefore 建議",
        choiceNotes: ["沒有建議減少請求。", "沒有要求比照電話排班。", "正解：先增加可見的 under review 狀態。", "調查提供了重要線索，沒有要移除。"]
      }
    ]
  });

  pushReadingSet({
    groupId: "P7-R75",
    category: "內部信件",
    skill: "目的意圖",
    tags: ["email", "purpose", "security"],
    passage: `E-MAIL
From: Information Security
To: All Employees
Subject: Security Simulation Follow-up

Last Tuesday's simulated phishing message was opened by 38% of staff, but only 7% entered information on the practice page. The exercise was not designed to identify individuals; department-level results will be used to plan short workshops. Managers will receive a topic summary, not employee names. Because several staff members reported the message only after asking a colleague, the first workshop will focus on how to use the reporting button immediately, even when a message merely seems unusual.`,
    items: [
      {
        prompt: "What is the main purpose of the e-mail?",
        choices: ["To announce disciplinary action against employees", "To request names of staff who opened a message", "To explain simulation results and the planned follow-up", "To advertise a new external security service"],
        answer: 2,
        explanation: "信件同時說明演練結果、資料使用方式與接下來的短講主題。",
        evidence: "The exercise was not designed to identify individuals; department-level results will be used to plan short workshops.",
        evidenceLocation: "第 2 句｜演練目的與後續",
        choiceNotes: ["信件強調不識別個人，並非處分。", "主管不會收到員工姓名。", "正解：說明結果並安排後續工作坊。", "這是內部演練追蹤，不是服務廣告。"]
      },
      {
        prompt: "Why will managers not receive employee names?",
        choices: ["The names were deleted accidentally", "The exercise focuses on department-level learning rather than individuals", "Only seven employees opened the message", "Managers already know who participated"],
        answer: 1,
        explanation: "文件明說演練不是為了識別個人，而是用部門層級結果規劃課程。",
        evidence: "Managers will receive a topic summary, not employee names.",
        evidenceLocation: "第 3 句，並回扣第 2 句｜隱私邊界",
        choiceNotes: ["沒有資料誤刪。", "正解：用途是部門層級學習，不做個人點名。", "7% 是輸入資料的比例，不是七名員工。", "文件沒有說主管已知道姓名。"]
      },
      {
        prompt: "What will the first workshop emphasize?",
        choices: ["Creating more convincing practice messages", "Comparing results among individual employees", "Waiting for a colleague before taking action", "Reporting suspicious messages immediately"],
        answer: 3,
        explanation: "最後一句指出課程要訓練員工即使只是覺得可疑，也立即使用 reporting button。",
        evidence: "Because several staff members reported the message only after asking a colleague, the first workshop will focus on how to use the reporting button immediately, even when a message merely seems unusual.",
        evidenceLocation: "最後一句｜Because 原因 + focus 結果",
        choiceNotes: ["工作坊不是教人製作釣魚郵件。", "信件避免個人比較。", "等同事確認正是要改善的延遲行為。", "正解：覺得可疑就立即回報。"]
      },
      {
        prompt: "What percentage of staff entered information on the practice page?",
        choices: ["7%", "31%", "38%", "45%"],
        answer: 0,
        explanation: "第一句對比 38% 開信與 only 7% 輸入資料。",
        evidence: "Last Tuesday's simulated phishing message was opened by 38% of staff, but only 7% entered information on the practice page.",
        evidenceLocation: "第 1 句｜but 對比後數字",
        choiceNotes: ["正解：only 7% entered information。", "31% 是自行相減得到的數字，文件沒有把它當答案。", "38% 是開啟訊息的比例。", "45% 未出現在文件中。"]
      }
    ]
  });

  pushReadingSet({
    groupId: "P7-R76",
    category: "立場聲明",
    skill: "語氣立場",
    tags: ["article", "stance", "condition"],
    passage: `Community Mobility Update

The city plans to replace ten curbside parking spaces near Central Market with a two-month delivery zone pilot. Shop owners initially objected because customers often use those spaces for brief visits. After the city agreed to keep the zone open to private vehicles after 6 P.M. and to publish weekly usage data, the market association supported the trial. Its statement emphasized that support is temporary and depends on whether delivery vehicles stop blocking the bicycle lane. If the data show little improvement, the association will request that the former parking arrangement be restored.`,
    items: [
      {
        prompt: "Why did shop owners initially oppose the pilot?",
        choices: ["The trial would last more than a year", "Delivery vehicles were banned from the market", "Weekly data would reveal store revenue", "Customers use the affected spaces for short visits"],
        answer: 3,
        explanation: "第二句以 because 說明反對原因：顧客常用這些停車位短暫到店。",
        evidence: "Shop owners initially objected because customers often use those spaces for brief visits.",
        evidenceLocation: "第 2 句｜because 直接原因",
        choiceNotes: ["試行只有兩個月。", "計畫是設置配送區，不是禁止配送車。", "公布的是 usage data，不是店家營收。", "正解：顧客會使用被替換的車位短暫停留。"]
      },
      {
        prompt: "What change helped the market association support the trial?",
        choices: ["Private vehicles may use the zone after 6 P.M.", "The city reduced the pilot to one week", "Ten new parking spaces will be built", "Delivery vehicles may block the bicycle lane"],
        answer: 0,
        explanation: "After the city agreed... 說明支持前的讓步之一是晚間 6 點後開放私人車輛。",
        evidence: "After the city agreed to keep the zone open to private vehicles after 6 P.M. and to publish weekly usage data, the market association supported the trial.",
        evidenceLocation: "第 3 句｜After 讓步條件",
        choiceNotes: ["正解：6 P.M. 後私人車輛仍可使用。", "試行仍是兩個月。", "沒有新建停車位。", "是否停止阻塞自行車道是評估條件，不是允許阻塞。"]
      },
      {
        prompt: "How would the association's current position best be described?",
        choices: ["Permanent and enthusiastic approval", "Complete opposition without conditions", "Temporary support that depends on results", "Indifference to how the zone is used"],
        answer: 2,
        explanation: "statement emphasized temporary and depends on，顯示是有條件、暫時性的支持。",
        evidence: "Its statement emphasized that support is temporary and depends on whether delivery vehicles stop blocking the bicycle lane.",
        evidenceLocation: "第 4 句｜temporary + depends on",
        choiceNotes: ["temporary 明確排除永久支持。", "協會已支持試行，並非完全反對。", "正解：支持是暫時且取決於成效。", "協會非常在意自行車道是否被阻塞。"]
      },
      {
        prompt: "What will the association request if the pilot shows little improvement?",
        choices: ["A longer delivery-zone trial", "A return to the previous parking arrangement", "A ban on private vehicles after 6 P.M.", "The cancellation of weekly reports"],
        answer: 1,
        explanation: "最後一句為明確條件結果：改善不多就要求恢復原停車安排。",
        evidence: "If the data show little improvement, the association will request that the former parking arrangement be restored.",
        evidenceLocation: "最後一句｜If 條件結果",
        choiceNotes: ["文件沒有要求延長成效不佳的試行。", "正解：要求恢復原本停車安排。", "目前協議反而允許 6 P.M. 後私人車輛使用。", "協會依賴每週資料判斷，不會取消報告。"]
      }
    ]
  });
})();
