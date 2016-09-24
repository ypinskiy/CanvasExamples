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
foregroundCanvas.addEventListener("mousedown", mouseClickHandler, false);
foregroundCanvas.addEventListener("mousemove", mouseMoveHandler, false);
var game = new Game();

function draw() {
	foregroundContext.clearRect(0, 0, foregroundCanvas.width, foregroundCanvas.height);
	if (game.deck.length > 0) {
		foregroundContext.drawImage(game.getCardImage(game.deck[0]), game.ui.deckPosition.x, game.ui.deckPosition.y, game.ui.cardWidth * game.ui.scale, game.ui.cardHieght * game.ui.scale);
	}
	if (game.cards.length > 0) {
		foregroundContext.drawImage(game.getCardImage(game.cards[game.cards.length - 1]), game.ui.pilePosition.x, game.ui.pilePosition.y, (game.ui.cardWidth * game.ui.scale), (game.ui.cardHieght * game.ui.scale));
	}
	foregroundContext.beginPath();
	foregroundContext.strokeStyle = "black";
	foregroundContext.fillStyle = "white";
	foregroundContext.lineWidth = 2;
	foregroundContext.arc(game.ui.deckPosition.x + (game.ui.cardWidth * game.ui.scale) * 0.5, game.ui.deckPosition.y + (game.ui.cardHieght * game.ui.scale) - 18, 19, 0, 2 * Math.PI);
	foregroundContext.stroke();
	foregroundContext.fill();
	foregroundContext.textAlign = "center";
	foregroundContext.font = "26px serif";
	foregroundContext.fillStyle = "black";
	foregroundContext.fillText(game.deck.length, game.ui.deckPosition.x + (game.ui.cardWidth * game.ui.scale) * 0.5, game.ui.deckPosition.y + (game.ui.cardHieght * game.ui.scale) - 10, game.ui.deckPosition.y + (game.ui.cardHieght * game.ui.scale) - 10);
	foregroundContext.closePath();
	// for (var i = 0; i < game.cards.length; i++) {
	// 	foregroundContext.drawImage(getCardImage(game.cards[i]), game.cards[i].position.x, game.cards[i].position.y, game.cardWidth * game.scale, game.cardHieght * game.scale);
	// 	if (game.cards[i].position.x != game.cards[i].target.x) {
	// 		if (game.cards[i].position.x < game.cards[i].target.x - game.precision) {
	// 			game.cards[i].position.x += game.precision;
	// 		} else if (game.cards[i].position.x > game.cards[i].target.x + game.precision) {
	// 			game.cards[i].position.x -= game.precision;
	// 		} else {
	// 			game.cards[i].position.x = game.cards[i].target.x;
	// 		}
	// 	}
	// 	if (game.cards[i].position.y != game.cards[i].target.y) {
	// 		if (game.cards[i].position.y < game.cards[i].target.y - game.precision) {
	// 			game.cards[i].position.y += game.precision;
	// 		} else if (game.cards[i].position.y > game.cards[i].target.y + game.precision) {
	// 			game.cards[i].position.y -= game.precision;
	// 		} else {
	// 			game.cards[i].position.y = game.cards[i].target.y;
	// 		}
	// 	}
	// }
	for (var i = 0; i < game.columns.first.length; i++) {
		game.columns.first[i].position.x = game.ui.columnPositions.first.x;
		game.columns.first[i].position.y = game.ui.columnPositions.first.y(i, game.ui);
		foregroundContext.drawImage(game.getCardImage(game.columns.first[i]), game.columns.first[i].position.x, game.columns.first[i].position.y, game.ui.cardWidth * game.ui.scale, game.ui.cardHieght * game.ui.scale);
	}
	for (var i = 0; i < game.columns.second.length; i++) {
		game.columns.second[i].position.x = game.ui.columnPositions.second.x;
		game.columns.second[i].position.y = game.ui.columnPositions.second.y(i, game.ui);
		foregroundContext.drawImage(game.getCardImage(game.columns.second[i]), game.columns.second[i].position.x, game.columns.second[i].position.y, game.ui.cardWidth * game.ui.scale, game.ui.cardHieght * game.ui.scale);
	}
	for (var i = 0; i < game.columns.third.length; i++) {
		game.columns.third[i].position.x = game.ui.columnPositions.third.x;
		game.columns.third[i].position.y = game.ui.columnPositions.third.y(i, game.ui);
		foregroundContext.drawImage(game.getCardImage(game.columns.third[i]), game.columns.third[i].position.x, game.columns.third[i].position.y, game.ui.cardWidth * game.ui.scale, game.ui.cardHieght * game.ui.scale);
	}
	for (var i = 0; i < game.columns.fourth.length; i++) {
		game.columns.fourth[i].position.x = game.ui.columnPositions.fourth.x;
		game.columns.fourth[i].position.y = game.ui.columnPositions.fourth.y(i, game.ui);
		foregroundContext.drawImage(game.getCardImage(game.columns.fourth[i]), game.columns.fourth[i].position.x, game.columns.fourth[i].position.y, game.ui.cardWidth * game.ui.scale, game.ui.cardHieght * game.ui.scale);
	}
	for (var i = 0; i < game.columns.fifth.length; i++) {
		game.columns.fifth[i].position.x = game.ui.columnPositions.fifth.x;
		game.columns.fifth[i].position.y = game.ui.columnPositions.fifth.y(i, game.ui);
		foregroundContext.drawImage(game.getCardImage(game.columns.fifth[i]), game.columns.fifth[i].position.x, game.columns.fifth[i].position.y, game.ui.cardWidth * game.ui.scale, game.ui.cardHieght * game.ui.scale);
	}
	for (var i = 0; i < game.columns.sixth.length; i++) {
		game.columns.sixth[i].position.x = game.ui.columnPositions.sixth.x;
		game.columns.sixth[i].position.y = game.ui.columnPositions.sixth.y(i, game.ui);
		foregroundContext.drawImage(game.getCardImage(game.columns.sixth[i]), game.columns.sixth[i].position.x, game.columns.sixth[i].position.y, game.ui.cardWidth * game.ui.scale, game.ui.cardHieght * game.ui.scale);
	}
	for (var i = 0; i < game.columns.seventh.length; i++) {
		game.columns.seventh[i].position.x = game.ui.columnPositions.seventh.x;
		game.columns.seventh[i].position.y = game.ui.columnPositions.seventh.y(i, game.ui);
		foregroundContext.drawImage(game.getCardImage(game.columns.seventh[i]), game.columns.seventh[i].position.x, game.columns.seventh[i].position.y, game.ui.cardWidth * game.ui.scale, game.ui.cardHieght * game.ui.scale);
	}
	if (game.selectedCard != null) {
		foregroundContext.drawImage(game.getCardImage(game.selectedCard), game.lastMousePos.x - ((game.ui.cardWidth * game.ui.scale) * 0.5), game.lastMousePos.y - ((game.ui.cardHieght * game.ui.scale) * 0.5), game.ui.cardWidth * game.ui.scale, game.ui.cardHieght * game.ui.scale);
	}
	requestAnimationFrame(draw);
}
init();

