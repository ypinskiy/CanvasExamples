'use strict';
var foregroundCanvas = document.getElementById("foreground");
var backgroundCanvas = document.getElementById("background");
var foreContext = foregroundCanvas.getContext("2d");
var backContext = backgroundCanvas.getContext("2d");

var width = 600;
var height = 800;

foregroundCanvas.width = width * window.devicePixelRatio;
foregroundCanvas.height = height * window.devicePixelRatio;
backgroundCanvas.width = width * window.devicePixelRatio;
backgroundCanvas.height = height * window.devicePixelRatio;
foregroundCanvas.style.width = width + 'px';
foregroundCanvas.style.height = height + 'px';
backgroundCanvas.style.width = width + 'px';
backgroundCanvas.style.height = height + 'px';
foreContext.scale(window.devicePixelRatio, window.devicePixelRatio);
backContext.scale(window.devicePixelRatio, window.devicePixelRatio);

var ball = {
	x: 0,
	y: 0,
	radius: 10,
	velocity: {
		x: 0,
		y: 0
	}
};

var paddle = {
	x: 0,
	y: 0,
	width: 120,
	height: 20
};

var initSpeed = 5;
var bricks = [];

var rightPressed = false;
var leftPressed = false;
var keyboardEnabled = true;
var mouseEnabled = true;
var lastMousePos = {
	x: 0,
	y: 0
};
var game = {
	state: 'start',
	level: 1,
	score: 0,
	maxScore: 0,
	lives: 3
};

var startTime = null;
var endTime = null;
var elapsedSeconds = 0;
var gameVolume = 0.2;

var paddleBump = new Audio('/assets/audio/8BIT_RETRO_Hit_Bump_Bright_Reverse_mono.wav'); // Sounds and Art
paddleBump.volume = gameVolume;
var brickCollect = new Audio('/assets/audio/8BIT_RETRO_Coin_Collect_Two_Note_Bright_Fast_mono.wav');
brickCollect.volume = gameVolume;
var wallBump = new Audio('/assets/audio/8BIT_RETRO_Hit_Bump_Quick_Distorted_mono.wav');
wallBump.volume = gameVolume;
var lostLife = new Audio('/assets/audio/8BIT_RETRO_Movement_Effect_Deep_loop_mono.wav');
lostLife.volume = gameVolume;
var gameOver = new Audio('/assets/audio/8BIT_RETRO_Explosion_Short_Dirty_mono.wav');
gameOver.volume = gameVolume;
var gameWon = new Audio('/assets/audio/8BIT_RETRO_Coin_Collect_Two_Note_Deep_Twinkle_mono.wav');
gameWon.volume = gameVolume;
var brickArt = new Image();
brickArt.src = '/assets/art/breakout/element_blue_rectangle_glossy.png';
var ballArt = new Image();
ballArt.src = '/assets/art/breakout/ballBlue.png';
var paddleArt = new Image();
paddleArt.src = '/assets/art/breakout/paddleBlu.png';
var handCursor = new Image();
handCursor.src = '/assets/art/common/cursorHand_grey.png';

var gameInit = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
foregroundCanvas.addEventListener("mousemove", mouseMoveHandler, false);
foregroundCanvas.addEventListener("mousedown", mouseClickHandler, false);

function draw() {
	if (game.state == 'game') {
		gameLoop();
	}
	else if (game.state == 'start') {
		startLoop();
	}
	else if (game.state == 'over') {
		overLoop();
	}

	requestAnimationFrame(draw); // Request next loop
}

draw();

function startLoop() {
	foreContext.clearRect(0, 0, foregroundCanvas.width, foregroundCanvas.height);
	backContext.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

	foreContext.drawImage(handCursor, lastMousePos.x - 10 | 0, lastMousePos.y - 10 | 0, 50, 50);

	backContext.shadowColor = 'rgba(0, 149, 221, 0.5)';
	backContext.shadowOffsetX = 0;
	backContext.shadowOffsetY = 0;
	backContext.lineWidth = 2;
	backContext.shadowBlur = 0;

	backContext.font = "112px serif";
	backContext.fillStyle = "#0095DD";
	var textMetrics = backContext.measureText("Breakout");
	backContext.fillText("Breakout", (backgroundCanvas.width - textMetrics.width) / 2, 200);

	if (lastMousePos.x < 150 + 300 && lastMousePos.x > 150 && lastMousePos.y < 400 + 100 && lastMousePos.y > 400) {
		backContext.shadowBlur = 20;
	}
	else {
		backContext.shadowBlur = 0;
	}
	backContext.strokeStyle = "#0095DD";
	backContext.fillStyle = 'rgba(0, 149, 221, 0.5)';
	backContext.fillRect(150, 400, 300, 100);
	backContext.fill();
	backContext.font = "27px serif";
	backContext.fillStyle = "rgba(0, 0, 0, 1)";
	textMetrics = backContext.measureText("Play with Mouse");
	backContext.fillText("Play with Mouse", (backgroundCanvas.width - textMetrics.width) / 2, 460);

	if (lastMousePos.x < 150 + 300 && lastMousePos.x > 150 && lastMousePos.y < 600 + 100 && lastMousePos.y > 600) {
		backContext.shadowBlur = 20;
	}
	else {
		backContext.shadowBlur = 0;
	}
	backContext.strokeStyle = "#0095DD";
	backContext.fillStyle = 'rgba(0, 149, 221, 0.5)';
	backContext.fillRect(150, 600, 300, 100);
	backContext.fill();
	backContext.font = "27px serif";
	backContext.fillStyle = "rgba(0, 0, 0, 1)";
	textMetrics = backContext.measureText("Play with Keyboard");
	backContext.fillText("Play with Keyboard", (backgroundCanvas.width - textMetrics.width) / 2, 660);
	backContext.shadowBlur = 0;
}

