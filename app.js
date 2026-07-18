const BUILTIN_BANK = window.BUILTIN_BANK || [];
const TOEIC_VOCAB_LEXICON = window.TOEIC_VOCAB_LEXICON || {};
const APP_SHELL = window.TOEIC_APP_SHELL || {};
const LEARNING_COMMAND_CENTER = window.TOEIC_LEARNING_COMMAND_CENTER || { buildStudyMissions: () => [] };
const LEGAL_PRACTICE_SOURCES = window.TOEIC_LEGAL_PRACTICE_SOURCES || [];
const QUESTION_AUDIT = window.TOEIC_QUESTION_AUDIT || { auditBank: () => ({ byId:{}, issues:[], errors:[], warnings:[], checked:0 }) };

const KEYS = {
  wrong: "toeicOcean.wrong.v1",
  favorite: "toeicOcean.favoriteQuestions.v1",
  history: "toeicOcean.history.v1",
  custom: "toeicOcean.customBank.v1",
  theme: "toeicOcean.theme.v1",
  active: "toeicOcean.activeSession.v1",
  performance: "toeicOcean.performance.v1",
  reviewSchedule: "toeicOcean.reviewSchedule.v1",
  vocab: "toeicOcean.vocab.v1",
  quality: "toeicOcean.questionQuality.v1",
  audioAccent: "toeicOcean.audioAccent.v1"
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30];
const COOKIE_KEYS = {
  dailyGoal: "toeicOcean.dailyGoal",
  lastVisit: "toeicOcean.lastVisit"
};
const SESSION_KEYS = {
  scratchpad: "toeicOcean.sessionScratchpad",
  scratchUpdatedAt: "toeicOcean.sessionScratchUpdatedAt"
};
const AUDIO_ACCENTS = [
  { id:"auto", label:"自動", lang:"en-US", hints:[] },
  { id:"us", label:"美式", lang:"en-US", hints:["united states","american","us english","samantha","alex","david","zira","jenny","aria"] },
  { id:"uk", label:"英式", lang:"en-GB", hints:["united kingdom","british","uk english","daniel","serena","george","libby","martha"] },
  { id:"au", label:"澳洲", lang:"en-AU", hints:["australia","australian","karen","lee","matilda","olivia"] },
  { id:"ca", label:"加拿大", lang:"en-CA", hints:["canada","canadian"] },
  { id:"nz", label:"紐西蘭", lang:"en-NZ", hints:["new zealand","moira"] },
  { id:"ie", label:"愛爾蘭", lang:"en-IE", hints:["ireland","irish"] },
  { id:"in", label:"印度", lang:"en-IN", hints:["india","indian","rishi","heera"] },
  { id:"sg", label:"新加坡", lang:"en-SG", hints:["singapore"] },
  { id:"za", label:"南非", lang:"en-ZA", hints:["south africa"] }
];
const MALE_VOICE_HINTS = [
  "david","mark","george","daniel","alex","fred","tom","oliver","arthur","aaron","albert","bruce","junior","ralph","reed","rocko",
  "gordon","malcolm","ryan","liam","james","microsoft david","microsoft mark","google us english male","google uk english male"
];
const FEMALE_VOICE_HINTS = [
  "zira","jenny","aria","samantha","victoria","susan","karen","moira","tessa","serena","libby","martha","matilda","olivia",
  "ava","allison","shelley","sandy","joelle","fiona","microsoft zira","google us english female","google uk english female"
];
const AUTO_VOCAB_LETTERS = ["all", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const AUTO_VOCAB_STOP_WORDS = new Set([
  "able","about","above","after","again","against","also","although","always","among","another","answer","any","april","around",
  "because","been","before","being","below","best","between","blank","bring","came","could","days","december","does","doing",
  "during","each","either","else","every","february","first","following","friday","from","have","having","here","hers","himself",
  "into","itself","january","july","june","last","later","make","many","march","might","monday","more","most","must","next",
  "november","october","only","other","ours","over","phrase","please","question","rarely","saturday","second","september",
  "shall","should","since","some","still","such","than","that","their","them","then","there","these","they","third","this",
  "those","through","thursday","today","tomorrow","tuesday","under","until","very","wednesday","were","what","when","where",
  "which","while","whose","with","within","word","would","yesterday","your","yours"
]);

const STRATEGY_DECKS = [
  {
    id: "part5-word-form",
    title: "Part 5 詞性快判",
    parts: ["5"],
    type: "grammar",
    level: 1,
    summary: "先看空格左右，不急著翻完整句；判斷空格需要名詞、形容詞、副詞或分詞。",
    signal: "選項是同字根變化，或空格旁有冠詞、介系詞、名詞、be 動詞。",
    steps: ["圈出空格前後各 2-3 個字", "判斷空格在句中扮演的詞性", "再用句意淘汰看似同形但詞性不合的選項"],
    trap: "同字根選項很像時，不要靠熟悉度選；先讓文法位置決定答案。",
    match: q => q.part === "5" && (hasTag(q,"word-form","adjective","adverb","noun","participle","quantifier") || hasCategory(q,"詞性","形容詞","副詞","分詞","數量詞"))
  },
  {
    id: "part5-verb-engine",
    title: "Part 5 動詞型態引擎",
    parts: ["5"],
    type: "grammar",
    level: 2,
    summary: "把動詞題拆成主詞、時間線、語態與固定接法，不靠中文語感硬猜。",
    signal: "選項包含時態、被動、動名詞、不定詞、假設語氣或 will / has / be 附近的空格。",
    steps: ["先找真正主詞與動詞位置", "看時間副詞或助動詞決定時態", "檢查主動被動與後方接名詞、to V 或 V-ing"],
    trap: "看到熟字先別選；多益常用 will、has、by、before 逼你選正確型態。",
    match: q => q.part === "5" && (hasTag(q,"tense","verb-form","passive","subjunctive","gerund","to-infinitive","participle-clause","subject-verb","verb","scheduled-to","present-perfect","past-perfect","future-perfect") || hasCategory(q,"時態","動名詞","被動語態","假設語氣","動詞搭配","不定詞","分詞構句"))
  },
  {
    id: "part5-connector-prep",
    title: "連接詞 / 介系詞分流",
    parts: ["5"],
    type: "grammar",
    level: 2,
    summary: "先判斷空格後面是名詞片語還是完整子句，再決定用介系詞、連接詞或連接副詞。",
    signal: "because / because of、although / despite、therefore / meanwhile 這類功能字混在選項中。",
    steps: ["看空格後方是否有主詞加動詞", "判斷前後語意是因果、讓步、時間或轉折", "確認標點：分號後常接連接副詞"],
    trap: "because of 後接名詞片語；because 後接完整子句，兩者不能只看中文『因為』。",
    match: q => q.part === "5" && (hasTag(q,"preposition","conjunction","transition","concession","because-of","despite","unless","during","within","according-to","addition","behalf","contrast") || hasCategory(q,"介系詞","連接詞","連接副詞","片語介系詞","讓步"))
  },
  {
    id: "part5-inversion",
    title: "否定／限制語置首倒裝",
    parts: ["5"],
    type: "grammar",
    level: 3,
    summary: "先還原正常語序，再判斷主句是 be 動詞、已有助動詞，還是一般動詞；這一步會直接決定倒裝形式。",
    signal: "Never、Rarely、Seldom、Not until、Only after、Only when、Hardly、No sooner、Little、Under no circumstances 置於句首。",
    steps: ["先找空格後是否已有主詞，避免補出雙主詞", "還原正常語序並找真正的主要動詞", "有 be／助動詞就搬到主詞前；一般動詞才補 do、does 或 did"],
    trap: "看到過去語意就選 did 並不可靠。若原句是 was open，倒裝應為 was + 主詞 + open；空格後已有主詞時也不能再填 was it。",
    match: q => q.part === "5" && (hasTag(q,"inversion","negative-fronting","restrictive-fronting","conditional-inversion") || hasCategory(q,"倒裝"))
  },
  {
    id: "part5-clause-pattern",
    title: "關係詞與從句缺口",
    parts: ["5"],
    type: "grammar",
    level: 3,
    summary: "看先行詞與從句裡缺哪個角色，而不是只背 who / which / where 的中文。",
    signal: "空格後是一小段從句，選項含 who、which、whose、where、whether、that。",
    steps: ["找空格前的先行詞或引導詞位置", "檢查從句中缺主詞、受詞、所有格或地點", "確認逗號與介系詞是否改變關係詞選擇"],
    trap: "where 不等於所有地點名詞都能選；從句若缺受詞，常需要 which / that。",
    match: q => q.part === "5" && (hasTag(q,"relative-clause","noun-clause","whose","prep-relative","where","whether","so-that") || hasCategory(q,"關係代名詞","名詞子句","子句"))
  },
  {
    id: "part6-context-flow",
    title: "Part 6 前後文銜接",
    parts: ["6"],
    type: "reading",
    level: 2,
    summary: "短文填空不要只看單句；先看段落任務，再用前後句決定時態、代名詞與語氣。",
    signal: "題目來自 email、公告、備忘錄或通知，答案需要靠上一句或下一句判斷。",
    steps: ["先快速看主旨與收件情境", "回到空格前後各一句找線索", "確認答案是否讓整段邏輯順下去"],
    trap: "Part 6 常把單句可行但段落不合的選項放進去，別只解空格那一句。",
    match: q => q.part === "6" || hasTag(q,"text-completion")
  },
  {
    id: "part2-first-word",
    title: "Part 2 問句開頭戰術",
    parts: ["2"],
    type: "listening",
    level: 1,
    summary: "抓第一個疑問詞與語氣，比逐字翻譯更快；先預測答案類型。",
    signal: "Who / When / Where / Why / How、Yes-No 問句、建議句或否定問句。",
    steps: ["聽第一個關鍵字判斷答案類型", "避開重複題目原字的誘答", "若聽不清，選最自然、最不硬塞關鍵字的回應"],
    trap: "Part 2 很常用相同或相近發音的字當陷阱，重複原字不一定是答案。",
    match: q => q.part === "2"
  },
  {
    id: "part34-preview",
    title: "Part 3 / 4 先讀題定位",
    parts: ["3","4"],
    type: "listening",
    level: 2,
    summary: "播放前先讀題幹，預測要聽人物、地點、問題、下一步或目的。",
    signal: "對話與獨白題通常問 speaker、location、problem、next action、purpose。",
    steps: ["播放前先看三題題幹", "用題幹名詞預測場景", "聽到同義改寫時立即定位，不等逐字重複"],
    trap: "正解常不是逐字出現，而是把 meeting room 改成 conference space 之類的同義表達。",
    match: q => q.part === "3" || q.part === "4"
  },
  {
    id: "p7-purpose-main",
    title: "Part 7 目的 / 主旨題",
    parts: ["7"],
    type: "reading",
    level: 1,
    summary: "先抓文章種類、標題、主旨句與結尾行動，不必逐句翻譯。",
    signal: "題幹出現 purpose、mainly、why、what is being announced / advertised。",
    steps: ["先看文章標題、Subject 或第一段", "確認作者想讓讀者做什麼", "排除只提到細節、但不是整篇目的的選項"],
    trap: "選項若只引用文章某個小細節，通常不是主旨題答案。",
    match: q => q.part === "7" && /purpose|mainly|why|announced|advertised|notice|e-mail|email/i.test(questionPromptText(q))
  },
  {
    id: "p7-date-number",
    title: "日期 / 時間 / 數字定位",
    parts: ["7"],
    type: "reading",
    level: 1,
    summary: "看到 when、how much、how many、by、before、after，先掃日期與數字附近。",
    signal: "題目或文章含星期、月份、A.M. / P.M.、價格、百分比、期限或數量。",
    steps: ["圈題幹中的時間或數量詞", "回文中掃同類格式", "注意 before / after / no later than 會改變答案"],
    trap: "文章常有多個日期；答案通常在題幹關鍵字附近，不是第一個看到的日期。",
    match: q => q.part === "7" && /when|how much|how many|deadline|by |before|after|no later than|a\.m\.|p\.m\.|monday|tuesday|wednesday|thursday|friday|january|february|march|april|may|june|july|august|september|october|november|december|\$|\d/i.test(questionContentText(q))
  },
  {
    id: "p7-cross-reference",
    title: "雙篇 / 三篇交叉比對",
    parts: ["7"],
    type: "reading",
    level: 3,
    summary: "把每份文件當成不同證人：先找各文件角色，再把資訊接起來推論。",
    signal: "雙篇、三篇、text message + e-mail，或題幹問 suggested / indicated / most likely。",
    steps: ["先標出每篇文件的發件人、時間與目的", "題幹若問推論，至少回到兩個文件找證據", "把人物、日期、物品名稱串起來再選"],
    trap: "交叉題的錯誤選項常只符合其中一篇文件，卻和另一篇矛盾。",
    match: q => q.part === "7" && (hasTag(q,"double-passage","triple-passage","cross-reference","inference") || /TEXT MESSAGE|INVOICE|FORM|SCHEDULE|ADVERTISEMENT|E-MAIL[\s\S]+TEXT MESSAGE/i.test(questionText(q)))
  },
  {
    id: "vocab-paraphrase",
    title: "同義改寫與固定搭配",
    parts: ["5","6","7"],
    type: "vocabulary",
    level: 2,
    summary: "多益常把正解藏在同義改寫裡；用搭配詞與商務情境判斷，而不是只背單字中文。",
    signal: "題目含 collocation、business vocabulary，或選項是 notify / inform、revise / update 這類商務動詞。",
    steps: ["看空格前後的固定搭配名詞", "找文章中與題幹同義的說法", "選最符合商務情境且語氣自然的答案"],
    trap: "中文意思相近不代表搭配正確，例如 make a decision，不說 do a decision。",
    match: q => hasTag(q,"vocabulary","collocation","business-verb","be-adj-prep") || hasCategory(q,"商務字彙","固定搭配","動詞搭配")
  },
  {
    id: "trap-elimination",
    title: "高難度陷阱排除",
    parts: ["5","6","7"],
    type: "reading",
    level: 3,
    summary: "先刪掉語法不合、範圍過大、只符合局部或與原文方向相反的選項。",
    signal: "800 分難度、推論題、雙篇/三篇題，或選項都看似合理。",
    steps: ["先排除文法位置不合的選項", "閱讀題排除只符合單一句細節的選項", "留下最能被原文直接支持的答案"],
    trap: "不要選『聽起來合理』；要選『文章或句構能證明』的答案。",
    match: q => ["5","6","7"].includes(q.part) && (q.difficulty === "800" || hasTag(q,"inference","triple-passage","double-passage"))
  }
];

const READING_LITERACY_SKILLS = [
  { id:"all", label:"全部能力", description:"混合條件、流程、跨文件、數據、目的與立場判讀。" },
  { id:"條件例外", label:"條件與例外", description:"追蹤 only、unless、however 與規則中的適用邊界。" },
  { id:"流程順序", label:"流程與順序", description:"依 before、next、then、after 排出動作先後。" },
  { id:"跨文件推論", label:"跨文件推論", description:"連接兩份文件中的時間、人物、限制與後續行動。" },
  { id:"數據判讀", label:"數據判讀", description:"比較表格欄位，再用文字說明判斷數字背後的原因。" },
  { id:"目的意圖", label:"目的與意圖", description:"辨識作者為何寫、希望讀者知道或採取什麼行動。" },
  { id:"語氣立場", label:"語氣與立場", description:"區分支持、反對、保留與附帶條件的態度。" }
];

const state = {
  currentView: "homeView",
  session: [],
  currentIndex: 0,
  answers: [],
  pendingSelections: [],
  reviewFlags: [],
  questionStartedAt: null,
  questionStartedIndex: null,
  questionEndsAt: null,
  timerId: null,
  sectionTimerId: null,
  remaining: 0,
  sessionMode: "practice",
  mockSection: null,
  mockBoundary: 0,
  sectionRemaining: 0,
  sectionEndsAt: null,
  restored: false,
  audioPlays: {},
  autoPlayedAudio: {},
  listeningPrep: null,
  listeningPrepTimerId: null,
  audioAccent: "auto",
  options: { instant: true, shuffle: true, seconds: 0, playLimit: 2 },
  lastResult: null,
  autoVocabLetter: "all",
  readingSkill: "all",
  sessionStrategy: null,
  vocabQuiz: { questions: [], index: 0, answers: [] }
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const clone = (x) => JSON.parse(JSON.stringify(x));
const letter = (i) => String.fromCharCode(65 + i);
const buildPart1AudioText = (choices=[]) => choices.map((choice,index)=>`${letter(index)}. ${choice}`).join(" ");
const nowLabel = () => new Intl.DateTimeFormat("zh-TW",{year:"numeric",month:"long",day:"numeric",weekday:"short"}).format(new Date());
const safe = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
function renderQuestionImage(question, context="practice"){
  const image=String(question?.image||"");
  if(!/^assets\/part1\/[a-z0-9-]+\.(?:jpg|png|webp)$/i.test(image)) return "";
  const isGenerated=question.imageOrigin==="ai-generated";
  const credit=String(question.imageCredit||"Pexels contributor");
  const source=String(question.imageSource||"");
  const sourceLink=/^https:\/\/www\.pexels\.com\/photo\//i.test(source)
    ? `<a href="${safe(source)}" target="_blank" rel="noopener noreferrer">${safe(credit)} / Pexels</a>`
    : `${safe(credit)} / Pexels`;
  const provenance=isGenerated
    ? `AI 生成情境圖 · ${safe(question.imageLicense||"本專案原創模擬素材")}`
    : `Photo: ${sourceLink} · ${safe(question.imageLicense||"Pexels License")}`;
  return `<figure class="part1-figure ${context==="compact"?"compact":""}">
    <div class="part1-image-frame"><img src="${safe(image)}" alt="${safe(question.imageAlt||"Part 1 question photograph.")}" ${context==="practice"?'loading="eager"':'loading="lazy"'}></div>
    <figcaption>${provenance}</figcaption>
  </figure>`;
}
function renderPassageText(question, revealEvidence=false){
  const passage=String(question?.passage||"");
  const evidence=String(question?.evidence||"");
  if(!revealEvidence||!evidence) return safe(passage);
  const index=passage.indexOf(evidence);
  if(index<0) return safe(passage);
  return `${safe(passage.slice(0,index))}<mark class="evidence-mark">${safe(evidence)}</mark>${safe(passage.slice(index+evidence.length))}`;
}
function renderLiteracyFeedback(question, selected){
  if(!(question?.tags||[]).includes("literacy-core")||!question.evidence) return "";
  const selectedNote=Number.isInteger(selected)?question.choiceNotes?.[selected]:"未作答，因此沒有可診斷的選項。";
  const choiceNotes=Array.isArray(question.choiceNotes)?question.choiceNotes:[];
  return `<section class="literacy-feedback" aria-label="閱讀線索與選項診斷">
    <div class="evidence-callout">
      <span>線索定位 · ${safe(question.evidenceLocation||"人工標註")}</span>
      <blockquote>${safe(question.evidence)}</blockquote>
    </div>
    <div class="choice-diagnosis">
      <span>本次選項診斷</span>
      <p>${safe(selectedNote||"請依據線索句重新比對選項。")}</p>
    </div>
    ${choiceNotes.length?`<details class="choice-notes"><summary>查看全部選項陷阱</summary>${choiceNotes.map((note,index)=>`<div><strong>${letter(index)}</strong><span>${safe(note)}</span></div>`).join("")}</details>`:""}
  </section>`;
}
const memoryStore = {};
function storageGet(k){
  try { return window.localStorage.getItem(k); }
  catch { return Object.prototype.hasOwnProperty.call(memoryStore,k) ? memoryStore[k] : null; }
}
function storageSet(k,v){
  try { window.localStorage.setItem(k,v); }
  catch { memoryStore[k]=v; }
}
const load = (k,d) => { try { return JSON.parse(storageGet(k)) ?? d; } catch { return d; } };
const save = (k,v) => storageSet(k, JSON.stringify(v));
const byteSize = (value) => new TextEncoder().encode(String(value ?? "")).length;
state.audioAccent = AUDIO_ACCENTS.some(accent=>accent.id===storageGet(KEYS.audioAccent)) ? storageGet(KEYS.audioAccent) : "auto";

function cookiePath(){
  return location.pathname.includes("/toeic-question-ocean/") ? "/toeic-question-ocean" : "/";
}
function setCookie(name,value,days=30){
  const expires=new Date(Date.now()+days*86400000).toUTCString();
  const secure=location.protocol==="https:"?"; Secure":"";
  document.cookie=`${name}=${encodeURIComponent(value)}; expires=${expires}; path=${cookiePath()}; SameSite=Lax${secure}`;
}
function getCookie(name){
  const prefix=`${name}=`;
  return document.cookie.split(";").map(x=>x.trim()).find(x=>x.startsWith(prefix))?.slice(prefix.length) || "";
}
function deleteCookie(name){
  const secure=location.protocol==="https:"?"; Secure":"";
  document.cookie=`${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${cookiePath()}; SameSite=Lax${secure}`;
}
function sessionGet(key, fallback=""){
  try { return window.sessionStorage.getItem(key) ?? fallback; }
  catch { return fallback; }
}
function sessionSet(key, value){
  try { window.sessionStorage.setItem(key,value); return true; }
  catch { return false; }
}
function sessionRemove(key){
  try { window.sessionStorage.removeItem(key); return true; }
  catch { return false; }
}

function getBank() {
  const custom = load(KEYS.custom, []);
  const map = new Map(BUILTIN_BANK.map(q => [q.id, q]));
  custom.forEach(q => { if (q && q.id) map.set(q.id, q); });
  return [...map.values()];
}
function getQuestionQuality(){ return load(KEYS.quality, {}); }
function saveQuestionQuality(data){ save(KEYS.quality, data); }
function qualityFor(id){ return getQuestionQuality()[id]||{}; }
function isQuestionDisabled(id){ return !!qualityFor(id).disabled; }
function getActiveBank(){
  const quality=getQuestionQuality();
  return getBank().filter(q=>!quality[q.id]?.disabled);
}
function updateQuestionQuality(id, patch){
  const data=getQuestionQuality();
  const current=data[id]||{};
  data[id]={...current,...patch,updatedAt:Date.now()};
  if(!data[id].disabled&&!data[id].disputed&&!data[id].review&&!data[id].note) delete data[id];
  saveQuestionQuality(data);
}
function hasTag(q,...tags){
  const set=new Set((q.tags||[]).map(t=>String(t).toLowerCase()));
  return tags.some(tag=>set.has(String(tag).toLowerCase()));
}
function hasCategory(q,...patterns){
  const category=String(q.category||"").toLowerCase();
  return patterns.some(pattern=>category.includes(String(pattern).toLowerCase()));
}
function questionText(q){
  return [
    q.category,q.prompt,q.translation,q.passage,q.audioText,q.audioTranslation,q.answerTranslation,
    ...(q.choices||[]),...(q.tags||[])
  ].filter(Boolean).join(" ");
}
function questionPromptText(q){
  return [q.category,q.prompt,...(q.tags||[])].filter(Boolean).join(" ");
}
function questionContentText(q){
  return [q.category,q.prompt,q.translation,q.passage,q.audioText,q.audioTranslation,q.answerTranslation,...(q.choices||[]),...(q.tags||[])].filter(Boolean).join(" ");
}
function getWrongIds(){ return load(KEYS.wrong, []); }
function setWrongIds(ids){ save(KEYS.wrong, [...new Set(ids)]); }
function getFavoriteIds(){ return load(KEYS.favorite, []); }
function setFavoriteIds(ids){ save(KEYS.favorite, [...new Set(ids)].filter(Boolean)); }
function questionsFromIds(ids){
  const map=new Map(getBank().map(q=>[q.id,q]));
  return ids.map(id=>map.get(id)).filter(Boolean);
}
function isFavoriteQuestion(id){ return getFavoriteIds().includes(id); }
function toggleFavoriteQuestion(id=currentQ()?.id){
  if(!id) return;
  const ids=getFavoriteIds();
  const exists=ids.includes(id);
  setFavoriteIds(exists?ids.filter(x=>x!==id):[id,...ids]);
  showToast(exists?"已取消題目收藏":"已收藏題目");
  if(state.currentView==="practiceView") renderQuestion();
  if(state.currentView==="wrongView") renderWrongBook();
  renderDashboard();
}
function getHistory(){ return load(KEYS.history, []); }
function getReviewSchedule(){ return load(KEYS.reviewSchedule, {}); }
function saveReviewSchedule(schedule){ save(KEYS.reviewSchedule, schedule); }
function dateAfterDays(days){ const d=new Date(); d.setDate(d.getDate()+days); d.setHours(0,0,0,0); return d.getTime(); }
function formatReviewDate(timestamp){
  if(!timestamp) return "未排程";
  return new Date(timestamp).toLocaleDateString("zh-TW",{month:"numeric",day:"numeric"});
}
function updateReviewSchedule(id, correct){
  const schedule=getReviewSchedule();
  const current=schedule[id];
  if(correct&&!current) return;
  const intervalIndex=correct
    ? Math.min((current?.intervalIndex??-1)+1, REVIEW_INTERVAL_DAYS.length-1)
    : 0;
  const streak=correct?(current?.streak||0)+1:0;
  const lapses=correct?(current?.lapses||0):(current?.lapses||0)+1;
  schedule[id]={
    id,
    intervalIndex,
    streak,
    lapses,
    lastReviewedAt:Date.now(),
    nextReviewAt:dateAfterDays(REVIEW_INTERVAL_DAYS[intervalIndex])
  };
  saveReviewSchedule(schedule);
}
function removeReviewSchedule(ids){
  const remove=new Set(ids);
  const schedule=getReviewSchedule();
  remove.forEach(id=>delete schedule[id]);
  saveReviewSchedule(schedule);
}
function dueReviewIds(){
  const now=Date.now();
  return Object.values(getReviewSchedule())
    .filter(item=>item?.nextReviewAt&&item.nextReviewAt<=now)
    .sort((a,b)=>a.nextReviewAt-b.nextReviewAt)
    .map(item=>item.id);
}
function startDueReview(){
  const ids=dueReviewIds();
  const map=new Map(getBank().map(q=>[q.id,q]));
  const list=ids.map(id=>map.get(id)).filter(Boolean);
  if(!list.length){ showToast("今天沒有到期複習題"); return; }
  startSession(list,{count:list.length,seconds:0,shuffle:true,instant:true,mode:"review"});
}
function getVocab(){ return load(KEYS.vocab, []); }
function saveVocab(list){ save(KEYS.vocab, list); }
function normalizeWord(word){ return String(word||"").trim().replace(/\s+/g," "); }
function dateInputValue(timestamp){
  const d=timestamp?new Date(timestamp):new Date(dateAfterDays(7));
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function dateFromInput(value){
  if(!value) return dateAfterDays(7);
  const d=new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime())?dateAfterDays(7):d.getTime();
}
function upsertVocab(entry){
  const word=normalizeWord(entry.word);
  if(!word){ showToast("請輸入單字或片語"); return false; }
  const list=getVocab();
  const key=word.toLowerCase();
  const existingIndex=list.findIndex(item=>item.key===key);
  const current=existingIndex>=0?list[existingIndex]:{};
  const item={
    id:current.id||`VOC-${Date.now()}`,
    key,
    word,
    meaning:String(entry.meaning??current.meaning??"").trim(),
    example:String(entry.example??current.example??"").trim(),
    part:String(entry.part??current.part??"other"),
    familiarity:Math.max(1,Math.min(5,Number(entry.familiarity??current.familiarity??2))),
    nextReviewAt:entry.nextReviewAt??current.nextReviewAt??dateAfterDays(7),
    sourceQuestionId:entry.sourceQuestionId??current.sourceQuestionId??"",
    createdAt:current.createdAt||Date.now(),
    updatedAt:Date.now()
  };
  if(existingIndex>=0) list[existingIndex]=item;
  else list.unshift(item);
  saveVocab(list);
  return true;
}
function resetVocabForm(){
  $("#vocabWord").value="";
  $("#vocabMeaning").value="";
  $("#vocabExample").value="";
  $("#vocabFamiliarity").value="2";
  $("#vocabPart").value="5";
}
function saveVocabFromForm(){
  const ok=upsertVocab({
    word:$("#vocabWord").value,
    meaning:$("#vocabMeaning").value,
    example:$("#vocabExample").value,
    part:$("#vocabPart").value,
    familiarity:Number($("#vocabFamiliarity").value),
    nextReviewAt:dateAfterDays(7)
  });
  if(ok){ resetVocabForm(); renderVocab(); showToast("單字已儲存"); }
}
function addSelectedVocab(){
  const q=currentQ();
  const selected=normalizeWord(window.getSelection?.().toString()||"");
  if(!selected){ showToast("請先在題目或文章中選取單字"); return; }
  const meaning=prompt(`為「${selected}」加入中文或筆記：`,"");
  if(meaning===null) return;
  const ok=upsertVocab({
    word:selected,
    meaning,
    example:q?.prompt||q?.passage||"",
    part:q?.part||"other",
    familiarity:1,
    sourceQuestionId:q?.id||"",
    nextReviewAt:dateAfterDays(3)
  });
  if(ok){ showToast("已加入個人單字本"); renderVocab(); }
}
function removeVocab(id){
  saveVocab(getVocab().filter(item=>item.id!==id));
  renderVocab();
}
function updateVocabField(id,field,value){
  const list=getVocab();
  const item=list.find(x=>x.id===id);
  if(!item) return;
  if(field==="familiarity") item.familiarity=Math.max(1,Math.min(5,Number(value)||1));
  else if(field==="nextReviewAt") item.nextReviewAt=dateFromInput(value);
  else item[field]=String(value??"").trim();
  item.updatedAt=Date.now();
  saveVocab(list);
  renderVocab();
}
function exportVocab(){
  download(new Blob([JSON.stringify(getVocab(),null,2)],{type:"application/json"}),`toeic-vocab-${Date.now()}.json`);
}
function renderVocab(){
  const list=getVocab().sort((a,b)=>(a.nextReviewAt||0)-(b.nextReviewAt||0)||(a.familiarity||1)-(b.familiarity||1));
  const due=list.filter(item=>(item.nextReviewAt||0)<=Date.now()).length;
  const avg=list.length?Math.round(list.reduce((s,item)=>s+(item.familiarity||1),0)/list.length*10)/10:0;
  $("#vocabSummary").innerHTML=`
    <div class="mini-item">總單字 <strong style="float:right">${list.length}</strong></div>
    <div class="mini-item">今日到期 <strong style="float:right;color:var(--amber)">${due}</strong></div>
    <div class="mini-item">平均熟悉度 <strong style="float:right;color:var(--primary)">${avg || "—"}</strong></div>`;
  $("#vocabList").innerHTML=list.length?list.map(item=>`
    <article class="vocab-item">
      <div class="badges"><span class="badge">Part ${safe(item.part)}</span><span class="badge gray">下次 ${formatReviewDate(item.nextReviewAt)}</span>${item.sourceQuestionId?`<span class="badge gray">${safe(item.sourceQuestionId)}</span>`:""}</div>
      <h3>${safe(item.word)}</h3>
      <p><b>中文／筆記：</b>${safe(item.meaning||"未填寫")}</p>
      ${item.example?`<p><b>例句：</b>${safe(item.example)}</p>`:""}
      <div class="vocab-meta">
        <label><span>熟悉度</span><select data-vocab-id="${item.id}" data-vocab-field="familiarity">
          ${[1,2,3,4,5].map(n=>`<option value="${n}" ${Number(item.familiarity)===n?"selected":""}>${n}</option>`).join("")}
        </select></label>
        <label><span>下次複習</span><input type="date" value="${dateInputValue(item.nextReviewAt)}" data-vocab-id="${item.id}" data-vocab-field="nextReviewAt"></label>
        <button class="btn danger" data-remove-vocab="${item.id}">移除</button>
      </div>
    </article>`).join(""):'<div class="card empty">尚未加入單字。練習時選取題目中的單字，或手動新增。</div>';
  $$("[data-remove-vocab]").forEach(btn=>btn.onclick=()=>removeVocab(btn.dataset.removeVocab));
  $$("[data-vocab-field]").forEach(input=>input.onchange=()=>updateVocabField(input.dataset.vocabId,input.dataset.vocabField,input.value));
}

function normalizeAutoWord(raw){
  return String(raw||"")
    .toLowerCase()
    .replace(/^'+|'+$/g,"")
    .replace(/'s$/,"")
    .replace(/[^a-z-]/g,"")
    .replace(/^-+|-+$/g,"");
}
function autoLexiconKey(word){
  const direct=TOEIC_VOCAB_LEXICON[word]?word:null;
  if(direct) return direct;
  const candidates=[];
  if(word.endsWith("ies")) candidates.push(`${word.slice(0,-3)}y`);
  if(word.endsWith("ves")) candidates.push(`${word.slice(0,-3)}f`);
  if(word.endsWith("ing")){
    const stem=word.slice(0,-3);
    candidates.push(stem, `${stem}e`, stem.replace(/(.)\1$/,"$1"));
  }
  if(word.endsWith("ed")){
    const stem=word.slice(0,-2);
    candidates.push(stem, `${stem}e`, stem.replace(/(.)\1$/,"$1"));
  }
  if(word.endsWith("es")){
    const stem=word.slice(0,-2);
    candidates.push(stem, `${stem}e`, word.slice(0,-1));
  }
  if(word.endsWith("s")) candidates.push(word.slice(0,-1));
  return candidates.find(x=>TOEIC_VOCAB_LEXICON[x]) || word;
}
function autoVocabSourceText(q){
  return [q.prompt, ...(q.choices||[]), q.passage, q.audioText].filter(Boolean).join(" ");
}
function sentenceCandidates(text){
  return String(text||"")
    .replace(/\s+/g," ")
    .split(/(?<=[.!?])\s+|\n+/)
    .map(x=>x.trim())
    .filter(Boolean);
}
function findExampleForWord(q, word){
  const sources=[q.prompt, ...(q.choices||[]), q.passage, q.audioText].filter(Boolean);
  const re=new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\b`,"i");
  for(const text of sources){
    const sentence=sentenceCandidates(text).find(line=>re.test(line));
    if(sentence) return sentence;
  }
  return q.prompt || "";
}
function buildAutoVocabEntries(){
  const map=new Map();
  getBank().forEach(q=>{
    const text=autoVocabSourceText(q);
    for(const match of text.matchAll(/[A-Za-z][A-Za-z'-]*/g)){
      const raw=match[0];
      let word=normalizeAutoWord(raw);
      if(!word || word.length<4 || word.includes("-") || word.includes("'") || AUTO_VOCAB_STOP_WORDS.has(word)) continue;
      const key=autoLexiconKey(word);
      if(AUTO_VOCAB_STOP_WORDS.has(key)) continue;
      const info=TOEIC_VOCAB_LEXICON[key] || null;
      const existing=map.get(key) || {
        key,
        word:key,
        count:0,
        parts:new Set(),
        questionIds:new Set(),
        example:"",
        known:!!info,
        pos:info?.pos || "",
        kk:info?.kk || "",
        zh:info?.zh || "",
        letter:key.charAt(0).toUpperCase()
      };
      existing.count+=1;
      existing.parts.add(q.part);
      existing.questionIds.add(q.id);
      if(!existing.example) existing.example=info?.example || findExampleForWord(q, raw);
      map.set(key, existing);
    }
  });
  return [...map.values()].map(item=>({
    ...item,
    parts:[...item.parts].sort((a,b)=>Number(a)-Number(b)),
    questionIds:[...item.questionIds],
    status:item.known?"known":"pending"
  }));
}
function autoVocabFilteredEntries(){
  const query=normalizeWord($("#autoVocabSearch")?.value || "").toLowerCase();
  const status=$("#autoVocabStatus")?.value || "all";
  const part=$("#autoVocabPart")?.value || "all";
  const sort=$("#autoVocabSort")?.value || "alpha";
  let entries=buildAutoVocabEntries();
  if(status==="known") entries=entries.filter(x=>x.known);
  if(status==="pending") entries=entries.filter(x=>!x.known);
  if(part!=="all") entries=entries.filter(x=>x.parts.includes(part));
  if(query){
    entries=entries.filter(x=>[
      x.word,x.zh,x.kk,x.pos,x.example,...x.questionIds
    ].some(value=>String(value||"").toLowerCase().includes(query)));
  }
  if(state.autoVocabLetter && state.autoVocabLetter!=="all") entries=entries.filter(x=>x.letter===state.autoVocabLetter);
  entries.sort(sort==="frequency"
    ? (a,b)=>b.count-a.count || a.word.localeCompare(b.word)
    : (a,b)=>a.word.localeCompare(b.word) || b.count-a.count);
  return entries;
}
function addAutoVocabToPersonal(key){
  const entry=buildAutoVocabEntries().find(x=>x.key===key);
  if(!entry){ showToast("找不到這個題庫單字"); return; }
  const ok=upsertVocab({
    word:entry.word,
    meaning:entry.zh || "待補中文解釋",
    example:entry.example,
    part:entry.parts[0] || "other",
    familiarity:1,
    sourceQuestionId:entry.questionIds[0] || "",
    nextReviewAt:dateAfterDays(3)
  });
  if(ok) showToast("已加入個人單字本");
}
function renderAutoVocab(){
  const all=buildAutoVocabEntries();
  const known=all.filter(x=>x.known).length;
  const pending=all.length-known;
  const status=$("#autoVocabStatus")?.value || "all";
  const part=$("#autoVocabPart")?.value || "all";
  const query=normalizeWord($("#autoVocabSearch")?.value || "").toLowerCase();
  const letterBase=all.filter(x=>
    (status==="all" || (status==="known" ? x.known : !x.known)) &&
    (part==="all" || x.parts.includes(part)) &&
    (!query || [x.word,x.zh,x.kk,x.pos,x.example,...x.questionIds].some(value=>String(value||"").toLowerCase().includes(query)))
  );
  const letterCounts=new Map();
  letterBase.forEach(x=>letterCounts.set(x.letter,(letterCounts.get(x.letter)||0)+1));
  const entries=autoVocabFilteredEntries();
  $("#autoVocabTotal").textContent=all.length;
  $("#autoVocabKnown").textContent=known;
  $("#autoVocabPending").textContent=pending;
  $("#autoVocabShown").textContent=entries.length;
  $("#autoVocabLetters").innerHTML=AUTO_VOCAB_LETTERS.map(letter=>{
    const active=(state.autoVocabLetter||"all")===letter;
    const label=letter==="all"?"ALL":letter;
    const count=letter==="all"?letterBase.length:(letterCounts.get(letter)||0);
    return `<button class="az-btn ${active?"active":""}" data-auto-letter="${letter}">${label}<small>${count}</small></button>`;
  }).join("");
  $("#autoVocabList").innerHTML=entries.length?entries.map(entry=>`
    <article class="word-card ${entry.known?"":"pending"}">
      <div class="badges">
        <span class="badge">${safe(entry.letter)}</span>
        <span class="badge gray">出現 ${entry.count} 次</span>
        <span class="badge gray">Part ${entry.parts.map(safe).join(" / ")}</span>
        ${entry.known?`<span class="badge">完整詞條</span>`:`<span class="badge amber">題庫候選詞</span>`}
      </div>
      <h3><span>${safe(entry.word)}</span> <small>${safe(entry.kk || "KK 待補")}</small><button class="icon-btn speak-word" data-speak-word="${safe(entry.word)}" aria-label="播放 ${safe(entry.word)} 發音">▶</button></h3>
      <p><b>${safe(entry.pos || "詞性待補")}</b>　${safe(entry.zh || "待補中文解釋")}</p>
      <p class="example"><b>題庫例句：</b>${safe(entry.example || "尚未擷取到完整例句")}</p>
      <div class="sources">來源題號：${safe(entry.questionIds.slice(0,6).join(", "))}${entry.questionIds.length>6?` 等 ${entry.questionIds.length} 題`:""}</div>
      <div class="vocab-meta"><button class="btn" data-add-auto-vocab="${safe(entry.key)}">加入個人單字本</button>${entry.known?`<button class="btn" data-review-auto-vocab="${safe(entry.key)}">練這個單字</button>`:""}</div>
    </article>`).join(""):'<div class="card empty">這個條件下沒有單字。試著切換字母、顯示模式或清空搜尋。</div>';
  $$("[data-auto-letter]").forEach(btn=>btn.onclick=()=>{ state.autoVocabLetter=btn.dataset.autoLetter; renderAutoVocab(); });
  $$("[data-add-auto-vocab]").forEach(btn=>btn.onclick=()=>addAutoVocabToPersonal(btn.dataset.addAutoVocab));
  $$("[data-review-auto-vocab]").forEach(btn=>btn.onclick=()=>startSingleVocabReview(btn.dataset.reviewAutoVocab));
  $$("[data-speak-word]").forEach(btn=>btn.onclick=()=>speakWord(btn.dataset.speakWord));
}

function vocabReviewPool(){
  const source=$("#vocabReviewSource")?.value || "known";
  const part=$("#vocabReviewPart")?.value || "all";
  if(source==="personal"){
    return getVocab()
      .filter(item=>item.word&&item.meaning)
      .filter(item=>part==="all"||String(item.part)===part)
      .map(item=>({
        key:item.key||normalizeWord(item.word).toLowerCase(),
        word:normalizeWord(item.word),
        zh:item.meaning,
        kk:"",
        pos:"個人單字",
        example:item.example||"",
        parts:[String(item.part||"other")],
        questionIds:item.sourceQuestionId?[item.sourceQuestionId]:[],
        personal:true
      }));
  }
  return buildAutoVocabEntries()
    .filter(entry=>entry.known&&entry.zh)
    .filter(entry=>part==="all"||entry.parts.includes(part));
}
function renderVocabReviewSummary(){
  const known=buildAutoVocabEntries().filter(entry=>entry.known&&entry.zh).length;
  const personal=getVocab().filter(item=>item.word&&item.meaning).length;
  const pool=vocabReviewPool();
  $("#vocabReviewSummary").innerHTML=`
    <div class="mini-item">題庫完整詞條 <strong style="float:right;color:var(--primary)">${known}</strong></div>
    <div class="mini-item">個人單字可出題 <strong style="float:right;color:var(--green)">${personal}</strong></div>
    <div class="mini-item">目前條件可用 <strong style="float:right">${pool.length}</strong></div>
    <div class="mini-item">題型 <strong style="float:right">${safe($("#vocabReviewMode")?.selectedOptions?.[0]?.textContent||"混合題型")}</strong></div>`;
}
function clozeText(example, word){
  if(!example) return "";
  const re=new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\b`,"i");
  return example.replace(re,"_____");
}
function vocabModeFor(entry, preferred){
  if(preferred==="cloze" && (!entry.example || clozeText(entry.example, entry.word)===entry.example)) return "meaning";
  if(preferred==="audio" && !("speechSynthesis" in window)) return "meaning";
  if(preferred!=="mixed") return preferred;
  const modes=["meaning"];
  if(entry.example&&clozeText(entry.example, entry.word)!==entry.example) modes.push("cloze");
  if("speechSynthesis" in window) modes.push("audio");
  return modes[Math.floor(Math.random()*modes.length)];
}
function buildVocabReviewQuestions(){
  const pool=vocabReviewPool();
  const count=Math.min(Number($("#vocabReviewCount")?.value||10), pool.length);
  const preferred=$("#vocabReviewMode")?.value || "mixed";
  const chosen=shuffle(pool).slice(0,count);
  return chosen.map(entry=>{
    const mode=vocabModeFor(entry, preferred);
    const distractors=shuffle(pool.filter(x=>x.key!==entry.key)).slice(0,3);
    const choices=shuffle([entry, ...distractors]).map(item=>{
      if(mode==="meaning") return {label:item.zh, key:item.key};
      return {label:item.word, key:item.key};
    });
    const answer=choices.findIndex(choice=>choice.key===entry.key);
    const prompt=mode==="meaning"
      ? `「${entry.word}」的中文意思是？`
      : mode==="cloze"
        ? clozeText(entry.example, entry.word)
        : "請聽發音，選出正確單字。";
    return {entry, mode, prompt, choices, answer};
  });
}
function startSingleVocabReview(key){
  const pool=buildAutoVocabEntries().filter(entry=>entry.known&&entry.zh);
  const target=pool.find(entry=>entry.key===key);
  if(!target){ showToast("這個單字還沒有完整詞條"); return; }
  const extras=shuffle(pool.filter(entry=>entry.key!==key)).slice(0,4);
  $("#vocabReviewSource").value="known";
  $("#vocabReviewMode").value="mixed";
  state.vocabQuiz={questions:shuffle([target,...extras]).map(entry=>{
    const mode=vocabModeFor(entry,"mixed");
    const distractors=shuffle(pool.filter(x=>x.key!==entry.key)).slice(0,3);
    const choices=shuffle([entry, ...distractors]).map(item=>mode==="meaning"?{label:item.zh,key:item.key}:{label:item.word,key:item.key});
    return {
      entry,
      mode,
      prompt:mode==="meaning"?`「${entry.word}」的中文意思是？`:mode==="cloze"?clozeText(entry.example, entry.word):"請聽發音，選出正確單字。",
      choices,
      answer:choices.findIndex(choice=>choice.key===entry.key)
    };
  }), index:0, answers:[]};
  showView("vocabReviewView");
  renderVocabReview();
}
function startVocabReview(){
  const pool=vocabReviewPool();
  if(pool.length<4){ showToast("目前條件至少需要 4 個可用單字"); return; }
  state.vocabQuiz={questions:buildVocabReviewQuestions(), index:0, answers:[]};
  renderVocabReview();
}
function resetVocabReview(){
  state.vocabQuiz={questions:[], index:0, answers:[]};
  renderVocabReviewSummary();
  $("#vocabQuizBadges").innerHTML="";
  $("#vocabQuizScore").textContent="0/0";
  $("#vocabQuizProgress").style.width="0";
  $("#vocabQuizArea").innerHTML='<div class="empty">設定題型後按「開始單字複習」。</div>';
  $("#nextVocabQuestion").disabled=true;
}
function renderVocabReview(){
  renderVocabReviewSummary();
  const quiz=state.vocabQuiz;
  const total=quiz.questions.length;
  if(!total){ resetVocabReview(); return; }
  const q=quiz.questions[quiz.index];
  const existing=quiz.answers[quiz.index];
  const done=quiz.answers.filter(Boolean);
  const correct=done.filter(x=>x.correct).length;
  $("#vocabQuizBadges").innerHTML=`<span class="badge">Q${quiz.index+1}/${total}</span><span class="badge gray">${q.mode==="meaning"?"英翻中":q.mode==="cloze"?"例句填空":"聽音辨字"}</span><span class="badge gray">${safe(q.entry.pos||"")}</span>`;
  $("#vocabQuizScore").textContent=`${correct}/${done.length}`;
  $("#vocabQuizProgress").style.width=`${Math.round((quiz.index+(existing?1:0))/total*100)}%`;
  const choices=q.choices.map((choice,i)=>{
    let cls="";
    if(existing){
      if(i===q.answer) cls="correct";
      else if(i===existing.selected) cls="wrong";
      else cls="dim";
    }
    return `<button class="choice ${cls}" data-vocab-choice="${i}" ${existing?"disabled":""}><span class="choice-letter">${letter(i)}</span><span>${safe(choice.label)}</span></button>`;
  }).join("");
  const prompt=q.mode==="audio"
    ? `<div class="vocab-audio-prompt"><button class="btn primary" id="playVocabPrompt">▶ 播放單字</button><span>聽發音後選出正確單字</span></div>`
    : `<div class="question">${safe(q.prompt)}</div>`;
  const feedback=existing?`
    <div class="feedback">
      <strong>${existing.correct?"答對了":"再看一次"}</strong>
      <div style="margin-top:8px"><b>${safe(q.entry.word)}</b> ${q.entry.kk?`<span style="color:var(--primary)">${safe(q.entry.kk)}</span>`:""}　${safe(q.entry.zh)}</div>
      ${q.entry.example?`<div class="translation-block"><b>題庫例句：</b>${safe(q.entry.example)}</div>`:""}
    </div>`:"";
  $("#vocabQuizArea").innerHTML=`
    <div class="vocab-word-head"><h3>${safe(q.entry.word)}</h3><button class="icon-btn speak-word" id="speakCurrentVocab" aria-label="播放 ${safe(q.entry.word)} 發音">▶</button></div>
    ${prompt}
    <div class="choices">${choices}</div>
    ${feedback}`;
  $$("[data-vocab-choice]").forEach(btn=>btn.onclick=()=>answerVocabQuestion(Number(btn.dataset.vocabChoice)));
  $("#speakCurrentVocab").onclick=()=>speakWord(q.entry.word);
  $("#playVocabPrompt")?.addEventListener("click",()=>speakWord(q.entry.word));
  if(q.mode==="audio"&&!existing) setTimeout(()=>speakWord(q.entry.word),250);
  $("#nextVocabQuestion").disabled=!existing;
  $("#nextVocabQuestion").textContent=quiz.index>=total-1?"完成複習":"下一題";
}
function answerVocabQuestion(selected){
  const quiz=state.vocabQuiz;
  if(!quiz.questions.length||quiz.answers[quiz.index]) return;
  const q=quiz.questions[quiz.index];
  quiz.answers[quiz.index]={selected, correct:selected===q.answer};
  renderVocabReview();
}
function nextVocabQuestion(){
  const quiz=state.vocabQuiz;
  if(!quiz.questions.length||!quiz.answers[quiz.index]) return;
  if(quiz.index>=quiz.questions.length-1){
    const correct=quiz.answers.filter(x=>x.correct).length;
    $("#vocabQuizArea").innerHTML=`
      <div class="result-banner" style="padding:20px">
        <h2>單字複習完成</h2>
        <p style="color:var(--muted)">答對 ${correct}/${quiz.questions.length} 題，正確率 ${Math.round(correct/quiz.questions.length*100)}%。</p>
        <button class="btn primary" id="restartVocabReview">再練一次</button>
      </div>`;
    $("#nextVocabQuestion").disabled=true;
    $("#restartVocabReview").onclick=startVocabReview;
    return;
  }
  quiz.index++;
  renderVocabReview();
}

function strategyTypeLabel(type){
  return {grammar:"文法快判",reading:"閱讀定位",listening:"聽力戰術",vocabulary:"字彙搭配"}[type]||"綜合技巧";
}
function strategyPartLabel(parts){
  return parts.length===1?`Part ${parts[0]}`:parts.map(p=>`Part ${p}`).join(" / ");
}
function strategyLevelLabel(level){
  return level===1?"入門高頻":level===2?"中階提速":"高分推論";
}
function strategyDeckViews(){
  const bank=getActiveBank();
  const selectedPart=$("#strategyPart")?.value||"all";
  const selectedType=$("#strategyType")?.value||"all";
  const query=($("#strategySearch")?.value||"").trim().toLowerCase();
  let views=STRATEGY_DECKS.map(deck=>{
    const allQuestions=bank.filter(q=>deck.match(q));
    const questions=selectedPart==="all"?allQuestions:allQuestions.filter(q=>q.part===selectedPart);
    return {...deck, allQuestions, questions, count:questions.length, allCount:allQuestions.length};
  }).filter(deck=>deck.count>0);
  if(selectedType!=="all") views=views.filter(deck=>deck.type===selectedType);
  if(query){
    views=views.filter(deck=>{
      const text=[deck.title,deck.summary,deck.signal,deck.trap,strategyTypeLabel(deck.type),strategyPartLabel(deck.parts),...(deck.steps||[])].join(" ").toLowerCase();
      return text.includes(query);
    });
  }
  const sort=$("#strategySort")?.value||"yield";
  if(sort==="part") views.sort((a,b)=>Number(a.parts[0])-Number(b.parts[0])||a.title.localeCompare(b.title,"zh-Hant"));
  else if(sort==="level") views.sort((a,b)=>a.level-b.level||b.count-a.count);
  else views.sort((a,b)=>b.count-a.count||a.level-b.level);
  return views;
}
function strategyStats(){
  const bank=getActiveBank();
  const mapped=new Set();
  const counts=STRATEGY_DECKS.map(deck=>{
    const questions=bank.filter(q=>deck.match(q));
    questions.forEach(q=>mapped.add(q.id));
    return questions.length;
  });
  return {
    total:STRATEGY_DECKS.length,
    mapped:mapped.size,
    highYield:counts.filter(n=>n>=20).length
  };
}
function strategySample(q){
  const prompt=safe(q.prompt.length>118?`${q.prompt.slice(0,118)}...`:q.prompt);
  return `<div class="strategy-sample"><span class="badge gray">Part ${safe(q.part)}</span><span class="badge gray">${safe(q.id)}</span><strong>${prompt}</strong></div>`;
}
function strategyById(id){
  return STRATEGY_DECKS.find(item=>item.id===id);
}
function renderStrategyLastReview(){
  const box=$("#strategyLastReview");
  if(!box) return;
  const r=state.lastResult;
  if(!r||r.mode!=="技巧專練"){
    box.hidden=true;
    box.innerHTML="";
    return;
  }
  box.hidden=false;
  const title=r.strategyTitle||"混合技巧專練";
  box.innerHTML=`
    <div class="strategy-review-head">
      <div>
        <div class="badges"><span class="badge">最近技巧專練</span><span class="badge gray">${safe(title)}</span><span class="badge gray">${r.total} 題</span></div>
        <h3>答對 ${r.correct}/${r.total} 題，正確率 ${r.accuracy}%</h3>
        <p>可以回到成績頁看逐題答案、詳解、文章線索與聽力逐字稿。</p>
      </div>
      <div class="group">
        <button class="btn primary" id="openStrategyReview">看答案與詳解</button>
        ${r.strategyId&&strategyById(r.strategyId)?`<button class="btn" id="repeatStrategyReview">再練同技巧</button>`:""}
      </div>
    </div>`;
  $("#openStrategyReview").onclick=()=>{ renderResult(); showView("resultView"); setTimeout(()=>$("#answerReviewList")?.scrollIntoView({behavior:"smooth",block:"start"}),80); };
  $("#repeatStrategyReview")?.addEventListener("click",()=>startStrategyPractice(r.strategyId));
}
function renderStrategies(){
  const views=strategyDeckViews();
  const stats=strategyStats();
  $("#strategyTotal").textContent=stats.total;
  $("#strategyMapped").textContent=stats.mapped;
  $("#strategyHighYield").textContent=stats.highYield;
  $("#strategyShown").textContent=views.length;
  renderStrategyLastReview();
  $("#strategyList").innerHTML=views.length?views.map(deck=>`
    <article class="strategy-card">
      <div class="strategy-card-top">
        <div class="badges">
          <span class="badge">命中 ${deck.count} 題</span>
          <span class="badge gray">${strategyPartLabel(deck.parts)}</span>
          <span class="badge gray">${strategyTypeLabel(deck.type)}</span>
          <span class="badge gray">${strategyLevelLabel(deck.level)}</span>
        </div>
        <button class="btn primary" data-strategy-practice="${safe(deck.id)}">練這類題</button>
      </div>
      <h3>${safe(deck.title)}</h3>
      <p>${safe(deck.summary)}</p>
      <div class="strategy-signal"><strong>判斷訊號</strong><span>${safe(deck.signal)}</span></div>
      <ol class="strategy-steps">${deck.steps.map(step=>`<li>${safe(step)}</li>`).join("")}</ol>
      <div class="strategy-trap"><strong>常見陷阱：</strong>${safe(deck.trap)}</div>
      <details class="strategy-details">
        <summary>看命中範例</summary>
        <div class="strategy-samples">${deck.questions.slice(0,3).map(strategySample).join("")}</div>
      </details>
    </article>
  `).join(""):'<div class="empty">目前篩選條件下沒有命中的技巧分類。</div>';
  $$("[data-strategy-practice]").forEach(btn=>btn.onclick=()=>startStrategyPractice(btn.dataset.strategyPractice));
}
function startStrategyPractice(id){
  const deck=strategyById(id);
  if(!deck){ showToast("找不到這個技巧分類"); return; }
  const part=$("#strategyPart")?.value||"all";
  const list=getActiveBank().filter(q=>deck.match(q) && (part==="all"||q.part===part));
  startSession(list,{count:Math.min(20,list.length),seconds:0,shuffle:true,instant:true,mode:"strategy",strategyId:deck.id,strategyTitle:deck.title});
}
function startStrategyMix(){
  const map=new Map();
  strategyDeckViews().forEach(deck=>deck.questions.forEach(q=>map.set(q.id,q)));
  const list=[...map.values()];
  startSession(list,{count:Math.min(20,list.length),seconds:0,shuffle:true,instant:true,mode:"strategy",strategyTitle:"混合技巧專練"});
}
function readingLiteracyQuestions(skill="all"){
  return getActiveBank().filter(q=>(q.tags||[]).includes("literacy-core")&&(skill==="all"||q.literacySkill===skill));
}
function renderReadingLiteracy(){
  const all=readingLiteracyQuestions();
  const selected=$("#readingSkillSelect")?.value||state.readingSkill||"all";
  state.readingSkill=selected;
  const filtered=readingLiteracyQuestions(selected);
  const annotated=all.filter(q=>q.evidence&&q.evidenceLocation&&Array.isArray(q.choiceNotes)).length;
  $("#literacyQuestionCount").textContent=all.length;
  $("#literacySkillCount").textContent=READING_LITERACY_SKILLS.length-1;
  $("#literacyAnnotatedCount").textContent=annotated;
  $("#literacyCurrentCount").textContent=filtered.length;
  $("#literacySkillGrid").innerHTML=READING_LITERACY_SKILLS.slice(1).map(skill=>{
    const questions=readingLiteracyQuestions(skill.id);
    const groups=new Set(questions.map(q=>q.groupId||q.id)).size;
    const active=selected===skill.id;
    return `<article class="literacy-skill-card ${active?"active":""}"${active?' aria-current="true"':""}>
      <div class="literacy-skill-top"><span>${safe(skill.label)}</span><strong>${questions.length} 題</strong></div>
      <p>${safe(skill.description)}</p>
      <div class="literacy-skill-meta">${groups} 組文件 · 全數人工線索標註</div>
      <button class="btn ${active?"primary":""}" data-literacy-skill="${safe(skill.id)}">${active?"開始目前能力":"練這項能力"}</button>
    </article>`;
  }).join("");
  $$("[data-literacy-skill]").forEach(button=>button.onclick=()=>startReadingLiteracy(button.dataset.literacySkill));
}
function startReadingLiteracy(skill=state.readingSkill||"all"){
  const list=readingLiteracyQuestions(skill);
  const count=skill==="all"?Math.min(12,list.length):list.length;
  startSession(list,{count,seconds:0,shuffle:true,instant:true,mode:"literacy"});
}

function encodeSession(session){
  return session.map(q=>({
    id:q.id,
    choices:q.choices,
    choiceNotes:q.choiceNotes,
    answer:q.answer,
    _groupKey:q._groupKey||null,
    _groupIndex:q._groupIndex||0,
    _groupSize:q._groupSize||1
  }));
}
function decodeSnapshotSession(snapshot){
  if(Array.isArray(snapshot?.sessionRefs)){
    const bankMap=new Map(getBank().map(q=>[q.id,q]));
    return snapshot.sessionRefs.map(ref=>{
      const source=bankMap.get(ref.id);
      if(!source) return null;
      const item=clone(source);
      if(Array.isArray(ref.choices)&&ref.choices.length) item.choices=ref.choices;
      if(Array.isArray(ref.choiceNotes)&&ref.choiceNotes.length===ref.choices?.length) item.choiceNotes=ref.choiceNotes;
      if(Number.isInteger(ref.answer)) item.answer=ref.answer;
      item._groupKey=ref._groupKey||null;
      item._groupIndex=ref._groupIndex||0;
      item._groupSize=ref._groupSize||1;
      return item;
    }).filter(Boolean);
  }
  return Array.isArray(snapshot?.session)?snapshot.session:[];
}
function snapshotQuestionCount(snapshot){
  if(Array.isArray(snapshot?.sessionRefs)) return snapshot.sessionRefs.length;
  if(Array.isArray(snapshot?.session)) return snapshot.session.length;
  return 0;
}
function startQuestionClock(){
  state.questionStartedIndex=state.currentIndex;
  state.questionStartedAt=Date.now();
  state.questionEndsAt=state.sessionMode!=="mock"&&state.options.seconds&&!state.answers[state.currentIndex]
    ? Date.now()+state.options.seconds*1000
    : null;
}
function ensureQuestionClock(){
  if(state.questionStartedIndex!==state.currentIndex||!state.questionStartedAt) startQuestionClock();
  if(state.answers[state.currentIndex]) state.questionEndsAt=null;
}
function elapsedForCurrentQuestion(){
  return state.questionStartedAt?Math.max(0,Math.round((Date.now()-state.questionStartedAt)/1000)):0;
}

function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
function showToast(msg){
  const t=$("#toast"); t.textContent=msg; t.style.display="block";
  clearTimeout(showToast.id); showToast.id=setTimeout(()=>t.style.display="none",2200);
}
function showView(id){
  state.currentView=id;
  closeMobileNav();
  $$(".view").forEach(v=>v.classList.toggle("active",v.id===id));
  $$(".nav button").forEach(b=>{
    const active=b.dataset.nav===id;
    b.classList.toggle("active",active);
    if(active) b.setAttribute("aria-current","page");
    else b.removeAttribute("aria-current");
  });
  $$("[data-mobile-nav]").forEach(b=>{
    const active=b.dataset.mobileNav===id;
    b.classList.toggle("active",active);
    if(active) b.setAttribute("aria-current","page");
    else b.removeAttribute("aria-current");
  });
  const titles=APP_SHELL.viewTitles || {
    homeView:"多益題海學習儀表板",setupView:"建立練習",practiceView:"進行練習",
    resultView:"本次成績",wrongView:"錯題本",vocabView:"個人單字本",autoVocabView:"題庫單字庫",vocabReviewView:"單字複習",strategyView:"答題技巧專區",readingView:"閱讀素養專區",historyView:"歷史成績",analyticsView:"弱點分析",storageView:"儲存中心",bankView:"題庫管理"
  };
  $("#viewTitle").textContent=titles[id]||"多益題海";
  if(id==="homeView") renderDashboard();
  if(id==="setupView") updateAvailable();
  if(id==="wrongView") renderWrongBook();
  if(id==="vocabView") renderVocab();
  if(id==="autoVocabView") renderAutoVocab();
  if(id==="vocabReviewView") renderVocabReviewSummary();
  if(id==="strategyView") renderStrategies();
  if(id==="readingView") renderReadingLiteracy();
  if(id==="historyView") renderHistory();
  if(id==="analyticsView") renderAnalytics();
  if(id==="storageView") renderStorageCenter();
  if(id==="bankView"){ renderLegalSourceHub(); renderQualityDashboard(); }
  window.scrollTo({top:0,behavior:"smooth"});
}
function showViewAndFocus(id){
  showView(id);
  requestAnimationFrame(()=>$("#viewTitle")?.focus({preventScroll:true}));
}
function openMobileNav(){
  $(".sidebar")?.classList.add("mobile-open");
  $("#mobileScrim")?.classList.add("show");
  document.body.classList.add("nav-open");
  $("#mobileHome")?.setAttribute("aria-expanded","true");
}
function closeMobileNav(){
  $(".sidebar")?.classList.remove("mobile-open");
  $("#mobileScrim")?.classList.remove("show");
  document.body.classList.remove("nav-open");
  $("#mobileHome")?.setAttribute("aria-expanded","false");
}
function activeSnapshot(){
  if(!state.session.length||state.lastResult) return null;
  return {
    savedAt:Date.now(),
    sessionRefs:encodeSession(state.session),
    currentIndex:state.currentIndex,
    answers:state.answers,
    pendingSelections:state.pendingSelections,
    reviewFlags:state.reviewFlags,
    questionStartedAt:state.questionStartedAt,
    questionStartedIndex:state.questionStartedIndex,
    questionEndsAt:state.questionEndsAt,
    options:state.options,
    sessionStrategy:state.sessionStrategy,
    sessionMode:state.sessionMode,
    mockSection:state.mockSection,
    mockBoundary:state.mockBoundary,
    sectionRemaining:state.sectionRemaining,
    sectionEndsAt:state.sectionEndsAt,
    audioPlays:state.audioPlays,
    autoPlayedAudio:state.autoPlayedAudio
  };
}
function persistActive(){
  const snapshot=activeSnapshot();
  if(snapshot) save(KEYS.active,snapshot);
}
function clearActive(){
  try{ localStorage.removeItem(KEYS.active); }
  catch{ save(KEYS.active,null); }
  renderResumeBanner();
}
function renderResumeBanner(){
  const snapshot=load(KEYS.active,null);
  const banner=$("#resumeBanner");
  if(!banner) return;
  const total=snapshotQuestionCount(snapshot);
  if(!total){
    banner.classList.remove("show");
    return;
  }
  const answered=(snapshot.answers||[]).filter(Boolean).length;
  const mode=snapshot.sessionMode==="mock"?"Part 1–7 模考":snapshot.sessionMode==="strategy"?"技巧專練":snapshot.sessionMode==="literacy"?"閱讀素養":"自由練習";
  const saved=new Date(snapshot.savedAt).toLocaleString("zh-TW");
  $("#resumeDescription").textContent=`${mode}｜已完成 ${answered}/${total} 題｜最後儲存：${saved}`;
  banner.classList.add("show");
}
function restoreActive(){
  const snapshot=load(KEYS.active,null);
  const session=decodeSnapshotSession(snapshot);
  if(!session.length){ showToast("沒有可恢復的進度"); return; }
  clearInterval(state.timerId);
  clearInterval(state.sectionTimerId);
  const currentIndex=Math.min(snapshot.currentIndex||0,session.length-1);
  Object.assign(state,{
    session,
    currentIndex,
    answers:snapshot.answers||[],
    pendingSelections:snapshot.pendingSelections||[],
    reviewFlags:snapshot.reviewFlags||Array(session.length).fill(false),
    questionStartedAt:snapshot.questionStartedAt||null,
    questionStartedIndex:snapshot.questionStartedIndex??null,
    questionEndsAt:snapshot.questionEndsAt||null,
    options:snapshot.options||{instant:true,shuffle:true,seconds:0,playLimit:2},
    sessionStrategy:snapshot.sessionStrategy||null,
    sessionMode:snapshot.sessionMode||"practice",
    mockSection:snapshot.mockSection||null,
    mockBoundary:snapshot.mockBoundary||0,
    sectionRemaining:snapshot.sectionRemaining||0,
    sectionEndsAt:snapshot.sectionEndsAt||null,
    audioPlays:snapshot.audioPlays||{},
    autoPlayedAudio:snapshot.autoPlayedAudio||{},
    lastResult:null,
    restored:true
  });
  showView("practiceView");
  if(state.sessionMode==="mock"){
    resumeMockClock();
  }
  renderQuestion();
  showToast("已恢復上次進度");
}
function filteredBank(){
  const part=$("#partSelect").value, diff=$("#difficultySelect").value;
  return getActiveBank().filter(q => (part==="all"||q.part===part) && (diff==="all"||q.difficulty===diff));
}
function updateAvailable(){
  const list=filteredBank();
  $("#availableCount").textContent=list.length;
  const counts={};
  list.forEach(q=>counts[`Part ${q.part}`]=(counts[`Part ${q.part}`]||0)+1);
  $("#filterBreakdown").innerHTML=Object.entries(counts).map(([k,v])=>`<div class="mini-item"><strong>${k}</strong><span style="float:right">${v} 題</span></div>`).join("")||'<div class="empty">沒有符合條件的題目</div>';
}
function prepareSessionQuestion(source,unit,index,shuffleChoices){
  const item=clone(source);
  item._groupKey=unit.questions.length>1?unit.key:null;
  item._groupIndex=index;
  item._groupSize=unit.questions.length;
  if(shuffleChoices){
    const pairs=item.choices.map((text,i)=>({text,correct:i===item.answer,note:item.choiceNotes?.[i]}));
    const mixed=shuffle(pairs);
    item.choices=mixed.map(x=>x.text);
    if(Array.isArray(item.choiceNotes)) item.choiceNotes=mixed.map(x=>x.note);
    item.answer=mixed.findIndex(x=>x.correct);
  }
  if(item.part==="1") item.audioText=buildPart1AudioText(item.choices);
  return item;
}
function sessionFrom(list,count){
  const groupMap=new Map();
  const units=[];
  list.forEach(q=>{
    const isGrouped=!!q.groupId;
    if(isGrouped){
      if(!groupMap.has(q.groupId)) groupMap.set(q.groupId,[]);
      groupMap.get(q.groupId).push(q);
    }else{
      units.push({key:q.id,questions:[q]});
    }
  });
  groupMap.forEach((questions,key)=>{
    questions.sort((a,b)=>a.id.localeCompare(b.id,undefined,{numeric:true}));
    units.push({key,questions});
  });

  const randomized=shuffle(units);
  const selected=[];
  const skipped=[];
  let total=0;

  randomized.forEach(unit=>{
    if(total+unit.questions.length<=count){
      selected.push(unit); total+=unit.questions.length;
    }else{
      skipped.push(unit);
    }
  });

  if(total===0 && randomized.length){
    selected.push(randomized[0]); total=randomized[0].questions.length;
  }else if(total<count){
    const candidate=skipped
      .filter(u=>!selected.includes(u))
      .sort((a,b)=>a.questions.length-b.questions.length)[0];
    if(candidate && count-total>=Math.ceil(candidate.questions.length/2)){
      selected.push(candidate); total+=candidate.questions.length;
    }
  }

  const output=[];
  selected.forEach(unit=>{
    unit.questions.forEach((source,index)=>{
      output.push(prepareSessionQuestion(source,unit,index,state.options.shuffle));
    });
  });
  return output;
}
function startSession(list, options={}){
  if(!list.length){ showToast("沒有可用題目"); return; }
  clearActive();
  state.options={
    instant: options.instant ?? $("#instantFeedback").checked,
    shuffle: options.shuffle ?? $("#shuffleChoices").checked,
    seconds: Number(options.seconds ?? $("#timeSelect").value),
    playLimit: Number(options.playLimit ?? $("#playLimitSelect").value)
  };
  state.sessionMode=options.mode || "practice";
  state.sessionStrategy=options.strategyId||options.strategyTitle?{
    id:options.strategyId||null,
    title:options.strategyTitle||"混合技巧專練"
  }:null;
  const count=Number(options.count ?? $("#countSelect").value);
  state.session=sessionFrom(list,count);
  state.currentIndex=0;
  state.answers=[];
  state.pendingSelections=[];
  state.reviewFlags=Array(state.session.length).fill(false);
  state.audioPlays={};
  state.autoPlayedAudio={};
  clearListeningPrep();
  state.mockSection=null;
  state.mockBoundary=0;
  state.questionStartedAt=null;
  state.questionStartedIndex=null;
  state.questionEndsAt=null;
  state.lastResult=null;
  if(state.session.length!==count){
    showToast(`完整題組模式：本回合調整為 ${state.session.length} 題`);
  }
  showView("practiceView"); startQuestionClock(); renderQuestion(); persistActive();
}
function startConfigured(){
  const list=filteredBank();
  startSession(list,{count:Number($("#countSelect").value),mode:"practice"});
}
function buildUnits(list){
  const map=new Map();
  list.forEach(q=>{
    const key=q.groupId||q.id;
    if(!map.has(key)) map.set(key,[]);
    map.get(key).push(q);
  });
  return [...map.entries()].map(([key,questions])=>({
    key,
    questions:questions.sort((a,b)=>a.id.localeCompare(b.id,undefined,{numeric:true}))
  }));
}
function selectUnitsExact(units,target){
  const candidates=shuffle(units);
  const dp=new Map([[0,[]]]);
  candidates.forEach(unit=>{
    const size=unit.questions.length;
    const entries=[...dp.entries()].sort((a,b)=>b[0]-a[0]);
    entries.forEach(([sum,chosen])=>{
      const next=sum+size;
      if(next<=target&&!dp.has(next)) dp.set(next,[...chosen,unit]);
    });
  });
  return dp.get(target)||null;
}
function prepareUnits(units,shuffleChoices=true){
  const output=[];
  units.forEach(unit=>{
    unit.questions.forEach((source,index)=>{
      output.push(prepareSessionQuestion(source,unit,index,shuffleChoices));
    });
  });
  return output;
}
function buildMockSession(){
  const distribution={"1":6,"2":25,"3":39,"4":30,"5":30,"6":16,"7":54};
  const output=[];
  for(const part of ["1","2","3","4","5","6","7"]){
    const units=buildUnits(getActiveBank().filter(q=>q.part===part));
    const selected=selectUnitsExact(units,distribution[part]);
    if(!selected) throw new Error(`Part ${part} 題庫無法組成 ${distribution[part]} 題`);
    output.push(...prepareUnits(shuffle(selected),true));
  }
  return output;
}
function startMockExam(){
  clearActive();
  let session;
  try{ session=buildMockSession(); }
  catch(error){ showToast(error.message); return; }
  clearInterval(state.timerId);
  clearInterval(state.sectionTimerId);
  state.options={instant:false,shuffle:true,seconds:0,playLimit:1};
  state.sessionMode="mock";
  state.session=session;
  state.currentIndex=0;
  state.answers=[];
  state.pendingSelections=[];
  state.reviewFlags=Array(session.length).fill(false);
  state.audioPlays={};
  state.autoPlayedAudio={};
  state.mockBoundary=session.findIndex(q=>q.part==="5");
  state.questionStartedAt=null;
  state.questionStartedIndex=null;
  state.questionEndsAt=null;
  state.lastResult=null;
  showView("practiceView");
  startMockSection("listening");
  startQuestionClock();
  renderQuestion();
  persistActive();
}
function formatClock(totalSeconds){
  const seconds=Math.max(0,totalSeconds);
  const hours=Math.floor(seconds/3600);
  const minutes=Math.floor((seconds%3600)/60);
  const secs=seconds%60;
  return hours>0
    ? `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(secs).padStart(2,"0")}`
    : `${String(minutes).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
}
function updateMockClock(){
  const card=$("#mockSectionCard");
  if(!card) return;
  card.hidden=state.sessionMode!=="mock";
  if(state.sessionMode!=="mock") return;
  const listening=state.mockSection==="listening";
  $("#mockSectionLabel").textContent=listening?"Listening Section":"Reading Section";
  $("#mockSectionTime").textContent=formatClock(state.sectionRemaining);
  $("#mockSectionHint").textContent=listening
    ?"時間到將自動鎖定 Listening 並進入 Reading。"
    :"時間到將自動交卷。";
  $("#timerText").textContent=`${listening?"Listening":"Reading"} ${formatClock(state.sectionRemaining)}`;
}
function fillUnanswered(start,end){
  for(let i=start;i<end;i++){
    if(!state.answers[i]){
      const q=state.session[i];
      state.answers[i]={id:q.id,selected:null,correct:false,timedOut:true,elapsed:null};
    }
  }
}
function handleMockSectionExpired(){
  clearInterval(state.sectionTimerId);
  if(state.mockSection==="listening"){
    fillUnanswered(0,state.mockBoundary);
    state.currentIndex=state.mockBoundary;
    startQuestionClock();
    state.reviewFlags=state.reviewFlags.map((flag,index)=>index<state.mockBoundary?false:flag);
    showToast("Listening 時間結束，已自動進入 Reading");
    startMockSection("reading");
    renderQuestion();
    persistActive();
  }else{
    fillUnanswered(state.mockBoundary,state.session.length);
    showToast("Reading 時間結束，系統已自動交卷");
    finishSession();
  }
}
function runMockClock(){
  clearInterval(state.sectionTimerId);
  const tick=()=>{
    state.sectionRemaining=Math.max(0,Math.ceil((state.sectionEndsAt-Date.now())/1000));
    updateMockClock();
    if(state.sectionRemaining<=0) handleMockSectionExpired();
  };
  tick();
  if(state.sectionRemaining>0){
    state.sectionTimerId=setInterval(()=>{
      tick();
      if(state.sectionRemaining%10===0) persistActive();
    },1000);
  }
}
function startMockSection(section){
  state.mockSection=section;
  state.sectionRemaining=section==="listening"?45*60:75*60;
  state.sectionEndsAt=Date.now()+state.sectionRemaining*1000;
  runMockClock();
  persistActive();
}
function resumeMockClock(){
  if(!state.sectionEndsAt){
    state.sectionEndsAt=Date.now()+Math.max(1,state.sectionRemaining)*1000;
  }
  if(state.sectionEndsAt<=Date.now()){
    handleMockSectionExpired();
  }else{
    runMockClock();
  }
}
function enterReadingSection(){
  if(state.sessionMode!=="mock") return;
  if(!confirm("進入 Reading 後將無法返回 Listening。確定繼續嗎？")) return;
  fillUnanswered(0,state.mockBoundary);
  state.currentIndex=state.mockBoundary;
  startQuestionClock();
  startMockSection("reading");
  renderQuestion();
}
function currentQ(){ return state.session[state.currentIndex]; }
function groupIndexes(groupKey){
  if(!groupKey) return [];
  return state.session.map((q,i)=>q._groupKey===groupKey?i:-1).filter(i=>i>=0);
}
function isGroupComplete(groupKey){
  const indexes=groupIndexes(groupKey);
  return indexes.length>0 && indexes.every(i=>!!state.answers[i]);
}
function selectionForIndex(index){
  const answer=state.answers[index];
  if(answer&&Number.isInteger(answer.selected)) return answer.selected;
  const pending=state.pendingSelections[index];
  return Number.isInteger(pending)?pending:null;
}
function shouldRevealAnswerAt(index){
  return !!state.answers[index] && !!state.options.instant;
}
function renderGroupQuestionOverview(q){
  if(!q._groupKey||q._groupSize<=1) return "";
  const indexes=groupIndexes(q._groupKey);
  return `<section class="group-overview">
    <div class="group-overview-head">
      <strong>題組總覽</strong>
      <span>${indexes.filter(i=>state.answers[i]).length}/${indexes.length} 題已選，可先把整組題目讀完再聽音檔或讀文章。</span>
    </div>
    ${indexes.map(index=>{
      const item=state.session[index];
      const answer=state.answers[index];
      const selected=selectionForIndex(index);
      const itemReveal=shouldRevealAnswerAt(index);
      return `<article class="group-question ${index===state.currentIndex?"current":""}">
        <div class="group-question-top">
          <button class="btn" data-group-jump="${index}">Q${index+1}</button>
          <span>Part ${safe(item.part)}｜${safe(item.category)}</span>
          ${state.reviewFlags[index]?'<span class="badge amber">待檢查</span>':""}
        </div>
        <h3>${safe(item.prompt)}</h3>
        <div class="group-choice-grid">
          ${item.choices.map((choice,choiceIndex)=>{
            let cls="";
            if(itemReveal&&answer){
              if(choiceIndex===item.answer) cls="correct";
              else if(choiceIndex===answer.selected) cls="wrong";
              else cls="dim";
            }else if(selected===choiceIndex){
              cls=answer?"selected":"pending";
            }
            return `<button class="group-choice ${cls}" data-group-choice="${index}:${choiceIndex}" aria-pressed="${selected===choiceIndex}"><b>${letter(choiceIndex)}</b><span>${safe(choice)}</span></button>`;
          }).join("")}
        </div>
      </article>`;
    }).join("")}
  </section>`;
}
function toggleReview(index=state.currentIndex){
  state.reviewFlags[index]=!state.reviewFlags[index];
  persistActive();
  renderQuestion();
  showToast(state.reviewFlags[index]?"已標記待檢查":"已取消待檢查");
}
function goToQuestion(index){
  if(index<0||index>=state.session.length) return;
  if(state.sessionMode==="mock"){
    const targetListening=index<state.mockBoundary;
    const currentListening=state.mockSection==="listening";
    if(targetListening!==currentListening){
      showToast(currentListening?"完成 Listening 後才能進入 Reading":"模考已進入 Reading，無法返回 Listening");
      return;
    }
  }
  clearInterval(state.timerId);
  clearListeningPrep();
  state.currentIndex=index;
  startQuestionClock();
  persistActive();
  renderQuestion();
  requestAnimationFrame(()=>$("#currentQuestionPrompt")?.focus({preventScroll:true}));
}

function renderQuestion(){
  clearInterval(state.timerId);
  const q=currentQ(); if(!q){ finishSession(); return; }
  ensureQuestionClock();
  const existing=state.answers[state.currentIndex];
  const answered=!!existing;
  const selected=selectionForIndex(state.currentIndex);
  const hasSelection=Number.isInteger(selected);
  const grouped=!!q._groupKey && q._groupSize>1;
  const groupComplete=grouped?isGroupComplete(q._groupKey):true;
  const revealAnswer=answered && state.options.instant;
  const groupStart=grouped?state.currentIndex-q._groupIndex:state.currentIndex;
  const groupEnd=grouped?groupStart+q._groupSize-1:state.currentIndex;
  $("#quizBadges").innerHTML=`<span class="badge">Q${state.currentIndex+1}/${state.session.length}</span><span class="badge gray">Part ${q.part}</span><span class="badge gray">${safe(q.difficulty)}+</span><span class="badge gray">${safe(q.category)}</span>${grouped?`<span class="badge gray">題組 ${q._groupIndex+1}/${q._groupSize}</span>`:""}`;
  const progress=Math.round(((state.currentIndex+1)/state.session.length)*100);
  $("#quizProgress").style.width=`${progress}%`;
  $("#quizProgressTrack")?.setAttribute("aria-valuenow",String(progress));
  $("#quizProgressTrack")?.setAttribute("aria-valuetext",`第 ${state.currentIndex+1} 題，共 ${state.session.length} 題`);
  let stimulus="";
  if(grouped){
    const groupType=q.part==="3"?"conversation":q.part==="4"?"talk":q.part==="6"?"text":"passage";
    stimulus+=`<div class="group-banner">Questions ${groupStart+1}–${groupEnd+1} refer to the same ${groupType}。完成整個題組前不揭曉正解或內容解析。</div>`;
  }
  stimulus+=renderQuestionImage(q);
  if(q.passage) stimulus+=`<div class="passage ${revealAnswer&&q.evidence?"has-evidence":""}">${renderPassageText(q,revealAnswer)}</div>`;
  if(q.audioText){
    const audioKey=q._groupKey||q.id;
    const used=state.audioPlays[audioKey]||0;
    const limit=state.options.playLimit;
    const exhausted=limit>0&&used>=limit;
    const mockAudio=state.sessionMode==="mock";
    const speedControl=state.sessionMode==="mock"
      ? `<span class="badge gray">正式速度 1.0x</span>`
      : `<select id="listenSpeed" aria-label="聽力播放速度"><option value="0.8">0.8x</option><option value="0.92" selected>0.9x</option><option value="1">1.0x</option><option value="1.1">1.1x</option></select>`;
    const accentControl=`<select id="audioAccent" aria-label="語音口音">${renderAudioAccentOptions()}</select>`;
    const countLabel=limit>0?`${used}/${limit}`:`${used}/∞`;
    const prepActive=state.listeningPrep?.key===audioKey;
    const prepLabel=mockAudio?(prepActive?`讀題倒數 ${state.listeningPrep.remaining}s`:"模考 10 秒讀題"):"專項即時播放";
    const audioHint=mockAudio?"模考會先給 10 秒讀題時間，再自動播放一次。":"專項練習可點擊立即播放，並自由調整速度與常考口音。";
    stimulus+=`<div class="listen-box"><div><strong>Listening Audio</strong><div style="color:var(--muted);font-size:13px;margin-top:4px">${audioHint}</div></div><div class="listen-controls">${speedControl}${accentControl}<span class="badge ${prepActive?"amber":"gray"}">${prepLabel}</span><button class="btn primary" id="listenBtn" ${exhausted||prepActive?"disabled":""}>▶ 播放 ${countLabel}</button></div></div>`;
  }
  stimulus+=renderGroupQuestionOverview(q);
  const choices=q.choices.map((c,i)=>{
    let cls="";
    if(revealAnswer){
      if(i===q.answer) cls="correct";
      else if(i===existing.selected) cls="wrong";
      else cls="dim";
    }else if(answered && i===existing.selected){
      cls="selected";
    }else if(!answered && hasSelection && i===selected){
      cls="pending";
    }
    const mockPart1=state.sessionMode==="mock"&&q.part==="1";
    return `<button class="choice ${cls} ${mockPart1?"audio-only-choice":""}" data-choice="${i}" aria-pressed="${selected===i}" ${mockPart1?`aria-label="選項 ${letter(i)}"`:""}><span class="choice-letter">${letter(i)}</span><span>${mockPart1?"聆聽語音後選擇":safe(c)}</span></button>`;
  }).join("");
  let feedback="";
  if(revealAnswer){
    feedback=`<div class="feedback" role="status" aria-live="polite" aria-atomic="true" tabindex="-1"><strong>${existing.correct?"答對了":"答錯了，正解是 "+letter(q.answer)}</strong>
      ${q.translation?`<div class="translation-block"><b>題目中文翻譯：</b>${safe(q.translation)}</div>`:""}
      ${q.answerTranslation?`<div class="translation-block"><b>正確回應中文：</b>${safe(q.answerTranslation)}</div>`:""}
      <div style="margin-top:10px"><b>考點解析：</b>${safe(q.explanation)}</div>
      ${renderLiteracyFeedback(q,existing.selected)}
      ${q.audioText?`<details class="listening-review"><summary>聽力複習：逐字稿與翻譯</summary><div class="review-grid"><div class="review-section"><b>ENGLISH TRANSCRIPT｜英文逐字稿</b><p>${safe(q.audioText)}</p></div>${(q.audioTranslation||q.translation)?`<div class="review-section"><b>TRADITIONAL CHINESE｜中文翻譯</b><p>${safe(q.audioTranslation||q.translation)}</p></div>`:""}${["1","2"].includes(q.part)?`<div><button class="btn" id="listenAnswerBtn">▶ 播放正確${q.part==="1"?"敘述":"回應"}</button></div>`:""}</div></details>`:""}
    </div>`;
  }else if(answered && grouped && !groupComplete){
    const remaining=groupIndexes(q._groupKey).filter(i=>!state.answers[i]).length;
    feedback=`<div class="feedback" role="status" aria-live="polite" aria-atomic="true" tabindex="-1"><strong>答案已記錄</strong><div style="margin-top:8px">完成本題組剩餘 ${remaining} 題後，才會顯示正解、逐字稿與中文翻譯。</div></div>`;
  }else if(answered && !state.options.instant){
    feedback=`<div class="feedback" role="status" aria-live="polite" aria-atomic="true" tabindex="-1"><strong>答案已記錄</strong><div style="margin-top:8px">本回合完成後再統一批改。</div></div>`;
  }
  $("#questionArea").innerHTML=`${stimulus}<div class="question" id="currentQuestionPrompt" tabindex="-1">${safe(q.prompt)}</div><div class="choices" role="group" aria-labelledby="currentQuestionPrompt">${choices}</div>${feedback}`;
  $("#nextQuestion").disabled=!answered && !hasSelection;
  $("#nextQuestion").textContent=state.sessionMode==="mock"&&state.currentIndex===state.mockBoundary-1
      ?"進入 Reading"
      :state.currentIndex===state.session.length-1?"完成練習":"下一題";
  $("#prevQuestion").disabled=state.currentIndex<=0 || (state.sessionMode==="mock"&&state.mockSection==="reading"&&state.currentIndex<=state.mockBoundary);
  $("#markReview").textContent=state.reviewFlags[state.currentIndex]?"★ 已標記待檢查":"☆ 標記待檢查";
  $("#markReview").className=state.reviewFlags[state.currentIndex]?"btn primary":"btn";
  $("#favoriteQuestion").textContent=isFavoriteQuestion(q.id)?"★ 已收藏題目":"☆ 收藏題目";
  $("#favoriteQuestion").className=isFavoriteQuestion(q.id)?"btn primary":"btn";
  $$("[data-choice]").forEach(b=>b.addEventListener("click",()=>selectChoice(Number(b.dataset.choice))));
  $$("[data-group-choice]").forEach(b=>b.addEventListener("click",()=>{
    const [index,choice]=b.dataset.groupChoice.split(":").map(Number);
    selectChoiceForIndex(index,choice);
  }));
  $$("[data-group-jump]").forEach(b=>b.addEventListener("click",()=>goToQuestion(Number(b.dataset.groupJump))));
  $("#audioAccent")?.addEventListener("change",e=>setAudioAccent(e.target.value));
  $("#listenBtn")?.addEventListener("click",()=>playQuestionAudio(q,{withPrep:state.sessionMode==="mock"}));
  $("#listenAnswerBtn")?.addEventListener("click",()=>speak(q.choices[q.answer]));
  $("#markReview").onclick=()=>toggleReview();
  $("#favoriteQuestion").onclick=()=>toggleFavoriteQuestion(q.id);
  renderSessionStats();
  renderQuestionNavigator();
  beginTimer(answered);
  const shouldAutoPlay=state.sessionMode==="mock"&&q.audioText&&(!grouped||q._groupIndex===0);
  const autoKey=q._groupKey||q.id;
  if(shouldAutoPlay&&!state.autoPlayedAudio[autoKey]){
    state.autoPlayedAudio[autoKey]=true;
    setTimeout(()=>playQuestionAudio(q,{withPrep:true}),280);
  }
}
function beginTimer(answered){
  if(state.sessionMode==="mock"){ updateMockClock(); return; }
  $("#mockSectionCard").hidden=true;
  if(answered){ $("#timerText").textContent="已作答"; return; }
  if(!state.options.seconds){ $("#timerText").textContent="不限時"; return; }
  if(!state.questionEndsAt||state.questionStartedIndex!==state.currentIndex) startQuestionClock();
  const tick=()=>{
    state.remaining=Math.max(0,Math.ceil((state.questionEndsAt-Date.now())/1000));
    updateTimer();
    if(state.remaining<=0){ clearInterval(state.timerId); answerQuestion(null,true); }
  };
  tick();
  if(state.remaining>0) state.timerId=setInterval(tick,1000);
}
function updateTimer(){ $("#timerText").textContent=formatClock(state.remaining); }
function accentProfile(id=state.audioAccent){
  return AUDIO_ACCENTS.find(accent=>accent.id===id)||AUDIO_ACCENTS[0];
}
function renderAudioAccentOptions(){
  return AUDIO_ACCENTS.map(accent=>`<option value="${safe(accent.id)}" ${accent.id===state.audioAccent?"selected":""}>${safe(accent.label)}</option>`).join("");
}
function setAudioAccent(value){
  const profile=accentProfile(value);
  state.audioAccent=profile.id;
  storageSet(KEYS.audioAccent,profile.id);
  showToast(`語音口音：${profile.label}`);
}
function clearListeningPrep(){
  if(state.listeningPrepTimerId) clearInterval(state.listeningPrepTimerId);
  state.listeningPrepTimerId=null;
  state.listeningPrep=null;
}
function playQuestionAudio(q,options={}){
  if(!q?.audioText) return;
  const key=q._groupKey||q.id;
  const used=state.audioPlays[key]||0;
  const limit=state.options.playLimit;
  if(limit>0&&used>=limit){
    showToast("本題聽力播放次數已用完");
    return;
  }
  if(options.withPrep){
    clearListeningPrep();
    state.listeningPrep={key,remaining:10,q};
    renderQuestion();
    state.listeningPrepTimerId=setInterval(()=>{
      if(!state.listeningPrep||state.listeningPrep.key!==key){ clearListeningPrep(); return; }
      state.listeningPrep.remaining-=1;
      if(state.listeningPrep.remaining<=0){
        clearListeningPrep();
        playQuestionAudio(q,{skipPrep:true});
      }else{
        $("#timerText").textContent=`讀題 ${state.listeningPrep.remaining}s`;
        const badge=$(".listen-box .badge.amber");
        if(badge) badge.textContent=`讀題倒數 ${state.listeningPrep.remaining}s`;
      }
    },1000);
    return;
  }
  state.audioPlays[key]=used+1;
  speakDialogue(q.audioText);
  renderQuestion();
}
function availableEnglishVoices(){
  if(!("speechSynthesis" in window)) return [];
  return speechSynthesis.getVoices().filter(voice=>/^en[-_]/i.test(voice.lang||""));
}
function voiceText(voice){ return `${voice.name||""} ${voice.voiceURI||""} ${voice.lang||""}`.toLowerCase(); }
function voiceHasHint(voice,hints){ return hints.some(hint=>voiceText(voice).includes(hint)); }
function voiceMatchesAccent(voice,profile){
  if(profile.id==="auto") return true;
  const lang=String(voice.lang||"").toLowerCase().replace("_","-");
  const target=String(profile.lang||"").toLowerCase();
  return lang===target || profile.hints.some(hint=>voiceText(voice).includes(hint));
}
function pickVoice(role){
  const voices=availableEnglishVoices();
  if(!voices.length) return null;
  const profile=accentProfile();
  const accentVoices=voices.filter(voice=>voiceMatchesAccent(voice,profile));
  const pool=accentVoices.length?accentVoices:voices;
  if(role==="male"){
    return pool.find(voice=>voiceHasHint(voice,MALE_VOICE_HINTS))
      || voices.find(voice=>voiceHasHint(voice,MALE_VOICE_HINTS))
      || pool.find(voice=>!voiceHasHint(voice,FEMALE_VOICE_HINTS))
      || voices.find(voice=>!voiceHasHint(voice,FEMALE_VOICE_HINTS))
      || pool[0]||voices[0]||null;
  }
  if(role==="female"){
    return pool.find(voice=>voiceHasHint(voice,FEMALE_VOICE_HINTS))
      || voices.find(voice=>voiceHasHint(voice,FEMALE_VOICE_HINTS))
      || pool.find(voice=>!voiceHasHint(voice,MALE_VOICE_HINTS))
      || voices.find(voice=>!voiceHasHint(voice,MALE_VOICE_HINTS))
      || pool[0]||voices[0]||null;
  }
  const exactLang=pool.find(voice=>String(voice.lang||"").toLowerCase().replace("_","-")===String(profile.lang||"").toLowerCase());
  if(exactLang) return exactLang;
  return pool.find(voice=>/en-US/i.test(voice.lang))||pool[0]||voices[0]||null;
}
function dialogueSegments(text){
  const source=String(text||"").replace(/\r/g,"").trim();
  const markerPattern=/(?:^|\s)(M|Man|Male|W|Woman|Female|Narrator|Speaker)\s*:\s*/gi;
  const segments=[];
  const markers=[...source.matchAll(markerPattern)];
  if(markers.length){
    markers.forEach((match,index)=>{
      const start=match.index+match[0].length;
      const end=index<markers.length-1?markers[index+1].index:source.length;
      const label=match[1];
      const segmentText=source.slice(start,end).replace(/\s+/g," ").trim();
      if(!segmentText) return;
      const role=/^(M|Man|Male)$/i.test(label)?"male":/^(W|Woman|Female)$/i.test(label)?"female":"neutral";
      segments.push({role,text:segmentText,label});
    });
    return segments;
  }
  return source?[{role:"neutral",text:source.replace(/^(Narrator|Speaker)\s*:\s*/i,"")}]:[];
}
function rolePitch(role){ return role==="male"?0.72:role==="female"?1.08:1; }
function speakDialogue(text){
  if(!("speechSynthesis" in window)){ showToast("此瀏覽器不支援語音播放"); return; }
  speechSynthesis.cancel();
  const segments=dialogueSegments(text);
  let index=0;
  const speakNext=()=>{
    const segment=segments[index++];
    if(!segment) return;
    const u=new SpeechSynthesisUtterance(segment.text);
    const voice=segment.role==="neutral"?pickVoice("female"):pickVoice(segment.role);
    if(voice) u.voice=voice;
    u.lang=voice?.lang||accentProfile().lang||"en-US";
    u.rate=state.sessionMode==="mock"?1:Number($("#listenSpeed")?.value || 0.92);
    u.pitch=rolePitch(segment.role);
    u.onend=speakNext;
    speechSynthesis.speak(u);
  };
  speakNext();
}
function speak(text){
  if(!("speechSynthesis" in window)){ showToast("此瀏覽器不支援語音播放"); return; }
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  const voice=pickVoice("female");
  if(voice) u.voice=voice;
  u.lang=voice?.lang||accentProfile().lang||"en-US";
  u.rate=state.sessionMode==="mock"?1:Number($("#listenSpeed")?.value || 0.92);
  speechSynthesis.speak(u);
}
function speakWord(word){
  if(!word) return;
  if(!("speechSynthesis" in window)){ showToast("此瀏覽器不支援語音播放"); return; }
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(word);
  const voice=pickVoice("female");
  if(voice) u.voice=voice;
  u.lang=voice?.lang||accentProfile().lang||"en-US";
  u.rate=0.82;
  speechSynthesis.speak(u);
}
function selectChoice(selected){
  selectChoiceForIndex(state.currentIndex,selected);
}
function selectChoiceForIndex(index,selected){
  if(index<0||index>=state.session.length) return;
  answerQuestionAt(index,selected,false);
}
function answerQuestionAt(index,selected,timedOut=false){
  const q=state.session[index];
  if(!q) return;
  const correct=selected===q.answer;
  const existing=state.answers[index];
  state.answers[index]={
    id:q.id,
    selected,
    correct,
    timedOut,
    elapsed:index===state.currentIndex?elapsedForCurrentQuestion():(existing?.elapsed??null)
  };
  state.pendingSelections[index]=undefined;
  if(index===state.currentIndex) state.questionEndsAt=null;
  persistActive();
  renderQuestion();
  if(index===state.currentIndex){
    requestAnimationFrame(()=>{
      const feedback=$("#questionArea .feedback");
      if(state.options.instant&&feedback) feedback.focus({preventScroll:true});
      else $(`[data-choice="${selected}"]`)?.focus({preventScroll:true});
    });
  }
}
function answerQuestion(selected,timedOut=false){
  clearInterval(state.timerId);
  answerQuestionAt(state.currentIndex,selected,timedOut);
}
function nextQuestion(){
  if(!state.answers[state.currentIndex]) return;
  if(state.sessionMode==="mock"&&state.mockSection==="listening"&&state.currentIndex===state.mockBoundary-1){
    enterReadingSection();
    return;
  }
  if(state.currentIndex>=state.session.length-1) finishSession();
  else {
    state.currentIndex++;
    startQuestionClock();
    persistActive();
    renderQuestion();
    requestAnimationFrame(()=>$("#currentQuestionPrompt")?.focus({preventScroll:true}));
  }
}
function previousQuestion(){
  if(state.currentIndex<=0) return;
  goToQuestion(state.currentIndex-1);
}
function renderQuestionNavigator(){
  const container=$("#questionNavigator");
  if(!container) return;
  container.innerHTML=state.session.map((q,i)=>{
    const answer=state.answers[i];
    let cls="";
    if(answer){
      if(state.options.instant) cls=answer.correct?"correct":"wrong";
      else cls="answered";
    }
    if(i===state.currentIndex) cls+=`${cls?" ":""}current`;
    if(state.reviewFlags[i]) cls+=`${cls?" ":""}review`;
    const locked=state.sessionMode==="mock"&&(
      (state.mockSection==="listening"&&i>=state.mockBoundary)||
      (state.mockSection==="reading"&&i<state.mockBoundary)
    );
    return `<button class="nav-q ${cls}" data-jump="${i}" title="第 ${i+1} 題" ${locked?"disabled":""}>${i+1}</button>`;
  }).join("");
  $$("[data-jump]").forEach(b=>b.onclick=()=>goToQuestion(Number(b.dataset.jump)));
}
function renderSessionStats(){
  const done=state.answers.filter(Boolean), correct=done.filter(a=>a.correct).length;
  const scoreRows=state.sessionMode==="mock"
    ?`<div class="mini-item">模式 <strong style="float:right;color:var(--primary)">模考</strong></div>`
    :state.sessionMode==="review"
    ?`<div class="mini-item">模式 <strong style="float:right;color:var(--primary)">間隔複習</strong></div>
       <div class="mini-item">答對 <strong style="float:right;color:var(--green)">${correct}</strong></div>
       <div class="mini-item">答錯 <strong style="float:right;color:var(--red)">${done.length-correct}</strong></div>`
    :`<div class="mini-item">答對 <strong style="float:right;color:var(--green)">${correct}</strong></div>
       <div class="mini-item">答錯 <strong style="float:right;color:var(--red)">${done.length-correct}</strong></div>
       <div class="mini-item">目前正確率 <strong style="float:right">${done.length?Math.round(correct/done.length*100):0}%</strong></div>`;
  $("#sessionStats").innerHTML=`
    <div class="mini-item">已作答 <strong style="float:right">${done.length}/${state.session.length}</strong></div>
    ${scoreRows}
    <div class="mini-item">待檢查 <strong style="float:right;color:var(--amber)">${state.reviewFlags.filter(Boolean).length}</strong></div>`;
}
function normalizePerformanceData(data){
  return {
    total:Number(data?.total||0),
    correct:Number(data?.correct||0),
    parts:data?.parts&&typeof data.parts==="object"?data.parts:{},
    categories:data?.categories&&typeof data.categories==="object"?data.categories:{},
    strategies:data?.strategies&&typeof data.strategies==="object"?data.strategies:{},
    questions:data?.questions&&typeof data.questions==="object"?data.questions:{}
  };
}
function getPerformance(){
  return normalizePerformanceData(load(KEYS.performance,{total:0,correct:0,parts:{},categories:{},strategies:{},questions:{}}));
}
function strategiesForQuestion(q){
  return STRATEGY_DECKS.filter(deck=>{
    try { return deck.match(q); }
    catch { return false; }
  });
}
function bumpStat(collection,key,correct,extra={}){
  collection[key]=collection[key]||{total:0,correct:0,...extra};
  collection[key]={...collection[key],...extra,total:(collection[key].total||0)+1,correct:(collection[key].correct||0)+(correct?1:0)};
}
function updatePerformance(results){
  const data=getPerformance();
  results.forEach(result=>{
    const q=result.question;
    const partKey=`Part ${q.part}`;
    const categoryKey=q.category||"未分類";
    data.total++;
    if(result.correct) data.correct++;
    bumpStat(data.parts,partKey,result.correct);
    bumpStat(data.categories,categoryKey,result.correct);
    bumpStat(data.questions,q.id,result.correct,{id:q.id,part:q.part,category:q.category||"未分類",difficulty:q.difficulty||"",prompt:q.prompt||""});
    strategiesForQuestion(q).forEach(deck=>{
      bumpStat(data.strategies,deck.id,result.correct,{id:deck.id,title:deck.title,type:deck.type,level:deck.level,parts:deck.parts});
    });
  });
  save(KEYS.performance,data);
}
function estimateSectionScore(correct,total){
  if(!total) return null;
  const raw=5+490*(correct/total);
  return Math.max(5,Math.min(495,Math.round(raw/5)*5));
}
function resultEstimates(results){
  const listening=results.filter(r=>["2","3","4"].includes(r.question.part));
  const reading=results.filter(r=>["5","6","7"].includes(r.question.part));
  const lCorrect=listening.filter(r=>r.correct).length;
  const rCorrect=reading.filter(r=>r.correct).length;
  const lScore=estimateSectionScore(lCorrect,listening.length);
  const rScore=estimateSectionScore(rCorrect,reading.length);
  return {
    listening:{correct:lCorrect,total:listening.length,score:lScore},
    reading:{correct:rCorrect,total:reading.length,score:rScore},
    total:lScore!==null&&rScore!==null?lScore+rScore:null
  };
}
function finishSession(){
  clearInterval(state.timerId);
  clearInterval(state.sectionTimerId);
  clearListeningPrep();
  const results=state.session.map((q,i)=>{
    const answer=state.answers[i]||{id:q.id,selected:null,correct:false,timedOut:true,elapsed:null};
    return {...answer,review:!!state.reviewFlags[i],question:q};
  });
  const correct=results.filter(r=>r.correct).length, total=results.length, accuracy=total?Math.round(correct/total*100):0;
  results.forEach(r=>updateReviewSchedule(r.question.id,r.correct));
  const wrongIds=getWrongIds();
  results.filter(r=>!r.correct).forEach(r=>wrongIds.push(r.question.id));
  setWrongIds(wrongIds);
  const partLabel=[...new Set(results.map(r=>`Part ${r.question.part}`))].join(", ");
  const mode=state.sessionMode==="mock"?"Part 1–7 模考":state.sessionMode==="review"?"間隔複習":state.sessionMode==="strategy"?"技巧專練":state.sessionMode==="literacy"?"閱讀素養":"自由練習";
  const record={
    id:Date.now(),
    date:new Date().toISOString(),
    mode,
    total,
    correct,
    accuracy,
    parts:partLabel,
    strategyId:state.sessionStrategy?.id||null,
    strategyTitle:state.sessionStrategy?.title||null,
    results
  };
  const history=getHistory();
  history.unshift({id:record.id,date:record.date,mode,total,correct,accuracy,parts:partLabel});
  save(KEYS.history,history.slice(0,50));
  updatePerformance(results);
  clearActive();
  state.lastResult=record;
  renderResult();
  showView("resultView");
}
function renderResult(){
  const r=state.lastResult; if(!r) return;
  $("#resultScore").textContent=`${r.accuracy}%`;
  $("#scoreRing").style.setProperty("--score-angle",`${r.accuracy*3.6}deg`);
  $("#resultTitle").textContent=r.accuracy>=90?"非常穩定！":r.accuracy>=70?"表現不錯":"完成比完美重要";
  $("#resultSummary").textContent=`${r.mode||"自由練習"}｜共 ${r.total} 題，答對 ${r.correct} 題，答錯或未答 ${r.total-r.correct} 題。`;
  const estimates=resultEstimates(r.results);
  const estimateItems=[
    ["Listening",estimates.listening.score,`${estimates.listening.correct}/${estimates.listening.total} 題`],
    ["Reading",estimates.reading.score,`${estimates.reading.correct}/${estimates.reading.total} 題`],
    ["Estimated Total",estimates.total,estimates.total===null?"需同時作答聽力與閱讀":"滿分 990"]
  ];
  $("#estimateGrid").innerHTML=estimateItems.map(([label,score,foot])=>`
    <div class="estimate-card"><span>${label}</span><strong>${score===null?"—":score}</strong><small>${foot}</small></div>
  `).join("");
  const groups={};
  r.results.forEach(x=>{
    const k=`Part ${x.question.part}`;
    groups[k]=groups[k]||{total:0,correct:0}; groups[k].total++; if(x.correct)groups[k].correct++;
  });
  $("#categoryReport").innerHTML=Object.entries(groups).map(([k,v])=>`<article class="card"><div class="stat-label">${k}</div><div class="stat-value">${Math.round(v.correct/v.total*100)}%</div><div class="stat-foot">${v.correct}/${v.total} 題</div></article>`).join("");
  $("#resultRows").innerHTML=r.results.map((x,i)=>`<tr><td>${i+1}</td><td>Part ${x.question.part}</td><td>${safe(x.question.prompt)}</td><td>${x.selected===null?"逾時":`${letter(x.selected)} ${safe(x.question.choices[x.selected])}`}</td><td>${letter(x.question.answer)} ${safe(x.question.choices[x.question.answer])}</td><td style="color:${x.correct?"var(--green)":"var(--red)"}">${x.correct?"正確":"錯誤"}${x.review?"・待檢查":""}</td></tr>`).join("");
  renderResultStrategyCard(r);
  renderAnswerReview(r.results);
  $("#retryWrong").disabled=!r.results.some(x=>!x.correct);
}
function renderResultStrategyCard(r){
  const card=$("#strategyResultCard");
  if(!card) return;
  if(r.mode!=="技巧專練"){
    card.hidden=true;
    card.innerHTML="";
    return;
  }
  card.hidden=false;
  const title=r.strategyTitle||"混合技巧專練";
  card.innerHTML=`
    <div class="strategy-review-head">
      <div>
        <div class="badges"><span class="badge">技巧專練</span><span class="badge gray">${safe(title)}</span></div>
        <h3 style="margin:10px 0 6px">本回合已產生逐題詳解</h3>
        <p>往下看每題正解、你的答案、中文解析、文章線索與聽力逐字稿；也可以回技巧專區重練同類題。</p>
      </div>
      <div class="group">
        <button class="btn" id="backToStrategyCenter">回技巧專區</button>
        ${r.strategyId&&strategyById(r.strategyId)?`<button class="btn primary" id="repeatResultStrategy">再練同技巧</button>`:""}
      </div>
    </div>`;
  $("#backToStrategyCenter").onclick=()=>showView("strategyView");
  $("#repeatResultStrategy")?.addEventListener("click",()=>startStrategyPractice(r.strategyId));
}
function answerChoiceReview(result){
  const q=result.question;
  return q.choices.map((choice,index)=>{
    const isCorrect=index===q.answer;
    const isSelected=index===result.selected;
    const cls=[isCorrect?"correct":"",isSelected&&!isCorrect?"selected-wrong":"",isSelected?"selected":""].filter(Boolean).join(" ");
    const label=isCorrect&&isSelected?"你的答案，也是正解":isCorrect?"正解":isSelected?"你的答案":"";
    return `<div class="answer-choice ${cls}"><strong>${letter(index)}.</strong><span>${safe(choice)}</span>${label?`<em>${label}</em>`:""}</div>`;
  }).join("");
}
function renderAnswerReview(results){
  const box=$("#answerReviewList");
  if(!box) return;
  box.innerHTML=results.map((result,index)=>{
    const q=result.question;
    const selected=Number.isInteger(result.selected)?`${letter(result.selected)} ${safe(q.choices[result.selected])}`:"逾時 / 未作答";
    const correct=`${letter(q.answer)} ${safe(q.choices[q.answer])}`;
    return `<article class="answer-review-card ${result.correct?"correct":"wrong"}">
      <div class="badges">
        <span class="badge">${result.correct?"答對":"需複習"}</span>
        <span class="badge gray">Q${index+1}</span>
        <span class="badge gray">Part ${safe(q.part)}</span>
        <span class="badge gray">${safe(q.category)}</span>
      </div>
      <h3>${safe(q.prompt)}</h3>
      ${renderQuestionImage(q,"compact")}
      ${q.passage?`<details class="answer-source" ${q.evidence?"open":""}><summary>查看文章 / 題組原文${q.evidence?"（已標示線索）":""}</summary><div class="passage ${q.evidence?"has-evidence":""}">${renderPassageText(q,!!q.evidence)}</div></details>`:""}
      ${q.audioText?`<details class="answer-source"><summary>查看聽力逐字稿</summary><div class="passage">${safe(q.audioText)}</div>${q.audioTranslation?`<p>${safe(q.audioTranslation)}</p>`:""}</details>`:""}
      <div class="answer-choice-list">${answerChoiceReview(result)}</div>
      <div class="answer-review-meta">
        <div><strong>你的答案</strong><span>${selected}</span></div>
        <div><strong>正解</strong><span>${correct}</span></div>
      </div>
      <p class="answer-explanation"><strong>詳解：</strong>${safe(q.explanation)}</p>
      ${q.translation?`<p class="answer-translation"><strong>中文：</strong>${safe(q.translation)}</p>`:""}
      ${renderLiteracyFeedback(q,result.selected)}
    </article>`;
  }).join("");
}
function renderReleaseCard(){
  const release=APP_SHELL.release;
  if(!release) return;
  if($("#brandVersion")) $("#brandVersion").textContent=`v${APP_SHELL.version || "2.3"}`;
  if($("#releaseBadges")){
    $("#releaseBadges").innerHTML=(release.badges||[]).map((badge,index)=>`<span class="badge ${index?"gray":""}">${safe(badge)}</span>`).join("");
  }
  if($("#releaseTitle")) $("#releaseTitle").textContent=release.title || "";
  if($("#releaseSummary")) $("#releaseSummary").textContent=release.summary || "";
}
function renderStudyCommandCenter(bank,history,wrong){
  const box=$("#studyMissionList");
  if(!box) return;
  const missions=LEARNING_COMMAND_CENTER.buildStudyMissions({
    bankCount:bank.length,
    answered:history.reduce((sum,item)=>sum+(item.total||0),0),
    wrongCount:wrong.length,
    dueCount:dueReviewIds().length,
    vocabCount:getVocab().length,
    qualityCount:Object.keys(getQuestionQuality()).length,
    performance:getPerformance()
  });
  const toneLabel={urgent:"今日優先",primary:"弱點補強",warning:"整理任務",calm:"單字養成",admin:"後台任務",roadmap:"本週節奏"};
  box.innerHTML=missions.map((mission,index)=>`
    <article class="mission-card ${safe(mission.tone||"primary")}">
      <div class="mission-top"><span class="badge">${safe(toneLabel[mission.tone]||"任務")}</span><span class="badge gray">#${index+1}</span></div>
      <h3>${safe(mission.title)}</h3>
      <p>${safe(mission.detail)}</p>
      <button class="btn ${index===0?"primary":""}" data-mission-action="${safe(mission.action)}">${safe(mission.cta)}</button>
    </article>
  `).join("");
  const handlers={
    dueReview:()=>startDueReview(),
    analytics:()=>showView("analyticsView"),
    wrongBook:()=>showView("wrongView"),
    autoVocab:()=>showView("autoVocabView"),
    quality:()=>showView("bankView"),
    practice:()=>showView("setupView"),
    home:()=>showView("homeView")
  };
  $$("[data-mission-action]").forEach(btn=>{
    btn.onclick=()=>{ (handlers[btn.dataset.missionAction]||handlers.home)(); };
  });
}
function renderDashboard(){
  renderResumeBanner();
  renderReleaseCard();
  const bank=getBank(), history=getHistory(), wrong=getWrongIds(), favorites=getFavoriteIds();
  const answered=history.reduce((s,h)=>s+h.total,0), correct=history.reduce((s,h)=>s+h.correct,0);
  $("#heroCount").textContent=bank.length; $("#totalBank").textContent=bank.length; $("#totalAnswered").textContent=answered;
  $("#overallAccuracy").textContent=answered?`${Math.round(correct/answered*100)}%`:"0%"; $("#wrongCount").textContent=wrong.length;
  $("#favoriteCount").textContent=favorites.length;
  $("#dueReviewCount").textContent=dueReviewIds().length;
  renderStudyCommandCenter(bank,history,wrong);
  const modules=APP_SHELL.partModules || [
    {part:"2",label:"應答",description:"疑問詞、提議、否定問句與自然回應。"},
    {part:"3",label:"對話",description:"職場與生活情境對話，搭配語音朗讀。"},
    {part:"4",label:"獨白",description:"公告、語音留言與公共廣播。"},
    {part:"5",label:"單句填空",description:"文法、詞性、介系詞與商務字彙。"},
    {part:"6",label:"短文填空",description:"電子郵件、公告與備忘錄克漏字。"},
    {part:"7",label:"閱讀理解",description:"Email、廣告、通知、職缺與雙篇閱讀。"}
  ];
  $("#moduleGrid").innerHTML=modules.map(module=>{
    const n=bank.filter(q=>q.part===module.part).length;
    return `<button type="button" class="module-card" data-part-card="${safe(module.part)}"><span class="pill">Part ${safe(module.part)}</span><span class="module-card-title">${safe(module.label)}</span><span class="module-card-copy">${safe(module.description)}</span>${module.focus?`<span class="module-focus">${safe(module.focus)}</span>`:""}<strong>${n} 題 →</strong></button>`;
  }).join("");
  $$("[data-part-card]").forEach(c=>c.onclick=()=>{ showViewAndFocus("setupView"); $("#partSelect").value=c.dataset.partCard; updateAvailable(); });
  const recent=history.slice(0,3);
  $("#recentHistory").innerHTML=recent.length?`<table><thead><tr><th>日期</th><th>模式</th><th>題數</th><th>正確率</th><th>題型</th></tr></thead><tbody>${recent.map(h=>`<tr><td>${new Date(h.date).toLocaleString("zh-TW")}</td><td>${safe(h.mode||"自由練習")}</td><td>${h.total}</td><td>${h.accuracy}%</td><td>${safe(h.parts)}</td></tr>`).join("")}</tbody></table>`:'<div class="empty">尚無練習紀錄，先完成第一回合吧。</div>';
}
function renderSavedQuestionItems(items,type,schedule={},now=Date.now()){
  return items.map(q=>{
    const review=schedule[q.id];
    const due=review?.nextReviewAt&&review.nextReviewAt<=now;
    const reviewBadges=type==="wrong"
      ? review
        ? `<span class="badge ${due?"":"gray"}">${due?"今日到期":"下次 "+formatReviewDate(review.nextReviewAt)}</span><span class="badge gray">連對 ${review.streak||0}</span>`
        : "<span class=\"badge gray\">未排程</span>"
      : `<span class="badge">★ 收藏</span>`;
    const removeAttr=type==="wrong"?`data-remove-wrong="${safe(q.id)}"`:`data-remove-favorite="${safe(q.id)}"`;
    return `<article class="wrong-item"><div class="badges"><span class="badge">Part ${q.part}</span><span class="badge gray">${safe(q.category)}</span>${reviewBadges}</div><h3>${safe(q.prompt)}</h3>${renderQuestionImage(q,"compact")}${q.passage?`<details><summary>查看文章</summary><div class="passage">${safe(q.passage)}</div></details>`:""}${q.audioText?`<details><summary>查看聽力逐字稿</summary><div class="passage">${safe(q.audioText)}</div></details>`:""}<p><b>正解：</b>${letter(q.answer)} ${safe(q.choices[q.answer])}</p><p style="color:var(--muted)">${safe(q.explanation)}</p><button class="btn danger" ${removeAttr}>移除</button></article>`;
  }).join("");
}
function renderWrongBook(){
  const schedule=getReviewSchedule(), now=Date.now();
  const items=questionsFromIds(getWrongIds());
  const favorites=questionsFromIds(getFavoriteIds());
  $("#practiceDue").disabled=!dueReviewIds().length;
  $("#practiceFavorites").disabled=!favorites.length;
  $("#clearFavorites").disabled=!favorites.length;
  $("#favoriteList").innerHTML=favorites.length?renderSavedQuestionItems(favorites,"favorite",schedule,now):'<div class="card empty">目前沒有收藏題目。</div>';
  $("#wrongList").innerHTML=items.length?renderSavedQuestionItems(items,"wrong",schedule,now):'<div class="card empty">目前沒有錯題。</div>';
  $$("[data-remove-wrong]").forEach(b=>b.onclick=()=>{ const id=b.dataset.removeWrong; setWrongIds(getWrongIds().filter(x=>x!==id)); removeReviewSchedule([id]); renderWrongBook(); renderDashboard(); });
  $$("[data-remove-favorite]").forEach(b=>b.onclick=()=>{ const id=b.dataset.removeFavorite; setFavoriteIds(getFavoriteIds().filter(x=>x!==id)); renderWrongBook(); renderDashboard(); });
}
function percent(stat){
  return stat?.total?Math.round(stat.correct/stat.total*100):0;
}
function renderSkillRows(container,entries,limit=12){
  if(!entries.length){
    container.innerHTML='<div class="empty">完成練習後才會產生分析。</div>';
    return;
  }
  container.innerHTML=entries.slice(0,limit).map(([name,stat])=>{
    const accuracy=percent(stat);
    return `<div class="skill-row">
      <div class="skill-head"><strong>${safe(name)}</strong><span>${accuracy}%・${stat.correct}/${stat.total}</span></div>
      <div class="skill-bar"><div style="width:${accuracy}%"></div></div>
    </div>`;
  }).join("");
}
function renderStrategyMasteryGrid(data){
  const entries=STRATEGY_DECKS.map(deck=>{
    const stat=data.strategies[deck.id]||{total:0,correct:0,title:deck.title,type:deck.type};
    return {deck,stat,accuracy:percent(stat)};
  });
  $("#strategyMasteryGrid").innerHTML=entries.map(({deck,stat,accuracy})=>{
    const trained=stat.total>0;
    return `<article class="mastery-card ${trained?"":"empty-mastery"}">
      <div class="mastery-ring" style="--mastery:${trained?accuracy:0}%"><strong>${trained?`${accuracy}%`:"—"}</strong></div>
      <div>
        <h3>${safe(deck.title)}</h3>
        <p>${trained?`${stat.correct}/${stat.total} 題｜${strategyTypeLabel(deck.type)}`:"尚未累積作答紀錄"}</p>
      </div>
      <button class="btn" data-mastery-practice="${safe(deck.id)}">練這類題</button>
    </article>`;
  }).join("");
  $$("[data-mastery-practice]").forEach(btn=>btn.onclick=()=>startStrategyPractice(btn.dataset.masteryPractice));
}
function renderAnalytics(){
  const data=getPerformance();
  const listeningParts=["Part 1","Part 2","Part 3","Part 4"].map(k=>data.parts[k]).filter(Boolean);
  const readingParts=["Part 5","Part 6","Part 7"].map(k=>data.parts[k]).filter(Boolean);
  const combine=items=>items.reduce((acc,item)=>({total:acc.total+item.total,correct:acc.correct+item.correct}),{total:0,correct:0});
  const listening=combine(listeningParts),reading=combine(readingParts);
  const categories=Object.entries(data.categories)
    .filter(([,stat])=>stat.total>=3)
    .sort((a,b)=>percent(a[1])-percent(b[1]));
  const strategies=Object.entries(data.strategies)
    .filter(([,stat])=>stat.total>=3)
    .sort((a,b)=>percent(a[1])-percent(b[1]));
  const trainedStrategies=Object.values(data.strategies).filter(stat=>stat.total>0);
  const mastery=trainedStrategies.length
    ? Math.round(trainedStrategies.reduce((sum,stat)=>sum+percent(stat),0)/trainedStrategies.length)
    : 0;
  $("#analyticsTotal").textContent=data.total;
  $("#analyticsListening").textContent=`${percent(listening)}%`;
  $("#analyticsReading").textContent=`${percent(reading)}%`;
  $("#analyticsWeakest").textContent=categories[0]?.[0]||"—";
  $("#analyticsWeakestStrategy").textContent=strategies[0]?.[1]?.title||"—";
  $("#analyticsMastery").textContent=`${mastery}%`;
  renderStrategyMasteryGrid(data);
  renderSkillRows($("#partAnalytics"),Object.entries(data.parts).sort((a,b)=>a[0].localeCompare(b[0])));
  renderSkillRows($("#categoryAnalytics"),categories,15);
  const recommendations=[];
  categories.slice(0,3).forEach(([name,stat])=>{
    recommendations.push(`${name}：目前 ${percent(stat)}%（${stat.correct}/${stat.total}），建議先做 10～20 題同類型練習並重新整理固定搭配。`);
  });
  strategies.slice(0,3).forEach(([id,stat])=>{
    recommendations.push(`${stat.title}：技巧掌握度 ${percent(stat)}%（${stat.correct}/${stat.total}），建議進入「答題技巧」重練這類題。`);
  });
  if(!recommendations.length) recommendations.push("累積至少三題同分類或同技巧作答後，系統才會提供可靠的弱點建議。");
  $("#analyticsRecommendations").innerHTML=recommendations.map(text=>`<div class="mini-item">${safe(text)}</div>`).join("");
}
function updateVisitCookie(){
  try { setCookie(COOKIE_KEYS.lastVisit,new Date().toISOString(),30); }
  catch {}
}
function saveCookieGoal(){
  const value=Math.max(1,Math.min(200,Number($("#cookieDailyGoal").value)||20));
  const days=Number($("#cookieExpireDays").value)||30;
  setCookie(COOKIE_KEYS.dailyGoal,String(value),days);
  updateVisitCookie();
  renderCookieSummary();
  showToast(`每日目標已用 Cookie 保留 ${days} 天`);
}
function clearCookieGoal(){
  deleteCookie(COOKIE_KEYS.dailyGoal);
  renderCookieSummary();
  showToast("每日目標 Cookie 已清除");
}
function renderCookieSummary(){
  const goal=decodeURIComponent(getCookie(COOKIE_KEYS.dailyGoal)||"");
  const lastVisit=decodeURIComponent(getCookie(COOKIE_KEYS.lastVisit)||"");
  if(goal) $("#cookieDailyGoal").value=goal;
  const support=location.protocol==="file:"
    ?"目前以 file:// 開啟，部分瀏覽器不允許 Cookie；部署網址可正常使用。"
    :navigator.cookieEnabled?"Cookie 可用，資料會限制在本站路徑。":"瀏覽器目前停用 Cookie。";
  $("#cookieSummary").innerHTML=`
    <div class="mini-item">目前目標 <strong style="float:right">${goal?`${safe(goal)} 題/日`:"未設定"}</strong></div>
    <div class="mini-item">最後造訪 <strong style="float:right">${lastVisit?new Date(lastVisit).toLocaleDateString("zh-TW"):"未記錄"}</strong></div>
    <div class="mini-item">${safe(support)}</div>`;
}
function localStorageRows(){
  const performance=getPerformance(), active=load(KEYS.active,null);
  return [
    ["錯題本", `${getWrongIds().length} 題`, KEYS.wrong],
    ["題目收藏", `${getFavoriteIds().length} 題`, KEYS.favorite],
    ["歷史成績", `${getHistory().length} 筆`, KEYS.history],
    ["自訂題庫", `${load(KEYS.custom,[]).length} 題`, KEYS.custom],
    ["個人單字本", `${getVocab().length} 筆`, KEYS.vocab],
    ["語音口音偏好", accentProfile().label, KEYS.audioAccent],
    ["間隔複習", `${Object.keys(getReviewSchedule()).length} 題`, KEYS.reviewSchedule],
    ["弱點分析", `${performance.total} 題`, KEYS.performance],
    ["題目品質標記", `${Object.keys(getQuestionQuality()).length} 筆`, KEYS.quality],
    ["未完成練習", `${snapshotQuestionCount(active)} 題`, KEYS.active]
  ];
}
function renderLocalStorageSummary(){
  const rows=localStorageRows();
  const totalBytes=rows.reduce((sum,row)=>sum+byteSize(storageGet(row[2])||""),0);
  $("#localStorageSummary").innerHTML=[
    `<div class="mini-item">估計用量 <strong style="float:right">${(totalBytes/1024).toFixed(1)} KB</strong></div>`,
    ...rows.map(([label,value,key])=>`<div class="mini-item">${label}<strong style="float:right">${safe(value)}</strong><div style="clear:both;color:var(--muted);font-size:11px;margin-top:4px">${safe(key)}</div></div>`)
  ].join("");
}
function exportLearningState(){
  const payload={
    exportedAt:new Date().toISOString(),
    version:"2.6",
    cookie:{
      dailyGoal:decodeURIComponent(getCookie(COOKIE_KEYS.dailyGoal)||""),
      lastVisit:decodeURIComponent(getCookie(COOKIE_KEYS.lastVisit)||"")
    },
    localStorage:{
      wrong:getWrongIds(),
      favoriteQuestions:getFavoriteIds(),
      history:getHistory(),
      customBank:load(KEYS.custom,[]),
      vocab:getVocab(),
      performance:getPerformance(),
      questionQuality:getQuestionQuality(),
      reviewSchedule:getReviewSchedule(),
      audioAccent:state.audioAccent,
      activeSession:load(KEYS.active,null)
    },
    sessionStorage:{
      scratchpad:sessionGet(SESSION_KEYS.scratchpad,""),
      scratchUpdatedAt:sessionGet(SESSION_KEYS.scratchUpdatedAt,"")
    }
  };
  download(new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}),`toeic-ocean-learning-backup-${Date.now()}.json`);
}
function saveSessionScratchpad(){
  const value=$("#sessionScratchpad").value;
  sessionSet(SESSION_KEYS.scratchpad,value);
  sessionSet(SESSION_KEYS.scratchUpdatedAt,new Date().toISOString());
  renderSessionStorageSummary();
}
function clearSessionScratchpad(){
  sessionRemove(SESSION_KEYS.scratchpad);
  sessionRemove(SESSION_KEYS.scratchUpdatedAt);
  $("#sessionScratchpad").value="";
  renderSessionStorageSummary();
  showToast("本分頁筆記已清除");
}
function renderSessionStorageSummary(){
  const scratch=sessionGet(SESSION_KEYS.scratchpad,"");
  const updated=sessionGet(SESSION_KEYS.scratchUpdatedAt,"");
  $("#sessionStorageSummary").innerHTML=`
    <div class="mini-item">目前字數 <strong style="float:right">${scratch.length}</strong></div>
    <div class="mini-item">暫存大小 <strong style="float:right">${(byteSize(scratch)/1024).toFixed(1)} KB</strong></div>
    <div class="mini-item">更新時間 <strong style="float:right">${updated?new Date(updated).toLocaleTimeString("zh-TW"):"未暫存"}</strong></div>`;
}
function renderStorageCenter(){
  renderCookieSummary();
  renderLocalStorageSummary();
  const scratch=sessionGet(SESSION_KEYS.scratchpad,"");
  if($("#sessionScratchpad").value!==scratch) $("#sessionScratchpad").value=scratch;
  renderSessionStorageSummary();
}
function renderHistory(){
  const h=getHistory();
  $("#historyRows").innerHTML=h.length?h.map(x=>`<tr><td>${new Date(x.date).toLocaleString("zh-TW")}</td><td>${safe(x.mode||"自由練習")}</td><td>${x.total}</td><td>${x.correct}</td><td>${x.accuracy}%</td><td>${safe(x.parts)}</td></tr>`).join(""):'<tr><td colspan="6" class="empty">尚無紀錄</td></tr>';
}
function download(blob,name){ const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=name; a.click(); URL.revokeObjectURL(a.href); }
function exportResultJson(){ if(!state.lastResult)return; download(new Blob([JSON.stringify(state.lastResult,null,2)],{type:"application/json"}),`toeic-result-${Date.now()}.json`); }
function csvEscape(v){ return `"${String(v??"").replace(/"/g,'""')}"`; }
function exportResultCsv(){
  if(!state.lastResult)return;
  const rows=[["ID","Part","Question","Selected","Correct","Result","Explanation"],...state.lastResult.results.map(x=>[x.id,x.question.part,x.question.prompt,x.selected===null?"":x.question.choices[x.selected],x.question.choices[x.question.answer],x.correct?"Correct":"Wrong",x.question.explanation])];
  const csv="\uFEFF"+rows.map(r=>r.map(csvEscape).join(",")).join("\r\n");
  download(new Blob([csv],{type:"text/csv;charset=utf-8"}),`toeic-result-${Date.now()}.csv`);
}
function sourceCategoryLabel(category){
  return {
    official:"官方來源",
    license:"授權政策",
    "free-practice":"免費練習"
  }[category]||"外部來源";
}
function renderLegalSourceHub(){
  if(!$("#legalSourceList")) return;
  const sources=LEGAL_PRACTICE_SOURCES;
  $("#sourceTotal").textContent=sources.length;
  $("#sourceOfficial").textContent=sources.filter(source=>source.category==="official").length;
  $("#sourceFree").textContent=sources.filter(source=>source.category==="free-practice").length;
  $("#legalSourceList").innerHTML=sources.length?sources.map(source=>`
    <article class="source-card ${safe(source.category)}">
      <div class="badges">
        <span class="badge">${safe(sourceCategoryLabel(source.category))}</span>
        <span class="badge gray">${safe(source.provider)}</span>
      </div>
      <h3>${safe(source.title)}</h3>
      <p><strong>可用方式：</strong>${safe(source.use)}</p>
      <p><strong>限制：</strong>${safe(source.limit)}</p>
      <div class="source-note">${safe(source.note)}</div>
      <a class="btn" href="${safe(source.url)}" target="_blank" rel="noopener noreferrer">開啟來源</a>
    </article>
  `).join(""):'<div class="card empty">尚未收集合法來源。</div>';
}
function qualityQuestionRows(auditResult=QUESTION_AUDIT.auditBank(getBank())){
  const quality=getQuestionQuality();
  const performance=getPerformance();
  const query=($("#qualitySearch")?.value||"").trim().toLowerCase();
  const status=$("#qualityStatus")?.value||"all";
  const part=$("#qualityPart")?.value||"all";
  const sort=$("#qualitySort")?.value||"accuracy";
  let rows=getBank().map(q=>{
    const qState=quality[q.id]||{};
    const stat=performance.questions[q.id]||{total:0,correct:0};
    return {q,qState,stat,accuracy:stat.total?percent(stat):null,audit:auditResult.byId[q.id]||[]};
  });
  if(part!=="all") rows=rows.filter(row=>row.q.part===part);
  if(query){
    rows=rows.filter(({q})=>[q.id,q.category,q.prompt,q.explanation,q.passage,...(q.tags||[]),...(q.choices||[])]
      .join(" ").toLowerCase().includes(query));
  }
  if(status==="active") rows=rows.filter(row=>!row.qState.disabled);
  if(status==="disabled") rows=rows.filter(row=>row.qState.disabled);
  if(status==="disputed") rows=rows.filter(row=>row.qState.disputed);
  if(status==="review") rows=rows.filter(row=>row.qState.review);
  if(status==="audit") rows=rows.filter(row=>row.audit.length);
  if(sort==="attempts") rows.sort((a,b)=>(b.stat.total||0)-(a.stat.total||0)||a.q.id.localeCompare(b.q.id,undefined,{numeric:true}));
  else if(sort==="id") rows.sort((a,b)=>a.q.id.localeCompare(b.q.id,undefined,{numeric:true}));
  else rows.sort((a,b)=>(a.accuracy??101)-(b.accuracy??101)||(b.stat.total||0)-(a.stat.total||0)||a.q.id.localeCompare(b.q.id,undefined,{numeric:true}));
  return rows;
}
function renderQualityDashboard(){
  const quality=getQuestionQuality();
  const all=getBank();
  const auditResult=QUESTION_AUDIT.auditBank(all);
  const rows=qualityQuestionRows(auditResult);
  const values=Object.values(quality);
  $("#qualityTotal").textContent=all.length;
  $("#qualityDisabled").textContent=values.filter(x=>x.disabled).length;
  $("#qualityDisputed").textContent=values.filter(x=>x.disputed).length;
  $("#qualityReview").textContent=values.filter(x=>x.review).length;
  $("#qualityAutoIssues").textContent=auditResult.issues.length;
  $("#qualityAuditHint").textContent=auditResult.issues.length
    ? `${auditResult.errors.length} 個錯誤、${auditResult.warnings.length} 個提醒；請人工確認後再修題。`
    : `已檢查 ${auditResult.checked} 題，未發現可機械判定的結構問題。`;
  $("#qualityList").innerHTML=rows.length?rows.slice(0,80).map(({q,qState,stat,accuracy,audit})=>{
    const accLabel=accuracy===null?"尚無紀錄":`${accuracy}%`;
    return `<article class="quality-item ${qState.disabled?"disabled":""}">
      <div class="quality-main">
        <div class="badges">
          <span class="badge">Part ${safe(q.part)}</span>
          <span class="badge gray">${safe(q.id)}</span>
          <span class="badge gray">${safe(q.category)}</span>
          ${qState.disabled?'<span class="badge gray">已停用</span>':""}
          ${qState.disputed?'<span class="badge">爭議答案</span>':""}
          ${qState.review?'<span class="badge">待複查</span>':""}
          ${audit.length?`<span class="badge amber">自動稽核 ${audit.length}</span>`:""}
        </div>
        <h3>${safe(q.prompt)}</h3>
        <p>${safe(q.explanation)}</p>
        ${audit.length?`<div class="audit-issues">${audit.map(entry=>`<div class="${entry.severity}"><strong>${entry.severity==="error"?"錯誤":"提醒"}</strong><span>${safe(entry.message)}</span></div>`).join("")}</div>`:""}
        <div class="quality-metrics">
          <span>答對率 <strong>${accLabel}</strong></span>
          <span>作答 <strong>${stat.total||0}</strong> 次</span>
          <span>正解 <strong>${letter(q.answer)} ${safe(q.choices[q.answer])}</strong></span>
        </div>
      </div>
      <div class="quality-actions">
        <label><input type="checkbox" data-quality-toggle="${safe(q.id)}" data-quality-field="disabled" ${qState.disabled?"checked":""}>停用</label>
        <label><input type="checkbox" data-quality-toggle="${safe(q.id)}" data-quality-field="disputed" ${qState.disputed?"checked":""}>爭議</label>
        <label><input type="checkbox" data-quality-toggle="${safe(q.id)}" data-quality-field="review" ${qState.review?"checked":""}>待複查</label>
        <textarea data-quality-note="${safe(q.id)}" rows="3" placeholder="品質筆記、爭議原因或修題方向">${safe(qState.note||"")}</textarea>
      </div>
    </article>`;
  }).join(""):'<div class="card empty">目前篩選條件下沒有題目。</div>';
  $$("[data-quality-toggle]").forEach(input=>input.onchange=()=>{
    updateQuestionQuality(input.dataset.qualityToggle,{[input.dataset.qualityField]:input.checked});
    renderQualityDashboard();
    updateAvailable();
  });
  $$("[data-quality-note]").forEach(input=>input.onchange=()=>{
    updateQuestionQuality(input.dataset.qualityNote,{note:input.value.trim()});
    renderQualityDashboard();
  });
}
function normalizeImportedQuestion(q){
  const validParts=new Set(["1","2","3","4","5","6","7"]);
  const validDifficulties=new Set(["400","600","800"]);
  if(!q||typeof q!=="object") return null;
  const id=String(q.id??"").trim();
  const part=String(q.part??"").trim();
  const difficulty=String(q.difficulty??"").trim();
  const choices=Array.isArray(q.choices)?q.choices.map(choice=>String(choice??"").trim()):[];
  if(!id||id.length>80||!validParts.has(part)||!validDifficulties.has(difficulty)) return null;
  if(choices.length<2||choices.length>4||choices.some(choice=>!choice||choice.length>500)) return null;
  if(!Number.isInteger(q.answer)||q.answer<0||q.answer>=choices.length) return null;
  const prompt=String(q.prompt??"").trim();
  const explanation=String(q.explanation??"").trim();
  if(!prompt||!explanation||prompt.length>2500||explanation.length>2500) return null;
  const image=String(q.image??"").trim();
  if(part==="1"&&!/^assets\/part1\/[a-z0-9-]+\.(?:jpg|png|webp)$/i.test(image)) return null;
  const item={
    id,
    part,
    difficulty,
    category:String(q.category??"未分類").trim().slice(0,80)||"未分類",
    prompt,
    choices,
    answer:q.answer,
    explanation,
    translation:String(q.translation??"").trim(),
    passage:String(q.passage??"").trim(),
    audioText:String(q.audioText??"").trim(),
    audioTranslation:String(q.audioTranslation??"").trim(),
    answerTranslation:String(q.answerTranslation??"").trim(),
    tags:Array.isArray(q.tags)?q.tags.map(tag=>String(tag??"").trim()).filter(Boolean).slice(0,12):[]
  };
  if(image){
    item.image=image;
    item.imageAlt=String(q.imageAlt??"Part 1 question photograph.").trim().slice(0,200);
    item.imageCredit=String(q.imageCredit??"").trim().slice(0,160);
    item.imageSource=String(q.imageSource??"").trim().slice(0,500);
    item.imageLicense=String(q.imageLicense??"").trim().slice(0,120);
    item.imageLicenseUrl=String(q.imageLicenseUrl??"").trim().slice(0,500);
    item.imageOrigin=String(q.imageOrigin??"").trim().slice(0,80);
    item.imageGenerator=String(q.imageGenerator??"").trim().slice(0,120);
  }
  if(part==="1") item.audioText=buildPart1AudioText(choices);
  const groupId=String(q.groupId??"").trim();
  if(groupId) item.groupId=groupId.slice(0,80);
  const evidence=String(q.evidence??"").trim();
  const evidenceLocation=String(q.evidenceLocation??"").trim();
  const literacySkill=String(q.literacySkill??"").trim();
  const answerAudit=String(q.answerAudit??"").trim();
  if(evidence) item.evidence=evidence.slice(0,2500);
  if(evidenceLocation) item.evidenceLocation=evidenceLocation.slice(0,160);
  if(literacySkill) item.literacySkill=literacySkill.slice(0,80);
  if(answerAudit) item.answerAudit=answerAudit.slice(0,500);
  if(Array.isArray(q.choiceNotes)&&q.choiceNotes.length===choices.length){
    item.choiceNotes=q.choiceNotes.map(note=>String(note??"").trim().slice(0,1000));
  }
  return item;
}
function validQuestion(q){ return !!normalizeImportedQuestion(q); }

$("#todayLabel").textContent=nowLabel();
$("#resumeSession").onclick=restoreActive;
$("#discardSession").onclick=()=>{ if(confirm("確定放棄未完成進度？")){ clearActive(); showToast("未完成進度已移除"); } };
$("#clearAnalytics").onclick=()=>{ if(confirm("確定清空所有長期弱點分析資料？")){ save(KEYS.performance,{total:0,correct:0,parts:{},categories:{},strategies:{},questions:{}}); renderAnalytics(); } };
$("#themeToggle").onclick=()=>{
  const dark=document.documentElement.dataset.theme==="dark";
  document.documentElement.dataset.theme=dark?"":"dark"; storageSet(KEYS.theme,dark?"light":"dark");
};
if(storageGet(KEYS.theme)==="dark") document.documentElement.dataset.theme="dark";
$$("[data-nav]").forEach(b=>b.onclick=()=>showViewAndFocus(b.dataset.nav));
$$("[data-mobile-nav]").forEach(b=>b.onclick=()=>showViewAndFocus(b.dataset.mobileNav));
$$("[data-go-setup]").forEach(b=>b.onclick=()=>showViewAndFocus("setupView"));
$("#mobileHome").onclick=openMobileNav;
$("#mobileMore").onclick=openMobileNav;
$("#mobileScrim").onclick=closeMobileNav;
$("#partSelect").onchange=updateAvailable; $("#difficultySelect").onchange=updateAvailable;
$("#startPractice").onclick=startConfigured;
$("#startMockExam").onclick=startMockExam;
$("#quick10").onclick=()=>startSession(getActiveBank(),{count:10,seconds:0});
$("#heroQuick").onclick=()=>startSession(getActiveBank(),{count:20,seconds:0});
$("#heroLiteracy").onclick=()=>showViewAndFocus("readingView");
$("#nextQuestion").onclick=nextQuestion;
$("#prevQuestion").onclick=previousQuestion;
$("#quitPractice").onclick=()=>{ if(confirm(state.sessionMode==="mock"?"確定提前交卷嗎？未作答題目將計為錯誤。":"確定要結束本回合嗎？")) finishSession(); };
$("#addSelectedVocab").onclick=addSelectedVocab;
$("#retryWrong").onclick=()=>{ const list=state.lastResult.results.filter(x=>!x.correct).map(x=>x.question); startSession(list,{count:list.length,seconds:0,shuffle:true,instant:true,mode:"practice"}); };
$("#practiceDue").onclick=startDueReview;
$("#practiceWrong").onclick=()=>{ const ids=getWrongIds(),map=new Map(getActiveBank().map(q=>[q.id,q])); const list=ids.map(id=>map.get(id)).filter(Boolean); startSession(list,{count:list.length,seconds:0}); };
$("#practiceFavorites").onclick=()=>{ const list=questionsFromIds(getFavoriteIds()).filter(q=>!isQuestionDisabled(q.id)); startSession(list,{count:list.length,seconds:0}); };
$("#clearWrong").onclick=()=>{ if(confirm("確定清空錯題本？")){removeReviewSchedule(getWrongIds());setWrongIds([]);renderWrongBook();renderDashboard();} };
$("#clearFavorites").onclick=()=>{ if(confirm("確定清空所有題目收藏？")){setFavoriteIds([]);renderWrongBook();renderDashboard();} };
$("#clearHistory").onclick=()=>{ if(confirm("確定清空歷史紀錄？")){save(KEYS.history,[]);renderHistory();renderDashboard();} };
$("#exportJson").onclick=exportResultJson; $("#exportCsv").onclick=exportResultCsv; $("#printReport").onclick=()=>window.print();
$("#exportBank").onclick=()=>download(new Blob([JSON.stringify(getBank(),null,2)],{type:"application/json"}),"toeic-question-bank.json");
$("#resetBank").onclick=()=>{ if(confirm("移除所有自訂題庫？")){save(KEYS.custom,[]);renderDashboard();showToast("自訂題庫已移除");} };
$("#saveCookieGoal").onclick=saveCookieGoal;
$("#clearCookieGoal").onclick=clearCookieGoal;
$("#exportLearningState").onclick=exportLearningState;
$("#refreshStorageSummary").onclick=renderStorageCenter;
$("#sessionScratchpad").addEventListener("input",saveSessionScratchpad);
$("#clearSessionScratchpad").onclick=clearSessionScratchpad;
$("#saveVocab").onclick=saveVocabFromForm;
$("#resetVocabForm").onclick=resetVocabForm;
$("#exportVocab").onclick=exportVocab;
$("#clearVocab").onclick=()=>{ if(confirm("確定清空個人單字本？")){ saveVocab([]); renderVocab(); } };
$("#refreshAutoVocab").onclick=()=>{ state.autoVocabLetter="all"; renderAutoVocab(); showToast("已重新掃描題庫單字"); };
$("#autoVocabSearch").addEventListener("input",()=>{ state.autoVocabLetter="all"; renderAutoVocab(); });
$("#autoVocabStatus").onchange=()=>{ state.autoVocabLetter="all"; renderAutoVocab(); };
$("#autoVocabSort").onchange=renderAutoVocab;
$("#autoVocabPart").onchange=()=>{ state.autoVocabLetter="all"; renderAutoVocab(); };
$("#startVocabReview").onclick=startVocabReview;
$("#resetVocabReview").onclick=resetVocabReview;
$("#nextVocabQuestion").onclick=nextVocabQuestion;
$("#vocabReviewMode").onchange=renderVocabReviewSummary;
$("#vocabReviewCount").onchange=renderVocabReviewSummary;
$("#vocabReviewPart").onchange=renderVocabReviewSummary;
$("#vocabReviewSource").onchange=renderVocabReviewSummary;
$("#strategySearch").addEventListener("input",renderStrategies);
$("#strategyPart").onchange=renderStrategies;
$("#strategyType").onchange=renderStrategies;
$("#strategySort").onchange=renderStrategies;
$("#startStrategyMix").onclick=startStrategyMix;
$("#readingSkillSelect").onchange=renderReadingLiteracy;
$("#startLiteracyMix").onclick=()=>startReadingLiteracy($("#readingSkillSelect").value);
$("#qualitySearch").addEventListener("input",renderQualityDashboard);
$("#qualityStatus").onchange=renderQualityDashboard;
$("#qualityPart").onchange=renderQualityDashboard;
$("#qualitySort").onchange=renderQualityDashboard;
$("#importBank").onclick=async()=>{
  const file=$("#importFile").files[0]; if(!file){showToast("請先選擇 JSON 檔");return;}
  try{
    const parsed=JSON.parse(await file.text()), list=Array.isArray(parsed)?parsed:[parsed];
    const valid=list.map(normalizeImportedQuestion).filter(Boolean);
    if(!valid.length)throw new Error("沒有有效題目，請確認 id、part、difficulty、choices、answer、prompt、explanation");
    const map=new Map(load(KEYS.custom,[]).map(q=>[q.id,q])); valid.forEach(q=>map.set(q.id,q));
    save(KEYS.custom,[...map.values()]); showToast(`已匯入 ${valid.length} 題`); renderDashboard();
  }catch(e){showToast("匯入失敗："+e.message);}
};
document.addEventListener("keydown",e=>{
  if(e.key==="Escape") closeMobileNav();
  if(state.currentView==="vocabReviewView"){
    if(["1","2","3","4"].includes(e.key)) answerVocabQuestion(Number(e.key)-1);
    if(e.key==="Enter") nextVocabQuestion();
    return;
  }
  if(state.currentView!=="practiceView")return;
  if(["1","2","3","4"].includes(e.key)) selectChoice(Number(e.key)-1);
  if(e.key==="Enter") nextQuestion();
  if(e.key==="ArrowLeft") previousQuestion();
  if(e.key.toLowerCase()==="l"&&currentQ()?.audioText) playQuestionAudio(currentQ(),{withPrep:state.sessionMode==="mock"});
  if(e.key.toLowerCase()==="r") toggleReview();
  if(e.key.toLowerCase()==="f"&&currentQ()) toggleFavoriteQuestion(currentQ().id);
});

updateVisitCookie();
renderDashboard(); updateAvailable(); renderResumeBanner(); resetVocabReview();
