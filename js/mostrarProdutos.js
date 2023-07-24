import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");

function controiCard(imageUrl, categoria, produtoName, preco, id) {
    const img = document.createElement("li");
    img.className = "produtos__li";
    img.innerHTML = 
    `<li class="produtos__li">
        <img src="${imageUrl}" alt="" class="produtos__imgs" >
        <p class="produtos__descripton">${categoria}</p>
        <p class="produto__name">${produtoName}</p>
        <p class="produtos__preco">R$ ${preco}</p>
        <p class="produtos__id">#${id}</p>
        <button class="button__produtos-edit" data-edit></button>
        <button class="button__produtos-delet" data-delete></button> 
    </li class="produtos__li">`

    return img;
}

async function listaProduto() {
    const listaApi = await conectaApi.listaProduto();
    listaApi.forEach(elemento => lista.appendChild(
        controiCard(elemento.imageUrl, elemento.categoria, elemento.produtoName, elemento.preco, elemento.id)))
}

listaProduto();