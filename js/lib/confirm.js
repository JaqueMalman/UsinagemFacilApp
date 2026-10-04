// Botão de apagar que pede um segundo toque: o primeiro muda o texto para
// confirmar e, se ninguém tocar de novo em 4 segundos, ele volta ao normal.
export function twoTapButton(button, onConfirm, { label = button.textContent, confirmLabel = 'Toque de novo para apagar' } = {}) {
  let timer;
  const reset = () => { clearTimeout(timer); button.classList.remove('confirm'); button.textContent = label; };
  button.onclick = () => {
    if (!button.classList.contains('confirm')) {
      button.classList.add('confirm'); button.textContent = confirmLabel;
      timer = setTimeout(reset, 4000);
      return;
    }
    reset(); onConfirm();
  };
}
