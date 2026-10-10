import {openDB} from 'idb';
import type {Equipment,Location} from '../data/exercises';
import type {MuscleId} from '../data/muscles';
import {localDay,weekDays} from './dates';
export type ActivityType='Gym / Strength'|'Home Workout'|'Calisthenics'|'Walking'|'Cardio'|'Rest / Recovery';
export const ACTIVITY_TYPES:ActivityType[]=['Gym / Strength','Home Workout','Calisthenics','Walking','Cardio','Rest / Recovery'];
export type Profile={nickname:string;photo:string|null;model:'male'|'female';mode:Location;equipment:Equipment[];theme:'system'|'light'|'dark'};
export type Activity={id:string;date:string;type:ActivityType;minutes:number;distanceKm:number|null;note:string;sessionId?:string};
export type RoutineExercise={exerciseId:string;sets:number;reps:number};
export type Routine={id:string;name:string;category:'Upper body'|'Lower body'|'Full body'|'Custom';dayOfWeek?:number|null;items:RoutineExercise[];createdAt:number};
export type ExerciseSet={reps:number;weight:number|null;done:boolean};
export type SessionExercise={exerciseId:string;sets:ExerciseSet[]};
export type Session={id:string;routineId:string|null;routineName:string;date:string;completedAt:number;duration:number;items:SessionExercise[]};
export type AppData={version:1;profile:Profile;activities:Activity[];routines:Routine[];sessions:Session[];favorites:string[]};
export const defaultData=():AppData=>({version:1,profile:{nickname:'',photo:null,model:'male',mode:'gym',equipment:['Bodyweight','Barbell','Dumbbells','Cable','Machine','Resistance band','Pull-up bar','Bench','Mat','Towel','Chair','Backpack','Household item'],theme:'system'},activities:[],routines:[],sessions:[],favorites:[]});
const DB_NAME='stride-fitness-v1';
export const createId=()=>globalThis.crypto?.randomUUID?.()??`${Date.now()}-${Math.random().toString(36).slice(2)}`;
async function db(){return openDB(DB_NAME,1,{upgrade(db){if(!db.objectStoreNames.contains('state'))db.createObjectStore('state');}});}
export async function loadData():Promise<AppData>{const d=await db();const state=await d.get('state','main');return state?validateData(state):defaultData();}
export async function saveData(data:AppData){const d=await db();await d.put('state',data,'main');}
export function validateData(value:unknown):AppData{
 if(!value||typeof value!=='object')throw new Error('Invalid backup: expected an object.');
 const v=value as Partial<AppData>;
 if(v.version!==1||!v.profile||!Array.isArray(v.activities)||!Array.isArray(v.routines)||!Array.isArray(v.sessions)||!Array.isArray(v.favorites))throw new Error('Unsupported or incomplete backup format.');
 if(typeof v.profile.nickname!=='string'||!['male','female'].includes(v.profile.model)||!['home','gym'].includes(v.profile.mode)||!Array.isArray(v.profile.equipment)||!['light','dark','system'].includes(v.profile.theme))throw new Error('Invalid profile in backup.');
 if(v.activities.some(a=>typeof a.id!=='string'||!/^\d{4}-\d\d-\d\d$/.test(a.date)||!ACTIVITY_TYPES.includes(a.type)||!Number.isFinite(a.minutes)||a.minutes<0||!(a.distanceKm==null||(Number.isFinite(a.distanceKm)&&a.distanceKm>=0))))throw new Error('Invalid activity in backup.');
 if(v.routines.some(r=>typeof r.id!=='string'||typeof r.name!=='string'||!Array.isArray(r.items)||r.items.some(i=>typeof i.exerciseId!=='string'||!Number.isInteger(i.sets)||i.sets<1||!Number.isInteger(i.reps)||i.reps<1)))throw new Error('Invalid routine in backup.');
 if(v.sessions.some(s=>typeof s.id!=='string'||!Array.isArray(s.items)||typeof s.date!=='string'||s.items.some(i=>typeof i.exerciseId!=='string'||!Array.isArray(i.sets)||i.sets.some(x=>!Number.isFinite(x.reps)||x.reps<0||!(x.weight==null||(Number.isFinite(x.weight)&&x.weight>=0))||typeof x.done!=='boolean'))))throw new Error('Invalid training log in backup.');
 if(v.favorites.some(x=>typeof x!=='string'))throw new Error('Invalid favorites in backup.');
 return v as AppData;
}
export function activityStats(data:AppData,start:string){const days=weekDays(start);const acts=data.activities.filter(x=>days.includes(x.date));const active=acts.filter(x=>x.type!=='Rest / Recovery');return{activeDays:new Set(active.map(x=>x.date)).size,sessions:active.filter(x=>['Gym / Strength','Home Workout','Calisthenics'].includes(x.type)).length,minutes:active.reduce((a,x)=>a+x.minutes,0),distance:active.reduce((a,x)=>a+(x.distanceKm??0),0),activities:acts};}
export function makeActivity(a:Omit<Activity,'id'>):Activity{return {...a,id:createId()};}
export function getToday(){return localDay(new Date());}
export function removeWeekActivities(data:AppData,start:string):AppData{const days=weekDays(start);return {...data,activities:data.activities.filter(a=>!days.includes(a.date))};}
export function downloadBackup(data:AppData){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`stride-backup-${getToday()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);}
export async function readBackup(file:File):Promise<AppData>{if(file.size>12*1024*1024)throw new Error('Backup is too large (maximum 12 MB).');return validateData(JSON.parse(await file.text()));}
export async function imageToDataUrl(file:File){if(!file.type.startsWith('image/'))throw new Error('Please choose an image.');if(file.size>8*1024*1024)throw new Error('Photo must be smaller than 8 MB.');const img=new Image();const url=URL.createObjectURL(file);try{await new Promise<void>((resolve,reject)=>{img.onload=()=>resolve();img.onerror=()=>reject(new Error('Could not load image.'));img.src=url;});const max=400;const scale=Math.min(1,max/Math.max(img.width,img.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.width*scale));canvas.height=Math.max(1,Math.round(img.height*scale));const context=canvas.getContext('2d');if(!context)throw new Error('Image processing unavailable.');context.drawImage(img,0,0,canvas.width,canvas.height);return canvas.toDataURL('image/jpeg',0.78);}finally{URL.revokeObjectURL(url);}}
