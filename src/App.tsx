import {useCallback,useEffect,useMemo,useRef,useState,useDeferredValue} from 'react';
import {ArrowLeft,ArrowRight,BookOpen,Check,ChevronLeft,ChevronRight,Download,Heart,Home,Search,Settings,Volume2,X,RotateCcw,WifiOff,AlertCircle,Layers3,Play,SlidersHorizontal} from 'lucide-react';
import Diagram from './components/Diagram';
import SwipeReader from './components/SwipeReader';
import {loadCatalog,loadMeta,getCard,prefetchCard} from './lib/data';
import {cachedCount,downloadOffline,allContentUrls} from './lib/offline';
import {emptyProgress,startSession,finishSession,searchCards,makeChoices,reviewResult,dueSummaries,localDay} from './lib/learning';
import {readProgress,writeProgress} from './lib/storage';
import type {CardSummary,ContentCard,ContentMeta,Progress,Tab} from './lib/types';

const navTabs: {id:Tab;name:string;Icon:typeof Home}[]=[
  {id:'home',name:'ホーム',Icon:Home},{id:'study',name:'学習',Icon:BookOpen},
  {id:'search',name:'検索',Icon:Search},{id:'review',name:'復習',Icon:RotateCcw}
];
function Spinner(){return <div className="centered-status"><span className="spinner" aria-hidden="true"/>読み込んでいます…</div>;}
function Notice({message,onClose}:{message:string;onClose:()=>void}){return <div className="notice" role="alert"><AlertCircle size={18}/><span>{message}</span><button aria-label="閉じる" onClick={onClose}><X size={18}/></button></div>;}
function Brand(){return <div className="brand"><div className="brand-logo">E<span>.</span></div><span>EasyVoca</span></div>;}
function AppNav({active,onSelect}:{active:Tab;onSelect:(tab:Tab)=>void}){return <nav className="app-nav" aria-label="メインナビゲーション">{navTabs.map(({id,name,Icon})=><button key={id} type="button" className={'nav-link '+(active===id?'is-active':'')} aria-current={active===id?'page':undefined} onClick={()=>onSelect(id)}><Icon size={20} strokeWidth={active===id?2.3:1.8}/><span>{name}</span></button>)}</nav>;}

