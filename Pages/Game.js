var game = new Phaser.Game(1000,600,Phaser.AUTO,"",{preload:preload,create:create,update:update});

game.state.add('Boot', bootState);
game.state.add('Load', loadState);
game.state.add('Menu', menuState);
game.state.add('Spill', spillState);
game.state.add('Win1', win1State);
game.state.add('Lose', loseState);

game.state.start('Boot');