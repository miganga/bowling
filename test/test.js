/* global describe, it */

(function () {
    'use strict';

	function throwMulti(balls,f) {
		var i = 0;
		for (i; i < balls; i ++) {
			f.throwBall();
		}
	}

	describe("Bowling game properties", function() {
		var b;
		beforeEach(function() {
			b = new Bowling();
		});
		it("should have game.currentFrame defined to 1", function() {
			expect(b.game.currentFrame).toEqual(1);
		});
		it("should have game.currentBall defined to 1", function() {
			expect(b.game.currentBall).toEqual(1);
		});
		it("should have game.pinsDown defined to 0", function() {
			expect(b.game.pinsDown).toEqual(0);
		});
		it("should have game.over defined to false", function() {
			expect(b.game.over).toBe(false);
		});
		it("should change game.over to true", function() {
			expect(b.game.over=true).toBe(true);
		});
	});
	describe("Bowling.frame properties", function() {
		var b;
		beforeEach(function() {
			b = new Bowling();
		});
		it("should have ballOne defined to 0", function() {
			expect(b.frame[1].ballOne).toEqual(0);
		});
		it("should have game.currentBall defined to 1", function() {
			expect(b.game.currentBall).toEqual(1);
		});
		it("should have game.pinsDown defined to 0", function() {
			expect(b.game.pinsDown).toEqual(0);
		});
		it("should have game.over defined to false", function() {
			expect(b.game.over).toBe(false);
		});
		it("should have game.over defined to true", function() {
			expect(b.game.over=true).toBe(true);
		});
	});
	describe("Bowling.checkForGameStatus method", function() {
		var b;
		beforeEach(function() {
			b = new Bowling();
		});
		it("should return false for b.game.over if the current frame is not 10", function() {
			expect(b.game.over).toBe(false);
		});
	});
	describe("Bowling.throwBall method", function() {
		var b;
		beforeEach(function() {
			b = new Bowling();
			console.log(b.display);
			b.display.rollCell = [];
			b.display.frameCell = [];
			for(var i = 0; i < 22; i++) {
				b.display.rollCell[i] = {
					innerHTML: ''
				};
				b.display.frameCell[i] = {
					innerHTML: ''
				};
			}
		});
		it("first frame first ball's value should be 1", function() {
			b.display.inputCell = 1;
			b.throwBall();
			expect(b.frame[1].ballOne).toEqual(1);
		});
		it("first frame second ball's value should be 1", function() {
			b.display.inputCell = 1;
			b.throwBall();
			b.display.inputCell = 1;
			b.throwBall();
			expect(b.frame[1].ballTwo).toEqual(1);
		});
		it("second frame first ball's value should be 10", function() {
			b.display.inputCell = 10;
			b.throwBall();
			b.throwBall();
			expect(b.frame[2].ballOne).toEqual(10);
		});
		it("tenth frame third ball's value should be 10", function() {
			b.display.inputCell = 10;
			throwMulti(13,b);
			expect(b.frame[10].ballThree).toEqual(10);
		});
	});
	describe("Bowling.updateScores method", function() {
		var b;
		beforeEach(function() {
			b = new Bowling();
			b.display.rollCell = [];
			b.display.frameCell = [];
			for(var i = 0; i < 22; i++) {
				b.display.rollCell[i] = {
					innerHTML: ''
				};
				b.display.frameCell[i] = {
					innerHTML: ''
				};
			}
		});
		it("first frame's score should be 5", function() {
			b.display.inputCell = 1;
			b.throwBall();
			b.display.inputCell = 4;
			b.throwBall();
			expect(b.frame[1].score).toEqual(5);
		});
		it("first frame's score should be 30", function() {
			b.display.inputCell = 10;
			b.throwBall();
			console.log(b.frame[1].ballOne);
			b.throwBall();
			console.log(b.frame[2].ballOne);
			b.throwBall();
			console.log(b.frame[3].ballOne);
			expect(b.frame[1].score).toEqual(30);
		});
		it("first frame's score should be 14", function() {
			b.display.inputCell = 1;
			b.throwBall();
			console.log(b.frame[1].ballOne);
			b.display.inputCell = 9;
			b.throwBall();
			console.log(b.frame[1].ballTwo);
			b.display.inputCell = 4;
			b.throwBall();
			console.log(b.frame[2].ballOne);
			expect(b.frame[1].score).toEqual(14);
		});
		it("second frame's score should be 24", function() {
			b.display.inputCell = 1;
			b.throwBall();
			console.log(b.frame[1].ballOne);
			b.display.inputCell = 9;
			b.throwBall();
			console.log(b.frame[1].ballTwo);
			b.display.inputCell = 5;
			b.throwBall();
			console.log(b.frame[2].ballOne);
			b.display.inputCell = 4;
			b.throwBall();
			console.log(b.frame[2].ballTwo);
			expect(b.frame[2].score).toEqual(24);
		});
		it("fifth frame's score should be 24", function() {
			b.display.inputCell = 1;
			b.throwBall();
			console.log(b.frame[1].ballOne);
			b.display.inputCell = 9;
			b.throwBall();
			console.log(b.frame[1].ballTwo);
			b.display.inputCell = 5;
			b.throwBall();
			console.log(b.frame[2].ballOne);
			b.display.inputCell = 5;
			b.throwBall();
			console.log(b.frame[2].ballTwo);
			b.display.inputCell = 4;
			b.throwBall();
			console.log(b.frame[3].ballOne);
			b.display.inputCell = 4;
			b.throwBall();
			console.log(b.frame[3].ballTwo);
			expect(b.frame[3].score).toEqual(37);
		});
		it("last frame's score should be 300", function() {
			b.display.inputCell = 10;
			throwMulti(12,b);
			expect(b.frame[10].score).toEqual(300);
		});
	});
})();
