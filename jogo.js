

let tabuleiro = ["", "", "", "", "", "", "", "", ""]
let = vezJogador1 = true

let botoes = []

for (let i = 0; i < 9; i++) {
    botoes[i] = document.querySelector(`.btn${i}`)
}



document.addEventListener('click', e => {
    let elemento = e.target

    for (let i in botoes) {
        if (elemento.classList.contains(`btn${i}`)) {
            if (tabuleiro[i] === "" && vezJogador1) {
                botoes[i].innerText += "X"
                tabuleiro[i] = "X"
                jogadaAleatória(tabuleiro)
            }
    
        }
    }

})

while (!vezJogador1) {
    jogadaAleatória(tabuleiro)
}


function jogadaAleatória(tabuleiro) {

    let jogadasDisponiveis = []
    for (let i in tabuleiro) {
        if (tabuleiro[i].length === 0) {
            jogadasDisponiveis.push(i)
        }
    }
    embaralharArray(jogadasDisponiveis)

    botoes[jogadasDisponiveis[0]].innerText += "O"
    tabuleiro[jogadasDisponiveis[0]] = "O"

}

// Função para embaralhar um array
function embaralharArray(array) {
    // Loop em todos os elementos
    for (let i = array.length - 1; i > 0; i--) {
    // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [array[i], array[j]] = [array[j], array[i]];
}
// Retornando array com aleatoriedade
return array;
}