var gameState = "play";

var backGround,ground,fireBall;
var backGround_image,fireBall_Image;

var obstacleGroup,Muss1,SnowMan,Stone,Crystal,IceB,Muss2;

var ninja,Gr;
var ninja_Animation,GrImg;



function preload(){
  ninja_Animation=loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png");
  Muss1=loadImage("Mushroom_1.png");
  Muss2=loadImage("Mushroom_2.png");
  SnowMan=loadImage("SnowMan.png");
  Stone=loadImage("Stone.png");
  Crystal=loadImage("Crystal.png");
  IceB=loadImage("IceBox.png");
  GrImg=loadImage("Gr.png");
  backGround_image = loadImage("BG.png");
  fireBall_Image = loadImage("FireBall.png");
}

function setup() {
  createCanvas(730,700);
  
score=0;

  backGround = createSprite(700,350,70,70);
  backGround.addImage(backGround_image);
  backGround.scale=1.0

  obstacleGroup = new Group();
   arrowGroup = new Group();
  ground=createSprite(600,600,1000,20);
  ground.visible=false;
  
  ninja = createSprite(110, 500, 100, 50);
  ninja .addAnimation("ninja",  ninja_Animation);
  //ninja .addAnimation("fight",fight_Animation );
  ninja.scale=0.2

  Gr = createSprite(30,650,400,20);
  Gr.velocityX=-5;
  Gr.addImage(GrImg);
  Gr.x = Gr.width /2;

}

function draw() {
  background(0); 
 
  drawSprites();

  if (gameState === "play") {
   
    if (Gr.x < 0){
      Gr.x = Gr.width/2;
    }
    if (arrowGroup .isTouching( obstacleGroup)) {
      obstacleGroup .destroyEach();
      arrowGroup.destroyEach();
      score=score+1
    }

  if(keyDown("F") && ninja.y>=306) {
   ninja.velocityY = -15;
  }
  spawnObstacles();
  ninja.velocityY = ninja.velocityY + 0.8
}







if(obstacleGroup.isTouching(ninja)){
  gameState = END;
}
else if (gameState === "END") {
  background(1);  

}




ninja.collide(ground);

if (keyWentDown("space")) {
  create_FireBall();
  
}
stroke("red");
fill("yellow") ;
textSize(30) ; 
   text("Score: "+ score, 200,200); 
}

function create_FireBall() {
  var fireBall = createSprite(100, 100, 60, 10);
  fireBall.addImage(fireBall_Image);
  fireBall.x = 12;
  fireBall.y=ninja.y;
  fireBall.x=ninja.x;
  fireBall.velocityX = 48;
  fireBall.lifetime = 100;
  fireBall.scale = 0.3;
  arrowGroup.add(fireBall);
   
}

function spawnObstacles(){
  if (frameCount % 200 === 0){
    var obstacle = createSprite(700,555,1000,20);
    obstacle.velocityX = -6;
    
     //generate random obstacles
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(Muss1);
       obstacle.scale = 1.8;
               break;
       case 2: obstacle.addImage(SnowMan);
           obstacle.scale = 0.5;
               break;
       case 3: obstacle.addImage(Stone);
               break;
       case 4: obstacle.addImage(Crystal);
               break;
       case 5: obstacle.addImage(IceB);
               break;
       case 6: obstacle.addImage(Muss2);
       obstacle.scale = 1.8;
               break;
       default: break;
     }
         
    
     obstacle.lifetime = 300;
     
     
     obstacleGroup.add(obstacle);
  }
 }