
(function(w,d){"use strict";
const C={p2:"ctm_page02_result",p4:"CTM_PAGE04_ALIGNMENT_RESULT",out:"CTM_PAGE05_DIAGNOSIS_RESULT"};
const LEVEL={
FOUNDATION:["அடித்தளம் அமைக்கும் நிலை","FOUNDATION","உங்கள் வாழ்க்கையின் சில முக்கிய பகுதிகள் இன்னும் உறுதியான அடித்தளத்தை நாடுகின்றன. முதலில் மிக முக்கியமான பகுதிகளில் நிலைத்தன்மையை உருவாக்குவது அதிக பயன் தரும்.","Several important areas still need a stronger foundation. Stability in a few high-impact areas should come first."],
STABILISING:["நிலைப்படுத்தும் நிலை","STABILISING","சில பகுதிகள் செயல்படுகின்றன; சில பகுதிகள் இன்னும் நிலைத்தன்மையைத் தேடுகின்றன. சிதறிய முயற்சிகளை ஒழுங்கான அமைப்புகளாக மாற்றுவது அடுத்த கட்டம்.","Some areas are working while others still need stability. Turn scattered effort into reliable systems."],
DEVELOPING:["வளரும் நிலை","DEVELOPING","உங்கள் வாழ்க்கையில் முன்னேற்றம் உள்ளது; ஆனால் வளர்ச்சி எல்லா பகுதிகளிலும் ஒரே வேகத்தில் இல்லை. வலிமையான பகுதிகளைப் பயன்படுத்தி பின்தங்கிய பகுதிகளை உயர்த்துங்கள்.","There is clear progress, but growth is uneven. Use stronger areas to lift those that have not yet caught up."],
STRONG:["வலுவான நிலை","STRONG","பல முக்கிய பகுதிகள் வலுவாக இயங்குகின்றன. சில முக்கிய இடங்களில் துல்லியமான மேம்பாடு அதிக விளைவை உருவாக்கும்.","Many important areas are strong. Precise improvement in a few leverage points may create the greatest value."],
THRIVING:["செழித்து முன்னேறும் நிலை","THRIVING","பெரும்பாலான பகுதிகள் உயர்ந்த ஒத்திசைவில் இயங்குகின்றன. உங்கள் வலிமைகளை நீடித்த சுதந்திரம், தாக்கம் மற்றும் பங்களிப்பாக மாற்றுவது அடுத்த கட்டம்.","Most areas are highly aligned. Convert strength into sustained freedom, impact and contribution."]
};
const DN={
wealth:["செல்வ அடித்தளம்","WEALTH"],
incomeCashFlow:["வருமானம் & பணப்புழக்கம்","INCOME & CASH FLOW"],
assets:["சொத்துகள்","ASSETS"],
lifestyleFreedom:["வாழ்க்கைமுறை & சுதந்திரம்","LIFESTYLE & FREEDOM"],
protectionContribution:["பாதுகாப்பு & பங்களிப்பு","PROTECTION & CONTRIBUTION"]
};
function el(id){return d.getElementById(id)}
function txt(id,v){const x=el(id);if(x)x.textContent=(v===undefined||v===null||v==="")?"—":String(v)}
function num(v){v=Number(v);return Number.isFinite(v)?v:0}
function esc(v){return String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}
function read(k){try{const v=sessionStorage.getItem(k);return v?JSON.parse(v):null}catch(e){return null}}
function save(k,v){try{sessionStorage.setItem(k,JSON.stringify(v));return true}catch(e){console.error(e);return false}}
function sort(a,key,desc){return (a||[]).slice().sort((x,y)=>(desc?-1:1)*(num(x[key])-num(y[key])))}
function pEn(p){return p?(p.english||p.key||"—"):"—"}
function pTa(p){return p?(p.tamil||p.key||"—"):"—"}
function dNames(x){const n=DN[x.dimensionId]||[x.tamil||"",x.english||x.dimensionId||"DIMENSION"];return {ta:x.tamil||n[0],en:x.english||n[1]}}
function dCopy(x){
 const n=dNames(x),p=num(x.percentage);
 if(p<50)return {ta:n.ta,en:n.en,cta:"இந்தப் பகுதி தற்போது அதிக கவனத்தை தேடுகிறது. தனிப்பட்ட முயற்சியை விட தெளிவான அமைப்பு மற்றும் தொடர்ச்சியான முன்னேற்றம் முக்கியம்.",cen:"This area currently needs focused attention. A reliable system and consistent progress matter more than simply adding effort."};
 if(p<75)return {ta:n.ta,en:n.en,cta:"இந்தப் பகுதி வளர்ந்து வருகிறது. ஏற்கனவே உள்ள முன்னேற்றத்தை தொடர்ச்சியான அமைப்பாக மாற்றுவது அடுத்த வாய்ப்பு.",cen:"This area is developing. The next opportunity is to turn existing progress into a consistent system."};
 return {ta:n.ta,en:n.en,cta:"இந்தப் பகுதி உங்கள் தற்போதைய வலிமைகளில் ஒன்றாக உள்ளது. இதை பின்தங்கிய பகுதிகளுக்கு ஆதரவாக பயன்படுத்தலாம்.",cen:"This is one of your current strengths. Use it deliberately to support areas that are still developing."};
}
function card(id,item,i){
 const x=el(id);if(!x)return;
 const score=item.maximumScore?`<div class="page05-diagnosis-score">${esc(item.score)} / ${esc(item.maximumScore)}${item.percentage!==undefined?" · "+esc(item.percentage)+"%":""}</div>`:"";
 x.innerHTML=`<p class="page05-card-number">${String(i+1).padStart(2,"0")}</p><h3 class="page05-card-title-tamil" lang="ta">${esc(item.tamil)}</h3><p class="page05-card-title">${esc(item.english)}</p>${score}<p class="page05-card-copy" lang="ta">${esc(item.copyTa)}</p><p class="page05-card-copy page05-card-copy-english">${esc(item.copyEn)}</p>`;
}
function load(){
 const p2=read(C.p2),p4=read(C.p4);
 if(!p2||!p4)throw Error("Page02/Page04 result missing");
 if(!Array.isArray(p2.dimensions)||p2.dimensions.length!==5)throw Error("Expected five Page02 dimensions");
 if(!Array.isArray(p4.pillars)||p4.pillars.length!==12)throw Error("Expected twelve Page04 pillars");
 return {p2,p4,dims:p2.dimensions.map(x=>({...x,score:num(x.score),maximumScore:num(x.maximumScore),percentage:num(x.percentage)})),pillars:p4.pillars.map(x=>({...x,score:num(x.score)}))};
}
function build(I){
 const p4=I.p4,ps=I.pillars,ds=I.dims;
 const hiP=sort(ps,"score",true),loP=sort(ps,"score",false),hiD=sort(ds,"percentage",true),loD=sort(ds,"percentage",false);
 const strongest=p4.strongestPillar||hiP[0],growth=p4.growthPillar||loP[0],level=LEVEL[String(p4.lifeLevel||"DEVELOPING").toUpperCase()]||LEVEL.DEVELOPING;
 const strengths=[hiP[0],hiP[1]].filter(Boolean).map(p=>({tamil:pTa(p),english:pEn(p),score:p.score,maximumScore:10,copyTa:"இந்த வாழ்க்கைப் பகுதி உங்கள் வலிமையான வளங்களில் ஒன்றாக உள்ளது. இதை வளர்ச்சி பகுதிகளுக்கு ஆதரவாக பயன்படுத்துங்கள்.",copyEn:"This life area is one of your strongest resources. Use it deliberately to support developing areas."}));
 if(hiD[0]){const c=dCopy(hiD[0]);strengths.push({tamil:c.ta,english:c.en,score:hiD[0].score,maximumScore:hiD[0].maximumScore,percentage:hiD[0].percentage,copyTa:c.cta,copyEn:c.cen})}
 const opportunities=[loP[0],loP[1]].filter(Boolean).map(p=>({tamil:pTa(p),english:pEn(p),score:p.score,maximumScore:10,copyTa:"குறைந்த மதிப்பெண் தோல்வி அல்ல. இங்கு செய்யப்படும் திட்டமிட்ட முன்னேற்றம் உங்கள் மொத்த வாழ்க்கை சமநிலையை உயர்த்தக்கூடும்.",copyEn:"A lower score is not a verdict. Focused progress here may materially improve overall life alignment."}));
 if(loD[0]){const c=dCopy(loD[0]);opportunities.push({tamil:c.ta,english:c.en,score:loD[0].score,maximumScore:loD[0].maximumScore,percentage:loD[0].percentage,copyTa:c.cta,copyEn:c.cen})}
 const spread=num(strongest?.score)-num(growth?.score),dspread=num(hiD[0]?.percentage)-num(loD[0]?.percentage);
 let primary;
 if(spread>=4||dspread>=35)primary=["உங்கள் வளர்ச்சி வலுவாக இருக்கிறது — ஆனால் சமமாக இல்லை.","YOUR GROWTH IS REAL — BUT UNEVEN.","சில பகுதிகள் மிகவும் வலுவாக இருக்கின்றன; சில பகுதிகள் அந்த வளர்ச்சியின் வேகத்தை இன்னும் எட்டவில்லை.","Some parts of your life are strong while others have not yet caught up.","ஏற்கனவே உள்ள வலிமையை பின்தங்கிய பகுதிகளுடன் இணைக்க வேண்டும்.","Connect the strength you already have to the areas that are lagging."];
 else if(num(p4.percentage)<51)primary=["உங்களுக்கு இன்னும் அதிக முயற்சி மட்டும் தேவையில்லை — வலுவான அடித்தளம் தேவை.","YOU MAY NOT NEED MORE EFFORT — YOU NEED A STRONGER FOUNDATION.","பல பகுதிகளில் முயற்சியைப் பரப்புவதற்கு முன், அடிப்படை நிலைத்தன்மையை உருவாக்கும் பகுதிகளை வலுப்படுத்துங்கள்.","Before spreading effort widely, strengthen the areas that create foundational stability.","நிலைத்தன்மை உருவானால், முன்னேற்றம் எளிதாகிறது.","When stability improves, progress becomes easier to sustain."];
 else primary=["உங்கள் அடுத்த நிலை பெரிய மாற்றத்தில் இல்லை — சரியான முன்னுரிமையில் உள்ளது.","YOUR NEXT LEVEL IS ABOUT THE RIGHT PRIORITY.","உங்கள் வாழ்க்கையில் ஏற்கனவே பல செயல்படும் வளங்கள் உள்ளன. அதிக தாக்கத்தை உருவாக்கும் பகுதிகளை சரியான வரிசையில் மேம்படுத்துங்கள்.","You already have several functioning resources. Improve the highest-impact areas in the right sequence.","சரியான வரிசை, அதிக முயற்சியை விட சக்திவாய்ந்ததாக இருக்கலாம்.","The right sequence can be more powerful than simply adding more effort."];
 const roots=[
 {tamil:"சமமற்ற வளர்ச்சி",english:"UNEVEN DEVELOPMENT",copyTa:`${pTa(loP[0])} மற்றும் ${pTa(loP[1])} ஆகிய பகுதிகள் உங்கள் வலிமையான பகுதிகளின் வேகத்தை இன்னும் எட்டாமல் இருக்கலாம்.`,copyEn:`${pEn(loP[0])} and ${pEn(loP[1])} may not yet have caught up with the stronger parts of your life.`},
 {tamil:"வலிமை இன்னும் முழு leverage ஆக மாறவில்லை",english:"STRENGTH NOT YET CONVERTED INTO LEVERAGE",copyTa:"ஒரு பகுதியில் உள்ள வலிமை மற்றொரு பகுதியில் தானாக முன்னேற்றத்தை உருவாக்காது. அதை திட்டமிட்டு இணைக்க வேண்டும்.",copyEn:"Strength in one area does not automatically improve another. It needs to be deliberately converted into leverage."},
 {tamil:"முயற்சியை விட அமைப்பு தேவை",english:"SYSTEMS MAY NEED TO CATCH UP WITH EFFORT",copyTa:`${dNames(loD[0]||{}).ta} பகுதியில் காணப்படும் இடைவெளி அதிக முயற்சியை விட நம்பகமான அமைப்பு தேவைப்படுவதைச் சுட்டிக்காட்டலாம்.`,copyEn:`The gap in ${dNames(loD[0]||{}).en} may indicate a need for a more reliable system rather than simply more effort.`}
 ];
 const cross=[
 {tamil:"வருமானம் → பொருளாதார சுதந்திரம்",english:"INCOME → FINANCIAL FREEDOM",copyTa:"வருமானம் உயர்வது மட்டும் பொருளாதார சுதந்திரத்தை உறுதி செய்யாது. பணப்புழக்கம், சொத்து உருவாக்கம் மற்றும் நீண்டகால கட்டமைப்பு ஒன்றாக செயல்பட வேண்டும்.",copyEn:"Higher income alone does not guarantee financial freedom. Cash flow, asset creation and long-term structure need to work together."},
 {tamil:"சொத்துகள் → நேர சுதந்திரம்",english:"ASSETS → TIME FREEDOM",copyTa:"சொத்துகள் மற்றும் அமைப்புகள் வளரும்போது, உங்கள் நேரத்தின் மீது அதிக கட்டுப்பாடு உருவாகலாம்.",copyEn:"As assets and systems strengthen, greater control over time can emerge."},
 {tamil:"வாழ்க்கை சுதந்திரம் → பங்களிப்பு",english:"LIFESTYLE FREEDOM → CONTRIBUTION",copyTa:"நேரம், பணம் மற்றும் தேர்வு சுதந்திரம் அதிகரிக்கும்போது, பங்களிப்பை அதிக நோக்கத்துடன் வடிவமைக்க முடியும்.",copyEn:"As freedom of time, money and choice increases, contribution can be shaped with greater intention."}
 ];
 const lever={tamil:pTa(growth),english:pEn(growth),copyTa:`${pTa(growth)} தற்போது அதிக வளர்ச்சி இடம் கொண்ட பகுதியாகத் தெரிகிறது. இதனை ${dNames(loD[0]||{}).ta} பகுதியில் செய்யும் நடைமுறை மாற்றங்களுடன் இணைத்தால் பல பகுதிகளில் முன்னேற்றம் உருவாகலாம்.`,copyEn:`${pEn(growth)} currently shows the greatest room for growth. Linking it with practical improvement in ${dNames(loD[0]||{}).en} may create progress across several connected areas.`};
 const priorities=[
 {number:"01",tamil:pTa(loP[0]),english:pEn(loP[0]),copyTa:"முதலில் இந்த வாழ்க்கைப் பகுதியில் ஒரு தெளிவான, அளவிடக்கூடிய முன்னேற்றத்தை உருவாக்குங்கள்.",copyEn:"Create one clear, measurable improvement in this life area first."},
 {number:"02",tamil:dNames(loD[0]||{}).ta,english:dNames(loD[0]||{}).en,copyTa:"இந்தப் பரிமாணத்தில் தனிப்பட்ட முயற்சியை நம்பகமான அமைப்பாக மாற்றுங்கள்.",copyEn:"Turn repeated personal effort in this dimension into a reliable system."},
 {number:"03",tamil:pTa(loP[1]),english:pEn(loP[1]),copyTa:"முதல் இரண்டு முன்னுரிமைகள் நிலைபெற்ற பிறகு இந்தப் பகுதியை வலுப்படுத்துங்கள்.",copyEn:"Once the first two priorities become stable, strengthen this area next."}
 ];
 return {version:"1.0",generatedAt:new Date().toISOString(),snapshot:{totalLifeScore:num(p4.totalScore),maximumLifeScore:120,lifeAlignment:num(p4.percentage),lifeLevel:p4.lifeLevel||"DEVELOPING",strongestPillar:strongest,growthPillar:growth},currentStatus:{tamil:level[0],english:level[1],copyTa:level[2],copyEn:level[3]},dimensions:ds.map(x=>{const c=dCopy(x);return {...x,displayTamil:c.ta,displayEnglish:c.en,copyTa:c.cta,copyEn:c.cen}}),strengths:strengths.slice(0,3),opportunities:opportunities.slice(0,3),primaryInsight:{tamil:primary[0],english:primary[1],copyTa:primary[2],copyEn:primary[3],keyTa:primary[4],keyEn:primary[5]},rootPatterns:roots,crossConnections:cross,lifePattern:{tamil:`உங்கள் தற்போதைய பெரிய படம்: ${pTa(strongest)} உங்கள் முன்னேற்றத்தை ஆதரிக்கிறது; ${pTa(growth)} அதிக கவனத்தை நாடுகிறது. ${dNames(hiD[0]||{}).ta} வலிமையை ${dNames(loD[0]||{}).ta} முன்னேற்றத்துடன் இணைத்தால் மொத்த சமநிலை உயரக்கூடும்.`,english:`Your current pattern shows ${pEn(strongest)} pulling you forward while ${pEn(growth)} needs focused attention. Connecting the strength of ${dNames(hiD[0]||{}).en} to the development of ${dNames(loD[0]||{}).en} may improve overall alignment.`},transformationLever:lever,priorities,hypothesis:{tamil:`நீங்கள் ${priorities[0].tamil} பகுதியில் முன்னேற்றத்தை உருவாக்கி, ${priorities[1].tamil} பகுதியில் நம்பகமான அமைப்பை கட்டி, ${pTa(strongest)} வலிமையை ஆதரவாக பயன்படுத்தினால், உங்கள் மொத்த வாழ்க்கை சமநிலை குறிப்பிடத்தக்க அளவில் உயரக்கூடும்.`,english:`If you create focused progress in ${priorities[0].english}, build a reliable system around ${priorities[1].english}, and use your strength in ${pEn(strongest)} to support that change, your overall life alignment may improve meaningfully.`}};
}
function render(R){
 const S=R.snapshot,CS=R.currentStatus;
 txt("diagnosis-current-status-tamil",CS.tamil);txt("diagnosis-current-status",CS.english);txt("diagnosis-current-status-copy-tamil",CS.copyTa);txt("diagnosis-current-status-copy",CS.copyEn);
 txt("diagnosis-life-alignment",S.lifeAlignment+"%");txt("diagnosis-total-score",S.totalLifeScore);txt("diagnosis-life-level",String(S.lifeLevel).toUpperCase());txt("diagnosis-strongest-pillar",pEn(S.strongestPillar));txt("diagnosis-strongest-score",S.strongestPillar?.score);txt("diagnosis-growth-pillar",pEn(S.growthPillar));txt("diagnosis-growth-score",S.growthPillar?.score);
 R.dimensions.forEach((x,i)=>{let n=i+1;txt("diagnosis-dimension-tamil-"+n,x.displayTamil);txt("diagnosis-dimension-name-"+n,x.displayEnglish);txt("diagnosis-dimension-score-"+n,`${x.score} / ${x.maximumScore} · ${x.percentage}%`);const m=el("diagnosis-dimension-meter-"+n);if(m)m.style.width=Math.max(0,Math.min(100,x.percentage))+"%";txt("diagnosis-dimension-copy-tamil-"+n,x.copyTa);txt("diagnosis-dimension-copy-"+n,x.copyEn)});
 R.strengths.forEach((x,i)=>card("diagnosis-strength-"+(i+1),x,i));R.opportunities.forEach((x,i)=>card("diagnosis-opportunity-"+(i+1),x,i));
 const P=R.primaryInsight;txt("diagnosis-primary-insight-tamil",P.tamil);txt("diagnosis-primary-insight",P.english);txt("diagnosis-primary-copy-tamil",P.copyTa);txt("diagnosis-primary-copy",P.copyEn);txt("diagnosis-key-insight-tamil",P.keyTa);txt("diagnosis-key-insight",P.keyEn);
 R.rootPatterns.forEach((x,i)=>card("diagnosis-root-pattern-"+(i+1),x,i));R.crossConnections.forEach((x,i)=>card("diagnosis-cross-"+(i+1),x,i));
 txt("diagnosis-life-pattern-tamil",R.lifePattern.tamil);txt("diagnosis-life-pattern",R.lifePattern.english);
 const L=R.transformationLever;txt("diagnosis-transformation-lever-tamil",L.tamil);txt("diagnosis-transformation-lever",L.english);txt("diagnosis-transformation-lever-copy-tamil",L.copyTa);txt("diagnosis-transformation-lever-copy",L.copyEn);
 R.priorities.forEach((x,i)=>card("diagnosis-priority-"+(i+1),x,i));txt("diagnosis-hypothesis-tamil",R.hypothesis.tamil);txt("diagnosis-hypothesis",R.hypothesis.english);
 txt("diagnosis-summary-status",CS.english);txt("diagnosis-summary-strength",R.strengths[0]?.english);txt("diagnosis-summary-opportunity",R.opportunities[0]?.english);txt("diagnosis-summary-pattern",R.rootPatterns[0]?.english);txt("diagnosis-summary-insight",P.english);txt("diagnosis-summary-priority",R.priorities[0]?.english);
}
const state={initialized:false,input:null,diagnosis:null};
function init(){if(state.initialized)return state.diagnosis;try{state.input=load();state.diagnosis=build(state.input);render(state.diagnosis);save(C.out,state.diagnosis);state.initialized=true;console.info("CTM PATH™ Page05 ready.",state.diagnosis);return state.diagnosis}catch(e){console.error("CTM PATH™ Page05 failed.",e);txt("diagnosis-current-status-tamil","முந்தைய மதிப்பீட்டு தரவு கிடைக்கவில்லை");txt("diagnosis-current-status","ASSESSMENT DATA UNAVAILABLE");txt("diagnosis-current-status-copy","Page 02 and Page 04 results are required. Please complete the previous assessment steps.");return null}}
w.CTM_PAGE05=Object.freeze({version:"1.0",init,getDiagnosis:()=>state.diagnosis,getInputs:()=>state.input,getStoredDiagnosis:()=>read(C.out),rebuild:()=>{state.initialized=false;state.input=null;state.diagnosis=null;return init()},storageKeys:Object.freeze(C)});
})(window,document);
