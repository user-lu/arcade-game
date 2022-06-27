//Board variables
let blockSize = 25;
let row = 20;
let column = 20;
let board;
let context;

//Snake variables
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

//Array where food will be added to snake body
let snakeBody = [];

//Speed
let speedX = 0;
let speedY = 0;

//Food
let foodX;
let foodY;

let gameOver = false;

//When page loads, function fires
window.onload = function() {
    board = document.getElementById("board");
    board.height = row * blockSize;
    board.width = column * blockSize;
    context = board.getContext("2d");

    placeFood();
    
    document.addEventListener("keyup", changeDirection);
    
    setInterval(gameBoard, 1000/10); 
}

//Main function to change game board/snake/game over conditions
function gameBoard() {
    if(gameOver) {
        return;
    }

    //Board color
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
    
    //Food color
    context.fillStyle = "white";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //Checks to see if snake consumes food
    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    //Helps move snake body accordingly
    for(let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    //Snake color
    context.fillStyle = "lime";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    //Draws food eaten by the snake
    for(let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);      
    }

    //Game over conditions (1st is out of bounds/ 2nd is collision w/self)
    if( snakeX < 0 || snakeX > column * blockSize || snakeY < 0 || snakeY > row * blockSize) {
        gameOver = true;
        alert("GAME OVER");
    }

    for(let i = 0; i < snakeBody.length; i++) {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("GAME OVER");
        } 
    }
}

//Reads user input of which arrow key is pressed
//Also makes sure snake can't travel in the opposite direction
function changeDirection(e) {
    if(e.code == "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    }
    else if(e.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }
    else if(e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }
    else if(e.code == "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}

//Places food in random locations
function placeFood() {
    foodX = Math.floor(Math.random() * column) * blockSize;
    foodY = Math.floor(Math.random() * column) * blockSize;    
}

