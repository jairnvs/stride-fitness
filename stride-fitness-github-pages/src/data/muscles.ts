export type MuscleId = 'chest'|'front-delts'|'side-delts'|'rear-delts'|'lats'|'traps'|'upper-back'|'lower-back'|'biceps'|'triceps'|'forearms'|'abs'|'obliques'|'quads'|'hamstrings'|'glutes'|'calves'|'adductors'|'abductors';
export type Muscle = {id:MuscleId;name:string;anatomical:string;location:string;function:string;region:'Upper body'|'Lower body';keywords:string[];related:MuscleId[]};
export const muscles: Muscle[] = [
 {id:'chest',name:'Chest',anatomical:'Pectoralis major',location:'Across the front of the upper chest.',function:'Moves the upper arm across the torso, inward and forward; contributes to pressing.',region:'Upper body',keywords:['pectoralis major','pectoralis minor'],related:['front-delts','triceps']},
 {id:'front-delts',name:'Front delts',anatomical:'Anterior deltoid',location:'Front of the shoulder.',function:'Raises the arm forward and helps with overhead and horizontal pressing.',region:'Upper body',keywords:['anterior deltoid'],related:['chest','triceps']},
 {id:'side-delts',name:'Side delts',anatomical:'Middle (acromial) deltoid',location:'Outside of each shoulder.',function:'Lifts the arm out to the side.',region:'Upper body',keywords:['middle deltoid'],related:['front-delts','rear-delts']},
 {id:'rear-delts',name:'Rear delts',anatomical:'Posterior deltoid',location:'Back of the shoulder.',function:'Draws the upper arm backward and assists shoulder external rotation.',region:'Upper body',keywords:['posterior deltoid'],related:['upper-back','side-delts']},
 {id:'lats',name:'Lats',anatomical:'Latissimus dorsi',location:'Broad muscles along the sides of the mid-to-lower back.',function:'Pulls the upper arm down and back toward the torso.',region:'Upper body',keywords:['latissimus dorsi'],related:['biceps','upper-back']},
 {id:'traps',name:'Traps',anatomical:'Trapezius',location:'Neck-to-shoulder and upper-back region.',function:'Elevates, retracts and rotates the shoulder blades.',region:'Upper body',keywords:['trapezius'],related:['upper-back','rear-delts']},
 {id:'upper-back',name:'Upper back',anatomical:'Rhomboids and mid trapezius',location:'Between the shoulder blades.',function:'Pulls the shoulder blades toward the spine and supports posture.',region:'Upper body',keywords:['rhomboid','transverse part of'],related:['traps','rear-delts']},
 {id:'lower-back',name:'Lower back',anatomical:'Erector spinae',location:'Along both sides of the lower spine.',function:'Helps extend and stabilize the spine against bending.',region:'Upper body',keywords:['iliocostalis','longissimus','spinalis','multifidus','erector spinae'],related:['glutes','hamstrings']},
 {id:'biceps',name:'Biceps',anatomical:'Biceps brachii',location:'Front of the upper arm.',function:'Bends the elbow and turns the palm upward.',region:'Upper body',keywords:['biceps brachii','brachialis'],related:['lats','forearms']},
 {id:'triceps',name:'Triceps',anatomical:'Triceps brachii',location:'Back of the upper arm.',function:'Straightens the elbow, especially during pushing.',region:'Upper body',keywords:['triceps brachii'],related:['chest','front-delts']},
 {id:'forearms',name:'Forearms',anatomical:'Forearm flexors and extensors',location:'Between the elbow and wrist.',function:'Control wrist and finger movement and support grip.',region:'Upper body',keywords:['flexor carpi','extensor carpi','brachioradialis','flexor digitorum','extensor digitorum'],related:['biceps']},
 {id:'abs',name:'Abs',anatomical:'Rectus abdominis',location:'Front of the abdomen.',function:'Flexes the trunk and helps control spinal and pelvic position.',region:'Upper body',keywords:['rectus abdominis'],related:['obliques','lower-back']},
 {id:'obliques',name:'Obliques',anatomical:'External and internal abdominal obliques',location:'Sides of the abdomen.',function:'Rotate, side-bend and stabilize the trunk.',region:'Upper body',keywords:['obliquus externus','obliquus internus','external oblique','internal oblique'],related:['abs','lower-back']},
 {id:'quads',name:'Quadriceps',anatomical:'Quadriceps femoris',location:'Front of the thighs.',function:'Straightens the knee; rectus femoris also helps flex the hip.',region:'Lower body',keywords:['rectus femoris','vastus medialis','vastus lateralis','vastus intermedius'],related:['glutes','hamstrings']},
 {id:'hamstrings',name:'Hamstrings',anatomical:'Biceps femoris, semitendinosus and semimembranosus',location:'Back of the thighs.',function:'Bend the knee and assist hip extension.',region:'Lower body',keywords:['biceps femoris','semitendinosus','semimembranosus'],related:['glutes','lower-back']},
 {id:'glutes',name:'Glutes',anatomical:'Gluteus maximus, medius and minimus',location:'Buttocks and outer hips.',function:'Extend, abduct and stabilize the hip.',region:'Lower body',keywords:['gluteus maximus','gluteus medius','gluteus minimus'],related:['hamstrings','abductors']},
 {id:'calves',name:'Calves',anatomical:'Gastrocnemius and soleus',location:'Back of the lower legs.',function:'Point the foot downward and propel the body during walking and running.',region:'Lower body',keywords:['gastrocnemius','soleus'],related:['hamstrings']},
 {id:'adductors',name:'Hip adductors',anatomical:'Adductor longus, brevis and magnus',location:'Inner thighs.',function:'Draw the legs toward the center of the body and steady the pelvis.',region:'Lower body',keywords:['adductor longus','adductor brevis','adductor magnus','gracilis','pectineus'],related:['quads','abductors']},
 {id:'abductors',name:'Hip abductors',anatomical:'Gluteus medius and minimus; tensor fasciae latae',location:'Outer hips.',function:'Move the thigh outward and keep the pelvis level during single-leg stance.',region:'Lower body',keywords:['gluteus medius','gluteus minimus','tensor fasciae latae'],related:['glutes','adductors']}
];
export const getMuscle=(id:MuscleId)=>muscles.find(m=>m.id===id)!;
/** Anatomical mesh names use separate left/right heads and parts. Match specific groups before generic ones. */
export function identifyMuscle(raw:string):MuscleId|null{
 const s=raw.toLowerCase().replace(/_/g,' ');
 if(s.includes('deltoid')){
  if(/clavicular|anterior/.test(s))return 'front-delts';
  if(/acromial|middle/.test(s))return 'side-delts';
  if(/spinal|posterior/.test(s))return 'rear-delts';
  return 'side-delts';
 }
 if(/gluteus medius|gluteus minimus|tensor fasciae latae/.test(s))return 'abductors';
 if(/transverse part of.*trapezius/.test(s))return 'upper-back';
 for(const group of muscles){if(group.keywords.some(key=>s.includes(key)))return group.id;}
 return null;
}
