// Copiar e enviar pelo WhatsApp o texto do último cálculo.

export const whatsappUrl = text => `https://wa.me/?text=${encodeURIComponent(text)}`;

// Texto de um cálculo: título, uma linha por valor informado e o resultado.
export function calcText(title, lines, result) {
  return ['Usinagem Fácil · ' + title, ...lines, 'Resultado: ' + result].join('\n');
}

// Tenta a área de transferência do navegador; sem ela (página sem HTTPS, navegador antigo),
// usa uma caixa de texto escondida. Retorna true se copiou.
export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch (_) {}
  const box = document.createElement('textarea');
  box.value = text; box.setAttribute('readonly', ''); box.style.cssText = 'position:fixed;opacity:0';
  document.body.appendChild(box); box.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (_) {}
  box.remove();
  return ok;
}

// Desenha "Copiar" e "WhatsApp" em `box` (começa escondido).
// show(texto) mostra os botões para aquele cálculo; hide() esconde quando não há resultado.
export function setupShare(box) {
  box.innerHTML = '<button class="share-btn" type="button">📋 Copiar</button>'
    + '<a class="share-btn whatsapp" target="_blank" rel="noopener">💬 WhatsApp</a>';
  const copy = box.querySelector('button'), whatsapp = box.querySelector('a');
  let text = '', timer;
  copy.onclick = async () => {
    const ok = await copyText(text);
    copy.textContent = ok ? '✓ Copiado' : 'Não foi possível copiar';
    clearTimeout(timer);
    timer = setTimeout(() => { copy.textContent = '📋 Copiar'; }, 2000);
  };
  return {
    show(t) { text = t; whatsapp.href = whatsappUrl(t); box.hidden = false; },
    hide() { box.hidden = true; }
  };
}
