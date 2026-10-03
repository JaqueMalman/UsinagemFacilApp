(() => {
  'use strict';

  // Feedback tátil progressivo: navegadores sem Vibration API simplesmente ignoram.
  const canVibrate = () => typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

  function vibrate(pattern = 18) {
    if (!canVibrate()) return false;
    try { return navigator.vibrate(pattern); } catch (_) { return false; }
  }

  // Vibração curta para confirmação de toque. Eventos delegados cobrem botões
  // criados dinamicamente (resultados, filtros, banner de atualização etc.).
  document.addEventListener('click', (event) => {
    const target = event.target.closest('button, a.btn, .action-card, .choice, .quick-card, .quick-link, .calc-option, .thread-item, .size-btn, [data-haptic]');
    if (!target || target.matches('[disabled], [aria-disabled="true"]')) return;
    vibrate(18);
  }, { passive: true });

  window.UsinagemHaptics = {
    tap: () => vibrate(18),
    success: () => vibrate([22, 35, 22]),
    warning: () => vibrate([35, 45, 35]),
    supported: canVibrate
  };
})();
