// Alertas de rotação. O limite é só uma referência de alerta do aplicativo,
// não o limite real de uma máquina.
import { warning as vibrateWarning } from './haptics.js';

const KEY = 'usinagemFacil.machineLimits.v1';
const DEFAULTS = { rpmWarning: 4000 };

export function loadLimits() {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
  catch (_) { return { ...DEFAULTS }; }
}

const rpmLimit = () => Number(loadLimits().rpmWarning) || DEFAULTS.rpmWarning;

// null até o limite; 'warning' acima dele; 'danger' acima de 1,5 × o limite.
export function rpmLevel(rpm, limit = rpmLimit()) {
  if (!Number.isFinite(rpm) || rpm <= limit) return null;
  return rpm > limit * 1.5 ? 'danger' : 'warning';
}

export function rpmMessage(rpm, limit = rpmLimit()) {
  const level = rpmLevel(rpm, limit);
  if (!level) return null;
  return {
    level,
    limit,
    title: level === 'danger' ? 'Rotação muito acima da referência' : 'Atenção à rotação',
    text: `${Math.round(rpm).toLocaleString('pt-BR')} RPM ultrapassa a referência de alerta de ${limit.toLocaleString('pt-BR')} RPM. Confira a rotação máxima permitida da máquina, placa/castanha, ferramenta e fixação antes de operar.`
  };
}

export function renderAlert(container, alert) {
  if (!container) return;
  if (!alert) { container.innerHTML = ''; container.hidden = true; return; }
  container.hidden = false;
  container.innerHTML = `<div class="safety-alert ${alert.level}" role="alert"><span>${alert.level === 'danger' ? '🛑' : '⚠️'}</span><div><strong>${alert.title}</strong><p>${alert.text}</p><small>${alert.limit.toLocaleString('pt-BR')} RPM é apenas uma referência de alerta do aplicativo, não o limite universal de uma máquina.</small></div></div>`;
  vibrateWarning();
}
