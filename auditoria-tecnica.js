const T = window.TECHNICAL_DATA;
const mm = v => v ? String(v).replace('.', ',') + ' mm' : '—';

document.querySelector('#families').innerHTML = Object.entries(T.families).map(([k, f]) => {
  const rows = T.threads.filter(x => x.familia === k), done = rows.filter(x => x.brocaMm != null).length;
  return `<div class="family"><b>${f.sigla} — ${f.nome}</b><p>Estrutura: <span class="status ok">${f.statusEstrutura}</span> · Registros: ${rows.length} · Brocas preenchidas: ${done} · <span class="status pending">WestTools: ${f.validacaoWestTools}</span></p><small>Referência estrutural: ${f.referenciaEstrutural}</small></div>`;
}).join('');
document.querySelector('#pending').innerHTML = T.threads.filter(x => x.brocaMm == null)
  .map(x => `<tr><td>${x.familia.toUpperCase()}</td><td>${x.designacao}</td><td>${mm(x.passoMm)}</td><td>☐ conferir WestTools</td></tr>`).join('');
