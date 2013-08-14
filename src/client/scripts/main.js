var Game = {
	width: function() {
		return Config.canvas.w * Config.tile.w;
	},
 
	height: function() {
		return Config.canvas.h * Config.tile.h;
	},
 
	// Initialize and start our game
	start: function() {
		// Setup Crafty
		Crafty.init(Config.canvas.w, Config.canvas.h);

		// Apply configurations
		Crafty.viewport.clampToEntities = !Config.development;
		Crafty.viewport.mouselook(Config.development);
		
		// Setup networking
		Crafty.scene("Loading");
		Net.setup();

	}
}