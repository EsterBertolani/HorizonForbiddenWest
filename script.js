let dados = [];

async function buscar() {
    let resposta = await fetch("data.json")

    dados = await resposta.json();

    console.log(dados);
}