// WORLD MAP
var world = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,1,1,1,1,1,1,1,2,1,1,2,3,1,1,1,1,1,1,1,1,0,2],
    [2,1,2,2,1,2,2,1,1,2,1,1,2,2,1,2,1,2,2,2,1,2,1,2],
    [2,1,2,3,1,0,2,1,1,2,1,1,1,1,1,1,1,2,3,1,1,2,1,2],
    [2,1,2,2,1,2,2,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,2],
    [2,1,1,1,1,1,1,1,1,2,1,1,2,1,2,1,1,1,1,1,1,1,1,2],
    [2,1,1,1,1,1,2,1,1,1,1,1,0,1,1,1,1,2,1,1,1,1,1,2],
    [2,2,2,1,1,2,2,2,1,1,1,2,2,1,1,1,2,2,2,1,1,2,2,2],
    [2,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,1,2,1,1,1,1,1,2],
    [2,1,1,1,1,1,1,1,1,2,1,2,1,1,2,1,1,1,1,1,1,1,1,2],
    [2,1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,2,2,1,2,2,1,2],
    [2,1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,3,1,3,2,1,2],
    [2,1,2,2,1,2,2,2,1,2,1,2,1,1,2,1,1,2,2,1,2,2,1,2],
    [2,3,1,1,1,2,3,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,0,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    ]
var worldType = { //world types
    0: "path",
    1: "coin",
    2: "brick",
    3: "cherry"
}
// draw characters
var pacman = {x:1,y:1,lifes:3};
var ghosts = {1:{x:15,y:1,lifes:1},2:{x:15,y:5,lifes:1}, 3:{x:15,y:10,lifes:1},4:{x:15,y:15,lifes:1}};
console.log('1',Object.keys(ghosts).length)
// other variables
var square = 25 //size of pacman
var score = 2000
var cherry = 0 // will be defined on the map
var timer = 90
var triggerTimer = false
var timeExp = false

// Draw the MAP
function drawWorld() {
    var content = ""
    for(row in world){
        content += '<div class="row">\n';
        for(col in world[row]){
            content += `<div class="${worldType[world[row][col]]}"></div>\n`;
        }
        content += '</div>\n';
    }
    document.getElementById('world-map').innerHTML = content
}
drawWorld()

// DRAW THE PACMAN
function drawPacman(){
    document.getElementById('pacman').style.top = pacman.y * square + 'px'; 
    document.getElementById('pacman').style.left = pacman.x * square + 'px'; 
}
drawPacman()

// Draw the Ghosts


// draw the score
function drawScore(){
    document.getElementById('scores').innerText = score;
}
drawScore()

// Draw the lifes
function drawLifes(){
    for (i in pacman.lifes){
        document.getElementById('lifes').innerHTML = '<img src="pacman-life.ico" alt="pacman lifes">';
    }
}
drawLifes()

//Draw the cherrys
function drawCherry(){
    count = 0
    for (i in world){
        for (y in world[i]){
            if (world[i][y] == 3){
                count++;
            }
        }
    }
    document.getElementById("cherrys-num").innerText = count
}
drawCherry()

function setTimer() {
    if (triggerTimer && timer == 90) {
        myfunc = setInterval(function () {
            if (timer != 0){
                timer--;
                score-=22;
                drawScore();
            }
            else{
                timeExp = true;
                drawScore();
            }
            document.getElementById('timer').innerText = timer + 's';
        }, 1000)
    }
}

document.onkeydown = function(key){

    if (key.keyCode == 37){
        if (world[pacman.y][pacman.x - 1] != 2){ // LEFT
            pacman.x--;
            document.getElementById('pacman').style.transform = "scaleX(-1)"
            triggerTimer = true;
        }
    }
    if (key.keyCode == 39){
        if (world[pacman.y][pacman.x + 1] != 2){ // RIGHT
            pacman.x++;
            document.getElementById('pacman').style.transform = "scaleX(1)"
            triggerTimer = true;
        }
    }
    if (key.keyCode == 38){
        if (world[pacman.y - 1][pacman.x] != 2){ // UP
            pacman.y--;
            document.getElementById('pacman').style.transform = "rotate(-90deg)"
            triggerTimer = true;
        }
    }
    if (key.keyCode == 40){
        if (world[pacman.y + 1][pacman.x] != 2){ // DOWN
            pacman.y++;
            document.getElementById('pacman').style.transform = "rotate(90deg)"
            triggerTimer = true;
        }
    }

    if (world[pacman.y][pacman.x] == 0){
    }

    if (world[pacman.y][pacman.x] == 1){
        score += 15
        world[pacman.y][pacman.x] = 0
    }

    if (world[pacman.y][pacman.x] == 3){
        score += 50
        world[pacman.y][pacman.x] = 0
    }

    drawScore()
    drawLifes()
    drawCherry()
    drawWorld()
    drawPacman()
    setTimer()
}






































// const fs = require('fs');

// var user = "DAY"
// var score = "000"
// const content = user+'-'+score+'|'
// var historyScore = ""






// // fs.appendFile("score.txt", content, (err) => {
// //     if(err) throw err;
// // })
// var info

// info = fs.readFileSync('score.txt','utf8',(err,data) => {
//     if(err){
//         console.error(err);
//         return;
//     }
//     //console.log(data);
// })
// info = info.split('|')

// console.log(info, info.length)