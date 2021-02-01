var path, boy, cash, diamonds, jwellery, sword, gameOver;
var pathImg, boyImg, boyStopImg, cashImg, diamondsImg, jwelleryImg, swordImg, gameOverImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;
var play = 1;
var end = 0;
var gameState = play;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  boyStopImg = loadAnimation("runner1.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {

  createCanvas(400, 400);
  // Moving background
  path = createSprite(200, 200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70, 330, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.addAnimation("SahilStop", boyStopImg);
  boy.scale = 0.08;
  boy.setCollider("rectangle", 0, 0, 1200, 1200);
  boy.debug = true;


  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  edges = createEdgeSprites();
  boy.collide(edges);

  if (gameState === play) {
    //code to reset the background
    if (path.y > 400) {
      path.y = height / 2;
    }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;

    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 25;

    } else {
      if (swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = end;
      }
    }


  } else if (gameState === end) {

    gameOver = createSprite(150, 170);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;

    jwelleryG.destroyEach();
    diamondsG.destroyEach();
    cashG.destroyEach();

    treasureCollection = 0;

    path.velocityY = 0;

    boy.changeAnimation("SahilStop", boyStopImg);
    boy.x = 200;
    boy.y = 250;
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 150, 30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 100 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(50, 350), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordGroup.add(sword);

  }
}