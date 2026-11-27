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
 const details=t.run('paymentDetails(currentPlan)');assert(details.includes('MYSTIGO DEMO'));assert(details.includes('Demostración'));assert(!/Solicita a Mystigo|coordina el pago|solicita.*datos/i.test(details));
 if(name==='Yape'||name==='Plin'){assert(details.includes('payment-demo-qr-'+name.toLowerCase()+'.svg'));assert(details.includes('000 000 000'));assert(!details.includes('CCI de referencia'));}
 else{assert(details.includes('00000000000000000000'));assert(details.includes('0000000000000'));assert(!details.includes('payment-demo-qr-'));}
 const confirm=t.run('confirmationView(currentPlan)');assert(confirm.includes('aria-label="Resumen del medio de pago"'));assert(confirm.includes('<strong>'+name+'</strong>'));assert(confirm.includes('Datos de demostración · Sin cobro real'));
 const mail=t.run('requestMail(currentPlan)'),body=decodeURIComponent(mail.split('&body=')[1]);assert(mail.startsWith('mailto:mytigo.maps@gmail.com?'));assert(body.includes('Medio de pago elegido: '+name));assert(body.includes('Servicio de planificación: S/ 15'));assert(body.includes('Estado del pago: pendiente'));assert(body.includes('Modo de pago: demostración con datos ficticios'));
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
console.log('PASS: mock wallet QR references, the same fictitious CCI for four banks, no request-for-payment-data prompts; six methods, native radio change, required selection, validation, persistence and reload, legacy requests, pending status, email summary, fixed S/ 15 across all destinations, home visibility and existing data.');

const references=require('./payment-demo-data.json');assert.equal(references.cci.length,20);assert(/^0+$/.test(references.cci));for(const name of ['Yape','Plin']){const item=references.wallets[name];assert(require('node:fs').existsSync(item.qr));assert(item.payload.includes('DEMOSTRACION'));assert(item.payload.includes('SIN TRANSACCION REAL'));assert(!/https?:|yape:|plin:|0000000000/.test(item.payload));}
