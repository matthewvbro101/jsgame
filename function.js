var player = document.getElementById('player');
// var x = parseInt(player.style.left, 10);

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
            console.log("left key");
            break;
        case 39:
            moveRight();
            console.log("right key");
            break;

    }
    // player.style.left = x + 'px';
    // console.log(e.which);
});
