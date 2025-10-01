// SW "anti-cache": não armazena nada e sempre busca do network
self.addEventListener('install', (e) => {
  self.skipWaiting(); // ativa imediatamente
});

self.addEventListener('activate', (e) => {
  // apaga QUALQUER cache existente de versões antigas
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim(); // assume controle de todas as abas
});

self.addEventListener('fetch', (e) => {
  // sempre tenta do network; ignora caches
  e.respondWith(
    fetch(e.request, { cache: 'no-store' })
      .catch(() => fetch(e.request)) // fallback básico (normalmente não será chamado)
  );
});
