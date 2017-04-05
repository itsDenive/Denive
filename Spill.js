var game = new Phaser.Game(1000,600,Phaser.AUTO,"",{preload:preload,create:create,update:update});



var player;
var platforms;
var cursors;
var score = 0;
var scoreText;
var spacekey;


function preload(){
	game.load.image("kule","assets/kule.png");
    game.load.image("BG","assets/BG.png");
    game.load.image("cloud","assets/cloud.png");
    game.load.image("ground","assets/ground.png");
    game.load.spritesheet("horsie","assets/horsie.png",150,75);

    // TILED MAP I SPiLL
    /*
    preload: function(){ 
        this.game.load.spritesheet('player', 'assets/greenninja.png', 38, 48); 
        //trenger ikke?
        
        this.game.load.tilemap('tilemap', 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tilesheet128.png');
    }, */
}

function create(){
    game.add.sprite(0,0,"BG");
    
	this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);
    
    scoreText = game.add.text(16, 16, "score: 0", {fontSize: "32px", fill: "#FFF" });
    
    cursors = game.input.keyboard.createCursorKeys();
    
    //TILED MAP I SPILL
    
    /*
    //Start the Arcade Physics systems
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
 
    //Change the background colour
    this.game.stage.backgroundColor = "#a9f0ff";
 
    //Add the tilemap and tileset image. The first parameter in addTilesetImage
    //is the name you gave the tilesheet when importing it into Tiled, the second
    //is the key to the asset in Phaser
    this.map = this.game.add.tilemap('tilemap');
    this.map.addTilesetImage('tiles128', 'tiles');
 
    //Add both the background and ground layers. We won't be doing anything with the
    //GroundLayer though
    this.backgroundlayer = this.map.createLayer('BackgroundLayer');
    this.groundLayer = this.map.createLayer('GroundLayer');
 
    //Before you can use the collide function you need to set what tiles can collide
    this.map.setCollisionBetween(1, 100, true, 'GroundLayer');
 
    //Change the world size to match the size of this layer
    this.groundLayer.resizeWorld();
    */
    
//CREATE GROUND
    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 60, "ground");
    ground.scale.setTo(1, 1);
    ground.body.immovable = true;
    
    
 //CREATE PLATFORMS
    var ledge = platforms.create(290,300,"cloud");
    ledge.body.immovable = true;
    
    var ledge2 = platforms.create(350,400,"cloud");
    ledge2.body.immovable = true;
 
    
 //CREATE OBJEKT (Kuler)
    
    kuler = game.add.group();
    kuler.enableBody = true;
    
    for (var i = 0; i < 12; i++)
    {
        var kule = kuler.create(i * 70, 0, 'kule');
        kule.body.gravity.y = 20;
        kule.body.bounce.y = 0.4 + Math.random() * 0.1;
    }
   
    
 //CREATE PLAYER
	player = game.add.sprite(30,game.world.height - 150, "horsie");
    game.physics.arcade.enable(player);
    
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    
    player.animations.add("left",[0,1,2,3,4,5,6,7,8,9,10,11],35,true);
    player.animations.add("right",[25,24,23,22,21,20,19,18,17,16,15,14],35,true); 

    }




function update(){
	
	//TILED MAP I SPILL
	/*
	 //Make the sprite collide with the ground layer
    this.game.physics.arcade.collide(this.sprite, this.groundLayer);
    
    
        //Make the sprite collide with the ground layer
    this.game.physics.arcade.collide(this.sprite, this.groundLayer);
 
    //Make the sprite jump when the up key is pushed
    if(this.cursors.up.isDown) {
      this.sprite.body.velocity.y = -500;
    }
    
    */
	
	game.physics.arcade.collide(player,platforms);
    game.physics.arcade.collide(kuler, platforms); 
    
	/*
	var standing = this.player.body.blocked.down ||
	this.player.body.touching.down;
	
	if (!standing && this.wasStanding) { this.edgeTimer = this.time.time + 250; }
	
	//CAMERA?
	this.sky.tilePostition.y = -(this.camera.y * 0.7);
	
    game.physics.arcade.overlap(player, kuler, TaKuler, null, this); */
    
    
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
    
    
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }

}


function TaKuler (player, kule) {

    // Removes the star from the screen
    kule.kill();
    
    score += 1;
    scoreText.text = 'Score: ' + score;
}





