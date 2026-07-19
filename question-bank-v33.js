(() => {
  const sourceNote = "Original Part 1 simulation item written for an AI-generated workplace image created for this project.";
  const items = [
    {
      id: "P1-013",
      image: "assets/part1/ev-charging-ai-v4.jpg",
      choices: [
        "A charging cable is being connected to a vehicle.",
        "The windshield is being washed.",
        "A mechanic is replacing a tire.",
        "Some boxes are being unloaded from the trunk."
      ],
      answer: 0,
      explanation: "男子正把充電接頭插入車身後側的充電口。畫面中沒有清洗擋風玻璃、更換輪胎或從行李廂卸貨。",
      answerTranslation: "一條充電線正被接上車輛。",
      difficulty: "600",
      skillTags: ["detail-observation", "technology-context"]
    },
    {
      id: "P1-014",
      image: "assets/part1/housekeeping-ai-v4.jpg",
      choices: [
        "A bed is being moved through the hallway.",
        "A housekeeper is folding towels beside a cart.",
        "The cart has been loaded with cardboard boxes.",
        "Someone is vacuuming the carpet."
      ],
      answer: 1,
      explanation: "房務人員站在工作推車旁摺疊白色毛巾。走廊上沒有搬床、紙箱或吸塵作業。",
      answerTranslation: "一名房務人員正在推車旁摺疊毛巾。",
      difficulty: "400",
      skillTags: ["detail-observation", "workplace-context"]
    },
    {
      id: "P1-015",
      image: "assets/part1/high-shelf-ai-v4.jpg",
      choices: [
        "The storage shelves are completely empty.",
        "A ladder has been folded against a wall.",
        "A worker is placing a box on a high shelf.",
        "Some boxes are being carried outdoors."
      ],
      answer: 2,
      explanation: "工作人員站在梯子上，雙手正把紙箱放到較高的貨架。貨架並非空的，梯子也沒有收起。",
      answerTranslation: "一名工作人員正在把箱子放上高處的架子。",
      difficulty: "600",
      skillTags: ["detail-observation", "spatial-relation"]
    },
    {
      id: "P1-016",
      image: "assets/part1/transit-map-ai-v4.jpg",
      choices: [
        "Passengers are boarding a train.",
        "A traveler is buying a ticket from a machine.",
        "The transit shelter is completely empty.",
        "Two commuters are comparing transit maps."
      ],
      answer: 3,
      explanation: "兩名通勤者手持紙本路線圖，旁邊也有大型路線圖，顯示他們正在比對交通資訊；畫面沒有列車或售票機。",
      answerTranslation: "兩名通勤者正在比較交通路線圖。",
      difficulty: "600",
      skillTags: ["visual-literacy", "context-evidence"]
    },
    {
      id: "P1-017",
      image: "assets/part1/window-measure-ai-v4.jpg",
      choices: [
        "A worker is measuring the width of a window frame.",
        "Some curtains are being hung.",
        "The glass is being cleaned.",
        "The window frame is being painted."
      ],
      answer: 0,
      explanation: "工作人員將捲尺水平拉過窗框，正在量測寬度。畫面中沒有窗簾、清潔工具或油漆刷。",
      answerTranslation: "一名工作人員正在測量窗框的寬度。",
      difficulty: "600",
      skillTags: ["detail-observation", "tool-purpose"]
    },
    {
      id: "P1-018",
      image: "assets/part1/cafe-chairs-ai-v4.jpg",
      choices: [
        "Customers are being served at the tables.",
        "The tables have been covered with tablecloths.",
        "Several chairs have been stacked beside cafe tables.",
        "The awning has been folded above the entrance."
      ],
      answer: 2,
      explanation: "數張椅子整齊堆疊在咖啡館桌子旁。桌面沒有桌巾或顧客，遮陽棚則是展開狀態。",
      answerTranslation: "幾張椅子堆疊在咖啡館桌子旁。",
      difficulty: "800",
      skillTags: ["visual-literacy", "object-state"]
    }
  ];

  window.BUILTIN_BANK.push(...items.map((item) => ({
    ...item,
    part: "1",
    category: "圖片描述",
    prompt: "Look at the picture and select the sentence that best describes it.",
    translation: "請看圖片，選出最符合畫面的敘述。",
    passage: "",
    audioText: item.choices.map((choice, index) => `${String.fromCharCode(65 + index)}. ${choice}`).join(" "),
    audioTranslation: item.answerTranslation,
    imageAlt: "Part 1 question photograph.",
    imageOrigin: "ai-generated",
    imageGenerator: "OpenAI",
    imageLicense: "本專案原創模擬素材",
    imageLicenseUrl: "",
    tags: ["part1", "photo-description", "listening", "ai-generated", ...(item.skillTags || [])],
    sourceNote
  })));
})();
