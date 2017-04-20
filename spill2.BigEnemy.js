var game = new Phaser.Game(1000, 600, Phaser.CANVAS,'', { preload: preload, create: create, update: update });

function preload() {

    game.load.tilemap('map', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image("BG","assets/BGpix.png");
    game.load.image('tilesets', 'assets/tilesets.png');
    game.load.spritesheet('coin', 'assets/coin.png', 32,32);
    game.load.spritesheet("horsie","assets/horsie.png",150,75);
	game.load.spritesheet("enemy","assets/enemy_slime.png",49,43);
	game.load.spritesheet("enemy2","assets/biggie.png",49,50);
	game.load.image("heart_full","assets/heart_full.png");
	game.load.image("meny","assets/meny.png");

}


var cursors;
var map;
var coins;
var player;
var layer;
var enemies;
var livesCounter = 4;
var lives = null; 

var victorytext;
var deathtext;

var score = 0;
var scoreText;



function create() {
	game.add.sprite(0,0,"BG");
	game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT,]);
	
	cursors = game.input.keyboard.createCursorKeys();
	
    map = game.add.tilemap('map');
    map.addTilesetImage('tilesets');
    map.setCollisionBetween(1, 12);
    
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //PLAYER
    player = game.add.sprite(20,game.world.height - 200, "horsie");
    game.physics.arcade.enable(player);
    
    player.body.setSize(100, 50, 25, 25);
    
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
	player.direction = 0;
    
    game.physics.arcade.enable(player);
    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    
    player.animations.add("left",[0,1,2,3,4,5,6,7,8,9,10,11],35,true);
    player.animations.add("right",[25,24,23,22,21,20,19,18,17,16,15,14],35,true); 
    
    //COINS
    coins = game.add.group();
    coins.enableBody = true;
    
    map.createFromObjects('Object Layer 1', 103, 'coin', 0, true, false, coins);
    map.createFromObjects('Object Layer 1', 101, 'coin', 0, true, false, coins);
    
    coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    coins.callAll('animations.play', 'animations', 'spin');
  	
	//ENEMY
	
	enemies = game.add.group();
	enemies.enableBody = true;
	
	bigEnemies = game.add.group();
	bigEnemies.enableBody = true;
	
	for (var i = 0; i < 5; i++){
		createEnemies();
	}
	
	createBigEnemy();
	
	function createBigEnemy(){
		var bigEnemy = bigEnemies.create(800, game.world.height -300, 'enemy2')
		bigEnemy.animations.add("left",[19,18,17,16,15,14,13,12,11,10],35,true);
    	bigEnemy.animations.add("right",[9,8,7,6,5,4,3,2,1],35,true);
    	
    	setInterval(moveBigEnemy, 500);
    	
    	function moveBigEnemy(){
    		if(bigEnemy.body.x<player.body.x){
    			bigEnemy.body.velocity.x = 100;
    			bigEnemy.animations.play("left");
    		}
    		else{
    			bigEnemy.body.velocity.x = -100;
    			bigEnemy.animations.play("right");
    		}
    		if(bigEnemy.body.y<player.body.y){
    			bigEnemy.body.velocity.y = 100;
    		}
    		else{
    			bigEnemy.body.velocity.y = -100;
    		}
    	}
	}
	
	function createEnemies(){
		var enemy = enemies.create(i * 60, game.world.height -300, 'enemy');
		enemy.body.bounce.y = 0.1;
		enemy.body.bounce.x = 1;
    	enemy.body.gravity.y = 100;
    	enemy.body.collideWorldBounds = true;
		game.physics.arcade.enable(enemy);
		enemy.animations.add("left",[19,18,17,16,15,14,13,12,11,10],35,true);
    	enemy.animations.add("right",[9,8,7,6,5,4,3,2,1],35,true);
		//enemy.add(Math.random,Math.random);
	
    	setInterval(moveEnemy,5000);
    		
	function moveEnemy(){
		var number = Math.random();
		if(number<0.33){
			enemy.body.velocity.x = 175;
			enemy.animations.play("left");
		}
		else if(number<0.66){
			enemy.body.velocity.x =-175;
			enemy.animations.play("right");
		}
		else if(enemy.body.touching.down){
			enemy.animations.stop();
			enemy.frame = 0;
			enemy.body.velocity.x = 0;
		}
	}
	}
	
	//MENY
	var menysprite = game.add.sprite(0,0);menysprite.fixedToCamera = true;
	var meny = game.add.sprite(0,485,'meny');menysprite.addChild(meny);
	
	//DEATHTEXT
	var deathsprite = game.add.sprite(0,0);deathsprite.fixedToCamera = true;
	deathtext = game.add.text(520,530,"You are dead",{fontSize: "32px", fill: "#FFF"});deathsprite.addChild(deathtext);
	deathtext.visible = 0;
	
	//VICTORYTEXT
	var victorysprite = game.add.sprite(0,0);victorysprite.fixedToCamera = true;
	victorytext = game.add.text(520,530,"Winner",{fontSize: "32px", fill: "#FFF"});victorysprite.addChild(victorytext);
	victorytext.visible = 0;
	
	//SCORE
	var scorescore = game.add.sprite(0,0);scorescore.fixedToCamera = true;
	scoreText = game.add.text(300,530,"Score: 0",{fontSize: "32px", fill: "#FFF"});scorescore.addChild(scoreText);
	
	//LIVES
	this.lives = this.add.group();
	
	for (var i = 0; i < 4; i++){
	var heart = this.lives.create(0 + 30 * i,
		0);heart.fixedToCamera = true;
	var heartspawn = game.add.sprite(50 + 30 * i,
		530,'heart_full');heart.addChild(heartspawn);
	}	
}

function update() {

    game.physics.arcade.collide(player, map);
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.overlap(player, coins, collectCoin, null, this);
	game.physics.arcade.overlap(player, enemies, TaDMG, null, this);
	game.physics.arcade.overlap(player, bigEnemies, TaDMG, null, this);
	game.physics.arcade.collide(enemies, map);
	 game.physics.arcade.collide(enemies, layer);

    player.body.velocity.x = 0;
	
	if (cursors.up.isDown && player.body.onFloor()) {
        player.body.velocity.y = -350;
    }

    if(cursors.left.isDown){
        player.body.velocity.x = -300;
        player.animations.play("left");
		player.direction = 1;
    }
    
    else if(cursors.right.isDown){
        player.body.velocity.x = 300;
        player.animations.play("right");
		player.direction = 0;
    }
    
    else if(player.direction == 1){
        player.animations.stop();
        player.frame = 12;
    }
	
	else if(player.direction == 0){
        player.animations.stop();
        player.frame = 13;
    }
    
}

function collectCoin(player, coin) {

    coin.kill();
	score += 10
	scoreText.text = 'Score: ' + score;
	if(score == 500) {
		victorytext.visible = 1;
		game.paused = true;
	}

}
function TaDMG (player, enemy, bigEnemies) {

    enemies.remove(enemy);
	
    var live;
	live = this.lives.getFirstAlive();
	if(live){
		live.kill();
	}
	
	livesCounter = livesCounter -1;
	
	console.log(livesCounter);
	
	if(livesCounter == 0) {
		deathtext.visible = 1;
    
	player.kill();
	}
}