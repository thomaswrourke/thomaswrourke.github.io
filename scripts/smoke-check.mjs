import fs from 'node:fs';

const files={
  home:'index.html',
  book:'outsmart-ai-at-work/index.html',
  toolkit:'outsmart-ai-at-work/toolkit.html',
  css:'assets/styles.css',
  js:'assets/toolkit.js'
};
const read=p=>fs.readFileSync(p,'utf8');
const src=Object.fromEntries(Object.entries(files).map(([k,p])=>[k,read(p)]));
const failures=[];
const check=(condition,message)=>{if(!condition)failures.push(message);};

// JavaScript must compile.
try{new Function(src.js);}catch(err){failures.push(`toolkit.js syntax error: ${err.message}`);}

// No remote submission, tracking, or legacy identities.
const forbidden=[/fetch\s*\(/i,/XMLHttpRequest/i,/sendBeacon/i,/\bgtag\b/i,/google-analytics/i,/segment\.com/i,/facebook\.net/i,/mailto:/i,/Starmaxalex/i,/verityWt/i,/localhost/i];
for(const [name,text] of Object.entries(src)){
  for(const pattern of forbidden)check(!pattern.test(text),`${name} contains forbidden pattern ${pattern}`);
}

const AMAZON='https://www.amazon.com/dp/B0H9SF368X';
for(const name of ['home','book','toolkit']){
  check(src[name].includes(`href="${AMAZON}"`),`${name} missing exact Amazon URL`);
  check(src[name].includes('target="_blank" rel="noopener noreferrer"'),`${name} missing safe external-link attributes`);
}

// Private checkup is a local form only.
const formMatch=src.toolkit.match(/<form\b[^>]*id="job_checkup"[^>]*>/i);
check(Boolean(formMatch),'job_checkup form missing');
if(formMatch){
  check(!/\baction\s*=/i.test(formMatch[0]),'job_checkup must not have action');
  check(!/\bmethod\s*=/i.test(formMatch[0]),'job_checkup must not have method');
}
check((src.toolkit.match(/data-checkup-wall=/g)||[]).length===8,'checkup must have exactly 8 scored questions');
check((src.toolkit.match(/class="route-card"/g)||[]).length===5,'toolkit must have exactly 5 concern-routing cards');

const requiredIds=['routing','checkup','calculators','career-exposure','replacement','package-defense','threat-signals','plan-72-hour','templates','exception-ledger','decision-rights','sponsor-map','ai-value-log','comp-brief','prompts','prompts-sheet','plan','plan-90-day'];
for(const id of requiredIds)check(new RegExp(`id=["']${id}["']`).test(src.toolkit),`toolkit missing #${id}`);

const requiredFunctions=['runCheckup','routeFromConcern','resetCheckup','printWorksheet','saveWorksheet','loadWorksheet','resetWorksheet','addLedgerRow','careerExposure','replacementCost','packageCompare','threatScore','copyPrompt'];
for(const fn of requiredFunctions)check(new RegExp(`function\\s+${fn}\\s*\\(`).test(src.js),`toolkit.js missing ${fn}()`);

check(src.js.includes("const STORAGE_PREFIX='rourke:outsmart:'"),'localStorage prefix is missing or changed');
check(src.css.includes('@page{size:Letter;margin:.55in}'),'US Letter print rule missing');
check(src.css.includes('body.printing-worksheet'),'section-specific print mode missing');
check(src.css.includes('.checkup-shell'),'checkup visual system missing');
check(src.css.includes('.route-card'),'routing visual system missing');

// Duplicate IDs are a real DOM bug, except no exceptions are allowed here.
function duplicateIds(html,label){
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  const seen=new Set();
  const dup=new Set();
  for(const id of ids){if(seen.has(id))dup.add(id);seen.add(id);}
  check(dup.size===0,`${label} duplicate IDs: ${[...dup].join(', ')}`);
}
duplicateIds(src.home,'home');
duplicateIds(src.book,'book');
duplicateIds(src.toolkit,'toolkit');

// Internal fragment links should resolve in the page where they occur.
function checkFragments(html,label){
  const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  const fragments=[...html.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]);
  for(const f of fragments)check(ids.has(f),`${label} has broken #${f} link`);
}
checkFragments(src.home,'home');
checkFragments(src.book,'book');
checkFragments(src.toolkit,'toolkit');

// Every checkup/action route used by JS must land on a real toolkit element.
const routed=[...src.js.matchAll(/\['[^']+','([^']+)'\]/g)].map(m=>m[1]);
const toolkitIds=new Set([...src.toolkit.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
for(const id of routed)check(toolkitIds.has(id),`checkup action routes to missing #${id}`);

if(failures.length){
  console.error(`Smoke check failed (${failures.length}):`);
  for(const f of failures)console.error(`- ${f}`);
  process.exit(1);
}
console.log('Smoke check passed: JavaScript syntax, privacy, Amazon links, toolkit IDs, checkup routes, print CSS, duplicate IDs and fragment links verified.');