export default function App(){
  const [progress,setProgress]=useState<Progress|null>(null);
  const progressRef=useRef<Progress>(emptyProgress());
  const writeQueue=useRef<Promise<void>>(Promise.resolve());
  const [saveError,setSaveError]=useState('');
  const [uiError,setUiError]=useState('');
  const [meta,setMeta]=useState<ContentMeta|null>(null);
  const [catalog,setCatalog]=useState<CardSummary[]|null>(null);
  const [tab,setTab]=useState<Tab>('home');
  const [settingsOpen,setSettingsOpen]=useState(false);
  const [browseIds,setBrowseIds]=useState<string[]|null>(null);
  const [browseCursor,setBrowseCursor]=useState(0);
  const [browseOrigin,setBrowseOrigin]=useState<Tab>('search');
  useEffect(()=>{
    let mounted=true;
    void readProgress().then(p=>{if(mounted){progressRef.current=p;setProgress(p);}}).catch(()=>{if(mounted){const p=emptyProgress();progressRef.current=p;setProgress(p);setSaveError('学習記録を読み込めませんでした。保存の状態を確認してください。');}});
    void loadMeta().then(m=>{if(mounted)setMeta(m);}).catch(e=>{if(mounted)setUiError(String(e));});
    const onPop=()=>{const name=location.hash.replace('#','');setTab((['home','study','search','review'] as string[]).includes(name)?name as Tab:'home');};
    window.addEventListener('popstate',onPop);
    return ()=>{mounted=false;window.removeEventListener('popstate',onPop);};
  },[]);
  const commit=useCallback((update:(p:Progress)=>Progress)=>{
    const p=progressRef.current;
    const n=update(p);
    if(n===p)return;
    const next={...n,revision:p.revision+1};
    progressRef.current=next;
    setProgress(next);
    writeQueue.current=writeQueue.current.catch(()=>undefined).then(()=>writeProgress(next)).then(()=>setSaveError(''),e=>setSaveError('学習記録の保存に失敗しました: '+String(e)));
  },[]);
  const route=useCallback((next:Tab)=>{
    if(next!==tab)history.pushState({},'',next==='home'?'#home':'#'+next);
    setTab(next);
  },[tab]);
  const ensureCatalog=useCallback(async()=>{
    if(catalog)return catalog;
    const data=await loadCatalog();
    setCatalog(data);
    return data;
  },[catalog]);
  const startLearning=useCallback(async()=>{
    try{
      const list=await ensureCatalog();
      setBrowseIds(null);
      const p=progressRef.current;
      if(!p.activeSession||p.activeSession.finished){
        commit(prev=>({...prev,activeSession:startSession(list,prev.nextOffset)}));
      }
      route('study');
    }catch(e){setUiError('学習を開始できません: '+String(e));}
  },[ensureCatalog,route,commit]);
  const selectTab=useCallback((next:Tab)=>{
    if(next==='study'){void startLearning();return;}
    setBrowseIds(null);route(next);
    if((next==='search'||next==='review')&&!catalog)void ensureCatalog().catch(e=>setUiError(String(e)));
  },[startLearning,route,catalog,ensureCatalog]);
  const openDetail=useCallback((ids:string[],position:number,origin:Tab)=>{
    setBrowseIds(ids);setBrowseCursor(position);setBrowseOrigin(origin);route('study');
  },[route]);
  const markViewed=useCallback((id:string)=>{
    commit(p=>p.viewed[id]?p:({...p,viewed:{...p.viewed,[id]:new Date().toISOString()}}));
  },[commit]);
  const toggleFavorite=useCallback((id:string)=>{
    commit(p=>({...p,favorites:p.favorites.includes(id)?p.favorites.filter(x=>x!==id):[...p.favorites,id]}));
  },[commit]);
  const navigateStudy=useCallback((direction:-1|1)=>{
    if(browseIds){setBrowseCursor(i=>Math.max(0,Math.min(browseIds.length-1,i+direction)));return;}
    commit(p=>{
      if(!p.activeSession||p.activeSession.finished)return p;
      const s=p.activeSession;
      const newCursor=Math.max(0,Math.min(s.ids.length,s.cursor+direction));
      if(newCursor===s.cursor)return p;
      const n={...p,activeSession:{...s,cursor:newCursor}};
      return newCursor===s.ids.length?finishSession(n,meta?.count??5111):n;
    });
  },[browseIds,commit,meta]);
  const finishAndContinue=useCallback(async()=>{
    try{const list=await ensureCatalog();commit(p=>({...p,activeSession:startSession(list,p.nextOffset)}));setBrowseIds(null);route('study');}
    catch(e){setUiError(String(e));}
  },[ensureCatalog,commit,route]);
  const studyExit=()=>{route(browseIds?browseOrigin:'home');setBrowseIds(null);};
  const reviewed=useCallback((id:string,correct:boolean)=>{
    commit(p=>({...p,reviews:{...p.reviews,[id]:reviewResult(p.reviews[id],correct)}}));
  },[commit]);

  if(!progress)return <div className="loading-page"><Brand/><Spinner/></div>;
  return <div className="app-shell">
    <aside className="desktop-rail"><Brand/><AppNav active={tab} onSelect={selectTab}/><div className="rail-foot">学びの、その先へ。</div></aside>
    <div className="app-content">
      <header className="global-header"><Brand/><div className="header-actions"><button className="icon-button" aria-label="設定" title="設定" onClick={()=>setSettingsOpen(true)}><Settings size={21}/></button></div></header>
      <main className={'main-view view-'+tab}>
        {tab==='home'?<HomeView p={progress} meta={meta} onStudy={()=>void startLearning()} onReview={()=>selectTab('review')} onOpen={(id)=>{void ensureCatalog().then(list=>{const idx=list.findIndex(s=>s.candidate_id===id);if(idx>=0)openDetail([id],0,'home');}).catch(e=>setUiError(String(e)));}}/>:null}
        {tab==='study'?(catalog?<StudyView p={progress} catalog={catalog} browseIds={browseIds} browseCursor={browseCursor} onExit={studyExit} onMove={navigateStudy} onFavorite={toggleFavorite} onViewed={markViewed} onContinue={()=>void finishAndContinue()}/>:<Spinner/>):null}
        {tab==='search'?(catalog?<SearchView catalog={catalog} p={progress} onOpen={(ids,pos)=>openDetail(ids,pos,'search')}/>:<Spinner/>):null}
        {tab==='review'?(catalog?<ReviewView catalog={catalog} p={progress} onAnswer={reviewed} onStart={()=>void startLearning()} onOpen={(ids,pos)=>openDetail(ids,pos,'review')}/>:<Spinner/>):null}
      </main>
      <div className="mobile-nav"><AppNav active={tab} onSelect={selectTab}/></div>
    </div>
    {settingsOpen&&meta?<SettingsSheet meta={meta} p={progress} onClose={()=>setSettingsOpen(false)}/>:settingsOpen?<div role="dialog" aria-modal="true"><button onClick={()=>setSettingsOpen(false)}>閉じる</button><Spinner/></div>:null}
    {saveError&&<Notice message={saveError} onClose={()=>setSaveError('')}/>}
    {uiError&&<Notice message={uiError} onClose={()=>setUiError('')}/>}
  </div>;
}

