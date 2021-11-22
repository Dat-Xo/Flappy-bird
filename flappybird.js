var cvs = document.getElementById("canvas")
var ctx = cvs.getContext("2d")


var bg = new Image()
var bird = new Image()
var fg = new Image()
var pipeNorth = new Image()
var pipeSouth = new Image()

bg.src = "images/bg.png"
bird.src = "images/bird.png"
fg.src = "images/fg.png"
pipeNorth.src = "images/pipeNorth.png"
pipeSouth.src = "images/pipeSouth.png"


// some variable

var gap = 90
var constant = pipeNorth.height + gap
var bX = 10
var bY = 150
var gravity = 1.5
var score = 0

// audio
var fly= new Audio()
var scr = new Audio()
 
fly.src ="audio/sounds_fly.mp3"
scr.src ="audio/sounds_score.mp3"
//on click
document.addEventListener("keyup", function a(){
    bY-=30
    fly.play()
})

//pipe
var pipe = []
pipe[0] = {
    x: cvs.width ,
    y: 0
}
// draw
function draw(){

    ctx.drawImage(bg,0,0)
    

    for(var i=0;i<pipe.length;i++){

        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y)
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant)

        pipe[i].x--

        if(pipe[i].x == 100){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            })
        }
        if( bX+ bird.width >= pipe[i].x && bX<= pipe[i].x + pipeNorth.width 
            && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant)
            ){
                location.reload()
            }  

        if(pipe[i].x==5){
            score++
            scr.play()
        }
    }


    ctx.drawImage(bird,bX,bY)

    ctx.drawImage(fg,0,cvs.height-fg.height)

    bY+= gravity

    ctx.fillStyle = "#000"
    ctx.font= "20px Verdana"
    ctx.fillText("Score: "+ score,10 ,cvs.height - 20)

    requestAnimationFrame(draw)

}
draw()