function gameLoop() {
	if (!gameInit) {
		foreContext.clearRect(0, 0, foregroundCanvas.width, foregroundCanvas.height);
		backContext.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
		drawBricks();
		drawScore();
		drawLives();
		resetBallAndPaddle();
		paddle.y = height - paddle.height;
		gameInit = true;
	}

	drawBall();
	drawPaddle();
	checkCollisions();

	ball.x += ball.velocity.x;
	ball.y += ball.velocity.y;

	if (rightPressed && paddle.x < width - paddle.width) { // If right arrow key pressed and edge isn't at canvas edge
		paddle.x += 7; // Move paddle right
	}
	else if (leftPressed && paddle.x > 0) { // If left arrow key pressed and edge isn't at canvas edge
		paddle.x -= 7; // Move paddle left
	}
}

function overLoop() {
	foreContext.clearRect(0, 0, foregroundCanvas.width, foregroundCanvas.height);
	backContext.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
	foreContext.font = "90px serif";
	foreContext.fillStyle = "#0095DD";
	foreContext.fillText("Game Over!", 60, 200);

	foreContext.font = "27px serif";
	foreContext.fillStyle = "#0095DD";
	foreContext.fillText("Your score: " + game.score, 210, 460);

	foreContext.font = "27px serif";
	foreContext.fillStyle = "#0095DD";
	foreContext.fillText("Elapsed Time: " + elapsedSeconds + "s", 190, 500);
	foreContext.shadowBlur = 0;
}

function checkCollisions() {
	if (ball.x + ball.velocity.x < ball.radius || ball.x + ball.velocity.x > width - ball.radius) { // If ball heading for left/right side
		ball.velocity.x = -ball.velocity.x; // Switch left/right vector
		wallBump.play();
	}

	if (ball.y + ball.velocity.y < ball.radius) { // If ball heading for top/bottom side
		ball.velocity.y = -ball.velocity.y; // Switch up/down vector
		wallBump.play();
	}
	else if (ball.y + ball.velocity.y > height - ball.radius) {
		game.lives--;
		drawLives();
		if (game.lives == 0) {
			gameOver.play();
			game.state = 'over';
			endTime = Date.now();
			var timeDiff = endTime - startTime;
			timeDiff /= 1000;
			elapsedSeconds = timeDiff | 0;
			startTime = null;
			endTime = null;
		}
		else {
			lostLife.play();
			resetBallAndPaddle();
		}
	}

	if (isBallColliding(ball, paddle)) {
		ball.velocity.x = 8 * ((ball.x - (paddle.x + paddle.width / 2)) / paddle.width); // Alter bounce angle
		ball.velocity.y = -ball.velocity.y; // Switch up/down vector
		paddleBump.play();
	}

	bricks.forEach(function(brick) {
		if (brick.status == 1) {
			if (isBallColliding(ball, brick)) {
				ball.velocity.x = 8 * ((ball.x - (brick.x + brick.width / 2)) / brick.width); // Alter bounce angle
				ball.velocity.y = -ball.velocity.y; // Switch up/down vector
				brick.status = 0;
				game.score++;
				drawScore();
				brickCollect.play();
				backContext.clearRect(brick.x, brick.y, brick.width, brick.height);
				if (game.score == game.maxScore) {
					gameWon.play();
					goToNextLevel();
				}
			}
		}
	});
}

function resetBallAndPaddle() {
	ball.x = width / 2;
	ball.y = height - 50;
	ball.velocity.x = initSpeed;
	ball.velocity.y = -initSpeed;
	paddle.x = (width - paddle.width) / 2;
}

function goToNextLevel() {
	bricks = [];
	gameInit = false;
	initSpeed += 2;
}

