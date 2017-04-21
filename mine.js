app.Games.MinesweeperBoard = function () {

	this.name = 'MinesweeperBoard'
	this.application.name = 'Games';;
	this._msBtnBox = 'ms_panel';
	this._msBtns = 'ms_focus';
	this._msArray = null;
	this._navigation = null;

	this._msZero = 0;
	this._msWidth = 11;
	this._msHeight = 7;
	this._gameTimer = null;
	this._gameTime = 0;
	this._mineFlags = 0;
	this._gameMines = 'game_mine_mines';
};

app.Games.MinesweeperBoard.prototype.printGameTime = function () {
	//wyswietlanie
	var min = Math.floor(this._gameTime / 60);
	var sec = this._gameTime - (min * 60);
	if (min.toString().length === 1)
		min = '0' + min;
	if (sec.toString().length === 1)
		sec = '0' + sec;

	$('game_time').html(min + ':' + sec);
};

app.Games.MinesweeperBoard.prototype.resetTimer = function () {
	this._gameTime = 0;
	this.printGameTime();
};

app.Games.MinesweeperBoard.prototype._onGameTimerTick = function () {
	this._gameTime++;
	this.printGameTime();
};

app.Games.MinesweeperBoard.prototype.initBoard = function () {
	this._msArray = [];

	for (var y = 0; y <= this._msHeight; y++) {
		this._msArray[y] = [];
		for (var x = 0; x <= this._msWidth; x++) {
			this._msArray[y][x] = this._msZero;
		}
	}
	this.placeBombs(10);
	this.neighborBombs();
	//this.checkBombs();
	this.hideValues();
};

/** Rozmieszczenie bomb **/
app.Games.MinesweeperBoard.prototype.placeBombs = function (bombs) {
	this._mineFlags = bombs;
	$(this._gameMines).html(this._mineFlags);


	while (bombs > 0) {
		var y = Math.ceil(Math.random() * (this._msHeight - 1));
		var x = Math.ceil(Math.random() * (this._msWidth - 1));
		if (this._msArray[y][x] != -1) {
			this._msArray[y][x] = -1;
			bombs--;
		}
	}
};

/** Sprawdzanie ilosci bomb **/
//app.Games.MinesweeperBoard.prototype.checkBombs = function () {
//	for (var x = 0; x < this._msWidth; x++) {
//		for (var y = 0; y < this._msHeight; y++) {
//			if (this._msArray[y][x] == -1) {
//				console.log("bombs");
//			}
//		}
//	}
//};

/** Sumowanie sasiadow **/
app.Games.MinesweeperBoard.prototype.neighborBombs = function () {
	for (var x = 0; x < this._msWidth; x++) {
		for (var y = 0; y < this._msHeight; y++) {
			if (this._msArray[y][x] == -1) {
				if (this._msArray[y][x - 1] != -1) {
					this._msArray[y][x - 1]++;
				}

				if (this._msArray[y][x + 1] != -1) {
					this._msArray[y][x + 1]++;
				}

				if (this._msArray[y - 1][x] != -1) {
					this._msArray[y - 1][x]++;
				}

				if (this._msArray[y + 1][x] != -1) {
					this._msArray[y + 1][x]++;
				}

				if (this._msArray[y + 1][x + 1] != -1) {
					this._msArray[y + 1][x + 1]++;
				}

				if (this._msArray[y + 1][x - 1] != -1) {
					this._msArray[y + 1][x - 1]++;
				}

				if (this._msArray[y - 1][x - 1] != -1) {
					this._msArray[y - 1][x - 1]++;
				}

				if (this._msArray[y - 1][x + 1] != -1) {
					this._msArray[y - 1][x + 1]++;
				}
			}
		}
	}
};
/** Pokazywanie wartosci **/
app.Games.MinesweeperBoard.prototype.hideValues = function () {
	for (var x = 0; x < this._msWidth; x++) {
		for (var y = 0; y < this._msHeight; y++) {
			$(this.posToId(x, y)).tag('p')[0].html(this._msArray[y][x]).hide();;
		}
	}
};

app.Games.MinesweeperBoard.prototype.posToId = function (x, y) {
	return this._msBtns + '_' + (y + 1) + '_' + (x + 1);
};

app.Games.MinesweeperBoard.prototype.IdToPos = function (id) {
	var pos = id.replace(this._msBtns + '_', '').split('_');
	return (pos) ? this.toPos(parseInt(pos[1]) - 1, parseInt(pos[0]) - 1) : null;
};

app.Games.MinesweeperBoard.prototype.toPos = function (x, y) {
	return { 'x': x, 'y': y };
}

