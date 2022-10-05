
class JogoDaVelha {
    constructor() {
        // Declaração de variáveis
        this.tabuleiro = ["", "", "", "", "", "", "", "", ""]
        this.vezJogador1 = false
        this.jogadas = 0
        this.botoes = []
        this.acabou = false
        this.texto = document.querySelector(`.texto`)
        // Cria uma div
        this.finaliza = document.createElement('div')
        // Seleciona os botões
        for (let i = 0; i < 9; i++) {
            this.botoes[i] = document.querySelector(`.btn${i}`)
        }
    }
    // Método que inicia o jogo
    iniciar() {
        this.primeiraJogada()
        this.fazJogadas()
    }
    // Método que faz a primeira jogada
    primeiraJogada() {
        // Sorteia o primeiro jogador
        const sortear = Math.floor(Math.random() * 2);
        // Faz a primeira jogada do computador
        if (sortear === 0) {
            this.texto.style.color = 'yellow'
            this.texto.innerText = 'Espere sua vez...'
            setTimeout(function() { 
                this.jogadaPlanejada()
                this.jogadas++
                this.texto.style.color = 'red'
                this.texto.innerText = 'Sua vez...'
                this.vezJogador1=true
            }, 2000);
        } else {
            this.vezJogador1 = true
        }
    }
    // Método que programa as jogadas
    fazJogadas() {
    // Captura o clique
    document.addEventListener('click', e => {
        let elemento = e.target
        // Faz a jogada do usuário
        for (let i in this.botoes) {
            if (elemento.classList.contains(`btn${i}`)) {
                if (this.tabuleiro[i] === "" && this.vezJogador1 && !this.acabou) {
                    this.vezJogador1 = false
                    this.botoes[i].style.color = 'red'
                    this.botoes[i].innerText += "X"
                    this.tabuleiro[i] = "X"
                    this.jogadas++
                    this.texto.style.color = 'yellow'
                    this.texto.innerText = 'Espere sua vez...'
                    this.acabouJogo()
                    // Faz a jogada do computador
                    setTimeout(function() { 
                        if (!this.acabou && !this.vezJogador1) {
                            this.jogadaPlanejada()
                            this.jogadas++
                            this.texto.style.color = 'red'
                            this.texto.innerText = 'Sua vez...'
                            this.acabouJogo()
                            this.vezJogador1 = true
                        }
                    }, 2000);
                }
            }
        }
        // Programa o botaõ reiniciar
        if (elemento.classList.contains(`reiniciar`)) {
            this.vezJogador1 = false
            this.jogadas = 0
            this.acabou = false
            for (let i in tabuleiro) {
                this.tabuleiro[i] = ""
                this.botoes[i].innerText = ""
                this.botoes[i].style.backgroundColor = 'rgb(173, 173, 173)'
            }
            this.finaliza.innerHTML = ""
            this.primeiraJogada()
        }
    })
    }
    // Método que pinta os botões
    pintarBotoes(botao1, botao2, botao3, cor) {
        this.botoes[botao1].style.backgroundColor = cor
        this.botoes[botao2].style.backgroundColor = cor
        this.botoes[botao3].style.backgroundColor = cor
        this.botoes[botao1].style.color = cor === 'red' ? 'white' : 'black'
        this.botoes[botao2].style.color = cor === 'red' ? 'white' : 'black'
        this.botoes[botao3].style.color = cor === 'red' ? 'white' : 'black'  
    }
    // Método que faz uma jogada aleatória
    jogadaAleatoria(tabuleiro) {
        let jogadasDisponiveis = []
        for (let i in this.tabuleiro) {
            if (tabuleiro[i].length === 0) {
                jogadasDisponiveis.push(i)
            }
        }
        this.embaralharArray(jogadasDisponiveis)
        this.botoes[jogadasDisponiveis[0]].innerText += "O"
        this.tabuleiro[jogadasDisponiveis[0]] = "O"
        this.botoes[jogadasDisponiveis[0]].style.color = 'yellow'
    }
    // Método que exibe mensagem final
    acabouJogo() {
        let retorno = this.checarSeAcabou(this.tabuleiro)
        if (retorno === 1) {
            this.texto.style.color = 'red'
            this.texto.innerText = 'Você venceu!'
            this.acabou = true
        } else if (retorno == 2) {
            this.texto.style.color = 'yellow'
            this.texto.innerText = 'Você perdeu!'
            this.acabou = true
        } else if (retorno === 3) {
            this.texto.style.color = 'white'
            this.texto.innerText = 'Deu velha!'
            this.acabou = true
        }
        if (retorno > 0) {
            setTimeout(() => {
                // Cria uma div para mostrar a pontuação final
                this.finaliza.innerHTML = `<div class='tela'><div class='finalizar'><p>${texto.innerText}</p>`
                        +"<button class='reiniciar'>Reiniciar</button></div></div>"
                document.body.appendChild(this.finaliza)
            }, 1500)
        }
    }
    // Método que checa se acabou
    checarSeAcabou(tabuleiro) {
        let c = 0
        for (let i = 0; i < 7; i += 3) {
            if (tabuleiro[i] === "X" && tabuleiro[i+1] === "X" && tabuleiro[i+2] === "X") {
                this.pintarBotoes(i, i+1, i+2, 'red')
                return 1
            } else if (tabuleiro[i] === "O" && tabuleiro[i+1] === "O" && tabuleiro[i+2] === "O") {
                this.pintarBotoes(i, i+1, i+2, 'yellow')
                return 2
            } else if (tabuleiro[c] === "X" && tabuleiro[c+3] === "X" && tabuleiro[c+6] === "X") {
                this.pintarBotoes(c, c+3, c+6, 'red')
                return 1
            } else if (tabuleiro[c] === "O" && tabuleiro[c+3] === "O" && tabuleiro[c+6] === "O") {
                this.pintarBotoes(c, c+3, c+6, 'yellow')
                return 2
            }
            c++
        }
        if (tabuleiro[0] === "X" && tabuleiro[4] == "X" && tabuleiro[8] === "X") {
            this.pintarBotoes(0, 4, 8, 'red')
            return 1
        } else if (tabuleiro[0] === "O" && tabuleiro[4] == "O" && tabuleiro[8] === "O") {
            this.pintarBotoes(0, 4, 8, 'yellow')
            return 2
        } else if (tabuleiro[2] === "X" && tabuleiro[4] == "X" && tabuleiro[6] === "X") {
            this.pintarBotoes(2, 4, 6, 'red')
            return 1
        } else if (tabuleiro[2] === "O" && tabuleiro[4] == "O" && tabuleiro[6] === "O") {
            this.pintarBotoes(2, 4, 6, 'yellow')
            return 2
        }
    
        if (this.jogadas === 9) {
            return 3
        }
        return 0
    }
    // Método para embaralhar um array
    embaralharArray(array) {
        // Loop em todos os elementos
        for (let i = array.length - 1; i > 0; i--) {
            // Escolhendo elemento aleatório
            const j = Math.floor(Math.random() * (i + 1));
            // Reposicionando elemento
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }
    // Método que faz uma jogada planejada
    jogadaPlanejada() {
        if (this.jogadas === 0) {
            this.tabuleiro[0] = "O";
            this.botoes[0].innerText += "O"
            this.botoes[0].style.color = 'yellow'
        } else if (this.jogadas === 1 && this.tabuleiro[4] === "") {
            this.tabuleiro[4] = "O";
            this.botoes[4].innerText += "O"
            this.botoes[4].style.color = 'yellow'
        } else if (this.jogadas === 1 && this.tabuleiro[4] != "") {
            this.tabuleiro[0] = "O";
            this.botoes[0].innerText += "O"
            this.botoes[0].style.color = 'yellow'
        } else if (this.jogadas === 2 && (this.tabuleiro[4] === "X" || this.tabuleiro[2] === "X" || this.tabuleiro [6] === "X")) {
            this.tabuleiro[8] = "O";
            this.botoes[8].innerText += "O"
            this.botoes[8].style.color = 'yellow'
        } else if (this.jogadas === 2 && this.tabuleiro[3] === "X") {
            this.tabuleiro[2] = "O";
            this.botoes[2].innerText += "O"
            this.botoes[2].style.color = 'yellow'
        } else if (this.jogadas === 2 && this.tabuleiro[8] === "X") {
            this.tabuleiro[6] = "O";
            this.botoes[6].innerText += "O"
            this.botoes[6].style.color = 'yellow'
        } else if (this.jogadas === 2 && this.tabuleiro[1] === "X") {
            this.tabuleiro[6] = "O";
            this.botoes[6].innerText += "O"
            this.botoes[6].style.color = 'yellow'
        } else if (this.jogadas === 2 && this.tabuleiro[7] === "X") {
            this.tabuleiro[6] = "O";
            this.botoes[6].innerText += "O"
            this.botoes[6].style.color = 'yellow'
        } else if (this.jogadas === 2 && this.tabuleiro[5] === "X") {
            this.tabuleiro[2] = "O";
            this.botoes[2].innerText += "O"
            this.botoes[2].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "O" && this.tabuleiro[1] === "O" && this.tabuleiro[2] === "") {
            this.tabuleiro[2] = "O";
            this.botoes[2].innerText += "O"
            this.botoes[2].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "O" && this.tabuleiro[1] === "" && this.tabuleiro[2] === "O") {
            this.tabuleiro[1] = "O";
            this.botoes[1].innerText += "O"
            this.botoes[1].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "" && this.tabuleiro[1] === "O" && this.tabuleiro[2] === "O") {
            this.tabuleiro[0] = "O";
            this.botoes[0].innerText += "O"
            this.botoes[0].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[3] === "O" && this.tabuleiro[4] === "O" && this.tabuleiro[5] === "") {
            this.tabuleiro[5] = "O";
            this.botoes[5].innerText += "O"
            this.botoes[5].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[3] === "O" && this.tabuleiro[4] === "" && this.tabuleiro[5] === "O") {
            this.tabuleiro[4] = "O";
            this.botoes[4].innerText += "O"
            this.botoes[4].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[3] === "" && this.tabuleiro[4] === "O" && this.tabuleiro[5] === "O") {
            this.tabuleiro[3] = "O";
            this.botoes[3].innerText += "O"
            this.botoes[3].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[6] === "" && this.tabuleiro[7] === "O" && this.tabuleiro[8] === "O") {
            this.tabuleiro[6] = "O";
            this.botoes[6].innerText += "O"
            this.botoes[6].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[6] === "O" && this.tabuleiro[7] === "" && this.tabuleiro[8] === "O") {
            this.tabuleiro[7] = "O";
            this.botoes[7].innerText += "O"
            this.botoes[7].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[6] === "O" && this.tabuleiro[7] === "O" && this.tabuleiro[8] === "") {
            this.tabuleiro[8] = "O";
            this.botoes[8].innerText += "O"
            this.botoes[8].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "O" && this.tabuleiro[3] === "O" && this.tabuleiro[6] === "") {
            this.tabuleiro[6] = "O";
            this.botoes[6].innerText += "O"
            this.botoes[6].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "O" && this.tabuleiro[3] === "" && this.tabuleiro[6] === "O") {
            this.tabuleiro[3] = "O";
            this.botoes[3].innerText += "O"
            this.botoes[3].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "" && this.tabuleiro[3] === "O" && this.tabuleiro[6] === "O") {
            this.tabuleiro[0] = "O";
            this.botoes[0].innerText += "O"
            this.botoes[0].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[1] === "O" && this.tabuleiro[4] === "O" && this.tabuleiro[7] === "") {
            this.tabuleiro[7] = "O";
            this.botoes[7].innerText += "O"
            this.botoes[7].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[1] === "O" && this.tabuleiro[4] === "" && this.tabuleiro[7] === "O") {
            this.tabuleiro[4] = "O";
            this.botoes[4].innerText += "O"
            this.botoes[4].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[1] === "" && this.tabuleiro[4] === "O" && this.tabuleiro[7] === "O") {
            this.tabuleiro[1] = "O";
            this.botoes[1].innerText += "O"
            this.botoes[1].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[2] === "O" && this.tabuleiro[5] === "O" && this.tabuleiro[8] === "") {
            this.tabuleiro[8] = "O";
            this.botoes[8].innerText += "O"
            this.botoes[8].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[2] === "O" && this.tabuleiro[5] === "" && this.tabuleiro[8] === "O") {
            this.tabuleiro[5] = "O";
            this.botoes[5].innerText += "O"
            this.botoes[5].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[2] === "" && this.tabuleiro[5] === "O" && this.tabuleiro[8] === "O") {
            this.tabuleiro[2] = "O";
            this.botoes[2].innerText += "O"
            this.botoes[2].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "O" && this.tabuleiro[4] === "O" && this.tabuleiro[8] === "") {
            this.tabuleiro[8] = "O";
            this.botoes[8].innerText += "O"
            this.botoes[8].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "O" && this.tabuleiro[4] === "" && this.tabuleiro[8] === "O") {
            this.tabuleiro[4] = "O";
            this.botoes[4].innerText += "O"
            this.botoes[4].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "" && this.tabuleiro[4] === "O" && this.tabuleiro[8] === "O") {
            this.tabuleiro[0] = "O";
            this.botoes[0].innerText += "O"
            this.botoes[0].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[2] === "O" && this.tabuleiro[4] === "O" && this.tabuleiro[6] === "") {
            this.tabuleiro[6] = "O";
            this.botoes[6].innerText += "O"
            this.botoes[6].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[2] === "O" && this.tabuleiro[4] === "" && this.tabuleiro[6] === "O") {
            this.tabuleiro[4] = "O";
            this.botoes[4].innerText += "O"
            this.botoes[4].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[2] === "" && this.tabuleiro[4] === "O" && this.tabuleiro[6] === "O") {
            this.tabuleiro[2] = "O";
            this.botoes[2].innerText += "O"
            this.botoes[2].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "X" && this.tabuleiro[1] === "X" && this.tabuleiro[2] === "") {
            this.tabuleiro[2] = "O";
            this.botoes[2].innerText += "O"
            this.botoes[2].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "X" && this.tabuleiro[1] === "" && this.tabuleiro[2] === "X") {
            this.tabuleiro[1] = "O";
            this.botoes[1].innerText += "O"
            this.botoes[1].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "" && this.tabuleiro[1] === "X" && this.tabuleiro[2] === "X") {
            this.tabuleiro[0] = "O";
            this.botoes[0].innerText += "O"
            this.botoes[0].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[3] === "X" && this.tabuleiro[4] === "X" && this.tabuleiro[5] === "") {
            this.tabuleiro[5] = "O";
            this.botoes[5].innerText += "O"
            this.botoes[5].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[3] === "X" && this.tabuleiro[4] === "" && this.tabuleiro[5] === "X") {
            this.tabuleiro[4] = "O";
            this.botoes[4].innerText += "O"
            this.botoes[4].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[3] === "" && this.tabuleiro[4] === "X" && this.tabuleiro[5] === "X") {
            this.tabuleiro[3] = "O";
            this.botoes[3].innerText += "O"
            this.botoes[3].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[6] === "" && this.tabuleiro[7] === "X" && this.tabuleiro[8] === "X") {
            this.tabuleiro[6] = "O";
            this.botoes[6].innerText += "O"
            this.botoes[6].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[6] === "X" && this.tabuleiro[7] === "" && this.tabuleiro[8] === "X") {
            this.tabuleiro[7] = "O";
            this.botoes[7].innerText += "O"
            this.botoes[7].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[6] === "X" && this.tabuleiro[7] === "X" && this.tabuleiro[8] === "") {
            this.tabuleiro[8] = "O";
            this.botoes[8].innerText += "O"
            this.botoes[8].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "X" && this.tabuleiro[3] === "X" && this.tabuleiro[6] === "") {
            this.tabuleiro[6] = "O";
            this.botoes[6].innerText += "O"
            this.botoes[6].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "X" && this.tabuleiro[3] === "" && this.tabuleiro[6] === "X") {
            this.tabuleiro[3] = "O";
            this.botoes[3].innerText += "O"
            this.botoes[3].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "" && this.tabuleiro[3] === "X" && this.tabuleiro[6] === "X") {
            this.tabuleiro[0] = "O";
            this.botoes[0].innerText += "O"
            this.botoes[0].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[1] === "X" && this.tabuleiro[4] === "X" && this.tabuleiro[7] === "") {
            this.tabuleiro[7] = "O";
            this.botoes[7].innerText += "O"
            this.botoes[7].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[1] === "X" && this.tabuleiro[4] === "" && this.tabuleiro[7] === "X") {
            this.tabuleiro[4] = "O";
            this.botoes[4].innerText += "O"
            this.botoes[4].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[1] === "" && this.tabuleiro[4] === "X" && this.tabuleiro[7] === "X") {
            this.tabuleiro[1] = "O";
            this.botoes[1].innerText += "O"
            this.botoes[1].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[2] === "X" && this.tabuleiro[5] === "X" && this.tabuleiro[8] === "") {
            this.tabuleiro[8] = "O";
            this.botoes[8].innerText += "O"
            this.botoes[8].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[2] === "X" && this.tabuleiro[5] === "" && this.tabuleiro[8] === "X") {
            this.tabuleiro[5] = "O";
            this.botoes[5].innerText += "O"
            this.botoes[5].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[2] === "" && this.tabuleiro[5] === "X" && this.tabuleiro[8] === "X") {
            this.tabuleiro[2] = "O";
            this.botoes[2].innerText += "O"
            this.botoes[2].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "X" && this.tabuleiro[4] === "X" && this.tabuleiro[8] === "") {
            this.tabuleiro[8] = "O";
            this.botoes[8].innerText += "O"
            this.botoes[8].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "X" && this.tabuleiro[4] === "" && this.tabuleiro[8] === "X") {
            this.tabuleiro[4] = "O";
            this.botoes[4].innerText += "O"
            this.botoes[4].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[0] === "" && this.tabuleiro[4] === "X" && this.tabuleiro[8] === "X") {
            this.tabuleiro[0] = "O";
            this.botoes[0].innerText += "O"
            this.botoes[0].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[2] === "X" && this.tabuleiro[4] === "X" && this.tabuleiro[6] === "") {
            this.tabuleiro[6] = "O";
            this.botoes[6].innerText += "O"
            this.botoes[6].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[2] === "X" && this.tabuleiro[4] === "" && this.tabuleiro[6] === "X") {
            this.tabuleiro[4] = "O";
            this.botoes[4].innerText += "O"
            this.botoes[4].style.color = 'yellow'
        } else if (this.jogadas > 2 && this.tabuleiro[2] === "" && this.tabuleiro[4] === "X" && this.tabuleiro[6] === "X") {
            this.tabuleiro[2] = "O";
            this.botoes[2].innerText += "O"
            this.botoes[2].style.color = 'yellow'
        } else if (this.jogadas === 3 && this.tabuleiro[4] === "O" &&  this.tabuleiro[1] === "") {
            this.tabuleiro[1] = "O";
            this.botoes[1].innerText += "O"
            this.botoes[1].style.color = 'yellow'
        } else if (this.jogadas === 4 && this.tabuleiro[4] === "X" &&  this.tabuleiro[2] === "X") {
            this.tabuleiro[6] = "O";
            this.botoes[6].innerText += "O"
            this.botoes[6].style.color = 'yellow'
        } else if (this.jogadas === 4 && this.tabuleiro[4] === "X" && this.tabuleiro[6] === "X"){
            this.tabuleiro[2] = "O";
            this.botoes[2].innerText += "O"
            this.botoes[2].style.color = 'yellow'
        } else if (this.jogadas === 4 && this.tabuleiro[1] === "X" && this.tabuleiro[3] === "X" && this.tabuleiro[4] === "" ){
            this.tabuleiro[4] = "O";
            this.botoes[4].innerText += "O"
            this.botoes[4].style.color = 'yellow'
        } else if (this.jogadas === 4 && this.tabuleiro[2] === "X" && this.tabuleiro[4] === "X" && this.tabuleiro[6] === "" ){
            this.tabuleiro[6] = "O";
            this.botoes[6].innerText += "O"
            this.botoes[6].style.color = 'yellow'
        } else if (this.jogadas === 4 && this.tabuleiro[6] === "X" && this.tabuleiro[4] === "X" && this.tabuleiro[2] === "" ){
            this.tabuleiro[2] = "O";
            this.botoes[2].innerText += "O"
            this.botoes[2].style.color = 'yellow'
        } else if (this.jogadas === 4 && this.tabuleiro[8] === "X" && this.tabuleiro[3] === "X" && this.tabuleiro[2] === "" ){
            this.tabuleiro[2] = "O";
            this.botoes[2].innerText += "O"
            this.botoes[2].style.color = 'yellow'
        } else if (this.jogadas === 4 && this.tabuleiro[3] === "X" && this.tabuleiro[7] === "X" && this.tabuleiro[4] === "" ){
            this.tabuleiro[4] = "O";
            this.botoes[4].innerText += "O"
            this.botoes[4].style.color = 'yellow'
        } else if (this.jogadas === 4 && this.tabuleiro[5] === "X" && this.tabuleiro[1] === "X" && this.tabuleiro[4] === "" ){
            this.tabuleiro[4] = "O";
            this.botoes[4].innerText += "O"
            this.botoes[4].style.color = 'yellow'
        } else {
            this.jogadaAleatoria(this.tabuleiro);
        }
    }
}
// Cria um novo jogo da velha
const jogo = new JogoDaVelha()
// Inicia o jogo da velha
jogo.iniciar()

