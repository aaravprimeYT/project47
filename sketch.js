const Engine = Matter.Engine;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
var player,dead,playerImg;
var gameState = "Start";
var edges;
var start,startimg;
var butcher;
var time = 0;
var bat,batimg,swing;
var hit,bullet;
var butchers = [];
var trex,trexbutton,trexbuttonimg;
var rock,rockimg;
var hide;
var timer = 20;
var button = "normal";
var bg,hideimg;
function preload() {
  startimg = loadImage("images/play.jpg");
  playerImg = loadImage("images/chicken.gif");
  batimg = loadImage("images/bat.png");
  swing = loadImage("images/swing.png");
  rockimg = loadImage("images/rock.png");
  bg = loadImage("images/grass.jpg");
  trexbuttonimg = loadImage("images/boom.png");
  hideimg = loadImage("images/hide.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight-150);
  engine = Engine.create();
  world = engine.world;
  player = createSprite(235,650,25,25);
  player.addImage(playerImg);
  player.scale = 0.5;
  edges = createEdgeSprites();
  start = createSprite(750,340,200,50);
  start.addImage(startimg);
  start.scale = 1.5;
  butcher = new Butcher();
  lumberGroup = new Group();
  trexbutton = createSprite(100,550,50,50);
  trexbutton.addImage(trexbuttonimg);
  trexbutton.scale = 0.4
  trex = createSprite(768,-15,10,10);
  bat = createSprite(random(100,1500),random(0,715),10,10);
  bat.addImage(batimg);
  bat.scale = 0.1;
  bat.debug = true;
  rock = createSprite(random(0,1535),random(0,715),10,10);
  rock.addImage(rockimg);
  rock.scale = 0.2;
  hide = createSprite(100,400,50,50);
  hide.addImage(hideimg);
  hide.scale = 0.4;
  }
  


function draw() {
  background(bg);

  Engine.update(engine);

  
  fill(255);
  text(mouseX + " " + mouseY,700,50);
  text("Time Survived : " + time,1230,50);
  text(timer,1000,50);

  console.log(gameState);
  //console.log(getFrameRate());

  if (mousePressedOver(start)) {
    gameState = "survive";
  }

  if (frameCount % 1800 === 0) {
    butcher = new Butcher();
    lumberGroup.add(butcher.butcher);
  }
  if (gameState === "survive") {
    start.remove();
    butcher.butcher.attractionPoint(0.1,player.x,player.y);
  
    if (mousePressedOver(hide) && player.isTouching(rock)) {
      button = "clicked";
    }
    if (button === "clicked" ) {
      player.remove();
      butcher.butcher.velocityX = 0;
      butcher.butcher.velocityY = 0;
      if (frameCount % 30 === 0) {
        timer = timer-1;
      }
    }

    if (mousePressedOver(trexbutton)) {
      trex.attractionPoint(0.1,butcher.x,butcher.y);
      console.log(trex);
    }
    

 

    /*if (timer === 10) {
      player = createSprite(rock.x,rock.y,25,25);
      player.addImage(playerImg);
    }*/

  

    if(player.isTouching(bat)){
      bat.x = player.x + 75;
      bat.y = player.y;
      if (mouseIsPressed) {
        if (mouseButton === LEFT) {
          bat.addImage(swing);
        }
        if (bat.isTouching(butcher.butcher) && mouseButton === LEFT) {
          butcher.butcher.remove();
        }
      }
    }



    if(frameCount % 30 === 0){
      time = time + 1;
    }


    

    player.collide(edges);

    if (keyWentDown ("w")) {
      player.velocityY = -4;
    }
    if (keyWentUp ("w")) {
      player.velocityY = 0;
    }
    if (keyWentDown ("a")) {
      player.velocityX = -4;
    }
    if (keyWentUp ("a")) {
      player.velocityX = 0;
    }
    if (keyWentDown ("s")) {
      player.velocityY = 4;
    }
    if (keyWentUp ("s")) {
      player.velocityY = 0;
    }
    if (keyWentDown ("d")) {
      player.velocityX = 4;
    }
    if (keyWentUp ("d")) {
      player.velocityX = 0;
    }
  }


  butcher.display(); 
  
  butcher.butcher.collide(edges);

  drawSprites();
}

