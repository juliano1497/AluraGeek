async function atualizaProduto(id, imageUrl, categoria, produtoName, preco, descricao) {
  const conexao = await fetch(`https://64b692a1df0839c97e15cd3b.mockapi.io/produtos/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      imageUrl: imageUrl,
      categoria: categoria,
      produtoName: produtoName,
      preco: preco,
      descricao: descricao
    })
  });

  const produtoAtualizado = await conexao.json();
  console.log("Produto atualizado:", produtoAtualizado);
  
  document.querySelector("[data-edit]").addEventListener("click", function() {
    atualizaProduto(id, imageUrl, categoria, produtoName, preco, descricao);
  });
}

