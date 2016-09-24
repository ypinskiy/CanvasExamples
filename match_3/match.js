var canvas = document.getElementById("foreground");
var context = canvas.getContext("2d");
var height = 900;
var width = 1200;
canvas.width = width * window.devicePixelRatio;
canvas.height = height * window.devicePixelRatio;
canvas.style.width = width + 'px';
canvas.style.height = height + 'px';
context.scale(window.devicePixelRatio, window.devicePixelRatio);
canvas.addEventListener("mousedown", mouseClickHandler, false);
var game = {
	state: "menu",
	points: 0,
	grid: new Grid(300, 100, 800, 600, 6, 8, 0),
	userInputEnabled: false,
	userSelectedRows: 0,
	userSelectedColumns: 0,
	combo: 0,
	penalty: 0,
	userSelected: []
};
var colors = ["red", "green", "blue", "yellow", "purple", "orange"];

function draw() {
	if (game.state == "start") {
		StartGame();
	} else if (game.state == "playing") {
		context.clearRect(0, 0, canvas.width, canvas.height);
		game.grid.renderCells(context, game);
		game.grid.renderGrid(context);
		DrawPoints();
	} else if (game.state == "menu") {
		DrawMenu();
	}
	requestAnimationFrame(draw);
}
draw();

function DrawMenu() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	context.fillStyle = "black";
	context.font = "32px Arial";
	context.fillText("Number Of Rows:", 50, 150);
	context.closePath();
	context.beginPath();
	context.fillStyle = "black";
	context.font = "25px Arial";
	context.rect(382, 117, 50, 50);
	if (game.userSelectedRows == 5) {
		context.globalAlpha = 0.3;
		context.fillStyle = "red";
		context.fill();
		context.fillStyle = "black";
		context.globalAlpha = 1;
	}
	context.stroke();
	context.fillText("5", 400, 150);
	context.closePath();
	context.beginPath();
	context.fillStyle = "black";
	context.font = "25px Arial";
	context.rect(482, 117, 50, 50);
	if (game.userSelectedRows == 6) {
		context.globalAlpha = 0.3;
		context.fillStyle = "red";
		context.fill();
		context.fillStyle = "black";
		context.globalAlpha = 1;
	}
	context.stroke();
	context.fillText("6", 500, 150);
	context.closePath();
	context.beginPath();
	context.fillStyle = "black";
	context.font = "25px Arial";
	context.rect(582, 117, 50, 50);
	if (game.userSelectedRows == 7) {
		context.globalAlpha = 0.3;
		context.fillStyle = "red";
		context.fill();
		context.fillStyle = "black";
		context.globalAlpha = 1;
	}
	context.stroke();
	context.fillText("7", 600, 150);
	context.closePath();
	context.beginPath();
	context.fillStyle = "black";
	context.font = "25px Arial";
	context.rect(682, 117, 50, 50);
	if (game.userSelectedRows == 8) {
		context.globalAlpha = 0.3;
		context.fillStyle = "red";
		context.fill();
		context.fillStyle = "black";
		context.globalAlpha = 1;
	}
	context.stroke();
	context.fillText("8", 700, 150);
	context.closePath();
	context.beginPath();
	context.fillStyle = "black";
	context.font = "32px Arial";
	context.fillText("Number Of Columns:", 50, 250);
	context.closePath();
	context.beginPath();
	context.fillStyle = "black";
	context.font = "25px Arial";
	context.rect(382, 217, 50, 50);
	if (game.userSelectedColumns == 5) {
		context.globalAlpha = 0.3;
		context.fillStyle = "red";
		context.fill();
		context.fillStyle = "black";
		context.globalAlpha = 1;
	}
	context.stroke();
	context.fillText("5", 400, 250);
	context.closePath();
	context.beginPath();
	context.fillStyle = "black";
	context.font = "25px Arial";
	context.rect(482, 217, 50, 50);
	if (game.userSelectedColumns == 6) {
		context.globalAlpha = 0.3;
		context.fillStyle = "red";
		context.fill();
		context.fillStyle = "black";
		context.globalAlpha = 1;
	}
	context.stroke();
	context.fillText("6", 500, 250);
	context.closePath();
	context.beginPath();
	context.fillStyle = "black";
	context.font = "25px Arial";
	context.rect(582, 217, 50, 50);
	if (game.userSelectedColumns == 7) {
		context.globalAlpha = 0.3;
		context.fillStyle = "red";
		context.fill();
		context.fillStyle = "black";
		context.globalAlpha = 1;
	}
	context.stroke();
	context.fillText("7", 600, 250);
	context.closePath();
	context.beginPath();
	context.fillStyle = "black";
	context.font = "25px Arial";
	context.rect(682, 217, 50, 50);
	if (game.userSelectedColumns == 8) {
		context.globalAlpha = 0.3;
		context.fillStyle = "red";
		context.fill();
		context.fillStyle = "black";
		context.globalAlpha = 1;
	}
	context.stroke();
	context.fillText("8", 700, 250);
	context.closePath();
	context.beginPath();
	context.fillStyle = "black";
	context.font = "32px Arial";
	context.rect(540, 415, 150, 50);
	context.stroke();
	context.fillText("Continue", 550, 450);
	context.closePath();
}

