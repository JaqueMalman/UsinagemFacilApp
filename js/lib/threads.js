// Apresentação das roscas de window.DB.roscas ({tipo, passo, broca}).

// "8x1,25" métrica → "M8 × 1,25"; outras famílias usam a própria designação ("UNC 1/4-20").
export function threadLabel(row) {
  const p = row.passo.replace('x', ' × ');
  return row.tipo.startsWith('M ') ? `M${p}` : p;
}

export function threadDetailUrl(row) {
  return `detalhe-rosca.html?passo=${encodeURIComponent(row.passo)}&tipo=${encodeURIComponent(row.tipo)}`;
}
