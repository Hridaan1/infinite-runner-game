var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var gameOver,gameOver_img,restart,restart_img;
var CloudsGroup, cloudImage;
var ObstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var PLAY ;
var END;
var gameState ;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  restart_img = loadImage("restart.png")
  groundImage = loadImage("ground2.png");
  gameOver_img = loadImage("gameOver.png")
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(displayWidth -10,displayHeight-30);
     PLAY = 1;
 END = 0;
 gameState = PLAY;
   gameOver = createSprite(displayWidth/2 -10,displayHeight/2-30);
 restart = createSprite(displayWidth/2 +30,displayHeight/2 -30);
gameOver.addImage(gameOver_img);
gameOver.scale = 0.5;
restart.addImage(restart_img);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;

//set text
  trex = createSprite(100,displayHeight-100,20,50);
  trex.addAnimation("running", trex_running);
    trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(displayWidth/2 ,displayHeight-30,displayWidth,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(displayWidth/2 ,displayHeight -15,displayWidth,20);
  invisibleGround.visible = false;
  
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
    text("Score: "+ score, displayWidth-100,100);
  if(gameState===PLAY){
     score = score + Math.round(getFrameRate()/60);
console.log(trex.y);
    
    if(keyDown("space")&&trex.y>=719) {
    trex.velocityY = -12;
  }
  
 trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  spawnClouds();
    spawnObstacles();
      if(ObstaclesGroup.isTouching(trex)){
      
      gameState = END;
      
    }
  }
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth,displayHeight/2 +100);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = displayWidth/cloud.velocityX;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(displayWidth ,displayHeight-50);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = displayWidth/obstacle.velocityX;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  count = 0;
  
}
