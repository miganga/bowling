/*
Bowling app
Copyright 2015 Ziya Aktas, cannot be reproduced nor shared without permission.
aktanaktas@gmail.com
Bowling game constructor, can be invoked like this
var x = new Bowling();
*/
var Bowling = (function() {
	var game = function() {
		return {
			currentFrame: 1,
			currentBall: 1,
			pinsDown: 0,
			over: false,
			bonusRoll: false
		}
	};
	var frame = [];
	for (var i = 1; i < 12; i++) {
		frame.push({
			ballOne: 0,
			ballTwo: 0,
			ballThree: 0,
			score: 0,
			display: false
		});
	}
	var display = function() {
		return {
			rollCell: '',
			frameCell: '',
			inputCell: ''
		}
	};
	/*checks if the game is over*/
	var checkGameStatus = function() {
		if(this.game.currentFrame == 10) {
			this.game.over = true;
		}
	};
	/*checks for the extra throw at the last frame*/
	var checkForBonusRoll = function() {
		if(this.game.currentFrame == 10) {
			this.game.bonusRoll = true;
		}
	};
	/*regularly updates frame scores depending on strikes & spares*/
	var updateScores = function (pd,cf,cb) {
		switch(cb) {
			case 1:
				if(frame[cf-1].ballOne == 10) {
					frame[cf-1].score += frame[cf].ballOne;
					if(frame[cf-2].ballOne == 10) {
						frame[cf-2].score += frame[cf].ballOne + frame[cf-1].ballOne + frame[cf-1].ballTwo;
						if(frame[cf-3].display) {
							frame[cf-2].score += frame[cf-3].score;
						}
						frame[cf-2].display = true;
					}
				}
				if(frame[cf-1].ballOne + frame[cf-1].ballTwo == 10 && frame[cf-1].ballOne != 10) {
					frame[cf-1].score += frame[cf].ballOne;
					frame[cf-1].score += frame[cf-1].ballOne + frame[cf-1].ballTwo;
					if(frame[cf-2].display) {
						frame[cf-1].score += frame[cf-2].score;
					}
					frame[cf-1].display = true;
				}
				break;
			case 2:
				if(frame[cf-1].ballOne == 10) {
					frame[cf-1].score += 20;
					if(frame[cf-2].display) {
						frame[cf-1].score += frame[cf-2].score;
					}
					frame[cf-1].display = true;
				}
				break;
			case 3:
				break;
		}
	};
	/*display frame & throw scores whenever it's appropriate*/
	var displayScores = function() {
		for(var i = 1;i < 11;i++) {
			if(this.frame[i].display) {
				this.display.frameCell[i-1].innerHTML = this.frame[i].score;
				
			}
		}
	};
	var isNumberString = function (n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); };
	return {
		game: game(),
		frame: frame,
		display: display(),
		checkGameStatus: checkGameStatus,
		checkForBonusRoll: checkForBonusRoll,
		displayScores: displayScores,
		updateScores: updateScores,
		/*processes the input from the user*/
		throwBall: function() {
			if(this.game.over) {
				alert('Game over! Thanks for playing.  Total Score: ' + this.frame[10].score);
				return;
			}
			
			var cb = this.game.currentBall;
			var cf = this.game.currentFrame;
			var ic = this.display.inputCell;
			/*check input against errors*/
			if (!isNumberString(ic) || ic > 10 || ic < 0) {
				alert('Please enter an integer number between 0 & 10');
				return;
			}
			this.game.pinsDown = ic;
			switch(cb) {
				/*if the current ball is the first in the frame */
				case 1:
					this.frame[cf].ballOne = ic;
					if (this.frame[cf].ballOne == 10) {
						if (cf < 10) {
							this.display.rollCell[(2 * (cf - 1))].innerHTML = ic;
							this.display.rollCell[(2 * (cf - 1) + 1)].innerHTML = 0;
						} else {
							this.display.rollCell[(2 * (cf - 1))].innerHTML = ic;
						}
						if (cf == 10) {
							this.game.currentBall++;
						} else {
							this.game.currentFrame++;
						}
						this.checkForBonusRoll();
					} else {
						this.game.currentBall++;
						this.display.rollCell[(2 * (cf - 1))].innerHTML = ic;
					}
					this.updateScores(ic,cf,cb);
					break;
				/*if the current ball is the second in the frame */
				case 2:
					this.updateScores(ic,cf,cb);
					this.frame[cf].ballTwo = ic;
					if (cf < 10) {
						if (this.frame[cf].ballOne + ic > 10) {
							alert('Please enter an integer number less than ' + (11 - this.frame[cf].ballOne));
							return;
						}
					} else {

					}
					this.display.rollCell[(2 * (cf - 1) + 1)].innerHTML = ic;
					if(this.frame[cf].ballOne + this.frame[cf].ballTwo == 10) {
						this.checkForBonusRoll();
						if(this.game.bonusRoll) {
							this.game.currentBall = 3;
						} else {
							this.game.currentBall = 1;
							this.game.currentFrame++;
						}
					} else if(this.frame[cf].ballOne == 10) {
						this.game.currentBall = 3;
						this.display.rollCell[19].innerHTML = ic;
					} else
					{
						this.checkGameStatus();
						this.game.currentBall = 1;
						this.game.currentFrame++;
						this.frame[cf].score += this.frame[cf].ballOne + this.frame[cf].ballTwo + this.frame[cf-1].score;
						this.frame[cf].display = true;
					}
					break;
				/*if the current ball is the third in the frame */
				case 3:
					this.updateScores(ic,cf,cb);
					this.frame[cf].ballThree = ic;
					this.frame[cf].score += this.frame[cf].ballTwo + this.frame[cf].ballTwo + this.frame[cf].ballThree + this.frame[cf-1].score;
					this.frame[cf].display = true;
					this.display.rollCell[20].innerHTML = ic;
					this.checkGameStatus();
					break;
			}
			this.displayScores();
		}
	}
});
