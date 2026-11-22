import type { CardSummary, ContentCard, ContentMeta } from './types';
import {fetchOfflineAware} from './offline';
const base = import.meta.env.BASE_URL + 'generated/';
let metaPromise: Promise<ContentMeta> | undefined;
let catalogPromise: Promise<CardSummary[]> | undefined;
const chunkPromises = new Map<number,Promise<ContentCard[]>>();
async function getJson<T>(path:string):Promise<T> {
  const res = await fetchOfflineAware(path);
  if (!res.ok) throw new Error('教材の取得に失敗しました ('+res.status+')');
  return res.json() as Promise<T>;
}
export function loadMeta() {
  return metaPromise ??= getJson<ContentMeta>('meta.json').catch(e=>{metaPromise=undefined;throw e;});
}
export function loadCatalog() {
  return catalogPromise ??= getJson<CardSummary[]>('catalog.json').catch(e=>{catalogPromise=undefined;throw e;});
}
export function loadChunk(n:number) {
  if (!Number.isInteger(n)||n<0) return Promise.reject(new Error('不正な教材番号'));
  if (!chunkPromises.has(n)) {
    const path='chunks/chunk-'+String(n).padStart(3,'0')+'.json';
    chunkPromises.set(n,getJson<ContentCard[]>(path).catch(e=>{chunkPromises.delete(n);throw e;}));
  }
  return chunkPromises.get(n)!;
}
export async function getCard(summary:CardSummary):Promise<ContentCard> {
  const cards=await loadChunk(summary.chunk);
  const found=cards.find(card=>card.candidate_id===summary.candidate_id);
  if (!found) throw new Error('教材IDの対応が不一致: '+summary.candidate_id);
  return found;
}
export function prefetchCard(summary?:CardSummary) {
  if (summary) void loadChunk(summary.chunk).catch(()=>undefined);
}
export function contentUrl(relative:string) { return base+relative; }
