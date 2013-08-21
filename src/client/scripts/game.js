var Game = {
	// An object of UI filepaths
	ui: {},

	// An object of currently loaded actors, indexed by ID
	actors: {
		blocks    : {},
		objects   : {},
		mobs      : {},
		characters: {},
	},

	// An object of the current map data
	map: {},

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
		//Set canvas under user interface
		Crafty.canvas._canvas.style.zIndex = '1';

		// Apply configurations
		Crafty.viewport.clampToEntities = !Config.development;
		Crafty.viewport.mouselook(Config.development);
		
		// Bootup and connecting loading screen
		Crafty.scene("Loading--Boot");

		// Setup networking
		Net.setup();
	}
}