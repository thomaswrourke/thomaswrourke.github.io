const STORAGE_PREFIX='rourke:outsmart:';

function money(n){
  if(!isFinite(n))return '$0';
  return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
}

function num(id){
  const e=document.getElementById(id);
  return e?parseFloat(e.value||0):0;
}

function careerExposure(){
  const base=num('ce_base'),bonus=num('ce_bonus'),equity=num('ce_equity'),ret=num('ce_ret'),benefits=num('ce_benefits');
  const unemp=num('ce_unemp'),nextBase=num('ce_nextbase'),years=Math.max(1,num('ce_years')||5),growth=num('ce_growth')/100;
  let protectedTotal=0,threatTotal=0,p=base,t=nextBase||base;
  for(let y=0;y<years;y++){
    protectedTotal+=p+bonus+equity+ret+benefits;
    threatTotal+=y===0?Math.max(0,12-unemp)/12*(t+bonus+equity+ret+benefits):t+bonus+equity+ret+benefits;
    p*=1+growth;
    t*=1+growth;
  }
  const exposure=Math.max(0,protectedTotal-threatTotal);
  const out=document.getElementById('ce_result');
  if(out)out.innerHTML='<strong>'+money(exposure)+'</strong><br>Estimated '+years+'-year exposure. Treat this as a planning range, not a prediction.';
}

function replacementCost(){
  const current=num('rc_current'),newcost=num('rc_new'),vacancy=num('rc_vacancy'),search=num('rc_search'),training=num('rc_training'),supervision=num('rc_supervision'),rework=num('rc_rework'),risk=num('rc_risk');
  const first=newcost+vacancy+search+training+supervision+rework+risk;
  const premium=first-current;
  const saving=Math.max(0,current-newcost);
  const breakeven=saving>0?Math.max(0,premium/saving):0;
  const out=document.getElementById('rc_result');
  if(out)out.innerHTML='<strong>'+money(first)+'</strong><br>Estimated first-year replacement system cost. '+(saving>0?'Simple break-even: about '+breakeven.toFixed(1)+' years.':'No recurring saving is shown with these assumptions.');
}

function threatScore(){
  let total=0;
  const root=document.getElementById('threat-signals')||document;
  root.querySelectorAll('[data-threat]').forEach(x=>total+=parseInt(x.value||0,10));
  const label=total<=7?'normal organizational noise':total<=14?'elevated uncertainty':total<=22?'material threat':'high threat';
  const out=document.getElementById('ts_result');
  if(out)out.innerHTML='<strong>'+total+'</strong><br>'+label.charAt(0).toUpperCase()+label.slice(1)+'. This score is a preparation aid, not a prediction.';
}

function packageCompare(){
  const a=num('pa_base')+num('pa_bonus')+num('pa_equity')+num('pa_ret')+num('pa_benefits');
  const b=num('pb_base')+num('pb_bonus')+num('pb_equity')+num('pb_ret')+num('pb_benefits');
  const out=document.getElementById('pc_result');
  if(out)out.innerHTML='<strong>Package A '+money(a)+' / Package B '+money(b)+'</strong><br>Difference: '+money(Math.abs(a-b))+' in expected annual value, before taxes and personal preferences.';
}

function routeFromConcern(targetId){
  const target=document.getElementById(targetId);
  if(!target)return;
  target.scrollIntoView({behavior:'smooth',block:'start'});
  target.setAttribute('tabindex','-1');
  window.setTimeout(()=>target.focus({preventScroll:true}),450);
}