function DrawPoints() {
	context.beginPath();
	context.fillStyle = "black";
	context.font = "32px Arial";
	context.fillText("Points: " + game.points, 50, 150);
	context.closePath();
}

function StartGame() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (var row = 0; row < game.grid.rows; row++) {
		for (var column = 0; column < game.grid.columns; column++) {
			game.grid.fillCell(row, column, colors[Math.floor(Math.random() * colors.length)]);
		}
	}
	game.grid.renderCells(context, game);
	game.grid.renderGrid(context);
	HandleMatches(false);
	game.state = "playing";
	game.userInputEnabled = true;
}

function HandleMatches(player) {
	var matches = checkForMatches();
	if (matches.length > 0) {
		game.penalty = 0;
		matches.forEach(function(match) {
			game.combo++;
			deleteCells(match);
			if (player) {
				game.points += match.length * 10 * (1 + (game.combo / 10));
			}
		});
		moveCellsDown();
		HandleMatches(player);
	} else if (player) {
		game.penalty++;
		game.points -= 10 * game.penalty;
	}
}

function deleteCells(points) {
	for (var i = 0; i < points.length; i++) {
		game.grid.fillCell(points[i].row, points[i].column, null);
	}
}

function moveCellsDown() {
	for (var row = game.grid.rows - 1; row > -1; row--) {
		for (var column = game.grid.columns - 1; column > -1; column--) {
			var cell = game.grid.cells[row][column];
			if (cell != null && cell.filled == false) {
				if (row == 0) {
					game.grid.fillCell(row, column, colors[Math.floor(Math.random() * colors.length)]);
				} else {
					for (var i = 1; i <= row; i++) {
						if (game.grid.cells[row - i][column].filled) {
							game.grid.cells[row][column] = game.grid.cells[row - i][column];
							deleteCells([{
								row: row - i,
								column: column
							}]);
							break;
						} else if (i == row) {
							game.grid.fillCell(row, column, colors[Math.floor(Math.random() * colors.length)]);
						}
					}
				}
			}
		}
	}
}

function checkForMatches() {
	var matches = [];
	for (var row = 0; row < game.grid.rows; row++) {
		for (var column = 0; column < game.grid.columns; column++) {
			if (row - 1 >= 0 && row + 1 < game.grid.rows) {
				if (game.grid.cells[row][column].color == game.grid.cells[row - 1][column].color && game.grid.cells[row][column].color == game.grid.cells[row + 1][column].color) {
					var points = [{
						row: row,
						column: column
					}, {
						row: row - 1,
						column: column
					}, {
						row: row + 1,
						column: column
					}];
					if (row - 2 >= 0 && game.grid.cells[row][column].color == game.grid.cells[row - 2][column].color) {
						points.push({
							row: row - 2,
							column: column
						});
					}
					if (row + 2 < game.grid.rows && game.grid.cells[row][column].color == game.grid.cells[row + 2][column].color) {
						points.push({
							row: row + 2,
							column: column
						});
					}
					matches.push(points);
				}
			}
			if (column - 1 >= 0 && column + 1 < game.grid.columns) {
				if (game.grid.cells[row][column].color == game.grid.cells[row][column - 1].color && game.grid.cells[row][column].color == game.grid.cells[row][column + 1].color) {
					var points = [{
						row: row,
						column: column
					}, {
						row: row,
						column: column - 1
					}, {
						row: row,
						column: column + 1
					}];
					if (column - 2 >= 0 && game.grid.cells[row][column].color == game.grid.cells[row][column - 2].color) {
						points.push({
							row: row,
							column: column - 2
						});
					}
					if (column + 2 < game.grid.columns && game.grid.cells[row][column].color == game.grid.cells[row][column + 2].color) {
						points.push({
							row: row,
							column: column + 2
						});
					}
					matches.push(points);
				}
			}
		}
	}
	for (var i = 0; i < matches.length; i++) {
		var group = matches[i];
		for (var j = 0; j < group.length; j++) {
			for (var l = i + 1; l < matches.length; l++) {
				var filtered = matches[l].filter(function(point) {
					return point.row == group[j].row && point.column == group[j].column
				});
				if (filtered.length > 0) {
					var newGroup = matches[i].concat(matches[l]);
					var oldGroup = matches[l];
					matches.splice(i, 1);
					matches.splice(matches.indexOf(oldGroup), 1, newGroup);
				}
			}
		}
	}
	for (var i = 0; i < matches.length; i++) {
		unique(matches[i], ComparePoints);
	}
	return matches;
}

