(() => {
  const sourceNote = "Original TOEIC-style Part 3/4 simulation set for v4.1. Official directions informed structure only; no official question text or audio was copied.";
  const sharedTabletAudio = {
    audioText: "M: Did the security update finish on the reception tablets?\nW: Not yet. The network team found a compatibility issue with the older models.\nM: We have visitors arriving at nine tomorrow. Can we use the backup login page?\nW: Yes, but I will ask the team to test it again this afternoon.",
    audioTranslation: "男：接待平板的資安更新完成了嗎？\n女：還沒有。網路團隊發現舊機型有相容性問題。\n男：明天九點有訪客到。可以用備用登入頁嗎？\n女：可以，但我會請團隊今天下午再測一次。"
  };
  const groups = [
    {
      groupId: "P3-G18", part: "3", difficulty: "800", category: "接待系統更新",
      ...sharedTabletAudio,
      tags: ["listening", "conversation", "security", "technology"],
      questions: [
        {
          id: "P3-G18-Q2", prompt: "What temporary solution does the man suggest?",
          choices: ["Printing visitor badges in advance", "Replacing all of the tablets", "Using a backup login page", "Canceling tomorrow's appointments"], answer: 2,
          explanation: "男方問 Can we use the backup login page?，所以暫時方案是使用備用登入頁。",
          translation: "男方提出哪一項暫時解決方案？", tags: ["solution"]
        },
        {
          id: "P3-G18-Q3", prompt: "Why do the tablets need to be ready by tomorrow morning?",
          choices: ["A network audit will begin", "Visitors are expected at nine", "A delivery will be checked in", "The office will close at noon"], answer: 1,
          explanation: "男方說 visitors arriving at nine tomorrow，接待系統必須在訪客抵達前可用。",
          translation: "為什麼平板必須在明早前準備好？", tags: ["reason", "time"]
        }
      ]
    },
    {
      groupId: "P3-G19", part: "3", difficulty: "800", category: "AI 會議逐字稿",
      audioText: "W: Did you enable automatic transcription for tomorrow's client briefing?\nM: Not yet. The legal department says we need each guest's consent before recording.\nW: Then I'll add a consent notice to the invitation and ask the account manager to confirm with the guests.\nM: Good. Once she replies, I can set the assistant to delete the recording after thirty days.",
      audioTranslation: "女：你啟用明天客戶簡報的自動逐字稿了嗎？\n男：還沒有。法務部門說錄音前必須取得每位來賓的同意。\n女：那我會在邀請函加入同意通知，並請客戶經理向來賓確認。\n男：很好。她回覆後，我就能設定助理在三十天後刪除錄音。",
      tags: ["listening", "conversation", "ai", "privacy"],
      questions: [
        {
          id: "P3-G19-Q1", prompt: "Why has automatic transcription not been enabled?",
          choices: ["The briefing was postponed", "Guest consent is still required", "The assistant needs an update", "The invitation has already been sent"], answer: 1,
          explanation: "男方說法務要求 recording 前取得 each guest's consent，因此尚未啟用。",
          translation: "為什麼尚未啟用自動逐字稿？", tags: ["reason"]
        },
        {
          id: "P3-G19-Q2", prompt: "What will the woman do?",
          choices: ["Replace the meeting assistant", "Shorten the client briefing", "Revise the invitation and contact an account manager", "Delete an earlier recording"], answer: 2,
          explanation: "女方會 add a consent notice，並 ask the account manager to confirm。",
          translation: "女方將會做什麼？", tags: ["next-action"]
        },
        {
          id: "P3-G19-Q3", prompt: "What will happen after the account manager replies?",
          choices: ["A deletion schedule will be configured", "The briefing will move to another room", "The legal department will send invoices", "Guests will receive new devices"], answer: 0,
          explanation: "男方說 Once she replies，就設定錄音在三十天後自動刪除。",
          translation: "客戶經理回覆後會發生什麼事？", tags: ["sequence", "inference"]
        }
      ]
    },
    {
      groupId: "P3-G20", part: "3", difficulty: "600", category: "電動車充電設備",
      audioText: "M: The facilities dashboard shows that two chargers in the parking garage are offline.\nW: The contractor found water damage in the control cabinet. A replacement part will arrive Thursday morning.\nM: Our finance workshop starts at ten that day, and several visitors said they will drive electric cars.\nW: I'll reserve four spaces at the public charging lot across the street and include a map in the reminder.",
      audioTranslation: "男：設施儀表板顯示停車場有兩座充電器離線。\n女：承包商在控制箱發現水損，替換零件星期四早上會到。\n男：我們的財務工作坊那天十點開始，而且幾位訪客說會開電動車。\n女：我會預訂街對面公共充電站的四個車位，並在提醒信中附上地圖。",
      tags: ["listening", "conversation", "facilities", "sustainability"],
      questions: [
        {
          id: "P3-G20-Q1", prompt: "What problem are the speakers discussing?",
          choices: ["Two vehicle chargers are not working", "A workshop room is unavailable", "A contractor sent the wrong invoice", "Visitors cannot find the parking garage"], answer: 0,
          explanation: "開頭指出 two chargers ... are offline，主問題是兩座充電器故障。",
          translation: "說話者正在討論什麼問題？", tags: ["problem"]
        },
        {
          id: "P3-G20-Q2", prompt: "Why is the man concerned about Thursday morning?",
          choices: ["A repair estimate is due", "The parking garage will close", "Workshop visitors may need charging", "The dashboard will be replaced"], answer: 2,
          explanation: "工作坊週四十點開始，且多位訪客會開電動車，因此他擔心充電需求。",
          translation: "男方為什麼擔心星期四早上？", tags: ["reason", "inference"]
        },
        {
          id: "P3-G20-Q3", prompt: "What will the woman probably do next?",
          choices: ["Cancel the finance workshop", "Inspect the control cabinet", "Order two electric cars", "Arrange spaces at another charging lot"], answer: 3,
          explanation: "女方說會 reserve four spaces at the public charging lot，表示將安排替代充電車位。",
          translation: "女方接下來可能會做什麼？", tags: ["next-action"]
        }
      ]
    },
    {
      groupId: "P3-G21", part: "3", difficulty: "800", category: "無密碼登入",
      audioText: "W: Are the warehouse tablets ready for passkey sign-in?\nM: The pilot worked on the newer devices, but twelve older scanners cannot install the security update.\nW: The leased replacements are scheduled to arrive Tuesday. What should the night shift use until then?\nM: I'll issue temporary security keys and leave a sign-out sheet with the supervisor.",
      audioTranslation: "女：倉庫平板已準備好使用通行金鑰登入了嗎？\n男：新裝置的試行成功了，但十二台舊掃描器無法安裝安全更新。\n女：租用的替換設備預定星期二抵達。在那之前夜班該用什麼？\n男：我會發放臨時安全金鑰，並把領用表交給主管。",
      tags: ["listening", "conversation", "cybersecurity", "warehouse"],
      questions: [
        {
          id: "P3-G21-Q1", prompt: "What problem does the man mention?",
          choices: ["New tablets were delivered late", "Some scanners cannot install an update", "The night supervisor lost a form", "The pilot program was canceled"], answer: 1,
          explanation: "男方說 twelve older scanners cannot install the security update。",
          translation: "男方提到什麼問題？", tags: ["problem"]
        },
        {
          id: "P3-G21-Q2", prompt: "What is expected to happen on Tuesday?",
          choices: ["A supervisor will start the night shift", "A pilot report will be published", "Replacement devices will arrive", "Employees will return security keys"], answer: 2,
          explanation: "女方說 leased replacements are scheduled to arrive Tuesday。",
          translation: "星期二預計會發生什麼事？", tags: ["time", "detail"]
        },
        {
          id: "P3-G21-Q3", prompt: "What will the man provide?",
          choices: ["Temporary security keys", "New warehouse shelves", "A software training video", "Printed delivery labels"], answer: 0,
          explanation: "男方明確說 I'll issue temporary security keys。",
          translation: "男方將提供什麼？", tags: ["next-action"]
        }
      ]
    },
    {
      groupId: "P4-G16", part: "4", difficulty: "800", category: "倉儲無人機公告",
      audioText: "Speaker: Attention, distribution staff. Starting Monday, small indoor drones will scan shelf labels after the warehouse closes. Please keep the main aisles clear by eight thirty P.M. During the first week, technicians will be on site to monitor each flight. If a drone stops unexpectedly, do not move it. Submit an incident through the operations app. Manual cycle counts will continue in the refrigerated zone until its safety test is complete.",
      audioTranslation: "請配送中心員工注意。從星期一起，小型室內無人機會在倉庫關閉後掃描貨架標籤。請在晚上八點半前保持主要走道暢通。第一週會有技術人員在場監控每次飛行。若無人機意外停止，請勿移動它，並透過營運應用程式回報事件。冷藏區在安全測試完成前仍會採人工盤點。",
      tags: ["listening", "talk", "warehouse", "automation"],
      questions: [
        {
          id: "P4-G16-Q1", prompt: "What is the purpose of the announcement?",
          choices: ["To recruit warehouse technicians", "To explain a new inventory procedure", "To announce an earlier closing time", "To report missing shelf labels"], answer: 1,
          explanation: "公告說明無人機掃描貨架標籤的新流程及員工應配合事項。",
          translation: "這則公告的目的是什麼？", tags: ["purpose"]
        },
        {
          id: "P4-G16-Q2", prompt: "By what time should the main aisles be clear?",
          choices: ["By 8:30 P.M.", "By 9:00 A.M.", "Before Monday noon", "After the first week"], answer: 0,
          explanation: "講者要求 keep the main aisles clear by eight thirty P.M.。",
          translation: "主要走道應在幾點前淨空？", tags: ["time"]
        },
        {
          id: "P4-G16-Q3", prompt: "Where will manual cycle counts continue?",
          choices: ["In the loading area", "Along the main aisles", "Near the operations office", "In the refrigerated zone"], answer: 3,
          explanation: "最後一句指出 Manual cycle counts will continue in the refrigerated zone。",
          translation: "哪裡仍會繼續人工盤點？", tags: ["location", "detail"]
        }
      ]
    },
    {
      groupId: "P4-G17", part: "4", difficulty: "600", category: "循環包裝計畫",
      audioText: "Speaker: This message is for suppliers enrolled in our reusable-packaging program. Beginning August first, eligible deliveries should arrive in the blue tracking totes. Scan the barcode on each tote when it is received, and return the empty container within ten business days. Report damaged containers through the supplier portal rather than sending them back. A packaging discount will appear on the invoice following each completed return.",
      audioTranslation: "這則訊息提供給參加可重複使用包裝計畫的供應商。自八月一日起，符合資格的貨物應使用藍色追蹤箱配送。收到時請掃描每個箱子的條碼，並在十個工作天內歸還空箱。損壞的容器請透過供應商入口網站回報，不要寄回。每次完成歸還後，包裝折扣會顯示在下一張發票上。",
      tags: ["listening", "talk", "suppliers", "sustainability"],
      questions: [
        {
          id: "P4-G17-Q1", prompt: "Who is the message intended for?",
          choices: ["Customers awaiting refunds", "Drivers applying for jobs", "Suppliers in a packaging program", "Employees ordering office furniture"], answer: 2,
          explanation: "開頭明確說 This message is for suppliers enrolled in our reusable-packaging program。",
          translation: "這則訊息是提供給誰的？", tags: ["audience"]
        },
        {
          id: "P4-G17-Q2", prompt: "What must be done within ten business days?",
          choices: ["An invoice must be paid", "An empty tote must be returned", "A barcode must be replaced", "A delivery route must be approved"], answer: 1,
          explanation: "講者要求 return the empty container within ten business days。",
          translation: "十個工作天內必須完成什麼？", tags: ["deadline", "detail"]
        },
        {
          id: "P4-G17-Q3", prompt: "What benefit is mentioned?",
          choices: ["A discount on a following invoice", "Free delivery on weekends", "A longer return period", "Priority access to new products"], answer: 0,
          explanation: "完成歸還後，packaging discount 會出現在下一張發票。",
          translation: "講者提到什麼好處？", tags: ["benefit"]
        }
      ]
    },
    {
      groupId: "P4-G18", part: "4", difficulty: "600", category: "交通應用程式更新",
      audioText: "Speaker: Please note that the MetroLink mobile ticketing app will be unavailable this Sunday from one to four A.M. while we install a security upgrade. Ticket kiosks at all stations will remain in service. Tickets purchased before the outage and saved on a device can still be displayed to station staff. Monthly-pass users do not need to take any action. When the updated app returns on Monday, it will also provide alerts when a train's departure platform changes.",
      audioTranslation: "請注意，MetroLink 行動購票應用程式將於本週日上午一點至四點因安裝安全更新而無法使用。所有車站的售票機仍會運作。中斷前購買並儲存在裝置上的車票仍可出示給站務人員。月票使用者無須採取任何行動。更新後的應用程式星期一恢復時，也會提供列車出發月台變更通知。",
      tags: ["listening", "talk", "transportation", "mobile-app"],
      questions: [
        {
          id: "P4-G18-Q1", prompt: "Why will the mobile app be unavailable?",
          choices: ["Station staff will receive training", "Ticket prices are changing", "A new rail line is opening", "A security upgrade will be installed"], answer: 3,
          explanation: "講者說 app 暫停是 while we install a security upgrade。",
          translation: "行動應用程式為什麼會暫停服務？", tags: ["reason"]
        },
        {
          id: "P4-G18-Q2", prompt: "How can passengers buy tickets during the outage?",
          choices: ["From station staff", "At station kiosks", "On the updated app", "By calling customer service"], answer: 1,
          explanation: "公告指出 Ticket kiosks at all stations will remain in service。",
          translation: "系統中斷期間乘客如何購票？", tags: ["solution", "detail"]
        },
        {
          id: "P4-G18-Q3", prompt: "What feature will the updated app provide?",
          choices: ["Automatic monthly-pass renewal", "Live station video", "Departure-platform change alerts", "Discounts for early trains"], answer: 2,
          explanation: "最後提到新版會提供 alerts when a train's departure platform changes。",
          translation: "更新後的應用程式會提供什麼功能？", tags: ["feature", "detail"]
        }
      ]
    }
  ];

  window.BUILTIN_BANK.push(...groups.flatMap(group => group.questions.map(question => ({
    id: question.id,
    part: group.part,
    difficulty: group.difficulty,
    category: group.category,
    prompt: question.prompt,
    choices: question.choices,
    answer: question.answer,
    explanation: question.explanation,
    translation: question.translation,
    passage: "",
    audioText: group.audioText,
    audioTranslation: group.audioTranslation,
    groupId: group.groupId,
    tags: [...group.tags, ...(question.tags || [])],
    sourceNote
  }))));
})();
