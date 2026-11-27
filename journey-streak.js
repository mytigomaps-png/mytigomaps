'use strict';
// Profiles and their streaks belong to this browser; this is not server authentication.
// Guest check-ins live only in memory: no browser storage or export can revive them.
let guestTravelDays=[];
function clearGuestTravelDays(){guestTravelDays=[];}
function streakProfiles(){return Array.isArray(state.streakProfiles)?state.streakProfiles:[];}
function currentStreakProfile(){const id=state.profile?.id;return typeof id==='string'?streakProfiles().find(p=>p.id===id)||null:null;}
function activeTravelDays(){return currentStreakProfile()?.travelDays||guestTravelDays;}
function prepareStreakProfile(name,email,previous=null){
  const cleanName=String(name||'').trim().slice(0,80),cleanEmail=String(email||'').trim().slice(0,160),key=cleanEmail.toLowerCase();
  if(!cleanName)return null;
  const profiles=streakProfiles(),active=previous?.id?profiles.find(p=>p.id===previous.id):null;
  if(key&&profiles.some(p=>p.email.toLowerCase()===key&&p.id!==active?.id)){toast('Ya existe un perfil con ese correo. Entra a tu perfil guardado para recuperar su racha.');return null;}
  const profile=active||{id:crypto.randomUUID(),name:cleanName,email:cleanEmail,travelDays:travelRecords(guestTravelDays)};
  profile.name=cleanName;profile.email=cleanEmail;
  if(!active){state.streakProfiles=[...profiles,profile];clearGuestTravelDays();}
  return {id:profile.id,name:cleanName,email:cleanEmail};
}
function initializeStreakProfiles(){
  const before=JSON.stringify({profile:state.profile,profiles:state.streakProfiles,legacy:state.travelDays}),hadProfiles=Array.isArray(state.streakProfiles),seen=new Set();
  state.streakProfiles=streakProfiles().filter(p=>p&&typeof p.id==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(p.id)&&typeof p.name==='string'&&p.name.trim()&&!seen.has(p.id)&&seen.add(p.id)).map(p=>({id:p.id,name:p.name.trim().slice(0,80),email:typeof p.email==='string'?p.email.trim().slice(0,160):'',travelDays:travelRecords(Array.isArray(p.travelDays)?p.travelDays:[])}));
  if(state.profile&&typeof state.profile.name==='string'&&state.profile.name.trim()){
    let owner=currentStreakProfile();
    if(!owner&&!state.profile.id&&state.profile.email){const email=String(state.profile.email).trim().toLowerCase();owner=streakProfiles().find(p=>p.email.toLowerCase()===email);}
    if(!owner){
      const profile=prepareStreakProfile(state.profile.name,state.profile.email);
      if(profile){state.profile={...state.profile,...profile};owner=currentStreakProfile();if(!hadProfiles&&owner)owner.travelDays=travelRecords(Array.isArray(state.travelDays)?state.travelDays:[]);}
      else state.profile=null;
    }else state.profile={id:owner.id,name:owner.name,email:owner.email};
  }else state.profile=null;
  // Old guest records have no owner and are never assigned to a newly created profile.
  delete state.travelDays;
  const after=JSON.stringify({profile:state.profile,profiles:state.streakProfiles});
  if(before!==after)persist();
}
function streakProfileLink(mode,back='itinerarios?racha=1'){return '#registro?modo='+mode+'&volver='+encodeURIComponent(back);}
function guestStreakNotice(compact=false){
  const entry=streakProfileLink('entrar'),create=streakProfileLink('nuevo');
  if(compact)return `<p class="streak-temporary-note">Tu racha es temporal: se borra al recargar o cerrar esta pestaña. <a href="${create}">Crear perfil para guardarla</a></p>`;
  return `<aside class="streak-temporary" aria-label="Racha temporal"><div><strong>Disfruta tu racha, también sin perfil.</strong><p>Puedes registrar días y ver tu historial mientras esta pestaña siga abierta. Al recargarla o cerrarla, tu racha temporal se borra. Crea un perfil para guardar lo que ya registraste y continuar después.</p></div><div class="form-actions"><a class="button small" href="${create}">Crear perfil y guardar mi racha</a><a class="text-link" href="${entry}">Entrar a mi perfil</a></div></aside>`;
}
function streakProfilePicker(params){
  const back=safeReturn(params.get('volver'),'itinerarios?racha=1'),profiles=streakProfiles();
  return `${pageBack(back,'Volver')}${title('VUELVE A TU PROPIA HISTORIA','Entra a tu perfil guardado.','Elige el mismo perfil que creaste para recuperar tu racha.')}
  <section class="panel streak-profile-picker"><h2>Perfiles de este navegador.</h2><p>Tu racha se guarda por separado en cada perfil. Esta selección abre un perfil local, sin contraseña ni sincronización con otros dispositivos.</p>${profiles.length?`<div class="streak-profile-list">${profiles.map(p=>`<button class="streak-profile-option" data-action="enter-streak-profile" data-profile-id="${esc(p.id)}" data-return="${esc(back)}"><span class="avatar">${esc(p.name.trim().slice(0,1).toUpperCase())}</span><span><strong>${esc(p.name)}</strong><small>${esc(p.email||'Perfil guardado en este navegador')}</small></span><span class="streak-profile-enter">Entrar ${icon('arrow')}</span></button>`).join('')}</div>`:'<div class="notice">Todavía no hay perfiles guardados aquí. Crea el tuyo para empezar a guardar tu racha.</div>'}<div class="form-actions"><a class="button outline" href="${streakProfileLink('nuevo',back)}">Crear otro perfil</a></div></section>`;
}
function enterStreakProfile(id,back='itinerarios?racha=1'){
  const profile=streakProfiles().find(p=>p.id===id);
  if(!profile){toast('Este perfil no está guardado en este navegador.');return false;}
  clearGuestTravelDays();
  state.profile={id:profile.id,name:profile.name,email:profile.email};
  const saved=persist();navigate(safeReturn(back,'itinerarios?racha=1'));render();
  toast(saved?`Hola, ${profile.name.split(' ')[0]}. Recuperamos la racha de tu perfil.`:'Perfil abierto en esta sesión. El navegador no permitió guardar el acceso.');
  return saved;
}
function leaveStreakProfile(){
  clearGuestTravelDays();
  state.profile=null;const saved=persist();navigate('inicio');render();
  toast(saved?'Saliste de tu perfil. Tu racha sigue guardada para cuando vuelvas a entrar.':'Saliste en esta sesión. El navegador no permitió guardar el cierre.');return saved;
}
function stateExportForCurrentProfile(){const owner=currentStreakProfile();return {...state,streakProfiles:owner?[{...owner,travelDays:[...owner.travelDays]}]:[]};}

