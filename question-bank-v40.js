(() => {
  const sourceNote = "Original TOEIC-style Part 2 simulation item. Public official samples were used only to study format and pacing; no official item text was copied.";
  const items = [
    {
      id: "P2-087", difficulty: "600", category: "人物辨識", audioSpeaker: "female",
      audioText: "Who approved the revised travel policy?",
      choices: ["The trip takes about three hours.", "Ms. Delgado said she would.", "It is available on the intranet."], answer: 1,
      explanation: "Who 詢問核准者；Ms. Delgado said she would 省略 approve it，是自然的人物回答。",
      answerTranslation: "Delgado 女士說她會核准。", tags: ["listening","part2","who","elliptical-response"]
    },
    {
      id: "P2-088", difficulty: "600", category: "原因辨識", audioSpeaker: "male",
      audioText: "Why hasn't the courier arrived yet?",
      choices: ["At the reception desk.", "Two large envelopes.", "The highway is closed for repairs."], answer: 2,
      explanation: "Why hasn't...? 詢問尚未抵達的原因；道路施工封閉可合理解釋延誤。",
      answerTranslation: "高速公路因維修而封閉。", tags: ["listening","part2","why","delay"]
    },
    {
      id: "P2-089", difficulty: "400", category: "地點辨識", audioSpeaker: "female",
      audioText: "Where should I store the replacement filters?",
      choices: ["On the shelf beside the maintenance office.", "They were replaced yesterday.", "The air conditioner is quieter now."], answer: 0,
      explanation: "Where 詢問存放地點；on the shelf... 提供明確位置。",
      answerTranslation: "放在維修辦公室旁的架子上。", tags: ["listening","part2","where","maintenance"]
    },
    {
      id: "P2-090", difficulty: "400", category: "請求回應", audioSpeaker: "male",
      audioText: "Could you send me the revised seating chart?",
      choices: ["The auditorium seats two hundred.", "I'll attach it to an email now.", "No, the meeting starts at nine."], answer: 1,
      explanation: "Could you...? 是請求；I'll attach it... 表示立刻配合。",
      answerTranslation: "我現在就把它附在電子郵件裡。", tags: ["listening","part2","request","future-action"]
    },
    {
      id: "P2-091", difficulty: "600", category: "否定問句", audioSpeaker: "female",
      audioText: "Isn't the copier warranty still valid?",
      choices: ["The copies are on my desk.", "A technician fixed the scanner.", "No, it expired last month."], answer: 2,
      explanation: "否定問句是在確認保固狀態；No, it expired... 直接修正原先假設。",
      answerTranslation: "不，保固上個月到期了。", tags: ["listening","part2","negative-question","warranty"]
    },
    {
      id: "P2-092", difficulty: "400", category: "頻率辨識", audioSpeaker: "male",
      audioText: "How often are the laboratory scales recalibrated?",
      choices: ["Every six months.", "By a certified technician.", "In the equipment cabinet."], answer: 0,
      explanation: "How often 詢問頻率；every six months 是頻率回答。",
      answerTranslation: "每六個月一次。", tags: ["listening","part2","frequency","laboratory"]
    },
    {
      id: "P2-093", difficulty: "600", category: "選擇辨識", audioSpeaker: "female",
      audioText: "Which loading dock is the produce shipment going to?",
      choices: ["About forty crates.", "The one behind Warehouse B.", "It arrived before sunrise."], answer: 1,
      explanation: "Which 詢問特定碼頭；the one behind Warehouse B 指出選定地點。",
      answerTranslation: "B 倉庫後方的那個碼頭。", tags: ["listening","part2","which","shipping"]
    },
    {
      id: "P2-094", difficulty: "400", category: "時間辨識", audioSpeaker: "male",
      audioText: "When will the auditors meet with the finance team?",
      choices: ["In the finance director's office.", "They reviewed the annual report.", "Right after lunch."], answer: 2,
      explanation: "When 詢問時間；right after lunch 提供明確時段。",
      answerTranslation: "午餐後立刻。", tags: ["listening","part2","when","audit"]
    },
    {
      id: "P2-095", difficulty: "600", category: "陳述回應", audioSpeaker: "female",
      audioText: "The east entrance will be closed during the renovation.",
      choices: ["Then I'll use the parking-garage entrance.", "The contractor submitted an estimate.", "It closes at seven on weekdays."], answer: 0,
      explanation: "對入口封閉的陳述，改走停車場入口是最合理的後續回應。",
      answerTranslation: "那我會改走停車場入口。", tags: ["listening","part2","statement","next-action"]
    },
    {
      id: "P2-096", difficulty: "600", category: "委婉請求", audioSpeaker: "male",
      audioText: "Would you mind checking these sales figures again?",
      choices: ["Sales increased in the northern region.", "Sure, which quarter should I start with?", "The figures are printed in blue."], answer: 1,
      explanation: "Would you mind...? 是委婉請求；Sure... 接受並確認工作範圍。",
      answerTranslation: "當然，要從哪一季開始？", tags: ["listening","part2","request","indirect-response"]
    },
    {
      id: "P2-097", difficulty: "800", category: "提議判斷", audioSpeaker: "female",
      audioText: "Should we postpone the software demonstration?",
      choices: ["The software license is renewable.", "It was demonstrated in the lobby.", "Let's wait for the client's reply first."], answer: 2,
      explanation: "Should we...? 提出決策；先等客戶回覆是保留式、但自然的間接回答。",
      answerTranslation: "我們先等客戶回覆吧。", tags: ["listening","part2","suggestion","indirect-response"]
    },
    {
      id: "P2-098", difficulty: "400", category: "期間辨識", audioSpeaker: "male",
      audioText: "How long is the conference room reserved for?",
      choices: ["Until four thirty.", "For the regional managers.", "On the twelfth floor."], answer: 0,
      explanation: "How long 詢問持續時間；until four thirty 表示預約到何時。",
      answerTranslation: "到四點半。", tags: ["listening","part2","duration","reservation"]
    },
    {
      id: "P2-099", difficulty: "400", category: "時間辨識", audioSpeaker: "female",
      audioText: "What time does the airport shuttle leave?",
      choices: ["From the main hotel entrance.", "It holds twelve passengers.", "At a quarter past six."], answer: 2,
      explanation: "What time 詢問時刻；at a quarter past six 表示六點十五分。",
      answerTranslation: "六點十五分。", tags: ["listening","part2","time","transportation"]
    },
    {
      id: "P2-100", difficulty: "600", category: "人物辨識", audioSpeaker: "male",
      audioText: "Who's giving the orientation to the new interns?",
      choices: ["The session lasts all morning.", "Daniel from human resources is.", "In the training suite."], answer: 1,
      explanation: "Who's giving...? 詢問負責人；Daniel... is 省略 giving the orientation。",
      answerTranslation: "人力資源部的 Daniel。", tags: ["listening","part2","who","orientation"]
    },
    {
      id: "P2-101", difficulty: "600", category: "提議回應", audioSpeaker: "female",
      audioText: "Why don't we move tomorrow's training session online?",
      choices: ["That would solve the room shortage.", "The training manual is on my desk.", "Because the network was upgraded."], answer: 0,
      explanation: "Why don't we...? 是提議而非問原因；That would solve... 表示贊成。",
      answerTranslation: "那樣就能解決教室不足的問題。", tags: ["listening","part2","suggestion","function-over-keyword"]
    },
    {
      id: "P2-102", difficulty: "800", category: "否定完成問句", audioSpeaker: "male",
      audioText: "Haven't the revised invoices been sent to the clients?",
      choices: ["The clients requested itemized bills.", "They're still waiting for the director's signature.", "We sent three sales representatives."], answer: 1,
      explanation: "問發票是否已寄出；still waiting for... 間接表示尚未寄出並說明原因。",
      answerTranslation: "它們還在等主管簽名。", tags: ["listening","part2","negative-question","status"]
    },
    {
      id: "P2-103", difficulty: "400", category: "地點辨識", audioSpeaker: "female",
      audioText: "Where did you put the inspection forms?",
      choices: ["The inspection took two hours.", "I filled out all six forms.", "In the top drawer of the filing cabinet."], answer: 2,
      explanation: "Where 詢問表單位置；in the top drawer... 提供具體地點。",
      answerTranslation: "在檔案櫃最上層的抽屜裡。", tags: ["listening","part2","where","documents"]
    },
    {
      id: "P2-104", difficulty: "600", category: "許可請求", audioSpeaker: "male",
      audioText: "Can I borrow the barcode scanner for a few minutes?",
      choices: ["As soon as I finish this inventory check.", "The barcodes were printed yesterday.", "It takes only a few minutes."], answer: 0,
      explanation: "Can I borrow...? 是許可請求；as soon as... 表示稍後可以借，是自然間接回答。",
      answerTranslation: "等我完成這次庫存檢查就可以。", tags: ["listening","part2","permission","indirect-response"]
    },
    {
      id: "P2-105", difficulty: "800", category: "陳述推論", audioSpeaker: "female",
      audioText: "The data migration will take two hours longer than expected.",
      choices: ["The database contains customer records.", "It was expected by the technical team.", "Then let's notify the evening-shift staff."], answer: 2,
      explanation: "移轉延長會影響晚班；通知晚班員工是最合理的情境反應。",
      answerTranslation: "那我們通知晚班員工吧。", tags: ["listening","part2","statement","inference"]
    },
    {
      id: "P2-106", difficulty: "600", category: "數量辨識", audioSpeaker: "male",
      audioText: "How many candidates have confirmed their interview times?",
      choices: ["The interviews begin on Monday.", "Six have confirmed so far.", "In the human resources office."], answer: 1,
      explanation: "How many 詢問數量；six have confirmed 提供人數。",
      answerTranslation: "目前有六位已確認。", tags: ["listening","part2","quantity","recruiting"]
    }
  ];

  window.BUILTIN_BANK.push(...items.map(item=>({
    ...item,
    part: "2",
    prompt: "Choose the best response.",
    translation: "請選出最佳回應。",
    passage: "",
    sourceNote
  })));
})();
