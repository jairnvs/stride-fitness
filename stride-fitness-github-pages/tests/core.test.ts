import {describe,it,expect} from 'vitest';
import {weekStart,weekDays,moveWeek} from '../src/lib/dates';
import {activityStats,defaultData,validateData,removeWeekActivities} from '../src/lib/store';
import {exercises,exercisesForMuscle,filterExercises} from '../src/data/exercises';
import {muscles} from '../src/data/muscles';
describe('local week rollover',()=>{
 it('starts Monday and changes at the next Monday',()=>{expect(weekStart(new Date(2026,9,11,23,59))).toBe('2026-10-05');expect(weekStart(new Date(2026,9,12,0,0))).toBe('2026-10-12');});
 it('preserves previous week, even after days closed',()=>{const d=defaultData();d.activities.push({id:'1',date:'2026-10-11',type:'Walking',minutes:30,distanceKm:2.8,note:''});expect(activityStats(d,'2026-10-12').minutes).toBe(0);expect(activityStats(d,'2026-10-05').minutes).toBe(30);expect(weekDays(moveWeek('2026-10-05',1))[0]).toBe('2026-10-12');});
 it('only manual reset removes a selected week and keeps routines',()=>{const d=defaultData();d.activities.push({id:'1',date:'2026-10-05',type:'Walking',minutes:20,distanceKm:null,note:''});d.routines.push({id:'r',name:'Upper',category:'Upper body',items:[],createdAt:1});const cleared=removeWeekActivities(d,'2026-10-05');expect(cleared.activities).toHaveLength(0);expect(cleared.routines).toHaveLength(1);});
});
describe('exercise filters',()=>{
 it('provides three gym and home exercises per muscle',()=>{for(const m of muscles){expect(exercisesForMuscle(m.id,'gym').length).toBeGreaterThanOrEqual(3);expect(exercisesForMuscle(m.id,'home').length).toBeGreaterThanOrEqual(3);}});
 it('respects equipment, location and difficulty',()=>{const result=filterExercises(exercises,'push','home','chest','Beginner',['Bodyweight','Chair']);expect(result.some(e=>e.name==='Standard Push-Up')).toBe(true);expect(result.every(e=>e.locations.includes('home'))).toBe(true);});
});
describe('backup schema',()=>{it('accepts a complete state and rejects corrupt imports',()=>{expect(validateData(defaultData()).version).toBe(1);expect(()=>validateData({version:1})).toThrow();});});
