var player = document.getElementById('player');
var box = document.getElementById('box');
var ball = document.getElementById('ball');
var playerWidth = player.offsetWidth;
var playerHeight = player.offsetHeight;
var boxWidth = box.offsetWidth;
var boxHeight = box.offsetHeight;
var ballWidth = ball.offsetWidth;
var ballHeight = ball.offsetHeight;
var speed = {
    x: -5, 
    y: 5
};

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

function checkBounds() {
    if (ball.offsetLeft < 0) {
        ball.offsetLeft = 0;
        speed.x *= -1;
    }
    if (ball.offsetTop < 0) {
        ball.offsetTop = 0;
        speed.y *= -1;
    }
}

setInterval(function(){
    ball.style.left = ball.offsetLeft + speed.x + 'px';
    ball.style.top = ball.offsetTop + speed.y + 'px';

    checkBounds();

    if (ball.offsetTop > boxHeight-ball.offsetHeight-playerHeight) {
        var ballRight = ball.offsetLeft + ballWidth;
        var playerRight = player.offsetLeft + playerWidth;
        if (ballRight > player.offsetLeft && ball.offsetLeft < playerRight) {
            speed.y *= -1;
            // console.log("inside");
        }
        // console.log("test");
    }
    if (ball.offsetTop > boxHeight-ball.offsetHeight){
        box.removeChild(ball);
    }
}, 100);