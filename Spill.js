var game = new Phaser.Game(1000,600,Phaser.AUTO,"",{preload:preload,create:create,update:update});



function preload(){ 
    this.game.load.spritesheet('player', 'assets/horsie.png', 150, 75);
    this.game.load.tilemap('tilemap', 'assets/test.tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'assets/tilesheet128.png');
}

function create() {
	 
    //Start the Arcade Physics systems
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
 
    //Change the background colour
    this.game.stage.backgroundColor = "#a9f0ff";
 
    //Add the tilemap and tileset image. The first parameter in addTilesetImage
    //is the name you gave the tilesheet when importing it into Tiled, the second
    //is the key to the asset in Phaser
    this.map = this.game.add.tilemap('tilemap');
    this.map.addTilesetImage('ground.tile', 'tiles');
 
    //Add both the background and ground layers. We won't be doing anything with the
    //GroundLayer though
    this.backgroundlayer = this.map.createLayer('BackgroundLayer');
    this.groundLayer = this.map.createLayer('GroundLayer');
 
    //Before you can use the collide function you need to set what tiles can collide
    this.map.setCollisionBetween(1, 100, true, 'GroundLayer');
 
    //Change the world size to match the size of this layer
    this.groundLayer.resizeWorld();
 
}

function update() {
	 
    //Make the sprite collide with the ground layer
    this.game.physics.arcade.collide(this.sprite, this.groundLayer);
    
  //Make the sprite collide with the ground layer
    this.game.physics.arcade.collide(this.sprite, this.groundLayer);
 
    //Make the sprite jump when the up key is pushed
    if(this.cursors.up.isDown) {
      this.sprite.body.velocity.y = -500;
    }
 
}

