const BUILTIN_BANK = window.BUILTIN_BANK || [];

const KEYS = {
  wrong: "toeicOcean.wrong.v1",
  history: "toeicOcean.history.v1",
  custom: "toeicOcean.customBank.v1",
  theme: "toeicOcean.theme.v1",
  active: "toeicOcean.activeSession.v1",
  performance: "toeicOcean.performance.v1"
};

const state = {
  currentView: "homeView",
  session: [],
  currentIndex: 0,
  answers: [],
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
  lastResult: null
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

function getBank() {
  const custom = load(KEYS.custom, []);
  const map = new Map(BUILTIN_BANK.map(q => [q.id, q]));
  custom.forEach(q => { if (q && q.id) map.set(q.id, q); });
  return [...map.values()];
}
function getWrongIds(){ return load(KEYS.wrong, []); }
function setWrongIds(ids){ save(KEYS.wrong, [...new Set(ids)]); }
function getHistory(){ return load(KEYS.history, []); }

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
    resultView:"本次成績",wrongView:"錯題本",historyView:"歷史成績",analyticsView:"弱點分析",bankView:"題庫管理"
  };
  $("#viewTitle").textContent=titles[id]||"多益題海";
  if(id==="homeView") renderDashboard();
  if(id==="setupView") updateAvailable();
  if(id==="wrongView") renderWrongBook();
  if(id==="historyView") renderHistory();
  if(id==="analyticsView") renderAnalytics();
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
  $("#nextQuestion").disabled=!answered;
  $("#nextQuestion").textContent=state.sessionMode==="mock"&&state.currentIndex===state.mockBoundary-1
    ?"進入 Reading"
    :state.currentIndex===state.session.length-1?"完成練習":"下一題";
  $("#markReview").textContent=state.reviewFlags[state.currentIndex]?"★ 已標記待檢查":"☆ 標記待檢查";
  $("#markReview").className=state.reviewFlags[state.currentIndex]?"btn primary":"btn";
  $$("[data-choice]").forEach(b=>b.addEventListener("click",()=>answerQuestion(Number(b.dataset.choice))));
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
function answerQuestion(selected,timedOut=false){
  if(state.answers[state.currentIndex]) return;
  clearInterval(state.timerId);
  const q=currentQ(), correct=selected===q.answer;
  state.answers[state.currentIndex]={
    id:q.id,selected,correct,timedOut,elapsed:elapsedForCurrentQuestion()
  };
  state.questionEndsAt=null;
  persistActive();
  if(!correct&&state.sessionMode!=="mock"){
    const ids=getWrongIds(); ids.push(q.id); setWrongIds(ids);
  }
  renderQuestion();
}
function nextQuestion(){
  if(!state.answers[state.currentIndex]) return;
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
  if(state.sessionMode==="mock"){
    const ids=getWrongIds();
    results.filter(r=>!r.correct).forEach(r=>ids.push(r.question.id));
    setWrongIds(ids);
  }
  const partLabel=[...new Set(results.map(r=>`Part ${r.question.part}`))].join(", ");
  const mode=state.sessionMode==="mock"?"Part 2–7 模考":"自由練習";
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
  const ids=getWrongIds(), map=new Map(getBank().map(q=>[q.id,q])), items=ids.map(id=>map.get(id)).filter(Boolean);
  $("#wrongList").innerHTML=items.length?items.map(q=>`<article class="wrong-item"><div class="badges"><span class="badge">Part ${q.part}</span><span class="badge gray">${safe(q.category)}</span></div><h3>${safe(q.prompt)}</h3>${q.passage?`<details><summary>查看文章</summary><div class="passage">${safe(q.passage)}</div></details>`:""}<p><b>正解：</b>${letter(q.answer)} ${safe(q.choices[q.answer])}</p><p style="color:var(--muted)">${safe(q.explanation)}</p><button class="btn danger" data-remove-wrong="${q.id}">移除</button></article>`).join(""):'<div class="card empty">目前沒有錯題。</div>';
  $$("[data-remove-wrong]").forEach(b=>b.onclick=()=>{ setWrongIds(getWrongIds().filter(id=>id!==b.dataset.removeWrong)); renderWrongBook(); });
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
$("#retryWrong").onclick=()=>{ const list=state.lastResult.results.filter(x=>!x.correct).map(x=>x.question); startSession(list,{count:list.length,seconds:0,shuffle:true,instant:true,mode:"practice"}); };
$("#practiceWrong").onclick=()=>{ const ids=getWrongIds(),map=new Map(getBank().map(q=>[q.id,q])); startSession(ids.map(id=>map.get(id)).filter(Boolean),{count:ids.length,seconds:0}); };
$("#clearWrong").onclick=()=>{ if(confirm("確定清空錯題本？")){setWrongIds([]);renderWrongBook();renderDashboard();} };
$("#clearHistory").onclick=()=>{ if(confirm("確定清空歷史紀錄？")){save(KEYS.history,[]);renderHistory();renderDashboard();} };
$("#exportJson").onclick=exportResultJson; $("#exportCsv").onclick=exportResultCsv; $("#printReport").onclick=()=>window.print();
$("#exportBank").onclick=()=>download(new Blob([JSON.stringify(getBank(),null,2)],{type:"application/json"}),"toeic-question-bank.json");
$("#resetBank").onclick=()=>{ if(confirm("移除所有自訂題庫？")){save(KEYS.custom,[]);renderDashboard();showToast("自訂題庫已移除");} };
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
  if(state.currentView!=="practiceView")return;
  if(["1","2","3","4"].includes(e.key)) answerQuestion(Number(e.key)-1);
  if(e.key==="Enter") nextQuestion();
  if(e.key.toLowerCase()==="l"&&currentQ()?.audioText) playQuestionAudio(currentQ());
  if(e.key.toLowerCase()==="r") toggleReview();
  if(e.key.toLowerCase()==="f"&&currentQ()){
    const ids=getWrongIds(), id=currentQ().id;
    if(ids.includes(id)){setWrongIds(ids.filter(x=>x!==id));showToast("已取消收藏");}
    else{ids.push(id);setWrongIds(ids);showToast("已收藏到錯題本");}
  }
});

renderDashboard(); updateAvailable(); renderResumeBanner();
