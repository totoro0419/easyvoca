import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const base=new URL('https://totoro0419.github.io/easyvoca/generated/');
const expected=JSON.parse(await readFile('public/generated/meta.json','utf8'));
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function fetchData(path){
  const url=new URL(path,base);
  url.searchParams.set('v',expected.version);
  const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(20000)});
  if(!response.ok)throw new Error(url+' HTTP '+response.status);
  return Buffer.from(await response.arrayBuffer());
}
let actual;
for(let i=0;i<12;i++){
  try{
    actual=JSON.parse(await fetchData('meta.json'));
    if(actual.version===expected.version&&actual.visualSchemaVersion===2)break;
  }catch(error){console.log(String(error));}
  if(i<11)await sleep(5000);
}
if(actual?.version!==expected.version||actual.visualSchemaVersion!==2||actual.count!==5111)
  throw new Error('Published version has not updated: '+JSON.stringify(actual?.version));
let count=0;
let bytes=0;
for(let offset=0;offset<expected.offlineFiles.length;offset+=4){
  await Promise.all(expected.offlineFiles.slice(offset,offset+4).map(async file=>{
    const buffer=await fetchData(file.path);
    const hash=createHash('sha256').update(buffer).digest('hex');
    if(buffer.length!==file.bytes||hash!==file.sha256)throw new Error('Published file hash mismatch '+file.path);
    if(file.path.startsWith('chunks/'))count+=JSON.parse(buffer).length;
    bytes+=buffer.length;
  }));
}
if(count!==5111)throw new Error('Published cards mismatch '+count);
console.log('Published content verified:',expected.version,count,'cards',expected.offlineFiles.length,'hashes',bytes,'bytes');
