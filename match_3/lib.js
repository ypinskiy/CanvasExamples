'use strict';
class Grid {
	constructor(x, y, w, h, rows, columns, padding) {
		this.offsetTop = y;
		this.offsetLeft = x;
		this.height = h;
		this.width = w;
		this.columns = columns;
		this.rows = rows;
		this.padding = padding;
		this.cellHeight = (this.height - (this.padding * 2)) / this.rows;
		this.cellWidth = (this.width - (this.padding * 2)) / this.columns;
		this.cells = [];
		for (var i = 0; i < rows; i++) {
			var row = [];
			for (var j = 0; j < columns; j++) {
				var column = { filled: false, color: null };
				row.push(column);
			}
			this.cells.push(row);
		}
	}

	renderGrid(context) {
		for (var i = 1; i < (this.height - (this.padding * 2)) / this.cellHeight; i++) {
			context.beginPath();
			context.moveTo(this.offsetLeft + this.padding | 0, this.offsetTop + (i * this.cellHeight) + this.padding | 0);
			context.lineWidth = 1;
			context.lineTo(this.offsetLeft + this.width - this.padding | 0, this.offsetTop + (i * this.cellHeight) + this.padding | 0);
			context.strokeStyle = "black";
			context.stroke();
			context.closePath();
		}

		for (var i = 1; i < (this.width - (this.padding * 2)) / this.cellWidth; i++) {
			context.beginPath();
			context.moveTo(this.offsetLeft + (i * this.cellWidth) + this.padding | 0, this.offsetTop + this.padding | 0);
			context.lineWidth = 1;
			context.lineTo(this.offsetLeft + (i * this.cellWidth) + this.padding | 0, this.offsetTop + this.height + this.padding | 0);
			context.strokeStyle = "black";
			context.stroke();
			context.closePath();
		}

		context.beginPath(); // Top
		context.moveTo(this.offsetLeft + this.padding, this.offsetTop + this.padding);
		context.lineTo(this.offsetLeft + this.width - this.padding, this.offsetTop + this.padding);
		context.strokeStyle = "black";
		context.stroke();
		context.closePath();

		context.beginPath(); // Left
		context.moveTo(this.offsetLeft + this.padding, this.offsetTop + this.padding);
		context.lineTo(this.offsetLeft + this.padding, this.offsetTop + this.height - this.padding);
		context.strokeStyle = "black";
		context.stroke();
		context.closePath();

		context.beginPath(); // Bottom
		context.moveTo(this.offsetLeft + this.padding, this.offsetTop + this.height - this.padding);
		context.lineTo(this.offsetLeft + this.width - this.padding, this.offsetTop + this.height - this.padding);
		context.strokeStyle = "black";
		context.stroke();
		context.closePath();

		context.beginPath(); // Right
		context.moveTo(this.offsetLeft + this.width - this.padding, this.offsetTop + this.padding);
		context.lineTo(this.offsetLeft + this.width - this.padding, this.offsetTop + this.height - this.padding);
		context.strokeStyle = "black";
		context.stroke();
		context.closePath();
	}
	
	renderCells(context, game) {
		for (var row = 0; row < this.rows; row++) {
			for (var column = 0; column < this.columns; column++) {
				var cell = this.cells[row][column];
				if (cell.filled) {
					if (game.userSelected.length > 0 && row == game.userSelected[0].row && column == game.userSelected[0].column) {
						context.beginPath();
						context.globalAlpha = 0.3;
						context.fillStyle = "grey";
						context.rect(this.padding + (this.cellWidth * column) + this.offsetLeft, this.padding + (this.cellHeight * row) + this.offsetTop, this.cellWidth, this.cellHeight);
						context.fill();
						context.closePath();
					}
					context.beginPath();
					context.globalAlpha = 0.5;
					context.strokeStyle = cell.color;
					context.fillStyle = cell.color;
					context.arc(this.padding + (this.cellWidth * column) + this.offsetLeft + (this.cellWidth / 2), this.padding + (this.cellHeight * row) + this.offsetTop + (this.cellHeight / 2), (this.cellHeight / 2) - 2 | 0, 0, 2 * Math.PI);
					context.fill();
					context.globalAlpha = 1;
					context.stroke();
					context.closePath();
				}
			}
		}
	}
	
	fillCell(row, column, color) {
		if (color != null) {
			this.cells[row][column] = { filled: true, color: color };
		} else {
			this.cells[row][column] = { filled: false, color: false };
		}
	}
}