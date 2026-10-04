(() => {
  if (!('serviceWorker' in navigator)) return;

  let refreshing = false;
  let waitingWorker = null;
  let updateRequested = false;
  // Na primeira visita não há controlador; o clients.claim() do sw.js dispara
  // controllerchange e não deve recarregar a página.
  const hadController = !!navigator.serviceWorker.controller;

  function ensureBanner() {
    let banner = document.getElementById('pwa-update-banner');
    if (banner) return banner;

    banner = document.createElement('aside');
    banner.id = 'pwa-update-banner';
    banner.className = 'pwa-update-banner';
    banner.hidden = true;
    banner.setAttribute('role', 'status');
    banner.setAttribute('aria-live', 'polite');
    banner.innerHTML = `
      <div class="pwa-update-copy">
        <strong>🔄 Nova versão disponível</strong>
        <span>Atualize para usar os dados e melhorias mais recentes.</span>
      </div>
      <div class="pwa-update-actions">
        <button type="button" class="pwa-update-later">Depois</button>
        <button type="button" class="pwa-update-now">Atualizar agora</button>
      </div>`;
    document.body.appendChild(banner);

    banner.querySelector('.pwa-update-now').addEventListener('click', () => {
      if (!waitingWorker) return;
      banner.querySelector('.pwa-update-now').disabled = true;
      banner.querySelector('.pwa-update-now').textContent = 'Atualizando…';
      updateRequested = true;
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    });
    banner.querySelector('.pwa-update-later').addEventListener('click', () => {
      banner.hidden = true;
    });
    return banner;
  }

  function showUpdate(worker) {
    waitingWorker = worker;
    ensureBanner().hidden = false;
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js');

      // Há uma versão nova já aguardando desde uma visita anterior.
      if (registration.waiting && navigator.serviceWorker.controller) {
        showUpdate(registration.waiting);
      }

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdate(newWorker);
          }
        });
      });

      // Procura atualizações ao abrir o app e também quando ele volta ao primeiro plano.
      registration.update().catch(() => {});
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') registration.update().catch(() => {});
      });
    } catch (error) {
      console.warn('Usinagem Fácil: não foi possível registrar o modo offline.', error);
    }
  });

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing || (!hadController && !updateRequested)) return;
    refreshing = true;
    window.location.reload();
  });
})();
