var starImg, fairyImg, bgImg;
var fairy , fairyVoice;
var star, starBody;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var star_y = 0 ;
var fall = false ;
var boom_x = 0 ; 
var boom_y = 0 ;
var boom_y_add = 0 ;
function preload()
{
	starImg = loadImage("starImage.png");
	fairyImg = loadAnimation("fairyImage1.png","fairyImage2.png");
	bgImg = loadImage("starNight.png");
	fairyVoice = loadSound("JoyMusic.mp3");

}

var speed = 25 ; 
var start = false ; 

function setup() {
	createCanvas(800, 750);

	// fairyVoice.play();

	fairy = createSprite(130, 520);
	fairy.addAnimation("fairyflying",fairyImg);  
	fairy.scale =0.25;

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.05;


	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);
}


function draw() {
	if (start){
		background(bgImg);

		star.x = starBody.position.x;
		star.y = starBody.position.y;

		if (starBody.position.y > 460 && fairy.x >= 505){
			boom(star.x , star.y);
			Body.setStatic(starBody, true);

		}
		if (fall){
			fill(255);
			textSize(30);
			strokeWeight(20);
			text('press R to reset' , 250,300);
		}
		if(boom_y + boom_y_add> 0){
			boom_y_add -= 2 ;
			text('You got it !' , boom_x, boom_y + boom_y_add);
			}
		drawSprites();
	}
	else {
		text('Press SPACE to Start' , width/2 , height/2);
	};

}

function keyPressed() {
	if (start){
		if (keyCode == RIGHT_ARROW){
			fairy.x += speed;
		}
		if (keyCode == LEFT_ARROW){
			fairy.x -= speed;
		}
		if (keyCode == DOWN_ARROW){
			fall = true ; 
			Body.setStatic(starBody, false);
		}
		if(key == 'r') {
			World.remove(world, starBody);
			starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
			World.add(world, starBody);
			fall = false ;
			boom_x = 0 ;
			boom_y = 0 ;
			boom_y_add = 0; 
		}
	}
	else{
		if (keyCode == 32){
			start = true ; 
			fairyVoice.play();
		}
	}
}

function boom(x,y){
	if (boom_x == 0 && boom_y == 0){
		boom_x = x; 
		boom_y = y; 
	}
	// boom_y_add -= 2 ;
	// text('You got it !' , boom_x, boom_y + boom_y_add);
}
