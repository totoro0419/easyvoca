import { readFile, readdir, mkdir, writeFile, rm } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { Resvg } from '@resvg/resvg-js';

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
const required = ['candidate_id','global_order','word','pos','known_meaning_ja','hidden_meaning_ja','core_image_explanation_ja','diagram_mermaid'];
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
// Preserve worker archives; join only by both stable identifiers and exact word.
const visualDir=resolve('content/visual-v2');
const visuals=new Map();
const visualIds=new Set();
const expectedCounts=[1023,1022,1022,1022,1022];
// Five original SVG documents are truncated to a background/title. Only
// those failed display records receive a static restoration of their existing
// lesson graph; no new teaching claims or visual-quality review.
const truncatedOrders=new Set([883,998,1791,1866,2362]);
function escapeXml(text){return text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');}
function fallbackGraph(card){
  const labels=[...card.diagram_mermaid.matchAll(/^\s*[A-Za-z]\w*\s*\[\s*"([^"]+)"\s*\]\s*$/gm)].map(m=>m[1]);
  if(labels.length<3||labels.length>4)throw new Error('Cannot restore truncated SVG: '+card.global_order);
  const wrap=(str,max)=>{
    const lines=[];let line='',width=0;
    for(const ch of str){
      const w=/[\u0000-\u007f]/.test(ch)?0.55:1;
      if(width+w>max&&line){lines.push(line);line='';width=0;}
      line+=ch;width+=w;
    }
    if(line)lines.push(line);return lines;
  };
  const root=wrap(labels[0],23),children=labels.slice(1).map(t=>wrap(t,labels.length===4?7:11));
  const rootH=20+root.length*15;
  const childH=20+Math.max(...children.map(x=>x.length))*15;
  const childY=12+rootH+23;
  const width=320;
  const cw=children.length===2?146:96;
  const gap=children.length===2?8:6;
  const left=(width-(cw*children.length+gap*(children.length-1)))/2;
  const height=childY+childH+10;
  const txt=(lines,x,y,size)=>lines.map((line,i)=>'<text x="'+x+'" y="'+(y+i*15)+'" font-size="'+size+'" font-family="sans-serif" text-anchor="middle" fill="#152238">'+escapeXml(line)+'</text>').join('');
  const boxes=children.map((lines,i)=>{
    const x=left+i*(cw+gap),mid=x+cw/2;
    return '<path d="M160 '+(12+rootH)+' V'+(childY-11)+' H'+mid+' V'+childY+'" fill="none" stroke="#7185b6" stroke-width="1.5"/><rect x="'+x+'" y="'+childY+'" width="'+cw+'" height="'+childH+'" rx="8" fill="#eef5ff" stroke="#a4bde4"/>'+txt(lines,mid,childY+19,12);
  }).join('');
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 '+height+'" role="img"><rect width="320" height="'+height+'" rx="10" fill="#fff"/><rect x="12" y="12" width="296" height="'+rootH+'" rx="8" fill="#dfeaff" stroke="#a4bde4"/>'+txt(root,160,31,12)+boxes+'</svg>';
}
let svgBytes=0;
const syntaxRepairs=[];
const parseFailures=[];
for(let worker=1;worker<=5;worker++){
  const dir=join(visualDir,'worker-'+worker);
  const runs=(await readdir(dir)).filter(name=>/^run-\d+\.jsonl$/.test(name)).sort();
  let count=0;
  for(const name of runs){
    const lines=(await readFile(join(dir,name),'utf8')).split(/\r?\n/);
    for(const [lineNo,line] of lines.entries()){
      if(!line.trim())continue;
      const location=name+':'+(lineNo+1)+' (worker '+worker+')';
      let row;
      try{row=JSON.parse(line);}catch{throw new Error('SVG JSONL error: '+location);}
      const n=row.global_order;
      if(!Number.isInteger(n)||n<1||n>5111||visuals.has(n)||visualIds.has(row.candidate_id))
        throw new Error('SVG order/ID duplicate or invalid: '+location);
      const card=cards[n-1];
      if(row.candidate_id!==card.candidate_id||row.word!==card.word||row.schema_version!==2)
        throw new Error('SVG identity mismatch: '+location+' order '+n);
      if(typeof row.svg!=='string'||!/^\s*<svg\b[\s\S]*<\/svg>\s*$/.test(row.svg))
        throw new Error('Missing SVG root: '+location);
      // No rasterization or visual review: parse each original as SVG.
      let svg=row.svg;
      try{new Resvg(svg,{font:{loadSystemFonts:false}});}
      catch(initial){
        // Only repair XML delimiters/entities that prevent any display;
        // leave original worker archives unchanged.
        let repaired=svg.replace(/<(?=<\/svg>)/g,'')
          .replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-f]+;)/gi,'&amp;')
          .replace(/<(?![a-zA-Z_\/!?])/g,'&lt;');
        // The generator emitted a default font-size followed by an explicit
        // override on these four records. Retain the intended last value.
        if([1822,1862,1942,1952].includes(n)){
          repaired=repaired.replace(/<text\b[^>]*>/g,tag=>{
            const sizes=[...tag.matchAll(/\sfont-size="[^"]*"/g)];
            if(sizes.length<2)return tag;
            for(let i=sizes.length-2;i>=0;i--){
              const match=sizes[i];
              tag=tag.slice(0,match.index)+tag.slice(match.index+match[0].length);
            }
            return tag;
          });
        }
        try{
          new Resvg(repaired,{font:{loadSystemFonts:false}});
          svg=truncatedOrders.has(n)?fallbackGraph(card):repaired;
          new Resvg(svg,{font:{loadSystemFonts:false}});
          syntaxRepairs.push({order:n,word:row.word,location,restoredFromOriginalGraph:truncatedOrders.has(n)});
        }catch(error){parseFailures.push({order:n,word:row.word,location,error:String(error),initial:String(initial)});}
      }
      visuals.set(n,{svg,alt:typeof row.alt_ja==='string'?row.alt_ja:''});
      visualIds.add(row.candidate_id);
      svgBytes+=Buffer.byteLength(svg);
      count++;
    }
  }
  if(count!==expectedCounts[worker-1])throw new Error('SVG count worker '+worker+': '+count);
}
console.log('SVG display syntax repairs:',JSON.stringify(syntaxRepairs));
if(parseFailures.length)throw new Error('Unresolved SVG parse failures: '+JSON.stringify(parseFailures));
if(visuals.size!==5111||visualIds.size!==5111)throw new Error('SVG total mismatch: '+visuals.size);
for(const card of cards){
  const visual=visuals.get(card.global_order);
  if(!visual)throw new Error('Missing SVG order '+card.global_order);
  card.diagram_svg=visual.svg;
  card.diagram_alt=visual.alt;
}
console.log('SVG integration verified: 5111 / 5111; duplicate/mismatch: 0; SVG bytes:',svgBytes);
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
  status:card.status,
  chunk:Math.floor(i/chunkSize)
}));
const chunks=Math.ceil(cards.length/chunkSize);
const offlineFiles=[];
function hashFile(path,text){
  const bytes=Buffer.byteLength(text);
  const sha256=createHash('sha256').update(text).digest('hex');
  offlineFiles.push({path,bytes,sha256});
}
for (let i=0;i<chunks;i++) {
  const filename='chunks/chunk-'+String(i).padStart(3,'0')+'.json';
  const payload=JSON.stringify(cards.slice(i*chunkSize,(i+1)*chunkSize).map(({diagram_mermaid,...card})=>card));
  await writeFile(join(outputDir,filename),payload);
  hashFile(filename,payload);
}
const featured=[catalog[7],catalog[28],catalog[63]].filter(Boolean);
const catalogJson=JSON.stringify(catalog);
await writeFile(join(outputDir,'catalog.json'),catalogJson);
hashFile('catalog.json',catalogJson);
const version=createHash('sha256').update(offlineFiles.map(f=>f.path+':'+f.sha256).join('|')).digest('hex').slice(0,20);
const meta={visualSchemaVersion:2,count:cards.length,batches:names.length,chunks,chunkSize,featured,version,offlineFiles};
await writeFile(join(outputDir,'meta.json'),JSON.stringify(meta));
console.log('Offline content bytes:',offlineFiles.reduce((sum,file)=>sum+file.bytes,0));
console.log('EasyVoca assets:',cards.length,'cards,',chunks,'chunks,',names.length,'batches');
