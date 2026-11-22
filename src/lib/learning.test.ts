import { describe,it,expect } from 'vitest';
import { dueSummaries, emptyProgress, finishSession, makeChoices, nextCursor, reviewResult, searchCards, startSession } from './learning';
import type { CardSummary } from './types';
const cards:CardSummary[]=Array.from({length:50},(_,i)=>({
 candidate_id:'id'+i,global_order:i+1,word:'word'+i,pos:'noun',hidden_meaning_ja:'特別な意味'+i,known_meaning_ja:'普通の意味'+i,chunk:Math.floor(i/20)
}));
describe('学習モデル',()=>{
 it('20件で開始し同じIDを重複させない',()=>{
   const s=startSession(cards,0);expect(s.ids.length).toBe(20);expect(new Set(s.ids).size).toBe(20);
   expect(nextCursor(s,-1)).toBe(0);expect(nextCursor(s,1)).toBe(1);
 });
 it('セッション完了後の位置を次の20件に更新する',()=>{
   const p=emptyProgress();p.activeSession={...startSession(cards,0),cursor:20};
   const end=finishSession(p,cards.length);
   expect(end.nextOffset).toBe(20);expect(end.activeSession?.finished).toBe(true);
 });
 it('閲覧・お気に入りによる絞り込みと語義IDを区別する',()=>{
   const p=emptyProgress();p.viewed.id0='2026-11-22';p.favorites=['id1'];
   expect(searchCards(cards,'特別な意味1','noun',true,false,p).map(c=>c.candidate_id)).toEqual(['id1','id10','id11','id12','id13','id14','id15','id16','id17','id18','id19'].filter(id=>id==='id1'));
   expect(searchCards(cards,'','',false,true,p).length).toBe(49);
 });
 it('復習日程: 正解なら1日→3日、不正解なら10分',()=>{
   const now=new Date('2026-11-22T00:00:00.000Z');
   const a=reviewResult(undefined,true,now);
   expect(a.dueAt).toBe('2026-11-23T00:00:00.000Z');
   const b=reviewResult(a,true,now);
   expect(b.dueAt).toBe('2026-11-25T00:00:00.000Z');
   const c=reviewResult(b,false,now);
   expect(c.dueAt).toBe('2026-11-22T00:10:00.000Z');
   const p=emptyProgress();p.viewed.id0=now.toISOString();p.reviews.id0=a;
   expect(dueSummaries(cards,p,now).length).toBe(0);
 });
 it('4択は正解1件かつ4件のIDが異なる',()=>{
   const choices=makeChoices(cards[0],cards);
   expect(choices.length).toBe(4);
   expect(choices.filter(c=>c.correct).length).toBe(1);
   expect(new Set(choices.map(c=>c.id)).size).toBe(4);
 });
});
