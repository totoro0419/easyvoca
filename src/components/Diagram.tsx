import {useEffect,useState} from 'react';
import DOMPurify from 'dompurify';
let serial=0;
let renderQueue=Promise.resolve();
type Result={svg?:string;error?:string};
export default function Diagram({source,cardId}:{source:string;cardId:string}) {
  const [result,setResult]=useState<Result>({});
  useEffect(()=>{
    let live=true;
    setResult({});
    if(!source.trim()) {setResult({error:'この教材には図がありません。'});return;}
    const job=renderQueue.then(async()=>{
      const mermaid=(await import('mermaid')).default;
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
      const id='easyvoca-'+cardId.replace(/[^a-z0-9-]/gi,'-')+'-'+(++serial);
      const rendered=await mermaid.render(id,source);
      return DOMPurify.sanitize(rendered.svg,{
        USE_PROFILES:{svg:true,svgFilters:true},
        FORBID_TAGS:['foreignObject','script']
      });
    });
    renderQueue=job.then(()=>undefined,()=>undefined);
    void job.then(svg=>{if(live)setResult({svg});}).catch(()=>{if(live)setResult({error:'図を表示できませんでした。説明文はそのまま読めます。'});});
    return ()=>{live=false;};
  },[source,cardId]);
  return <div className="diagram-wrap" aria-label="コアイメージの図">
    {result.svg?<div className="diagram-svg" role="img" aria-label="語義の関係を表す図" dangerouslySetInnerHTML={{__html:result.svg}}/>:
      <p className="diagram-state">{result.error||'図を読み込んでいます…'}</p>}
  </div>;
}
