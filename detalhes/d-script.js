const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get('categoria');

async function carregarDetalhes() {
    const titulo = document.getElementById('title-category');
    const icone = document.getElementById('icon-category');
    const lista = document.getElementById('lista-itens');

    if (categoria) {
        titulo.innerText = categoria;
        icone.innerHTML = `<h1>${categoria.charAt(0)}</h1>`;
    } else {
        titulo.innerText = "Categoria não definida";
        return;
    }

    try {
        const response = await fetch('../data/data-maquinas.json');
        const maquinas = await response.json();

        let mostrarItens = [];

        if (categoria === "Máquinas") {
            mostrarItens = maquinas;
        } else {
            lista.innerHTML = "<p>Conteúdo desta categoria em breve...</p>";
            return;
        }

        lista.innerHTML = "";

        mostrarItens.forEach(item => {
            lista.innerHTML += `
                <div class="item-horizontal">
                    <img src="${item.img}" alt="${item.nome}" class="item-img">

                    <div class="item-info">

                        <div class="item-header">
                            <h3>${item.nome}</h3>
                            <span class="tag tipo">Tipo: ${item.tipo}</span>
                            <span class="tag caldeirao">Caldeirão: ${item.caldeirao}</span>
                        </div>

                        <p>${item.descricao}</p>

                        <div class="item-status">
                            <span class="tag">Fraquezas: ${item.fraquezas}</span>
                            <span class="tag">Forte contra: ${item.pontos_fortes}</span>
                        </div>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error("Erro ao carregar os dados: ", error);
    }
}

carregarDetalhes();
