'use strict';
class BasicBullet {
	constructor(startX, startY, target, parent, image, context) {
		this.parent = parent;
		this.target = target;
		this.context = context;
		this.damage = 50;
		this.position = {
			x: startX,
			y: startY
		};
		this.size = {
			width: 50,
			height: 50
		};
		this.bulletImage = image;
		this.baseSpeed = 5;
		this.speed = this.baseSpeed;
		this.rotations = 0;
		this.active = true;
		this.distance = 0;
	}
	update(game) {
		if (this.target.health > 0) {
			var targetX = this.target.position.x - this.position.x;
			var targetY = this.target.position.y - this.position.y;
			this.distance = Math.sqrt((targetX * targetX) + (targetY * targetY));
			this.speed = this.baseSpeed * game.speed;
			var vx = (targetX / this.distance) * this.speed;
			var vy = (targetY / this.distance) * this.speed;
			this.position.x += vx;
			this.position.y += vy;
			if (this.position.x <= this.target.position.x + (this.size.height / 4) && this.position.x >= this.target.position.x - (this.size.height / 4) && this.position.y <= this.target.position.y  + (this.size.width / 4) && this.position.y >= this.target.position.y  - (this.size.width / 4)) {
				this.active = false;
				this.target.health -= this.damage;
				this.render();
				var i = this.parent.missiles.indexOf(this);
				this.parent.missiles.splice(i, 1);
			}
		} else {
			this.render();
			var i = this.parent.missiles.indexOf(this);
			this.parent.missiles.splice(i, 1);
		}
	}
	render() {
		this.context.drawImage(this.bulletImage, this.position.x - (this.size.height / 2), this.position.y - (this.size.width / 2), this.size.width, this.size.height);
	}
}
class SniperBullet extends BasicBullet {
	constructor(startX, startY, target, parent, image, context) {
		super(startX, startY, target, parent, image, context);
		this.damage = 100;
		this.baseSpeed = 10;
	}
}
// class SlowBullet extends BasicBullet {
// 	constructor(startX, startY, target, parent, image, context) {
// 		super(startX, startY, target, parent, image, context);
// 		this.damage = 25;
// 		this.baseSpeed = 5;
// 	}
// 	update(game) {
// 		if (this.target.health > 0) {
// 			var targetX = this.target.position.x - this.position.x;
// 			var targetY = this.target.position.y - this.position.y;
// 			this.speed = this.baseSpeed * game.speed;
// 			this.rotations = Math.atan2(targetY, targetX);
// 			var vx = this.speed * (90 - Math.abs(this.rotations * 180 / Math.PI)) / 90;
// 			var vy;
// 			if (this.rotations < 0) {
// 				vy = -this.speed + Math.abs(vx);
// 			}
// 			else {
// 				vy = this.speed - Math.abs(vx);
// 			}
// 			this.position.x += vx;
// 			this.position.y += vy;
// 			if (this.position.x <= this.target.position.x + this.size.width && this.position.x >= this.target.position.x - this.size.width && this.position.y <= this.target.position.y + this.size.height && this.position.y >= this.target.position.y - this.size.height) {
// 				this.active = false;
// 				this.target.health -= this.damage;
// 				var found = false;
// 				for (var i = 0; i < this.target.statuses.length; i++) {
// 					if (this.target.statuses[i].id == 'Slow') {
// 						found = true;
// 						this.target.statuses[i].date = Date.now();
// 						break;
// 					}
// 				}
// 				if (!found) {
// 					this.target.statuses.push({
// 						id: "Slow",
// 						date: Date.now()
// 					});
// 				}
// 				var i = this.parent.missiles.indexOf(this);
// 				this.parent.missiles.splice(i, 1);
// 			}
// 		}
// 		else {
// 			var i = this.parent.missiles.indexOf(this);
// 			this.parent.missiles.splice(i, 1);
// 		}
// 	}
// }
// class MachineGunBullet extends BasicBullet {
// 	constructor(startX, startY, target, parent, image, context) {
// 		super(startX, startY, target, parent, image, context);
// 		this.damage = 20;
// 		this.baseSpeed = 10;
// 	}
// }
class Lightning {
	constructor() {}
	static strike(context, x1, y1, x2, y2, color1, color2, drawOrbs) {
		var x = x2 - x1;
		var y = y2 - y1;
		var segments = 10;
		var distance = Math.sqrt(x * x + y * y);
		var width = distance / segments;
		var prevX = x1;
		var prevY = y1;
		if (drawOrbs) {
			// Draw point
			context.strokeStyle = color1;
			context.fillStyle = color1;
			context.lineWidth = 2;
			context.beginPath();
			context.arc(x1, y1, 4 + (Math.random() * 4), 0, 2 * Math.PI, false);
			context.fill();
		}
		for (var i = 0; i <= segments; i++) {
			var magnitude = (width * i) / distance;
			var x3 = magnitude * x2 + (1 - magnitude) * x1;
			var y3 = magnitude * y2 + (1 - magnitude) * y1;
			if (i !== 0 && i !== segments) {
				x3 += (Math.random() * width) - (width / 2);
				y3 += (Math.random() * width) - (width / 2);
			}
			// Draw line
			context.strokeStyle = color1;
			context.lineWidth = 2;
			context.beginPath();
			context.moveTo(prevX, prevY);
			context.lineTo(x3, y3);
			context.closePath();
			context.stroke();
			// Draw point
			context.strokeStyle = color1;
			context.fillStyle = color1;
			context.beginPath();
			context.arc(x3, y3, 2, 0, 2 * Math.PI, false);
			context.fill();
			// Draw line
			context.strokeStyle = color2;
			context.lineWidth = 1;
			context.beginPath();
			context.moveTo(prevX, prevY);
			context.lineTo(x3, y3);
			context.closePath();
			context.stroke();
			// Draw point
			context.strokeStyle = color2;
			context.fillStyle = color2;
			context.beginPath();
			context.arc(x3, y3, 1, 0, 2 * Math.PI, false);
			context.fill();
			prevX = x3;
			prevY = y3;
		}
		if (drawOrbs) {
			// Draw point
			context.strokeStyle = color2;
			context.fillStyle = color2;
			context.lineWidth = 2;
			context.beginPath();
			context.arc(x1, y1, 8 + (Math.random() * 4), 0, 2 * Math.PI, false);
			context.fill();
		}
	}
}