function mouseClickHandler(event) {
	var topScrollOffset = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
	var leftScrollOffset = (window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0);
	var x = event.clientX - foregroundCanvas.offsetLeft + leftScrollOffset;
	var y = event.clientY - foregroundCanvas.offsetTop + topScrollOffset;
	if (game.isDeck(x, y, game) && game.selectedCard == null) {
		console.log("Deck clicked");
		if (game.deck.length > 0) {
			game.deck[0].visible = true;
			game.cards.push(game.deck[0]);
			game.deck.splice(0, 1);
		} else {
			if (game.cards.length > 0) {
				game.deck = game.cards;
				game.cards = [];
				for (var i = 0; i < game.deck.length; i++) {
					game.deck[i].visible = false;
				}
			}
		}
	} else if (game.isCardPile(x, y)) {
		if (game.selectedCard == null) {
			game.selectCard("pile");
		} else {
			game.returnSelectedCardToOrigin();
		}
	} else if (game.isColumn(x, y)) {
		switch (game.whichColumn(x, y)) {
			case "first":
				if (game.selectedCard != null) {
					if (game.columns.first.length > 0) {
						if (game.selectedCard.value == game.columns.first[game.columns.first.length - 1].value - 1) {
							if (game.selectedCard.suit == "clubs" || game.selectedCard.suit == "spades") {
								if (game.columns.first[game.columns.first.length - 1].suit == "hearts" || game.columns.first[game.columns.first.length - 1].suit == "diamonds") {
									game.moveSelectedCardTo("first");
								} else {
									game.returnSelectedCardToOrigin();
								}
							} else if (game.selectedCard.suit == "hearts" || game.selectedCard.suit == "diamonds") {
								if (game.columns.first[game.columns.first.length - 1].suit == "spades" || game.columns.first[game.columns.first.length - 1].suit == "clubs") {
									game.moveSelectedCardTo("first");
								} else {
									game.returnSelectedCardToOrigin();
								}
							}
						} else {
							game.returnSelectedCardToOrigin();
						}
					} else if (game.selectedCard.value == 13) {
						game.moveSelectedCardTo("first");
					}
				} else {
					if (game.columns.first[game.columns.first.length - 1].visible) {
						game.selectCards("first", game.whichIndex(y, "first"));
					} else {
						game.columns.first[game.columns.first.length - 1].visible = true;
					}
				}
				break;
			case "second":
				if (game.selectedCard != null) {
					if (game.columns.second.length > 0) {
						if (game.selectedCard.value == game.columns.second[game.columns.second.length - 1].value - 1) {
							if (game.selectedCard.suit == "clubs" || game.selectedCard.suit == "spades") {
								if (game.columns.second[game.columns.second.length - 1].suit == "hearts" || game.columns.second[game.columns.second.length - 1].suit == "diamonds") {
									game.moveSelectedCardTo("second");
								} else {
									game.returnSelectedCardToOrigin();
								}
							} else if (game.selectedCard.suit == "hearts" || game.selectedCard.suit == "diamonds") {
								if (game.columns.second[game.columns.second.length - 1].suit == "spades" || game.columns.second[game.columns.second.length - 1].suit == "clubs") {
									game.moveSelectedCardTo("second");
								} else {
									game.returnSelectedCardToOrigin();
								}
							}
						} else {
							game.returnSelectedCardToOrigin();
						}
					} else if (game.selectedCard.value == 13) {
						game.moveSelectedCardTo("second");
					}
				} else {
					if (game.columns.second[game.columns.second.length - 1].visible) {
						game.selectCard("second");
					} else {
						game.columns.second[game.columns.second.length - 1].visible = true;
					}
				}
				break;
			case "third":
				if (game.selectedCard != null) {
					if (game.columns.third.length > 0) {
						if (game.selectedCard.value == game.columns.third[game.columns.third.length - 1].value - 1) {
							if (game.selectedCard.suit == "clubs" || game.selectedCard.suit == "spades") {
								if (game.columns.third[game.columns.third.length - 1].suit == "hearts" || game.columns.third[game.columns.third.length - 1].suit == "diamonds") {
									game.moveSelectedCardTo("third");
								} else {
									game.returnSelectedCardToOrigin();
								}
							} else if (game.selectedCard.suit == "hearts" || game.selectedCard.suit == "diamonds") {
								if (game.columns.third[game.columns.third.length - 1].suit == "spades" || game.columns.third[game.columns.third.length - 1].suit == "clubs") {
									game.moveSelectedCardTo("third");
								} else {
									game.returnSelectedCardToOrigin();
								}
							}
						} else {
							game.returnSelectedCardToOrigin();
						}
					} else if (game.selectedCard.value == 13) {
						game.moveSelectedCardTo("third");
					}
				} else {
					if (game.columns.third[game.columns.third.length - 1].visible) {
						game.selectCard("third");
					} else {
						game.columns.third[game.columns.third.length - 1].visible = true;
					}
				}
				break;
			case "fourth":
				if (game.selectedCard != null) {
					if (game.columns.fourth.length > 0) {
						if (game.selectedCard.value == game.columns.fourth[game.columns.fourth.length - 1].value - 1) {
							if (game.selectedCard.suit == "clubs" || game.selectedCard.suit == "spades") {
								if (game.columns.fourth[game.columns.fourth.length - 1].suit == "hearts" || game.columns.fourth[game.columns.fourth.length - 1].suit == "diamonds") {
									game.moveSelectedCardTo("fourth");
								} else {
									game.returnSelectedCardToOrigin();
								}
							} else if (game.selectedCard.suit == "hearts" || game.selectedCard.suit == "diamonds") {
								if (game.columns.fourth[game.columns.fourth.length - 1].suit == "spades" || game.columns.fourth[game.columns.fourth.length - 1].suit == "clubs") {
									game.moveSelectedCardTo("fourth");
								} else {
									game.returnSelectedCardToOrigin();
								}
							}
						} else {
							game.returnSelectedCardToOrigin();
						}
					} else if (game.selectedCard.value == 13) {
						game.moveSelectedCardTo("fourth");
					}
				} else {
					if (game.columns.fourth[game.columns.fourth.length - 1].visible) {
						game.selectCard("fourth");
					} else {
						game.columns.fourth[game.columns.fourth.length - 1].visible = true;
					}
				}
				break;
			case "fifth":
				if (game.selectedCard != null) {
					if (game.columns.fifth.length > 0) {
						if (game.selectedCard.value == game.columns.fifth[game.columns.fifth.length - 1].value - 1) {
							if (game.selectedCard.suit == "clubs" || game.selectedCard.suit == "spades") {
								if (game.columns.fifth[game.columns.fifth.length - 1].suit == "hearts" || game.columns.fifth[game.columns.fifth.length - 1].suit == "diamonds") {
									game.moveSelectedCardTo("fifth");
								} else {
									game.returnSelectedCardToOrigin();
								}
							} else if (game.selectedCard.suit == "hearts" || game.selectedCard.suit == "diamonds") {
								if (game.columns.fifth[game.columns.fifth.length - 1].suit == "spades" || game.columns.fifth[game.columns.fifth.length - 1].suit == "clubs") {
									game.moveSelectedCardTo("fifth");
								} else {
									game.returnSelectedCardToOrigin();
								}
							}
						} else {
							game.returnSelectedCardToOrigin();
						}
					} else if (game.selectedCard.value == 13) {
						game.moveSelectedCardTo("fifth");
					}
				} else {
					if (game.columns.fifth[game.columns.fifth.length - 1].visible) {
						game.selectCard("fifth");
					} else {
						game.columns.fifth[game.columns.fifth.length - 1].visible = true;
					}
				}
				break;
			case "sixth":
				if (game.selectedCard != null) {
					if (game.columns.sixth.length > 0) {
						if (game.selectedCard.value == game.columns.sixth[game.columns.sixth.length - 1].value - 1) {
							if (game.selectedCard.suit == "clubs" || game.selectedCard.suit == "spades") {
								if (game.columns.sixth[game.columns.sixth.length - 1].suit == "hearts" || game.columns.sixth[game.columns.sixth.length - 1].suit == "diamonds") {
									game.moveSelectedCardTo("sixth");
								} else {
									game.returnSelectedCardToOrigin();
								}
							} else if (game.selectedCard.suit == "hearts" || game.selectedCard.suit == "diamonds") {
								if (game.columns.sixth[game.columns.sixth.length - 1].suit == "spades" || game.columns.sixth[game.columns.sixth.length - 1].suit == "clubs") {
									game.moveSelectedCardTo("sixth");
								} else {
									game.returnSelectedCardToOrigin();
								}
							}
						} else {
							game.returnSelectedCardToOrigin();
						}
					} else if (game.selectedCard.value == 13) {
						game.moveSelectedCardTo("sixth");
					}
				} else {
					if (game.columns.sixth[game.columns.sixth.length - 1].visible) {
						game.selectCard("sixth");
					} else {
						game.columns.sixth[game.columns.sixth.length - 1].visible = true;
					}
				}
				break;
			case "seventh":
				if (game.selectedCard != null) {
					if (game.columns.seventh.length > 0) {
						if (game.selectedCard.value == game.columns.seventh[game.columns.seventh.length - 1].value - 1) {
							if (game.selectedCard.suit == "clubs" || game.selectedCard.suit == "spades") {
								if (game.columns.seventh[game.columns.seventh.length - 1].suit == "hearts" || game.columns.seventh[game.columns.seventh.length - 1].suit == "diamonds") {
									game.moveSelectedCardTo("seventh");
								} else {
									game.returnSelectedCardToOrigin();
								}
							} else if (game.selectedCard.suit == "hearts" || game.selectedCard.suit == "diamonds") {
								if (game.columns.seventh[game.columns.seventh.length - 1].suit == "spades" || game.columns.seventh[game.columns.seventh.length - 1].suit == "clubs") {
									game.moveSelectedCardTo("seventh");
								} else {
									game.returnSelectedCardToOrigin();
								}
							}
						} else {
							game.returnSelectedCardToOrigin();
						}
					} else if (game.selectedCard.value == 13) {
						game.moveSelectedCardTo("seventh");
					}
				} else {
					if (game.columns.seventh[game.columns.seventh.length - 1].visible) {
						game.selectCard("seventh");
					} else {
						game.columns.seventh[game.columns.seventh.length - 1].visible = true;
					}
				}
				break;
		}
	} else if (game.isSuiteSlot(x, y) && game.selectingState) {
		console.log("A suite slot clicked");
	} else {
		console.log("Empty space clicked");
	}
}

