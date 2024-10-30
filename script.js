const form = document.querySelector('#form-movimentacao');
const descricao = document.querySelector('#descricao');
const valor = document.querySelector('#valor');
const tipo = document.querySelector('#tipo');
const listaMovimentacoes = document.querySelector('#lista-movimentacoes');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const movimentacao = {
    descricao: descricao.value,
    valor: valor.value,
    tipo: tipo.value,
  };

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${movimentacao.descricao}</span>
    <span>${movimentacao.valor}</span>
    <span>${movimentacao.tipo}</span>
  `;
  listaMovimentacoes.appendChild(li);

  descricao.value = '';
  valor.value = '';
  tipo.value = '';
});