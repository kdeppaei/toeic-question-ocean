const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");

const root=path.resolve(__dirname,"..");
const context={window:{TOEIC_VOCAB_LEXICON:{}}};
vm.createContext(context);
for(const file of ["vocab-lexicon.js","vocab-lexicon-v35.js","modules/davinci-vocabulary.js"]){
  vm.runInContext(fs.readFileSync(path.join(root,file),"utf8"),context,{filename:file});
}

const catalog=context.window.DAVINCI_VOCABULARY;
const entries=catalog?.entries || [];
const issues=[];
const seen=new Set();
const validFits=new Set(["toeic-core","toeic-extended","broad"]);

for(const entry of entries){
  if(!entry.word || !/^[a-z]+$/.test(entry.word)) issues.push(`${entry.word || "(missing)"}: invalid word`);
  if(seen.has(entry.word)) issues.push(`${entry.word}: duplicate`);
  seen.add(entry.word);
  for(const field of ["pos","kk","zh","example","fit","source","sourcePage","sourceLabel"]){
    if(!entry[field]) issues.push(`${entry.word}: missing ${field}`);
  }
  if(!validFits.has(entry.fit)) issues.push(`${entry.word}: invalid fit ${entry.fit}`);
  if(!/^\/.+\/$/.test(entry.kk)) issues.push(`${entry.word}: invalid phonetic`);
  if(!/^davinci-[12]$/.test(entry.source)) issues.push(`${entry.word}: invalid source`);
  if(!/[.!?]$/.test(entry.example)) issues.push(`${entry.word}: example lacks ending punctuation`);
}

const counts=Object.fromEntries([...validFits].map(fit=>[
  fit,
  entries.filter(entry=>entry.fit===fit).length
]));
if(entries.length<170) issues.push(`expected at least 170 entries, got ${entries.length}`);
if(counts["toeic-core"]<65) issues.push(`too few TOEIC core entries: ${counts["toeic-core"]}`);
if(counts["toeic-extended"]<45) issues.push(`too few TOEIC extended entries: ${counts["toeic-extended"]}`);
if(counts.broad<40) issues.push(`too few broad entries: ${counts.broad}`);

console.log(JSON.stringify({
  entries:entries.length,
  counts,
  sources:Object.fromEntries(["davinci-1","davinci-2"].map(source=>[
    source,
    entries.filter(entry=>entry.source===source).length
  ])),
  issues
},null,2));

if(issues.length) process.exitCode=1;
