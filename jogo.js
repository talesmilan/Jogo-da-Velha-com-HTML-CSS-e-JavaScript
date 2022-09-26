

let tabuleiro = ["", "", "", "", "", "", "", "", ""]
let vezJogador1 = true
let jogadas = 0
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
                jogadas++
                setTimeout(function() { 
                    jogadaPlanejada(tabuleiro)
                    jogadas++
                }, 2000);

            }
    
        }
    }

})

function checarSeAcabou(tabuleiro) {
    let c = 0
    for (let i = 0; i < 7; i += 3) {
        if (tabuleiro[i] === "X" && tabuleiro[i+1] === "X" && tabuleiro[i+2] === "X") {
            return 1
        } else if (tabuleiro[i] === "O" && tabuleiro[i+1] === "O" && tabuleiro[i+2] === "O") {
            return 2
        } else if (tabuleiro[c] === "X" && tabuleiro[c+3] === "X" && tabuleiro[c+6] === "X") {
            return 1
        } else if (tabuleiro[c] === "O" && tabuleiro[c+3] === "O" && tabuleiro[c+6] === "O") {
            return 2
        }
        c++
    }
    if (tabuleiro[0] === "X" && tabuleiro[4] == "X" && tabuleiro[8] === "X") {
        return 1
    } else if (tabuleiro[0] === "O" && tabuleiro[4] == "O" && tabuleiro[8] === "O") {
        return 2
    } else if (tabuleiro[2] === "X" && tabuleiro[4] == "X" && tabuleiro[6] === "X") {
        return 1
    } else if (tabuleiro[2] === "O" && tabuleiro[4] == "O" && tabuleiro[6] === "O") {
        return 2
    }

    if (jogadas === 8) {
        return 3
    }
    return 0
}



// Faz uma jogada aleatória no tabuleiro
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

function contaJogadas(tabuleiro) {
    let conta = 0
    for (let i = 0; i < 9; i++) {
        if (tabuleiro[i] !== "") {
            conta++
        }
    return conta
    }
}



