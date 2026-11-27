'use strict';
// A preferred payment method is recorded; this static app does not process funds.
const MYSTIGO_PLANNING_FEE=15;
const MYSTIGO_PAYMENT_METHODS=Object.freeze([
  {id:'Yape',kind:'wallet',color:'yape',logo:'payment-logo-yape.webp',caption:'Billetera digital'},
  {id:'Plin',kind:'wallet',color:'plin',logo:'payment-logo-plin.png',caption:'Desde tu app bancaria'},
  {id:'BCP',kind:'bank',color:'bcp',logo:'payment-logo-bcp.svg',wordmark:true,caption:'Transferencia bancaria'},
  {id:'Interbank',kind:'bank',color:'interbank',logo:'payment-logo-interbank.png',caption:'Transferencia bancaria'},
  {id:'BBVA',kind:'bank',color:'bbva',logo:'payment-logo-bbva.svg',wordmark:true,caption:'Transferencia bancaria'},
  {id:'Scotiabank',kind:'bank',color:'scotiabank',logo:'payment-logo-scotiabank.svg',wordmark:true,caption:'Transferencia bancaria'}
]);
function paymentMethod(value){return MYSTIGO_PAYMENT_METHODS.find(method=>method.id===value)||null;}
function paymentMark(method){return `<span class="payment-mark payment-${method.color}" aria-hidden="true"><img src="${method.logo}" alt="" decoding="async"></span>`;}
const MYSTIGO_DEMO_PAYMENT=Object.freeze({holder:'MYSTIGO DEMO',phone:'000 000 000',account:'0000000000000',cci:'00000000000000000000'});
function paymentDetails(p){
  const method=paymentMethod(p.paymentMethod);
  if(!method)return '<p class="payment-empty">Selecciona un medio para continuar con tu solicitud.</p>';
  const wallet=method.kind==='wallet';
  return `<div class="payment-detail payment-reference"><div class="payment-reference-heading">${paymentMark(method)}<div><h3>Has elegido ${method.id}.</h3><small>Planificación: ${money(MYSTIGO_PLANNING_FEE)}</small></div><span class="payment-demo-badge">Demostración</span></div><div class="payment-reference-body ${wallet?'payment-with-qr':''}">${wallet?`<figure class="payment-qr"><img src="payment-demo-qr-${method.color}.svg" width="160" height="160" alt="QR de demostración de ${method.id}; no realiza un pago real"><figcaption>QR de prueba · ${method.id}</figcaption></figure>`:''}<dl class="payment-reference-data"><div><dt>Titular de referencia</dt><dd>${MYSTIGO_DEMO_PAYMENT.holder}</dd></div>${wallet?`<div><dt>Celular de ejemplo</dt><dd class="payment-reference-number">${MYSTIGO_DEMO_PAYMENT.phone}</dd></div>`:`<div><dt>Cuenta de ejemplo</dt><dd class="payment-reference-number">${MYSTIGO_DEMO_PAYMENT.account}</dd></div><div><dt>CCI de referencia</dt><dd class="payment-reference-number payment-reference-cci">${MYSTIGO_DEMO_PAYMENT.cci}</dd></div>`}<div><dt>Importe de la planificación</dt><dd class="payment-reference-amount">${money(MYSTIGO_PLANNING_FEE)}</dd></div></dl></div><p class="payment-reference-note">${wallet?'El QR, el titular y el celular son ficticios.':'El titular, la cuenta y el CCI son ficticios.'} Datos de ejemplo para mostrar el proceso; no generan un pago real.</p></div>`;
}

