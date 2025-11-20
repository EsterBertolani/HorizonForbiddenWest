let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

async function carregarDados() {
    try {
        const response = await fetch("data.json");
        dados = await response.json();
        renderizarCards(dados);
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
    
}

async function buscar() {
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
            return;
        }
    }

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

async function filtrarDados() {
    const termo = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termo) ||
        dado.descricao.toLowerCase().includes(termo)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = "";

    if (dados.length === 0) {
        cardContainer.innerHTML = `
            <div class="sem-resultados">
                <h2>Nenhum resultado encontrado</h2>
                <p>Tente ajustar seus termos de busca.</p>
            </div>
        `;
        return;
    }

    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");

        let imagemSrc = dado.imagem ? dado.imagem : "https://placeholder.com/100";

        article.innerHTML = `
            <img src="${imagemSrc}" alt="${dado.nome}" class="card-img"/>
            <h2>${dado.nome}</h2>
            <p>${dado.descricao}</p>
        `
        cardContainer.appendChild(article);
    }
}

campoBusca.addEventListener("input", filtrarDados);

carregarDados();
