// @ts-nocheck
let produtos = [];
let modal = document.getElementById("modalEditar");
let closeBtn = document.querySelector(".close");
let formProduto = document.getElementById("formProduto");
let formEditar = document.getElementById("formEditar");
let buscarInput = document.getElementById("buscar");
let filtroCategoria = document.getElementById("filtroCategoria");
let btnLimparFiltros = document.getElementById("btnLimparFiltros");

document.addEventListener("DOMContentLoaded", function () {
  inicializarPagina();
});

function inicializarPagina() {
  console.log("Página de Estoque pronta para receber dados do backend");
  carregarProdutos();
}

formProduto.addEventListener("submit", async function (e) {
  e.preventDefault();

  let name = document.getElementById("nome").value;
  let category = document.getElementById("categoria").value;
  let price = document.getElementById("preco").value;
  price = parseInt(price);
  let quantity = document.getElementById("quantidade").value;
  quantity = parseInt(quantity);

  const response = await fetch("http://localhost:3000/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, category, price, quantity }),
  });
  if (response.ok) {
    location.reload();
  }
});

formEditar.addEventListener("submit", async function (e) {
  e.preventDefault();

  const id = document.getElementById("editarId").value;
  const name = document.getElementById("editarNome").value;
  const category = document.getElementById("editarCategoria").value;
  let price = document.getElementById("editarPreco").value;
  let quantity = document.getElementById("editarQuantidade").value;
  price = parseInt(price);
  quantity = parseInt(quantity);

  if (!id) {
    return;
  }

  const response = await fetch(`http://localhost:3000/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, category, price, quantity }),
  });

  if (response.ok) {
    modal.style.display = "none";
    location.reload();
  }
});

// Fechar Modal
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Buscar Produtos
buscarInput.addEventListener("input", function () {
  // Aqui será implementada a busca
  console.log("Buscando por:", this.value);
});

// Filtrar por Categoria
filtroCategoria.addEventListener("change", function () {
  // Aqui será implementado o filtro
  console.log("Filtrando categoria:", this.value);
});

// Limpar Filtros
btnLimparFiltros.addEventListener("click", function () {
  buscarInput.value = "";
  filtroCategoria.value = "";
  // Carregar todos os produtos novamente
});

// Funções placeholder para o backend
function abrirModalEditar(product) {
  modal.style.display = "block";
  document.getElementById("editarId").value = product.id;
  document.getElementById("editarNome").value = product.name;
  document.getElementById("editarCategoria").value = product.category;
  document.getElementById("editarPreco").value = product.price;
  document.getElementById("editarQuantidade").value = product.quantity;
}

function deletarProduto(id) {
    if (confirm('Deseja Deletar este produto')) {
        fetch(`http://localhost:3000/product/${id}`, {
            method: 'DELETE'
        })
        location.reload()
    }
    else {
        return
    }
    
}

async function carregarProdutos() {
  let tabelaProdutos = document.getElementById("tabelaProdutos");

  console.log("Carregando produtos do backend");
  const response = await fetch("http://localhost:3000/products");
  const products = await response.json();
  for (let product of products) {
    const productTr = document.createElement("tr");
    const productName = document.createElement("td");
    const productCategory = document.createElement("td");
    const productPrice = document.createElement("td");
    const productQuantity = document.createElement("td");
    const productStatus = document.createElement("td");
    const productActionsTable = document.createElement('td')
    const productDeleteBtn = document.createElement('button')
    const productEditBtn = document.createElement('button')

    productDeleteBtn.classList.add('btn', 'btn-small', 'btn-danger')
    productDeleteBtn.innerText = 'Deletar'
    productEditBtn.classList.add('btn', 'btn-small', 'btn-warning')
    productEditBtn.innerText = 'Editar'
    productEditBtn.onclick = () => abrirModalEditar(product)
    productDeleteBtn.onclick = () => deletarProduto(product.id)

    productActionsTable.append(productEditBtn, productDeleteBtn)

    if (product.quantity > 5) {
      productStatus.innerText = "Em Estoque";
      productStatus.classList.add("status-badge", "status-in-stock");
    } else {
      productStatus.innerHTML = "Pouco Unidades";
      productStatus.classList.add("status-badge", "status-low-stock");
    }

    productName.innerText = product.name;
    productCategory.innerText = product.category;
    productPrice.innerText = product.price;
    productQuantity.innerText = product.quantity;

    productTr.append(
      productName,
      productCategory,
      productPrice,
      productQuantity,
      productStatus,
      productActionsTable,
    );

    tabelaProdutos.append(productTr);
  }
}

function atualizarTabela(dados) {
  // Esta função preencherá a tabela com dados do backend
  console.log("Atualizando tabela com dados:", dados);
}

function atualizarResumo() {
  // Esta função atualizará os cards de resumo
  console.log("Atualizando resumo de estoque");
}