const CHECKUP_RESULTS={
  1:{title:'Wall 1: Protect the Money',text:'Before you decide how worried to be, price what is actually at risk. Uncertainty is harder to manage when salary is the only number in view.',actions:[['Career Exposure Number','career-exposure'],['Package Defense Comparison','package-defense'],['90-Day Operating Plan','plan-90-day']]},
  2:{title:'Wall 2: See the Attack Coming',text:'You do not have proof that your job is disappearing. You have enough evidence that doing nothing is now the riskier choice.',actions:[['Threat Signal Scorecard','threat-signals'],['Career Exposure Number','career-exposure'],['72-Hour Defense Plan','plan-72-hour']]},
  3:{title:'Wall 3: Make Replacement Expensive',text:'A large part of your value may appear only when the standard process breaks. The next step is not to claim that you are indispensable. It is to document the real cost of rebuilding that judgment and exception capacity.',actions:[['Hidden Replacement Bill','replacement'],['Exception Ledger','exception-ledger'],['72-Hour Defense Plan','plan-72-hour']]},
  4:{title:'Wall 4: Own the Decisions',text:'Your risk is less about how much work you produce and more about where authority is moving. Map the decisions, thresholds, approvals, and consequences before your role is defined only by output.',actions:[['Decision Rights Map','decision-rights'],['Threat Signal Scorecard','threat-signals'],['90-Day Operating Plan','plan-90-day']]},
  5:{title:'Wall 5: Build Political Protection',text:'One supportive manager can matter a great deal, but one relationship is also a single point of failure. Build legitimate sponsorship around business results, not personal loyalty.',actions:[['Sponsor Map','sponsor-map'],['One-Page Compensation Brief','comp-brief'],['90-Day Operating Plan','plan-90-day']]},
  6:{title:'Wall 6: Defend the Pay',text:'If scope moved and compensation did not, the problem is not solved by working harder in silence. Build a short evidence package that makes the mismatch visible and gives the conversation a specific ask.',actions:[['One-Page Compensation Brief','comp-brief'],['Package Defense Comparison','package-defense'],['Career Exposure Number','career-exposure']]},
  7:{title:'Wall 7: Stay Current',text:'Using AI well can increase your value, but only if the organization can see what remains after generation: review, rejection, judgment, escalation, and business consequence.',actions:[['AI Value Capture Log','ai-value-log'],['Decision Rights Map','decision-rights'],['90-Day Operating Plan','plan-90-day']]}
};

function runCheckup(){
  const fields=[...document.querySelectorAll('[data-checkup-wall]')];
  const out=document.getElementById('checkup_result');
  if(!out||!fields.length)return;
  const totals={1:0,2:0,3:0,4:0,5:0,6:0,7:0};
  let overall=0;
  fields.forEach(field=>{
    const wall=parseInt(field.dataset.checkupWall,10);
    const value=parseInt(field.value||0,10);
    totals[wall]+=value;
    overall+=value;
  });
  if(overall===0){
    out.hidden=false;
    out.innerHTML='<h3>No strong pattern yet.</h3><p>That is useful information. Keep a light evidence log, learn the economics of your role, and avoid turning normal organizational noise into a prediction.</p><p><a href="#career-exposure" onclick="routeFromConcern(\'career-exposure\');return false">Start with your Career Exposure Number</a> · <a href="#plan-90-day" onclick="routeFromConcern(\'plan-90-day\');return false">Set a calm 90-day review</a></p>';
    return;
  }
  const tieOrder=[2,3,4,6,5,7,1];
  const max=Math.max(...Object.values(totals));
  const winner=tieOrder.find(w=>totals[w]===max)||2;
  const r=CHECKUP_RESULTS[winner];
  const links=r.actions.map(([label,id])=>'<a href="#'+id+'" onclick="routeFromConcern(\''+id+'\');return false">'+label+'</a>').join(' · ');
  out.hidden=false;
  out.innerHTML='<h3>Your first priority is '+r.title+'.</h3><p>'+r.text+'</p><p><strong>Three next moves:</strong><br>'+links+'</p>';
}

function resetCheckup(){
  document.querySelectorAll('[data-checkup-wall]').forEach(field=>field.value='0');
  const out=document.getElementById('checkup_result');
  if(out){out.hidden=true;out.innerHTML='';}
}

function copyPrompt(id,btn){
  const el=document.getElementById(id);
  if(!el)return;
  const text=el.innerText;
  const done=()=>{const old=btn.innerText;btn.innerText='Copied';window.setTimeout(()=>btn.innerText=old,1200);};
  if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(done).catch(()=>fallbackCopy(text,done));}
  else fallbackCopy(text,done);
}

function fallbackCopy(text,done){
  const ta=document.createElement('textarea');
  ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();
  try{document.execCommand('copy');done();}catch(e){}
  ta.remove();
}

function getWorksheet(id){return document.getElementById(id);}
function worksheetFields(root){return [...root.querySelectorAll('input,textarea,select')];}

function captureWorksheet(root){
  const tables=[...root.querySelectorAll('table')].map(t=>({id:t.id,rows:t.tBodies[0]?t.tBodies[0].rows.length:0}));
  const fields=worksheetFields(root).map(f=>({tag:f.tagName,type:f.type||'',value:f.value,checked:!!f.checked}));
  return {tables,fields};
}

function ensureTableRows(tableId,count){
  const table=document.getElementById(tableId);
  if(!table||!table.tBodies[0]||!table.tBodies[0].rows.length)return;
  while(table.tBodies[0].rows.length<count)addLedgerRow(tableId);
  while(table.tBodies[0].rows.length>count&&table.tBodies[0].rows.length>1)table.tBodies[0].deleteRow(-1);
}

