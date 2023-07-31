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

export const conectaApi = {
    listaProduto,
    criaProduto
}
