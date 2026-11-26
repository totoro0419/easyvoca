import {memo,useMemo} from 'react';

// SVG image documents are isolated from the application DOM: scripts, event
// handlers and remote subresources are disabled in browser SVG image mode.
// No dangerouslySetInnerHTML, dynamic Mermaid or executable object/embed.
const CACHE_LIMIT=24;
const imageSources=new Map<string,string>();
function imageSource(source:string){
  const cached=imageSources.get(source);
  if(cached){imageSources.delete(source);imageSources.set(source,cached);return cached;}
  if(!source||!/^\s*<svg\b/.test(source))return '';
  const uri='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(source);
  imageSources.set(source,uri);
  if(imageSources.size>CACHE_LIMIT)imageSources.delete(imageSources.keys().next().value!);
  return uri;
}
export default memo(function Diagram({source,cardId,alt,preview=false}:{source:string;cardId:string;alt:string;preview?:boolean}){
  const uri=useMemo(()=>imageSource(source),[source]);
  return <div className="diagram-wrap svg-diagram-wrap" data-card-id={cardId} aria-hidden={preview||undefined}>
    {uri?<img key={cardId} className="svg-diagram-image" src={uri} alt={preview?'':alt} draggable={false} decoding="sync"/>:
      <p className="diagram-state" role="status">図を表示できませんでした。説明文はそのまま読めます。</p>}
  </div>;
});
