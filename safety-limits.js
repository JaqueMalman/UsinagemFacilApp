(() => {
  'use strict';
  const KEY = 'usinagemFacil.machineLimits.v1';
  const DEFAULTS = { rpmWarning: 4000 };
  // Aceita o padrão brasileiro: vírgula decimal e ponto de milhar (1.000 / 1.000,5).
  // Entradas com caracteres inválidos são recusadas em vez de truncadas.
  function sanitizeInput(value, defaultValue = 0){
    if (typeof value === 'number') return Number.isFinite(value) ? value : defaultValue;
    let s = String(value ?? '').replace(/\s/g, '');
    if (!s) return defaultValue;
    if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
    else if (/^[1-9]\d{0,2}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
    if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s)) return defaultValue;
    const parsed = Number(s);
    return Number.isFinite(parsed) ? parsed : defaultValue;
  }
  function load(){
    try { return {...DEFAULTS, ...(JSON.parse(localStorage.getItem(KEY)||'{}'))}; }
    catch(_) { return {...DEFAULTS}; }
  }
  function rpmLevel(rpm){
    const limit = Number(load().rpmWarning) || DEFAULTS.rpmWarning;
    if (!Number.isFinite(rpm) || rpm <= limit) return null;
    return rpm > limit * 1.5 ? 'danger' : 'warning';
  }
  function rpmMessage(rpm){
    const limit = Number(load().rpmWarning) || DEFAULTS.rpmWarning;
    const level = rpmLevel(rpm);
    if (!level) return null;
    return {
      level,
      limit,
      title: level === 'danger' ? 'Rotação muito acima da referência' : 'Atenção à rotação',
      text: `${Math.round(rpm).toLocaleString('pt-BR')} RPM ultrapassa a referência de alerta de ${limit.toLocaleString('pt-BR')} RPM. Confira a rotação máxima permitida da máquina, placa/castanha, ferramenta e fixação antes de operar.`
    };
  }
  function render(container, alert){
    if (!container) return;
    if (!alert){ container.innerHTML=''; container.hidden=true; return; }
    container.hidden=false;
    container.innerHTML=`<div class="safety-alert ${alert.level}" role="alert"><span>${alert.level==='danger'?'🛑':'⚠️'}</span><div><strong>${alert.title}</strong><p>${alert.text}</p><small>${alert.limit.toLocaleString('pt-BR')} RPM é apenas uma referência de alerta do aplicativo, não o limite universal de uma máquina.</small></div></div>`;
    if (window.UsinagemHaptics?.warning) window.UsinagemHaptics.warning();
  }
  window.UsinagemSafety = { sanitizeInput, load, rpmLevel, rpmMessage, render };
})();
