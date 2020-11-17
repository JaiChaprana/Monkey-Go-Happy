var monkey, monkey_running, monkey_stopped
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var gameOver,gameOver_Image;
var score = 0;
var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png");
  
  monkey_stopped = loadAnimation("sad monkey.png");
  
  gameOver_Image = loadImage("gameOver.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
   //createCanvas(600, 200);





  //creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("stopped",monkey_stopped);
  monkey.scale = 0.1;
  
  gameOver = createSprite(200,200,20,20);
  gameOver.addImage("gameOver",gameOver_Image);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
  
  //monkey.setCollider("rectangle",monkey.x,monkey.y,monkey.width,100);
  monkey.debug = true
  

}


function draw() {

  background(255);
  text("SurvivalTime: "+score,260,30);
  
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }



  if (keyDown("space") && monkey.y > 270) {
    monkey.velocityY = -12;
  }

  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);
  spawnFood();
  spawnObstacles();

  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);


  if (obstaclesGroup.isTouching(monkey)) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    monkey.changeAnimation("stopped", monkey_stopped);
    monkey.scale = 0.05;
    monkey.x = monkey.x;
    //monkey.y = monkey.y;
    gameOver.visible = true;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);  
    frameCount = 101;
   
  }

  
  if(frameCount%100 == 0){
    score = score+1;
  }
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.velocityX = -5;

    //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    //add image of banana
    banana.addImage(bananaImage);
    banana.scale = 0.05;

    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 80 === 0) {
    obstacle = createSprite(800, 320, 10, 40);
    obstacle.velocityX = -6;

    //add image to the obstacle 
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;

    //lifetime to the obstacle     
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}