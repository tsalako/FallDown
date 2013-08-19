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
	layer.removeChildren();

	floors = new Floors(layer);

	ball = new Ball();
	layer.add(ball.circle);
	ball.enableMove();
	//floors = new Floors();
}
background.add(bg);
stage.add(background);
stage.add(layer);

reset();


var fall = new Kinetic.Animation(function (frame){
	floors.update(frame.time);
	if(ball.circle.getY() !== STAGE_HEIGHT-ball.circle.getRadius()){
		ball.circle.setY(ball.circle.getY()+1);
	}else{
		fall.stop();
	}
}, layer);
fall.start();