window.TOEIC_APP_SHELL = {
  version: "4.7.0",
  release: {
    title: "整句填空與複合文件判讀",
    summary: "新增高難度 Part 6 整句銜接，以及合約、補助表單、行事曆與行銷圖表等跨文件推論題。",
    badges: ["v4.7.0", "1,083 題", "8 題 Part 6", "16 題 Part 7"]
  },
  viewTitles: {
    homeView: "多益題海學習儀表板",
    setupView: "建立練習",
    sprintView: "五天衝刺工作台",
    practiceView: "作答練習",
    resultView: "成績報告",
    wrongView: "錯題本",
    vocabView: "個人單字本",
    autoVocabView: "多益學習區",
    vocabReviewView: "單字複習",
    strategyView: "答題技巧專區",
    readingView: "閱讀素養專區",
    historyView: "歷史成績",
    analyticsView: "弱點分析",
    storageView: "儲存中心",
    bankView: "題庫管理"
  },
  partModules: [
    {
      part: "1",
      label: "圖片描述",
      description: "觀察人物動作、物品位置與場景狀態，搭配語音敘述。",
      focus: "先看主體正在做什麼，再排除照片中不存在的物件與動作。"
    },
    {
      part: "2",
      label: "應答",
      description: "疑問詞、提議、否定問句與自然回應。",
      focus: "先抓第一個疑問詞，再排除語意太直譯的陷阱。"
    },
    {
      part: "3",
      label: "對話",
      description: "職場與生活情境對話，搭配語音朗讀。",
      focus: "先讀題幹定位人物、地點、下一步行動。"
    },
    {
      part: "4",
      label: "獨白",
      description: "公告、語音留言與公共廣播。",
      focus: "鎖定目的、對象、時間數字與要求動作。"
    },
    {
      part: "5",
      label: "單句填空",
      description: "文法、詞性、介系詞與商務字彙。",
      focus: "用空格前後結構快速判斷詞性與搭配。"
    },
    {
      part: "6",
      label: "短文填空",
      description: "電子郵件、公告與備忘錄克漏字。",
      focus: "先看句內文法，再回到上下文補語氣與銜接。"
    },
    {
      part: "7",
      label: "閱讀理解",
      description: "Email、廣告、通知、職缺與雙篇／三篇閱讀。",
      focus: "先定位題目問法，再回文件交叉比對。"
    }
  ],
  readingIntroduction: {
    title: "READING TEST",
    english: "In the Reading test, you will read a variety of texts and answer several different types of reading comprehension questions. The entire Reading test will last 75 minutes. There are three parts, and directions are given for each part. You are encouraged to answer as many questions as possible within the time allowed. You must mark your answers on the separate answer sheet. Do not write your answers in your test book.",
    chinese: "閱讀測驗共 75 分鐘，包含 Part 5、6、7。請在時間內盡可能完成題目；正式紙筆測驗須將答案劃記在答案卡上。"
  },
  listeningIntroduction: {
    title: "LISTENING TEST",
    english: "In the Listening test, you will be asked to demonstrate how well you understand spoken English. The entire Listening test will last approximately 45 minutes. There are four parts, and directions are given for each part. You must mark your answers on the separate answer sheet. Do not write your answers in your test book.",
    chinese: "聽力測驗約 45 分鐘，包含 Part 1–4。各 Part 會先宣告作答指示；正式紙筆測驗須將答案劃記在答案卡上。"
  },
  partDirections: {
    "1": {
      title: "PART 1 照片描述",
      english: "For each question in this part, you will hear four statements about a picture in your test book. When you hear the statements, you must select the one statement that best describes what you see in the picture. Then find the number of the question on your answer sheet and mark your answer. The statements will not be printed in your test book and will be spoken only one time.",
      chinese: "每張照片會播放四個敘述，選出最符合圖片的一項。正式測驗不印出敘述且只播放一次。",
      metrics: ["四個敘述", "圖片判讀", "只播放 1 次"]
    },
    "2": {
      title: "PART 2 應答問題",
      english: "You will hear a question or statement and three responses spoken in English. They will not be printed in your test book and will be spoken only one time. Select the best response to the question or statement and mark the letter (A), (B), or (C) on your answer sheet.",
      chinese: "每題先播放問題或陳述，再播放三個回應。正式測驗不印出內容且只播放一次。",
      metrics: ["問題或陳述", "三個回應", "只播放 1 次"]
    },
    "3": {
      title: "PART 3 簡短對話",
      english: "You will hear some conversations between two or more people. You will be asked to answer three questions about what the speakers say in each conversation. Select the best response to each question and mark the letter (A), (B), (C), or (D) on your answer sheet. The conversations will not be printed in your test book and will be spoken only one time.",
      chinese: "每段對話搭配三題。正式測驗不印逐字稿且只播放一次；播放前先讀完三題題幹與選項。",
      metrics: ["每段 3 題", "四選一", "只播放 1 次"]
    },
    "4": {
      title: "PART 4 簡短獨白",
      english: "You will hear some talks given by a single speaker. You will be asked to answer three questions about what the speaker says in each talk. Select the best response to each question and mark the letter (A), (B), (C), or (D) on your answer sheet. The talks will not be printed in your test book and will be spoken only one time.",
      chinese: "每段獨白搭配三題。正式測驗不印逐字稿且只播放一次；先定位目的、對象、時間與下一步。",
      metrics: ["每段 3 題", "單一說話者", "只播放 1 次"]
    },
    "5": {
      title: "PART 5 句子填空",
      english: "A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence. Then mark the letter (A), (B), (C), or (D) on your answer sheet.",
      chinese: "每題有一個單字或片語空格。先判斷句子結構與詞性，再用語意及搭配確認答案。",
      metrics: ["單句填空", "四選一", "先結構後語意"]
    },
    "6": {
      title: "PART 6 段落填空",
      english: "Read the texts that follow. A word, phrase, or sentence is missing in parts of each text. Four answer choices for each question are given below the text. Select the best answer to complete the text. Then mark the letter (A), (B), (C), or (D) on your answer sheet.",
      chinese: "閱讀完整文章後補入單字、片語或句子。除句內文法外，也要檢查前後文邏輯與語氣。",
      metrics: ["完整文章", "字詞或句子插入", "檢查上下文"]
    },
    "7": {
      title: "PART 7 閱讀測驗",
      english: "In this part you will read a selection of texts, such as magazine and newspaper articles, e-mails, and instant messages. Each text or set of texts is followed by several questions. Select the best answer for each question and mark the letter (A), (B), (C), or (D) on your answer sheet.",
      chinese: "閱讀文章、電子郵件、即時訊息等單篇或多篇文件。先讀題幹，再回原文定位並交叉核對證據。",
      metrics: ["單篇／雙篇／三篇", "四選一", "回原文找證據"]
    }
  },
  storageContracts: [
    { area: "Cookie", owner: "dailyGoal", description: "每日目標與最後造訪日期" },
    { area: "Local Storage", owner: "learningState", description: "題庫、錯題、成績、逐題解析、單字、品質標記" },
    { area: "Session Storage", owner: "scratchpad", description: "單一分頁的暫存筆記" }
  ]
};
