var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,400,50,50);
  ghost.addImage("ghost",ghostImg);
  //ghost.velocityY = 5;
  ghost.scale = 0.35;
}

function draw() {
  background(0);
  
if(gameState === "play"){
  if(keyDown("space")){
    ghost.velocityY = -7;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+5;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-5;
  }
  ghost.velocityY = ghost.velocityY + 0.8;
    if(tower.y > 400){
        tower.y = 300
      }
      createDoors();
      
      if(climbersGroup.isTouching(ghost)){
        ghost.velocityY = 0;
      }
      if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
        ghost.destroy();
        gameState = "end";
       
      }
      drawSprites();
}
if(gameState === "end"){
  textSize(40);
  text("Fin de la Partida",150,300);

  //tower.velocityY = 0;
  //doorsGroup.velocityY = 0;
  //climbersGroup.velocityY = 0;
  //doorsGroup.setLifetime(-1);
  //climbersGroup.setLifetime(-1);
}

    
}

function createDoors(){
 if(frameCount % 70 === 0){
 var door = createSprite(200,-50);
 door.addImage(doorImg);
 door.x = Math.round(random(100,500));
 door.velocityY = 5;
 door.lifetime = 200;
 doorsGroup.add(door);

 var climber = createSprite(200,10);
 climber.addImage(climberImg);
 climber.x = door.x;
 climber.velocityY = door.velocityY;
 climber.lifetime = 200;
 climbersGroup.add(climber);

var InvisibleBlock = createSprite(200,10);
InvisibleBlock.width = climber.width;
InvisibleBlock.height = 2;
InvisibleBlock.x = door.x;
InvisibleBlock.velocityY = door.velocityY;
InvisibleBlock.lifetime = 200;
//InvisibleBlock.visible = false;
InvisibleBlock.debug = false;
invisibleBlockGroup.add(InvisibleBlock);

 door.depth = ghost.depth;
 climber.depth = ghost.depth;
 ghost.depth = ghost.depth+1;
 } 

}