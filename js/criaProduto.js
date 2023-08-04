import { conectaApi } from "./conectaApi.js";

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("[data-formulario]");

  if (formulario) {
    formulario.addEventListener("submit", evento => criarProduto(evento));
  } else {
    console.error("Elemento não encontrado: [data-formulario]");
  }
});

async function criarProduto(evento) {
  evento.preventDefault();

  const imagem = document.querySelector("[data-imagem]").value;
  const categoria = document.querySelector("[data-categoria]").value;
  const produtoName = document.querySelector("[data-produtoName]").value;
  const preco = document.querySelector("[data-preco]").value;
  const descricao = document.querySelector("[data-descricao]").value;

  await conectaApi.criaProduto(imagem, categoria, produtoName, preco, descricao);

  window.location.href = "../todosProdutos.html";
}