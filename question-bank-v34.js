(() => {
  const sourceNote = "Original Part 1 simulation item written for an AI-generated workplace image created for this project.";
  const items = [
    {
      id: "P1-019",
      image: "assets/part1/access-badge-ai-v5.jpg",
      choices: [
        "A receptionist is arranging flowers on a counter.",
        "A woman is tapping an access card on a turnstile reader.",
        "The glass doors are being cleaned.",
        "Some luggage is being carried through the lobby."
      ],
      answer: 1,
      explanation: "女子將門禁卡靠近旋轉閘門的讀卡區。她沒有整理花卉、清潔玻璃門或搬運行李。",
      answerTranslation: "一名女子正在旋轉閘門的讀卡機上感應門禁卡。",
      difficulty: "600",
      skillTags: ["detail-observation", "tool-purpose", "technology-context"]
    },
    {
      id: "P1-020",
      image: "assets/part1/package-tape-ai-v5.jpg",
      choices: [
        "The worker is scanning a shipping label.",
        "Several boxes are being placed on a shelf.",
        "A worker is sealing a package with tape.",
        "Packing material is being removed from a box."
      ],
      answer: 2,
      explanation: "工作人員正用膠帶台沿著紙箱頂部封箱；他沒有掃描標籤、把箱子上架或取出包材。",
      answerTranslation: "一名工作人員正在用膠帶封住包裹。",
      difficulty: "400",
      skillTags: ["detail-observation", "tool-purpose"]
    },
    {
      id: "P1-021",
      image: "assets/part1/thermostat-ai-v5.jpg",
      choices: [
        "A worker is adjusting a wall-mounted thermostat.",
        "A picture is being hung in a hallway.",
        "The wall is being painted.",
        "Some wiring is being removed from the ceiling."
      ],
      answer: 0,
      explanation: "工作人員伸手按下牆上的恆溫器控制面板。畫面沒有掛畫、油漆或拆除天花板線路。",
      answerTranslation: "一名工作人員正在調整壁掛式恆溫器。",
      difficulty: "600",
      skillTags: ["detail-observation", "tool-purpose", "workplace-context"]
    },
    {
      id: "P1-022",
      image: "assets/part1/training-room-ai-v5.jpg",
      choices: [
        "The chairs have been stacked beside the wall.",
        "Several people are watching a presentation.",
        "Tables are arranged around the edge of the room.",
        "Rows of chairs are facing a presentation screen."
      ],
      answer: 3,
      explanation: "空教室中的椅子分列成數排，全部朝向前方的簡報幕。椅子沒有堆疊，現場也沒有人或桌子。",
      answerTranslation: "一排排椅子面向簡報幕。",
      difficulty: "600",
      skillTags: ["visual-literacy", "spatial-relation", "object-state"]
    },
    {
      id: "P1-023",
      image: "assets/part1/bicycle-lock-ai-v5.jpg",
      choices: [
        "A bicycle is being loaded onto a vehicle.",
        "A commuter is fastening a bicycle to a rack.",
        "The bicycle's rear tire is being replaced.",
        "Several cyclists are riding past an office."
      ],
      answer: 1,
      explanation: "通勤者將鎖具環繞自行車車架與停車架，正在固定自行車；畫面沒有車輛、換胎或其他騎士。",
      answerTranslation: "一名通勤者正在把自行車鎖在停車架上。",
      difficulty: "600",
      skillTags: ["detail-observation", "tool-purpose", "spatial-relation"]
    },
    {
      id: "P1-024",
      image: "assets/part1/library-cart-ai-v5.jpg",
      choices: [
        "A librarian is placing a book on a rolling cart.",
        "Books are being packed into cardboard boxes.",
        "A customer is reading at a table.",
        "The shelves are being moved across the room."
      ],
      answer: 0,
      explanation: "圖書館員雙手拿著書，正將它放到有輪子的書車上；畫面沒有紙箱、閱讀桌或移動書架。",
      answerTranslation: "一名圖書館員正在把書放到推車上。",
      difficulty: "400",
      skillTags: ["detail-observation", "workplace-context"]
    },
    {
      id: "P1-025",
      image: "assets/part1/cable-coil-ai-v5.jpg",
      choices: [
        "A technician is carrying a speaker onto a stage.",
        "The floor is being cleaned with a machine.",
        "A cable is being connected to a wall outlet.",
        "A technician is coiling an electrical cable."
      ],
      answer: 3,
      explanation: "技術人員雙手整理多圈電纜，正在將它捲收。電纜沒有接到插座，也沒有人搬喇叭或清潔地面。",
      answerTranslation: "一名技術人員正在捲收電纜。",
      difficulty: "600",
      skillTags: ["detail-observation", "tool-purpose", "object-state"]
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
