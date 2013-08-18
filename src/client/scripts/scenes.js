//
// Loading scenes
//
Crafty.scene('Loading--Boot', function(){
	if (Config.development) {
		Crafty.e('2D, DOM, Text, Persist')
			.text('****')
			.attr({ x: 0, y: 0, w: 100 })
	}

	$("#loading-bar").fadeIn("100");


	// Get the URLs of UI media
	absoluteURLs = [];
	for(var filename in Game.ui) {
		absoluteURLs.push(Game.ui[filename]);
	}

	// Preload user interface media
	Crafty.load(absoluteURLs,
		function() {
			if (Config.development) console.log("Pre-loaded UI interface");

			//when loaded
			Crafty.background("url('" + Game.ui['loadingBackground'] + "')");
			// Crafty.audio.play("loaded.ogg"); //Play the loaded sound effect

			$("#loading-bar").fadeOut("100", function () {
				Crafty.scene("Login");
			});
		},

		function(e) {
			//progress
			$("#loading-bar")
		},

		function(e) {
			//uh oh, error loading
		}
	);

});

Crafty.scene('Loading--Game', function() {
	// Load the player's character

	Crafty.scene("Loading--Overworld");
});

Crafty.scene('Loading--Overworld', function() {
	// Load an overworld room that the player is in

	Crafty.scene("Overworld");
});


//
// Login Scenes
//
Crafty.scene('Login', function(){
	// Display login UI

	Crafty.scene("Loading--Game");
});


//
// Overworld Scenes
//
Crafty.scene('Overworld', function() {
	Media.init();
});