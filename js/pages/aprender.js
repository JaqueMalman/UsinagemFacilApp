import { normalizeSearch, debounce } from '../lib/text.js';

const topics={
rpm:{icon:'⚙️',title:'O que é RPM?',simple:'RPM é quantas voltas acontecem em 1 minuto.',visual:'↻  ↻  ↻',example:'1.000 RPM = 1.000 voltas por minuto.',tip:'No fresamento, normalmente observamos o diâmetro da ferramenta. No torneamento, o diâmetro da peça.',technical:'Na tabela técnica: n = Vc × 1000 ÷ (π × D). No fresamento, D é o diâmetro da ferramenta (Dc); no torneamento, é o diâmetro da peça.'},
vc:{icon:'🏎️',title:'Velocidade de corte (Vc)',simple:'É a velocidade com que o corte acontece na superfície da peça ou ferramenta.',visual:'CUT → → →',example:'Ela é informada em m/min.',tip:'Não confunda velocidade de corte com RPM: uma é velocidade linear; a outra é quantidade de voltas.',technical:'Na tabela técnica: Vc = π × D × n ÷ 1000.'},
avanco:{icon:'➡️',title:'O que é avanço?',simple:'É o quanto a ferramenta ou a peça se desloca enquanto o corte acontece.',visual:'⚙️  ➜➜  ▰',example:'Avanço por minuto é mostrado em mm/min.',tip:'Quanto maior o avanço, maior o deslocamento por unidade de tempo. O valor correto depende do processo e da ferramenta.',technical:'Na tabela técnica: vf = n × f e f = vf ÷ n.'},
fz:{icon:'🦷',title:'Avanço por faca (fz)',simple:'É quanto cada dente da fresa avança durante o corte.',visual:'🦷  🦷  🦷  🦷',example:'Uma fresa de 4 facas tem 4 dentes participando a cada volta.',tip:'Para calcular o avanço por minuto, você precisa saber RPM, número de facas (z) e fz.',technical:'Na tabela técnica: fz = vf ÷ (n × z). Portanto, vf = n × z × fz.'},
rosca:{icon:'🔩',title:'Como entender M10 × 1,5?',simple:'M indica rosca métrica. 10 é o diâmetro nominal. 1,5 é o passo.',visual:'M10   ↔   1,5 mm',example:'M10 × 1,5 → diâmetro nominal 10 mm e passo 1,5 mm.',tip:'O furo feito antes de passar o macho é menor que o diâmetro nominal. Consulte a tabela de roscas do aplicativo.',technical:'O aplicativo mantém a seleção da broca em Roscas/Tabelas, conforme os dados técnicos cadastrados.'},
diametro:{icon:'📏',title:'O que é diâmetro?',simple:'É a medida de um lado ao outro de uma forma circular, passando pelo centro.',visual:'◀──── Ø ────▶',example:'Fresa Ø10 = ferramenta com 10 mm de diâmetro.',tip:'No cálculo de RPM do fresamento use o diâmetro da ferramenta. No torneamento use o diâmetro da peça na região usinada.',technical:'Nas fórmulas, o diâmetro aparece como Dc no fresamento/furação e D no torneamento.'},
facas:{icon:'🔢',title:'Número de facas (z)',simple:'É a quantidade de dentes cortantes da fresa.',visual:'① ② ③ ④',example:'Se você contar 4 dentes, z = 4.',tip:'Conte os dentes que se repetem ao redor da ferramenta. Não confunda canal com dente.',technical:'O número de facas aparece como z na fórmula fz = vf ÷ (n × z).'},
polegada:{icon:'½″',title:'Como ler polegadas?',simple:'Polegadas podem aparecer como frações: 1/2”, 3/8”, 1/4” e outras.',visual:'0 ┃ ¼ ┃ ½ ┃ ¾ ┃ 1″',example:'1/2” corresponde a 12,70 mm.',tip:'Use a página Conversões quando precisar passar de polegada para milímetro ou de milímetro para polegada.',technical:'A conversão usa 1 polegada = 25,4 mm.'}}
const grid=document.getElementById('learnGrid'), search=document.getElementById('learnSearch'), clear=document.getElementById('learnClear'), sheet=document.getElementById('learnSheet'), content=document.getElementById('learnContent'), empty=document.getElementById('learnEmpty');
// Janela de explicação: ao abrir, o foco vai para o "×"; Tab fica dentro dela; Escape,
// o "×" ou tocar fora fecham; ao fechar, o foco volta para o card que abriu.
const closeBtn = document.getElementById('learnClose');
let opener = null;

function openTopic(k) {
  const t = topics[k];
  if (!t) return;
  content.innerHTML = `<div class="learn-big-icon">${t.icon}</div><div class="eyebrow">EXPLICAÇÃO SIMPLES</div><h2 id="learnTitle">${t.title}</h2><p class="learn-simple">${t.simple}</p><div class="learn-visual">${t.visual}</div><div class="learn-example"><small>EXEMPLO</small><strong>${t.example}</strong></div><div class="learn-tip"><span>💡</span><p>${t.tip}</p></div><details class="formula-box"><summary>ⓘ Ver parte técnica</summary><p>${t.technical}</p></details>`;
  opener = document.activeElement;
  sheet.classList.add('open');
  sheet.setAttribute('aria-hidden', 'false');
  closeBtn.focus();
}

function closeSheet() {
  if (!sheet.classList.contains('open')) return;
  sheet.classList.remove('open');
  sheet.setAttribute('aria-hidden', 'true');
  opener?.focus();
}

sheet.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeSheet(); return; }
  if (e.key !== 'Tab') return;
  const items = [...sheet.querySelectorAll('.learn-sheet-card button, .learn-sheet-card summary, .learn-sheet-card a[href]')];
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
grid.addEventListener('click', e => { const b = e.target.closest('[data-topic]'); if (b) openTopic(b.dataset.topic); });
closeBtn.onclick = closeSheet;
document.getElementById('learnBackdrop').onclick = closeSheet;
function filterTopics(){
  const q = normalizeSearch(search.value).trim();
  clear.style.visibility = q ? 'visible' : 'hidden';
  let shown = 0;
  grid.querySelectorAll('.learn-card').forEach(b => {
    const ok = !q || normalizeSearch(b.innerText + ' ' + b.dataset.keywords).includes(q);
    b.classList.toggle('is-hidden', !ok);
    if(ok) shown++;
  });
  empty.classList.toggle('is-hidden', shown > 0);
}
search.addEventListener('input', debounce(filterTopics, 100));
clear.onclick = () => { search.value = ''; filterTopics(); search.focus(); };
