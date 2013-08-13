var Game = {
	// This defines our grid's size and the size of each of its tiles
	width: function() {
		return Config.canvas.w * Config.tile.w;
	},
 
	height: function() {
		return Config.canvas.h * Config.tile.h;
	},

	preload: function() {
		Crafty.scene("Loading"); //go to main scene
		Crafty.load([Media.spriteFilepath("original","blocks","grass_01.png")],
			function() {
				//when loaded
				Media.init();

				// Crafty.scene("main"); //go to main scene
				// Crafty.audio.play("loaded.ogg"); //Play the loaded sound effect
			},

			function(e) {
				//progress
			},

			function(e) {
				//uh oh, error loading
			}
		);
	},
 
	// Initialize and start our game
	start: function() {
		Crafty.init(Config.canvas.w, Config.canvas.h);

		Crafty.viewport.clampToEntities = !Config.development;
		Crafty.viewport.mouselook(Config.development);
		

		Game.preload();
	}
};