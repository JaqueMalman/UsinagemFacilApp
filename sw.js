const CACHE_PREFIX = 'usinagem-facil-static-';
const CACHE_NAME = `${CACHE_PREFIX}v1.28`;

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
    // cache: 'reload' ignora o cache HTTP do navegador. Sem isso, uma versão nova
    // pode guardar um HTML antigo junto com o CSS novo (ex.: botão sem estilo).
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_FILES.map(url => new Request(url, { cache: 'reload' }))))
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

// Rede primeiro: com internet, cada página e arquivo vem do servidor (revalidado,
// então HTML e CSS são sempre da mesma versão) e a cópia do cache é atualizada.
// Sem internet, usa a cópia guardada.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  const isPage = event.request.mode === 'navigate';

  event.respondWith(
    fetch(url.href, { cache: 'no-cache', credentials: 'same-origin' }).then(response => {
      if (response && response.status === 200 && response.type === 'basic') {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(() =>
      // Navegações ignoram a query string: fresamento.html?calc=rpm e
      // detalhe-rosca.html?passo=... usam o mesmo HTML pré-cacheado.
      caches.match(event.request, { ignoreSearch: isPage }).then(cached =>
        cached || (isPage ? caches.match('./index.html') : Response.error())
      )
    )
  );
});
