var loadState = {
    
    function preload(){
    var loadingLable = game.add.text(125, 200, 'setting up shit...', {font: '50px courier', fill: '#FF69B4'});
    
    game.load.image("kule","assets/kule.png");
    game.load.image("BG","assets/BG.png");
    game.load.image("cloud","assets/cloud.png");
    game.load.image("ground","assets/grounnd.png");
    game.load.spritesheet("horsie","assets/horsie.png",150,75);
    }
    
    function create(){
        game.state.start('menu');
    }
}