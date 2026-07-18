(() => {
  const sourceNote = "Original advanced inversion simulation item for v2.10.0.";
  const corrections = {
    "P5-027": {
      explanation: "先還原為 If we had known about the road closure。省略 if 後，將 had 移到主詞 we 前面，形成 Had we known；這是與過去事實相反的條件倒裝。",
      tags: ["inversion", "conditional-inversion", "past-unreal"]
    },
    "P5-073": {
      answer: 1,
      explanation: "先還原正常語序：The building was open to the public only after the final inspection。Not until 置首後，主句的 be 動詞移到主詞前，成為 was the building open。空格後已經有主詞 the building，因此 was it 會形成 it the building 的雙主詞錯誤。",
      tags: ["reading", "grammar", "inversion", "negative-fronting", "be-inversion"]
    },
    "P5-085": {
      explanation: "先還原為 The error disappeared only after the software was updated。disappear 是一般動詞，Only after 置首後要補 did 並把 disappeared 還原成 disappear：did the error disappear。",
      tags: ["reading", "grammar", "inversion", "restrictive-fronting", "do-support"]
    },
    "P5-122": {
      explanation: "正常語序是 We rarely receive such a large number of applicants。receive 是一般動詞，Rarely 置首後使用 do-support：do we receive；不能寫 we receive，因為主句必須部分倒裝。",
      tags: ["reading", "grammar", "inversion", "negative-fronting", "do-support"]
    },
    "P5-125": {
      explanation: "Had the invoice been submitted earlier 等於 If the invoice had been submitted earlier。省略 if 後將 had 移到主詞前；主句描述與過去事實相反的結果，因此用 would have been processed。",
      tags: ["subjunctive", "inversion", "conditional-inversion", "past-unreal"]
    },
    "P5-127": {
      explanation: "正常語序是 The manual is so detailed that ...。將 So + 形容詞置首強調時，be 動詞移到主詞前：So detailed is the manual that ...。",
      tags: ["inversion", "so-that", "be-inversion"]
    },
    "P5-139": {
      explanation: "正常語序是 We rarely receive such a detailed response。receive 是一般動詞，Rarely 置首後要補 do 並放在主詞 we 前：do we receive。",
      tags: ["inversion", "adverb", "negative-fronting", "do-support"]
    },
    "P5-244": {
      explanation: "Should you need technical assistance 等於 If you should need technical assistance。條件句省略 if 後，把助動詞 should 移到主詞 you 前；Were 與 Had 都不符合 need 的動詞結構。",
      tags: ["part5", "inversion", "condition", "conditional-inversion"]
    }
  };

  Object.entries(corrections).forEach(([id, patch]) => {
    const question = window.BUILTIN_BANK.find((item) => item.id === id);
    if (!question) return;
    const mergedTags = [...new Set([...(question.tags || []), ...(patch.tags || [])])];
    Object.assign(question, patch, { tags: mergedTags });
  });

  const items = [
    {
      id: "P5-261",
      prompt: "Not until the quarterly audit _____ the discrepancy visible to management.",
      choices: ["did", "was", "was it", "it was"],
      answer: 1,
      explanation: "正常語序是 The discrepancy was not visible to management until the quarterly audit。visible 是形容詞，主要動詞是 was；Not until 置首後直接倒裝為 was the discrepancy visible。空格後已有主詞，不能再加入 it。",
      translation: "直到季度稽核時，管理階層才看出這項差異。",
      tags: ["negative-fronting", "be-inversion"]
    },
    {
      id: "P5-262",
      prompt: "Not until the finance team compared both invoices _____ they discover the duplicate charge.",
      choices: ["did", "were", "had", "do"],
      answer: 0,
      explanation: "正常語序是 They did not discover the duplicate charge until ...。discover 是一般動詞，Not until 置首後補過去式助動詞 did，並使用原形 discover。",
      translation: "直到財務團隊比對兩張發票後，他們才發現重複收費。",
      tags: ["negative-fronting", "do-support"]
    },
    {
      id: "P5-263",
      prompt: "Only after the vendor sent the replacement parts _____ the machine resume production.",
      choices: ["was", "had", "did", "has"],
      answer: 2,
      explanation: "正常語序是 The machine resumed production only after ...。resume 是一般動詞；Only after 置首後使用 did + 主詞 + 原形動詞：did the machine resume。",
      translation: "直到供應商寄出替換零件後，機器才恢復生產。",
      tags: ["restrictive-fronting", "do-support"]
    },
    {
      id: "P5-264",
      prompt: "Only when the backup server came online _____ the team able to restore the archived files.",
      choices: ["did", "was", "had", "could"],
      answer: 1,
      explanation: "正常語序是 The team was able to restore ... only when ...。be able to 的主要動詞是 was；Only when 置首後直接倒裝為 was the team able。",
      translation: "只有在備援伺服器上線後，團隊才能還原封存檔案。",
      tags: ["restrictive-fronting", "be-inversion", "technology"]
    },
    {
      id: "P5-265",
      prompt: "Never before _____ the committee received so many proposals in a single week.",
      choices: ["did", "has", "was", "is"],
      answer: 1,
      explanation: "received 在此是過去分詞；搭配 Never before 表示截至現在的經驗，使用現在完成式。Never 置首後將 has 移到主詞前：has the committee received。",
      translation: "該委員會從未在一週內收到這麼多提案。",
      tags: ["negative-fronting", "auxiliary-inversion", "present-perfect"]
    },
    {
      id: "P5-266",
      prompt: "Seldom _____ employees need to contact support after completing the guided installation.",
      choices: ["are", "have", "do", "did"],
      answer: 2,
      explanation: "正常語序是 Employees seldom need to contact support。need 是一般動詞且描述一般情況；Seldom 置首後補 do：do employees need。",
      translation: "員工完成引導式安裝後，很少需要聯絡技術支援。",
      tags: ["negative-fronting", "do-support", "technology"]
    },
    {
      id: "P5-267",
      prompt: "Rarely _____ the loading area this quiet during regular business hours.",
      choices: ["does", "is", "has", "can"],
      answer: 1,
      explanation: "this quiet 是形容詞補語，句子的主要動詞是 is。Rarely 置首後直接將 be 動詞放在主詞前：is the loading area this quiet。",
      translation: "正常營業時間內，裝卸區很少如此安靜。",
      tags: ["negative-fronting", "be-inversion"]
    },
    {
      id: "P5-268",
      prompt: "Under no circumstances _____ visitors enter the clean room without an authorized badge.",
      choices: ["are", "have", "may", "did"],
      answer: 2,
      explanation: "Under no circumstances 是否定限制片語，置首後主句部分倒裝。原句已有情態動詞 may，直接移到主詞 visitors 前：may visitors enter。",
      translation: "訪客在任何情況下都不得未持授權識別證進入無塵室。",
      tags: ["negative-fronting", "modal-inversion", "policy"]
    },
    {
      id: "P5-269",
      prompt: "Little _____ the project manager know that the vendor had already shipped the revised samples.",
      choices: ["was", "did", "had", "has"],
      answer: 1,
      explanation: "Little 在此表示「完全沒料到」，具有否定語意。know 是一般動詞，Little 置首後補過去式助動詞 did：Little did the project manager know。",
      translation: "專案經理完全不知道供應商早已寄出修訂樣品。",
      tags: ["negative-fronting", "do-support", "past-tense"]
    },
    {
      id: "P5-270",
      prompt: "No sooner _____ the contract been signed than the legal department requested an amendment.",
      choices: ["was", "did", "had", "has"],
      answer: 2,
      explanation: "固定句型是 No sooner had + 主詞 + 過去分詞 + than ...，表示前一動作剛完成，下一動作立刻發生。been signed 已是完成式被動，因此選 had。",
      translation: "合約才剛簽署，法務部門就要求修訂。",
      tags: ["negative-fronting", "past-perfect", "no-sooner"]
    },
    {
      id: "P5-271",
      prompt: "Hardly _____ the webinar begun when the connection failed.",
      choices: ["did", "was", "had", "has"],
      answer: 2,
      explanation: "固定句型是 Hardly had + 主詞 + 過去分詞 + when ...。begun 是 begin 的過去分詞，因此使用 had the webinar begun。",
      translation: "網路研討會才剛開始，連線就中斷了。",
      tags: ["negative-fronting", "past-perfect", "hardly-when", "technology"]
    },
    {
      id: "P5-272",
      prompt: "Not only _____ the update improve security, but it also reduced loading times.",
      choices: ["was", "did", "had", "has"],
      answer: 1,
      explanation: "Not only 置於句首且修飾主要子句時要部分倒裝。improve 是原形，後文 reduced 顯示過去時間，因此使用 did the update improve。",
      translation: "這次更新不僅提升安全性，也縮短了載入時間。",
      tags: ["negative-fronting", "do-support", "not-only", "technology"]
    },
    {
      id: "P5-273",
      prompt: "At no time _____ customer records accessible from the public network.",
      choices: ["did", "were", "had", "have"],
      answer: 1,
      explanation: "accessible 是形容詞補語，主要動詞是 were。At no time 置首後將 be 動詞移到主詞 customer records 前：were customer records accessible。",
      translation: "客戶資料從未能透過公共網路存取。",
      tags: ["negative-fronting", "be-inversion", "security"]
    },
    {
      id: "P5-274",
      prompt: "Only then _____ the finance team understand why the totals did not match.",
      choices: ["was", "had", "did", "has"],
      answer: 2,
      explanation: "understand 是一般動詞，Only then 置首後要部分倒裝。句意描述過去事件，因此補 did，並保留原形 understand。",
      translation: "直到那時，財務團隊才明白總額為何不一致。",
      tags: ["restrictive-fronting", "do-support"]
    },
    {
      id: "P5-275",
      prompt: "On no account _____ confidential files be sent through a personal e-mail account.",
      choices: ["did", "are", "should", "have"],
      answer: 2,
      explanation: "On no account 表示「絕不」，置首後要倒裝。句中已有被動原形 be sent，前面需接情態動詞 should：should confidential files be sent。",
      translation: "機密檔案絕不可透過私人電子郵件帳號寄送。",
      tags: ["negative-fronting", "modal-inversion", "security", "policy"]
    },
    {
      id: "P5-276",
      prompt: "Nowhere else _____ customers obtain the same repair service on weekends.",
      choices: ["are", "can", "has", "did"],
      answer: 1,
      explanation: "Nowhere else 具有否定限制語意，置首後要部分倒裝。原句的情態動詞 can 移到主詞 customers 前：can customers obtain。",
      translation: "顧客在其他任何地方都無法於週末取得同樣的維修服務。",
      tags: ["negative-fronting", "modal-inversion", "service"]
    },
    {
      id: "P5-277",
      prompt: "So effective _____ the revised schedule that all delayed inspections were completed by Friday.",
      choices: ["did", "was", "had", "it was"],
      answer: 1,
      explanation: "正常語序是 The revised schedule was so effective that ...。So + 形容詞置首強調時，將 be 動詞移到主詞前：So effective was the revised schedule。",
      translation: "修訂後的時程非常有效，使所有延誤的檢查都在週五前完成。",
      tags: ["so-that", "be-inversion", "emphatic-inversion"]
    },
    {
      id: "P5-278",
      prompt: "Such _____ the demand for the workshop that a second session was added.",
      choices: ["did", "had", "was", "it was"],
      answer: 2,
      explanation: "正常語序是 The demand for the workshop was such that ...。Such 置首強調時，be 動詞移到主詞前：Such was the demand。",
      translation: "工作坊需求如此熱烈，因此加開了第二場。",
      tags: ["such-that", "be-inversion", "emphatic-inversion"]
    },
    {
      id: "P5-279",
      prompt: "Neither _____ the supplier issue a refund, nor did it offer a replacement.",
      choices: ["was", "has", "did", "had"],
      answer: 2,
      explanation: "Neither 置首表示兩項否定時，第一個子句要倒裝。issue 是原形且後半句使用 did，故為 Neither did the supplier issue ... nor did it offer ...。",
      translation: "供應商既未退款，也未提供替換品。",
      tags: ["negative-fronting", "do-support", "neither-nor"]
    },
    {
      id: "P5-280",
      prompt: "The first quotation did not include installation, and neither _____ the revised quotation.",
      choices: ["was", "did", "has", "had"],
      answer: 1,
      explanation: "neither 表示後者也同樣不包含。前句使用 did not include，後句省略重複動詞 include，保留倒裝結構 neither did the revised quotation。",
      translation: "第一份報價未包含安裝費，修訂後的報價也沒有。",
      tags: ["negative-agreement", "do-support", "neither"]
    },
    {
      id: "P5-281",
      prompt: "The original estimate has not been approved, nor _____ the revised budget.",
      choices: ["is", "does", "has", "did"],
      answer: 2,
      explanation: "前句使用現在完成式 has not been approved。nor 連接相同否定情況時要倒裝，並沿用助動詞 has：nor has the revised budget。",
      translation: "原始估價尚未核准，修訂後的預算也尚未核准。",
      tags: ["negative-agreement", "auxiliary-inversion", "nor"]
    },
    {
      id: "P5-282",
      prompt: "_____ you require a printed receipt, select that option before submitting the form.",
      choices: ["Had", "Would", "Should", "Were"],
      answer: 2,
      explanation: "Should you require ... 等於 If you should require ...。條件句省略 if 後，將 should 移到主詞 you 前；這是正式商務用語。",
      translation: "如果您需要紙本收據，請在送出表單前選取該選項。",
      tags: ["conditional-inversion", "should-inversion", "formal-register"]
    },
    {
      id: "P5-283",
      prompt: "_____ the supplier to miss the second deadline, the contract would automatically be reviewed.",
      choices: ["Should", "Had", "Were", "Would"],
      answer: 2,
      explanation: "Were the supplier to miss ... 等於 If the supplier were to miss ...，表示較不可能的未來假設。Were + 主詞 + to V 是正式條件倒裝。",
      translation: "若供應商再次錯過期限，合約將自動進入審查。",
      tags: ["conditional-inversion", "were-to", "future-hypothetical"]
    },
    {
      id: "P5-284",
      prompt: "_____ the maintenance team known about the voltage issue, it would have tested the circuit first.",
      choices: ["Were", "Should", "Had", "Did"],
      answer: 2,
      explanation: "Had the maintenance team known ... 等於 If the maintenance team had known ...。這是與過去事實相反的條件句，省略 if 後將 had 移到主詞前。",
      translation: "如果維修團隊早知道電壓問題，就會先測試電路。",
      tags: ["conditional-inversion", "past-unreal", "had-inversion"]
    }
  ];

  window.BUILTIN_BANK.push(...items.map((item) => ({
    ...item,
    part: "5",
    difficulty: "800",
    category: "倒裝句",
    passage: "",
    audioText: "",
    tags: ["part5", "grammar", "inversion", ...item.tags],
    sourceNote
  })));
})();
