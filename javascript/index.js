const music = new Audio("../snake-game-js/music/music.mp3")
const gameover = new Audio("../snake-game-js/music/gameover.mp3")
const move = new Audio("../snake-game-js/music/move.mp3")
const food = new Audio("../snake-game-js/music/food.mp3")

var direcao = { x: 0,y:0}
var cobra = [{ x:5 , y:5  }]
var fruit = { x: Math.floor(Math.random() * 23)+2, y: Math.floor(Math.random() * 23)+2 }
var pontos = 0
var ultivezatt = 0
var velocidade = 7


function main(tempoatual) {
    window.requestAnimationFrame(main)
    if ((tempoatual - ultivezatt) / 1000 < 1 / velocidade) {
        return;
    }

    ultivezatt = tempoatual

    atualizagame();

}

function verificacolisao(){
for(var i = 1; i < cobra.length; i++){
    if(cobra[i].x == cobra[0].x && cobra[i].y == cobra[i].x){
        return true;
    }
}
    if(cobra[0].x >= 25 || cobra[0].x <= 0 || cobra[0].y >= 25 || cobra[0].y <= 0){
        return true
    }
    return false

}

function verificacomeufruta(){
   if(cobra[0].x == fruit.x && cobra[0].y == fruit.y){
    food.play()
    pontos += 10
    pontuacao.innerHTML = pontos + " pontos"
    cobra.unshift({x: cobra[0].x + direcao.x, y:cobra[0].y + direcao.y})
    fruit.x = Math.floor(Math.random()*23)+2
    fruit.y = Math.floor(Math.random()*23)+2
    velocidade = velocidade + 0.2
}
}

function atualizagame() {
    if(verificacolisao()){
        music.pause()
        gameover.play()
        alert("Game Over")
        cobra = [{ x:5 , y:5 }]
        direcao.x = 0
        direcao.y = 0
        pontos = 0 
        pontuacao.innerHTML = 0 + " pontos"

        
    }

    verificacomeufruta();
  
    for(var i = cobra.length -2; i >= 0; i--){
        cobra[i+1] = {...cobra[i]}
    }

    cobra[0].y += direcao.y
    cobra[0].x += direcao.x

    board.innerHTML = "";
    for (var i = 0; i < cobra.length; i++) {
        var partecobra = document.createElement('div')
        partecobra.style.gridRowStart = cobra[i].y
        partecobra.style.gridColumnStart = cobra[i].x

        if (i == 0) {
            partecobra.classList.add("head")
        } else {
            partecobra.classList.add("snake")
        }

        board.appendChild(partecobra)
    }
    var frutinha = document.createElement("div")
    frutinha.style.gridColumnStart = fruit.x
    frutinha.style.gridRowStart = fruit.y
    frutinha.classList.add("food")
    board.appendChild(frutinha)
}

window.addEventListener("keydown",function (e){
    

    switch(e.code){
        case "ArrowUp":
            direcao.y = -1
            direcao.x = 0
            move.play();
        break;
        case "ArrowLeft":
            direcao.y = 0
            direcao.x = -1
            move.play();
        break
        case "ArrowDown":
            direcao.y = 1
            direcao.x = 0
            move.play();
        break 
        case"ArrowRight":
        direcao.y = 0
        direcao.x = 1
        move.play();
        break
        case"Enter":
        direcao.y = 1
        direcao.x = 0
        music.play()
        break
    }
})
main()

