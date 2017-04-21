app.Games.PairBoard = function () {

	this.name = 'PairBoard';
	this.application.name = 'Games';
	this._navigation = null;
	this._msBtns = 'cell';

	this._gameTimer = null;
	this._gameTime = 0;

	this._pairBoard = 'pair_board';
	this._pairNumber = 30;
	this._pairTiles = [];
	this._pairClickedTiles = [];
	this._pairCanGet = true;
	this._pairMoves = 0;
	this._pairTilePair = 0;

};

app.Games.PairBoard.prototype.printGameTime = function () {
	//wuswietlanie
	var min = Math.floor(this._gameTime / 60);
	var sec = this._gameTime - (min * 60);
	if (min.toString().length === 1)
		min = '0' + min;
	if (sec.toString().length === 1)
		sec = '0' + sec;

	$('game_time').html(min + ':' + sec);
};

app.Games.PairBoard.prototype.resetTimer = function () {
	this._gameTime = 0;
	this.printGameTime();
};

app.Games.PairBoard.prototype._onGameTimerTick = function () {
	this._gameTime++;
	this.printGameTime();
};

app.Games.PairBoard.prototype.initBoard = function () {
	var board = $(this._pairBoard).empty();

	for (var i = 0; i < this._pairNumber; i++) {
		this._pairTiles.push(Math.floor(i / 2));
	}

	for (i = this._pairNumber - 1; i > 0; i--) {
		var swap = Math.floor(Math.random() * i);
		var tmp = this._pairTiles[i];

		this._pairTiles[i] = this._pairTiles[swap];
		this._pairTiles[swap] = tmp;
	}

	for (i = 0; i < this._pairNumber; i++) {
		var tile = CreateFromHTML('<div class="tile"><span class="avers"></span><span class="revers"></span></div>');
		var cell = CreateFromHTML('<div class="cell navigation_box"><div class="box_size_pairfocus" style="display: none; width: 95px; height: 125px;"><div class="horizontal_line_t" style="width: 47%;"></div><div class="arrow_top"></div><div class="horizontal_line_t_r" style="width: 47%;"></div><div class="vertical_line_l" style="height: 46%;"></div><div class="arrow_left"></div><div class="vertical_line_l_b" style="height: 46%;"></div><div class="vertical_line_r" style="height: 46%;"></div><div class="arrow_right"></div><div class="vertical_line_r_b" style="height: 46%;"></div><div class="horizontal_line_b" style="width: 47%;"></div><div class="arrow_bottom"></div><div class="horizontal_line_b_r" style="width: 47%;"></div></div></div>');

		tile.addClass('card-type-' + this._pairTiles[i]);
		tile.attr('data-card-type', this._pairTiles[i]);
		tile.attr('data-index', i);

		cell.append(tile);
		board.append(cell);
	}
};

app.Games.PairBoard.prototype.tileClicked = function (element) {
	if (this._pairCanGet) {
		if (!this._pairClickedTiles.length || (element.attr('data-index') != this._pairClickedTiles[0].attr('data-index'))) {
			this._pairClickedTiles.push(element);
			element.addClass('show');
		}

		if (this._pairClickedTiles.length >= 2) {
			this._pairCanGet = false;

			if (this._pairClickedTiles[0].attr('data-card-type') === this._pairClickedTiles[1].attr('data-card-type')) {
				setTimeout(goog.bind(this.deleteTiles, this), 700);
			} else {
				setTimeout(goog.bind(this.resetTiles, this), 700);
			}
		}
	}
};

app.Games.PairBoard.prototype.resetTiles = function () {
	this._pairClickedTiles[0].removeClass('show');
	this._pairClickedTiles[1].removeClass('show');
	this._pairClickedTiles = new Array();
	this._pairCanGet = true;
};

app.Games.PairBoard.prototype.deleteTiles = function () {
	this._pairClickedTiles[0].hide();
	this._pairClickedTiles[1].hide();

	this._pairTilePair++
	this._pairClickedTiles = new Array();
	this._pairCanGet = true;
	if (this._pairTilePair >= this._pairNumber / 2) {
		this.gameOver();
	}

};

app.Games.PairBoard.prototype.gameOver = function () {
	this.dispose();
	this.application.setActiveWindow(new app.Games.PairResult(true));
};

app.Games.PairBoard.prototype._onEnter = function (seneder, id) {
	this.tileClicked($(id).tag('DIV')[13]);
	this._gameTimer.start();
	this.printGameTime();
};
