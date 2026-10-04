const CACHE_PREFIX = 'usinagem-facil-static-';
const CACHE_NAME = `${CACHE_PREFIX}v1.19`;

const STATIC_FILES = [
  './',
  './index.html',
  './aprender.html',
  './auditoria-tecnica.html',
  './avanco-fresamento.html',
  './calculadoras.html',
  './conversoes.html',
  './detalhe-rosca.html',
  './fresamento.html',
  './furos.html',
  './roscas.html',
  './tabelas.html',
  './torneamento.html',
  './css/styles.css',
  './js/common.js',
  './js/nav.js',
  './js/sw-register.js',
  './js/lib/calculator.js',
  './js/lib/formulas.js',
  './js/lib/haptics.js',
  './js/lib/history.js',
  './js/lib/numbers.js',
  './js/lib/safety.js',
  './js/lib/text.js',
  './js/lib/threads.js',
  './js/pages/aprender.js',
  './js/pages/auditoria-tecnica.js',
  './js/pages/avanco-fresamento.js',
  './js/pages/calculadoras.js',
  './js/pages/conversoes.js',
  './js/pages/detalhe-rosca.js',
  './js/pages/fresamento.js',
  './js/pages/index.js',
  './js/pages/roscas.js',
  './js/pages/tabelas.js',
  './js/pages/torneamento.js',
  './data/technical-data.js',
  './data/data.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_FILES))
  );
});


self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    // Navegações ignoram a query string: fresamento.html?calc=rpm e
    // detalhe-rosca.html?passo=... usam o mesmo HTML pré-cacheado.
    caches.match(event.request, { ignoreSearch: event.request.mode === 'navigate' }).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return Response.error();
      });
    })
  );
});
