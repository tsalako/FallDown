/*
 * main.js
 *
 */
var floors, ball, gameover;

var background = new Kinetic.Layer();
var layer = new Kinetic.Layer();

var stage = new Kinetic.Stage({
    container:'container',
    width: STAGE_WIDTH,
    height: STAGE_HEIGHT
});

var bg = new Kinetic.Rect({
	x:0,
	y:0,
	width: STAGE_WIDTH,
	height: STAGE_HEIGHT,
	fill: 'black'
});

function reset(){
	'use strict';
	//stage.off('mousedown');
	layer.removeChildren();
	ball = new Ball();
	layer.add(ball.circle);
	ball.enableMove();

	floors = new Floors(layer);
}
background.add(bg);
stage.add(background);
stage.add(layer);

reset();

var move = new Kinetic.Animation(function (frame){
	floors.update(frame.time);
	ball.fromSide(floors, 'left');
	if(ball.checkFloor(floors) && ball.circle.getY()-ball.circle.getRadius() <= 0){
		move.stop();
		stage.on('mousedown', function(){
			stage.off('mousedown');
			reset();
		});
	}else if(ball.circle.getY() >= STAGE_HEIGHT-ball.circle.getRadius()+1){
		ball.doMove(false, floors);
	}else if(ball.checkFloor(floors)){
		ball.doMove(false, floors);
	}else if(ball.circle.getY() !== STAGE_HEIGHT-ball.circle.getRadius()){
		ball.doMove(true);
	}
}, layer);

move.start();