var player = document.getElementById('player');
var box = document.getElementsByClassName('box');
var playerWidth = player.offsetWidth;
var playerHeight = player.offsetHeight;
var boxWidth = box.offsetWidth;
var boxHeight = box.offsetHeight;
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
            if (player.offsetLeft - 5 <= 0) {
                player.style.left = 0 + 'px';
                // console.log("end");
            }
            // console.log("left key");
            break;
        case 39:
            moveRight();
            if (player.offsetLeft + 5 >= 750) {
                player.style.left = 750 + 'px';
            }
            // console.log("right key");
            break;

    }
});
