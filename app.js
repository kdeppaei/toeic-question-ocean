const BUILTIN_BANK = window.BUILTIN_BANK || [];
const TOEIC_VOCAB_LEXICON = window.TOEIC_VOCAB_LEXICON || {};

const KEYS = {
  wrong: "toeicOcean.wrong.v1",
  history: "toeicOcean.history.v1",
  custom: "toeicOcean.customBank.v1",
  theme: "toeicOcean.theme.v1",
  active: "toeicOcean.activeSession.v1",
  performance: "toeicOcean.performance.v1",
  reviewSchedule: "toeicOcean.reviewSchedule.v1",
  vocab: "toeicOcean.vocab.v1"
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
    id: "part5-clause-pattern",
    title: "關係詞與從句缺口",
    parts: ["5"],
    type: "grammar",
    level: 3,
    summary: "看先行詞與從句裡缺哪個角色，而不是只背 who / which / where 的中文。",
    signal: "空格後是一小段從句，選項含 who、which、whose、where、whether、that。",
    steps: ["找空格前的先行詞或引導詞位置", "檢查從句中缺主詞、受詞、所有格或地點", "確認逗號與介系詞是否改變關係詞選擇"],
    trap: "where 不等於所有地點名詞都能選；從句若缺受詞，常需要 which / that。",
    match: q => q.part === "5" && (hasTag(q,"relative-clause","noun-clause","whose","prep-relative","where","inversion","whether","so-that") || hasCategory(q,"關係代名詞","名詞子句","倒裝","子句"))
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
  options: { instant: true, shuffle: true, seconds: 0, playLimit: 2 },
  lastResult: null,
  autoVocabLetter: "all",
  vocabQuiz: { questions: [], index: 0, answers: [] }
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const clone = (x) => JSON.parse(JSON.stringify(x));
const letter = (i) => String.fromCharCode(65 + i);
const nowLabel = () => new Intl.DateTimeFormat("zh-TW",{year:"numeric",month:"long",day:"numeric",weekday:"short"}).format(new Date());
const safe = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
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
  if(word.endsWith("ing")) candidates.push(word.slice(0,-3), word.slice(0,-3).replace(/(.)\1$/,"$1"));
  if(word.endsWith("ed")) candidates.push(word.slice(0,-2), word.slice(0,-2).replace(/(.)\1$/,"$1"));
  if(word.endsWith("es")) candidates.push(word.slice(0,-2));
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
  const bank=getBank();
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
  const bank=getBank();
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
function renderStrategies(){
  const views=strategyDeckViews();
  const stats=strategyStats();
  $("#strategyTotal").textContent=stats.total;
  $("#strategyMapped").textContent=stats.mapped;
  $("#strategyHighYield").textContent=stats.highYield;
  $("#strategyShown").textContent=views.length;
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
  const deck=STRATEGY_DECKS.find(item=>item.id===id);
  if(!deck){ showToast("找不到這個技巧分類"); return; }
  const part=$("#strategyPart")?.value||"all";
  const list=getBank().filter(q=>deck.match(q) && (part==="all"||q.part===part));
  startSession(list,{count:Math.min(20,list.length),seconds:0,shuffle:true,instant:true,mode:"strategy"});
}
function startStrategyMix(){
  const map=new Map();
  strategyDeckViews().forEach(deck=>deck.questions.forEach(q=>map.set(q.id,q)));
  const list=[...map.values()];
  startSession(list,{count:Math.min(20,list.length),seconds:0,shuffle:true,instant:true,mode:"strategy"});
}

function encodeSession(session){
  return session.map(q=>({
    id:q.id,
    choices:q.choices,
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
  $$(".nav button").forEach(b=>b.classList.toggle("active",b.dataset.nav===id));
  const titles={
    homeView:"多益題海學習儀表板",setupView:"建立練習",practiceView:"進行練習",
    resultView:"本次成績",wrongView:"錯題本",vocabView:"個人單字本",autoVocabView:"題庫單字庫",vocabReviewView:"單字複習",strategyView:"答題技巧專區",historyView:"歷史成績",analyticsView:"弱點分析",storageView:"儲存中心",bankView:"題庫管理"
  };
  $("#viewTitle").textContent=titles[id]||"多益題海";
  if(id==="homeView") renderDashboard();
  if(id==="setupView") updateAvailable();
  if(id==="wrongView") renderWrongBook();
  if(id==="vocabView") renderVocab();
  if(id==="autoVocabView") renderAutoVocab();
  if(id==="vocabReviewView") renderVocabReviewSummary();
  if(id==="strategyView") renderStrategies();
  if(id==="historyView") renderHistory();
  if(id==="analyticsView") renderAnalytics();
  if(id==="storageView") renderStorageCenter();
  window.scrollTo({top:0,behavior:"smooth"});
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
  const mode=snapshot.sessionMode==="mock"?"Part 2–7 模考":"自由練習";
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
  return getBank().filter(q => (part==="all"||q.part===part) && (diff==="all"||q.difficulty===diff));
}
function updateAvailable(){
  const list=filteredBank();
  $("#availableCount").textContent=list.length;
  const counts={};
  list.forEach(q=>counts[`Part ${q.part}`]=(counts[`Part ${q.part}`]||0)+1);
  $("#filterBreakdown").innerHTML=Object.entries(counts).map(([k,v])=>`<div class="mini-item"><strong>${k}</strong><span style="float:right">${v} 題</span></div>`).join("")||'<div class="empty">沒有符合條件的題目</div>';
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
      const item=clone(source);
      item._groupKey=unit.questions.length>1?unit.key:null;
      item._groupIndex=index;
      item._groupSize=unit.questions.length;
      if(state.options.shuffle){
        const pairs=item.choices.map((text,i)=>({text,correct:i===item.answer}));
        const sp=shuffle(pairs);
        item.choices=sp.map(x=>x.text);
        item.answer=sp.findIndex(x=>x.correct);
      }
      output.push(item);
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
  const count=Number(options.count ?? $("#countSelect").value);
  state.session=sessionFrom(list,count);
  state.currentIndex=0;
  state.answers=[];
  state.pendingSelections=[];
  state.reviewFlags=Array(state.session.length).fill(false);
  state.audioPlays={};
  state.autoPlayedAudio={};
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
      const item=clone(source);
      item._groupKey=unit.questions.length>1?unit.key:null;
      item._groupIndex=index;
      item._groupSize=unit.questions.length;
      if(shuffleChoices){
        const pairs=item.choices.map((text,i)=>({text,correct:i===item.answer}));
        const mixed=shuffle(pairs);
        item.choices=mixed.map(x=>x.text);
        item.answer=mixed.findIndex(x=>x.correct);
      }
      output.push(item);
    });
  });
  return output;
}
function buildMockSession(){
  const distribution={"2":25,"3":39,"4":30,"5":30,"6":16,"7":54};
  const output=[];
  for(const part of ["2","3","4","5","6","7"]){
    const units=buildUnits(getBank().filter(q=>q.part===part));
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
  state.currentIndex=index;
  startQuestionClock();
  persistActive();
  renderQuestion();
}

function renderQuestion(){
  clearInterval(state.timerId);
  const q=currentQ(); if(!q){ finishSession(); return; }
  ensureQuestionClock();
  const existing=state.answers[state.currentIndex];
  const answered=!!existing;
  const pending=state.pendingSelections[state.currentIndex];
  const hasPending=Number.isInteger(pending);
  const grouped=!!q._groupKey && q._groupSize>1;
  const groupComplete=grouped?isGroupComplete(q._groupKey):true;
  const revealAnswer=answered && state.options.instant && groupComplete;
  const groupStart=grouped?state.currentIndex-q._groupIndex:state.currentIndex;
  const groupEnd=grouped?groupStart+q._groupSize-1:state.currentIndex;
  $("#quizBadges").innerHTML=`<span class="badge">Q${state.currentIndex+1}/${state.session.length}</span><span class="badge gray">Part ${q.part}</span><span class="badge gray">${safe(q.difficulty)}+</span><span class="badge gray">${safe(q.category)}</span>${grouped?`<span class="badge gray">題組 ${q._groupIndex+1}/${q._groupSize}</span>`:""}`;
  $("#quizProgress").style.width=`${(state.currentIndex/state.session.length)*100}%`;
  let stimulus="";
  if(grouped){
    const groupType=q.part==="3"?"conversation":q.part==="4"?"talk":q.part==="6"?"text":"passage";
    stimulus+=`<div class="group-banner">Questions ${groupStart+1}–${groupEnd+1} refer to the same ${groupType}。完成整個題組前不揭曉正解或內容解析。</div>`;
  }
  if(q.passage) stimulus+=`<div class="passage">${safe(q.passage)}</div>`;
  if(q.audioText){
    const audioKey=q._groupKey||q.id;
    const used=state.audioPlays[audioKey]||0;
    const limit=state.options.playLimit;
    const exhausted=limit>0&&used>=limit;
    const speedControl=state.sessionMode==="mock"
      ? `<span class="badge gray">正式速度 1.0x</span>`
      : `<select id="listenSpeed" aria-label="聽力播放速度"><option value="0.8">0.8x</option><option value="0.92" selected>0.9x</option><option value="1">1.0x</option><option value="1.1">1.1x</option></select>`;
    const countLabel=limit>0?`${used}/${limit}`:`${used}/∞`;
    stimulus+=`<div class="listen-box"><div><strong>Listening Audio</strong><div style="color:var(--muted);font-size:13px;margin-top:4px">${state.sessionMode==="mock"?"模考將自動播放一次，播放後不可重播。":"先只聽語音作答；作答後再查看逐字稿與翻譯。"}</div></div><div class="listen-controls">${speedControl}<button class="btn primary" id="listenBtn" ${exhausted?"disabled":""}>▶ 播放 ${countLabel}</button></div></div>`;
  }
  const choices=q.choices.map((c,i)=>{
    let cls="";
    if(revealAnswer){
      if(i===q.answer) cls="correct";
      else if(i===existing.selected) cls="wrong";
      else cls="dim";
    }else if(answered && i===existing.selected){
      cls="selected";
    }else if(!answered && hasPending && i===pending){
      cls="pending";
    }
    return `<button class="choice ${cls}" data-choice="${i}" ${answered?"disabled":""}><span class="choice-letter">${letter(i)}</span><span>${safe(c)}</span></button>`;
  }).join("");
  let feedback="";
  if(revealAnswer){
    feedback=`<div class="feedback"><strong>${existing.correct?"答對了":"答錯了，正解是 "+letter(q.answer)}</strong>
      ${q.translation?`<div class="translation-block"><b>題目中文翻譯：</b>${safe(q.translation)}</div>`:""}
      ${q.answerTranslation?`<div class="translation-block"><b>正確回應中文：</b>${safe(q.answerTranslation)}</div>`:""}
      <div style="margin-top:10px"><b>考點解析：</b>${safe(q.explanation)}</div>
      ${q.audioText?`<details class="listening-review"><summary>聽力複習：逐字稿與翻譯</summary><div class="review-grid"><div class="review-section"><b>ENGLISH TRANSCRIPT｜英文逐字稿</b><p>${safe(q.audioText)}</p></div>${(q.audioTranslation||q.translation)?`<div class="review-section"><b>TRADITIONAL CHINESE｜中文翻譯</b><p>${safe(q.audioTranslation||q.translation)}</p></div>`:""}${q.part==="2"?`<div><button class="btn" id="listenAnswerBtn">▶ 播放正確回應</button></div>`:""}</div></details>`:""}
    </div>`;
  }else if(answered && grouped && !groupComplete){
    const remaining=groupIndexes(q._groupKey).filter(i=>!state.answers[i]).length;
    feedback=`<div class="feedback"><strong>答案已記錄</strong><div style="margin-top:8px">完成本題組剩餘 ${remaining} 題後，才會顯示正解、逐字稿與中文翻譯。</div></div>`;
  }else if(answered && !state.options.instant){
    feedback=`<div class="feedback"><strong>答案已記錄</strong><div style="margin-top:8px">本回合完成後再統一批改。</div></div>`;
  }
  $("#questionArea").innerHTML=`${stimulus}<div class="question">${safe(q.prompt)}</div><div class="choices">${choices}</div>${feedback}`;
  $("#nextQuestion").disabled=!answered && !hasPending;
  $("#nextQuestion").textContent=!answered
    ? "確認答案"
    : state.sessionMode==="mock"&&state.currentIndex===state.mockBoundary-1
      ?"進入 Reading"
      :state.currentIndex===state.session.length-1?"完成練習":"下一題";
  $("#markReview").textContent=state.reviewFlags[state.currentIndex]?"★ 已標記待檢查":"☆ 標記待檢查";
  $("#markReview").className=state.reviewFlags[state.currentIndex]?"btn primary":"btn";
  $$("[data-choice]").forEach(b=>b.addEventListener("click",()=>selectChoice(Number(b.dataset.choice))));
  $("#listenBtn")?.addEventListener("click",()=>playQuestionAudio(q));
  $("#listenAnswerBtn")?.addEventListener("click",()=>speak(q.choices[q.answer]));
  $("#markReview").onclick=()=>toggleReview();
  renderSessionStats();
  renderQuestionNavigator();
  beginTimer(answered);
  const shouldAutoPlay=state.sessionMode==="mock"&&q.audioText&&(!grouped||q._groupIndex===0);
  const autoKey=q._groupKey||q.id;
  if(shouldAutoPlay&&!state.autoPlayedAudio[autoKey]){
    state.autoPlayedAudio[autoKey]=true;
    setTimeout(()=>playQuestionAudio(q),280);
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
function playQuestionAudio(q){
  if(!q?.audioText) return;
  const key=q._groupKey||q.id;
  const used=state.audioPlays[key]||0;
  const limit=state.options.playLimit;
  if(limit>0&&used>=limit){
    showToast("本題聽力播放次數已用完");
    return;
  }
  state.audioPlays[key]=used+1;
  speak(q.audioText);
  renderQuestion();
}
function speak(text){
  if(!("speechSynthesis" in window)){ showToast("此瀏覽器不支援語音播放"); return; }
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="en-US";
  u.rate=state.sessionMode==="mock"?1:Number($("#listenSpeed")?.value || 0.92);
  speechSynthesis.speak(u);
}
function speakWord(word){
  if(!word) return;
  if(!("speechSynthesis" in window)){ showToast("此瀏覽器不支援語音播放"); return; }
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(word);
  u.lang="en-US";
  u.rate=0.82;
  speechSynthesis.speak(u);
}
function selectChoice(selected){
  if(state.answers[state.currentIndex]) return;
  state.pendingSelections[state.currentIndex]=selected;
  persistActive();
  renderQuestion();
}
function answerQuestion(selected,timedOut=false){
  if(state.answers[state.currentIndex]) return;
  clearInterval(state.timerId);
  const q=currentQ(), correct=selected===q.answer;
  state.answers[state.currentIndex]={
    id:q.id,selected,correct,timedOut,elapsed:elapsedForCurrentQuestion()
  };
  state.pendingSelections[state.currentIndex]=undefined;
  state.questionEndsAt=null;
  updateReviewSchedule(q.id, correct);
  persistActive();
  if(!correct&&state.sessionMode!=="mock"){
    const ids=getWrongIds(); ids.push(q.id); setWrongIds(ids);
  }
  renderQuestion();
}
function nextQuestion(){
  if(!state.answers[state.currentIndex]){
    const pending=state.pendingSelections[state.currentIndex];
    if(Number.isInteger(pending)) answerQuestion(pending);
    return;
  }
  if(state.sessionMode==="mock"&&state.mockSection==="listening"&&state.currentIndex===state.mockBoundary-1){
    enterReadingSection();
    return;
  }
  if(state.currentIndex>=state.session.length-1) finishSession();
  else { state.currentIndex++; startQuestionClock(); persistActive(); renderQuestion(); }
}
function renderQuestionNavigator(){
  const container=$("#questionNavigator");
  if(!container) return;
  container.innerHTML=state.session.map((q,i)=>{
    const answer=state.answers[i];
    const groupDone=q._groupKey?isGroupComplete(q._groupKey):true;
    let cls="";
    if(answer){
      if(state.options.instant && groupDone) cls=answer.correct?"correct":"wrong";
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
function getPerformance(){
  return load(KEYS.performance,{total:0,correct:0,parts:{},categories:{}});
}
function updatePerformance(results){
  const data=getPerformance();
  results.forEach(result=>{
    const q=result.question;
    const partKey=`Part ${q.part}`;
    const categoryKey=q.category||"未分類";
    data.total++;
    if(result.correct) data.correct++;
    for(const [collection,key] of [[data.parts,partKey],[data.categories,categoryKey]]){
      collection[key]=collection[key]||{total:0,correct:0};
      collection[key].total++;
      if(result.correct) collection[key].correct++;
    }
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
  const results=state.session.map((q,i)=>{
    const answer=state.answers[i]||{id:q.id,selected:null,correct:false,timedOut:true,elapsed:null};
    return {...answer,review:!!state.reviewFlags[i],question:q};
  });
  const correct=results.filter(r=>r.correct).length, total=results.length, accuracy=total?Math.round(correct/total*100):0;
  results
    .filter(r=>r.timedOut&&r.selected===null&&r.elapsed===null)
    .forEach(r=>updateReviewSchedule(r.question.id,false));
  if(state.sessionMode==="mock"){
    const ids=getWrongIds();
    results.filter(r=>!r.correct).forEach(r=>ids.push(r.question.id));
    setWrongIds(ids);
  }
  const partLabel=[...new Set(results.map(r=>`Part ${r.question.part}`))].join(", ");
  const mode=state.sessionMode==="mock"?"Part 2–7 模考":state.sessionMode==="review"?"間隔複習":state.sessionMode==="strategy"?"技巧專練":"自由練習";
  const record={id:Date.now(),date:new Date().toISOString(),mode,total,correct,accuracy,parts:partLabel,results};
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
  $("#retryWrong").disabled=!r.results.some(x=>!x.correct);
}
function renderDashboard(){
  renderResumeBanner();
  const bank=getBank(), history=getHistory(), wrong=getWrongIds();
  const answered=history.reduce((s,h)=>s+h.total,0), correct=history.reduce((s,h)=>s+h.correct,0);
  $("#heroCount").textContent=bank.length; $("#totalBank").textContent=bank.length; $("#totalAnswered").textContent=answered;
  $("#overallAccuracy").textContent=answered?`${Math.round(correct/answered*100)}%`:"0%"; $("#wrongCount").textContent=wrong.length;
  $("#dueReviewCount").textContent=dueReviewIds().length;
  const parts=["2","3","4","5","6","7"];
  const labels={"2":"應答","3":"對話","4":"獨白","5":"單句填空","6":"短文填空","7":"閱讀理解"};
  $("#moduleGrid").innerHTML=parts.map(p=>{
    const n=bank.filter(q=>q.part===p).length;
    return `<article class="module-card" data-part-card="${p}"><span class="pill">Part ${p}</span><h3>${labels[p]}</h3><p>${p==="2"?"疑問詞、提議、否定問句與自然回應。":p==="3"?"職場與生活情境對話，搭配語音朗讀。":p==="4"?"公告、語音留言與公共廣播。":p==="5"?"文法、詞性、介系詞與商務字彙。":p==="6"?"電子郵件、公告與備忘錄克漏字。":"Email、廣告、通知、職缺與雙篇閱讀。"}</p><strong>${n} 題 →</strong></article>`;
  }).join("");
  $$("[data-part-card]").forEach(c=>c.onclick=()=>{ showView("setupView"); $("#partSelect").value=c.dataset.partCard; updateAvailable(); });
  const recent=history.slice(0,3);
  $("#recentHistory").innerHTML=recent.length?`<table><thead><tr><th>日期</th><th>模式</th><th>題數</th><th>正確率</th><th>題型</th></tr></thead><tbody>${recent.map(h=>`<tr><td>${new Date(h.date).toLocaleString("zh-TW")}</td><td>${safe(h.mode||"自由練習")}</td><td>${h.total}</td><td>${h.accuracy}%</td><td>${safe(h.parts)}</td></tr>`).join("")}</tbody></table>`:'<div class="empty">尚無練習紀錄，先完成第一回合吧。</div>';
}
function renderWrongBook(){
  const ids=getWrongIds(), map=new Map(getBank().map(q=>[q.id,q])), schedule=getReviewSchedule(), now=Date.now();
  const items=ids.map(id=>map.get(id)).filter(Boolean);
  $("#practiceDue").disabled=!dueReviewIds().length;
  $("#wrongList").innerHTML=items.length?items.map(q=>{
    const review=schedule[q.id];
    const due=review?.nextReviewAt&&review.nextReviewAt<=now;
    return `<article class="wrong-item"><div class="badges"><span class="badge">Part ${q.part}</span><span class="badge gray">${safe(q.category)}</span>${review?`<span class="badge ${due?"":"gray"}">${due?"今日到期":"下次 "+formatReviewDate(review.nextReviewAt)}</span><span class="badge gray">連對 ${review.streak||0}</span>`:"<span class=\"badge gray\">未排程</span>"}</div><h3>${safe(q.prompt)}</h3>${q.passage?`<details><summary>查看文章</summary><div class="passage">${safe(q.passage)}</div></details>`:""}<p><b>正解：</b>${letter(q.answer)} ${safe(q.choices[q.answer])}</p><p style="color:var(--muted)">${safe(q.explanation)}</p><button class="btn danger" data-remove-wrong="${q.id}">移除</button></article>`;
  }).join(""):'<div class="card empty">目前沒有錯題。</div>';
  $$("[data-remove-wrong]").forEach(b=>b.onclick=()=>{ const id=b.dataset.removeWrong; setWrongIds(getWrongIds().filter(x=>x!==id)); removeReviewSchedule([id]); renderWrongBook(); renderDashboard(); });
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
function renderAnalytics(){
  const data=getPerformance();
  const listeningParts=["Part 2","Part 3","Part 4"].map(k=>data.parts[k]).filter(Boolean);
  const readingParts=["Part 5","Part 6","Part 7"].map(k=>data.parts[k]).filter(Boolean);
  const combine=items=>items.reduce((acc,item)=>({total:acc.total+item.total,correct:acc.correct+item.correct}),{total:0,correct:0});
  const listening=combine(listeningParts),reading=combine(readingParts);
  const categories=Object.entries(data.categories)
    .filter(([,stat])=>stat.total>=3)
    .sort((a,b)=>percent(a[1])-percent(b[1]));
  $("#analyticsTotal").textContent=data.total;
  $("#analyticsListening").textContent=`${percent(listening)}%`;
  $("#analyticsReading").textContent=`${percent(reading)}%`;
  $("#analyticsWeakest").textContent=categories[0]?.[0]||"—";
  renderSkillRows($("#partAnalytics"),Object.entries(data.parts).sort((a,b)=>a[0].localeCompare(b[0])));
  renderSkillRows($("#categoryAnalytics"),categories,15);
  const recommendations=[];
  categories.slice(0,3).forEach(([name,stat])=>{
    recommendations.push(`${name}：目前 ${percent(stat)}%（${stat.correct}/${stat.total}），建議先做 10～20 題同類型練習並重新整理固定搭配。`);
  });
  if(!recommendations.length) recommendations.push("累積至少三題同分類作答後，系統才會提供可靠的弱點建議。");
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
    ["歷史成績", `${getHistory().length} 筆`, KEYS.history],
    ["自訂題庫", `${load(KEYS.custom,[]).length} 題`, KEYS.custom],
    ["個人單字本", `${getVocab().length} 筆`, KEYS.vocab],
    ["間隔複習", `${Object.keys(getReviewSchedule()).length} 題`, KEYS.reviewSchedule],
    ["弱點分析", `${performance.total} 題`, KEYS.performance],
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
    version:"1.6",
    cookie:{
      dailyGoal:decodeURIComponent(getCookie(COOKIE_KEYS.dailyGoal)||""),
      lastVisit:decodeURIComponent(getCookie(COOKIE_KEYS.lastVisit)||"")
    },
    localStorage:{
      wrong:getWrongIds(),
      history:getHistory(),
      customBank:load(KEYS.custom,[]),
      vocab:getVocab(),
      performance:getPerformance(),
      reviewSchedule:getReviewSchedule(),
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
function normalizeImportedQuestion(q){
  const validParts=new Set(["2","3","4","5","6","7"]);
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
  const groupId=String(q.groupId??"").trim();
  if(groupId) item.groupId=groupId.slice(0,80);
  return item;
}
function validQuestion(q){ return !!normalizeImportedQuestion(q); }

$("#todayLabel").textContent=nowLabel();
$("#resumeSession").onclick=restoreActive;
$("#discardSession").onclick=()=>{ if(confirm("確定放棄未完成進度？")){ clearActive(); showToast("未完成進度已移除"); } };
$("#clearAnalytics").onclick=()=>{ if(confirm("確定清空所有長期弱點分析資料？")){ save(KEYS.performance,{total:0,correct:0,parts:{},categories:{}}); renderAnalytics(); } };
$("#themeToggle").onclick=()=>{
  const dark=document.documentElement.dataset.theme==="dark";
  document.documentElement.dataset.theme=dark?"":"dark"; storageSet(KEYS.theme,dark?"light":"dark");
};
if(storageGet(KEYS.theme)==="dark") document.documentElement.dataset.theme="dark";
$$("[data-nav]").forEach(b=>b.onclick=()=>showView(b.dataset.nav));
$$("[data-go-setup]").forEach(b=>b.onclick=()=>showView("setupView"));
$("#mobileHome").onclick=openMobileNav;
$("#mobileScrim").onclick=closeMobileNav;
$("#partSelect").onchange=updateAvailable; $("#difficultySelect").onchange=updateAvailable;
$("#startPractice").onclick=startConfigured;
$("#startMockExam").onclick=startMockExam;
$("#quick10").onclick=()=>startSession(getBank(),{count:10,seconds:0});
$("#heroQuick").onclick=()=>startSession(getBank(),{count:20,seconds:0});
$("#nextQuestion").onclick=nextQuestion;
$("#quitPractice").onclick=()=>{ if(confirm(state.sessionMode==="mock"?"確定提前交卷嗎？未作答題目將計為錯誤。":"確定要結束本回合嗎？")) finishSession(); };
$("#addSelectedVocab").onclick=addSelectedVocab;
$("#retryWrong").onclick=()=>{ const list=state.lastResult.results.filter(x=>!x.correct).map(x=>x.question); startSession(list,{count:list.length,seconds:0,shuffle:true,instant:true,mode:"practice"}); };
$("#practiceDue").onclick=startDueReview;
$("#practiceWrong").onclick=()=>{ const ids=getWrongIds(),map=new Map(getBank().map(q=>[q.id,q])); startSession(ids.map(id=>map.get(id)).filter(Boolean),{count:ids.length,seconds:0}); };
$("#clearWrong").onclick=()=>{ if(confirm("確定清空錯題本？")){removeReviewSchedule(getWrongIds());setWrongIds([]);renderWrongBook();renderDashboard();} };
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
  if(e.key.toLowerCase()==="l"&&currentQ()?.audioText) playQuestionAudio(currentQ());
  if(e.key.toLowerCase()==="r") toggleReview();
  if(e.key.toLowerCase()==="f"&&currentQ()){
    const ids=getWrongIds(), id=currentQ().id;
    if(ids.includes(id)){setWrongIds(ids.filter(x=>x!==id));showToast("已取消收藏");}
    else{ids.push(id);setWrongIds(ids);showToast("已收藏到錯題本");}
  }
});

updateVisitCookie();
renderDashboard(); updateAvailable(); renderResumeBanner(); resetVocabReview();