app.Games.MinesweeperBoard.prototype.mineFields = function (posToCheck) {
	var tmp = new Array();
	for (key in posToCheck) {
		var x = posToCheck[key].x;
		var y = posToCheck[key].y;

		if (this._msArray[y][x] === 0) {
			this.showValue(x, y);
			//dodanie do sprawdzenia
			var tX = x - 1;
			var tY = y;
			if (tX >= 0 && this._msArray[tY][tX] != -1) {
				if (this._msArray[tY][tX] == 0 && !$(this.posToId(tX, tY)).tag('p')[0].className)
					tmp.push(this.toPos(tX, tY));
				else
					this.showValue(tX, tY);
			}

			tX = x + 1;
			tY = y;
			if (tX < this._msWidth && this._msArray[tY][tX] != -1) {
				if (this._msArray[tY][tX] == 0 && !$(this.posToId(tX, tY)).tag('p')[0].className)
					tmp.push(this.toPos(tX, tY));
				else
					this.showValue(tX, tY);
			}

			tX = x;
			tY = y - 1;
			if (tY >= 0 && this._msArray[tY][tX] != -1) {
				if (this._msArray[tY][tX] == 0 && !$(this.posToId(tX, tY)).tag('p')[0].className)
					tmp.push(this.toPos(tX, tY));
				else
					this.showValue(tX, tY);
			}

			tX = x;
			tY = y + 1;
			if (tY < this._msHeight && this._msArray[tY][tX] != -1) {
				if (this._msArray[tY][tX] == 0 && !$(this.posToId(tX, tY)).tag('p')[0].className)
					tmp.push(this.toPos(tX, tY));
				else
					this.showValue(tX, tY);
			}

			tX = x + 1;
			tY = y + 1;
			if (tX < this._msWidth && tY < this._msHeight && this._msArray[tY][tX] != -1) {
				if (this._msArray[tY][tX] == 0 && !$(this.posToId(tX, tY)).tag('p')[0].className)
					tmp.push(this.toPos(tX, tY));
				else
					this.showValue(tX, tY);
			}

			tX = x - 1;
			tY = y + 1;
			if (tX >= 0 && tY < this._msHeight && this._msArray[tY][tX] != -1) {
				if (this._msArray[tY][tX] == 0 && !$(this.posToId(tX, tY)).tag('p')[0].className)
					tmp.push(this.toPos(tX, tY));
				else
					this.showValue(tX, tY);
			}

			tX = x - 1;
			tY = y - 1;
			if (tX >= 0 && tY >= 0 && this._msArray[tY][tX] != -1) {
				if (this._msArray[tY][tX] == 0 && !$(this.posToId(tX, tY)).tag('p')[0].className)
					tmp.push(this.toPos(tX, tY));
				else
					this.showValue(tX, tY);
			}

			tX = x + 1;
			tY = y - 1;
			if (tX < this._msWidth && tY - 1 >= 0 && this._msArray[tY][tX] != -1) {
				if (this._msArray[tY][tX] == 0 && !$(this.posToId(tX, tY)).tag('p')[0].className)
					tmp.push(this.toPos(tX, tY));
				else
					this.showValue(tX, tY);
			}
			this.mineFields(tmp);
		}
	}
};

app.Games.MinesweeperBoard.prototype.checkNeighbor = function () {
	var posToCheck = [];
	posToCheck.push(this.IdToPos(this._navigation.getSelected().id));
	this.mineFields(posToCheck);
};

app.Games.MinesweeperBoard.prototype.showValue = function (x, y) {
	var el = $(this.posToId(x, y)).tag('p')[0];

	switch (this._msArray[y][x]) {
		case 1:
			el.setClass('ms_1mine').show();
			break;
		case 2:
			el.setClass('ms_2mine').show();
			break;
		case 3:
			el.setClass('ms_3mine').show();
			break;
		case 4:
			el.setClass('ms_4mine').show();
			break;
		case 5:
			el.setClass('ms_5mine').show();
			break;
		case 6:
			el.setClass('ms_6mine').show();
			break;
		case 7:
			el.setClass('ms_7mine').show();
			break;
		case 8:
			el.setClass('ms_8mine').show();
			break;
		case 0:
			el.setClass('ms_empty').show();
			break;
		case -1:
			this.checkBomb();
			break;
	}	
};

app.Games.MinesweeperBoard.prototype.showFlag = function (x, y) {
	var el = $(this.posToId(x, y)).tag('p')[0];

	if (!el.hasClass('ms_flag')) {
		this._gameTimer.start();
		if (!this._mineFlags == 0 && (el.style.display == "none")) {
			el.addClass('ms_flag');
			$(this._gameMines).html(this._mineFlags -= 1);
		}
	} else {
		el.removeClass('ms_flag');
		$(this._gameMines).html(this._mineFlags += 1);
	}
};

app.Games.MinesweeperBoard.prototype.checkBomb = function (x, y) {
	this.dispose();
	this.application.setActiveWindow(new app.Games.MinesweeperResult());
};

app.Games.MinesweeperBoard.prototype._onEnter = function (sender, id) {
	this._gameTimer.start();
	if (this._navigation.getSelected() !== null) {
		var pos = this.IdToPos(this._navigation.getSelected().id);
		this.showValue(pos.x, pos.y);
		this.checkNeighbor();
	}
};

app.Games.MinesweeperBoard.prototype._onGreenPress = function () {
	if (this._navigation.getSelected()) {
		var pos = this.IdToPos(this._navigation.getSelected().id);
		this.showFlag(pos.x, pos.y);
	}
};
