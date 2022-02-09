const canvas = document.getElementById('canvasField');
const ctx = canvas.getContext('2d');
let speed = 10;
let score = 0;
let tileCount = 20;
let tileSize = 18;
let foodX = 10;
let foodY = 5;
let headX = 5;
let headY = 10;
let speedX = 0;
let speedY = 0;
const snakeParts = [];
let snakelength = 2;

class snakeBody{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}

function drawGame() {//----loop game
	clearScreen();
	drawSnake();
	changeSnakePosition();
	crashWith();
	createFood();
	drawScore();
	let result = isGameOver();
	if(result === true) {
		ctx.fillStyle = 'red';
		ctx.font = '50px Comic';
		ctx.fillText('Game Over!', canvas.width / 7, canvas.height / 2);
		return;
	}
	setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
	let gameOver = false;
	if(speedX === 0 && speedY === 0) {
		return false;
	}
	if(headX < 0) {
		gameOver = true;
	} else if(headX === tileCount) {
		gameOver = true;
	} else if(headY === tileCount) {
		gameOver = true;
	} else if(headY < 0) {
		gameOver = true;
	}
	for(let i = 0; i < snakeParts.length; ++i) {
		let part = snakeParts[i];
		if(part.x === headX && part.y === headY) {
			gameOver = true;
			break;
		}
	}
	return gameOver;
}

function clearScreen() {
	ctx.fillStyle = 'whitesmoke';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
	ctx.fillStyle = 'grey';
	for(let i = 0; i < snakeParts.length; ++i) {
		let part = snakeParts[i];
		ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
	}
	snakeParts.push(new snakeBody(headX, headY));
	while(snakeParts.length > snakelength) {
		snakeParts.shift();
	}
	ctx.fillStyle = 'black';
	ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
	headX += speedX;
	headY += speedY;
}

function createFood() {
	ctx.fillStyle = 'red';
	ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

function drawScore() {
	ctx.fillStyle = 'black';
	ctx.font = '10px';
	ctx.fillText('Score: ' + score, canvas.width - 60, 15);
}

function crashWith() {
	if(headX === foodX && headY === foodY) {
		foodX = Math.floor(Math.random() * tileSize) + 1;
		foodY = Math.floor(Math.random() * tileSize) + 1;
		++snakelength;
		++score;
	}
}

document.body.addEventListener('keydown', keyDown);

function keyDown(direction) {
	if(direction.keyCode == 38) {//---UP
		if(speedY == 1) {return;}
		speedY = -1;
		speedX = 0;
	}
	if(direction.keyCode == 40) {//---DOWN
		if(speedY == -1) {return;}
		speedY = 1;
		speedX = 0;
	}
	if(direction.keyCode == 37) {//---LEFT
		if(speedX == 1) {return;}
		speedY = 0;
		speedX = -1;
	}
	if(direction.keyCode == 39) {//---RIGHT
		if(speedX == -1) {return;}
		speedY = 0;
		speedX = 1;
	}
}

function restartGame() {
	window.location.reload();
}