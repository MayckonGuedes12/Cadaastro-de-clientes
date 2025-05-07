const API_BASE  = "https://crudcrud.com/api/e3b7c89e99c845d190ef26e6800ba30e/clientes"; // Substitua SEU_ENDPOINT_UNICO

const form = document.getElementById("cliente-form");
const lista = document.getElementById("lista-clientes");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  try {
    const resposta = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email })
    });

    if (!resposta.ok) throw new Error("Erro ao cadastrar cliente.");

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    carregarClientes();
  } catch (erro) {
    console.error(erro);
  }
});

async function carregarClientes() {
  lista.innerHTML = "";
  try {
    const resposta = await fetch(API_BASE);
    const clientes = await resposta.json();

    clientes.forEach(cliente => {
      const item = document.createElement("li");
      item.textContent = `${cliente.nome} - ${cliente.email} `;

      const botao = document.createElement("button");
      botao.textContent = "Excluir";
      botao.onclick = () => excluirCliente(cliente._id);

      item.appendChild(botao);
      lista.appendChild(item);
    });
  } catch (erro) {
    console.error("Erro ao carregar clientes:", erro);
  }
}

async function excluirCliente(id) {
  try {
    await fetch(`${API_BASE}/${id}`, {
      method: "DELETE"
    });
    carregarClientes();
  } catch (erro) {
    console.error("Erro ao excluir cliente:", erro);
  }
}

carregarClientes();
