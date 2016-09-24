'use strict';
class Grid {
	constructor(x, y, w, h, rows, columns, padding, showGrid) {
		this.offsetTop = y;
		this.offsetLeft = x;
		this.height = h;
		this.width = w;
		this.columns = columns;
		this.rows = rows;
		this.padding = padding;
		this.cellHeight = (this.height - (this.padding * 2)) / this.rows;
		this.cellWidth = (this.width - (this.padding * 2)) / this.columns;
		this.road = null;
		this.showGrid = showGrid;
		this.lastSquare = 0;
	}
	render(context) {
		if (this.showGrid) {
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
	}
	fillGrid(context) {
		if (this.road != null && this.road != undefined) {
			for (var column = 0; column < this.columns; column++) {
				for (var row = 0; row < this.rows; row++) {
					var cell = this.road[row][column];
					context.drawImage(cell.image, this.padding + this.cellWidth * (column) + this.offsetLeft, this.padding + this.cellHeight * (row) + this.offsetTop, this.cellHeight, this.cellHeight);
				}
			}
		}
	}
	isRoad(point) {
		var result = (this.road[point.row - 1][point.column - 1].type == "road");
		return result;
	}
}
class SquareGrid extends Grid {
	constructor(x, y, w, columns, padding, showGrid) {
		super(x, y, w, w, columns, columns, padding, showGrid);
	}
}
class PurchaseManager {
	constructor() {
		this.BasicCost = 100;
		this.SniperCost = 200;
		this.SlowCost = 250;
		this.MachineGunCost = 250;
		this.LightningCost = 300;
		this.BasicPurchases = 0;
		this.SniperPurchases = 0;
		this.SlowPurchases = 0;
		this.MachineGunPurchases = 0;
		this.LightningPurchases = 0;
	}
	getBasicCost(game) {
		return this.BasicCost + (this.BasicPurchases * 10 * game.wave);
	}
	getSniperCost(game) {
		return this.SniperCost + (this.SniperPurchases * 20 * game.wave);
	}
	getSlowCost(game) {
		return this.SlowCost + (this.SlowPurchases * 20 * game.wave);
	}
	getMachineGunCost(game) {
		return this.MachineGunCost + (this.MachineGunPurchases * 30 * game.wave);
	}
	getLightningCost(game) {
		return this.LightningCost + (this.LightningPurchases * 50 * game.wave);
	}
}
class Button {
	constructor(x, y, w, h, action) {
		this.width = w;
		this.height = h;
		this.position = {
			x: x,
			y: y
		};
		this.action = action;
		this.numberOfLines = 0;
		this.line1Text = "";
		this.line2Text = "";
		this.icon = null;
	}
	render(context) {
		if (this.numberOfLines == 2) {
			context.beginPath();
			context.lineWidth = 1;
			context.fillStyle = "black";
			context.font = "16px Arial";
			context.strokeStyle = "black";
			context.strokeRect(this.position.x, this.position.y, this.width, this.height);
			context.closePath();
			context.fillText(this.line1Text, this.position.x + 15 | 0, this.position.y + 15 | 0);
			context.fillText(this.line2Text, this.position.x + 15 | 0, this.position.y + this.height - 10 | 0);
		} else if (this.numberOfLines == 0 && this.icon != null) {
			context.drawImage(this.icon, this.position.x, this.position.y, this.width, this.height);
		}
	}
	isButtonClicked(x, y, gameGrid) {
		return (x > this.position.x && x < this.position.x + this.width && y > this.position.y && y < this.position.y + this.height);
	}
	click() {
		this.action();
	}
}

function pointInCircle(x, y, cx, cy, radius) {
	var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
	return distancesquared <= radius * radius;
}