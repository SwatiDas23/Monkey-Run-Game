
var backImage;
var player_running;
var BananaImage,BananasGroup;
var obstacle_img , obstaclesGroup;
var score;
var ground,groundImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY ;
var gameOver,gameOverImage;
var restart,restartImage;

function preload(){

backImage = loadImage("jungle.jpg");

player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
BananaImage   = loadImage("Banana.png");
obstacle_img = loadImage("stone.png");

gameOverImage = loadImage("gameOver.png");
restartImage = loadImage("restart.png");

}



function setup() {
  createCanvas(600,300);
  
  back = createSprite(200,50,10,10);
  back.addImage("back",backImage);
  
  ground = createSprite(200,260,999,10);
  ground.velocityX = -5; 
  ground.visible = false;
  
  player = createSprite(50,250,400,50);
  player.addAnimation("player",player_running);
  player.scale = 0.1;
  player.setCollider("circle",0,0,40);
  

  score = 0;

  BananasGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(300,230,10,10);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.visible = false;
  
  restart = createSprite(300,200,10,10);
  restart.addImage("restart",restartImage);
  restart.visible = false;
  
}



function draw(){
  
  background(180); 
  
  player.collide(ground);
  
  
  if(gameState===PLAY){
    

    
  if(keyDown("space")){
  player.velocityY = -10;
  }
  
  player.velocityY = player.velocityY + 0.8;
  
   if (ground.x < 0){
   ground.x = ground.width/3;
   }
  
    if(BananasGroup.isTouching(player)){
    score = score + 1;  
    switch(score){
      case 10 :player.scale=0.12;
        break;
      case 20 :player.scale=0.14;
        break;
      case 30 :player.scale=0.16;
        break;
      case 40 :player.scale=0.18;
        break;
      default: break;  
  }    
  }
  
  if(obstaclesGroup.isTouching(player)){
  score = score - 1;
  player.scale=0.1;
  }
  
  if(score===-10){
  gameState = END;
  }  
   
   
  spawnBananas(); 
  spawnObstacles();
  
  
   } 
  
  
  
  else if(gameState===END){

  gameOver.visible = true;
  gameOver.scale= 0.6;
  restart.visible = true;
  restart.scale= 0.6;

    
    player.velocityX = 0
  obstaclesGroup.setVelocityXEach(0);
  BananasGroup.setVelocityXEach(0);  
  
    
  obstaclesGroup.setLifetimeEach(-1);
  BananasGroup.setLifetimeEach(-1);
  }
  
   if(mousePressedOver(restart)){
  reset();
  }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);

}

function spawnBananas() {
if (frameCount % 60 === 0) {
var Banana = createSprite(600,200,5,5);
Banana.y = random(100,150);
Banana.addImage("Banana",BananaImage);
Banana.scale = 0.05;
Banana.velocityX = -3;
Banana.lifetime = 200;
Banana.depth = player.depth;
player.depth = player.depth + 1;
BananasGroup.add(Banana);  
}  
}



function spawnObstacles() {
if(frameCount % 60 === 0) {
var obstacle = createSprite(600,265,10,40);
obstacle.velocityX = -6;
var rand = Math.round(random(1,1));
switch(rand) {
case 1: obstacle.addImage(obstacle_img );
break;
default: break;
}
obstacle.scale = 0.1;
obstacle.lifetime = 300;
obstaclesGroup.add(obstacle);
}
}



function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  BananasGroup.destroyEach();
 
  
  score = 0;
  
}



