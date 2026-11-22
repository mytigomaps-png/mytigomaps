'use strict';
/* Recommendations are calculated locally. No API keys or visitor profiles leave
   the device. Budgets are planning assumptions in PEN, not live quotations. */
const MYSTIGO_MOODS={
  'Descansar':['Descanso','Playa'],
  'Vivir una aventura':['Aventura','Naturaleza'],
  'Descubrir cultura':['Cultura','Fotografía'],
  'Probar nuevos sabores':['Gastronomía','Cultura'],
  'Un viaje romántico':['Descanso','Fotografía'],
  'Conectar con la naturaleza':['Naturaleza','Fotografía']
};
const MYSTIGO_TAGS=['Playa','Naturaleza','Aventura','Cultura','Gastronomía','Fotografía','Descanso'];
const MYSTIGO_THEME_KEY='mystigo.appearance';
const priorHome=home,priorDetails=details,priorPreferencesView=preferencesView,priorProfileView=profileView,priorHelpView=helpView,priorPlanView=planView,priorLog=log;
paths.bell='<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>';
paths.moon='<path d="M20 14a8 8 0 0 1-10-10 8 8 0 1 0 10 10Z"/>';
let notificationWorker=null,appearanceChoice='system';
const systemAppearance=window.matchMedia?window.matchMedia('(prefers-color-scheme: dark)'):null;

function nextWeekendDate(){const day=new Date(today()+'T12:00:00').getDay();return datePlus(today(),(6-day+7)%7);}
function hasTravelPreferences(){return !!hasSavedTravelPreferences();}
function initialTravelPreferences(){return {...defaults().prefs,configured:false,tripBudget:1500,tripDays:3,people:1,mood:'Descansar',scope:'Todos',travelDate:nextWeekendDate()};}
function restartTravelPreferences(){
 state.prefs=initialTravelPreferences();
 state.surpriseOffers=null;state.selected=[];state.affinity={};state.surpriseHistory=[];currentPlan=null;
 state.notifications=state.notifications.filter(n=>n.type!=='idea'&&!(/^(offers:|preferences:|motivation:|inspiration:)/.test(n.id)));
 MystigoSound.stop();
 const saved=persist();
 render();$('#main').focus({preventScroll:true});updateNotificationBadge();
 toast(saved?'Preferencias reiniciadas. Elige y guarda tus gustos para recibir nuevas propuestas.':'Preferencias reiniciadas en esta sesión. El navegador no permitió guardar el reinicio; al volver podrían aparecer los datos anteriores.');
 return saved;
}
function preferenceSummary(){if(!hasTravelPreferences())return '<p class="storage-note">Aún no has guardado tus gustos y presupuesto.</p>';const p=travelDefaults();return `<div class="surprise-summary"><span>${money(p.tripBudget)} en destino</span><span>${p.tripDays} días</span><span>${p.people} viajero(s)</span><span>${esc([...state.prefs.types,...state.prefs.activities].join(' · '))}</span></div>`;}
function readTravelPreferences(form){
  const clamp=(v,min,max,fallback)=>{const n=Number(v);return Number.isFinite(n)&&n>=min&&n<=max?n:fallback;};
  const mood=String(form.get('mood')||state.prefs.mood||'Descansar');
  const date=String(form.get('travelDate')||state.prefs.travelDate||nextWeekendDate());
  return {tripBudget:clamp(form.get('tripBudget'),50,1000000,state.prefs.tripBudget||1500),tripDays:Math.round(clamp(form.get('tripDays'),1,7,state.prefs.tripDays||3)),people:Math.round(clamp(form.get('people'),1,20,state.prefs.people||1)),mood:MYSTIGO_MOODS[mood]?mood:'Descansar',scope:'Todos',travelDate:/^\d{4}-\d{2}-\d{2}$/.test(date)&&date>=today()?date:nextWeekendDate()};
}
function travelDefaults(){return {...state.prefs,tripBudget:state.prefs.tripBudget||1500,tripDays:state.prefs.tripDays||3,people:state.prefs.people||1,mood:state.prefs.mood||'Descansar',scope:'Todos',travelDate:state.prefs.travelDate>=today()?state.prefs.travelDate:nextWeekendDate()};}
function tripEstimate(dest,days,people,style){
  const base=dest.daily*({Económico:1,Moderado:1.4,Alto:2.2}[style]||1)*people;
  const lodging=Math.round(base*.4*Math.max(0,days-1)),food=Math.round(base*.35*days),activities=Math.round(base*.25*days),reserve=Math.round((lodging+food+activities)*.1);
  return {lodging,food,activities,reserve,total:lodging+food+activities+reserve};
}
function tasteVector(options=travelDefaults()){
  const vector=MYSTIGO_TAGS.map(tag=>(state.prefs.types.includes(tag)?3:0)+(state.prefs.activities.includes(tag)?2:0)+(MYSTIGO_MOODS[options.mood]?.includes(tag)?3:0));
  if(state.prefs.activities.includes('Caminatas'))vector[MYSTIGO_TAGS.indexOf('Naturaleza')]+=2;
  if(state.prefs.activities.includes('Deportes extremos'))vector[MYSTIGO_TAGS.indexOf('Aventura')]+=2;
  state.favorites.forEach(id=>destination(id)?.categories.forEach(tag=>{const i=MYSTIGO_TAGS.indexOf(tag);if(i>=0)vector[i]+=1.5;}));
  Object.entries(state.affinity||{}).forEach(([tag,value])=>{const i=MYSTIGO_TAGS.indexOf(tag);if(i>=0)vector[i]+=Math.min(3,Number(value)||0)*.25;});
  return vector;
}
function recommendation(dest,options=travelDefaults()){
  const user=tasteVector(options),item=MYSTIGO_TAGS.map(tag=>dest.categories.includes(tag)?1:0);
  const dot=item.reduce((v,x,i)=>v+x*user[i],0),norm=Math.hypot(...user)*Math.hypot(...item);
  const affinity=norm?dot/norm:0,month=Number(String(options.travelDate||nextWeekendDate()).slice(5,7));
  const cost=tripEstimate(dest,options.tripDays||3,options.people||1,options.budget||'Moderado');
  const fits=cost.total<=Number(options.tripBudget||1500),season=dest.months?.includes(month)||false;
  const reasons=[];
  const interests=dest.categories.filter(tag=>state.prefs.types.includes(tag)||state.prefs.activities.includes(tag));
  if(interests.length)reasons.push('Conecta con '+interests.slice(0,2).join(' y ').toLowerCase());
  if(MYSTIGO_MOODS[options.mood]?.some(t=>dest.categories.includes(t)))reasons.push('Una idea para '+options.mood.toLowerCase());
  if(fits)reasons.push('Estadía y actividades dentro de tu presupuesto estimado');
  if(season)reasons.push('Coincide con una época orientativa para visitarlo');
  const score=affinity*100+(fits?30:-20)+(season?7:0);
  return {dest,score,cost,fits,season,reasons};
}
ranked=function(){return MYSTIGO_DESTINATIONS.map(d=>recommendation(d)).sort((a,b)=>b.score-a.score||a.dest.name.localeCompare(b.dest.name)).map(r=>r.dest);};

