var Game = {
	// An object of UI filepaths
	ui: {},

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
		//Add Canvas Element
		Crafty.canvas.init();
		//Set canvas under interface
		Crafty.canvas._canvas.style.zIndex = '1';

		// Apply configurations
		Crafty.viewport.clampToEntities = !Config.development;
		Crafty.viewport.mouselook(Config.development);
		
		// Setup networking
		Crafty.scene("Loading--Boot");
		Net.setup();

	}
}