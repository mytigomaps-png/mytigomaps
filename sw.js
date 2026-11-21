'use strict';
// Device notifications only. No push server or background scheduling is claimed.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  let target=new URL('./#inicio',self.registration.scope);
  try{const requested=new URL(event.notification.data?.url||'./#inicio',self.registration.scope);const scope=new URL(self.registration.scope);if(requested.origin===scope.origin&&requested.pathname.startsWith(scope.pathname))target=requested;}catch{}
  event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(async clients=>{
    const existing=clients.find(client=>client.url.startsWith(self.registration.scope));
    if(existing){await existing.navigate(target.href);return existing.focus();}
    return self.clients.openWindow(target.href);
  }));
});
