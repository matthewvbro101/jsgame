var player = document.getElementById('player');
var box = document.getElementById('box');
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
