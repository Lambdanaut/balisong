// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
	// Draw some text for the player to see in case the file takes a noticeable amount of time to load
	Crafty.e('LoadingText, 2D, DOM, Text')
		.text('Loading...')
		.attr({ x: 0, y: 0, w: 100 })

});

Crafty.scene('Overworld', function() {

});