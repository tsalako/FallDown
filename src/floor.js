/*
 *Floor Object
 *
 */

function Floors(layer){
	this.left = [];
	this.right = [];
	this.time = 0;
	this.mod = 75;
	this.layer = layer;
	this.gap = 0;
	this.starty = STAGE_HEIGHT;

	this.addRects();

}

Floors.prototype.update = function(time){

	this.time = this.time+1;

	if(this.time%this.mod === 0){
		this.addRects();
	}

	this.left.map(function (elem) {elem.setY(elem.getY()-2); });
	this.right.map(function (elem) {elem.setY(elem.getY()-2); });
}

Floors.prototype.addRects = function(){
	'use strict';
	self = this;

	console.log(self.layer.children);
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