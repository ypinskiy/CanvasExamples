var foregroundCanvas = document.getElementById("foreground");
var backgroundCanvas = document.getElementById("background");
var foregroundContext = foregroundCanvas.getContext("2d");
var backgroundContext = backgroundCanvas.getContext("2d");
var height = 800;
var width = 1200;

foregroundCanvas.width = width * window.devicePixelRatio;
foregroundCanvas.height = height * window.devicePixelRatio;
backgroundCanvas.width = width * window.devicePixelRatio;
backgroundCanvas.height = height * window.devicePixelRatio;
foregroundCanvas.style.width = width + 'px';
foregroundCanvas.style.height = height + 'px';
backgroundCanvas.style.width = width + 'px';
backgroundCanvas.style.height = height + 'px';
foregroundContext.scale(window.devicePixelRatio, window.devicePixelRatio);
backgroundContext.scale(window.devicePixelRatio, window.devicePixelRatio);

foregroundCanvas.addEventListener("mousemove", mouseMoveHandler, false);
foregroundCanvas.addEventListener("mousedown", mouseClickHandler, false);

var game = {
	gold: 250,
	turrets: [],
	wave: 0,
	beginWave: false,
	lives: 5,
	creeps: [],
	isSelling: false,
	speed: 1
};

var newRoad = [
				[{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null }],
				[{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: DirtBottomRightRoad, order: null },{ type: "dirt", image: DirtBottomRoad, order: null },{ type: "dirt", image: DirtBottomRoad, order: null },{ type: "dirt", image: DirtBottomRoad, order: null },{ type: "dirt", image: DirtBottomRoad, order: null },{ type: "dirt", image: DirtBottomLeftRoad, order: null },{ type: "dirt", image: DirtBottomRightRoad, order: null },{ type: "dirt", image: DirtBottomRoad, order: null },{ type: "dirt", image: DirtBottomRoad, order: null },{ type: "dirt", image: DirtBottomRoad, order: null },{ type: "dirt", image: DirtBottomRoad, order: null },{ type: "dirt", image: DirtBottomLeftRoad, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null }],
				[{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 13 },{ type: "road", image: Road, order: 14 },{ type: "road", image: Road, order: 15 },{ type: "road", image: Road, order: 16 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: null },{ type: "road", image: Road, order: 39 },{ type: "road", image: Road, order: 40 },{ type: "road", image: Road, order: 41 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null }],
				[{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 12 },{ type: "dirt", image: DirtTopLeftCurveRoad, order: null },{ type: "dirt", image: DirtTopRightCurveRoad, order: null },{ type: "road", image: Road, order: 17 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 38 },{ type: "dirt", image: DirtTopLeftCurveRoad, order: null },{ type: "dirt", image: DirtTopRightCurveRoad, order: null },{ type: "road", image: Road, order: 42 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null }],
				[{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 11 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 18 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 37 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 43 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null }],
				[{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 10 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 19 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 36 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 44 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null }],
				[{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 9 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 20 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 35 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 45 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null }],
				[{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 8 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 21 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 34 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 46 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null }],
				[{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 7 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 22 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 33 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 47 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null }],
				[{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 6 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 23 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 32 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 48 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null }],
				[{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 5 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 24 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 31 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 49 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null }],
				[{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 4 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 25 },{ type: "dirt", image: DirtBottomLeftCurveRoad, order: null },{ type: "dirt", image: DirtBottomRightCurveRoad, order: null },{ type: "road", image: Road, order: 30 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 50 },{ type: "dirt", image: DirtBottomLeftCurveRoad, order: null },{ type: "dirt", image: DirtBottomRoad, order: null },{ type: "dirt", image: DirtBottomRoad, order: null }],
				[{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 3 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 26 },{ type: "road", image: Road, order: 27 },{ type: "road", image: Road, order: 28 },{ type: "road", image: Road, order: 29 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: null },{ type: "road", image: Road, order: 51 },{ type: "road", image: Road, order: 52 },{ type: "road", image: Road, order: 53 }],
				[{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 2 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: DirtTopRightRoad, order: null },{ type: "dirt", image: DirtTopRoad, order: null },{ type: "dirt", image: DirtTopRoad, order: null },{ type: "dirt", image: DirtTopRoad, order: null },{ type: "dirt", image: DirtTopRoad, order: null },{ type: "dirt", image: DirtTopLeftRoad, order: null },{ type: "dirt", image: DirtTopRightRoad, order: null },{ type: "dirt", image: DirtTopRoad, order: null },{ type: "dirt", image: DirtTopRoad, order: null },{ type: "dirt", image: DirtTopRoad, order: null },{ type: "dirt", image: DirtTopRoad, order: null }],
				[{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: DirtRightRoad, order: null },{ type: "road", image: Road, order: 1 },{ type: "dirt", image: DirtLeftRoad, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null },{ type: "dirt", image: Dirt, order: null }]
				];
