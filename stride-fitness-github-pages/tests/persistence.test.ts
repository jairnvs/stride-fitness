import 'fake-indexeddb/auto';
import {describe,it,expect} from 'vitest';
import {loadData,saveData,defaultData} from '../src/lib/store';
describe('IndexedDB persistence',()=>{
 it('saves profile, activity, favorites and routines between reads',async()=>{
  const value=defaultData();value.profile.nickname='Test User';
  value.favorites=['standard-push-up'];
  value.activities.push({id:'a',type:'Walking',date:'2026-10-09',minutes:25,distanceKm:2,note:''});
  value.routines.push({id:'r',name:'Strength',category:'Full body',items:[],createdAt:1});
  await saveData(value);
  const loaded=await loadData();
  expect(loaded.profile.nickname).toBe('Test User');
  expect(loaded.favorites).toContain('standard-push-up');
  expect(loaded.activities[0].distanceKm).toBe(2);
  expect(loaded.routines[0].name).toBe('Strength');
 });
});