function HomeView({p,meta,onStudy,onReview,onOpen}:{p:Progress;meta:ContentMeta|null;onStudy:()=>void;onReview:()=>void;onOpen:(id:string)=>void}){
  const viewed=Object.keys(p.viewed);
  const today=viewed.filter(id=>localDay(p.viewed[id])===localDay(new Date())).length;
  const s=p.activeSession;
  const ongoing=Boolean(s&&!s.finished);
  const completed=s?.finished;
  const due=Object.keys(p.reviews).filter(id=>new Date(p.reviews[id].dueAt).getTime()<=Date.now()).length;
  return <div className="home-layout">
    <section className="hero">
      <p className="tiny-label">VOCABULARY, REIMAGINED.</p>
      <h1>英単語の、<br/><span>その先へ。</span></h1>
      <p className="hero-sub">知っているはずの単語に、まだ知らない意味がある。<br className="desktop-break"/>一つずつ、理解を深めよう。</p>
      <div className="hero-actions"><button className="primary-button" onClick={onStudy}>{ongoing?'続きから学習':'学習を始める'}<ArrowRight size={19}/></button><button className="secondary-button" onClick={onReview}>復習する<RotateCcw size={18}/></button></div>
      {ongoing&&s?<div className="session-progress"><div className="session-progress-top"><span>進行中のセッション</span><strong>{Math.min(s.cursor+1,s.ids.length)} / {s.ids.length}</strong></div><div className="progress-track"><div style={{width:Math.min(100,(s.cursor+1)/s.ids.length*100)+'%'}}/></div></div>:completed?<p className="completion-hint"><Check size={16}/>前のセッションが完了しました。次の20件へ進めます。</p>:null}
    </section>
    <section className="stats-section" aria-label="学習状況"><div className="section-heading"><h2>学習の記録</h2><span>少しずつ、確実に。</span></div><div className="stats-row"><div><strong>{today.toLocaleString('ja-JP')}</strong><span>今日の閲覧</span></div><div><strong>{viewed.length.toLocaleString('ja-JP')}</strong><span>累計閲覧</span></div><div><strong>{Object.keys(p.reviews).length.toLocaleString('ja-JP')}</strong><span>復習した語義</span></div></div><p className="subtle-note">※ 閲覧数は暗記できた単語数ではありません。{due>0?' 復習予定 '+due+' 件。':''}</p></section>
    <section className="picks-section"><div className="section-heading"><h2>単語を見つける</h2><span>{meta?meta.count.toLocaleString('ja-JP')+'の語義から':'教材を読み込み中'}</span></div><div className="pick-list">{meta?.featured.map(item=><button className="pick-item" onClick={()=>onOpen(item.candidate_id)} key={item.candidate_id}><div><strong>{item.word}</strong><p>{item.hidden_meaning_ja}</p></div><ChevronRight size={19}/></button>)}</div></section>
  </div>;
}

