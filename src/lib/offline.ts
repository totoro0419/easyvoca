import type {ContentMeta,ContentCard,CardSummary} from './types';

const BASE=import.meta.env.BASE_URL+'generated/';
const SNAPSHOT_KEY='easyvoca.offline.complete.v2';
const PREFIX='easyvoca-offline-';
const absolute=(path:string)=>BASE+path;

export interface OfflineStatus {
  done:number;
  total:number;
  working:boolean;
  ready:boolean;
  appReady:boolean;
  error:string;
  version:string;
}
const emptyStatus:OfflineStatus={done:0,total:0,working:false,ready:false,appReady:false,error:'',version:''};
let status:OfflineStatus=emptyStatus;
const listeners=new Set<()=>void>();
const update=(patch:Partial<OfflineStatus>)=>{
  status={...status,...patch};
  listeners.forEach(fn=>fn());
};
export const getOfflineStatus=()=>status;
export function subscribeOffline(listener:()=>void){listeners.add(listener);return()=>{listeners.delete(listener);};}
export const allContentUrls=(meta:ContentMeta):string[]=>[
  absolute('meta.json'),...(meta.offlineFiles??[]).map(file=>absolute(file.path))
];

function isManifest(meta:ContentMeta):boolean {
  return meta?.count===5111&&meta.chunks===26&&typeof meta.version==='string'&&
    /^[a-f0-9]{20}$/.test(meta.version)&&Array.isArray(meta.offlineFiles)&&
    meta.offlineFiles.length===meta.chunks+1 &&
    meta.offlineFiles.every(x=>/^(catalog\.json|chunks\/chunk-\d{3}\.json)$/.test(x.path)&&
      Number.isInteger(x.bytes)&&x.bytes>0&&/^[a-f0-9]{64}$/.test(x.sha256));
}
function savedSnapshot():ContentMeta|undefined {
  try {
    const raw=localStorage.getItem(SNAPSHOT_KEY);
    if(!raw)return;
    const parsed:ContentMeta=JSON.parse(raw);
    return isManifest(parsed)?parsed:undefined;
  }catch {return;}
}
function snapshotCache(meta:ContentMeta){return caches.open(PREFIX+meta.version);}
async function validCached(cache:Cache,url:string,meta:ContentMeta,expected?:ContentMeta['offlineFiles'][number]){
  const response=await cache.match(url);
  if(!response?.ok)return false;
  if(!expected){
    try {const m=await response.clone().json() as ContentMeta;return m.version===meta.version&&m.count===5111;}catch{return false;}
  }
  try{
    const buffer=await response.clone().arrayBuffer();
    if(buffer.byteLength!==expected.bytes)return false;
    const digest=await crypto.subtle.digest('SHA-256',buffer);
    const hash=[...new Uint8Array(digest)].map(n=>n.toString(16).padStart(2,'0')).join('');
    return hash===expected.sha256;
  }catch{return false;}
}
export async function appShellCached():Promise<boolean>{
  if(!('serviceWorker'in navigator)||!('caches'in window))return false;
  try{
    const registration=await navigator.serviceWorker.getRegistration(import.meta.env.BASE_URL);
    if(!registration?.active)return false;
    const names=(await caches.keys()).filter(n=>n.includes('precache'));
    for(const name of names){
      const keys=await (await caches.open(name)).keys();
      const paths=keys.map(k=>new URL(k.url).pathname);
      if(paths.includes(import.meta.env.BASE_URL+'index.html')&&
        paths.some(p=>p.startsWith(import.meta.env.BASE_URL+'assets/')&&p.endsWith('.js'))&&
        paths.some(p=>p.startsWith(import.meta.env.BASE_URL+'assets/')&&p.endsWith('.css'))&&
        paths.some(p=>p.endsWith('/manifest.webmanifest')))return true;
    }
  }catch{/* Browser storage can be disabled or evicted. */}
  return false;
}
async function countValid(meta:ContentMeta):Promise<number>{
  if(!('caches'in window)||!isManifest(meta))return 0;
  const cache=await snapshotCache(meta);
  let valid=await validCached(cache,absolute('meta.json'),meta)?1:0;
  for(const file of meta.offlineFiles){
    if(await validCached(cache,absolute(file.path),meta,file))valid++;
  }
  return valid;
}
export async function cachedCount(meta:ContentMeta):Promise<number>{
  return countValid(meta);
}
export async function inspectOffline(meta:ContentMeta):Promise<OfflineStatus>{
  if(!isManifest(meta)){
    update({done:0,total:28,ready:false,appReady:false,error:'教材データの版情報が不完全です。オンラインで再読み込みしてください。',version:meta.version??''});
    return status;
  }
  const total=allContentUrls(meta).length;
  const done=await countValid(meta);
  const appReady=await appShellCached();
  const ready=done===total&&appReady&&savedSnapshot()?.version===meta.version;
  update({done,total,ready,appReady,version:meta.version,error:ready?'':status.error});
  return status;
}
async function confirmCatalog(cache:Cache,meta:ContentMeta):Promise<void>{
  const response=await cache.match(absolute('catalog.json'));
  if(!response)throw new Error('検索用の教材目録がありません。');
  const catalog=await response.json() as CardSummary[];
  if(catalog.length!==5111)throw new Error('教材目録が5,111件ではありません。');
  let index=0;
  const ids=new Set<string>();
  for(let i=0;i<meta.chunks;i++){
    const response=await cache.match(absolute('chunks/chunk-'+String(i).padStart(3,'0')+'.json'));
    if(!response)throw new Error('教材チャンクが不足しています: '+i);
    const chunk=await response.json() as ContentCard[];
    const expected=Math.min(meta.chunkSize,meta.count-index);
    if(chunk.length!==expected)throw new Error('チャンク内の件数が一致しません: '+i);
    for(const card of chunk){
      const summary=catalog[index];
      if(!summary||card.candidate_id!==summary.candidate_id||card.global_order!==index+1||
        ids.has(card.candidate_id))throw new Error('教材IDの整合性エラー: '+index);
      ids.add(card.candidate_id);index++;
    }
    if(i%4===3)await new Promise<void>(resolve=>setTimeout(resolve,0));
  }
  if(index!==meta.count||ids.size!==5111)throw new Error('教材の総件数を検証できませんでした。');
}

