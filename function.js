var player = document.getElementById('player');
var box = document.getElementById('box');

var playerWidth = player.offsetWidth;
var playerHeight = player.offsetHeight;
var boxWidth = box.offsetWidth;
var boxHeight = box.offsetHeight;

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
    
        if (ball.offsetLeft < 0) {
            ball.style.left = '0px';
            this.speed.x *= -1;
        }
        if (ball.offsetTop < 0) {
            ball.style.top = '0px';
            this.speed.y *= -1;
        }
        if (ball.offsetLeft > (boxWidth-ball.offsetHeight)) {
            ball.style.left = (boxWidth - ball.offsetHeight) + 'px';
            this.speed.x *= -1;
        }
    }

    ballMovement() {
        var ball = this.el;
    
        ball.style.left = ball.offsetLeft + this.speed.x + 'px';
        ball.style.top = ball.offsetTop + this.speed.y + 'px';
        if (ball.offsetTop > boxHeight-ball.offsetHeight-playerHeight) {
            var ballRight = ball.offsetLeft + ball.offsetWidth;
            var playerRight = player.offsetLeft + playerWidth;
            if (ballRight > player.offsetLeft && ball.offsetLeft < playerRight) {
                this.speed.y *= -1;
            }
        }
        if (ball.offsetTop > boxHeight-ball.offsetHeight) {
            box.removeChild(ball);
        }
    }
}

var ballObjs = [
    new Ball('ball', {x:5, y:-5}, 'blue', 10),
    new Ball('ball2', {x:-5, y:-5}, 'green', 10),
    new Ball('ball3', {x:-10, y:-5}, 'yellow', 15),
];


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
            if (player.offsetLeft > boxWidth-playerWidth) {
                player.style.left = boxWidth-playerWidth + 'px';
            }
            // console.log("right key");
            break;
    }
});

setInterval(function(){
    for (var i=0; i<ballObjs.length; i++) {
        ballObjs[i].checkBounds();
        ballObjs[i].ballMovement();
    }
}, 100);