function countryLabel(dest){return `${dest.region}, ${dest.country}`;}
function photoCredit(dest){const c=dest.photoCredit;if(!c)return '';return `<p class="photo-credit">Foto: ${esc(c.author)} · <a href="${esc(c.source)}" target="_blank" rel="noopener noreferrer">${esc(c.license)}</a></p>`;}
card=function(d){
  const saved=state.favorites.includes(d.id);
  return `<article class="destination-card"><div class="card-image-wrap"><a href="#destino/${d.id}" aria-label="Descubrir ${esc(d.name)}"><img class="card-photo" src="${d.image}" alt="${esc(d.photo)}" loading="lazy"></a><span class="card-tag">${esc(d.country)}</span><button class="favorite-button ${saved?'saved':''}" data-action="favorite" data-id="${d.id}" aria-label="${saved?'Quitar':'Guardar'} ${esc(d.name)} ${saved?'de':'en'} favoritos" aria-pressed="${saved}">${icon('heart')}</button></div><div class="card-body"><div class="card-place">${icon('pin')}${esc(countryLabel(d))}</div><a href="#destino/${d.id}"><h3 class="card-title">${esc(d.name)}</h3></a><p>${esc(d.description)}</p><div class="card-bottom"><span>Referencia diaria en destino<br><strong>${money(d.daily)}</strong> / persona</span><a href="#destino/${d.id}" class="round-arrow" aria-label="Ver ${esc(d.name)}">${icon('search')}</a></div></div></article>`;
};
function countryCard(c){const d=destination(c.featured),count=MYSTIGO_DESTINATIONS.filter(x=>x.countryCode===c.code).length;return `<article class="country-card"><a href="#explorar?pais=${c.code}" aria-label="Explorar ${esc(c.name)}"><img src="${d.image}" alt="${esc(d.photo)}" loading="lazy"><div class="country-overlay"><span>${esc(c.continent)}</span><h3>${esc(c.name)}</h3><p>${count} ${count===1?'destino para descubrir':'destinos para descubrir'}</p></div></a></article>`;}
function surprisePanel(){return `<section class="surprise-panel"><div class="surprise-art">${icon('plane')}<span>✦</span></div><div><div class="eyebrow">TÚ PONES LAS GANAS. MYSTIGO PREPARA EL VIAJE.</div><h2>Hoy tengo ganas de viajar.<br>¿Qué me prepara Mystigo?</h2><p>Registra una sola vez tus gustos y tu presupuesto. Después, un botón basta para recibir varias propuestas con el recorrido completo.</p>${preferenceSummary()}<p class="surprise-note">Estadía y actividades estimadas. Vuelos y pasajes hacia el destino se calculan aparte.</p></div><div class="surprise-actions"><button class="button yellow" data-action="surprise-now">Prepárame un viaje sorpresa</button><button class="text-link" data-action="surprise-weekend">Quiero viajar este fin de semana</button><a class="text-link" href="#preferencias?volver=itinerarios">${hasTravelPreferences()?'Mis gustos y presupuesto':'Registrar mis gustos y presupuesto'}</a></div></section>`;}
home=function(){
 const first=state.profile?.name?.split(' ')[0];
 const ideas=hasTravelPreferences()?surpriseCandidates().slice(0,3).map(r=>r.dest):[];
 return `${title('EL VIAJE EMPIEZA CON TUS GANAS',first?`Hola, ${esc(first)}. Déjate sorprender.`:'Tu próxima historia puede ser una sorpresa.','Tus gustos y tu presupuesto se registran una vez. Mystigo se encarga de proponerte el resto.')}<section class="hero"><img class="hero-image" src="cusco.jpg" alt="Machu Picchu entre las montañas de Cusco"><div class="hero-copy"><span class="hero-label">DE PERÚ AL MUNDO</span><h2>Menos decisiones.<br>Más <em>historias</em><br>por vivir.</h2><p>Playa, aventura, cultura o naturaleza: un viaje que conecte con tu forma de disfrutar.</p><button class="button yellow" data-action="surprise-now">Prepárame un viaje sorpresa</button></div><div class="hero-world-badge"><strong>30</strong><span>países<br>por descubrir</span></div></section>${surprisePanel()}${ideas.length?`<div class="section-heading"><div><h2>Inspiración que se parece a ti.</h2><p>Estas ideas conectan con tus intereses y tu presupuesto. Pulsa el botón para recibir los viajes preparados.</p></div></div><div class="card-grid">${ideas.map(card).join('')}</div>`:''}<section class="panel automatic-explanation"><h2>Tu perfil se registra una vez. Las sorpresas continúan.</h2><p>Guarda tus gustos, preferencias y presupuesto en una sola sección. Cuando te apetezca viajar, Mystigo te prepara varias opciones y organiza las actividades por día. Puedes volver a pedir propuestas y conservar el viaje que más te guste.</p><a class="text-link" href="#preferencias?volver=itinerarios">Revisar mis preferencias</a><a class="text-link" href="#explorar">Conocer el catálogo de 30 países</a></section><p class="storage-note">Presupuestos orientativos en PEN para estadía y actividades; no incluyen vuelos, pasajes hacia el destino ni reservas especiales. Servicio de planificación: S/ 15, pendiente de coordinación y pago.</p>`;
};

