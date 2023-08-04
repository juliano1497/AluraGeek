import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");

function controiCard(imageUrl, categoria, produtoName, preco, id) {
    const img = document.createElement("li");
    img.className = "produtos__li";
    img.innerHTML = 
      `<li class="produtos__li">
          <img src="${imageUrl}" alt="" class="produtos__imgs">
          <p class="produtos__descripton">${categoria}</p>
          <p class="produto__name">${produtoName}</p>
          <p class="produtos__preco">R$ ${preco}</p>
          <p class="produtos__id">#${id}</p>
          <button class="button__produtos-edit" data-edit data-id="${id}"></button>
          <button class="button__produtos-delet" data-delete data-id="${id}"></button>
      </li>`;

    const editButton = img.querySelector("[data-edit]");
    const deleteButton = img.querySelector("[data-delete]");
  

    async function atualizaProduto(id, imageUrl, categoria, produtoName, preco) {
      const conexao = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          imageUrl: imageUrl,
          categoria: categoria,
          produtoName: produtoName,
          preco: preco
        })
      });
    
      const produtoAtualizado = await conexao.json();
      console.log("Produto atualizado:", produtoAtualizado);
      
      document.querySelector("[data-edit]").addEventListener("click", function() {
        atualizaProduto(id, imageUrl, categoria, produtoName, preco);
      });
    }
    editButton.addEventListener("click", () => {
      img.innerHTML =
        `<li class="produtos__li">
            <img src="${imageUrl}" alt="" class="produtos__imgs">
            <input class="produtos__descripton editar__produtos" value="${categoria}" data-categoria-edit>
            <input class="produto__name" value="${produtoName}" data-produtoName-edit>
            <input class="produtos__preco editar__produtos" value="${preco}" data-preco-edit>
            <p class="produtos__id">#${id}</p>
            <button class="button__produtos-edit edit__clicado" data-save data-id="${id}">Salvar</button>
        </li>`;
        
      const saveButton = img.querySelector("[data-save]");
      const categoriaEditInput = img.querySelector("[data-categoria-edit]");
      const produtoNameEditInput = img.querySelector("[data-produtoName-edit]");
      const precoEditInput = img.querySelector("[data-preco-edit]");
  
      saveButton.addEventListener("click", async () => {
        const updatedCategoria = categoriaEditInput.value;
        const updatedProdutoName = produtoNameEditInput.value;
        const updatedPreco = precoEditInput.value;

        await atualizaProduto(id, imageUrl, updatedCategoria, updatedProdutoName, updatedPreco);

        img.innerHTML =
          `<li class="produtos__li">
              <img src="${imageUrl}" alt="" class="produtos__imgs">
              <p class="produtos__descripton">${updatedCategoria}</p>
              <p class="produto__name">${updatedProdutoName}</p>
              <p class="produtos__preco">R$ ${updatedPreco}</p>
              <p class="produtos__id">#${id}</p>
              <button class="button__produtos-edit" data-edit data-id="${id}"></button>
              <button class="button__produtos-delet" data-delete data-id="${id}"></button>
          </li>`;
      });
    });
  
    async function excluiProduto(id) {
        const conexao = await fetch(`http://localhost:3000/produtos/${id}`, {
            method: "DELETE"
        });
      
        if (conexao.ok) {
            console.log("Produto excluído com sucesso.");
        } else {
            console.log("Erro ao excluir o produto.");
        }
      }
      
    deleteButton.addEventListener("click", () => {
        excluiProduto(id);
        console.log("Delete button clicked for product with ID:", id);
    });

    return img;
  
}

async function listaProduto() {
    const listaApi = await conectaApi.listaProduto();
    listaApi.forEach(elemento => lista.appendChild(
        controiCard(elemento.imageUrl, elemento.categoria, elemento.produtoName, elemento.preco, elemento.id)))
}

listaProduto();