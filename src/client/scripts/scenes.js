// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
// Draw some text for the player to see in case the file takes a noticeable amount of time to load
Crafty.e('2D, DOM, Text')
	.text('Loading...')
	.attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
	.css(text_css);

	Crafty.scene('Game');
});

Crafty.scene('Game', function() {
	// Place a tree at every edge square on our grid
	// for (var x = 0; x < Game.map_grid.width; x++) {
	//   for (var y = 0; y < Game.map_grid.height; y++) {
	//     var at_edge = x == 0 || x == Game.map_grid.width - 1 ||
	//                   y == 0 || y == Game.map_grid.height - 1;

	//     if (at_edge) {
	//       // Place a tree entity at the current tile
	//       Crafty.e('Tree').at(x, y);
	//     } else {
	//       var rando = Math.random();
	//       if (rando < 0.1) {
	//         Crafty.e('Human').at(x, y);
	//       }
	//     }

	//   }
	// }

});