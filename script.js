// WORLD MAP
var world = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2],
    [2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2],
    [2, 1, 2, 3, 1, 0, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 3, 1, 1, 2, 1, 2],
    [2, 1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2],
    [2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 2],
    [2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 3, 1, 3, 2, 1, 2],
    [2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2],
    [2, 3, 1, 1, 1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 0, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
]
var worldType = { //world types
    0: "path",
    1: "coin",
    2: "brick",
    3: "cherry"
}
// draw characters
var pacman = { x: 1, y: 1, lives: 3};
var ghosts = { n:4, 1: { x: 22, y: 1, lives: 1 }, 2: { x: 12, y: 6, lives: 1 }, 3: { x: 11, y: 8, lives: 1 }, 4: { x: 22, y: 13, lives: 1 } };
//console.log('1',Object.keys(ghosts).length)
// other variables
var square = 25 //size of pacman
var score = 2000
var cherry = 0 // will be defined on the map
var timer = 90
var triggerTimer = false
var timeExp = false
var freezeTime = false
var freezeTimer = 5
var ghostSpeed = 1000

// Draw the MAP
function drawWorld() {
    var content = ""
    for (row in world) {
        content += '<div class="row">\n';
        for (col in world[row]) {
            content += `<div class="${worldType[world[row][col]]}"></div>\n`;
        }
        content += '</div>\n';
    }
    document.getElementById('world-map').innerHTML = content
}
drawWorld()

// DRAW THE PACMAN
function drawPacman() {
    document.getElementById('pacman').style.top = pacman.y * square + 'px';
    document.getElementById('pacman').style.left = pacman.x * square + 'px';
}
drawPacman()

// Draw the Ghosts
function drawGhosts() {
    if (ghosts[1].lives > 0) {
        document.getElementById('ghost1').style.left = ghosts[1].x * square + 'px'
        document.getElementById('ghost1').style.top = ghosts[1].y * square + 'px'
    }
    else{
        document.getElementById('ghost1').style.display = 'none'
    }
    if (ghosts[2].lives > 0) {
        document.getElementById('ghost2').style.left = ghosts[2].x * square + 'px'
        document.getElementById('ghost2').style.top = ghosts[2].y * square + 'px'
    }
    else{
        document.getElementById('ghost2').style.display = 'none'
    }
    if (ghosts[3].lives > 0) {
        document.getElementById('ghost3').style.left = ghosts[3].x * square + 'px'
        document.getElementById('ghost3').style.top = ghosts[3].y * square + 'px'
    }
    else{
        document.getElementById('ghost3').style.display = 'none'
    }
    if (ghosts[4].lives > 0) {
        document.getElementById('ghost4').style.left = ghosts[4].x * square + 'px'
        document.getElementById('ghost4').style.top = ghosts[4].y * square + 'px'
    }
    else{
        document.getElementById('ghost4').style.display = "none"
    }
}
drawGhosts()

// PacMan and Ghost collide function
function pacGhostColl() {
    for (var i = 1; i <= 4; i++) {
        if (pacman.x == ghosts[i].x && pacman.y == ghosts[i].y){
            console.log(pacman.x,pacman.y,ghosts[i].lives,pacman.lives,"lost live");
            ghosts[i].lives--;
            pacman.lives--;
            drawLifes()
            drawGhosts()
        }
    }
}

// draw the score
function drawScore() {
    document.getElementById('scores').innerText = score;
}
drawScore()

// Draw the lifes
function drawLifes() {
    content = ""
    for (var i = 0; i < pacman.lives;i++) {
        content += '<img src="pacman-life.ico" alt="pacman lifes">\n';
    }
    document.getElementById('lives').innerHTML = content;
}
drawLifes()

//Draw the cherrys
function drawCherry() {
    count = 0
    for (i in world) {
        for (y in world[i]) {
            if (world[i][y] == 3) {
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
            if (timer != 0) {
                timer--;
                score -= 22;
                drawScore();
            }
            else {
                timeExp = true;
                drawScore();
            }
            document.getElementById('timer').innerText = timer + 's';
        }, 1000)
    }
}