function jogadaPlanejada() {

    console.log(tabuleiro)
    console.log(jogadas)
    if (jogadas === 0) {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
    } else if (jogadas === 1 && tabuleiro[4] === "") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
    } else if (jogadas === 1 && tabuleiro[4] != "") {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
    } else if (jogadas === 2 && (tabuleiro[4] === "X" || tabuleiro[2] === "X" || tabuleiro [6] === "X")) {
        tabuleiro[8] = "O";
        botoes[8].innerText += "O"
    } else if (jogadas === 2 && tabuleiro[3] === "X") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
    } else if (jogadas === 2 && tabuleiro[8] === "X") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
    } else if (jogadas === 2 && tabuleiro[1] === "X") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
    } else if (jogadas === 2 && tabuleiro[7] === "X") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
    } else if (jogadas === 2 && tabuleiro[5] === "X") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "O" && tabuleiro[1] === "O" && tabuleiro[2] === "") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "O" && tabuleiro[1] === "" && tabuleiro[2] === "O") {
        tabuleiro[1] = "O";
        botoes[1].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "" && tabuleiro[1] === "O" && tabuleiro[2] === "O") {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[3] === "O" && tabuleiro[4] === "O" && tabuleiro[5] === "") {
        tabuleiro[5] = "O";
        botoes[5].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[3] === "O" && tabuleiro[4] === "" && tabuleiro[5] === "O") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[3] === "" && tabuleiro[4] === "O" && tabuleiro[5] === "O") {
        tabuleiro[3] = "O";
        botoes[3].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[6] === "" && tabuleiro[7] === "O" && tabuleiro[8] === "O") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[6] === "O" && tabuleiro[7] === "" && tabuleiro[8] === "O") {
        tabuleiro[7] = "O";
        botoes[7].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[6] === "O" && tabuleiro[7] === "O" && tabuleiro[8] === "") {
        tabuleiro[8] = "O";
        botoes[8].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "O" && tabuleiro[3] === "O" && tabuleiro[6] === "") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "O" && tabuleiro[3] === "" && tabuleiro[6] === "O") {
        tabuleiro[3] = "O";
        botoes[3].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "" && tabuleiro[3] === "O" && tabuleiro[6] === "O") {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[1] === "O" && tabuleiro[4] === "O" && tabuleiro[7] === "") {
        tabuleiro[7] = "O";
        botoes[7].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[1] === "O" && tabuleiro[4] === "" && tabuleiro[7] === "O") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[1] === "" && tabuleiro[4] === "O" && tabuleiro[7] === "O") {
        tabuleiro[1] = "O";
        botoes[1].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[2] === "O" && tabuleiro[5] === "O" && tabuleiro[8] === "") {
        tabuleiro[8] = "O";
        botoes[8].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[2] === "O" && tabuleiro[5] === "" && tabuleiro[8] === "O") {
        tabuleiro[5] = "O";
        botoes[5].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[2] === "" && tabuleiro[5] === "O" && tabuleiro[8] === "O") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "O" && tabuleiro[4] === "O" && tabuleiro[8] === "") {
        tabuleiro[8] = "O";
        botoes[8].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "O" && tabuleiro[4] === "" && tabuleiro[8] === "O") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "" && tabuleiro[4] === "O" && tabuleiro[8] === "O") {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[2] === "O" && tabuleiro[4] === "O" && tabuleiro[6] === "") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[2] === "O" && tabuleiro[4] === "" && tabuleiro[6] === "O") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[2] === "" && tabuleiro[4] === "O" && tabuleiro[6] === "O") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "X" && tabuleiro[1] === "X" && tabuleiro[2] === "") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "X" && tabuleiro[1] === "" && tabuleiro[2] === "X") {
        tabuleiro[1] = "O";
        botoes[1].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "" && tabuleiro[1] === "X" && tabuleiro[2] === "X") {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[3] === "X" && tabuleiro[4] === "X" && tabuleiro[5] === "") {
        tabuleiro[5] = "O";
        botoes[5].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[3] === "X" && tabuleiro[4] === "" && tabuleiro[5] === "X") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[3] === "" && tabuleiro[4] === "X" && tabuleiro[5] === "X") {
        tabuleiro[3] = "O";
        botoes[3].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[6] === "" && tabuleiro[7] === "X" && tabuleiro[8] === "X") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[6] === "X" && tabuleiro[7] === "" && tabuleiro[8] === "X") {
        tabuleiro[7] = "O";
        botoes[7].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[6] === "X" && tabuleiro[7] === "X" && tabuleiro[8] === "") {
        tabuleiro[8] = "O";
        botoes[8].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "X" && tabuleiro[3] === "X" && tabuleiro[6] === "") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "X" && tabuleiro[3] === "" && tabuleiro[6] === "X") {
        tabuleiro[3] = "O";
        botoes[3].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "" && tabuleiro[3] === "X" && tabuleiro[6] === "X") {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[1] === "X" && tabuleiro[4] === "X" && tabuleiro[7] === "") {
        tabuleiro[7] = "O";
        botoes[7].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[1] === "X" && tabuleiro[4] === "" && tabuleiro[7] === "X") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[1] === "" && tabuleiro[4] === "X" && tabuleiro[7] === "X") {
        tabuleiro[1] = "O";
        botoes[1].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[2] === "X" && tabuleiro[5] === "X" && tabuleiro[8] === "") {
        tabuleiro[8] = "O";
        botoes[8].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[2] === "X" && tabuleiro[5] === "" && tabuleiro[8] === "X") {
        tabuleiro[5] = "O";
        botoes[5].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[2] === "" && tabuleiro[5] === "X" && tabuleiro[8] === "X") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "X" && tabuleiro[4] === "X" && tabuleiro[8] === "") {
        tabuleiro[8] = "O";
        botoes[8].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "X" && tabuleiro[4] === "" && tabuleiro[8] === "X") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[0] === "" && tabuleiro[4] === "X" && tabuleiro[8] === "X") {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[2] === "X" && tabuleiro[4] === "X" && tabuleiro[6] === "") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[2] === "X" && tabuleiro[4] === "" && tabuleiro[6] === "X") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
    } else if (jogadas > 2 && tabuleiro[2] === "" && tabuleiro[4] === "X" && tabuleiro[6] === "X") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
    } else if (jogadas === 3 && tabuleiro[4] === "O" &&  tabuleiro[1] === "") {
        tabuleiro[1] = "O";
        botoes[1].innerText += "O"
    } else if (jogadas === 4 && tabuleiro[4] === "X" &&  tabuleiro[2] === "X") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
    } else if (jogadas === 4 && tabuleiro[4] === "X" && tabuleiro[6] === "X"){
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
    } else if (jogadas === 4 && tabuleiro[1] === "X" && tabuleiro[3] === "X" && tabuleiro[4] === "" ){
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
    } else if (jogadas === 4 && tabuleiro[2] === "X" && tabuleiro[4] === "X" && tabuleiro[6] === "" ){
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
    } else if (jogadas === 4 && tabuleiro[6] === "X" && tabuleiro[4] === "X" && tabuleiro[2] === "" ){
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
    } else if (jogadas === 4 && tabuleiro[8] === "X" && tabuleiro[3] === "X" && tabuleiro[2] === "" ){
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
    } else if (jogadas === 4 && tabuleiro[3] === "X" && tabuleiro[7] === "X" && tabuleiro[4] === "" ){
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
    } else if (jogadas === 4 && tabuleiro[5] === "X" && tabuleiro[1] === "X" && tabuleiro[4] === "" ){
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
    } else {
        jogadaAleatoria(tabuleiro);
    }
}
