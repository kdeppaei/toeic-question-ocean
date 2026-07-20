window.TOEIC_LEARNING_HUB = {
  grammarTopics: [
    {
      id: "sentence-core",
      level: "basic",
      title: "詞性與句子骨架",
      parts: ["5", "6"],
      score: "400–600",
      summary: "先找主詞與主要動詞，再用空格位置判斷要放名詞、動詞、形容詞或副詞。",
      rule: "S + V；S + V + O；S + linking verb + C",
      examples: [
        { en: "The revised schedule is available online.", zh: "修訂後的時程可在線上查看。", note: "available 是主詞補語。" },
        { en: "The committee carefully reviewed the proposal.", zh: "委員會仔細審查了提案。", note: "carefully 修飾動詞 reviewed。" }
      ],
      pitfalls: ["冠詞後通常接名詞或形容詞加名詞。", "空格前後都有完整子句時，通常不是再補一個主要動詞。"],
      matchTags: ["word-form", "noun", "verb", "adjective", "adverb"],
      matchCategories: ["詞性", "詞性判斷", "名詞", "動詞", "形容詞", "副詞"]
    },
    {
      id: "subject-verb",
      level: "basic",
      title: "主詞與動詞一致",
      parts: ["5"],
      score: "400–600",
      summary: "真正主詞可能被介系詞片語或關係子句隔開；動詞要和核心主詞一致。",
      rule: "Singular subject + singular verb；plural subject + plural verb",
      examples: [
        { en: "Each of the applicants is required to submit a résumé.", zh: "每位申請人都必須提交履歷。", note: "核心主詞 Each 是單數。" },
        { en: "The reports on the desk belong to Ms. Chen.", zh: "桌上的報告屬於陳女士。", note: "核心主詞 reports 是複數。" }
      ],
      pitfalls: ["of 後面的名詞不一定是真正主詞。", "Each、Every、Neither 通常視為單數。"],
      matchTags: ["subject-verb"],
      matchCategories: ["主動詞一致", "主詞動詞一致", "be動詞"]
    },
    {
      id: "tense-timeline",
      level: "basic",
      title: "時態與時間線索",
      parts: ["5", "6"],
      score: "500–700",
      summary: "用 by、since、before、already、next week 等時間線索建立事件先後，再選時態。",
      rule: "since + 過去時間 → present perfect；by + 未來時間 → future perfect",
      examples: [
        { en: "The team has completed three tests since Monday.", zh: "團隊自週一起已完成三次測試。", note: "since 連接過去起點與現在。" },
        { en: "By Friday, the technician will have installed the new system.", zh: "技術人員將在週五前完成新系統安裝。", note: "by Friday 對應未來完成式。" }
      ],
      pitfalls: ["by 不等於一定用完成式，仍要先判斷參照時間。", "時間副詞子句談未來時，常用現在式代替 will。"],
      matchTags: ["tense", "present-perfect", "past-perfect", "future-perfect", "time-clause"],
      matchCategories: ["時態", "動詞時態", "完成式", "未來完成式", "過去完成式"]
    },
    {
      id: "active-passive",
      level: "basic",
      title: "主動與被動語態",
      parts: ["5", "6"],
      score: "500–700",
      summary: "先問主詞是執行動作，還是承受動作；被動語態必須保留 be + p.p. 結構。",
      rule: "active: S + V + O；passive: S + be + p.p. (+ by O)",
      examples: [
        { en: "The invoice was sent to the client yesterday.", zh: "發票昨天已寄給客戶。", note: "invoice 承受寄送動作。" },
        { en: "The finance team sent the invoice yesterday.", zh: "財務團隊昨天寄出了發票。", note: "finance team 執行動作。" }
      ],
      pitfalls: ["只有過去分詞不等於完整被動，通常還需要 be。", "不及物動詞通常不能直接改成被動。"],
      matchTags: ["passive", "past-participle"],
      matchCategories: ["被動語態", "分詞", "分詞形容詞"]
    },
    {
      id: "pronouns-determiners",
      level: "basic",
      title: "代名詞、限定詞與數量詞",
      parts: ["5", "6"],
      score: "400–650",
      summary: "看後面有沒有名詞、指涉對象是單數或複數，以及可數或不可數。",
      rule: "determiner + noun；pronoun 直接取代 noun phrase",
      examples: [
        { en: "Some employees work remotely, while others use the main office.", zh: "有些員工遠端工作，另一些使用總公司。", note: "others 不再接名詞。" },
        { en: "Each department has its own budget.", zh: "每個部門都有自己的預算。", note: "Each 與 its 都是單數。" }
      ],
      pitfalls: ["another 接單數名詞；other 可接複數或不可數名詞。", "few / a few 與 little / a little 的可數性不同。"],
      matchTags: ["quantifier", "pronoun"],
      matchCategories: ["代名詞", "數量詞", "限定詞", "所有格", "代名詞指涉"]
    },
    {
      id: "adjective-adverb",
      level: "basic",
      title: "形容詞與副詞位置",
      parts: ["5", "6"],
      score: "400–650",
      summary: "形容詞修飾名詞或作補語；副詞修飾動詞、形容詞、副詞或整句。",
      rule: "adjective + noun；linking verb + adjective；adverb + verb/adjective",
      examples: [
        { en: "The new scanner is highly efficient.", zh: "新掃描器效率很高。", note: "highly 修飾 efficient。" },
        { en: "The manager gave a clear explanation.", zh: "經理給了清楚的說明。", note: "clear 修飾名詞 explanation。" }
      ],
      pitfalls: ["be、seem、become、remain 後常接形容詞補語。", "friendly、costly、timely 雖以 -ly 結尾，常是形容詞。"],
      matchTags: ["adjective", "adverb", "word-form"],
      matchCategories: ["形容詞", "副詞", "副詞位置", "形容詞補語", "語意副詞"]
    },
    {
      id: "prepositions",
      level: "basic",
      title: "介系詞與片語介系詞",
      parts: ["5", "6"],
      score: "450–700",
      summary: "介系詞後接名詞片語或 V-ing；先判斷時間、地點、原因、讓步或固定搭配。",
      rule: "preposition + noun / pronoun / V-ing",
      examples: [
        { en: "The report must be submitted by noon.", zh: "報告必須在中午前提交。", note: "by 表示截止點。" },
        { en: "Despite the delay, the store opened on time.", zh: "儘管延誤，商店仍準時開門。", note: "despite 後接名詞片語。" }
      ],
      pitfalls: ["during 後接名詞；while 後接子句。", "because of 後接名詞片語；because 後接完整子句。"],
      matchTags: ["preposition", "be-adj-prep", "despite", "concession"],
      matchCategories: ["介系詞", "片語介系詞", "時間介系詞", "介系詞搭配", "讓步介系詞"]
    },
    {
      id: "connectors",
      level: "basic",
      title: "連接詞與連接副詞",
      parts: ["5", "6"],
      score: "500–700",
      summary: "先看空格兩側是否為完整子句，再依因果、轉折、時間或條件選連接方式。",
      rule: "conjunction + clause；sentence; conjunctive adverb, sentence",
      examples: [
        { en: "The morning session is full, but seats remain in the afternoon.", zh: "上午場已滿，但下午場仍有座位。", note: "but 連接兩個對等子句。" },
        { en: "The morning session is full; however, seats remain in the afternoon.", zh: "上午場已滿；不過，下午場仍有座位。", note: "however 前常用分號。" }
      ],
      pitfalls: ["連接副詞不能只用逗號連接兩個獨立子句。", "unless 已含 if not 的否定概念。"],
      matchTags: ["connector", "conjunction", "transition", "contrast", "unless"],
      matchCategories: ["連接詞", "連接副詞", "時間連接詞", "語意連接詞", "相關連接詞"]
    },
    {
      id: "gerund-infinitive",
      level: "basic",
      title: "動名詞與不定詞",
      parts: ["5", "6"],
      score: "500–750",
      summary: "依前方動詞、形容詞或句型決定接 V-ing、to V 或原形動詞。",
      rule: "avoid/consider + V-ing；plan/decide + to V；make/let + O + V",
      examples: [
        { en: "The company plans to expand the pilot program.", zh: "公司計畫擴大試辦計畫。", note: "plan 後接 to V。" },
        { en: "Please avoid sharing your password.", zh: "請避免分享密碼。", note: "avoid 後接 V-ing。" }
      ],
      pitfalls: ["介系詞 to 後接 V-ing，例如 look forward to meeting。", "助動詞後接原形，不接 to V。"],
      matchTags: ["gerund", "to-infinitive", "infinitive", "verb-pattern", "verb-form"],
      matchCategories: ["動名詞", "不定詞", "動詞型態", "動詞原形"]
    },
    {
      id: "comparison",
      level: "basic",
      title: "比較級、最高級與倍數",
      parts: ["5", "6"],
      score: "500–700",
      summary: "看到 than、of all、the two、as...as 等線索，先確認比較範圍再選形式。",
      rule: "comparative + than；the + superlative；as + adjective/adverb + as",
      examples: [
        { en: "The updated application runs more smoothly than the previous version.", zh: "更新後的應用程式比前一版運作更順暢。", note: "修飾 runs 要用副詞比較級。" },
        { en: "This is the most efficient model in the series.", zh: "這是該系列中效率最高的型號。", note: "在完整範圍中用最高級。" }
      ],
      pitfalls: ["兩者比較常用比較級，不用最高級。", "比較對象必須對等，避免拿 company 和 sales 比。"],
      matchTags: ["comparative", "comparison"],
      matchCategories: ["比較級", "最高級", "比較結構", "比較與推論"]
    },
    {
      id: "relative-clauses",
      level: "advanced",
      title: "關係子句與關係詞缺口",
      parts: ["5", "6"],
      score: "700–900",
      summary: "先找先行詞，再檢查關係子句缺主詞、受詞、所有格、時間或地點。",
      rule: "person: who/whom/whose；thing: which/that；place: where",
      examples: [
        { en: "The consultant who led the workshop will return next month.", zh: "主持工作坊的顧問下月會再來。", note: "子句缺主詞，用 who。" },
        { en: "The office in which the records are stored is locked.", zh: "存放紀錄的辦公室已上鎖。", note: "介系詞後用 which。" }
      ],
      pitfalls: ["地點先行詞不代表一定用 where，仍要看子句缺什麼。", "whose 後面要接名詞，表示所有關係。"],
      matchTags: ["relative-clause", "whose", "prep-relative", "where"],
      matchCategories: ["關係子句", "關係代名詞", "介系詞關係代名詞", "關係副詞", "whose"]
    },
    {
      id: "noun-clauses",
      level: "advanced",
      title: "名詞子句與間接問句",
      parts: ["5", "6"],
      score: "700–900",
      summary: "名詞子句可以當主詞、受詞或補語；間接問句維持陳述句語序。",
      rule: "verb + whether/if/wh-word + S + V",
      examples: [
        { en: "Please confirm whether the client has approved the draft.", zh: "請確認客戶是否已核准草稿。", note: "whether 子句作 confirm 的受詞。" },
        { en: "We do not know when the shipment will arrive.", zh: "我們不知道貨物何時會抵達。", note: "間接問句不用 will the shipment。" }
      ],
      pitfalls: ["間接問句不使用疑問句倒裝。", "whether 可直接接 or not，正式文體通常比 if 更穩妥。"],
      matchTags: ["noun-clause", "whether"],
      matchCategories: ["名詞子句", "同位語"]
    },
    {
      id: "participle-clauses",
      level: "advanced",
      title: "分詞構句與分詞形容詞",
      parts: ["5", "6"],
      score: "700–900",
      summary: "分詞構句的邏輯主詞要和主句主詞一致；主動用 V-ing，被動用 p.p.。",
      rule: "V-ing..., S + V；p.p...., S + V；having p.p...., S + V",
      examples: [
        { en: "Having reviewed the figures, the analyst revised the forecast.", zh: "審閱數據後，分析師修改了預測。", note: "review 發生在 revise 之前。" },
        { en: "Located near the airport, the hotel attracts business travelers.", zh: "飯店位於機場附近，因此吸引商務旅客。", note: "hotel 被 located。" }
      ],
      pitfalls: ["分詞片語的執行者不能無故換成別人。", "人感到 excited；事物令人 exciting。"],
      matchTags: ["participle-clause", "participle", "present-participle", "past-participle", "perfect-participle"],
      matchCategories: ["分詞構句", "分詞", "分詞片語", "分詞形容詞"]
    },
    {
      id: "conditionals-subjunctive",
      level: "advanced",
      title: "條件句與假設語氣",
      parts: ["5", "6"],
      score: "750–950",
      summary: "分清真實條件、與現在相反、與過去相反，以及 suggest/recommend 後的原形假設語氣。",
      rule: "If + past, would + V；If + had p.p., would have p.p.；recommend that S + V",
      examples: [
        { en: "If the system were more reliable, we would expand the pilot.", zh: "如果系統更可靠，我們就會擴大試辦。", note: "與現在事實相反。" },
        { en: "The consultant recommended that the policy be revised.", zh: "顧問建議修訂該政策。", note: "recommend 後用原形 be。" }
      ],
      pitfalls: ["條件子句內通常不直接用 would。", "正式假設語氣中，所有主詞都可用 were。"],
      matchTags: ["subjunctive", "condition", "past-unreal", "mandative-subjunctive"],
      matchCategories: ["假設語氣", "條件句", "倒裝假設", "倒裝條件"]
    },
    {
      id: "inversion",
      level: "advanced",
      title: "否定與限制語置首倒裝",
      parts: ["5"],
      score: "800–950",
      summary: "先還原正常語序；有 be 或助動詞就直接搬移，一般動詞才補 do/does/did。",
      rule: "Negative/restrictive phrase + auxiliary/be + S + main verb",
      examples: [
        { en: "Not until the final inspection was the building open to the public.", zh: "直到最終檢查完成，建築才對外開放。", note: "空格後已有 the building，不能再補 it。" },
        { en: "Rarely do we receive so many applications.", zh: "我們很少收到這麼多申請。", note: "一般動詞 receive 需要 do-support。" }
      ],
      pitfalls: ["空格後已有主詞時，不能再補代名詞造成雙主詞。", "Only 後接單一名詞不一定倒裝；置首的是限制副詞片語才會觸發。"],
      matchTags: ["inversion", "negative-fronting", "restrictive-fronting", "do-support", "be-inversion", "conditional-inversion"],
      matchCategories: ["倒裝句", "倒裝", "倒裝條件", "倒裝假設"]
    },
    {
      id: "parallelism",
      level: "advanced",
      title: "平行結構與相關連接詞",
      parts: ["5", "6"],
      score: "700–900",
      summary: "and、or、but、both...and、not only...but also 兩側的詞性與結構要對稱。",
      rule: "A and B；both A and B；not only A but also B",
      examples: [
        { en: "The role requires planning projects, tracking costs, and reporting results.", zh: "此職務需要規劃專案、追蹤成本並報告成果。", note: "三項都用 V-ing。" },
        { en: "The update is both faster and more secure.", zh: "此次更新速度更快，也更安全。", note: "both 兩側都是形容詞比較概念。" }
      ],
      pitfalls: ["不要混用 to V、V-ing 與完整子句。", "not only 置於句首時，前半句可能需要倒裝。"],
      matchTags: ["parallelism", "not-only"],
      matchCategories: ["平行結構", "相關連接詞"]
    },
    {
      id: "reduced-clauses",
      level: "advanced",
      title: "關係子句與副詞子句省略",
      parts: ["5", "6"],
      score: "800–950",
      summary: "關係代名詞加 be 可省略；副詞子句省略時，從屬子句與主句通常要有相同主詞。",
      rule: "noun + (who/which is) V-ing/p.p.；when/while + V-ing/p.p.",
      examples: [
        { en: "Employees working remotely must use the secure portal.", zh: "遠端工作的員工必須使用安全入口網站。", note: "working = who are working。" },
        { en: "When completed, the form should be sent to Human Resources.", zh: "表格填妥後應送交人資部。", note: "when it is completed 的省略。" }
      ],
      pitfalls: ["省略後仍要能找回合理主詞。", "主動關係用 V-ing，被動關係用 p.p.。"],
      matchTags: ["reduced-clause", "participle-clause"],
      matchCategories: ["省略關係子句", "省略副詞子句"]
    },
    {
      id: "logical-concession",
      level: "advanced",
      title: "讓步、對比與篇章邏輯",
      parts: ["5", "6"],
      score: "700–900",
      summary: "高分題常同時測句法與語意；先判斷後方結構，再判斷因果、讓步、例外或轉折。",
      rule: "although + clause；despite + noun/V-ing；however links sentences",
      examples: [
        { en: "Although demand increased, the company did not raise prices.", zh: "雖然需求增加，公司並未調高價格。", note: "although 後接完整子句。" },
        { en: "Despite receiving more orders, the factory met every deadline.", zh: "儘管接到更多訂單，工廠仍達成每個期限。", note: "despite 後接 V-ing。" }
      ],
      pitfalls: ["although 與 but 不在同一組主從句中重複使用。", "however 是連接副詞，標點不能照連接詞處理。"],
      matchTags: ["concession", "contrast", "transition", "logic", "unless"],
      matchCategories: ["讓步連接詞", "讓步介系詞", "讓步邏輯", "語意連接詞", "例外條件"]
    }
  ],
  collocationCategories: {
    meetings: "會議與專案",
    operations: "營運與行政",
    hr: "人資與職涯",
    finance: "財務與採購",
    customer: "顧客服務",
    travel: "差旅與交通"
  },
  collocations: [
    { phrase: "schedule a meeting", zh: "安排會議", category: "meetings", pattern: "verb + noun", parts: ["3", "5", "7"], example: "We scheduled a meeting with the regional managers." },
    { phrase: "attend a meeting", zh: "出席會議", category: "meetings", pattern: "verb + noun", parts: ["2", "3", "5"], example: "All department heads must attend the meeting." },
    { phrase: "hold a meeting", zh: "舉行會議", category: "meetings", pattern: "verb + noun", parts: ["4", "5", "7"], example: "The committee will hold a meeting on Thursday." },
    { phrase: "take minutes", zh: "做會議紀錄", category: "meetings", pattern: "verb + noun", parts: ["3", "5"], example: "Ms. Lin volunteered to take minutes during the meeting." },
    { phrase: "reach an agreement", zh: "達成協議", category: "meetings", pattern: "verb + noun", parts: ["3", "5", "7"], example: "The two companies reached an agreement yesterday." },
    { phrase: "make a decision", zh: "做出決定", category: "meetings", pattern: "verb + noun", parts: ["2", "3", "5"], example: "The board will make a final decision next week." },
    { phrase: "give a presentation", zh: "進行簡報", category: "meetings", pattern: "verb + noun", parts: ["3", "4", "5"], example: "The analyst will give a presentation on sales trends." },
    { phrase: "meet a deadline", zh: "如期完成；趕上期限", category: "meetings", pattern: "verb + noun", parts: ["3", "5", "7"], example: "The design team worked late to meet the deadline." },

    { phrase: "place an order", zh: "下訂單", category: "operations", pattern: "verb + noun", parts: ["2", "3", "5", "7"], example: "Customers can place an order through the mobile app." },
    { phrase: "process an order", zh: "處理訂單", category: "operations", pattern: "verb + noun", parts: ["3", "5", "7"], example: "The warehouse processed the order this morning." },
    { phrase: "cancel an order", zh: "取消訂單", category: "operations", pattern: "verb + noun", parts: ["2", "5", "7"], example: "Contact customer service to cancel an order." },
    { phrase: "conduct an inspection", zh: "進行檢查", category: "operations", pattern: "verb + noun", parts: ["4", "5", "7"], example: "A safety officer will conduct an inspection on Monday." },
    { phrase: "perform maintenance", zh: "執行維護", category: "operations", pattern: "verb + noun", parts: ["4", "5", "7"], example: "Technicians perform maintenance every three months." },
    { phrase: "file a report", zh: "提交；建檔報告", category: "operations", pattern: "verb + noun", parts: ["3", "5", "7"], example: "Employees must file a report after a safety incident." },
    { phrase: "reduce costs", zh: "降低成本", category: "operations", pattern: "verb + noun", parts: ["4", "5", "7"], example: "The automated system should reduce operating costs." },
    { phrase: "increase efficiency", zh: "提升效率", category: "operations", pattern: "verb + noun", parts: ["4", "5", "7"], example: "The new workflow increased production efficiency." },

    { phrase: "apply for a position", zh: "應徵職位", category: "hr", pattern: "verb + preposition + noun", parts: ["3", "5", "7"], example: "Candidates may apply for the position online." },
    { phrase: "meet the qualifications", zh: "符合資格", category: "hr", pattern: "verb + noun", parts: ["5", "7"], example: "Applicants must meet the qualifications listed in the notice." },
    { phrase: "gain experience", zh: "累積經驗", category: "hr", pattern: "verb + noun", parts: ["3", "5", "7"], example: "The internship helps students gain practical experience." },
    { phrase: "submit an application", zh: "提交申請", category: "hr", pattern: "verb + noun", parts: ["4", "5", "7"], example: "Submit an application before the end of the month." },
    { phrase: "conduct an interview", zh: "進行面試", category: "hr", pattern: "verb + noun", parts: ["3", "5", "7"], example: "The hiring manager will conduct the interview." },
    { phrase: "hire additional staff", zh: "增聘人員", category: "hr", pattern: "verb + noun", parts: ["3", "5", "7"], example: "The branch plans to hire additional staff for the summer." },
    { phrase: "attend a training session", zh: "參加培訓課程", category: "hr", pattern: "verb + noun", parts: ["2", "4", "5"], example: "New employees must attend a training session." },
    { phrase: "take leave", zh: "請假", category: "hr", pattern: "verb + noun", parts: ["2", "3", "5"], example: "Staff members should notify their manager before taking leave." },

    { phrase: "issue an invoice", zh: "開立發票", category: "finance", pattern: "verb + noun", parts: ["3", "5", "7"], example: "The supplier will issue an invoice after delivery." },
    { phrase: "make a payment", zh: "付款", category: "finance", pattern: "verb + noun", parts: ["2", "5", "7"], example: "Customers can make a payment by credit card." },
    { phrase: "submit an expense report", zh: "提交費用報告", category: "finance", pattern: "verb + noun", parts: ["3", "5", "7"], example: "Submit an expense report within ten business days." },
    { phrase: "receive a refund", zh: "收到退款", category: "finance", pattern: "verb + noun", parts: ["2", "5", "7"], example: "You will receive a refund within one week." },
    { phrase: "annual budget", zh: "年度預算", category: "finance", pattern: "adjective + noun", parts: ["4", "5", "7"], example: "The committee approved the annual budget." },
    { phrase: "sales figures", zh: "銷售數據", category: "finance", pattern: "noun + noun", parts: ["3", "5", "7"], example: "The analyst reviewed the quarterly sales figures." },
    { phrase: "offer a discount", zh: "提供折扣", category: "finance", pattern: "verb + noun", parts: ["3", "5", "7"], example: "The store offers a discount to members." },
    { phrase: "cover the cost", zh: "負擔費用", category: "finance", pattern: "verb + noun", parts: ["3", "5", "7"], example: "The company will cover the cost of transportation." },

    { phrase: "handle a complaint", zh: "處理客訴", category: "customer", pattern: "verb + noun", parts: ["2", "3", "5"], example: "The supervisor handled the complaint professionally." },
    { phrase: "provide assistance", zh: "提供協助", category: "customer", pattern: "verb + noun", parts: ["2", "4", "5"], example: "Staff members are available to provide assistance." },
    { phrase: "confirm a reservation", zh: "確認預約", category: "customer", pattern: "verb + noun", parts: ["2", "3", "7"], example: "Please call the restaurant to confirm your reservation." },
    { phrase: "respond to an inquiry", zh: "回覆詢問", category: "customer", pattern: "verb + preposition + noun", parts: ["3", "5", "7"], example: "Our support team responds to inquiries within one day." },
    { phrase: "request a replacement", zh: "要求更換品", category: "customer", pattern: "verb + noun", parts: ["2", "3", "7"], example: "The customer requested a replacement for the damaged unit." },
    { phrase: "return an item", zh: "退回商品", category: "customer", pattern: "verb + noun", parts: ["2", "5", "7"], example: "Use the original packaging to return an item." },
    { phrase: "customer satisfaction", zh: "顧客滿意度", category: "customer", pattern: "noun + noun", parts: ["4", "5", "7"], example: "The survey measures customer satisfaction." },
    { phrase: "service charge", zh: "服務費", category: "customer", pattern: "noun + noun", parts: ["3", "5", "7"], example: "A ten-percent service charge is included in the bill." },

    { phrase: "book a flight", zh: "預訂航班", category: "travel", pattern: "verb + noun", parts: ["2", "3", "5"], example: "The assistant booked a flight for the sales director." },
    { phrase: "catch a train", zh: "趕上火車；搭火車", category: "travel", pattern: "verb + noun", parts: ["2", "3", "5"], example: "We need to leave now to catch the train." },
    { phrase: "boarding pass", zh: "登機證", category: "travel", pattern: "noun + noun", parts: ["2", "4", "7"], example: "Passengers should show their boarding pass at the gate." },
    { phrase: "departure time", zh: "出發時間", category: "travel", pattern: "noun + noun", parts: ["2", "4", "7"], example: "Check the departure time before leaving the hotel." },
    { phrase: "check in", zh: "報到；辦理入住", category: "travel", pattern: "phrasal verb", parts: ["2", "3", "4"], example: "Conference attendees can check in at the lobby kiosk." },
    { phrase: "baggage claim", zh: "行李提領區", category: "travel", pattern: "noun + noun", parts: ["2", "4", "7"], example: "Meet the driver outside the baggage claim area." },
    { phrase: "travel itinerary", zh: "旅行行程表", category: "travel", pattern: "noun + noun", parts: ["3", "5", "7"], example: "The updated travel itinerary was sent by email." },
    { phrase: "arrange transportation", zh: "安排交通", category: "travel", pattern: "verb + noun", parts: ["2", "3", "5"], example: "The hotel can arrange transportation to the airport." }
  ],
  resources: [
    {
      title: "Writing Guide with Handbook",
      provider: "OpenStax",
      access: "開放授權",
      license: "CC BY-NC-SA 4.0",
      topic: "完整英文寫作與文法手冊",
      description: "可查句子結構、動詞、代名詞、標點與常見句病；適合系統化複習。",
      url: "https://openstax.org/books/writing-guide/pages/handbook"
    },
    {
      title: "English Grammar Collection",
      provider: "LibreTexts",
      access: "開放授權",
      license: "CC BY-NC-SA 4.0（除非個別頁面另註）",
      topic: "時態與平行結構互動教材",
      description: "收錄 verb tenses、tense consistency 與 parallel structure 等互動資源。",
      url: "https://studio.libretexts.org/collection/29190?page=1"
    },
    {
      title: "LearnEnglish Grammar",
      provider: "British Council",
      access: "免費教材",
      license: "網站內容保留著作權",
      topic: "A1–C1 分級文法與互動練習",
      description: "依 A1–A2、B1–B2、C1 分級，提供說明、例句與互動練習。",
      url: "https://learnenglish.britishcouncil.org/free-resources/grammar"
    },
    {
      title: "English Example Sentences",
      provider: "Tatoeba",
      access: "開放語料",
      license: "文字預設 CC BY 2.0 FR；個別內容可能另有授權",
      topic: "例句與翻譯語料",
      description: "適合查單字和搭配詞在句子中的用法；使用或再散布前應核對個別句子授權與品質。",
      url: "https://tatoeba.org/en/"
    },
    {
      title: "Pronunciation List of English Words",
      provider: "Wiktionary",
      access: "開放資源",
      license: "CC BY-SA / GFDL；音檔授權依檔案頁",
      topic: "常用字 IPA 與發音音檔",
      description: "整理常用英文單字的 IPA 與音檔，可與本站 KK／IPA 顯示交叉查核。",
      url: "https://en.wiktionary.org/wiki/Appendix:Pronunciation_list_of_English_words"
    },
    {
      title: "TOEIC Test Preparation Materials",
      provider: "ETS",
      access: "官方免費樣題",
      license: "ETS 保留著作權，僅連結官方頁面",
      topic: "題型說明、手冊與官方 sample test",
      description: "用來核對正式考試結構與官方示例；本站不複製或匯入未授權試題。",
      url: "https://www.in.ets.org/toeic/resources/prepare.html"
    }
  ]
};
