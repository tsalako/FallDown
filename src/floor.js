/*
 *Floor Object
 *
 */

function Floors(layer){
	this.left = [];
	this.right = [];
	this.time = 0;
	this.speed = 2;
	this.mod = 75;
	this.passed = 0;
	this.skip = false;
	this.layer = layer;
	this.gap = 0;
	this.starty = STAGE_HEIGHT;

	this.addRects();

}

Floors.prototype.update = function(time){
	'use strict';
	var self = this;
	self.time = self.time+1;

	if(self.time%self.mod === 0){
		if(!self.skip){
			self.addRects();
		}
		self.skip = false;

		self.passed = self.passed+1;
		if(self.passed%15 === 0){
			self.mod-=5;
			self.speed++;
			self.skip = true;
		}
	}

	self.left.map(function (elem) {elem.setY(elem.getY()-self.speed); });
	self.right.map(function (elem) {elem.setY(elem.getY()-self.speed); });
}

Floors.prototype.addRects = function(){
	'use strict';
	var self = this;

	//console.log(self.layer.children);
	self.gap = Math.floor((Math.random()*150)+1) + 45;

	var leftFloor = new Kinetic.Rect({
		x:0,
		y:self.starty,
		width:Math.floor((Math.random()*(STAGE_WIDTH-100))+1),
		height:20,
		fill:'brown'
	});

	self.left.push(leftFloor);
	self.layer.add(leftFloor);

	var rightFloor = new Kinetic.Rect({
		x:self.left[self.left.length-1].getWidth()+self.gap,
		y:self.starty,
		width:STAGE_WIDTH - self.left[self.left.length-1].getWidth()-self.gap,
		height:20,
		fill:'green'
	});

	self.right.push(rightFloor);
	self.layer.add(rightFloor);
}