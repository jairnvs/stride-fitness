/** Local calendar dates, not UTC; midnight boundaries respect the device timezone and DST. */
export function localDay(date:Date){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function parseDay(key:string){const [y,m,d]=key.split('-').map(Number);return new Date(y,m-1,d,12,0,0,0);}
export function weekStart(date:Date){const d=new Date(date.getFullYear(),date.getMonth(),date.getDate(),12);d.setDate(d.getDate()-((d.getDay()+6)%7));return localDay(d);}
export function moveWeek(start:string,delta:number){const date=parseDay(start);date.setDate(date.getDate()+delta*7);return localDay(date);}
export function weekDays(start:string){const d=parseDay(start);return Array.from({length:7},(_,i)=>{const n=new Date(d);n.setDate(n.getDate()+i);return localDay(n);});}
export function rangeLabel(start:string){const days=weekDays(start);const a=parseDay(days[0]);const z=parseDay(days[6]);return `${a.toLocaleDateString('en-US',{month:'short',day:'numeric'})} – ${z.toLocaleDateString('en-US',{month:'short',day:'numeric'})}`;}
export function todayLabel(date:Date){return date.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});}