var gameGrid = new SquareGrid(220, 50, 700, 15, 0, false);
gameGrid.road = newRoad;
gameGrid.lastSquare = 53;
Dirt.onload = function() {
	backgroundContext.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
	gameGrid.fillGrid(backgroundContext);
	gameGrid.render(backgroundContext);
};
Road.onload = function() {
	backgroundContext.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
	gameGrid.fillGrid(backgroundContext);
	gameGrid.render(backgroundContext);
};
var lastMousePos = {
	x: 0,
	y: 0
};

function BuyBasicTower() {
	var newTurret = new BasicTurret(basicBaseImage, basicTopImage, basicBulletImage, gameGrid, foregroundContext);
	newTurret.point = {
		row: 0,
		column: 0
	};
	newTurret.showRadius = true;
	newTurret.isMoving = true;
	game.turrets.push(newTurret);
	game.gold -= purchManager.getBasicCost(game);
	purchManager.BasicPurchases++;
}

function BuySniperTower() {
	var newTurret = new SniperTurret(sniperBaseImage, sniperTopImage, sniperBulletImage, gameGrid, foregroundContext);
	newTurret.point = {
		row: 0,
		column: 0
	};
	newTurret.showRadius = true;
	newTurret.isMoving = true;
	game.turrets.push(newTurret);
	game.gold -= purchManager.getSniperCost(game);
	purchManager.SniperPurchases++;
}

// function BuySlowTower() {
// 	var newTurret = new SlowTurret(blueTurret, gameGrid, foregroundContext);
// 	newTurret.point = {
// 		row: 0,
// 		column: 0
// 	};
// 	newTurret.showRadius = true;
// 	newTurret.isMoving = true;
// 	game.turrets.push(newTurret);
// 	game.gold -= purchManager.getSlowCost(game);
// 	purchManager.SlowPurchases++;
// }

function BuyMachineGunTower() {
	var newTurret = new MachineGunTurret(machineBaseImage, machineTopImage, machineBulletImage, gameGrid, foregroundContext);
	newTurret.point = {
		row: 0,
		column: 0
	};
	newTurret.showRadius = true;
	newTurret.isMoving = true;
	game.turrets.push(newTurret);
	game.gold -= purchManager.getMachineGunCost(game);
	purchManager.MachineGunPurchases++;
}

function BuyLightningTower() {
	var newTurret = new LightningTurret(lightningBaseImage, lightningTopImage, gameGrid, foregroundContext);
	newTurret.point = {
		row: 0,
		column: 0
	};
	newTurret.showRadius = true;
	newTurret.isMoving = true;
	game.turrets.push(newTurret);
	game.gold -= purchManager.getLightningCost(game);
	purchManager.LightningPurchases++;
}

function SellTower() {
	game.isSelling = !game.isSelling;
}

