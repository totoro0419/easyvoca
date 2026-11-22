import {contentUrl} from './data';
import type {ContentMeta} from './types';
const CACHE='easyvoca-content-v1';
export function allContentUrls(meta:ContentMeta):string[] {
  const urls=[contentUrl('meta.json'),contentUrl('catalog.json')];
  for(let i=0;i<meta.chunks;i++)urls.push(contentUrl('chunks/chunk-'+String(i).padStart(3,'0')+'.json'));
  return urls;
}
export async function cachedCount(meta:ContentMeta):Promise<number> {
  if(!('caches' in window))return 0;
  const cache=await caches.open(CACHE);
  const keys=await Promise.all(allContentUrls(meta).map(url=>cache.match(url)));
  return keys.filter(Boolean).length;
}
export async function downloadOffline(meta:ContentMeta,onProgress:(done:number,total:number)=>void):Promise<void> {
  if(!('caches' in window))throw new Error('このブラウザはオフライン保存に対応していません。');
  const urls=allContentUrls(meta);
  const cache=await caches.open(CACHE);
  let done=0;onProgress(0,urls.length);
  for(const url of urls) {
    const existing=await cache.match(url);
    if(!existing) {
      const res=await fetch(url);
      if(!res.ok)throw new Error('ダウンロードに失敗: '+url);
      await cache.put(url,res.clone());
    }
    done++;onProgress(done,urls.length);
  }
  const count=await cachedCount(meta);
  if(count!==urls.length)throw new Error('保存されたファイル数が一致しません。');
}
