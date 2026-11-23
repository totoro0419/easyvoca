// PNG assets are rendered from the approved EV monogram's traced SVG artwork.
// Keep a separate, padded maskable version for Android adaptive icon masks.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {Resvg} from '@resvg/resvg-js';

const original=await readFile(resolve('public/favicon.svg'),'utf8');
if(!original.includes('id="ev-mark"'))throw new Error('EV logo source is missing the expected mark');
const maskable=original.replace('id="ev-mark"', 'id="ev-mark" transform="translate(512 512) scale(0.76) translate(-512 -512)"');
if(maskable===original)throw new Error('Unable to apply safe-zone padding to adaptive icon');

const output=resolve('public/icons');
await mkdir(output,{recursive:true});
const renders=[
  ['ev-icon-192.png',192,original],
  ['ev-icon-512.png',512,original],
  ['ev-icon-maskable-192.png',192,maskable],
  ['ev-icon-maskable-512.png',512,maskable],
  ['apple-touch-icon.png',180,original]
];
for(const [name,size,source] of renders){
  const png=new Resvg(source,{fitTo:{mode:'width',value:size}}).render().asPng();
  if(png.readUInt32BE(16)!==size||png.readUInt32BE(20)!==size)throw new Error('Incorrect icon dimensions: '+name);
  await writeFile(join(output,name),png);
  console.log('PWA icon:',name,size+'x'+size,png.length+' bytes');
}
