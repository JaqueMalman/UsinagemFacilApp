// Barra de navegação inferior, igual em todas as páginas.
// Cada página coloca <nav class="bottom-nav"></nav> e este módulo desenha as abas.
const TABS = [
  { id: 'inicio', href: 'index.html', icon: '⌂', label: 'Início' },
  { id: 'roscas', href: 'roscas.html', icon: '🔩', label: 'Roscas' },
  { id: 'calcular', href: 'calculadoras.html', icon: '🧮', label: 'Calcular' },
  { id: 'mais', href: 'tabelas.html', icon: '☰', label: 'Mais' },
];

// Aba destacada em cada página. Páginas fora da lista (ex.: furos.html) não destacam nenhuma.
export const PAGE_TAB = {
  'index.html': 'inicio',
  'roscas.html': 'roscas', 'detalhe-rosca.html': 'roscas',
  'calculadoras.html': 'calcular', 'fresamento.html': 'calcular', 'torneamento.html': 'calcular',
  'avanco-fresamento.html': 'calcular', 'conversoes.html': 'calcular',
  'tabelas.html': 'mais', 'aprender.html': 'mais', 'auditoria-tecnica.html': 'mais',
};

export function pageName(pathname) {
  return pathname.split('/').pop() || 'index.html';
}

export function renderNav(nav, page) {
  const active = PAGE_TAB[page];
  nav.setAttribute('aria-label', 'Navegação principal');
  nav.innerHTML = TABS.map(t => {
    const current = t.id === active ? ' aria-current="page" class="active"' : '';
    return `<a${current} href="${t.href}"><span>${t.icon}</span><small>${t.label}</small></a>`;
  }).join('');
}

const nav = typeof document !== 'undefined' && document.querySelector('nav.bottom-nav');
if (nav) renderNav(nav, pageName(location.pathname));
