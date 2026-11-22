import {deflateSync} from 'node:zlib';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
function crc32(buffer) {
  let c=0xffffffff;
  for(const b of buffer) {c^=b;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0);}
  return (c^0xffffffff)>>>0;
}
function chunk(name,bytes) {
  const nameBytes=Buffer.from(name,'ascii');
  const head=Buffer.alloc(4);head.writeUInt32BE(bytes.length);
  const tail=Buffer.alloc(4);tail.writeUInt32BE(crc32(Buffer.concat([nameBytes,bytes])));
  return Buffer.concat([head,nameBytes,bytes,tail]);
}
function icon(size) {
  const raw=Buffer.alloc(size*(size*4+1));
  const radius=.20;
  for(let y=0;y<size;y++) {
    const off=y*(size*4+1);raw[off]=0;
    for(let x=0;x<size;x++) {
      const X=(x+.5)/size,Y=(y+.5)/size;
      const qx=Math.max(Math.abs(X-.5)-(.5-radius),0),qy=Math.max(Math.abs(Y-.5)-(.5-radius),0);
      const d=Math.hypot(qx,qy)-radius;
      const a=Math.max(0,Math.min(1,.5-d*size));
      const stem=X>=.265&&X<=.365&&Y>=.25&&Y<=.75;
      const barTop=X>=.32&&X<=.735&&Y>=.25&&Y<=.35;
      const barMid=X>=.32&&X<=.65&&Y>=.45&&Y<=.55;
      const barLow=X>=.32&&X<=.735&&Y>=.65&&Y<=.75;
      const dot=(X-.75)**2+(Y-.20)**2<.05**2;
      const white=stem||barTop||barMid||barLow;
      const at=off+1+x*4;
      raw[at]=white?255:dot?173:69;
      raw[at+1]=white?255:dot?197:104;
      raw[at+2]=white?255:dot?255:223;
      raw[at+3]=Math.round(a*255);
    }
  }
  const header=Buffer.alloc(13);
  header.writeUInt32BE(size,0);header.writeUInt32BE(size,4);header[8]=8;header[9]=6;
  return Buffer.concat([Buffer.from('89504e470d0a1a0a','hex'),chunk('IHDR',header),chunk('IDAT',deflateSync(raw,{level:9})),chunk('IEND',Buffer.alloc(0))]);
}
const dir=resolve('public/icons');
await mkdir(dir,{recursive:true});
for(const s of [192,512])await writeFile(join(dir,'icon-'+s+'.png'),icon(s));
console.log('Generated install icons: 192px and 512px');