function StudyView({p,catalog,browseIds,browseCursor,onExit,onMove,onFavorite,onViewed,onContinue}:{p:Progress;catalog:CardSummary[];browseIds:string[]|null;browseCursor:number;onExit:()=>void;onMove:(d:-1|1)=>void;onFavorite:(id:string)=>void;onViewed:(id:string)=>void;onContinue:()=>void}){
  const ids=browseIds??p.activeSession?.ids??[];
  const cursor=browseIds?browseCursor:p.activeSession?.cursor??0;
  const finished=!browseIds&&p.activeSession?.finished;
  const byId=useMemo(()=>new Map(catalog.map(s=>[s.candidate_id,s])),[catalog]);
  const summary=byId.get(ids[cursor]);
  const [card,setCard]=useState<ContentCard|null>(null);
  const [error,setError]=useState('');
  useEffect(()=>{
    let live=true;
    setCard(null);setError('');
    if(summary){
      void getCard(summary).then(c=>{if(!live)return;setCard(c);onViewed(c.candidate_id);}).catch(e=>{if(live)setError(String(e));});
      prefetchCard(byId.get(ids[cursor+1]));
    }
    return ()=>{live=false;};
  },[summary,byId,ids,cursor,onViewed]);
  useEffect(()=>{
    const handle=(e:KeyboardEvent)=>{
      const target=e.target as HTMLElement;
      if(target?.closest('input,textarea,select,[contenteditable="true"]'))return;
      if(e.key==='ArrowLeft'&&cursor>0){e.preventDefault();onMove(-1);}
      if(e.key==='ArrowRight'&&cursor<ids.length){e.preventDefault();onMove(1);}
    };
    window.addEventListener('keydown',handle);return ()=>window.removeEventListener('keydown',handle);
  },[cursor,ids.length,onMove]);
  const speak=()=>{
    if(!card)return;
    if(!('speechSynthesis'in window)) {setError('この環境では音声読み上げを利用できません。');return;}
    try{window.speechSynthesis.cancel();const utter=new SpeechSynthesisUtterance(card.word);utter.lang='en-US';utter.rate=.88;window.speechSynthesis.speak(utter);}catch{setError('音声読み上げを開始できませんでした。');}
  };
  if(finished)return <div className="finish-screen"><div className="finish-icon"><Check size={32}/></div><p className="tiny-label">SESSION COMPLETE</p><h1>20件、おつかれさまでした。</h1><p>閲覧した教材は記録されました。<br/>「覚えた」とは判定せず、復習で理解を確かめられます。</p><button className="primary-button" onClick={onContinue}>次の20件へ<ArrowRight size={19}/></button><button className="text-button" onClick={onExit}>ホームに戻る</button></div>;
  if(!summary)return <div className="finish-screen"><h2>学習する教材がありません</h2><button className="secondary-button" onClick={onExit}>戻る</button></div>;
  const isFav=p.favorites.includes(summary.candidate_id);
  return <div className="study-view">
    <div className="study-toolbar"><button className="icon-button" aria-label="戻る" onClick={onExit}><ArrowLeft size={21}/></button><div className="study-position"><span>{browseIds?'単語詳細':'学習セッション'}</span><strong>{cursor+1} <span>/</span> {ids.length}</strong></div><div className="study-tools"><button className={'icon-button '+(isFav?'fav-active':'')} aria-label={isFav?'お気に入りを解除':'お気に入りに追加'} aria-pressed={isFav} onClick={()=>onFavorite(summary.candidate_id)}><Heart size={21} fill={isFav?'currentColor':'none'}/></button><button className="icon-button" aria-label="発音を聞く" onClick={speak}><Volume2 size={21}/></button><button className="icon-button desktop-arrow" aria-label="前の語義" onClick={()=>onMove(-1)} disabled={cursor===0}><ChevronLeft size={22}/></button><button className="icon-button desktop-arrow" aria-label="次の語義" onClick={()=>onMove(1)} disabled={cursor>=ids.length-1&&Boolean(browseIds)}><ChevronRight size={22}/></button></div></div>
    <div className="study-progress-track"><div style={{width:((cursor+1)/ids.length*100)+'%'}}/></div>
    {error?<div className="inline-error" role="alert">{error}<button onClick={()=>setError('')}>閉じる</button></div>:null}
    {!card?<Spinner/>:<SwipeReader identity={summary.candidate_id} canPrev={cursor>0} canNext={Boolean(browseIds?cursor<ids.length-1:cursor<ids.length)} onMove={onMove}><article className="vocab-content">
      <div className="vocab-head"><h1>{card.word}</h1><div className="pronunciation"><span>{card.pos}</span>{(card.pronunciation_ipa||card.pronunciation)&&<span>{card.pronunciation_ipa||card.pronunciation}</span>}</div></div>
      {card.status==='hold'&&<p className="inline-error">この教材は元データで「要確認」とされています。語義・例文は未確定です。</p>}
      <div className="meaning-block"><p className="known-meaning"><span>よく知られている意味</span>{card.known_meaning_ja}</p><div className="hidden-meaning"><span>見落としやすい意味</span><h2>{card.hidden_meaning_ja}</h2></div></div>
      <section className="content-section"><h3>例文</h3>{card.example_en?<p className="english-example">{card.example_en}</p>:<p className="subtle-note">英語例文は原データに収録されていません。</p>}{card.example_ja&&<p className="japanese-example">{card.example_ja}</p>}</section>
      <section className="content-section"><h3>コアイメージ</h3><p className="explanation">{card.core_image_explanation_ja}</p><Diagram source={card.diagram_mermaid} cardId={card.candidate_id}/></section>
      {card.usage_notes&&(Array.isArray(card.usage_notes)?card.usage_notes.length:Boolean(card.usage_notes))?<section className="content-section usage-section"><h3>重要語法</h3>{(Array.isArray(card.usage_notes)?card.usage_notes:[card.usage_notes]).map((note,i)=><p key={i}>{note}</p>)}</section>:null}
      <p className="swipe-tip"><span>← 左スワイプで次へ</span><span>右スワイプで前へ →</span></p>
    </article></SwipeReader>}
  </div>;
}