function paymentSelection(p){
  const selected=paymentMethod(p.paymentMethod);
  return `<section class="panel payment-panel" aria-labelledby="payment-heading"><div class="eyebrow">TÚ ELIGES CÓMO PAGAR</div><div class="payment-section-heading"><div><h2 id="payment-heading">Método de pago.</h2><p>La planificación cuesta lo mismo para cualquier país.</p></div><span class="payment-price">${money(MYSTIGO_PLANNING_FEE)}<small>por planificación</small></span></div><fieldset class="payment-fieldset"><legend>Elige tu medio de pago</legend><div class="payment-method-grid">${MYSTIGO_PAYMENT_METHODS.map((method,i)=>`<label class="payment-option"><input type="radio" name="payment-method" value="${method.id}" data-payment-method data-plan-id="${esc(p.id)}" ${selected?.id===method.id?'checked':''} required><span class="payment-option-content">${paymentMark(method)}<span><strong>${method.id}</strong><small>${method.caption}</small></span></span></label>`).join('')}</div></fieldset><div id="payment-detail" aria-live="polite">${paymentDetails(p)}</div><p class="storage-note">El medio elegido y sus datos de referencia se muestran en esta demostración. Guardar la solicitud no realiza ningún cobro.</p></section>`;
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
  return `<section class="payment-confirmation" aria-label="Resumen del medio de pago"><div>${method?paymentMark(method):icon('wallet')}<span><small>Medio de pago elegido</small><strong>${method?method.id:'Por elegir'}</strong></span><strong>${money(MYSTIGO_PLANNING_FEE)}</strong></div><p>Servicio de planificación · Mismo precio para los 30 países.</p><span class="pill">Datos de demostración · Sin cobro real</span><a class="text-link" href="#solicitud/${esc(p.id)}">${method?'Cambiar medio de pago':'Elegir medio de pago'} ${icon('arrow')}</a></section>`;
}
function paymentTeaser(){return `<section class="panel payment-teaser" aria-labelledby="home-payment-title"><div><div class="eyebrow">PLANIFICA A TU MANERA</div><h2 id="home-payment-title">Un mismo precio. Más formas de pagar.</h2><p>Planificación por <strong>${money(MYSTIGO_PLANNING_FEE)}</strong> para cualquiera de los 30 países. Elige tu medio al guardar la solicitud y consulta sus datos de referencia dentro de la app.</p></div><div class="payment-teaser-methods" aria-label="Métodos de pago">${MYSTIGO_PAYMENT_METHODS.map(method=>`<span class="${method.wordmark?'payment-wordmark-item':''}">${paymentMark(method)}<strong>${method.id}</strong></span>`).join('')}</div><a class="text-link" href="#itinerarios">Preparar mi viaje ${icon('arrow')}</a></section>`;}
const requestBeforePayments=requestView,confirmationBeforePayments=confirmationView,homeBeforePayments=home,helpBeforePayments=helpView;
requestView=function(p){
  return requestBeforePayments(p)
    .replace('<section class="panel"><h2>Lo que recibes por S/ 15.</h2>',paymentSelection(p)+'<section class="panel"><h2>Lo que recibes por S/ 15.</h2>')
    .replace('<div class="notice yellow spacer-top">El pago está pendiente',`<div class="payment-choice-summary"><span>Medio elegido</span><strong id="selected-payment-method">${paymentMethod(p.paymentMethod)?.id||'Por elegir'}</strong></div><div class="notice yellow spacer-top">El pago está pendiente`)
    .replace('El pago está pendiente de coordinación. Esta web no realiza cobros ni reservas.','Modo de demostración: los QR y los números de cuenta son ficticios. No se realiza un cobro real.');
};
confirmationView=function(p){
  if(p.status!=='requested')return confirmationBeforePayments(p);
  return confirmationBeforePayments(p)
    .replace('<ol class="next-steps">',paymentConfirmation(p)+'<ol class="next-steps">')
    .replace('Confirma la disponibilidad del servicio y el medio de pago con Mystigo.','Revisa el medio elegido y sus datos de referencia. El QR y los números mostrados son ficticios; no se ha realizado ningún cobro.')
    .replace('Coordina los detalles','Revisa los datos de pago')
    .replace('Pendiente de coordinación y pago','Solicitud guardada · Sin cobro real');
};
requestMail=function(p){
  const method=paymentMethod(p.paymentMethod),d=destination(p.dest);
  const body=`Hola, Mystigo. Quisiera coordinar el servicio de planificación de ${money(MYSTIGO_PLANNING_FEE)}.\n\nReferencia: ${p.id}\nDestino: ${d.name} · ${d.country}\nInicio: ${p.date}\nDías: ${p.days.length}\nPersonas: ${p.people}\nPresupuesto del grupo: ${money(p.budget)}\nIntereses: ${(p.interests||[]).join(', ')}\n\nMedio de pago elegido: ${method?method.id:'Por elegir'}\nServicio de planificación: ${money(MYSTIGO_PLANNING_FEE)}\nEstado del pago: pendiente; no se ha realizado ningún cobro.\nModo de pago: demostración con datos ficticios.\n\nComparto el resumen del itinerario y el medio elegido para esta demostración. La solicitud no acredita un pago ni una reserva.`;
  return 'mailto:mytigo.maps@gmail.com?subject=Solicitud%20de%20itinerario%20MYSTIGO&body='+encodeURIComponent(body);
};
home=function(){return homeBeforePayments()+paymentTeaser();};
helpView=function(){return helpBeforePayments()+`<section class="panel spacer-top"><h2>Medios de pago.</h2><details class="faq"><summary>¿Qué métodos puedo elegir?</summary><p>Yape, Plin y transferencias por BCP, Interbank, BBVA o Scotiabank. Elige tu preferido en el resumen de la solicitud; se conserva junto con tu itinerario.</p></details><details class="faq"><summary>¿La planificación cuesta lo mismo para todos los países?</summary><p>Sí. El servicio de planificación cuesta S/ 15 para cualquiera de los 30 países. El viaje, los vuelos, el alojamiento y las actividades tienen sus propios costos y se contratan por separado.</p></details><details class="faq"><summary>¿Elegir un método significa que ya pagué?</summary><p>No. Los QR de Yape y Plin, el titular, el celular, las cuentas y el CCI son datos de demostración. Guardar la solicitud conserva tu elección, sin realizar un cobro real.</p></details></section>`;};
document.addEventListener('change',event=>{
  if(event.target.matches('[data-payment-method]'))selectPaymentMethod(event.target.dataset.planId,event.target.value);
});
render();
