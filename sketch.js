var monkey, monkey_running,monkey_still;
var back,back_image, invisible, groundImage,banana,banana_image,banana_counter,stoneGroup,banana_score=0, stone, stone_image;
var PLAY=1, END=2, gameState;
var life=3;

function preload(){
  gameState=PLAY;
monkey_running= loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
back_image= loadImage("jungle.jpg");
  
banana_image= loadImage("banana.png");
stone_image= loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  back= createSprite(100,200,0,0);
  back.addImage(back_image);
  back.scale=0.6;
  
  monkey= createSprite(50,330,0,0);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  invisible= createSprite(200,345,400,50);
  invisible.visible= false;
  
  
  
  
  stonesGroup= createGroup();
  bananaGroup= createGroup();
}

function draw() {
  background("black");
   banana_counter= createSprite(320,50,10,10);
    banana_counter.addImage(banana_image);
    banana_counter.scale=0.04;

  drawSprites();
  textSize(25);
  fill("white")
  text(": "+banana_score,350,55);
  if(gameState=== PLAY){
    back.velocityX=-3;
    monkey.visible=true;
 if(back.x<100){
    back.x= back.width/4;
  }
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    banana_score= banana_score+1;
  }
  if(keyDown("space")&& monkey.y>290) {
    monkey.velocityY = -10;
  }
    spawnStones();
    spawnBananas();
  monkey.collide(invisible)
  monkey.velocityY= monkey.velocityY+0.4;
    if(stonesGroup.collide(monkey)){
      life= life-1;
      stonesGroup.destroyEach();
    }
    switch(life)
    {
      case 1:monkey.scale=0.06
             break;
      case 2:monkey.scale=0.08
             break;
      
      
  }
    switch(banana_score){
      case 1: monkey.scale=0.12
               break;
      case 2: monkey.scale=0.14;
               break;
      case 3: monkey.scale=0.16;
               break;
      
      
    }
  if(life<=0){
    gameState=END;
  }
  }
  if(gameState===END){
    monkey.velocityY=0;
    back.velocityX=0;
    monkey.visible=false;
    
    textSize(70);
    fill("white");
    text("Game Over",20,200);
  }
  
  
    textSize(25);
    fill("white")
    text("Lives Left: "+life,50,50)
}
  
/*if(frameCount%80===0){
  obstacle= createSprite(600,180,20,40);
  var rand= Math.round(random(1,6));
  
}}*/
function spawnStones(){
  if(World.frameCount%120===0){
    stone= createSprite(330,300,10,10);
    stone.addImage(stone_image);   
    stone.scale=0.15;
    stone.velocityX=-3;
    stone.lifetime=200;
    stonesGroup.add(stone);
  }
}

function spawnBananas(){
  if(World.frameCount%160===0){
    banana= createSprite(330,Math.round(random(120,300)),10,10);
    banana.addImage(banana_image);
    banana.scale=0.045;
    banana.velocityX=-3;
    banana.lifetime=200;
    bananaGroup.add(banana);
     }
}