function SpeedToggle() {
	if (game.speed == 1) {
		game.speed = 2;
		speedButton.icon = speedHighImage;
	}
	else if (game.speed == 2) {
		game.speed = 1;
		speedButton.icon = speedNormalImage;
	}
}

function AddCreeps() {
	if (game.wave == 1) {
		for (var i = 0; i < 3; i++) {
			game.creeps.push(new BasicCreep(gameGrid, game, BasicCreepImage));
		}
	}
	else if (game.wave == 2) {
		for (var i = 0; i < 5; i++) {
			game.creeps.push(new BasicCreep(gameGrid, game, BasicCreepImage));
		}
	}
	else if (game.wave == 3) {
		for (var i = 0; i < 5; i++) {
			game.creeps.push(new BasicCreep(gameGrid, game, BasicCreepImage));
		}
		game.creeps.push(new TankCreep(gameGrid, game, TankCreepImage));
	}
	else if (game.wave == 4) {
		for (var i = 0; i < 5; i++) {
			game.creeps.push(new BasicCreep(gameGrid, game, BasicCreepImage));
		}
		for (var i = 0; i < 3; i++) {
			game.creeps.push(new TankCreep(gameGrid, game, TankCreepImage));
		}
	}
	else if (game.wave == 5) {
		for (var i = 0; i < 5; i++) {
			game.creeps.push(new BasicCreep(gameGrid, game, BasicCreepImage));
		}
		for (var i = 0; i < 3; i++) {
			game.creeps.push(new TankCreep(gameGrid, game, TankCreepImage));
		}
		for (var i = 0; i < 2; i++) {
			game.creeps.push(new QuickCreep(gameGrid, game, QuickCreepImage, QuickCreepShadowImage));
		}
	}
	else {
		for (var i = 0; i < game.wave; i++) {
			game.creeps.push(new BasicCreep(gameGrid, game, BasicCreepImage));
		}
		for (var i = 0; i < Math.floor(game.wave / 2); i++) {
			game.creeps.push(new TankCreep(gameGrid, game, TankCreepImage));
		}
		for (var i = 0; i < Math.floor(game.wave / 2); i++) {
			game.creeps.push(new QuickCreep(gameGrid, game, QuickCreepImage, QuickCreepShadowImage));
		}
	}
}

var purchManager = new PurchaseManager();

var deleteButton = new Button(gameGrid.offsetLeft + gameGrid.padding + gameGrid.height + (gameGrid.cellHeight * 1), gameGrid.offsetTop + (gameGrid.cellHeight * 10), gameGrid.cellHeight + 10, gameGrid.cellHeight, SellTower);
deleteButton.icon = deleteButtonImage;

var speedButton = new Button(gameGrid.offsetLeft + gameGrid.padding + gameGrid.height + (gameGrid.cellHeight * 1), gameGrid.offsetTop + (gameGrid.cellHeight * 11), gameGrid.cellHeight + 10, gameGrid.cellHeight, SpeedToggle);
speedButton.icon = speedNormalImage;

var basicPurchaseButton = new Button(gameGrid.offsetLeft + gameGrid.padding + gameGrid.height + (gameGrid.cellHeight * 1), gameGrid.offsetTop, gameGrid.cellHeight * 2, gameGrid.cellHeight, BuyBasicTower);
basicPurchaseButton.numberOfLines = 2;
basicPurchaseButton.line1Text = "Basic";

var sniperPurchaseButton = new Button(gameGrid.offsetLeft + gameGrid.padding + gameGrid.height + (gameGrid.cellHeight * 1), gameGrid.offsetTop + (gameGrid.cellHeight * 2), gameGrid.cellHeight * 2, gameGrid.cellHeight, BuySniperTower);
sniperPurchaseButton.numberOfLines = 2;
sniperPurchaseButton.line1Text = "Sniper";

