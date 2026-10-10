/** Optional, authenticated by open-source credits. Run when online BEFORE building. */
import {writeFile,stat} from 'node:fs/promises';
const dest=new URL('../public/anatomy.glb',import.meta.url);
const url='https://raw.githubusercontent.com/JohanBellander/BodyExplorer/main/public/anatomy.glb';
try{
 const existing=await stat(dest).catch(()=>null);
 if(existing && existing.size>5000000){ console.log('Anatomical model already installed.');process.exit(0); }
 const response=await fetch(url,{signal:AbortSignal.timeout(120000)});
 if(!response.ok)throw new Error(`HTTP ${response.status}`);
 const bytes=new Uint8Array(await response.arrayBuffer());
 if(bytes.byteLength<5000000)throw new Error('Unexpected model size');
 await writeFile(dest,bytes);
 console.log(`Saved ${Math.round(bytes.length/1048576)} MB anatomical mesh. Run npm run build to bundle it offline.`);
}catch(error){ console.error('Could not download optional 3D anatomy:',error.message);console.error('The app will retain its clearly labeled 2D interaction fallback.');process.exitCode=1; }
