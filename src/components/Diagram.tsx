import {useEffect,useState} from 'react';
import DOMPurify from 'dompurify';

type Result={svg?:string;error?:string};
let serial=0;
let renderQueue=Promise.resolve();
const cached=new Map<string,string>();
const CACHE_LIMIT=24;
const mermaidLoader=()=>import('mermaid').then(({default:mermaid})=>{
  mermaid.initialize({
    startOnLoad:false,
    securityLevel:'strict',
    htmlLabels:false,
    theme:'base',
    themeVariables:{
      fontFamily:'Inter, Noto Sans JP, sans-serif',
      primaryColor:'#f3f6ff',
      primaryTextColor:'#152238',
      primaryBorderColor:'#cad6fb',
      lineColor:'#7185b6',
      secondaryColor:'#ffffff'
    },
    flowchart:{htmlLabels:false,useMaxWidth:true}
  });
  return mermaid;
});
let loadedMermaid:ReturnType<typeof mermaidLoader>|undefined;
function loadRenderer(){return loadedMermaid??=mermaidLoader();}

function whenIdle(work:()=>void):()=>void{
  if('requestIdleCallback' in window){
    const id=window.requestIdleCallback(work,{timeout:650});
    return ()=>window.cancelIdleCallback(id);
  }
  const id=window.setTimeout(work,48);
  return ()=>window.clearTimeout(id);
}
export default function Diagram({source,cardId}:{source:string;cardId:string}) {
  const [result,setResult]=useState<Result>({});
  useEffect(()=>{
    let live=true;
    const existing=cached.get(source);
    if(existing){setResult({svg:existing});return()=>{live=false;};}
    setResult({});
    if(!source.trim()){setResult({error:'この教材には図がありません。'});return()=>{live=false;};}
    // Heavy Mermaid work starts only when the browser has idle time, and is
    // serialized. Unmounted cards are skipped before acquiring the renderer.
    const cancelIdle=whenIdle(()=>{
      if(!live)return;
      const job=renderQueue.then(async()=>{
        if(!live)return undefined;
        const mermaid=await loadRenderer();
        if(!live)return undefined;
        const id='easyvoca-'+cardId.replace(/[^a-z0-9-]/gi,'-')+'-'+(++serial);
        const rendered=await mermaid.render(id,source);
        if(!live)return undefined;
        return DOMPurify.sanitize(rendered.svg,{
          USE_PROFILES:{svg:true,svgFilters:true},
          FORBID_TAGS:['foreignObject','script']
        });
      });
      renderQueue=job.then(()=>undefined,()=>undefined);
      void job.then(svg=>{
        if(!svg||!live)return;
        cached.set(source,svg);
        if(cached.size>CACHE_LIMIT)cached.delete(cached.keys().next().value!);
        setResult({svg});
      }).catch(()=>{if(live)setResult({error:'図を表示できませんでした。説明文はそのまま読めます。'});});
    });
    return ()=>{live=false;cancelIdle();};
  },[source,cardId]);
  return <div className="diagram-wrap" role="region" aria-label="コアイメージの図。横方向にスクロールできます" tabIndex={0}>
    {result.svg?<div className="diagram-svg" role="img" aria-label="語義の関係を表す図" dangerouslySetInnerHTML={{__html:result.svg}}/>:
      <p className="diagram-state" role="status">{result.error||'図を読み込んでいます…'}</p>}
    {result.svg&&<p className="diagram-hint">左右にスクロールして図全体を見られます</p>}
  </div>;
}