function SearchView({catalog,p,onOpen}:{catalog:CardSummary[];p:Progress;onOpen:(ids:string[],index:number)=>void}){
  const [query,setQuery]=useState('');
  const [pos,setPos]=useState('');
  const [favorite,setFavorite]=useState(false);
  const [unread,setUnread]=useState(false);
  const [visible,setVisible]=useState(60);
  const deferred=useDeferredValue(query);
  const parts=useMemo(()=>Array.from(new Set(catalog.map(s=>s.pos))).sort(),[catalog]);
  const results=useMemo(()=>searchCards(catalog,deferred,pos,favorite,unread,p),[catalog,deferred,pos,favorite,unread,p]);
  useEffect(()=>{setVisible(60);},[deferred,pos,favorite,unread]);
  const ids=useMemo(()=>results.map(s=>s.candidate_id),[results]);
  const viewed=new Set(Object.keys(p.viewed));
  const favs=new Set(p.favorites);
  return <div className="standard-view search-view"><div className="page-intro"><p className="tiny-label">EXPLORE</p><h1>単語を探す</h1><p>見落としがちな意味を、まとめて検索。</p></div>
    <label className="search-box"><Search size={21}/><input type="search" placeholder="英単語・日本語の意味で検索" value={query} onChange={e=>setQuery(e.target.value)} aria-label="単語や日本語の意味で検索"/>{query&&<button aria-label="検索を消去" onClick={()=>setQuery('')}><X size={17}/></button>}</label>
    <div className="filter-strip"><label className="part-select"><SlidersHorizontal size={16}/><select aria-label="品詞で絞り込み" value={pos} onChange={e=>setPos(e.target.value)}><option value="">すべての品詞</option>{parts.map(x=><option key={x} value={x}>{x}</option>)}</select></label><label className="check-filter"><input type="checkbox" checked={favorite} onChange={e=>setFavorite(e.target.checked)}/>お気に入り</label><label className="check-filter"><input type="checkbox" checked={unread} onChange={e=>setUnread(e.target.checked)}/>未閲覧</label></div>
    <div className="list-heading"><span>{results.length.toLocaleString('ja-JP')} 件の語義</span><span>タップして詳しく見る</span></div>
    <div className="search-results">{results.slice(0,visible).map((item,i)=><button className="result-item" key={item.candidate_id} onClick={()=>onOpen(ids,i)}><div className="result-top"><strong>{item.word}</strong><span>{item.pos}</span>{item.status==='hold'&&<span className="status-hold">要確認</span>}{favs.has(item.candidate_id)&&<Heart size={14} fill="currentColor" className="result-heart"/>}{viewed.has(item.candidate_id)&&<Check size={14} className="seen-icon"/>}</div><p>{item.hidden_meaning_ja}</p><ChevronRight size={18} className="result-chevron"/></button>)}</div>
    {!results.length&&<div className="empty-state"><Search size={32}/><h2>一致する語義がありません</h2><p>キーワードや絞り込みを変更してください。</p></div>}
    {results.length>visible&&<button className="load-more" onClick={()=>setVisible(n=>n+60)}>さらに表示 ({(results.length-visible).toLocaleString('ja-JP')} 件)</button>}
  </div>;
}