// var slowPurchaseButton = new Button(gameGrid.offsetLeft + gameGrid.padding + gameGrid.height + (gameGrid.cellHeight * 1), gameGrid.offsetTop + (gameGrid.cellHeight * 4), gameGrid.cellHeight * 2, gameGrid.cellHeight, BuySlowTower);
// slowPurchaseButton.numberOfLines = 2;
// slowPurchaseButton.line1Text = "Slow";

var machineGunPurchaseButton = new Button(gameGrid.offsetLeft + gameGrid.padding + gameGrid.height + (gameGrid.cellHeight * 1), gameGrid.offsetTop + (gameGrid.cellHeight * 6), gameGrid.cellHeight * 2, gameGrid.cellHeight, BuyMachineGunTower);
machineGunPurchaseButton.numberOfLines = 2;
machineGunPurchaseButton.line1Text = "Machine";

var lightningPurchaseButton = new Button(gameGrid.offsetLeft + gameGrid.padding + gameGrid.height + (gameGrid.cellHeight * 1), gameGrid.offsetTop + (gameGrid.cellHeight * 8), gameGrid.cellHeight * 2, gameGrid.cellHeight, BuyLightningTower);
lightningPurchaseButton.numberOfLines = 2;
lightningPurchaseButton.line1Text = "Lightning";

function draw() {
	foregroundContext.clearRect(0, 0, foregroundCanvas.width, foregroundCanvas.height);
	if (game.lives > 0) {
		if (game.creeps.length == 0 && game.beginWave) {
			game.wave++;
			game.beginWave = false;
			AddCreeps();
		}

		game.creeps.forEach(function(creep) {
			creep.update(game);
			var creepIndex = game.creeps.indexOf(creep, 0);
			if (creepIndex >= 0) {
				creep.render(foregroundContext);
			}
		});

		game.turrets.forEach(function(turret) {
			turret.update(game);
			turret.render();
			if (turret.hasOwnProperty('missiles')) {
				turret.missiles.forEach(function(missile) {
					missile.update(game);
					missile.render();
				});
			}
		});

		drawButtonsAndInfo();

		if (game.isSelling) {
			foregroundContext.drawImage(sellCursor, lastMousePos.x - 10 | 0, lastMousePos.y - 10 | 0, 40, 40);
		}
		else {
			foregroundContext.drawImage(handCursor, lastMousePos.x - 10 | 0, lastMousePos.y - 10 | 0, 30, 30);
		}

		requestAnimationFrame(draw);
	}
	else {
		alert("YOU LOST!");
		document.location.reload(true);
	}
}

draw();

function drawButtonsAndInfo() {
	drawInfo();
	drawBeginWaveButton();
	basicPurchaseButton.line2Text = purchManager.getBasicCost(game) + " Gold";
	basicPurchaseButton.render(foregroundContext);
	sniperPurchaseButton.line2Text = purchManager.getSniperCost(game) + " Gold";
	sniperPurchaseButton.render(foregroundContext);
	// slowPurchaseButton.line2Text = purchManager.getSlowCost(game) + " Gold";
	// slowPurchaseButton.render(foregroundContext);
	lightningPurchaseButton.line2Text = purchManager.getLightningCost(game) + " Gold";
	lightningPurchaseButton.render(foregroundContext);
	machineGunPurchaseButton.line2Text = purchManager.getMachineGunCost(game) + " Gold";
	machineGunPurchaseButton.render(foregroundContext);
	deleteButton.render(foregroundContext);
	foregroundContext.fillText("Sell Tower", gameGrid.offsetLeft + gameGrid.padding + gameGrid.height + (gameGrid.cellHeight * 2) + 15 | 0, gameGrid.offsetTop + (gameGrid.cellHeight * 10) + 30 | 0);
	speedButton.render(foregroundContext);
	if (game.speed == 1) {
		foregroundContext.fillText("Speed: Normal", gameGrid.offsetLeft + gameGrid.padding + gameGrid.height + (gameGrid.cellHeight * 2) + 15 | 0, gameGrid.offsetTop + (gameGrid.cellHeight * 11) + 30 | 0);
	} else {
		foregroundContext.fillText("Speed: High", gameGrid.offsetLeft + gameGrid.padding + gameGrid.height + (gameGrid.cellHeight * 2) + 15 | 0, gameGrid.offsetTop + (gameGrid.cellHeight * 11) + 30 | 0);
	}
}