// GHOSTS MOVE FUNCTION


function ghostMove(enemy) {
    gps = ""
    if (enemy.lives > 0 && triggerTimer) {
        function getPacPos() {
            if (pacman.y < enemy.y) {
                gps += "U"
            }
            if (pacman.y > enemy.y) {
                gps += "D"
            }
            if (pacman.x < enemy.x) {
                gps += "L"
            }
            if (pacman.x > enemy.x) {
                gps += "R"
            }
        }
        getPacPos();
        console.log(gps)
        if (gps == "L" && world[enemy.y][enemy.x - 1] != 2) { // LEFT
            enemy.x--;
        }
        if (gps == "R" && world[enemy.y][enemy.x + 1] != 2) { // RIGHT
            enemy.x++;
        }
        if (gps == "U" && world[enemy.y - 1][enemy.x] != 2) { // UP
            enemy.y--;
        }
        if (gps == "D" && world[enemy.y + 1][enemy.x] != 2) { // DOWN
            enemy.y++;
        }
        if (gps == "UL"){
            if (world[enemy.y - 1][enemy.x] != 2) { // UP
                enemy.y--;
            }
            if (world[enemy.y - 1][enemy.x] == 2 && world[enemy.y][enemy.x - 1] != 2) { // LEFT
                enemy.x--;
            }
        }
        if (gps == "UR"){
            if (world[enemy.y - 1][enemy.x] != 2) { // UP
                enemy.y--;
            }
            if (world[enemy.y - 1][enemy.x] == 2 && world[enemy.y][enemy.x + 1] != 2) { // RIGHT
                enemy.x++;
            }
        }
        if (gps == "DL"){
            if (world[enemy.y + 1][enemy.x] != 2) { // UP
                enemy.y++;
            }
            if (world[enemy.y + 1][enemy.x] == 2 && world[enemy.y][enemy.x - 1] != 2) { // LEFT
                enemy.x--;
            }
        }
        if (gps == "DR"){
            if (world[enemy.y + 1][enemy.x] != 2) { // UP
                enemy.y++;
            }
            if (world[enemy.y - 1][enemy.x] == 2 && world[enemy.y][enemy.x + 1] != 2) { // RIGHT
                enemy.x++;
            }
        }
    }
}
setInterval(() => {
    ghostMove(ghosts[1]);
    ghostMove(ghosts[2]);
    ghostMove(ghosts[3]);
    ghostMove(ghosts[4]);
    drawGhosts();
}, ghostSpeed);


// PACMAN MOVE FUNCTINON
document.onkeydown = function (key) {
    if (key.keyCode == 37) {
        if (world[pacman.y][pacman.x - 1] != 2) { // LEFT
            pacman.x--;
            document.getElementById('pacman').style.transform = "scaleX(-1)"
            triggerTimer = true;
        }
    }
    if (key.keyCode == 39) {
        if (world[pacman.y][pacman.x + 1] != 2) { // RIGHT
            pacman.x++;
            document.getElementById('pacman').style.transform = "scaleX(1)"
            triggerTimer = true;
        }
    }
    if (key.keyCode == 38) {
        if (world[pacman.y - 1][pacman.x] != 2) { // UP
            pacman.y--;
            document.getElementById('pacman').style.transform = "rotate(-90deg)"
            triggerTimer = true;
        }
    }
    if (key.keyCode == 40) {
        if (world[pacman.y + 1][pacman.x] != 2) { // DOWN
            pacman.y++;
            document.getElementById('pacman').style.transform = "rotate(90deg)"
            triggerTimer = true;
        }
    }
    // if (world[pacman.y][pacman.x] == 0) {
    // }
    if (world[pacman.y][pacman.x] == 1) {
        score += 15
        world[pacman.y][pacman.x] = 0
    }
    if (world[pacman.y][pacman.x] == 3) {
        score += 50
        world[pacman.y][pacman.x] = 0
    }

    drawGhosts()
    pacGhostColl()
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