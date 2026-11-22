// Ejecutar: node test-client.cjs
process.chdir(__dirname);
const fs=require('fs'),vm=require('vm'),assert=require('assert'),crypto=require('crypto');
function boot(saved,initialHash=''){
 const storage=new Map(saved?[['mystigo.v1',saved]]:[]),els={},events={},voices=[];
 function el(){return{innerHTML:'',textContent:'',value:'',dataset:{},style:{},open:false,hidden:false,classList:{add(){},remove(){},toggle(){}},setAttribute(n,v){this[n]=v;},addEventListener(){},focus(){},insertAdjacentHTML(){},showModal(){this.open=true;},close(){this.open=false;}};}
 class Engine{constructor(){this.state='running';this.currentTime=1;this.destination={};}resume(){return Promise.resolve();}createGain(){return{gain:{setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}};}createOscillator(){const v={frequency:{setValueAtTime(){}},connect(){},disconnect(){},start(){},stop(){}};voices.push(v);return v;}}
 const document={visibilityState:'visible',documentElement:{dataset:{},style:{}},querySelector(s){if(s==='#selected-activities'||s==='#plan-destination')return null;return els[s]??=el();},querySelectorAll(){return[];},addEventListener(t,f){(events[t]??=[]).push(f);}};
 const window={AudioContext:Engine,matchMedia(){return{matches:false,addEventListener(){}};},addEventListener(t,f){(events[t]??=[]).push(f);},scrollTo(){}};
 const context={document,window,location:{hash:initialHash},navigator:{},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},URLSearchParams,Date,Math,crypto,console,FormData:class{constructor(form){this.data=form.data||{};}get(k){return this.data[k]??null;}},setTimeout(){return 1;},clearTimeout(){},setInterval(){return 1;}};
 context.history={replaceState(_state,_unused,hash){context.location.hash=hash;}};
 vm.createContext(context);for(const f of ['destinations.js','world.js','app.js','notification-sound.js','enhancements.js'])vm.runInContext(fs.readFileSync(f,'utf8'),context,{filename:f});
 return{context,storage,els,events,voices,run:s=>vm.runInContext(s,context)};
}
const flush=async()=>{for(let n=0;n<6;n++)await Promise.resolve();};
(async()=>{
 const t=boot();assert(!t.run('hasTravelPreferences()'));t.run('generateSurprise()');assert.equal(t.context.location.hash,'#preferencias?volver=itinerarios');
 assert(!/<form|explore-country|explore-zone|home-search/.test(t.run('home()')));
 assert(!/<input|<select|<form/.test(t.run('planner()')));
 t.run("state.prefs={...state.prefs,configured:true,types:['Playa'],activities:[],tripBudget:6000,tripDays:3,people:1,budget:'Moderado',mood:'Descansar'}");
 const beaches=JSON.parse(t.run('JSON.stringify(prepareSurpriseOffers(true))'));assert.equal(beaches.plans.length,3);assert.equal(new Set(beaches.plans.map(p=>p.dest)).size,3);assert(t.run("state.surpriseOffers.plans.every(p=>destination(p.dest).categories.includes('Playa'))"));assert(beaches.plans.every(p=>p.cost.total<=p.budget&&p.days.length===3&&p.days.every(d=>d.items.length)));
 const page=t.run('planner()');assert(!/<input|<select|<form|planner-form/.test(page));assert.equal((page.match(/data-action="choose-surprise"/g)||[]).length,3);
 const ids=beaches.plans.map(p=>p.id).join(',');const reload=boot(t.storage.get('mystigo.v1'));assert.equal(reload.run("prepareSurpriseOffers().plans.map(p=>p.id).join(',')"),ids);
 const more=JSON.parse(t.run('JSON.stringify(prepareSurpriseOffers(true))'));assert(more.plans.some(p=>!beaches.plans.some(old=>old.dest===p.dest)),'rotation');
 t.run("state.prefs.types=['Aventura'];state.prefs.mood='Vivir una aventura'");const adventures=JSON.parse(t.run('JSON.stringify(prepareSurpriseOffers())'));assert.equal(adventures.plans.length,3);assert(t.run("state.surpriseOffers.plans.every(p=>destination(p.dest).categories.includes('Aventura'))"));
 const weekend=JSON.parse(t.run("JSON.stringify(prepareSurpriseOffers(true,'weekend'))"));assert.equal(new Date(weekend.options.travelDate+'T12:00:00').getDay(),6);assert(weekend.options.tripDays<=2);assert(weekend.plans.every(p=>p.days.length<=2));
 t.run(`chooseSurprise('${weekend.plans[0].id}')`);assert.equal(t.run('state.plans.length'),1);assert(t.context.location.hash.startsWith('#plan/'));assert.equal(t.run('currentPlan.dest'),weekend.plans[0].dest);
 t.context.location.hash='#itinerarios';t.run('render()');assert(t.els['#main'].innerHTML.includes('choose-surprise'));
 t.run('state.prefs.tripBudget=50;state.prefs.tripDays=7');assert.equal(t.run('prepareSurpriseOffers(true).plans.length'),0);assert(t.run('planner()').includes('No hay opciones'));
 const old=JSON.parse(t.storage.get('mystigo.v1'));old.prefs.tripBudget=2000;old.prefs.types=['Playa'];delete old.prefs.configured;old.favorites=['cusco'];const migrated=boot(JSON.stringify(old));assert(migrated.run('hasTravelPreferences()'));assert.equal(migrated.run('state.favorites[0]'),'cusco');assert.equal(migrated.run('state.plans.length'),1);
 const prefs=migrated.run('preferencesView(new URLSearchParams())');assert.equal((prefs.match(/<form/g)||[]).length,1);assert(prefs.includes('name="tripBudget"'));assert(!/pref-scope|plan-country|explore-zone/.test(prefs));
 assert.equal(migrated.run('Object.keys(SCREEN_ROUTES).length'),12);assert.equal(migrated.run('WORLD_COUNTRIES.length'),30);
 const detail=migrated.run("details(destination('world-jp'))");assert(!detail.includes('data-action="select-activity"'));assert(detail.includes('Preparar mis viajes sorpresa'));
 const n=boot();assert.equal(n.voices.length,0);n.events.pointerdown[0]({isTrusted:true,type:'pointerdown'});await flush();assert.equal(n.voices.length,2,'new daily motivation sounds after first touch');n.run('localReminders()');await flush();assert.equal(n.voices.length,2,'same motivation does not repeat');
 const queue=boot();queue.run('MystigoSound.stop();state.notificationPrefs.sound=false');queue.events.pointerdown[0]({isTrusted:true,type:'pointerdown'});await flush();assert.equal(queue.voices.length,0,'muted pending sound stays silent');
 for(const path of ['inicio','explorar','destino/world-jp','itinerarios','favoritos','perfil','ayuda','registro','preferencias']){migrated.context.location.hash='#'+path;migrated.run('render()');}
 const freshEntry=boot(undefined,'#preferencias?volver=itinerarios');assert.equal(freshEntry.context.location.hash,'#inicio');
 freshEntry.context.location.hash='#preferencias';freshEntry.events.pageshow[0]({persisted:true});assert.equal(freshEntry.context.location.hash,'#inicio');
 const savedEntry=boot(migrated.storage.get('mystigo.v1'),'#itinerarios');assert.equal(savedEntry.context.location.hash,'#itinerarios');
 const click=(t,action,id)=>{const button={dataset:{action,id}};for(const handler of t.events.click)handler({target:{closest:()=>button}});};
 savedEntry.run("state.profile={name:'Prueba',email:''};state.favorites=['cusco'];state.opinions=[{message:'Conservar'}];state.notificationPrefs.sound=false;state.selected=['cusco|0|0'];state.affinity={Playa:8};state.surpriseHistory=['cusco'];state.notifications=[{id:'offers:old',title:'Viejas opciones',body:'Anterior'},{id:'preferences:old',title:'Viejos gustos',body:'Anterior'},{id:'motivation:old:ready',title:'Motivación anterior',body:'Anterior'},{id:'trip:keep',title:'Tu viaje guardado',body:'Conservar',type:'trip'}];prepareSurpriseOffers(true)");
 savedEntry.storage.set('mystigo.appearance','dark');
 const retained=savedEntry.run('JSON.stringify({profile:state.profile,favorites:state.favorites,plans:state.plans,opinions:state.opinions,notificationPrefs:state.notificationPrefs})');
 const staleId=savedEntry.run('state.surpriseOffers.plans[0].id');
 savedEntry.context.location.hash='#preferencias?volver=itinerarios';click(savedEntry,'restart-preferences');
 assert(!savedEntry.run('hasTravelPreferences()'));assert.equal(savedEntry.run('state.surpriseOffers'),null);assert.equal(savedEntry.run('currentPlan'),null);
 assert.equal(savedEntry.run('state.selected.length+state.surpriseHistory.length+Object.keys(state.affinity).length'),0);
 assert.equal(savedEntry.run('JSON.stringify({profile:state.profile,favorites:state.favorites,plans:state.plans,opinions:state.opinions,notificationPrefs:state.notificationPrefs})'),retained,'keeps existing trips, profile, favorites, opinions and sound');
 assert.equal(savedEntry.storage.get('mystigo.appearance'),'dark');assert.equal(savedEntry.run("state.notifications.map(n=>n.id).join(',')"),'trip:keep');
 const storedReset=JSON.parse(savedEntry.storage.get('mystigo.v1'));assert.strictEqual(storedReset.prefs.configured,false);assert.equal(storedReset.prefs.types.length+storedReset.prefs.activities.length,0);assert.equal(storedReset.surpriseOffers,null);
 const resetHtml=savedEntry.els['#main'].innerHTML;assert(resetHtml.includes('data-action="restart-preferences"'));assert(!/class="choice"[^>]*aria-pressed="true"/.test(resetHtml));assert(/id="pref-trip-budget"[^>]*value="1500"/.test(resetHtml));
 for(const path of ['inicio','explorar','destino/world-jp','itinerarios','favoritos','perfil','ayuda','registro','preferencias']){savedEntry.context.location.hash='#'+path;savedEntry.run('render()');assert(savedEntry.els['#main'].innerHTML);assert(!savedEntry.els['#main'].innerHTML.includes('Tus preferencias ya están guardadas.'));assert(!savedEntry.els['#main'].innerHTML.includes('preferencias que ya guardaste'));assert(!savedEntry.els['#main'].innerHTML.includes('data-action="choose-surprise"'));}
 assert(!savedEntry.run('profileView()').includes('Con tus preferencias guardadas'));assert(!savedEntry.run('home()').includes('S/ 2,000'));assert.equal(savedEntry.run('prepareSurpriseOffers(true)'),null);
 for(const action of ['surprise-now','surprise-more','surprise-weekend']){click(savedEntry,action);assert.equal(savedEntry.context.location.hash,'#preferencias?volver=itinerarios');assert.equal(savedEntry.run('state.surpriseOffers'),null);}
 click(savedEntry,'choose-surprise',staleId);assert.equal(savedEntry.context.location.hash,'#preferencias?volver=itinerarios');assert.equal(savedEntry.run('state.plans.length'),1);
 const reopened=boot(savedEntry.storage.get('mystigo.v1'),'#itinerarios');assert.equal(reopened.context.location.hash,'#inicio');assert(!reopened.run('hasTravelPreferences()'));assert(!reopened.run('planner()').includes('Tus preferencias ya están guardadas.'));
 reopened.context.location.hash='#preferencias';reopened.events.pageshow[0]({persisted:true});assert.equal(reopened.context.location.hash,'#inicio');
 const pId=reopened.run('state.plans[0].id');
 for(const path of ['plan','solicitud','confirmacion']){reopened.context.location.hash='#'+path+'/'+pId;reopened.run('render()');assert.equal(reopened.els['#main']['data-screen'],path);assert(!reopened.els['#main'].innerHTML.includes('No encontramos'));}
 click(reopened,'confirm-request',pId);reopened.run('render()');assert.equal(reopened.run('state.plans[0].status'),'requested');assert(/solicitud guardada/i.test(reopened.els['#main'].innerHTML));
 // Exercise the real submit listener, including the empty-interest guard.
 const form={id:'preferences-form',dataset:{return:'itinerarios'},reportValidity:()=>true,data:{company:'Solo',budget:'Moderado',tripBudget:'6000',tripDays:'2',people:'1',mood:'Descubrir cultura',travelDate:reopened.run('nextWeekendDate()')},querySelectorAll:()=>[]};
 const submit=()=>{for(const handler of reopened.events.submit)handler({target:form,preventDefault(){}});};
 submit();assert(!reopened.run('hasTravelPreferences()'));assert.equal(reopened.run('state.surpriseOffers'),null);
 form.querySelectorAll=selector=>selector.includes('activities')?[]:[{dataset:{value:'Cultura'}}];submit();reopened.run('render()');assert(reopened.run('hasTravelPreferences()'));assert.equal(reopened.context.location.hash,'#itinerarios');assert.equal(reopened.run('state.prefs.types.join()'),'Cultura');assert.equal(reopened.run('state.surpriseOffers.plans.length'),3);assert(reopened.run("state.surpriseOffers.plans.every(p=>p.id!=="+JSON.stringify(staleId)+"&&destination(p.dest).categories.includes('Cultura')&&p.days.length===2&&p.cost.total<=6000)"));
 const resaved=boot(reopened.storage.get('mystigo.v1'),'#itinerarios');assert.equal(resaved.context.location.hash,'#itinerarios');assert(resaved.run('hasTravelPreferences()'));assert.equal(resaved.run('state.prefs.types.join()'),'Cultura');
 const inconsistent=JSON.parse(reopened.storage.get('mystigo.v1'));inconsistent.prefs.configured=false;const flagged=boot(JSON.stringify(inconsistent));assert(!flagged.run('hasTravelPreferences()'));assert.equal(flagged.run('state.surpriseOffers'),null,'reset flag cannot resurrect cached recommendations');
 const blocked=boot(reopened.storage.get('mystigo.v1'));blocked.context.localStorage.setItem=()=>{throw new Error('blocked');};assert.equal(blocked.run('restartTravelPreferences()'),false);assert(!blocked.run('hasTravelPreferences()'));assert(blocked.els['#toast'].textContent.includes('en esta sesión'));
 for(const dest of JSON.parse(t.run('JSON.stringify(MYSTIGO_DESTINATIONS)'))){assert(fs.existsSync(dest.image),'missing photo '+dest.id);assert(dest.blocks.length,'missing itinerary '+dest.id);}
 const email=savedEntry.run('profileFormView(new URLSearchParams())');assert(email.includes('>Correo electrónico</label>'));assert(!email.includes('Correo electrónico (opcional)'));assert(!/id="profile-email"[^>]*required/.test(email));
 console.log('PASS: start on reentry without saved preferences; restore from history; saved preferences retained; persistent reset, return, reload, stale actions, all 12 routes, resave, storage failure; optional email validation preserved.');
 console.log('PASS: one preference form; no manual country/region/planner forms; 3 matching beach/adventure proposals; budgets; weekend; rotation; reload; choose/save; migration; 12 routes; 30 countries; motivational sound, deduplication and mute.');
})();