function drawInfo() {
	foregroundContext.beginPath();
	foregroundContext.fillStyle = "black";
	foregroundContext.font = "32px serif";
	foregroundContext.fillText("Gold: " + game.gold, gameGrid.offsetLeft / 5, gameGrid.offsetTop + (gameGrid.cellHeight * 2));
	foregroundContext.closePath();
	foregroundContext.beginPath();
	foregroundContext.fillStyle = "black";
	foregroundContext.font = "32px serif";
	foregroundContext.fillText("Waves: " + game.wave, gameGrid.offsetLeft / 5, gameGrid.offsetTop + (gameGrid.cellHeight * 4));
	foregroundContext.closePath();
	foregroundContext.beginPath();
	foregroundContext.fillStyle = "black";
	foregroundContext.font = "32px serif";
	foregroundContext.fillText("Lives: " + game.lives, gameGrid.offsetLeft / 5, gameGrid.offsetTop + (gameGrid.cellHeight * 6));
	foregroundContext.closePath();
}

function drawBeginWaveButton() {
	foregroundContext.beginPath();
	foregroundContext.fillStyle = "black";
	foregroundContext.font = "28px serif";
	foregroundContext.fillText("Begin Wave", gameGrid.offsetLeft / 5, gameGrid.offsetTop + (gameGrid.cellHeight * 8));
	foregroundContext.closePath();
	foregroundContext.beginPath();
	foregroundContext.globalAlpha = 1;
	foregroundContext.lineWidth = 1;
	foregroundContext.strokeStyle = "black";
	foregroundContext.rect(gameGrid.offsetLeft / 7, gameGrid.offsetTop + (gameGrid.cellHeight * 7.3), gameGrid.cellHeight * 3.5, gameGrid.cellHeight);
	foregroundContext.stroke();
	foregroundContext.globalAlpha = 0.3;
	if (game.creeps.length > 0) {
		foregroundContext.fillStyle = "red";
	}
	else {
		foregroundContext.fillStyle = "green";
	}
	foregroundContext.fill();
	foregroundContext.globalAlpha = 1;
	foregroundContext.closePath();
}

function mouseMoveHandler(event) {
	lastMousePos = {
		x: event.clientX,
		y: event.clientY
	};
	var point = getMousePointInGrid(event.clientX, event.clientY);
	if (point.column > 0 && point.column < gameGrid.columns + 1 && point.row > 0 && point.row < gameGrid.columns + 1) {
		for (var i = 0; i < game.turrets.length; i++) {
			if (game.turrets[i].isMoving) {
				game.turrets[i].point.row = point.row;
				game.turrets[i].point.column = point.column;
				var otherTurrets = game.turrets.filter(function(turret) {
					return turret.point.row == point.row && turret.point.column == point.column && turret.isMoving == false;
				});
				if (gameGrid.isRoad(point)) {
					game.turrets[i].invalidSquare = true;
				}
				else if (game.turrets.length > 0 && otherTurrets.length != 0) {
					game.turrets[i].invalidSquare = true;
				}
				else {
					game.turrets[i].invalidSquare = false;
				}
			}
			else {
				if (game.turrets[i].point.row == point.row && game.turrets[i].point.column == point.column && game.turrets[i].isMoving == false) {
					game.turrets[i].showRadius = true;
				}
				else {
					game.turrets[i].showRadius = false;
				}
			}
		}
	}
}

