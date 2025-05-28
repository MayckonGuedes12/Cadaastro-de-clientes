// app.js
import { Cliente } from "scrpts.js/classes.js";
import { limparFormulario, criarElementoCliente } from "scrpts.js/utils.js";

const API_BASE = "https://crudcrud.com/api/0b5ebd9c3f7d492eafa3f5a6516de201/clientes";

const form = document.getElementById("cliente-form");
const lista = document.getElementById("lista-clientes");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  const cliente = new Cliente(nome, email);

  try {
    const resposta = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    });

    if (!resposta.ok) throw new Error("Erro ao cadastrar cliente.");
    limparFormulario(form);
    carregarClientes();
  } catch (erro) {
    console.error(erro);
  }
});

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

async function carregarClientes() {
  lista.innerHTML = "";
  try {
    const resposta = await fetch(API_BASE);
    const clientes = await resposta.json();

    clientes
      .map(Cliente.fromJSON)
      .forEach(cliente => {
        lista.appendChild(criarElementoCliente(cliente, excluirCliente));
      });
  } catch (erro) {
    console.error("Erro ao carregar clientes:", erro);
  }
}

carregarClientes();
