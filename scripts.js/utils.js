// utils.js
export function limparFormulario(form) {
  form.reset();
}

// utils.js
export function criarElementoCliente(cliente, excluirCallback) {
  const li = document.createElement("li");
  li.textContent = `${cliente.nome} - ${cliente.email} `;

  const botao = document.createElement("button");
  botao.textContent = "Excluir";
  botao.addEventListener("click", () => excluirCallback(cliente._id));

  li.appendChild(botao);
  return li;
}

