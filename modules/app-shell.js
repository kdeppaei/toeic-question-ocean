window.TOEIC_APP_SHELL = {
  version: "2.8.0",
  release: {
    title: "大量新增高品質原創模擬題，題海推進到 700 題",
    summary: "本版新增 80 題多益風格原創模擬題，涵蓋 Part 2 問答、Part 3 對話、Part 4 獨白、Part 5 文法字彙、Part 6 文章填空與 Part 7 單篇／雙篇／三篇閱讀；每題保留中文翻譯、詳解與來源註記，避免使用未授權真題。",
    badges: ["v2.8.0 題海擴充", "700 題", "新增 80 題", "Part 2-7 全面補強"]
  },
  viewTitles: {
    homeView: "多益題海學習儀表板",
    setupView: "建立練習",
    practiceView: "作答練習",
    resultView: "成績報告",
    wrongView: "錯題本",
    vocabView: "個人單字本",
    autoVocabView: "題庫單字庫",
    vocabReviewView: "單字複習",
    strategyView: "答題技巧專區",
    historyView: "歷史成績",
    analyticsView: "弱點分析",
    storageView: "儲存中心",
    bankView: "題庫管理"
  },
  partModules: [
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
  storageContracts: [
    { area: "Cookie", owner: "dailyGoal", description: "每日目標與最後造訪日期" },
    { area: "Local Storage", owner: "learningState", description: "題庫、錯題、成績、單字、品質標記" },
    { area: "Session Storage", owner: "scratchpad", description: "單一分頁的暫存筆記" }
  ]
};