function SwitchPoints(points) {
	if (points.length == 2) {
		if ((points[1].row <= points[0].row + 1 && points[1].row >= points[0].row - 1 && points[1].column == points[0].column) || (points[1].column <= points[0].column + 1 && points[1].column >= points[0].column - 1 && points[1].row == points[0].row)) {
			if (points[0].row != points[1].row || points[0].column != points[1].column) {
				var firstCell = game.grid.cells[points[0].row][points[0].column];
				var secondCell = game.grid.cells[points[1].row][points[1].column];
				game.grid.cells[points[0].row][points[0].column] = secondCell;
				game.grid.cells[points[1].row][points[1].column] = firstCell;
				HandleMatches(true);
			}
		}
	}
	game.userInputEnabled = true;
	game.combo = 0;
}

function mouseClickHandler(event) {
	if (game.userInputEnabled && game.state == "playing") {
		var point = getMousePointInGrid(event.clientX, event.clientY);
		if (point.column >= 0 && point.column < game.grid.columns && point.row >= 0 && point.row < game.grid.rows) {
			console.log(point);
			game.userSelected.push(point);
			if (game.userSelected.length == 2) {
				game.userInputEnabled = false;
				SwitchPoints(game.userSelected);
				game.userSelected = [];
			}
		}
	} else if (game.state == "menu") {
		if (event.clientX > 382 && event.clientX < 382 + 50 && event.clientY > 117 && event.clientY < 117 + 50) {
			game.userSelectedRows = 5;
		} else if (event.clientX > 482 && event.clientX < 482 + 50 && event.clientY > 117 && event.clientY < 117 + 50) {
			game.userSelectedRows = 6;
		} else if (event.clientX > 582 && event.clientX < 582 + 50 && event.clientY > 117 && event.clientY < 117 + 50) {
			game.userSelectedRows = 7;
		} else if (event.clientX > 682 && event.clientX < 682 + 50 && event.clientY > 117 && event.clientY < 117 + 50) {
			game.userSelectedRows = 8;
		} else if (event.clientX > 382 && event.clientX < 382 + 50 && event.clientY > 217 && event.clientY < 217 + 50) {
			game.userSelectedColumns = 5;
		} else if (event.clientX > 482 && event.clientX < 482 + 50 && event.clientY > 217 && event.clientY < 217 + 50) {
			game.userSelectedColumns = 6;
		} else if (event.clientX > 582 && event.clientX < 582 + 50 && event.clientY > 217 && event.clientY < 217 + 50) {
			game.userSelectedColumns = 7;
		} else if (event.clientX > 682 && event.clientX < 682 + 50 && event.clientY > 217 && event.clientY < 217 + 50) {
			game.userSelectedColumns = 8;
		} else if (event.clientX > 540 && event.clientX < 540 + 150 && event.clientY > 415 && event.clientY < 415 + 50 && game.userSelectedColumns != 0 && game.userSelectedRows != 0) {
			game.grid = new Grid(300, 50, game.userSelectedColumns * 100, game.userSelectedRows * 100, game.userSelectedRows, game.userSelectedColumns, 0);
			game.state = "start";
		}
	}
}

function getMousePointInGrid(eventX, eventY) {
	var topScrollOffset = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
	var leftScrollOffset = (window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0);
	var x = eventX - canvas.offsetLeft + leftScrollOffset;
	var y = eventY - canvas.offsetTop + topScrollOffset;
	var column = Math.floor((x / game.grid.cellWidth) - (game.grid.offsetLeft + game.grid.padding) / game.grid.cellWidth);
	var row = Math.floor((y / game.grid.cellHeight) - (game.grid.offsetTop + game.grid.padding) / game.grid.cellHeight);
	return {
		column: column,
		row: row
	};
}

function unique(a) {
	a.sort();
	for (var i = 1; i < a.length;) {
		if (a[i - 1] == a[i]) {
			a.splice(i, 1);
		} else {
			i++;
		}
	}
	return a;
}

function unique(a, compareFunc) {
	a.sort(compareFunc);
	a.sort(compareFunc);
	a.sort(compareFunc);
	for (var i = 1; i < a.length;) {
		if (compareFunc(a[i - 1], a[i]) === 0) {
			a.splice(i, 1);
		} else {
			i++;
		}
	}
	return a;
}

function ComparePoints(a, b) {
	if (a.row < b.row) {
		return -1;
	}
	if (a.row > b.row) {
		return 1;
	}
	if (a.column < b.column) {
		return -1;
	}
	if (a.column > b.column) {
		return 1;
	}
	return 0;
}