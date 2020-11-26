var ghost , door , climber , invisibleGround , tower;
var tower_image , ghost_image , door_image , climber_image ,  spookMusic , ghostJumping;
var climberGroup , doorGroup , invisibleGroup;
var gamestate = "play";

function preload(){

tower_image = loadImage("tower.png");
ghost_image = loadImage("ghost-standing.png") ; 
ghostJumping = loadImage("ghost-jumping.png")  ;
door_image = loadImage("door.png");
climber_image = loadImage("climber.png");
spookyMusic = loadSound("spooky.wav");  
    
}

function setup(){
createCanvas (400,400);
   
tower = createSprite(200,200,20,20);  
tower.addImage(tower_image);  
tower.scale = 0.67;
  
ghost = createSprite(200,200,20,20);
ghost.addImage(ghost_image);
ghost.scale = 0.3    
ghost.setCollider("rectangle",-25,25,200,250 )  
  
spookyMusic.loop();
  
doorGroup = new Group();
climberGroup = new Group();  
invisibleGroup = new Group();  
  
score = 0;  
  
}

function draw(){
background ("black") 
  
if(gamestate === "play"){
  
createObstacles();
  
tower.velocityY = 1;
  
if( tower.y > 400){
   
tower.y = 200;  
  
}  
  
if (keyDown("right_arrow")){
    
ghost.x = ghost.x + 3;
    
}  
  
if (keyDown("left_arrow") ){  
 
ghost.x = ghost.x - 3;
  
}  
  
if(keyDown("space")){
  
ghost.velocityY = -10;
ghost.addImage(ghostJumping);  
   
}
  
if (keyWentUp("space")){
  
ghost.addImage(ghost_image);  
  
}  
    
ghost.velocityY = ghost.velocityY + 0.5
    
  
if(climberGroup.isTouching(ghost)){
   
ghost.velocityY = 0;
  
}  
  
if(invisibleGroup.isTouching(ghost) || ghost.y > 400 || ghost.y < 0 ){
ghost.destroy();
gamestate = "end"
}
  
drawSprites() ;
}   

else if (gamestate === "end") {
  
stroke("yellow");
textSize(30);
fill("yellow");
text("Game Over", 125,200)
  
} 
  
}

function createObstacles(){
  
if (frameCount % 400   === 0) {
door = createSprite(Math.round(random(100,300)), -50,20,20);
door.velocityY = 1;  
door.addImage(door_image);
door.lifetime  = 475 
doorGroup.add(door);  
  
climber = createSprite(door.x,15,20,20);
climber.velocityY = 1; 
climber.addImage(climber_image);
climber.lifetime = 410  
climberGroup.add(climber); 
 
  
invisibleGround = createSprite(door.x,20,2,20);
invisibleGround.velocityY = 1;  
invisibleGround.setCollider("rectangle",0,0,100,2)  
invisibleGround.lifetime = 410  
invisibleGroup.add(invisibleGround);  
  
ghost.depth = door.depth;
ghost.depth = ghost.depth + 1;
  
  
     
}
  
}