function ReviewView({catalog,p,onAnswer,onStart,onOpen}:{catalog:CardSummary[];p:Progress;onAnswer:(id:string,correct:boolean)=>void;onStart:()=>void;onOpen:(ids:string[],i:number)=>void}){
  const [queue,setQueue]=useState<string[]|null>(null);
  const [answer,setAnswer]=useState<string|null>(null);
  const due=useMemo(()=>dueSummaries(catalog,p),[catalog,p]);
  useEffect(()=>{setQueue(q=>q===null?due.map(s=>s.candidate_id):q);},[due]);
  const lookup=useMemo(()=>new Map(catalog.map(s=>[s.candidate_id,s])),[catalog]);
  const target=lookup.get(queue?.[0]??'');
  const [questionExample,setQuestionExample]=useState<string|null>(null);
  useEffect(()=>{let live=true;setQuestionExample(null);if(target)void getCard(target).then(c=>{if(live)setQuestionExample(c.example_en||null);}).catch(()=>undefined);return()=>{live=false;};},[target]);
  const options=useMemo(()=>target?makeChoices(target,catalog):[],[target,catalog]);
  const resolved=options.find(o=>o.id===answer);
  const next=()=>{setQueue(q=>q?.slice(1)??[]);setAnswer(null);};
  const choose=(id:string)=>{if(answer||!target)return;setAnswer(id);onAnswer(target.candidate_id,id===target.candidate_id);};
  const hadViewed=Object.keys(p.viewed).length>0;
  return <div className="standard-view review-view"><div className="page-intro"><p className="tiny-label">RECALL & RETAIN</p><h1>意味を確かめる</h1><p>4択で記憶を確認し、結果に応じて次の復習を決めます。</p></div>
    {queue===null?<Spinner/>:!target?<div className="review-empty"><div className="complete-circle"><Check size={29}/></div><h2>{hadViewed?'いま復習する問題はありません':'まずは単語を読んでみましょう'}</h2><p>{hadViewed?'次の復習予定が来ると、ここに問題が表示されます。':'学習した語義が、4択の復習問題になります。'}</p><button className="primary-button" onClick={onStart}>学習する<ArrowRight size={18}/></button></div>:
    <div className="quiz"><div className="quiz-top"><span>復習問題</span><strong>残り {queue.length} 件</strong></div><div className="quiz-word"><h2>{target.word}</h2><span>{target.pos}</span></div><p className="quiz-instruction">この語義の「見落としやすい意味」は？</p>{questionExample&&<p className="quiz-context">{questionExample}</p>}<div className="quiz-options">{options.map((o,i)=>{const state=answer?(o.correct?'correct':o.id===answer?'wrong':'muted'):'';return <button key={o.id} disabled={Boolean(answer)} className={'quiz-option '+state} onClick={()=>choose(o.id)}><span className="option-letter">{String.fromCharCode(65+i)}</span><span>{o.label}</span>{answer&&o.correct&&<Check size={20}/>}</button>;})}</div>
    {answer&&<div className={'quiz-feedback '+(resolved?.correct?'ok':'ng')} role="status"><strong>{resolved?.correct?'正解です。':'もう一度確認しましょう。'}</strong><p>正解：{target.hidden_meaning_ja}</p><div className="quiz-feedback-actions"><button className="text-button" onClick={()=>onOpen([target.candidate_id],0)}>教材を読む</button><button className="primary-button" onClick={next}>次の問題へ<ArrowRight size={18}/></button></div></div>}</div>}
    <p className="subtle-note review-note">正解：1日→3日→7日→14日→30日→60日後。不正解：10分後に再出題。閲覧数とは別に記録します。</p>
  </div>;
}

