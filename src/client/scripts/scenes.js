// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
	// Draw some text for the player to see in case the file takes a noticeable amount of time to load
	Crafty.e('2D, DOM, Text')
		.text('Loading...')
		.attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })

		Crafty.scene('Overworld');
});

Crafty.scene('Overworld', function() {

});