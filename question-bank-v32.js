(() => {
  const sourceNote = "Original Part 1 simulation item written for an AI-generated workplace image created for this project.";
  const items = [
    {
      id: "P1-009",
      image: "assets/part1/reception-ai-v3.jpg",
      choices: [
        "A visitor is signing a form.",
        "A woman is speaking on the phone at a reception desk.",
        "Some chairs are being carried through the lobby.",
        "A computer is being packed into a box."
      ],
      answer: 1,
      explanation: "女子坐在接待櫃台後方，手持電話聽筒交談；畫面中沒有訪客填表、搬運椅子或裝箱電腦。",
      answerTranslation: "一名女子正在接待櫃台講電話。",
      difficulty: "400"
    },
    {
      id: "P1-010",
      image: "assets/part1/solar-ai-v3.jpg",
      choices: [
        "A technician is inspecting a row of solar panels.",
        "The panels are covered with snow.",
        "A worker is painting the roof.",
        "Some equipment is being loaded into a truck."
      ],
      answer: 0,
      explanation: "技術人員跪在太陽能板旁，正使用儀表檢查設備；屋頂上沒有積雪、油漆作業或卡車。",
      answerTranslation: "一名技術人員正在檢查一排太陽能板。",
      difficulty: "600"
    },
    {
      id: "P1-011",
      image: "assets/part1/barcode-ai-v3.jpg",
      choices: [
        "A worker is stacking some empty pallets.",
        "A package is being wrapped with a ribbon.",
        "A worker is scanning a label on a package.",
        "Some boxes are displayed in a refrigerator."
      ],
      answer: 2,
      explanation: "物流人員手持掃描器，對準工作桌上紙箱的標籤；畫面中沒有棧板、緞帶或冷藏展示櫃。",
      answerTranslation: "一名工作人員正在掃描包裹上的標籤。",
      difficulty: "400"
    },
    {
      id: "P1-012",
      image: "assets/part1/plants-ai-v3.jpg",
      choices: [
        "Some furniture is being polished.",
        "A tree is being planted outdoors.",
        "Several people are waiting for an elevator.",
        "A woman is watering potted plants in a lobby."
      ],
      answer: 3,
      explanation: "女子在室內大廳使用澆水壺照顧一排盆栽；她沒有擦拭家具、在戶外種樹或等候電梯。",
      answerTranslation: "一名女子正在大廳裡為盆栽澆水。",
      difficulty: "400"
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
    tags: ["part1", "photo-description", "listening", "ai-generated"],
    sourceNote
  })));
})();