exploreView=function(params){
 const country=WORLD_COUNTRIES.find(c=>c.code===params.get('pais'));
 explore={q:'',category:'Todos',zone:'Todas',country:country?.code||'Todos',budget:'Todos',view:country?'destinos':'paises'};
 return `${title('EL MUNDO DE MYSTIGO',country?esc(country.name):'30 países para inspirarte.',hasTravelPreferences()?'Aquí puedes conocer el catálogo. Tus viajes sorpresa se preparan automáticamente con las preferencias que ya guardaste.':'Aquí puedes conocer el catálogo. Cuando guardes tus gustos y presupuesto, Mystigo preparará tus viajes sorpresa automáticamente.')}<section class="planner-surprise"><div><h2>Tu viaje lo prepara Mystigo.</h2><p>No necesitas elegir país, región ni destino para recibir tus propuestas.</p></div><button class="button yellow" data-action="surprise-now">Prepárame un viaje sorpresa</button></section>${country?'<a class="back-link" href="#explorar">Volver a los 30 países</a>':'<div class="catalog-tabs" role="group" aria-label="Ver catálogo"><button data-action="catalog-view" data-view="paises">Países</button><button data-action="catalog-view" data-view="destinos">Todos los destinos</button></div>'}<p class="results-count" id="results-count"></p><div id="explore-results"></div><p class="storage-note">Importes orientativos para estadía y actividades en destino. No incluyen vuelos o pasajes. Las fichas mantienen fotografías, actividades y fuentes turísticas.</p>`;
};
updateExplore=function(){
 if(!$('#explore-results'))return;
 const matches=MYSTIGO_DESTINATIONS.filter(d=>explore.country==='Todos'||d.countryCode===explore.country),countries=WORLD_COUNTRIES.filter(c=>matches.some(d=>d.countryCode===c.code)),countryView=explore.view==='paises';
 $('#results-count').textContent=countryView?`${countries.length} países en el catálogo`:`${matches.length} destinos para conocer`;
 $('#explore-results').className=countryView?'country-grid':'card-grid';
 $('#explore-results').innerHTML=countryView?countries.map(countryCard).join(''):matches.map(card).join('');
 $$('[data-action="catalog-view"]').forEach(b=>{const active=b.dataset.view===explore.view;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
};

details=function(d){let html=priorDetails(d);html=html.replace('<section class="panel"><div class="eyebrow">DÉJATE SORPRENDER',`<section class="panel">${photoCredit(d)}<div class="eyebrow">DÉJATE SORPRENDER`);html=html.replace('Agrega tus lugares preferidos y úsalos al planificar tu recorrido.','Conoce algunas experiencias del catálogo. Mystigo organiza automáticamente las actividades en tus viajes sorpresa.').replace(/<button class="add-activity[^>]*>[\s\S]*?<\/button>/g,'').replace(/<a href="#itinerarios\?destino=[^>]+>Crear mi itinerario[^<]*(?:<[^>]+>[^<]*<\/[^>]+>)?<\/a>/g,'<button class="button" data-action="surprise-now">Preparar mis viajes sorpresa</button>');return html;};

function travelPreferenceFields(draft){const p=draft||travelDefaults();return `<fieldset class="preference-fieldset travel-preferences"><legend>Tus gustos y presupuesto, en un solo lugar</legend><div class="form-grid"><div class="field"><label for="pref-trip-budget">Presupuesto del grupo en destino (S/)</label><input id="pref-trip-budget" name="tripBudget" type="number" min="50" max="1000000" step="1" value="${p.tripBudget}" required></div><div class="field"><label for="pref-trip-days">Días de viaje</label><select id="pref-trip-days" name="tripDays">${[1,2,3,4,5,6,7].map(n=>`<option value="${n}" ${n===p.tripDays?'selected':''}>${n} ${n===1?'día':'días'}</option>`).join('')}</select></div><div class="field"><label for="pref-people">Viajeros</label><input id="pref-people" name="people" type="number" min="1" max="20" value="${p.people}" required></div><div class="field"><label for="pref-travel-date">Fecha preferida para viajar</label><input id="pref-travel-date" name="travelDate" type="date" value="${p.travelDate}" min="${today()}"></div><div class="field"><label for="pref-mood">¿Qué te apetece en este viaje?</label><select id="pref-mood" name="mood">${Object.keys(MYSTIGO_MOODS).map(m=>`<option ${m===p.mood?'selected':''}>${m}</option>`).join('')}</select></div></div><div class="notice spacer-top">El presupuesto es para estadía y actividades. Los vuelos o pasajes para llegar al destino se calculan aparte. La fecha ayuda a priorizar épocas orientativas; no es un pronóstico del tiempo.</div></fieldset>`;}
preferencesView=function(params){return priorPreferencesView(params).replace('<div class="form-actions">',travelPreferenceFields()+'<div class="form-actions">').replace('Hay un Perú','Hay un mundo').replace('Elige tus intereses y descubre destinos que van contigo.','Registra aquí tus gustos, preferencias y presupuesto una sola vez. Luego Mystigo preparará tus opciones automáticamente.');};

planner=function(){
 if(!hasTravelPreferences())return `${title('PRIMERO TE CONOCEMOS. DESPUÉS TE SORPRENDEMOS.','Una sola vez: tus gustos y presupuesto.','Mystigo necesita conocerte para preparar opciones que se parezcan a ti.')}<section class="panel automatic-intro"><h2>Tu próxima escapada empieza aquí.</h2><p>Registra tus preferencias en una sola sección. Después podrás pulsar un botón y recibir varias propuestas completas sin elegir país, región o destino.</p><a class="button yellow" href="#preferencias?volver=itinerarios">Registrar mis gustos y presupuesto</a></section>${savedPlans()}`;
 const batch=prepareSurpriseOffers(),p=batch.options;
 return `${title('TUS GANAS DE VIAJAR, CON TODO PREPARADO',batch.plans.length?'Mystigo preparó estas opciones para ti.':'Ajustemos tu presupuesto de viaje.',batch.mode==='weekend'?'Escapadas de hasta dos días para este sábado, según tus gustos y presupuesto.':'Destinos y recorridos preparados con tus preferencias guardadas.')}<section class="panel automatic-summary"><div><h2>Tus preferencias ya están guardadas.</h2>${preferenceSummary()}<p>Salida propuesta: ${dateLabel(p.travelDate)} · ${p.tripDays} día(s) · ${p.people} viajero(s).</p></div><a class="text-link" href="#preferencias?volver=itinerarios">Editar mis preferencias</a></section>${batch.plans.length?`<div class="surprise-offers">${batch.plans.map(surpriseOfferCard).join('')}</div><p class="storage-note">${batch.plans.length===3?'Tres propuestas distintas':`Hay ${batch.plans.length} propuesta(s) compatibles en el catálogo`}. Todas respetan el presupuesto estimado de estadía y actividades. Vuelos y pasajes hacia el destino se cotizan aparte.</p><div class="form-actions"><button class="button" data-action="surprise-more">Preparar otras opciones</button><button class="button outline" data-action="surprise-weekend">Para este fin de semana</button></div>`:`<section class="panel automatic-intro"><h2>Queremos proponerte algo que sí encaje contigo.</h2><p>No hay opciones del catálogo que coincidan con tus gustos y con ${money(p.tripBudget)} para ${p.tripDays} días y ${p.people} viajero(s). Puedes actualizar tu presupuesto, duración o intereses en la misma sección de preferencias.</p><a class="button yellow" href="#preferencias?volver=itinerarios">Revisar mis preferencias</a></section>`}<section class="notice spacer-top">Mystigo organiza el recorrido automáticamente. Los importes son estimaciones para comparar; no confirman disponibilidad, pagos ni reservas. Servicio de planificación por separado: S/ 15.</section><div id="saved-plans">${savedPlans()}</div>`;
};
function surpriseOfferCard(plan){const d=destination(plan.dest);return `<article class="panel surprise-offer"><img src="${d.image}" alt="${esc(d.photo)}" loading="lazy"><div class="surprise-offer-body"><span class="pill">${esc(d.country)}</span><h2>${esc(d.name)} te espera.</h2><p>${esc(d.description)}</p><ul>${plan.reasons.slice(0,3).map(reason=>`<li>${esc(reason)}</li>`).join('')}</ul><p class="offer-date">${dateLabel(plan.date)} · ${plan.days.length} días · ${plan.people} viajero(s)</p><div class="offer-cost"><span>Estimado del grupo en destino</span><strong>${money(plan.cost.total)}</strong><small>Dentro de tus ${money(plan.budget)}</small></div><button class="button yellow" data-action="choose-surprise" data-id="${plan.id}">Ver mi viaje preparado a ${esc(d.name)}</button></div></article>`;}

function buildItinerary(spec){
  const dest=destination(spec.dest),days=Number(spec.days),people=Number(spec.people),budget=Number(spec.budget),date=String(spec.date||'');
  if(!dest||!Number.isInteger(days)||days<1||days>7||!Number.isInteger(people)||people<1||people>20||!Number.isFinite(budget)||budget<50||budget>1000000||!/^\d{4}-\d{2}-\d{2}$/.test(date)||date<today())return null;
  const interests=Array.isArray(spec.interests)?spec.interests:[],chosen=state.selected.filter(k=>k.startsWith(dest.id+'|')),mood=MYSTIGO_MOODS[spec.mood]||[];
  const order=dest.blocks.map((_,i)=>i),score=i=>dest.blocks[i].tags.filter(t=>interests.includes(t)||mood.includes(t)).length+chosen.filter(k=>Number(k.split('|')[1])===i).length*20;
  order.splice(1,order.length-1,...order.slice(1).sort((a,b)=>score(b)-score(a)));
  const plans=Array.from({length:days},(_,i)=>{const index=order[i],b=dest.blocks[index];return b?{title:b.title,block:index,full:!!b.full,extra:!!b.extra,items:b.items.map(a=>({time:a[0],name:a[1],note:a[2]}))}:{title:'Un día a tu ritmo',block:null,full:false,extra:false,items:[{time:'10:00',name:'Tiempo libre en '+dest.name,note:'Consulta una experiencia local según tus intereses y disponibilidad.'},{time:'13:00',name:'Almuerzo y descanso',note:'Elige según tu presupuesto.'},{time:'16:00',name:'Paseo por '+dest.name,note:'Deja margen para desplazamientos y descanso.'}]};});
  return {id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),dest:dest.id,date,people,budget,style:spec.style||'Moderado',mood:spec.mood||'Descansar',interests,days:plans,cost:tripEstimate(dest,days,people,spec.style),status:'preview',created:new Date().toISOString(),surprise:!!spec.surprise,reasons:spec.reasons||[],omitted:chosen.filter(k=>!plans.some(d=>d.block===Number(k.split('|')[1]))).map(k=>{const [,b,i]=k.split('|');return dest.blocks[b]?.items[i]?.[1];}).filter(Boolean)};
}
function publishLocalPlan(plan){if(!plan){toast('Revisa los datos de tu viaje.');return;}currentPlan=plan;saveCurrent(false);log('itinerario_creado',destination(plan.dest).name);navigate('plan/'+plan.id);}
createPlan=function(form){const f=new FormData(form);publishLocalPlan(buildItinerary({dest:f.get('dest'),date:f.get('date'),days:Number(f.get('days')),people:Number(f.get('people')),budget:Number(f.get('budget')),style:f.get('style'),mood:f.get('mood')||'Descansar',interests:$$('#plan-interests .choice[aria-pressed="true"]').map(b=>b.dataset.value)}));};
function surpriseCandidates(options=travelDefaults()){
 const types=state.prefs.types||[],activities=state.prefs.activities||[];
 const preferred=types.length?types:activities.flatMap(tag=>tag==='Caminatas'?['Naturaleza']:tag==='Deportes extremos'?['Aventura']:[tag]);
 return MYSTIGO_DESTINATIONS.filter(d=>!preferred.length||d.categories.some(tag=>preferred.includes(tag))).map(d=>recommendation(d,options)).filter(r=>r.fits).sort((a,b)=>b.score-a.score||a.cost.total-b.cost.total);
}
function surpriseSignature(options,mode){return JSON.stringify({options,mode,types:state.prefs.types,activities:state.prefs.activities});}
function prepareSurpriseOffers(force=false,mode=state.surpriseOffers?.mode||'saved'){
 if(!hasTravelPreferences())return null;
 const p=travelDefaults(),options=mode==='weekend'?{...p,travelDate:nextWeekendDate(),tripDays:Math.min(2,p.tripDays)}:p,signature=surpriseSignature(options,mode);
 const previous=state.surpriseOffers;
 if(!force&&previous?.signature===signature&&Array.isArray(previous.plans)&&previous.plans.every(plan=>destination(plan.dest)&&plan.date>=today()))return previous;
 const candidates=surpriseCandidates(options),oldIds=new Set(force?previous?.plans?.map(plan=>plan.dest)||[]:[]);
 const fresh=candidates.filter(r=>!oldIds.has(r.dest.id)&&!state.surpriseHistory.includes(r.dest.id));
 const pool=[...fresh,...candidates.filter(r=>!fresh.includes(r))];
 const plans=pool.slice(0,3).map(chosen=>buildItinerary({dest:chosen.dest.id,date:options.travelDate,days:options.tripDays,people:options.people,budget:options.tripBudget,style:options.budget,mood:options.mood,interests:[...state.prefs.types,...state.prefs.activities],surprise:true,reasons:chosen.reasons})).filter(Boolean);
 const batch={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),signature,options,mode,plans};state.surpriseOffers=batch;persist();return batch;
}
function generateSurprise(mode='saved'){
 if(!hasTravelPreferences()){navigate('preferencias?volver=itinerarios');toast('Registra tus gustos y presupuesto una vez. Mystigo preparará el resto.');return;}
 const batch=prepareSurpriseOffers(true,mode);
 if(batch.plans.length)addNotice({id:'offers:'+batch.id,type:'idea',title:'Tus viajes sorpresa están preparados',body:`${batch.plans.length} opciones según tus gustos y presupuesto. Descubre qué escapada te espera.`,route:'itinerarios'},true);
 navigate('itinerarios');
}
function chooseSurprise(id){
 if(!hasTravelPreferences()){generateSurprise();return;}
 const batch=state.surpriseOffers,plan=batch?.plans?.find(p=>p.id===id);
 if(!plan||batch.signature!==surpriseSignature(batch.options,batch.mode)||plan.date<today()){toast('Vamos a actualizar tus propuestas.');generateSurprise();return;}
 // Discard offers if stored preferences changed before choosing.
 const expected=batch.mode==='weekend'?{...travelDefaults(),travelDate:nextWeekendDate(),tripDays:Math.min(2,travelDefaults().tripDays)}:travelDefaults();
 if(batch.signature!==surpriseSignature(expected,batch.mode)){generateSurprise(batch.mode);return;}
 state.surpriseHistory=[plan.dest,...state.surpriseHistory.filter(dest=>dest!==plan.dest)].slice(0,12);persist();publishLocalPlan(plan);
}

planView=function(p){const d=destination(p.dest);const extra=p.surprise?`<section class="surprise-reveal"><span class="pill">Tu viaje sorpresa</span><h2>Tu próxima historia te espera en ${esc(d.name)}.</h2><p>${esc(d.country)} · Elegido para ${esc(p.mood.toLowerCase())}.</p><ul>${p.reasons.map(r=>`<li>${esc(r)}</li>`).join('')}</ul><p class="storage-note">${money(p.cost.total)} estimados en destino para el grupo. Vuelos o pasajes hacia el destino no incluidos. Las épocas sugeridas son orientativas, no información meteorológica en vivo.</p><button class="button outline small" data-action="surprise-again">Ver otras opciones preparadas</button></section>`:'';return extra+priorPlanView(p)+`<div class="form-actions no-print"><button class="button outline" data-action="calendar-plan">${icon('clock')}Añadir recordatorio al calendario</button></div>`;};

function addNotice(notice,device=false){
  if(!state.notificationPrefs.inApp||state.notifications.some(n=>n.id===notice.id))return;
  const item={...notice,read:false,at:new Date().toISOString()};state.notifications.unshift(item);state.notifications=state.notifications.slice(0,60);persist();updateNotificationBadge();
  void MystigoSound.play({queue:true});
  if(device&&state.notificationPrefs.device&&typeof Notification!=='undefined'&&Notification.permission==='granted')showDeviceNotice(item);
}
function updateNotificationBadge(){const count=state.notifications.filter(n=>!n.read).length,b=$('#notification-count'),button=$('#notification-button');if(b){b.textContent=count>9?'9+':String(count);b.hidden=!count;}if(button)button.setAttribute('aria-label',`Notificaciones${count?', '+count+' sin leer':''}`);}
function notificationSoundControls(id){return `<div class="spacer-top"><label class="checkbox-line"><input id="${id}" data-notification-sound type="checkbox" ${state.notificationPrefs.sound?'checked':''}> Sonido de notificaciones</label><button class="button outline small spacer-top" data-action="test-notification-sound">Probar sonido</button><p class="storage-note">Dos notas suaves para avisos nuevos mientras usas Mystigo. Toca la app para habilitar el audio; puedes silenciarlo aquí. El sonido de los avisos del sistema depende de tu dispositivo.</p></div>`;}
function openNotifications(){
  const notices=state.notifications;
  openModal(`<div class="eyebrow">UN PEQUEÑO IMPULSO PARA TU PRÓXIMA HISTORIA</div><h2>Tus notificaciones.</h2><p>Ideas personalizadas y avisos de tus viajes guardados.</p><div class="notification-list">${notices.length?notices.slice(0,20).map(n=>`<article class="notification-item ${n.read?'':'unread'}"><span class="notification-symbol">${icon(n.type==='trip'?'clock':'bell')}</span><div><h3>${esc(n.title)}</h3><p>${esc(n.body)}</p><small>${new Date(n.at).toLocaleDateString('es-PE')}</small>${n.route?`<button class="text-link" data-action="open-notice" data-id="${esc(n.id)}">${n.type==='idea'&&n.route==='itinerarios'?'Preparar mi sorpresa':'Ver detalle'}</button>`:''}</div></article>`).join(''):'<div class="notice">Todavía no tienes avisos. Guarda un itinerario o actualiza tus preferencias para recibir ideas aquí.</div>'}</div><div class="form-actions"><button class="button outline small" data-action="read-notices">Marcar todas como leídas</button><button class="button small" data-action="enable-device-notifications">Activar avisos del dispositivo</button></div><p class="storage-note">Los avisos se generan al entrar o mientras usas Mystigo. Para recordatorios con la app cerrada, añade tu viaje al calendario. El sistema o navegador puede limitar los avisos del dispositivo.</p>${notificationSoundControls('inbox-sound')}`);
  $('#notification-button')?.setAttribute('aria-expanded','true');
}
async function showDeviceNotice(item){try{const registration=notificationWorker||await navigator.serviceWorker.getRegistration('./');if(!registration?.active)return false;await registration.showNotification(item.title,{body:item.body,icon:'logo.png',badge:'logo.png',tag:item.id,silent:state.notificationPrefs.sound===false||document.visibilityState==='visible',data:{url:'./#'+safeReturn(item.route||'inicio')}});return true;}catch{return false;}}
async function enableDeviceNotifications(){
  if(!('Notification' in window)||!('serviceWorker' in navigator)){toast('Este navegador no admite avisos del dispositivo. La campana de Mystigo seguirá disponible.');return;}
  if(Notification.permission==='denied'){toast('Los avisos están bloqueados. Puedes revisar el permiso del sitio en tu navegador.');return;}
  try{const permission=await Notification.requestPermission();state.notificationPrefs.device=permission==='granted';persist();if(permission!=='granted'){toast('Puedes seguir usando las notificaciones dentro de Mystigo.');return;}
    if(!notificationWorker)notificationWorker=await navigator.serviceWorker.register('./sw.js',{scope:'./'});
    const registration=await Promise.race([navigator.serviceWorker.ready,new Promise(resolve=>setTimeout(()=>resolve(null),6000))]);
    if(registration)notificationWorker=registration;
    const shown=await showDeviceNotice({title:'Mystigo te acompaña',body:'Los avisos del dispositivo están activados mientras usas Mystigo.',id:'device-enabled',route:'inicio'});
    toast(shown?'Avisos del dispositivo activados.':'Permiso concedido. Los avisos estarán disponibles cuando el navegador active el servicio.');
  }catch{toast('No se pudo activar el aviso del dispositivo. Puedes usar la campana de Mystigo.');}
}
function localReminders(){
  state.plans.forEach(p=>{const days=Math.round((new Date(p.date+'T12:00:00')-new Date(today()+'T12:00:00'))/86400000);if(days>=0&&days<=2)addNotice({id:`trip:${p.id}:${today()}`,type:'trip',title:days===0?'Tu viaje empieza hoy':'Tu próxima aventura se acerca',body:`${destination(p.dest).name} · ${days===0?'revisa tu itinerario':'faltan '+days+' día(s)'}. Confirma tus reservas con los proveedores.`,route:'plan/'+p.id},true);});
  const p=travelDefaults(),interests=state.prefs.types.join(' y ').toLowerCase();
  const messages=hasTravelPreferences()?[['Tu próxima escapada te está esperando',`¿Te apetece disfrutar de ${interests||p.mood.toLowerCase()}? Mystigo prepara varias opciones según tus gustos y presupuesto.`],['Este fin de semana puede tener otra historia','Haz espacio para una escapada. Pulsa y descubre los viajes que Mystigo puede preparar para ti.'],['Tus ganas de viajar ya tienen un punto de partida',`Con tu presupuesto de ${money(p.tripBudget)} en destino, descubre propuestas que conecten contigo.`]]:[['Tu próxima historia empieza con tus gustos','Cuéntanos una vez qué disfrutas y cuánto puedes destinar al viaje. Mystigo preparará tus próximas sorpresas.']];
  const item=messages[Math.floor(new Date(today()+'T12:00:00').getTime()/86400000)%messages.length];
  addNotice({id:'motivation:'+today()+':'+(hasTravelPreferences()?'ready':'setup'),type:'idea',title:item[0],body:item[1],route:'itinerarios'},true);
}
log=function(type,detail){priorLog(type,detail);const d=MYSTIGO_DESTINATIONS.find(x=>x.name===detail);if(type==='destino_guardado'&&d){d.categories.forEach(tag=>state.affinity[tag]=Math.min(12,(state.affinity[tag]||0)+1));persist();}
  if(type==='itinerario_creado'&&currentPlan)addNotice({id:'plan:'+currentPlan.id,type:'trip',title:currentPlan.surprise?'Tu viaje sorpresa está preparado':'Tu itinerario está preparado',body:`${detail} · ${currentPlan.days.length} días. Puedes revisarlo, descargarlo o añadirlo al calendario.`,route:'plan/'+currentPlan.id},true);
  if(type==='solicitud_pendiente'&&currentPlan)addNotice({id:'request:'+currentPlan.id,type:'trip',title:'Solicitud guardada en este dispositivo',body:'La coordinación y el pago siguen pendientes. Puedes compartir el resumen por correo.',route:'confirmacion/'+currentPlan.id},true);
  if(type==='preferencias_actualizadas'){state.surpriseOffers=null;persist();}if(type==='preferencias_actualizadas'){addNotice({id:'preferences:'+Date.now(),type:'idea',title:'Tus recomendaciones ya tienen tu estilo',body:'Actualizamos las propuestas según tus gustos, presupuesto y lo que te apetece en este viaje.',route:'itinerarios'});localReminders();}
};

function calendarPlan(){if(!currentPlan)return;const p=currentPlan,date=p.date.replaceAll('-',''),end=datePlus(p.date,p.days.length).replaceAll('-','');const escapeICS=s=>String(s).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z/,'Z');const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//MYSTIGO//Viajes//ES','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:'+p.id+'@mystigo','DTSTAMP:'+stamp,'DTSTART;VALUE=DATE:'+date,'DTEND;VALUE=DATE:'+end,'SUMMARY:'+escapeICS('Mi viaje a '+destination(p.dest).name),'DESCRIPTION:'+escapeICS('Revisa tus reservas y tu itinerario de Mystigo. Presupuesto orientativo en destino: '+money(p.cost.total)+'. Vuelos y reservas especiales no incluidos.'),'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:Revisar mi viaje de Mystigo','TRIGGER:-P1D','END:VALARM','END:VEVENT','END:VCALENDAR'];download('Mystigo_recordatorio.ics',lines.join('\r\n')+'\r\n','text/calendar;charset=utf-8');toast('Abre el archivo descargado y guárdalo en tu calendario para recibir el recordatorio.');}

function applyAppearance(choice='system',save=false){appearanceChoice=['system','light','dark'].includes(choice)?choice:'system';const dark=appearanceChoice==='dark'||appearanceChoice==='system'&&systemAppearance?.matches;document.documentElement.dataset.theme=dark?'dark':'light';document.documentElement.style.colorScheme=dark?'dark':'light';const meta=$('meta[name="theme-color"]');if(meta)meta.setAttribute('content',dark?'#0a1224':'#0849d1');$$('[data-theme-select]').forEach(s=>s.value=appearanceChoice);if(save)try{localStorage.setItem(MYSTIGO_THEME_KEY,appearanceChoice);}catch{toast('El modo se aplicó, pero el navegador no permitió guardarlo.');}}
function renderEnhancements(){
  updateNotificationBadge();$$('[data-theme-select]').forEach(s=>s.value=appearanceChoice);
  const profileButton=$('#header-profile');if(profileButton)profileButton.innerHTML=state.profile?`Hola, ${esc(state.profile.name.split(' ')[0])} ${icon('user')}`:'Crear mi perfil';
}
function notificationSettings(){return `<section class="panel preferences-settings"><h2>Tu experiencia en Mystigo.</h2><div class="settings-grid"><div class="field"><label for="profile-theme">Apariencia</label><select id="profile-theme" data-theme-select><option value="system">Según mi dispositivo</option><option value="light">Modo claro</option><option value="dark">Modo oscuro</option></select><p>El modo automático cambia con la configuración de tu celular o navegador.</p></div><div><h3>Avisos de viaje</h3><label class="checkbox-line"><input id="in-app-notifications" type="checkbox" ${state.notificationPrefs.inApp?'checked':''}> Recibir avisos en la campana de Mystigo</label><button class="button outline small spacer-top" data-action="enable-device-notifications">Activar avisos del dispositivo</button><p class="storage-note">El navegador te pedirá permiso. Los avisos se generan al abrir la app o mientras la usas. Para recordatorios con la app cerrada, utiliza el calendario.</p>${notificationSoundControls('profile-sound')}</div></div></section>`;}
profileView=function(){return priorProfileView()+`<section class="panel spacer-top"><div class="section-heading" style="margin-top:0"><div><h2>Tu próximo viaje sorpresa.</h2><p>${hasTravelPreferences()?'Con tus preferencias guardadas, Mystigo puede elegir por ti.':'Registra tus gustos y presupuesto para recibir nuevas propuestas.'}</p></div><a class="text-link" href="#preferencias?volver=perfil">${hasTravelPreferences()?'Editar':'Registrar mis preferencias'}</a></div>${preferenceSummary()}<button class="button yellow spacer-top" data-action="surprise-now">Prepárame un viaje sorpresa</button></section>${notificationSettings()}`;};
helpView=function(){return priorHelpView().replace('Una aplicación para descubrir destinos turísticos del Perú','Una aplicación para descubrir destinos turísticos de 30 países').replace('Esta versión organiza las sugerencias a partir de tus preferencias y un catálogo de rutas. No utiliza un servicio de inteligencia artificial externo.','Mystigo calcula la afinidad entre tus preferencias, favoritos y destinos. Considera presupuesto, fecha y lo que te apetece para preparar viajes sorpresa. El recomendador funciona en tu dispositivo; no utiliza un servicio generativo externo.')+`<section class="panel spacer-top"><h2>Tu experiencia de viajes sorpresa.</h2><details class="faq"><summary>¿Tengo que elegir país o completar otro formulario?</summary><p>No. Tus gustos, preferencias y presupuesto se registran una sola vez en Preferencias de viaje. Después pulsa «Prepárame un viaje sorpresa» y Mystigo prepara hasta tres opciones completas. El botón para este fin de semana usa el próximo sábado y hasta dos días. Si solo hay una o dos opciones compatibles con tus gustos y presupuesto, verás únicamente esas.</p></details><details class="faq"><summary>¿El viaje sorpresa respeta mi presupuesto?</summary><p>Se elige entre propuestas cuyo estimado para estadía y actividades cabe en el presupuesto del grupo. Los vuelos y pasajes hacia el destino, así como las reservas especiales, se pagan aparte y deben verificarse.</p></details><details class="faq"><summary>¿Los avisos llegan con la app cerrada?</summary><p>La campana reúne avisos locales. Con permiso, Mystigo también puede mostrar avisos del dispositivo cuando se generan al abrir o usar la app. No existe un servidor de notificaciones push ni envío automático con la web cerrada. Para un recordatorio futuro, descarga el archivo de calendario desde tu itinerario y guárdalo en tu calendario.</p></details><details class="faq"><summary>¿La temporada es información en vivo?</summary><p>No. La fecha ayuda a priorizar meses orientativos de viaje del catálogo. Confirma clima, accesos y disponibilidad antes de reservar. No se ofrecen pronósticos ni ofertas comerciales en tiempo real.</p></details></section>`;};

document.addEventListener('click',event=>{
  const b=event.target.closest('[data-action]');if(!b)return;const action=b.dataset.action;
  if(action==='catalog-view'){explore.view=b.dataset.view;updateExplore();}
  else if(action==='restart-preferences')restartTravelPreferences();
  else if(action==='surprise-now')generateSurprise();
  else if(action==='surprise-again'||action==='surprise-more')generateSurprise(state.surpriseOffers?.mode||'saved');
  else if(action==='surprise-weekend')generateSurprise('weekend');
  else if(action==='choose-surprise')chooseSurprise(b.dataset.id);
  else if(action==='notifications')openNotifications();
  else if(action==='read-notices'){state.notifications.forEach(n=>n.read=true);persist();openNotifications();updateNotificationBadge();}
  else if(action==='open-notice'){const n=state.notifications.find(x=>x.id===b.dataset.id);if(n){n.read=true;persist();navigate(safeReturn(n.route));}}
  else if(action==='enable-device-notifications')enableDeviceNotifications();
  else if(action==='test-notification-sound')MystigoSound.play({preview:true}).then(played=>toast(played?'Este es el sonido de Mystigo.':'No se pudo reproducir. Revisa el volumen y los permisos de audio del navegador.'));
  else if(action==='calendar-plan')calendarPlan();
  else if(action==='close-and-preferences')navigate('preferencias?volver=inicio');
  else if(action==='confirm-reset'){state.notifications=[];state.notificationPrefs={inApp:true,device:false,sound:true};MystigoSound.stop();state.affinity={};state.surpriseHistory=[];state.surpriseOffers=null;try{localStorage.removeItem(MYSTIGO_THEME_KEY);}catch{}applyAppearance('system');persist();localReminders();}
});
document.addEventListener('change',event=>{
  const el=event.target;
  if(el.matches('[data-theme-select]'))applyAppearance(el.value,true);
  else if(el.matches('[data-notification-sound]')){state.notificationPrefs.sound=el.checked;persist();if(!el.checked)MystigoSound.stop();$$('[data-notification-sound]').forEach(input=>input.checked=el.checked);toast(el.checked?'Sonido de Mystigo activado.':'Sonido de Mystigo desactivado.');}
  else if(el.id==='in-app-notifications'){state.notificationPrefs.inApp=el.checked;persist();toast(el.checked?'Avisos de la campana activados.':'No se generarán nuevos avisos en la campana.');}
});
$('#modal').addEventListener('close',()=>$('#notification-button')?.setAttribute('aria-expanded','false'));
if(systemAppearance?.addEventListener)systemAppearance.addEventListener('change',()=>{if(appearanceChoice==='system')applyAppearance('system');});
else if(systemAppearance?.addListener)systemAppearance.addListener(()=>{if(appearanceChoice==='system')applyAppearance('system');});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')localReminders();});
setInterval(()=>{if(document.visibilityState==='visible')localReminders();},60000);

// Backward-compatible local-data migration; existing profiles and plans remain.
state.prefs={...state.prefs,...readTravelPreferences({get:()=>null})};
state.surpriseOffers=hasTravelPreferences()&&state.surpriseOffers&&Array.isArray(state.surpriseOffers.plans)?state.surpriseOffers:null;
state.notifications=Array.isArray(state.notifications)?state.notifications.filter(n=>n&&n.id&&n.title&&n.body):[];
state.notificationPrefs={inApp:true,device:false,sound:true,...state.notificationPrefs};
state.affinity=state.affinity&&typeof state.affinity==='object'?state.affinity:{};
state.surpriseHistory=Array.isArray(state.surpriseHistory)?state.surpriseHistory.filter(id=>destination(id)):[];
try{appearanceChoice=localStorage.getItem(MYSTIGO_THEME_KEY)||'system';}catch{}
applyAppearance(appearanceChoice);
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js',{scope:'./'}).then(r=>{notificationWorker=r;}).catch(()=>{});
render();localReminders();
