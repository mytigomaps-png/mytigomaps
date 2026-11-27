'use strict';
// A preferred payment method is recorded; this static app does not process funds.
const MYSTIGO_PLANNING_FEE=15;
const MYSTIGO_PAYMENT_METHODS=Object.freeze([
  {id:'Yape',kind:'wallet',mark:'Y',color:'yape',caption:'Billetera digital',detail:'Solicita a Mystigo su número o QR de Yape para coordinar el pago de la planificación.'},
  {id:'Plin',kind:'wallet',mark:'P',color:'plin',caption:'Desde tu app bancaria',detail:'Solicita a Mystigo el número de celular para coordinar el pago por Plin.'},
  {id:'BCP',kind:'bank',mark:'BCP',color:'bcp',caption:'Transferencia bancaria',detail:'Solicita a Mystigo los datos de su cuenta BCP o CCI para coordinar la transferencia.'},
  {id:'Interbank',kind:'bank',mark:'IB',color:'interbank',caption:'Transferencia bancaria',detail:'Solicita a Mystigo los datos de su cuenta Interbank o CCI para coordinar la transferencia.'},
  {id:'BBVA',kind:'bank',mark:'BBVA',color:'bbva',caption:'Transferencia bancaria',detail:'Solicita a Mystigo los datos de su cuenta BBVA o CCI para coordinar la transferencia.'},
  {id:'Scotiabank',kind:'bank',mark:'S',color:'scotiabank',caption:'Transferencia bancaria',detail:'Solicita a Mystigo los datos de su cuenta Scotiabank o CCI para coordinar la transferencia.'}
]);
function paymentMethod(value){return MYSTIGO_PAYMENT_METHODS.find(method=>method.id===value)||null;}
function paymentMark(method){return `<span class="payment-mark payment-${method.color}" aria-hidden="true">${method.mark}</span>`;}
function paymentDetails(p){
  const method=paymentMethod(p.paymentMethod);
  return method?`<div class="payment-detail"><span class="payment-detail-icon">${icon('wallet')}</span><div><h3>Has elegido ${method.id}.</h3><p>${method.detail}</p><small>Planificación: ${money(MYSTIGO_PLANNING_FEE)} · Pendiente de coordinación y pago.</small></div></div>`:'<p class="payment-empty">Selecciona un medio para continuar con tu solicitud.</p>';
}
function paymentSelection(p){
  const selected=paymentMethod(p.paymentMethod);
  return `<section class="panel payment-panel" aria-labelledby="payment-heading"><div class="eyebrow">TÚ ELIGES CÓMO PAGAR</div><div class="payment-section-heading"><div><h2 id="payment-heading">Método de pago.</h2><p>La planificación cuesta lo mismo para cualquier país.</p></div><span class="payment-price">${money(MYSTIGO_PLANNING_FEE)}<small>por planificación</small></span></div><fieldset class="payment-fieldset"><legend>Elige tu medio de pago</legend><div class="payment-method-grid">${MYSTIGO_PAYMENT_METHODS.map((method,i)=>`<label class="payment-option"><input type="radio" name="payment-method" value="${method.id}" data-payment-method data-plan-id="${esc(p.id)}" ${selected?.id===method.id?'checked':''} required><span class="payment-option-content">${paymentMark(method)}<span><strong>${method.id}</strong><small>${method.caption}</small></span></span></label>`).join('')}</div></fieldset><div id="payment-detail" aria-live="polite">${paymentDetails(p)}</div><p class="storage-note">El medio elegido se guarda con tu solicitud. Mystigo te confirmará los datos para pagar y revisará el pago antes de confirmar el servicio.</p></section>`;
}
function validatePaymentSelection(p){
  if(paymentMethod(p.paymentMethod))return true;
  toast('Elige Yape, Plin o un banco para continuar.');
  $('[data-payment-method]')?.focus({preventScroll:false});
  return false;
}
function selectPaymentMethod(planId,value){
  const p=findPlan(planId),method=paymentMethod(value);
  if(!p||!method)return false;
  p.paymentMethod=method.id;p.paymentStatus='pending';p.planningFee=MYSTIGO_PLANNING_FEE;
  currentPlan=p;saveCurrent(false);
  const detail=$('#payment-detail');if(detail)detail.innerHTML=paymentDetails(p);
  const summary=$('#selected-payment-method');if(summary)summary.textContent=method.id;
  return true;
}
function paymentConfirmation(p){
  const method=paymentMethod(p.paymentMethod);
  return `<section class="payment-confirmation" aria-label="Resumen del medio de pago"><div>${method?paymentMark(method):icon('wallet')}<span><small>Medio de pago elegido</small><strong>${method?method.id:'Por elegir'}</strong></span><strong>${money(MYSTIGO_PLANNING_FEE)}</strong></div><p>Servicio de planificación · Mismo precio para los 30 países.</p><span class="pill">Pendiente de coordinación y pago</span><a class="text-link" href="#solicitud/${esc(p.id)}">${method?'Cambiar medio de pago':'Elegir medio de pago'} ${icon('arrow')}</a></section>`;
}
function paymentTeaser(){return `<section class="panel payment-teaser" aria-labelledby="home-payment-title"><div><div class="eyebrow">PLANIFICA A TU MANERA</div><h2 id="home-payment-title">Un mismo precio. Más formas de pagar.</h2><p>Planificación por <strong>${money(MYSTIGO_PLANNING_FEE)}</strong> para cualquiera de los 30 países. Elige tu medio al guardar la solicitud y coordina los datos de pago con Mystigo.</p></div><div class="payment-teaser-methods" aria-label="Métodos de pago">${MYSTIGO_PAYMENT_METHODS.map(method=>`<span>${paymentMark(method)}<strong>${method.id}</strong></span>`).join('')}</div><a class="text-link" href="#itinerarios">Preparar mi viaje ${icon('arrow')}</a></section>`;}
const requestBeforePayments=requestView,confirmationBeforePayments=confirmationView,homeBeforePayments=home,helpBeforePayments=helpView;
requestView=function(p){
  return requestBeforePayments(p)
    .replace('<section class="panel"><h2>Lo que recibes por S/ 15.</h2>',paymentSelection(p)+'<section class="panel"><h2>Lo que recibes por S/ 15.</h2>')
    .replace('<div class="notice yellow spacer-top">El pago está pendiente',`<div class="payment-choice-summary"><span>Medio elegido</span><strong id="selected-payment-method">${paymentMethod(p.paymentMethod)?.id||'Por elegir'}</strong></div><div class="notice yellow spacer-top">El pago está pendiente`);
};
confirmationView=function(p){
  if(p.status!=='requested')return confirmationBeforePayments(p);
  return confirmationBeforePayments(p)
    .replace('<ol class="next-steps">',paymentConfirmation(p)+'<ol class="next-steps">')
    .replace('Confirma la disponibilidad del servicio y el medio de pago con Mystigo.',paymentMethod(p.paymentMethod)?`Coordina el servicio y los datos para pagar por ${paymentMethod(p.paymentMethod).id}. Mystigo debe confirmar la recepción del pago.`:'Elige un medio de pago y coordina la disponibilidad del servicio con Mystigo.');
};
requestMail=function(p){
  const method=paymentMethod(p.paymentMethod),d=destination(p.dest);
  const body=`Hola, Mystigo. Quisiera coordinar el servicio de planificación de ${money(MYSTIGO_PLANNING_FEE)}.\n\nReferencia: ${p.id}\nDestino: ${d.name} · ${d.country}\nInicio: ${p.date}\nDías: ${p.days.length}\nPersonas: ${p.people}\nPresupuesto del grupo: ${money(p.budget)}\nIntereses: ${(p.interests||[]).join(', ')}\n\nMedio de pago elegido: ${method?method.id:'Por elegir'}\nServicio de planificación: ${money(MYSTIGO_PLANNING_FEE)}\nEstado del pago: pendiente de coordinación y confirmación.\n\nPor favor, confírmenme la disponibilidad y los datos para realizar el pago. La solicitud no acredita un pago ni una reserva.`;
  return 'mailto:mytigo.maps@gmail.com?subject=Solicitud%20de%20itinerario%20MYSTIGO&body='+encodeURIComponent(body);
};
home=function(){return homeBeforePayments()+paymentTeaser();};
helpView=function(){return helpBeforePayments()+`<section class="panel spacer-top"><h2>Medios de pago.</h2><details class="faq"><summary>¿Qué métodos puedo elegir?</summary><p>Yape, Plin y transferencias por BCP, Interbank, BBVA o Scotiabank. Elige tu preferido en el resumen de la solicitud; se conserva junto con tu itinerario.</p></details><details class="faq"><summary>¿La planificación cuesta lo mismo para todos los países?</summary><p>Sí. El servicio de planificación cuesta S/ 15 para cualquiera de los 30 países. El viaje, los vuelos, el alojamiento y las actividades tienen sus propios costos y se contratan por separado.</p></details><details class="faq"><summary>¿Elegir un método significa que ya pagué?</summary><p>No. Guarda tu solicitud y comparte el resumen con Mystigo para coordinar los datos de pago. El pago sigue pendiente hasta que Mystigo confirme su recepción.</p></details></section>`;};
document.addEventListener('change',event=>{
  if(event.target.matches('[data-payment-method]'))selectPaymentMethod(event.target.dataset.planId,event.target.value);
});
render();
