import { readFile, readdir, mkdir, writeFile, rm } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const sourceDir = resolve('content/data');
const outputDir = resolve('public/generated');
const names = (await readdir(sourceDir)).filter(name => /^batch_\d{3}\.jsonl$/.test(name)).sort();
if (names.length !== 64) throw new Error('64教材バッチが必要です: ' + names.length);
for (let i = 0; i < 64; i++) {
  if (names[i] !== 'batch_' + String(i + 1).padStart(3, '0') + '.jsonl')
    throw new Error('教材バッチが欠落: ' + (i + 1));
}
const cards = [];
const ids = new Set();
const orders = new Set();
const required = ['candidate_id','global_order','word','pos','known_meaning_ja','hidden_meaning_ja','example_en','example_ja','core_image_explanation_ja','diagram_mermaid'];
for (const [index,name] of names.entries()) {
  const lines = (await readFile(join(sourceDir,name),'utf8')).split(/\r?\n/).filter(Boolean);
  if (!lines.length) throw new Error('空バッチ: ' + name);
  for (let i=0;i<lines.length;i++) {
    let obj;
    try { obj=JSON.parse(lines[i]); } catch { throw new Error('不正なJSON: '+name+':'+(i+1)); }
    for (const key of required) {
      if (obj[key] === undefined || obj[key] === null || obj[key] === '') throw new Error('不足: '+name+':'+(i+1)+':'+key);
    }
    if (ids.has(obj.candidate_id)) throw new Error('重複ID: '+obj.candidate_id);
    if (orders.has(obj.global_order)) throw new Error('重複順序: '+obj.global_order);
    if (obj.batch !== index+1) throw new Error('バッチ番号不一致: '+obj.candidate_id);
    ids.add(obj.candidate_id);
    orders.add(obj.global_order);
    cards.push(obj);
  }
}
cards.sort((a,b)=>a.global_order-b.global_order);
if (cards.length!==5111) throw new Error('教材件数が5111ではありません: '+cards.length);
for (let i=0;i<cards.length;i++) {
  if (cards[i].global_order!==i+1) throw new Error('global_order欠落: '+(i+1));
}
await rm(outputDir,{recursive:true,force:true});
await mkdir(join(outputDir,'chunks'),{recursive:true});
const chunkSize=200;
const catalog=cards.map((card,i)=>({
  candidate_id:card.candidate_id,
  global_order:card.global_order,
  word:card.word,
  pos:card.pos,
  hidden_meaning_ja:card.hidden_meaning_ja,
  known_meaning_ja:card.known_meaning_ja,
  chunk:Math.floor(i/chunkSize)
}));
const chunks=Math.ceil(cards.length/chunkSize);
for (let i=0;i<chunks;i++) {
  await writeFile(join(outputDir,'chunks','chunk-'+String(i).padStart(3,'0')+'.json'),JSON.stringify(cards.slice(i*chunkSize,(i+1)*chunkSize)));
}
const featured=[catalog[7],catalog[28],catalog[63]].filter(Boolean);
const meta={count:cards.length,batches:names.length,chunks,chunkSize,featured};
await writeFile(join(outputDir,'catalog.json'),JSON.stringify(catalog));
await writeFile(join(outputDir,'meta.json'),JSON.stringify(meta));
console.log('EasyVoca assets:',cards.length,'cards,',chunks,'chunks,',names.length,'batches');
