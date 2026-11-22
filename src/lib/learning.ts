import type { CardSummary, Progress, ReviewStat, Session } from './types';
export function emptyProgress():Progress {
  return {schemaVersion:1,revision:0,viewed:{},favorites:[],reviews:{},activeSession:null,nextOffset:0,settings:{sound:true}};
}
export function startSession(items:CardSummary[],offset:number,now=new Date()):Session {
  if (!items.length) throw new Error('教材がありません');
  const start=((offset%items.length)+items.length)%items.length;
  const ids=Array.from({length:Math.min(20,items.length)},(_,i)=>items[(start+i)%items.length].candidate_id);
  return {ids,startOffset:start,cursor:0,finished:false,startedAt:now.toISOString()};
}
export function nextCursor(session:Session,direction:1|-1) {
  if (session.finished) return session.cursor;
  return Math.max(0,Math.min(session.ids.length,session.cursor+direction));
}
export function finishSession(p:Progress,total:number):Progress {
  if (!p.activeSession || p.activeSession.finished || p.activeSession.cursor<p.activeSession.ids.length) return p;
  return {...p,nextOffset:(p.activeSession.startOffset+p.activeSession.ids.length)%total,activeSession:{...p.activeSession,finished:true}};
}
export function localDay(value:string|Date):string {
  return new Date(value).toLocaleDateString('sv-SE');
}
export function reviewResult(prev:ReviewStat|undefined,correct:boolean,now=new Date()):ReviewStat {
  const streak=correct?(prev?.streak??0)+1:0;
  const days=[0,1,3,7,14,30,60];
  const delayMs=correct?days[Math.min(streak,days.length-1)]*86400000:10*60000;
  return {
    correct:(prev?.correct??0)+(correct?1:0),
    wrong:(prev?.wrong??0)+(correct?0:1),
    streak,
    dueAt:new Date(now.getTime()+delayMs).toISOString(),
    lastReviewedAt:now.toISOString()
  };
}
export function dueSummaries(catalog:CardSummary[],p:Progress,now=new Date()):CardSummary[] {
  const time=now.getTime();
  return catalog.filter(s=>p.viewed[s.candidate_id] && (!p.reviews[s.candidate_id]||Date.parse(p.reviews[s.candidate_id].dueAt)<=time))
    .sort((a,b)=>(p.reviews[a.candidate_id]?.dueAt??'').localeCompare(p.reviews[b.candidate_id]?.dueAt??'')||a.global_order-b.global_order);
}
export function searchCards(catalog:CardSummary[],query:string,pos:string,onlyFav:boolean,onlyUnread:boolean,p:Progress):CardSummary[] {
  const q=query.normalize('NFKC').toLocaleLowerCase().trim();
  const fav=new Set(p.favorites);
  return catalog.filter(s=>(!q||(s.word+' '+s.hidden_meaning_ja+' '+s.known_meaning_ja).normalize('NFKC').toLocaleLowerCase().includes(q)) &&
    (!pos||s.pos===pos)&&(!onlyFav||fav.has(s.candidate_id))&&(!onlyUnread||!p.viewed[s.candidate_id]));
}
function normalizeMeaning(s:string) { return s.normalize('NFKC').replace(/[\s、・。！!（）()\-\u30fb]/g,'').toLowerCase(); }
function hashString(s:string):number { let h=2166136261; for(const ch of s){h=Math.imul(h^ch.charCodeAt(0),16777619);}return h>>>0; }
export function makeChoices(target:CardSummary,catalog:CardSummary[]):{id:string;label:string;correct:boolean}[] {
  const answer=normalizeMeaning(target.hidden_meaning_ja);
  const targetLen=target.hidden_meaning_ja.length;
  const pool=catalog.filter(c=>c.candidate_id!==target.candidate_id&&c.word!==target.word
    &&c.pos===target.pos&&Math.abs(c.hidden_meaning_ja.length-targetLen)<Math.max(16,targetLen*0.8)
    &&normalizeMeaning(c.hidden_meaning_ja)!==answer);
  pool.sort((a,b)=>hashString(a.candidate_id+target.candidate_id)-hashString(b.candidate_id+target.candidate_id));
  const selected:CardSummary[]=[];
  for(const c of pool) {
    const meaning=normalizeMeaning(c.hidden_meaning_ja);
    if(!meaning || selected.some(x=>normalizeMeaning(x.hidden_meaning_ja)===meaning))continue;
    if((meaning.length>4&&answer.includes(meaning))||(answer.length>4&&meaning.includes(answer)))continue;
    selected.push(c);if(selected.length===3)break;
  }
  if(selected.length<3) {
    for(const c of catalog) {
      const meaning=normalizeMeaning(c.hidden_meaning_ja);
      if(c.candidate_id===target.candidate_id||c.word===target.word||!meaning||answer===meaning
        ||selected.some(x=>normalizeMeaning(x.hidden_meaning_ja)===meaning))continue;
      if(answer.includes(meaning)||meaning.includes(answer))continue;
      selected.push(c);if(selected.length===3)break;
    }
  }
  const options=[{id:target.candidate_id,label:target.hidden_meaning_ja,correct:true},...selected.map(s=>({id:s.candidate_id,label:s.hidden_meaning_ja,correct:false}))];
  const insert=hashString(target.candidate_id)%Math.max(options.length,1);
  const right=options.shift();
  if(right) options.splice(insert,0,right);
  return options;
}