function mouseClickHandler(event) {
	var point = getMousePointInGrid(event.clientX, event.clientY);
	if (point.column > 0 && point.column < gameGrid.columns + 1 && point.row > 0 && point.row < gameGrid.columns + 1) {
		for (var i = 0; i < game.turrets.length; i++) {
			if (point.row == game.turrets[i].point.row && point.column == game.turrets[i].point.column && !game.turrets[i].invalidSquare && game.turrets[i].isMoving) {
				game.turrets[i].isMoving = false;
				game.turrets[i].showRadius = false;
			}
			else if (point.row == game.turrets[i].point.row && point.column == game.turrets[i].point.column && game.isSelling) {
				var turretType = game.turrets[i].name;
				var index = game.turrets.indexOf(game.turrets[i], 0);
				game.turrets.splice(index, 1);
				game.isSelling = false;
				switch (turretType) {
					case "Basic":
						game.gold += purchManager.getBasicCost(game) / 2;
						purchManager.BasicPurchases--;
						break;
					case "Sniper":
						game.gold += purchManager.getSniperCost(game) / 2;
						purchManager.SniperPurchases--;
						break;
					case "Slow":
						game.gold += purchManager.getSlowCost(game) / 2;
						purchManager.SlowPurchases--;
						break;
					case "Machine":
						game.gold += purchManager.getMachineGunCost(game) / 2;
						purchManager.MachinePurchases--;
						break;
					case "Lightning":
						game.gold += purchManager.getLightningCost(game) / 2;
						purchManager.LightningPurchases--;
						break;
				}
			}
		}
	}
	else if (event.clientX > gameGrid.offsetLeft / 7 && event.clientX < (gameGrid.offsetLeft / 7) + gameGrid.cellHeight * 3.5 && event.clientY > gameGrid.offsetTop + (gameGrid.cellHeight * 7.3) && event.clientY < gameGrid.offsetTop + (gameGrid.cellHeight * 7.3) + gameGrid.cellHeight) {
		game.beginWave = true;
	}
	else if (basicPurchaseButton.isButtonClicked(event.clientX, event.clientY) && game.gold >= purchManager.getBasicCost(game)) {
		basicPurchaseButton.click();
	}
	else if (sniperPurchaseButton.isButtonClicked(event.clientX, event.clientY) && game.gold >= purchManager.getSniperCost(game)) {
		sniperPurchaseButton.click();
	}
	// else if (slowPurchaseButton.isButtonClicked(event.clientX, event.clientY) && game.gold >= purchManager.getSlowCost(game)) {
	// 	slowPurchaseButton.click();
	// }
	else if (lightningPurchaseButton.isButtonClicked(event.clientX, event.clientY) && game.gold >= purchManager.getLightningCost(game)) {
		lightningPurchaseButton.click();
	}
	else if (machineGunPurchaseButton.isButtonClicked(event.clientX, event.clientY) && game.gold >= purchManager.getMachineGunCost(game)) {
		machineGunPurchaseButton.click();
	}
	else if (deleteButton.isButtonClicked(event.clientX, event.clientY)) {
		deleteButton.click();
	}
	else if (speedButton.isButtonClicked(event.clientX, event.clientY)) {
		speedButton.click();
	}
}

function getMousePointInGrid(eventX, eventY) {
	var topScrollOffset = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
	var leftScrollOffset = (window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0);
	var x = eventX - foregroundCanvas.offsetLeft + leftScrollOffset;
	var y = eventY - foregroundCanvas.offsetTop + topScrollOffset;
	var column = Math.floor((x / gameGrid.cellHeight) - (gameGrid.offsetLeft + gameGrid.padding) / gameGrid.cellHeight) + 1;
	var row = Math.floor((y / gameGrid.cellHeight) - (gameGrid.offsetTop + gameGrid.padding) / gameGrid.cellHeight) + 1;
	return {
		column: column,
		row: row
	};
}