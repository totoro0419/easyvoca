import { openDB } from 'idb';
import type { Progress } from './types';
import { emptyProgress } from './learning';
const KEY='easyvoca.progress.v1';
const dbPromise = typeof indexedDB === 'undefined' ? null : openDB('easyvoca',1,{upgrade(db) {
  if(!db.objectStoreNames.contains('state')) db.createObjectStore('state');
}});
function isValid(v:unknown):v is Progress {
  if(!v||typeof v!=='object')return false;
  const p=v as Progress;
  return p.schemaVersion===1&&typeof p.revision==='number'&&Boolean(p.viewed)&&Array.isArray(p.favorites)&&Boolean(p.reviews);
}
export async function readProgress():Promise<Progress> {
  let local:Progress|undefined;
  try { const raw=localStorage.getItem(KEY);if(raw){const v:unknown=JSON.parse(raw);if(isValid(v))local=v;}}catch{ /* storage denied */ }
  let remote:Progress|undefined;
  if(dbPromise)try {const db=await dbPromise;const v:unknown=await db.get('state','progress');if(isValid(v))remote=v;}catch { /* fallback to mirrored local copy */ }
  return local&&(!remote||local.revision>=remote.revision)?local:remote??emptyProgress();
}
export async function writeProgress(progress:Progress):Promise<void> {
  let mirrored=false;
  try { localStorage.setItem(KEY,JSON.stringify(progress));mirrored=true; }catch { /* unavailable */ }
  if(!dbPromise) {
    if(!mirrored) throw new Error('保存機能が利用できません');
    return;
  }
  try {const db=await dbPromise;await db.put('state',progress,'progress');}
  catch(e) {
    if(!mirrored)throw e;
    throw new Error('IndexedDB保存に失敗。端末内の予備データにのみ保存しました。');
  }
}
