import { normalizeThread } from './js/lib/text.js';
import { threadLabel } from './js/lib/threads.js';

const $ = s => document.querySelector(s);
const rows = window.DB?.roscas || [];
const params = new URLSearchParams(location.search);
const wanted = normalizeThread(params.get('passo') || ''), wantedType = params.get('tipo');
const row = rows.find(r => normalizeThread(r.passo) === wanted && (!wantedType || r.tipo === wantedType))
  || rows.find(r => normalizeThread(threadLabel(r)) === wanted);

if(!row){
  $('#detailContent').innerHTML = '<section class="detail-error"><b>Não encontrei esta rosca.</b><p>Volte para a lista e escolha uma medida cadastrada.</p><a href="roscas.html">Voltar para Roscas</a></section>';
} else {
  const title = threadLabel(row), hasDrill = !!row.broca;
  document.title = `${title} — Usinagem Fácil`;
  $('#detailTitle').textContent = title;
  $('#detailType').textContent = row.tipo;
  $('#drillValue').textContent = hasDrill ? row.broca : 'Pendente';
  $('#processDrill').textContent = hasDrill ? `Ø ${row.broca} mm` : 'Validar na WestTools';
  $('#processThread').textContent = title;
  let diameter = 'Consulte a medida', pitch = 'Consulte a medida';
  const m = title.match(/^M\s*(\d+(?:[.,]\d+)?)\s*×\s*(\d+(?:[.,]\d+)?)/i);
  if(m){
    diameter = `Ø ${m[1]} mm`; pitch = `${m[2]} mm`;
    $('#diameterTag').textContent = `Ø ${m[1]} mm`;
    $('#pitchTag').textContent = `Passo ${m[2]} mm`;
    $('#learnText').textContent = `${title}: “M${m[1]}” indica o diâmetro nominal e “${m[2]}” indica o passo.`;
    $('#technicalText').textContent = hasDrill
      ? `${title} é uma rosca métrica cadastrada como “${row.tipo}”. Na tabela do aplicativo, a broca indicada para o furo é Ø ${row.broca} mm.`
      : `${title} está cadastrada, mas a broca permanece pendente de validação manual WestTools.`;
  } else {
    $('#diameterHelp').textContent = 'Identificação conforme a nomenclatura desta família de rosca.';
    $('#pitchHelp').textContent = 'A forma de indicar o passo depende da família da rosca.';
    $('#learnText').textContent = `${title} pertence à família ${row.tipo}.`;
    $('#technicalText').textContent = hasDrill
      ? `Para ${title}, a tabela técnica cadastrada no aplicativo indica broca Ø ${row.broca} mm.`
      : `${title} já possui estrutura técnica cadastrada, mas o diâmetro de pré-furo será preenchido somente após a validação manual com a tabela WestTools.`;
  }
  $('#diameterValue').textContent = diameter;
  $('#pitchValue').textContent = pitch;
  $('#learnButton').onclick = () => { const d = $('.technical-box'); d.open = true; d.scrollIntoView({behavior:'smooth', block:'center'}); };
}
