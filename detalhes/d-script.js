const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get('categoria');

const bancoDeDados = { // só para simulação
    "Máquinas": [
        { nome: "Vigia", tipo: "Reconhecimento", desc: "Pequeno e ágil, alerta os outros.", img: "https://placehold.co/80" },
        { nome: "Tirânico", tipo: "Combate", desc: "O ápice das máquinas de combate.", img: "https://placehold.co/80" }
    ],
    "Tribos": [
        { nome: "Nora", tipo: "Caçadores", desc: "Vivem nas montanhas sagradas.", img: "https://placehold.co/80" },
        { nome: "Carja", tipo: "Sol", desc: "Adoradores do Sol.", img: "https://placehold.co/80" }
    ]
};

function carregarDetalhes() {
    const titulo = document.getElementById('title-category');
    const icone = document.getElementById('icon-category');
    const lista = document.getElementById('lista-itens');

    if (!categoria) {
        titulo.innerText = "Categoria não encontrada";
        return;
    }

    titulo.innerText = categoria;

    icone.innerHTML = `<h1>${categoria.charAt(0)}</h1>`;

    const itens = bancoDeDados[categoria];

    if (!itens) {
        lista.innerHTML = "<p>Em breve adicionaremos mais conteúdo aqui!</p>"
        return;
    }

    lista.innerHTML = "";
    itens.forEach(item => {
        lista.innerHTML += `
            <div class="item-horizontal">
                <img src="${item.img}" alt="${item.nome}" class="item-img">

                <div class="item-info">
                    <h3>${item.nome}</h3>
                    <span class=""tag>${item.tipo}</span>
                    <p>${item.desc}</p>
                </div>
            </div>
        `;
    });
}

carregarDetalhes();
