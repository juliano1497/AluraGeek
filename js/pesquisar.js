 async function buscarProdutosPorTitulo(preco) {
    const response = await fetch(`http://localhost:3000/produtos?categoria=${encodeURIComponent(preco)}`);
    const data = await response.json();
    return data;
  }

  function atualizarListaProdutos(produtos) {
    const listaProdutos = document.querySelector("[data-lista]");

    listaProdutos.innerHTML = "";
  
    produtos.forEach((produto) => {
      const itemProduto = controiCard(produto.imageUrl, produto.categoria, produto.produtoName, produto.preco, produto.id);
      listaProdutos.appendChild(itemProduto);
    });
  }
  
  async function pesquisar() {
    const inputPesquisa = document.getElementById("pesquisar");
    const termoPesquisa = inputPesquisa.value.trim();
  
    if (termoPesquisa !== "") {
      try {
        const produtosEncontrados = await buscarProdutosPorTitulo(termoPesquisa);
        atualizarListaProdutos(produtosEncontrados);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
  }
  
  const botaoPesquisar = document.querySelector(".search__lupa");
  botaoPesquisar.addEventListener("click", pesquisar);

  const inputPesquisa = document.getElementById("pesquisar");
  inputPesquisa.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      pesquisar();
    }
  });