const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get('categoria');

// Função para abrir/fechar o card (Adicione no início ou fim do arquivo)
function toggleCard(elem) {
    const card = elem.closest('.item-card');
    card.classList.toggle('active');
}

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
                <div class="item-card">
                    
                    <div class="card-header-view" onclick="toggleCard(this)">
                        <div class="card-image-wrapper">
                            <span class="tag-floating">${item.tipo}</span>
                            <img src="${item.img}" alt="${item.nome}" class="item-img-full">
                        </div>
                        
                        <div class="card-preview-info">
                            <h3>${item.nome}</h3>
                            <button class="btn-toggle" onclick="toggleCard(this)">
                                ▼
                            </button>
                        </div>
                    </div>

                    <div class="card-details-hidden">
                        <div class="details-content">
                            <span class="tag caldeirao">Caldeirão: ${item.caldeirao}</span>
                            
                            <p class="descricao">${item.descricao}</p>

                            <div class="item-status">
                                <span class="info-extra"><strong>Fraqueza:</strong> ${item.fraquezas}</span>
                                <span class="info-extra"><strong>Vantagem:</strong> ${item.pontos_fortes}</span>
                            </div>
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
