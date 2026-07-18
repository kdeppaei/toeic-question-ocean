(() => {
  const pexelsSourceNote = "Original Part 1 simulation item written for a locally stored Pexels-licensed photograph.";
  const generatedSourceNote = "Original Part 1 simulation item written for an AI-generated workplace image created for this project.";
  const items = [
    {
      id: "P1-001",
      image: "assets/part1/meeting-ai-v2.jpg",
      imageAlt: "Part 1 question photograph.",
      imageOrigin: "ai-generated",
      imageGenerator: "OpenAI",
      choices: [
        "A woman is writing on a whiteboard.",
        "Several people are gathered around a conference table.",
        "Some office chairs are being stacked.",
        "A man is repairing a computer."
      ],
      answer: 1,
      explanation: "照片中有數人坐在會議桌旁，桌上放著筆電、文件與平板，因此 gathered around a conference table 最符合畫面。",
      answerTranslation: "幾個人正聚在會議桌旁。",
      difficulty: "400"
    },
    {
      id: "P1-002",
      image: "assets/part1/warehouse.jpg",
      imageAlt: "Part 1 question photograph.",
      imageCredit: "Tiger Lily",
      imageSource: "https://www.pexels.com/photo/men-working-in-a-warehouse-4481260/",
      choices: [
        "Workers are standing between shelves of boxes.",
        "Boxes are being loaded onto a delivery truck.",
        "The warehouse shelves are completely empty.",
        "A worker is climbing a ladder."
      ],
      answer: 0,
      explanation: "照片從上方拍攝，數名工作人員站在堆放箱子的倉庫貨架之間；沒有卡車、空貨架或梯子。",
      answerTranslation: "工作人員正站在堆放箱子的貨架之間。",
      difficulty: "400"
    },
    {
      id: "P1-003",
      image: "assets/part1/airport.jpg",
      imageAlt: "Part 1 question photograph.",
      imageCredit: "Magic K",
      imageSource: "https://www.pexels.com/photo/busy-people-on-the-airport-terminal-6726195/",
      choices: [
        "Passengers are boarding a bus outdoors.",
        "The terminal seats have all been removed.",
        "Travelers are waiting in an airport terminal with luggage.",
        "A pilot is checking an aircraft engine."
      ],
      answer: 2,
      explanation: "畫面是機場候機區，多位旅客在座位與大型窗戶附近等候，並帶著行李。",
      answerTranslation: "旅客帶著行李在機場航廈內等候。",
      difficulty: "400"
    },
    {
      id: "P1-004",
      image: "assets/part1/construction.jpg",
      imageAlt: "Part 1 question photograph.",
      imageCredit: "Pexels User",
      imageSource: "https://www.pexels.com/photo/workers-at-work-on-street-9258891/",
      choices: [
        "Customers are entering a supermarket.",
        "The workers are painting the side of a building.",
        "Several bicycles are parked beside the road.",
        "Construction workers are standing behind a roadside barrier."
      ],
      answer: 3,
      explanation: "照片中的工人穿著安全背心與安全帽，站在道路施工圍欄後方。",
      answerTranslation: "施工人員正站在路邊的施工圍欄後方。",
      difficulty: "600"
    },
    {
      id: "P1-005",
      image: "assets/part1/restaurant-ai-v2.jpg",
      imageAlt: "Part 1 question photograph.",
      imageOrigin: "ai-generated",
      imageGenerator: "OpenAI",
      choices: [
        "The dining room is being swept.",
        "A server is carrying a tray of food.",
        "Customers are reading menus at an empty table.",
        "A chef is washing dishes in a kitchen."
      ],
      answer: 1,
      explanation: "畫面中央的餐廳服務人員正端著放有多份餐點的托盤。",
      answerTranslation: "一名服務人員正端著一盤食物。",
      difficulty: "400"
    },
    {
      id: "P1-006",
      image: "assets/part1/printer-ai-v2.jpg",
      imageAlt: "Part 1 question photograph.",
      imageOrigin: "ai-generated",
      imageGenerator: "OpenAI",
      choices: [
        "A man is operating an office printer.",
        "A man is carrying a stack of folders.",
        "The printer is being moved through a doorway.",
        "Some documents are being posted on a wall."
      ],
      answer: 0,
      explanation: "男子站在完整入鏡的辦公室影印機旁，手指正操作控制面板；他沒有搬文件或移動機器。",
      answerTranslation: "一名男子正在操作辦公室印表機。",
      difficulty: "400"
    },
    {
      id: "P1-007",
      image: "assets/part1/delivery.jpg",
      imageAlt: "Part 1 question photograph.",
      imageCredit: "Artem Podrez",
      imageSource: "https://www.pexels.com/photo/man-stacking-boxes-in-a-van-5025665/",
      choices: [
        "A vehicle is being washed.",
        "The boxes have been placed beside the road.",
        "A worker is placing a box inside a van.",
        "A customer is signing for a package."
      ],
      answer: 2,
      explanation: "工作人員手上拿著紙箱，正面向已堆放許多箱子的廂型車內部。",
      answerTranslation: "一名工作人員正把箱子放進廂型車裡。",
      difficulty: "400"
    },
    {
      id: "P1-008",
      image: "assets/part1/station.jpg",
      imageAlt: "Part 1 question photograph.",
      imageCredit: "ready made",
      imageSource: "https://www.pexels.com/photo/people-at-the-train-station-3921540/",
      choices: [
        "The railway tracks are being repaired.",
        "A train is crossing a bridge.",
        "Every platform is completely empty.",
        "Passengers are waiting on a train platform."
      ],
      answer: 3,
      explanation: "照片中可見多名乘客分散在車站月台上等候；鐵軌沒有施工，也沒有列車過橋。",
      answerTranslation: "乘客們正在火車月台上等候。",
      difficulty: "400"
    }
  ];

  window.BUILTIN_BANK.push(...items.map((item) => {
    const isGenerated = item.imageOrigin === "ai-generated";
    return {
      ...item,
      part: "1",
      category: "圖片描述",
      prompt: "Look at the picture and select the sentence that best describes it.",
      translation: "請看圖片，選出最符合畫面的敘述。",
      passage: "",
      audioText: item.choices.map((choice, index) => `${String.fromCharCode(65 + index)}. ${choice}`).join(" "),
      audioTranslation: item.answerTranslation,
      imageLicense: isGenerated ? "本專案原創模擬素材" : "Pexels License",
      imageLicenseUrl: isGenerated ? "" : "https://www.pexels.com/legal-pages/license/",
      tags: ["part1", "photo-description", "listening", isGenerated ? "ai-generated" : "pexels-license"],
      sourceNote: isGenerated ? generatedSourceNote : pexelsSourceNote
    };
  }));
})();
