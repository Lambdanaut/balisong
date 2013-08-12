var Game = {
	// This defines our grid's size and the size of each of its tiles
	mapGrid: {
		width:	35,
		height: 25,
		tile: {
			width:	16,
			height: 16
		}
	},
 
	width: function() {
		return this.mapGrid.width * this.mapGrid.tile.width;
	},
 
	height: function() {
		return this.mapGrid.height * this.mapGrid.tile.height;
	},

	preload: function() {
		Crafty.scene("Loading"); //go to main scene
		Crafty.load([Media.spriteFilepath("original","textures","dirt1.png")],
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
		Crafty.init();

		Game.preload();
	}
};