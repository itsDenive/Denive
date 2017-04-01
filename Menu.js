var menuState = {
    function create(){
        var nameLable = game.add.text(80,80, 'Pink fluffy unicorn', {font: '70px courier', fill: '#FF69B4'});

        var startLable = game.add.text(80, game.world.height-80, 'Press "SPACE" to start', {font: '40px courier', fill: '#FF69B4'});

        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        if(WKey.ondown){
            start()
        }
    }
    
    function start(){
        game.state.start('Play1');
    }
    
    
}