function applyWorksheet(root,state){
  if(!state)return;
  (state.tables||[]).forEach(t=>ensureTableRows(t.id,t.rows));
  const fields=worksheetFields(root);
  (state.fields||[]).forEach((saved,i)=>{
    const f=fields[i];if(!f)return;
    if(f.type==='checkbox'||f.type==='radio')f.checked=!!saved.checked;
    else f.value=saved.value;
  });
}

function saveWorksheet(id){
  const root=getWorksheet(id);if(!root)return;
  try{
    localStorage.setItem(STORAGE_PREFIX+id,JSON.stringify(captureWorksheet(root)));
    flashControl(root,'Saved on this device');
  }catch(e){flashControl(root,'Could not save in this browser');}
}

function loadWorksheet(id){
  const root=getWorksheet(id);if(!root)return;
  try{const raw=localStorage.getItem(STORAGE_PREFIX+id);if(raw)applyWorksheet(root,JSON.parse(raw));}catch(e){}
}

function resetWorksheet(id){
  const root=getWorksheet(id);if(!root)return;
  root.querySelectorAll('table').forEach(table=>{
    const body=table.tBodies[0];
    if(!body)return;
    const keep=Math.max(1,parseInt(table.dataset.defaultRows||body.rows.length,10));
    while(body.rows.length>keep)body.deleteRow(-1);
  });
  worksheetFields(root).forEach(f=>{
    if(f.type==='checkbox'||f.type==='radio')f.checked=false;
    else if(f.tagName==='SELECT')f.selectedIndex=0;
    else f.value='';
  });
  try{localStorage.removeItem(STORAGE_PREFIX+id);}catch(e){}
  const result=root.querySelector('.result');
  if(result)result.innerHTML='<strong>Cleared</strong><br>Enter new assumptions when you are ready.';
  flashControl(root,'Cleared');
}

function flashControl(root,message){
  let note=root.querySelector('.save-status');
  if(!note){note=document.createElement('span');note.className='save-status small';const controls=root.querySelector('.worksheet-controls');if(controls)controls.appendChild(note);}
  if(note){note.textContent=message;window.setTimeout(()=>{note.textContent='';},1800);}
}

function clearWorksheetForPrint(root){
  worksheetFields(root).forEach(f=>{
    if(f.type==='checkbox'||f.type==='radio')f.checked=false;
    else if(f.tagName==='SELECT')f.selectedIndex=0;
    else f.value='';
  });
  const result=root.querySelector('.result');
  if(result)result.innerHTML='<strong>Blank worksheet</strong><br>Use the fields above to work the problem on paper.';
}

function printWorksheet(id,blank){
  const root=getWorksheet(id);if(!root)return;
  const state=captureWorksheet(root);
  const result=root.querySelector('.result');
  const resultHTML=result?result.innerHTML:null;
  if(blank)clearWorksheetForPrint(root);
  document.body.classList.add('printing-worksheet');
  root.classList.add('is-printing');
  let restored=false;
  const restore=()=>{
    if(restored)return;restored=true;
    applyWorksheet(root,state);
    if(result&&resultHTML!==null)result.innerHTML=resultHTML;
    root.classList.remove('is-printing');
    document.body.classList.remove('printing-worksheet');
  };
  window.addEventListener('afterprint',restore,{once:true});
  window.print();
  window.setTimeout(restore,6000);
}

function addLedgerRow(tableId){
  const table=document.getElementById(tableId);
  if(!table||!table.tBodies[0]||!table.tBodies[0].rows.length)return;
  const row=table.tBodies[0].rows[table.tBodies[0].rows.length-1].cloneNode(true);
  row.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
  row.querySelectorAll('input,textarea').forEach(el=>{el.value='';if(el.type==='checkbox'||el.type==='radio')el.checked=false;});
  row.querySelectorAll('select').forEach(el=>el.selectedIndex=0);
  table.tBodies[0].appendChild(row);
}

function initializeWorksheetTables(){
  document.querySelectorAll('[data-print-target] table[id]').forEach(table=>{
    const body=table.tBodies[0];
    if(body&&!table.dataset.defaultRows)table.dataset.defaultRows=String(body.rows.length);
  });
}

function restoreSavedWorksheets(){
  document.querySelectorAll('[data-print-target][id]').forEach(root=>loadWorksheet(root.id));
}

document.addEventListener('DOMContentLoaded',()=>{
  initializeWorksheetTables();
  restoreSavedWorksheets();
});
