import {Canvas,useThree} from '@react-three/fiber';
import {OrbitControls,useGLTF} from '@react-three/drei';
import {Suspense,useEffect,useMemo} from 'react';
import * as THREE from 'three';
import {identifyMuscle,type MuscleId} from '../data/muscles';
type Props={side:'front'|'back';selected:MuscleId|null;onSelect:(id:MuscleId)=>void};
function CameraSide({side}:{side:'front'|'back'}){const {camera,invalidate}=useThree();useEffect(()=>{camera.position.set(0,0,side==='front'?48:-48);camera.lookAt(0,0,0);camera.updateProjectionMatrix();invalidate();},[side,camera,invalidate]);return null;}
function Model({selected,onSelect}:Pick<Props,'selected'|'onSelect'>){
 const {scene}=useGLTF(`${import.meta.env.BASE_URL}anatomy.glb`);
 const materials=useMemo(()=>({selected:new THREE.MeshStandardMaterial({color:'#c4f268',roughness:0.75,side:THREE.DoubleSide}),tendon:new THREE.MeshStandardMaterial({color:'#b7b6a7',roughness:0.82,side:THREE.DoubleSide}),muscle:new THREE.MeshStandardMaterial({color:'#b98a78',roughness:0.82,side:THREE.DoubleSide}),other:new THREE.MeshStandardMaterial({color:'#a5a99e',roughness:0.82,side:THREE.DoubleSide})}),[]);
 const meshes=useMemo(()=>{
  const box=new THREE.Box3().setFromObject(scene);const center=box.getCenter(new THREE.Vector3());const size=box.getSize(new THREE.Vector3());const scale=30/size.z;const parts:{key:string;geometry:THREE.BufferGeometry;muscle:MuscleId|null;isTendon:boolean}[]=[];
  scene.traverse(obj=>{
   if(!(obj instanceof THREE.Mesh))return;
   const geo=(obj.geometry as THREE.BufferGeometry).clone();const p=geo.getAttribute('position');
   const a=p.array as Float32Array;for(let i=0;i<a.length;i+=3){const x=a[i],y=a[i+1],z=a[i+2];a[i]=(x-center.x)*scale;a[i+1]=(z-center.z)*scale;a[i+2]=-(y-center.y)*scale;}p.needsUpdate=true;
   const n=geo.getAttribute('normal');if(n){const v=n.array as Float32Array;for(let i=0;i<v.length;i+=3){const y=v[i+1],z=v[i+2];v[i+1]=z;v[i+2]=-y;}n.needsUpdate=true;}
   geo.computeBoundingSphere();const name=obj.name.replace(/_/g,' ');const isTendon=/tendon|ligament|membrane|retinaculum/.test(name.toLowerCase());parts.push({key:name+'-'+parts.length,geometry:geo,muscle:isTendon?null:identifyMuscle(name),isTendon});
  });return parts;
 },[scene]);
 useEffect(()=>()=>{meshes.forEach(m=>m.geometry.dispose());Object.values(materials).forEach(m=>m.dispose());},[meshes,materials]);
 return <group>{meshes.map(m=><mesh key={m.key} geometry={m.geometry} material={m.muscle===selected?materials.selected:m.isTendon?materials.tendon:m.muscle?materials.muscle:materials.other} onClick={m.muscle?e=>{e.stopPropagation();onSelect(m.muscle!);}:undefined}/>)}</group>;
}
export default function Anatomy3D(props:Props){return <div className="canvas-3d" aria-label="Rotatable and selectable anatomical 3D model">
 <Canvas frameloop="demand" camera={{position:[0,0,48],fov:43,near:0.1,far:160}} dpr={[1,1.7]} gl={{antialias:false,powerPreference:'low-power',alpha:true}}>
  <ambientLight intensity={2.2}/><directionalLight position={[12,19,26]} intensity={2.2}/><directionalLight position={[-12,-4,-8]} intensity={1.2}/>
  <Suspense fallback={null}><Model selected={props.selected} onSelect={props.onSelect}/></Suspense>
  <CameraSide side={props.side}/><OrbitControls makeDefault minDistance={25} maxDistance={75} enablePan={false} enableDamping dampingFactor={0.09}/>
 </Canvas><div className="anatomy-hint">3D anatomical mesh · drag to rotate · pinch to zoom · tap a muscle</div></div>;
}
