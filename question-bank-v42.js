(() => {
  const sourceNote = "Original TOEIC-style Part 3/4 simulation set for v4.2. Official directions informed the delivery format only; no official question text or audio was copied.";
  const groups = [
    {
      groupId: "P3-G22", part: "3", difficulty: "600", category: "智慧訪客通行",
      audioText: "W: The visitor badges for tomorrow's supplier tour still show the old entrance.\nM: That's because the lobby scanners were moved while the security desk is being renovated. Guests should use the east entrance this week.\nW: I already sent the itinerary. Should I send a corrected version?\nM: Yes, and please add the temporary access code. It expires at noon, just after the tour ends.",
      audioTranslation: "女：明天供應商參訪使用的訪客證仍顯示舊入口。\n男：那是因為保全櫃台整修期間，大廳的掃描器已經移走。本週訪客應使用東側入口。\n女：我已經寄出行程了。我應該寄一份修正版嗎？\n男：要，也請加上臨時通行碼。它會在中午失效，正好是參訪結束之後。",
      tags: ["listening", "conversation", "security", "visitors"],
      questions: [
        {
          id: "P3-G22-Q1", prompt: "Why should the visitors use the east entrance?",
          choices: ["The supplier tour will begin there", "The lobby scanners have been relocated", "The old entrance is reserved for employees", "The itinerary lists the wrong building"], answer: 1,
          explanation: "男士指出大廳掃描器因保全櫃台整修而移走，因此訪客本週要改走東側入口。選項 A 把集合地點與入口原因混為一談。",
          translation: "訪客為何應使用東側入口？", tags: ["reason", "detail"]
        },
        {
          id: "P3-G22-Q2", prompt: "What will the woman probably do next?",
          choices: ["Print new employee badges", "Move the security scanners", "Send an updated itinerary", "Extend the supplier tour"], answer: 2,
          explanation: "女士詢問是否寄送修正版行程，男士回答 Yes，並要求加入通行碼；因此她接下來最可能寄出更新後的行程。",
          translation: "女士接下來最可能做什麼？", tags: ["next-action", "inference"]
        },
        {
          id: "P3-G22-Q3", prompt: "What is indicated about the temporary access code?",
          choices: ["It can be used for one week", "It will be printed on each badge", "It was created by a supplier", "It remains valid until after the tour"], answer: 3,
          explanation: "男士說通行碼在中午失效，而中午是在參訪結束之後，因此可推知參訪期間都能使用。",
          translation: "關於臨時通行碼可得知什麼？", tags: ["inference", "time"]
        }
      ]
    },
    {
      groupId: "P3-G23", part: "3", difficulty: "800", category: "混合會議字幕",
      audioText: "M: Have we confirmed live captions for Friday's product demonstration? Two clients will join from overseas.\nW: The captioning vendor is available, but its quote covers English only. One client requested Japanese translation.\nM: Our Tokyo office has an interpreter on staff. Could she join remotely for the question-and-answer session?\nW: I'll ask her. If she is available, we can keep the vendor for the main presentation and avoid changing the schedule.",
      audioTranslation: "男：我們確認星期五產品展示的即時字幕了嗎？有兩位客戶會從海外連線。\n女：字幕廠商有空，但報價只包含英文。其中一位客戶要求日文翻譯。\n男：東京辦公室有一位專職口譯員。她可以遠端加入問答時間嗎？\n女：我會問她。如果她有空，我們就能保留廠商負責主要簡報，也不必變更時程。",
      tags: ["listening", "conversation", "hybrid-event", "accessibility"],
      questions: [
        {
          id: "P3-G23-Q1", prompt: "What problem do the speakers discuss?",
          choices: ["A demonstration has been canceled", "A quote does not include a needed language", "Two clients cannot join the meeting", "The Tokyo office changed its schedule"], answer: 1,
          explanation: "字幕廠商的報價只含英文，但客戶需要日文翻譯；核心問題是報價未涵蓋所需語言。",
          translation: "說話者在討論什麼問題？", tags: ["problem", "paraphrase"]
        },
        {
          id: "P3-G23-Q2", prompt: "Why does the man mention the Tokyo office?",
          choices: ["It employs an interpreter", "It designed the new product", "It will host the demonstration", "It received a lower vendor quote"], answer: 0,
          explanation: "男士提到東京辦公室有專職口譯員，目的是提出日文翻譯的替代解決方案。",
          translation: "男士為何提到東京辦公室？", tags: ["speaker-intent", "solution"]
        },
        {
          id: "P3-G23-Q3", prompt: "What does the woman imply about the schedule?",
          choices: ["It has already been sent to the vendor", "It includes a second demonstration", "It can remain unchanged if the interpreter is free", "It must be shortened for overseas clients"], answer: 2,
          explanation: "女士說若口譯員有空，就能 avoid changing the schedule，意即目前時程可維持不變。",
          translation: "女士對時程有何暗示？", tags: ["inference", "condition"]
        }
      ]
    },
    {
      groupId: "P4-G19", part: "4", difficulty: "600", category: "行李追蹤更新",
      audioText: "Speaker: Travelers arriving on Flight 482 should collect checked luggage at Carousel Six. Because one scanning station is being repaired, the airline's mobile app may show a baggage update several minutes late. Please rely on the display above the carousel for the most current information. Oversized items, including bicycles and musical instruments, will be delivered to the service counter beside Carousel Eight. Keep your baggage receipt until you have collected all of your items.",
      audioTranslation: "播音員：搭乘 482 航班抵達的旅客，請到第六號行李轉盤領取託運行李。由於一座掃描站正在維修，航空公司的行動應用程式可能會延遲數分鐘顯示行李更新。最新資訊請以轉盤上方的顯示器為準。自行車和樂器等超大型物品將送至第八號轉盤旁的服務櫃台。在領齊所有物品前，請保留行李收據。",
      tags: ["listening", "talk", "airport", "mobile-app"],
      questions: [
        {
          id: "P4-G19-Q1", prompt: "What is the purpose of the announcement?",
          choices: ["To explain where passengers should collect baggage", "To advertise an airline mobile application", "To report a change in a flight's departure time", "To request volunteers at a service counter"], answer: 0,
          explanation: "公告主要告知 482 航班旅客一般行李與大型物品的領取位置，並提醒資訊來源與收據保留。",
          translation: "這則公告的目的是什麼？", tags: ["purpose"]
        },
        {
          id: "P4-G19-Q2", prompt: "Why might information in the mobile app be delayed?",
          choices: ["A flight arrived early", "A scanning station is under repair", "The carousel display is being replaced", "The service counter has moved"], answer: 1,
          explanation: "原文直接指出 Because one scanning station is being repaired，行動應用程式的更新可能延遲。",
          translation: "為何行動應用程式中的資訊可能延遲？", tags: ["reason", "detail"]
        },
        {
          id: "P4-G19-Q3", prompt: "Where should a passenger collect a bicycle?",
          choices: ["At Carousel Six", "Above the carousel display", "At the counter beside Carousel Eight", "At the scanning station"], answer: 2,
          explanation: "公告把 bicycles 列為 oversized items，並說這類物品會送到第八號轉盤旁的服務櫃台。",
          translation: "旅客應到哪裡領取自行車？", tags: ["location", "detail"]
        }
      ]
    },
    {
      groupId: "P4-G20", part: "4", difficulty: "800", category: "門市太陽能維護",
      audioText: "Speaker: Good morning, store managers. The energy-monitoring portal will be offline tonight from nine until midnight while technicians recalibrate the rooftop solar meters. This work will not interrupt electricity in any store. However, automated energy reports scheduled during that period will be generated tomorrow morning instead. Managers do not need to submit manual readings unless an alert remains visible after the portal returns. A short guide to the updated dashboard will be posted in the operations library on Friday.",
      audioTranslation: "播音員：各位門市經理早安。今晚九點到午夜，技術人員將重新校準屋頂太陽能電表，因此能源監控平台會暫時離線。這項工作不會中斷任何門市的供電。不過，原訂在該時段產生的自動能源報告將改於明早產生。除非平台恢復後警示仍顯示，否則經理不必提交人工讀數。更新版儀表板的簡短指南將於星期五上傳至營運資料庫。",
      tags: ["listening", "talk", "energy", "maintenance"],
      questions: [
        {
          id: "P4-G20-Q1", prompt: "Why will the monitoring portal be unavailable?",
          choices: ["New stores are being added", "Solar meters are being recalibrated", "Managers are entering manual readings", "The operations library is moving"], answer: 1,
          explanation: "公告說技術人員重新校準屋頂太陽能電表，因此監控平台於晚間暫停服務。",
          translation: "監控平台為何會無法使用？", tags: ["reason"]
        },
        {
          id: "P4-G20-Q2", prompt: "What will happen to reports scheduled during the maintenance period?",
          choices: ["They will be canceled", "They will require manager approval", "They will be produced the next morning", "They will be sent to technicians"], answer: 2,
          explanation: "原文說該時段的自動報告 will be generated tomorrow morning instead，答案是隔天早上產生。",
          translation: "原訂在維護期間產生的報告會如何處理？", tags: ["sequence", "detail"]
        },
        {
          id: "P4-G20-Q3", prompt: "Under what condition should managers submit manual readings?",
          choices: ["If a store loses electricity", "If a report arrives before midnight", "If the updated guide is unavailable", "If an alert remains after the portal is restored"], answer: 3,
          explanation: "公告明確限定 unless an alert remains visible after the portal returns；只有平台恢復後警示仍存在，才需提交人工讀數。",
          translation: "在什麼情況下經理應提交人工讀數？", tags: ["condition", "detail"]
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
