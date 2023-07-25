async function listaProduto() {
    const conexao = await fetch("http://localhost:3000/produtos");
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function criaProduto(imageUrl, categoria, produtoName, preco, descricao, id) {
    const conexao = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            imageUrl: imageUrl,
            categoria: categoria,
            produtoName: produtoName,
            preco: preco,
            descricao: descricao,
            id: id
        })
    })

    const conexaoConvertida = await conexao.json();
}

async function atualizaProduto(id, imageUrl, categoria, produtoName, preco, descricao) {
  const conexao = await fetch(`http://localhost:3000/produtos/${id}`, {
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

export const conectaApi = {
    listaProduto,
    criaProduto
}
