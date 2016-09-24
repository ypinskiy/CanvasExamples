'use strict';
class BasicTurret {
	constructor(baseImage, topImage, bulletImage, grid, context) {
		this.name = "Basic";
		this.grid = grid;
		this.context = context;
		this.atkSpeed = 1;
		this.radius = 2;
		this.rotations = 0;
		this.point = {
			row: 5,
			column: 5
		};
		this.position = {
			x: 0,
			y: 0
		};
		this.isMoving = false;
		this.invalidSquare = false;
		this.showRadius = false;
		this.missiles = [];
		this.lastFired = Date.now();
		this.turretBaseImage = baseImage;
		this.turretTopImage = topImage;
		this.bulletImage = bulletImage;
	}
	update(game) {
		this.position.x = this.grid.padding + this.grid.cellHeight * (this.point.column - 0.5) + this.grid.offsetLeft;
		this.position.y = this.grid.padding + this.grid.cellHeight * (this.point.row - 0.5) + this.grid.offsetTop;
		var newDate = Date.now();
		var target = null;
		var potentialTargets = [];
		for (var i = 0; i < game.creeps.length; i++) {
			if (pointInCircle(game.creeps[i].position.x, game.creeps[i].position.y, this.position.x, this.position.y, this.grid.cellHeight * (this.radius + 0.5)) && game.creeps[i].targetPoint > 1) {
				var distance = Math.sqrt((this.position.x - game.creeps[i].position.x) * (this.position.x - game.creeps[i].position.x) + (this.position.y - game.creeps[i].position.y) * (this.position.y - game.creeps[i].position.y));
				potentialTargets.push({
					creep: game.creeps[i],
					distance: distance
				});
				break;
			}
		}
		potentialTargets.sort(function(a, b) {
			return parseInt(a.distance) - parseInt(b.distance);
		});
		if (potentialTargets.length > 0) {
			target = potentialTargets[0].creep;
			this.rotations = Math.atan2(target.position.y - this.position.y, target.position.x - this.position.x);
		}
		if ((newDate - this.lastFired) / 1000 > (1 * this.atkSpeed) / game.speed && this.missiles.length < 5 && !this.isMoving && target != null) {
			var startPointX = this.position.x + (this.grid.cellHeight * 0.5) * Math.cos(this.rotations);
			var startPointY = this.position.y + (this.grid.cellWidth * 0.5) * Math.sin(this.rotations);
			var missile = new BasicBullet(startPointX, startPointY, target, this, this.bulletImage, this.context);
			this.missiles.push(missile);
			this.lastFired = Date.now();
		}
	}
	render() {
		if (this.showRadius) {
			this.context.beginPath();
			this.context.lineWidth = 1;
			this.context.strokeStyle = 'red';
			this.context.arc(this.position.x, this.position.y, this.grid.cellHeight * (this.radius + 0.5), 0, 2 * Math.PI);
			this.context.stroke();
			this.context.closePath();
		}
		if (this.isMoving) {
			this.context.globalAlpha = 0.3;
		}
		if (this.invalidSquare) {
			this.context.beginPath();
			this.context.strokeStyle = "red"
			this.context.fillStyle = "red";
			this.context.rect(this.grid.padding + this.grid.cellHeight * (this.point.column - 1) + this.grid.offsetLeft + 2.5, this.grid.padding + this.grid.cellHeight * (this.point.row - 1) + this.grid.offsetTop + 2.5, this.grid.cellHeight - 5, this.grid.cellHeight - 5);
			this.context.fill();
			this.context.closePath();
		}
		this.context.drawImage(this.turretBaseImage, this.grid.padding + this.grid.cellHeight * (this.point.column - 1) + this.grid.offsetLeft + 2.5, this.grid.padding + this.grid.cellHeight * (this.point.row - 1) + this.grid.offsetTop + 2.5, this.grid.cellHeight - 5, this.grid.cellHeight - 5);
		if (!this.isMoving) {
			this.context.translate(this.position.x, this.position.y);
			this.context.rotate(this.rotations + (0.5 * Math.PI));
			this.context.translate(-this.position.x, -this.position.y);
			this.context.drawImage(this.turretTopImage, this.grid.padding + this.grid.cellHeight * (this.point.column - 1) + this.grid.offsetLeft + 2.5, this.grid.padding + this.grid.cellHeight * (this.point.row - 1) + this.grid.offsetTop + 2.5, this.grid.cellHeight - 5, this.grid.cellHeight - 5);
			this.context.setTransform(1, 0, 0, 1, 0, 0);
		}
		this.context.globalAlpha = 1;
	}
}
class SniperTurret extends BasicTurret {
	constructor(baseImage, topImage, bulletImage, grid, context) {
		super(baseImage, topImage, bulletImage, grid, context);
		this.name = "Sniper";
		this.atkSpeed = 2;
		this.radius = 5;
	}
	update(game) {
		this.position.x = this.grid.padding + this.grid.cellHeight * (this.point.column - 0.5) + this.grid.offsetLeft;
		this.position.y = this.grid.padding + this.grid.cellHeight * (this.point.row - 0.5) + this.grid.offsetTop;
		var newDate = Date.now();
		var target = null;
		var potentialTargets = [];
		for (var i = 0; i < game.creeps.length; i++) {
			if (pointInCircle(game.creeps[i].position.x, game.creeps[i].position.y, this.position.x, this.position.y, this.grid.cellHeight * (this.radius + 0.5)) && game.creeps[i].targetPoint > 1) {
				var distance = Math.sqrt((this.position.x - game.creeps[i].position.x) * (this.position.x - game.creeps[i].position.x) + (this.position.y - game.creeps[i].position.y) * (this.position.y - game.creeps[i].position.y));
				potentialTargets.push({
					creep: game.creeps[i],
					distance: distance
				});
				break;
			}
		}
		potentialTargets.sort(function(a, b) {
			return parseInt(a.distance) - parseInt(b.distance);
		});
		if (potentialTargets.length > 0) {
			target = potentialTargets[0].creep;
			this.rotations = Math.atan2(target.position.y - this.position.y, target.position.x - this.position.x);
		}
		if ((newDate - this.lastFired) / 1000 > (1 * this.atkSpeed) / game.speed && this.missiles.length < 5 && !this.isMoving && target != null) {
			var startPointX = this.position.x + (this.grid.cellHeight * 0.5) * Math.cos(this.rotations);
			var startPointY = this.position.y + (this.grid.cellWidth * 0.5) * Math.sin(this.rotations);
			var missile = new SniperBullet(startPointX, startPointY, target, this, this.bulletImage, this.context);
			this.missiles.push(missile);
			this.lastFired = Date.now();
		}
	}
}
// class SlowTurret extends BasicTurret {
// 	constructor(image, grid, context) {
// 		super(image, grid, context);
// 		this.name = "Slow";
// 		this.atkSpeed = 2;
// 		this.radius = 3;
// 	}
// 	update(game) {
// 		this.position.x = this.grid.padding + this.grid.cellHeight * (this.point.column - 0.5) + this.grid.offsetLeft;
// 		this.position.y = this.grid.padding + this.grid.cellHeight * (this.point.row - 0.5) + this.grid.offsetTop;
// 		var newDate = Date.now();
// 		var target = null;
// 		var potentialTargets = [];
// 		for (var i = 0; i < game.creeps.length; i++) {
// 			if (pointInCircle(game.creeps[i].position.x, game.creeps[i].position.y, this.position.x, this.position.y, this.grid.cellHeight * (this.radius + 0.5)) && game.creeps[i].targetPoint > 1) {
// 				var distance = Math.sqrt((this.position.x - game.creeps[i].position.x) * (this.position.x - game.creeps[i].position.x) + (this.position.y - game.creeps[i].position.y) * (this.position.y - game.creeps[i].position.y));
// 				potentialTargets.push({
// 					creep: game.creeps[i],
// 					distance: distance
// 				});
// 				break;
// 			}
// 		}
// 		potentialTargets.sort(function(a, b) {
// 			return parseInt(a.distance) - parseInt(b.distance);
// 		});
// 		if (potentialTargets.length > 0) {
// 			target = potentialTargets[0].creep;
// 		}
// 		if ((newDate - this.lastFired) / 1000 > (1 * this.atkSpeed) / game.speed && this.missiles.length < 5 && !this.isMoving && target != null) {
// 			var missile = new SlowBullet(this.position.x, this.position.y, target, this, blueMissile, this.context);
// 			this.missiles.push(missile);
// 			this.lastFired = Date.now();
// 		}
// 	}
// }
class MachineGunTurret extends BasicTurret {
	constructor(baseImage, topImage, bulletImage, grid, context) {
		super(baseImage, topImage, bulletImage, grid, context);
		this.name = "Machine";
		this.atkSpeed = 0.3;
		this.radius = 2;
	}
	update(game) {
		this.position.x = this.grid.padding + this.grid.cellHeight * (this.point.column - 0.5) + this.grid.offsetLeft;
		this.position.y = this.grid.padding + this.grid.cellHeight * (this.point.row - 0.5) + this.grid.offsetTop;
		var newDate = Date.now();
		var target = null;
		var potentialTargets = [];
		for (var i = 0; i < game.creeps.length; i++) {
			if (pointInCircle(game.creeps[i].position.x, game.creeps[i].position.y, this.position.x, this.position.y, this.grid.cellHeight * (this.radius + 0.5)) && game.creeps[i].targetPoint > 1) {
				var distance = Math.sqrt((this.position.x - game.creeps[i].position.x) * (this.position.x - game.creeps[i].position.x) + (this.position.y - game.creeps[i].position.y) * (this.position.y - game.creeps[i].position.y));
				potentialTargets.push({
					creep: game.creeps[i],
					distance: distance
				});
				break;
			}
		}
		potentialTargets.sort(function(a, b) {
			return parseInt(a.distance) - parseInt(b.distance);
		});
		if (potentialTargets.length > 0) {
			target = potentialTargets[0].creep;
			this.rotations = Math.atan2(target.position.y - this.position.y, target.position.x - this.position.x);
		}
		if ((newDate - this.lastFired) / 1000 > (1 * this.atkSpeed) / game.speed && this.missiles.length < 5 && !this.isMoving && target != null) {
			var startPointX = this.position.x + (this.grid.cellHeight * 0.5) * Math.cos(this.rotations);
			var startPointY = this.position.y + (this.grid.cellWidth * 0.5) * Math.sin(this.rotations);
			var missile = new BasicBullet(startPointX, startPointY, target, this, this.bulletImage, this.context);
			this.missiles.push(missile);
			this.lastFired = Date.now();
		}
	}
}
class LightningTurret {
	constructor(baseImage, topImage, grid, context) {
		this.name = "Lightning";
		this.grid = grid;
		this.context = context;
		this.radius = 3;
		this.point = {
			row: 5,
			column: 5
		};
		this.position = {
			x: 0,
			y: 0
		};
		this.isMoving = false;
		this.invalidSquare = false;
		this.baseImage = baseImage;
		this.topImage = topImage;
		this.target = null;
		this.rotations = 0;
	}
	update(game) {
		this.position.x = this.grid.padding + this.grid.cellHeight * (this.point.column - 0.5) + this.grid.offsetLeft;
		this.position.y = this.grid.padding + this.grid.cellHeight * (this.point.row - 0.5) + this.grid.offsetTop;
		this.target = null;
		for (var i = 0; i < game.creeps.length; i++) {
			if (pointInCircle(game.creeps[i].position.x, game.creeps[i].position.y, this.position.x, this.position.y, this.grid.cellHeight * (this.radius + 0.5)) && game.creeps[i].targetPoint > 1) {
				this.target = game.creeps[i];
				if (!this.isMoving && this.target != null) {
					this.target.health -= 0.25 * game.speed;
					this.rotations += (Math.PI / 40);
				}
			}
		}
	}
	render() {
		if (this.showRadius) {
			this.context.beginPath();
			this.context.lineWidth = 1;
			this.context.strokeStyle = 'red';
			this.context.arc(this.position.x, this.position.y, this.grid.cellHeight * (this.radius + 0.5), 0, 2 * Math.PI);
			this.context.stroke();
			this.context.closePath();
		}
		if (this.isMoving) {
			this.context.globalAlpha = 0.3;
		}
		if (this.invalidSquare) {
			this.context.beginPath();
			this.context.strokeStyle = "red"
			this.context.fillStyle = "red";
			this.context.rect(this.grid.padding + this.grid.cellHeight * (this.point.column - 1) + this.grid.offsetLeft + 2.5, this.grid.padding + this.grid.cellHeight * (this.point.row - 1) + this.grid.offsetTop + 2.5, this.grid.cellHeight - 5, this.grid.cellHeight - 5);
			this.context.fill();
			this.context.closePath();
		}
		this.context.drawImage(this.baseImage, this.grid.padding + this.grid.cellHeight * (this.point.column - 1) + this.grid.offsetLeft + 2.5, this.grid.padding + this.grid.cellHeight * (this.point.row - 1) + this.grid.offsetTop + 2.5, this.grid.cellHeight - 5, this.grid.cellHeight - 5);
		this.context.globalAlpha = 1;
		if (!this.isMoving) {
			this.context.translate(this.position.x, this.position.y);
			this.context.rotate(this.rotations + (0.5 * Math.PI));
			this.context.translate(-this.position.x, -this.position.y);
			this.context.drawImage(this.topImage, this.grid.padding + this.grid.cellHeight * (this.point.column - 1) + this.grid.offsetLeft + 2.5, this.grid.padding + this.grid.cellHeight * (this.point.row - 1) + this.grid.offsetTop + 12, this.grid.cellHeight - 5, (this.grid.cellHeight - 5) / 2);
			this.context.setTransform(1, 0, 0, 1, 0, 0);
		}
		for (var i = 0; i < game.creeps.length; i++) {
			if (pointInCircle(game.creeps[i].position.x, game.creeps[i].position.y, this.position.x, this.position.y, this.grid.cellHeight * (this.radius + 0.5)) && game.creeps[i].targetPoint > 1) {
				this.target = game.creeps[i];
				if (!this.isMoving && this.target != null) {
					Lightning.strike(this.context, this.position.x, this.position.y, this.target.position.x, this.target.position.y, "#557788", "#7799aa", false);
					Lightning.strike(this.context, this.position.x, this.position.y, this.target.position.x, this.target.position.y, "#cfefff", "#ffffff", true);
				}
			}
		}
	}
}