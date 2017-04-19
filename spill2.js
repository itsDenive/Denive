var game = new Phaser.Game(1000, 600, Phaser.CANVAS,'', { preload: preload, create: create, update: update });

function preload() {

    game.load.tilemap('map', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image("BG","assets/BGpix.png");
    game.load.image('tilesets', 'assets/tilesets.png');
    game.load.spritesheet('coin', 'assets/coin.png', 32,32);
    game.load.spritesheet("horsie","assets/horsie.png",150,75);

}


var cursors;
var map;
var coins;
var player;
var layer;


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
    

}

function update() {

    game.physics.arcade.collide(player, map);
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.overlap(player, coins, collectCoin, null, this);

    player.body.velocity.x = 0;
    
    if(cursors.left.isDown){
        player.body.velocity.x = -300;
        player.animations.play("left");
    }
    
    else if(cursors.right.isDown){
        player.body.velocity.x = 300;
        player.animations.play("right");
    }
    
    else{
        player.animations.stop();
        player.frame = 13;
    }
    
    if (cursors.up.isDown && player.body.onFloor()) {
        player.body.velocity.y = -350;
    }

}

function collectCoin(player, coin) {

    coin.kill();

} 