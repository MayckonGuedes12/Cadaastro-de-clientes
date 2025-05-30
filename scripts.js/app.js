// app.js
import { Cliente } from "./classes.js";
import { limparFormulario, criarElementoCliente } from "./utils.js";

const API_BASE = "https://crudcrud.com/api/961ac27706974d2fbf4d4fd29e824104/clientes";

const form = document.getElementById("cliente-form");
const lista = document.getElementById("lista-clientes");

// Evento de envio do formulário
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
    console.error("Erro ao cadastrar cliente:", erro);
  }
});

// Função para excluir cliente
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

// Função para carregar clientes e exibir na tela
async function carregarClientes() {
  lista.innerHTML = "";
  try {
    const resposta = await fetch(API_BASE);
    const clientes = await resposta.json();

    console.log("Clientes recebidos da API:", clientes); 
    const totalClientes = clientes
      .map(Cliente.fromJSON)
      .reduce((acc, cliente) => {
        lista.appendChild(criarElementoCliente(cliente, excluirCliente));
        return acc + 1;
      }, 0);

    console.log(`Total de clientes: ${totalClientes}`);
  } catch (erro) {
    console.error("Erro ao carregar clientes:", erro);
  }
}

// Carregar clientes ao iniciar a página
carregarClientes();
