/*
 *Ball Object
 *
 */
var RADIUS = 15;
function Ball(){
	'use strict';
	this.yPos = 22;
	this.xPos = stage.getWidth()/2;

	this.circle = new Kinetic.Circle({
	    x: this.xPos,
	    y: this.yPos,
	    radius: RADIUS,
	    fill: 'red',
	    strong: 'black',
	    strokeWidth:1
	});
}

Ball.prototype.enableMove = function(){
	'use strict';
	var self = this;

	$('#container').bind('keydown', function(event){
		switch(event.keyCode){
			case 39:
				if(self.xPos+30 < STAGE_WIDTH-RADIUS){
					self.xPos = self.xPos+30;
				}else{
					self.xPos = STAGE_WIDTH-RADIUS;
				}
				self.circle.setX(self.xPos);
				break;
			case 37:
				if(self.xPos-30 > RADIUS){
					self.xPos = self.xPos-30;
				}else{
					self.xPos = RADIUS;
				}
				self.circle.setX(self.xPos);
				break;
		}
	});
	$(function(){
		$('#container').focus();
	});
}

Ball.prototype.doMove = function(state, floors){
	'use strict';
	var self = this;
	if(state){
		self.circle.setY(self.circle.getY()+5);
	}else{
		self.circle.setY(self.circle.getY()-floors.speed);
	}
}
Ball.prototype.checkFloor = function (floors){
	'use strict';
	var self = this, mapFunc, redFunc;
	mapFunc = function(rect) {
		return self.onFloor(self.circle, rect);
	}

	redFunc = function(a,b){
		return a||b;
	}

	return (floors.left.map(mapFunc).reduce(redFunc, false)) ||
		   (floors.right.map(mapFunc).reduce(redFunc, false));
}

Ball.prototype.onFloor = function(circle, rect, side){
	'use strict';
	var top1, bottom1, left1, right1, x1, x2, y1, y2;

	top1 = circle.getY()-circle.getRadius();
	bottom1 = circle.getY()+circle.getRadius();
	left1 = circle.getX()-circle.getRadius();
	right1 = circle.getX()+circle.getRadius();

	x1 = rect.getX();
	x2 = x1 + rect.getWidth();
	y1 = rect.getY();
	y2 = y1 + rect.getHeight();

	if(side === 'left'){
	
	}else if(side === 'right'){

	}else{
		return (top1 < y1 && bottom1 > y1 && x1 < circle.getX() && x2 > circle.getX());
	}
}

Ball.prototype.fromSide = function(floors, side){
	'use strict';
	var self = this, mapFunc, redFunc;
	mapFunc = function(rect){
		return self.onFloor(self.circle, rect, side);
	}
	redFunc = function(a,b){
		return a||b;
	}

	return (floors.left.map(mapFunc).reduce(redFunc, false)) ||
		   (floors.right.map(mapFunc).reduce(redFunc, false));
}