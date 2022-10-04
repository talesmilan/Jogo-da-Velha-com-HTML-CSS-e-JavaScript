
// Declaração de variáveis
const tabuleiro = ["", "", "", "", "", "", "", "", ""]
let vezJogador1 = false
let jogadas = 0
let botoes = []
let acabou = false
let texto = document.querySelector(`.texto`)

// Cria uma div
let finaliza = document.createElement('div');

for (let i = 0; i < 9; i++) {
    botoes[i] = document.querySelector(`.btn${i}`)
}
// Função que faz a primeira jogada
function primeiraJogada() {
    // Sorteia o primeiro jogador
    const sortear = Math.floor(Math.random() * 2);
    // Faz a primeira jogada do computador
    if (sortear === 0) {
        texto.style.color = 'yellow'
        texto.innerText = 'Espere sua vez...'
        setTimeout(function() { 
            jogadaPlanejada(tabuleiro)
            jogadas++
            texto.style.color = 'red'
            texto.innerText = 'Sua vez...'
            vezJogador1=true
        }, 2000);
    } else {
        vezJogador1 = true
    }
}
primeiraJogada()
// Captura o clique
document.addEventListener('click', e => {
    let elemento = e.target
    // Faz a jogada do usuário
    for (let i in botoes) {
        if (elemento.classList.contains(`btn${i}`)) {
            if (tabuleiro[i] === "" && vezJogador1 && !acabou) {
                vezJogador1 = false
                botoes[i].style.color = 'red'
                botoes[i].innerText += "X"
                tabuleiro[i] = "X"
                jogadas++
                texto.style.color = 'yellow'
                texto.innerText = 'Espere sua vez...'
                acabouJogo()
                // Faz a jogada do computador
                setTimeout(function() { 
                    if (!acabou && !vezJogador1) {
                        jogadaPlanejada(tabuleiro)
                        jogadas++
                        texto.style.color = 'red'
                        texto.innerText = 'Sua vez...'
                        acabouJogo()
                        vezJogador1 = true
                    }
                }, 2000);
            }
        }
    }
    // Programa o botaõ reiniciar
    if (elemento.classList.contains(`reiniciar`)) {
        vezJogador1 = false
        jogadas = 0
        acabou = false
        for (let i in tabuleiro) {
            tabuleiro[i] = ""
            botoes[i].innerText = ""
            botoes[i].style.backgroundColor = 'rgb(173, 173, 173)'
        }
        finaliza.innerHTML = ""
        primeiraJogada()
    }
})
// Função que pinta o fundo dos botões
function pintarBotoes(botao1, botao2, botao3, cor) {
    botoes[botao1].style.backgroundColor = cor
    botoes[botao2].style.backgroundColor = cor
    botoes[botao3].style.backgroundColor = cor
    botoes[botao1].style.color = cor === 'red' ? 'white' : 'black'
    botoes[botao2].style.color = cor === 'red' ? 'white' : 'black'
    botoes[botao3].style.color = cor === 'red' ? 'white' : 'black'
}
// Função que exibe mensagem final
function acabouJogo() {
    let retorno = checarSeAcabou(tabuleiro)
    if (retorno === 1) {
        texto.style.color = 'red'
        texto.innerText = 'Você venceu!'
        acabou = true
    } else if (retorno == 2) {
        texto.style.color = 'yellow'
        texto.innerText = 'Você perdeu!'
        acabou = true
    } else if (retorno === 3) {
        texto.style.color = 'white'
        texto.innerText = 'Deu velha!'
        acabou = true
    }
    if (retorno > 0) {
        setTimeout(() => {
            // Cria uma div para mostrar a pontuação final
            finaliza.innerHTML = `<div class='tela'><div class='finalizar'><p>${texto.innerText}</p>`
                    +"<button class='reiniciar'>Reiniciar</button></div></div>"
            document.body.appendChild(finaliza)
        }, 1500)
    }

}
// Função que checa se acabou
function checarSeAcabou(tabuleiro) {
    let c = 0
    for (let i = 0; i < 7; i += 3) {
        if (tabuleiro[i] === "X" && tabuleiro[i+1] === "X" && tabuleiro[i+2] === "X") {
            pintarBotoes(i, i+1, i+2, 'red')
            return 1
        } else if (tabuleiro[i] === "O" && tabuleiro[i+1] === "O" && tabuleiro[i+2] === "O") {
            pintarBotoes(i, i+1, i+2, 'yellow')
            return 2
        } else if (tabuleiro[c] === "X" && tabuleiro[c+3] === "X" && tabuleiro[c+6] === "X") {
            pintarBotoes(c, c+3, c+6, 'red')
            return 1
        } else if (tabuleiro[c] === "O" && tabuleiro[c+3] === "O" && tabuleiro[c+6] === "O") {
            pintarBotoes(c, c+3, c+6, 'yellow')
            return 2
        }
        c++
    }
    if (tabuleiro[0] === "X" && tabuleiro[4] == "X" && tabuleiro[8] === "X") {
        pintarBotoes(0, 4, 8, 'red')
        return 1
    } else if (tabuleiro[0] === "O" && tabuleiro[4] == "O" && tabuleiro[8] === "O") {
        pintarBotoes(0, 4, 8, 'yellow')
        return 2
    } else if (tabuleiro[2] === "X" && tabuleiro[4] == "X" && tabuleiro[6] === "X") {
        pintarBotoes(2, 4, 6, 'red')
        return 1
    } else if (tabuleiro[2] === "O" && tabuleiro[4] == "O" && tabuleiro[6] === "O") {
        pintarBotoes(2, 4, 6, 'yellow')
        return 2
    }

    if (jogadas === 9) {
        return 3
    }
    return 0
}
// Faz uma jogada aleatória no tabuleiro
function jogadaAleatoria(tabuleiro) {
    let jogadasDisponiveis = []
    for (let i in tabuleiro) {
        if (tabuleiro[i].length === 0) {
            jogadasDisponiveis.push(i)
        }
    }
    embaralharArray(jogadasDisponiveis)
    botoes[jogadasDisponiveis[0]].innerText += "O"
    tabuleiro[jogadasDisponiveis[0]] = "O"
    botoes[jogadasDisponiveis[0]].style.color = 'yellow'

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
// Função que faz uma jogada pplanejada
function jogadaPlanejada() {
    if (jogadas === 0) {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
        botoes[0].style.color = 'yellow'
    } else if (jogadas === 1 && tabuleiro[4] === "") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
        botoes[4].style.color = 'yellow'
    } else if (jogadas === 1 && tabuleiro[4] != "") {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
        botoes[0].style.color = 'yellow'
    } else if (jogadas === 2 && (tabuleiro[4] === "X" || tabuleiro[2] === "X" || tabuleiro [6] === "X")) {
        tabuleiro[8] = "O";
        botoes[8].innerText += "O"
        botoes[8].style.color = 'yellow'
    } else if (jogadas === 2 && tabuleiro[3] === "X") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
        botoes[2].style.color = 'yellow'
    } else if (jogadas === 2 && tabuleiro[8] === "X") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
        botoes[6].style.color = 'yellow'
    } else if (jogadas === 2 && tabuleiro[1] === "X") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
        botoes[6].style.color = 'yellow'
    } else if (jogadas === 2 && tabuleiro[7] === "X") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
        botoes[6].style.color = 'yellow'
    } else if (jogadas === 2 && tabuleiro[5] === "X") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
        botoes[2].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "O" && tabuleiro[1] === "O" && tabuleiro[2] === "") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
        botoes[2].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "O" && tabuleiro[1] === "" && tabuleiro[2] === "O") {
        tabuleiro[1] = "O";
        botoes[1].innerText += "O"
        botoes[1].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "" && tabuleiro[1] === "O" && tabuleiro[2] === "O") {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
        botoes[0].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[3] === "O" && tabuleiro[4] === "O" && tabuleiro[5] === "") {
        tabuleiro[5] = "O";
        botoes[5].innerText += "O"
        botoes[5].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[3] === "O" && tabuleiro[4] === "" && tabuleiro[5] === "O") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
        botoes[4].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[3] === "" && tabuleiro[4] === "O" && tabuleiro[5] === "O") {
        tabuleiro[3] = "O";
        botoes[3].innerText += "O"
        botoes[3].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[6] === "" && tabuleiro[7] === "O" && tabuleiro[8] === "O") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
        botoes[6].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[6] === "O" && tabuleiro[7] === "" && tabuleiro[8] === "O") {
        tabuleiro[7] = "O";
        botoes[7].innerText += "O"
        botoes[7].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[6] === "O" && tabuleiro[7] === "O" && tabuleiro[8] === "") {
        tabuleiro[8] = "O";
        botoes[8].innerText += "O"
        botoes[8].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "O" && tabuleiro[3] === "O" && tabuleiro[6] === "") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
        botoes[6].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "O" && tabuleiro[3] === "" && tabuleiro[6] === "O") {
        tabuleiro[3] = "O";
        botoes[3].innerText += "O"
        botoes[3].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "" && tabuleiro[3] === "O" && tabuleiro[6] === "O") {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
        botoes[0].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[1] === "O" && tabuleiro[4] === "O" && tabuleiro[7] === "") {
        tabuleiro[7] = "O";
        botoes[7].innerText += "O"
        botoes[7].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[1] === "O" && tabuleiro[4] === "" && tabuleiro[7] === "O") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
        botoes[4].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[1] === "" && tabuleiro[4] === "O" && tabuleiro[7] === "O") {
        tabuleiro[1] = "O";
        botoes[1].innerText += "O"
        botoes[1].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[2] === "O" && tabuleiro[5] === "O" && tabuleiro[8] === "") {
        tabuleiro[8] = "O";
        botoes[8].innerText += "O"
        botoes[8].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[2] === "O" && tabuleiro[5] === "" && tabuleiro[8] === "O") {
        tabuleiro[5] = "O";
        botoes[5].innerText += "O"
        botoes[5].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[2] === "" && tabuleiro[5] === "O" && tabuleiro[8] === "O") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
        botoes[2].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "O" && tabuleiro[4] === "O" && tabuleiro[8] === "") {
        tabuleiro[8] = "O";
        botoes[8].innerText += "O"
        botoes[8].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "O" && tabuleiro[4] === "" && tabuleiro[8] === "O") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
        botoes[4].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "" && tabuleiro[4] === "O" && tabuleiro[8] === "O") {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
        botoes[0].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[2] === "O" && tabuleiro[4] === "O" && tabuleiro[6] === "") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
        botoes[6].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[2] === "O" && tabuleiro[4] === "" && tabuleiro[6] === "O") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
        botoes[4].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[2] === "" && tabuleiro[4] === "O" && tabuleiro[6] === "O") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
        botoes[2].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "X" && tabuleiro[1] === "X" && tabuleiro[2] === "") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
        botoes[2].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "X" && tabuleiro[1] === "" && tabuleiro[2] === "X") {
        tabuleiro[1] = "O";
        botoes[1].innerText += "O"
        botoes[1].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "" && tabuleiro[1] === "X" && tabuleiro[2] === "X") {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
        botoes[0].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[3] === "X" && tabuleiro[4] === "X" && tabuleiro[5] === "") {
        tabuleiro[5] = "O";
        botoes[5].innerText += "O"
        botoes[5].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[3] === "X" && tabuleiro[4] === "" && tabuleiro[5] === "X") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
        botoes[4].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[3] === "" && tabuleiro[4] === "X" && tabuleiro[5] === "X") {
        tabuleiro[3] = "O";
        botoes[3].innerText += "O"
        botoes[3].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[6] === "" && tabuleiro[7] === "X" && tabuleiro[8] === "X") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
        botoes[6].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[6] === "X" && tabuleiro[7] === "" && tabuleiro[8] === "X") {
        tabuleiro[7] = "O";
        botoes[7].innerText += "O"
        botoes[7].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[6] === "X" && tabuleiro[7] === "X" && tabuleiro[8] === "") {
        tabuleiro[8] = "O";
        botoes[8].innerText += "O"
        botoes[8].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "X" && tabuleiro[3] === "X" && tabuleiro[6] === "") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
        botoes[6].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "X" && tabuleiro[3] === "" && tabuleiro[6] === "X") {
        tabuleiro[3] = "O";
        botoes[3].innerText += "O"
        botoes[3].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "" && tabuleiro[3] === "X" && tabuleiro[6] === "X") {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
        botoes[0].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[1] === "X" && tabuleiro[4] === "X" && tabuleiro[7] === "") {
        tabuleiro[7] = "O";
        botoes[7].innerText += "O"
        botoes[7].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[1] === "X" && tabuleiro[4] === "" && tabuleiro[7] === "X") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
        botoes[4].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[1] === "" && tabuleiro[4] === "X" && tabuleiro[7] === "X") {
        tabuleiro[1] = "O";
        botoes[1].innerText += "O"
        botoes[1].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[2] === "X" && tabuleiro[5] === "X" && tabuleiro[8] === "") {
        tabuleiro[8] = "O";
        botoes[8].innerText += "O"
        botoes[8].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[2] === "X" && tabuleiro[5] === "" && tabuleiro[8] === "X") {
        tabuleiro[5] = "O";
        botoes[5].innerText += "O"
        botoes[5].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[2] === "" && tabuleiro[5] === "X" && tabuleiro[8] === "X") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
        botoes[2].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "X" && tabuleiro[4] === "X" && tabuleiro[8] === "") {
        tabuleiro[8] = "O";
        botoes[8].innerText += "O"
        botoes[8].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "X" && tabuleiro[4] === "" && tabuleiro[8] === "X") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
        botoes[4].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[0] === "" && tabuleiro[4] === "X" && tabuleiro[8] === "X") {
        tabuleiro[0] = "O";
        botoes[0].innerText += "O"
        botoes[0].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[2] === "X" && tabuleiro[4] === "X" && tabuleiro[6] === "") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
        botoes[6].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[2] === "X" && tabuleiro[4] === "" && tabuleiro[6] === "X") {
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
        botoes[4].style.color = 'yellow'
    } else if (jogadas > 2 && tabuleiro[2] === "" && tabuleiro[4] === "X" && tabuleiro[6] === "X") {
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
        botoes[2].style.color = 'yellow'
    } else if (jogadas === 3 && tabuleiro[4] === "O" &&  tabuleiro[1] === "") {
        tabuleiro[1] = "O";
        botoes[1].innerText += "O"
        botoes[1].style.color = 'yellow'
    } else if (jogadas === 4 && tabuleiro[4] === "X" &&  tabuleiro[2] === "X") {
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
        botoes[6].style.color = 'yellow'
    } else if (jogadas === 4 && tabuleiro[4] === "X" && tabuleiro[6] === "X"){
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
        botoes[2].style.color = 'yellow'
    } else if (jogadas === 4 && tabuleiro[1] === "X" && tabuleiro[3] === "X" && tabuleiro[4] === "" ){
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
        botoes[4].style.color = 'yellow'
    } else if (jogadas === 4 && tabuleiro[2] === "X" && tabuleiro[4] === "X" && tabuleiro[6] === "" ){
        tabuleiro[6] = "O";
        botoes[6].innerText += "O"
        botoes[6].style.color = 'yellow'
    } else if (jogadas === 4 && tabuleiro[6] === "X" && tabuleiro[4] === "X" && tabuleiro[2] === "" ){
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
        botoes[2].style.color = 'yellow'
    } else if (jogadas === 4 && tabuleiro[8] === "X" && tabuleiro[3] === "X" && tabuleiro[2] === "" ){
        tabuleiro[2] = "O";
        botoes[2].innerText += "O"
        botoes[2].style.color = 'yellow'
    } else if (jogadas === 4 && tabuleiro[3] === "X" && tabuleiro[7] === "X" && tabuleiro[4] === "" ){
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
        botoes[4].style.color = 'yellow'
    } else if (jogadas === 4 && tabuleiro[5] === "X" && tabuleiro[1] === "X" && tabuleiro[4] === "" ){
        tabuleiro[4] = "O";
        botoes[4].innerText += "O"
        botoes[4].style.color = 'yellow'
    } else {
        jogadaAleatoria(tabuleiro);
    }
}
