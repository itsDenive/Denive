var loseState = {
    function create(){
        var loseLable = game.add.text(80,80, 'YOU SUCK HOMIE', {font: '80px courier', fill:'#FF69B4'});

        var startLable = game.add.text(80, game.world.height-80, 'Press "SPACE" to restart', {font: '40px courier', fill:'#FF69B4'});
        
        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        if(SPACEBAR.onDown){
            restart()
        }
    }
    
    function restart(){
        game.state.start('Play1');
    }
}