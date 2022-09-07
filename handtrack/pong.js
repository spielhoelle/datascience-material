/*PONG 2 PLAYERS: USE "Z" & "S" for the left side and "up arrow" and "down arrow" for the right side*/
/*Project of Simon Ajzenman & Romuald Vanderlin */
var length = window.innerWidth;
var height = window.innerHeight;
var positionPlayer1 = height / 2;
var positionPlayer2 = height / 2;
var ballPositionY = height / 2;
var speedBalleY = 5;
var ballPositionX = length / 2;
var speedBalleX = 5;
var playerSpeed = 8;
export function movePlayer(sPressed, zPressed, upPressed, downPressed) {
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    if (player1 && player2) {
        if (sPressed && positionPlayer1 > 0) {
            player1.style.top = (positionPlayer1 -= playerSpeed).toString();
        }
        if (zPressed && positionPlayer1 < height - 105) {
            player1.style.top = (positionPlayer1 += playerSpeed).toString();
        }
        if (upPressed && positionPlayer2 > 0) {
            player2.style.top = (positionPlayer2 -= playerSpeed).toString();
        }
        if (downPressed && positionPlayer2 < height - 105) {
            player2.style.top = (positionPlayer2 += playerSpeed).toString();
        }
    }
}
export function moveBall() {
    if (ballPositionY < 0) {
        speedBalleY = speedBalleY * -1;
    }
    if (ballPositionY > height) {
        speedBalleY = speedBalleY * -1;
    }
    if (ballPositionX < 0) {
        changeScore(2);
    }
    if (ballPositionX > length) {
        changeScore(1);
    }
    if (ballPositionX < 70 && ballPositionY + 20 > positionPlayer1 && ballPositionY < positionPlayer1 + 100) {
        speedBalleX = speedBalleX * -1;
    }
    if (ballPositionX + 20 > length - 70 && ballPositionY + 20 > positionPlayer2 && ballPositionY < positionPlayer2 + 100) {
        speedBalleX = speedBalleX * -1;
    }
    const ball = document.getElementById("ball");
    if (ball) {
        ball.style.left = (ballPositionX += speedBalleX).toString();
        ball.style.top = (ballPositionY += speedBalleY).toString();
    }
}
function changeScore(numero) {
    ballPositionY = height / 2;
    ballPositionX = length / 2;
    if (numero == 1) {
        let scorePlayer1 = document.getElementById("scoreplayer1");
        if (scorePlayer1) {
            scorePlayer1.innerHTML = (Number(scorePlayer1.innerHTML) + 1).toString();
        }
    }
    if (numero == 2) {
        let scorePlayer2 = document.getElementById("scoreplayer2");
        if (scorePlayer2) {
            scorePlayer2.innerHTML = (Number(scorePlayer2.innerHTML) + 1).toString();
        }
    }
}
