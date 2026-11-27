'use strict';
const assert=require('node:assert/strict');
const {boot}=require('./test-client.cjs');
const t=boot();
const click=(env,action,id)=>{const button={dataset:{action,id}};for(const handler of env.events.click)handler({target:{closest:()=>button}});};
t.run("state.prefs={...state.prefs,configured:true,types:['Cultura'],activities:[],tripBudget:6000,tripDays:2,people:1};prepareSurpriseOffers(true);chooseSurprise(state.surpriseOffers.plans[0].id)");
const id=t.run('currentPlan.id'),original=JSON.parse(t.storage.get('mystigo.v1'));
const methods=['Yape','Plin','BCP','Interbank','BBVA','Scotiabank'];
const page=t.run('requestView(currentPlan)');
assert.equal((page.match(/data-payment-method /g)||[]).length,6);
for(const name of methods)assert(page.includes('value="'+name+'"'));
assert(page.includes('id="payment-heading"'));assert(page.includes('Selecciona un medio'));
click(t,'confirm-request',id);assert.notEqual(t.run('currentPlan.status'),'requested');assert(t.els['#toast'].textContent.includes('Elige Yape'));
for(const value of ['',null,'Visa','yape','__proto__','<img onerror=alert(1)>']){t.context.inputValue=value;assert.equal(t.run('selectPaymentMethod(currentPlan.id,inputValue)'),false);}
assert.equal(t.run('currentPlan.paymentMethod'),undefined);
for(const name of methods){
 const input={dataset:{planId:id},value:name,matches:selector=>selector==='[data-payment-method]'};
 for(const handler of t.events.change)handler({target:input});
 assert.equal(t.run('currentPlan.paymentMethod'),name);assert.equal(t.run('currentPlan.paymentStatus'),'pending');assert.equal(t.run('currentPlan.planningFee'),15);
 const persisted=JSON.parse(t.storage.get('mystigo.v1'));assert.equal(persisted.plans[0].paymentMethod,name);assert.equal(persisted.plans[0].paymentStatus,'pending');
 t.run("currentPlan.status='preview';delete currentPlan.requestedAt");click(t,'confirm-request',id);assert.equal(t.run('currentPlan.status'),'requested');assert.equal(t.run('currentPlan.paymentStatus'),'pending');
 const confirm=t.run('confirmationView(currentPlan)');assert(confirm.includes('aria-label="Resumen del medio de pago"'));assert(confirm.includes('<strong>'+name+'</strong>'));assert(confirm.includes('Pendiente de coordinación y pago'));
 const mail=t.run('requestMail(currentPlan)'),body=decodeURIComponent(mail.split('&body=')[1]);assert(mail.startsWith('mailto:mytigo.maps@gmail.com?'));assert(body.includes('Medio de pago elegido: '+name));assert(body.includes('Servicio de planificación: S/ 15'));assert(body.includes('pendiente de coordinación y confirmación'));
 assert(!confirm.includes('Pago exitoso'));assert(!confirm.includes('Pago confirmado'));
 const reload=boot(t.storage.get('mystigo.v1'),'#solicitud/'+id);assert.equal(reload.run('currentPlan.paymentMethod'),name);assert.equal(reload.run('currentPlan.paymentStatus'),'pending');assert(reload.els['#main'].innerHTML.includes('value="'+name+'" data-payment-method data-plan-id="'+id+'" checked'));
}
assert.equal(t.run('Object.keys(SCREEN_ROUTES).length'),12);
assert.deepEqual(JSON.parse(t.storage.get('mystigo.v1')).prefs,original.prefs);
assert.deepEqual(JSON.parse(t.storage.get('mystigo.v1')).favorites,original.favorites);
const legacy=JSON.parse(t.storage.get('mystigo.v1'));delete legacy.plans[0].paymentMethod;delete legacy.plans[0].paymentStatus;delete legacy.plans[0].planningFee;
const old=boot(JSON.stringify(legacy),'#confirmacion/'+id);assert(old.els['#main'].innerHTML.includes('Por elegir'));assert(old.els['#main'].innerHTML.includes('Elegir medio de pago'));assert.equal(old.run('state.plans.length'),1);
for(const dest of JSON.parse(t.run('JSON.stringify(MYSTIGO_DESTINATIONS.map(d=>d.id))'))){t.context.destId=dest;t.run('currentPlan.dest=destId;currentPlan.planningFee=999');assert(t.run('paymentConfirmation(currentPlan)').includes('<strong>S/ 15</strong>'));}
const home=t.run('home()');for(const name of methods)assert(home.includes('<strong>'+name+'</strong>'));assert(!home.includes('name="payment-method"'));
assert(!/type="password"|card-number|CCI:\s*\d|Cuenta:\s*\d/i.test(page));
console.log('PASS: six methods, native radio change, required selection, validation, persistence and reload, legacy requests, pending status, email summary, fixed S/ 15 across all destinations, home visibility and existing data.');
