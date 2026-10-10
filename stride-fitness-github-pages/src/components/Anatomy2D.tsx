import type {MuscleId} from '../data/muscles';
import {muscles} from '../data/muscles';
import type {MouseEvent} from 'react';
type Props={model:'male'|'female';side:'front'|'back';selected:MuscleId|null;onSelect:(id:MuscleId)=>void};
type Region={id:MuscleId;d:string};
const front:Region[]=[
 {id:'traps',d:'M142 101 L160 116 L178 101 L170 124 L150 124 Z'},
 {id:'chest',d:'M114 134 Q131 120 158 133 L158 172 Q138 183 119 165 Z M162 133 Q188 120 206 134 L201 165 Q181 183 162 172 Z'},
 {id:'front-delts',d:'M113 119 Q101 118 96 143 L116 157 L124 130 Z M207 119 Q219 118 224 143 L204 157 L196 130 Z'},
 {id:'side-delts',d:'M99 137 L114 154 L107 169 L91 152 Z M221 137 L206 154 L213 169 L229 152 Z'},
 {id:'biceps',d:'M91 156 Q104 163 106 181 L92 222 L78 213 Z M229 156 Q216 163 214 181 L228 222 L242 213 Z'},
 {id:'triceps',d:'M81 174 L92 183 L77 230 L67 221 Z M239 174 L228 183 L243 230 L253 221 Z'},
 {id:'forearms',d:'M67 226 L80 235 L60 298 L46 293 Z M253 226 L240 235 L260 298 L274 293 Z'},
 {id:'abs',d:'M144 184 L176 184 L181 273 L139 273 Z'},
 {id:'obliques',d:'M121 181 L142 190 L137 270 L122 258 Z M199 181 L178 190 L183 270 L198 258 Z'},
 {id:'abductors',d:'M118 274 L134 288 L122 340 L109 323 Z M202 274 L186 288 L198 340 L211 323 Z'},
 {id:'quads',d:'M121 309 L151 318 L149 409 L125 408 Z M199 309 L169 318 L171 409 L195 408 Z'},
 {id:'adductors',d:'M153 316 L159 322 L154 399 L149 398 Z M167 316 L161 322 L166 399 L171 398 Z'},
 {id:'calves',d:'M129 425 L148 425 L147 510 L138 521 L127 483 Z M191 425 L172 425 L173 510 L182 521 L193 483 Z'}
];
const back:Region[]=[
 {id:'traps',d:'M144 100 L160 112 L176 100 L190 152 L161 183 L131 152 Z'},
 {id:'rear-delts',d:'M113 121 L126 147 L107 171 L91 150 Z M207 121 L194 147 L213 171 L229 150 Z'},
 {id:'upper-back',d:'M128 160 L159 184 L192 160 L187 211 L160 226 L133 211 Z'},
 {id:'lats',d:'M122 183 L138 209 L143 267 L118 251 L113 196 Z M198 183 L182 209 L177 267 L202 251 L207 196 Z'},
 {id:'lower-back',d:'M144 228 L176 228 L179 274 L141 274 Z'},
 {id:'triceps',d:'M89 157 L108 180 L86 224 L72 219 Z M231 157 L212 180 L234 224 L248 219 Z'},
 {id:'forearms',d:'M69 225 L83 233 L60 298 L46 293 Z M251 225 L237 233 L260 298 L274 293 Z'},
 {id:'glutes',d:'M121 281 L159 281 L158 329 L121 346 L111 311 Z M199 281 L161 281 L162 329 L199 346 L209 311 Z'},
 {id:'abductors',d:'M113 282 L132 284 L117 325 L107 313 Z M207 282 L188 284 L203 325 L213 313 Z'},
 {id:'hamstrings',d:'M119 346 L152 339 L151 410 L129 413 Z M201 346 L168 339 L169 410 L191 413 Z'},
 {id:'adductors',d:'M152 337 L160 336 L158 405 L150 403 Z M168 337 L160 336 L162 405 L170 403 Z'},
 {id:'calves',d:'M130 425 Q145 417 149 446 L143 507 L134 522 L127 474 Z M190 425 Q175 417 171 446 L177 507 L186 522 L193 474 Z'},
 {id:'biceps',d:'M96 177 L104 186 L94 217 L85 211 Z M224 177 L216 186 L226 217 L235 211 Z'}
];
const contourMale='M146 98 L174 98 L204 113 Q222 121 230 151 L250 219 L278 294 Q280 306 267 306 Q261 306 257 298 L226 233 L210 180 L209 257 L214 302 L198 419 L194 470 L191 541 Q189 552 173 552 L170 532 L163 419 L160 341 L157 419 L150 532 L147 552 Q131 552 129 541 L126 470 L122 419 L106 302 L111 257 L110 180 L94 233 L63 298 Q59 306 53 306 Q40 306 42 294 L70 219 L90 151 Q98 121 116 113 Z';
const contourFemale='M147 99 L173 99 L197 114 Q215 123 224 151 L247 218 L276 295 Q278 306 266 306 L256 295 L219 220 L204 171 Q206 210 201 244 Q197 261 209 291 L216 321 L198 418 L195 480 L192 541 Q189 552 173 552 L169 530 L162 418 L160 351 L158 418 L151 530 L147 552 Q131 552 128 541 L125 480 L122 418 L104 321 L111 291 Q123 261 119 244 Q114 210 116 171 L101 220 L64 295 L54 306 Q42 306 44 295 L73 218 L96 151 Q105 123 123 114 Z';
export default function Anatomy2D({model,side,selected,onSelect}:Props){
 const regionList=side==='front'?front:back;
 const hit=(e:MouseEvent<SVGPathElement>)=>{e.stopPropagation();};
 return <div className="anatomy-illustration">
  <svg viewBox="0 0 320 570" role="group" aria-label={`${model} anatomical diagram, ${side} view with selectable muscle regions`}>
   <defs><linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d7d6ca"/><stop offset="1" stopColor="#adafa6"/></linearGradient></defs>
   <ellipse cx="160" cy="63" rx={model==='male'?29:27} ry="37" fill="url(#bodyGrad)" stroke="#9b9f95" strokeWidth="1.2"/>
   <path d={model==='male'?contourMale:contourFemale} fill="url(#bodyGrad)" stroke="#9b9f95" strokeWidth="1.4" strokeLinejoin="round"/>
   <path d="M160 112 L160 278 M130 419 L138 523 M190 419 L182 523" fill="none" stroke="#858a80" strokeOpacity=".28" strokeWidth="1"/>
   {regionList.map((r,i)=><path key={`${r.id}-${i}`} d={r.d} fill={selected===r.id?'#bceb69':'#b1b3a9'} fillOpacity={selected===r.id?'.97':'.86'} stroke={selected===r.id?'#7fac35':'#e1e2da'} strokeWidth={selected===r.id?'2.1':'1.5'} strokeLinejoin="round" role="button" tabIndex={0} aria-label={`Select ${muscles.find(x=>x.id===r.id)?.name}`} onClick={e=>{hit(e);onSelect(r.id);}} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(r.id);}}}><title>{muscles.find(x=>x.id===r.id)?.name}</title></path>)}
   <ellipse cx="160" cy="552" rx="16" ry="3" fill="#8f9386" fillOpacity=".17"/>
  </svg>
  <div className="anatomy-hint">Interactive 2D anatomical guide · tap a highlighted region</div>
 </div>;
}
