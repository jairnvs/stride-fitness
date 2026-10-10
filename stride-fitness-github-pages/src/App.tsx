import {useCallback,useEffect,useRef,useState} from 'react';
import {Activity,BookOpen,Dumbbell,Heart,House,Menu,UserRound} from 'lucide-react';
import Today from './views/Today';
import Anatomy from './views/Anatomy';
import Exercises from './views/Exercises';
import Profile from './views/Profile';
import {type AppData,loadData,saveData} from './lib/store';
type Page='today'|'anatomy'|'exercises'|'profile';
const nav:[Page,string,typeof House][]= [['today','Today',House],['anatomy','Anatomy',Activity],['exercises','Exercises',Dumbbell],['profile','Profile',UserRound]];
export default function App(){
 const [data,setData]=useState<AppData|null>(null);const [page,setPage]=useState<Page>('today');const [now,setNow]=useState(new Date());const [error,setError]=useState('');const [exerciseId,setExerciseId]=useState<string|null>(null);const [routineId,setRoutineId]=useState<string|null>(null);const queue=useRef<Promise<unknown>>(Promise.resolve());
 useEffect(()=>{let active=true;loadData().then(d=>{if(active)setData(d);}).catch(e=>{setError(`Could not access local IndexedDB storage: ${String(e)}`);});return()=>{active=false;};},[]);
 useEffect(()=>{if(!data)return;queue.current=queue.current.catch(()=>undefined).then(()=>saveData(data)).catch(e=>setError(`Could not save data locally: ${String(e)}`));},[data]);
 useEffect(()=>{const refresh=()=>setNow(new Date());const timer=window.setInterval(refresh,60*1000);window.addEventListener('focus',refresh);document.addEventListener('visibilitychange',refresh);return()=>{clearInterval(timer);window.removeEventListener('focus',refresh);document.removeEventListener('visibilitychange',refresh);};},[]);
 useEffect(()=>{if(!data)return;const media=window.matchMedia('(prefers-color-scheme: dark)');const apply=()=>{const dark=data.profile.theme==='dark'||(data.profile.theme==='system'&&media.matches);document.documentElement.dataset.theme=dark?'dark':'light';};apply();media.addEventListener('change',apply);return()=>media.removeEventListener('change',apply);},[data?.profile.theme]);
 const update=useCallback((fn:(d:AppData)=>AppData)=>{setData(prev=>prev?fn(prev):prev);},[]);
 const goExercise=(id:string)=>{setExerciseId(id);setPage('exercises');window.scrollTo({top:0,behavior:'auto'});};
 const goRoutine=(id:string)=>{setRoutineId(id);setPage('exercises');window.scrollTo({top:0,behavior:'auto'});};
 function navigate(p:Page){setPage(p);window.scrollTo({top:0,behavior:'auto'});}
 if(error&&!data)return <div className="startup-error"><h1>Storage needs attention</h1><p>{error}</p><p>Please open the app in a normal browser tab and make sure browser storage is allowed.</p></div>;
 if(!data)return <div className="loading-screen"><div className="brand-symbol"><Activity size={29}/></div><h1>Stride</h1><p>Finding your rhythm…</p></div>;
 return <div className="app-shell"><aside className="desktop-rail"><button className="brand" onClick={()=>navigate('today')}><span className="brand-symbol"><Activity size={25} strokeWidth={2.3}/></span><span>stride<span className="brand-period">.</span></span></button><div className="rail-caption">YOUR FITNESS SPACE</div><nav aria-label="Main navigation">{nav.map(([key,label,Icon])=><button key={key} className={`rail-link ${page===key?'current':''}`} onClick={()=>navigate(key)}><Icon size={20}/><span>{label}</span>{page===key&&<span className="current-marker"/>}</button>)}</nav><div className="rail-bottom"><div className="quote-mark">“</div><p>Learn your body.<br/>Train with intention.<br/>Stay consistent.</p><span>ONE WEEK AT A TIME</span></div></aside>
 <div className="app-content"><header className="topbar"><button className="mobile-brand" onClick={()=>navigate('today')}><span className="brand-symbol"><Activity size={21}/></span><span>stride<span className="brand-period">.</span></span></button><div className="topbar-right"><div className="offline-pill"><span/> LOCAL FIRST</div><button className="top-avatar" onClick={()=>navigate('profile')} aria-label="Open profile">{data.profile.photo?<img src={data.profile.photo} alt=""/>:data.profile.nickname?data.profile.nickname[0].toUpperCase():<UserRound size={19}/>}</button></div></header>
 {page==='today'&&<Today data={data} onUpdate={update} now={now} onStartRoutine={goRoutine}/>}
 {page==='anatomy'&&<Anatomy data={data} onUpdate={update} onExercise={goExercise}/>}
 {page==='exercises'&&<Exercises data={data} onUpdate={update} openExerciseId={exerciseId} onConsumeExercise={()=>setExerciseId(null)} startRoutineId={routineId} onConsumeRoutine={()=>setRoutineId(null)}/>}
 {page==='profile'&&<Profile data={data} onUpdate={update} onRestore={d=>setData(d)} now={now}/>}
 </div><nav className="mobile-nav" aria-label="Main navigation">{nav.map(([key,label,Icon])=><button key={key} onClick={()=>navigate(key)} className={page===key?'current':''}><Icon size={23} strokeWidth={page===key?2.4:1.85}/><span>{label}</span></button>)}</nav>
 {error&&<div className="toast error" role="alert">{error}<button onClick={()=>setError('')}>×</button></div>}
 </div>;
}
