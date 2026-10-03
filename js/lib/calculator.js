// Calculadora de "descobrir X": usada pelo fresamento e pelo torneamento.
// Cada modo em `defs` descreve campos, fórmula e formatação do resultado.
import { parseNumberBR, formatNumber } from './numbers.js';
import { rpmMessage, renderAlert } from './safety.js';

const FORMULA_SHOW = 'ⓘ Ver como foi calculado';
const FORMULA_HIDE = 'ⓘ Ocultar fórmula';

// Calcula um modo a partir dos valores digitados (strings, como vêm dos campos).
// Retorna { value, rpm } ou { error }. A rotação vem do resultado (modo RPM) ou do campo n.
export function solve(def, raw) {
  const vals = {};
  for (const [id] of def.fields) {
    vals[id] = parseNumberBR(raw[id], 0);
    if (!Number.isFinite(vals[id]) || vals[id] <= 0) return { error: 'Preencha todos os campos com valores maiores que zero.' };
  }
  const value = def.calc(vals);
  if (!Number.isFinite(value)) return { error: 'Não foi possível calcular. Confira os valores.' };
  return { value, rpm: def.unit === 'RPM' ? value : vals.n };
}

/**
 * @param {object} o
 * @param {object} o.defs            modos: { title, intro, fields:[[id,label,unit,placeholder]], result, unit, formula, calc, decimals, hint? }
 * @param {Element} o.panel          onde o formulário é desenhado
 * @param {Element} o.formulaBox     caixa da fórmula
 * @param {Element} o.formulaToggle  botão que mostra/oculta a fórmula
 * @param {Element[]} o.optionButtons botões de modo (data-calc)
 * @param {object} o.ids             ids gerados: input(id), button, result, error, alert
 * @param {object} [o.classes]       classes extras de estilo: badge, button, result
 */
export function createCalculator({ defs, panel, formulaBox, formulaToggle, optionButtons, ids, classes = {} }) {
  const requested = new URLSearchParams(location.search).get('calc');
  let mode = requested && defs[requested] ? requested : Object.keys(defs)[0];
  const byId = id => document.getElementById(id);

  function setResult(text) {
    const box = byId(ids.result);
    box.classList.toggle('empty', text == null);
    box.querySelector('strong').textContent = text ?? '—';
  }

  function calculate() {
    const d = defs[mode];
    const raw = Object.fromEntries(d.fields.map(([id]) => [id, byId(ids.input(id)).value]));
    const { value, rpm, error } = solve(d, raw);
    byId(ids.error).textContent = error || '';
    setResult(error ? null : formatNumber(value, d.decimals, d.decimals));
    renderAlert(byId(ids.alert), error ? null : rpmMessage(rpm));
  }

  function render() {
    const d = defs[mode];
    const cls = c => (c ? ' ' + c : '');
    panel.innerHTML = `
      <div class="calc-simple-head"><span class="step-badge${cls(classes.badge)}">CALCULAR</span><h2>${d.title}</h2><p>${d.intro}</p></div>
      <div class="simple-fields">${d.fields.map(([id, label, unit, placeholder]) => `
        <label class="simple-field"><span>${label}</span><div><input inputmode="decimal" id="${ids.input(id)}" placeholder="${placeholder}" aria-label="${label}"><b>${unit}</b></div></label>`).join('')}
      </div>
      <button class="big-calc-btn${cls(classes.button)}" id="${ids.button}" type="button">🧮 CALCULAR</button>
      <div aria-live="polite" aria-atomic="true" class="big-result${cls(classes.result)} empty" id="${ids.result}"><small>${d.result}</small><strong>—</strong><span>${d.unit}</span>${d.hint ? `<p>${d.hint}</p>` : ''}</div>
      <div class="calc-error" id="${ids.error}"></div><div class="safety-slot" id="${ids.alert}" hidden></div>`;
    formulaBox.innerHTML = `<b>Fórmula da tabela técnica</b><p>${d.formula}</p><small>π = 3,1416</small>`;
    formulaBox.hidden = true;
    formulaToggle.textContent = FORMULA_SHOW;
    byId(ids.button).onclick = calculate;
  }

  optionButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.calc === mode);
    button.onclick = () => {
      optionButtons.forEach(x => x.classList.toggle('active', x === button));
      mode = button.dataset.calc;
      render();
    };
  });
  formulaToggle.onclick = () => {
    formulaBox.hidden = !formulaBox.hidden;
    formulaToggle.textContent = formulaBox.hidden ? FORMULA_SHOW : FORMULA_HIDE;
  };
  render();
}