function init() {
	foregroundContext.clearRect(0, 0, foregroundCanvas.width, foregroundCanvas.height);
	backgroundContext.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
	game.populateDeck();
	game.shuffle();
	backgroundContext.beginPath();
	backgroundContext.strokeStyle = "black";
	backgroundContext.lineWidth = 2;
	backgroundContext.rect(game.ui.deckPosition.x - 2, game.ui.deckPosition.y + 20 + (game.ui.cardHieght * game.ui.scale) - 2, (game.ui.cardWidth * game.ui.scale) + 4, (game.ui.cardHieght * game.ui.scale) + 4);
	backgroundContext.rect(game.ui.deckPosition.x - 2, game.ui.deckPosition.y + 40 + (game.ui.cardHieght * game.ui.scale * 2) - 2, (game.ui.cardWidth * game.ui.scale) + 4, (game.ui.cardHieght * game.ui.scale) + 4);
	backgroundContext.rect(game.ui.deckPosition.x - 2, game.ui.deckPosition.y + 60 + (game.ui.cardHieght * game.ui.scale * 3) - 2, (game.ui.cardWidth * game.ui.scale) + 4, (game.ui.cardHieght * game.ui.scale) + 4);
	backgroundContext.rect(game.ui.deckPosition.x - 2, game.ui.deckPosition.y + 80 + (game.ui.cardHieght * game.ui.scale * 4) - 2, (game.ui.cardWidth * game.ui.scale) + 4, (game.ui.cardHieght * game.ui.scale) + 4);
	backgroundContext.rect(game.ui.deckPosition.x + 20 + (game.ui.cardWidth * game.ui.scale) - 2, game.ui.deckPosition.y - 2, (game.ui.cardWidth * game.ui.scale) + 4, (game.ui.cardHieght * game.ui.scale) + 4);
	backgroundContext.stroke();
	backgroundContext.closePath();
	game.deck[0].visible = true;
	game.columns.first.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.second.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = true;
	game.columns.second.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.third.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.third.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = true;
	game.columns.third.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.fourth.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.fourth.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.fourth.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = true;
	game.columns.fourth.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.fifth.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.fifth.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.fifth.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.fifth.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = true;
	game.columns.fifth.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.sixth.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.sixth.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.sixth.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.sixth.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.sixth.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = true;
	game.columns.sixth.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.seventh.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.seventh.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.seventh.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.seventh.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.seventh.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = false;
	game.columns.seventh.push(game.deck[0]);
	game.deck.splice(0, 1);
	game.deck[0].visible = true;
	game.columns.seventh.push(game.deck[0]);
	game.deck.splice(0, 1);
	draw();
}

function mouseMoveHandler(event) {
	var topScrollOffset = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
	var leftScrollOffset = (window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0);
	var x = event.clientX - foregroundCanvas.offsetLeft + leftScrollOffset;
	var y = event.clientY - foregroundCanvas.offsetTop + topScrollOffset;
	game.lastMousePos = {
		x: x,
		y: y
	};
}