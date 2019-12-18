var player = document.getElementById('player');
var box = document.getElementById('box');
var boxWidth = box.offsetWidth;
var boxHeight = box.offsetHeight;

var ballColors = ['red', 'blue', 'orange', 'green'];
var initSpeed = 1;

class Score {
    el;
    value;

    constructor(id) {
        this.el = document.getElementById(id);
        this.resetScore();
    }
    increaseScore() {
        this.value++;
        this.draw();    
    }
    resetScore() {
        this.value = 0;
        this.draw();
    }
    draw() {
        this.el.innerHTML = 'Score: ' + this.value; 
    }
}
var mainScore = new Score('score');

class Ball {
    speed;
    color;
    size;
    el;

    constructor(id, speed, color, size) {
        this.el = document.createElement(id);
        this.el.classList.add("ball");
        box.appendChild(this.el);

        this.speed = speed;
        this.color = color;
        this.size = size;

        this.el.style.backgroundColor = this.color;
        this.el.style.width = this.size + 'px';
        this.el.style.height = this.size + 'px';
    }
    
    checkBounds() {
        var ball = this.el;
        var newX = ball.offsetLeft + this.speed.x;
        var newY = ball.offsetTop + this.speed.y;
    
        if (newX < 0) {
            newX = 0;
            this.speed.x *= -1;
            this.increaseSpeed();
        }
        if (newY < 0) {
            newY = 0;
            this.speed.y *= -1;
            this.increaseSpeed();
        }
        if (newX > (boxWidth-ball.offsetHeight)) {
            newX = (boxWidth - ball.offsetHeight);
            this.speed.x *= -1;
            this.increaseSpeed();
        }
    
        if (newY > boxHeight-ball.offsetHeight - player.offsetHeight) {
            var ballRight = newX + ball.offsetWidth;
            var playerRight = player.offsetLeft + player.offsetWidth;
            if (ballRight > player.offsetLeft && newX < playerRight) {
                newY = boxHeight-ball.offsetHeight - player.offsetHeight;
                this.speed.y *= -1;
                mainScore.increaseScore();
                this.increaseSpeed();
            }
        }

        if (newY > boxHeight-ball.offsetHeight) {
            mainScore.resetScore();
            box.removeChild(ball);
            createBall();
            return;
        }

        for (var i=0; i<bricks.length; i++) {
            var brick = bricks[i];
            this.processHit(newX, newY, brick);
        }
        ball.style.left = newX + 'px';
        ball.style.top = newY + 'px';
    }
    increaseSpeed() {
        this.speed.x *= 1.1;
        this.speed.y *= 1.1;
    }
    processHit(x, y, brick) {
        var brickEl = brick.el;
        if (x < brickEl.offsetLeft + brickEl.offsetWidth && (x + this.size) > brickEl.offsetLeft &&
            y < brickEl.offsetTop + brickEl.offsetHeight && (y + this.size) > brickEl.offsetTop) {
            if (x > brickEl.offsetLeft && (x + this.size) < brickEl.offsetLeft + brickEl.offsetWidth) {
                this.speed.y *= -1;
            }
            if (y > brickEl.offsetTop && (y + this.size) < brickEl.offsetTop + brickEl.offsetHeight) {
                this.speed.x *= -1;
            }
        }
    }
}

var ballObjs = [    
    // new Ball('ball', {x:5, y:-5}, 'blue', 10),
    // new Ball('ball2', {x:-5, y:-5}, 'green', 10),
    // new Ball('ball3', {x:-10, y:-5}, 'yellow', 15),
];

class Bricks {
    el;
    color;
    size;
    
    constructor(id, color, size) {
        this.el = document.createElement(id);
        this.el.classList.add("brick");
        box.appendChild(this.el);

        this.color = color;
        this.size = size; 
        this.el.style.backgroundColor = this.color;
        this.el.style.left = Math.floor(Math.random()*(boxWidth-this.el.offsetWidth)) + 'px';
        this.el.style.top = Math.floor(Math.random()*(boxHeight-this.el.offsetHeight)) + 'px';
    }
}
var bricks = [];

createBrick();
function createBrick() {
    var newBrick = new Bricks('bricks', 'green', 10);
    bricks.push(newBrick);
}

function createBall() {
    var color = ballColors[Math.floor(Math.random()*ballColors.length)];
    var speed = {
        x: (Math.floor(Math.random()*20)-10)*initSpeed,
        y: -10*initSpeed
    };
    var newBall = new Ball('ball', speed, color, 15+Math.floor(Math.random()*11));
    // initSpeed += 0.3;
    ballObjs.push(newBall);
}
createBall();

function moveLeft() {
    player.style.left = parseInt(player.offsetLeft) - 5 + 'px';
}

function moveRight() {
    player.style.left = parseInt(player.offsetLeft) + 5 + 'px';
}
document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37:
            moveLeft();
            if (player.offsetLeft < 0) {
                player.style.left = 0 + 'px';
                // console.log("end");
            }
            // console.log("left key");
            break;
        case 39:
            moveRight();
            if (player.offsetLeft > boxWidth - player.offsetWidth) {
                player.style.left = boxWidth - player.offsetWidth + 'px';
            }
        case 32:
            // createBall();
            break;
    }
});

setInterval(function(){
    for (var i=0; i<ballObjs.length; i++) {
        ballObjs[i].checkBounds();
    }
}, 100);