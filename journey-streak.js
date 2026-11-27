'use strict';
// Travel days are self-reported. Opening the app never creates a check-in.
paths.flame='<path d="M13 3c1 5-4 5-3 9 1-2 3-2 4-4 3 3 6 6 5 10a7 7 0 0 1-14-1c0-4 3-6 4-8 0 3 1 4 2 5-1-5 3-6 2-11Z"/>';
const STREAK_GOALS=[{days:1,name:'Primera aventura'},{days:3,name:'En ruta'},{days:7,name:'Una semana viajera'},{days:14,name:'Espíritu explorador'},{days:30,name:'Sin fronteras'}];
function travelDayNumber(value){
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return null;
  const [y,m,d]=value.split('-').map(Number),time=Date.UTC(y,m-1,d);
  return new Date(time).toISOString().slice(0,10)===value?time/86400000:null;
}
function travelRecords(records=state.travelDays,reference=today()){
  const limit=travelDayNumber(reference),unique=new Map();
  if(limit===null||!Array.isArray(records))return [];
  for(const entry of records){
    const day=travelDayNumber(entry?.date);
    if(day!==null&&day<=limit&&destination(entry?.dest)&&!unique.has(entry.date))unique.set(entry.date,{date:entry.date,dest:entry.dest});
  }
  return [...unique.values()].sort((a,b)=>a.date.localeCompare(b.date));
}
function travelStreakSummary(records=state.travelDays,reference=today()){
  const days=travelRecords(records,reference),ref=travelDayNumber(reference);
  let run=0,best=0,previous=null;
  for(const entry of days){const n=travelDayNumber(entry.date);run=previous!==null&&n===previous+1?run+1:1;best=Math.max(best,run);previous=n;}
  const current=previous!==null&&previous>=ref-1?run:0;
  return {days,current,best,total:days.length,checkedToday:days.some(d=>d.date===reference),countries:new Set(days.map(d=>destination(d.dest).countryCode||destination(d.dest).country)).size};
}
function streakWeek(summary,reference=today()){
  return `<ol class="streak-week" aria-label="Tus últimos siete días">${Array.from({length:7},(_,i)=>{
    const date=datePlus(reference,i-6),done=summary.days.some(d=>d.date===date),isToday=date===reference;
    return `<li class="${done?'done ':''}${isToday?'today':''}" aria-label="${esc(dateLabel(date))}: ${done?'viaje registrado':'sin registro'}${isToday?', hoy':''}"><span>${['D','L','M','X','J','V','S'][new Date(date+'T12:00:00').getDay()]}</span><span class="streak-day">${done?icon('check'):Number(date.slice(-2))}</span><small>${isToday?'Hoy':Number(date.slice(-2))}</small></li>`;
  }).join('')}</ol>`;
}
function travelStreakView(compact=false){
  const s=travelStreakSummary(),next=STREAK_GOALS.find(g=>g.days>s.best),last=s.days.at(-1),lastDest=last&&destination(last.dest);
  const message=s.checkedToday?'Tu viaje de hoy ya cuenta. ¡Sigue creando historias!':s.current?'Un nuevo día, una nueva historia. Tu racha te espera.':'Cada aventura cuenta. Empieza tu racha con tu próximo viaje.';
  if(compact)return `<section class="streak-preview" aria-labelledby="streak-preview-title"><div class="streak-emblem">${icon('flame')}<strong>${s.current}</strong><span>${s.current===1?'día de racha':'días de racha'}</span></div><div class="streak-preview-copy"><span class="streak-kicker">TU ESPÍRITU VIAJERO</span><h2 id="streak-preview-title">Tu racha de viajes.</h2><p>${message}</p>${streakWeek(s)}</div><a class="button outline" href="#itinerarios?racha=1">${s.checkedToday?'Ver mi racha':'Registrar mi día viajero'} ${icon('arrow')}</a></section>`;
  const selected=last?.dest||currentPlan?.dest||state.favorites[0]||'cusco';
  return `<section class="streak-full" aria-label="Racha de viajes"><div class="streak-hero"><div class="streak-hero-number">${icon('flame')}<strong>${s.current}</strong><span>${s.current===1?'día consecutivo':'días consecutivos'}</span></div><div class="streak-hero-copy"><span class="streak-kicker">LUGARES NUEVOS. HISTORIAS QUE SIGUEN.</span><h2>${s.current?'Que la aventura continúe.':'Tu primera aventura enciende la racha.'}</h2><p>${message}</p><span class="streak-label">Un viaje registrado por día</span></div></div><div class="streak-stats"><div><span>${icon('flame')}</span><strong>${s.best}</strong><small>Mejor racha</small></div><div><span>${icon('map')}</span><strong>${s.total}</strong><small>Días de viaje</small></div><div><span>${icon('pin')}</span><strong>${s.countries}</strong><small>${s.countries===1?'País visitado':'Países visitados'}</small></div></div><div class="streak-detail-grid"><section class="panel streak-checkin"><div class="eyebrow">PASO A PASO, LUGAR A LUGAR</div><h2>Tu semana viajera.</h2><p>Registra los días en los que viajes. Los días consecutivos mantienen encendida tu racha.</p>${streakWeek(s)}${s.checkedToday?`<div class="streak-success" role="status">${icon('check')}<div><strong>¡Hoy ya sumaste una historia!</strong><p>${esc(lastDest.name)} · ${esc(lastDest.country)}<br>Vuelve mañana si sigues de viaje.</p></div></div>`:`<form id="travel-checkin-form"><div class="field"><label for="travel-checkin-destination">¿Dónde estás viajando hoy?</label><select id="travel-checkin-destination" name="dest" required>${[...MYSTIGO_DESTINATIONS].sort((a,b)=>a.country.localeCompare(b.country,'es')||a.name.localeCompare(b.name,'es')).map(d=>`<option value="${esc(d.id)}" ${d.id===selected?'selected':''}>${esc(d.name)} · ${esc(d.country)}</option>`).join('')}</select></div><button class="button yellow" type="submit">${icon('flame')}Registrar mi viaje de hoy</button></form>`}<p class="storage-note">El registro es personal y se guarda en este navegador. Abrir la app o crear un plan no suma un viaje. Si dejas un día sin registrar, la racha empieza de nuevo; tu mejor marca se conserva.</p></section><section class="panel streak-achievements"><div class="eyebrow">PEQUEÑAS METAS, GRANDES RECUERDOS</div><h2>Tus logros viajeros.</h2><p>${next?`Tu siguiente meta: ${next.days} ${next.days===1?'día':'días'} seguidos.`:'¡Alcanzaste todas las metas! Tu historia sigue.'}</p><div class="streak-progress" role="progressbar" aria-label="Mejor racha hacia ${next?next.days:30} días" aria-valuemin="0" aria-valuemax="${next?next.days:30}" aria-valuenow="${Math.min(s.best,next?next.days:30)}"><span style="width:${Math.min(100,Math.round(s.best/(next?next.days:30)*100))}%"></span></div><ul class="streak-badges">${STREAK_GOALS.map(g=>`<li class="${s.best>=g.days?'earned':''}"><span>${icon(s.best>=g.days?'flame':'map')}</span><div><strong>${g.name}</strong><small>${g.days} ${g.days===1?'día':'días'} consecutivos</small></div><span class="streak-badge-status">${s.best>=g.days?'✓':'Por alcanzar'}</span></li>`).join('')}</ul></section></div><section class="panel streak-history"><h2>Historias que ya suman.</h2>${s.total?`<ul>${[...s.days].reverse().slice(0,7).map(entry=>{const d=destination(entry.dest);return `<li><span class="streak-history-pin">${icon('pin')}</span><div><strong>${esc(d.name)}</strong><small>${esc(d.country)}</small></div><time datetime="${entry.date}">${esc(dateLabel(entry.date))}</time></li>`;}).join('')}</ul>`:'<p>Tu primer día de viaje aparecerá aquí cuando lo registres. No necesitas empezar con una gran escapada: también cuentan los lugares cerca de ti.</p>'}</section></section>`;
}
function recordTravelDay(destId){
  if(!destination(destId)){toast('Elige un destino del catálogo para registrar tu viaje.');return false;}
  const summary=travelStreakSummary();
  if(summary.checkedToday){toast('Tu viaje de hoy ya está registrado. Vuelve mañana para continuar.');return false;}
  state.travelDays=[...summary.days,{date:today(),dest:destId}];
  const saved=persist();render();
  const count=travelStreakSummary().current;
  toast(saved?`¡Tu viaje ya cuenta! Llevas ${count} ${count===1?'día':'días'} de racha.`:'Tu viaje cuenta en esta sesión. El navegador no permitió guardarlo para cuando vuelvas.');
  return saved;
}
const homeBeforeStreak=home,plannerBeforeStreak=planner,profileBeforeStreak=profileView,enhancementsBeforeStreak=renderEnhancements,helpBeforeStreak=helpView;
home=function(){return homeBeforeStreak().replace('</section>','</section>'+travelStreakView(true));};
planner=function(params=new URLSearchParams()){
  if(params.get('racha')==='1')return `${title('CADA VIAJE TIENE SU HISTORIA','Tu racha viajera.','Suma días de viaje, conserva tus recuerdos y supera tu mejor marca.')}${pageBack('itinerarios','Volver a mis viajes')}${travelStreakView()}`;
  return plannerBeforeStreak(params).replace('</div></div>','</div></div>'+travelStreakView(true));
};
profileView=function(){return profileBeforeStreak()+travelStreakView(true);};
helpView=function(){return helpBeforeStreak()+`<section class="panel spacer-top"><h2>Tu racha de viajes.</h2><details class="faq"><summary>¿Cómo mantengo mi racha?</summary><p>Entra en «Mi racha», elige el destino en el que estás viajando y registra tu viaje de hoy. Puedes sumar un registro por día. La racha cuenta días consecutivos, aunque sigas en el mismo destino. No hace falta comprar ni crear un itinerario.</p></details><details class="faq"><summary>¿Qué pasa si un día no viajo?</summary><p>La racha comienza de nuevo con tu próximo registro, pero conservas tu mejor marca, tus logros y tu historial. Los registros son personales: no verifican una reserva ni tu ubicación.</p></details><details class="faq"><summary>¿Reiniciar preferencias borra mi racha?</summary><p>No. Se conserva junto con tus viajes. «Borrar mis datos de este navegador» sí elimina también los registros de la racha.</p></details></section>`;};
renderEnhancements=function(){
  enhancementsBeforeStreak();
  const s=travelStreakSummary(),link=$('#header-streak'),counter=$('#header-streak-count');
  if(counter)counter.textContent=s.current;
  if(link){link.setAttribute('aria-label',`Mi racha: ${s.current} ${s.current===1?'día':'días'} consecutivos de viaje`);link.setAttribute('title','Mi racha de viajes');}
};
document.addEventListener('submit',event=>{
  if(event.target.id!=='travel-checkin-form')return;
  event.preventDefault();if(!event.target.reportValidity())return;
  recordTravelDay(new FormData(event.target).get('dest'));
});
// Refresh date-based counters when returning to the app or crossing midnight.
let lastStreakDate=today();
function refreshStreakDate(){if(lastStreakDate!==today()){lastStreakDate=today();if(['inicio','itinerarios','perfil'].includes(routeInfo().page))render();else renderEnhancements();}}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refreshStreakDate();});
setInterval(()=>{if(document.visibilityState==='visible')refreshStreakDate();},60000);
render();