let activeJob:Promise<void>|undefined;
// Incremental and resumable, with independent Cache Storage space per content version.
// The last verified snapshot marker is written only after all hashes and IDs pass.
export function downloadOffline(meta:ContentMeta,onProgress?:(done:number,total:number)=>void):Promise<void>{
  if(activeJob)return activeJob;
  activeJob=(async()=>{
    if(!isManifest(meta))throw new Error('教材の版情報が未対応です。更新後に再度お試しください。');
    if(!('caches'in window)||!crypto.subtle)throw new Error('このブラウザは安全なオフライン保存に対応していません。');
    const total=allContentUrls(meta).length;
    update({done:0,total,working:true,ready:false,error:'',version:meta.version});
    try{
      // Registering the SW also guarantees that the JS/CSS bundle has been precached.
      if('serviceWorker'in navigator)await navigator.serviceWorker.ready;
      const cache=await snapshotCache(meta);
      const files:[string,ContentMeta['offlineFiles'][number]|undefined][]=[
        ['meta.json',undefined],...meta.offlineFiles.map(file=>[file.path,file] as [string,typeof file])
      ];
      let done=0;
      for(const [path,entry] of files){
        const url=absolute(path);
        if(!await validCached(cache,url,meta,entry)){
          const response=await fetch(url,{cache:'reload'});
          if(!response.ok)throw new Error('教材の取得に失敗: '+path+' ('+response.status+')');
          if(!await validateDownload(response,meta,entry))throw new Error('教材の整合性確認に失敗: '+path);
          await cache.put(url,response.clone());
        }
        done++;
        update({done,total});
        onProgress?.(done,total);
        if(done%3===0)await new Promise<void>(resolve=>setTimeout(resolve,0));
      }
      await confirmCatalog(cache,meta);
      const appReady=await appShellCached();
      if(!appReady)throw new Error('アプリ本体のオフライン保存が確認できません。ブラウザの設定を確認して再試行してください。');
      localStorage.setItem(SNAPSHOT_KEY,JSON.stringify(meta));
      update({done:total,total,ready:true,appReady:true,error:''});
    }catch(error){
      const message=error instanceof Error?error.message:String(error);
      update({ready:false,error:message,appReady:await appShellCached()});
      throw error;
    }finally{
      update({working:false});
    }
  })().finally(()=>{activeJob=undefined;});
  return activeJob;
}
async function validateDownload(response:Response,meta:ContentMeta,entry?:ContentMeta['offlineFiles'][number]){
  if(!entry){
    try{const loaded=await response.clone().json() as ContentMeta;return loaded.version===meta.version&&loaded.count===meta.count;}catch{return false;}
  }
  const bytes=await response.clone().arrayBuffer();
  if(bytes.byteLength!==entry.bytes)return false;
  const hash=await crypto.subtle.digest('SHA-256',bytes);
  return [...new Uint8Array(hash)].map(n=>n.toString(16).padStart(2,'0')).join('')===entry.sha256;
}

// A complete snapshot is preferred when the browser reports no connection.
// Never mix pieces from an unverified new version with an older saved catalog.
async function fromSnapshot(path:string):Promise<Response|undefined>{
  if(!('caches'in window))return;
  const meta=savedSnapshot();
  if(!meta||!(path==='meta.json'||meta.offlineFiles.some(x=>x.path===path)))return;
  const cache=await snapshotCache(meta);
  const response=await cache.match(absolute(path));
  if(!response?.ok)return;
  const expected=meta.offlineFiles.find(x=>x.path===path);
  return await validCached(cache,absolute(path),meta,expected)?response:undefined;
}
export async function fetchOfflineAware(path:string):Promise<Response>{
  if(navigator.onLine===false){
    const cached=await fromSnapshot(path);
    if(cached)return cached;
  }
  try{
    const response=await fetch(absolute(path));
    if(response.ok)return response;
    throw new Error('HTTP '+response.status);
  }catch(error){
    const cached=await fromSnapshot(path);
    if(cached)return cached;
    throw error;
  }
}
