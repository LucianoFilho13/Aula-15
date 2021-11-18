
var trex ,trex_running ,trex_morto;
var edges;
var solo;
var soloimage;
var soloin;

var gameoverimage, gameoverobj;
var restartbutton, restartimage;

var nuvem; //CRIATIVADADE
var nuvemimage;

var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var estadodojogo = "JOGAR";

var grupodenuvens;
var grupodecactos; //criatividade!

var score = 0;

function preload(){ // funç~;ao que carregar todas as imagens e animações
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  soloimage = loadImage("ground2.png");
  nuvemimage = loadImage("cloud.png");
  trex_morto = loadAnimation("trex_collided.png");

  gameoverimage = loadImage("gameOver.png");
  restartimage = loadImage("restart.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

}

function setup(){ // todas as configuraçoes dos objetos
  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("eliminado",trex_morto);
  trex.scale = 0.5;

  edges = createEdgeSprites();
  solo = createSprite(300,190,600,20);
  solo.addImage(soloimage);

  gameoverobj = createSprite(300,50);
  gameoverobj.addImage(gameoverimage)
  gameoverobj.scale = 0.6;
  gameoverobj.visible = 0;

  restartbutton = createSprite(300,90);
  restartbutton.addImage(restartimage);
  restartbutton.scale = 0.5;
  restartbutton.visible = 0;

  soloin = createSprite(300,200,600,10);
  soloin.visible = 0;

  grupodecactos = new Group()
  grupodenuvens = new Group()
  
}

function draw(){
  background("white");
  drawSprites();
  trex.collide(soloin)

  text("Score:" + score,20,20);
  

  if (estadodojogo === "JOGAR") {
    if(keyDown("space")){
      if(trex.y > 170){
        trex.velocityY = -10;
  
      }
  
    }
    trex.velocityY = trex.velocityY + 0.5; // gravidade

    score = score +1;
      
    solo.velocityX = -3;
 
    geradordecactos();
    geradornuvem();

    if (solo.x < 0) {
      solo.x = 300;
  
    }

    if (trex.isTouching(grupodecactos)) {
      estadodojogo = "ENCERRAR";

    }
  }
  
  else if (estadodojogo === "ENCERRAR") {
    solo.velocityX = 0;
    grupodecactos.setVelocityXEach(0);
    grupodenuvens.setVelocityXEach(0);

    grupodecactos.setLifetimeEach(-1);
    grupodenuvens.setLifetimeEach(-1);

    //obstacle.lifetime = false;
    //nuvem.lifetime = false;

    trex.changeAnimation("eliminado",trex_morto);
    trex.velocityY = 0;

    restartbutton.visible = 1;
    gameoverobj.visible = 1;

  }

}

function geradornuvem() {
  if(frameCount % 60 === 0) {
    nuvem = createSprite(640,40,40,40)
    nuvem.velocityX = -3;
    nuvem.addImage(nuvemimage);
    nuvem.y = Math.round(random(20,90));
    console.log(nuvem.depth);
    nuvem.depth = trex.depth
    trex.depth = nuvem.depth + 1;

    grupodenuvens.add(nuvem);
    nuvem.lifetime = 300;
  }


}  

function geradordecactos(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(610,175,10,40);
    obstacle.velocityX = -6;
 
    
     // //gerar obstáculos aleatórios
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
    
     //atribuir escala e vida útil ao obstáculo          
     obstacle.scale = 0.5;
     obstacle.lifetime = 300;
    
    //adicione cada obstáculo ao grupo
    grupodecactos.add(obstacle);
  }
 }
 