function isBallColliding(circle, rect) {
	var distX = Math.abs(circle.x - rect.x - rect.width / 2);
	var distY = Math.abs(circle.y - rect.y - rect.height / 2);

	if (distX > (rect.width / 2 + circle.radius)) {
		return false;
	}
	if (distY > (rect.height / 2 + circle.radius)) {
		return false;
	}

	if (distX <= (rect.width / 2)) {
		return true;
	}
	if (distY <= (rect.height / 2)) {
		return true;
	}

	var dx = distX - rect.width / 2;
	var dy = distY - rect.height / 2;
	return (dx * dx + dy * dy <= (circle.radius * circle.radius));
}

function drawBall() {
	foreContext.clearRect(ball.x - ball.radius - ball.velocity.x - 10, ball.y - ball.radius - ball.velocity.y - 10, (ball.radius * 2) + 20, (ball.radius * 2) + 20);
	foreContext.drawImage(ballArt, ball.x - ball.radius | 0, ball.y - ball.radius | 0, ball.radius * 2 | 0, ball.radius * 2 | 0);
}

function drawPaddle() {
	foreContext.clearRect(0, paddle.y, foregroundCanvas.width, paddle.height);
	foreContext.drawImage(paddleArt, paddle.x | 0, paddle.y | 0, paddle.width | 0, paddle.height | 0);
}

function drawBricks() {
	if (bricks.length == 0) {
		var brickRowCount = 4;
		var brickColumnCount = 5;
		var brickWidth = 75;
		var brickHeight = 30;
		var brickPadding = 40;
		var brickOffsetTop = 40;
		var brickOffsetLeft = 30;
		for (var c = 0; c < brickColumnCount; c++) {
			for (var r = 0; r < brickRowCount; r++) {
				if (r % 2 == 0) {
					var brickX = (c * (brickWidth + brickPadding)) + (brickOffsetLeft / 2);
				}
				else {
					var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft + (brickOffsetLeft / 2);
				}
				var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks.push({
					x: brickX,
					y: brickY,
					width: brickWidth,
					height: brickHeight,
					status: 1
				});
			}
		}
		game.maxScore += brickColumnCount * brickRowCount;
	}
	bricks.forEach(function(brick) {
		if (brick.status == 1) {
			backContext.beginPath();
			backContext.drawImage(brickArt, brick.x | 0, brick.y | 0, brick.width | 0, brick.height | 0);
			backContext.closePath();
		}
	});
}

function drawScore() {
	backContext.font = "16px Arial";
	backContext.fillStyle = "#0095DD";
	var textMetrics = backContext.measureText("Score: " + game.score);
	backContext.clearRect(0, 0, textMetrics.width + 8, 25);
	backContext.beginPath();
	backContext.fillText("Score: " + game.score, 8, 20);
	backContext.closePath();
}

function drawLives() {
	backContext.font = "16px Arial";
	backContext.fillStyle = "#0095DD";
	var textMetrics = backContext.measureText("Lives: " + game.lives);
	backContext.clearRect(width - textMetrics.width, 0, textMetrics.width, 25);
	backContext.beginPath();
	backContext.fillText("Lives: " + game.lives, width - textMetrics.width - 15, 20);
	backContext.closePath();
}

function keyDownHandler(event) {
	if (keyboardEnabled) {
		if (event.keyCode == 39) {
			rightPressed = true;
		}
		else if (event.keyCode == 37) {
			leftPressed = true;
		}
	}
}

function keyUpHandler(event) {
	if (event.keyCode == 39) {
		rightPressed = false;
	}
	else if (event.keyCode == 37) {
		leftPressed = false;
	}
}

function mouseMoveHandler(event) {
	var relativeX = event.clientX - foregroundCanvas.offsetLeft;
	if (relativeX > 0 && relativeX < width && mouseEnabled) {
		paddle.x = relativeX - (paddle.width / 2);
	}
	lastMousePos.x = relativeX;
	lastMousePos.y = event.clientY - foregroundCanvas.offsetTop;
}

function mouseClickHandler(event) {
	var Mx = event.x;
	var My = event.y;

	Mx -= foregroundCanvas.offsetLeft;
	My -= foregroundCanvas.offsetTop;

	if (game.state == 'start') {
		if (lastMousePos.x < 150 + 300 && lastMousePos.x > 150 && lastMousePos.y < 400 + 100 && lastMousePos.y > 400) {
			keyboardEnabled = false;
			game.state = 'game';
			startTime = Date.now();
		}
		else if (lastMousePos.x < 150 + 300 && lastMousePos.x > 150 && lastMousePos.y < 600 + 100 && lastMousePos.y > 600) {
			mouseEnabled = false;
			game.state = 'game';
			startTime = Date.now();
		}
	}
}