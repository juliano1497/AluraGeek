async function listaProduto() {
    const conexao = await fetch("https://64b692a1df0839c97e15cd3b.mockapi.io/produtos");
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}


async function criaProduto(imageUrl, categoria, produtoName, preco, descricao, id) {
    const conexao = await fetch("https://64b692a1df0839c97e15cd3b.mockapi.io/produtos", {
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

async function excluiProduto(id) {
    const conexao = await fetch(`https://64b692a1df0839c97e15cd3b.mockapi.io/produtos/${id}`, {
      method: "DELETE"
    });
    document.querySelector("[data-delete]").addEventListener("click", function() {
        excluiProduto(2);
      });
  
    if (conexao.ok) {
      console.log("Produto excluído com sucesso.");
    } else {
      console.log("Erro ao excluir o produto.");
    }
  }



export const conectaApi = {
    listaProduto,
    criaProduto,
    excluiProduto
}
