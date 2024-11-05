const loja = [
    { id: 1, nome: "Chocolate Suiço", preco: 30.0, imagem: "https://images.pexels.com/photos/4791265/pexels-photo-4791265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 2, nome: "Focaccia", preco: 15.50, imagem: "https://images.pexels.com/photos/6557292/pexels-photo-6557292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 3, nome: "Vinho", preco: 50.0, imagem: "https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 4, nome: "Café Arábica", preco: 28.50, imagem: "https://images.pexels.com/photos/5214207/pexels-photo-5214207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
];

const carrinho = [];

function atualizarCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho');
    carrinhoContainer.innerHTML = '';

    let total = 0;

    carrinho.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item-carrinho';
        itemDiv.innerHTML = `
            <h5>${item.nome}</h5>
            <p>R$${(item.preco * item.quantidade).toFixed(2)}</p>
            <input
                class="quantidade-input"
                type="number"
                min="1"
                value="${item.quantidade}"
                onchange="mudarQuantidade(${item.id}, this.value)"
            />
            <button onclick="removerItem(${item.id})">Remover</button>
        `;
        carrinhoContainer.appendChild(itemDiv);
        total += item.preco * item.quantidade; 
    });

    document.getElementById('total').innerText = `Total: R$${total.toFixed(2)}`; 
}

function adicionarItem(produto) {
    const existe = carrinho.find(item => item.id === produto.id);
    if (existe) {
        existe.quantidade++; 
    } else {
        
        carrinho.push({ ...produto, quantidade: 1 });
    }
    atualizarCarrinho(); 
}

function mudarQuantidade(id, quantidade) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        item.quantidade = Math.max(1, parseInt(quantidade)); 
        atualizarCarrinho(); 
    }
}

function removerItem(id) {
    const index = carrinho.findIndex(item => item.id === id);
    if (index > -1) {
        carrinho.splice(index, 1); 
    }
    atualizarCarrinho(); 
}

function carregarProdutos() {
    const lojaContainer = document.getElementById('loja');
    loja.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.className = 'item-loja';
        produtoDiv.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" style="width: 100%; height: auto" />
            <h4>${produto.nome}</h4>
            <p>R$${produto.preco.toFixed(2)}</p>
            <button onclick='adicionarItem(${JSON.stringify(produto)})'>Comprar</button>
        `;
        lojaContainer.appendChild(produtoDiv);
    });
}

window.onload = carregarProdutos; 