function SettingsSheet({meta,p,onClose}:{meta:ContentMeta;p:Progress;onClose:()=>void}){
  const [offline,setOffline]=useState<{done:number;total:number}>({done:0,total:allContentUrls(meta).length});
  const [working,setWorking]=useState(false);
  const [error,setError]=useState('');
  useEffect(()=>{let live=true;void cachedCount(meta).then(n=>{if(live)setOffline({done:n,total:allContentUrls(meta).length});}).catch(e=>{if(live)setError(String(e));});return ()=>{live=false;};},[meta]);
  const download=async()=>{
    setWorking(true);setError('');
    try{await downloadOffline(meta,(done,total)=>setOffline({done,total}));}
    catch(e){setError(String(e));try{const n=await cachedCount(meta);setOffline({done:n,total:allContentUrls(meta).length});}catch{ /* unavailable */ }}
    finally{setWorking(false);}
  };
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><div role="dialog" aria-modal="true" aria-labelledby="settings-title" className="settings-sheet"><div className="sheet-title"><h2 id="settings-title">設定</h2><button className="icon-button" onClick={onClose} aria-label="閉じる"><X size={22}/></button></div><div className="settings-group"><div className="setting-row"><div><strong>オフライン教材</strong><p>{offline.done} / {offline.total} ファイルを保存済み</p></div><Download size={22}/></div><div className="progress-track"><div style={{width:100*offline.done/offline.total+'%'}}/></div><p className="subtle-note">アプリ本体はPWAとして保存可能です。すべての教材を読むには、通信できるときにまとめて保存してください。</p><button className="secondary-button settings-download" onClick={()=>void download()} disabled={working||offline.done===offline.total}>{working?'保存中…':offline.done===offline.total?'全教材を保存済み':'すべての教材を端末に保存'}<Download size={18}/></button></div>
    <div className="settings-group"><div className="setting-row"><div><strong>学習データ</strong><p>閲覧 {Object.keys(p.viewed).length} 件 · お気に入り {p.favorites.length} 件 · 復習 {Object.keys(p.reviews).length} 件</p></div><Layers3 size={21}/></div><p className="subtle-note">学習記録はこの端末のブラウザ内に保存されます。端末間で自動同期はされません。</p></div>
    {error&&<p className="inline-error" role="alert"><WifiOff size={16}/>{error}</p>}
    </div></div>;
}
