/*
 *Ball Object
 *
 */
var RADIUS = 20;
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
	self = this;

	$('#container').bind('keydown', function(event){
		console.log(self.circle);
		//console.log('X: '+self.circle.getX());
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
			case 38:
				self.circle.setY(self.circle.getY()-15);
				break;
		}
	});
	$(function(){
		$('#container').focus();
	});
}