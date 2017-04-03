
var bootstate = {

    function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.state.start('game');
    game.state.start('Load');
    }
}