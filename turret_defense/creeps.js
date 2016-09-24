'use strict';
class BasicCreep {
	constructor(grid, game, image) {
		this.grid = grid;
		this.active = false;
		this.position = {
			x: 0,
			y: 0
		};
		this.targetPoint = 2;
		this.baseHealth = 100;
		this.maxHealth = this.baseHealth + ((game.wave - 1) * 10);
		this.health = this.maxHealth;
		this.baseSpeed = 1;
		this.speed = this.baseSpeed + Number(Math.floor(game.wave / 10));
		this.name = "Basic Creep";
		this.reward = 25;
		this.image = image;
		this.statuses = [];
		this.rotations = 0;
		this.distance = 0;
		for (var column = 0; column < this.grid.columns; column++) {
			for (var row = 0; row < this.grid.rows; row++) {
				if (this.grid.road[row][column].type == "road") {
					if (this.grid.road[row][column].order == 1) {
						this.position.x = this.grid.padding + this.grid.cellHeight * (column - 0.5) + this.grid.offsetLeft;
						this.position.y = this.grid.padding + this.grid.cellHeight * (row - 0.5) + this.grid.offsetTop;
						break;
					}
				}
			}
		}
	}
	update(game) {
		if (this.targetPoint == this.grid.lastSquare) {
			var index = game.creeps.indexOf(this);
			game.creeps.splice(index, 1);
			game.lives--;
		} else if (this.health <= 0) {
			var index = game.creeps.indexOf(this);
			game.creeps.splice(index, 1);
			game.gold += this.reward;
		} else {
			var slowed = false;
			var slowIndex = 0;
			for (var i = 0; i < this.statuses.length; i++) {
				if (this.statuses[i].id == "Slow") {
					slowed = true;
					slowIndex = i;
					break;
				}
			}
			if (slowed) {
				this.speed = ((this.baseSpeed + Number(Math.floor(game.wave / 10))) * 0.5) * game.speed;
				if ((Date.now() - this.statuses[i].date) / 1000 > 3) {
					this.statuses.splice(slowIndex, 1);
				}
			} else {
				this.speed = (this.baseSpeed + Number(Math.floor(game.wave / 10))) * game.speed;
			}
			var targetColumn = 0;
			var targetRow = 0;
			for (var column = 0; column < this.grid.columns; column++) {
				for (var row = 0; row < this.grid.rows; row++) {
					if (this.grid.road[row][column].type == "road") {
						if (this.grid.road[row][column].order == this.targetPoint) {
							targetColumn = column + 1;
							targetRow = row + 1;
							break;
						}
					}
				}
			}
			var targetSpaceX = this.grid.padding + this.grid.cellHeight * (targetColumn - 0.5) + this.grid.offsetLeft;
			var targetSpaceY = this.grid.padding + this.grid.cellHeight * (targetRow - 0.5) + this.grid.offsetTop;
			var targetX = targetSpaceX - this.position.x;
			var targetY = targetSpaceY - this.position.y;
			this.distance = Math.sqrt((targetX * targetX) + (targetY * targetY));
			var vx = (targetX / this.distance) * this.speed;
			var vy = (targetY / this.distance) * this.speed;
			this.position.x += vx;
			this.position.y += vy;
			this.rotations = Math.atan2(-targetY, -targetX);
			if (!this.active) {
				var index = game.creeps.indexOf(this, 0);
				this.position.y += (this.grid.cellHeight * 1.5 * index);
				this.active = true;
			}
			if (this.position.x <= targetSpaceX + this.speed && this.position.x >= targetSpaceX - this.speed && this.position.y <= targetSpaceY + this.speed && this.position.y >= targetSpaceY - this.speed && this.targetPoint <= this.grid.lastSquare) {
				this.targetPoint++;
			}
		}
	}
	render(context) {
		if (this.position.x + ((this.grid.cellHeight - 6) / 2) >= this.grid.offsetLeft + this.grid.padding && this.position.x + ((this.grid.cellHeight - 6) / 2) <= this.grid.offsetLeft + this.grid.padding + this.grid.height && this.position.y + ((this.grid.cellHeight - 5) / 2) >= this.grid.offsetTop + this.grid.padding && this.position.y + ((this.grid.cellHeight - 5) / 2) <= this.grid.offsetTop + this.grid.padding + this.grid.height) {
			context.translate(this.position.x, this.position.y);
			context.rotate(this.rotations);
			context.translate(-this.position.x, -this.position.y);
			context.drawImage(this.image, this.position.x - ((this.grid.cellHeight - 6) / 2), this.position.y - ((this.grid.cellHeight - 5) / 2), this.grid.cellHeight - 5, this.grid.cellHeight - 5);
			context.setTransform(1, 0, 0, 1, 0, 0);
			context.beginPath();
			context.strokeStyle = "red";
			context.fillStyle = "red";
			context.rect(this.position.x - (this.grid.cellHeight - 6) / 2, this.position.y - ((this.grid.cellHeight - 5) / 2) - 12, (this.grid.cellHeight - 6) * (this.health / this.maxHealth), 8);
			context.stroke();
			context.fill();
			context.closePath();
			var slowed = false;
			for (var i = 0; i < this.statuses.length; i++) {
				if (this.statuses[i].id == "Slow") {
					slowed = true;
					break;
				}
			}
		}
	}
}
class TankCreep extends BasicCreep {
	constructor(grid, game, image) {
		super(grid, game, image);
		this.baseHealth = 250;
		this.maxHealth = this.baseHealth + ((game.wave - 1) * 10);
		this.health = this.maxHealth;
		this.baseSpeed = 0.8;
		this.speed = this.baseSpeed + Number(Math.floor(game.wave / 10));
		this.name = "Tank Creep";
		this.reward = 75;
	}
}
class QuickCreep extends BasicCreep {
	constructor(grid, game, image, shadowImage) {
		super(grid, game, image);
		this.baseHealth = 50;
		this.maxHealth = this.baseHealth + ((game.wave - 1) * 10);
		this.health = this.maxHealth;
		this.baseSpeed = 1.5;
		this.speed = this.baseSpeed + Number(Math.floor(game.wave / 10));
		this.name = "Quick Creep";
		this.reward = 50;
		this.shadow = shadowImage;
	}
	render(context) {
		if (this.position.x + ((this.grid.cellHeight - 6) / 2) >= this.grid.offsetLeft + this.grid.padding && this.position.x + ((this.grid.cellHeight - 6) / 2) <= this.grid.offsetLeft + this.grid.padding + this.grid.height && this.position.y + ((this.grid.cellHeight - 5) / 2) >= this.grid.offsetTop + this.grid.padding && this.position.y + ((this.grid.cellHeight - 5) / 2) <= this.grid.offsetTop + this.grid.padding + this.grid.height) {
			context.translate(this.position.x + 15, this.position.y + 15);
			context.rotate(this.rotations);
			context.translate(-(this.position.x + 15), -(this.position.y + 15));
			context.drawImage(this.shadow, this.position.x - ((this.grid.cellHeight - 6) / 2) + 10, this.position.y - ((this.grid.cellHeight - 5) / 2) + 10, this.grid.cellHeight - 5, this.grid.cellHeight - 5);
			context.setTransform(1, 0, 0, 1, 0, 0);
			context.translate(this.position.x, this.position.y);
			context.rotate(this.rotations);
			context.translate(-this.position.x, -this.position.y);
			context.drawImage(this.image, this.position.x - ((this.grid.cellHeight - 6) / 2), this.position.y - ((this.grid.cellHeight - 5) / 2), this.grid.cellHeight - 5, this.grid.cellHeight - 5);
			context.setTransform(1, 0, 0, 1, 0, 0);
			context.beginPath();
			context.strokeStyle = "red";
			context.fillStyle = "red";
			context.rect(this.position.x - (this.grid.cellHeight - 6) / 2, this.position.y - ((this.grid.cellHeight - 5) / 2) - 12, (this.grid.cellHeight - 6) * (this.health / this.maxHealth), 8);
			context.stroke();
			context.fill();
			context.closePath();
			var slowed = false;
			for (var i = 0; i < this.statuses.length; i++) {
				if (this.statuses[i].id == "Slow") {
					slowed = true;
					break;
				}
			}
		}
	}
}