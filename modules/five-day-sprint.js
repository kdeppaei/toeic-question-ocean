window.TOEIC_FIVE_DAY_SPRINT = {
  version: "0.2",
  handbookUrl: "./data/toeic-five-day-handbook-v0.1.json",
  errorTags: [
    { id: "V", label: "單字", detail: "不知道字義、片語或同義改寫" },
    { id: "G", label: "文法", detail: "詞性、時態、語態或句型判斷錯誤" },
    { id: "L", label: "聽辨", detail: "沒聽到、數字混淆或連音誤判" },
    { id: "P", label: "定位", detail: "找錯證據句或跨文件關係" },
    { id: "T", label: "陷阱", detail: "同字干擾、範圍偷換或過度推論" },
    { id: "C", label: "節奏", detail: "時間不足、跳題或操作失誤" }
  ],
  sources: [
    {
      id: "ets",
      name: "ETS 官方資源",
      role: "校準基準",
      ratio: 50,
      url: "https://www.ets.org/toeic/test-takers/prepare.html",
      uses: ["完整模考", "熟悉正式題型", "校準難度與出題語感"],
      note: "最後一天優先使用；網站只連結官方資源，不重製官方題目。"
    },
    {
      id: "abceed",
      name: "abceed",
      role: "智慧刷題",
      ratio: 30,
      url: "https://www.abceed.com/",
      uses: ["Part 2／5 短題", "AI 推薦與分數預測", "倍速、區間重播與跟讀"],
      note: "把外部錯題回填本站的主要錯因，避免只累積點題量。"
    },
    {
      id: "xdf",
      name: "新東方英語",
      role: "中文補強",
      ratio: 20,
      url: "https://yingyu.xdf.cn/",
      uses: ["Part 5 文法查漏", "商務字彙", "專項講解"],
      note: "部分 TOEIC 內容年代較早；使用前確認新版、新題型及所在地區可用性。"
    }
  ],
  days: [
    {
      day: 1,
      title: "Part 5 + Part 1",
      goal: "用短題找出主要弱點，建立六類錯因基準。",
      tasks: ["abceed 做 20-30 題 Part 5 診斷", "補詞性、主被動與連接詞", "練 Part 1 常見動作與位置表達"],
      cardCategories: ["總策略", "Part 5 詞性", "Part 5 動詞", "Part 5 連接詞", "Part 1"]
    },
    {
      day: 2,
      title: "Part 2 + Part 6",
      goal: "建立問句功能判斷，並練段落連貫。",
      tasks: ["Part 2 直接回答與間接回答各一輪", "用重播確認沒聽到或聽到不懂", "Part 6 練轉折、結果與補充"],
      cardCategories: ["Part 2", "Part 6"]
    },
    {
      day: 3,
      title: "Part 3 / 4",
      goal: "只預讀選項差異，抓轉折、原因與下一步。",
      tasks: ["abceed 練對話與獨白弱項", "每組只記一個主要錯因", "整理同義改寫，不抄整段逐字稿"],
      cardCategories: ["Part 3/4", "同義改寫"]
    },
    {
      day: 4,
      title: "Part 7",
      goal: "把時間留給證據定位與跨文件推論。",
      tasks: ["先辨識文件格式與關係", "每題標記答案證據句", "NOT／EXCEPT 最後做，卡住先跳"],
      cardCategories: ["Part 7 文件", "同義改寫"]
    },
    {
      day: 5,
      title: "完整模考",
      goal: "只校正正式節奏，不再大量碰新題。",
      tasks: ["用 ETS 官方素材完成不中斷模考", "依 V／G／L／P／T／C 壓縮錯題", "停止新增方法，保持睡眠"],
      cardCategories: ["總策略", "固定搭配", "易混字"]
    }
  ]
};
