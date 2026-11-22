import {useCallback,useEffect,useRef} from 'react';
import type {PointerEvent,ReactNode} from 'react';

interface Props {identity:string;canPrev:boolean;canNext:boolean;onMove:(direction:-1|1)=>void;children:ReactNode;}
export default function SwipeReader({identity,canPrev,canNext,onMove,children}:Props) {
  const root=useRef<HTMLDivElement>(null);
  const page=useRef<HTMLDivElement>(null);
  const down=useRef<{x:number;y:number;at:number;pointer:number;axis:'unknown'|'horizontal'|'vertical'}|null>(null);
  const locked=useRef(false);
  const timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
  const reset=useCallback(()=>{
    if(page.current){page.current.style.transition='transform 190ms cubic-bezier(.22,1,.36,1), opacity 190ms';page.current.style.transform='';page.current.style.opacity='';}
    down.current=null;
  },[]);
  useEffect(()=>{
    root.current?.scrollTo(0,0);
    if(page.current){page.current.style.transition='none';page.current.style.transform='';page.current.style.opacity='';}
    locked.current=false;
    if(timer.current)clearTimeout(timer.current);
  },[identity]);
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
  function start(e:PointerEvent<HTMLDivElement>){
    if(locked.current||e.button!==0||(e.target as HTMLElement).closest('button,a,input'))return;
    down.current={x:e.clientX,y:e.clientY,at:performance.now(),pointer:e.pointerId,axis:'unknown'};
    if(page.current)page.current.style.transition='none';
  }
  function move(e:PointerEvent<HTMLDivElement>) {
    const d=down.current;if(!d||d.pointer!==e.pointerId||locked.current)return;
    const dx=e.clientX-d.x,dy=e.clientY-d.y;
    if(d.axis==='unknown'&&Math.max(Math.abs(dx),Math.abs(dy))>9) {
      d.axis=Math.abs(dx)>Math.abs(dy)*1.35?'horizontal':'vertical';
      if(d.axis==='horizontal'&&e.currentTarget.hasPointerCapture(e.pointerId)===false) {
        try{e.currentTarget.setPointerCapture(e.pointerId);}catch{ /* native gesture */ }
      }
    }
    if(d.axis!=='horizontal')return;
    const allowed=dx>0?canPrev:canNext;
    const px=allowed?dx:dx*.17;
    if(page.current){page.current.style.transform='translate3d('+px+'px,0,0) rotate('+(px/90)+'deg)';page.current.style.opacity=String(1-Math.min(.18,Math.abs(px)/1200));}
  }
  function end(e:PointerEvent<HTMLDivElement>) {
    const d=down.current;if(!d||d.pointer!==e.pointerId||locked.current)return;
    const dx=e.clientX-d.x,dy=e.clientY-d.y;
    down.current=null;
    if(d.axis!=='horizontal'||Math.abs(dx)<Math.abs(dy)) {reset();return;}
    const velocity=Math.abs(dx)/Math.max(16,performance.now()-d.at);
    const allowed=dx>0?canPrev:canNext;
    const qualifies=Math.abs(dx)>82||(Math.abs(dx)>28&&velocity>.65);
    if(!qualifies||!allowed){reset();return;}
    locked.current=true;
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce){onMove(dx<0?1:-1);return;}
    if(page.current){page.current.style.transition='transform 130ms ease-out, opacity 130ms';page.current.style.transform='translate3d('+(dx<0?-180:180)+'px,0,0)';page.current.style.opacity='.15';}
    timer.current=setTimeout(()=>{onMove(dx<0?1:-1);},130);
  }
  return <div className="reading-scroll" ref={root} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={reset} aria-label="左右スワイプで前後の教材に移動">
    <div ref={page} className="reading-page" key={identity}>{children}</div>
  </div>;
}
