const CACHE = 'forms-cache-v2'; // versão nova para forçar atualização
const urls = ['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(urls)));
  self.skipWaiting(); // ativa já
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // assume controle imediato
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
});
