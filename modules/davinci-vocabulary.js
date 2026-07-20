(function(){
  const pronunciations=Object.fromEntries(`
accept|/əkˈsɛpt/
accident|/ˈæksədənt/
accustom|/əˈkəstəm/
achieve|/əˈtʃiv/
amount|/əˈmaʊnt/
appear|/əˈpɪr/
attack|/əˈtæk/
attention|/əˈtɛnʃən/
avoid|/əˈvɔɪd/
believe|/bɪˈliv/
beyond|/bɪˈjɑnd/
bough|/baʊ/
breeze|/briz/
bull|/bʊl/
business|/ˈbɪznɪs/
canal|/kəˈnæl/
cape|/keɪp/
certain|/ˈsɝtən/
chill|/tʃɪl/
chop|/tʃɑp/
clap|/klæp/
clasp|/klæsp/
cliff|/klɪf/
climate|/ˈklaɪmɪt/
collect|/kəˈlɛkt/
complete|/kəmˈplit/
concern|/kənˈsɝn/
condition|/kənˈdɪʃən/
continue|/kənˈtɪnju/
convince|/kənˈvɪns/
course|/kɔrs/
current|/ˈkɝənt/
daisy|/ˈdeɪzi/
deer|/dɪr/
den|/dɛn/
design|/dɪˈzaɪn/
destroy|/dɪˈstrɔɪ/
develop|/dɪˈvɛləp/
dine|/daɪn/
discover|/dɪˈskəvɚ/
disease|/dɪˈziz/
display|/dɪˈspleɪ/
distinguish|/dɪˈstɪŋgwɪʃ/
dove|/dʌv/
entertain|/ˌɛntɚˈteɪn/
example|/ɪgˈzæmpəl/
expect|/ɪkˈspɛkt/
extreme|/ɪkˈstrim/
flatter|/ˈflætɚ/
fowl|/faʊl/
freedom|/ˈfridəm/
general|/ˈdʒɛnərəl/
globe|/gloʊb/
govern|/ˈgʌvɚn/
hedge|/hɛdʒ/
hoof|/huf/
human|/ˈhjumən/
increase|/ɪnˈkris/
indicate|/ˈɪndəˌkeɪt/
inevitable|/ɪnˈɛvətəbəl/
instruct|/ɪnˈstrʌkt/
judge|/dʒʌdʒ/
kitten|/ˈkɪtən/
lightning|/ˈlaɪtnɪŋ/
mist|/mɪst/
modern|/ˈmɑdɚn/
moss|/mɔs/
multiply|/ˈmʌltəˌplaɪ/
oat|/oʊt/
olive|/ˈɑlɪv/
palm|/pɑm/
peach|/pitʃ/
perfect|/ˈpɝfɪkt/
perish|/ˈpɛrɪʃ/
plum|/plʌm/
pony|/ˈpoʊni/
prey|/preɪ/
produce|/prəˈdus/
proper|/ˈprɑpɚ/
provide|/prəˈvaɪd/
public|/ˈpʌblɪk/
quality|/ˈkwɑləti/
rage|/reɪdʒ/
receive|/rɪˈsiv/
recent|/ˈrisənt/
refuse|/rɪˈfjuz/
regard|/rɪˈgɑrd/
require|/rɪˈkwaɪɚ/
sense|/sɛns/
shrub|/ʃrʌb/
sign|/saɪn/
sparrow|/ˈspɛroʊ/
squirrel|/ˈskwɝəl/
stem|/stɛm/
stump|/stʌmp/
system|/ˈsɪstəm/
thorn|/θɔrn/
tobacco|/təˈbækoʊ/
total|/ˈtoʊtəl/
vapor|/ˈveɪpɚ/
poverty|/ˈpɑvɚti/
prejudice|/ˈprɛdʒədɪs/
priority|/praɪˈɔrəti/
revenue|/ˈrɛvənu/
token|/ˈtoʊkən/
tournament|/ˈtʊrnəmənt/
treaty|/ˈtriti/
tunnel|/ˈtʌnəl/
symptom|/ˈsɪmptəm/
aboard|/əˈbɔrd/
belongings|/bɪˈlɔŋɪŋz/
blizzard|/ˈblɪzɚd/
circular|/ˈsɝkjəlɚ/
continental|/ˌkɑntəˈnɛntəl/
criterion|/kraɪˈtɪriən/
diagram|/ˈdaɪəˌgræm/
diligent|/ˈdɪlədʒənt/
diploma|/dɪˈploʊmə/
dispatch|/dɪˈspætʃ/
enterprise|/ˈɛntɚˌpraɪz/
`.trim().split("\n").map(line=>line.split("|")));

  const rows=[
    ["accept","v.","接受；同意","The supplier accepted the revised delivery date.","toeic-core","davinci-1","1"],
    ["accident","n.","事故；意外","Staff must report every workplace accident immediately.","toeic-core","davinci-1","1"],
    ["accustom","v.","使習慣","New employees need time to accustom themselves to the system.","broad","davinci-1","1"],
    ["achieve","v.","達成；實現","The sales team achieved its quarterly target.","toeic-core","davinci-1","1"],
    ["amount","n./v.","數量；金額；總計","The total amount appears at the bottom of the invoice.","toeic-core","davinci-1","1"],
    ["appear","v.","出現；似乎","The confirmation number will appear on the screen.","toeic-extended","davinci-1","1"],
    ["attack","n./v.","攻擊；抨擊","The security course explains how to prevent a cyber attack.","toeic-extended","davinci-1","1"],
    ["attention","n.","注意；留意","Please bring the damaged package to the clerk's attention.","toeic-core","davinci-1","1"],
    ["avoid","v.","避免","Book early to avoid a higher ticket price.","toeic-core","davinci-1","1"],
    ["believe","v.","相信；認為","We believe the new layout will improve customer flow.","toeic-extended","davinci-1","1"],
    ["beyond","prep./adv.","超過；在更遠處","Requests received beyond the deadline may be rejected.","toeic-extended","davinci-1","1"],
    ["bough","n.","大樹枝","A heavy bough blocked the garden path.","broad","davinci-1","1"],
    ["breeze","n./v.","微風；輕鬆完成","A cool breeze entered through the open window.","broad","davinci-1","1"],
    ["bull","n.","公牛","The farm tour includes a separate area for the bull.","broad","davinci-1","1"],
    ["business","n./adj.","商業；業務；商務的","The business center is open until nine.","toeic-core","davinci-1","1"],
    ["canal","n.","運河；水道","The sightseeing boat travels along the historic canal.","toeic-extended","davinci-1","1"],
    ["cape","n.","岬；斗篷","The lighthouse stands on the northern cape.","broad","davinci-1","1"],
    ["certain","adj.","確定的；某些","Certain documents must be submitted in person.","toeic-extended","davinci-1","1"],
    ["chill","n./v.","寒意；使冷卻","Chill the samples before transporting them to the laboratory.","broad","davinci-1","1"],
    ["chop","v./n.","切碎；劈砍","The chef will chop the vegetables before the workshop.","broad","davinci-1","1"],
    ["clap","v./n.","拍手；掌聲","The audience began to clap after the presentation.","broad","davinci-1","1"],
    ["clasp","v./n.","緊握；扣環","Clasp the safety strap before moving the equipment.","broad","davinci-1","1"],
    ["cliff","n.","懸崖；峭壁","The trail near the cliff is closed during heavy rain.","broad","davinci-1","1"],
    ["climate","n.","氣候；風氣","The report examines how climate affects regional tourism.","toeic-extended","davinci-1","1"],
    ["collect","v.","收集；領取","Visitors can collect their badges at the front desk.","toeic-core","davinci-1","1"],
    ["complete","v./adj.","完成；完整的","Please complete the expense form by Friday.","toeic-core","davinci-1","1"],
    ["concern","n./v.","關切；擔憂；涉及","Please contact us if you have any concerns about the order.","toeic-core","davinci-1","1"],
    ["condition","n.","狀況；條件","The equipment arrived in excellent condition.","toeic-core","davinci-1","1"],
    ["continue","v.","繼續","The training program will continue through August.","toeic-core","davinci-1","1"],
    ["convince","v.","說服；使相信","The analyst convinced the board to review the proposal.","toeic-core","davinci-1","1"],
    ["course","n.","課程；路線；過程","Employees must complete the safety course online.","toeic-core","davinci-1","1"],
    ["current","adj./n.","目前的；水流","The current schedule is available on the website.","toeic-core","davinci-1","1"],
    ["daisy","n.","雛菊","White daisies were planted beside the entrance.","broad","davinci-1","1"],
    ["deer","n.","鹿","Drivers should watch for deer near the mountain road.","broad","davinci-1","1"],
    ["den","n.","獸穴；隱蔽小室","The documentary shows a bear returning to its den.","broad","davinci-1","1"],
    ["design","n./v.","設計；構思","The design team prepared three packaging options.","toeic-core","davinci-1","1"],
    ["destroy","v.","破壞；摧毀","Water can destroy documents stored on the basement floor.","toeic-extended","davinci-1","1"],
    ["develop","v.","發展；開發","The company plans to develop a new booking platform.","toeic-core","davinci-1","1"],
    ["dine","v.","用餐；宴請","Guests may dine on the rooftop terrace.","toeic-core","davinci-1","1"],
    ["discover","v.","發現","Technicians discovered a problem during the inspection.","toeic-extended","davinci-1","1"],
    ["disease","n.","疾病","The seminar focuses on the prevention of workplace disease.","toeic-extended","davinci-1","1"],
    ["display","n./v.","展示；陳列","The latest models are displayed near the main entrance.","toeic-core","davinci-1","1"],
    ["distinguish","v.","區分；辨別","Color labels help staff distinguish urgent orders from regular ones.","toeic-extended","davinci-1","1"],
    ["dove","n.","鴿子；和平象徵","A dove landed on the station roof.","broad","davinci-1","2-3"],
    ["entertain","v.","招待；使娛樂","The restaurant often entertains corporate clients.","toeic-core","davinci-1","2-3"],
    ["example","n.","例子；範例","The guide provides an example of a completed claim form.","toeic-core","davinci-1","2-3"],
    ["expect","v.","預期；期待","We expect the replacement parts to arrive tomorrow.","toeic-core","davinci-1","2-3"],
    ["extreme","adj./n.","極端的；極端狀況","Outdoor work may be canceled in extreme weather.","toeic-extended","davinci-1","2-3"],
    ["flatter","v.","奉承；使顯得更好看","This lighting flatters the products in the window display.","broad","davinci-1","2-3"],
    ["fowl","n.","家禽；禽鳥","The market sells locally raised fowl.","broad","davinci-1","2-3"],
    ["freedom","n.","自由；自主權","The flexible schedule gives employees more freedom.","toeic-extended","davinci-1","2-3"],
    ["general","adj./n.","一般的；總體的；主管","The general instructions are printed on the first page.","toeic-extended","davinci-1","2-3"],
    ["globe","n.","地球；球體","The company ships its products across the globe.","toeic-extended","davinci-1","2-3"],
    ["govern","v.","管理；支配","Local regulations govern the use of outdoor signs.","toeic-extended","davinci-1","2-3"],
    ["hedge","n./v.","樹籬；降低風險","A hedge separates the parking lot from the garden.","broad","davinci-1","2-3"],
    ["hoof","n.","蹄","The guide checked the horse's hoof before the tour.","broad","davinci-1","2-3"],
    ["human","adj./n.","人類的；人","Human error caused the duplicate reservation.","toeic-extended","davinci-1","2-3"],
    ["increase","n./v.","增加；提高","The store reported an increase in online orders.","toeic-core","davinci-1","2-3"],
    ["indicate","v.","指出；顯示","A red light indicates that the machine needs attention.","toeic-core","davinci-1","2-3"],
    ["inevitable","adj.","不可避免的","Some delays are inevitable during the renovation.","toeic-extended","davinci-1","2-3"],
    ["instruct","v.","指示；教導","The supervisor instructed staff to use the rear entrance.","toeic-core","davinci-1","2-3"],
    ["judge","n./v.","評審；判斷","A panel will judge the product designs next week.","toeic-extended","davinci-1","2-3"],
    ["kitten","n.","小貓","A kitten was resting beside the bookstore window.","broad","davinci-1","2-3"],
    ["lightning","n.","閃電","The outdoor concert was delayed because of lightning.","toeic-extended","davinci-1","2-3"],
    ["mist","n./v.","薄霧；起霧","Morning mist reduced visibility at the airport.","toeic-extended","davinci-1","2-3"],
    ["modern","adj.","現代的；新式的","The renovated lobby has a modern design.","toeic-core","davinci-1","2-3"],
    ["moss","n.","苔蘚","Moss covers the stones near the fountain.","broad","davinci-1","2-3"],
    ["multiply","v.","乘；大幅增加","Online complaints multiplied after the service interruption.","broad","davinci-1","2-3"],
    ["oat","n.","燕麥","The cafe offers oat milk at no extra charge.","broad","davinci-1","2-3"],
    ["olive","n./adj.","橄欖；橄欖色的","The chef added sliced olives to the salad.","broad","davinci-1","2-3"],
    ["palm","n.","手掌；棕櫚樹","Palm trees line the hotel entrance.","broad","davinci-1","2-3"],
    ["peach","n.","桃子；桃色","Fresh peaches are delivered to the restaurant every morning.","broad","davinci-1","2-3"],
    ["perfect","adj./v.","完美的；使完善","The smaller room is perfect for private meetings.","toeic-extended","davinci-1","2-3"],
    ["perish","v.","死亡；腐壞","Perishable food may perish if the refrigerator loses power.","broad","davinci-1","2-3"],
    ["plum","n.","李子；深紫色","The bakery uses fresh plums in its seasonal tart.","broad","davinci-1","2-3"],
    ["pony","n.","小馬","Children may ride a pony during the farm festival.","broad","davinci-1","2-3"],
    ["prey","n./v.","獵物；捕食","The documentary follows a bird searching for prey.","broad","davinci-1","2-3"],
    ["produce","v./n.","生產；農產品","The factory can produce five hundred units a day.","toeic-core","davinci-1","2-3"],
    ["proper","adj.","適當的；正確的","Employees must wear proper safety equipment.","toeic-core","davinci-1","2-3"],
    ["provide","v.","提供","The hotel provides free transportation to the airport.","toeic-core","davinci-1","2-3"],
    ["public","adj./n.","公共的；大眾","The gallery will open to the public on Saturday.","toeic-core","davinci-1","2-3"],
    ["quality","n./adj.","品質；優質的","The inspector checks the quality of every finished product.","toeic-core","davinci-1","2-3"],
    ["rage","n./v.","盛怒；肆虐","The storm continued to rage throughout the night.","broad","davinci-1","2-3"],
    ["receive","v.","收到；接待","You will receive a confirmation email within one hour.","toeic-core","davinci-1","2-3"],
    ["recent","adj.","最近的；近來的","Recent survey results show higher customer satisfaction.","toeic-core","davinci-1","2-3"],
    ["refuse","v.","拒絕","The carrier may refuse packages without proper labels.","toeic-core","davinci-1","2-3"],
    ["regard","n./v.","考慮；視為；關於","Please contact the manager regarding your refund request.","toeic-core","davinci-1","2-3"],
    ["require","v.","需要；規定","The position requires at least two years of experience.","toeic-core","davinci-1","2-3"],
    ["sense","n./v.","感覺；意識到；道理","The revised schedule makes sense for both departments.","toeic-extended","davinci-1","2-3"],
    ["shrub","n.","灌木","Several shrubs were planted around the patio.","broad","davinci-1","2-3"],
    ["sign","n./v.","標誌；簽署","Please sign the form before returning it.","toeic-core","davinci-1","2-3"],
    ["sparrow","n.","麻雀","A sparrow flew into the station waiting area.","broad","davinci-1","2-3"],
    ["squirrel","n.","松鼠","A squirrel was crossing the park path.","broad","davinci-1","2-3"],
    ["stem","n./v.","莖；源自；阻止","The delay stemmed from a shortage of materials.","toeic-extended","davinci-1","2-3"],
    ["stump","n./v.","樹樁；難倒","Workers removed an old stump near the loading area.","broad","davinci-1","2-3"],
    ["system","n.","系統；體制","The reservation system will be offline tonight.","toeic-core","davinci-1","2-3"],
    ["thorn","n.","刺；棘刺","Wear gloves when trimming branches with thorns.","broad","davinci-1","2-3"],
    ["tobacco","n.","菸草；菸葉","The property has a strict policy against tobacco use indoors.","broad","davinci-1","2-3"],
    ["total","n./adj./v.","總數；總計的；合計","The total cost includes delivery and installation.","toeic-core","davinci-1","2-3"],
    ["vapor","n.","蒸氣；水氣","Water vapor formed on the cold display case.","toeic-extended","davinci-1","2-3"],
    ["poverty","n.","貧窮","The charity supports programs that reduce urban poverty.","toeic-extended","davinci-2","48"],
    ["prejudice","n./v.","偏見；使抱偏見","The workshop addresses prejudice in hiring decisions.","toeic-extended","davinci-2","48"],
    ["priority","n.","優先事項；優先權","Customer safety remains our highest priority.","toeic-core","davinci-2","48"],
    ["revenue","n.","營收；收入","Online subscriptions generated additional revenue.","toeic-core","davinci-2","48"],
    ["token","n./adj.","代幣；象徵；象徵性的","Use the digital token to enter the secure area.","toeic-extended","davinci-2","48"],
    ["tournament","n.","錦標賽；競賽","The hotel will host a regional golf tournament.","toeic-extended","davinci-2","48"],
    ["treaty","n.","條約；協定","The article examines how the trade treaty affects exporters.","toeic-extended","davinci-2","48"],
    ["tunnel","n./v.","隧道；挖掘隧道","The train will pass through a tunnel before reaching the airport.","toeic-extended","davinci-2","48"],
    ["symptom","n.","症狀；徵兆","Employees with flu symptoms should stay home.","toeic-extended","davinci-2","48"],
    ["aboard","adv./prep.","在交通工具上；上車船","All passengers are now aboard the train.","toeic-core","davinci-2","49"],
    ["belongings","n.","隨身物品；財物","Please keep your belongings with you at all times.","toeic-core","davinci-2","49"],
    ["blizzard","n.","暴風雪","Several flights were canceled because of the blizzard.","toeic-extended","davinci-2","49"],
    ["circular","adj./n.","圓形的；公告傳單","The company issued a circular about the new parking rules.","toeic-extended","davinci-2","49"],
    ["continental","adj.","大陸的；歐陸式的","A continental breakfast is included in the room rate.","toeic-extended","davinci-2","49"],
    ["criterion","n.","標準；準則","Cost is only one criterion used to select a supplier.","toeic-core","davinci-2","49"],
    ["diagram","n./v.","圖解；示意圖","The manual includes a diagram of the ventilation system.","toeic-core","davinci-2","49"],
    ["diligent","adj.","勤勉的；細心的","The diligent assistant checked every entry twice.","toeic-core","davinci-2","49"],
    ["diploma","n.","畢業證書；文憑","Applicants must submit a copy of their diploma.","toeic-core","davinci-2","49"],
    ["dispatch","n./v.","派遣；發送；迅速處理","The warehouse will dispatch the order this afternoon.","toeic-core","davinci-2","49"],
    ["enterprise","n.","企業；事業","The program provides grants to small enterprises.","toeic-core","davinci-2","49"]
  ];

  const sourceTitles={
    "davinci-1":"達文西 1",
    "davinci-2":"達文西 2"
  };
  const fitLabels={
    "toeic-core":"多益核心",
    "toeic-extended":"多益延伸",
    broad:"雅思／托福廣域"
  };
  const entries=rows.map(([word,pos,zh,example,fit,source,page])=>({
    word,
    pos,
    kk:pronunciations[word] || "",
    zh,
    example,
    fit,
    fitLabel:fitLabels[fit],
    source,
    sourceTitle:sourceTitles[source],
    sourcePage:page,
    sourceLabel:`${sourceTitles[source]} p.${page}`
  }));

  window.DAVINCI_VOCABULARY={
    version:"1.0.0",
    note:"詞頭取自使用者提供的掃描教材；中文釋義、音標、分類與例句由本專案重新整理。",
    fitLabels,
    entries
  };

  window.TOEIC_VOCAB_LEXICON=window.TOEIC_VOCAB_LEXICON || {};
  entries.forEach(entry=>{
    if(!window.TOEIC_VOCAB_LEXICON[entry.word]){
      window.TOEIC_VOCAB_LEXICON[entry.word]={
        pos:entry.pos,
        kk:entry.kk,
        zh:entry.zh,
        example:entry.example
      };
    }
  });
})();
