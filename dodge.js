
var player1;
var p1IMG;
var player2;
var p2IMG;
var enemy1;
var enemy2;
var enemy3;
var enemy4;
var isDed;
var p1Ded;

function setup() {
    isDed = false;
    createCanvas(700,500);
    player1 = createSprite(width/5,height*9/10,30,30);
    player2 = createSprite(width*4/5,height*9/10,30,30);
    enemy1 = createSprite(width/4,0,10,30);
    enemy2 = createSprite(width*3/4,height/2,10,30);
    enemy3 = createSprite(width*7/8,height/3,10,30);
    enemy4 = createSprite(width/8,height*2/3,10,30);
}

function draw() {
    background(0,0,100);
	var enemies = [enemy1,enemy2,enemy3,enemy4];
	var e1Dir = 0;
	var e2Dir = 0;
	var e3Dir = 0;
	var e4Dir = 0;
	var eDirs = [e1Dir,e2Dir,e3Dir,e4Dir];
	
    if(!isDed){
        if(keyDown(LEFT_ARROW) && player2.position.x > width/10){
            player2.position.x -= 3;
        }

        if(keyDown(RIGHT_ARROW) && player2.position.x < width*9/10){
            player2.position.x += 3;
        }

        if(keyDown("a") && player1.position.x > width/10){
            player1.position.x -= 3;
        }
		
        if(keyDown("d") && player1.position.x < width*9/10){
            player1.position.x += 3;
        }
    }
	
	for(var i = 0; i < enemies.length && millis() > 3000; i++){
		
        
        var xMovement = 10;
        enemies[i].position.y += Math.log(millis());
        enemies[i].position.x += Math.floor(Math.random() * xMovement) - xMovement/2;
		
        if(enemies[i].position.y > height) {
            enemies[i].position.y = 0;
            enemies[i].position.x = Math.floor(Math.random() * width);
        }
	}
    
    if(isDed){
        gameOver();
    }
	for(var i = 0; i < enemies.length; i++){
		if(enemies[i].overlap(player1)){
			isDed = true;
			p1Ded = true;
		}
		if(enemies[i].overlap(player2)){
			isDed = true;
			p1Ded = false;
		}
	}
    
    text("P1", player1.position.x - 10, player1.position.y - 30);
    text("P2", player2.position.x - 10, player2.position.y - 30);
    
    if(millis() <= 3000)
        text("Start in " + (3-floor(millis()/1000)),width/5,height/3);
    else
        text("Time survived: " + floor(millis() - 3000)/1000., width/5, height/3);
    drawSprites();
}

function gameOver(){
    text("Time survived: " + floor(millis() - 3000)/1000., width/5, height/3);
    if(p1Ded)
        text("Player 1 died.", width/2,height/4);
    else
        text("Player 2 died.", width/2,height/4);
    text("Press CTRL + R (or refresh the page) to play again!",width/2,height/2);
    exit();
}