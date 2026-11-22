import {useCallback,useEffect,useLayoutEffect,useRef} from 'react';
import type {PointerEvent,ReactNode,TransitionEvent} from 'react';

interface Props {
  identity:string;
  canPrev:boolean;
  canNext:boolean;
  prev?:ReactNode;
  next?:ReactNode;
  onMove:(direction:-1|1)=>void;
  children:ReactNode;
}
type Gesture={pointerId:number;startX:number;startY:number;startedAt:number;baseX:number;axis:'unknown'|'horizontal'|'vertical'};

export default function SwipeReader({identity,canPrev,canNext,prev,next,onMove,children}:Props){
  const root=useRef<HTMLDivElement>(null);
  const track=useRef<HTMLDivElement>(null);
  const gesture=useRef<Gesture|null>(null);
  const phase=useRef<'idle'|'drag'|'settling'|'exit'>('idle');
  const exitDirection=useRef<-1|1>(1);
  const frame=useRef<number|null>(null);
  const watchdog=useRef<number|null>(null);
  const latestOffset=useRef(0);
  const directionCallback=useRef(onMove);
  directionCallback.current=onMove;

  const cancelFrame=useCallback(()=>{
    if(frame.current!==null){cancelAnimationFrame(frame.current);frame.current=null;}
    if(watchdog.current!==null){clearTimeout(watchdog.current);watchdog.current=null;}
  },[]);
  const setOffset=useCallback((px:number)=>{
    latestOffset.current=px;
    if(track.current)track.current.style.transform='translate3d('+px+'px,0,0)';
  },[]);
  const snapToCenter=useCallback(()=>{
    cancelFrame();
    gesture.current=null;
    phase.current='idle';
    const el=track.current;
    if(el){el.style.transition='none';el.style.willChange='auto';el.style.transform='translate3d(0,0,0)';}
    latestOffset.current=0;
  },[cancelFrame]);

  // The entering neighbor already fills the screen at transitionend.
  // Replace its preview with the real current page and reset the track in layout,
  // before the browser paints another frame.
  useLayoutEffect(()=>{
    snapToCenter();
    if(root.current)root.current.scrollTop=0;
  },[identity,snapToCenter]);
  useEffect(()=>()=>cancelFrame(),[cancelFrame]);

  const settle=useCallback(()=>{
    cancelFrame();
    const el=track.current;if(!el)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced){snapToCenter();return;}
    phase.current='settling';
    el.style.transition='transform 180ms cubic-bezier(.22,1,.36,1)';
    el.style.transform='translate3d(0,0,0)';
    watchdog.current=window.setTimeout(()=>snapToCenter(),380);
  },[cancelFrame,snapToCenter]);

  const finishExit=useCallback(()=>{
    if(phase.current!=='exit')return;
    cancelFrame();
    phase.current='idle';
    directionCallback.current(exitDirection.current);
    // The identity layout effect resets the finished track before the next paint.
  },[cancelFrame]);

  function onDown(e:PointerEvent<HTMLDivElement>){
    if(!e.isPrimary||e.button!==0||phase.current==='exit')return;
    const target=e.target as HTMLElement;
    if(target.closest('button,a,input,textarea,select,[contenteditable="true"],.diagram-wrap'))return;
    if(e.pointerType==='touch'&&(e.clientX<26||e.clientX>window.innerWidth-26))return;
    if(window.getSelection()?.type==='Range')return;
    if(phase.current==='settling'){
      cancelFrame();
      const matrix=new DOMMatrixReadOnly(getComputedStyle(track.current!).transform);
      const offset=Number.isFinite(matrix.m41)?matrix.m41:0;
      track.current!.style.transition='none';
      setOffset(offset);
    }
    const base=latestOffset.current;
    gesture.current={pointerId:e.pointerId,startX:e.clientX,startY:e.clientY,startedAt:performance.now(),baseX:base,axis:'unknown'};
    phase.current='drag';
    if(track.current){track.current.style.transition='none';track.current.style.willChange='transform';}
  }
  function onDrag(e:PointerEvent<HTMLDivElement>){
    const g=gesture.current;
    if(!g||g.pointerId!==e.pointerId||phase.current!=='drag')return;
    const dx=e.clientX-g.startX,dy=e.clientY-g.startY;
    if(g.axis==='unknown'&&Math.max(Math.abs(dx),Math.abs(dy))>10){
      g.axis=Math.abs(dx)>Math.abs(dy)*1.4?'horizontal':'vertical';
      if(g.axis==='horizontal')try{e.currentTarget.setPointerCapture(e.pointerId);}catch{ /* browser gesture owns pointer */ }
    }
    if(g.axis!=='horizontal')return;
    const allowed=dx>0?canPrev:canNext;
    const distance=allowed?dx:Math.sign(dx)*Math.min(32,Math.sqrt(Math.abs(dx))*2.4);
    const offset=g.baseX+distance;
    latestOffset.current=offset;
    if(frame.current!==null)return;
    frame.current=requestAnimationFrame(()=>{
      frame.current=null;
      if(track.current&&phase.current==='drag')track.current.style.transform='translate3d('+latestOffset.current+'px,0,0)';
    });
  }
  function onRelease(e:PointerEvent<HTMLDivElement>){
    const g=gesture.current;
    if(!g||g.pointerId!==e.pointerId||phase.current!=='drag')return;
    gesture.current=null;
    if(frame.current!==null){cancelAnimationFrame(frame.current);frame.current=null;}
    const dx=e.clientX-g.startX,dy=e.clientY-g.startY;
    const horizontal=g.axis==='horizontal'&&Math.abs(dx)>Math.abs(dy)*1.15;
    if(!horizontal){settle();return;}
    const direction:1|-1=dx<0?1:-1;
    const allowed=direction===1?canNext:canPrev;
    const width=root.current?.clientWidth??360;
    const velocity=Math.abs(dx)/Math.max(20,performance.now()-g.startedAt);
    const qualified=Math.abs(dx)>Math.min(width*.24,110)||(Math.abs(dx)>26&&velocity>.62);
    if(!allowed||!qualified){settle();return;}
    cancelFrame();
    exitDirection.current=direction;
    phase.current='exit';
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced){finishExit();return;}
    const el=track.current;
    if(!el){finishExit();return;}
    el.style.transition='transform 190ms cubic-bezier(.22,1,.36,1)';
    el.style.transform='translate3d('+(direction===1?'-100%':'100%')+',0,0)';
    watchdog.current=window.setTimeout(finishExit,480); // safety fallback when transitionend is suppressed
  }
  function onAbort(){
    if(phase.current==='drag'){gesture.current=null;settle();}
  }
  function onTransitionEnd(e:TransitionEvent<HTMLDivElement>){
    if(e.target!==track.current||e.propertyName!=='transform')return;
    if(phase.current==='exit')finishExit();
    else if(phase.current==='settling')snapToCenter();
  }
  return <div className="reading-scroll" ref={root} data-card-id={identity}
    onPointerDown={onDown} onPointerMove={onDrag} onPointerUp={onRelease} onPointerCancel={onAbort}
    aria-label="左右スワイプで前後の教材に移動">
    <div className="swipe-track" ref={track} onTransitionEnd={onTransitionEnd}>
      {canPrev&&<div className="swipe-neighbor swipe-prev" aria-hidden="true" inert>{prev}</div>}
      <div className="reading-page" key={identity}>{children}</div>
      {canNext&&<div className="swipe-neighbor swipe-next" aria-hidden="true" inert>{next}</div>}
    </div>
  </div>;
}
