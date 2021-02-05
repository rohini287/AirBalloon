var balloon
var database,position


function preload() {
  bg=loadImage("images/Hot Air Ballon-01.png")
  balloon_image=loadImage("images/Hot Air Ballon-02.png");
  
}

function setup() {
  createCanvas(1000,500);
  database=firebase.database();
  balloon=createSprite(500,250,10,10);
  balloon.addImage(balloon_image);
  balloon.scale=0.5
  
  var balloonPosition=database.ref('balloon/height');
  balloonPosition.on("value",readHeight,showError);
  
}

function draw() {
  background(bg);  
  drawSprites();
  
  fill("black")
  text("Move the arrow keys to move the balloon!",20,20);
  if (keyDown(LEFT_ARROW)){
    balloon.x=balloon.x-10;
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x+10;
  }
  else if(keyDown(UP_ARROW)){
    balloon.y=balloon.y-10;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y=balloon.y+10;
  }
}
function updateHeight(){
  database.ref('balloon/height').set({
    'x':height.x+x,
    'y':height.y+y
  })
}
function readHeight(data) {
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
  
}
function showError(){
  console.log("Error in writing to the database")
}