// Travel days are self-reported. Opening the app never creates a check-in.
paths.flame='<path d="M12 22c4.4 0 8-3.1 8-7 0-2-1-5-3-7 0 3-2 4-2 4 0-4-3-9-5-10 1 4-1 6-3 8-2 2-3 4-3 6 0 3.9 3.6 6 8 6Z"/>';
const STREAK_GOALS=[{days:1,name:'Primera aventura'},{days:3,name:'En ruta'},{days:7,name:'Una semana viajera'},{days:14,name:'Espíritu explorador'},{days:30,name:'Sin fronteras'}];
function travelDayNumber(value){
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return null;
  const [y,m,d]=value.split('-').map(Number),time=Date.UTC(y,m-1,d);
  return new Date(time).toISOString().slice(0,10)===value?time/86400000:null;
}
function travelRecords(records=activeTravelDays(),reference=today()){
  const limit=travelDayNumber(reference),unique=new Map();
  if(limit===null||!Array.isArray(records))return [];
  for(const entry of records){
    const day=travelDayNumber(entry?.date);
    if(day!==null&&day<=limit&&destination(entry?.dest)&&!unique.has(entry.date))unique.set(entry.date,{date:entry.date,dest:entry.dest});
  }
  return [...unique.values()].sort((a,b)=>a.date.localeCompare(b.date));
}
function travelStreakSummary(records=activeTravelDays(),reference=today()){
  const days=travelRecords(records,reference),ref=travelDayNumber(reference);
  let run=0,best=0,previous=null;
  for(const entry of days){const n=travelDayNumber(entry.date);run=previous!==null&&n===previous+1?run+1:1;best=Math.max(best,run);previous=n;}
  const current=previous!==null&&previous>=ref-1?run:0;
  return {days,current,best,total:days.length,checkedToday:days.some(d=>d.date===reference),countries:new Set(days.map(d=>destination(d.dest).countryCode||destination(d.dest).country)).size};
}
function streakWeek(summary,reference=today()){
  return `<ol class="streak-week" aria-label="Tus últimos siete días">${Array.from({length:7},(_,i)=>{
    const date=datePlus(reference,i-6),done=summary.days.some(d=>d.date===date),isToday=date===reference;
    return `<li class="${done?'done ':''}${isToday?'today':''}" aria-label="${esc(dateLabel(date))}: ${done?'viaje registrado':'sin registro'}${isToday?', hoy':''}"><span>${['D','L','M','X','J','V','S'][new Date(date+'T12:00:00').getDay()]}</span><span class="streak-day">${done?icon('check'):Number(date.slice(-2))}</span><small>${isToday?'Hoy':done?'✓':'—'}</small></li>`;
  }).join('')}</ol>`;
}
function travelStreakView(compact=false){
  const owner=currentStreakProfile(),kicker=owner?'RACHA DE '+owner.name.toUpperCase():'TU RACHA, PASO A PASO';
  const s=travelStreakSummary(),next=STREAK_GOALS.find(g=>g.days>s.best),last=s.days.at(-1),lastDest=last&&destination(last.dest);
  const message=s.checkedToday?'Tu viaje de hoy ya cuenta. ¡Sigue creando historias!':s.current?'Un nuevo día, una nueva historia. Tu racha te espera.':'Cada aventura cuenta. Empieza tu racha con tu próximo viaje.';
  if(compact)return `<section class="streak-preview" aria-labelledby="streak-preview-title"><div class="streak-emblem">${icon('flame')}<strong>${s.current}</strong><span>${s.current===1?'día de racha':'días de racha'}</span></div><div class="streak-preview-copy"><span class="streak-kicker">${esc(kicker)}</span><h2 id="streak-preview-title">Tu racha de viajes.</h2><p>${message}</p>${streakWeek(s)}${owner?'':guestStreakNotice(true)}</div><a class="button outline" href="#itinerarios?racha=1">${s.checkedToday?'Ver mi racha':'Registrar mi día viajero'} ${icon('arrow')}</a></section>`;
  const selected=last?.dest||currentPlan?.dest||state.favorites[0]||'cusco';
  return `<section class="streak-full" aria-label="Racha de viajes"><div class="streak-hero"><div class="streak-hero-number">${icon('flame')}<strong>${s.current}</strong><span>${s.current===1?'día consecutivo':'días consecutivos'}</span></div><div class="streak-hero-copy"><span class="streak-kicker">${esc(kicker)}</span><h2>${s.current?'Que la aventura continúe.':'Tu primera aventura enciende la racha.'}</h2><p>${message}</p><span class="streak-label">Un viaje registrado por día</span></div></div>${owner?'':guestStreakNotice()}<div class="streak-stats"><div><span>${icon('flame')}</span><strong>${s.best}</strong><small>Mejor racha</small></div><div><span>${icon('map')}</span><strong>${s.total}</strong><small>Días de viaje</small></div><div><span>${icon('pin')}</span><strong>${s.countries}</strong><small>${s.countries===1?'País visitado':'Países visitados'}</small></div></div><div class="streak-detail-grid"><section class="panel streak-checkin"><div class="eyebrow">PASO A PASO, LUGAR A LUGAR</div><h2>Tu semana viajera.</h2><p>Registra los días en los que viajes. Los días consecutivos mantienen encendida tu racha.</p>${streakWeek(s)}${s.checkedToday?`<div class="streak-success" role="status">${icon('check')}<div><strong>¡Hoy ya sumaste una historia!</strong><p>${esc(lastDest.name)} · ${esc(lastDest.country)}<br>Vuelve mañana si sigues de viaje.</p></div></div>`:`<form id="travel-checkin-form"><div class="field"><label for="travel-checkin-destination">¿Dónde estás viajando hoy?</label><select id="travel-checkin-destination" name="dest" required>${[...MYSTIGO_DESTINATIONS].sort((a,b)=>a.country.localeCompare(b.country,'es')||a.name.localeCompare(b.name,'es')).map(d=>`<option value="${esc(d.id)}" ${d.id===selected?'selected':''}>${esc(d.name)} · ${esc(d.country)}</option>`).join('')}</select></div><button class="button yellow" type="submit">${icon('flame')}Registrar mi viaje de hoy</button></form>`}<p class="storage-note">${owner?'El registro se guarda en este perfil. Vuelve a entrar al mismo perfil en este navegador para recuperar tu racha.':'Sin perfil, tus registros duran solo mientras esta pestaña siga abierta; al recargar o cerrarla se borran. Crea tu perfil antes de salir para conservarlos.'} Abrir la app o crear un plan no suma un viaje. Si dejas un día sin registrar, la racha empieza de nuevo; tu mejor marca se conserva.</p></section><section class="panel streak-achievements"><div class="eyebrow">PEQUEÑAS METAS, GRANDES RECUERDOS</div><h2>Tus logros viajeros.</h2><p>${next?`Tu siguiente meta: ${next.days} ${next.days===1?'día de viaje':'días seguidos'}.`:'¡Alcanzaste todas las metas! Tu historia sigue.'}</p><div class="streak-progress" role="progressbar" aria-label="Mejor racha hacia ${next?next.days:30} ${next?.days===1?'día':'días'}" aria-valuemin="0" aria-valuemax="${next?next.days:30}" aria-valuenow="${Math.min(s.best,next?next.days:30)}"><span style="width:${Math.min(100,Math.round(s.best/(next?next.days:30)*100))}%"></span></div><ul class="streak-badges">${STREAK_GOALS.map(g=>`<li class="${s.best>=g.days?'earned':''}"><span>${icon(s.best>=g.days?'flame':'map')}</span><div><strong>${g.name}</strong><small>${g.days} ${g.days===1?'día de viaje':'días consecutivos'}</small></div><span class="streak-badge-status">${s.best>=g.days?'✓':'Por alcanzar'}</span></li>`).join('')}</ul></section></div><section class="panel streak-history"><h2>Historias que ya suman.</h2>${s.total?`<ul>${[...s.days].reverse().slice(0,7).map(entry=>{const d=destination(entry.dest);return `<li><span class="streak-history-pin">${icon('pin')}</span><div><strong>${esc(d.name)}</strong><small>${esc(d.country)}</small></div><time datetime="${entry.date}">${esc(dateLabel(entry.date))}</time></li>`;}).join('')}</ul>`:'<p>Tu primer día de viaje aparecerá aquí cuando lo registres. No necesitas empezar con una gran escapada: también cuentan los lugares cerca de ti.</p>'}</section></section>`;
}
function recordTravelDay(destId){
  const owner=currentStreakProfile();
  if(!destination(destId)){toast('Elige un destino del catálogo para registrar tu viaje.');return false;}
  const summary=travelStreakSummary();
  if(summary.checkedToday){toast('Tu viaje de hoy ya está registrado. Vuelve mañana para continuar.');return false;}
  const days=[...summary.days,{date:today(),dest:destId}];
  if(owner)owner.travelDays=days;else guestTravelDays=days;
  const saved=owner?persist():false;render();
  const count=travelStreakSummary().current;
  toast(!owner?'¡Tu viaje ya cuenta en tu racha temporal! Crea tu perfil antes de salir para guardarlo.':saved?`¡Tu viaje ya cuenta! Llevas ${count} ${count===1?'día':'días'} de racha.`:'Tu viaje cuenta en esta sesión. El navegador no permitió guardarlo para cuando vuelvas.');
  return owner?saved:true;
}
const homeBeforeStreak=home,plannerBeforeStreak=planner,profileBeforeStreak=profileView,enhancementsBeforeStreak=renderEnhancements,helpBeforeStreak=helpView,profileFormBeforeStreak=profileFormView;
home=function(){return homeBeforeStreak().replace('</section>','</section>'+travelStreakView(true));};
planner=function(params=new URLSearchParams()){
  if(params.get('racha')==='1')return `${title('CADA VIAJE TIENE SU HISTORIA','Tu racha viajera.','Suma días de viaje, conserva tus recuerdos y supera tu mejor marca.')}${pageBack('itinerarios','Volver a mis viajes')}${travelStreakView()}`;
  return plannerBeforeStreak(params).replace('</div></div>','</div></div>'+travelStreakView(true));
};
profileView=function(){return profileBeforeStreak()+(currentStreakProfile()?`<section class="panel streak-session"><div><h2>Tu racha está en este perfil.</h2><p>Al salir, tu racha se conserva y vuelve a aparecer cuando eliges este mismo perfil en este navegador.</p></div><div class="form-actions"><button class="button outline small" data-action="leave-streak-profile">Salir de mi perfil</button><a class="text-link" href="${streakProfileLink('entrar','perfil')}">Cambiar de perfil</a></div></section>`:'')+travelStreakView(true);};
profileFormView=function(params){
  const mode=params.get('modo');
  if(mode==='entrar'||!state.profile&&streakProfiles().length&&mode!=='nuevo')return streakProfilePicker(params);
  const back=safeReturn(params.get('volver'),state.profile?'perfil':'inicio');
  let html=profileFormBeforeStreak(params);
  if(back==='itinerarios?racha=1')html=html.replace('Continuar a mis preferencias',guestTravelDays.length?'Crear perfil y guardar mi racha':'Crear perfil y volver a mi racha').replace('Tus preferencias','Tu racha');
  if(!state.profile&&guestTravelDays.length)html=`<div class="notice">Al crear tu perfil ${guestTravelDays.length===1?'se guardará el día que ya registraste':`se guardarán los ${guestTravelDays.length} días que ya registraste`} en tu racha temporal.</div>`+html;
  if(!state.profile&&streakProfiles().length)html=`<div class="notice streak-existing-profile">¿Ya creaste tu perfil? <a href="${streakProfileLink('entrar',back)}">Entra a tu perfil guardado para recuperar tu racha.</a></div>`+html;
  return html;
};
helpView=function(){return helpBeforeStreak()+`<section class="panel spacer-top"><h2>Tu racha de viajes.</h2><details class="faq"><summary>¿Cómo mantengo mi racha?</summary><p>Entra en «Mi racha», con o sin perfil. Elige el destino en el que estás viajando y registra tu viaje de hoy. Puedes sumar un registro por día. La racha cuenta días consecutivos, aunque sigas en el mismo destino. Sin perfil, los días y el historial son temporales y se borran al recargar o cerrar la pestaña. Si creas un perfil antes de salir, se guarda tu racha actual. Para recuperar una racha guardada, entra al mismo perfil en este navegador. No hace falta comprar ni crear un itinerario.</p></details><details class="faq"><summary>¿Qué pasa si un día no viajo?</summary><p>La racha comienza de nuevo con tu próximo registro, pero conservas tu mejor marca, tus logros y tu historial. Los registros son personales: no verifican una reserva ni tu ubicación.</p></details><details class="faq"><summary>¿Reiniciar preferencias borra mi racha?</summary><p>No. Se conserva en el perfil al que pertenece, junto con tus viajes. Al salir del perfil se oculta hasta que vuelvas a entrar. «Borrar mis datos de este navegador» sí elimina todos los perfiles y sus rachas.</p></details></section>`;};
renderEnhancements=function(){
  enhancementsBeforeStreak();
  const s=travelStreakSummary(),link=$('#header-streak'),counter=$('#header-streak-count');
  if(counter)counter.textContent=s.current;
  if(!state.profile&&streakProfiles().length){const profileButton=$('#header-profile');if(profileButton)profileButton.innerHTML='Entrar a mi perfil';}
  if(link){link.setAttribute('aria-label',`Mi racha: ${s.current} ${s.current===1?'día':'días'} consecutivos de viaje`);link.setAttribute('title','Mi racha de viajes');}
};
document.addEventListener('click',event=>{const button=event.target.closest('[data-action]');if(!button)return;if(button.dataset.action==='enter-streak-profile')enterStreakProfile(button.dataset.profileId,button.dataset.return);else if(button.dataset.action==='leave-streak-profile')leaveStreakProfile();});
document.addEventListener('submit',event=>{
  if(event.target.id!=='travel-checkin-form')return;
  event.preventDefault();if(!event.target.reportValidity())return;
  recordTravelDay(new FormData(event.target).get('dest'));
});
// Refresh date-based counters when returning to the app or crossing midnight.
let lastStreakDate=today();
function refreshStreakDate(){if(lastStreakDate!==today()){lastStreakDate=today();if(['inicio','itinerarios','perfil'].includes(routeInfo().page))render();else renderEnhancements();}}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refreshStreakDate();});
window.addEventListener('pagehide',clearGuestTravelDays);
window.addEventListener('pageshow',event=>{if(event.persisted&&!currentStreakProfile())render();});
setInterval(()=>{if(document.visibilityState==='visible')refreshStreakDate();},60000);
initializeStreakProfiles();
render();
