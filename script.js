// WORLD MAP
var world = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,0,2],
    [2,1,2,2,1,2,2,1,1,2,1,1,2,2,1,2,1,2,2,2,1,2,1,2],
    [2,1,2,0,1,0,2,1,1,2,1,1,1,1,1,1,1,2,0,1,1,2,1,2],
    [2,1,2,2,1,2,2,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,2],
    [2,1,1,1,1,1,1,1,1,2,1,1,2,1,2,1,1,1,1,1,1,1,1,2],
    [2,1,1,1,1,1,2,1,1,1,1,0,0,1,1,1,1,2,1,1,1,1,1,2],
    [2,2,2,1,1,2,2,2,1,1,1,2,2,1,1,1,2,2,2,1,1,2,2,2],
    [2,1,1,1,1,1,2,1,1,1,1,0,0,1,1,1,1,2,1,1,1,1,1,2],
    [2,1,1,1,1,1,1,1,1,2,1,2,1,1,2,1,1,1,1,1,1,1,1,2],
    [2,1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,2,2,1,2,2,1,2],
    [2,1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,0,1,0,2,1,2],
    [2,1,2,2,1,2,2,2,1,2,1,2,1,1,2,1,1,2,2,1,2,2,1,2],
    [2,0,1,1,1,2,0,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,0,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    ]
var worldType = {
    0: "path",
    1: "coin",
    2: "brick"
}
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

var pacman = { //pacman position relative
    x: 1,
    y: 1
}
var square = 25 //size of pacman

function drawPacman(){
    document.getElementById('pacman').style.top = pacman.y * square + 'px'; 
    document.getElementById('pacman').style.left = pacman.x * square + 'px'; 
}
drawPacman()

// MOVE THE PACMAN
var score = 0

document.onkeydown = function(key){
    if (key.keyCode == 37){
        if (world[pacman.y][pacman.x - 1] != 2){ // LEFT
            pacman.x--;
            document.getElementById('pacman').style.transform = "scaleX(-1)"
        }
    }
    if (key.keyCode == 39){
        if (world[pacman.y][pacman.x + 1] != 2){ // RIGHT
        pacman.x++;
        document.getElementById('pacman').style.transform = "scaleX(1)"
        }
    }
    if (key.keyCode == 38){
        if (world[pacman.y - 1][pacman.x] != 2){ // UP
        pacman.y--;
        document.getElementById('pacman').style.transform = "rotate(-90deg)"
        }
    }
    
    if (key.keyCode == 40){
        if (world[pacman.y + 1][pacman.x] != 2){ // DOWN
        pacman.y++;
        document.getElementById('pacman').style.transform = "rotate(90deg)"
        }
    }
    if (world[pacman.y][pacman.x] == 0){
        console.log('clear');
    }
    if (world[pacman.y][pacman.x] == 1){
        console.log('coin')
        score += 15
        world[pacman.y][pacman.x] = 0
    }
    if (world[pacman.y][pacman.x] == 3){
        console.log('cherry')
        score += 50
        world[pacman.y][pacman.x] = 0
    }
    console.log(score)
    drawWorld()
    drawPacman()
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